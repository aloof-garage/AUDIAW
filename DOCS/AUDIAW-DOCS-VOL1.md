# AUDIAW — MASTER DOCUMENTATION ECOSYSTEM
## Volume I: Product, Architecture & Audio Engine

**Classification:** Internal Engineering Documentation  
**Version:** 0.1.0-draft  
**Status:** Living Document  
**Maintainers:** Core Architecture Team  
**Last Updated:** 2025  

---

> *"AUDIAW exists because professional audio production should not require expensive software, opaque workflows, or compromised hardware. It exists because music is universal, but the tools are not."*

---

## TABLE OF CONTENTS — VOLUME I

1. [Master Product Requirements Document (PRD)](#1-master-product-requirements-document)
2. [Complete Application Architecture Document](#2-complete-application-architecture-document)
3. [Audio Engine Master Design Document](#3-audio-engine-master-design-document)

---

# 1. MASTER PRODUCT REQUIREMENTS DOCUMENT

## 1.1 Product Vision

### 1.1.1 Mission Statement

AUDIAW's mission is to be the definitive free, open-source digital audio workstation: a professional-grade, visually refined, and genuinely cross-platform music production environment that removes barriers between creative intent and sonic output.

We exist in a landscape where professional tools are expensive, closed, and often technically compromised. We believe every producer — from a teenager with a second-hand laptop in Lagos to a professional composer in a Tokyo studio — deserves software that is fast, stable, beautiful, and free. Not as a compromise. As a principle.

AUDIAW is not a "free alternative." It is the standard against which others are measured.

### 1.1.2 Product Philosophy

**Speed First.** Every architectural, UX, and engineering decision must be evaluated against the question: "Does this make the workflow faster?" Speed is not just a technical metric — it is a creative value. Every millisecond of latency, every extra click, every unnecessary loading screen interrupts the creative state. AUDIAW is engineered to be invisible — present when needed, absent when not.

**Stability as Respect.** Crashing is not a bug — it is a betrayal of the user's trust. A DAW crash can destroy hours of irreplaceable creative work. AUDIAW treats stability as a first-class product requirement, not a side effect of good engineering. Plugin isolation, autosave redundancy, crash recovery, and realtime-safe memory management are not optional — they are foundational.

**Beauty as Function.** A beautiful interface is not cosmetic — it is cognitive. When the visual design is consistent, spacious, and intentional, the user's brain can allocate more resources to the creative task and fewer to navigating the UI. AUDIAW's visual design is not decoration — it is workflow infrastructure.

**Openness as Multiplier.** Being open source is not a constraint — it is a superpower. An open codebase means faster bug discovery, broader platform coverage, community-driven feature development, and permanent availability. AUDIAW's architecture is designed for contribution: modular, well-documented, and accessible to both Rust experts and frontend developers.

**Modularity as Future-Proofing.** The audio production landscape changes constantly. New plugin formats emerge. New CPU architectures arrive. New workflows develop. AUDIAW's modular architecture ensures that its core can evolve without breaking existing systems — and that the community can extend it without modifying the core.

### 1.1.3 Workflow Philosophy

The central workflow principle of AUDIAW is **Reduction Without Sacrifice**: removing friction without removing power.

Every workflow decision is evaluated on two axes:
1. **Cognitive Load** — How much mental effort does this action require?
2. **Capability Depth** — How much creative power does this action provide?

The goal is to maximize Capability Depth per unit of Cognitive Load. This leads to specific design patterns:

- **Context-Sensitive Interfaces:** Show only what is relevant to the current task. When the user is recording, the recording controls are prominent. When mixing, the routing view dominates.
- **Progressive Disclosure:** Beginner-mode simplicity with expert-mode depth a single click away. No features are hidden, but not all features compete for attention simultaneously.
- **Keyboard-Primary Design:** Every action that a power user will perform more than twice per session must have a keyboard shortcut. The mouse is for discovery. The keyboard is for production.
- **State Persistence:** The application remembers where the user was. Window positions, zoom levels, browser selections, and scroll positions are preserved across sessions.
- **Undo as Safety Net:** The undo history is unlimited (within memory constraints), persistent across autosaves, and covers every user action including routing changes, plugin parameter edits, and automation modifications.

### 1.1.4 Creative Philosophy

AUDIAW is designed to support the **state of flow** — the psychological condition in which creative work feels effortless, time disappears, and output quality peaks. Flow is fragile: it is broken by lag, by confusion, by visual noise, by crashes, by complex menus, and by software that fights the user.

Every design decision in AUDIAW is evaluated against the question: **"Does this protect or disrupt the user's creative flow?"**

This philosophy manifests in:

- **No Mandatory Dialogs:** AUDIAW never interrupts with mandatory dialog boxes during production. Warnings are non-modal. Notifications are transient. Confirmations are single-click.
- **Instant Feedback:** Every UI action produces immediate visual and audio feedback. Plugin parameters respond to automation at sample accuracy. Visual meters update at screen refresh rate.
- **Template System:** Users can save and recall entire project templates, workflow presets, and instrument chains. Starting a new project should feel like continuing the last one.
- **Color as Memory:** Tracks, clips, and channels can be color-coded to support spatial memory. When mixing 40 tracks, color is the fastest navigation tool available.

### 1.1.5 UX Philosophy

AUDIAW's UX philosophy is built on five pillars:

**1. Spatial Clarity:** Every element has a clear visual location and hierarchy. The user should always know where they are in the application, what mode they are in, and what their primary action options are.

**2. Consistent Affordances:** Draggable elements look draggable. Clickable elements look clickable. Editable values have a consistent edit affordance (double-click or single-click based on risk). This consistency eliminates the need to discover interaction models repeatedly.

**3. Reversibility:** Every destructive or consequential action is either undoable or preceded by a clear warning. Non-destructive editing is the default. Destructive operations (like sample trimming) are explicitly flagged.

**4. Density Control:** The user controls how much information is on screen. Compact mode, standard mode, and expanded mode exist for the arrangement view, mixer, and piano roll. High-density mode is available for users with large monitors who prefer more tracks visible simultaneously.

**5. Platform Natives:** While AUDIAW uses web technologies for its UI layer, it must feel native. System fonts are used where appropriate. OS-native file dialogs are invoked for file operations. Keyboard shortcuts follow platform conventions (Cmd on macOS, Ctrl on Windows/Linux). Scroll behavior matches platform expectations.

### 1.1.6 Open-Source Philosophy

AUDIAW's open-source approach is rooted in **transparent excellence**: the codebase should be high enough quality that contributors are proud to be associated with it, and approachable enough that contributors can make meaningful contributions within their first week.

Key principles:

- **Documentation-First Development:** No feature is considered complete until its documentation is complete. Every public API, every architecture decision, every UX pattern must be documented before the feature ships.
- **Contributor Respect:** First-time contributors receive a personal review response within 72 hours. Good contributions from newcomers are celebrated publicly in the changelog. The barrier to first contribution must be achievable in a single evening.
- **No Gatekeeping:** The project governance model is transparent, documented, and community-ratified. Maintainer status is earned through sustained contribution, not appointment. Roadmap decisions are made in the open.
- **License as Statement:** AUDIAW is licensed under GPLv3 for the core application. The plugin SDK is licensed under MIT/Apache 2.0 dual license to enable commercial plugin development without license contamination.

---

## 1.2 Market Analysis

### 1.2.1 Competitor Analysis

#### Ableton Live

**Strengths:**
- Industry-standard Session View for live performance and loop-based production
- Excellent MIDI clip editing and clip automation
- Best-in-class Warp algorithm for audio time-stretching
- Strong Max for Live extensibility ecosystem
- Exceptional stability and reliability reputation
- Strong Loop/Sample library integration

**Weaknesses:**
- No Linux support (Windows/macOS only)
- High cost ($99–$749 depending on edition)
- Limited mixer routing flexibility compared to Cubase/Pro Tools
- Session View and Arrangement View are separate, creating context-switch friction
- Limited notation/score view
- UI has not fundamentally changed since v9 despite cosmetic updates
- Max for Live creates a two-tier ecosystem where advanced features require premium edition

**AUDIAW Opportunity:** Unified session/arrangement concept that doesn't force a context switch. Linux support. Free alternative for loop-based producers.

#### Logic Pro X

**Strengths:**
- Best value professional DAW ($199 one-time purchase)
- Deep integration with macOS/iOS ecosystem
- Excellent stock plugin library (Space Designer, Alchemy, etc.)
- Best notation/score editor in any DAW
- Drummer track and Smart Tempo are genuinely innovative
- Logic Remote iPad integration

**Weaknesses:**
- macOS/iOS exclusive — zero cross-platform story
- No Linux, no Windows
- Closed ecosystem — no community plugins for core instruments
- Update pace dictated by Apple's commercial priorities
- Cannot be extended by the community

**AUDIAW Opportunity:** Full cross-platform parity. Community-extensible equivalent instruments. Linux first-class support.

#### FL Studio

**Strengths:**
- Free lifetime updates (one-time purchase model)
- Best pattern-based/beat production workflow in any DAW
- Exceptionally active community and tutorial ecosystem
- Piano Roll widely considered the best in the industry
- Extremely fast for beatmaking workflows
- Excellent value proposition

**Weaknesses:**
- Windows-native; macOS support added later and remains second-class
- No Linux support
- UI language inconsistent and dated in places
- Arrangement view less polished than Live/Logic
- Mixer routing model has a high learning curve
- Project portability between FL and other DAWs is poor

**AUDIAW Opportunity:** Cross-platform first-class experience. Pattern-based workflow with cleaner UI. Linux support. Open-source piano roll improvements.

#### Bitwig Studio

**Strengths:**
- Only major commercial DAW with Linux support
- Highly modular architecture (The Grid, Nested Devices)
- Modern codebase — fast, stable, responsive
- Excellent plugin sandboxing (crash isolation)
- Strong modulation routing system
- Clean, modern UI aesthetic

**Weaknesses:**
- $399 initial cost + upgrade plan subscription
- Smaller user base means fewer tutorials/resources
- Plugin ecosystem smaller than Ableton/Logic
- Grid (modular synthesis) has steep learning curve
- Cross-platform (Linux) experience, while available, sometimes lags behind

**AUDIAW Opportunity:** Free equivalent of Bitwig's architecture philosophy. Larger community. More accessible learning resources.

#### Reaper

**Strengths:**
- Extraordinary flexibility and customization
- Linux support (unofficial but widely used)
- Very low cost ($60 discounted/$225 commercial)
- Extremely stable and performant
- Deep scripting via ReaScript (Lua, Python, EEL2)
- Excellent routing flexibility

**Weaknesses:**
- Notoriously ugly UI — no coherent design language
- Steep learning curve due to unlimited configurability
- No built-in instruments (requires third-party plugins for everything)
- Documentation is sparse and community-driven
- The "flexibility" often means excessive configuration overhead for common tasks

**AUDIAW Opportunity:** The aesthetics Reaper never had. Built-in instruments. Better default experience while retaining Reaper-level power.

#### Cubase / Studio One / Pro Tools

These represent the professional studio tier:

- **Cubase:** Deep MIDI, excellent scoring, strong routing. But Windows/macOS only, expensive, UI aging.
- **Studio One:** Modern, clean UI. One-time purchase. macOS/Windows only. Growing Linux demand unfulfilled.
- **Pro Tools:** Industry standard for post-production/film. Subscription-only. macOS/Windows only. Expensive. UI modernization lagging.

**AUDIAW Opportunity across all three:** Linux support, open-source ecosystem, modern web-tech UI iteration speed, free tier without feature compromise.

### 1.2.2 Feature Comparison Matrix

| Feature | AUDIAW | Ableton | Logic | FL Studio | Bitwig | Reaper |
|---|---|---|---|---|---|---|
| **Price** | Free | $99–$749 | $199 | $99–$499 | $399 | $60–$225 |
| **Windows** | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| **macOS** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Linux** | ✅ | ❌ | ❌ | ❌ | ✅ | ~✅ |
| **ARM64** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Open Source** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Plugin Crash Isolation** | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **VST3** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **CLAP** | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **LV2** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **AU** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **JACK Support** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **PipeWire** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Built-in Sampler** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Built-in Wavetable** | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| **Built-in FM Synth** | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ |
| **Built-in Granular** | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Clip Launching** | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ |
| **Nested Devices** | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| **Modulation Routing** | ✅ | ~✅ | ~✅ | ~✅ | ✅ | ✅ |
| **GPU Waveforms** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Startup < 3s** | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ |
| **RAM < 200MB idle** | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ |

### 1.2.3 Market Gaps

**Gap 1: The Linux Professional Vacuum**

The Linux professional audio market is served only by Bitwig (commercial) and Reaper (unofficial). There are hundreds of thousands of professional audio engineers, researchers, academics, and producers on Linux who lack a polished, purpose-built DAW. AUDIAW fills this gap as a first-class Linux citizen.

**Gap 2: The Free Professional Tool Gap**

The free DAW landscape consists of LMMS (limited, dated UI), Ardour (powerful but intimidating UI, audio-focused), GarageBand (macOS-only, limited), and various basic editors. There is no free, truly professional, visually polished, full-featured DAW. AUDIAW fills this gap.

**Gap 3: The Open-Source Extensibility Gap**

No major DAW allows users to extend the core application, build custom instruments with full access to the audio graph, or contribute UI improvements. AUDIAW's open architecture makes this possible.

**Gap 4: The ARM64 Performance Gap**

Apple Silicon (M1/M2/M3) has transformed laptop audio production. Many DAWs run under Rosetta 2 emulation, paying a 10-30% performance penalty. AUDIAW ships native ARM64 binaries for all supported platforms, including Raspberry Pi-class ARM Linux devices.

**Gap 5: The Web-Developer Accessibility Gap**

Contributing to a DAW typically requires expertise in C++ audio programming — a high barrier. AUDIAW's React/TypeScript frontend means that the enormous web developer community can contribute UI improvements, new views, and UX enhancements without needing to understand realtime audio programming.

### 1.2.4 Linux Audio Ecosystem Analysis

The Linux audio ecosystem is fragmented but mature:

**Audio Servers:**
- **PipeWire** (modern, increasingly standard): Replaces JACK and PulseAudio. Supports low-latency professional audio alongside consumer audio. AUDIAW targets PipeWire as primary on Linux.
- **JACK** (legacy professional): Still widely used in professional Linux studios. AUDIAW supports JACK as a first-class backend.
- **ALSA** (kernel level): Direct hardware access. Used as fallback and for embedded Linux scenarios.
- **PulseAudio** (consumer legacy): Being replaced by PipeWire. AUDIAW supports PulseAudio via compatibility layer.

**Plugin Formats on Linux:**
- **LV2**: The native Linux plugin format. Excellent metadata system, state persistence, UI embedding. AUDIAW provides first-class LV2 support.
- **VST3**: Increasingly supported on Linux by major vendors (Native Instruments, etc.). AUDIAW supports VST3 on Linux.
- **CLAP**: New format, open-source, designed for modern DAWs. Excellent Linux support in its specification. AUDIAW is an early adopter.

**MIDI on Linux:**
- ALSA MIDI sequencer
- JACK MIDI
- PipeWire MIDI (emerging)
- AUDIAW abstracts all three via a unified MIDI backend

**Challenges:**
- Audio permission management (real-time scheduling requires elevated privileges or specific kernel configuration)
- Distribution fragmentation (Ubuntu, Fedora, Arch, NixOS all handle audio differently)
- Driver quality varies significantly by hardware vendor
- Desktop environment differences affect window management, HiDPI, and input handling

AUDIAW addresses these through a comprehensive Linux setup guide, a diagnostics tool (`audiaw --diagnose`), and platform-specific sensible defaults.

---

## 1.3 User Personas

### 1.3.1 Persona: The Bedroom Producer ("Alex")

**Demographics:** 18–28 years old. Student or early-career professional. Limited budget.  
**Platform:** Windows laptop (consumer-grade, 8–16GB RAM, integrated graphics). Occasionally Linux.  
**Experience:** 0–2 years of music production. Self-taught via YouTube tutorials.

**Goals:**
- Make beats for SoundCloud/YouTube without spending money on software
- Learn production fundamentals without being overwhelmed
- Share music with friends quickly
- Grow to professional quality over time

**Pain Points:**
- Confused by complex routing in Cubase/Pro Tools
- Frustrated by crashes in pirated software
- Intimidated by expensive plugin ecosystems
- YouTube tutorials are often for specific (paid) DAWs they don't own

**AUDIAW Design Implications:**
- Default workspace must be immediately comprehensible on first launch
- Template-based project start for common genres (trap, lo-fi, pop)
- Integrated tutorial overlay (first-run experience)
- Built-in free samples and instruments adequate for professional output
- Clear, non-jargon error messages
- Performance must be acceptable on Intel UHD 620 or Ryzen integrated graphics

### 1.3.2 Persona: The Professional Producer ("Morgan")

**Demographics:** 28–45 years old. Full-time music producer/songwriter.  
**Platform:** macOS (Apple Silicon) primary. Windows secondary studio.  
**Experience:** 8+ years. Multi-DAW user. Multiple platinum credits.

**Goals:**
- Deliver professional-quality mixes to clients
- Work as fast as possible — time is money
- Reliable performance under large project loads (100+ tracks)
- Robust plugin ecosystem (needs specific commercial plugins)
- Collaboration with artists across platforms/DAWs

**Pain Points:**
- DAW crashes mid-session when a plugin misbehaves
- Inconsistent plugin behavior across platforms
- UI that slows down after large project loading
- Collaboration files breaking between DAW versions

**AUDIAW Design Implications:**
- Plugin crash isolation is non-negotiable
- Large project performance (100+ tracks) must be benchmarked explicitly
- Project files must be forward/backward compatible within major versions
- Stem import/export for collaboration with non-AUDIAW users
- Professional metering (LUFS, true peak, RMS)
- Advanced routing (parallel processing, complex send chains)

### 1.3.3 Persona: The Audio Engineer ("Jordan")

**Demographics:** 25–40 years old. Recording/mixing engineer. Studio-based.  
**Platform:** macOS or Windows. High-end workstation (64+ GB RAM, dedicated GPU).  
**Experience:** Professional. DAW-agnostic — uses whatever the client needs.

**Goals:**
- Track live instruments with minimal latency
- Mix large sessions (50–100+ tracks) with complex routing
- Print stems to client specifications
- Professional metering and analysis tools

**Pain Points:**
- Pro Tools is expensive and subscription-based
- Logic is macOS-only
- Linux studio machines have no viable professional option
- I/O configuration is complex and often breaks between sessions

**AUDIAW Design Implications:**
- ASIO/CoreAudio/JACK low-latency performance targets must be aggressive (< 3ms round-trip achievable)
- Hardware I/O routing must be persistent and named (not by device index)
- Multi-format audio export (WAV, AIFF, FLAC, various bit depths/sample rates)
- Comprehensive metering suite (LUFS-I, LUFS-S, TP, RMS, Goniometer, Spectrum)
- Hardware control surface support (MCU protocol, HUI protocol)

### 1.3.4 Persona: The Beatmaker ("Devon")

**Demographics:** 16–30 years old. Urban music production focus (Hip-hop, R&B, Trap, Afrobeats).  
**Platform:** Windows (desktop or laptop). Often FL Studio user considering alternatives.  
**Experience:** 1–5 years. Pattern-based workflow dominant.

**Goals:**
- Create beats fast — pattern-based, loop-based workflow
- Best possible piano roll for intricate MIDI programming
- Step sequencer for drum programming
- Fast sample manipulation (chop samples, pitch, stretch)

**Pain Points:**
- Most DAWs not designed for pattern-based workflow
- Piano roll in non-FL DAWs feels inferior
- Sample chopping workflow is slow in arrangement-view-first DAWs

**AUDIAW Design Implications:**
- Pattern/clip workflow must be as fast as FL Studio's
- Piano Roll must be best-in-class (velocity, micro-timing, chord tools, scale highlighting)
- Integrated step sequencer for drums
- Beat slice/chop tools in sampler
- Edison-equivalent audio editor integrated

### 1.3.5 Persona: The Live Performer ("Casey")

**Demographics:** 22–38 years old. Electronic music performer/DJ.  
**Platform:** Windows laptop or macOS. Performance-grade hardware.  
**Experience:** Moderate to advanced. Ableton Live user primarily.

**Goals:**
- Reliable, crash-free live performance
- Low-latency MIDI/audio triggering
- Flexible clip launching and scene management
- Hardware controller integration (Launchpad, Push, APC40)

**Pain Points:**
- Laptop crashes mid-performance are catastrophic
- MIDI controller mapping is complex and non-persistent
- CPU spikes cause audio dropouts during performance

**AUDIAW Design Implications:**
- Live Performance Mode with crash protection (audio engine continues even if UI crashes)
- CPU protection mode (limit background processing during performance)
- Hardware controller mapping with persistence and MIDI learn
- Emergency "safe mode" that loads only essential plugins
- Visual feedback mode for audience-facing displays

### 1.3.6 Persona: The Sound Designer ("River")

**Demographics:** 25–40 years old. Game audio, film audio, ambient/experimental music.  
**Platform:** Any — macOS, Windows, or Linux.  
**Experience:** Advanced. Modular synthesis background.

**Goals:**
- Complex modulation routing
- Advanced synthesis (granular, spectral, physical modeling)
- Non-linear workflow — exploration over destination
- Deep parameter automation and modulation

**Pain Points:**
- Most DAWs not designed for exploratory, non-linear workflows
- Modulation routing limited compared to hardware modular systems
- Granular and spectral tools absent or primitive in most DAWs

**AUDIAW Design Implications:**
- Modular routing system with visual connection interface
- Granular and wavetable synthesis as first-class built-in instruments
- LFO/envelope/random modulator routing to any automatable parameter
- Non-destructive audio processing chain
- Macro controls for complex parameter control

### 1.3.7 Persona: The Film Composer ("Sam")

**Demographics:** 28–50 years old. Film, TV, game music composition.  
**Platform:** macOS primarily. Large workstation.  
**Experience:** Professional. Often works in Logic Pro or Cubase.

**Goals:**
- Large template projects (100+ tracks, mostly virtual instruments)
- Score/notation integration
- Video sync with timecode
- Sample library streaming (large orchestral libraries)

**Pain Points:**
- Logic is macOS-only
- Cubase expensive
- No Linux option
- Large template load times (5+ minutes) are unacceptable

**AUDIAW Design Implications:**
- Video import and sync with SMPTE timecode support
- Large project performance optimization (sample streaming, lazy instrument loading)
- Template partial-loading (load instruments on demand)
- Score/notation view (v2.0 roadmap)
- VEP7 / Vienna Ensemble Pro integration via plugin

### 1.3.8 Persona: The Podcast Creator ("Alex P.")

**Demographics:** 25–50 years old. Independent podcaster or radio producer.  
**Platform:** Any — often macOS or Windows.  
**Experience:** Low to moderate production experience. Not a musician.

**Goals:**
- Record interviews (multi-track)
- Basic noise reduction and voice cleanup
- Normalize loudness (LUFS standards for podcast platforms)
- Quick editing (remove umms, pauses)
- Export to multiple podcast formats

**Pain Points:**
- Music DAWs are overwhelming for podcast workflows
- Most podcast editors lack professional audio quality tools
- Multi-track recording interface designed for music, not speech

**AUDIAW Design Implications:**
- Podcast mode: simplified UI layout hiding music-production-specific elements
- Integrated noise reduction plugin
- LUFS loudness normalization on export
- Ripple delete (remove section and close gap)
- Transcript-based editing (v2.0 roadmap via integration)

---

## 1.4 Workflow Goals

### 1.4.1 Beginner Workflow Simplicity

**First Launch Experience:**

The first-run experience must convert a confused newcomer into an engaged user within 10 minutes. This is achieved through:

1. **Template Selection Screen:** On first launch, the user sees a visually rich template gallery. Genres (Trap, Pop, Lo-fi, EDM, Rock, Podcast, etc.) are represented with visual artwork. Each template loads with all instruments pre-configured, a basic beat pattern, and reference material.

2. **Interactive Tutorial Overlay:** After loading a template, a non-blocking tutorial overlay highlights key areas: "This is your Arrangement View," "These are your tracks," "Press Space to play." The overlay is dismissible at any time and never mandatory.

3. **Smart Defaults:** AUDIAW auto-detects audio hardware and selects appropriate buffer size for the device (higher buffer for integrated audio, lower for dedicated audio interfaces). No audio configuration required to make the first sound.

4. **Contextual Help:** Every UI area has a right-click "What is this?" option that opens an inline explanation panel — not a browser link, not a PDF manual. Inline, contextual, dismissible.

**Complexity Ladder:**

Beginners should be able to grow within AUDIAW from "making first beats" to "professional mixing" without switching tools. The complexity ladder:

- **Level 1 (Week 1):** Load template, add notes in piano roll, export audio. Uses: arrangement view, piano roll, basic instruments.
- **Level 2 (Month 1):** Add more instruments, basic effects (EQ, reverb, compression), organize tracks. Uses: mixer, effect chains, basic automation.
- **Level 3 (Month 3):** Advanced routing, sidechain compression, complex automation, mixing for release. Uses: send/return routing, metering, advanced automation.
- **Level 4 (Year 1):** Plugin ecosystem, modulation routing, mastering chain, live performance. Uses: full DAW feature set.

Each level's features are accessible from the beginning but don't compete for attention until the user is ready for them.

### 1.4.2 Professional Workflow Depth

Power users require:

**Speed at Scale:** Loading a 100-track project should take under 15 seconds. Navigation across a 50-minute arrangement should be instantaneous. Switching between arrangement and mixer should be a single keypress with < 100ms visual transition.

**Keyboard-First:** Every action a professional performs dozens of times per hour must be achievable without a mouse. This includes: record/play/stop, undo/redo, zoom in/out, track mute/solo, plugin open/close, clip loop/unloop, quantize, nudge, transpose.

**Template Power:** Professional templates should support 50–150 instrument tracks pre-configured with routing, naming, color coding, and gain staging. Template load time must be under 10 seconds even for large orchestral templates.

**Routing Flexibility:** The routing system must support Pro Tools-level flexibility: arbitrary send/return configurations, complex sidechain networks, hardware inserts, multi-output instruments, and parallel processing chains.

**Zero-Configuration Professional Mode:** A "professional mode" setting switches the default UI to high-density, keyboard-optimized, monochrome-friendly layout without requiring individual setting changes.

---

## 1.5 Product Strategy

### 1.5.1 Plugin Ecosystem Strategy

**Phase 1 (v1.0 — Foundation):** Built-in instruments and effects adequate for professional use. This eliminates the "blank canvas" problem for new users. The built-in library must include:
- Sampler (multi-layer, with sample library)
- Drum machine (step sequencer + sample engine)
- Wavetable synthesizer
- FM synthesizer
- Subtractive synthesizer
- Granular synthesizer
- Essential FX: EQ, Compressor, Limiter, Reverb, Delay, Chorus, Saturation, Spectrum Analyzer, Metering

**Phase 2 (v1.5 — Third-Party Integration):** Full VST3/CLAP/AU/LV2 plugin hosting. Plugin scanning, crash isolation, validation. This opens the DAW to the existing commercial and free plugin ecosystem (Vital, Surge XT, dexed, etc.).

**Phase 3 (v2.0 — Community Marketplace):** AUDIAW Plugin SDK allows community-developed instruments and effects. A curated plugin browser/marketplace (no revenue extraction) surfaces high-quality community plugins. Featured, reviewed, safety-validated.

### 1.5.2 Community Strategy

AUDIAW's community is built on **three concentric circles:**

1. **Users:** Producers, engineers, and musicians who use AUDIAW. Engaged through Discord, Reddit, official forums, and tutorial ecosystem. Rewarded with templates, presets, and sample packs.

2. **Contributors:** Developers, designers, and documenters who improve AUDIAW. Rewarded with Contributor badge, changelog credit, and recognition. Supported through comprehensive onboarding docs and a "Good First Issue" queue always containing 20+ labeled issues.

3. **Maintainers:** Senior contributors with merge authority and architectural decision rights. Selected by existing maintainers based on sustained contribution quality. Compensated through GitHub Sponsors program (if applicable) and community governance participation.

### 1.5.3 Long-Term Ecosystem Goals

**3-Year Goals:**
- 500,000+ active users
- 100+ core contributors
- 1,000+ community plugins
- Commercially viable plugin marketplace (optional paid plugins listed, no fee from AUDIAW)
- Hardware manufacturer partnerships (native MIDI controller profiles for major controllers)

**5-Year Goals:**
- 2,000,000+ active users
- Foundation-backed development model (similar to VLC/Blender)
- Professional services ecosystem (paid support, training, customization)
- Academic partnerships for music education
- Industry standard for Linux professional audio

---

## 1.6 Risk Analysis

### 1.6.1 Technical Risks

**Risk: Tauri/Web Technology UI Performance**
- *Concern:* Web-based UIs can exhibit jank, high memory usage, and inconsistent performance on low-end hardware
- *Mitigation:* WGPU-accelerated waveform rendering bypasses DOM entirely for performance-critical displays. React rendering is virtualized. IPC communication is batched and rate-limited. Strict frame budget enforcement with fallback to reduced-quality rendering.
- *Severity:* HIGH — must be continuously benchmarked
- *Monitoring:* Automated UI frame rate regression tests in CI

**Risk: Realtime Audio Safety Violations**
- *Concern:* Accidentally performing non-realtime-safe operations in the audio callback (memory allocation, mutex contention, syscalls) causing audio dropouts
- *Mitigation:* Linter rules for the audio thread (custom Clippy lints). Lock-free data structures throughout audio path. Realtime thread auditing in CI via LLVM sanitizer build.
- *Severity:* CRITICAL — causes audible failures in user sessions
- *Monitoring:* `realtime-sanitizer` build in CI. Manual audio thread audit on every PR that touches audio code.

**Risk: Plugin Crash Propagation**
- *Concern:* Despite sandboxing, a plugin crash or deadlock could affect the audio engine
- *Mitigation:* Plugins run in separate processes connected via shared memory. Plugin host process has watchdog timer. If plugin process becomes unresponsive, it is terminated and replaced with silence (not crash of host).
- *Severity:* HIGH
- *Monitoring:* Plugin crash injection tests in CI

**Risk: Cross-Platform Audio Driver Incompatibility**
- *Concern:* ASIO, CoreAudio, WASAPI, ALSA, JACK, PipeWire all have different behaviors, latency profiles, and failure modes
- *Mitigation:* CPAL abstraction layer. Platform-specific test matrix. Hardware-in-loop testing for each supported OS.
- *Severity:* MEDIUM
- *Monitoring:* Hardware test lab with representative audio interfaces on each platform

**Risk: ARM64 SIMD Optimization Gap**
- *Concern:* SSE/AVX SIMD code paths are x64-only; ARM64 NEON paths may be less optimized
- *Mitigation:* SIMD abstraction layer. Performance benchmark matrix for x64 and ARM64. Explicit ARM64 optimization sprints before each release.
- *Severity:* MEDIUM
- *Monitoring:* CPU benchmark suite in CI for both architectures

### 1.6.2 Product Risks

**Risk: Feature Creep Leading to Complexity**
- *Concern:* Open-source projects often accumulate features without removing complexity, leading to the "Swiss Army knife with no grip" problem
- *Mitigation:* Feature acceptance criteria require explicit UX impact assessment. A "Complexity Budget" — every new feature added to the default workspace must justify its cognitive cost.
- *Severity:* MEDIUM (long-term existential risk to product quality)

**Risk: Plugin Format Obsolescence**
- *Concern:* VST3 could be abandoned by Steinberg. CLAP is new and unproven at scale. AU is Apple-platform-only.
- *Mitigation:* Plugin hosting abstracted behind a common interface. New format support can be added as a crate without modifying core. CLAP is prioritized as the native format for built-in instruments.
- *Severity:* LOW (slow-moving risk)

---

# 2. COMPLETE APPLICATION ARCHITECTURE DOCUMENT

## 2.1 Architectural Overview

AUDIAW is a **hybrid native/web application** built on the Tauri framework. The architecture separates concerns into two primary domains:

- **The Audio Substrate:** Written in Rust. Handles all realtime audio processing, DSP, plugin hosting, project state, and file I/O. This is the "engine" of the DAW.
- **The UI Surface:** Written in TypeScript/React. Handles all user interface rendering, interaction, and visual presentation. This is the "face" of the DAW.

These two domains communicate via a **structured IPC bridge** — a typed, versioned message-passing system that ensures clean separation of concerns.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        AUDIAW APPLICATION                           │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                     UI SURFACE (WebView)                     │    │
│  │                                                              │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │    │
│  │  │  React UI    │  │  State Mgmt  │  │  WGPU Renderer   │   │    │
│  │  │  (SolidJS)   │  │  (Zustand)   │  │  (Canvas/WASM)   │   │    │
│  │  └──────┬───────┘  └──────┬───────┘  └──────────────────┘   │    │
│  │         │                 │                                   │    │
│  │         └────────┬────────┘                                   │    │
│  │                  │                                             │    │
│  │          ┌───────▼───────┐                                    │    │
│  │          │  IPC Bridge   │◄──── Typed Commands/Events         │    │
│  │          └───────┬───────┘                                    │    │
│  └──────────────────┼────────────────────────────────────────────┘    │
│                     │  Tauri IPC Layer                                 │
│  ┌──────────────────┼────────────────────────────────────────────┐    │
│  │                  ▼           RUST BACKEND                      │    │
│  │  ┌─────────────────────────────────────────────────────────┐   │    │
│  │  │                   Application Core                       │   │    │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │   │    │
│  │  │  │ Project  │  │Settings  │  │ Command  │  │ Event  │  │   │    │
│  │  │  │ Manager  │  │ Manager  │  │ Processor│  │  Bus   │  │   │    │
│  │  │  └──────────┘  └──────────┘  └──────────┘  └────────┘  │   │    │
│  │  └─────────────────────────────────────────────────────────┘   │    │
│  │                                                                  │    │
│  │  ┌─────────────────────────────────────────────────────────┐   │    │
│  │  │                   Audio Engine                           │   │    │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │   │    │
│  │  │  │  Audio   │  │  DSP     │  │  Plugin  │  │  MIDI  │  │   │    │
│  │  │  │  Graph   │  │  Proc.   │  │  Host    │  │  Engine│  │   │    │
│  │  │  └──────────┘  └──────────┘  └──────────┘  └────────┘  │   │    │
│  │  └─────────────────────────────────────────────────────────┘   │    │
│  │                                                                  │    │
│  │  ┌─────────────────────────────────────────────────────────┐   │    │
│  │  │                  Platform Abstraction                    │   │    │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │   │    │
│  │  │  │  CPAL    │  │  File    │  │  MIDI    │  │ Diag.  │  │   │    │
│  │  │  │  Audio   │  │  System  │  │  I/O     │  │  Sys.  │  │   │    │
│  │  │  └──────────┘  └──────────┘  └──────────┘  └────────┘  │   │    │
│  │  └─────────────────────────────────────────────────────────┘   │    │
│  └──────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

## 2.2 Monorepo Architecture

AUDIAW uses a **cargo workspace + pnpm workspace** monorepo structure. The repository is designed so that:

1. Rust backend crates can be developed and tested independently
2. The frontend can be developed against a mock backend (no audio hardware required)
3. Platform-specific code is isolated in platform crates
4. Shared data types are defined once and used by both Rust and TypeScript via code generation

### 2.2.1 Repository Root Structure

```
audiaw/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                    # Main CI: lint, test, build
│   │   ├── release.yml               # Release build and packaging
│   │   ├── nightly.yml               # Nightly performance benchmarks
│   │   ├── plugin-compat.yml         # Plugin compatibility matrix test
│   │   └── security-audit.yml        # cargo audit + npm audit
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug-report.yml
│   │   ├── feature-request.yml
│   │   └── audio-glitch-report.yml   # Specialized audio issue template
│   └── PULL_REQUEST_TEMPLATE.md
│
├── apps/
│   ├── desktop/                      # Tauri desktop application
│   │   ├── src-tauri/                # Tauri Rust bridge code
│   │   │   ├── src/
│   │   │   │   ├── main.rs           # Tauri entry point
│   │   │   │   ├── commands/         # IPC command handlers
│   │   │   │   ├── events/           # IPC event emitters
│   │   │   │   └── setup.rs          # App initialization
│   │   │   ├── Cargo.toml
│   │   │   └── tauri.conf.json
│   │   └── src/                      # React/TypeScript frontend
│   │       ├── app/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── stores/
│   │       ├── views/
│   │       └── workers/
│   │
│   └── cli/                          # Command-line tools (diagnostics, etc.)
│       └── src/
│           └── main.rs
│
├── crates/
│   ├── audiaw-engine/                # Core audio engine (no platform deps)
│   │   ├── src/
│   │   │   ├── lib.rs
│   │   │   ├── graph/                # Audio graph implementation
│   │   │   ├── dsp/                  # DSP algorithms
│   │   │   ├── scheduler/            # Realtime scheduler
│   │   │   ├── midi/                 # MIDI processing
│   │   │   └── transport/            # Transport/timeline
│   │   └── Cargo.toml
│   │
│   ├── audiaw-audio-io/              # Platform audio I/O (CPAL-based)
│   │   ├── src/
│   │   │   ├── lib.rs
│   │   │   ├── asio/                 # Windows ASIO
│   │   │   ├── coreaudio/            # macOS CoreAudio
│   │   │   ├── wasapi/               # Windows WASAPI
│   │   │   ├── alsa/                 # Linux ALSA
│   │   │   ├── jack/                 # JACK (Linux/macOS)
│   │   │   └── pipewire/             # PipeWire (Linux)
│   │   └── Cargo.toml
│   │
│   ├── audiaw-plugin-host/           # VST3/CLAP/AU/LV2 plugin hosting
│   │   ├── src/
│   │   │   ├── lib.rs
│   │   │   ├── vst3/
│   │   │   ├── clap/
│   │   │   ├── au/
│   │   │   ├── lv2/
│   │   │   ├── sandbox/              # Plugin process isolation
│   │   │   └── scan/                 # Plugin scanner
│   │   └── Cargo.toml
│   │
│   ├── audiaw-project/               # Project file format & serialization
│   │   ├── src/
│   │   │   ├── lib.rs
│   │   │   ├── format/               # File format spec
│   │   │   ├── migration/            # Version migration
│   │   │   └── autosave/
│   │   └── Cargo.toml
│   │
│   ├── audiaw-instruments/           # Built-in instruments
│   │   ├── src/
│   │   │   ├── lib.rs
│   │   │   ├── sampler/
│   │   │   ├── drum_machine/
│   │   │   ├── wavetable/
│   │   │   ├── fm_synth/
│   │   │   └── granular/
│   │   └── Cargo.toml
│   │
│   ├── audiaw-effects/               # Built-in effects
│   │   ├── src/
│   │   │   ├── lib.rs
│   │   │   ├── eq/
│   │   │   ├── dynamics/
│   │   │   ├── reverb/
│   │   │   ├── delay/
│   │   │   └── modulation/
│   │   └── Cargo.toml
│   │
│   ├── audiaw-render/                # GPU waveform rendering (WGPU)
│   │   ├── src/
│   │   │   ├── lib.rs
│   │   │   ├── waveform/
│   │   │   ├── spectrum/
│   │   │   └── metering/
│   │   └── Cargo.toml
│   │
│   ├── audiaw-midi/                  # MIDI I/O abstraction
│   │   └── src/
│   │
│   ├── audiaw-types/                 # Shared data types (Rust)
│   │   └── src/
│   │
│   └── audiaw-diagnostics/           # System diagnostics
│       └── src/
│
├── packages/
│   ├── ui-components/                # Shared React component library
│   ├── icons/                        # Icon system (SVG + React components)
│   ├── theme/                        # Design tokens and theme system
│   ├── ipc-types/                    # TypeScript types for IPC (generated)
│   └── audio-worklet/                # Web Audio API workers (if needed)
│
├── tools/
│   ├── codegen/                      # Type generation (Rust → TypeScript)
│   ├── benchmark/                    # Performance benchmark harness
│   ├── plugin-validator/             # Plugin validation tool
│   └── release/                      # Release automation scripts
│
├── docs/
│   ├── architecture/                 # Architecture documents (this file)
│   ├── contributing/                 # Contributor guides
│   ├── user-guide/                   # End-user documentation
│   ├── api/                          # API reference (generated)
│   └── specs/                        # Technical specifications
│
├── tests/
│   ├── integration/                  # Cross-crate integration tests
│   ├── audio-regression/             # DSP regression test suite
│   ├── plugin-compat/                # Plugin compatibility tests
│   └── performance/                  # Performance regression tests
│
├── assets/
│   ├── samples/                      # Bundled sample library
│   ├── presets/                      # Default presets
│   ├── templates/                    # Project templates
│   └── icons/                        # Application icons (platform formats)
│
├── Cargo.toml                        # Workspace Cargo manifest
├── Cargo.lock
├── package.json                      # pnpm workspace root
├── pnpm-workspace.yaml
├── turbo.json                        # Turborepo build orchestration
├── rust-toolchain.toml               # Pinned Rust toolchain version
└── README.md
```

## 2.3 Frontend/Backend Separation

The frontend and backend have a **clean contract boundary** enforced through the IPC layer. The key design principle is:

> **The frontend never touches audio state directly. The backend never touches rendering directly.**

This separation has significant implications:

**Frontend responsibilities:**
- All visual rendering and UI state
- User input interpretation (mouse, keyboard, touch)
- Visual representation of audio state (received via events)
- UI-level undo/redo for non-audio actions (UI preferences, view configurations)
- Local settings management (window positions, theme, zoom levels)

**Backend responsibilities:**
- All audio processing
- Project state (tracks, clips, automation, routing)
- Plugin management and communication
- File I/O (project load/save, sample streaming)
- Transport control (play, record, stop, loop)
- MIDI routing and processing

**Shared contract:**
All IPC messages are defined in a shared schema (`docs/specs/ipc-schema.json`) from which both the Rust command handlers and TypeScript client types are generated. This ensures type safety across the language boundary and provides a single source of truth for the API surface.

## 2.4 IPC Communication Architecture

AUDIAW uses Tauri's IPC system with a custom typed wrapper layer. IPC communication falls into two categories:

### 2.4.1 Commands (Frontend → Backend)

Commands are synchronous request-response patterns. The frontend sends a command and waits for a result:

```typescript
// TypeScript (generated from schema)
const result = await invoke<TrackState>('add_track', {
  projectId: project.id,
  trackType: TrackType.Audio,
  insertAfter: selectedTrackId,
});
```

```rust
// Rust command handler
#[tauri::command]
async fn add_track(
    state: State<'_, AppState>,
    project_id: ProjectId,
    track_type: TrackType,
    insert_after: Option<TrackId>,
) -> Result<TrackState, AudiowError> {
    state.engine.lock().await
        .project_manager
        .add_track(project_id, track_type, insert_after)
        .await
}
```

Commands are categorized by their domain:
- `project_*` — Project management (new, open, save, etc.)
- `track_*` — Track operations (add, remove, rename, reorder)
- `clip_*` — Clip operations (add, move, resize, copy, delete)
- `transport_*` — Transport control (play, stop, record, seek)
- `audio_device_*` — Audio hardware management
- `plugin_*` — Plugin management (scan, load, unload, get params)
- `automation_*` — Automation editing
- `mixer_*` — Mixer routing and levels

### 2.4.2 Events (Backend → Frontend)

Events are asynchronous, backend-initiated notifications. They flow on a separate channel from commands and are never blocked by UI processing:

```rust
// Rust event emission
app_handle.emit_all("audio:level_meters", LevelMeterEvent {
    channels: meter_values,
    timestamp_samples: current_sample_position,
})?;
```

```typescript
// TypeScript event listener
listen<LevelMeterEvent>('audio:level_meters', (event) => {
  meterStore.update(event.payload);
});
```

**Event categories by rate:**

| Event | Rate | Priority | Notes |
|---|---|---|---|
| `audio:level_meters` | 60 Hz | Normal | Metering display |
| `audio:playhead_position` | 60 Hz | Normal | Timeline cursor |
| `audio:waveform_ready` | On demand | Normal | Waveform render complete |
| `audio:dropout_detected` | On event | HIGH | Audio glitch notification |
| `project:autosave_complete` | On event | Low | Background autosave notification |
| `plugin:crashed` | On event | HIGH | Plugin crash notification |
| `transport:play_state_changed` | On event | HIGH | Play/pause/record state |
| `audio:latency_report` | 1 Hz | Low | Latency monitoring |

**Event batching:** High-frequency events (meters, playhead) are batched in Rust and sent as arrays. The frontend processes these batches in a `requestAnimationFrame` loop, decoupling event receipt from rendering.

## 2.5 State Management Architecture

### 2.5.1 The Two-Layer State Model

AUDIAW maintains two distinct state trees:

**Layer 1: Authoritative State (Rust backend)**
- Project state: all tracks, clips, automation, routing, plugin parameters
- Transport state: play position, loop range, tempo, time signature
- Audio device state: current device, sample rate, buffer size
- Undo/redo history

**Layer 2: UI Shadow State (TypeScript frontend)**
- Mirror of the authoritative state, kept in sync via events
- UI-only state: selected tracks, expanded panels, scroll positions, zoom levels
- Visual state: hover states, drag state, selection state
- Cache state: waveform thumbnail cache, plugin thumbnail cache

**Why this model?**

The alternative — keeping authoritative state in the frontend — would require the frontend to be the source of truth for audio processing decisions, creating complex synchronization problems. The Rust-authoritative model ensures the audio engine is never waiting on the UI, and the UI can reconstruct its state from scratch by querying the backend (important for crash recovery and hot-reload during development).

### 2.5.2 Frontend State Management (Zustand)

The frontend uses Zustand with a domain-sliced store architecture:

```typescript
// stores/project.ts
interface ProjectSlice {
  tracks: Track[];
  clips: Clip[];
  selectedTrackIds: Set<TrackId>;
  playheadPosition: SamplePosition;
  tempo: number;
  actions: {
    selectTrack: (id: TrackId, modifier: SelectionModifier) => void;
    setPlayheadPosition: (pos: SamplePosition) => void;
    // ... UI actions only
  };
}
```

State updates from backend events flow through a dedicated **sync layer** that translates backend events into store mutations:

```typescript
// sync/project-sync.ts
class ProjectSyncManager {
  constructor(private store: ProjectStore) {
    listen<TrackStateChangedEvent>('project:track_state_changed', (e) => {
      this.store.getState().syncTrackState(e.payload);
    });
    // ...
  }
}
```

This layer is the only place where backend events modify the store, creating a single audit trail for state changes.

## 2.6 GPU Rendering Pipeline

AUDIAW uses a **hybrid rendering model**: the DOM handles standard UI elements, while WGPU (via wasm-bindgen or native integration) handles performance-critical audio visualizations.

### 2.6.1 What Renders in WGPU

- **Waveform views in the arrangement view:** Rendering thousands of waveform thumbnails at 60 fps would overwhelm the DOM. WGPU renders waveforms as GPU-accelerated geometry.
- **Piano roll MIDI events:** Dense piano rolls with thousands of MIDI notes require GPU rendering for smooth zoom and scroll.
- **Spectrum analyzer:** Real-time 1024-point FFT spectrum visualization at 60 fps requires GPU rendering.
- **Level meters:** Numerically computed, aesthetically refined metering bars.

### 2.6.2 WGPU Rendering Architecture

```
Audio Engine
    │
    │  (waveform data, MIDI events, spectrum data)
    ▼
WGPU Render Manager (Rust, runs in render thread)
    │
    │  Maintains:
    │  - Waveform mipmap texture atlas
    │  - MIDI event vertex buffers
    │  - Spectrum FFT ping-pong buffers
    │
    ▼
GPU Command Encoder
    │
    │  Per-frame:
    │  1. Update dirty regions (new audio recorded, zoom changed)
    │  2. Build render pass (camera matrices from UI state)
    │  3. Submit draw calls
    │
    ▼
Swap Chain → Screen
```

**Waveform texture atlas:** Waveform data is pre-computed at multiple zoom levels (mipmapped) and stored in a GPU texture atlas. Zoom-level changes are instantaneous because the appropriate mip level is already resident in GPU memory. New audio data triggers asynchronous mip generation.

### 2.6.3 Rendering Thread Architecture

```
Main Thread
├── Tauri event loop
├── IPC command processing
└── UI event routing

Render Thread
├── WGPU command encoding
├── Frame synchronization
└── Dirty region management

Audio Thread (highest priority)
├── Audio callback execution
├── DSP graph processing
└── Plugin process communication

Background Threads
├── Waveform mip generation
├── Disk streaming
├── Autosave
├── Plugin scanning
└── Sample library indexing
```

Thread priorities on each platform:
- **Audio thread:** `THREAD_PRIORITY_TIME_CRITICAL` (Windows), `SCHED_FIFO` (Linux), `THREAD_TIME_CONSTRAINT_POLICY` (macOS)
- **Render thread:** `THREAD_PRIORITY_ABOVE_NORMAL` / `SCHED_RR`
- **Main thread:** Normal
- **Background threads:** `THREAD_PRIORITY_BELOW_NORMAL` / `SCHED_IDLE`

## 2.7 Memory Architecture

### 2.7.1 Memory Budgets

| Component | Budget | Rationale |
|---|---|---|
| Application baseline (no project) | 80 MB | Tauri WebView + Rust runtime |
| UI layer (project open, 32 tracks) | +40 MB | React tree + DOM + styles |
| Audio engine (32 tracks, no samples) | +20 MB | Graph, scheduler, MIDI buffers |
| Waveform texture atlas | +50 MB | GPU-resident, varies by zoom |
| Plugin hosting runtime | +10 MB per plugin | Shared memory channels |
| Sample streaming buffers | +32 MB | Fixed ring buffer pool |
| Undo history (50 steps) | +20 MB | Differential state snapshots |
| **Total (typical session)** | **~350 MB** | Well within 8 GB system budget |

### 2.7.2 Realtime Memory Safety

The audio callback must NEVER allocate memory from the system allocator. All memory used in the audio path is pre-allocated:

- **Audio buffer pool:** Fixed set of pre-allocated audio buffers. The scheduler assigns buffers from the pool at the start of each audio callback. Buffers are returned at the end.
- **DSP node state:** All DSP node state (filter coefficients, delay lines, etc.) is allocated when the node is created, not during processing.
- **Lock-free queues:** Parameter updates from the UI are delivered via lock-free SPSC (single-producer, single-consumer) ring buffers. No mutex is ever held in the audio callback.

```rust
// Custom realtime-safe allocator (audio thread only)
struct RtAllocator {
    pool: Arc<MemoryPool>,
}

impl RtAllocator {
    fn alloc_buffer(&self, frames: usize, channels: usize) -> RtBuffer {
        // Returns pre-allocated buffer from pool
        // PANICS in debug if pool is exhausted (development signal)
        // Returns silence buffer in release if pool exhausted (safety)
        self.pool.acquire(frames, channels)
    }
}
```

## 2.8 Serialization Systems

AUDIAW uses **MessagePack** (via `rmp-serde`) for all IPC communication and project file serialization. MessagePack was chosen over JSON for:

- 2–5x smaller payload size (important for frequent meter events)
- Faster serialization/deserialization
- Binary-native (no string escaping for audio data)
- Still human-readable with `msgpack-inspect` tools

Project files use a **layered serialization system** (described in detail in Document 9) with MessagePack for the binary envelope and a version-tagged schema for compatibility management.

## 2.9 Logging & Diagnostics Systems

### 2.9.1 Logging Architecture

AUDIAW uses a structured logging system with separate concerns for different environments:

```
Log Levels:
  TRACE  — Audio thread instrumentation (disabled in release builds)
  DEBUG  — Development diagnostics
  INFO   — Normal operation events (project load, save, device change)
  WARN   — Recoverable issues (plugin timeout, buffer underrun)
  ERROR  — Failed operations (plugin crash, file read failure)
  FATAL  — Unrecoverable errors (audio engine failure)
```

Logs are written to:
- Platform log directory (rotating, max 50 MB)
- In-app diagnostic panel (last 1000 lines)
- Crash reporter (ERROR + FATAL only, with user consent)

Audio thread logs are **never written synchronously.** Log entries are placed in a lock-free ring buffer by the audio thread and flushed by a background thread.

### 2.9.2 Crash Recovery

On startup, AUDIAW checks for crash indicator files. If found:
1. User is offered to restore the last autosave
2. A crash report is generated with anonymized session info
3. The crash report is offered to the user for review before any telemetry

Crash recovery data includes:
- Project state at time of crash (from last autosave)
- Panic backtrace
- Platform diagnostics (OS, audio driver, hardware)
- Loaded plugins at time of crash
- Last 100 IPC commands executed

---

# 3. AUDIO ENGINE MASTER DESIGN DOCUMENT

## 3.1 Audio Engine Philosophy

The AUDIAW audio engine is designed around a single governing principle: **No compromise in the audio path.**

This means:
- Every design decision that affects the audio path is evaluated against realtime safety first, then performance, then maintainability.
- The audio callback budget is sacred. Audio processing must complete within the buffer period. If it cannot, silence is produced. Never garbage, never crashes.
- The audio engine is a **separate concern** from the application. It can be operated without the UI (for headless rendering), without the project manager (for testing), and without plugins (for baseline testing).

## 3.2 DSP Graph Architecture

AUDIAW's audio engine is organized as a **directed acyclic processing graph** (with controlled cycle support for feedback loops). Each node in the graph represents a processing unit: an instrument, an effect, a mixer channel, a send, or a hardware I/O.

### 3.2.1 Graph Node Types

```
AudioNode trait
├── SourceNode          — Generates audio (instruments, audio clips)
│   ├── SamplerNode
│   ├── InstrumentPluginNode
│   ├── AudioClipNode
│   └── SynthNode (wavetable, FM, granular, etc.)
│
├── ProcessorNode       — Transforms audio (effects, mixer channels)
│   ├── EffectChainNode
│   ├── MixerChannelNode
│   ├── PluginEffectNode
│   └── BuiltinEffectNode (EQ, Comp, Reverb, etc.)
│
├── RouterNode          — Routes audio without modification
│   ├── SplitterNode    — 1 input → N outputs
│   ├── MergerNode      — N inputs → 1 output (summing)
│   ├── SendNode        — Copy signal to aux bus
│   └── ReturnNode      — Receive signal from aux bus
│
└── SinkNode            — Consumes audio (hardware output, render output)
    ├── HardwareOutputNode
    ├── BusOutputNode
    └── RenderOutputNode
```

### 3.2.2 Graph Evaluation Algorithm

The audio graph is evaluated using a **topological sort** computed on the main thread when the graph changes. The sorted evaluation order is then safely communicated to the audio thread via an atomic pointer swap (lock-free).

```rust
pub struct AudioGraph {
    nodes: SlotMap<NodeId, Box<dyn AudioNode>>,
    edges: HashMap<NodeId, Vec<NodeId>>,    // adjacency list
    eval_order: ArcSwap<Vec<NodeId>>,       // atomically swappable eval order
}

impl AudioGraph {
    /// Called on main thread when topology changes
    pub fn recompute_eval_order(&self) {
        let new_order = topological_sort(&self.nodes, &self.edges);
        self.eval_order.store(Arc::new(new_order));
    }
    
    /// Called in audio callback — MUST be realtime safe
    pub fn process(&self, context: &mut AudioContext) {
        let order = self.eval_order.load();
        for node_id in order.iter() {
            if let Some(node) = self.nodes.get(*node_id) {
                node.process(context);
            }
        }
    }
}
```

**Why topological sort?** The processing order must respect data dependencies: a reverb effect on a track must process after the track's instrument has generated audio. Topological sort produces a valid linear ordering of nodes that respects all edge dependencies.

**Why atomic pointer swap?** When the user adds a track, the graph topology changes. We cannot stop the audio thread to recompute the evaluation order. Instead, we compute the new order on the main thread and atomically swap the pointer. The audio thread always works with a consistent snapshot of the evaluation order.

**Cycle detection:** Pure cycles (A → B → A) are invalid in the audio graph. AUDIAW detects cycles at graph modification time and rejects the change. **Feedback cycles** (for physical modeling, convolution, etc.) are handled via dedicated feedback delay nodes that introduce a one-buffer delay, breaking the cycle for evaluation purposes.

### 3.2.3 Node Processing Contract

Every AudioNode must implement the following contract:

```rust
pub trait AudioNode: Send {
    /// Called once when node is added to graph. May allocate.
    fn initialize(&mut self, config: &AudioConfig) -> Result<(), AudioError>;
    
    /// Called in audio callback. MUST be realtime-safe.
    /// - NO heap allocation
    /// - NO mutex acquisition  
    /// - NO blocking I/O
    /// - NO floating point exception (must validate NaN/Inf on debug builds)
    fn process(&mut self, context: &mut NodeContext) -> ProcessResult;
    
    /// Called when graph is stopped. May block.
    fn shutdown(&mut self);
    
    /// Receive parameter update from UI. MUST be realtime-safe.
    fn receive_param_update(&mut self, update: ParamUpdate);
    
    /// Receive MIDI event. MUST be realtime-safe.
    fn receive_midi(&mut self, event: MidiEvent);
    
    /// Provide parameter info for automation/UI binding.
    fn param_info(&self) -> &[ParamInfo];
    
    /// Unique identifier for this node type (used in serialization)
    fn type_id(&self) -> NodeTypeId;
}
```

The `NodeContext` provides the node with:
- Input audio buffers (read-only views of connected node outputs)
- Output audio buffers (pre-allocated, write-only)
- Current sample position
- Buffer size
- Sample rate
- Reference to the realtime allocator
- MIDI event list for this buffer period

### 3.2.4 Audio Bus Architecture

```
AUDIAW Mixer Bus Architecture

Instrument Tracks               Audio Tracks
     │                               │
     │  pre-fader sends              │  pre-fader sends
     ├──────────────────────────────►│
     │                               │
     ▼                               ▼
Track Insert Effects           Track Insert Effects
     │                               │
     ▼                               ▼
Track Fader/Pan                Track Fader/Pan
     │                               │
     │  post-fader sends             │  post-fader sends
     ├──────────────────────────────►│
     │                               │
     └────────────┬──────────────────┘
                  │
                  ▼
           Group/Bus Channels
                  │
                  ├──► Sidechain Buses
                  │
                  ▼
           Master Bus
                  │
                  ▼
           Master Effects Chain
                  │
                  ▼
         Hardware Output(s)
```

**Bus types:**
- **Track Channel:** One per audio/instrument track. Handles insert effects, fader, pan, sends.
- **Group Bus:** Aggregation bus for multiple tracks. Standard for drum bus, submix groups.
- **FX Return Bus:** Receives from multiple send buses. Standard for reverb and delay returns.
- **Sidechain Bus:** Special routing for dynamics sidechain inputs. Named and addressed by id.
- **Master Bus:** Final output bus. Master effects chain applied here.
- **Hardware I/O Bus:** Represents a physical audio device channel. Can be used for hardware inserts.

## 3.3 Realtime Systems

### 3.3.1 Lock-Free Threading Model

The audio thread communicates with all other threads **exclusively through lock-free data structures**. This is non-negotiable for realtime audio.

**Parameter Updates (UI → Audio):**

```rust
/// Lock-free SPSC ring buffer for parameter updates
pub struct ParamUpdateQueue {
    ring: RingBuffer<ParamUpdate, 4096>,
    // 4096 slots = sufficient for all params in a typical session
}

// UI thread:
queue.producer().push(ParamUpdate {
    node_id,
    param_id,
    value: ParamValue::Float(0.5),
    sample_offset: transport.current_sample(),
});

// Audio thread (in callback):
while let Some(update) = queue.consumer().pop() {
    self.graph.node(update.node_id)
        .receive_param_update(update);
}
```

**State Queries (Audio → Main):**

The audio thread should never query state. Instead, it maintains a **local snapshot** of all state it needs, updated asynchronously via lock-free channels. Examples:
- Tempo: stored as atomic float, updated on tempo changes
- Time signature: stored as two atomics (numerator, denominator)
- Loop range: stored as two atomic i64s (start sample, end sample)
- Plugin parameter values: stored locally in each node's state

**Notifications (Audio → UI):**

Audio-to-UI notifications use a **lock-free MPSC queue** (multiple producer — one audio thread, one render thread — single consumer — UI). Used for:
- Level meter values
- Playhead position
- Dropout events
- Plugin crash notifications

### 3.3.2 Multi-Core Audio Scheduling

AUDIAW uses a **work-stealing scheduler** for parallel audio processing. Independent subgraphs can be processed concurrently:

```
Example: 8 tracks, 4 CPU cores

Serial topology order: [T1, T2, T3, T4, T5, T6, T7, T8, GroupA, GroupB, Master]

Dependencies:
  T1 → GroupA
  T2 → GroupA
  T3 → GroupA
  T4 → GroupB
  T5 → GroupB
  T6 → GroupB
  T7 → Master (no group)
  T8 → Master (no group)
  GroupA → Master
  GroupB → Master

Parallel execution:
  Core 0: T1, T4, GroupA (blocked on T1, T2, T3)
  Core 1: T2, T5, GroupB (blocked on T4, T5, T6)
  Core 2: T3, T6, T7
  Core 3: T8
  
  After all complete:
  Core 0: Master
```

The scheduler computes the dependency levels (nodes with no dependencies are Level 0, nodes dependent only on Level 0 are Level 1, etc.) and dispatches all nodes of the same level simultaneously.

**Work-stealing details:**
- Each core has a local deque of work items
- When a core exhausts its deque, it steals from the tail of another core's deque
- Work items are NodeId + buffer allocation handles
- Lock-free atomic operations for all coordination

**Thread count:** Defaults to `min(physical_cores - 1, 8)`. The -1 reserves one core for the OS and UI. Configurable in audio settings.

### 3.3.3 Audio Callback Safety

The AUDIAW audio callback is **the most critical code path in the application**. Violations of realtime safety cause audible glitches that directly damage the user experience.

**Realtime Safety Rules (enforced by code review + linting):**

1. **NO `Box::new()`, `Vec::new()`, or any heap allocation** — all memory must be pre-allocated
2. **NO `Mutex::lock()` or any blocking synchronization** — use lock-free structures only
3. **NO `std::fs::*` or any blocking I/O** — disk reads happen in background threads
4. **NO unbounded loops** — all loops must have known iteration counts
5. **NO `println!()` or synchronous logging** — use async log ring buffer
6. **NO `thread::sleep()` or any sleep** — never
7. **NO `panic!()` in release builds** — all errors must be handled gracefully
8. **NO floating-point NaN/Inf production** — validate inputs, clamp outputs
9. **NO dynamic dispatch beyond known-bounded trait objects** — vtable overhead is acceptable, but unknown recursion depth is not
10. **NO calls to any external library not explicitly audited for realtime safety**

These rules are enforced through:
- Custom Clippy lints that flag disallowed operations in `#[realtime_safe]` annotated functions
- Code review checklist item for all audio path PRs
- Runtime assertion in debug builds: realtime thread detector that panics if a forbidden operation is detected

## 3.4 Device Systems

### 3.4.1 CPAL Backend Selection

AUDIAW uses CPAL (Cross-Platform Audio Library) as the primary audio hardware abstraction, with custom extensions for professional features:

```rust
pub enum AudioBackend {
    /// Windows: ASIO (preferred for professional use)
    Asio(AsioBackend),
    /// Windows: WASAPI Exclusive Mode (low-latency consumer)
    WasapiExclusive(WasapiBackend),
    /// Windows: WASAPI Shared Mode (compatibility)
    WasapiShared(WasapiBackend),
    /// macOS: CoreAudio
    CoreAudio(CoreAudioBackend),
    /// Linux: PipeWire (preferred on modern systems)
    PipeWire(PipeWireBackend),
    /// Linux: JACK (professional, legacy)
    Jack(JackBackend),
    /// Linux: ALSA (fallback)
    Alsa(AlsaBackend),
    /// All platforms: null backend (for testing/headless rendering)
    Null(NullBackend),
}
```

**Backend selection priority:**

- **Windows:** ASIO → WASAPI Exclusive → WASAPI Shared
- **macOS:** CoreAudio (only option, well-supported)
- **Linux:** PipeWire → JACK → ALSA

**Buffer size targets by backend:**

| Backend | Minimum Practical | Typical Low-Latency | Standard |
|---|---|---|---|
| ASIO | 32 samples | 64–128 | 256 |
| WASAPI Exclusive | 64 samples | 128–256 | 512 |
| CoreAudio | 32 samples | 64–128 | 256 |
| PipeWire | 64 samples | 128–256 | 512 |
| JACK | 32 samples | 64–128 | 256 |
| ALSA | 128 samples | 256–512 | 1024 |

**Round-trip latency at 48kHz:**

| Backend | Buffer | I/O Latency | Round-Trip |
|---|---|---|---|
| ASIO | 64 | ~1.3ms | ~3–5ms |
| CoreAudio | 64 | ~1.3ms | ~3–5ms |
| PipeWire | 128 | ~2.7ms | ~6–8ms |
| JACK | 64 | ~1.3ms | ~3–5ms |
| WASAPI Excl. | 128 | ~2.7ms | ~6–8ms |

### 3.4.2 Device Persistence

Audio device configuration is stored by device name and configuration, not by device index. When a device is reconnected, its configuration is restored automatically. If the configured device is unavailable, AUDIAW falls back to the system default with a notification.

```rust
pub struct AudioDeviceConfig {
    /// Human-readable device name (persisted)
    name: String,
    /// Hardware device identifier (platform-specific, for disambiguation)
    hardware_id: String,
    sample_rate: u32,
    buffer_size: BufferSize,
    input_channels: Vec<ChannelConfig>,
    output_channels: Vec<ChannelConfig>,
}
```

## 3.5 Streaming Systems

### 3.5.1 Sample Streaming Architecture

Large audio files (longer than 10 seconds at 48kHz/32-bit stereo ≈ 3.8 MB) are **not loaded entirely into memory**. Instead, they are streamed from disk using a prefetch-based streaming system.

```
Disk Streaming Architecture

  Audio Callback (realtime)
       │
       │  reads from:
       ▼
  Stream Buffer Ring (pre-allocated, in-memory)
  [CHUNK_0][CHUNK_1][CHUNK_2][CHUNK_3][...][CHUNK_N]
       ▲
       │  filled by:
       │
  Streaming Thread (background)
       │
       │  reads from:
       ▼
  Disk (platform buffered I/O)
       │
       │  reads from:
       ▼
  Audio File (WAV, FLAC, AIFF, etc.)
```

**Ring buffer sizing:**
- Default: 4 seconds of audio pre-buffered per streaming track
- Calculated: `buffer_size = 4 * sample_rate * channels * bytes_per_sample`
- Example: 4s × 48000Hz × 2ch × 4 bytes = 1.5 MB per streaming track
- 32 streaming tracks × 1.5 MB = 48 MB streaming budget (within the 50 MB target)

**Prefetch trigger:** When the read position reaches 50% of the buffer, the streaming thread is signaled to fill the next chunk. The streaming thread has a 2-second window to complete this before the read position reaches un-prefetched data.

**Disk I/O priority:** The streaming thread runs at `THREAD_PRIORITY_ABOVE_NORMAL` to ensure disk reads complete within their window. On systems with slow HDDs, this may still fail — AUDIAW provides a "low disk speed" warning and recommends SSD.

**Waveform caching:** Decoded audio waveform data is cached to a platform-specific cache directory as downsampled thumbnail data (peak/RMS at multiple zoom levels). This allows instant waveform display on next project load without re-reading the full audio file.

---

*End of Volume I. Continue to Volume II for UI/UX Systems, User Flows, and Plugin Architecture.*
