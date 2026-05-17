# AUDIAW — MASTER DOCUMENTATION ECOSYSTEM
## Volume III: Project File Format, Performance Engineering, Live Performance & Built-in Instruments

**Classification:** Internal Engineering Documentation  
**Version:** 0.1.0-draft  
**Continues from:** Volume II (UX System, User Flows, Plugin Architecture)

---

## TABLE OF CONTENTS — VOLUME III

9.  [Project File Format Specification](#9-project-file-format-specification)
10. [Performance Engineering Document](#10-performance-engineering-document)
11. [Live Performance System Document](#11-live-performance-system-document)
12. [Built-in Synth & DSP Documentation](#12-built-in-synth--dsp-documentation)

---

# 9. PROJECT FILE FORMAT SPECIFICATION

## 9.1 Design Philosophy

The AUDIAW project file format is built on five non-negotiable requirements:

**1. Portability.** A project file created on Linux must open identically on macOS and Windows. No absolute paths. No OS-specific identifiers. No platform-native encodings embedded in binary blobs.

**2. Versionability.** Every project file carries its schema version. Migrations are deterministic, documented, and fully tested. A project from AUDIAW v1.0 must open in AUDIAW v5.0 without manual intervention.

**3. Recoverability.** A partially written or corrupted project file must yield the maximum recoverable state. The format is designed so that truncation, partial write failure, or individual section corruption degrades gracefully rather than causing total loss.

**4. Performance.** Large projects (100+ tracks, thousands of clips, millions of automation points) must load in under 15 seconds on consumer hardware. The format is designed for efficient parsing: indexed access to large data sections, lazy-loading for sample data, and compressed storage for dense data.

**5. Auditability.** The project format must be inspectable by humans and parseable by third-party tools. This supports ecosystem development (import/export tools, version diffing, backup scripts) and community trust.

## 9.2 File Format Architecture

### 9.2.1 Container Structure

AUDIAW project files use a **custom container format** (`.audiaw`) with the following structure:

```
AUDIAW Project Container (.audiaw)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[MAGIC BYTES]  8 bytes   "AUDIAW\0\0"
[VERSION]      4 bytes   u32, format version (current: 1)
[FLAGS]        4 bytes   Bitfield: compression, encryption, etc.
[MANIFEST]     variable  JSON manifest (index of sections)
[SECTION: core]          Core project data (MessagePack)
[SECTION: tracks]        Track definitions (MessagePack)
[SECTION: clips]         Clip data (MessagePack)
[SECTION: automation]    Automation data (compressed, MessagePack)
[SECTION: plugins]       Plugin state blobs (opaque, per-plugin)
[SECTION: mixer]         Mixer state (MessagePack)
[SECTION: assets]        Bundled assets (optional, zstd compressed)
[SECTION: undo]          Undo history (MessagePack, optional)
[SECTION: metadata]      User notes, cover art, tags
[CHECKSUM]     32 bytes  SHA-256 of all preceding content

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Why not plain ZIP (like many DAWs)?**

ZIP-based formats (used by Ableton, FL Studio, Bitwig for their projects) have several drawbacks:
- ZIP is not designed for incremental writes — every save rewrites the entire archive
- Random-access within ZIP requires full index scan
- Corruption of the central directory destroys the entire archive
- ZIP's specification has subtle implementation differences across platforms

AUDIAW's custom container format allows:
- **Incremental saves:** Only changed sections are rewritten
- **O(1) section access:** The manifest provides byte offsets for direct seeks
- **Section-level checksums:** Individual sections can be validated without reading the entire file
- **Append-only autosave:** Autosave snapshots are appended to the container without rewriting

### 9.2.2 Manifest Structure (JSON)

The manifest is a JSON document embedded in the container header that describes all sections:

```json
{
  "format": "audiaw-project",
  "version": 1,
  "schema_version": "1.0.0",
  "created_at": "2025-01-15T14:23:01Z",
  "modified_at": "2025-01-15T16:45:22Z",
  "audiaw_version": "1.0.0",
  "platform": "linux-x64",
  "sections": {
    "core": {
      "offset": 4096,
      "length": 2048,
      "compression": "none",
      "checksum": "sha256:abc123..."
    },
    "tracks": {
      "offset": 6144,
      "length": 8192,
      "compression": "zstd-3",
      "checksum": "sha256:def456..."
    },
    "clips": {
      "offset": 14336,
      "length": 65536,
      "compression": "zstd-3",
      "checksum": "sha256:ghi789..."
    },
    "automation": {
      "offset": 79872,
      "length": 204800,
      "compression": "zstd-19",
      "checksum": "sha256:jkl012..."
    }
  },
  "assets": {
    "policy": "external-relative",
    "search_paths": [
      ".",
      "./samples",
      "./audio"
    ]
  }
}
```

### 9.2.3 Core Section Schema

The core section contains project-wide settings and the transport state:

```rust
// Rust representation (serialized to MessagePack)
pub struct ProjectCore {
    pub id: ProjectId,              // UUID v4, globally unique
    pub name: String,
    pub description: Option<String>,
    
    // Transport
    pub tempo_map: TempoMap,        // Multiple tempo events
    pub time_signature_map: TimeSigMap,
    pub key_signature: Option<KeySignature>,
    
    // Playback state (restored on open)
    pub playhead_position: SamplePosition,
    pub loop_start: Option<SamplePosition>,
    pub loop_end: Option<SamplePosition>,
    pub loop_enabled: bool,
    
    // Audio settings (per-project preferences, may differ from global)
    pub preferred_sample_rate: Option<u32>,
    pub preferred_bit_depth: BitDepth,
    
    // Arrangement
    pub arrangement_duration: SamplePosition,  // Total project length
    pub arrangement_end_action: EndAction,      // Stop, Continue, Loop
    
    // Metadata
    pub created_at: DateTime<Utc>,
    pub modified_at: DateTime<Utc>,
    pub tags: Vec<String>,
    pub color: Option<ProjectColor>,
}

pub struct TempoMap {
    /// Sorted list of tempo events. First event is always at position 0.
    pub events: Vec<TempoEvent>,
}

pub struct TempoEvent {
    pub position: SamplePosition,   // Sample position (tempo changes are sample-accurate)
    pub bpm: f64,                    // Beats per minute (24.0 to 960.0)
    pub curve: TempoCurve,           // Linear, Instant, Exponential
}
```

### 9.2.4 Track Section Schema

```rust
pub struct TrackSection {
    pub tracks: Vec<Track>,
    pub track_order: Vec<TrackId>,   // Explicit display order
    pub groups: Vec<TrackGroup>,
}

pub struct Track {
    pub id: TrackId,
    pub name: String,
    pub color: TrackColor,
    pub track_type: TrackType,
    pub height: TrackHeight,
    pub folded: bool,
    
    // Audio routing
    pub output_routing: OutputRouting,
    pub input_routing: Option<InputRouting>,
    
    // Channel state
    pub volume_db: f64,       // -infinity to +6.0 dB
    pub pan: f64,             // -1.0 (full left) to +1.0 (full right)
    pub mute: bool,
    pub solo: bool,
    pub record_armed: bool,
    pub monitoring: MonitoringMode,
    
    // Device chain (instruments + effects)
    pub device_chain: DeviceChain,
    
    // Clips belonging to this track
    pub clip_ids: Vec<ClipId>,
    
    // Track-specific automation
    pub automation_lanes: Vec<AutomationLane>,
    
    // Platform notes (for UI restore)
    pub ui_state: TrackUiState,
}

pub enum TrackType {
    Audio {
        channel_count: u8,      // 1 = mono, 2 = stereo, up to 32 for surround
    },
    Instrument {
        midi_channel: Option<u8>,  // None = omni
    },
    Group {
        member_ids: Vec<TrackId>,
    },
    Return {
        send_visible: bool,
    },
    Master,
}
```

### 9.2.5 Clip Section Schema

```rust
pub struct ClipSection {
    pub clips: HashMap<ClipId, Clip>,
}

pub struct Clip {
    pub id: ClipId,
    pub name: Option<String>,          // If None, uses source name
    pub track_id: TrackId,
    pub color: Option<TrackColor>,     // If None, inherits track color
    
    // Timeline position
    pub position: SamplePosition,      // Start position in arrangement
    pub length: SampleDuration,        // Displayed length
    pub loop_enabled: bool,
    pub loop_start: SamplePosition,    // Relative to clip start
    pub loop_length: SampleDuration,
    
    // Content
    pub content: ClipContent,
    
    // Non-destructive transformations
    pub gain_db: f64,                  // Clip gain (pre-track effects)
    pub pitch_semitones: f64,          // Pitch shift in semitones
    pub time_stretch: f64,             // 1.0 = original, 0.5 = half speed
    pub time_stretch_algorithm: StretchAlgorithm,
    pub reversed: bool,
    pub fade_in: FadeShape,
    pub fade_out: FadeShape,
}

pub enum ClipContent {
    Audio {
        asset_ref: AssetRef,       // Reference to audio file
        source_start: SamplePosition,  // Where in the source file to start
    },
    Midi {
        events: Vec<MidiEvent>,
        notes: Vec<MidiNote>,
    },
    Pattern {
        pattern_id: PatternId,     // Reference to a reusable pattern
    },
}

pub struct AssetRef {
    /// Relative path from project file location
    pub relative_path: PathBuf,
    
    /// Absolute path as fallback (canonicalized at save time)
    pub absolute_path: Option<PathBuf>,
    
    /// Content hash for integrity verification and asset deduplication
    pub content_hash: Option<Sha256Hash>,
    
    /// Source sample rate (may differ from project)
    pub source_sample_rate: u32,
    
    /// Source channel count
    pub source_channels: u8,
    
    /// Source duration in samples (at source_sample_rate)
    pub source_duration_samples: u64,
}
```

### 9.2.6 Automation Section Schema

Automation data is the densest section in typical projects. A 5-minute track with complex automation can have hundreds of thousands of automation points. The automation section uses aggressive zstd compression (level 19).

```rust
pub struct AutomationSection {
    /// Lanes indexed by (target_id, param_id)
    pub lanes: HashMap<AutomationKey, AutomationLane>,
}

pub struct AutomationKey {
    /// The entity being automated (track, device, plugin)
    pub target: AutomationTarget,
    /// Which parameter on that target
    pub param_id: ParamId,
}

pub struct AutomationLane {
    /// How this automation is applied
    pub mode: AutomationMode,   // Latch, Write, Touch, Read, Off
    
    /// The automation curve (a sorted list of breakpoints)
    pub curve: AutomationCurve,
}

pub struct AutomationCurve {
    /// Sorted by position. Using a BTreeMap for O(log n) lookup.
    pub points: Vec<AutomationPoint>,
}

pub struct AutomationPoint {
    pub position: SamplePosition,
    pub value: f64,               // Normalized: 0.0 to 1.0 (mapped to param range)
    pub interpolation: Interpolation,  // Instant, Linear, Smooth, Bezier
    /// Bezier control points (only if interpolation == Bezier)
    pub bezier_control: Option<(f64, f64)>,
}
```

**Automation point encoding optimization:**

For dense automation (e.g., from hardware encoder recording), points are delta-encoded:
- First point: absolute position + absolute value
- Subsequent points: delta position (u16, relative to previous) + delta value (i16, normalized)
- This reduces storage from ~24 bytes/point to ~6 bytes/point for dense automation
- Delta encoding is transparent to the API: the loader reconstructs absolute positions/values

## 9.3 Asset Management

### 9.3.1 Asset Resolution Strategy

When loading a project, AUDIAW resolves audio asset references in this priority order:

1. **Relative path from project file location:** `./samples/kick.wav` → resolved relative to the `.audiaw` file
2. **Absolute path:** The stored absolute path from when the project was saved
3. **Content hash lookup:** Search the user's asset library for a file with matching SHA-256 hash
4. **Filename-only search:** Search project folder and subdirectories for any file with the matching filename

If no resolution succeeds, the clip is marked as "missing" and renders silence. Missing clips are flagged in the UI with a warning icon. A "Locate Missing Files" dialog allows batch resolution.

### 9.3.2 Asset Bundling (Portable Projects)

The `Collect & Save` function (Ctrl+Shift+S) creates a **self-contained project package:**

1. Finds all external audio assets referenced by the project
2. Copies all assets to a `./samples/` subdirectory adjacent to the project file
3. Rewrites all asset references to use relative paths pointing to the local copies
4. Optionally: compresses the entire project folder into a `.audiaw-bundle` archive (ZIP-based, for sharing)

### 9.3.3 Missing Asset Recovery

```
MISSING ASSET RECOVERY FLOW

On project load:
  For each clip with an AssetRef:
    Attempt resolution (4 strategies above)
    If resolved: ✓ Continue
    If not resolved: Mark clip as MISSING

On project fully loaded:
  If any MISSING clips exist:
    Show: "N audio files could not be found."
    Options: [Locate Files] [Open Anyway] [Cancel]

[Locate Files] opens:
  List of missing files with:
  - Original filename
  - Original path (context hint)
  - Duration and channel count (for identification)
  - [Browse...] button per file
  - [Search Folder...] button to batch-search a directory
  - [Skip] to leave as missing (renders silence)
```

## 9.4 Incremental Save & Autosave

### 9.4.1 Incremental Save Architecture

Full project saves (Ctrl+S) are incremental by default. Only changed sections are rewritten:

```
INCREMENTAL SAVE PROCESS

1. Compute which sections have changed since last save:
   - Core section: changed if tempo, time sig, playback state changed
   - Tracks section: changed if any track was added/removed/modified
   - Clips section: changed if any clip was added/removed/moved
   - Automation section: changed if any automation was drawn/modified
   - Plugin states: changed if any plugin state was modified

2. For each changed section:
   - Serialize to MessagePack
   - Compress with zstd
   - Compute SHA-256 checksum
   - Write to a new section slot in the container

3. Update the manifest with new section offsets
4. Write new manifest to container header
5. Truncate file to remove orphaned old sections
6. fsync (flush OS write buffer to disk)
7. Verify written checksums match computed checksums
8. Update manifest's modified_at timestamp

DURATION TARGET: < 500ms for typical project (32 tracks, no large plugin states)
```

### 9.4.2 Autosave System

Autosave runs on a background thread at a configurable interval (default: 60 seconds). It is:

- **Non-blocking:** The audio thread continues without interruption during autosave
- **Atomic:** The autosave either completes entirely or does not update the autosave file
- **Non-overwriting:** Autosaves are written to a separate `.audiaw.autosave` file, never to the main project file

```
AUTOSAVE BEHAVIOR

Every N seconds (default: 60):
  1. Snapshot current project state (fast, in-memory clone)
  2. Serialize snapshot to autosave format (background thread)
  3. Write to: <project_dir>/<project_name>.autosave
  4. If write succeeds: update autosave manifest
  5. If write fails: log warning, retry in 10 seconds

On crash:
  The .autosave file is left intact.

On next launch:
  Detect .autosave file newer than main project file
  Offer: "An autosave was found. Restore from autosave?"
  [Yes, restore] → load .autosave, rename to project file with user confirmation
  [No, open original] → delete .autosave
```

**Autosave slots:** AUDIAW keeps the last 3 autosave files (timestamped). This allows recovery from cases where the autosave itself captured an undesirable state.

## 9.5 Undo System

### 9.5.1 Undo Architecture

AUDIAW uses a **command-pattern undo system** where every user action is represented as a reversible Command object:

```rust
pub trait Command: Send + Sync {
    /// Unique identifier for this command type
    fn command_id(&self) -> CommandId;
    
    /// Human-readable description (shown in Edit → Undo menu)
    fn description(&self) -> &str;
    
    /// Execute the command (apply the change)
    fn execute(&self, project: &mut ProjectState) -> Result<(), CommandError>;
    
    /// Reverse the command (undo)
    fn undo(&self, project: &mut ProjectState) -> Result<(), CommandError>;
    
    /// Merge with a subsequent command of the same type (for coalescing)
    /// Example: merging consecutive character insertions into a single "type" command
    fn try_merge(&mut self, next: &dyn Command) -> MergeResult;
    
    /// Estimated memory footprint (for history pruning)
    fn memory_estimate(&self) -> usize;
}
```

**Command coalescing:** Rapid repeated actions (scrubbing a knob, typing a track name) generate one command per interaction. Without coalescing, a single parameter sweep would create hundreds of individual undo steps. Commands implement `try_merge` to collapse runs of similar commands:

- Parameter value changes within 500ms → merged into single "set parameter" command
- Character insertions within a text edit session → merged into single "rename" command
- Note drag operations → merged into single "move notes" command

**Undo history limits:**
- Default: 500 undo steps or 256 MB of history data, whichever comes first
- When the limit is reached, oldest entries are pruned
- Configurable in preferences: 100–2000 steps or 64 MB–2 GB

### 9.5.2 Undo Scope

AUDIAW's undo system covers:
- All arrangement edits (clip add/move/resize/delete)
- All track edits (add/remove/rename/reorder/recolor)
- All parameter changes (volume, pan, plugin parameters)
- All automation edits
- All routing changes
- All mixer changes
- All MIDI edits (piano roll)

Explicitly NOT undoable:
- Audio recording (recorded audio is never deleted by undo; instead, the clip is deleted from the timeline but the audio file is preserved)
- Transport position changes
- UI state changes (panel positions, zoom levels, scroll positions)
- Settings changes

## 9.6 Version Compatibility

### 9.6.1 Forward Compatibility

Projects saved in AUDIAW v1.0 must open in AUDIAW v2.0 without user intervention. This is guaranteed by:

1. **Semantic versioning of schema:** The `schema_version` field in the manifest uses semver. Breaking changes increment the major version. Additive changes increment the minor version.
2. **Unknown section tolerance:** The loader ignores sections it does not recognize. Future versions can add new sections without breaking older loaders.
3. **Unknown field tolerance:** The MessagePack loader ignores fields not in its schema. Future versions can add fields to existing structures.
4. **Plugin state opacity:** Plugin states are treated as opaque blobs. If a plugin is not installed, its state is preserved in the project file and restored if the plugin is later installed.

### 9.6.2 Migration System

When a project is opened with a newer AUDIAW that has schema changes:

```rust
pub struct MigrationRunner {
    migrations: BTreeMap<SchemaVersion, Box<dyn Migration>>,
}

pub trait Migration {
    fn from_version(&self) -> SchemaVersion;
    fn to_version(&self) -> SchemaVersion;
    fn migrate(&self, data: &mut ProjectData) -> Result<(), MigrationError>;
    fn description(&self) -> &str;
}

// Example migration: v1.0 → v1.1 (adds track icon system)
struct AddTrackIconsMigration;
impl Migration for AddTrackIconsMigration {
    fn migrate(&self, data: &mut ProjectData) -> Result<(), MigrationError> {
        for track in data.tracks.iter_mut() {
            // Infer track icon from track type (new field in v1.1)
            track.icon = Some(TrackIcon::from_track_type(&track.track_type));
        }
        Ok(())
    }
}
```

Migrations are:
- Cumulative: a v1.0 project opening in v3.0 runs migrations 1.0→1.1, 1.1→1.2, ..., 2.9→3.0
- Tested: each migration has an integration test that verifies a known v(n) project opens correctly in v(n+1)
- Non-destructive: migrations never delete data from older schemas

---

# 10. PERFORMANCE ENGINEERING DOCUMENT

## 10.1 Performance Philosophy

Performance is a product value at AUDIAW — not an engineering afterthought. Every subsystem has an explicit performance contract, and that contract is continuously enforced by automated benchmarks in CI.

The AUDIAW performance model distinguishes between three categories of performance:

**Startup Performance:** How fast the application reaches the "ready to work" state. This is the user's first impression on every session. Target: 2.5 seconds from launch to project-ready on representative hardware.

**Session Performance:** How the application behaves during a production session. CPU headroom, memory stability, rendering smoothness. This is what determines whether the tool is usable for professional work.

**Latency Performance:** The round-trip time between a user action (key press, hardware controller movement) and the resulting audio/visual response. This is the most subjective performance metric but the most immediately impactful on creative flow.

## 10.2 Performance Targets

### 10.2.1 Startup Targets

| Metric | Target | Measurement Method |
|---|---|---|
| Cold launch → UI visible | < 1.5 seconds | Wall clock, new install, no project |
| Cold launch → project interactive | < 2.5 seconds | Wall clock, no previous project |
| Warm launch → project interactive | < 1.5 seconds | Wall clock, with recent project cache |
| Open existing project (32 tracks) | < 5 seconds | From file-open dialog to playback-ready |
| Open existing project (100 tracks) | < 15 seconds | — |
| Plugin scan (100 plugins, first-time) | < 30 seconds | Background, non-blocking |
| Plugin scan (100 plugins, subsequent) | < 2 seconds | Using cached validation results |

**Reference hardware (minimum spec):**
- CPU: Intel Core i5-8250U (4 cores, 3.4 GHz boost) or Apple M1
- RAM: 8 GB
- Storage: 250 GB SATA SSD (500 MB/s read)
- GPU: Intel UHD 620 or equivalent integrated

### 10.2.2 Session Performance Targets

| Metric | Target | Notes |
|---|---|---|
| CPU usage (idle project) | < 2% | No audio playing, no plugins |
| CPU usage (32-track session, typical) | < 25% | On reference hardware at 256 buffer |
| RAM usage (app idle, no project) | < 80 MB | Base application footprint |
| RAM usage (32-track session, no samples) | < 250 MB | Audio engine + UI |
| RAM usage (32-track session, typical) | < 500 MB | Including sample streaming buffers |
| UI frame rate (arrangement view, 100 clips) | 60 FPS | Consistent, no hitches |
| UI frame rate (piano roll, 5000 notes) | 60 FPS | GPU-accelerated rendering |
| Waveform zoom response | < 100ms | Time from zoom gesture to waveform update |
| Track mute response | < 10ms | From click to audio silence |
| Plugin parameter UI response | < 16ms | From knob move to visual update |

### 10.2.3 Audio Latency Targets

| Backend | Buffer Size | Target Round-Trip Latency |
|---|---|---|
| ASIO | 64 samples @ 48kHz | < 4ms |
| ASIO | 128 samples @ 48kHz | < 6ms |
| CoreAudio | 64 samples @ 48kHz | < 4ms |
| JACK | 64 samples @ 48kHz | < 4ms |
| PipeWire | 128 samples @ 48kHz | < 7ms |
| WASAPI Exclusive | 128 samples @ 48kHz | < 7ms |
| Software monitoring latency | — | < 1ms additional vs hardware |

### 10.2.4 GPU Budget (Rendering Frame Budget)

At 60 FPS, each frame has a budget of **16.67ms**. AUDIAW targets using no more than 8ms of GPU time per frame, leaving headroom for OS compositing and other applications.

| Render Pass | Time Budget | Description |
|---|---|---|
| Waveform rendering | 3ms | WGPU geometry pass for all visible waveforms |
| MIDI note rendering | 1ms | Piano roll MIDI notes (when open) |
| Spectrum analyzer | 0.5ms | Real-time FFT visualization |
| Meter rendering | 0.5ms | All level meters |
| UI compositing | 2ms | Tauri WebView → native window compositing |
| Total target | 7ms | < 8ms budget |

## 10.3 Startup Optimization Architecture

### 10.3.1 Startup Sequence

```
AUDIAW STARTUP SEQUENCE (critical path)

t=0ms    Binary load, Tauri initialization begins
t=50ms   WebView created, UI shell HTML begins loading
t=150ms  CSS loaded, UI skeleton visible (loading indicator shown)
t=200ms  Rust backend initialized:
           - SQLite database opened (or created)
           - Settings loaded from disk
           - Audio device enumerated
t=400ms  Plugin cache loaded (SQLite query, < 5ms for 1000 plugins)
t=500ms  UI JavaScript bundle evaluated, stores initialized
t=600ms  Audio engine initialized (CPAL backend created)
t=800ms  Recent projects list displayed — user can click to open
t=1000ms Audio device connected, ready for audio (no project open)
──────────────── User interaction possible at this point ────────────────
t=?      (User selects recent project or template)
t=+500ms Project parsed from disk
t=+800ms Tracks and clips deserialized
t=+1200ms Plugin states loaded and plugins initialized
t=+1800ms Waveform thumbnails loaded from cache (or generated)
t=+2000ms Project fully interactive
```

### 10.3.2 Parallel Initialization

The startup sequence is parallelized wherever possible:

```rust
// Pseudocode: parallel startup tasks
async fn initialize() {
    // These run in parallel:
    let (settings, plugin_cache, audio_device, ui_ready) = tokio::join!(
        load_settings(),           // ~50ms (disk read)
        load_plugin_cache(),       // ~10ms (SQLite query)
        enumerate_audio_devices(), // ~100ms (OS API calls)
        wait_for_ui_ready(),       // ~600ms (WebView + JS)
    );
    
    // Sequential after both are ready:
    let engine = AudioEngine::new(audio_device, settings).await;
    emit_to_ui("app:ready", AppReadyState { settings, plugin_cache });
}
```

### 10.3.3 Lazy Plugin Loading

Plugins are **not loaded on startup**. The plugin cache (stored in SQLite) contains all metadata needed to display plugins in the browser without instantiating them. Plugins are only loaded when:
- The user adds a plugin to a track
- The user opens a project that contains that plugin
- The user requests a plugin preview (if implemented)

This ensures that 300 installed plugins do not add to startup time.

### 10.3.4 Project Loading Optimization

Large project loading is parallelized and streamed:

```rust
async fn load_project(path: &Path) -> Result<ProjectState> {
    // 1. Parse container header and manifest (fast)
    let container = Container::open(path)?;
    
    // 2. Load core section (tiny, fast)
    let core = container.load_section::<ProjectCore>("core")?;
    
    // 3. Load tracks and clips in parallel
    let (tracks, clips, mixer) = tokio::join!(
        container.load_section::<TrackSection>("tracks"),
        container.load_section::<ClipSection>("clips"),
        container.load_section::<MixerSection>("mixer"),
    );
    
    // 4. Emit partial state to UI immediately (user sees track list)
    emit_partial_state(&core, &tracks, &clips, &mixer);
    
    // 5. Load plugin states and initialize plugins (slowest part)
    let plugin_states = container.load_section::<PluginSection>("plugins")?;
    let initialized_plugins = init_plugins_parallel(plugin_states).await;
    
    // 6. Load automation (may be large, streamed)
    let automation = container.load_section_streaming::<AutomationSection>("automation")?;
    
    // 7. Load waveform thumbnails from cache (fast, SQLite)
    let waveform_cache = load_waveform_cache(&clips)?;
    
    // 8. Project fully ready
    emit_full_state(initialized_plugins, automation, waveform_cache);
}
```

The critical UX insight: by emitting partial state early (step 4), the user sees the track structure and can begin preparing while plugins finish loading in the background. The arrangement view displays with placeholder waveforms (loading spinners) that fill in as waveform thumbnails are loaded.

## 10.4 CPU Optimization

### 10.4.1 DSP SIMD Strategy

AUDIAW's DSP code uses SIMD (Single Instruction Multiple Data) acceleration to process multiple audio samples simultaneously. The SIMD abstraction layer (`crates/audiaw-engine/src/dsp/simd/`) handles:

```rust
/// SIMD-width-agnostic processing abstraction
pub trait SimdProcessor {
    fn process_block(&mut self, input: &[f32], output: &mut [f32]);
}

/// Platform implementations
#[cfg(target_arch = "x86_64")]
mod avx2 {
    // AVX2: processes 8 f32 samples per instruction
}

#[cfg(target_arch = "x86_64")]
mod sse4 {
    // SSE4.1: processes 4 f32 samples per instruction  
}

#[cfg(target_arch = "aarch64")]
mod neon {
    // ARM NEON: processes 4 f32 samples per instruction
}

// Runtime dispatch based on CPU capabilities (detected at startup)
pub fn create_simd_processor(algorithm: DspAlgorithm) -> Box<dyn SimdProcessor> {
    #[cfg(target_arch = "x86_64")]
    if is_x86_feature_detected!("avx2") {
        return Box::new(avx2::Processor::new(algorithm));
    }
    
    #[cfg(target_arch = "x86_64")]
    if is_x86_feature_detected!("sse4.1") {
        return Box::new(sse4::Processor::new(algorithm));
    }
    
    #[cfg(target_arch = "aarch64")]
    return Box::new(neon::Processor::new(algorithm));
    
    Box::new(scalar::Processor::new(algorithm))
}
```

**SIMD performance multipliers (measured on i7-10700K):**

| Algorithm | Scalar | SSE4.1 | AVX2 | Speedup (AVX2 vs scalar) |
|---|---|---|---|---|
| Biquad filter | 1.0× | 3.2× | 6.1× | 6.1× |
| DC offset removal | 1.0× | 3.8× | 7.4× | 7.4× |
| Peak/RMS metering | 1.0× | 3.5× | 6.8× | 6.8× |
| Buffer gain + clip | 1.0× | 3.6× | 7.1× | 7.1× |
| Stereo interleave | 1.0× | 3.2× | 5.9× | 5.9× |

### 10.4.2 Track Freezing

**Track freezing** renders a track's audio (including all effects) to a temporary audio file and plays back the frozen audio file instead of running the live DSP chain. This dramatically reduces CPU load for completed tracks:

- Frozen track CPU cost: 1 disk streaming operation per buffer (~0.1ms)
- Unfrozen track CPU cost: all plugins + DSP running live (~2–50ms depending on complexity)

Freezing is triggered by: right-click track → Freeze, or the track context menu → Freeze. Unfreezing re-enables the live chain and deletes the frozen audio file.

**Freeze behavior:**
- Freezing is non-destructive: the original plugin chain is preserved
- Frozen tracks show a snowflake icon and a slightly different background color
- Frozen tracks cannot have their plugin parameters edited (must unfreeze first)
- Automation continues to work on frozen tracks (volume, pan, send level)
- Auto-freeze: AUDIAW can optionally auto-freeze tracks that have not been edited in N sessions (configurable)

### 10.4.3 CPU Protection Mode

For live performance, AUDIAW includes a CPU Protection mode that:
1. Freezes background rendering tasks
2. Elevates audio thread priority further
3. Reduces UI frame rate to 30 FPS (halving GPU load)
4. Suspends non-critical background tasks (waveform caching, asset indexing)
5. Disables undo history accumulation (saves memory bandwidth)

This is activated via: Live button in transport bar → "Enable CPU Protection" checkbox, or via keyboard shortcut `Ctrl+Shift+P`.

## 10.5 Memory Optimization

### 10.5.1 Waveform Thumbnail Cache

Waveform thumbnails are the most memory-intensive UI element. AUDIAW manages this via a multi-level cache:

**Level 1 (GPU Texture Atlas):** Resident in GPU VRAM. Contains thumbnails for currently visible clips at the current zoom level. Least-recently-visible thumbnails are evicted when the atlas is full (512 MB VRAM budget for the atlas).

**Level 2 (System RAM Cache):** Decoded thumbnail data for all clips in the current project, at all zoom levels. Uses a custom allocator with a configurable budget (default: 128 MB).

**Level 3 (Disk Cache):** SQLite database with pre-computed thumbnail data for all previously loaded audio files. Thumbnails are computed once and stored permanently (cleared only on explicit cache wipe or when source file changes).

### 10.5.2 Plugin State Memory

Large plugin libraries (orchestral sample libraries, etc.) can hold gigabytes of samples in memory. AUDIAW does not manage plugin-internal memory directly, but provides:

- **Plugin memory reporting:** Plugins implementing CLAP's memory reporting extension surface their memory usage in the device view
- **Plugin unload on freeze:** When a track is frozen, AUDIAW can optionally unload the plugin from memory (saving RAM) since the plugin is no longer processing
- **Project memory summary:** Settings → Diagnostics → Project Memory shows a breakdown of memory usage by plugin instance

## 10.6 Rendering Optimization

### 10.6.1 Virtualized Track Rendering

The arrangement view only renders **tracks currently visible in the viewport**. Off-screen tracks are not rendered at all. This is critical for large sessions:

```typescript
// VirtualizedTrackList.tsx
const VirtualizedTrackList: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  
  // Update visible range on scroll
  const handleScroll = useCallback((scrollTop: number) => {
    const trackHeight = 48; // Standard track height
    const containerHeight = containerRef.current?.clientHeight ?? 0;
    const start = Math.floor(scrollTop / trackHeight);
    const end = Math.ceil((scrollTop + containerHeight) / trackHeight) + 2; // +2 overscan
    setVisibleRange({ start, end });
  }, []);
  
  // Only render tracks in visible range
  const visibleTracks = tracks.slice(visibleRange.start, visibleRange.end);
  
  return (
    <div 
      ref={containerRef}
      style={{ height: tracks.length * 48 }}  // Full virtual height
      onScroll={e => handleScroll(e.target.scrollTop)}
    >
      {/* Spacer for tracks above viewport */}
      <div style={{ height: visibleRange.start * 48 }} />
      
      {/* Visible tracks only */}
      {visibleTracks.map(track => (
        <TrackView key={track.id} track={track} />
      ))}
    </div>
  );
};
```

With 200 tracks at 48px height, only ~20 tracks are rendered at any time.

### 10.6.2 Clip Viewport Culling

Within each visible track, only **clips currently visible in the horizontal viewport** are rendered. Clips outside the viewport are represented only by their position/length metadata. For a 100-bar arrangement viewed at bar 50–55, only clips overlapping that visible range are rendered.

### 10.6.3 GPU Waveform Mipmap System

Waveforms are pre-computed at multiple zoom levels using a mipmap system identical to texture mipmapping in 3D graphics:

```
Zoom Level 0 (most detailed): 1 pixel = 1 sample
  Required for: Zoom > 200% (sample-level editing)
  
Zoom Level 1: 1 pixel = 8 samples  
  Required for: Zoom 25%–200%
  
Zoom Level 2: 1 pixel = 64 samples
  Required for: Zoom 3%–25% (single bar visible)
  
Zoom Level 3: 1 pixel = 512 samples
  Required for: Zoom 0.4%–3% (many bars visible)
  
Zoom Level 4 (least detailed): 1 pixel = 4096 samples
  Required for: Full project overview
```

When the user zooms, the GPU instantly switches to the appropriate mip level. New mip levels are generated asynchronously by the background waveform thread, so zooming is always instant with available data.

---

# 11. LIVE PERFORMANCE SYSTEM DOCUMENT

## 11.1 Live Performance Architecture

AUDIAW's Live Performance mode transforms the DAW from a production tool into a stable performance instrument. The core challenge of live performance is reliability: a crash, audio dropout, or CPU spike during a concert is unacceptable.

### 11.1.1 Performance Mode vs Production Mode

Live Performance Mode activates a set of system-wide changes:

| System | Production Mode | Performance Mode |
|---|---|---|
| UI frame rate | 60 FPS | 30 FPS (reduced GPU load) |
| Undo history | Unlimited (up to budget) | Disabled |
| Autosave | Every 60 seconds | Disabled |
| Background indexing | Active | Suspended |
| CPU throttle guard | Passive monitoring | Active (drops CPU-heavy processes) |
| Audio dropout response | Log + notify | Immediate fallback protocol |
| Plugin crash response | Notify + continue | Immediate silence + alert |
| UI crash response | Show error | Audio continues (UI restart) |

**The critical guarantee:** In performance mode, the audio engine is deliberately isolated from the UI process. If the UI crashes (Tauri WebView exception, React error, etc.), the audio engine continues without interruption. A watchdog process monitors the UI and relaunches it, restoring the last-known visual state.

### 11.2 Clip Launching System

The clip launcher is a grid-based view for triggering audio/MIDI clips independently of the arrangement timeline. It is inspired by Ableton's Session View but integrated within AUDIAW's unified workspace.

### 11.2.1 Clip Launcher Layout

```
CLIP LAUNCHER GRID

       TRACK 1        TRACK 2        TRACK 3        TRACK 4
       [Kick Drum]    [Bass Line]    [Lead Synth]   [Pad]
Scene ┌────────────┬──────────────┬──────────────┬──────────────┐
  1   │ ▶ Drop     │ ▶ Bass Drop  │ ▶ Lead A     │ ▶ Pad Warm   │
      ├────────────┼──────────────┼──────────────┼──────────────┤
  2   │ ▶ Verse    │ ▶ Bass Verse │ ▶ Lead B     │ (empty)      │
      ├────────────┼──────────────┼──────────────┼──────────────┤
  3   │ ▶ Intro    │ (empty)      │ (empty)      │ ▶ Pad Cold   │
      ├────────────┼──────────────┼──────────────┼──────────────┤
  4   │ ▶ Outro    │ ▶ Bass Outro │ (empty)      │ (empty)      │
      └────────────┴──────────────┴──────────────┴──────────────┘
SCENE ► ► ► ► ► ► ►  [Launch Scene 1]  [Launch Scene 2]  ...
```

### 11.2.2 Clip Trigger Quantization

Clip triggers are **quantized** — they start playing at the next musical division boundary rather than immediately on mouse/MIDI click. This prevents timing errors during live performance.

**Quantization options:**
- **Bar:** Trigger at next bar boundary (default, most forgiving)
- **Beat:** Trigger at next beat (more responsive, requires more timing skill)
- **Half bar:** Trigger at next half-bar (dotted half note)
- **2 bars:** For slow genres where a bar feels fast
- **Immediate:** No quantization (for precise triggering with MIDI controller pads)
- **Measure end:** Clip plays through to its end, then launches the new clip

**Visual countdown:** When a clip is triggered but waiting for quantization, it displays a countdown animation (progress bar fills toward the launch point). This provides essential visual feedback during performance.

### 11.2.3 Scene Management

A **scene** is a row in the clip launcher grid. Launching a scene triggers all clips in that row simultaneously (at the quantize boundary). Each scene has:
- A name (editable, doubles as a set list annotation)
- An optional tempo change (scene can trigger a tempo change when launched)
- An optional time signature change
- An optional launch mode (Play once, Loop, Stop all)

**Scene follow actions:** Each scene can have a configured action that occurs when all clips in the scene have played through once:
- Continue (stay on current scene)
- Jump to next scene
- Jump to specific scene
- Stop (all clips stop after playing through)
- Play random scene

This allows semi-automated performance where scenes follow each other without manual triggering.

### 11.2.4 Hardware Controller Integration

AUDIAW supports hardware MIDI controllers for clip launching via MIDI Learn:

1. Enable MIDI Learn mode (button in transport or `Ctrl+M`)
2. Click a clip cell or scene launch button in the UI
3. Press the desired pad/button on the MIDI controller
4. The mapping is created and persisted

**Pre-built controller profiles** (loaded from community-contributed JSON files):
- Ableton Push 2 (clip grid + performance encoders)
- Novation Launchpad X (clip grid + scene launch)
- Akai APC40 mk2 (clip grid + mixer controls)
- Native Instruments Maschine+ (clip grid + performance controls)

Controller profiles define:
- Note/CC → clip cell mapping (grid layout)
- Note/CC → scene launch mapping
- Note/CC → transport controls
- LED feedback mapping (controller LEDs show clip play state)

### 11.3 Quantized Triggering Architecture

The quantized triggering system is implemented entirely in the audio thread to ensure timing accuracy:

```rust
pub struct ClipTriggerScheduler {
    /// Pending triggers waiting for their quantize boundary
    pending_triggers: LockFreeQueue<ScheduledTrigger>,
    
    /// Currently active clips per track
    active_clips: [Option<ClipId>; MAX_TRACKS],
    
    /// The quantize grid (bar-aligned, beat-aligned, etc.)
    quantize_mode: QuantizeMode,
}

impl ClipTriggerScheduler {
    pub fn process(&mut self, context: &AudioContext) {
        let buffer_start = context.current_sample_position;
        let buffer_end = buffer_start + context.buffer_size as u64;
        
        // Compute quantize boundaries within this buffer
        let boundaries = self.quantize_mode.boundaries_in_range(
            buffer_start, buffer_end, &context.tempo_map
        );
        
        // For each boundary in this buffer:
        for boundary in boundaries {
            // Check if any pending triggers should fire at this boundary
            while let Some(trigger) = self.pending_triggers.peek() {
                if trigger.should_fire_at(boundary) {
                    let trigger = self.pending_triggers.pop().unwrap();
                    self.apply_trigger(trigger, boundary, context);
                }
            }
        }
    }
    
    fn apply_trigger(&mut self, trigger: ScheduledTrigger, sample_offset: u64, ctx: &AudioContext) {
        // Stop currently playing clip on this track (if any)
        if let Some(old_clip_id) = self.active_clips[trigger.track_idx] {
            // Schedule clip stop at exact sample offset (sub-buffer accuracy)
            ctx.schedule_clip_stop(old_clip_id, sample_offset);
        }
        
        // Start new clip at exact sample offset
        ctx.schedule_clip_start(trigger.clip_id, sample_offset);
        self.active_clips[trigger.track_idx] = Some(trigger.clip_id);
    }
}
```

This implementation ensures clips start and stop at musically exact positions, even within a buffer period. Sub-buffer-accuracy triggering eliminates the half-buffer quantization error that plagues simpler implementations.

### 11.4 Emergency Recovery Systems

### 11.4.1 Audio Dropout Recovery

When an audio dropout (buffer underrun) is detected:

1. The audio engine logs the dropout with timestamp, CPU load snapshot, and active plugin list
2. A non-blocking notification appears in the UI (non-modal, 3-second fade)
3. If dropouts exceed 3 in 30 seconds: AUDIAW offers to enter CPU Protection mode
4. If dropouts exceed 10 in 60 seconds: AUDIAW automatically increases buffer size by one step (e.g., 128 → 256 samples) with notification

### 11.4.2 Plugin Crash During Performance

When a plugin crashes during a live performance:

1. The plugin process watchdog detects the crash (within 1 audio callback period)
2. The crashed plugin's output is replaced with silence
3. An alert banner appears at the top of the UI (non-blocking, dismissible)
4. The banner shows: "[Plugin Name] crashed. Audio silenced on [Track Name]. [Relaunch] [Dismiss]"
5. The user can immediately relaunch the plugin (which re-loads from its last known state) without stopping performance
6. Relaunch time target: < 3 seconds for CLAP plugins, < 5 seconds for VST3

### 11.4.3 MIDI Clock Synchronization

For synchronized live performance with hardware synthesizers, drum machines, and other DAWs:

**MIDI Clock Out:** AUDIAW generates MIDI Clock (24 pulses per beat) synchronized to the internal transport. Clock output is enabled per MIDI port in MIDI preferences.

**MIDI Clock In:** AUDIAW can slave to an external MIDI clock source, following the external BPM and sync point. Jitter compensation (up to 10ms of jitter is smoothed by a low-pass filter on the received clock signal).

**Ableton Link:** AUDIAW implements the Ableton Link protocol for wireless tempo synchronization with other Link-enabled applications (Ableton Live, other DAWs, iOS apps) on the same network. Zero-configuration: Link is enabled in preferences and automatically discovers peers.

---

# 12. BUILT-IN SYNTH & DSP DOCUMENTATION

## 12.1 Built-in Instrument Philosophy

AUDIAW ships with a comprehensive set of built-in instruments sufficient to produce professional-quality music without any third-party plugins. These instruments are:

- Implemented as CLAP plugins (consistent with third-party plugin API)
- Written in Rust with SIMD optimization
- Open-source (part of the AUDIAW repository)
- Designed to be exceptional at their intended use case, not comprehensive
- Documented with musical tutorials, not just technical specifications

## 12.2 AUDIAW Sampler

### 12.2.1 Architecture Overview

The AUDIAW Sampler is a multi-layer, multi-sample instrument with a flexible mapping system:

```
SAMPLER ARCHITECTURE

MIDI Input
    │
    ▼
Voice Manager
  │ Polyphony: 1–256 voices
  │ Voice stealing algorithm: configurable
  │
  ├─ Voice 1 ──► Sample Selector ──► Stream Reader ──► Playback Engine
  ├─ Voice 2 ──► ...
  └─ Voice N ──► ...
                                              │
                                              ▼
                                    DSP per voice:
                                    ├─ Pitch/Tuning
                                    ├─ Sample Rate Conversion
                                    ├─ Envelope (AHDSR)
                                    ├─ Filter (6 types)
                                    ├─ LFO (2× per voice)
                                    └─ Velocity → Amp/Filter mapping
                                              │
                                              ▼
                                    Voice mixer (sum all voices)
                                              │
                                              ▼
                                    Output Effects:
                                    ├─ Saturation
                                    └─ Global Reverb
```

### 12.2.2 Sample Mapping System

Samples are mapped to MIDI notes and velocity ranges using a graphical **mapping view:**

```
SAMPLE MAPPING VIEW

VELOCITY →
  127 ┤
      │     [Forte layer]
   80 ┤─────────────────────────────
      │     [Mezzo layer]
   40 ┤─────────────────────────────
      │     [Piano layer]
    0 ┤
      └─┬───┬───┬───┬───┬───┬───┬──
        C2  D2  E2  F2  G2  A2  B2   ← MIDI NOTE →
```

**Mapping rules:**
- Round-robin: multiple samples at the same pitch/velocity zone cycle sequentially to avoid machine-gun effect
- Random weighting: within a round-robin group, samples have adjustable probability weights
- Crossfade: velocity zones can overlap with crossfade for smooth layer transitions
- Root note: each sample has a root note; AUDIAW pitch-shifts the sample for notes above/below root using high-quality resampling

### 12.2.3 Sample Playback Engine

**Interpolation:** AUDIAW uses **Sinc interpolation** (128-point) for high-quality pitch transposition. For performance-critical use cases with many simultaneous voices, linear interpolation mode is available (4× cheaper, audible only at large transpositions).

**Looping:** Forward, backward, ping-pong loop modes. Loop crossfade (up to 1000ms) to eliminate loop clicks. Loop tuning: the loop point can be nudged at sub-sample accuracy.

**Streaming:** Samples longer than 10 seconds are streamed from disk. The first 10 seconds (the "pre-buffer") are loaded into RAM for instant response; the remainder streams in chunks.

**Granular playback mode:** The sampler includes a granular playback mode that decomposes any sample into small "grains" (10–500ms) and recombines them with independent control of pitch and speed. This enables extreme time stretching and creative texture synthesis from any sample.

### 12.2.4 Voice Management

```rust
pub enum VoiceStealingPolicy {
    /// Stop the oldest voice when polyphony is exceeded
    OldestFirst,
    /// Stop the quietest voice (by output amplitude)
    Quietest,
    /// Stop the voice furthest from the new note's pitch
    FurthestPitch,
    /// Never steal — drop new notes when polyphony is exceeded
    NoStealing,
    /// Stop notes in envelope release phase first, then oldest
    ReleaseFirst,  // Default
}
```

Voice stealing is applied only when the polyphony limit is reached. AUDIAW provides visual feedback of active voice count in the instrument header.

## 12.3 AUDIAW Drum Machine

### 12.3.1 Step Sequencer

The drum machine combines a multi-layer sampler with a pattern-based step sequencer:

```
DRUM MACHINE UI

┌─────────────────────────────────────────────────────────────────┐
│  BPM: [140.0]  Steps: [16 ▾]  Swing: [30%]  Pattern: [A ▾]    │
├────────┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬─────┤
│Kick 808│██│  │  │  │██│  │  │  │██│  │  │  │██│  │  │██│ ─●─ │
│Snare   │  │  │  │██│  │  │  │██│  │  │  │██│  │  │  │██│ ─●─ │
│HH Cls  │██│██│██│██│██│██│██│██│██│██│██│██│██│██│██│██│ ─●─ │
│HH Open │  │  │  │  │  │  │  │██│  │  │  │  │  │  │  │  │ ─●─ │
│Perc    │  │  │██│  │  │  │██│  │  │██│  │  │  │██│  │  │ ─●─ │
│Clap    │  │  │  │██│  │  │  │  │  │  │  │██│  │  │  │  │ ─●─ │
│[+]     │  │  │  │  │  │  │  │  │  │  │  │  │  │  │  │  │     │
├────────┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴─────┤
│ 1  e  &  a  2  e  &  a  3  e  &  a  4  e  &  a                │
└─────────────────────────────────────────────────────────────────┘
```

**Step properties:** Each step has:
- On/Off (primary: click to toggle)
- Velocity (secondary: right-click → velocity slider, or scroll on step)
- Probability (0–100%: at 70%, step plays 70% of the time — essential for variation)
- Nudge (timing offset: -50% to +50% of step duration for humanization)
- Alternate (step plays on every other pattern cycle: for half-time patterns)

**Polyrhythm mode:** Each drum instrument row can have an independent step count (1–64), allowing polyrhythmic programming:
- Kick: 16 steps (straight 4/4)
- Perc: 12 steps (3/4 pattern overlaid)
- Result: complex polyrhythmic pattern that repeats every LCM(16, 12) = 48 steps

### 12.3.2 Pattern System

The drum machine supports multiple patterns per instance:
- 8–128 patterns per instance (user configurable)
- Patterns are labeled A–Z, then A1–Z1, etc.
- Pattern chaining: define an order in which patterns play (a set list for the drum machine)
- Pattern transition: patterns can transition at next bar or next full pattern cycle
- Live pattern switching: press a pad on a controller to queue next pattern (quantized)

## 12.4 AUDIAW Wavetable Synthesizer

### 12.4.1 Wavetable Architecture

```
WAVETABLE SYNTH SIGNAL FLOW

MIDI Note Input
    │
    ▼
Oscillator Bank (2× oscillators)
│ Each oscillator:
│   - Wavetable position (0.0 → 1.0 across wavetable)
│   - Wavetable position modulation (LFO, envelope, macro)
│   - Unison voices (1–16)
│   - Unison detune and stereo spread
│   - Fine tune (cents) and semitone offset
│   - Phase (0°–360°, or random per-note)
│
├─ Oscillator 1 output
├─ Oscillator 2 output  
└─ Both → Oscillator Mixer (level + blend)
    │
    ▼
Wavetable FX:
│   - Warp: phase distortion, wave folding, sync, FM between oscillators
    │
    ▼
Filter (2× independent filters)
│   - Filter types: LP12, LP24, HP12, HP24, BP, Notch, Peak, Shelf
│   - Cutoff, Resonance
│   - Drive (pre-filter saturation)
│   - Envelope amount (+ depth)
│   - Key tracking (0–200%)
│   - Velocity tracking (0–100%)
    │
    ▼
Amp Envelope (AHDSR with curve shapes per segment)
    │
    ▼
Effects Chain:
│   - FX Chorus / Ensemble
│   - FX Phaser
│   - FX Reverb
│   - FX EQ (3-band)
    │
    ▼
Output
```

### 12.4.2 Wavetable Format

AUDIAW's wavetable format supports:
- Single-cycle waveforms: classic shapes (sine, saw, square, triangle, noise)
- Multi-frame wavetables: 256 single-cycle frames per wavetable, each 2048 samples
- Morphing: smoothly interpolate between frames by moving the wavetable position
- User wavetables: import from WAV files (auto-slice into 256-sample cycles)
- Analyzed wavetables: drag any audio sample → AUDIAW analyzes and extracts periodic waveforms

**Anti-aliasing:** Wavetable playback uses **band-limited interpolation** — at higher pitches, higher harmonics that would cause aliasing are removed from the wavetable before playback. This is implemented via the mipmap technique: multiple band-limited versions of each wavetable frame are stored at different frequency ceilings, and the appropriate version is selected based on the current playback pitch.

### 12.4.3 Modulation System

The wavetable synth has a comprehensive modulation routing system:

**Modulation sources:**
- Envelope 1, 2, 3 (AHDSR with independent per-segment curves)
- LFO 1, 2 (rate: 0.01 Hz – 10 kHz; shapes: sine, triangle, saw, square, random, sample+hold)
- Macro 1, 2, 3, 4 (user-controllable, MIDI-assignable)
- MIDI Velocity (per-note)
- MIDI Note (pitch tracking)
- MIDI Aftertouch (channel or poly)
- MIDI CC (any CC, user-mapped)

**Modulation targets (any of these can receive any source):**
- Both oscillator positions (wavetable morph position)
- Both oscillator pitches (vibrato, FM)
- Both oscillator levels
- Unison detune
- Filter 1 and 2 cutoff
- Filter 1 and 2 resonance
- Amp level
- FX parameters

Each source → target connection has:
- Depth (−1.0 to +1.0)
- Polarity (unipolar or bipolar)
- Curve (linear, exponential, S-curve)

## 12.5 AUDIAW FM Synthesizer

### 12.5.1 FM Architecture

The AUDIAW FM Synthesizer implements a 6-operator FM synthesis engine with 32 algorithm presets (operator routing configurations) plus free routing mode:

```
FM OPERATOR STRUCTURE

Each of 6 operators:
  - Ratio or fixed frequency
  - Fine tune (cents)
  - Level
  - AHDSR envelope (applied to operator output level)
  - Feedback amount (self-modulation, operators 1 and 6 only in classic mode)
  - Waveform: sine, half-sine, absolute sine, quarter-sine (DX7 waveforms) +
              extended: triangle, saw, square, noise

ALGORITHM 1 (example: all operators modulate carrier 1):
  OP6 → OP5 → OP4 → OP3 → OP2 → OP1 (carrier) → output

ALGORITHM 32 (example: all independent carriers):
  OP1 → output
  OP2 → output
  OP3 → output
  OP4 → output
  OP5 → output
  OP6 → output
```

**Free routing mode:** Beyond the 32 algorithm presets, AUDIAW's FM synth allows fully custom operator routing via a visual node editor — any operator can modulate any other operator with configurable depth.

### 12.5.2 DX7 Compatibility

The AUDIAW FM synth is compatible with Yamaha DX7 patch format (`.syx` bulk dump files). DX7 patches import directly with full parameter mapping. This gives AUDIAW users access to the enormous library of DX7 patches available online (over 100,000 patches in the public domain).

## 12.6 AUDIAW Granular Synthesizer

### 12.6.1 Granular Engine Architecture

```
GRANULAR SYNTH — GRAIN GENERATION

Audio Source
(any WAV/FLAC/AIFF file or live input)
    │
    ▼
Grain Scheduler
  │ - Grain rate: 1–500 grains/second
  │ - Grain size: 10–500ms
  │ - Grain position: start position in source + random scatter
  │ - Grain pitch: MIDI note root + random pitch scatter
  │ - Grain amplitude: random scatter + envelope
  │ - Grain pan: random L/R scatter
    │
    ├─ Grain 1 ──► Windowing ──► Pitch Shift ──► Pan ──►┐
    ├─ Grain 2 ──► ...                                   │
    ├─ Grain 3 ──► ...                                   │
    └─ Grain N ──► ...                                   │
                                                         ▼
                                                  Grain Mixer (sum)
                                                         │
                                                         ▼
                                                  Filter + Envelope
                                                         │
                                                         ▼
                                                  Output
```

**Grain windowing functions:**
- Hanning (default, smoothest)
- Gaussian
- Rectangular (for crisp, staccato textures)
- Triangular
- Tukey

**Scan modes:**
- **Fixed:** Grains drawn from a fixed position in the source (for looping textures)
- **Scan:** Position slowly advances through source (for time-stretching)
- **Random:** Position jumps randomly within a range (for cloud textures)
- **Envelope-driven:** Position follows a user-drawn envelope curve
- **MIDI-driven:** Position mapped to MIDI note pitch (keyboard scrubbing)

## 12.7 Built-in Effects Library

### 12.7.1 AUDIAW EQ

An 8-band parametric EQ with an analog-modeled filter response:

- Band types per band: High Pass, Low Shelf, Peaking, High Shelf, Low Pass, Notch, Band Pass, Allpass
- Frequency range: 20 Hz – 20 kHz
- Gain range: ±24 dB (peaking/shelf), slope for HP/LP: 6/12/24/48 dB/oct
- Q range: 0.1 to 20
- Analog saturation: optional tube-style soft saturation (0–100%)
- Mid/Side mode: independent EQ curves for Mid and Side channels
- Real-time spectrum analyzer overlay (FFT size: 4096, 60 Hz update)
- A/B comparison: store two EQ states and switch between them
- Auto-gain: compensates for changes in perceived loudness during EQ adjustments

**Filter implementation:** The AUDIAW EQ uses **State Variable Filters (SVF)** implemented via the Cytomic SVF design, chosen for:
- Stable behavior at high Q values (no self-oscillation instability)
- Minimal coefficient computation cost
- Good analog character in the transient response

### 12.7.2 AUDIAW Compressor

A versatile dynamic range processor with three circuit modes:

**FET mode** (inspired by 1176-style behavior):
- Very fast attack/release
- Aggressive, punchy character
- Natural program-dependent release
- All-ratio button (all ratios simultaneously, for extreme "slam")

**VCA mode** (transparent, surgical):
- Wide attack/release range
- Minimal coloration
- Best for mastering bus compression
- Side-chain high-pass filter included

**Opto mode** (inspired by LA-2A-style behavior):
- Program-dependent attack/release (circuit simulates optical behavior)
- Smooth, musical gain reduction
- "Optical curve" that subtly varies attack time with signal level
- Perfect for vocals and acoustic instruments

**Parameters (all modes):**
- Threshold: −60 to 0 dBFS
- Ratio: 1:1 to ∞:1 (limiter)
- Attack: 0.01ms to 100ms (mode-dependent range)
- Release: 5ms to 5000ms (mode-dependent range)
- Makeup gain: 0 to +24 dB (auto-makeup gain option)
- Mix: 0–100% (parallel compression, "New York" style)
- Sidechain input: internal or external sidechain bus
- Sidechain EQ: high-pass and peak filter on the sidechain signal

### 12.7.3 AUDIAW Reverb

An algorithmic reverb with two engine modes:

**Plate mode:** Simulates a metal plate reverb unit. Dense, diffuse, musical. Best for snares, vocals, general-purpose.

**Hall mode:** Simulates a large concert hall. Large space, natural early reflections, long tail. Best for orchestral elements and pads.

Parameters:
- Pre-delay: 0–150ms
- Size: 1–100 (virtual room size)
- Diffusion: 0–100% (density of early reflections)
- Decay: 0.1s – 60s
- Damping: High frequency absorption (0–100%)
- Early/Late: Balance between early reflections and reverb tail
- Width: Stereo width of the reverb output (0–200%)
- Mix: Wet/dry mix (0–100%)
- Modulation: Chorus-like modulation on the reverb tail (prevents metallic ringing)

**Freeze mode:** When enabled, the reverb tail recirculates infinitely (sustain held indefinitely). Performance tool for creating infinite pad swells.

### 12.7.4 AUDIAW Delay

A versatile delay effect with multiple modes:

- **Stereo delay:** Independent left/right delay times
- **Ping-pong:** Delay bounces between L and R channels
- **Haas:** Very short delay (1–40ms) for width and thickening
- **Lofi delay:** BBD (Bucket Brigade Device) emulation with wow/flutter and tape-style degradation

Parameters:
- Delay time: 1ms – 10s, or tempo-synced (1/128 to 4 bars, dotted/triplet variants)
- Feedback: 0–110% (above 100% = self-oscillation)
- High-pass filter in feedback path (prevents bass buildup)
- Low-pass filter in feedback path (simulates tape degradation)
- Stereo width
- Mix

---

*End of Volume III. Continue to Volume IV for File Browser, Keybindings, Theme System, Accessibility, Security, DevOps, QA, Open-Source Governance, Repository Standards, API Documentation, and Release Roadmap.*