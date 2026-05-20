# AUDIAW — MASTER DOCUMENTATION ECOSYSTEM
## Volume IV: Systems, Standards, Governance & Release Roadmap

**Classification:** Internal Engineering Documentation  
**Version:** 0.1.0-draft  
**Continues from:** Volume III (Project Format, Performance, Live Performance, Instruments)

---

## TABLE OF CONTENTS — VOLUME IV

13. [File Browser & Asset Management System](#13-file-browser--asset-management-system)
14. [Keybinding & Command System](#14-keybinding--command-system)
15. [Theme & Customization System](#15-theme--customization-system)
16. [Accessibility Documentation](#16-accessibility-documentation)
17. [Security & Stability Document](#17-security--stability-document)
18. [DevOps & Build System Document](#18-devops--build-system-document)
19. [QA & Testing Documentation](#19-qa--testing-documentation)
20. [Open Source Governance Document](#20-open-source-governance-document)
21. [Complete Repository Structure](#21-complete-repository-structure)
22. [Engineering Standards](#22-engineering-standards)
23. [Internal API Documentation](#23-internal-api-documentation)
24. [Release Roadmap](#24-release-roadmap)

---

# 13. FILE BROWSER & ASSET MANAGEMENT SYSTEM

## 13.1 Browser Architecture

The AUDIAW file browser is a core productivity component. Unlike many DAWs where the browser feels like an afterthought, AUDIAW's browser is a first-class interface designed for professional asset management at scale — supporting libraries of 100,000+ samples without performance degradation.

### 13.1.1 Backend Indexing Architecture

```
ASSET INDEXING PIPELINE

New Location Added (by user)
    │
    ▼
Filesystem Walker (background thread, low priority)
    │  Recursively walks directory tree
    │  Skips: hidden files, system files, non-audio extensions
    │  Audio extensions: .wav, .aiff, .aif, .flac, .mp3, .ogg, .opus, .m4a
    │
    ▼
File Metadata Extractor (parallelized, 4 threads)
    │  Extracts per-file:
    │  - File path, filename, extension
    │  - File size, modification time
    │  - Audio duration (header read only, not full decode)
    │  - Sample rate, channel count, bit depth
    │  - Embedded metadata: artist, album, comment, key, BPM tags
    │  - Waveform thumbnail (async, lower priority)
    │
    ▼
SQLite Indexer
    │  Writes to: ~/.audiaw/asset-library.db
    │  Schema: assets, tags, locations, waveform_cache
    │  Uses WAL mode for concurrent read performance
    │
    ▼
Index complete → Browser refresh event → UI updates
```

**Indexing performance targets:**
- 10,000 files indexed: < 30 seconds
- 100,000 files indexed: < 5 minutes
- Subsequent re-index (change detection only): < 5 seconds
- Search across 100,000 indexed files: < 50ms

### 13.1.2 SQLite Schema

```sql
-- Asset index schema

CREATE TABLE locations (
  id          INTEGER PRIMARY KEY,
  path        TEXT NOT NULL UNIQUE,
  name        TEXT,               -- User-given name for the location
  type        TEXT NOT NULL,      -- 'system', 'user', 'project', 'plugin'
  enabled     BOOLEAN DEFAULT 1,
  added_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  indexed_at  DATETIME
);

CREATE TABLE assets (
  id              INTEGER PRIMARY KEY,
  location_id     INTEGER REFERENCES locations(id) ON DELETE CASCADE,
  path            TEXT NOT NULL UNIQUE,
  filename        TEXT NOT NULL,
  extension       TEXT NOT NULL,
  size_bytes      INTEGER,
  mtime           INTEGER,            -- Unix timestamp (for change detection)
  duration_ms     INTEGER,
  sample_rate     INTEGER,
  channels        INTEGER,
  bit_depth       INTEGER,
  bpm             REAL,               -- Detected or embedded
  musical_key     TEXT,               -- E.g., "C", "F#m"
  is_loop         BOOLEAN,
  is_oneshot      BOOLEAN,
  indexed_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tags (
  id        INTEGER PRIMARY KEY,
  name      TEXT NOT NULL UNIQUE
);

CREATE TABLE asset_tags (
  asset_id  INTEGER REFERENCES assets(id) ON DELETE CASCADE,
  tag_id    INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (asset_id, tag_id)
);

CREATE TABLE favorites (
  asset_id  INTEGER REFERENCES assets(id) ON DELETE CASCADE,
  added_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (asset_id)
);

CREATE TABLE waveform_cache (
  asset_id  INTEGER PRIMARY KEY REFERENCES assets(id) ON DELETE CASCADE,
  data      BLOB NOT NULL,            -- Compressed waveform thumbnail data
  zoom_levels INTEGER NOT NULL,
  computed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Full-text search index for fast filename/tag search
CREATE VIRTUAL TABLE assets_fts USING fts5(
  filename, musical_key, content=assets, content_rowid=id
);

-- Performance indexes
CREATE INDEX idx_assets_extension ON assets(extension);
CREATE INDEX idx_assets_duration ON assets(duration_ms);
CREATE INDEX idx_assets_bpm ON assets(bpm);
CREATE INDEX idx_assets_location ON assets(location_id);
```

### 13.2 Search System

### 13.2.1 Search Query Parser

AUDIAW's browser search supports a structured query language for precise asset filtering:

```
SEARCH GRAMMAR

query         → term+
term          → text_term | filter_term | exclude_term
text_term     → [a-zA-Z0-9_\-]+     (free text, matches filename or tags)
filter_term   → key ':' value
exclude_term  → '-' term

filter_term examples:
  bpm:120            → exact BPM match (±2 BPM tolerance)
  bpm:>120           → BPM greater than 120
  bpm:100-130        → BPM in range 100-130
  key:C              → key is C (major implied)
  key:Am             → key is A minor
  key:C#             → key is C# (any mode)
  dur:>2s            → duration greater than 2 seconds
  dur:1s-5s          → duration in range 1-5 seconds
  type:loop          → is_loop = true
  type:oneshot       → is_oneshot = true
  type:wav           → extension = wav
  tag:drums          → has tag "drums"
  ch:2               → stereo (2 channels)
  ch:1               → mono (1 channel)
  sr:44100           → sample rate = 44100 Hz
  fav:true           → in favorites
```

**Example complex queries:**
- `kick bpm:140-160 type:loop` → loops with "kick" in name, BPM 140-160
- `bass -synth key:Am dur:<4s` → "bass" without "synth", in Am, under 4 seconds
- `tag:drums tag:processed type:oneshot` → one-shots tagged with both "drums" and "processed"

### 13.2.2 Search Performance

Search queries execute against the FTS5 virtual table and column indexes:
- Pure text search: < 10ms on 100,000 assets
- Text + filter combination: < 25ms on 100,000 assets
- Results are paginated (50 per page) with virtual scrolling for performance

### 13.3 Preview System Architecture

```rust
pub struct PreviewPlayer {
    /// Currently previewing asset
    current_asset: Option<AssetId>,
    
    /// Preview audio engine (separate from main audio graph)
    engine: PreviewEngine,
    
    /// Preview routing: output to main hardware output
    output_routing: OutputRouting,
    
    /// Tempo-sync state
    tempo_sync: Option<TempoSyncState>,
    
    /// Preview history for back/forward navigation
    history: VecDeque<AssetId>,
}

impl PreviewPlayer {
    pub fn preview(&mut self, asset: &Asset) {
        // Load asset into preview buffer (first 30 seconds)
        let preview_buffer = self.engine.load_preview_audio(asset);
        
        // If tempo sync is active, time-stretch to project BPM
        let buffer = if let Some(sync) = &self.tempo_sync {
            sync.stretch_to_tempo(preview_buffer, asset.bpm)
        } else {
            preview_buffer
        };
        
        // Start playback
        self.engine.play(buffer);
        self.current_asset = Some(asset.id);
        self.history.push_back(asset.id);
    }
}
```

**Preview features:**
- Auto-preview on arrow key navigation through asset list (200ms delay to avoid false triggers)
- Tempo-sync preview: loops are pitch-shifted and time-stretched to match project BPM
- Key-correct preview: option to transpose preview to match project key (C by default)
- Preview from project playhead position (for rhythmic audition in context)
- Volume-normalized preview (prevents surprise loud/quiet previews between assets)
- Loop preview: short loops repeat automatically during preview

### 13.4 Drag-and-Drop System

The drag-and-drop system supports dragging assets from the browser to multiple destinations:

```typescript
interface DragPayload {
  type: 'asset';
  assetId: AssetId;
  assetPath: string;
  assetDuration: number;  // ms
  assetChannels: number;
  // Computed at drag start for performance:
  thumbnailDataUrl: string;
}

// Drop targets and their behaviors:
const dropHandlers: Record<DropTargetType, DropHandler> = {
  'arrangement-empty-lane': async (payload, position) => {
    // Creates new audio track + clip at drop position
    await invoke('create_audio_track_with_clip', {
      assetPath: payload.assetPath,
      timePosition: position.timePosition,
      insertAfterTrackId: position.nearestTrackId,
    });
  },
  
  'arrangement-existing-track': async (payload, position) => {
    // Creates clip on existing track at drop position
    await invoke('create_clip_on_track', {
      trackId: position.trackId,
      assetPath: payload.assetPath,
      timePosition: position.timePosition,
    });
  },
  
  'sampler-instrument': async (payload, _position) => {
    // Loads sample into sampler at next available mapping slot
    await invoke('load_sample_into_sampler', {
      samplerDeviceId: position.deviceId,
      assetPath: payload.assetPath,
    });
  },
  
  'drum-machine-pad': async (payload, position) => {
    // Assigns sample to specific drum pad
    await invoke('assign_drum_pad', {
      drumMachineId: position.deviceId,
      padIndex: position.padIndex,
      assetPath: payload.assetPath,
    });
  },
};
```

**Visual drag feedback:**
- Ghost image follows cursor showing waveform thumbnail
- Drop target highlights when a valid drop is detected
- Timeline shows clip preview shadow at the potential drop position (correct length, correct position)
- Invalid drop targets show a "no" cursor indicator

---

# 14. KEYBINDING & COMMAND SYSTEM

## 14.1 Command Architecture

AUDIAW's keyboard system is built on a **command registry** rather than a direct keymap. This separation means:
- Every user action is a named command with a unique ID
- Commands can be executed from keyboard shortcuts, the command palette, menus, or programmatically
- Keybinding configuration is separate from command behavior
- Commands can be scripted and macros can combine commands

### 14.1.1 Command Registry

```rust
pub struct CommandRegistry {
    commands: HashMap<CommandId, CommandDefinition>,
}

pub struct CommandDefinition {
    pub id: CommandId,                    // e.g., "transport.play_stop"
    pub name: String,                     // e.g., "Play / Stop"
    pub description: String,
    pub category: CommandCategory,
    pub context: CommandContext,          // When this command is available
    pub default_keybind: Option<KeyBind>,
    pub handler: Box<dyn CommandHandler>,
}

pub enum CommandContext {
    Global,                               // Available everywhere
    ArrangementFocused,                   // Only when arrangement view is active
    PianoRollFocused,
    MixerFocused,
    BrowserFocused,
    TrackSelected,
    ClipSelected,
    NoteSelected,
    PluginWindowFocused,
}
```

### 14.2 Default Keybinding Reference

#### 14.2.1 Transport & Playback

| Action | macOS | Windows/Linux | Notes |
|---|---|---|---|
| Play / Stop | `Space` | `Space` | |
| Play from Beginning | `Shift+Space` | `Shift+Space` | |
| Record | `Cmd+R` | `Ctrl+R` | Arms and starts recording |
| Record from Current Position | `Shift+Cmd+R` | `Shift+Ctrl+R` | |
| Toggle Loop | `Cmd+L` | `Ctrl+L` | |
| Set Loop Start | `I` | `I` | At playhead position |
| Set Loop End | `O` | `O` | At playhead position |
| Nudge Playhead Back | `←` | `←` | By snap unit |
| Nudge Playhead Forward | `→` | `→` | By snap unit |
| Jump to Beginning | `Home` or `Return` | `Home` or `Enter` | |
| Jump to Loop Start | `Shift+←` | `Shift+←` | |
| Tap Tempo | `T` | `T` | Tap 4+ times to set BPM |
| Toggle Metronome | `Cmd+Shift+M` | `Ctrl+Shift+M` | |

#### 14.2.2 Project Management

| Action | macOS | Windows/Linux |
|---|---|---|
| New Project | `Cmd+N` | `Ctrl+N` |
| Open Project | `Cmd+O` | `Ctrl+O` |
| Save Project | `Cmd+S` | `Ctrl+S` |
| Save As | `Cmd+Shift+S` | `Ctrl+Shift+S` |
| Collect & Save | `Cmd+Alt+S` | `Ctrl+Alt+S` |
| Export Audio | `Cmd+E` | `Ctrl+E` |
| Export Stems | `Cmd+Shift+E` | `Ctrl+Shift+E` |
| Project Settings | `Cmd+,` | `Ctrl+,` |

#### 14.2.3 Editing (Global)

| Action | macOS | Windows/Linux | Notes |
|---|---|---|---|
| Undo | `Cmd+Z` | `Ctrl+Z` | |
| Redo | `Cmd+Shift+Z` | `Ctrl+Y` | Platform convention |
| Cut | `Cmd+X` | `Ctrl+X` | |
| Copy | `Cmd+C` | `Ctrl+C` | |
| Paste | `Cmd+V` | `Ctrl+V` | At playhead position |
| Paste in Place | `Cmd+Shift+V` | `Ctrl+Shift+V` | Preserves original position |
| Select All | `Cmd+A` | `Ctrl+A` | Context-sensitive |
| Delete | `Backspace` or `Delete` | `Backspace` or `Delete` | |
| Duplicate | `Cmd+D` | `Ctrl+D` | |
| Duplicate and Offset | `Cmd+Shift+D` | `Ctrl+Shift+D` | Places copy after original |

#### 14.2.4 View Switching

| Action | macOS | Windows/Linux |
|---|---|---|
| Arrangement View | `Cmd+1` | `Ctrl+1` |
| Mixer View | `Cmd+2` or `M` | `Ctrl+2` or `M` |
| Piano Roll (for selected clip) | `Cmd+3` or `E` | `Ctrl+3` or `E` |
| Automation View | `Cmd+4` or `A` | `Ctrl+4` or `A` |
| Device View (right panel) | `Cmd+5` or `P` | `Ctrl+5` or `P` |
| Browser | `Cmd+B` | `Ctrl+B` |
| Toggle Full Screen | `Cmd+F` | `F11` |
| Command Palette | `Cmd+Shift+P` | `Ctrl+Shift+P` |

#### 14.2.5 Arrangement View

| Action | macOS | Windows/Linux | Notes |
|---|---|---|---|
| Zoom In (horizontal) | `Cmd+]` | `Ctrl+]` | |
| Zoom Out (horizontal) | `Cmd+[` | `Ctrl+[` | |
| Fit Project to Window | `Cmd+Shift+F` | `Ctrl+Shift+F` | |
| Fit Selection to Window | `Cmd+Shift+Z` | `Ctrl+Shift+Z` | |
| Snap Enable/Disable | `Cmd+G` | `Ctrl+G` | |
| Add Audio Track | `Cmd+Shift+A` | `Ctrl+Shift+A` | |
| Add MIDI Track | `Cmd+Shift+M` | `Ctrl+Shift+M` | |
| Add Group Track | `Cmd+Shift+G` | `Ctrl+Shift+G` | |
| Mute Selected Track | `M` | `M` | When track focused |
| Solo Selected Track | `S` | `S` | When track focused |
| Arm Selected Track | `R` | `R` | When track focused |
| Rename Selected | `F2` | `F2` | Track or clip |
| Group Selected Clips | `Cmd+G` | `Ctrl+G` | |
| Ungroup | `Cmd+Shift+G` | `Ctrl+Shift+G` | |
| Split Clip at Playhead | `S` (clip tool) | `S` (clip tool) | With scissors tool active |
| Consolidate Selection | `Cmd+J` | `Ctrl+J` | Merge clips into one |
| Quantize | `Q` | `Q` | Context-sensitive |

#### 14.2.6 Piano Roll

| Action | macOS | Windows/Linux | Notes |
|---|---|---|---|
| Select All Notes | `Cmd+A` | `Ctrl+A` | |
| Deselect All | `Escape` | `Escape` | |
| Quantize Selected | `Q` | `Q` | To current quantize setting |
| Transpose Up (semitone) | `Shift+↑` | `Shift+↑` | |
| Transpose Down (semitone) | `Shift+↓` | `Shift+↓` | |
| Transpose Up (octave) | `Cmd+↑` | `Ctrl+↑` | |
| Transpose Down (octave) | `Cmd+↓` | `Ctrl+↓` | |
| Nudge Left | `←` | `←` | By quantize unit |
| Nudge Right | `→` | `→` | By quantize unit |
| Legato (extend to next) | `Cmd+Shift+L` | `Ctrl+Shift+L` | |
| Invert Selection | `Cmd+Shift+I` | `Ctrl+Shift+I` | |
| Humanize | `Cmd+Shift+H` | `Ctrl+Shift+H` | ±velocity, ±timing dialog |
| Scale Velocities | `Cmd+Shift+V` | `Ctrl+Shift+V` | Scale dialog |
| Flip Vertical | `Cmd+Shift+↑` | `Ctrl+Shift+↑` | Mirror pitches |
| Flip Horizontal | `Cmd+Shift+→` | `Ctrl+Shift+→` | Mirror time positions |
| Draw Mode | `P` | `P` | Pencil tool |
| Select Mode | `E` or `Esc` | `E` or `Esc` | Selection tool |
| Erase Mode | `X` | `X` | Eraser tool |

## 14.3 Command Palette

The Command Palette (`Cmd/Ctrl+Shift+P`) is a fuzzy-search interface for all registered commands:

```
COMMAND PALETTE

┌──────────────────────────────────────────────────────────┐
│  ⌘ Search commands...                                     │
├──────────────────────────────────────────────────────────┤
│  ► Export Audio                              Cmd+E        │
│  ► Export Stems                              Cmd+Shift+E  │
│  ► Add MIDI Track                            Cmd+Shift+M  │
│  ► Add Audio Track                           Cmd+Shift+A  │
│  ► Quantize                                  Q            │
│    Humanize Notes                            Cmd+Shift+H  │
│    Scale Velocities                          Cmd+Shift+V  │
│    Invert MIDI Selection                     Cmd+Shift+I  │
│    Freeze Track                                           │
│    Bounce Track to Audio                                  │
└──────────────────────────────────────────────────────────┘
```

**Palette features:**
- Fuzzy search across all command names and descriptions
- Recent commands are shown first (personalized ranking)
- Commands show their keyboard shortcut
- Unavailable commands (wrong context) are shown grayed with reason
- Commands execute immediately on Enter or click
- Palette dismisses on Escape

## 14.4 Custom Keybinding System

Users can customize all keybindings via Preferences → Keybindings:

```json
// ~/.audiaw/keybindings.json (user overrides, merged with defaults)
{
  "version": 1,
  "bindings": [
    {
      "command": "transport.play_stop",
      "key": "Space",
      "context": "global"
    },
    {
      "command": "edit.quantize",
      "key": "Q",
      "context": "piano_roll_focused"
    },
    {
      "command": "view.mixer",
      "key": "F2",
      "context": "global"
    }
  ]
}
```

**Key binding validation:**
- Conflicts detected in real-time when assigning
- Context-scoped conflicts: the same key can be used for different commands in different contexts (e.g., `M` = Mute in Arrangement, `M` = something else in Piano Roll)
- Global conflicts are always flagged
- "Reset to Defaults" per-command and globally
- Keybinding presets: Ableton-compatible, FL Studio-compatible, Logic-compatible, Pro Tools-compatible (community-maintained mapping files)

## 14.5 Macro System

**Macros** allow users to define custom actions that combine multiple commands:

```json
// Macro example: "Bounce and Replace" (render track, replace with audio)
{
  "name": "Bounce and Replace",
  "description": "Freeze track, flatten to audio, unfreeze instrument",
  "steps": [
    { "command": "track.freeze" },
    { "command": "track.bounce_frozen_to_audio" },
    { "command": "track.delete_instrument" }
  ],
  "keybind": "Cmd+Shift+B"
}
```

Macros are created via: Preferences → Macros → New Macro, or by recording a command sequence (Preferences → Macros → Record). Macros support:
- Sequential execution with optional delay between steps
- Conditional execution (only run step N if the previous step succeeded)
- Parameter prompts (pause and ask user for input)
- MIDI trigger (assign a MIDI note or CC to execute a macro)

---

# 15. THEME & CUSTOMIZATION SYSTEM

## 15.1 Theme Engine Architecture

AUDIAW's theme engine is built on **CSS Custom Properties** (variables) with a structured override system. The entire visual appearance of the application is controlled by a single set of ~100 design tokens, all defined as CSS variables.

### 15.1.1 Theme Loading Pipeline

```
THEME LOADING

1. Load base theme tokens (compiled into application)
2. Load active theme override file (JSON → CSS variables)
3. Apply user accent color preference
4. Apply any additional user overrides (user-preferences.json)
5. Inject computed CSS variables into WebView document root
6. Trigger React re-render (all components using theme vars update instantly)
```

### 15.1.2 Theme Token Categories

The full token set (~100 variables) is organized into categories:

**Surface tokens (15 variables):**
Background colors for different elevation levels (base, raised, overlay, inset, floating)

**Border tokens (6 variables):**
Subtle, default, strong, focused, error, warning border colors

**Text tokens (8 variables):**
Primary, secondary, tertiary, disabled, inverse, accent, error, success text colors

**Interactive tokens (12 variables):**
Default, hover, pressed, disabled, focus states for buttons and controls

**Accent tokens (6 variables):**
Primary accent, secondary accent, accent-dim (low-opacity), accent-contrast (text on accent bg)

**Status tokens (8 variables):**
Record, play, stop, warning, error, success, info status colors

**Waveform tokens (6 variables):**
Waveform fill, waveform outline, waveform selected, grid line, playhead, loop marker colors

**Meter tokens (5 variables):**
Safe, caution, danger, clip, background meter colors

**Track palette (48 variables):**
3 shades (main, bright, dim) × 16 track colors

**Shadow tokens (6 variables):**
Elevation shadows from 1dp to 24dp

**Animation tokens (8 variables):**
Duration and easing values for all animation types

### 15.1.3 Theme File Format

```json
{
  "id": "audiaw-dark",
  "name": "AUDIAW Dark",
  "author": "AUDIAW Team",
  "version": "1.0.0",
  "base": "dark",
  "preview": "data:image/png;base64,...",
  "tokens": {
    "surface-base":      "#1a1a1f",
    "surface-raised":    "#22222a",
    "surface-overlay":   "#2d2d38",
    "surface-inset":     "#13131a",
    "surface-floating":  "#333344",
    
    "border-subtle":     "rgba(255,255,255,0.06)",
    "border-default":    "rgba(255,255,255,0.12)",
    "border-strong":     "rgba(255,255,255,0.20)",
    "border-focused":    "#3b82f6",
    
    "text-primary":      "rgba(255,255,255,0.92)",
    "text-secondary":    "rgba(255,255,255,0.55)",
    "text-tertiary":     "rgba(255,255,255,0.32)",
    
    "accent-primary":    "#3b82f6",
    "accent-secondary":  "#60a5fa",
    "accent-dim":        "rgba(59,130,246,0.15)",
    
    "waveform-fill":     "#2563eb",
    "waveform-outline":  "#3b82f6",
    "waveform-selected": "#60a5fa",
    
    "meter-safe":        "#22c55e",
    "meter-caution":     "#f59e0b",
    "meter-danger":      "#ef4444",
    "meter-clip":        "#ff0000"
  }
}
```

## 15.2 Layout Presets

**Workspace layouts** are saved configurations of which panels are open, their sizes, and their positions:

```json
{
  "name": "Beatmaking",
  "panels": {
    "left": { "open": true, "width": 260, "active_tab": "browser" },
    "right": { "open": true, "width": 320, "active_tab": "device" },
    "bottom": { "open": true, "height": 240, "active_tab": "piano_roll" }
  },
  "main_view": "arrangement",
  "track_height": "standard",
  "zoom_level": 0.5
}
```

AUDIAW ships with five built-in layout presets:
- **Production:** Arrangement + Browser + Device View
- **Mixing:** Full-screen Mixer (Arrangement in bottom panel)
- **Beatmaking:** Arrangement + Piano Roll (bottom) + Browser (left)
- **Mastering:** Arrangement + Spectrum Analyzer + LUFS Meter (right panel)
- **Performance:** Full-screen Clip Launcher

## 15.3 UI Scaling

AUDIAW supports four UI scaling modes:

| Scale Mode | Font Scale | Icon Scale | Spacing Scale | Use Case |
|---|---|---|---|---|
| Compact | 90% | 80% | 85% | Very large monitors, dense workflows |
| Standard | 100% | 100% | 100% | Default |
| Comfortable | 115% | 115% | 115% | Laptop screens, accessibility |
| Large | 130% | 130% | 130% | Touch screens, accessibility |

Independent of this, AUDIAW respects the OS display scale factor (HiDPI). On a 200% DPI display (4K monitor at "Retina" scaling), AUDIAW renders all assets at 2× resolution automatically.

**Custom scale:** The user can set a custom scale percentage (80–200%) in Preferences → Appearance → UI Scale.

---

# 16. ACCESSIBILITY DOCUMENTATION

## 16.1 Keyboard-Only Workflow

AUDIAW commits to being fully usable without a mouse. This is not just for accessibility — it supports the professional workflow of users who keep their hands on the keyboard and hardware controllers during production.

### 16.1.1 Focus Management

The application maintains a logical focus tree. Tab order follows the reading order of the UI. Focus is always visible (never hidden by CSS):

```css
/* Focus indicator — always visible, meets WCAG 2.1 AA */
:focus-visible {
  outline: 2px solid var(--color-border-focused);  /* Accent color */
  outline-offset: 2px;
  border-radius: 2px;
}

/* Never suppress focus for aesthetic reasons */
:focus:not(:focus-visible) {
  /* No suppression — :focus-visible handles pointer vs keyboard */
}
```

### 16.1.2 Arrow Key Navigation

In list contexts (asset browser, plugin browser, preset list), arrow keys navigate:
- `↑` / `↓`: Previous/next item
- `←` / `→`: Collapse/expand folder, or navigate between columns
- `Enter` or `Space`: Select/activate item
- `Home` / `End`: First/last item in list
- `Page Up` / `Page Down`: Scroll by one page

In the arrangement view:
- `↑` / `↓`: Select previous/next track
- `←` / `→`: Select previous/next clip on current track
- `Tab`: Move focus between track header and timeline area
- `Enter` on a clip: Opens edit view (audio → waveform editor, MIDI → piano roll)

### 16.1.3 Accessible Menus

All dropdown menus and context menus are keyboard-operable:
- `Enter` or `Space`: Open menu
- Arrow keys: Navigate items
- `Enter`: Activate item
- `Escape`: Close menu
- Type-to-search: Typing while a menu is open filters or jumps to matching items

## 16.2 Screen Reader Support

AUDIAW targets NVDA (Windows), VoiceOver (macOS), and Orca (Linux) compatibility:

### 16.2.1 ARIA Implementation

```typescript
// Track component - screen reader accessible
const TrackHeader: React.FC<TrackProps> = ({ track }) => (
  <div
    role="listitem"
    aria-label={`${track.name} track. ${track.type} type. ${track.muted ? 'Muted.' : ''} ${track.solo ? 'Soloed.' : ''}`}
    aria-selected={track.selected}
  >
    <button
      aria-label={`${track.muted ? 'Unmute' : 'Mute'} ${track.name}`}
      aria-pressed={track.muted}
      onClick={handleMute}
    >
      {track.muted ? <MutedIcon /> : <SpeakerIcon />}
    </button>
    
    <div
      role="slider"
      aria-label={`${track.name} volume`}
      aria-valuemin={-Infinity}
      aria-valuemax={6}
      aria-valuenow={track.volumeDb}
      aria-valuetext={`${track.volumeDb.toFixed(1)} dB`}
    >
      <FaderControl volume={track.volumeDb} />
    </div>
  </div>
);

// Live meter updates (aria-live for screen readers)
const LevelMeter: React.FC<MeterProps> = ({ level }) => (
  <div
    role="meter"
    aria-label="Track level"
    aria-valuemin={-60}
    aria-valuemax={6}
    aria-valuenow={Math.round(level)}
    aria-valuetext={`${Math.round(level)} dBFS`}
  >
    <MeterBar level={level} />
  </div>
);
```

### 16.2.2 Screen Reader Announcements

AUDIAW uses `aria-live` regions to announce important state changes:
- Transport state changes: "Playing", "Recording", "Stopped"
- Autosave: "Project autosaved"
- Plugin events: "Plugin 'Reverb' loaded on Track 3"
- Errors: "Audio dropout detected. Consider increasing buffer size."

Live region verbosity is configurable: verbose mode announces all state changes; concise mode announces only critical events.

## 16.3 Colorblind-Safe Design

AUDIAW's design is tested against three forms of color vision deficiency:

- **Deuteranopia** (red-green, most common, ~6% of males)
- **Protanopia** (red-green variant)
- **Tritanopia** (blue-yellow, rare)

Verification process:
1. Screenshots taken of key UI states (meters, track colors, recording state, automation)
2. CVD simulation applied using `daltonize` tool
3. Manual review: does the UI communicate all necessary information without relying on color alone?

**Color independence requirements:**
- Record state: conveyed by color (red) AND a pulsing animation AND a label change ("ARM" → "REC")
- Meter levels: conveyed by bar height AND color zones AND numeric display (dBFS value shown on hover)
- Track colors: 16 track colors are distinguishable in deuteranopia simulation (verified)
- Playhead position: conveyed by position AND a label in the status bar
- Plugin bypass state: conveyed by color AND icon change (power icon, filled vs outlined)

## 16.4 Motor Accessibility

### 16.4.1 Reduced Precision Mode

For users with motor impairments affecting fine pointer control:

- **Large click targets:** Minimum 44×44px for all interactive elements (WCAG 2.1 AA requirement)
- **Sticky drag mode:** Alternative to click-drag: click once to begin drag, click again to end (eliminates need to hold mouse button)
- **Snap assistance:** Increased snap strength so clips "lock" to grid positions
- **Dwell click:** Option to enable dwell-click (pointing at an element for N seconds activates it)
- **Keyboard-first mode:** Reduces the number of mouse operations required for common tasks

### 16.4.2 Pointer Size

AUDIAW uses custom cursor CSS where beneficial (resize handles, etc.). All custom cursors are large enough to be visible and have a clear hotspot:

```css
/* Large resize cursor for track height adjustment */
.resize-handle {
  cursor: url('cursors/resize-vertical-large.png') 16 16, ns-resize;
}
```

---

# 17. SECURITY & STABILITY DOCUMENT

## 17.1 Plugin Isolation Security Model

The plugin sandbox model provides two layers of protection:

**Layer 1: Process isolation.** Plugins run in separate processes. A compromised plugin cannot directly access AUDIAW's memory space. Shared memory is the only data exchange path, and this shared memory is strictly bounded.

**Layer 2: System call filtering.** On Linux, plugin processes run with a seccomp filter that restricts system calls to those required for audio processing:

```
ALLOWED SYSCALLS (plugin process — Linux seccomp):
  read, write, mmap, mprotect, munmap, brk, rt_sigaction,
  rt_sigprocmask, sigreturn, nanosleep, getpid, clone (for threads),
  futex, sched_yield, clock_gettime, gettimeofday
  
EXPLICITLY DENIED:
  open, openat, execve, fork, socket, connect, bind,
  listen, accept, recvfrom, sendto, ptrace, kill,
  mknod, chmod, chown, setuid, setgid
```

This prevents a compromised plugin from: opening files it shouldn't, making network connections, spawning new processes, or escalating privileges.

On macOS, App Sandbox is applied to the plugin helper process. On Windows, Job Objects are used to restrict plugin process capabilities.

## 17.2 Update Security

AUDIAW's auto-update system uses **code signing** and **hash verification** for all updates:

```
UPDATE SECURITY CHAIN

1. Build server produces release binary
2. Binary is signed with AUDIAW's Ed25519 release key
3. Signature and SHA-256 hash are published to update manifest
4. Update manifest is served over HTTPS (pinned certificate)
5. AUDIAW client verifies:
   a. TLS certificate matches pinned fingerprint
   b. Manifest signature valid (Ed25519 verification)
   c. Downloaded binary SHA-256 matches manifest
   d. Binary signature valid (OS-level signature verification)
6. Update installed only if all checks pass
```

**Key management:**
- Release signing key is stored in HSM (Hardware Security Module)
- Key rotation procedure documented and tested annually
- Key revocation mechanism: AUDIAW checks revocation list on update check

## 17.3 Crash Recovery Architecture

```
CRASH RECOVERY STATE MACHINE

Normal Operation
    │
    │ ← CRASH (segfault, panic, OOM)
    ▼
Crash Handler Activated
    │
    ├── 1. Write crash indicator file: ~/.audiaw/crash.lock
    │       Contains: timestamp, panic message (if panic), 
    │                 loaded plugin list, last 100 IPC commands
    │
    ├── 2. Attempt autosave flush
    │       Write emergency autosave to: ~/.audiaw/emergency.autosave
    │       (May fail if crash is in file I/O path — acceptable)
    │
    └── 3. Exit (code 134 for signal, 1 for panic)
    
                    ↓ Next Launch ↓

Startup
    │
    ├── Check for crash.lock
    │   If exists:
    │   ├── Parse crash info
    │   ├── Display: "AUDIAW exited unexpectedly. Restore from autosave?"
    │   ├── Option: [Restore Autosave] [Open Last Saved Version] [Start Fresh]
    │   │   [Submit Anonymous Crash Report]
    │   └── After user choice: delete crash.lock
    │
    └── Normal startup continues
```

### 17.3.1 Crash Report Content

With user consent, crash reports contain:
- AUDIAW version and build hash
- OS name, version, architecture
- CPU model and core count
- RAM total and available at time of crash
- Audio device name and backend
- List of loaded plugin names (not plugin data)
- Last 100 IPC commands (anonymized — no file paths, no project data)
- Stack trace (if available from panic)
- Crash signal or panic message

Crash reports explicitly do NOT contain:
- Audio files or project data
- File system paths beyond the AUDIAW install path
- Plugin state data
- User personal information
- Network information

## 17.4 Data Integrity Systems

### 17.4.1 Project File Integrity

Every project section has a SHA-256 checksum stored in the manifest. On project open:
- Each section's checksum is verified before parsing
- Checksum mismatch: section is marked corrupted, AUDIAW attempts to use the last valid autosave for that section
- Total checksum (end of file): verifies no truncation occurred

### 17.4.2 Asset Integrity

Audio files are optionally verified on project load using stored content hashes:
- If the hash of the file on disk differs from the stored hash: AUDIAW warns "Asset may have been modified externally"
- User can: use anyway, locate original, or skip

---

# 18. DEVOPS & BUILD SYSTEM DOCUMENT

## 18.1 Build System Architecture

AUDIAW uses a **monorepo build system** combining Cargo (for Rust) and Turborepo (for frontend packages):

```
BUILD SYSTEM STACK

Turborepo (task orchestration)
    │
    ├─ Cargo (Rust workspace)
    │   ├─ audiaw-engine
    │   ├─ audiaw-audio-io
    │   ├─ audiaw-plugin-host
    │   ├─ audiaw-instruments
    │   └─ ... all Rust crates
    │
    ├─ pnpm (JS package management)
    │   ├─ apps/desktop/src (React/TypeScript frontend)
    │   ├─ packages/ui-components
    │   ├─ packages/theme
    │   └─ packages/ipc-types
    │
    └─ Tauri CLI (app bundling)
        ├─ cargo tauri build
        └─ Platform-specific bundling (NSIS, DMG, AppImage, .deb)
```

### 18.1.1 Build Profiles

```toml
# Cargo.toml workspace-level profiles

[profile.dev]
opt-level = 0
debug = true
# Audio engine: even in dev, some optimization needed for real-time audio
# Solution: per-crate override:

[profile.dev.package.audiaw-engine]
opt-level = 2           # Optimize the audio engine even in dev builds

[profile.dev.package.audiaw-instruments]
opt-level = 2

[profile.release]
opt-level = 3
lto = "fat"             # Link-time optimization for maximum performance
codegen-units = 1       # Single codegen unit for better LTO
strip = true            # Strip debug symbols (separate symbols package)
panic = "abort"         # No unwinding in release (saves ~5% binary size)

[profile.release-debug]
# Release performance, debug symbols retained — for profiling
inherits = "release"
debug = true
strip = false
```

### 18.1.2 Cross-Platform Build Targets

| Platform | Architecture | Build Host | Output |
|---|---|---|---|
| Windows x64 | x86_64-pc-windows-msvc | Windows or cross | `.msi`, `.exe` installer |
| Windows ARM64 | aarch64-pc-windows-msvc | Windows ARM | `.msi`, `.exe` installer |
| macOS x64 | x86_64-apple-darwin | macOS | `.dmg`, `.pkg` |
| macOS ARM64 | aarch64-apple-darwin | macOS ARM | `.dmg`, `.pkg` |
| macOS Universal | Universal binary | macOS | `.dmg`, `.pkg` |
| Linux x64 | x86_64-unknown-linux-gnu | Linux | `.deb`, `.rpm`, `.AppImage`, Flatpak |
| Linux ARM64 | aarch64-unknown-linux-gnu | Linux ARM | `.deb`, `.AppImage` |

**Cross-compilation strategy:**
- macOS builds must run on macOS (Apple SDK restriction)
- Linux builds use Docker containers with pinned base images for reproducibility
- Windows builds use GitHub Actions Windows runners
- ARM builds use QEMU-based cross-compilation for Linux; native Apple Silicon runners for macOS ARM

## 18.2 CI/CD Pipeline

### 18.2.1 CI Pipeline Structure

```yaml
# .github/workflows/ci.yml (simplified)

name: CI

on: [push, pull_request]

jobs:
  # Job 1: Rust lint and format
  rust-lint:
    runs-on: ubuntu-latest
    steps:
      - cargo fmt --check
      - cargo clippy --all-targets --all-features -- -D warnings
      - cargo audit                  # Security advisory check

  # Job 2: TypeScript lint and type-check
  ts-lint:
    runs-on: ubuntu-latest
    steps:
      - pnpm install
      - pnpm type-check
      - pnpm lint

  # Job 3: Rust unit tests (fast)
  rust-test:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - cargo test --workspace --exclude audiaw-audio-io  # Audio I/O requires hardware

  # Job 4: DSP regression tests
  dsp-regression:
    runs-on: ubuntu-latest
    steps:
      - cargo test --package audiaw-engine -- --test-threads=1
      - ./tools/benchmark/run_dsp_benchmarks.sh
      - ./tools/benchmark/compare_to_baseline.py  # Fails if > 5% regression

  # Job 5: Frontend tests
  frontend-test:
    runs-on: ubuntu-latest
    steps:
      - pnpm test --coverage

  # Job 6: Integration tests
  integration:
    runs-on: ubuntu-latest
    steps:
      - cargo test --package audiaw-integration --features=null-audio-backend

  # Job 7: Performance benchmarks (nightly only)
  benchmarks:
    if: github.event_name == 'schedule'
    runs-on: [self-hosted, performance-machine]
    steps:
      - cargo bench --package audiaw-engine
      - ./tools/benchmark/upload_results.py

  # Job 8: Build (on main branch or release tags)
  build:
    needs: [rust-lint, ts-lint, rust-test, dsp-regression, frontend-test]
    if: github.ref == 'refs/heads/main' || startsWith(github.ref, 'refs/tags/')
    strategy:
      matrix:
        include:
          - os: ubuntu-latest,  target: x86_64-unknown-linux-gnu
          - os: macos-latest,   target: universal-apple-darwin
          - os: windows-latest, target: x86_64-pc-windows-msvc
    steps:
      - pnpm build
      - cargo tauri build --target ${{ matrix.target }}
      - upload artifacts
```

### 18.2.2 Release Pipeline

```
RELEASE PROCESS

1. Create release branch: git checkout -b release/v1.2.0
2. Version bump: ./tools/release/bump_version.sh 1.2.0
   - Updates Cargo.toml versions (all workspace crates)
   - Updates package.json versions
   - Updates tauri.conf.json version
3. Generate changelog: git cliff --tag v1.2.0 > CHANGELOG.md
4. Create PR: release/v1.2.0 → main
5. PR passes CI (full test matrix)
6. Merge to main
7. Tag: git tag v1.2.0 && git push --tags
8. GitHub Actions release workflow triggered:
   a. Build all platform targets (parallel)
   b. Code-sign all binaries
   c. Package installers (.msi, .dmg, .deb, .rpm, .AppImage)
   d. Generate SHA-256 sums for all packages
   e. Sign update manifest with Ed25519 release key
   f. Upload to GitHub Releases
   g. Publish to Flathub (Linux)
   h. Publish to Homebrew Cask (macOS)
   i. Publish to winget (Windows)
   j. Update download page
9. Announce on Discord, forum, social media
```

### 18.2.3 Auto-Update System

AUDIAW uses Tauri's built-in updater with a custom backend:

```json
// Update manifest (served from update.audiaw.io)
{
  "version": "1.2.0",
  "notes": "Bug fixes and performance improvements",
  "pub_date": "2025-06-01T12:00:00Z",
  "platforms": {
    "windows-x86_64": {
      "signature": "Ed25519 signature...",
      "url": "https://cdn.audiaw.io/releases/v1.2.0/audiaw-1.2.0-x86_64.msi"
    },
    "darwin-aarch64": {
      "signature": "Ed25519 signature...",
      "url": "https://cdn.audiaw.io/releases/v1.2.0/audiaw-1.2.0-aarch64.dmg"
    }
  }
}
```

**Update channels:**
- **Stable:** Production-ready releases (recommended)
- **Beta:** Release candidates, may have minor issues
- **Nightly:** Automated nightly builds from main branch (for contributors and testers)

Users select their update channel in Preferences → Updates. Nightly updates are only available by explicit opt-in.

---

# 19. QA & TESTING DOCUMENTATION

## 19.1 Testing Philosophy

AUDIAW uses a **layered testing strategy** where each layer provides different coverage at different speeds:

```
TEST PYRAMID

                    ▲
               E2E Tests         (5%)
              /         \        Few but high-value
             /           \       (startup, project load, audio engine)
            /─────────────\
           Integration Tests      (20%)
          /               \       (cross-crate, IPC, plugin loading)
         /─────────────────\
        Unit Tests           (50%)  (DSP algorithms, data structures,
       /─────────────────────\       serialization, state management)
      /                       \
     DSP Regression Tests     (25%) (Audio algorithm correctness,
    /─────────────────────────\      numerical precision, SIMD equivalence)
```

## 19.2 DSP Regression Testing

DSP regression tests verify that audio algorithm outputs remain **numerically identical** across code changes. Any algorithm change that affects audio output must produce a new reference output file.

### 19.2.1 Reference Output System

```rust
// DSP regression test structure
#[cfg(test)]
mod tests {
    use super::*;
    use audiaw_test_utils::ReferenceOutput;

    #[test]
    fn test_biquad_lowpass_440hz_48000sr() {
        let filter = BiquadFilter::new(FilterType::LowPass, 440.0, 48000.0, 0.707);
        
        // Generate 1024 samples of white noise (fixed seed)
        let input = generate_white_noise(1024, seed: 12345);
        
        let mut output = vec![0.0f32; 1024];
        filter.process_block(&input, &mut output);
        
        // Compare against reference (stored in tests/references/biquad_lp_440_48000.bin)
        ReferenceOutput::assert_matches(
            "biquad_lp_440_48000",
            &output,
            tolerance: 1e-6,  // Must match within floating point tolerance
        );
    }
}
```

**Reference file management:**
- Reference files stored in `tests/audio-regression/references/`
- Generated by running tests with `AUDIAW_UPDATE_REFERENCES=1` env var
- Reference files are committed to git and reviewed in PRs that change DSP code
- Any PR that changes reference files requires maintainer review and explicit DSP change justification

### 19.2.2 SIMD Equivalence Testing

Every SIMD-optimized code path is tested for numerical equivalence with its scalar reference implementation:

```rust
#[test]
fn test_simd_gain_matches_scalar() {
    let input: Vec<f32> = (0..4096).map(|i| (i as f32 / 4096.0) * 2.0 - 1.0).collect();
    let gain = 0.5f32;
    
    // Scalar reference
    let scalar_output: Vec<f32> = input.iter().map(|s| s * gain).collect();
    
    // SIMD implementation (uses AVX2 on x86_64, NEON on ARM64)
    let simd_output = simd::apply_gain(&input, gain);
    
    // Verify exact match (gain is simple enough for exact float equality)
    assert_eq!(scalar_output, simd_output, 
        "SIMD gain result differs from scalar at current CPU feature level");
}
```

### 19.3 Realtime Safety Testing

The most insidious bugs in audio software are realtime safety violations. AUDIAW detects these in CI:

```
REALTIME SAFETY CI CHECK

1. Build with realtime-sanitizer (custom Rust toolchain extension)
   Instruments heap allocations, mutex acquisitions, blocking syscalls

2. Run headless audio session:
   - Load project with 32 tracks and 20 plugins
   - Play for 60 seconds at 64-sample buffer
   - Process 1000 parameter changes (simulated UI automation)
   - Process 100 plugin parameter updates
   - Trigger 3 track adds/removes (graph rebuilds)

3. Analyze sanitizer output:
   - Any heap allocation on audio thread: FAIL
   - Any mutex acquisition on audio thread: FAIL  
   - Any blocking syscall on audio thread: FAIL
   - Any unbounded loop on audio thread: FAIL (timeout detection)

4. If any violations: CI fails with detailed report of violation location
```

### 19.4 Plugin Compatibility Testing

AUDIAW maintains a **plugin compatibility matrix** tested in CI using a curated set of open-source and widely-available plugins:

```yaml
# .github/workflows/plugin-compat.yml
plugin-matrix:
  plugins:
    # CLAP plugins (open source)
    - name: Surge XT
      format: clap
      url: https://github.com/surge-synthesizer/surge/releases/...
      test: test_instrument_produces_audio + test_preset_load_save
    
    - name: Vital
      format: clap
      url: https://github.com/mtytel/vital/releases/...
      test: test_instrument_produces_audio + test_automation
    
    # LV2 plugins (open source, Linux)
    - name: ZaMultiComp
      format: lv2
      url: https://github.com/zamaudio/zamara/...
      test: test_effect_processes_audio + test_bypass
    
    # VST3 plugins (community-tested, not in CI binary due to licensing)
    # These are tested in the external compatibility matrix (manual)
```

### 19.5 Performance Regression Testing

Every CI run on main branch executes a **performance benchmark suite** and compares against the stored baseline:

```python
# tools/benchmark/compare_to_baseline.py
REGRESSIONS = {
    'startup_time_ms': { 'threshold_pct': 5 },      # 5% regression = fail
    'project_load_32tracks_ms': { 'threshold_pct': 10 },
    'audio_callback_1ms_budget_pct': { 'threshold_pct': 2 },  # Strict
    'waveform_render_32clips_ms': { 'threshold_pct': 5 },
    'piano_roll_5000notes_fps': { 'threshold_pct': 5 },
}
```

If any benchmark regresses beyond its threshold, CI fails and the PR cannot merge without maintainer justification.

---

# 20. OPEN SOURCE GOVERNANCE DOCUMENT

## 20.1 Governance Model

AUDIAW uses a **Meritocratic Governance Model** — decision-making authority is earned through sustained, high-quality contribution. The model has four tiers:

### 20.1.1 Tier 1: Contributors

Anyone who submits a merged pull request is a Contributor. Rights:
- File issues and feature requests
- Vote (advisory, non-binding) on RFC discussions
- Participate in community discussions
- Listed in CONTRIBUTORS.md

### 20.1.2 Tier 2: Trusted Contributors

Contributors who have merged 5+ non-trivial PRs over 3+ months. Nominated by maintainers, voted on by existing Trusted Contributors. Rights:
- All Contributor rights
- Triage issues (label, close duplicates/won't-fix)
- Request review on PRs
- Binding vote on non-architectural decisions
- Listed in TRUSTED_CONTRIBUTORS.md

### 20.1.3 Tier 3: Maintainers

Trusted Contributors with deep domain expertise. Selected by existing maintainers unanimously. Rights:
- All Trusted Contributor rights
- Merge PRs to main branch
- Binding vote on architectural decisions
- Commit access to release branches
- Listed in MAINTAINERS.md

**Domain maintainers:**
- Audio Engine Maintainer (Rust, realtime audio expertise required)
- Frontend Maintainer (TypeScript, React, UX expertise)
- Plugin System Maintainer (VST3/CLAP/AU/LV2 expertise)
- Platform Maintainer (Linux/macOS/Windows platform knowledge)
- Documentation Maintainer (technical writing, UX writing)
- Security Maintainer (security review, vulnerability management)

### 20.1.4 Tier 4: Project Lead

A single Project Lead has final authority on architectural direction, governance disputes, and release approval. The Project Lead role can be transferred by consensus of all Maintainers. The Project Lead is not an autocrat — all decisions are made through the RFC process, and the Lead's veto right is reserved for genuine safety/stability concerns.

## 20.2 RFC Process

Significant changes to AUDIAW (new features, API changes, architectural changes) require an **RFC (Request for Comments)**:

1. **Author drafts RFC** using the RFC template (`docs/rfcs/TEMPLATE.md`)
2. **RFC opened as PR** to `rfcs/` branch
3. **7-day comment period** — community feedback collected
4. **Maintainer vote** — must reach supermajority (⅔ of active maintainers)
5. **RFC merged** (accepted) or **closed** (declined)
6. Implementation can begin once RFC is merged

RFC template sections:
- Summary (2-paragraph overview)
- Motivation (why is this change needed?)
- Design (detailed technical proposal)
- Drawbacks (honest assessment of downsides)
- Alternatives (what else was considered?)
- Unresolved questions (what is still unknown?)

## 20.3 Coding Standards Enforcement

### 20.3.1 Automated Enforcement

```
AUTOMATED QUALITY GATES (must pass before merge)

Rust:
  cargo fmt --check           → Format consistency
  cargo clippy -D warnings    → Lint (all warnings are errors)
  cargo audit                 → No known security advisories
  cargo test --all            → All tests pass
  cargo doc --no-deps         → Documentation builds without warnings

TypeScript:
  eslint --max-warnings=0     → Zero lint warnings
  tsc --noEmit                → Type-check passes
  vitest run                  → All tests pass
  prettier --check            → Format consistency

Additional:
  No TODO/FIXME without issue reference
  No commented-out code
  No console.log in production code (use logger)
  PR size limit: < 500 lines changed (split large PRs)
```

### 20.3.2 Code Review Requirements

- All PRs require at least 1 maintainer approval
- Audio engine PRs require 2 maintainer approvals
- Any PR touching realtime audio code requires explicit "REALTIME-SAFE" sign-off
- Breaking API changes require RFC approval before PR can merge

## 20.4 Community Standards

AUDIAW follows the **Contributor Covenant v2.1** as its Code of Conduct. Enforcement:

- Minor violations: private warning from a moderator
- Moderate violations: temporary ban (7–30 days)
- Severe violations: permanent ban
- Safety-critical violations (sharing private information, targeted harassment): permanent immediate ban

Reports go to: conduct@audiaw.io — reviewed by Security Maintainer and at least one other Maintainer.

## 20.5 Licensing Strategy

| Component | License | Rationale |
|---|---|---|
| Core application | GPLv3 | Ensures all improvements remain open |
| Plugin SDK (`audiaw-plugin-sdk`) | MIT / Apache 2.0 | Enables commercial plugin development |
| Built-in instruments | GPLv3 | Part of core application |
| Built-in effects | GPLv3 | Part of core application |
| UI component library | MIT | Enables community UI projects |
| Documentation | CC BY 4.0 | Enables sharing and translation |
| Sample library | CC0 (Public Domain) | Maximum freedom for users |

The **dual-license plugin SDK** (MIT/Apache 2.0) is critical: it means commercial plugin developers can write plugins for AUDIAW without their code being subject to the GPLv3. The plugin interface boundary is clearly defined and does not infect plugin code.

---

# 21. COMPLETE REPOSITORY STRUCTURE

## 21.1 Full Repository Layout

```
audiaw/                                 ← Repository root
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                      # Main CI pipeline
│   │   ├── release.yml                 # Release build and signing
│   │   ├── nightly.yml                 # Nightly builds and benchmarks
│   │   ├── plugin-compat.yml           # Plugin compatibility matrix
│   │   ├── security-audit.yml          # cargo-audit + npm audit
│   │   └── docs.yml                    # Documentation deployment
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug-report.yml
│   │   ├── feature-request.yml
│   │   ├── audio-glitch-report.yml     # Specialized: buffer size, driver info
│   │   └── plugin-compatibility.yml    # Plugin compat reports
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── CODEOWNERS                      # Maintainer assignment by path
│   └── dependabot.yml                  # Automated dependency updates
│
├── apps/
│   ├── desktop/                        ← Main Tauri desktop application
│   │   ├── src-tauri/
│   │   │   ├── src/
│   │   │   │   ├── main.rs             # Entry point
│   │   │   │   ├── lib.rs              # Library root (for testing)
│   │   │   │   ├── app_state.rs        # Global application state
│   │   │   │   ├── setup.rs            # Initialization sequence
│   │   │   │   ├── commands/
│   │   │   │   │   ├── mod.rs
│   │   │   │   │   ├── project.rs      # Project commands (new, open, save)
│   │   │   │   │   ├── transport.rs    # Transport commands
│   │   │   │   │   ├── track.rs        # Track commands
│   │   │   │   │   ├── clip.rs         # Clip commands
│   │   │   │   │   ├── mixer.rs        # Mixer commands
│   │   │   │   │   ├── plugin.rs       # Plugin commands
│   │   │   │   │   ├── automation.rs   # Automation commands
│   │   │   │   │   ├── audio_device.rs # Audio device commands
│   │   │   │   │   ├── midi.rs         # MIDI device commands
│   │   │   │   │   └── settings.rs     # Settings commands
│   │   │   │   ├── events/
│   │   │   │   │   ├── mod.rs
│   │   │   │   │   ├── meter_emitter.rs
│   │   │   │   │   ├── transport_emitter.rs
│   │   │   │   │   └── plugin_emitter.rs
│   │   │   │   └── error.rs            # Error types and conversion
│   │   │   ├── Cargo.toml
│   │   │   ├── tauri.conf.json
│   │   │   ├── capabilities/           # Tauri v2 permission system
│   │   │   └── icons/                  # Platform icons (all sizes)
│   │   │
│   │   └── src/                        ← React/TypeScript frontend
│   │       ├── app/
│   │       │   ├── App.tsx
│   │       │   ├── Router.tsx
│   │       │   └── providers/
│   │       ├── components/
│   │       │   ├── transport/
│   │       │   │   ├── TransportBar.tsx
│   │       │   │   ├── PlayButton.tsx
│   │       │   │   ├── RecordButton.tsx
│   │       │   │   ├── BpmDisplay.tsx
│   │       │   │   └── TimecodeDisplay.tsx
│   │       │   ├── arrangement/
│   │       │   │   ├── ArrangementView.tsx
│   │       │   │   ├── TrackList.tsx
│   │       │   │   ├── TrackHeader.tsx
│   │       │   │   ├── TimelineLane.tsx
│   │       │   │   ├── AudioClip.tsx
│   │       │   │   ├── MidiClip.tsx
│   │       │   │   ├── Ruler.tsx
│   │       │   │   ├── Playhead.tsx
│   │       │   │   └── MiniTimeline.tsx
│   │       │   ├── mixer/
│   │       │   │   ├── MixerView.tsx
│   │       │   │   ├── ChannelStrip.tsx
│   │       │   │   ├── Fader.tsx
│   │       │   │   ├── PanKnob.tsx
│   │       │   │   ├── LevelMeter.tsx
│   │       │   │   ├── InsertSlot.tsx
│   │       │   │   └── SendSlot.tsx
│   │       │   ├── piano-roll/
│   │       │   │   ├── PianoRollView.tsx
│   │       │   │   ├── PianoKeys.tsx
│   │       │   │   ├── NoteGrid.tsx
│   │       │   │   ├── MidiNote.tsx
│   │       │   │   ├── VelocityEditor.tsx
│   │       │   │   └── QuantizeSelector.tsx
│   │       │   ├── browser/
│   │       │   │   ├── Browser.tsx
│   │       │   │   ├── AssetList.tsx
│   │       │   │   ├── PluginList.tsx
│   │       │   │   ├── PresetList.tsx
│   │       │   │   ├── SearchBar.tsx
│   │       │   │   ├── FilterPanel.tsx
│   │       │   │   └── PreviewPlayer.tsx
│   │       │   ├── device-view/
│   │       │   │   ├── DeviceView.tsx
│   │       │   │   ├── DeviceChain.tsx
│   │       │   │   ├── DeviceCard.tsx
│   │       │   │   └── ModulationRouting.tsx
│   │       │   ├── automation/
│   │       │   │   ├── AutomationView.tsx
│   │       │   │   ├── AutomationLane.tsx
│   │       │   │   └── AutomationCurve.tsx
│   │       │   ├── clip-launcher/
│   │       │   │   ├── ClipLauncherView.tsx
│   │       │   │   ├── ClipCell.tsx
│   │       │   │   └── SceneRow.tsx
│   │       │   └── shared/
│   │       │       ├── Knob.tsx
│   │       │       ├── Slider.tsx
│   │       │       ├── ContextMenu.tsx
│   │       │       ├── Modal.tsx
│   │       │       ├── Tooltip.tsx
│   │       │       └── ColorPicker.tsx
│   │       ├── hooks/
│   │       │   ├── useTransport.ts
│   │       │   ├── useProject.ts
│   │       │   ├── useTracks.ts
│   │       │   ├── useAudioDevice.ts
│   │       │   ├── useKeybindings.ts
│   │       │   └── useDragDrop.ts
│   │       ├── stores/
│   │       │   ├── project.store.ts
│   │       │   ├── transport.store.ts
│   │       │   ├── tracks.store.ts
│   │       │   ├── mixer.store.ts
│   │       │   ├── ui.store.ts
│   │       │   └── settings.store.ts
│   │       ├── sync/
│   │       │   ├── ProjectSync.ts      # Backend → store sync layer
│   │       │   ├── TransportSync.ts
│   │       │   └── MeterSync.ts
│   │       ├── ipc/
│   │       │   ├── commands.ts         # Generated IPC command bindings
│   │       │   └── events.ts           # Generated IPC event listeners
│   │       ├── workers/
│   │       │   └── waveform.worker.ts  # Web Worker for waveform processing
│   │       └── main.tsx
│   │
│   └── cli/                            ← audiaw CLI tool (diagnostics, etc.)
│       └── src/
│           ├── main.rs
│           ├── diagnose.rs             # System diagnostics command
│           ├── render.rs               # Headless render command
│           └── validate_plugin.rs      # Plugin validation command
│
├── crates/
│   ├── audiaw-engine/
│   │   ├── src/
│   │   │   ├── lib.rs
│   │   │   ├── graph/
│   │   │   │   ├── mod.rs
│   │   │   │   ├── audio_graph.rs
│   │   │   │   ├── node.rs             # AudioNode trait
│   │   │   │   ├── edge.rs
│   │   │   │   ├── topo_sort.rs
│   │   │   │   ├── scheduler.rs        # Work-stealing scheduler
│   │   │   │   └── buffer_pool.rs      # Pre-allocated buffer pool
│   │   │   ├── dsp/
│   │   │   │   ├── mod.rs
│   │   │   │   ├── simd/
│   │   │   │   │   ├── mod.rs
│   │   │   │   │   ├── avx2.rs
│   │   │   │   │   ├── sse4.rs
│   │   │   │   │   └── neon.rs
│   │   │   │   ├── biquad.rs
│   │   │   │   ├── svf.rs
│   │   │   │   ├── dc_blocker.rs
│   │   │   │   ├── limiter.rs
│   │   │   │   ├── gain.rs
│   │   │   │   └── metering.rs
│   │   │   ├── transport/
│   │   │   │   ├── mod.rs
│   │   │   │   ├── transport_state.rs
│   │   │   │   └── tempo_map.rs
│   │   │   ├── midi/
│   │   │   │   ├── mod.rs
│   │   │   │   ├── event.rs
│   │   │   │   └── processor.rs
│   │   │   └── clip_trigger.rs         # Quantized clip launching
│   │   ├── benches/
│   │   │   ├── biquad_bench.rs
│   │   │   ├── graph_bench.rs
│   │   │   └── scheduler_bench.rs
│   │   └── Cargo.toml
│   │
│   ├── audiaw-audio-io/               ← Platform audio I/O
│   ├── audiaw-plugin-host/            ← Plugin hosting
│   ├── audiaw-project/                ← Project format
│   ├── audiaw-instruments/            ← Built-in instruments
│   ├── audiaw-effects/                ← Built-in effects
│   ├── audiaw-render/                 ← GPU waveform rendering
│   ├── audiaw-midi/                   ← MIDI I/O
│   ├── audiaw-types/                  ← Shared types (no external deps)
│   └── audiaw-diagnostics/            ← System diagnostics
│
├── packages/
│   ├── ui-components/                  ← Shared React components
│   │   ├── src/
│   │   │   ├── Knob/
│   │   │   ├── Slider/
│   │   │   ├── Button/
│   │   │   └── index.ts
│   │   └── package.json
│   ├── icons/                          ← Icon library
│   │   ├── src/
│   │   │   ├── icons/                  # SVG source files
│   │   │   └── index.ts                # React components
│   │   └── package.json
│   ├── theme/                          ← Design tokens
│   │   ├── tokens/
│   │   │   ├── dark.json
│   │   │   └── light.json
│   │   ├── src/
│   │   │   └── index.ts
│   │   └── package.json
│   └── ipc-types/                      ← Generated IPC types
│       ├── src/
│       │   └── generated/              # Auto-generated, do not edit
│       └── package.json
│
├── tools/
│   ├── codegen/                        ← Type generation (Rust → TypeScript)
│   │   ├── src/
│   │   │   └── main.rs
│   │   └── Cargo.toml
│   ├── benchmark/
│   │   ├── run_dsp_benchmarks.sh
│   │   └── compare_to_baseline.py
│   ├── plugin-validator/               ← CLI plugin validation tool
│   └── release/
│       ├── bump_version.sh
│       └── generate_changelog.sh
│
├── docs/
│   ├── architecture/                   ← Architecture documents (this file)
│   │   ├── vol1-prd-architecture-audio-engine.md
│   │   ├── vol2-ux-user-flows-plugins.md
│   │   ├── vol3-project-performance-live-instruments.md
│   │   └── vol4-systems-standards-governance-roadmap.md
│   ├── contributing/
│   │   ├── CONTRIBUTING.md
│   │   ├── DEVELOPMENT_SETUP.md
│   │   ├── REALTIME_SAFETY.md          ← Critical reading for audio PRs
│   │   ├── CODE_REVIEW_GUIDE.md
│   │   └── FIRST_CONTRIBUTION.md
│   ├── user-guide/
│   │   ├── getting-started.md
│   │   ├── interface-overview.md
│   │   ├── arrangement-view.md
│   │   ├── piano-roll.md
│   │   ├── mixer.md
│   │   ├── instruments/
│   │   └── effects/
│   ├── rfcs/                           ← RFC proposals
│   │   └── TEMPLATE.md
│   ├── api/                            ← Generated API docs
│   └── specs/
│       ├── ipc-schema.json             ← Source of truth for IPC API
│       ├── project-format.md
│       └── plugin-sdk.md
│
├── tests/
│   ├── integration/                    ← Cross-crate integration tests
│   ├── audio-regression/               ← DSP regression test suite
│   │   ├── references/                 # Reference output files
│   │   └── tests/
│   ├── plugin-compat/                  ← Plugin compatibility tests
│   └── performance/                    ← Performance regression tests
│
├── assets/
│   ├── samples/                        ← Bundled sample library (CC0)
│   │   ├── drums/
│   │   ├── bass/
│   │   ├── synths/
│   │   └── sfx/
│   ├── presets/                        ← Default presets for all instruments
│   ├── templates/                      ← Project templates by genre
│   └── icons/
│       ├── icon.png                    # 1024×1024 source
│       ├── icon.ico                    # Windows
│       ├── icon.icns                   # macOS
│       └── icon.svg                    # Source vector
│
├── Cargo.toml                          # Workspace manifest
├── Cargo.lock
├── package.json                        # pnpm workspace root
├── pnpm-workspace.yaml
├── turbo.json                          # Turborepo pipeline config
├── rust-toolchain.toml                 # Pinned: stable-2025-XX-XX
├── .clippy.toml                        # Clippy configuration
├── .rustfmt.toml                       # Rustfmt configuration
├── .eslintrc.json                      # ESLint configuration
├── tsconfig.base.json                  # Shared TypeScript config
├── LICENSE                             # GPLv3
├── LICENSE-MIT                         # MIT (for plugin SDK)
├── CHANGELOG.md                        # Generated by git-cliff
├── CONTRIBUTING.md                     # Top-level contributor entry point
├── CODE_OF_CONDUCT.md
├── SECURITY.md                         # Security disclosure policy
└── README.md
```

---

# 22. ENGINEERING STANDARDS

## 22.1 Rust Coding Standards

### 22.1.1 Safety and Correctness

**No `unsafe` without justification:** Every `unsafe` block must have a comment explaining:
1. Why `unsafe` is necessary here
2. What invariants guarantee this is sound
3. A link to the relevant documentation or safety proof

```rust
// GOOD: Justified unsafe with invariant documentation
// SAFETY: We have exclusive access to this buffer for the duration of the
// audio callback. The buffer is initialized by the audio backend before
// our callback is invoked, and the size is guaranteed to match buffer_size.
// See: crates/audiaw-audio-io/src/cpal_backend.rs:process_audio_callback
let samples = unsafe {
    std::slice::from_raw_parts_mut(raw_ptr, buffer_size * channel_count)
};

// BAD: Unexplained unsafe
let samples = unsafe { std::slice::from_raw_parts_mut(raw_ptr, n) };
```

**Error handling:** `unwrap()` and `expect()` are permitted in tests and examples. In production code, they are only permitted where the invariant that makes the operation safe is established at the call site and documented:

```rust
// GOOD: unwrap with invariant documentation
// INVARIANT: The audio engine is always initialized before any command handler
// can be called. See setup.rs:initialize_audio_engine.
let engine = self.engine.lock().expect("Audio engine mutex poisoned");

// BAD: unexplained unwrap
let engine = self.engine.lock().unwrap();

// PREFERRED: Proper error propagation
let engine = self.engine.lock()
    .map_err(|_| AudiowError::EngineLockPoisoned)?;
```

### 22.1.2 Performance Standards

**Avoid clone in hot paths:** Use references and lifetimes. If cloning is necessary in a path called more than once per audio buffer, document why it is acceptable.

**Prefer stack allocation:** For small, fixed-size data structures in hot paths, avoid `Box<T>` and prefer stack values or fixed-size arrays.

**Profile before optimizing:** Optimization requires measurement. Never optimize "by intuition" in the audio path — use `cargo flamegraph` or `perf` to identify actual hotspots before changing code for performance reasons.

### 22.1.3 Documentation Standards

All public items in all crates must have documentation comments:

```rust
/// A biquad filter implementation using the State Variable Filter (SVF) topology.
///
/// This implementation is based on the Cytomic SVF design by Andrew Simper,
/// which provides stability at all Q values and minimal coefficient computation
/// overhead per sample.
///
/// # Realtime Safety
/// `process_sample` and `process_block` are realtime-safe. `set_coefficients`
/// triggers coefficient recomputation and is also realtime-safe (no allocation).
///
/// # Example
/// ```rust
/// let mut filter = SvfFilter::new(SvfMode::LowPass);
/// filter.set_coefficients(440.0, 0.707, 48000.0);
/// let output = filter.process_sample(0.5);
/// ```
pub struct SvfFilter {
    // ...
}
```

**Every public function must document:**
- What it does
- Parameters and their valid ranges
- Return value
- Whether it is realtime-safe (for audio-path functions)
- Panics (if any, and under what conditions)
- Errors (if it returns Result)

## 22.2 TypeScript Standards

### 22.2.1 Type Safety

**No `any`:** `any` types are banned via ESLint. If a third-party library type is inadequate, write a local type override (`declare module './lib' { ... }`).

**Prefer `unknown` over `any` for external data:** IPC events from the backend are typed as `unknown` and narrowed with type guards before use:

```typescript
// GOOD: Type-narrow external data
function isTrackStateChangedEvent(e: unknown): e is TrackStateChangedEvent {
  return typeof e === 'object' && e !== null 
    && 'trackId' in e && 'changes' in e;
}

listen('project:track_state_changed', (event) => {
  if (!isTrackStateChangedEvent(event.payload)) {
    console.error('Unexpected event shape:', event.payload);
    return;
  }
  store.syncTrackState(event.payload);
});

// BAD: Unchecked cast
listen('project:track_state_changed', (event) => {
  store.syncTrackState(event.payload as TrackStateChangedEvent);
});
```

### 22.2.2 Component Standards

**Component file structure:**
```typescript
// 1. Imports (external, then internal, then relative)
import React, { useState, useCallback } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { useProjectStore } from '@/stores/project.store';
import { TrackHeader } from './TrackHeader';

// 2. Types and interfaces (component-specific)
interface TrackViewProps {
  trackId: TrackId;
  height: number;
}

// 3. Component implementation
export const TrackView: React.FC<TrackViewProps> = ({ trackId, height }) => {
  // ...
};

// 4. No default exports (named exports only, for refactoring safety)
```

**Performance requirements for React components:**
- Components that render inside the virtualized track list must be memoized with `React.memo`
- Callbacks passed to child components must be memoized with `useCallback`
- Expensive computed values must use `useMemo` with correct dependency arrays
- No inline object/function creation in JSX for frequently-updating components

## 22.3 Realtime Safety Standards

The following rules apply to ALL code in the audio callback chain. Violations are treated as critical bugs:

**The Ten Commandments of AUDIAW Realtime Code:**

1. `thou shalt not allocate` — No Box::new, Vec::new, String::new, format!, or any heap allocation
2. `thou shalt not lock` — No Mutex::lock, RwLock::write, or any blocking synchronization
3. `thou shalt not call blocking I/O` — No file reads, network calls, or syscalls that may block
4. `thou shalt not println` — Use the async logging ring buffer
5. `thou shalt not panic in release` — All Result types must be handled; use Result return types
6. `thou shalt not loop without bound` — All loops must have computable, bounded iteration counts
7. `thou shalt not call sleep` — No thread::sleep or park or block_on
8. `thou shalt not produce NaN or Inf` — Validate inputs, clamp outputs. NaN is contagious.
9. `thou shalt not use dynamic dispatch unexpectedly` — vtable calls are acceptable; deeply recursive dynamic dispatch is not
10. `thou shalt document thy realtime-safety` — Every function in the audio path must declare its safety status in its doc comment

---

# 23. INTERNAL API DOCUMENTATION

## 23.1 IPC Command API Reference

All IPC commands follow the pattern: `domain.action` and return `Result<ResponseType, AudiowError>`.

### 23.1.1 Transport Commands

```typescript
// Start or resume playback
invoke<void>('transport.play')

// Stop playback and return to playhead position
invoke<void>('transport.stop')

// Start recording on all armed tracks
invoke<void>('transport.record')

// Move playhead to position
invoke<void>('transport.seek', { position: SamplePosition })

// Set playback tempo
invoke<void>('transport.set_tempo', { bpm: number })

// Set loop range
invoke<void>('transport.set_loop', {
  start: SamplePosition,
  end: SamplePosition,
  enabled: boolean
})

// Get current transport state snapshot
invoke<TransportState>('transport.get_state')
```

### 23.1.2 Track Commands

```typescript
// Create a new track
invoke<Track>('track.create', {
  trackType: TrackType,
  name?: string,
  insertAfterTrackId?: TrackId,
})

// Delete tracks
invoke<void>('track.delete', { trackIds: TrackId[] })

// Rename a track
invoke<void>('track.rename', { trackId: TrackId, name: string })

// Set track volume
invoke<void>('track.set_volume', { trackId: TrackId, volumeDb: number })

// Set track pan
invoke<void>('track.set_pan', { trackId: TrackId, pan: number })

// Mute/unmute tracks
invoke<void>('track.set_mute', { trackIds: TrackId[], mute: boolean })

// Solo/unsolo tracks
invoke<void>('track.set_solo', { trackIds: TrackId[], solo: boolean })

// Record arm/disarm tracks
invoke<void>('track.set_armed', { trackIds: TrackId[], armed: boolean })

// Reorder tracks (move to new position)
invoke<void>('track.reorder', {
  trackId: TrackId,
  newIndex: number,
})

// Add device (plugin or built-in) to track chain
invoke<DeviceInstance>('track.add_device', {
  trackId: TrackId,
  deviceType: DeviceType,
  insertAtIndex?: number,
})
```

### 23.1.3 Plugin Commands

```typescript
// Get list of installed plugins (from cache)
invoke<PluginInfo[]>('plugin.get_installed')

// Load a plugin instance on a track
invoke<PluginInstanceId>('plugin.load', {
  trackId: TrackId,
  pluginId: PluginId,
  chainIndex?: number,
})

// Unload a plugin instance
invoke<void>('plugin.unload', { instanceId: PluginInstanceId })

// Set plugin parameter value
invoke<void>('plugin.set_param', {
  instanceId: PluginInstanceId,
  paramId: ParamId,
  value: number,        // Normalized 0.0–1.0
})

// Get all parameter values for a plugin
invoke<ParamState[]>('plugin.get_params', { instanceId: PluginInstanceId })

// Save plugin state as preset
invoke<PresetId>('plugin.save_preset', {
  instanceId: PluginInstanceId,
  name: string,
  tags?: string[],
})

// Load a preset into a plugin
invoke<void>('plugin.load_preset', {
  instanceId: PluginInstanceId,
  presetId: PresetId,
})

// Rescan plugins (background task)
invoke<void>('plugin.trigger_rescan', { paths?: string[] })

// Get scan progress
invoke<ScanProgress>('plugin.get_scan_progress')
```

## 23.2 IPC Event Reference

```typescript
// === Transport Events ===

// Emitted when play state changes
listen<TransportStateChangedEvent>('transport:state_changed', handler)
// Payload: { state: 'playing' | 'stopped' | 'recording', position: SamplePosition }

// Emitted at 60 Hz during playback with playhead position
listen<PlayheadPositionEvent>('transport:playhead', handler)
// Payload: { position: SamplePosition, tempo: number }

// === Audio Events ===

// Emitted at 60 Hz with level meter values for all channels
listen<LevelMeterEvent>('audio:meters', handler)
// Payload: { channels: ChannelMeterData[] }

// Emitted when an audio dropout (buffer underrun) is detected
listen<AudioDropoutEvent>('audio:dropout', handler)
// Payload: { timestamp: number, cpuLoad: number, bufferSize: number }

// Emitted when audio device changes
listen<AudioDeviceChangedEvent>('audio:device_changed', handler)

// === Project Events ===

// Emitted when project state changes (track added, clip moved, etc.)
listen<ProjectStateChangedEvent>('project:state_changed', handler)

// Emitted when autosave completes
listen<AutosaveEvent>('project:autosave', handler)
// Payload: { success: boolean, timestamp: number }

// === Plugin Events ===

// Emitted when a plugin crashes
listen<PluginCrashedEvent>('plugin:crashed', handler)
// Payload: { instanceId: PluginInstanceId, pluginName: string, trackName: string }

// Emitted when plugin scan makes progress
listen<PluginScanProgressEvent>('plugin:scan_progress', handler)

// Emitted when plugin UI window is opened by plugin itself
listen<PluginWindowEvent>('plugin:window_opened', handler)
```

## 23.3 Audio Engine Rust API

The internal audio engine API (used by the Tauri bridge):

```rust
/// The top-level audio engine handle. All audio operations go through here.
pub struct AudioEngine {
    graph: Arc<Mutex<AudioGraph>>,           // NOTE: Only for non-realtime ops
    scheduler: Arc<AudioScheduler>,          // The realtime scheduler
    transport: Arc<TransportState>,          // Atomic transport state
    device: Arc<dyn AudioDevice>,            // Platform audio device
    plugin_host: Arc<PluginHost>,            // Plugin process manager
    project: Arc<Mutex<ProjectState>>,       // Current project
}

impl AudioEngine {
    /// Initialize the audio engine with the given configuration.
    /// Must be called once before any other method.
    pub async fn initialize(config: AudioEngineConfig) -> Result<Self, AudioError>;
    
    /// Load a project. Replaces the current project.
    /// This rebuilds the audio graph (non-realtime operation).
    pub async fn load_project(&self, project: Project) -> Result<(), AudioError>;
    
    /// Add a track to the current project.
    /// Rebuilds affected graph regions atomically.
    pub async fn add_track(&self, spec: TrackSpec) -> Result<Track, AudioError>;
    
    /// Remove tracks from the current project.
    pub async fn remove_tracks(&self, ids: &[TrackId]) -> Result<(), AudioError>;
    
    /// Send a parameter update to a plugin instance.
    /// This is lock-free and can be called from any thread.
    pub fn send_param_update(&self, update: ParamUpdate);
    
    /// Start playback.
    pub fn play(&self);
    
    /// Stop playback.
    pub fn stop(&self);
    
    /// Begin recording on all armed tracks.
    pub fn record(&self);
    
    /// Get the current transport state snapshot.
    pub fn transport_state(&self) -> TransportSnapshot;
    
    /// Subscribe to meter events.
    /// The callback is called from the audio thread. MUST be realtime-safe.
    pub fn subscribe_meters(&self, callback: Arc<dyn MeterCallback>);
    
    /// Query current CPU load of the audio processing graph.
    pub fn cpu_load(&self) -> f32;
}
```

---

# 24. RELEASE ROADMAP

## 24.1 Roadmap Philosophy

AUDIAW's roadmap is organized around **quality milestones, not feature lists.** Each release must meet specific quality gates before shipping, regardless of feature completeness. A release with fewer features and better stability is always preferred over a release with more features and more bugs.

## 24.2 MVP — v0.1 (Internal Alpha)

**Timeline:** Months 1–6  
**Goal:** Prove the core architecture is viable. Not user-facing.  
**Quality gate:** Must pass the realtime safety test suite. Must not crash during a 30-minute audio session.

**Scope:**
- ✓ Core audio graph (8-track limit for MVP)
- ✓ CPAL audio I/O (macOS CoreAudio + WASAPI)
- ✓ Basic MIDI processing
- ✓ Arrangement view (basic, no GPU rendering)
- ✓ Single built-in instrument (basic sampler)
- ✓ Basic project save/load
- ✓ Transport (play/stop/record)
- ✓ Tauri application shell + React UI
- ✓ IPC communication working
- ✗ Plugin hosting (not in MVP)
- ✗ Mixer view (not in MVP)
- ✗ Piano roll (not in MVP)
- ✗ Linux support (not in MVP)

**Internal testing:** Core team only. 5–10 engineers.

## 24.3 Alpha — v0.5

**Timeline:** Months 7–12  
**Goal:** Functional enough for internal daily use. Selected external testers.  
**Quality gate:** 0 known P0 crashes in 10-hour session. < 5ms latency on ASIO/CoreAudio.

**New in v0.5:**
- ✓ Piano Roll (full MIDI editing)
- ✓ Mixer view (basic channel strips)
- ✓ VST3 plugin hosting (crash isolation)
- ✓ CLAP plugin hosting
- ✓ Linux support (PipeWire + JACK)
- ✓ GPU waveform rendering (WGPU)
- ✓ Basic automation editor
- ✓ Wavetable synthesizer (built-in)
- ✓ Drum machine (built-in)
- ✓ Sample browser with indexing
- ✓ Theme system (dark + light)
- ✓ Autosave system
- ✓ Crash recovery
- ✗ LV2 support (not in alpha)
- ✗ Live performance mode (not in alpha)
- ✗ Clip launcher (not in alpha)

**External testing:** ~100 selected beta testers. Private Discord channel. Bug bounty program (community rewards for found bugs, not monetary).

## 24.4 Beta — v0.9

**Timeline:** Months 13–18  
**Goal:** Production-quality for non-critical sessions. Public beta.  
**Quality gate:** 0 P0 crashes in community reports over 2 weeks. Full test suite passing on all platforms.

**New in v0.9:**
- ✓ LV2 plugin support (Linux)
- ✓ AU plugin support (macOS)
- ✓ Clip launcher (live performance mode)
- ✓ FM synthesizer (built-in)
- ✓ Granular synthesizer (built-in)
- ✓ Full effects library (EQ, Compressor, Reverb, Delay, Chorus, Saturation)
- ✓ Modulation routing system
- ✓ Macro controls
- ✓ Hardware controller mapping (MIDI Learn)
- ✓ Command palette
- ✓ Custom keybinding system
- ✓ Plugin preset system
- ✓ Export (WAV, FLAC, MP3, stems)
- ✓ LUFS metering (I, S, M, TP)
- ✓ Template system (6 genre templates)
- ✓ Video sync (basic — import video, lock timeline)
- ✓ Accessibility (keyboard navigation, screen reader basics)

**Public beta:** Open download. Active community Discord. Weekly fix releases.

## 24.5 Stable — v1.0

**Timeline:** Month 18–24  
**Goal:** Production-ready for professional use.  
**Quality gate:** 99.5% crash-free session rate in telemetry. Full test suite + plugin compatibility matrix passing. Performance targets met on all platforms.

**New in v1.0:**
- ✓ All platforms at parity (Windows, macOS, Linux — equal feature support)
- ✓ Full SMPTE timecode sync (MTC in/out)
- ✓ Hardware control surface support (MCU protocol)
- ✓ Project compatibility guarantee (v1.x projects open in all future v1 versions)
- ✓ Plugin SDK published (developers can build plugins targeting AUDIAW)
- ✓ Complete documentation (user guide, tutorial videos, API docs)
- ✓ Ableton/FL/Logic keybinding presets
- ✓ Accessibility: WCAG 2.1 AA compliance
- ✓ Podcast workflow mode
- ✓ Ableton Link support

**Distribution:**
- Direct download from audiaw.io
- Homebrew Cask (macOS)
- winget (Windows)
- Flatpak (Linux, on Flathub)
- .deb/.rpm packages (Linux)

## 24.6 v1.5 — Plugin Marketplace

**Timeline:** Month 25–30

**New in v1.5:**
- ✓ Community plugin browser (in-app discovery of community CLAP plugins)
- ✓ Plugin rating and review system
- ✓ Plugin update notifications
- ✓ AUDIAW Plugin SDK 1.0 — stable, documented, versioned
- ✓ Nested device containers (Parallel Chain, A/B Compare)
- ✓ Video export with timecode
- ✓ Score/notation view (basic — MIDI-to-notation display, not editing)
- ✓ Spectral editing tools (basic)
- ✓ Patch notes in project file (annotate sessions)

## 24.7 v2.0 — Collaborative Future

**Timeline:** Month 30–42

**v2.0 aspirations (subject to community input):**
- ✓ Real-time collaboration (shared project editing, similar to Figma model)
- ✓ Score/notation editor (full notation editing, MusicXML export)
- ✓ AI-assisted features (opt-in): smart quantization, pitch correction, arrangement suggestions
- ✓ Cloud project storage (opt-in, end-to-end encrypted)
- ✓ Transcript-based audio editing (for podcasts: edit audio by editing text)
- ✓ Mobile companion app (iOS/Android) for MIDI control and remote monitoring
- ✓ Hardware integrations (direct integration with specific synthesizer manufacturers)
- ✓ Modular synthesis environment (visual patching, inspired by VCV Rack)

---

## APPENDIX A: Technology Dependency Registry

| Dependency | Version (pinned) | License | Domain | Notes |
|---|---|---|---|---|
| Tauri | 2.x | MIT/Apache 2.0 | App shell | Desktop framework |
| React | 18.x | MIT | UI | Frontend framework |
| TypeScript | 5.x | Apache 2.0 | UI | Type system |
| Zustand | 4.x | MIT | UI | State management |
| Tailwind CSS | 3.x | MIT | UI | Utility CSS |
| CPAL | 0.15.x | Apache 2.0 | Audio | Audio I/O |
| WGPU | 0.19.x | MIT/Apache 2.0 | Rendering | GPU rendering |
| Tokio | 1.x | MIT | Async | Async runtime |
| Serde | 1.x | MIT/Apache 2.0 | Serialization | Data serialization |
| rmp-serde | 1.x | MIT | Serialization | MessagePack |
| SQLite (rusqlite) | 0.31.x | MIT | Storage | Asset index |
| zstd | 0.13.x | BSD/GPL | Compression | Data compression |
| Arc-Swap | 1.x | MIT/Apache 2.0 | Concurrency | Atomic pointer swap |
| Crossbeam | 0.8.x | MIT/Apache 2.0 | Concurrency | Lock-free structures |
| Clap (CLI) | 4.x | MIT/Apache 2.0 | CLI | CLI argument parsing |
| git-cliff | 1.x | MIT | DevOps | Changelog generation |
| Turborepo | 1.x | MIT | Build | Monorepo orchestration |

---

## APPENDIX B: Performance Monitoring Dashboard

**Metrics continuously tracked in production (opt-in telemetry):**

```
Telemetry Schema (anonymized, no personal data):

session_start_event:
  - audiaw_version: string
  - platform: string (os-arch, e.g., "linux-x64")
  - audio_backend: string
  - startup_time_ms: number
  - ram_at_start_mb: number

audio_performance_sample (every 5 minutes):
  - cpu_load_audio_thread_pct: number
  - cpu_load_ui_thread_pct: number
  - dropout_count_since_last: number
  - buffer_size: number
  - sample_rate: number
  - active_track_count: number
  - active_plugin_count: number

plugin_crash_event:
  - plugin_format: string (vst3/clap/au/lv2)
  - audiaw_version: string
  - platform: string
  - was_recovered: boolean

session_end_event:
  - session_duration_minutes: number
  - crash_occurred: boolean
  - project_size_tracks: number
```

All telemetry is:
- Opt-in (default: off)
- Fully anonymized (no user ID, no project data, no file paths)
- Described in full in the privacy policy
- Used only for performance regression detection and crash prioritization

---

*This concludes the AUDIAW Master Documentation Ecosystem — Volume IV.*  
*Total documentation: ~80,000 words across four volumes.*  
*This document is a living artifact. Update dates and version numbers are tracked in the repository.*

**AUDIAW Core Architecture Team**  
*"Build the tool you wish existed."*