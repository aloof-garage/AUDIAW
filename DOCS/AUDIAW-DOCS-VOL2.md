# AUDIAW — MASTER DOCUMENTATION ECOSYSTEM
## Volume II: UX Design System, Screen Specifications & Plugin Architecture

**Classification:** Internal Engineering Documentation  
**Version:** 0.1.0-draft  
**Continues from:** Volume I (PRD, Application Architecture, Audio Engine)

---

## TABLE OF CONTENTS — VOLUME II

4. [Complete UI/UX Master Design System](#4-complete-uiux-master-design-system)
5. [Detailed UX for Every Major Screen](#5-detailed-ux-for-every-major-screen)
6. [Complete User Flow Documentation](#6-complete-user-flow-documentation)
7. [Plugin System Master Document](#7-plugin-system-master-document)
8. [Modular Routing System Document](#8-modular-routing-system-document)

---

# 4. COMPLETE UI/UX MASTER DESIGN SYSTEM

## 4.1 Design Philosophy

### 4.1.1 The Invisible Tool Principle

The highest aspiration for AUDIAW's interface is that it disappears while you work. The interface should demand attention only when the user actively reaches for it. The rest of the time, it should be invisible: present, responsive, accurate — but never competing for cognitive space with the creative work.

This principle manifests in specific design directives:

**Directive 1: No Unsolicited Information**  
Every piece of information visible on screen must earn its position by being either immediately actionable or continuously relevant to the current task. Information that is "good to know but not right now" must live behind a gesture or keypress — not on the surface.

**Directive 2: Actions Live at the Point of Intent**  
When a user focuses attention on a track, the track controls become visible. When they hover over a clip, clip operations appear. Controls live where the user's attention already is — not in a remote toolbar or menu. This is the **Contextual Density** principle: high information density at the point of intent, low ambient density everywhere else.

**Directive 3: Visual Feedback is Instant or It Doesn't Exist**  
Every UI interaction must produce visible feedback within one animation frame (16ms at 60fps). If feedback cannot be provided within this window, AUDIAW provides an intermediate state (e.g., a loading indicator) rather than appearing frozen.

**Directive 4: Reversibility as Confidence**  
The user must feel safe to try things. This requires that every significant action is either previewed before committed (e.g., plugin parameter changes preview in realtime) or immediately undoable. The undo indicator is always visible in the toolbar.

### 4.1.2 Visual Clarity Framework

AUDIAW uses a structured approach to managing visual hierarchy across the application. Everything visible on screen exists at one of five clarity levels:

```
CLARITY HIERARCHY

Level 1 — PRIMARY FOCUS
  Content the user is actively working with.
  Full opacity, full saturation, high contrast.
  Examples: selected clip, active piano roll notes, focused channel strip.

Level 2 — ACTIVE CONTEXT
  Content directly relevant to the current task but not in focus.
  Full opacity, moderate saturation.
  Examples: tracks adjacent to selected track, timeline ruler, transport bar.

Level 3 — PASSIVE CONTEXT
  Content in view but not currently relevant.
  90% opacity, low saturation.
  Examples: deselected tracks, closed browser panels, inactive view tabs.

Level 4 — BACKGROUND INFRASTRUCTURE
  Structural elements that provide context/orientation.
  60% opacity, neutral color.
  Examples: grid lines, empty track lanes, panel borders.

Level 5 — INVISIBLE UNTIL INVOKED
  Controls that only appear on hover/focus.
  0% → 100% opacity on hover with 80ms ease transition.
  Examples: clip delete button, track mute button (in compact mode),
            inline property editors.
```

### 4.1.3 Cognitive Load Reduction Principles

**Chunking:** Visual groups of related controls share a container, background, or spatial separation. The user perceives them as a single cognitive unit. Example: all track controls (name, mute, solo, arm, volume, pan) live within a visually bounded track header region.

**Discoverability vs. Learnability Tradeoff:** AUDIAW optimizes for **learnability** over **discoverability** for core operations. This means:
- Core operations (play, record, add track, undo) are always visible even if that takes space
- Secondary operations (advanced routing, modulation mapping) are discoverable via right-click, modifier keys, or command palette
- Expert operations (MIDI CC routing, plugin crash isolation configuration) live in preferences

**Familiarity Anchoring:** AUDIAW uses UX conventions borrowed from the most successful DAWs where they serve the user:
- Arrangement view scroll/zoom behavior matches Ableton Live
- Mixer channel strip layout follows Pro Tools/Logic conventions
- Piano roll navigation matches FL Studio's keyboard shortcuts option
- Track colors use the same hue-based system as Ableton

## 4.2 Visual Design System

### 4.2.1 Typography System

AUDIAW uses a three-family type system:

**Display Family: "Geist Mono" (JetBrains Mono as fallback)**
- Used for: track names, timecode, sample position display, BPM, meter values
- Rationale: Monospaced type ensures alignment in numeric displays. Geist Mono has excellent legibility at small sizes. Monospaced character ensures that time values don't visually shift as digits change.
- Sizes: 11px (compact mode), 12px (standard), 13px (expanded)
- Weight: Regular (400) for values, Medium (500) for labels

**UI Family: "Inter Variable" (system-ui as fallback)**
- Used for: menu items, panel labels, button text, tooltip text, settings
- Rationale: Inter is optimized for screen rendering at small sizes. Its variable font axis allows weight tuning for visual hierarchy without multiple font files.
- Sizes: 11px (dense labels), 12px (standard UI), 13px (panel headers), 14px (section headers)
- Weights: Regular (400), Medium (500), Semibold (600)

**Content Family: "Inter Variable"**
- Used for: documentation, tutorial text, long-form content
- Sizes: 13px (compact), 14px (standard), 15px (expanded/accessible)
- Line height: 1.5 for readability

**Type Scale (CSS custom properties):**
```css
--type-xs:    10px;   /* Micro labels, keyboard shortcut hints */
--type-sm:    11px;   /* Track names in compact mode, meter labels */
--type-base:  12px;   /* Standard UI text */
--type-md:    13px;   /* Panel headers, important labels */
--type-lg:    14px;   /* Section headers */
--type-xl:    16px;   /* Modal titles, major section headers */
--type-2xl:   20px;   /* View titles */
--type-3xl:   24px;   /* Splash screen, onboarding */
```

### 4.2.2 Color System

AUDIAW's color system is built on three tiers:

**Tier 1: Semantic Colors (theme-adaptive)**
These colors adapt to the active theme (dark/light) and are the only colors used in production code:

```css
/* Surface colors */
--color-surface-base:     [theme: #1a1a1f dark / #f4f4f6 light]
--color-surface-raised:   [theme: #22222a dark / #ffffff light]
--color-surface-overlay:  [theme: #2d2d38 dark / #ebebef light]
--color-surface-inset:    [theme: #13131a dark / #e0e0e6 light]

/* Border colors */
--color-border-subtle:    [theme: rgba(255,255,255,0.06) dark / rgba(0,0,0,0.08) light]
--color-border-default:   [theme: rgba(255,255,255,0.12) dark / rgba(0,0,0,0.14) light]
--color-border-strong:    [theme: rgba(255,255,255,0.20) dark / rgba(0,0,0,0.22) light]

/* Text colors */
--color-text-primary:     [theme: rgba(255,255,255,0.92) dark / rgba(0,0,0,0.87) light]
--color-text-secondary:   [theme: rgba(255,255,255,0.55) dark / rgba(0,0,0,0.55) light]
--color-text-tertiary:    [theme: rgba(255,255,255,0.32) dark / rgba(0,0,0,0.32) light]
--color-text-disabled:    [theme: rgba(255,255,255,0.20) dark / rgba(0,0,0,0.20) light]

/* Accent color (user-configurable, default: electric blue) */
--color-accent-primary:   #3b82f6   /* Default: Blue-500 */
--color-accent-secondary: #60a5fa   /* Default: Blue-400 */
--color-accent-dim:       rgba(59,130,246,0.15)

/* Status colors */
--color-status-record:    #ef4444   /* Record active, clip recording */
--color-status-success:   #22c55e   /* Autosave complete, export done */
--color-status-warning:   #f59e0b   /* Buffer underrun, low disk space */
--color-status-error:     #ef4444   /* Plugin crash, device disconnected */

/* Level meter colors */
--color-meter-safe:       #22c55e   /* 0 to -12 dBFS */
--color-meter-caution:    #f59e0b   /* -12 to -3 dBFS */
--color-meter-danger:     #ef4444   /* -3 to 0 dBFS */
--color-meter-clip:       #ff0000   /* Above 0 dBFS (clipping) */
```

**Tier 2: Track/Clip Palette (16 user-assignable track colors)**

Track colors serve as spatial memory anchors. AUDIAW provides 16 carefully selected colors that:
- Are distinguishable under colorblind conditions (tested with deuteranopia/protanopia simulations)
- Have sufficient contrast against both dark and light surface colors
- Represent a logical "family" grouping (warm/cool/neutral tones)

```
Palette ID → Dark Surface Display → Light Surface Display → Name
COLOR_1:  #ef4444  /  #dc2626  → Crimson  (drums, heavy elements)
COLOR_2:  #f97316  /  #ea580c  → Ember    (bass, low-end)
COLOR_3:  #f59e0b  /  #d97706  → Amber    (percussion)
COLOR_4:  #eab308  /  #ca8a04  → Gold     (keys, piano)
COLOR_5:  #84cc16  /  #65a30d  → Lime     (rhythm guitar)
COLOR_6:  #22c55e  /  #16a34a  → Emerald  (lead guitar, strings)
COLOR_7:  #10b981  /  #059669  → Teal     (pads, atmospheric)
COLOR_8:  #06b6d4  /  #0891b2  → Cyan     (synth arps)
COLOR_9:  #3b82f6  /  #2563eb  → Blue     (main synth, leads)
COLOR_10: #8b5cf6  /  #7c3aed  → Violet   (FX, special)
COLOR_11: #d946ef  /  #c026d3  → Fuchsia  (vocal, featured)
COLOR_12: #f43f5e  /  #e11d48  → Rose     (vocal harmonies)
COLOR_13: #94a3b8  /  #64748b  → Slate    (reference, aux)
COLOR_14: #78716c  /  #57534e  → Stone    (ambient, texture)
COLOR_15: #a3a3a3  /  #737373  → Neutral  (general use)
COLOR_16: #ffffff  /  #d4d4d4  → White    (master, output)
```

### 4.2.3 Spacing System

AUDIAW uses a **4px base unit** spacing system:

```css
--space-0:   0px;
--space-px:  1px;
--space-0.5: 2px;
--space-1:   4px;    /* Micro spacing: between icon and label */
--space-1.5: 6px;    /* Small spacing: button padding */
--space-2:   8px;    /* Base spacing: control groups */
--space-3:   12px;   /* Medium spacing: section separation */
--space-4:   16px;   /* Large spacing: panel padding */
--space-5:   20px;   /* XL spacing: major section gaps */
--space-6:   24px;   /* 2XL spacing: layout grid */
--space-8:   32px;   /* Major structural spacing */
--space-10:  40px;   /* Layout anchor spacing */
--space-12:  48px;   /* Large layout spacing */
--space-16:  64px;   /* Maximum spacing */
```

**Application-specific spatial constants:**
```css
--height-transport-bar:   52px;  /* Top transport bar height */
--height-track-header:    32px;  /* Default track height (compact) */
--height-track-standard:  48px;  /* Standard track height */
--height-track-tall:      80px;  /* Tall/expanded track height */
--width-track-header:    216px;  /* Track header panel width */
--height-piano-keys:      24px;  /* Piano key area height (in piano roll) */
--width-mixer-channel:    72px;  /* Mixer channel strip width */
--height-statusbar:       22px;  /* Bottom status bar height */
--height-tabbar:          34px;  /* View tab bar height */
```

### 4.2.4 Motion System

AUDIAW's motion design follows three principles:

**1. Purpose:** Every animation serves the user's understanding. Animations explain relationships (where a clip came from, where a track moved to), confirm actions (a track appearing after creation), or provide feedback (meter level response). Purely decorative animations are prohibited.

**2. Speed:** Transitions should be fast. The user should not wait for an animation to complete before continuing work. Maximum transition duration: 200ms. Typical: 80–120ms.

**3. Easing:** All transitions use physics-based or ease-out curves. Ease-in transitions (which start slow) feel sluggish and are prohibited.

**Animation constants:**
```css
--motion-instant:    0ms;        /* State changes that must be immediate */
--motion-fast:       80ms;       /* Hover states, micro-feedback */
--motion-standard:  120ms;       /* Panels opening, track expand/collapse */
--motion-moderate:  180ms;       /* Modal open/close */
--motion-slow:      240ms;       /* View transitions (arrangement ↔ mixer) */

/* Easing functions */
--ease-out:          cubic-bezier(0.16, 1, 0.3, 1);   /* Standard UI */
--ease-spring:       cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful elements */
--ease-smooth:       cubic-bezier(0.4, 0, 0.2, 1);     /* Layout shifts */
```

**Prohibited animations:**
- Spinning loading indicators for operations that should complete in < 1 second
- Page-flip or slide transitions between major views (use instant opacity crossfade instead)
- Bouncing or elastic effects on professional UI elements
- Animations that move content the user is trying to read

### 4.2.5 Icon System

AUDIAW uses a custom icon library built on a consistent 24×24px grid with a 1.5px stroke weight (scaled to 1px at 16px icon size, 2px at 32px).

**Icon design principles:**
- Monoline: all icons use a single stroke weight
- Minimal: icons communicate their meaning with the minimum possible visual complexity
- Consistent corner radius: 2px on all icon corners
- No filled icons in the primary palette (filled icons reserved for active/selected states)

**Icon categories:**
```
Transport:    play, pause, stop, record, rewind, fast-forward, loop
Tracks:       audio, midi, group, return, master
Tools:        pointer, pencil, eraser, scissors, slice, zoom
Navigation:   arrow-left, arrow-right, zoom-in, zoom-out, home
Media:        waveform, midi-note, automation, sample, plugin
Routing:      send, return, sidechain, fx-chain, nested
Status:       mute, solo, arm, monitor, frozen, locked
Files:        folder, file, import, export, save, open
Interface:    gear, chevron, close, expand, collapse
```

### 4.2.6 Theme System

AUDIAW ships with three built-in themes and a user theming API:

**AUDIAW Dark (default):** Deep neutral grays with electric blue accent. Optimized for long sessions in low-light conditions. Waveform colors shift from green (safe) to amber (caution) to red (clip).

**AUDIAW Light:** Light neutral grays with the same electric blue accent. Optimized for bright studio environments and high-contrast monitoring.

**AUDIAW Warm Dark:** Same structure as AUDIAW Dark but with warm gray (slightly brownish neutral) tones. Reduces eye strain for extended night sessions. Popular in film scoring communities.

**User themes:** Themes are defined as a JSON file containing semantic color overrides. Theme files can be shared and installed via drag-and-drop:

```json
{
  "name": "Midnight Forest",
  "author": "community-user",
  "version": "1.0.0",
  "colors": {
    "surface-base": "#0f1a14",
    "surface-raised": "#162219",
    "accent-primary": "#4ade80",
    "accent-secondary": "#86efac",
    "meter-safe": "#4ade80",
    "meter-caution": "#fbbf24",
    "meter-danger": "#f87171"
  }
}
```

## 4.3 Workspace Systems

### 4.3.1 Docking Architecture

AUDIAW uses a **panel-based docking system** inspired by VS Code and Bitwig Studio. The application window is divided into **zones** that can contain **panels**:

```
┌─────────────────────────────────────────────────────────────┐
│                    TRANSPORT BAR                             │
├──────────┬──────────────────────────────────┬───────────────┤
│          │                                  │               │
│ LEFT     │         MAIN CONTENT AREA        │  RIGHT        │
│ PANEL    │    (arrangement / mixer /        │  PANEL        │
│ ZONE     │      piano roll / browser)       │  ZONE         │
│          │                                  │               │
│ [Browser]│                                  │ [Device View] │
│ [MIDI]   │                                  │ [Info Panel]  │
│ [Files]  │                                  │ [Automation]  │
├──────────┴──────────────────────────────────┴───────────────┤
│                    BOTTOM PANEL ZONE                         │
│          [Mixer] [Piano Roll] [Event List] [Browser]         │
├─────────────────────────────────────────────────────────────┤
│                    STATUS BAR                                │
└─────────────────────────────────────────────────────────────┘
```

**Panel zones:**
- **Transport Bar:** Fixed. Contains transport controls, BPM, time signature, project name, CPU/memory meters.
- **Left Panel Zone:** Collapsible. Width adjustable (160–400px). Hosts: File Browser, MIDI Input Monitor, Clip Launcher (in performance mode).
- **Main Content Area:** The primary view. Hosts one active view at a time: Arrangement, Mixer, Piano Roll, Automation Editor. View switching via keyboard shortcut or tab bar.
- **Right Panel Zone:** Collapsible. Width adjustable (200–500px). Hosts: Device/Plugin View (shows selected track's instruments/effects), Info Panel, Notes Panel.
- **Bottom Panel Zone:** Collapsible (drag up from bottom). Height adjustable. Hosts: Mixer (when used as a floating panel below arrangement), Piano Roll, Event List.
- **Status Bar:** Fixed, 22px. CPU load, disk I/O, sample rate, buffer size, project duration, current selection info.

**Workspace presets:** The entire panel layout (which panels are open, their sizes, their positions) is saveable as a named workspace preset. AUDIAW ships with:
- **Production:** Arrangement primary, Browser left, Device panel right
- **Mixing:** Mixer primary, no browser, device panel right
- **Performance:** Clip launcher primary, browser hidden
- **Podcast:** Arrangement primary, waveform editor panel primary

### 4.3.2 Multi-Monitor Support

AUDIAW supports detaching any panel into a floating window that can be positioned on a secondary monitor:

- Right-click any panel tab → "Detach to Window"
- The detached window maintains full functionality
- Plugin windows can be "always on top" relative to the main window
- The main window title bar shows which panels are detached
- Detached windows are remembered across sessions by monitor identity

**Monitor identification:** AUDIAW identifies monitors by their EDID (hardware ID) where available, falling back to logical index. This ensures that multi-monitor workspace layouts restore correctly when the same monitors are reconnected.

## 4.4 Accessibility

AUDIAW follows WCAG 2.1 AA as a baseline, with specific audio software extensions:

**Keyboard navigation:** Every interactive element is reachable via keyboard. Tab order follows logical document order. Focus indicators are always visible (never suppressed for aesthetic reasons). Custom keyboard navigation is provided for the arrangement view (arrow keys + modifiers for clip selection and navigation).

**Screen reader support:** All interactive elements have `aria-label` attributes. Status changes (playhead position, meters, record state) are announced via `aria-live` regions at appropriate verbosity levels. The piano roll provides spoken feedback for selected MIDI notes (pitch, velocity, duration).

**Color-blind safety:** All information conveyed by color is also conveyed by shape, text, or position. Track colors are supplemented by track icons. Meter states are supplemented by labels. Record state is conveyed by both color (red) and icon change.

**Motion sensitivity:** A "Reduce Motion" setting disables all non-essential animations. This respects the OS-level `prefers-reduced-motion` media query automatically.

---

# 5. DETAILED UX FOR EVERY MAJOR SCREEN

## 5.1 Main Arrangement View

The Arrangement View is the primary working surface of AUDIAW. It represents time horizontally and tracks vertically, with audio/MIDI clips as rectangular objects on the timeline.

### 5.1.1 Layout Anatomy

```
ARRANGEMENT VIEW — ANATOMY

┌────────────────────────────────────────────────────────────────────┐
│  RULER AREA                                                         │
│  [Bar 1     ][Bar 2     ][Bar 3     ][Bar 4     ][Bar 5     ]...   │
│  [1.1.1][1.2.1][1.3.1][1.4.1][2.1.1]...  ← tick marks             │
├──────────────────┬─────────────────────────────────────────────────┤
│  TRACK HEADER    │  TIMELINE LANE                                   │
│  ┌──────────────┐│┌──────────────────────────────────────────────┐ │
│  │► Track 1     │││  [  CLIP A  ][  CLIP B  ]                    │ │
│  │  Kick Drum   │││                                               │ │
│  │  ♪ ○ ◉  🔇  │││                                               │ │
│  └──────────────┘│└──────────────────────────────────────────────┘ │
│  ┌──────────────┐│┌──────────────────────────────────────────────┐ │
│  │► Track 2     │││  [      CLIP C               ][  CLIP D  ]   │ │
│  │  Bass Synth  │││                                               │ │
│  │  ♪ ○ ◉  🔇  │││                                               │ │
│  └──────────────┘│└──────────────────────────────────────────────┘ │
│  [+] Add Track   │                                                  │
├──────────────────┴─────────────────────────────────────────────────┤
│  MINI TIMELINE (overview/navigation bar)                            │
│  [▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] │
└────────────────────────────────────────────────────────────────────┘
```

### 5.1.2 Track Header Controls

The track header is a 216px wide panel containing all track controls:

**Standard Track Header (48px height):**
```
[Color Bar][▶ Expand][  Track Name  (editable) ][🔇][◉][○][…]
           Collapse    Double-click to rename    Mute Record Solo Menu
```

Controls (left to right):
1. **Color indicator strip** (4px): Click to open color picker. Drag to change color with visual preview.
2. **Expand/collapse toggle** (12px): Expand track to show waveform detail or collapse to 32px compact mode
3. **Track icon** (16px): Indicates track type. Audio (waveform icon), MIDI (note icon), Group (folder icon), Return (arrow icon)
4. **Track name** (elastic): Single click selects, double-click enters inline edit mode. 32-character display limit with text overflow ellipsis.
5. **Mute button** (M): Press M key with track focused. Visual: speaker icon. Muted state: icon with strikethrough + track lane desaturates to 30% opacity.
6. **Solo button** (S): Press S key. Visual: headphones icon. Solo state: all other tracks semi-transparent.
7. **Record arm button** (R): Press R key. Visual: circle icon (record symbol). Armed state: red dot, lane background shows subtle red tint.
8. **Track menu** (⋯): Contains: rename, color, duplicate, delete, freeze, export as stem, track properties.

**Compact Track Header (32px height):**
All controls persist but labels are hidden. Icons only. Track name tooltip on hover.

**Tall Track Header (80px height):**
Adds: volume fader (horizontal slider), pan knob, and pre-fader level meter. All editable inline.

### 5.1.3 Timeline Lane & Clip Design

**Audio Clip anatomy:**
```
┌───────────────────────────────────────────────────┐
│ Clip Name          [🔁 loop indicator]             │  ← Header bar (14px)
│▓▓▓▓▓▓▓▓▓▓▓▓█░░░░░░██▓▓▓▓▓▓▓▓▓▓░░░░░░░░░█▓▓▓▓▓   │  ← Waveform
│                                                    │
└────────────────────────────────────────────────────┘
  ▲                                                ▲
  Left resize handle                   Right resize handle
```

Clip header bar contains:
- Clip name (click to rename in-place)
- Loop indicator (visible when clip is looped)
- Clip color (inherits track color by default; independently overridable)

Waveform rendering:
- GPU-accelerated via WGPU (see Architecture document)
- Minimum 2px visible even for very short clips
- RMS envelope as filled area + peak outline
- Empty audio shows dotted outline
- MIDI clips show colored MIDI note bars instead of waveform

**Clip interaction model:**

| Interaction | Effect | Cursor |
|---|---|---|
| Click (no modifier) | Select clip, deselect others | Pointer |
| Shift+Click | Add to selection | Pointer |
| Ctrl/Cmd+Click | Toggle in selection | Pointer |
| Drag center | Move clip | Grab |
| Drag left edge | Trim clip start | Resize-left |
| Drag right edge | Trim clip end | Resize-right |
| Alt+Drag | Create clip copy (non-destructive) | Copy |
| Double-click audio | Open clip in waveform editor | — |
| Double-click MIDI | Open clip in piano roll | — |
| Right-click | Context menu | — |
| Mouse wheel | Scroll timeline | — |
| Ctrl+Mouse wheel | Zoom timeline horizontally | — |

**Context menu contents:**
- Rename
- Color (submenu with palette)
- Duplicate
- Loop (toggle)
- Crop to content
- Reverse (audio only)
- Normalize (audio only)
- Pitch shift (semitones ± input)
- Time stretch (% input)
- Export clip as audio
- Convert to pattern (extract to reusable pattern)
- Delete

### 5.1.4 Selection Systems

**Selection models:**

1. **Single selection:** Click a clip. Selection indicator: highlighted border, header bar darkens.
2. **Multi-selection:** Shift+Click, Ctrl/Cmd+Click, or rubber-band drag (click empty timeline space and drag)
3. **Track selection:** Click track header. All clips in track highlight.
4. **Time range selection:** Click-drag on the ruler. Creates a time selection overlay. Operations apply to selected time range.
5. **Combined selection:** Time range + track selection = operations apply to clips in selected tracks within selected time range.

**Selection affordances:**
- Selected clips have a distinct border highlight (2px, accent color)
- Group selection count shown in status bar: "3 clips selected"
- Selection can be extended with Shift+Arrow keys (by snap unit)
- Select All: Ctrl/Cmd+A (all clips in project)
- Deselect: Escape or click empty space

### 5.1.5 Zoom & Navigation

**Horizontal zoom:**
- Ctrl+Mouse wheel: zoom centered on cursor position
- Ctrl+Plus / Ctrl+Minus: zoom in/out centered on playhead
- Ctrl+0: fit project to window width
- Ctrl+1: zoom to selection
- Zoom range: 1 pixel = 1 sample (maximum zoom-in) to 1 pixel = 4 bars (maximum zoom-out)
- Zoom transitions are animated (80ms ease-out) but can be disabled in preferences

**Vertical zoom (track height):**
- Ctrl+Alt+Mouse wheel: resize all track heights proportionally
- Individual track: drag bottom edge of track header
- `Z` key: cycle through compact/standard/tall for selected tracks

**Mini timeline (overview bar):**
- Always shows full project duration
- Viewport indicator: filled region showing current visible area
- Drag viewport indicator to scroll
- Click outside viewport indicator to jump (centers view on click position)
- Highlighted clip density visualization to show content location

**Keyboard navigation (Vim-style for power users):**
```
H / L          ← → scroll timeline
J / K          ↑ ↓ select next/previous track
Shift+H/L      scroll faster (4x)
Z (hold)       zoom in while held
X (hold)       zoom out while held
F              fit project to window
Shift+F        fit selection to window
```

---

## 5.2 Mixer View

The Mixer View provides a traditional mixing console layout with channel strips arranged horizontally.

### 5.2.1 Channel Strip Anatomy (72px wide, full height)

```
CHANNEL STRIP — TOP TO BOTTOM

┌──────────────────┐
│  PLUGIN SLOTS     │  → 6 slot insert chain (each: plugin thumbnail, power, remove)
│  [EQ  ] [ON]  [X]│
│  [Comp] [ON]  [X]│
│  [Rev ] [ON]  [X]│
│  [    ] [+]       │  → Add plugin slot
├──────────────────┤
│ SEND SLOTS        │  → N send slots (amount knob + destination label)
│  → Reverb  0.0dB  │
│  → Delay   -6.0dB │
├──────────────────┤
│  PAN              │  → Bipolar pan knob (-100L to +100R)
│       ◉           │    Center click to reset, Ctrl+drag for fine
├──────────────────┤
│  FADER            │  → ∞ to +6.0 dB, logarithmic scale
│                   │    12 dB unity mark at 75% position
│       │           │    Color gradient: green safe / amber caution / red clip
│       │           │
│       │           │
│       │           │
│  ─────┼─────      │  ← Unity (0 dB) mark
│       │           │
├──────────────────┤
│  METER            │  → L+R stereo meter (4px wide each)
│ ║║║║║║║║║║║║║║║║ │    60 Hz update rate
├──────────────────┤
│  FADER VALUE      │  → "+0.0 dB" (click to enter value)
├──────────────────┤
│  [M] [S] [R]      │  → Mute / Solo / Record arm
├──────────────────┤
│  Track Name       │  → Click to rename
│  (channel color)  │    Track color shown as 4px bottom border
└──────────────────┘
```

### 5.2.2 Mixer Navigation

**Track count handling:**
- Up to 16 channels visible simultaneously at 72px channel width (1280px display)
- Horizontal scrolling for larger sessions
- Channel width adjustable: 56px (compact) / 72px (standard) / 96px (wide)
- Track search: `Ctrl+F` in mixer opens search overlay, type to filter visible channels
- Track groups: group channels are visually bracketed together

**Bus and special channel types:**

```
Channel Type    | Color Indicator | Icon  | Special Features
─────────────────────────────────────────────────────────────
Track Channel   | Track color     | wave  | Standard insert chain
Group Bus       | Group color     | folder| Shows group members bracket
Return Channel  | Cyan            | arrow | No fader send slots
Master Channel  | White           | crown | No mute, no solo, limiter slot
Sidechain Bus   | Orange          | chain | Input routing only, no output fader
```

### 5.2.3 Plugin Slot UX

Each channel strip has 6 insert effect slots. Slot interaction:

- **Empty slot:** Shows dashed border + "+" icon. Click to open plugin browser filtered to effects.
- **Loaded slot:** Shows plugin thumbnail (plugin-defined 32×32px image or auto-generated from plugin name). Shows bypass toggle (green = active, gray = bypassed). Shows remove button (×, visible on hover).
- **Drag to reorder:** Drag a slot up/down to reorder effects in the chain. Visual indicator shows insertion point.
- **Drag between channels:** Drag a slot to another channel's slot area to copy/move the plugin.
- **Double-click slot:** Opens plugin UI window.
- **Right-click slot:** Context menu: open, bypass/enable, copy, paste, move to other slot, save as preset, delete.

**Plugin UI Windows:**
- Floating windows by default, 1:1 with plugin's reported window size
- Title bar: plugin name, preset selector, save preset, close
- Resizable (if plugin supports resize)
- "Always on top" toggle to keep plugin UI visible during mixing
- Per-window opacity setting (70–100%) for see-through monitoring
- Position is remembered per-plugin-instance per-project

---

## 5.3 Piano Roll

The Piano Roll is the primary MIDI editing environment. It is opened from the arrangement view by double-clicking any MIDI clip.

### 5.3.1 Piano Roll Layout

```
PIANO ROLL LAYOUT

┌───────────────────────────────────────────────────────────────────┐
│ TOOLBAR: [Pencil][Eraser][Select][Zoom] | [Quantize: 1/16▾] | ... │
├────────┬──────────────────────────────────────────────────────────┤
│ OCTAVE │ PIANO KEY GUIDE (vertical chromatic scale display)        │
│  C5    │─────────────────────────────────────────────────────────│
│ B4     │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ← C#  │
│ Bb4    │─────────────────────────────────────────────────────────│
│ A4     │                     [NOTE]          [NOTE NOTE]          │
│ Ab4    │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         │
│ G4     │                          [  NOTE  ]                      │
│ Gb4    │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         │
│ F4     │  [LONG NOTE -----------------]                           │
│ E4     │─────────────────────────────────────────────────────────│
│ Eb4    │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         │
│  D4    │                                     [N]                  │
│ C#4    │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         │
│  C4    │─────────────────────────────────────────────────────────│
├────────┴──────────────────────────────────────────────────────────┤
│ VELOCITY EDITOR                                                    │
│ ▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐▐ │
└────────────────────────────────────────────────────────────────────┘
```

### 5.3.2 MIDI Note Interaction

**Note creation (Pencil tool):**
- Click empty space: create note at quantize grid position, default length = current quantize value
- Click+drag: create note and extend length while holding
- Notes snap to horizontal grid (quantize) and vertical grid (semitone)
- Hold Shift to override horizontal snap (free placement)
- Hold Ctrl/Cmd to override vertical snap (microtonal or between semitones)

**Note selection:**
- Click note: select (deselect others)
- Shift+click: add to selection
- Rubber-band drag (Selection tool): select all notes touched by drag box
- Ctrl+A: select all notes
- Notes in selection display as brighter/accent color

**Note manipulation:**
- Drag selected notes: move (snaps to grid)
- Drag left edge: trim note start
- Drag right edge: trim note end (extend/shorten duration)
- Alt+drag: copy notes to new position
- Delete: delete selected notes
- Arrow keys: nudge selected notes by current quantize value
- Shift+Arrow Up/Down: transpose selected notes by semitone
- Ctrl+Arrow Up/Down: transpose selected notes by octave
- Scroll mouse wheel on selected notes: change velocity proportionally (±5 per scroll step)

### 5.3.3 Velocity Editor

The velocity editor panel below the piano roll is a bar-graph representation of note velocities:

- Each note has a corresponding vertical bar (height = velocity value, 0–127)
- Click bar: select note, set velocity by drag height
- Drag across multiple bars: ramp velocity (linear interpolation)
- Right-click bar: context menu with velocity presets
- Select notes in piano roll, then drag in velocity editor: scale selected velocities

**Velocity visualizations:**
- Bars colored by velocity: low velocity = pale color, high velocity = bright color (matching note color family)
- Average velocity line overlay (optional)
- Velocity humanize: select notes → Humanize button → ±20 velocity random variation

### 5.3.4 Quantization UX

The quantize selector is a dropdown in the piano roll toolbar:

```
Straight:    1/4, 1/8, 1/16, 1/32, 1/64, 1/128
Triplet:     1/4T, 1/8T, 1/16T, 1/32T
Dotted:      1/4., 1/8., 1/16.
Swing:       1/8 swing (%), 1/16 swing (%)
No Snap:     Free placement
```

**Quantize to grid (Q key):** Moves selected notes to the nearest grid position. Strength parameter (0–100%) allows partial quantization for humanization.

**Record quantize:** Optional; quantizes notes as they are recorded in realtime. Adjustable strength.

### 5.3.5 Scale & Chord Helpers

**Scale highlighting:** The piano roll can highlight notes belonging to a user-selected scale. Non-scale notes are subtly grayed. Piano keys that are in the scale are highlighted.

```
Scale: C Major
Highlighted: C, D, E, F, G, A, B (all octaves)
Grayed piano keys: C#, D#, F#, G#, A#
```

**Chord detection:** When multiple notes are selected at the same time position, AUDIAW detects and displays the chord name above the piano roll content area.

**Chord insert mode:** A chord palette panel (optionally displayed) allows clicking chord names to insert all chord notes at once at the playhead position.

---

## 5.4 Sample Browser & Asset Management View

The Browser is a left-panel or bottom-panel component for discovering and managing audio assets.

### 5.4.1 Browser Structure

```
BROWSER — TAB STRUCTURE

[Samples] [Plugins] [Presets] [Projects] [Tags]

─────────────────────────────────────
SAMPLES TAB LAYOUT:

[📁 Search...              ] ← Global search field

LOCATIONS
  ├─ 📁 AUDIAW Library        ← Built-in samples (750+ free samples)
  │   ├─ 📁 Drums
  │   ├─ 📁 Bass
  │   ├─ 📁 Synths
  │   ├─ 📁 Vocals
  │   └─ 📁 FX
  ├─ 📁 User Library           ← User's own samples
  ├─ 📁 Downloads              ← Auto-indexed on first launch
  └─ ➕ Add Location           ← Add any folder to the browser

SAMPLE LIST (when folder selected):
  ► 808 Kick Heavy.wav      4.2s   🔖 ★
  ► Clap Room Reverb.wav    1.8s   🔖
  ► Hi-Hat Closed 1.wav     0.3s
  ► Hi-Hat Closed 2.wav     0.3s
  ...

PREVIEW PLAYER (bottom of browser):
  [◀◀][▶][■]  🔊  ─────●──── 0:02.4 / 0:04.2  [🔁 Loop]
```

### 5.4.2 Preview System

- **Auto-preview:** Option to automatically play sample on single-click (with 200ms delay to avoid false triggers during scroll)
- **Manual preview:** Press Space while sample is selected
- **Preview synced to tempo:** Option to preview loops with tempo-synced playback, matching project BPM
- **Preview routes through master effects chain** (optional, for mixing context)
- **Preview pitch:** Shift+scroll on preview player to audition at different pitches

### 5.4.3 Search & Filtering

```
Search operators:
  "kick"           → contains "kick" in filename or tags
  "kick bpm:120"   → contains "kick" AND tagged with 120 BPM
  "kick -snap"     → contains "kick" AND does not contain "snap"
  type:loop        → loop-type samples only
  key:C            → samples tagged with key C
  dur:>2s          → samples longer than 2 seconds

Filter panel (collapsible, below search):
  [ ] Loops only
  [ ] One-shots only
  [✓] Show .wav
  [✓] Show .aiff
  [✓] Show .flac
  [ ] Show .mp3
  Duration: [any ▾]
  BPM: [any ▾]
  Key: [any ▾]
  Tags: [add tag filter ▾]
```

### 5.4.4 Drag & Drop

- Drag any sample from browser to a timeline lane → creates audio clip
- Drag to empty area below last track → creates new audio track with clip
- Drag to instrument/sampler plugin → loads as sample in that instrument
- Drag to sampler track → maps to MIDI keyboard automatically
- Visual drag indicator shows where the clip will land before releasing

---

# 6. COMPLETE USER FLOW DOCUMENTATION

## 6.1 Beatmaking Workflow

### 6.1.1 Flow Overview

The beatmaking flow in AUDIAW is designed around a **pattern-first → arrange later** model. Users create drum patterns and melodic loops in clip-based pattern view, then arrange those patterns in the timeline.

### 6.1.2 Step-by-Step User Journey: Creating a Trap Beat from Scratch

**Step 1: Create New Project**
- User opens AUDIAW → sees Start Screen
- Selects "Trap" template from genre gallery
- Template loads with: 808 kick track, hi-hat track, snare track, 808 bass synth, two melodic synth tracks
- Default tempo: 140 BPM (editable immediately in transport bar)
- *User emotion: "I can already imagine this becoming a beat"*
- **Interaction:** Single click on template → project opens in < 3 seconds
- **Keyboard shortcut:** `Ctrl+N` then type to filter templates

**Step 2: Program Drum Pattern**
- User clicks the drum track's clip area → a pattern block appears
- Double-click pattern → opens built-in Step Sequencer
- 16-step grid displayed with sample slots on left:
  - 808 Kick / Snare / Closed HH / Open HH
- User clicks steps to enable (cell turns track color when active)
- Pattern plays back in real-time as user edits (no need to stop and restart)
- *User emotion: "Instant gratification as I add each element"*
- **Key shortcut:** While hovering a step, `V` = increase velocity, `Shift+V` = decrease

**Step 3: Add 808 Bass Line**
- User selects the 808 Bass Synth track
- Clicks in the timeline to create a MIDI clip (pencil tool)
- Double-clicks clip → Piano Roll opens in bottom panel
- Root note C1 glows (scale highlighting active, scale: C Minor)
- User draws 808 bass note: click+drag to set pitch and length
- For the iconic 808 pitch slide: select note → hold Ctrl, drag to next note → pitch slide connects them
- *User emotion: "The 808 sounds heavy and impactful"*

**Step 4: Add Melody/Lead**
- User selects Lead Synth track
- Right-click the built-in synth icon → opens Wavetable Synth
- Browses preset bank → selects "Dark Lead"
- Creates MIDI clip, opens piano roll
- Draws melody against the scale highlight guide
- *User emotion: "I can hear the full beat forming"*

**Step 5: Arrange the Full Track**
- Back in Arrangement View
- User duplicates the 4-bar loop → places throughout the arrangement
- Drags clips to build: intro → verse → drop → verse → outro
- Right-click timeline ruler → "Add Marker" to label sections
- *User emotion: "It's starting to sound like a real track"*

**Step 6: Add Variation**
- User wants the drop to hit harder
- Selects the drum clip in the drop section → Right-click → Duplicate as New Pattern
- Opens the new pattern in step sequencer → adds extra 808 hits, removes hihats
- The unique pattern plays only in the drop section
- *User emotion: "Powerful, targeted control without complexity"*

**Step 7: Quick Mix**
- Opens Mixer via `M` key
- Adjusts channel volumes, adds EQ to kick (click empty plugin slot → EQ appears)
- Adds compression to drum group bus
- *User emotion: "Professional results, familiar workflow"*

**Step 8: Export**
- `Ctrl+E` → Export dialog
- Selects: WAV, 44.1kHz, 24-bit, entire project
- Export completes in 3 seconds
- File opens in system file manager automatically
- *User emotion: "Done. Sent to the artist in minutes."*

### 6.1.3 Optimization Opportunities Identified

- **Step 2 → Pattern context:** When a step sequencer pattern is empty, show a "copy from standard [genre] pattern" quick-start option
- **Step 5 → Arrangement:** "Arrange from Loops" assistant: AUDIAW offers to generate a basic arrangement structure from existing patterns
- **Step 6 → Variation:** Variation tracking (annotate which clips are variants of which) to reduce organizational cognitive load
- **Step 8 → Export:** "Share" preset system for streaming platforms (MP3 320, WAV 44.1kHz 16-bit, WAV 48kHz 24-bit)

---

## 6.2 Recording Vocals Workflow

### 6.2.1 Flow Overview

Vocal recording requires: low-latency monitoring, input signal metering, punch-in recording, take management, and quick comping.

### 6.2.2 Step-by-Step User Journey: Recording a Vocal Take

**Step 1: Audio Device Setup**
- `Ctrl+,` → Preferences → Audio
- Select audio interface (appears immediately in device list)
- Buffer size reduced to 128 samples for monitoring
- *User sees:* Estimated latency: 5.3ms round-trip
- *User emotion: "Fast enough for comfortable monitoring"*

**Step 2: Create Vocal Track**
- Click `+` in track panel → select "Audio Track"
- Track appears with default name "Audio 1"
- Double-click name → rename "Lead Vocal"
- Click the input selector on track header → select Interface Input 1 (microphone)
- Click the monitoring button (headphone icon) → direct monitoring activated

**Step 3: Gain Stage**
- Input level meter on the vocal track shows microphone signal
- User speaks/sings → meter shows level
- Adjust gain on audio interface until meter peaks around -12 to -6 dBFS (green zone)
- *AUDIAW displays:* "Good level for recording" when signal is in optimal range

**Step 4: Record First Take**
- Arm record button on vocal track (R key / click R in track header)
- Track turns red (armed state)
- Press Space to start playback → hear backing track
- Press `Ctrl+R` to record → recording starts at playhead
- *Visual:* Red waveform builds in real-time as audio is captured
- Press Space to stop recording

**Step 5: Listen Back & Punch In**
- Move playhead to beginning → Space to play
- User identifies a section to re-record: bars 4-6
- Set loop markers: `I` at bar 4, `O` at bar 6
- Enable loop recording mode: `Ctrl+L`
- `Ctrl+R` to record → records bars 4-6, loops, records again
- Each pass creates a new "take lane"

**Step 6: Take Management & Comping**
- Click the expand arrow on the vocal track → reveals take lanes below
- Take 1, Take 2, Take 3 visible as separate waveform strips
- User selects the best sections from each take:
  - Take 1: Bars 1-3 (best performance)
  - Take 2: Bars 4-6 (better punch-in)
  - Take 3: Bars 7-end (stronger ending)
- Click-drag across take lanes to select regions
- *AUDIAW:* Crossfades between comp sections automatically
- "Flatten Comp" → merges to single track with crossfades applied
- *User emotion: "Professional comping in seconds"*

---

## 6.3 Mixing Workflow

### 6.3.1 Step-by-Step User Journey: Mixing a 32-Track Session

**Step 1: Organization Before Mixing**
- `M` key → switch to Mixer view
- Color-code channel groups: drums = red, bass = orange, keys = blue, vocals = pink
- Create group buses: select drum channels → `Ctrl+G` → Group Bus
- Arrange channel order: drag channels to logical order (drums left → bass → keys → vocals → FX → master)

**Step 2: Gain Staging**
- Bring all faders to unity (0 dB) baseline
- Play section with most energy (bridge/chorus/drop)
- Adjust individual track faders until master peaks around -6 dBFS
- *Goal:* Headroom for effects and dynamics processing

**Step 3: Low-End Management**
- Add High-Pass Filter (built-in EQ) to every non-bass track
- HPF frequencies by track type:
  - Vocals: 80 Hz
  - Guitar: 100 Hz
  - Synth pads: 60 Hz
  - Keys: 80 Hz
- This alone dramatically improves mix clarity

**Step 4: EQ Passes**
- Soloed EQ pass for each track
- Frequency audit: find the resonant peak, reduce; find the character frequency, boost
- Cut narrow, boost wide (general rule)
- AUDIAW EQ provides: frequency spectrum analyzer overlay, A/B comparison, history

**Step 5: Dynamics Processing**
- Add compressor to drums, bass, vocals
- AUDIAW built-in compressor: analog modeling, ratio/attack/release/threshold
- Sidechain: kick compressor receives signal from 808 bass (sidechain bus routing)
  - Track header → create sidechain → select source → done (3 clicks)

**Step 6: Spatial Processing**
- Add reverb to FX return channel (prevent multiple reverb instances)
- Create send from each track → amount dial controls wet signal
- Add delay with tempo-sync to lead elements
- Stereo imaging: Mid-Side EQ to main stereo bus

**Step 7: Automation**
- Volume automation for vocal rides (level changes throughout song)
- `A` key → view automation lanes
- Draw automation curve on vocal track
- Use pencil tool for precise control, smooth tool for curves
- Playback and fine-tune

**Step 8: Master Bus Processing**
- Master bus: Glue Compressor → Clipper → Limiter
- Target: -1.0 dBFS true peak for streaming
- AUDIAW LUFS meter shows: Integrated LUFS, Short-term LUFS, Momentary, True Peak
- Ensure Integrated LUFS hits target for distribution (typically -14 LUFS for streaming)

---

# 7. PLUGIN SYSTEM MASTER DOCUMENT

## 7.1 Plugin Architecture Overview

AUDIAW's plugin system is designed around four core requirements:

1. **Crash isolation:** A plugin crash must NEVER crash the host. It should produce silence and be reported to the user.
2. **Format universality:** VST3, CLAP, AU, and LV2 must all work identically from the user's perspective.
3. **Performance:** Plugin processing overhead must be minimal. The plugin hosting bridge adds < 0.1ms per buffer period.
4. **Developer-friendliness:** Plugin developers should be able to use AUDIAW as a first-class development and testing environment.

## 7.2 Plugin Process Architecture (Crash Isolation)

Each plugin runs in a **dedicated child process** connected to the host via shared memory. This is the same approach used by Bitwig Studio and is the gold standard for plugin crash isolation.

```
HOST PROCESS                     PLUGIN PROCESS
──────────────────────────────   ─────────────────────────────────
Plugin Manager                   Plugin Bridge
│                                │
│  Shared Memory Block           │
│  ┌─────────────────────────┐   │
│  │  INPUT audio buffers    │──►│─► Plugin::process()
│  │  OUTPUT audio buffers   │◄──│◄─ (result written here)
│  │  MIDI events            │──►│
│  │  Parameter updates      │──►│
│  │  Parameter state        │◄──│
│  └─────────────────────────┘   │
│                                │
│  IPC Control Channel           │
│  (for initialization,          │
│   state load/save, UI)         │
│                                │
│  Watchdog Timer                │
│  (terminates plugin process    │
│   if audio callback does not   │
│   complete within timeout)     │
```

**Shared memory protocol:**
```rust
pub struct PluginSharedMemory {
    /// Semaphore: host signals ready, plugin processes, plugin signals done
    process_ready: AtomicU8,
    process_done: AtomicU8,
    
    /// Audio data
    input_buffers: [f32; MAX_CHANNELS * MAX_BUFFER_SIZE],
    output_buffers: [f32; MAX_CHANNELS * MAX_BUFFER_SIZE],
    
    /// MIDI events for this buffer (lock-free array)
    midi_event_count: AtomicU32,
    midi_events: [MidiEvent; MAX_MIDI_EVENTS],
    
    /// Parameter state
    param_update_count: AtomicU32,
    param_updates: [ParamUpdate; MAX_PARAM_UPDATES],
}
```

**Timeout behavior:**
- Audio callback timeout: `buffer_size / sample_rate * 0.8` (80% of buffer period)
- If plugin process does not complete within timeout:
  - Output buffer is filled with silence
  - `plugin_timeout_count` is incremented
  - If timeout occurs 3 consecutive times: plugin is marked as "crashed", output stays silent, user is notified
  - Crashed plugin can be relaunched without stopping playback

## 7.3 Plugin Lifecycle

```
PLUGIN LIFECYCLE

discovered → scanned → validated → loaded → initialized → active → inactive → unloaded
                              ↑                              ↓          ↑
                         (on project open)            (project close / track freeze)
                         
crashed → quarantined → user action → relaunched or removed
```

**Scanning:**
- Initial scan occurs on first launch and finds all plugins in standard locations
- Platform-specific default scan paths:
  - **Windows:** `C:\Program Files\Common Files\VST3`, `C:\Program Files\VSTPlugins`, AUDIAW settings path
  - **macOS:** `/Library/Audio/Plug-Ins/VST3`, `~/Library/Audio/Plug-Ins/VST3`, `/Library/Audio/Plug-Ins/Components` (AU)
  - **Linux:** `/usr/lib/vst3`, `~/.vst3`, `/usr/lib/lv2`, `~/.lv2`
- Scan is parallelized: each plugin scanned in a separate process (crash safety)
- Scan results cached to SQLite: only re-scan changed files (by mtime)
- Plugin metadata extracted: name, vendor, category, parameter count, audio I/O config

**Validation:**
Each plugin is run through a validation suite:
- Instantiation succeeds
- Processing produces finite (non-NaN/Inf) output
- Processing completes within timeout
- State save/load round-trips correctly
- MIDI handling does not crash

Validation results are cached. Plugins that fail validation are flagged with a warning icon in the browser and cannot be loaded without explicit user override.

## 7.4 Plugin Format Support

### 7.4.1 VST3 Implementation

AUDIAW uses a Rust-native VST3 implementation (`vst3-sys` crate as foundation, with custom extensions):

**VST3 features supported:**
- Audio component (`IAudioProcessor`)
- Edit controller (`IEditController`) with full parameter binding
- Note expression (`INoteExpressionController`)
- MIDI CC mapping
- MIDI learn
- Multiple I/O configurations
- Side-chain inputs
- Preset manager (`IUnitInfo`)
- Context menu extensions
- GUI embedding via `IPlugView` (OS-native window embedding)

**VST3 not supported in v1.0 (planned v1.5):**
- VST3 SDK ARA extensions
- Remote Processing (out-of-process for VST3 not in VST3 spec)

### 7.4.2 CLAP Implementation

CLAP (CLever Audio Plugin) is AUDIAW's **preferred native plugin format**. All AUDIAW built-in instruments and effects are published as CLAP plugins internally:

**CLAP advantages over VST3:**
- Open source specification (no license agreement required)
- Designed for in-process and out-of-process use cases natively
- Better thread-safety model (explicit main-thread vs audio-thread split)
- Voice-level parameter modulation in specification
- Better state and preset management APIs
- Simpler, cleaner API surface

**CLAP features supported:**
- Full audio processing (`clap_plugin_audio_ports`)
- Parameter automation and modulation (`clap_plugin_params`)
- Note ports and extended MIDI
- Voice stacking and polyphonic modulation
- State save/load (`clap_plugin_state`)
- Preset discovery (`clap_plugin_preset_load`)
- Remote controls pages
- Audio port type information
- Surround/ambisonics

### 7.4.3 LV2 Implementation (Linux-focused)

LV2 is the native plugin format on Linux. AUDIAW provides first-class LV2 support:

**LV2 features supported:**
- Audio ports, control ports, event ports
- UI embedding (gtk2, gtk3, Qt5, X11 raw, Cocoa on macOS)
- State extension (full save/restore)
- Presets extension
- Parameters extension
- Worker extension (background processing in LV2 plugins)
- Inline display extension (waveform display in track)
- MIDI extension
- Patch extension (complex property management)

### 7.4.4 AU (Audio Units) — macOS Only

AUDIAW includes full AU support on macOS:

**AU features supported:**
- AUv2 and AUv3 formats
- Full AUGraph-compatible parameter model
- Preset save/load via AUPreset format
- Factory presets
- View embedding (CocoaUI)
- AUv3 extension support (sandboxed)

## 7.5 Plugin UI Embedding

Each plugin format handles UI embedding differently. AUDIAW provides a unified embedding layer:

```rust
pub enum PluginUiMode {
    /// Plugin provides its own native window (most VST3, AU, some CLAP)
    NativeWindow {
        window_handle: RawWindowHandle,
        initial_size: (u32, u32),
        resizable: bool,
    },
    /// Plugin provides parameter-based UI via AUDIAW-rendered controls
    GenericUi {
        params: Vec<ParamInfo>,
    },
    /// No UI (headless operation)
    None,
}
```

**Native window embedding:**
- On Windows: HSV (Hosted Shared View) — plugin window embedded in a Win32 child window
- On macOS: NSView embedding — plugin NSView inserted into AUDIAW's window hierarchy
- On Linux: X11 window embedding (XEmbed protocol) or pure GTK/Qt embedding

**Plugin window management:**
- Plugin windows are owned by AUDIAW but appear as independent floating windows
- "Tear off" mode: plugin window can be fully detached (appears in taskbar)
- Multi-instance: multiple instances of the same plugin can have independent windows open simultaneously
- Resize detection: if plugin supports resize (`IPlugViewContentScaleSupport`), window is resizable

## 7.6 Preset System

AUDIAW implements a unified preset system across all plugin formats:

**Preset types:**
1. **Factory presets:** Shipped with the plugin. Read-only.
2. **User presets:** Saved by the user. Per-plugin, stored in AUDIAW's preset directory.
3. **AUDIAW community presets:** Curated by the community. Downloadable from within the browser.

**Preset storage format:**
```json
{
  "format": "audiaw-preset-v1",
  "plugin_id": "com.vendor.PluginName",
  "plugin_format": "clap",
  "name": "Big Room Pad",
  "category": "Pad",
  "tags": ["ambient", "atmospheric", "pad"],
  "author": "username",
  "state": "<base64-encoded plugin state>",
  "audiaw_version": "1.0.0",
  "created_at": "2025-01-01T00:00:00Z"
}
```

---

# 8. MODULAR ROUTING SYSTEM DOCUMENT

## 8.1 Routing Philosophy

AUDIAW's routing system is designed to support workflows ranging from simple "guitar → amp sim → output" to complex "granular synth → multi-band compressor → four parallel reverb chains → M-S encoder → master bus" configurations.

The routing system operates on **two levels:**

**Level 1: Track-level routing (mixer view)** — This is what 95% of users will use. Familiar DAW concepts: sends, returns, groups, sidechains. Exposed in the Mixer View.

**Level 2: Device-level routing (device graph)** — For advanced users: full signal flow control within a device chain. Inspired by Bitwig's device concept. Exposed in the Device View (right panel).

## 8.2 Track-Level Routing

### 8.2.1 Signal Flow Model

```
COMPLETE TRACK SIGNAL FLOW

MIDI Input
    │
    ▼
MIDI Processing Chain
(MIDI effects: arpeggiator, chord, scale, velocity, etc.)
    │
    ▼
Instrument / Sampler
(generates audio signal)
    │
    ▼
Pre-Fader Insert Effects
(insert effects placed before the fader)
    │
    ├──────► Pre-fader Sends (to FX return buses)
    │
    ▼
Track Fader + Pan
    │
    ├──────► Post-fader Sends (to FX return buses)
    │
    ▼
Group Bus (optional)
    │
    ▼
Master Bus
    │
    ▼
Hardware Output
```

### 8.2.2 Sidechain Routing

Sidechain routing allows the output of one track to trigger the dynamics processing of another. This is essential for:
- Kick-bass sidechain compression (the fundamental glue of EDM and hip-hop)
- Vocal ducking (music ducks when voice is active)
- De-essing with a sidechain EQ filter
- Dynamic volume automation via an LFO sidechain

**Sidechain setup (3-click workflow):**
1. On the compressor that needs sidechain input → click the sidechain icon
2. Sidechain bus selector appears → select the source track
3. Done. A sidechain bus is created automatically.

Under the hood:
```rust
// Sidechain routing creates:
SidechainBus {
    id: SidechainBusId::new(),
    source_track: TrackId,
    tap_point: TapPoint::PostFader, // or PreFader
    consumers: vec![
        SidechainConsumer {
            track: destination_track_id,
            device_id: compressor_device_id,
            port: SidechainPort::Input,
        }
    ],
}
```

## 8.3 Device-Level Routing (Device Graph)

Within a device chain, each device can route its audio signals in complex ways. This is the "modular" aspect of AUDIAW.

### 8.3.1 Nested Device Containers

Devices can be nested inside **container devices:**

```
FX Chain Container (a track's device chain)
│
├─ EQ
├─ Compressor  
│
├─ PARALLEL CHAIN CONTAINER ─────────────────┐
│   ├─ Distortion (50% wet)                   │
│   ├─ BitCrusher (30% wet)                   │
│   └─ (dry 20%)                              │
│   └─ Sum ─────────────────────────────────►─┤
│                                              │
├─ Reverb                                      │
└─ Output ◄────────────────────────────────────┘
```

**Built-in container types:**
1. **FX Chain:** Standard linear chain (default)
2. **Parallel Chain:** N parallel processing paths, summed at output. Each path has level control.
3. **Layered Chain:** N paths that process separately and sum at different output channels
4. **A/B Compare:** Two chains with instant A/B switching (for effect comparison)

### 8.3.2 Modulation Routing

AUDIAW includes a visual modulation routing system that allows any **modulator** to be connected to any **automatable parameter:**

**Modulator types:**
- **LFO:** Sine, square, triangle, sawtooth, random. Rate: Hz or tempo-synced. Phase offset. Depth.
- **Envelope Follower:** Tracks audio signal amplitude. Attack, Release, Gain.
- **Step Sequencer (Modulator):** Stepped value sequence synced to tempo. 2–64 steps.
- **MIDI CC:** Any MIDI continuous controller (mod wheel, expression, etc.)
- **Random:** Generates random values at specified rate.
- **Macro:** A single user-controllable knob mapped to multiple parameters simultaneously.

**Routing interface:**
- Modulator outputs shown as colored "source" connectors
- Automatable parameters shown with a small mod indicator when a modulator is connected
- Right-click any parameter knob → "Map Modulator" → shows available modulators → drag from modulator output to parameter
- Modulation depth: shown as an arc around the parameter knob (green for positive depth, red for negative)
- Multiple modulators can target the same parameter (additive modulation)

### 8.3.3 Macro System

**Macros** are user-facing controls that can control multiple parameters simultaneously with different scaling and curve shapes per parameter:

```
MACRO KNOB (user visible, e.g., "Atmosphere")
    │
    │ controls:
    ├──► Reverb Wet Amount: 0–100%, curve: linear
    ├──► Delay Mix: 0–40%, curve: exponential
    ├──► Filter Cutoff: 20kHz → 2kHz, curve: inverted exponential
    ├──► Chorus Depth: 0–30%, curve: linear
    └──► Reverb Pre-Delay: 0–80ms, curve: linear
```

Macros are:
- Created per-device-chain or per-instrument
- Displayed as large knobs in the instrument/device view
- Automatable themselves (automation of a macro controls all mapped parameters simultaneously)
- Assignable to MIDI CC (turn the macro knob with a hardware controller)
- Assignable to modulation sources (LFO controls the macro, which controls all mapped params)

---

*End of Volume II. Continue to Volume III for Project Format, Performance Engineering, Live Performance, Instruments, and remaining systems.*
