# AUDIAW — DESIGN.md
## Complete Product Design Specification

**Document Type:** Single Source of Truth — Design, UX, Interaction, Visual Identity  
**Version:** 1.0.0  
**Status:** Living Document  
**Audience:** Designers, Frontend Engineers, Contributors, UX Reviewers

> This document defines exactly how AUDIAW looks, feels, and behaves. If something is not written here, it does not exist in the design system. Every state, every measurement, every animation, every interaction is explicitly specified. Designers create directly from this. Developers implement directly from this.

---

## TABLE OF CONTENTS

1. [Product Vision](#1-product-vision)
2. [Product Identity](#2-product-identity)
3. [Design Philosophy](#3-design-philosophy)
4. [Emotional UX Goals](#4-emotional-ux-goals)
5. [Core UX Principles](#5-core-ux-principles)
6. [Visual Identity System](#6-visual-identity-system)
7. [Nothing-Inspired Design Language](#7-nothing-inspired-design-language)
8. [Industrial Design Principles](#8-industrial-design-principles)
9. [Layout Architecture](#9-layout-architecture)
10. [Window Management System](#10-window-management-system)
11. [Docking System](#11-docking-system)
12. [Workspace System](#12-workspace-system)
13. [Grid System](#13-grid-system)
14. [Spacing System](#14-spacing-system)
15. [Typography System](#15-typography-system)
16. [Color System](#16-color-system)
17. [Contrast System](#17-contrast-system)
18. [Monochrome UI Rules](#18-monochrome-ui-rules)
19. [Accent Color Rules](#19-accent-color-rules)
20. [Iconography](#20-iconography)
21. [Motion Design System](#21-motion-design-system)
22. [Animation Rules](#22-animation-rules)
23. [Transition Hierarchy](#23-transition-hierarchy)
24. [Interaction Feedback System](#24-interaction-feedback-system)
25. [Cursor Behavior](#25-cursor-behavior)
26. [Hover State Philosophy](#26-hover-state-philosophy)
27. [Focus State System](#27-focus-state-system)
28. [Keyboard Navigation Standards](#28-keyboard-navigation-standards)
29. [Accessibility Standards](#29-accessibility-standards)
30. [Touch & Tablet UX](#30-touch--tablet-ux)
31. [Multi-Monitor UX](#31-multi-monitor-ux)
32. [Startup Experience](#32-startup-experience)
33. [Loading States](#33-loading-states)
34. [Empty States](#34-empty-states)
35. [Error States](#35-error-states)
36. [Crash Recovery UX](#36-crash-recovery-ux)
37. [Project Recovery UX](#37-project-recovery-ux)
38. [Timeline UX](#38-timeline-ux)
39. [Mixer UX](#39-mixer-ux)
40. [Channel Strip UX](#40-channel-strip-ux)
41. [Piano Roll UX](#41-piano-roll-ux)
42. [Automation UX](#42-automation-ux)
43. [Audio Routing UX](#43-audio-routing-ux)
44. [Plugin Browser UX](#44-plugin-browser-ux)
45. [Plugin Hosting UX](#45-plugin-hosting-ux)
46. [Plugin Sandbox UX](#46-plugin-sandbox-ux)
47. [Command Palette UX](#47-command-palette-ux)
48. [Search UX](#48-search-ux)
49. [File Browser UX](#49-file-browser-ux)
50. [Transport Controls](#50-transport-controls)
51. [DSP Visualization](#51-dsp-visualization)
52. [Waveform Rendering](#52-waveform-rendering)
53. [Metering Systems](#53-metering-systems)
54. [GPU Rendering Considerations](#54-gpu-rendering-considerations)
55. [Performance Constraints](#55-performance-constraints)
56. [Latency UX Expectations](#56-latency-ux-expectations)
57. [Scroll Physics](#57-scroll-physics)
58. [Drag & Drop Systems](#58-drag--drop-systems)
59. [Snapping Systems](#59-snapping-systems)
60. [Resizing Systems](#60-resizing-systems)
61. [Panel Behavior](#61-panel-behavior)
62. [Context Menus](#62-context-menus)
63. [Inspector Panels](#63-inspector-panels)
64. [State Persistence](#64-state-persistence)
65. [Workspace Presets](#65-workspace-presets)
66. [Theme Engine](#66-theme-engine)
67. [Design Tokens](#67-design-tokens)
68. [Component Design Standards](#68-component-design-standards)
69. [Responsive Scaling](#69-responsive-scaling)
70. [Open Source Contribution Design Rules](#70-open-source-contribution-design-rules)
71. [Branding System](#71-branding-system)
72. [Logo Usage](#72-logo-usage)
73. [UI Sound Design](#73-ui-sound-design)
74. [AI Assistant UX](#74-ai-assistant-ux)
75. [Collaboration UX](#75-collaboration-ux)
76. [Export Workflow UX](#76-export-workflow-ux)
77. [Recording Workflow UX](#77-recording-workflow-ux)
78. [Live Performance UX](#78-live-performance-ux)
79. [Future Expansion Philosophy](#79-future-expansion-philosophy)

---

# 1. PRODUCT VISION

AUDIAW is a professional digital audio workstation built with the conviction that the best creative tools are invisible. The interface should not call attention to itself. It should recede — becoming an extension of the user's intent rather than a barrier to it.

The visual and interaction design of AUDIAW is informed by a specific lineage of hardware and software that shares this conviction: studio equipment that communicates through precise labeling and physical feedback, not decoration; tools like Teenage Engineering's OP-series that make limitation feel intentional; operating systems like Nothing OS that treat whitespace and monochrome restraint as statements of confidence.

AUDIAW is not trying to look futuristic. It is not trying to look aggressive or technical. It is trying to look **engineered** — as though every surface was placed by someone who thought carefully about why it exists there, and removed everything that didn't earn its place.

**The visual promise of AUDIAW:** When a user opens the application for the first time, they should feel the same quiet confidence they feel holding a well-made piece of hardware. Nothing shouts. Everything is where it should be. The work can begin immediately.

**The interaction promise of AUDIAW:** Every interaction should feel like turning a well-machined knob. There is resistance, there is feedback, there is precision. Nothing slips. Nothing jitters. Nothing feels accidental.

**The emotional promise of AUDIAW:** Using AUDIAW should induce a state of focused creative flow, not cognitive overhead. The interface achieves this by keeping visual noise to an absolute minimum, prioritizing spatial memory over discoverability, and making the most common actions available without conscious navigation.

---

# 2. PRODUCT IDENTITY

## 2.1 Identity Statement

AUDIAW presents itself as **a precision instrument for music production**. Its visual identity communicates:

- Engineering rigor
- Creative restraint
- Professional seriousness
- Quiet confidence
- Material honesty

## 2.2 Reference Vocabulary

The following products, objects, and aesthetics directly inform AUDIAW's visual and interaction language. Designers should study these references before contributing:

**Primary References:**
- Nothing Phone and Nothing OS — monochrome hierarchy, dot-matrix accents, spatial structure, typographic precision
- Teenage Engineering OP-1 / OP-Z — hardware-coded workflows, color as function not decoration, industrial form language
- Linear (software) — dark surface depth, restrained motion, precision focus states, structural layout
- Universal Audio hardware — professional metering, knob tactility, industrial labeling conventions
- API and SSL mixing consoles — dense information without clutter, physical spatial memory
- Dieter Rams' Braun products — maximum function, minimum form, "less but better"

**Secondary References:**
- Leica M-series cameras — purposeful physical layout, honest materials
- Native Instruments Maschine MK3 — dense but structured, functional color coding
- Ableton Push 2 — dark ground, light content, structural grid discipline

**Explicitly NOT References:**
- Gaming peripherals and their software
- Any UI that uses glowing outlines as decoration
- Glassmorphism applied decoratively
- Synthwave / retrowave aesthetic
- Skeuomorphic hardware emulation (bevels, fake screws, wood panels)
- Generic SaaS dashboard aesthetics

## 2.3 Visual Personality Adjectives

When a design decision is unclear, the following adjectives should guide the judgment:

| Should feel like | Should not feel like |
|---|---|
| Machined | Rendered |
| Calibrated | Decorated |
| Structural | Themed |
| Monolithic | Fragmented |
| Deliberate | Clever |
| Restrained | Minimal (minimalism as aesthetic) |
| Dense with purpose | Dense with content |
| Weighted | Floaty |
| Industrial | Sterile |
| Earned | Assumed |

---

# 3. DESIGN PHILOSOPHY

## 3.1 The Three Governing Rules

Every design decision in AUDIAW is evaluated against three rules, in this priority order:

**Rule 1: Does this aid the work?**  
If a visual element, interaction, or animation does not directly aid the user in completing a music production task, it must be eliminated or made invisible by default. Aesthetic interest is never a sufficient justification for visual presence.

**Rule 2: Is this the simplest form that fully communicates?**  
Once a design element passes Rule 1, it must be reduced to its simplest viable form. A horizontal bar communicates level. The bar does not need a gradient, a glow, a rounded end cap, or a shadow to do so. Add nothing until the absence of that thing causes failure of communication.

**Rule 3: Is this consistent with established spatial memory?**  
Professional users build spatial memory. They know where the fader is without looking. They know where the transport sits. Changes to established positions destroy this memory. New elements must be placed in positions that extend, not disrupt, existing spatial conventions.

## 3.2 Progressive Disclosure Architecture

AUDIAW's interface operates on three levels of disclosure:

**Surface level (always visible):**  
The essential working canvas. Waveforms, MIDI notes, the timeline, the transport, track names, level meters. The things a user needs to see 100% of the time.

**Contextual level (visible on focus or hover):**  
Controls that modify the item currently in focus. Track mute/solo buttons appear on track header hover. Clip menu appears on clip right-click. Effect parameter details expand when a device is selected. This layer appears within 80ms of user intent signal and disappears 300ms after intent withdrawal.

**Modal level (explicit invocation only):**  
System settings, export dialogs, plugin browsers, the command palette. These are never visible unless explicitly called. They cover content when active. They are dismissed by Escape or clicking outside their bounds.

This hierarchy is rigid. Controls must never float up a level unless there is a documented, tested justification.

## 3.3 Spatial Grammar

AUDIAW's interface has a defined spatial grammar. Every region of the screen has a semantic identity:

- **Top:** Temporal and structural controls (transport, project state, global settings)
- **Left:** Source material and asset management (browser, file tree)
- **Center:** The active work surface (arrangement, piano roll, mixer, automation)
- **Right:** Property and device inspection (selected item properties, plugin chain)
- **Bottom:** Secondary editing surfaces and context panels (piano roll when docked, mixer when docked)

This grammar is fixed. It cannot be inverted. Left never becomes a device inspector. The bottom never becomes the primary work surface. Users can hide regions, collapse them, and resize them, but the semantic identity of each region is permanent.

---

# 4. EMOTIONAL UX GOALS

## 4.1 The Flow State Objective

The primary emotional objective of AUDIAW's design is to support **psychological flow** in creative work. Flow requires:

- Clear goals with immediate feedback
- A sense of direct control over outcomes
- Sufficient challenge without overwhelming complexity
- Elimination of interruptions and friction

Every design decision should be evaluated: does this increase or decrease the likelihood of flow?

## 4.2 First Launch Emotion

**Target emotion:** "I understand this. I can start immediately."

The user opening AUDIAW for the first time should not feel overwhelmed. They should feel oriented. The layout should communicate its own logic through visual hierarchy and spatial structure without requiring reading a manual.

**Anti-target:** Curiosity about what a specific control does. Any element whose purpose is not immediately inferrable from its visual form is a design failure at the surface level.

## 4.3 Session Working Emotion

**Target emotion:** "The tool is responding to exactly what I intend."

During a production session, the interface should feel like a direct extension of intent. Knobs respond instantly. Clips snap to exactly the right position. The piano roll shows exactly what is expected. Nothing surprises. Nothing resists.

**Anti-target:** Any moment where the user pauses to think about the interface rather than the music.

## 4.4 Deep Feature Emotion

**Target emotion:** "There's more here than I expected. This goes as deep as I need it to."

When a professional user discovers advanced routing, modulation systems, or complex automation capabilities, they should feel the satisfaction of earned depth — discovering capability that was already there, structured and waiting, not buried or hidden.

**Anti-target:** "This feature was obviously added later and doesn't fit." Depth must feel native.

## 4.5 Error and Recovery Emotion

**Target emotion:** "The system caught this and handled it. My work is safe."

When something goes wrong (plugin crash, audio dropout, file not found), the user should feel the system absorbed the impact on their behalf. Recovery must feel automatic and competent.

**Anti-target:** Panic. Any UI response to an error that makes the user feel their work is at risk.

---

# 5. CORE UX PRINCIPLES

## 5.1 Principle 01: Silence is Not Emptiness

Whitespace in AUDIAW is not the absence of content. It is the structure that makes content readable. Every region of whitespace is intentional. Track lanes have vertical breathing room because without it, dense waveforms become indistinguishable. The transport bar has lateral margin because without it, controls crowd into illegibility.

**Implementation rule:** No new element may be introduced to a layout region that reduces existing whitespace below its defined minimum. Minimums are defined in the spacing system.

## 5.2 Principle 02: Color Carries Meaning, Not Decoration

Color in AUDIAW is functional. It is not applied to make the interface look interesting. It is applied to communicate:

- Track identity (user-assigned, spatial memory anchor)
- State (recording = red, active = accent, muted = desaturated)
- Severity (error = red-value, warning = amber-value)
- Level (metering gradient from safe to clip)

**Implementation rule:** No color may be introduced whose sole purpose is aesthetic. If a color is present, it communicates something that cannot be communicated by position, shape, or label alone.

## 5.3 Principle 03: Interactions Have Physical Grammar

Users build physical intuition about interfaces. AUDIAW respects conventional physical grammar:

- Horizontal faders go left for less, right for more
- Vertical faders go down for less, up for more
- Knobs turn right for increase (clockwise)
- Dragging up on a value increases it, down decreases it
- Scrolling up on a timeline zooms in, down zooms out (when modifier held)

**Implementation rule:** AUDIAW never inverts these conventions. If a platform's native convention differs, AUDIAW follows the platform convention. If no platform convention exists, AUDIAW follows the above rules.

## 5.4 Principle 04: Feedback is Immediate or Absent

Visual feedback must appear within one render frame (≤16ms at 60fps) of the triggering action. If feedback cannot be rendered within this budget, it must not be attempted — show no feedback rather than delayed feedback, which is worse than none.

**Exception:** Loading indicators for operations explicitly expected to take time (project open, export render). These must begin within 100ms of action trigger and must communicate progress, not just activity.

## 5.5 Principle 05: Undo is a Safety Net, Not a Workflow

The existence of unlimited undo must not be used to justify potentially destructive interactions. Every significant action (clip delete, plugin remove, track delete) must require either:
- A single reversible action (not a confirmation dialog), OR
- Undo is immediately available and communicated

Confirmation dialogs for reversible actions are a UX failure. They interrupt flow and communicate distrust of the undo system.

## 5.6 Principle 06: Dense Information, Low Visual Noise

Professional audio software must display a large volume of information simultaneously. The solution to this is not to hide information — it is to control visual weight so that the information hierarchy is clear at a glance.

**Weight hierarchy:**
- Active/selected content: 100% opacity, full saturation
- Passive content (present but not focus): 70–85% opacity, reduced saturation
- Background structure (grid, guides, empty lanes): 20–40% opacity
- Invisible until invoked (contextual controls): 0% opacity at rest

---

# 6. VISUAL IDENTITY SYSTEM

## 6.1 Primary Visual Language

AUDIAW's visual language is built on five structural elements:

**1. Dark Ground**  
The application background is deep, near-black. Not pure black (`#000000`) — which reads as a void — but a structured dark neutral with a subtle cool-gray lean. The dark ground ensures that all content reads against it with high contrast while reducing eye fatigue during long sessions.

**2. Monochrome Structure**  
The application structure (panels, separators, headers, labels) exists entirely in a grayscale range. Color is never used for structural elements. A panel border is never blue. A section header is never colored. Structure is communicated through tone, not hue.

**3. Weight Through Tone**  
Visual hierarchy is expressed through tonal value, not size alone. The most important element in a region is the brightest. Secondary elements are mid-tone. Tertiary elements are near-background.

**4. Functional Color Isolation**  
When color appears (track colors, meters, status indicators), it appears in isolation against the monochrome ground. This isolation gives color maximum communicative impact. A red record indicator reads instantly because nothing else is red.

**5. Typographic Precision**  
Text is the primary communication surface. Typography is precise, consistent, and never decorative. No italic text in the UI except within content fields. No decorative type treatments.

## 6.2 Surface Depth Model

AUDIAW uses a five-level surface depth model. Higher numbers are "closer" (more prominent):

```
Level 0 — Application void (below everything)
  Value: #0D0D0F
  Usage: Outside application window, truly empty regions

Level 1 — Base application surface (the ground)
  Value: #111115
  Usage: Main arrangement background, empty track lanes, panel backgrounds

Level 2 — Raised surfaces (panel interiors)
  Value: #1A1A21
  Usage: Track headers, mixer channel strips, panel content areas, sidebars

Level 3 — Elevated elements (active/focused content)
  Value: #22222C
  Usage: Selected items, hovered elements, dropdown backgrounds, tooltips

Level 4 — Floating elements (overlays)
  Value: #2C2C39
  Usage: Context menus, command palette, modal dialogs, popover panels

Level 5 — Highest emphasis (critical indicators)
  Value: #363645
  Usage: Focused input fields, active drag targets, prominent notifications
```

Each level must be visually distinguishable from adjacent levels. The step between levels is approximately 7–9% luminance increase. Levels must never be swapped in usage — a base application surface element must never use Level 4 values.

## 6.3 Border Language

Borders in AUDIAW are defined by functional role, not by aesthetic style:

**Structural borders (region separators):**
- Color: `rgba(255, 255, 255, 0.07)`
- Width: `1px`
- Style: solid
- Usage: Panel edges, track header/lane separator, toolbar bottom edge

**Interactive borders (interactive element outlines at rest):**
- Color: `rgba(255, 255, 255, 0.10)`
- Width: `1px`
- Style: solid
- Usage: Text inputs at rest, dropdown buttons, collapsible panel edges

**Focus borders (currently focused element):**
- Color: The active accent color at 100% opacity
- Width: `1.5px` (never 2px — too heavy for this density)
- Style: solid
- Usage: Keyboard-focused inputs, selected controls, active knobs

**Status borders (state communication):**
- Record active: `rgba(239, 68, 68, 0.6)` (red, 60% opacity)
- Warning: `rgba(245, 158, 11, 0.5)` (amber, 50% opacity)
- Error: `rgba(239, 68, 68, 0.8)` (red, 80% opacity)

---

# 7. NOTHING-INSPIRED DESIGN LANGUAGE

## 7.1 Philosophy Adaptation

Nothing's design philosophy — developed for a consumer smartphone — is adapted here for professional desktop audio software. The core principles that transfer:

**Monochrome confidence:** Nothing OS derives power from what it removes. Its interface works in grayscale because the content (your apps, your data) provides all the color needed. AUDIAW applies this same logic: the interface is monochrome because the music — represented through waveforms, MIDI notes, and audio signal — provides all the visual interest needed.

**Dot-matrix as texture, not decoration:** Nothing uses dot-matrix elements for charging indicators and specific branding moments. AUDIAW uses dot-matrix styling for:
- The transport time display (bars:beats:ticks)
- BPM readout
- Sample rate / buffer size indicators in the status bar
- The startup sequence
- The clip position indicator in the status bar

Dot-matrix is never used in:
- Track names
- Plugin names
- Menu items
- Dialog text
- Panel labels
- Any continuously readable text

**Structural openness:** Nothing designs with generous, structural whitespace that makes the layout feel organized, not sparse. AUDIAW applies this in the spacing between functional regions, the padding within panels, and the breathing room around the transport bar.

## 7.2 Dot-Matrix Implementation

The dot-matrix display style for AUDIAW uses a custom monospace display typeface rendered with specific visual rules:

**Font:** `"Geist Mono"` with a custom CSS filter for dot-matrix character (described below)

**Dot-matrix visual treatment:**
```css
.dot-matrix-display {
  font-family: "Geist Mono", monospace;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.90);
  text-shadow: 
    0 0 8px rgba(255, 255, 255, 0.15),   /* subtle glow, not dramatic */
    0 0 2px rgba(255, 255, 255, 0.08);
  /* Background for display contexts */
  background: #0D0D0F;
  padding: 4px 8px;
  border: 1px solid rgba(255, 255, 255, 0.07);
}
```

**Dot-matrix display contexts and sizes:**

| Context | Font Size | Letter Spacing | Display Dimensions |
|---|---|---|---|
| Transport time (primary) | 22px | 0.12em | Min 220px wide |
| BPM display | 18px | 0.10em | Min 80px wide |
| Sample rate display | 11px | 0.06em | Status bar inline |
| Buffer size display | 11px | 0.06em | Status bar inline |
| Clip position (hover) | 11px | 0.06em | Floating tooltip |
| Startup sequence | 16px | 0.10em | Centered, full width |

**Inactive dot-matrix display:**
When the transport is stopped, the time display dims:
```
color: rgba(255, 255, 255, 0.35)
text-shadow: none
```

**Active/playing dot-matrix display:**
```
color: rgba(255, 255, 255, 0.92)
text-shadow: 0 0 8px rgba(255, 255, 255, 0.18), 0 0 2px rgba(255, 255, 255, 0.10)
```

**Recording dot-matrix display:**
```
color: rgba(239, 68, 68, 0.95)    /* Red during record */
text-shadow: 0 0 8px rgba(239, 68, 68, 0.25), 0 0 2px rgba(239, 68, 68, 0.12)
```

## 7.3 Grid Texture Accent

In select background regions (empty arrangement lanes, empty mixer areas, the startup screen background), a subtle dot-grid texture is applied:

**Dot-grid specification:**
```css
.dot-grid-background {
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.04) 1px,
    transparent 1px
  );
  background-size: 20px 20px;
  background-position: 0 0;
}
```

**Usage rules:**
- Dot-grid is only applied to empty surfaces — never over content
- Dot-grid disappears when content is present (tracks, clips, notes fill the grid)
- Dot-grid does NOT animate or shift
- Dot-grid opacity must not exceed 4% against the background surface
- Dot-grid spacing is always 20px × 20px — never varied

## 7.4 Nothing-Influenced Typography Rhythm

Nothing OS uses a clear typographic rhythm that separates labels from values, creates hierarchy through weight and case. AUDIAW applies this:

**Label–Value Pairing Rule:**
In any context where a label accompanies a value (e.g., "BPM: 140", "Sample Rate: 48000 Hz"), the label and value are visually differentiated:

```
LABEL:     10px, Inter Regular, UPPERCASE, letter-spacing: 0.10em, opacity: 0.45
VALUE:     14px, Geist Mono Regular, TitleCase/Numeric, opacity: 0.90
GAP:       8px between label and value when stacked vertically
           4px between label and value when horizontal (label to left)
```

This pairing appears in:
- Status bar items
- Inspector panel properties
- Audio device settings
- Transport information display
- Plugin parameter labels and values

---

# 8. INDUSTRIAL DESIGN PRINCIPLES

## 8.1 Functional Honesty

Industrial design — from Braun to professional audio hardware — is honest about what objects are and do. AUDIAW reflects this:

**No visual deception:** A button that triggers a one-time action looks different from a toggle. A display that shows real-time data looks different from a static label. A draggable fader looks draggable — its affordance communicates its function.

**Material consistency:** All buttons of the same functional type look identical, regardless of their position in the interface. A mute button on a track header looks exactly like a mute button on a mixer channel strip — same size, same style, same interaction model.

**Physical proportion:** Control sizes relate to their precision requirements. A coarse control (volume fader) is large. A fine control (micro-timing offset) is small with modifier-key precision access. Size communicates precision expectation.

## 8.2 Labeling as Professional Communication

Professional hardware is labeled precisely and economically. "GAIN" not "Input Gain Level." "HPF" not "High-Pass Filter Toggle." "BUS" not "Send to Group Bus."

**Label rules:**
- Labels are as short as possible while remaining unambiguous
- Labels use professional audio vocabulary without apology
- Labels never use marketing language
- Labels are in mixed case (not ALL CAPS except for abbreviations)
- Abbreviations are used for standard audio terms: HPF, LPF, EQ, LFO, ADSR, RMS, dBFS
- Non-standard abbreviations are never used without tooltip expansion

**Tooltip rule:** Every abbreviated label must have a tooltip with the full term. Tooltip appears after 600ms of hover with no cursor movement. Tooltip uses 11px Inter Regular, white, on a Level 4 surface with 6px horizontal padding, 4px vertical padding, 4px border-radius.

## 8.3 Control Density Philosophy

Professional mixing hardware (SSL, Neve, API) is densely packed — every square centimeter earns its place. AUDIAW adopts this density philosophy in its dense views (mixer channel strips, device racks) while preserving breathing room in its content views (arrangement, piano roll).

**Density mode definitions:**

| Mode | Context | Track Height | Font Size | Control Visibility |
|---|---|---|---|---|
| Ultra-compact | Mixer strip (≤56px wide) | N/A | 10px | Icons only, no labels |
| Compact | Arrangement (32px track height) | 32px | 11px | Name + mute/solo icons |
| Standard | Arrangement (48px track height) | 48px | 12px | Name + mute/solo/arm + mini meter |
| Tall | Arrangement (80px track height) | 80px | 12px | Name + all controls + waveform + meter |
| Expanded | Arrangement (120px+) | 120px | 13px | Full controls + prominent waveform |

Users can set track height individually (drag track bottom edge) or globally (Ctrl+Alt+scroll). The density mode is computed automatically based on pixel height.

---

# 9. LAYOUT ARCHITECTURE

## 9.1 Primary Layout Zones

The AUDIAW application window is divided into five permanent zones. These zones cannot be removed, only collapsed:

```
┌──────────────────────────────────────────────────────────────────┐
│  TRANSPORT ZONE                                           52px H  │
│  Always visible. Never collapsible. Contains all transport,       │
│  project name, CPU/memory meters, global toolbar actions.         │
├──────────────────────────────────────────────────────────────────┤
│ LEFT  │                                               │  RIGHT   │
│ PANEL │           PRIMARY CANVAS ZONE                │  PANEL   │
│ ZONE  │    (arrangement / mixer / piano roll /        │  ZONE    │
│       │     automation / clip launcher)               │          │
│  min  │                                               │  min     │
│ 160px │    This zone fills all remaining space.       │ 200px    │
│  max  │    It cannot be covered by other zones.       │  max     │
│ 400px │                                               │ 520px    │
│       │                                               │          │
│       │                                               │          │
├───────┴───────────────────────────────────────────────┴──────────┤
│  BOTTOM PANEL ZONE                                   variable H  │
│  Collapsible. Default: collapsed. Min 160px, Max 50% window H.   │
│  Contains: Mixer (docked), Piano Roll (docked), Event List.       │
├──────────────────────────────────────────────────────────────────┤
│  STATUS BAR ZONE                                          22px H  │
│  Always visible. Never collapsible.                               │
└──────────────────────────────────────────────────────────────────┘
```

## 9.2 Zone Sizing Constraints

**Transport Zone:**
- Height: exactly 52px. Fixed. Never resized.
- Width: 100% of window width.
- Background: Level 2 surface (`#1A1A21`)
- Bottom border: 1px structural border (`rgba(255,255,255,0.07)`)
- Internal horizontal padding: 16px left, 16px right

**Left Panel Zone:**
- Default width: 260px
- Minimum width: 160px (below this, collapse to icon-only mode)
- Maximum width: 400px
- Collapsible: Yes. Collapse trigger: click the left edge toggle button (6px wide, vertically centered, 32px tall button)
- Collapsed width: 0px (invisible, zero-space). The toggle button remains at the very edge of the canvas zone, 6px wide.
- Resize: drag the right edge of the left panel. A 4px hot zone exists for this drag.
- Background: Level 2 surface (`#1A1A21`)
- Right border: 1px structural border

**Right Panel Zone:**
- Default width: 320px
- Minimum width: 200px
- Maximum width: 520px
- Collapsible: Yes. Same mechanism as left panel, mirrored.
- Collapsed width: 0px
- Left border: 1px structural border

**Primary Canvas Zone:**
- This zone is the remainder after left panel, right panel, and any fixed-size transport/status bars.
- No border. No background modification from the canvas content.
- Minimum effective width: 400px (below this, the left panel must be auto-collapsed)

**Bottom Panel Zone:**
- Default height: 0px (collapsed)
- Minimum height when open: 160px
- Maximum height: 50% of total window height (excluding transport and status zones)
- Toggle: drag the bottom edge of the canvas zone upward to open. A 4px hot zone exists.
- Toggle button: same style as left/right panel toggle, horizontally centered, 32px wide, 6px tall.
- Top border: 1px structural border

**Status Bar Zone:**
- Height: exactly 22px. Fixed. Never resized.
- Width: 100% of window width.
- Background: Level 1 surface (`#111115`)
- Top border: 1px structural border
- Internal horizontal padding: 12px left, 12px right

## 9.3 Zone Interaction Rules

**Simultaneous collapse:** If the user collapses both the left and right panels, the canvas zone expands to fill the full width. This should happen with the same animation as a single panel collapse.

**Minimum window size:** The application window enforces a minimum size of 900px × 600px. Below this, the layout is allowed to scroll rather than collapse further.

**Zone memory:** Every zone's open/closed state and size is persisted to the active workspace preset. When the application restarts, all zones restore to exactly the state they were in when the application last closed.

**Zone resize feedback:** When the user drags a zone border to resize, a 1px accent-colored line indicates the drag position. No labels, no size readout — the visual result is the feedback.

---

# 10. WINDOW MANAGEMENT SYSTEM

## 10.1 Main Application Window

AUDIAW presents as a single main application window. The window has:

**Title bar (macOS):**
- Uses native macOS title bar with traffic lights (red/yellow/green close/minimize/maximize)
- Title bar background: Level 2 surface (`#1A1A21`), blended with the transport zone
- Window title: displays project name only ("Untitled Project" for new projects). No " — AUDIAW" suffix.
- Title font: 12px Inter Medium, opacity 0.65 (subdued, not competing with transport content)
- Title position: centered between traffic lights and transport controls, or in the center of the title bar if space allows

**Title bar (Windows):**
- Custom title bar drawn by the application (Tauri frameless + custom)
- Custom minimize/maximize/close buttons at right edge, 46px each button width
- Button styles: close (×), maximize (□), minimize (—)
- Button hover: close button uses `rgba(239, 68, 68, 0.2)` background on hover. Maximize/minimize use `rgba(255, 255, 255, 0.06)` on hover.
- Title bar height: merged into the transport zone. The 52px transport zone serves as the title bar.
- Drag region: the transport zone is draggable (the window can be dragged from the transport bar) except over interactive controls.

**Title bar (Linux):**
- Respects the user's desktop environment (GTK/Qt title bar). AUDIAW does not force custom title bars on Linux.
- If the desktop environment supports it, AUDIAW can request a flat title bar style.

## 10.2 Plugin Windows

Plugin UI windows are secondary windows spawned when a plugin's UI is opened:

**Appearance:**
- Window background: Level 1 surface (`#111115`) — not the plugin's internal UI background, which is defined by the plugin developer
- Window title bar: 28px height, compact
- Title: "[Plugin Name] — [Track Name]"
- Title font: 11px Inter Regular, opacity 0.70
- No resize grip decoration — but window IS resizable by dragging edges (if plugin supports)
- Always a true window (not a popover or sheet) — appears in the taskbar/dock

**Plugin window behavior:**
- Plugin windows default to floating (not docked)
- Plugin windows can be grouped: multiple plugin windows snap to each other magnetically with 8px spacing
- Default position: centered over the device chain area it was opened from, offset 32px down and 32px right
- Position is remembered per plugin instance per project
- Plugin windows are NOT "always on top" by default. User can toggle "Keep on top" from the plugin window title bar.

**Plugin window title bar controls:**
- Left edge: close button (×), 28×28px
- Center: plugin name and track name
- Right area: three buttons (each 28×28px):
  - Power (bypass toggle): filled circle when active, outlined when bypassed
  - Preset selector: labeled with current preset name, click to open preset browser
  - Keep-on-top toggle: pin icon

---

# 11. DOCKING SYSTEM

## 11.1 Dock Philosophy

The docking system in AUDIAW is **structural, not free-form.** Panels dock into defined zones — they do not float freely at arbitrary positions. The reason: arbitrary floating panels destroy spatial memory. Users should always know exactly where a panel is without looking for it.

Free-floating is reserved for one use case only: **plugin UI windows**, which cannot be reasonably docked because their sizes and proportions are controlled by the plugin.

## 11.2 Dock Zones

Panels can be docked to the following zones (as defined in section 9):
- Left Panel Zone
- Right Panel Zone
- Bottom Panel Zone

Each zone can contain multiple panels, accessed via a tab bar at the top of the zone.

## 11.3 Tab Bar Design (Within Docked Zones)

When multiple panels are docked to the same zone, a tab bar appears at the top of the zone:

**Tab bar height:** 34px  
**Tab bar background:** Level 2 surface, slightly darker than the panel content (`#171720`)  
**Tab bar bottom border:** 1px structural border  
**Tab separator:** vertical 1px lines between tabs at `rgba(255,255,255,0.07)`

**Individual tab design:**
- Height: 34px (full zone height)
- Horizontal padding: 14px left, 14px right
- Font: 11px Inter Medium
- Active tab text: opacity 0.90
- Inactive tab text: opacity 0.45
- Active tab indicator: a 2px horizontal line at the bottom of the active tab, accent color
- Active tab background: Level 2 surface
- Inactive tab background: transparent (on the darker tab bar)
- Tab hover: inactive tab background becomes `rgba(255,255,255,0.04)`, transition 80ms ease-out
- Tab close button: appears on hover, 16×16px, × icon, opacity 0.50, opacity 1.0 on the close button hover

**Tab overflow:** When more tabs than can be displayed, show a right-edge `…` button (16×34px) that opens a panel list dropdown.

## 11.4 Panel Drag-to-Dock

Panels that are being dragged (e.g., the user is reorganizing their workspace) are indicated by:

1. The panel shows a ghost representation (60% opacity of the panel content)
2. Valid dock zones highlight: a 2px accent-colored border appears around valid drop targets
3. When hovering over a valid dock zone, the zone shows a **dock preview**: a filled accent-color overlay at 8% opacity covering the zone
4. On release in a valid zone: the panel docks with a 120ms ease-out scale-and-fade-in animation
5. On release outside a valid zone: the panel returns to its original position with a 150ms spring animation

**Undock gesture:** Double-click a tab to undock the panel as a floating secondary window (for multi-monitor use). The window appears at the position the tab was, animating outward with a 100ms ease-out expand.

---

# 12. WORKSPACE SYSTEM

## 12.1 Workspace Definition

A workspace is a named, saveable snapshot of:
- Which panels are open and in which zones
- The size of each zone (left panel width, right panel width, bottom panel height)
- Which tab is active in each zone
- The active main view (arrangement / mixer / piano roll / automation)
- The track height mode (compact / standard / tall)
- The UI scale factor

A workspace does NOT save:
- Project content
- Plugin states
- Audio device configuration
- Zoom levels (these are per-project)
- Scroll positions (these are per-project)

## 12.2 Workspace Switcher

The workspace switcher is a compact dropdown in the transport bar, positioned at the far right:

**Trigger:** A small button labeled with the current workspace name (e.g., "Production")
- Width: auto (minimum 80px, maximum 140px), truncated with ellipsis
- Height: 26px
- Font: 11px Inter Medium, opacity 0.75
- Icon: a small grid icon (2×2 dots) at 14px, 8px to the left of the label
- Background: transparent at rest, `rgba(255,255,255,0.06)` on hover
- Border: 1px interactive border
- Border-radius: 4px

**Workspace dropdown:**
- Appears below the button, right-aligned
- Width: 200px
- Background: Level 4 surface (`#2C2C39`)
- Border: 1px at `rgba(255,255,255,0.12)`
- Border-radius: 6px
- Padding: 6px 0px (zero horizontal, 6px top/bottom)
- Shadow: `0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)`

**Workspace list items:**
- Height: 32px each
- Horizontal padding: 12px
- Font: 12px Inter Regular
- Active workspace: text at opacity 0.90, a 2px accent line at left edge
- Inactive workspaces: text at opacity 0.65, no accent line
- Hover: background `rgba(255,255,255,0.06)`
- At bottom of list: a separator at 1px `rgba(255,255,255,0.07)`, then "+ New Workspace" item

## 12.3 Built-in Workspaces

Five workspaces ship with AUDIAW and cannot be deleted (but can be duplicated and modified):

| Name | Main View | Left Panel | Right Panel | Bottom Panel |
|---|---|---|---|---|
| Production | Arrangement | Browser | Device View | Closed |
| Mixing | Mixer | Closed | Device View | Closed |
| Beatmaking | Arrangement | Browser | Device View | Piano Roll |
| Mastering | Arrangement | Closed | Spectrum/LUFS | Closed |
| Performance | Clip Launcher | Closed | Closed | Closed |

---

# 13. GRID SYSTEM

## 13.1 Base Grid Unit

AUDIAW's layout system is built on a **4px base unit**. All spacing, sizes, and positions are multiples of 4px.

The only exceptions:
- 1px borders (explicit visual purpose)
- 1.5px focus borders (explicit visual purpose)
- Text sizes in points/pixels where 4px multiples would create inharmonious type scale

## 13.2 Layout Grid

The transport bar, status bar, and panel headers use a **12-column internal grid** for positioning their internal elements:

**Column width:** Flexible (distributes available space)  
**Gutter width:** 8px  
**Outer margin:** 16px (left and right)

This is a reference grid for layout decisions, not a visual element. It does not appear on screen.

## 13.3 Content Grid

Within the primary canvas zone, content (tracks, mixer channels, piano roll notes) follows **its own content grid** defined by the current zoom level and snapping settings. This is the musical grid — bar lines, beat lines, sub-beat lines — and is described fully in the Timeline UX section.

## 13.4 Pixel-Perfect Rendering Rules

At standard (1×) DPI:
- All borders are exactly 1px (not `0.5px` — 1px at 1× DPI)
- All element heights are integers
- All element widths are integers when static; dynamic widths may be non-integer but must be rendered with `will-change: transform` to avoid subpixel jitter

At HiDPI (2×):
- 1px borders render as 0.5px logical pixels (2px physical) — crisp
- CSS will automatically handle this via `devicePixelRatio`
- GPU-rendered elements (waveforms, meters) are rendered at native device resolution

---

# 14. SPACING SYSTEM

## 14.1 Spacing Scale

```
--space-0:    0px    /* No spacing */
--space-px:   1px    /* Border-only gaps */
--space-1:    4px    /* Inline icon–label gap, tightest content spacing */
--space-2:    8px    /* Intra-control spacing, button internal padding */
--space-3:   12px    /* Control group spacing, tight panel padding */
--space-4:   16px    /* Standard panel padding, section gap */
--space-5:   20px    /* Moderate section separation */
--space-6:   24px    /* Large section gap, prominent visual breathing room */
--space-8:   32px    /* Major structural separation */
--space-10:  40px    /* Large layout anchoring */
--space-12:  48px    /* Maximum inline spacing */
--space-16:  64px    /* Maximum layout spacing */
```

## 14.2 Application-Specific Spatial Constants

These constants override the scale above for specific purposes. They are non-negotiable:

```
--height-transport-bar:        52px   /* Transport zone, always */
--height-status-bar:           22px   /* Status zone, always */
--height-tab-bar:              34px   /* Panel tab bars */
--height-track-compact:        32px   /* Minimum track height */
--height-track-standard:       48px   /* Default track height */
--height-track-tall:           80px   /* Expanded track height */
--height-track-max:           200px   /* User can drag up to this */
--width-track-header:         216px   /* Track header panel width */
--width-track-header-min:     160px   /* Minimum (narrow mode) */
--width-mixer-channel-compact: 56px   /* Compact mixer strip */
--width-mixer-channel:         72px   /* Standard mixer strip */
--width-mixer-channel-wide:    96px   /* Wide mixer strip */
--height-piano-key-width:      80px   /* Piano keyboard area in piano roll */
--height-velocity-editor:      80px   /* Velocity editor strip height */
--height-context-menu-item:    32px   /* Context menu rows */
--height-dropdown-item:        32px   /* Dropdown list rows */
--height-toolbar-button:       28px   /* Transport bar buttons */
--radius-standard:              4px   /* Standard border-radius */
--radius-large:                 6px   /* Larger elements (cards, dropdowns) */
--radius-pill:                 99px   /* Fully round (status indicators) */
```

## 14.3 Padding Within Components

Component internal padding must follow these rules:

**Buttons:**
- Small button: 4px vertical, 8px horizontal
- Standard button: 6px vertical, 12px horizontal
- Large button: 8px vertical, 16px horizontal

**Input fields:**
- Height: 28px for single-line
- Vertical padding: computed from height and line-height (center align text)
- Horizontal padding: 8px left, 8px right

**Panel sections:**
- Top padding: 16px
- Bottom padding: 16px
- Left padding: 16px
- Right padding: 16px

**Dropdown menus:**
- Vertical padding: 6px above first item, 6px below last item
- Item vertical padding: 0px (height is set to 32px, text is vertically centered)
- Item horizontal padding: 12px left, 12px right

---

# 15. TYPOGRAPHY SYSTEM

## 15.1 Font Stack

**Primary UI Typeface: Inter Variable**  
Source: Google Fonts / Fontsource (bundled in application, no network call)  
Usage: All UI labels, panel text, menu items, status messages, button labels, dialog text  
Fallback: `system-ui, -apple-system, BlinkMacSystemFont, sans-serif`

**Monospace / Display Typeface: Geist Mono**  
Source: Vercel / Fontsource (bundled)  
Usage: Time displays, BPM, sample rates, position indicators, technical numeric values, note names in piano roll  
Fallback: `"JetBrains Mono", "Fira Code", ui-monospace, monospace`

**These are the only two typefaces in AUDIAW.** No third typeface is introduced for any reason. Not for headings, not for branding, not for marketing panels.

## 15.2 Type Scale

```
--type-2xs:  9px    /* Keyboard shortcut badges, microscopic labels */
--type-xs:  10px    /* Meter tick labels, secondary status bar text */
--type-sm:  11px    /* Compact track names, tab labels, tooltips, status bar */
--type-base: 12px   /* Standard UI text, track names, menu items, inputs */
--type-md:  13px    /* Panel section headers, important labels */
--type-lg:  14px    /* Prominent values, dialog titles */
--type-xl:  16px    /* Section headers in settings panels */
--type-2xl: 20px    /* Onboarding headings, template names in start screen */
--type-3xl: 28px    /* Startup screen wordmark, first-run splash */
```

## 15.3 Font Weights

**Inter Variable weights used:**

| Weight | Value | Usage |
|---|---|---|
| Regular | 400 | Body text, labels, input values, menu items |
| Medium | 500 | Panel headers, tab labels, button text, track names |
| Semibold | 600 | Section titles, modal dialog titles |

No weight above Semibold (600) is ever used in the UI.  
No Italic is ever used in the UI (only in text content areas, such as user notes).

## 15.4 Line Heights

```
--leading-tight:   1.2    /* Single-line labels, buttons (crop descenders) */
--leading-snug:    1.35   /* Multi-line labels, control names */
--leading-normal:  1.5    /* Body text in documentation panels */
--leading-relaxed: 1.65   /* Onboarding text, tutorial content */
```

## 15.5 Letter Spacing

```
--tracking-tight:  -0.01em   /* Large display text (20px+) */
--tracking-normal:  0em      /* Standard text (12-16px) */
--tracking-wide:    0.04em   /* Small uppercase labels (10-11px) */
--tracking-wider:   0.08em   /* All-caps micro labels (9-10px) */
--tracking-widest:  0.12em   /* Dot-matrix display text */
```

## 15.6 Text Opacity Hierarchy

Text never uses `color: rgba(0,0,0,X)` on dark surfaces. Instead, white text with opacity:

```
--text-primary:   rgba(255, 255, 255, 0.92)   /* Main content, active states */
--text-secondary: rgba(255, 255, 255, 0.58)   /* Labels, secondary info */
--text-tertiary:  rgba(255, 255, 255, 0.35)   /* Placeholders, disabled, hints */
--text-ghost:     rgba(255, 255, 255, 0.18)   /* Almost invisible, guide text */
```

## 15.7 Text Rendering

```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
}
```

Subpixel antialiasing is disabled. Grayscale antialiasing provides better rendering on dark backgrounds across all operating systems.

---

# 16. COLOR SYSTEM

## 16.1 Base Palette

AUDIAW's base palette is entirely defined in HSL to allow precise relationship management:

**Neutral Scale (the structural backbone):**
```
--neutral-900: hsl(240, 10%, 6%)    /* #0D0D0F — Void */
--neutral-850: hsl(240, 9%, 8%)     /* #111115 — Level 1 surface */
--neutral-800: hsl(240, 10%, 11%)   /* #1A1A21 — Level 2 surface */
--neutral-750: hsl(240, 10%, 14%)   /* #22222C — Level 3 surface */
--neutral-700: hsl(240, 10%, 17%)   /* #2C2C39 — Level 4 surface */
--neutral-650: hsl(240, 9%, 20%)    /* #363645 — Level 5 surface */
--neutral-600: hsl(240, 8%, 28%)    /* #444455 — Strong border */
--neutral-500: hsl(240, 6%, 42%)    /* #696978 — Mid-tone, disabled */
--neutral-400: hsl(240, 5%, 55%)    /* #8888A0 — Secondary text */
--neutral-300: hsl(240, 4%, 68%)    /* #AAAABB — Primary-secondary text */
--neutral-200: hsl(240, 4%, 82%)    /* #CCCCDD — Near-white text */
--neutral-100: hsl(240, 3%, 92%)    /* #EAEAEC — White text */
```

**Status Colors:**
```
--status-record:    hsl(0, 83%, 60%)    /* #EF4444 */
--status-record-dim: hsl(0, 83%, 35%)  /* #8B2020 — Record arm, not active */
--status-warning:   hsl(38, 90%, 50%)  /* #F59E0B */
--status-error:     hsl(0, 83%, 60%)   /* #EF4444 (same as record) */
--status-success:   hsl(142, 70%, 45%) /* #22C55E */
--status-info:      hsl(213, 94%, 68%) /* #60A5FA */
```

**Meter Colors:**
```
--meter-safe:       hsl(142, 70%, 45%) /* #22C55E — 0 to -12 dBFS */
--meter-caution:    hsl(38, 90%, 50%)  /* #F59E0B — -12 to -3 dBFS */
--meter-danger:     hsl(0, 83%, 60%)   /* #EF4444 — -3 to 0 dBFS */
--meter-clip:       hsl(0, 100%, 50%)  /* #FF0000 — Clipping */
--meter-bg:         hsl(240, 10%, 9%)  /* #131318 — Meter background */
```

## 16.2 Track Color Palette

16 user-assignable track colors. Each color has three variants:

| ID | Name | Hue | Main | Dim (30% sat) | Bright (waveform) |
|---|---|---|---|---|---|
| 1 | Crimson | 0° | `#EF4444` | `#553333` | `#FF6666` |
| 2 | Ember | 20° | `#F97316` | `#553722` | `#FF8844` |
| 3 | Amber | 38° | `#F59E0B` | `#554422` | `#FFBB33` |
| 4 | Gold | 50° | `#EAB308` | `#554822` | `#FFCC22` |
| 5 | Lime | 84° | `#84CC16` | `#3A4D18` | `#AAEE33` |
| 6 | Emerald | 142° | `#22C55E` | `#1A4D2E` | `#44EE77` |
| 7 | Teal | 170° | `#10B981` | `#1A4438` | `#22DDAA` |
| 8 | Cyan | 186° | `#06B6D4` | `#1A4455` | `#22DDEE` |
| 9 | Blue | 213° | `#3B82F6` | `#1A3366` | `#5599FF` |
| 10 | Violet | 262° | `#8B5CF6` | `#3A2966` | `#AA77FF` |
| 11 | Fuchsia | 292° | `#D946EF` | `#551966` | `#EE55FF` |
| 12 | Rose | 341° | `#F43F5E` | `#553344` | `#FF5577` |
| 13 | Slate | 215° | `#64748B` | `#2A3344` | `#8899AA` |
| 14 | Stone | 25° | `#78716C` | `#33302E` | `#99887F` |
| 15 | Neutral | 240° | `#A3A3A3` | `#3D3D3D` | `#BBBBBB` |
| 16 | White | 240° | `#E2E2E8` | `#444455` | `#FFFFFF` |

**Color picker UI:**
A 4×4 grid of color swatches, each 24×24px, 4px gap, 4px border-radius. Active track color has a 2px white border. Appears as a floating Level 4 surface panel (160px wide, auto height), opened by clicking the track color strip.

---

# 17. CONTRAST SYSTEM

## 17.1 Minimum Contrast Ratios

AUDIAW meets or exceeds WCAG 2.1 AA for all text elements:

| Text Type | Minimum Ratio | AUDIAW Target |
|---|---|---|
| Normal text (< 18px) | 4.5:1 | 5.5:1+ |
| Large text (≥ 18px, or ≥ 14px bold) | 3:1 | 4.0:1+ |
| UI components and states | 3:1 | 3.5:1+ |
| Decorative / non-informational | None | N/A |

**Verified contrast values (AUDIAW Dark theme):**

| Element | Foreground | Background | Ratio |
|---|---|---|---|
| Primary text | `rgba(255,255,255,0.92)` | `#1A1A21` | 11.2:1 ✓ |
| Secondary text | `rgba(255,255,255,0.58)` | `#1A1A21` | 5.8:1 ✓ |
| Tertiary text | `rgba(255,255,255,0.35)` | `#1A1A21` | 3.4:1 ✓ |
| Tab label active | `rgba(255,255,255,0.90)` | `#1A1A21` | 10.8:1 ✓ |
| Tab label inactive | `rgba(255,255,255,0.45)` | `#171720` | 4.6:1 ✓ |
| Disabled text | `rgba(255,255,255,0.20)` | any | < 3:1 (acceptable: non-interactive) |

## 17.2 Non-Text Contrast

Interactive non-text elements (buttons, checkboxes, knob outlines) must meet 3:1 against adjacent surfaces.

---

# 18. MONOCHROME UI RULES

## 18.1 The Monochrome Principle

The AUDIAW interface is fundamentally monochrome. The neutral gray scale is the only color used for:
- All backgrounds and surfaces
- All borders and separators
- All non-status labels and text
- All icons in rest state
- All structural decorations (grid lines, rulers, guides)

This monochrome principle exists not as aesthetic minimalism but as a functional discipline: **it reserves chromatic color for information that genuinely requires it.**

## 18.2 The Color Permission List

Color (non-neutral) may only appear in the AUDIAW interface in these specific contexts. Any usage not on this list is a design error:

1. **Track and clip colors** — assigned by the user for spatial memory
2. **Level meter colors** — green/amber/red zones for safe/caution/clip
3. **Record status** — red (#EF4444) when recording is active
4. **Loop markers** — accent color (blue default) for loop region overlay
5. **Playhead indicator** — white (near-pure) line against colored content
6. **Automation lane** — each lane uses a saturated color tied to its parameter
7. **Accent interactive elements** — the accent color for primary call-to-action buttons, active focus states, and the current selection indicator
8. **Status indicators** — success (green), warning (amber), error (red)
9. **Waveform fill** — track color tinted fill (40% opacity of track color)
10. **MIDI note fill** — track color at 70% opacity
11. **Plugin crash indicator** — red (#EF4444) banner
12. **Dot-matrix displays** — white text with subtle glow during playback, red during record

## 18.3 Icon Color Rules

Icons follow a specific color discipline:

**At rest:** Icons use `rgba(255,255,255,0.50)` — neutral, secondary emphasis  
**On hover:** Icons use `rgba(255,255,255,0.80)` — lighter, indicating interactivity  
**When active/toggled on:** Icons use `rgba(255,255,255,0.92)` — near-white, full presence  
**When disabled:** Icons use `rgba(255,255,255,0.20)` — barely visible, not interactive  
**Status icons (mute, solo, record):** Use their designated status color when active:
- Mute active: amber (`#F59E0B`)
- Solo active: cyan (`#06B6D4`)
- Record arm: dim red (`#8B2020`)
- Recording active: bright red (`#EF4444`)

---

# 19. ACCENT COLOR RULES

## 19.1 Default Accent Color

The default accent color is `hsl(213, 90%, 60%)` — a clear, medium blue:
- Hex: `#3B8BF5`
- Usage: focus states, selected items, primary CTA buttons, active UI highlights

## 19.2 User-Configurable Accent

Users can change the accent color in Preferences → Appearance → Accent Color. Available accent presets:

| Name | Hue | Hex |
|---|---|---|
| Blue (default) | 213° | `#3B8BF5` |
| Indigo | 240° | `#6366F1` |
| Violet | 262° | `#8B5CF6` |
| Emerald | 160° | `#10B981` |
| Teal | 180° | `#06B6D4` |
| Amber | 38° | `#F59E0B` |
| Rose | 341° | `#F43F5E` |
| White | — | `#E2E2E8` |

No custom color picker is available for accent in v1.0. Fixed palette ensures the accent colors are guaranteed to meet contrast requirements.

## 19.3 Accent Usage Constraints

The accent color is used for exactly these purposes:

1. **Focus ring:** 1.5px solid outline around keyboard-focused elements
2. **Active tab indicator:** 2px horizontal bar at bottom of active tab
3. **Primary button fill:** background of primary action buttons (Export, Save, Confirm)
4. **Selection highlight:** background of selected text and selected list items (at 15% opacity)
5. **Toggle active state:** filled background of active toggle switches
6. **Loop region overlay:** 15% opacity accent fill over the loop region
7. **Active automation lane header:** left border of the currently visible automation lane
8. **Playhead head** (the small triangle at the top): filled accent color
9. **Clip selection border:** 1.5px accent border on selected clips

The accent color is **never** used for:
- Backgrounds of entire panels or sections
- Track colors (separate system)
- Decorative purposes
- Text emphasis (use weight/opacity instead)

---

# 20. ICONOGRAPHY

## 20.1 Icon Grid and Construction

All AUDIAW icons are constructed on a 20×20px artboard with 1px inner padding (18×18px effective area). Icons are drawn with:

- **Stroke weight:** 1.5px at 20px size, scaling proportionally
- **Cap style:** Round
- **Join style:** Round
- **Corner radius for rectangles within icons:** 1.5px
- **Fill:** Never (icon set is stroke-only, except for specific filled states like the "active/on" version of toggles)

## 20.2 Icon Sizes in Context

| Context | Rendered Size | Source Size | Usage |
|---|---|---|---|
| Status bar | 12px | 20px (scaled) | Smallest in-UI |
| Track header controls | 14px | 20px (scaled) | Mute, solo, arm, etc. |
| Tab bar labels | 14px | 20px (scaled) | Tab icons |
| Transport buttons (secondary) | 16px | 20px (scaled) | Loop, metro, etc. |
| Transport buttons (primary) | 20px | 20px (1:1) | Play, stop, record |
| Panel section headers | 14px | 20px (scaled) | Section identifiers |
| Command palette icons | 14px | 20px (scaled) | Command icons |
| Context menu icons | 14px | 20px (scaled) | Menu item icons |
| Plugin browser thumbnails | 24px | 20px (scaled) | Plugin format badges |
| Empty state illustrations | 48px | SVG (vector) | Large empty state art |

## 20.3 Icon Set Catalog

**Transport:**
- `play` — right-pointing triangle (filled when active, stroke when inactive)
- `pause` — two vertical bars
- `stop` — square (4px corner radius)
- `record` — circle (filled when armed/recording, stroke when off)
- `rewind` — two left-pointing chevrons
- `fast-forward` — two right-pointing chevrons
- `loop` — circular arrow (closed loop path)
- `metronome` — pendulum shape (distinctive, not generic)

**Track Types:**
- `audio-track` — horizontal waveform lines (3 lines, varying lengths)
- `midi-track` — musical note symbol (8th note)
- `group-track` — folder with stacked layers inside
- `return-track` — curved arrow returning left
- `master-track` — crown shape (3 points)

**Editing Tools:**
- `pointer` — standard cursor arrow
- `pencil` — pencil at 45° angle
- `eraser` — rectangle with angled top
- `scissors` — scissors, closed
- `slice` — vertical line with small perpendicular marks
- `zoom-in` — magnifying glass with plus
- `zoom-out` — magnifying glass with minus

**Controls:**
- `mute` — speaker with X
- `solo` — headphones
- `arm` — record circle (small)
- `monitor` — speaker with in-arrow
- `freeze` — snowflake (6-pointed, simple)
- `lock` — padlock
- `eye-off` — eye with slash

**Navigation:**
- `arrow-left`, `arrow-right`, `arrow-up`, `arrow-down` — directional chevrons (not full arrows)
- `chevron-down` — simple V shape
- `chevron-right` — simple > shape

**File and Project:**
- `folder` — folder shape
- `file` — document with folded corner
- `save` — floppy disk (universally recognized)
- `export` — box with up-arrow
- `import` — box with down-arrow

**Interface:**
- `gear` — 8-tooth gear (settings)
- `grid` — 2×2 dot grid
- `close` — X (two 45° lines)
- `plus` — plus sign
- `minus` — minus sign / dash
- `more` — three horizontal dots (…)
- `expand` — four-corner outward arrows
- `collapse` — four-corner inward arrows

**Device/DSP:**
- `waveform` — sine wave
- `spectrum` — ascending bars (EQ-style)
- `plugin` — puzzle piece
- `fx` — lightning bolt
- `modulation` — curved sine with dots

## 20.4 Icon States

Every icon exists in three visual states, applied via opacity and color (never separate SVG files):

```css
/* Rest state */
.icon { color: rgba(255,255,255,0.50); }

/* Hover state (on parent hover or direct hover) */
.icon:hover, .icon-button:hover .icon { color: rgba(255,255,255,0.80); }

/* Active / toggled on state */
.icon.active, [data-active="true"] .icon { color: rgba(255,255,255,0.92); }

/* Disabled state */
.icon.disabled, [disabled] .icon { color: rgba(255,255,255,0.20); }
```

Status-specific icon colors override these:
```css
.icon.muted { color: #F59E0B; }      /* Amber when muted */
.icon.soloed { color: #06B6D4; }      /* Cyan when soloed */
.icon.armed { color: #8B2020; }       /* Dim red when armed */
.icon.recording { color: #EF4444; }   /* Bright red when recording */
```

---

# 21. MOTION DESIGN SYSTEM

## 21.1 Motion Philosophy

Motion in AUDIAW serves comprehension, not delight. An animation exists to help the user understand a state change, not to make the interface feel more polished in isolation.

**The three valid reasons for motion:**
1. **Spatial orientation** — showing where something came from or where it went (panel slide-in from the left communicates it lives on the left)
2. **State confirmation** — confirming that an action was received (a button pressing down confirms the click)
3. **Continuity** — maintaining visual continuity across state changes (a clip dragging with the cursor maintains the user's sense of where the clip is)

**Invalid reasons for motion:**
- Making the interface feel "premium"
- Providing visual interest to an otherwise static region
- Following current UI animation trends
- Demonstrating technical capability

## 21.2 Animation Duration Scale

```
--duration-instant:   0ms    /* State: immediate, no visual transition */
--duration-micro:    60ms    /* Micro: button press depth, hover state enter */
--duration-fast:     90ms    /* Fast: hover state exit, panel resize feedback */
--duration-standard:120ms    /* Standard: panel open/close, selection change */
--duration-moderate: 180ms   /* Moderate: modal enter/exit */
--duration-slow:     240ms   /* Slow: workspace switch, view transitions */
--duration-crawl:    400ms   /* Crawl: startup sequence, onboarding reveals */
```

## 21.3 Easing Curve Definitions

```css
/* Primary UI easing: fast start, decelerate to rest (feels responsive) */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);

/* Reciprocal: slow start, fast end (for dismiss/collapse) */
--ease-in: cubic-bezier(0.7, 0, 0.84, 0);

/* Both directions: for transitions where content leaves and enters */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

/* Standard: the classic ease-out for most UI transitions */
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);

/* Spring: very slight overshoot for panel docking */
--ease-spring: cubic-bezier(0.34, 1.12, 0.64, 1);
/* NOTE: Overshoot is ≤12%. Never more. Never use for content transitions. */
```

## 21.4 Specific Animation Definitions

**Panel open (left/right panel):**
```
Duration: 150ms
Easing: --ease-out
Property: width (or translateX)
From: 0px (or translateX(-100%))
To: target width (or translateX(0))
Simultaneous: canvas zone resizes in the same duration
```

**Panel close:**
```
Duration: 120ms
Easing: --ease-in
Property: width (or translateX)
From: current width
To: 0px
```

**Panel tab switch:**
```
Duration: 0ms (instant — no animation between tabs)
Rationale: Tab switching is a frequent operation; any delay causes friction
```

**Modal dialog enter:**
```
Duration: 180ms
Easing: --ease-out
Backdrop: fade from opacity 0 to rgba(0,0,0,0.6)
Content: translateY from +16px to 0, opacity from 0 to 1
Both properties animate simultaneously
```

**Modal dialog exit:**
```
Duration: 120ms
Easing: --ease-in
Backdrop: fade from rgba(0,0,0,0.6) to 0
Content: opacity 1 to 0 only (no translate on exit — exits "in place")
```

**Context menu open:**
```
Duration: 90ms
Easing: --ease-out
transform-origin: the point where the user right-clicked
scale from 0.94 to 1.0
opacity from 0 to 1
```

**Context menu close:**
```
Duration: 60ms
Easing: --ease-in
opacity from 1 to 0 only (no scale — exits "in place")
```

**Hover state enter:**
```
Duration: 60ms
Easing: --ease-out
Properties: background-color, color, border-color
```

**Hover state exit:**
```
Duration: 90ms
Easing: --ease-out
Properties: background-color, color, border-color
Rationale: Slightly slower exit prevents flickering during cursor movement
```

**Tooltip appear:**
```
Delay before appearing: 600ms (of static hover)
Duration: 90ms
Easing: --ease-out
opacity from 0 to 1 only (no translate — tooltips appear in place)
```

**Tooltip dismiss:**
```
Duration: 60ms
opacity from 1 to 0
No delay
```

**Clip drag (in timeline):**
```
No animation — follows cursor exactly (0ms response)
Drag ghost: 80% opacity of the clip
Grid snap: snaps instantly (no animate-to-snap)
```

**Track height resize:**
```
No animation while dragging (tracks resize as you drag)
Snap-to-height-mode if released near a mode boundary: 80ms ease-out to target height
```

**Workspace switch:**
```
Duration: 240ms
Easing: --ease-standard
Outgoing view: opacity from 1 to 0 in first 120ms
Incoming view: opacity from 0 to 1 in last 120ms
No translate — opacity crossfade only
Rationale: A translate would cause confusion about spatial relationships
```

**Waveform zoom:**
```
No animation — waveform updates at the next GPU frame
Target: sub-16ms response from zoom gesture to visual update
Rationale: Animation delays in zoom feel like lag, not smoothness
```

---

# 22. ANIMATION RULES

## 22.1 Rules That Are Absolute

**Rule A: No animation may delay user action.**  
If a button triggers an action, the action begins the moment the button is pressed. The animation confirming the press is simultaneous with, not before, the action.

**Rule B: No looping animations in the main interface.**  
Loading spinners loop. Everything else does not. A blinking cursor in a text field is the only exception. Record button blinking during active recording is an exception: 1s on/off, 50/50 duty cycle.

**Rule C: All animations respect `prefers-reduced-motion`.**  
When `prefers-reduced-motion: reduce` is set:
- All transitions that change position or scale → instant (0ms, no transition)
- All opacity transitions → allowed (they remain, but duration halved)
- Blinking (record indicator) → solid on, no blink

**Rule D: No animation is applied to an element that updates at >10Hz.**  
Level meters update at 60Hz. They use direct CSS variable updates — no CSS transition. Attempting to animate at 60Hz through CSS transitions causes GPU compositor overload.

**Rule E: The waveform never animates.**  
Waveform content is GPU-rendered and updates immediately. No CSS transition is ever applied to the waveform display canvas.

## 22.2 The Anti-Animation List

These animation types are explicitly banned from AUDIAW:

- Bounce / spring physics with >12% overshoot
- Parallax scrolling effects
- Particle effects
- Shimmer / skeleton loading animations (use static placeholder instead)
- Rotating icons (except the loop button's rotation indicator, which is a 1-second CSS rotation indicating playback)
- "Ripple" click effects (Material Design ripple)
- Page-flip transitions
- Blur-in animations
- Scale animations on content that grows from > 0.8 (distracting, feels like growing object)
- Any animation that obscures content while animating (content must be readable throughout)

---

# 23. TRANSITION HIERARCHY

## 23.1 System-Level Transitions

System-level transitions change the fundamental state of the application. They are the slowest and most deliberate:

**View switch (Arrangement ↔ Mixer ↔ Piano Roll):**
- Duration: 240ms
- Pattern: opacity crossfade (outgoing fades out, incoming fades in)
- The transport bar and status bar do not transition — they are always visible and do not change

**Workspace switch:**
- Duration: 240ms
- Same pattern as view switch
- Panel positions change after the crossfade, without their own animation

**Application startup to working state:**
- Described in Section 32 (Startup Experience)

## 23.2 Component-Level Transitions

Component-level transitions respond to direct user actions on individual components:

**Panels:** 120–150ms ease-out for open/close  
**Dropdowns:** 90ms ease-out for open, 60ms ease-in for close  
**Modals:** 180ms ease-out for open, 120ms ease-in for close  
**Tooltips:** 90ms ease-out appear, 60ms ease-in disappear  

## 23.3 State-Level Transitions

State-level transitions communicate changes in element state (hover, active, focus):

**All hover states:** 60ms enter, 90ms exit  
**All focus states:** 0ms (instant — focus ring appears immediately on keyboard navigation)  
**All active/pressed states:** 60ms enter, 90ms exit  
**Record state change:** 120ms ease-out (the red color transitions in)  

---

# 24. INTERACTION FEEDBACK SYSTEM

## 24.1 Feedback Modes

AUDIAW uses three feedback modes for interactions. Every interactive element uses exactly one of these modes:

**Mode A: Immediate (< 16ms)**  
Used for: transport play/stop/record, clip select, note select, fader drag start  
The visual change happens within the same frame as the input event.

**Mode B: Confirmed (16–100ms)**  
Used for: command execution, project save, export start, plugin load  
A visual indicator (button state change, progress start) confirms receipt within 100ms. The actual operation may take longer.

**Mode C: Progressive (100ms–indefinite)**  
Used for: project open, export render, plugin scan  
A loading indicator with progress (where possible) or activity (where progress is unknown).

## 24.2 Button Press Feedback

All clickable buttons use this feedback sequence:

1. **Pointer-down:** Background brightens by `rgba(255,255,255,0.04)`, scale `transform: scale(0.98)` in 60ms ease-out
2. **Pointer-up:** Scale returns to 1.0 in 90ms ease-out, background returns to hover state

The scale transform is applied only if the button is > 24px in its smallest dimension. Buttons ≤ 24px (icon-only buttons) use only the background change, no scale.

## 24.3 Knob Interaction Feedback

Rotary knobs have a specific interaction model:

**Hover state:** The knob's indicator track brightens slightly. The knob background shows a subtle highlight. Cursor changes to `ns-resize`.

**Drag state:** A value tooltip appears above the knob showing the exact current value. The tooltip updates in real-time during drag. The knob indicator moves in real-time.

**Precision mode:** Holding `Shift` during drag reduces sensitivity to 10% of normal. A label "FINE" appears below the knob in 10px, `rgba(255,255,255,0.45)`.

**Reset:** Double-click on any knob resets it to its default value. A brief flash animation (knob indicator bounces to default in 120ms) confirms the reset.

**Value display:** Right-clicking a knob opens an inline input field (28px height, monospace font) pre-populated with the current value. User can type a specific value and press Enter to confirm.

## 24.4 Fader Interaction Feedback

**Hover:** Fader cap brightens. The value is shown in a floating label next to the fader cap.

**Drag:** The value label persists and updates. If dragging moves the cap beyond the fader track, the cap clamps to the track end. Out-of-bounds dragging is accepted (the value clamps internally, the visual position clamps at track boundary).

**Click on track (not cap):** The fader jumps to the clicked position. Duration: instant. No animation.

**Precision mode:** Same as knob — `Shift` reduces to 10% sensitivity.

**Reset:** Double-click on fader cap resets to 0 dB (or default value for non-level faders).

---

# 25. CURSOR BEHAVIOR

## 25.1 System Cursors Used

AUDIAW uses system cursors for all standard interactions. No custom cursor images except where noted:

| Interaction | Cursor |
|---|---|
| Default / pointer | `default` |
| Clickable element | `pointer` |
| Text input | `text` |
| Horizontal resize (panel border) | `col-resize` |
| Vertical resize (panel border, track height) | `row-resize` |
| Fader / knob drag | `ns-resize` |
| Clip drag (active drag) | `grabbing` |
| Clip drag (hover, ready to drag) | `grab` |
| Clip resize (left/right edge hover) | `col-resize` or `ew-resize` |
| Pencil tool (piano roll draw mode) | `crosshair` |
| Eraser tool | custom: `url('cursors/eraser.svg') 0 20, cell` |
| Scissors tool | custom: `url('cursors/scissors.svg') 10 10, cell` |
| Zoom tool | `zoom-in` or `zoom-out` depending on modifier |
| Selection rubber-band | `crosshair` |
| Unavailable / disabled | `not-allowed` |
| Drag-over valid target | `copy` (during file drag) |
| Drag-over invalid target | `no-drop` |

## 25.2 Custom Cursor Specifications

**Eraser cursor:**
- SVG: 20×20px, eraser shape
- Hotspot: `0, 20` (bottom-left corner)
- Color: white outline

**Scissors cursor:**
- SVG: 20×20px, scissors shape
- Hotspot: `10, 10` (center, between blades)
- Color: white outline

Custom cursors are cached by the browser and should never cause performance concerns.

## 25.3 Cursor Transitions

Cursor changes are instant (OS-controlled). AUDIAW does not animate cursor changes.

---

# 26. HOVER STATE PHILOSOPHY

## 26.1 Hover as Discovery

Hover states serve two purposes in AUDIAW:

1. **Confirmation:** Confirming to the user that an element is interactive (changes color, reveals controls)
2. **Contextual disclosure:** Revealing controls that are hidden at rest (the "Level 5 — invisible until invoked" layer)

## 26.2 Track Header Hover Behavior

At rest, a track header shows only: color strip, track name, and minimal controls (type icon).

On hover (cursor enters the track header):
- Transition: 60ms ease-out
- Background shifts from Level 2 (`#1A1A21`) to Level 3 (`#22222C`)
- Mute button appears: transition from opacity 0 to 0.50 in 60ms
- Solo button appears: same
- Record arm button appears: same
- Track settings button (⋯) appears: same
- Track height drag handle appears at the bottom edge: a 2px horizontal line at `rgba(255,255,255,0.15)`

On hover exit:
- Transition: 90ms ease-out
- Background returns to Level 2
- Contextual controls fade to opacity 0 (unless one of them is in an active state — active mute stays visible, active solo stays visible)

**Exception: always-visible controls**  
If a track is muted, the mute button remains visible at rest (no fade to 0), at opacity 0.80. Same for solo and record-arm.

## 26.3 Clip Hover Behavior

On hover (cursor enters a clip):
- Clip border brightens: from `rgba(255,255,255,0.08)` to `rgba(255,255,255,0.20)`
- Clip header bar background: from track_color at 15% to track_color at 25%
- Clip name: opacity shifts from 0.70 to 0.90
- Resize handles appear: left and right edges show a 4px wide hover zone with cursor `ew-resize`
- Position tooltip: appears at cursor position showing the clip's bar:beat:tick position, 600ms after hover starts

## 26.4 Button Hover Behavior

Standard button hover:
- Background: adds `rgba(255,255,255,0.05)` to current background
- Border: increases opacity by 0.05 (e.g., interactive border from 0.10 to 0.15)
- Transition: 60ms ease-out

Icon-only button hover:
- Icon color: from `rgba(255,255,255,0.50)` to `rgba(255,255,255,0.80)`
- Optional: background appears as `rgba(255,255,255,0.06)` — only if the button has a defined bounding box
- Transition: 60ms ease-out

---

# 27. FOCUS STATE SYSTEM

## 27.1 Focus State Design

Focus states in AUDIAW are visible, precise, and unambiguous. They are the primary navigation affordance for keyboard users.

**Standard focus ring:**
```css
:focus-visible {
  outline: 1.5px solid var(--accent-primary);   /* #3B8BF5 */
  outline-offset: 2px;
  border-radius: var(--radius-standard);         /* 4px */
}
```

The focus ring is:
- Always 1.5px (thinner than a typical 2px — more precise)
- Always 2px outside the element edge (outline-offset)
- Always the current accent color
- Always 100% opacity (never faded or subtle — accessibility requirement)
- Applied immediately (0ms transition) on keyboard focus
- Removed immediately (0ms) when focus leaves

## 27.2 Focus Context Behavior

**Text inputs:**
- Focus state adds the standard focus ring
- Additionally: the bottom border of the input transitions to accent color at full opacity (180° turn — the input's `border-bottom` becomes accent)

**Knobs:**
- Standard focus ring around the knob's circular bounding area
- Arrow keys adjust the knob value (↑/→ = increase, ↓/← = decrease) by the standard step value

**Faders:**
- Standard focus ring around the entire fader track area
- Arrow keys adjust the fader (↑/→ = increase, ↓/← = decrease) by 0.5dB per keypress
- Shift + arrow keys: 0.1dB per keypress
- Ctrl + arrow keys: 1dB per keypress

**Clip (timeline):**
- Selection border brightens from selection color to accent color when keyboard-focused
- Arrow keys navigate between clips on the same track
- Up/down arrows navigate between tracks (carrying selection)

## 27.3 Focus Trap

Modal dialogs and the command palette implement focus trapping:
- When a modal opens, focus moves to the first focusable element inside the modal
- Tab cycles through focusable elements within the modal only
- Shift+Tab cycles in reverse
- Escape dismisses the modal and returns focus to the element that triggered the modal

---

# 28. KEYBOARD NAVIGATION STANDARDS

## 28.1 Global Tab Order

The Tab key navigates through focusable elements in this order within each zone:

1. Transport zone (left to right: rewind, play, stop, record, loop, BPM, time signature, workspace selector, CPU meter)
2. Main canvas zone (timeline ruler, then tracks top-to-bottom, then track controls left-to-right within each track)
3. Left panel zone (search field, location list, asset list, preview player)
4. Right panel zone (device chain list, each device, each device's controls)
5. Bottom panel zone (active panel's tab order)
6. Status bar (read-only, not in tab order)

## 28.2 Arrow Key Conventions

Arrow keys provide navigation within complex components:

**Timeline/arrangement:**
- Left/Right: move selection by one snap unit
- Up/Down: navigate between tracks
- Shift + Left/Right: extend selection by one snap unit
- Ctrl + Left/Right: navigate by 1 bar

**Piano roll:**
- Left/Right: navigate between selected notes (or move selected notes)
- Up/Down: navigate pitch (or transpose selected notes by semitone)
- Shift + arrows: extend note selection
- Ctrl + Up/Down: transpose by octave

**Lists (browser, preset list, etc.):**
- Up/Down: navigate items
- Right: expand folder / drill into item
- Left: collapse folder / go up one level
- Enter: select / activate
- Space: preview (samples in browser)

## 28.3 Keyboard Shortcut Display

Keyboard shortcuts are shown in context in three places:

1. **Tooltips:** Keyboard shortcut shown at right side of tooltip in `rgba(255,255,255,0.45)` color, separated from label by 16px space
2. **Context menus:** Keyboard shortcut shown at right edge of menu item, right-aligned
3. **Command palette:** Keyboard shortcut shown at right edge of each result

Shortcut format: macOS uses `⌘`, `⌥`, `⇧`, `⌃` symbols. Windows/Linux uses "Ctrl", "Alt", "Shift" text labels.

---

# 29. ACCESSIBILITY STANDARDS

## 29.1 WCAG 2.1 AA Compliance

AUDIAW targets WCAG 2.1 AA compliance as a minimum for all interface elements. This includes:

- All text meets 4.5:1 contrast (normal) or 3:1 (large text)
- All interactive elements meet 3:1 contrast for their boundaries
- No information is conveyed by color alone
- All interactive elements are keyboard accessible
- All images and icons have appropriate alt text or aria-label
- Focus is always visible and clearly indicated
- No content flashes more than 3 times per second

## 29.2 Reduced Motion

When `prefers-reduced-motion: reduce` is detected:

```css
@media (prefers-reduced-motion: reduce) {
  /* Position-based animations become instant */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Opacity transitions are allowed but halved */
  .opacity-transition {
    transition-duration: 60ms !important;
  }
  
  /* Record blink is replaced with solid red */
  .record-indicator.blinking {
    animation: none;
    opacity: 1;
  }
}
```

## 29.3 Screen Reader Support

**ARIA landmark regions:**
```html
<header role="banner" aria-label="Transport Bar">
<main role="main" aria-label="Arrangement">
<aside role="complementary" aria-label="Browser" id="left-panel">
<aside role="complementary" aria-label="Device Inspector" id="right-panel">
<footer role="contentinfo" aria-label="Status Bar">
```

**Live regions for real-time updates:**
```html
<!-- Transport state announcements -->
<div aria-live="polite" aria-atomic="true" id="transport-announcer" class="sr-only">
  <!-- "Playing", "Stopped", "Recording started" etc. -->
</div>

<!-- Error and critical notifications -->
<div aria-live="assertive" aria-atomic="true" id="alert-announcer" class="sr-only">
  <!-- Plugin crashes, audio dropouts, critical errors -->
</div>
```

**Meter accessibility:**
Level meters are not individually describable in real-time for screen readers (too noisy). Instead:
- A summary meter level is spoken once per 5 seconds via polite live region: "Master output: -8 dBFS"
- Users can request a meter level reading via keyboard shortcut (default: Alt+M)

## 29.4 Colorblind Accessibility

AUDIAW's design is tested under three colorblindness simulations using the Pilestone method:

**Deuteranopia (red-green):**
- Meters: green/amber/red zones remain distinguishable by value context (bar height position conveys level; color zones provide supplementary info)
- Record state: red is supplemented by the pulsing animation and the "REC" text label
- Track colors: all 16 track colors are verified distinguishable under deuteranopia simulation

**Protanopia (red-green variant):**
- Same considerations as deuteranopia

**Tritanopia (blue-yellow):**
- The accent color (blue default) may appear differently. Users can switch to a non-blue accent. The Rose or Emerald accents are recommended for tritanopia.

---

# 30. TOUCH & TABLET UX

## 30.1 Touch Target Sizes

All interactive elements have a minimum touch target of 44×44px (Apple HIG and WCAG 2.5.5):
- If the visual element is smaller than 44×44px, the touch area is extended invisibly around it
- Example: a 14px icon button has a 44×44px invisible touch target centered on the icon

## 30.2 Gesture Support

AUDIAW supports these standard touch gestures:

**Pinch to zoom:** Zooms the timeline horizontally (arrangement view) or the piano roll. Center point of pinch is the zoom anchor.

**Two-finger scroll:** Scrolls the active canvas (timeline, mixer, piano roll). Natural scrolling direction by default.

**Two-finger horizontal scroll:** Navigates the timeline or piano roll horizontally.

**Long press:** Equivalent to right-click (shows context menu). Minimum hold: 500ms. Visual feedback: a subtle radial ripple appears at the press point after 300ms to communicate "long press detected."

**Swipe on track header:** Swipe left on a track header reveals contextual quick actions: Mute, Solo, Delete. Actions are revealed one-by-one as the swipe progresses (30%, 60%, 90% of header width reveals Mute, +Solo, +Delete respectively).

## 30.3 Tablet Optimizations

On tablet form factors (> 768px wide in tablet mode):

- Minimum touch target increases to 48×48px
- Track heights default to "Tall" (80px) for easier selection
- The command palette can be accessed by swiping down from the top of the canvas zone
- The left panel defaults to closed (more canvas space)

---

# 31. MULTI-MONITOR UX

## 31.1 Primary Window Behavior

The AUDIAW main window always occupies exactly one monitor. Its monitor is the "primary" monitor for AUDIAW. Settings, transport state, and project data are associated with this window.

## 31.2 Secondary Window Behavior

Plugin windows and detached panels appear on the monitor where they are positioned. Window managers on each OS handle this natively.

**Detached panel behavior:**
- Any docked panel can be detached to a secondary monitor by double-clicking its tab or via context menu → "Move to New Window"
- Detached panels appear as secondary windows with full panel functionality
- The tab in the original zone remains, showing a "moved to secondary window" indicator (small monitor icon)
- The secondary window reattaches to the main window by closing it or via context menu → "Return to Main Window"

**Workspace memory for multi-monitor:**
- AUDIAW identifies monitors by their hardware ID (where available) or logical index
- Secondary window positions and sizes are saved per-monitor configuration
- If a secondary monitor is disconnected, its windows are moved to the primary monitor on next launch

## 31.3 Multi-Monitor Consistency

All AUDIAW windows use the same theme, font rendering, and UI scale. Scale cannot be set per-monitor (the OS handles HiDPI scaling differences between monitors).

---

# 32. STARTUP EXPERIENCE

## 32.1 Cold Launch Sequence

The startup sequence has four visual phases, totaling ≤ 2500ms on reference hardware:

**Phase 1: Window Appears (0–50ms)**
The application window appears immediately. Background: Level 1 surface (`#111115`). Nothing else. No flash, no white screen, no OS loading animation.

**Phase 2: Brand Reveal (50–600ms)**
Centered in the window, the AUDIAW wordmark fades in at opacity 0 → 1 over 400ms (ease-out). Below the wordmark, a dot-matrix status line appears:
```
AUDIAW  [dot-matrix text, 16px Geist Mono, opacity 0.45]
"INITIALIZING..."
```
The dot-matrix text uses the styling from section 7.2.

**Phase 3: Initialization Progress (600–2000ms)**
The status line updates with initialization progress messages in sequence. Each message appears by fading in (100ms ease-out) and the previous message fades simultaneously. Messages are exact:
```
"LOADING AUDIO ENGINE"     → appears at ~600ms
"CONNECTING AUDIO DEVICE"  → appears at ~900ms
"INDEXING PLUGIN CACHE"    → appears at ~1100ms
"LOADING WORKSPACE"        → appears at ~1500ms
"READY"                    → appears at ~2000ms, stays for 300ms
```

The status message typography:
- Font: 13px Geist Mono
- Color: `rgba(255,255,255,0.45)`
- Letter spacing: 0.08em
- Uppercase

**Phase 4: Interface Reveal (2000–2500ms)**
After "READY" appears, the full interface fades in over 400ms (ease-out). The wordmark and status line fade out simultaneously (200ms ease-in). The interface appears already complete — no individual element "flying in."

If a previous project exists, it is shown fully loaded in the interface as it fades in.

## 32.2 Warm Launch (Recent Project)

When launching with a recent project loaded from a previous session:

- Phases 1 and 2 are the same
- Phase 3 is shorter: "RESTORING PROJECT" → "READY"
- The project content (tracks, clips) is visible in the interface as it fades in
- Plugin instruments load in the background after the interface is visible — placeholders are shown (grayed-out device cards)

## 32.3 First Launch (No Previous Session)

On the very first launch, after Phase 4, instead of an empty arrangement:

- A **Start Screen** appears in the primary canvas zone
- The start screen is NOT a separate window — it replaces the canvas
- Layout: centered content within the canvas, max-width 760px

**Start Screen layout:**
```
[Large AUDIAW wordmark — 28px Inter Semibold, opacity 0.90]
                 16px gap
[Subtitle — 13px Inter Regular, opacity 0.50]
"A free, open-source DAW built for everyone."
                 48px gap
[Template Gallery — horizontal scroll row]
[6 genre cards: each 180×120px, with genre name and BPM hint]
                 24px gap
[Secondary actions row]
  [Open Project]  [Start Empty]
```

**Template cards:**
- Size: 180×120px
- Background: Level 3 surface
- Border: 1px interactive border
- Border-radius: 6px
- Content: A waveform illustration in the track color for that genre (pre-drawn SVG, not interactive waveform)
- Label: genre name in 13px Inter Medium, white, bottom-left of card, 12px padding
- BPM hint: "140 BPM" in 10px Geist Mono, opacity 0.45, bottom-right of card
- Hover: border transitions to `rgba(255,255,255,0.25)`, background to Level 4

---

# 33. LOADING STATES

## 33.1 Loading State Categories

AUDIAW has three types of loading:

**Type A: Instant (< 100ms)** — No loading state shown. If the operation completes within 100ms, the result simply appears. No spinner was shown, no progress indicator was visible.

**Type B: Short (100ms – 3s)** — A loading indicator appears. Specifically: the button or action trigger shows a subtle activity indicator (a 16px spinner positioned inside or adjacent to the trigger). The spinner is a simple circle with a gap, rotating at 2 rotations/second.

**Type C: Long (> 3s)** — A loading indicator with either a progress bar (if progress is deterministic) or an activity bar (if not).

## 33.2 Spinner Design

The AUDIAW loading spinner:
- Size: 16px (standard), 12px (small/compact contexts)
- Visual: a 16px circle with a 3px stroke, 60° arc gap
- Colors: the full circle is `rgba(255,255,255,0.15)`, the animated arc is `rgba(255,255,255,0.70)`
- Animation: 360° rotation, 500ms per rotation, linear easing (constant speed)
- CSS:
  ```css
  .spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.15);
    border-top-color: rgba(255,255,255,0.70);
    border-radius: 50%;
    animation: spin 500ms linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  ```

## 33.3 Progress Bar Design

Long loading operations (project open, export, plugin scan):
- Displayed in a non-blocking notification bar at the bottom of the canvas zone (above the status bar)
- Height: 32px
- Background: Level 4 surface
- Content: [spinner 14px] [operation name] [optional: "Item X of Y"] [progress bar]
- Progress bar: full-width (within notification bar), 2px height, positioned at very bottom of notification bar
- Progress bar fill: accent color, left-to-right
- Progress bar background: `rgba(255,255,255,0.10)`
- Indeterminate progress: a 40% wide bar that moves left-to-right in 1.2s loop (ease-in-out)

## 33.4 Waveform Loading Placeholder

When a clip is visible but its waveform thumbnail is not yet loaded:
- The clip shows its standard visual structure (border, header, color)
- The waveform area shows a subtle horizontal line at the clip's vertical center (`rgba(255,255,255,0.12)`)
- No spinner — the loading is background and unobtrusive
- When the waveform is ready, it fades in over 120ms ease-out

---

# 34. EMPTY STATES

## 34.1 Empty Arrangement

When the arrangement view has no tracks:
- The track lane area shows the dot-grid background texture (section 7.3)
- Centered vertically in the canvas, a minimal empty state message:
  ```
  [Icon: music note, 32px, opacity 0.20]
  8px gap
  ["No tracks yet" — 13px Inter Medium, opacity 0.35]
  4px gap
  ["Press ⌘N to add a track, or choose a template." — 11px Inter Regular, opacity 0.25]
  ```
- No button in the empty state (the shortcut hint is sufficient)

## 34.2 Empty Browser

When a browser location has no files:
- The file list area shows:
  ```
  [Icon: folder, 24px, opacity 0.20]
  8px gap
  ["No files found" — 12px Inter Medium, opacity 0.35]
  ```

When search returns no results:
- The file list area shows:
  ```
  [Icon: search, 20px, opacity 0.20]
  8px gap
  ["No results for '[query]'" — 12px Inter Medium, opacity 0.35]
  4px gap
  ["Try different keywords or remove filters." — 11px Inter Regular, opacity 0.25]
  ```

## 34.3 Empty Plugin Chain

When a track has no devices in its chain (shown in the right panel):
- A single dashed-border add slot occupies the full width:
  - Height: 48px
  - Border: 1px dashed at `rgba(255,255,255,0.15)`
  - Border-radius: 6px
  - Content: [Icon: plus, 14px, opacity 0.30] ["Add Device" — 11px, opacity 0.30]
  - Hover: border becomes solid at `rgba(255,255,255,0.25)`, content brightens

---

# 35. ERROR STATES

## 35.1 Non-Critical Errors (Warnings)

Non-blocking warnings appear as notification banners above the status bar:

**Design:**
- Height: 32px
- Background: `rgba(245, 158, 11, 0.12)` (amber tint)
- Left border: 2px solid `#F59E0B`
- Content: [Icon: warning triangle, 14px, amber] [Message — 12px Inter Regular, opacity 0.80] [Dismiss button: × at right edge]
- Display duration: stays until dismissed (not auto-dismiss for warnings)
- Multiple warnings: stack vertically, newest on top, max 3 visible at once

## 35.2 Critical Errors

Critical errors (plugin crash, audio device disconnect, autosave failure) use a higher-prominence banner:

**Design:**
- Height: 40px
- Background: `rgba(239, 68, 68, 0.12)` (red tint)
- Left border: 2px solid `#EF4444`
- Content: [Icon: alert circle, 14px, red] [Message — 12px Inter Medium, opacity 0.90] [Action button: "Resolve"] [Dismiss button: ×]
- The "Resolve" button is an accent-colored small button (described in Section 68)
- Never auto-dismissed

## 35.3 Input Validation Errors

For form inputs with invalid values (e.g., BPM outside 20–999 range):
- The input field's bottom border turns red (`#EF4444`)
- Below the input, an error message appears: 10px Inter Regular, red, 2px below input
- Error message appears within 200ms of the invalid input
- Error disappears immediately when the value becomes valid

## 35.4 Missing Asset Error (Clip)

When an audio asset referenced by a clip cannot be found:
- The clip shows with a red-tinted overlay at 15% opacity over its waveform area
- The waveform is replaced by a centered icon: missing file icon, 14px, opacity 0.50
- The clip header shows a small warning indicator (! triangle, 10px, amber)
- The clip tooltip on hover says: "Audio file not found: [filename]. Right-click to locate."

---

# 36. CRASH RECOVERY UX

## 36.1 Crash Detection at Next Launch

If AUDIAW detects a crash indicator on startup (before Phase 2 of startup):

**A recovery dialog appears after Phase 4 (interface is visible):**

The dialog is a centered modal:
- Width: 480px
- Background: Level 4 surface
- Border-radius: 8px
- Shadow: `0 24px 80px rgba(0,0,0,0.8)`
- Internal padding: 32px

**Content:**
```
[Icon: alert circle, 24px, amber]
16px gap
["AUDIAW exited unexpectedly" — 16px Inter Semibold]
8px gap
["An autosave was found from [time]. Would you like to restore it?"
 — 13px Inter Regular, opacity 0.65]
24px gap
[Restore Autosave button — primary, full width]
8px gap
[Open last saved version — secondary, full width]
8px gap
[Start fresh — tertiary text button, full width, lower opacity]
16px gap
[Separator]
8px gap
["Submit anonymous crash report" — 11px, checkbox left, opacity 0.50]
```

Checkboxes: 16×16px, accent-colored check when checked, standard border when unchecked.

## 36.2 UI Crash During Audio Playback

If the UI (WebView) crashes while the audio engine continues:

- Audio continues without interruption (audio engine is isolated)
- The window shows a simplified recovery UI (rendered via a fallback HTML page):

```
Level 1 surface background, centered content:

[AUDIAW wordmark — 20px]
16px
["The interface encountered an error." — 13px, opacity 0.65]
8px
["Audio is still playing." — 13px, opacity 0.90, accent-colored]
24px
[Reload Interface — primary button]
```

The "Reload Interface" button reloads the WebView without restarting the audio engine. Target: interface restores to pre-crash state within 3 seconds.

---

# 37. PROJECT RECOVERY UX

## 37.1 Missing File Resolution

When a project has missing audio files, and the user chooses to proceed:

**Missing files panel:**
A banner above the arrangement (not a modal — the user can still work):
- Height: 40px
- Background: amber tint (same as non-critical error style)
- Content: "N audio files missing. [Locate Files]"
- "Locate Files" opens the resolution dialog

**Resolution dialog:**
- Width: 600px, max-height: 80vh, scrollable
- A list of missing files, each with:
  - Filename (12px Inter Medium)
  - Last known path (10px Geist Mono, opacity 0.45, truncated)
  - "[Browse…]" button (small, secondary)
  - "[Search folder…]" button (small, secondary)
  - Status: "[Found]" in green or "[Missing]" in amber
- Primary button: "Apply and Close"
- Secondary button: "Skip All (play silence)"

## 37.2 Version Incompatibility

If a project file was created in a newer version of AUDIAW than currently installed:

**Version warning dialog:**
- Width: 440px
- Content: "[Warning icon] This project was created in AUDIAW [newer version]. Some features may not be available. [Continue] [Cancel]"
- Continue proceeds with partial compatibility (features from the newer version are silently omitted)

---

# 38. TIMELINE UX

## 38.1 Ruler Design

The timeline ruler sits at the top of the arrangement canvas, 28px tall:

**Ruler background:** Level 2 surface, `#1A1A21`  
**Ruler bottom border:** 1px structural border  
**Ruler text:** Geist Mono, 10px, `rgba(255,255,255,0.45)`, letter-spacing 0.04em

**Ruler grid levels (zoom-dependent):**

At all zoom levels, the ruler shows:
- **Primary markers:** Every 1 bar. Line height: 12px (from ruler bottom). Label: bar number.
- **Secondary markers:** Every beat within a bar. Line height: 8px. Label: none.
- **Tertiary markers:** Every sub-beat (1/8th or 1/16th depending on zoom). Line height: 4px. No label.

At high zoom (> 800% / 1 pixel = 1 sample range):
- Shows individual samples
- Ruler switches to show time in milliseconds (Geist Mono, 9px)

**Ruler label visibility rules:**
- Labels only appear if they have at least 40px of horizontal space (prevents label overlap)
- If bar labels would crowd, every Nth bar is labeled (N = 2, 4, 8 depending on space available)

## 38.2 Grid Line Design

The timeline grid lines extend vertically through all track lanes:

```
Bar lines (beat 1 of each bar):
  color: rgba(255, 255, 255, 0.10)
  width: 1px

Beat lines (beats 2, 3, 4 of each bar):
  color: rgba(255, 255, 255, 0.05)
  width: 1px

Sub-beat lines (1/8th notes):
  color: rgba(255, 255, 255, 0.03)
  width: 1px
  Visible only when horizontal zoom is sufficient (≥ 24px per beat)

16th note lines:
  color: rgba(255, 255, 255, 0.02)
  width: 1px
  Visible only when horizontal zoom is sufficient (≥ 48px per beat)
```

**Grid line performance:** Grid lines are rendered on the GPU canvas layer, not in the DOM. They are computed once per zoom level and cached. Scrolling is achieved by shifting the GPU canvas position, not re-rendering the lines.

## 38.3 Playhead Design

The playhead is a vertical indicator showing the current transport position:

```
Playhead line:
  width: 1px
  color: rgba(255, 255, 255, 0.70)
  extends full height of arrangement canvas

Playhead head (triangle above ruler):
  shape: downward-pointing triangle
  size: 10px wide, 8px tall
  fill: accent color (default: #3B8BF5)
  positioned: top of ruler, centered on playhead line

Playhead line rendering:
  GPU-rendered, not DOM
  Position updates at 60fps during playback
  No transition (instant position = exact playback position)
```

**Playhead during recording:**
```
Playhead line: color: rgba(239, 68, 68, 0.70)  /* Red */
Playhead head fill: #EF4444                      /* Red */
```

## 38.4 Loop Region

The loop region is a semi-transparent overlay on the timeline:

```
Loop region fill:
  color: accent color at 10% opacity: rgba(59, 139, 245, 0.10)
  extends full height of arrangement canvas

Loop region borders (left and right):
  color: accent color at 50% opacity
  width: 1px

Loop region start/end handles:
  Visible on hover of the ruler
  size: 6px wide, 20px tall (in ruler area)
  fill: accent color
  Draggable: left handle sets loop start, right handle sets loop end
  Cursor: col-resize
```

## 38.5 Track Lane Design

Each track lane is a horizontal strip corresponding to a track:

**Track lane structure:**
```
Track header (left, fixed width 216px):
  Background: Level 2 surface
  Right border: 1px structural border

Track content area (right, flexible width):
  Background: alternating between two values:
    Odd tracks:  #111115 (Level 1)
    Even tracks: rgba(255,255,255,0.012) above Level 1
  
  The alternation is subtle — just enough to separate adjacent tracks visually.
  
  Bottom border (between tracks): 1px at rgba(255,255,255,0.05)
```

**Track lane hover state:**
When the cursor is over a track lane (not a clip):
- The cursor changes to `crosshair` (indicating: click here to draw a new clip)
- No visual change to the lane background (too noisy for a view that users hover over constantly)

**Empty lane click:**
- Click in empty track lane: places the playhead at the clicked position
- Alt+click in empty track lane: creates a new clip starting at the clicked position (in the current tool mode)

## 38.6 Clip Design — Complete Specification

**Audio Clip:**

```
Container:
  background: track_color at 14% opacity
  border: 1px solid track_color at 35% opacity
  border-radius: 3px (top corners only, bottom corners 0px)
  min-width: 4px (even very short clips are visible)

Header bar:
  height: 16px
  background: track_color at 28% opacity
  border-bottom: 1px solid track_color at 20% opacity
  border-radius: 3px 3px 0 0 (matching top of container)

Clip name (in header bar):
  font: 11px Inter Medium
  color: rgba(255,255,255,0.80)
  position: left edge + 6px padding
  max-width: clip width - 12px
  overflow: hidden, ellipsis
  line-height: 16px (vertically centered in header)

Waveform area:
  position: below header bar
  fills remaining clip height
  rendered via WGPU (GPU canvas, not DOM)
  waveform fill: track_color at 40% opacity
  waveform outline (peak): track_color at 70% opacity
  waveform background: transparent

Loop indicator (when loop is enabled):
  A circular arrow icon (10px) at top-right of header bar
  color: rgba(255,255,255,0.50)
  right-padding: 6px

Fade-in indicator (when fade-in > 0):
  A triangular shaded region at the left of the waveform area
  fill: Level 1 surface color, fading from 100% at left to 0% at fade end

Fade-out indicator (when fade-out > 0):
  A triangular shaded region at the right of the waveform area
  fill: Level 1 surface color, fading from 0% at fade start to 100% at right
```

**Selected audio clip (additional styles applied):**
```
border: 1.5px solid accent_color at 80% opacity
header bar: track_color at 40% opacity (slightly brighter)
```

**MIDI Clip:**
```
Container: same as audio clip
Header bar: same as audio clip

MIDI note preview (in body):
  Each MIDI note is a horizontal bar
  Height: proportional to full pitch range in the clip
  color: track_color at 70% opacity
  min-height: 2px (very short notes still visible)
  no border on individual notes (too small)
  rendered via WGPU
```

## 38.7 Zoom System

**Horizontal zoom:**
- Range: 1px = 4 bars (minimum zoom, full overview) → 1px = 1 sample (maximum zoom)
- Control: Ctrl + Mouse Wheel (centered on cursor position)
- Keyboard: Ctrl+] to zoom in, Ctrl+[ to zoom out, both centered on playhead
- Ctrl+0: fit project to window (show full project length)
- Ctrl+1: zoom to current selection

**Zoom animation:** No animation. Waveforms and content update at the next GPU frame. The goal is 0-perceived-latency zoom response.

**Zoom indicator:** In the status bar: current zoom level expressed as "1 bar = Xpx" or "Xbars visible". 10px Geist Mono, opacity 0.45.

## 38.8 Mini Timeline (Overview Bar)

A compact overview of the full project at the bottom of the arrangement canvas, above the status bar (or at the bottom of the arrangement zone):

- Height: 32px
- Full width of canvas zone
- Shows: all tracks compressed to colored strips, the current viewport indicator, the playhead position
- Background: Level 2 surface
- Top border: 1px structural border

**Viewport indicator:**
- A translucent filled rectangle showing the currently visible portion
- fill: `rgba(255,255,255,0.06)`
- Border: 1px at `rgba(255,255,255,0.20)`
- Draggable: click and drag to scroll the viewport

**Track strip (per track):**
- Height: 4px, stacked vertically (8 tracks = 32px total, limited to mini timeline height)
- Color: track color at 60% opacity
- No waveform detail at this zoom level

**Clicking on mini timeline (outside viewport indicator):**
- Moves viewport to center on clicked position (instant, no animation)

---

# 39. MIXER UX

## 39.1 Mixer View Layout

The mixer is a horizontal scrolling channel strip view. Its layout:

```
[Master Channel — always leftmost after Groups]
[Group Channels — sorted by creation order]
[Track Channels — sorted by arrangement order]
[Return Channels — always rightmost]
```

The channel strip order cannot be rearranged by the user (it follows the track order from the arrangement). Users navigate it by scrolling horizontally or by using the filter controls at the top.

**Mixer header bar (above channel strips):**
- Height: 36px
- Background: Level 2 surface
- Bottom border: 1px structural border
- Content: [Filter: All / Tracks / Groups / Returns] [Search tracks: input field] [Channel width selector: Compact / Standard / Wide]

## 39.2 Mixer Scroll Behavior

**Horizontal scroll:** Mouse wheel (no modifier) scrolls the mixer channel strip list horizontally when the mixer has focus.  
**Horizontal scroll speed:** 1 scroll unit = 1 channel strip width  
**Track search:** When a search term is entered in the mixer header search field, channels not matching are dimmed to 20% opacity but remain in position (they are not removed). This preserves spatial memory while communicating the filter.

## 39.3 Master Channel Design

The master channel is always the leftmost visible channel (before groups). It is distinguished by:
- Slightly wider: 88px (vs standard 72px)
- Header label: "MASTER" in 9px Inter Medium, uppercase, letter-spacing 0.10em, opacity 0.50
- A gold/amber accent strip: 2px left border in `rgba(245, 158, 11, 0.40)` (subtle, not prominent)
- Limiter slot: at the very top of the insert chain area, labeled "LIMIT" — the master limiter is always present and cannot be removed

---

# 40. CHANNEL STRIP UX

## 40.1 Channel Strip — Complete Specification

**Standard channel strip width:** 72px  
**Channel strip height:** fills the mixer view height minus the header bar  
**Channel strip background:** Level 2 surface (`#1A1A21`)  
**Channel strip right border:** 1px structural border  

**Internal layout (top to bottom):**

```
[Plugin Insert Slots Area — variable height, min 0 (no plugins), max 6 slots]
  Each slot: 72px wide, 22px tall
  Empty slot: dashed border, + icon, label "ADD"
  Loaded slot: plugin name (10px Geist Mono, truncated), power button, remove button

[Send Slots Area — variable height, min 0, shows if sends exist]
  Each slot: 72px wide, 20px tall
  Content: send destination label (left) + amount knob (right, 16px diameter)

[Pan Control — 28px height area]
  Knob: 20px diameter, centered horizontally
  Center detent line: visible as 1px white line at top of knob at 50% opacity
  Label: none (position communicates function)

[Fader Area — remaining height, minimum 100px]
  Fader track: 4px wide, full height of fader area, centered horizontally
  Fader track color: rgba(255,255,255,0.12)
  Fader cap: 32px wide, 14px tall, rounded rect (4px radius)
  Fader cap color: rgba(255,255,255,0.25) at rest, rgba(255,255,255,0.40) on hover
  Unity mark: horizontal 20px line across fader track at 0dB position, rgba(255,255,255,0.25)

[Level Meter Area — 12px wide, sits to the right of the fader, same height]
  Two 4px wide bars (L and R), 2px gap between them, 2px right margin
  Meter background: #131318
  Meter fill: gradient (green → amber → red per spec in section 16.1)
  Peak hold: a 1px white line at the peak position, decays after 2 seconds

[Fader Value — 14px height area]
  Value: 11px Geist Mono, centered, opacity 0.70
  Format: "+0.0 dB" for 0dB, "-12.0 dB" for -12dB, "-∞" for -infinity

[MuteButton SoloButton ArmButton — 22px height row]
  Three buttons, each 24×22px, centered in their third of the 72px width
  M button: "M" label, 10px Inter Medium, letter-spacing 0.06em
  S button: "S" label
  R button: "R" label

[Track Name — 20px height area]
  Track name: 10px Inter Medium, centered, opacity 0.70, truncated with ellipsis
  Background: the track color at 20% opacity (the only color in the strip)
```

## 40.2 Channel Strip Hover Behavior

On hover (cursor enters the channel strip):
- Background lightens: Level 2 → Level 3 surface (60ms ease-out)
- The plugin insert + slot becomes more prominent: dashed border brightens
- A grab cursor appears at the top 8px area (for reordering — future feature)

---

# 41. PIANO ROLL UX

## 41.1 Piano Roll Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  TOOLBAR (28px)                                                      │
├───────────┬─────────────────────────────────────────────────────────┤
│ PIANO KEY │           NOTE GRID                                      │
│ AREA      │                                                          │
│ 80px wide │     (WGPU-rendered, GPU canvas)                          │
│           │                                                          │
│           │                                                          │
├───────────┴─────────────────────────────────────────────────────────┤
│  VELOCITY EDITOR (80px height)                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## 41.2 Piano Key Area Design

**Width:** 80px (fixed)  
**Background:** Level 2 surface  
**Right border:** 1px structural border

**White keys:**
- Background: `rgba(255,255,255,0.10)`
- Height: calculated from view height / number of visible octaves / 7 (white keys per octave)
- Bottom border: 1px at `rgba(255,255,255,0.06)`
- Label: note name on C notes only (e.g., "C3"), 9px Geist Mono, opacity 0.40, right-aligned, 4px right padding
- Hover: `rgba(255,255,255,0.18)`
- Active (MIDI input playing): `rgba(255,255,255,0.30)`, transitions with 40ms ease-out

**Black keys:**
- Background: Level 1 surface (`#111115`)
- Width: 52px (65% of white key width)
- Border: 1px at `rgba(255,255,255,0.12)`
- Hover: `rgba(255,255,255,0.08)`
- Active: `rgba(255,255,255,0.20)`

**Scale highlighting:**
When a scale is active, non-scale notes (both black and white keys) are slightly dimmed:
- Non-scale white keys: background `rgba(255,255,255,0.06)` (dimmer)
- Non-scale black keys: same as standard (they're already dark)
- Scale highlight indicator: a thin 2px left border on all scale white keys in the accent color at 50% opacity

## 41.3 Note Grid Design

The note grid is GPU-rendered (WGPU canvas, covers the note content area):

**Background:** Level 1 surface  
**Horizontal grid (pitch rows):**
- White note rows: no background modification
- Black note rows: `rgba(0,0,0,0.25)` overlay (darker stripe to distinguish black note lanes)

**Vertical grid (time):**
- Same grid structure as the arrangement timeline (bar, beat, sub-beat lines)
- Same opacity values as the arrangement grid

**MIDI Note Design:**
```
Fill: track color at 70% opacity
Border: track color at full opacity, 1px
Border-radius: 2px
Min-width: 4px (16px if note is selected — selection increases min-width)
Height: proportional to note occupying its pitch row, with 1px margin top and bottom

Selected note:
  Fill: track color at 90% opacity
  Border: accent color, 1.5px
  A small drag handle appears at the right edge (4px wide)
```

## 41.4 Velocity Editor Design

**Height:** 80px  
**Background:** Level 2 surface  
**Top border:** 1px structural border

**Velocity bars:**
- One bar per note, aligned with the note's horizontal position
- Width: matches note width (minimum 2px)
- Height: proportional to velocity (127 = full height, 0 = no height)
- Fill: track color gradient (bottom = track color at 40%, top = track color at 90%)
- Selected bar (corresponding note is selected): fill shifts to accent color gradient

**Velocity editing:**
- Click and drag on a bar: changes velocity (drag up = increase, down = decrease)
- Drag across multiple bars: applies the drag direction proportionally to all dragged bars
- Right-click bar: shows mini-menu with velocity presets (32 / 64 / 96 / 127 / Custom)

---

# 42. AUTOMATION UX

## 42.1 Automation Lane Design

Automation lanes are revealed below each track in the arrangement view. Each lane shows one automated parameter:

**Lane reveal trigger:** Click the triangle/arrow expand control in the track header, or press `A` when a track is selected.

**Lane layout:**
```
Lane header (left, same width as track header 216px):
  Height: same as track height setting (min 32px for automation lanes)
  Background: Level 2 surface, with a 2px left border in the automation lane color
  Content: [Parameter name — 11px Inter Medium] [Value indicator — current value, 10px Geist Mono]
  Right-click on lane header: shows parameter selection menu

Lane content (right, full canvas width):
  Background: slightly transparent overlay on the track lane beneath: rgba(0,0,0,0.15)
  The automation curve is drawn in the lane content area
```

## 42.2 Automation Curve Design

```
Automation curve line:
  color: automation lane color (each parameter gets a distinct color from the track palette)
  weight: 1.5px
  no anti-aliasing artifacts (GPU rendered)

Automation breakpoints (control points):
  Shape: circle, 6px diameter
  Fill: automation lane color
  Border: 1px white border
  Hover: diameter increases to 8px in 60ms ease-out

Automation segments between breakpoints:
  Linear: straight line
  Smooth: cubic bezier curve with control handles visible on hover of the breakpoints
  Step: horizontal line then instant vertical jump at next point

Value fill (below the curve, above zero):
  automation lane color at 12% opacity
  helps visually communicate the shape of the automation
```

## 42.3 Automation Editing Interactions

**Pencil tool in automation lane:**
- Click: creates a new breakpoint at the click position
- Click and drag: draws a series of breakpoints (continuous curve drawing)
- Drag an existing breakpoint: moves it
- Alt+drag a segment: adjusts the curve shape (tension) for smooth segments

**Select tool in automation lane:**
- Click breakpoint: selects it (highlighted in accent color)
- Rubber-band drag: selects multiple breakpoints
- Delete: deletes selected breakpoints
- Arrow keys: nudge selected breakpoints by the current time grid unit (horizontal) or 1% of parameter range (vertical)

**Right-click on automation segment:**
- Context menu: "Linear", "Smooth", "Step" — changes interpolation for that segment

---

# 43. AUDIO ROUTING UX

## 43.1 Routing Visualization

The routing view is accessible from the right panel (Device View) when viewing send/return routing. It shows:

**Send slot (in channel strip or device view):**
- Each send is a row: [destination track name, truncated] [level knob, 20px] [pre/post fader toggle]
- Level knob shows the send amount (0 = silent, 100% = unity)
- The destination track name uses the destination track's color as a 2px left border

**Visual routing indicator:**
- When hovering a send slot, a dashed line appears connecting the channel strip (in the mixer view) to the return channel. This connection indicator:
  - Width: 1px dashed, dash: 4px on, 4px off
  - Color: accent color at 50% opacity
  - Animates: the dash pattern scrolls at 2px/second in the direction of signal flow

---

# 44. PLUGIN BROWSER UX

## 44.1 Plugin Browser Layout

Within the Browser panel (left zone), the Plugins tab:

```
[Search field — full width minus padding]
8px gap
[Filter row: All | Instruments | Effects | MIDI | Format: All | VST3 | CLAP | AU | LV2]
8px gap
[Plugin list — full remaining height, scrollable]
```

## 44.2 Plugin List Item Design

Each plugin in the list:
- Height: 40px
- Padding: 0 12px
- Content (left to right):
  - Format badge: 24×16px, 3px border-radius, background at 15% opacity of status color, label: "VST3" / "CLAP" / "AU" / "LV2" in 8px uppercase, letter-spacing 0.08em
  - 8px gap
  - Plugin name: 12px Inter Medium, opacity 0.85
  - Category (right-aligned): 10px Inter Regular, opacity 0.40 (e.g., "Synth", "Reverb", "EQ")
- Hover: background Level 3 surface, 60ms ease-out
- Double-click: loads plugin onto the selected track (or last focused track)
- Drag: drag the plugin from the browser to a track or device chain slot

**Crashed/invalid plugins:**
- A warning icon (12px, amber) appears after the plugin name
- Tooltip on hover: "This plugin failed validation. [View details]"
- These plugins are still shown (users may want to troubleshoot) but visually de-emphasized: name opacity 0.45

## 44.3 Plugin Preview

When a plugin is selected in the browser (single click), the right panel (if open and on "Device View") shows:
- Plugin name: 14px Inter Semibold
- Vendor: 11px, opacity 0.45
- Format + version
- Category
- Number of presets (if known from scan)
- A "Load on track" button (full width, primary)
- A list of factory presets (if available from scan metadata)

---

# 45. PLUGIN HOSTING UX

## 45.1 Device Card Design (in Device Chain / Right Panel)

Each loaded plugin appears as a "Device Card" in the device chain view:

```
Device card:
  Width: full panel width minus 32px (16px padding each side)
  Height: 48px (collapsed), expanded height variable (based on controls)
  Background: Level 3 surface
  Border: 1px interactive border
  Border-radius: 6px
  Margin-bottom: 4px

Device card header (always visible, 48px):
  Left 8px: collapse/expand triangle (8px, opacity 0.45)
  Left 24px: device type icon (14px)
  Left 44px: device name (12px Inter Medium, opacity 0.85)
  Right edge (from right): bypass toggle (16×16px power icon), drag handle (vertical dots, 16×12px)
  All controls: 8px right margin
```

**Collapsed state:** Only the header is visible (48px)  
**Expanded state:** The header plus a compact parameter grid appears below

**Bypass state:**
- Bypass toggle (power icon): when bypassed, icon is `rgba(255,255,255,0.25)`, header background dims to Level 2 surface
- The device name shows: `rgba(255,255,255,0.35)` opacity (clearly inactive)
- A "BYPASS" label appears in 9px uppercase at the right of the device name

## 45.2 Device Reordering

Devices in the chain are reorderable by dragging:
- Drag handle: vertical 3-dot grip (⋮⋮) at right edge of device card
- Drag activates: card lifts with a shadow (`0 8px 24px rgba(0,0,0,0.5)`) and scale `1.02`
- Drop target: a 2px accent line appears between cards where the dragged card will land
- Drop animation: card settles into new position with 150ms ease-spring (≤8% overshoot)

---

# 46. PLUGIN SANDBOX UX

## 46.1 Plugin Process Status Indicator

When a plugin runs in a sandboxed separate process, a subtle status indicator appears in the device card:

**Active (running normally):**
- A 4px green dot at the top-right corner of the device card
- Color: `#22C55E`, no animation

**Loading (plugin process starting):**
- A 4px amber dot, slowly pulsing (1s on/off cycle, opacity 0.3 → 1.0)

**Crashed:**
- A 4px red dot
- The device card's border changes to `rgba(239,68,68,0.40)`
- The device name shows a warning prefix: "⚠ [Plugin Name]"
- A "Relaunch" button appears below the device name in the card header

## 46.2 Plugin Crash UX

When a plugin crashes during an active session:

**Step 1 (immediate, within 1 audio callback):** Audio continues — silence replaces the plugin output. The user hears a sudden silence on that channel.

**Step 2 (< 500ms later):** An error banner appears at the top of the canvas zone:
```
[Red left border, 2px]
[Alert icon, 14px, red]
"[Plugin Name] crashed on [Track Name]. Audio silenced."
[Relaunch] button — small, right-aligned
[✕] dismiss button — right edge
```

**Step 3 (user action — Relaunch):**
- The plugin process restarts in the background
- The device card shows loading state (amber pulsing dot)
- When restarted, audio resumes from the last known plugin state
- The banner updates: "[Plugin Name] relaunched." — then auto-dismisses after 3 seconds

---

# 47. COMMAND PALETTE UX

## 47.1 Command Palette Design

The command palette overlays the center of the screen:

**Trigger:** `Ctrl+Shift+P` (Windows/Linux) / `Cmd+Shift+P` (macOS)

**Layout:**
- Width: 560px
- Max-height: 480px (scrollable if more results)
- Position: centered horizontally, positioned at 20% from top of window
- Background: Level 4 surface (`#2C2C39`)
- Border: 1px at `rgba(255,255,255,0.15)`
- Border-radius: 8px
- Shadow: `0 24px 80px rgba(0,0,0,0.80), 0 4px 16px rgba(0,0,0,0.50)`
- Backdrop: `rgba(0,0,0,0.40)` overlay on the rest of the UI (not blur — performance)

**Search input:**
- Height: 52px (larger than standard — this is the primary interaction point)
- Background: transparent (within the Level 4 surface)
- Border-bottom: 1px structural border
- Font: 15px Inter Regular, opacity 0.90
- Placeholder: "Search commands, settings, tracks…" — opacity 0.35
- Left padding: 16px
- Left icon: magnifying glass, 16px, opacity 0.35
- No border-radius (the palette surface provides the containing shape)
- Cursor: blinking text cursor at accent color, 2px wide

**Results list:**
- Each result: 40px height
- Left padding: 16px
- Content: [icon 14px] [8px gap] [command name 12px Inter Regular] [right-aligned: keyboard shortcut in 10px Geist Mono, opacity 0.35]
- Active/highlighted result: background `rgba(255,255,255,0.08)`, left border 2px accent color
- Result grouping: categories separated by a 1px structural border + category label (10px, uppercase, letter-spacing 0.10em, opacity 0.35, 4px padding)

**Empty results:**
- "No results" centered in the results area: 12px, opacity 0.35

**Keyboard navigation in palette:**
- Type to search (real-time filtering)
- Arrow Up/Down: navigate results
- Enter: execute highlighted command
- Escape: dismiss palette, return focus to previous element

---

# 48. SEARCH UX

## 48.1 Universal Search Behavior

All search inputs in AUDIAW share these behavioral rules:

**Debounce:** Search executes 150ms after the last keypress. No search on every character.

**Minimum query length:** Search executes at 1 character for the browser (filenames). 2 characters for the command palette.

**Highlight:** Matched characters in results are highlighted:
- Background behind matched characters: `rgba(59, 139, 245, 0.20)` (accent at 20%)
- No bold or other treatment — only the background highlight

**Clear button:** Appears inside the search input at the right edge when input has content. Width: 20px, icon: × at 12px, opacity 0.45, opacity 0.80 on hover. Clicking clears the input and results.

**Loading during search:** For searches that query the database (browser search), the clear button becomes a 12px spinner while results are loading.

---

# 49. FILE BROWSER UX

## 49.1 Browser Panel Structure

The file browser occupies the Left Panel Zone and has four tabs:

| Tab | Icon | Content |
|---|---|---|
| Samples | Waveform icon | Audio files |
| Plugins | Puzzle piece | VST3/CLAP/AU/LV2 |
| Presets | Sliders icon | Plugin/instrument presets |
| Projects | Folder icon | Recent and located projects |

## 49.2 Sample Browser Design

**Location tree (top section, ~30% of panel height):**
- A collapsible tree of sample locations
- Each location: folder icon + location name + (item count in dim text)
- Arrow to expand/collapse sub-folders
- "AUDIAW Library" and "User Library" are always present at the top, separated from user-added locations by a 1px separator
- Folder hover: background Level 3 surface
- Active (selected) folder: background Level 3 surface + 2px left accent border

**Sample list (bottom section, remaining height):**
- Sorted by: filename, date added, duration, BPM (user-selectable)
- Each item: 28px height
  - Left: play/pause button (14px triangle) — appears on hover
  - Left+: waveform mini-thumbnail (32px wide, full item height, rendered as tiny GPU waveform)
  - Middle: filename (11px Inter Regular, truncated with ellipsis)
  - Right: duration (9px Geist Mono, opacity 0.40)
  - Far right: favorite star (12px, visible on hover or when favorited)

**Preview player (bottom of browser panel, 40px):**
- Compact player for the currently previewing sample
- [◀◀] [▶/▌▌] [■] progress-bar ──●── time-display [🔁]
- Height: 40px, background Level 3 surface, top border structural border

---

# 50. TRANSPORT CONTROLS

## 50.1 Transport Bar Layout

The transport bar (52px height) is the always-visible top zone. Its internal layout:

```
LEFT SECTION (left 33% of bar):
  [Rewind] [Play/Pause] [Stop] [Record]
  All buttons spaced 4px apart, left margin 16px

CENTER SECTION (center 34% of bar, centered):
  [Time Display] [BPM] [Time Signature] [Loop Toggle] [Metronome Toggle]
  These are the primary orientation controls

RIGHT SECTION (right 33% of bar):
  [Project Name (text)] [CPU meter] [Memory meter] [Workspace selector]
  Right margin 16px
```

## 50.2 Transport Button Specifications

**Play/Pause button (primary transport action):**
- Size: 36×36px
- Shape: circular (border-radius: 50%)
- Background at rest: `rgba(255,255,255,0.08)`
- Background on hover: `rgba(255,255,255,0.14)`
- Background when playing: accent color at full opacity (`#3B8BF5`)
- Icon: play triangle (14px) or pause bars (14px), white
- Border: 1px interactive border at rest, none when playing (the fill communicates the border)

**Stop button:**
- Size: 28×28px
- Shape: circular
- Background at rest: transparent
- Icon: stop square (10px, rounded 2px corners), white at 0.60 opacity
- Hover: background `rgba(255,255,255,0.08)`, icon opacity 0.80

**Record button:**
- Size: 28×28px
- Shape: circular
- Background at rest: transparent
- Icon: record circle (filled, 12px diameter), `#8B2020` (dim red, indicates armed state)
- When armed (not recording): background `rgba(139,32,32,0.15)`, icon red `#8B2020`
- When recording: background `#EF4444`, icon white, button pulses: opacity 0.9 → 1.0 → 0.9, 1s cycle

**Rewind button:**
- Size: 24×28px
- Shape: rounded rect (4px radius)
- Icon: rewind double-chevron (14px), opacity 0.60 at rest
- Hover: opacity 0.90

**Loop toggle:**
- Size: 28×28px
- Shape: rounded rect (4px radius)
- Icon: loop circular arrow (14px)
- Active: icon becomes accent color, background `rgba(59,139,245,0.15)`
- Inactive: icon `rgba(255,255,255,0.40)`

**Metronome toggle:**
- Size: 28×28px
- Same active/inactive style as loop toggle
- Icon: metronome shape (14px)

## 50.3 Time Display (Dot-Matrix)

Position: center of transport bar, centered between BPM and the play buttons.

Display format: `001 . 01 . 001` (Bar . Beat . Tick)

```
Primary time display:
  Font: 22px Geist Mono
  Spacing: 0.12em
  Color: rgba(255,255,255,0.90) when playing, 0.40 when stopped
  Dot separators: 4px smaller, opacity 0.30
  
Width: fixed at 220px regardless of content (prevents layout shift as numbers change)
Background: Level 1 surface (#111115)
Border: 1px structural border
Padding: 8px 12px
Border-radius: 4px
```

**Click on time display:** Opens an inline edit field (same visual treatment, Geist Mono) where the user can type a bar/beat to jump to. Enter confirms, Escape cancels.

## 50.4 BPM Display

```
BPM display:
  Font: 18px Geist Mono
  Color: rgba(255,255,255,0.80)
  Width: 80px fixed
  Format: "140.00" (two decimal places for precision, even if it's a whole number)
  
  [↑] / [↓] nudge buttons: 14px tall each, appear on hover
  Click and drag vertically: changes BPM (drag up = faster, drag down = slower)
  Double-click: opens inline edit
  Shift+drag: 10× slower adjustment (for 0.01 BPM precision)
```

## 50.5 Time Signature Display

Adjacent to BPM:
```
Format: "4/4" — two numbers separated by a slash
Numerator: 14px Geist Mono, opacity 0.80
Slash separator: opacity 0.30
Denominator: 14px Geist Mono, opacity 0.80
Width: 48px fixed
Click: opens a compact dropdown with common time signatures (4/4, 3/4, 6/8, 5/4, 7/8, Custom)
```

---

# 51. DSP VISUALIZATION

## 51.1 Spectrum Analyzer

The spectrum analyzer is a panel-based component (appears in right panel or as a floating window):

**Visual specification:**
- Background: Level 1 surface
- Frequency range: 20 Hz – 20 kHz (logarithmic scale)
- Amplitude range: -90 dBFS to 0 dBFS
- Update rate: 30 fps (not 60 — spectrum doesn't require 60fps and this saves GPU time)
- FFT size: 4096 points (displayed as ~300-point binned spectrum for readability)

**Spectrum bar color:**
- A single gradient from bottom to top: accent color at bottom → accent color brighter at top
- No multi-color (keeps the display monochrome-adjacent)
- The bars are rendered as a filled area (not individual bars) — smoother appearance

**Grid lines:**
- Vertical: at 50Hz, 100Hz, 200Hz, 500Hz, 1kHz, 2kHz, 5kHz, 10kHz, 20kHz
- Horizontal: at -12dBFS, -24dBFS, -48dBFS, -72dBFS
- All grid lines: 1px, `rgba(255,255,255,0.05)`
- Labels: 9px Geist Mono, opacity 0.30

**Peak hold line:**
- 1px line at peak position per frequency bin
- Color: `rgba(255,255,255,0.45)`
- Hold: 2 seconds, then decays at 6dB/second

## 51.2 LUFS Meter

The LUFS meter panel shows integrated, short-term, and momentary loudness:

**Layout (vertical, in right panel):**
```
[Integrated LUFS value — 20px Geist Mono, centered]
[-14.2 LUFS I]
8px
[Short-term — 14px Geist Mono]
[-12.8 LUFS S]
8px
[Momentary — 14px Geist Mono]
[-10.2 LUFS M]
8px
[True Peak — 14px Geist Mono, colored red if positive]
[-0.8 dBTP]
16px
[Target line selector: -23 / -18 / -16 / -14 / Custom]
```

**Color coding:**
- If Integrated LUFS is within 2 LUFS of target: value color = status green
- If 2–4 LUFS above target: status amber
- If > 4 LUFS above target: status red
- If below target: no special color (not a problem — can be addressed in mastering)

---

# 52. WAVEFORM RENDERING

## 52.1 GPU Rendering Architecture Impact on UX

Waveforms in AUDIAW are rendered via WGPU (not DOM/Canvas2D). This has specific UX implications:

**The waveform canvas is a separate layer** from the DOM UI. It is composited by the OS window manager. This means:
- Waveforms can update at 60fps without causing React re-renders
- Waveform data cannot overlap with DOM elements (DOM elements must never be positioned over the waveform canvas)
- The waveform canvas area has a defined z-index that DOM elements cannot exceed (except for popover layers, context menus, modals)

**Pixel-perfect clip boundaries:** Because waveforms are GPU-rendered, their edges must align exactly with the DOM-rendered clip borders. The clip border is rendered in DOM (1px), and the waveform begins exactly 1px inside the border. Any misalignment > 0.5px is a rendering bug.

## 52.2 Waveform Visual Specification

**Waveform data representation:** Peak/RMS dual-display:
- Peak data: the absolute maximum sample value within each display pixel's time range
- RMS data: the root-mean-square value within the same time range
- Peak is rendered as the outer boundary of the waveform shape
- RMS is rendered as a filled inner region (lighter, indicating average energy)

```
Waveform fill (RMS):
  Color: track color at 45% opacity
  This is the "body" of the waveform

Waveform outline (peak):
  Color: track color at 75% opacity
  1px line at the peak boundary

Selected waveform fill: track color at 65% opacity
Selected waveform outline: track color at 90% opacity

Centered axis line (zero crossing):
  Color: rgba(255,255,255,0.08)
  Width: 1px
  Horizontal, at vertical center of waveform area
```

## 52.3 Waveform Zoom Levels

| Zoom Level | Description | Rendering Source |
|---|---|---|
| Overview (< 1px per bar) | Full project overview in mini timeline | Mip level 4 (pre-computed) |
| Standard (1px = 1–16 beats) | Normal arrangement view | Mip level 2–3 |
| Detailed (1px = 1–4 beats) | Zoomed arrangement | Mip level 1–2 |
| Fine (1px = 1–8 beats) | Fine editing | Mip level 0–1 |
| Sample-level (1px < 1 beat) | Sample editing | Direct sample data |

Waveforms never visually "re-render" during zoom — the appropriate mip level is already in GPU memory. The transition between mip levels is instantaneous.

## 52.4 Missing Waveform Placeholder

While a waveform is being computed (new recording, first project load before cache is warm):
- The clip body shows a center horizontal line: 1px at `rgba(255,255,255,0.15)`, the track color at 30% opacity fills above and below this line with 6px height total
- No spinner (too noisy in the arrangement view)
- Waveform fades in over 120ms ease-out when ready

---

# 53. METERING SYSTEMS

## 53.1 Level Meter Design

Level meters appear in: channel strips (mixer), track headers (tall mode), the transport bar (master output meters), and the standalone meter panel.

**Meter specification:**

```
Meter bar width: 4px (standard), 3px (compact/narrow contexts)
Meter bar background: #131318
Meter bar height: full height of the containing area

Color gradient (applied as CSS linear-gradient, vertical):
  0% (top/0dBFS):     #FF0000 (clip — above 0dBFS: entire bar red)
  0%  to 12.5%:        #EF4444 (danger zone: 0 to -3 dBFS)
  12.5% to 37.5%:      Gradient: #EF4444 → #F59E0B (-3 to -12 dBFS)
  37.5% to 100%:       Gradient: #F59E0B → #22C55E (-12 to -∞ dBFS)

The gradient is fixed — the fill height represents the level.
Above 0dBFS (clip): the entire bar turns solid #FF0000
```

**Peak hold line:**
- 1px horizontal line at peak position
- Color: the color at that dBFS level (inherits the gradient color at that position)
- Hold duration: 2000ms from peak
- Decay: after hold, drops at 6dB/second (visual)
- Clip hold: the clip indicator stays red until the user clicks it (or a configurable period)

**Stereo meters:** Two adjacent bars (L, R), 1px gap between them. No "L/R" labels — position conveys identity. For surround channels, labels are shown below at 8px.

**Update rate:** Meters update at 60fps during playback, 0fps when stopped (static at last value, decaying naturally).

## 53.2 Master Output Meter (Transport Bar)

A compact stereo meter in the transport bar, right section:

- Two vertical bars, each 6px wide (wider than channel meters — they're more prominent)
- Height: 28px (fitting the 52px bar with 12px top/bottom margin)
- Positioned: to the left of the workspace selector
- Same color gradient as channel meters
- A "MASTER" label below in 8px, uppercase, opacity 0.30

---

# 54. GPU RENDERING CONSIDERATIONS

## 54.1 What is GPU-Rendered vs DOM-Rendered

| Element | Rendering | Reason |
|---|---|---|
| Waveforms | GPU (WGPU) | High-frequency updates, dense data |
| MIDI note grid | GPU (WGPU) | Dense data, smooth zoom |
| Spectrum analyzer | GPU (WGPU) | 30fps continuous data |
| Level meters | GPU (canvas or CSS) | 60fps continuous |
| Timeline grid lines | GPU (WGPU) | Scrolls continuously |
| Automation curves | GPU (WGPU) | Dense curve data |
| All other UI | DOM (React) | Standard UI, infrequent updates |

## 54.2 Design Constraints from GPU Rendering

**No DOM elements over WGPU canvas:** Any DOM element positioned over the WGPU canvas layer will not composite correctly on all platforms. All popovers, tooltips, context menus, and modals that appear over the canvas area use a separate full-screen overlay layer (position: fixed, z-index above the canvas).

**Canvas size = clip area:** The WGPU canvas is sized exactly to the area it needs to cover. It must not be larger (wastes GPU memory). The clip areas (track lane content area) define the WGPU canvas dimensions.

**Layer identification:** The WGPU layer has a defined stacking position. DOM layout must account for this layer explicitly. The WGPU canvas has `pointer-events: none` — all interaction on the canvas area is handled by an invisible DOM overlay above it.

---

# 55. PERFORMANCE CONSTRAINTS

## 55.1 Design Rules for Performance

These rules exist to keep the UI fast on the minimum supported hardware (integrated Intel/AMD GPU, 8GB RAM, 4-core CPU):

**Rule P1: No blur effects anywhere in the UI.**  
CSS `backdrop-filter: blur()` and `filter: blur()` are expensive on integrated GPUs. No part of AUDIAW uses blur effects. Overlays use solid or semi-transparent backgrounds, not blurred.

**Rule P2: No box-shadow on animated elements.**  
Box shadows cause re-paints. Static elements (cards, modals) may use box-shadow. Animated elements (dragged clips, dragged panels) must not have box-shadow — use a border instead.

**Rule P3: `will-change` must be used correctly.**  
Only elements that are actively animating position or transform should have `will-change: transform`. Static elements must not have `will-change`. Applying `will-change` to all elements creates GPU memory waste.

**Rule P4: Virtualized lists for all lists > 100 items.**  
The browser asset list, plugin list, and arrangement track list must use virtualized rendering (only rendering DOM nodes for items in the viewport).

**Rule P5: No CSS gradients in high-frequency update paths.**  
CSS gradients on elements that update at > 10Hz (meter bars) must be replaced with solid colors or canvas-rendered gradients.

**Rule P6: React component memoization required in track list.**  
Every track component that renders within the virtualized track list must be wrapped in `React.memo`. Callbacks passed to tracks must be `useCallback`. Values must use `useMemo`.

## 55.2 Target Frame Budget (Per Frame at 60fps = 16.7ms)

| Operation | Budget | Priority |
|---|---|---|
| DOM React updates (UI state changes) | 4ms | Must-hit |
| CSS transitions and animations | 2ms | Must-hit |
| WGPU waveform render pass | 3ms | Must-hit |
| WGPU meter render pass | 0.5ms | Must-hit |
| WGPU spectrum render pass | 0.5ms | Must-hit |
| Compositor (OS window manager) | 2ms | External |
| Buffer | 4.2ms | Safety |

If the React render budget exceeds 4ms, UI animations will drop frames. This is treated as a rendering performance bug.

---

# 56. LATENCY UX EXPECTATIONS

## 56.1 Perceptible Latency Thresholds

| Latency Range | User Perception | AUDIAW Target |
|---|---|---|
| 0–10ms | Instantaneous | All UI feedback |
| 10–50ms | Minor delay, acceptable | Parameter changes, clip snapping |
| 50–100ms | Noticeable but tolerable | Complex operations (routing changes) |
| 100–300ms | Feels slow | Must trigger loading indicator |
| > 300ms | Unacceptable for interactive controls | Never for synchronous UI response |

## 56.2 Audio Latency Visual Communication

The status bar always shows the current round-trip audio latency:
```
"6.3 ms RTL" (6.3ms round-trip latency)
```
Format: latency value in Geist Mono, 10px, opacity 0.45, followed by "ms RTL"

Color coding of the latency value:
- < 10ms: opacity 0.45 (neutral, acceptable)
- 10–20ms: amber text (`#F59E0B`) — borderline for tracking
- > 20ms: red text (`#EF4444`) — problematic for tracking

When the user hovers over the latency display, a tooltip appears:
"Buffer: [N] samples. Sample rate: [N] Hz. Backend: [ASIO/CoreAudio/JACK/etc.]"

---

# 57. SCROLL PHYSICS

## 57.1 Timeline Scrolling

**Horizontal scroll (timeline navigation):**
- Two-finger trackpad swipe or mouse wheel: scrolls horizontally
- Speed: 1:1 with input on trackpad (natural, no acceleration)
- Speed on mouse wheel: 80px per scroll unit
- Momentum: trackpad momentum is preserved (OS-native momentum scrolling)
- Mouse wheel without momentum: no additional deceleration — stops immediately on input stop

**Vertical scroll (track list navigation):**
- Mouse wheel: scrolls track list vertically when cursor is over track headers or lanes
- Speed: 1 track height per scroll unit (48px default)
- Or: 24px per scroll unit if faster-than-track-height scrolling feels wrong (test with users)
- Momentum: same as horizontal

**Scroll boundaries:**
- Horizontal: can scroll left to bar 1 (no earlier). Can scroll right up to 10% past the last clip.
- Vertical: can scroll up to track 1 (no earlier). Can scroll down to 5 track heights past the last track.

**Scroll snapping:** No scroll snap. Scrolling is free (not snap-to-track).

## 57.2 Piano Roll Scrolling

Both horizontal (time) and vertical (pitch) scroll:
- Same rules as timeline for horizontal
- Vertical: scrolls by pitch. 1 scroll unit = one note height (12px at standard zoom). No snap.

## 57.3 Scroll Bars

Scroll bars in AUDIAW:

- Thin: 6px width (vertical), 6px height (horizontal)
- Visible only when scrolling or when hovering over the scroll area
- Fade in over 100ms when scrolling starts
- Fade out over 600ms after scrolling stops
- Color: `rgba(255,255,255,0.25)` track, `rgba(255,255,255,0.45)` thumb
- No arrows on scroll bars (space is too tight)
- Hover on thumb: thumb brightens to `rgba(255,255,255,0.65)`
- Border-radius: 3px (rounded ends)

---

# 58. DRAG & DROP SYSTEMS

## 58.1 Clip Drag (Within Timeline)

**Drag initiation:**
- Threshold: 4px of cursor movement after mousedown before drag begins (prevents accidental drags on click)
- On drag start: the clip visual lifts — box shadow appears (`0 4px 20px rgba(0,0,0,0.6)`) and scale becomes `1.01`
- The clip remains in its original position as a ghost (30% opacity) showing where it will return if dropped outside a valid zone

**During drag:**
- The clip follows the cursor at 1:1 (no lag)
- Snapping occurs to the current grid setting (see Section 59)
- A position tooltip appears: "Bar 3, Beat 2" or "3.2.0" in Geist Mono
- Adjacent clips light up their edges when the dragged clip is within 16px of them (potential adjacency indicator)

**Drag to new track:**
- The dragged clip shows a track insertion indicator: a 2px horizontal accent line between tracks where the clip will land
- If dragging to a track of incompatible type (audio clip to MIDI track): the indicator becomes red and a "No" cursor appears

**Drop:**
- Release: clip snaps to target position, scale returns to 1.0 in 80ms ease-out, box-shadow removes in 80ms
- Original ghost fades out: 120ms ease-in

## 58.2 Multi-Clip Drag

Selecting multiple clips and dragging moves all selected clips simultaneously:
- All clips maintain their relative positions to each other
- The primary clip (the one clicked to initiate drag) anchors to the cursor
- All other clips move in lockstep
- The snap position is computed based on the primary clip's position

## 58.3 Sample Drag From Browser

**Drag start (from browser list item):**
- The list item lifts visually: background Level 5 surface, scale `1.02`
- A drag ghost appears: a compact version of the clip that would be created (shows filename, waveform thumbnail if available, estimated duration)
- Ghost size: 120px wide, 32px tall, same visual as a real clip at compact height
- Ghost follows cursor at 1:1

**Valid drop zones:**
- Empty track lane: highlighted with a 1px accent dashed border around the drop zone
- Existing track lane: accent dashed outline around the track lane
- Empty space below all tracks: shows a new track preview (2px accent line with label "New Track")

**Invalid drop zones:**
- Anywhere outside the arrangement canvas
- A MIDI track lane (for an audio sample)
- The transport bar, status bar, or any panel header

**Drop:**
- Audio file on track lane: creates audio clip at the drop position
- Audio file on empty space below tracks: creates a new audio track and places the clip
- On drop: the ghost disappears (120ms opacity fade), the real clip appears in the timeline (120ms fade in)

---

# 59. SNAPPING SYSTEMS

## 59.1 Snap Grid Settings

The current snap setting is shown in the transport bar area (or a dedicated snap control):

**Snap control design:**
```
[Snap toggle: small grid icon, 16px]
[Snap size dropdown: "1/16" with chevron]
```

Available snap values:
- Off (no snap)
- 1 bar
- 1/2 bar
- 1/4 bar
- 1 beat (1/4 note)
- 1/8 note
- 1/16 note
- 1/32 note
- 1/64 note
- Triplet variants: 1/8T, 1/16T
- Dotted variants: 1/8., 1/16.

## 59.2 Snap Visual Feedback

**During drag:** The drag ghost snaps to the grid. The snap is instant — no animation between snap positions. The snapping feels like physical detents on a hardware knob.

**Snap indicator:** When a clip is being dragged and snaps to a position, a subtle 1px vertical accent line flashes at the snap position in the timeline for 100ms (appears at snap, fades in 100ms). This confirms the snap visually.

**Override snap:** Holding `Alt` during drag disables snapping temporarily. A label "SNAP OFF" appears in 10px near the drag ghost while Alt is held.

## 59.3 Magnetic Clip Edges

Independent of the grid snap, clips also snap to the edges of other clips:

- If the dragged clip's start edge comes within 8 screen pixels of another clip's end edge, the clips "magnetize" together
- A yellow 1px line appears at the snap point (distinguished from the accent blue grid snap)
- The magnetic snap takes priority over the grid snap at distances < 8px

---

# 60. RESIZING SYSTEMS

## 60.1 Clip Resize (Start/End Trim)

**Hover detection:** A 6px zone at each clip edge activates the resize cursor (`ew-resize`)

**During resize:**
- The clip edge moves with the cursor
- The opposite edge is fixed
- The resize snaps to the current grid setting
- A duration tooltip appears: "2 bars, 3 beats" or "2.3.0"
- If the clip is trimmed past its audio content start/end: the trim handle turns amber (indicating: content limit reached, resizing further will add silence/repeat loops)

**Minimum clip size:** 4px (one snap unit minimum). A clip cannot be resized to 0 width.

## 60.2 Panel Resize

Panel boundaries (between left panel and canvas, between canvas and right panel, between canvas and bottom panel):

**Resize hot zone:** 4px centered on the border  
**Resize cursor:** `col-resize` for vertical borders, `row-resize` for horizontal  
**During resize:** The border follows the cursor. Content in each panel reflows at the new size. No "ghost" — the resize is live.

**Snap-to-size:** Panels snap to specific widths:
- The snap positions are: any multiple of 40px within the allowed range
- Additionally, panels snap to their "standard" sizes (e.g., 260px for browser, 320px for device view)
- Snap is magnetic: within 12px of a snap position, the panel snaps
- Override: hold `Alt` during resize to disable snapping

**Minimum size enforcement:** When a panel is resized below its minimum width:
- The resize is prevented (the panel clamps at the minimum)
- The cursor remains as the resize cursor (so the user understands the boundary)
- No feedback beyond the clamp — the visual stop is self-explanatory

---

# 61. PANEL BEHAVIOR

## 61.1 Panel Open/Close Animation

**Left panel open:** width transitions from 0 to target width in 150ms ease-out. The canvas zone simultaneously expands its left edge by the same amount.

**Left panel close:** width transitions from current to 0 in 120ms ease-in.

**The canvas content does NOT re-render during the panel transition** — it simply reflows. This is achieved by using CSS width transitions (not JavaScript-driven) so the browser handles the reflow optimally.

## 61.2 Panel Collapse vs. Close

**Collapse:** The panel goes to 0 width but the toggle button remains visible at the edge. The panel can be re-opened by clicking the toggle. State: "collapsed."

**Close (tab close):** The tab is removed from the zone. The panel content is unmounted. State: "closed." Opening requires going to the panel menu and re-adding the panel.

## 61.3 Panel Content Scrolling

Every panel that might have more content than visible height must handle overflow:

- Overflow behavior: `overflow-y: auto` (scrollbar appears when needed)
- Scroll bar style: same as section 57.3 (6px, thin, fade-in/out)
- Content padding-bottom: 16px (so the last item is not cut off by the scroll container edge)

---

# 62. CONTEXT MENUS

## 62.1 Context Menu Design

Context menus appear on right-click (or two-finger tap on trackpad/touchscreen):

**Container:**
- Background: Level 4 surface (`#2C2C39`)
- Border: 1px at `rgba(255,255,255,0.12)`
- Border-radius: 6px
- Padding: 4px top, 4px bottom, 0px horizontal
- Shadow: `0 8px 32px rgba(0,0,0,0.70), 0 2px 8px rgba(0,0,0,0.40)`
- Min width: 180px
- Max width: 280px
- Width: determined by longest item label + padding

**Positioning:**
- Opens at cursor position by default
- If menu would clip screen edge, repositions: appears above cursor if insufficient space below; shifts left if insufficient space to the right
- Never exceeds screen boundaries

**Items:**
- Height: 32px
- Horizontal padding: 12px
- Icon (if present): 14px, left of label, 8px gap between icon and label. Icons use `rgba(255,255,255,0.50)` color.
- Label: 12px Inter Regular, opacity 0.85
- Keyboard shortcut: right-aligned, 10px Geist Mono, opacity 0.35
- Hover: background `rgba(255,255,255,0.07)`, transition 60ms ease-out
- Active (triggered): background `rgba(255,255,255,0.12)` for 100ms, then menu closes

**Disabled items:**
- Label opacity: 0.25
- No hover effect
- Cursor: `default` (not pointer)
- No keyboard shortcut shown

**Separators:**
- 1px horizontal line at `rgba(255,255,255,0.07)`
- 4px margin top and bottom

**Submenus:**
- Items with submenus have a right-pointing chevron (8px) at the right edge
- Submenu opens on hover of the parent item (200ms delay to prevent accidental opens)
- Submenu closes when cursor leaves both the parent item and the submenu
- Submenu opens adjacent to the parent item (right-aligned if space, left-aligned if at screen edge)

## 62.2 Context Menu Animation

**Open:** scale from 0.94 → 1.0, opacity 0 → 1, 90ms ease-out, transform-origin at cursor position  
**Close:** opacity 1 → 0, 60ms ease-in (no scale change on close)

## 62.3 Context Menu Contents by Context

**Track header right-click:**
```
Rename
Color: ► [color submenu]
Duplicate
---
Add MIDI Track Above
Add Audio Track Above
---
Group Selected Tracks
---
Freeze Track
Bounce to Audio
---
Properties         Ctrl+I
Delete             Backspace
```

**Clip right-click:**
```
Rename
Color: ► [color submenu]
Duplicate          Ctrl+D
---
Split at Playhead  S
Crop to Content
Reverse
---
Clip Gain…
Pitch Shift…
Time Stretch…
Fade In: ► [None / 10ms / 50ms / 100ms / Custom]
Fade Out: ► [None / 10ms / 50ms / 100ms / Custom]
---
Quantize Audio     Q
---
Open in Waveform Editor
Convert to MIDI (AI)
---
Delete             Backspace
```

---

# 63. INSPECTOR PANELS

## 63.1 Inspector Panel Purpose

The inspector panel (in the right panel zone) shows properties of the currently selected item. It is context-sensitive: selecting a track shows track properties, selecting a clip shows clip properties, selecting a MIDI note shows note properties.

## 63.2 Inspector Panel Design

**Section headers within the inspector:**
```
Font: 9px Inter Medium, uppercase, letter-spacing 0.10em
Color: rgba(255,255,255,0.35)
Background: Level 3 surface
Padding: 8px 16px
Border-bottom: 1px structural border
```

**Property rows:**
```
Height: 28px
Padding: 0 16px
Layout: label left, value right
Label: 11px Inter Regular, opacity 0.50
Value: 11px Geist Mono, opacity 0.85
Editable values: click to focus, becomes text input
```

**Multi-selection inspector:**
When multiple tracks or clips are selected, the inspector shows:
- Properties that are the same for all selected: shown as their value
- Properties that differ: shown as "—" (em dash)
- Editing a "—" value applies the new value to all selected items

---

# 64. STATE PERSISTENCE

## 64.1 What is Persisted

**Persisted per workspace:**
- Panel open/closed state
- Panel widths/heights
- Active main view
- Active tab in each panel zone

**Persisted per project:**
- Zoom level (horizontal, in arrangement)
- Scroll position (horizontal and vertical, in arrangement)
- Zoom level (horizontal and vertical, in piano roll)
- Which tracks are expanded (showing automation lanes)
- Which clips are selected at time of last save

**Persisted globally (across all projects):**
- Active workspace
- Theme (dark/light)
- Accent color
- UI scale factor
- Keybinding overrides
- Audio device configuration

## 64.2 Persistence Mechanism

UI state is persisted to a local SQLite database (not the project file). This database lives at:
- macOS: `~/Library/Application Support/AUDIAW/ui-state.db`
- Windows: `%APPDATA%\AUDIAW\ui-state.db`
- Linux: `~/.local/share/audiaw/ui-state.db`

Writes to this database are debounced: any state change triggers a write after a 500ms quiet period. Not every state change triggers an immediate write (this would be excessive for scroll position changes).

---

# 65. WORKSPACE PRESETS

## 65.1 Workspace Preset Management

Access via: Transport bar workspace selector → dropdown → "Manage Workspaces"

**Management panel (modal dialog):**
- Width: 440px
- List of workspaces with:
  - Name (editable inline on double-click)
  - Preview thumbnail (a 80×50px screenshot of the workspace layout — static image captured when the workspace was last active)
  - Actions: Duplicate, Delete (built-in workspaces: duplicate only, not deletable)
- Drag to reorder workspaces in the list
- "New Workspace" button at bottom

## 65.2 Workspace Switching Transition

As specified in section 23: 240ms opacity crossfade. The workspace switch is triggered by selecting a workspace from the dropdown. The dropdown closes immediately, and the crossfade begins.

---

# 66. THEME ENGINE

## 66.1 Theme System Architecture

Themes in AUDIAW are implemented as CSS custom property overrides on the `:root` element. The theme engine:

1. Loads the built-in theme base (compiled into the application)
2. Loads the user's selected theme (if custom or non-default)
3. Applies user overrides (accent color, if changed)
4. Injects the final property set to `:root`

The React component tree uses only CSS custom properties for colors, never hardcoded values. This ensures that any theme change (even at runtime) is applied instantly without re-render.

## 66.2 Light Theme Specification

AUDIAW ships with a light theme ("AUDIAW Light"). Key differences from the dark theme:

```
--neutral-900: hsl(240, 8%, 97%)    /* Near-white */
--neutral-850: hsl(240, 6%, 95%)    /* Page background */
--neutral-800: hsl(240, 5%, 91%)    /* Raised surface */
--neutral-750: hsl(240, 5%, 86%)    /* Level 3 surface */
--neutral-700: hsl(240, 4%, 80%)    /* Level 4 surface */
--neutral-650: hsl(240, 4%, 73%)    /* Level 5 surface */

Text (on light surface):
--text-primary:   rgba(0, 0, 0, 0.88)
--text-secondary: rgba(0, 0, 0, 0.52)
--text-tertiary:  rgba(0, 0, 0, 0.32)

Dot-matrix text (transport): invert to dark text on light display
--dot-matrix-color: rgba(0, 0, 0, 0.80)

Waveforms: track colors retain their hue but waveform fills are at higher opacity (60%) since the contrast is reversed.

Borders: rgba(0,0,0,0.08) instead of rgba(255,255,255,0.07)
```

All other design decisions (spacing, typography scale, motion, interaction) are identical between light and dark themes.

---

# 67. DESIGN TOKENS

## 67.1 Token Categories and Format

Design tokens are defined as CSS custom properties and additionally exported as a JSON file for tooling integration. Every value used in AUDIAW's styling comes from a token.

**Token naming convention:** `--category-variant-modifier`

```css
:root {
  /* ── SURFACES ────────────────────────────────────── */
  --surface-void:          #0D0D0F;
  --surface-base:          #111115;
  --surface-raised:        #1A1A21;
  --surface-elevated:      #22222C;
  --surface-overlay:       #2C2C39;
  --surface-highest:       #363645;

  /* ── TEXT ────────────────────────────────────────── */
  --text-primary:          rgba(255, 255, 255, 0.92);
  --text-secondary:        rgba(255, 255, 255, 0.58);
  --text-tertiary:         rgba(255, 255, 255, 0.35);
  --text-ghost:            rgba(255, 255, 255, 0.18);

  /* ── BORDERS ─────────────────────────────────────── */
  --border-subtle:         rgba(255, 255, 255, 0.07);
  --border-default:        rgba(255, 255, 255, 0.10);
  --border-strong:         rgba(255, 255, 255, 0.20);
  --border-focus:          var(--accent-primary);

  /* ── ACCENT ──────────────────────────────────────── */
  --accent-primary:        #3B8BF5;
  --accent-secondary:      #60A5FA;
  --accent-dim:            rgba(59, 139, 245, 0.15);
  --accent-text:           #3B8BF5;

  /* ── STATUS ──────────────────────────────────────── */
  --status-record:         #EF4444;
  --status-record-dim:     #8B2020;
  --status-warning:        #F59E0B;
  --status-error:          #EF4444;
  --status-success:        #22C55E;
  --status-info:           #60A5FA;
  --status-mute:           #F59E0B;
  --status-solo:           #06B6D4;

  /* ── METERS ──────────────────────────────────────── */
  --meter-safe:            #22C55E;
  --meter-caution:         #F59E0B;
  --meter-danger:          #EF4444;
  --meter-clip:            #FF0000;
  --meter-bg:              #131318;

  /* ── TYPOGRAPHY ──────────────────────────────────── */
  --font-ui:               "Inter Variable", system-ui, sans-serif;
  --font-mono:             "Geist Mono", "JetBrains Mono", monospace;

  --size-2xs:   9px;
  --size-xs:   10px;
  --size-sm:   11px;
  --size-base: 12px;
  --size-md:   13px;
  --size-lg:   14px;
  --size-xl:   16px;
  --size-2xl:  20px;
  --size-3xl:  28px;

  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;

  /* ── SPACING ─────────────────────────────────────── */
  --space-1:   4px;
  --space-2:   8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* ── LAYOUT ──────────────────────────────────────── */
  --height-transport:        52px;
  --height-statusbar:        22px;
  --height-tabbar:           34px;
  --height-track-compact:    32px;
  --height-track-standard:   48px;
  --height-track-tall:       80px;
  --width-track-header:     216px;
  --width-mixer-channel:     72px;

  /* ── RADIUS ──────────────────────────────────────── */
  --radius-sm:    2px;
  --radius-base:  4px;
  --radius-lg:    6px;
  --radius-xl:    8px;
  --radius-full:  9999px;

  /* ── MOTION ──────────────────────────────────────── */
  --duration-micro:     60ms;
  --duration-fast:      90ms;
  --duration-standard: 120ms;
  --duration-moderate: 180ms;
  --duration-slow:     240ms;

  --ease-out:      cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in:       cubic-bezier(0.7, 0, 0.84, 0);
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring:   cubic-bezier(0.34, 1.12, 0.64, 1);
}
```

---

# 68. COMPONENT DESIGN STANDARDS

## 68.1 Button Component

AUDIAW has four button variants. Their differences are semantic (meaning) not just visual:

**Primary Button** (one per context maximum):
```
Background: var(--accent-primary)
Color: #FFFFFF
Font: 12px Inter Medium
Height: 32px
Padding: 0 14px
Border-radius: var(--radius-base) [4px]
Border: none
Hover: background lightens by 8% (CSS: filter: brightness(1.08))
Active/pressed: scale 0.98, duration var(--duration-micro) ease-out
Disabled: background var(--accent-dim), color rgba(255,255,255,0.40), cursor not-allowed
```

**Secondary Button:**
```
Background: rgba(255, 255, 255, 0.06)
Color: var(--text-primary)
Font: 12px Inter Regular
Height: 32px
Padding: 0 14px
Border-radius: var(--radius-base)
Border: 1px solid var(--border-default)
Hover: background rgba(255,255,255,0.10), border var(--border-strong)
Active: scale 0.98
Disabled: opacity 0.40, cursor not-allowed
```

**Ghost Button** (text-only):
```
Background: transparent
Color: var(--text-secondary)
Font: 12px Inter Regular
Height: 32px
Padding: 0 10px
Border-radius: var(--radius-base)
Border: none
Hover: background rgba(255,255,255,0.06), color var(--text-primary)
Active: scale 0.98
```

**Danger Button** (destructive actions):
```
Background: rgba(239, 68, 68, 0.12)
Color: #EF4444
Font: 12px Inter Medium
Height: 32px
Padding: 0 14px
Border-radius: var(--radius-base)
Border: 1px solid rgba(239, 68, 68, 0.30)
Hover: background rgba(239, 68, 68, 0.20), border rgba(239,68,68,0.50)
Active: scale 0.98
```

## 68.2 Input Field Component

```
Standard text input:
  Height: 28px
  Background: var(--surface-base)
  Border: 1px solid var(--border-default)
  Border-radius: var(--radius-base)
  Font: 12px var(--font-ui)
  Color: var(--text-primary)
  Padding: 0 8px (horizontally)
  
  Placeholder: var(--text-ghost), same font
  
  Focus:
    Border-color: var(--accent-primary), 1.5px solid
    Background: var(--surface-elevated)
    No outline (the border change is the focus indicator)
  
  Invalid:
    Border-color: var(--status-error)
    Background: rgba(239, 68, 68, 0.04)
  
  Disabled:
    Background: var(--surface-raised)
    Border: var(--border-subtle)
    Color: var(--text-tertiary)
    Cursor: not-allowed
```

## 68.3 Toggle Switch Component

```
Track (outer):
  Width: 32px
  Height: 18px
  Border-radius: 9px
  Background off: rgba(255,255,255,0.12)
  Background on: var(--accent-primary)
  Transition: background-color var(--duration-fast) var(--ease-out)

Thumb:
  Width: 14px
  Height: 14px
  Border-radius: 50%
  Background: white
  Position off: translateX(2px)
  Position on: translateX(16px) [32 - 14 - 2 = 16]
  Transition: transform var(--duration-fast) var(--ease-spring)
  Box-shadow: 0 1px 3px rgba(0,0,0,0.4)
```

## 68.4 Dropdown/Select Component

```
Trigger button:
  Height: 28px
  Background: var(--surface-raised)
  Border: 1px solid var(--border-default)
  Border-radius: var(--radius-base)
  Font: 12px var(--font-ui), var(--text-primary)
  Padding: 0 8px
  Right side: chevron icon (8px, opacity 0.45)
  Hover: background var(--surface-elevated), border var(--border-strong)
  Open state: border-color var(--accent-primary)

Dropdown panel:
  Background: var(--surface-overlay)
  Border: 1px solid var(--border-strong)
  Border-radius: var(--radius-lg) [6px]
  Shadow: 0 8px 32px rgba(0,0,0,0.60)
  Padding: 4px 0
  Min-width: matches trigger width
  Max-height: 240px (scrollable above this)

Item:
  Height: 32px
  Padding: 0 12px
  Font: 12px var(--font-ui), var(--text-primary)
  Hover: background rgba(255,255,255,0.07)
  Selected: background var(--accent-dim), left border 2px var(--accent-primary)
```

## 68.5 Knob Component

```
Visual:
  Outer ring: 36px diameter circle
  Ring background: rgba(255,255,255,0.06)
  Ring border: 1px rgba(255,255,255,0.12)
  Ring border-radius: 50%
  
  Indicator track (the arc showing the full range):
    Stroke width: 3px
    Color: rgba(255,255,255,0.10)
    Arc: from 7 o'clock to 5 o'clock (280° range)
  
  Indicator fill (the arc showing the current value):
    Stroke width: 3px
    Color: var(--accent-primary)
    Arc: from 7 o'clock to current value position
  
  Dot (at the current value position):
    Diameter: 4px
    Color: white
    Positioned on the outer edge of the indicator fill arc

Hover state:
  Ring border: rgba(255,255,255,0.25)
  Indicator fill: var(--accent-secondary) [lighter accent]

Focus state (keyboard):
  Focus ring: 1.5px solid var(--accent-primary), 3px offset
  Ring border: var(--accent-primary) at 50% opacity

Dragging:
  Value tooltip: floats 8px above the knob center
  Contains: the exact value in Geist Mono, 11px
  Background: var(--surface-overlay)
  Border-radius: 4px
  Padding: 3px 6px
```

---

# 69. RESPONSIVE SCALING

## 69.1 UI Scale Factor System

AUDIAW supports four UI scale presets plus a custom scale (80%–200%):

| Scale Name | CSS Transform Scale | Best For |
|---|---|---|
| Compact | 0.90 | Large monitors (27"+), dense workflows |
| Standard | 1.00 | Default, 1080p–1440p |
| Comfortable | 1.15 | 1080p laptops, accessibility |
| Large | 1.30 | Touch screens, high accessibility need |
| Custom | User-set | Any |

**Implementation:** The scale is applied via `transform: scale(X)` on the root application container, with `transform-origin: top left` and a compensating size adjustment so the window continues to fill its bounds.

**Exception:** The WGPU canvas layer does not scale via CSS transform. It is resized directly to match the scaled viewport dimensions, rendering at native resolution.

## 69.2 Window Size Adaptations

**< 1100px wide:**
- Right panel auto-collapses if left panel is open
- Transport bar enters compact mode: removes secondary controls (CPU meter label, hides project name)

**< 900px wide:**
- Minimum enforced: layout does not reduce further. Horizontal scrollbar appears.

**> 2560px wide (ultrawide or 4K+):**
- The primary canvas zone grows to fill. No maximum canvas width.
- Track header panel can expand to 280px (slightly wider, more readable labels)

---

# 70. OPEN SOURCE CONTRIBUTION DESIGN RULES

## 70.1 Design Contribution Standards

These rules apply to any UI contribution (new component, new view, modification of existing UI):

**Rule C1: Use only design tokens.**  
No hardcoded color values, font sizes, spacing values, or animation durations in contributed code. Every value must reference a CSS custom property from the design token system.

**Rule C2: Follow the component library.**  
New UI features must be built from existing components where possible. If a new component is needed, it must be designed in the style of existing components and added to the component library with documentation.

**Rule C3: Accessibility is not optional.**  
Every interactive element in a contribution must have a keyboard interaction model, a visible focus state, and appropriate ARIA labels. PRs that introduce inaccessible UI will not be merged.

**Rule C4: Performance is a design constraint.**  
Any new component that introduces render performance problems (causes jank in the track list, increases main thread blocking) will be sent back for revision regardless of visual quality.

**Rule C5: Mockup before code.**  
Significant UI changes require a Figma mockup (or equivalent) to be reviewed and approved before implementation begins. The mockup must use the established design token values and show all interactive states.

**Rule C6: Follow the monochrome principle.**  
Do not introduce new uses of color that are not on the Color Permission List (section 18.2). Any new color usage must be justified by a documented informational need.

---

# 71. BRANDING SYSTEM

## 71.1 Brand Name

The product name is **AUDIAW**. Always all-uppercase when used as a wordmark. In natural text (documentation, descriptions), it may be written as "Audiaw."

Never: "audiaw", "AudiAW", "Audi AW", "Audio AW."

## 71.2 Brand Wordmark

The wordmark is set in:
- Font: Inter Variable, Semibold (600)
- Letter spacing: -0.02em (slightly tighter than tracking-tight)
- Case: ALL CAPS
- Color: var(--text-primary) on dark surfaces; `rgba(0,0,0,0.85)` on light surfaces

The wordmark must never be:
- Italicized
- Outlined (stroked)
- Used on a colored background (only on neutral surfaces)
- Decorated with drop shadows
- Distorted in proportion

**Minimum size:** 16px tall (the wordmark must never be rendered smaller than this)

## 71.3 Brand Symbol (Logomark)

The logomark (a standalone visual element distinct from the wordmark) is described below, but its final form is pending design review. Until officially approved, the wordmark alone is used for all branding.

**Logomark concept (under review):**
A stylized "A" constructed from three horizontal lines of varying length — evoking both the letter A and a spectrum analyzer display. Monochrome. Geometric. Industrial.

## 71.4 Tagline

**"Sound, engineered."**

Used: on the startup screen (optional, small size, low opacity), on the website, in marketing materials. Never used within the application UI itself (the app doesn't need to market itself to its own users).

---

# 72. LOGO USAGE

## 72.1 Application Icon

The application icon is used in the OS dock/taskbar and file associations.

**Design requirements for the application icon:**
- Dark background (the icon should be dark, like the app itself)
- The AUDIAW logomark centered, in white
- No drop shadows or effects on the icon itself
- Follows each platform's icon shape convention:
  - macOS: square with rounded corners (radius = 22.4% of icon size), shadow added by macOS automatically
  - Windows: square, no radius (Windows applies its own shape)
  - Linux: PNG without shape constraint

**Sizes required:**
- macOS: 1024×1024 (source), automatically scaled by the OS
- Windows: 256×256, 128×128, 64×64, 32×32, 16×16 (ICO format)
- Linux: 512×512, 256×256, 128×128, 64×64, 32×32 (PNG format)

## 72.2 In-App Logo Placement

The logo within the application appears only in:
- Startup screen (large, centered)
- About dialog (standard size)
- Crash recovery screen

The logo does not appear in the application's normal working interface (the transport bar, panels, status bar do not contain the logo).

---

# 73. UI SOUND DESIGN

## 73.1 Philosophy

AUDIAW has minimal UI sound. Audio feedback in a DAW competes directly with the production audio and creates interference in the user's monitoring environment. For this reason:

**UI sounds are disabled by default.**

Users who want UI audio feedback can enable it in Preferences → Appearance → UI Sounds.

## 73.2 Optional UI Sound Events

If enabled, these events have associated sounds:

| Event | Sound Character | Duration |
|---|---|---|
| Project saved | A brief, soft chime (high, single note) | 80ms |
| Export complete | Two ascending tones | 150ms |
| Plugin crash | A soft low thud (not alarming — the visual communication carries the severity) | 100ms |
| Transport play | Subtle "click" (simulates physical button) | 20ms |
| Transport stop | Subtle "click" (lower pitch than play) | 20ms |
| Record start | A soft click + brief buzz (like a tape machine engaging) | 30ms |
| Error/warning | A short, low-pitched soft tone (not a traditional error beep — less alarming) | 60ms |

All UI sounds:
- Are rendered as mono audio
- Are mixed at -24 dBFS relative to their maximum
- Route through the system audio output (not the AUDIAW audio device — to avoid appearing in recordings)
- Are non-spatialized

## 73.3 Sound Files

All UI sounds are stored as WAV files (44.1kHz, 16-bit, mono) in the application bundle at:
`/assets/ui-sounds/[event-name].wav`

---

# 74. AI ASSISTANT UX

## 74.1 AI Features in AUDIAW (v2.0+)

AI features in AUDIAW are entirely opt-in and clearly labeled. They are never activated without explicit user action. AI features are presented as tools, not as an autonomous agent.

## 74.2 AI Feature UX Principles

**Principle AI-1: AI is a tool, not a collaborator.**  
AI suggestions are presented as options to accept, modify, or reject. The AI never modifies the project without the user explicitly applying the suggestion.

**Principle AI-2: AI features are labeled.**  
Every AI-powered feature is labeled with a small "AI" badge or indicator. Users always know when they are using an AI feature. The badge:
- Size: 14×14px
- Shape: rounded rect (3px radius)
- Background: `rgba(139, 92, 246, 0.15)` (violet, distinct from the accent color)
- Text: "AI" in 7px Inter Bold, color `#8B5CF6`

**Principle AI-3: No internet required for AI features.**  
All AI processing in v2.0 runs locally. No audio data, project data, or user data is sent to external servers. This is a fundamental promise.

## 74.3 AI Feature Locations (v2.0 planned)

**Smart Quantize:** In the piano roll toolbar, a button labeled "Smart Q" with the AI badge. Clicking applies an intelligent quantization that preserves human feel (not hard quantize). A dialog shows before/after preview.

**Pitch Correction:** In the clip context menu → "Pitch Correction (AI)". Opens a non-destructive pitch correction view.

**Convert to MIDI:** In the clip context menu → "Convert to MIDI (AI)". Analyzes audio and generates a MIDI approximation. Shown as a new MIDI clip on a new track, not overwriting the original.

---

# 75. COLLABORATION UX

## 75.1 Collaboration Features (v2.0+)

Real-time collaboration (multiple users editing the same project simultaneously) is a planned v2.0 feature. Its UX design principles:

**Presence Indicators:**
- Each collaborator has an assigned color (from the track color palette, starting with Color 9 Blue for the first collaborator)
- The collaborator's cursor is visible to all other users as a small cursor shape in their assigned color with their display name
- Collaborator cursor labels: 10px Inter Regular, white on collaborator-colored background, 4px border-radius, 4px padding horizontal

**Conflict Resolution:**
- Simultaneous edits to the same clip: the second edit is queued and applied after the first completes
- No "last write wins" — edits are merged where possible, flagged for resolution where not
- Merge conflicts appear as a subtle amber border on the conflicting element

**Collaboration Status:**
- In the transport bar (right section, left of workspace selector): collaborator avatars shown as 24×24px circles with initials in their assigned color
- Hovering an avatar shows their display name
- A "Live" indicator (3px green dot) appears when any collaborator is active

---

# 76. EXPORT WORKFLOW UX

## 76.1 Export Dialog Design

Access via: `Ctrl/Cmd+E`

**Dialog:**
- Width: 480px
- Background: Level 4 surface
- Border-radius: 8px
- Shadow: `0 24px 80px rgba(0,0,0,0.80)`
- Padding: 28px

**Content sections:**

**Section 1: What to Export**
```
Radio options:
  ○ Full Project (entire arrangement length)
  ○ Loop Region (current loop start → end)
  ○ Selection (current time selection)

Track export options:
  ○ Master Output
  ○ Export Stems (one file per track/group)
    └─ [✓] Include FX    [✓] Normalize stems individually
```

**Section 2: Format Settings**
```
Format: [WAV ▾]    [FLAC ▾]    [MP3 ▾]    [AIFF ▾]

Sample Rate: [48000 Hz ▾]
Bit Depth: [24-bit ▾]    (for WAV/AIFF/FLAC)
MP3 Quality: [320 kbps ▾]    (for MP3 only)

[✓] Normalize to target LUFS
Target: [-14.0 LUFS ▾]    [or: -1.0 dBTP true peak ▾]
```

**Section 3: Output**
```
File name: [Project Name_export]     ← editable text field
Save to: [/Users/.../Music/]        [Browse…]
```

**Actions (bottom):**
```
[Cancel]    [Export]
```

**Export Progress:**
After clicking Export, the dialog transforms:
- The form content is replaced by a progress view
- Progress bar: full width, 4px height, at bottom of dialog
- Content: [spinning indicator] "Rendering track 3 of 8…" or "Exporting stem: Lead Vocal…"
- A "Cancel" button remains accessible

**Export Complete:**
```
[✓ green checkmark icon, 24px]
"Export complete."
"24 tracks exported to [folder path]"
[Open Folder]    [Done]
```

---

# 77. RECORDING WORKFLOW UX

## 77.1 Pre-Recording Setup

Before recording, the user must arm at least one track. The pre-recording UI state:

**Armed track visual:**
- Track header: the arm button shows the dim red state (`#8B2020`)
- Track lane: a very subtle red tint on the track lane background: `rgba(139,32,32,0.05)` — perceptible but not distracting
- Input meter: appears in the track header (mini meter showing input signal, not playback level)

**Input level monitoring:**
A small input meter appears in the track header of armed tracks (or in the right panel inspector):
- 16px wide, full track header height
- Same color gradient as standard meters
- Updates in real-time even without playback
- An "OK" zone indicator: a small amber mark at -12 dBFS ("aim for here")

## 77.2 During Recording

**Visual changes when recording starts:**
- Transport bar: play button accent fill turns red, record button pulses
- All track lanes: a subtle red border appears at the top edge of the canvas (2px, red at 30% opacity) — a peripheral signal that recording is active
- Armed track lane: a red waveform builds in real-time as audio is captured. The waveform is rendered progressively as the recording cursor moves rightward.
- Recording clip label: "[Recording]" in 10px, red

**Real-time waveform during recording:**
- The incoming audio is rendered as a live waveform filling the clip area as the playhead moves
- The waveform updates at 30fps (adequate for visual feedback without excessive GPU use)
- Color: red at 60% opacity (matches record state)

## 77.3 Take Management

After multiple recordings on the same track with loop recording enabled, take lanes appear:

**Take lane visual:**
- Takes stack below the main track header
- Each take is 20px tall (compact, to maximize visible takes)
- Active take: full opacity waveform
- Inactive takes: waveform at 35% opacity
- Take label: "Take 1", "Take 2" etc. in 9px Geist Mono, left-aligned in lane
- The "best take" (user-indicated) has a small star icon at right of lane label

---

# 78. LIVE PERFORMANCE UX

## 78.1 Performance Mode Activation

Performance mode is activated via: Transport bar → "Performance" button (visible when the clip launcher view is active), or via the Workspace preset "Performance."

**Performance mode indicator:**
- A persistent "LIVE" badge appears in the transport bar (right of the loop button)
- Badge: 40×20px, background `rgba(239, 68, 68, 0.15)`, border `rgba(239, 68, 68, 0.30)`, text "LIVE" in 10px Inter Semibold, `#EF4444`
- The badge pulses very subtly: opacity 0.8 → 1.0 → 0.8, 2s cycle (slower than record pulse — calmer)

## 78.2 Clip Launcher View

**Layout:**

```
CLIP LAUNCHER

Track headers: top row, same width as columns
  Each header: track name, mute, solo (horizontal layout in header)

Scene launch buttons: leftmost column (64px wide)
  Each scene: scene name (editable), launch button (▶)

Clip grid: tracks (columns) × scenes (rows)
  Each cell: clip clip trigger button

Column footer: track stop button (■)
```

**Clip cell design:**
- Size: fills column width × 56px height
- Empty cell: dashed border `rgba(255,255,255,0.10)`, 4px border-radius, no content
- Loaded cell: track color fill at 15%, clip name in 11px Inter Regular, centered
- Playing cell: track color fill at 30%, a progress bar at the bottom (2px, track color, fills left-to-right as clip plays through)
- Triggered (queued): a countdown ring animation clockwise fills the cell border over the quantize period

**Scene launch button:**
- Width: 64px, height: 56px (matching clip row height)
- Contains: scene name (11px, left-aligned) + ▶ icon (right-aligned, 16px)
- Active scene: left border 2px accent color
- Hover: background Level 3 surface

## 78.3 Performance Mode UI Reductions

In performance mode, the following are automatically reduced:
- UI frame rate targeting: halved (30fps UI instead of 60fps — frees CPU for audio)
- All non-essential UI animations: disabled
- The arrangement view is not accessible (it's unnecessary during performance and adds memory pressure)
- Plugin edit UIs cannot be opened (a "Performance mode active" tooltip appears if attempted)

---

# 79. FUTURE EXPANSION PHILOSOPHY

## 79.1 Design System Extensibility

The AUDIAW design system is built to accommodate future features without requiring system-wide redesign:

**New panels:** Any new panel must fit within the existing Left / Right / Bottom zone structure. If a new panel doesn't fit in existing zones, a new zone category must be defined (with an RFC process) rather than violating the existing spatial grammar.

**New instrument views:** New built-in instruments (if added) must use the existing device card container system and the standard parameter display patterns (label-value pairs, knobs, sliders). Instrument-specific visual elements (e.g., a wavetable display, an FM operator diagram) are placed inside the device card expanded area.

**New meters and visualizations:** New DSP visualizations must follow the GPU rendering rules (Section 54) and the visual specification style established by the spectrum analyzer and level meters. They must use the existing surface and text token system.

## 79.2 Design Debt Management

As new features are added, the design system must be audited quarterly:

- Are any new features using hardcoded values (not tokens)?
- Are any new components inconsistent with existing component standards?
- Has the type scale been violated?
- Have new colors been introduced that aren't on the Color Permission List?

Design debt is tracked as issues labeled `design-debt` in the repository. These issues are prioritized in every release sprint. No design debt may be introduced by a feature PR without a corresponding `design-debt` issue being filed simultaneously.

## 79.3 Non-Negotiable Design Principles (Version-Locked)

These principles will not change with future AUDIAW versions. They are locked:

1. The application is fundamentally dark-themed. Light theme is secondary.
2. The spatial grammar (top/left/center/right/bottom zones) is fixed.
3. The monochrome principle (color serves only functional communication) is fixed.
4. GPU-rendered waveforms are non-negotiable.
5. No animation may delay user action.
6. No UI element requires a network connection to render.
7. Accessibility is not a feature — it is a quality standard.

---

*End of AUDIAW DESIGN.md*

*Version 1.0.0 — This document represents the complete design specification for AUDIAW. It is a living document updated with each significant design decision. Changes require a design RFC and maintainer approval.*

*"Sound, engineered."*
