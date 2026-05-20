**User:**

<task>
Based on the comprehensive AUDIAW documentation analysis, create a detailed technical architecture and implementation plan for a demo-ready hackathon MVP.

## Context from Analysis

**Product**: AUDIAW - Professional open-source Digital Audio Workstation
**Tech Stack**: Rust (backend/audio) + TypeScript/React (frontend) + Tauri 2.x
**MVP Scope**: 8-track audio engine, basic arrangement view, simple sampler, project save/load

## Required Deliverables

Create a comprehensive architecture plan that includes:

### 1. Project Structure Design
- Complete monorepo folder structure (Cargo workspace + pnpm workspace)
- Directory organization for: [`apps/`](apps/), [`crates/`](crates/), [`packages/`](packages/), [`tools/`](tools/)
- File naming conventions and module organization
- Configuration file structure

### 2. Technical Architecture Specification
- **Audio Engine Architecture**: Lock-free DSP graph design, realtime-safe patterns
- **IPC Communication Layer**: Tauri command/event structure between frontend and backend
- **State Management**: Zustand store architecture for UI state
- **Data Flow**: How audio, MIDI, and UI state flow through the system
- **Error Handling Strategy**: Crash recovery, error boundaries, logging

### 3. Core Systems Design
For each system, specify:
- Module boundaries and responsibilities
- Key data structures and types
- API interfaces (Rust and TypeScript)
- Performance considerations

**Systems to design:**
- Audio Engine Core (DSP graph, transport, scheduler)
- Audio I/O Layer (CPAL integration)
- Track System (audio tracks, routing)
- Timeline/Arrangement View
- Transport Controls
- Basic Sampler Instrument
- Project File Format (save/load)

### 4. Implementation Phases
Break down into concrete, sequential implementation phases with:
- Clear deliverables for each phase
- Dependencies between phases
- Estimated complexity (simple/medium/complex)
- Success criteria for each phase

### 5. MVP Feature Scope
Explicitly define what IS and IS NOT included in the hackathon demo:
- ✅ Must Have features (critical path)
- ⚠️ Should Have features (if time permits)
- ❌ Explicitly Out of Scope (for future versions)

### 6. Technology Decisions
Specify exact versions and justify choices for:
- Rust crates (CPAL, Tokio, Serde, etc.)
- TypeScript packages (React, Zustand, Tailwind, etc.)
- Build tools and configuration
- Development tooling

### 7. Quality Standards
Define standards for:
- Code organization and naming
- Documentation requirements
- Testing approach (what to test in MVP)
- Performance budgets
- Error handling patterns

### 8. Risk Mitigation
Identify potential risks and mitigation strategies:
- Technical risks (audio latency, IPC performance)
- Scope risks (feature creep)
- Integration risks (Rust ↔ TypeScript)

## Constraints

- **Hackathon Timeline**: Assume 2-3 days of focused development
- **Demo-Ready**: Must be visually polished and stable for presentation
- **Beginner-Friendly**: Code must be readable and well-documented
- **Scalable Foundation**: Architecture must support future expansion

## Output Format

Provide a structured markdown document with:
- Clear section headers
- Code examples where helpful
- Diagrams (ASCII art) for architecture
- Concrete file paths and module names
- Actionable implementation steps

**CRITICAL**: This plan will be used to guide all subsequent implementation tasks. It must be comprehensive, technically sound, and aligned with the AUDIAW documentation philosophy of simplicity, performance, and maintainability.

The plan should enable a developer to understand the entire system architecture before writing a single line of code.
</task>
<environment_details>
# VSCode Visible Files
IBM BOB\BOB.md

# VSCode Open Tabs
IBM BOB/BOB.md

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T15:38:47.745Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.00

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>plan</slug>
<name>📝 Plan</name>


# Current Workspace Directory (d:/AUDIAW PROJECT) Files
DOCS/
DOCS/AUDIAW-DOCS-VOL1.md
DOCS/AUDIAW-DOCS-VOL2.md
DOCS/AUDIAW-DOCS-VOL3.md
DOCS/AUDIAW-DOCS-VOL4.md
IBM BOB/
IBM BOB/BOB.md
IBM BOB/EXAMPLES.md
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

I'll analyze the AUDIAW documentation and create a comprehensive technical architecture and implementation plan for the hackathon MVP. Let me start by examining the existing documentation to understand the project's vision and technical requirements.

<read_file>
<args>
  <file>
    <path>DOCS/AUDIAW-DOCS-VOL1.md</path>
  </file>
  <file>
    <path>DOCS/AUDIAW-DOCS-VOL2.md</path>
  </file>
  <file>
    <path>DOCS/AUDIAW-DOCS-VOL3.md</path>
  </file>
  <file>
    <path>DOCS/AUDIAW-DOCS-VOL4.md</path>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 4 files] Result:
<files>
<file><path>DOCS/AUDIAW-DOCS-VOL1.md</path><file_outline>File: AUDIAW-DOCS-VOL1.md (1573 lines)

String: # AUDIAW — MASTER DOCUMENTATION ECOSYSTEM (lines 1-23)
  String: ## Volume I: Product, Architecture & Audio Engine (lines 2-15)
  String: ## TABLE OF CONTENTS — VOLUME I (lines 16-23)
String: # 1. MASTER PRODUCT REQUIREMENTS DOCUMENT (lines 24-636)
  String: ## 1.1 Product Vision (lines 26-103)
    String: ### 1.1.1 Mission Statement (lines 28-35)
    String: ### 1.1.2 Product Philosophy (lines 36-47)
    String: ### 1.1.3 Workflow Philosophy (lines 48-63)
    String: ### 1.1.4 Creative Philosophy (lines 64-76)
    String: ### 1.1.5 UX Philosophy (lines 77-90)
    String: ### 1.1.6 Open-Source Philosophy (lines 91-103)
  String: ## 1.2 Market Analysis (lines 104-296)
    String: ### 1.2.1 Competitor Analysis (lines 106-215)
      String: #### Ableton Live (lines 108-128)
      String: #### Logic Pro X (lines 129-147)
      String: #### FL Studio (lines 148-167)
      String: #### Bitwig Studio (lines 168-186)
      String: #### Reaper (lines 187-205)
      String: #### Cubase / Studio One / Pro Tools (lines 206-215)
    String: ### 1.2.2 Feature Comparison Matrix (lines 216-243)
    String: ### 1.2.3 Market Gaps (lines 244-265)
    String: ### 1.2.4 Linux Audio Ecosystem Analysis (lines 266-296)
  String: ## 1.3 User Personas (lines 297-500)
    String: ### 1.3.1 Persona: The Bedroom Producer ("Alex") (lines 299-324)
    String: ### 1.3.2 Persona: The Professional Producer ("Morgan") (lines 325-351)
    String: ### 1.3.3 Persona: The Audio Engineer ("Jordan") (lines 352-376)
    String: ### 1.3.4 Persona: The Beatmaker ("Devon") (lines 377-400)
    String: ### 1.3.5 Persona: The Live Performer ("Casey") (lines 401-424)
    String: ### 1.3.6 Persona: The Sound Designer ("River") (lines 425-448)
    String: ### 1.3.7 Persona: The Film Composer ("Sam") (lines 449-473)
    String: ### 1.3.8 Persona: The Podcast Creator ("Alex P.") (lines 474-500)
  String: ## 1.4 Workflow Goals (lines 501-543)
    String: ### 1.4.1 Beginner Workflow Simplicity (lines 503-527)
    String: ### 1.4.2 Professional Workflow Depth (lines 528-543)
  String: ## 1.5 Product Strategy (lines 544-588)
    String: ### 1.5.1 Plugin Ecosystem Strategy (lines 546-560)
    String: ### 1.5.2 Community Strategy (lines 561-570)
    String: ### 1.5.3 Long-Term Ecosystem Goals (lines 571-588)
  String: ## 1.6 Risk Analysis (lines 589-636)
    String: ### 1.6.1 Technical Risks (lines 591-622)
    String: ### 1.6.2 Product Risks (lines 623-636)
String: # 2. COMPLETE APPLICATION ARCHITECTURE DOCUMENT (lines 637-1183)
  String: ## 2.1 Architectural Overview (lines 639-695)
  String: ## 2.2 Monorepo Architecture (lines 696-862)
    String: ### 2.2.1 Repository Root Structure (lines 705-862)
  String: ## 2.3 Frontend/Backend Separation (lines 863-888)
  String: ## 2.4 IPC Communication Architecture (lines 889-965)
    String: ### 2.4.1 Commands (Frontend → Backend) (lines 893-931)
    String: ### 2.4.2 Events (Backend → Frontend) (lines 932-965)
  String: ## 2.5 State Management Architecture (lines 966-1023)
    String: ### 2.5.1 The Two-Layer State Model (lines 968-987)
    String: ### 2.5.2 Frontend State Management (Zustand) (lines 988-1023)
  String: ## 2.6 GPU Rendering Pipeline (lines 1024-1094)
    String: ### 2.6.1 What Renders in WGPU (lines 1028-1034)
    String: ### 2.6.2 WGPU Rendering Architecture (lines 1035-1062)
    String: ### 2.6.3 Rendering Thread Architecture (lines 1063-1094)
  String: ## 2.7 Memory Architecture (lines 1095-1133)
    String: ### 2.7.1 Memory Budgets (lines 1097-1109)
    String: ### 2.7.2 Realtime Memory Safety (lines 1110-1133)
  String: ## 2.8 Serialization Systems (lines 1134-1144)
  String: ## 2.9 Logging & Diagnostics Systems (lines 1145-1183)
    String: ### 2.9.1 Logging Architecture (lines 1147-1167)
    String: ### 2.9.2 Crash Recovery (lines 1168-1183)
String: # 3. AUDIO ENGINE MASTER DESIGN DOCUMENT (lines 1184-1573)
  String: ## 3.1 Audio Engine Philosophy (lines 1186-1194)
  String: ## 3.2 DSP Graph Architecture (lines 1195-1348)
    String: ### 3.2.1 Graph Node Types (lines 1199-1226)
    String: ### 3.2.2 Graph Evaluation Algorithm (lines 1227-1262)
    String: ### 3.2.3 Node Processing Contract (lines 1263-1304)
    String: ### 3.2.4 Audio Bus Architecture (lines 1305-1348)
  String: ## 3.3 Realtime Systems (lines 1349-1457)
    String: ### 3.3.1 Lock-Free Threading Model (lines 1351-1394)
    String: ### 3.3.2 Multi-Core Audio Scheduling (lines 1395-1435)
    String: ### 3.3.3 Audio Callback Safety (lines 1436-1457)
  String: ## 3.4 Device Systems (lines 1458-1528)
    String: ### 3.4.1 CPAL Backend Selection (lines 1460-1511)
    String: ### 3.4.2 Device Persistence (lines 1512-1528)
  String: ## 3.5 Streaming Systems (lines 1529-1573)
    String: ### 3.5.1 Sample Streaming Architecture (lines 1531-1573)
</file_outline>
<notice>This file is large (1572 lines). You will use the following strategy to understand this file:
- Inform the user you are going to use large file strategy, to efficiently understand the file
- Use the file_outline provided to get an overview of the file structure to help decide next action. This is not the full file. It is not the full depth of the contents.
- If you read the file, use precise file reads with line ranges for specific sections of interest
- Consider if other commands/tools are better suited for extracting information from that file type
- Use ask_followup_question tool if needed to identify the best next action
</notice></file>
<file><path>DOCS/AUDIAW-DOCS-VOL2.md</path><file_outline>File: AUDIAW-DOCS-VOL2.md (1401 lines)

String: # AUDIAW — MASTER DOCUMENTATION ECOSYSTEM (lines 1-19)
  String: ## Volume II: UX Design System, Screen Specifications & Plugin Architecture (lines 2-9)
  String: ## TABLE OF CONTENTS — VOLUME II (lines 10-19)
String: # 4. COMPLETE UI/UX MASTER DESIGN SYSTEM (lines 20-377)
  String: ## 4.1 Design Philosophy (lines 22-90)
    String: ### 4.1.1 The Invisible Tool Principle (lines 24-41)
    String: ### 4.1.2 Visual Clarity Framework (lines 42-75)
    String: ### 4.1.3 Cognitive Load Reduction Principles (lines 76-90)
  String: ## 4.2 Visual Design System (lines 91-311)
    String: ### 4.2.1 Typography System (lines 93-125)
    String: ### 4.2.2 Color System (lines 126-195)
    String: ### 4.2.3 Spacing System (lines 196-229)
    String: ### 4.2.4 Motion System (lines 230-259)
    String: ### 4.2.5 Icon System (lines 260-282)
    String: ### 4.2.6 Theme System (lines 283-311)
  String: ## 4.3 Workspace Systems (lines 312-363)
    String: ### 4.3.1 Docking Architecture (lines 314-351)
    String: ### 4.3.2 Multi-Monitor Support (lines 352-363)
  String: ## 4.4 Accessibility (lines 364-377)
String: # 5. DETAILED UX FOR EVERY MAJOR SCREEN (lines 378-817)
  String: ## 5.1 Main Arrangement View (lines 380-545)
    String: ### 5.1.1 Layout Anatomy (lines 384-411)
    String: ### 5.1.2 Track Header Controls (lines 412-437)
    String: ### 5.1.3 Timeline Lane & Clip Design (lines 438-493)
    String: ### 5.1.4 Selection Systems (lines 494-510)
    String: ### 5.1.5 Zoom & Navigation (lines 511-545)
  String: ## 5.2 Mixer View (lines 546-631)
    String: ### 5.2.1 Channel Strip Anatomy (72px wide, full height) (lines 550-589)
    String: ### 5.2.2 Mixer Navigation (lines 590-610)
    String: ### 5.2.3 Plugin Slot UX (lines 611-631)
  String: ## 5.3 Piano Roll (lines 632-737)
    String: ### 5.3.1 Piano Roll Layout (lines 636-663)
    String: ### 5.3.2 MIDI Note Interaction (lines 664-690)
    String: ### 5.3.3 Velocity Editor (lines 691-705)
    String: ### 5.3.4 Quantization UX (lines 706-721)
    String: ### 5.3.5 Scale & Chord Helpers (lines 722-737)
  String: ## 5.4 Sample Browser & Asset Management View (lines 738-817)
    String: ### 5.4.1 Browser Structure (lines 742-775)
    String: ### 5.4.2 Preview System (lines 776-783)
    String: ### 5.4.3 Search & Filtering (lines 784-807)
    String: ### 5.4.4 Drag & Drop (lines 808-817)
String: # 6. COMPLETE USER FLOW DOCUMENTATION (lines 818-1015)
  String: ## 6.1 Beatmaking Workflow (lines 820-899)
    String: ### 6.1.1 Flow Overview (lines 822-825)
    String: ### 6.1.2 Step-by-Step User Journey: Creating a Trap Beat from Scratch (lines 826-890)
    String: ### 6.1.3 Optimization Opportunities Identified (lines 891-899)
  String: ## 6.2 Recording Vocals Workflow (lines 900-957)
    String: ### 6.2.1 Flow Overview (lines 902-905)
    String: ### 6.2.2 Step-by-Step User Journey: Recording a Vocal Take (lines 906-957)
  String: ## 6.3 Mixing Workflow (lines 958-1015)
    String: ### 6.3.1 Step-by-Step User Journey: Mixing a 32-Track Session (lines 960-1015)
String: # 7. PLUGIN SYSTEM MASTER DOCUMENT (lines 1016-1246)
  String: ## 7.1 Plugin Architecture Overview (lines 1018-1026)
  String: ## 7.2 Plugin Process Architecture (Crash Isolation) (lines 1027-1083)
  String: ## 7.3 Plugin Lifecycle (lines 1084-1115)
  String: ## 7.4 Plugin Format Support (lines 1116-1187)
    String: ### 7.4.1 VST3 Implementation (lines 1118-1137)
    String: ### 7.4.2 CLAP Implementation (lines 1138-1160)
    String: ### 7.4.3 LV2 Implementation (Linux-focused) (lines 1161-1175)
    String: ### 7.4.4 AU (Audio Units) — macOS Only (lines 1176-1187)
  String: ## 7.5 Plugin UI Embedding (lines 1188-1219)
  String: ## 7.6 Preset System (lines 1220-1246)
String: # 8. MODULAR ROUTING SYSTEM DOCUMENT (lines 1247-1401)
  String: ## 8.1 Routing Philosophy (lines 1249-1258)
  String: ## 8.2 Track-Level Routing (lines 1259-1326)
    String: ### 8.2.1 Signal Flow Model (lines 1261-1296)
    String: ### 8.2.2 Sidechain Routing (lines 1297-1326)
  String: ## 8.3 Device-Level Routing (Device Graph) (lines 1327-1401)
    String: ### 8.3.1 Nested Device Containers (lines 1331-1356)
    String: ### 8.3.2 Modulation Routing (lines 1357-1375)
    String: ### 8.3.3 Macro System (lines 1376-1401)
</file_outline>
<notice>This file is large (1400 lines). You will use the following strategy to understand this file:
- Inform the user you are going to use large file strategy, to efficiently understand the file
- Use the file_outline provided to get an overview of the file structure to help decide next action. This is not the full file. It is not the full depth of the contents.
- If you read the file, use precise file reads with line ranges for specific sections of interest
- Consider if other commands/tools are better suited for extracting information from that file type
- Use ask_followup_question tool if needed to identify the best next action
</notice></file>
<file><path>DOCS/AUDIAW-DOCS-VOL3.md</path><file_outline>File: AUDIAW-DOCS-VOL3.md (1513 lines)

String: # AUDIAW — MASTER DOCUMENTATION ECOSYSTEM (lines 1-18)
  String: ## Volume III: Project File Format, Performance Engineering, Live Performance & Built-in Instruments (lines 2-9)
  String: ## TABLE OF CONTENTS — VOLUME III (lines 10-18)
String: # 9. PROJECT FILE FORMAT SPECIFICATION (lines 19-563)
  String: ## 9.1 Design Philosophy (lines 21-34)
  String: ## 9.2 File Format Architecture (lines 35-349)
    String: ### 9.2.1 Container Structure (lines 37-76)
    String: ### 9.2.2 Manifest Structure (JSON) (lines 77-126)
    String: ### 9.2.3 Core Section Schema (lines 127-175)
    String: ### 9.2.4 Track Section Schema (lines 176-234)
    String: ### 9.2.5 Clip Section Schema (lines 235-302)
    String: ### 9.2.6 Automation Section Schema (lines 303-349)
  String: ## 9.3 Asset Management (lines 350-397)
    String: ### 9.3.1 Asset Resolution Strategy (lines 352-362)
    String: ### 9.3.2 Asset Bundling (Portable Projects) (lines 363-371)
    String: ### 9.3.3 Missing Asset Recovery (lines 372-397)
  String: ## 9.4 Incremental Save & Autosave (lines 398-459)
    String: ### 9.4.1 Incremental Save Architecture (lines 400-429)
    String: ### 9.4.2 Autosave System (lines 430-459)
  String: ## 9.5 Undo System (lines 460-516)
    String: ### 9.5.1 Undo Architecture (lines 462-499)
    String: ### 9.5.2 Undo Scope (lines 500-516)
  String: ## 9.6 Version Compatibility (lines 517-563)
    String: ### 9.6.1 Forward Compatibility (lines 519-527)
    String: ### 9.6.2 Migration System (lines 528-563)
String: # 10. PERFORMANCE ENGINEERING DOCUMENT (lines 564-911)
  String: ## 10.1 Performance Philosophy (lines 566-577)
  String: ## 10.2 Performance Targets (lines 578-637)
    String: ### 10.2.1 Startup Targets (lines 580-597)
    String: ### 10.2.2 Session Performance Targets (lines 598-612)
    String: ### 10.2.3 Audio Latency Targets (lines 613-624)
    String: ### 10.2.4 GPU Budget (Rendering Frame Budget) (lines 625-637)
  String: ## 10.3 Startup Optimization Architecture (lines 638-734)
    String: ### 10.3.1 Startup Sequence (lines 640-665)
    String: ### 10.3.2 Parallel Initialization (lines 666-686)
    String: ### 10.3.3 Lazy Plugin Loading (lines 687-695)
    String: ### 10.3.4 Project Loading Optimization (lines 696-734)
  String: ## 10.4 CPU Optimization (lines 735-818)
    String: ### 10.4.1 DSP SIMD Strategy (lines 737-791)
    String: ### 10.4.2 Track Freezing (lines 792-807)
    String: ### 10.4.3 CPU Protection Mode (lines 808-818)
  String: ## 10.5 Memory Optimization (lines 819-838)
    String: ### 10.5.1 Waveform Thumbnail Cache (lines 821-830)
    String: ### 10.5.2 Plugin State Memory (lines 831-838)
  String: ## 10.6 Rendering Optimization (lines 839-911)
    String: ### 10.6.1 Virtualized Track Rendering (lines 841-882)
    String: ### 10.6.2 Clip Viewport Culling (lines 883-886)
    String: ### 10.6.3 GPU Waveform Mipmap System (lines 887-911)
String: # 11. LIVE PERFORMANCE SYSTEM DOCUMENT (lines 912-1097)
  String: ## 11.1 Live Performance Architecture (lines 914-1097)
    String: ### 11.1.1 Performance Mode vs Production Mode (lines 918-934)
    String: ### 11.2 Clip Launching System (lines 935-938)
    String: ### 11.2.1 Clip Launcher Layout (lines 939-957)
    String: ### 11.2.2 Clip Trigger Quantization (lines 958-971)
    String: ### 11.2.3 Scene Management (lines 972-988)
    String: ### 11.2.4 Hardware Controller Integration (lines 989-1009)
    String: ### 11.3 Quantized Triggering Architecture (lines 1010-1063)
    String: ### 11.4 Emergency Recovery Systems (lines 1064-1065)
    String: ### 11.4.1 Audio Dropout Recovery (lines 1066-1074)
    String: ### 11.4.2 Plugin Crash During Performance (lines 1075-1085)
    String: ### 11.4.3 MIDI Clock Synchronization (lines 1086-1097)
String: # 12. BUILT-IN SYNTH & DSP DOCUMENTATION (lines 1098-1513)
  String: ## 12.1 Built-in Instrument Philosophy (lines 1100-1109)
  String: ## 12.2 AUDIAW Sampler (lines 1110-1201)
    String: ### 12.2.1 Architecture Overview (lines 1112-1147)
    String: ### 12.2.2 Sample Mapping System (lines 1148-1172)
    String: ### 12.2.3 Sample Playback Engine (lines 1173-1182)
    String: ### 12.2.4 Voice Management (lines 1183-1201)
  String: ## 12.3 AUDIAW Drum Machine (lines 1202-1246)
    String: ### 12.3.1 Step Sequencer (lines 1204-1237)
    String: ### 12.3.2 Pattern System (lines 1238-1246)
  String: ## 12.4 AUDIAW Wavetable Synthesizer (lines 1247-1335)
    String: ### 12.4.1 Wavetable Architecture (lines 1249-1296)
    String: ### 12.4.2 Wavetable Format (lines 1297-1307)
    String: ### 12.4.3 Modulation System (lines 1308-1335)
  String: ## 12.5 AUDIAW FM Synthesizer (lines 1336-1371)
    String: ### 12.5.1 FM Architecture (lines 1338-1367)
    String: ### 12.5.2 DX7 Compatibility (lines 1368-1371)
  String: ## 12.6 AUDIAW Granular Synthesizer (lines 1372-1418)
    String: ### 12.6.1 Granular Engine Architecture (lines 1374-1418)
  String: ## 12.7 Built-in Effects Library (lines 1419-1513)
    String: ### 12.7.1 AUDIAW EQ (lines 1421-1439)
    String: ### 12.7.2 AUDIAW Compressor (lines 1440-1471)
    String: ### 12.7.3 AUDIAW Reverb (lines 1472-1492)
    String: ### 12.7.4 AUDIAW Delay (lines 1493-1513)
</file_outline>
<notice>This file is large (1512 lines). You will use the following strategy to understand this file:
- Inform the user you are going to use large file strategy, to efficiently understand the file
- Use the file_outline provided to get an overview of the file structure to help decide next action. This is not the full file. It is not the full depth of the contents.
- If you read the file, use precise file reads with line ranges for specific sections of interest
- Consider if other commands/tools are better suited for extracting information from that file type
- Use ask_followup_question tool if needed to identify the best next action
</notice></file>
<file><path>DOCS/AUDIAW-DOCS-VOL4.md</path><file_outline>File: AUDIAW-DOCS-VOL4.md (2370 lines)

String: # AUDIAW — MASTER DOCUMENTATION ECOSYSTEM (lines 1-26)
  String: ## Volume IV: Systems, Standards, Governance & Release Roadmap (lines 2-9)
  String: ## TABLE OF CONTENTS — VOLUME IV (lines 10-26)
String: # 13. FILE BROWSER & ASSET MANAGEMENT SYSTEM (lines 27-297)
  String: ## 13.1 Browser Architecture (lines 29-297)
    String: ### 13.1.1 Backend Indexing Architecture (lines 33-71)
    String: ### 13.1.2 SQLite Schema (lines 72-141)
    String: ### 13.2 Search System (lines 142-143)
    String: ### 13.2.1 Search Query Parser (lines 144-180)
    String: ### 13.2.2 Search Performance (lines 181-187)
    String: ### 13.3 Preview System Architecture (lines 188-235)
    String: ### 13.4 Drag-and-Drop System (lines 236-297)
String: # 14. KEYBINDING & COMMAND SYSTEM (lines 298-535)
  String: ## 14.1 Command Architecture (lines 300-443)
    String: ### 14.1.1 Command Registry (lines 308-337)
    String: ### 14.2 Default Keybinding Reference (lines 338-443)
      String: #### 14.2.1 Transport & Playback (lines 340-357)
      String: #### 14.2.2 Project Management (lines 358-370)
      String: #### 14.2.3 Editing (Global) (lines 371-385)
      String: #### 14.2.4 View Switching (lines 386-398)
      String: #### 14.2.5 Arrangement View (lines 399-420)
      String: #### 14.2.6 Piano Roll (lines 421-443)
  String: ## 14.3 Command Palette (lines 444-474)
  String: ## 14.4 Custom Keybinding System (lines 475-509)
  String: ## 14.5 Macro System (lines 510-535)
String: # 15. THEME & CUSTOMIZATION SYSTEM (lines 536-675)
  String: ## 15.1 Theme Engine Architecture (lines 538-633)
    String: ### 15.1.1 Theme Loading Pipeline (lines 542-554)
    String: ### 15.1.2 Theme Token Categories (lines 555-591)
    String: ### 15.1.3 Theme File Format (lines 592-633)
  String: ## 15.2 Layout Presets (lines 634-658)
  String: ## 15.3 UI Scaling (lines 659-675)
String: # 16. ACCESSIBILITY DOCUMENTATION (lines 676-828)
  String: ## 16.1 Keyboard-Only Workflow (lines 678-723)
    String: ### 16.1.1 Focus Management (lines 682-699)
    String: ### 16.1.2 Arrow Key Navigation (lines 700-714)
    String: ### 16.1.3 Accessible Menus (lines 715-723)
  String: ## 16.2 Screen Reader Support (lines 724-783)
    String: ### 16.2.1 ARIA Implementation (lines 728-773)
    String: ### 16.2.2 Screen Reader Announcements (lines 774-783)
  String: ## 16.3 Colorblind-Safe Design (lines 784-803)
  String: ## 16.4 Motor Accessibility (lines 804-828)
    String: ### 16.4.1 Reduced Precision Mode (lines 806-815)
    String: ### 16.4.2 Pointer Size (lines 816-828)
String: # 17. SECURITY & STABILITY DOCUMENT (lines 829-951)
  String: ## 17.1 Plugin Isolation Security Model (lines 831-854)
  String: ## 17.2 Update Security (lines 855-878)
  String: ## 17.3 Crash Recovery Architecture (lines 879-934)
    String: ### 17.3.1 Crash Report Content (lines 915-934)
  String: ## 17.4 Data Integrity Systems (lines 935-951)
    String: ### 17.4.1 Project File Integrity (lines 937-943)
    String: ### 17.4.2 Asset Integrity (lines 944-951)
String: # 18. DEVOPS & BUILD SYSTEM DOCUMENT (lines 952-1171)
  String: ## 18.1 Build System Architecture (lines 954-1029)
    String: ### 18.1.1 Build Profiles (lines 981-1011)
    String: ### 18.1.2 Cross-Platform Build Targets (lines 1012-1029)
  String: ## 18.2 CI/CD Pipeline (lines 1030-1171)
    String: ### 18.2.1 CI Pipeline Structure (lines 1032-1110)
    String: ### 18.2.2 Release Pipeline (lines 1111-1139)
    String: ### 18.2.3 Auto-Update System (lines 1140-1171)
String: # 19. QA & TESTING DOCUMENTATION (lines 1172-1330)
  String: ## 19.1 Testing Philosophy (lines 1174-1195)
  String: ## 19.2 DSP Regression Testing (lines 1196-1330)
    String: ### 19.2.1 Reference Output System (lines 1200-1234)
    String: ### 19.2.2 SIMD Equivalence Testing (lines 1235-1256)
    String: ### 19.3 Realtime Safety Testing (lines 1257-1282)
    String: ### 19.4 Plugin Compatibility Testing (lines 1283-1311)
    String: ### 19.5 Performance Regression Testing (lines 1312-1330)
String: # 20. OPEN SOURCE GOVERNANCE DOCUMENT (lines 1331-1454)
  String: ## 20.1 Governance Model (lines 1333-1374)
    String: ### 20.1.1 Tier 1: Contributors (lines 1337-1344)
    String: ### 20.1.2 Tier 2: Trusted Contributors (lines 1345-1353)
    String: ### 20.1.3 Tier 3: Maintainers (lines 1354-1370)
    String: ### 20.1.4 Tier 4: Project Lead (lines 1371-1374)
  String: ## 20.2 RFC Process (lines 1375-1393)
  String: ## 20.3 Coding Standards Enforcement (lines 1394-1427)
    String: ### 20.3.1 Automated Enforcement (lines 1396-1420)
    String: ### 20.3.2 Code Review Requirements (lines 1421-1427)
  String: ## 20.4 Community Standards (lines 1428-1438)
  String: ## 20.5 Licensing Strategy (lines 1439-1454)
String: # 21. COMPLETE REPOSITORY STRUCTURE (lines 1455-1765)
  String: ## 21.1 Full Repository Layout (lines 1457-1765)
String: # 22. ENGINEERING STANDARDS (lines 1766-1926)
  String: ## 22.1 Rust Coding Standards (lines 1768-1848)
    String: ### 22.1.1 Safety and Correctness (lines 1770-1806)
    String: ### 22.1.2 Performance Standards (lines 1807-1814)
    String: ### 22.1.3 Documentation Standards (lines 1815-1848)
  String: ## 22.2 TypeScript Standards (lines 1849-1907)
    String: ### 22.2.1 Type Safety (lines 1851-1877)
    String: ### 22.2.2 Component Standards (lines 1878-1907)
  String: ## 22.3 Realtime Safety Standards (lines 1908-1926)
String: # 23. INTERNAL API DOCUMENTATION (lines 1927-2158)
  String: ## 23.1 IPC Command API Reference (lines 1929-2052)
    String: ### 23.1.1 Transport Commands (lines 1933-1961)
    String: ### 23.1.2 Track Commands (lines 1962-2006)
    String: ### 23.1.3 Plugin Commands (lines 2007-2052)
  String: ## 23.2 IPC Event Reference (lines 2053-2100)
  String: ## 23.3 Audio Engine Rust API (lines 2101-2158)
String: # 24. RELEASE ROADMAP (lines 2159-2370)
  String: ## 24.1 Roadmap Philosophy (lines 2161-2164)
  String: ## 24.2 MVP — v0.1 (Internal Alpha) (lines 2165-2187)
  String: ## 24.3 Alpha — v0.5 (lines 2188-2213)
  String: ## 24.4 Beta — v0.9 (lines 2214-2240)
  String: ## 24.5 Stable — v1.0 (lines 2241-2265)
  String: ## 24.6 v1.5 — Plugin Marketplace (lines 2266-2280)
  String: ## 24.7 v2.0 — Collaborative Future (lines 2281-2296)
  String: ## APPENDIX A: Technology Dependency Registry (lines 2297-2320)
  String: ## APPENDIX B: Performance Monitoring Dashboard (lines 2321-2370)
</file_outline>
<notice>This file is large (2369 lines). You will use the following strategy to understand this file:
- Inform the user you are going to use large file strategy, to efficiently understand the file
- Use the file_outline provided to get an overview of the file structure to help decide next action. This is not the full file. It is not the full depth of the contents.
- If you read the file, use precise file reads with line ranges for specific sections of interest
- Consider if other commands/tools are better suited for extracting information from that file type
- Use ask_followup_question tool if needed to identify the best next action
</notice></file>
</files>
<environment_details>
# VSCode Visible Files
IBM BOB\BOB.md

# VSCode Open Tabs
IBM BOB/BOB.md

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T15:38:52.220Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.03

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>plan</slug>
<name>📝 Plan</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

I'll use a large file strategy to efficiently understand these comprehensive documentation files. Let me read the key sections relevant to creating a hackathon MVP architecture plan.

<read_file>
<args>
  <file>
    <path>DOCS/AUDIAW-DOCS-VOL1.md</path>
    <line_range>637-862</line_range>
  </file>
  <file>
    <path>DOCS/AUDIAW-DOCS-VOL1.md</path>
    <line_range>1184-1348</line_range>
  </file>
  <file>
    <path>DOCS/AUDIAW-DOCS-VOL4.md</path>
    <line_range>1455-1765</line_range>
  </file>
  <file>
    <path>DOCS/AUDIAW-DOCS-VOL4.md</path>
    <line_range>2159-2187</line_range>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 4 files] Result:
<files>
<file><path>DOCS/AUDIAW-DOCS-VOL1.md</path>
<content lines="637-862">
637 | # 2. COMPLETE APPLICATION ARCHITECTURE DOCUMENT
638 | 
639 | ## 2.1 Architectural Overview
640 | 
641 | AUDIAW is a **hybrid native/web application** built on the Tauri framework. The architecture separates concerns into two primary domains:
642 | 
643 | - **The Audio Substrate:** Written in Rust. Handles all realtime audio processing, DSP, plugin hosting, project state, and file I/O. This is the "engine" of the DAW.
644 | - **The UI Surface:** Written in TypeScript/React. Handles all user interface rendering, interaction, and visual presentation. This is the "face" of the DAW.
645 | 
646 | These two domains communicate via a **structured IPC bridge** — a typed, versioned message-passing system that ensures clean separation of concerns.
647 | 
648 | ```
649 | ┌─────────────────────────────────────────────────────────────────────┐
650 | │                        AUDIAW APPLICATION                           │
651 | │                                                                      │
652 | │  ┌─────────────────────────────────────────────────────────────┐    │
653 | │  │                     UI SURFACE (WebView)                     │    │
654 | │  │                                                              │    │
655 | │  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │    │
656 | │  │  │  React UI    │  │  State Mgmt  │  │  WGPU Renderer   │   │    │
657 | │  │  │  (SolidJS)   │  │  (Zustand)   │  │  (Canvas/WASM)   │   │    │
658 | │  │  └──────┬───────┘  └──────┬───────┘  └──────────────────┘   │    │
659 | │  │         │                 │                                   │    │
660 | │  │         └────────┬────────┘                                   │    │
661 | │  │                  │                                             │    │
662 | │  │          ┌───────▼───────┐                                    │    │
663 | │  │          │  IPC Bridge   │◄──── Typed Commands/Events         │    │
664 | │  │          └───────┬───────┘                                    │    │
665 | │  └──────────────────┼────────────────────────────────────────────┘    │
666 | │                     │  Tauri IPC Layer                                 │
667 | │  ┌──────────────────┼────────────────────────────────────────────┐    │
668 | │  │                  ▼           RUST BACKEND                      │    │
669 | │  │  ┌─────────────────────────────────────────────────────────┐   │    │
670 | │  │  │                   Application Core                       │   │    │
671 | │  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │   │    │
672 | │  │  │  │ Project  │  │Settings  │  │ Command  │  │ Event  │  │   │    │
673 | │  │  │  │ Manager  │  │ Manager  │  │ Processor│  │  Bus   │  │   │    │
674 | │  │  │  └──────────┘  └──────────┘  └──────────┘  └────────┘  │   │    │
675 | │  │  └─────────────────────────────────────────────────────────┘   │    │
676 | │  │                                                                  │    │
677 | │  │  ┌─────────────────────────────────────────────────────────┐   │    │
678 | │  │  │                   Audio Engine                           │   │    │
679 | │  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │   │    │
680 | │  │  │  │  Audio   │  │  DSP     │  │  Plugin  │  │  MIDI  │  │   │    │
681 | │  │  │  │  Graph   │  │  Proc.   │  │  Host    │  │  Engine│  │   │    │
682 | │  │  │  └──────────┘  └──────────┘  └──────────┘  └────────┘  │   │    │
683 | │  │  └─────────────────────────────────────────────────────────┘   │    │
684 | │  │                                                                  │    │
685 | │  │  ┌─────────────────────────────────────────────────────────┐   │    │
686 | │  │  │                  Platform Abstraction                    │   │    │
687 | │  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │   │    │
688 | │  │  │  │  CPAL    │  │  File    │  │  MIDI    │  │ Diag.  │  │   │    │
689 | │  │  │  │  Audio   │  │  System  │  │  I/O     │  │  Sys.  │  │   │    │
690 | │  │  │  └──────────┘  └──────────┘  └──────────┘  └────────┘  │   │    │
691 | │  │  └─────────────────────────────────────────────────────────┘   │    │
692 | │  └──────────────────────────────────────────────────────────────────┘    │
693 | └─────────────────────────────────────────────────────────────────────┘
694 | ```
695 | 
696 | ## 2.2 Monorepo Architecture
697 | 
698 | AUDIAW uses a **cargo workspace + pnpm workspace** monorepo structure. The repository is designed so that:
699 | 
700 | 1. Rust backend crates can be developed and tested independently
701 | 2. The frontend can be developed against a mock backend (no audio hardware required)
702 | 3. Platform-specific code is isolated in platform crates
703 | 4. Shared data types are defined once and used by both Rust and TypeScript via code generation
704 | 
705 | ### 2.2.1 Repository Root Structure
706 | 
707 | ```
708 | audiaw/
709 | ├── .github/
710 | │   ├── workflows/
711 | │   │   ├── ci.yml                    # Main CI: lint, test, build
712 | │   │   ├── release.yml               # Release build and packaging
713 | │   │   ├── nightly.yml               # Nightly performance benchmarks
714 | │   │   ├── plugin-compat.yml         # Plugin compatibility matrix test
715 | │   │   └── security-audit.yml        # cargo audit + npm audit
716 | │   ├── ISSUE_TEMPLATE/
717 | │   │   ├── bug-report.yml
718 | │   │   ├── feature-request.yml
719 | │   │   └── audio-glitch-report.yml   # Specialized audio issue template
720 | │   └── PULL_REQUEST_TEMPLATE.md
721 | │
722 | ├── apps/
723 | │   ├── desktop/                      # Tauri desktop application
724 | │   │   ├── src-tauri/                # Tauri Rust bridge code
725 | │   │   │   ├── src/
726 | │   │   │   │   ├── main.rs           # Tauri entry point
727 | │   │   │   │   ├── commands/         # IPC command handlers
728 | │   │   │   │   ├── events/           # IPC event emitters
729 | │   │   │   │   └── setup.rs          # App initialization
730 | │   │   │   ├── Cargo.toml
731 | │   │   │   └── tauri.conf.json
732 | │   │   └── src/                      # React/TypeScript frontend
733 | │   │       ├── app/
734 | │   │       ├── components/
735 | │   │       ├── hooks/
736 | │   │       ├── stores/
737 | │   │       ├── views/
738 | │   │       └── workers/
739 | │   │
740 | │   └── cli/                          # Command-line tools (diagnostics, etc.)
741 | │       └── src/
742 | │           └── main.rs
743 | │
744 | ├── crates/
745 | │   ├── audiaw-engine/                # Core audio engine (no platform deps)
746 | │   │   ├── src/
747 | │   │   │   ├── lib.rs
748 | │   │   │   ├── graph/                # Audio graph implementation
749 | │   │   │   ├── dsp/                  # DSP algorithms
750 | │   │   │   ├── scheduler/            # Realtime scheduler
751 | │   │   │   ├── midi/                 # MIDI processing
752 | │   │   │   └── transport/            # Transport/timeline
753 | │   │   └── Cargo.toml
754 | │   │
755 | │   ├── audiaw-audio-io/              # Platform audio I/O (CPAL-based)
756 | │   │   ├── src/
757 | │   │   │   ├── lib.rs
758 | │   │   │   ├── asio/                 # Windows ASIO
759 | │   │   │   ├── coreaudio/            # macOS CoreAudio
760 | │   │   │   ├── wasapi/               # Windows WASAPI
761 | │   │   │   ├── alsa/                 # Linux ALSA
762 | │   │   │   ├── jack/                 # JACK (Linux/macOS)
763 | │   │   │   └── pipewire/             # PipeWire (Linux)
764 | │   │   └── Cargo.toml
765 | │   │
766 | │   ├── audiaw-plugin-host/           # VST3/CLAP/AU/LV2 plugin hosting
767 | │   │   ├── src/
768 | │   │   │   ├── lib.rs
769 | │   │   │   ├── vst3/
770 | │   │   │   ├── clap/
771 | │   │   │   ├── au/
772 | │   │   │   ├── lv2/
773 | │   │   │   ├── sandbox/              # Plugin process isolation
774 | │   │   │   └── scan/                 # Plugin scanner
775 | │   │   └── Cargo.toml
776 | │   │
777 | │   ├── audiaw-project/               # Project file format & serialization
778 | │   │   ├── src/
779 | │   │   │   ├── lib.rs
780 | │   │   │   ├── format/               # File format spec
781 | │   │   │   ├── migration/            # Version migration
782 | │   │   │   └── autosave/
783 | │   │   └── Cargo.toml
784 | │   │
785 | │   ├── audiaw-instruments/           # Built-in instruments
786 | │   │   ├── src/
787 | │   │   │   ├── lib.rs
788 | │   │   │   ├── sampler/
789 | │   │   │   ├── drum_machine/
790 | │   │   │   ├── wavetable/
791 | │   │   │   ├── fm_synth/
792 | │   │   │   └── granular/
793 | │   │   └── Cargo.toml
794 | │   │
795 | │   ├── audiaw-effects/               # Built-in effects
796 | │   │   ├── src/
797 | │   │   │   ├── lib.rs
798 | │   │   │   ├── eq/
799 | │   │   │   ├── dynamics/
800 | │   │   │   ├── reverb/
801 | │   │   │   ├── delay/
802 | │   │   │   └── modulation/
803 | │   │   └── Cargo.toml
804 | │   │
805 | │   ├── audiaw-render/                # GPU waveform rendering (WGPU)
806 | │   │   ├── src/
807 | │   │   │   ├── lib.rs
808 | │   │   │   ├── waveform/
809 | │   │   │   ├── spectrum/
810 | │   │   │   └── metering/
811 | │   │   └── Cargo.toml
812 | │   │
813 | │   ├── audiaw-midi/                  # MIDI I/O abstraction
814 | │   │   └── src/
815 | │   │
816 | │   ├── audiaw-types/                 # Shared data types (Rust)
817 | │   │   └── src/
818 | │   │
819 | │   └── audiaw-diagnostics/           # System diagnostics
820 | │       └── src/
821 | │
822 | ├── packages/
823 | │   ├── ui-components/                # Shared React component library
824 | │   ├── icons/                        # Icon system (SVG + React components)
825 | │   ├── theme/                        # Design tokens and theme system
826 | │   ├── ipc-types/                    # TypeScript types for IPC (generated)
827 | │   └── audio-worklet/                # Web Audio API workers (if needed)
828 | │
829 | ├── tools/
830 | │   ├── codegen/                      # Type generation (Rust → TypeScript)
831 | │   ├── benchmark/                    # Performance benchmark harness
832 | │   ├── plugin-validator/             # Plugin validation tool
833 | │   └── release/                      # Release automation scripts
834 | │
835 | ├── docs/
836 | │   ├── architecture/                 # Architecture documents (this file)
837 | │   ├── contributing/                 # Contributor guides
838 | │   ├── user-guide/                   # End-user documentation
839 | │   ├── api/                          # API reference (generated)
840 | │   └── specs/                        # Technical specifications
841 | │
842 | ├── tests/
843 | │   ├── integration/                  # Cross-crate integration tests
844 | │   ├── audio-regression/             # DSP regression test suite
845 | │   ├── plugin-compat/                # Plugin compatibility tests
846 | │   └── performance/                  # Performance regression tests
847 | │
848 | ├── assets/
849 | │   ├── samples/                      # Bundled sample library
850 | │   ├── presets/                      # Default presets
851 | │   ├── templates/                    # Project templates
852 | │   └── icons/                        # Application icons (platform formats)
853 | │
854 | ├── Cargo.toml                        # Workspace Cargo manifest
855 | ├── Cargo.lock
856 | ├── package.json                      # pnpm workspace root
857 | ├── pnpm-workspace.yaml
858 | ├── turbo.json                        # Turborepo build orchestration
859 | ├── rust-toolchain.toml               # Pinned Rust toolchain version
860 | └── README.md
861 | ```
862 | 
</content>
</file>
<file><path>DOCS/AUDIAW-DOCS-VOL4.md</path>
<content lines="1455-1765">
1455 | # 21. COMPLETE REPOSITORY STRUCTURE
1456 | 
1457 | ## 21.1 Full Repository Layout
1458 | 
1459 | ```
1460 | audiaw/                                 ← Repository root
1461 | │
1462 | ├── .github/
1463 | │   ├── workflows/
1464 | │   │   ├── ci.yml                      # Main CI pipeline
1465 | │   │   ├── release.yml                 # Release build and signing
1466 | │   │   ├── nightly.yml                 # Nightly builds and benchmarks
1467 | │   │   ├── plugin-compat.yml           # Plugin compatibility matrix
1468 | │   │   ├── security-audit.yml          # cargo-audit + npm audit
1469 | │   │   └── docs.yml                    # Documentation deployment
1470 | │   ├── ISSUE_TEMPLATE/
1471 | │   │   ├── bug-report.yml
1472 | │   │   ├── feature-request.yml
1473 | │   │   ├── audio-glitch-report.yml     # Specialized: buffer size, driver info
1474 | │   │   └── plugin-compatibility.yml    # Plugin compat reports
1475 | │   ├── PULL_REQUEST_TEMPLATE.md
1476 | │   ├── CODEOWNERS                      # Maintainer assignment by path
1477 | │   └── dependabot.yml                  # Automated dependency updates
1478 | │
1479 | ├── apps/
1480 | │   ├── desktop/                        ← Main Tauri desktop application
1481 | │   │   ├── src-tauri/
1482 | │   │   │   ├── src/
1483 | │   │   │   │   ├── main.rs             # Entry point
1484 | │   │   │   │   ├── lib.rs              # Library root (for testing)
1485 | │   │   │   │   ├── app_state.rs        # Global application state
1486 | │   │   │   │   ├── setup.rs            # Initialization sequence
1487 | │   │   │   │   ├── commands/
1488 | │   │   │   │   │   ├── mod.rs
1489 | │   │   │   │   │   ├── project.rs      # Project commands (new, open, save)
1490 | │   │   │   │   │   ├── transport.rs    # Transport commands
1491 | │   │   │   │   │   ├── track.rs        # Track commands
1492 | │   │   │   │   │   ├── clip.rs         # Clip commands
1493 | │   │   │   │   │   ├── mixer.rs        # Mixer commands
1494 | │   │   │   │   │   ├── plugin.rs       # Plugin commands
1495 | │   │   │   │   │   ├── automation.rs   # Automation commands
1496 | │   │   │   │   │   ├── audio_device.rs # Audio device commands
1497 | │   │   │   │   │   ├── midi.rs         # MIDI device commands
1498 | │   │   │   │   │   └── settings.rs     # Settings commands
1499 | │   │   │   │   ├── events/
1500 | │   │   │   │   │   ├── mod.rs
1501 | │   │   │   │   │   ├── meter_emitter.rs
1502 | │   │   │   │   │   ├── transport_emitter.rs
1503 | │   │   │   │   │   └── plugin_emitter.rs
1504 | │   │   │   │   └── error.rs            # Error types and conversion
1505 | │   │   │   ├── Cargo.toml
1506 | │   │   │   ├── tauri.conf.json
1507 | │   │   │   ├── capabilities/           # Tauri v2 permission system
1508 | │   │   │   └── icons/                  # Platform icons (all sizes)
1509 | │   │   │
1510 | │   │   └── src/                        ← React/TypeScript frontend
1511 | │   │       ├── app/
1512 | │   │       │   ├── App.tsx
1513 | │   │       │   ├── Router.tsx
1514 | │   │       │   └── providers/
1515 | │   │       ├── components/
1516 | │   │       │   ├── transport/
1517 | │   │       │   │   ├── TransportBar.tsx
1518 | │   │       │   │   ├── PlayButton.tsx
1519 | │   │       │   │   ├── RecordButton.tsx
1520 | │   │       │   │   ├── BpmDisplay.tsx
1521 | │   │       │   │   └── TimecodeDisplay.tsx
1522 | │   │       │   ├── arrangement/
1523 | │   │       │   │   ├── ArrangementView.tsx
1524 | │   │       │   │   ├── TrackList.tsx
1525 | │   │       │   │   ├── TrackHeader.tsx
1526 | │   │       │   │   ├── TimelineLane.tsx
1527 | │   │       │   │   ├── AudioClip.tsx
1528 | │   │       │   │   ├── MidiClip.tsx
1529 | │   │       │   │   ├── Ruler.tsx
1530 | │   │       │   │   ├── Playhead.tsx
1531 | │   │       │   │   └── MiniTimeline.tsx
1532 | │   │       │   ├── mixer/
1533 | │   │       │   │   ├── MixerView.tsx
1534 | │   │       │   │   ├── ChannelStrip.tsx
1535 | │   │       │   │   ├── Fader.tsx
1536 | │   │       │   │   ├── PanKnob.tsx
1537 | │   │       │   │   ├── LevelMeter.tsx
1538 | │   │       │   │   ├── InsertSlot.tsx
1539 | │   │       │   │   └── SendSlot.tsx
1540 | │   │       │   ├── piano-roll/
1541 | │   │       │   │   ├── PianoRollView.tsx
1542 | │   │       │   │   ├── PianoKeys.tsx
1543 | │   │       │   │   ├── NoteGrid.tsx
1544 | │   │       │   │   ├── MidiNote.tsx
1545 | │   │       │   │   ├── VelocityEditor.tsx
1546 | │   │       │   │   └── QuantizeSelector.tsx
1547 | │   │       │   ├── browser/
1548 | │   │       │   │   ├── Browser.tsx
1549 | │   │       │   │   ├── AssetList.tsx
1550 | │   │       │   │   ├── PluginList.tsx
1551 | │   │       │   │   ├── PresetList.tsx
1552 | │   │       │   │   ├── SearchBar.tsx
1553 | │   │       │   │   ├── FilterPanel.tsx
1554 | │   │       │   │   └── PreviewPlayer.tsx
1555 | │   │       │   ├── device-view/
1556 | │   │       │   │   ├── DeviceView.tsx
1557 | │   │       │   │   ├── DeviceChain.tsx
1558 | │   │       │   │   ├── DeviceCard.tsx
1559 | │   │       │   │   └── ModulationRouting.tsx
1560 | │   │       │   ├── automation/
1561 | │   │       │   │   ├── AutomationView.tsx
1562 | │   │       │   │   ├── AutomationLane.tsx
1563 | │   │       │   │   └── AutomationCurve.tsx
1564 | │   │       │   ├── clip-launcher/
1565 | │   │       │   │   ├── ClipLauncherView.tsx
1566 | │   │       │   │   ├── ClipCell.tsx
1567 | │   │       │   │   └── SceneRow.tsx
1568 | │   │       │   └── shared/
1569 | │   │       │       ├── Knob.tsx
1570 | │   │       │       ├── Slider.tsx
1571 | │   │       │       ├── ContextMenu.tsx
1572 | │   │       │       ├── Modal.tsx
1573 | │   │       │       ├── Tooltip.tsx
1574 | │   │       │       └── ColorPicker.tsx
1575 | │   │       ├── hooks/
1576 | │   │       │   ├── useTransport.ts
1577 | │   │       │   ├── useProject.ts
1578 | │   │       │   ├── useTracks.ts
1579 | │   │       │   ├── useAudioDevice.ts
1580 | │   │       │   ├── useKeybindings.ts
1581 | │   │       │   └── useDragDrop.ts
1582 | │   │       ├── stores/
1583 | │   │       │   ├── project.store.ts
1584 | │   │       │   ├── transport.store.ts
1585 | │   │       │   ├── tracks.store.ts
1586 | │   │       │   ├── mixer.store.ts
1587 | │   │       │   ├── ui.store.ts
1588 | │   │       │   └── settings.store.ts
1589 | │   │       ├── sync/
1590 | │   │       │   ├── ProjectSync.ts      # Backend → store sync layer
1591 | │   │       │   ├── TransportSync.ts
1592 | │   │       │   └── MeterSync.ts
1593 | │   │       ├── ipc/
1594 | │   │       │   ├── commands.ts         # Generated IPC command bindings
1595 | │   │       │   └── events.ts           # Generated IPC event listeners
1596 | │   │       ├── workers/
1597 | │   │       │   └── waveform.worker.ts  # Web Worker for waveform processing
1598 | │   │       └── main.tsx
1599 | │   │
1600 | │   └── cli/                            ← audiaw CLI tool (diagnostics, etc.)
1601 | │       └── src/
1602 | │           ├── main.rs
1603 | │           ├── diagnose.rs             # System diagnostics command
1604 | │           ├── render.rs               # Headless render command
1605 | │           └── validate_plugin.rs      # Plugin validation command
1606 | │
1607 | ├── crates/
1608 | │   ├── audiaw-engine/
1609 | │   │   ├── src/
1610 | │   │   │   ├── lib.rs
1611 | │   │   │   ├── graph/
1612 | │   │   │   │   ├── mod.rs
1613 | │   │   │   │   ├── audio_graph.rs
1614 | │   │   │   │   ├── node.rs             # AudioNode trait
1615 | │   │   │   │   ├── edge.rs
1616 | │   │   │   │   ├── topo_sort.rs
1617 | │   │   │   │   ├── scheduler.rs        # Work-stealing scheduler
1618 | │   │   │   │   └── buffer_pool.rs      # Pre-allocated buffer pool
1619 | │   │   │   ├── dsp/
1620 | │   │   │   │   ├── mod.rs
1621 | │   │   │   │   ├── simd/
1622 | │   │   │   │   │   ├── mod.rs
1623 | │   │   │   │   │   ├── avx2.rs
1624 | │   │   │   │   │   ├── sse4.rs
1625 | │   │   │   │   │   └── neon.rs
1626 | │   │   │   │   ├── biquad.rs
1627 | │   │   │   │   ├── svf.rs
1628 | │   │   │   │   ├── dc_blocker.rs
1629 | │   │   │   │   ├── limiter.rs
1630 | │   │   │   │   ├── gain.rs
1631 | │   │   │   │   └── metering.rs
1632 | │   │   │   ├── transport/
1633 | │   │   │   │   ├── mod.rs
1634 | │   │   │   │   ├── transport_state.rs
1635 | │   │   │   │   └── tempo_map.rs
1636 | │   │   │   ├── midi/
1637 | │   │   │   │   ├── mod.rs
1638 | │   │   │   │   ├── event.rs
1639 | │   │   │   │   └── processor.rs
1640 | │   │   │   └── clip_trigger.rs         # Quantized clip launching
1641 | │   │   ├── benches/
1642 | │   │   │   ├── biquad_bench.rs
1643 | │   │   │   ├── graph_bench.rs
1644 | │   │   │   └── scheduler_bench.rs
1645 | │   │   └── Cargo.toml
1646 | │   │
1647 | │   ├── audiaw-audio-io/               ← Platform audio I/O
1648 | │   ├── audiaw-plugin-host/            ← Plugin hosting
1649 | │   ├── audiaw-project/                ← Project format
1650 | │   ├── audiaw-instruments/            ← Built-in instruments
1651 | │   ├── audiaw-effects/                ← Built-in effects
1652 | │   ├── audiaw-render/                 ← GPU waveform rendering
1653 | │   ├── audiaw-midi/                   ← MIDI I/O
1654 | │   ├── audiaw-types/                  ← Shared types (no external deps)
1655 | │   └── audiaw-diagnostics/            ← System diagnostics
1656 | │
1657 | ├── packages/
1658 | │   ├── ui-components/                  ← Shared React components
1659 | │   │   ├── src/
1660 | │   │   │   ├── Knob/
1661 | │   │   │   ├── Slider/
1662 | │   │   │   ├── Button/
1663 | │   │   │   └── index.ts
1664 | │   │   └── package.json
1665 | │   ├── icons/                          ← Icon library
1666 | │   │   ├── src/
1667 | │   │   │   ├── icons/                  # SVG source files
1668 | │   │   │   └── index.ts                # React components
1669 | │   │   └── package.json
1670 | │   ├── theme/                          ← Design tokens
1671 | │   │   ├── tokens/
1672 | │   │   │   ├── dark.json
1673 | │   │   │   └── light.json
1674 | │   │   ├── src/
1675 | │   │   │   └── index.ts
1676 | │   │   └── package.json
1677 | │   └── ipc-types/                      ← Generated IPC types
1678 | │       ├── src/
1679 | │       │   └── generated/              # Auto-generated, do not edit
1680 | │       └── package.json
1681 | │
1682 | ├── tools/
1683 | │   ├── codegen/                        ← Type generation (Rust → TypeScript)
1684 | │   │   ├── src/
1685 | │   │   │   └── main.rs
1686 | │   │   └── Cargo.toml
1687 | │   ├── benchmark/
1688 | │   │   ├── run_dsp_benchmarks.sh
1689 | │   │   └── compare_to_baseline.py
1690 | │   ├── plugin-validator/               ← CLI plugin validation tool
1691 | │   └── release/
1692 | │       ├── bump_version.sh
1693 | │       └── generate_changelog.sh
1694 | │
1695 | ├── docs/
1696 | │   ├── architecture/                   ← Architecture documents (this file)
1697 | │   │   ├── vol1-prd-architecture-audio-engine.md
1698 | │   │   ├── vol2-ux-user-flows-plugins.md
1699 | │   │   ├── vol3-project-performance-live-instruments.md
1700 | │   │   └── vol4-systems-standards-governance-roadmap.md
1701 | │   ├── contributing/
1702 | │   │   ├── CONTRIBUTING.md
1703 | │   │   ├── DEVELOPMENT_SETUP.md
1704 | │   │   ├── REALTIME_SAFETY.md          ← Critical reading for audio PRs
1705 | │   │   ├── CODE_REVIEW_GUIDE.md
1706 | │   │   └── FIRST_CONTRIBUTION.md
1707 | │   ├── user-guide/
1708 | │   │   ├── getting-started.md
1709 | │   │   ├── interface-overview.md
1710 | │   │   ├── arrangement-view.md
1711 | │   │   ├── piano-roll.md
1712 | │   │   ├── mixer.md
1713 | │   │   ├── instruments/
1714 | │   │   └── effects/
1715 | │   ├── rfcs/                           ← RFC proposals
1716 | │   │   └── TEMPLATE.md
1717 | │   ├── api/                            ← Generated API docs
1718 | │   └── specs/
1719 | │       ├── ipc-schema.json             ← Source of truth for IPC API
1720 | │       ├── project-format.md
1721 | │       └── plugin-sdk.md
1722 | │
1723 | ├── tests/
1724 | │   ├── integration/                    ← Cross-crate integration tests
1725 | │   ├── audio-regression/               ← DSP regression test suite
1726 | │   │   ├── references/                 # Reference output files
1727 | │   │   └── tests/
1728 | │   ├── plugin-compat/                  ← Plugin compatibility tests
1729 | │   └── performance/                    ← Performance regression tests
1730 | │
1731 | ├── assets/
1732 | │   ├── samples/                        ← Bundled sample library (CC0)
1733 | │   │   ├── drums/
1734 | │   │   ├── bass/
1735 | │   │   ├── synths/
1736 | │   │   └── sfx/
1737 | │   ├── presets/                        ← Default presets for all instruments
1738 | │   ├── templates/                      ← Project templates by genre
1739 | │   └── icons/
1740 | │       ├── icon.png                    # 1024×1024 source
1741 | │       ├── icon.ico                    # Windows
1742 | │       ├── icon.icns                   # macOS
1743 | │       └── icon.svg                    # Source vector
1744 | │
1745 | ├── Cargo.toml                          # Workspace manifest
1746 | ├── Cargo.lock
1747 | ├── package.json                        # pnpm workspace root
1748 | ├── pnpm-workspace.yaml
1749 | ├── turbo.json                          # Turborepo pipeline config
1750 | ├── rust-toolchain.toml                 # Pinned: stable-2025-XX-XX
1751 | ├── .clippy.toml                        # Clippy configuration
1752 | ├── .rustfmt.toml                       # Rustfmt configuration
1753 | ├── .eslintrc.json                      # ESLint configuration
1754 | ├── tsconfig.base.json                  # Shared TypeScript config
1755 | ├── LICENSE                             # GPLv3
1756 | ├── LICENSE-MIT                         # MIT (for plugin SDK)
1757 | ├── CHANGELOG.md                        # Generated by git-cliff
1758 | ├── CONTRIBUTING.md                     # Top-level contributor entry point
1759 | ├── CODE_OF_CONDUCT.md
1760 | ├── SECURITY.md                         # Security disclosure policy
1761 | └── README.md
1762 | ```
1763 | 
1764 | ---
1765 | 
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files
IBM BOB\BOB.md

# VSCode Open Tabs
IBM BOB/BOB.md

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T15:38:58.457Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.08

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>plan</slug>
<name>📝 Plan</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<read_file>
<args>
  <file>
    <path>DOCS/AUDIAW-DOCS-VOL1.md</path>
    <line_range>1349-1457</line_range>
  </file>
  <file>
    <path>DOCS/AUDIAW-DOCS-VOL1.md</path>
    <line_range>889-965</line_range>
  </file>
  <file>
    <path>DOCS/AUDIAW-DOCS-VOL3.md</path>
    <line_range>19-175</line_range>
  </file>
  <file>
    <path>DOCS/AUDIAW-DOCS-VOL4.md</path>
    <line_range>2297-2320</line_range>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 4 files] Result:
<files>
<file><path>DOCS/AUDIAW-DOCS-VOL1.md</path>
<content lines="1349-1457">
1349 | ## 3.3 Realtime Systems
1350 | 
1351 | ### 3.3.1 Lock-Free Threading Model
1352 | 
1353 | The audio thread communicates with all other threads **exclusively through lock-free data structures**. This is non-negotiable for realtime audio.
1354 | 
1355 | **Parameter Updates (UI → Audio):**
1356 | 
1357 | ```rust
1358 | /// Lock-free SPSC ring buffer for parameter updates
1359 | pub struct ParamUpdateQueue {
1360 |     ring: RingBuffer<ParamUpdate, 4096>,
1361 |     // 4096 slots = sufficient for all params in a typical session
1362 | }
1363 | 
1364 | // UI thread:
1365 | queue.producer().push(ParamUpdate {
1366 |     node_id,
1367 |     param_id,
1368 |     value: ParamValue::Float(0.5),
1369 |     sample_offset: transport.current_sample(),
1370 | });
1371 | 
1372 | // Audio thread (in callback):
1373 | while let Some(update) = queue.consumer().pop() {
1374 |     self.graph.node(update.node_id)
1375 |         .receive_param_update(update);
1376 | }
1377 | ```
1378 | 
1379 | **State Queries (Audio → Main):**
1380 | 
1381 | The audio thread should never query state. Instead, it maintains a **local snapshot** of all state it needs, updated asynchronously via lock-free channels. Examples:
1382 | - Tempo: stored as atomic float, updated on tempo changes
1383 | - Time signature: stored as two atomics (numerator, denominator)
1384 | - Loop range: stored as two atomic i64s (start sample, end sample)
1385 | - Plugin parameter values: stored locally in each node's state
1386 | 
1387 | **Notifications (Audio → UI):**
1388 | 
1389 | Audio-to-UI notifications use a **lock-free MPSC queue** (multiple producer — one audio thread, one render thread — single consumer — UI). Used for:
1390 | - Level meter values
1391 | - Playhead position
1392 | - Dropout events
1393 | - Plugin crash notifications
1394 | 
1395 | ### 3.3.2 Multi-Core Audio Scheduling
1396 | 
1397 | AUDIAW uses a **work-stealing scheduler** for parallel audio processing. Independent subgraphs can be processed concurrently:
1398 | 
1399 | ```
1400 | Example: 8 tracks, 4 CPU cores
1401 | 
1402 | Serial topology order: [T1, T2, T3, T4, T5, T6, T7, T8, GroupA, GroupB, Master]
1403 | 
1404 | Dependencies:
1405 |   T1 → GroupA
1406 |   T2 → GroupA
1407 |   T3 → GroupA
1408 |   T4 → GroupB
1409 |   T5 → GroupB
1410 |   T6 → GroupB
1411 |   T7 → Master (no group)
1412 |   T8 → Master (no group)
1413 |   GroupA → Master
1414 |   GroupB → Master
1415 | 
1416 | Parallel execution:
1417 |   Core 0: T1, T4, GroupA (blocked on T1, T2, T3)
1418 |   Core 1: T2, T5, GroupB (blocked on T4, T5, T6)
1419 |   Core 2: T3, T6, T7
1420 |   Core 3: T8
1421 |   
1422 |   After all complete:
1423 |   Core 0: Master
1424 | ```
1425 | 
1426 | The scheduler computes the dependency levels (nodes with no dependencies are Level 0, nodes dependent only on Level 0 are Level 1, etc.) and dispatches all nodes of the same level simultaneously.
1427 | 
1428 | **Work-stealing details:**
1429 | - Each core has a local deque of work items
1430 | - When a core exhausts its deque, it steals from the tail of another core's deque
1431 | - Work items are NodeId + buffer allocation handles
1432 | - Lock-free atomic operations for all coordination
1433 | 
1434 | **Thread count:** Defaults to `min(physical_cores - 1, 8)`. The -1 reserves one core for the OS and UI. Configurable in audio settings.
1435 | 
1436 | ### 3.3.3 Audio Callback Safety
1437 | 
1438 | The AUDIAW audio callback is **the most critical code path in the application**. Violations of realtime safety cause audible glitches that directly damage the user experience.
1439 | 
1440 | **Realtime Safety Rules (enforced by code review + linting):**
1441 | 
1442 | 1. **NO `Box::new()`, `Vec::new()`, or any heap allocation** — all memory must be pre-allocated
1443 | 2. **NO `Mutex::lock()` or any blocking synchronization** — use lock-free structures only
1444 | 3. **NO `std::fs::*` or any blocking I/O** — disk reads happen in background threads
1445 | 4. **NO unbounded loops** — all loops must have known iteration counts
1446 | 5. **NO `println!()` or synchronous logging** — use async log ring buffer
1447 | 6. **NO `thread::sleep()` or any sleep** — never
1448 | 7. **NO `panic!()` in release builds** — all errors must be handled gracefully
1449 | 8. **NO floating-point NaN/Inf production** — validate inputs, clamp outputs
1450 | 9. **NO dynamic dispatch beyond known-bounded trait objects** — vtable overhead is acceptable, but unknown recursion depth is not
1451 | 10. **NO calls to any external library not explicitly audited for realtime safety**
1452 | 
1453 | These rules are enforced through:
1454 | - Custom Clippy lints that flag disallowed operations in `#[realtime_safe]` annotated functions
1455 | - Code review checklist item for all audio path PRs
1456 | - Runtime assertion in debug builds: realtime thread detector that panics if a forbidden operation is detected
1457 | 
</content>
</file>
<file><path>DOCS/AUDIAW-DOCS-VOL3.md</path>
<content lines="19-175">
 19 | # 9. PROJECT FILE FORMAT SPECIFICATION
 20 | 
 21 | ## 9.1 Design Philosophy
 22 | 
 23 | The AUDIAW project file format is built on five non-negotiable requirements:
 24 | 
 25 | **1. Portability.** A project file created on Linux must open identically on macOS and Windows. No absolute paths. No OS-specific identifiers. No platform-native encodings embedded in binary blobs.
 26 | 
 27 | **2. Versionability.** Every project file carries its schema version. Migrations are deterministic, documented, and fully tested. A project from AUDIAW v1.0 must open in AUDIAW v5.0 without manual intervention.
 28 | 
 29 | **3. Recoverability.** A partially written or corrupted project file must yield the maximum recoverable state. The format is designed so that truncation, partial write failure, or individual section corruption degrades gracefully rather than causing total loss.
 30 | 
 31 | **4. Performance.** Large projects (100+ tracks, thousands of clips, millions of automation points) must load in under 15 seconds on consumer hardware. The format is designed for efficient parsing: indexed access to large data sections, lazy-loading for sample data, and compressed storage for dense data.
 32 | 
 33 | **5. Auditability.** The project format must be inspectable by humans and parseable by third-party tools. This supports ecosystem development (import/export tools, version diffing, backup scripts) and community trust.
 34 | 
 35 | ## 9.2 File Format Architecture
 36 | 
 37 | ### 9.2.1 Container Structure
 38 | 
 39 | AUDIAW project files use a **custom container format** (`.audiaw`) with the following structure:
 40 | 
 41 | ```
 42 | AUDIAW Project Container (.audiaw)
 43 | ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 44 | 
 45 | [MAGIC BYTES]  8 bytes   "AUDIAW\0\0"
 46 | [VERSION]      4 bytes   u32, format version (current: 1)
 47 | [FLAGS]        4 bytes   Bitfield: compression, encryption, etc.
 48 | [MANIFEST]     variable  JSON manifest (index of sections)
 49 | [SECTION: core]          Core project data (MessagePack)
 50 | [SECTION: tracks]        Track definitions (MessagePack)
 51 | [SECTION: clips]         Clip data (MessagePack)
 52 | [SECTION: automation]    Automation data (compressed, MessagePack)
 53 | [SECTION: plugins]       Plugin state blobs (opaque, per-plugin)
 54 | [SECTION: mixer]         Mixer state (MessagePack)
 55 | [SECTION: assets]        Bundled assets (optional, zstd compressed)
 56 | [SECTION: undo]          Undo history (MessagePack, optional)
 57 | [SECTION: metadata]      User notes, cover art, tags
 58 | [CHECKSUM]     32 bytes  SHA-256 of all preceding content
 59 | 
 60 | ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 61 | ```
 62 | 
 63 | **Why not plain ZIP (like many DAWs)?**
 64 | 
 65 | ZIP-based formats (used by Ableton, FL Studio, Bitwig for their projects) have several drawbacks:
 66 | - ZIP is not designed for incremental writes — every save rewrites the entire archive
 67 | - Random-access within ZIP requires full index scan
 68 | - Corruption of the central directory destroys the entire archive
 69 | - ZIP's specification has subtle implementation differences across platforms
 70 | 
 71 | AUDIAW's custom container format allows:
 72 | - **Incremental saves:** Only changed sections are rewritten
 73 | - **O(1) section access:** The manifest provides byte offsets for direct seeks
 74 | - **Section-level checksums:** Individual sections can be validated without reading the entire file
 75 | - **Append-only autosave:** Autosave snapshots are appended to the container without rewriting
 76 | 
 77 | ### 9.2.2 Manifest Structure (JSON)
 78 | 
 79 | The manifest is a JSON document embedded in the container header that describes all sections:
 80 | 
 81 | ```json
 82 | {
 83 |   "format": "audiaw-project",
 84 |   "version": 1,
 85 |   "schema_version": "1.0.0",
 86 |   "created_at": "2025-01-15T14:23:01Z",
 87 |   "modified_at": "2025-01-15T16:45:22Z",
 88 |   "audiaw_version": "1.0.0",
 89 |   "platform": "linux-x64",
 90 |   "sections": {
 91 |     "core": {
 92 |       "offset": 4096,
 93 |       "length": 2048,
 94 |       "compression": "none",
 95 |       "checksum": "sha256:abc123..."
 96 |     },
 97 |     "tracks": {
 98 |       "offset": 6144,
 99 |       "length": 8192,
100 |       "compression": "zstd-3",
101 |       "checksum": "sha256:def456..."
102 |     },
103 |     "clips": {
104 |       "offset": 14336,
105 |       "length": 65536,
106 |       "compression": "zstd-3",
107 |       "checksum": "sha256:ghi789..."
108 |     },
109 |     "automation": {
110 |       "offset": 79872,
111 |       "length": 204800,
112 |       "compression": "zstd-19",
113 |       "checksum": "sha256:jkl012..."
114 |     }
115 |   },
116 |   "assets": {
117 |     "policy": "external-relative",
118 |     "search_paths": [
119 |       ".",
120 |       "./samples",
121 |       "./audio"
122 |     ]
123 |   }
124 | }
125 | ```
126 | 
127 | ### 9.2.3 Core Section Schema
128 | 
129 | The core section contains project-wide settings and the transport state:
130 | 
131 | ```rust
132 | // Rust representation (serialized to MessagePack)
133 | pub struct ProjectCore {
134 |     pub id: ProjectId,              // UUID v4, globally unique
135 |     pub name: String,
136 |     pub description: Option<String>,
137 |     
138 |     // Transport
139 |     pub tempo_map: TempoMap,        // Multiple tempo events
140 |     pub time_signature_map: TimeSigMap,
141 |     pub key_signature: Option<KeySignature>,
142 |     
143 |     // Playback state (restored on open)
144 |     pub playhead_position: SamplePosition,
145 |     pub loop_start: Option<SamplePosition>,
146 |     pub loop_end: Option<SamplePosition>,
147 |     pub loop_enabled: bool,
148 |     
149 |     // Audio settings (per-project preferences, may differ from global)
150 |     pub preferred_sample_rate: Option<u32>,
151 |     pub preferred_bit_depth: BitDepth,
152 |     
153 |     // Arrangement
154 |     pub arrangement_duration: SamplePosition,  // Total project length
155 |     pub arrangement_end_action: EndAction,      // Stop, Continue, Loop
156 |     
157 |     // Metadata
158 |     pub created_at: DateTime<Utc>,
159 |     pub modified_at: DateTime<Utc>,
160 |     pub tags: Vec<String>,
161 |     pub color: Option<ProjectColor>,
162 | }
163 | 
164 | pub struct TempoMap {
165 |     /// Sorted list of tempo events. First event is always at position 0.
166 |     pub events: Vec<TempoEvent>,
167 | }
168 | 
169 | pub struct TempoEvent {
170 |     pub position: SamplePosition,   // Sample position (tempo changes are sample-accurate)
171 |     pub bpm: f64,                    // Beats per minute (24.0 to 960.0)
172 |     pub curve: TempoCurve,           // Linear, Instant, Exponential
173 | }
174 | ```
175 | 
</content>
</file>
<file><path>DOCS/AUDIAW-DOCS-VOL4.md</path>
<content lines="2297-2320">
2297 | ## APPENDIX A: Technology Dependency Registry
2298 | 
2299 | | Dependency | Version (pinned) | License | Domain | Notes |
2300 | |---|---|---|---|---|
2301 | | Tauri | 2.x | MIT/Apache 2.0 | App shell | Desktop framework |
2302 | | React | 18.x | MIT | UI | Frontend framework |
2303 | | TypeScript | 5.x | Apache 2.0 | UI | Type system |
2304 | | Zustand | 4.x | MIT | UI | State management |
2305 | | Tailwind CSS | 3.x | MIT | UI | Utility CSS |
2306 | | CPAL | 0.15.x | Apache 2.0 | Audio | Audio I/O |
2307 | | WGPU | 0.19.x | MIT/Apache 2.0 | Rendering | GPU rendering |
2308 | | Tokio | 1.x | MIT | Async | Async runtime |
2309 | | Serde | 1.x | MIT/Apache 2.0 | Serialization | Data serialization |
2310 | | rmp-serde | 1.x | MIT | Serialization | MessagePack |
2311 | | SQLite (rusqlite) | 0.31.x | MIT | Storage | Asset index |
2312 | | zstd | 0.13.x | BSD/GPL | Compression | Data compression |
2313 | | Arc-Swap | 1.x | MIT/Apache 2.0 | Concurrency | Atomic pointer swap |
2314 | | Crossbeam | 0.8.x | MIT/Apache 2.0 | Concurrency | Lock-free structures |
2315 | | Clap (CLI) | 4.x | MIT/Apache 2.0 | CLI | CLI argument parsing |
2316 | | git-cliff | 1.x | MIT | DevOps | Changelog generation |
2317 | | Turborepo | 1.x | MIT | Build | Monorepo orchestration |
2318 | 
2319 | ---
2320 | 
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files
IBM BOB\BOB.md

# VSCode Open Tabs
IBM BOB/BOB.md

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T15:39:04.309Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.16

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>plan</slug>
<name>📝 Plan</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<read_file>
<args>
  <file>
    <path>DOCS/AUDIAW-DOCS-VOL1.md</path>
    <line_range>1195-1304</line_range>
  </file>
  <file>
    <path>DOCS/AUDIAW-DOCS-VOL2.md</path>
    <line_range>380-545</line_range>
  </file>
  <file>
    <path>DOCS/AUDIAW-DOCS-VOL3.md</path>
    <line_range>1110-1201</line_range>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 'DOCS/AUDIAW-DOCS-VOL1.md', 'DOCS/AUDIAW-DOCS-VOL2.md', 'DOCS/AUDIAW-DOCS-VOL3.md'] Result:
<files>
<file><path>DOCS/AUDIAW-DOCS-VOL1.md</path>
<content lines="1195-1304">
1195 | ## 3.2 DSP Graph Architecture
1196 | 
1197 | AUDIAW's audio engine is organized as a **directed acyclic processing graph** (with controlled cycle support for feedback loops). Each node in the graph represents a processing unit: an instrument, an effect, a mixer channel, a send, or a hardware I/O.
1198 | 
1199 | ### 3.2.1 Graph Node Types
1200 | 
1201 | ```
1202 | AudioNode trait
1203 | ├── SourceNode          — Generates audio (instruments, audio clips)
1204 | │   ├── SamplerNode
1205 | │   ├── InstrumentPluginNode
1206 | │   ├── AudioClipNode
1207 | │   └── SynthNode (wavetable, FM, granular, etc.)
1208 | │
1209 | ├── ProcessorNode       — Transforms audio (effects, mixer channels)
1210 | │   ├── EffectChainNode
1211 | │   ├── MixerChannelNode
1212 | │   ├── PluginEffectNode
1213 | │   └── BuiltinEffectNode (EQ, Comp, Reverb, etc.)
1214 | │
1215 | ├── RouterNode          — Routes audio without modification
1216 | │   ├── SplitterNode    — 1 input → N outputs
1217 | │   ├── MergerNode      — N inputs → 1 output (summing)
1218 | │   ├── SendNode        — Copy signal to aux bus
1219 | │   └── ReturnNode      — Receive signal from aux bus
1220 | │
1221 | └── SinkNode            — Consumes audio (hardware output, render output)
1222 |     ├── HardwareOutputNode
1223 |     ├── BusOutputNode
1224 |     └── RenderOutputNode
1225 | ```
1226 | 
1227 | ### 3.2.2 Graph Evaluation Algorithm
1228 | 
1229 | The audio graph is evaluated using a **topological sort** computed on the main thread when the graph changes. The sorted evaluation order is then safely communicated to the audio thread via an atomic pointer swap (lock-free).
1230 | 
1231 | ```rust
1232 | pub struct AudioGraph {
1233 |     nodes: SlotMap<NodeId, Box<dyn AudioNode>>,
1234 |     edges: HashMap<NodeId, Vec<NodeId>>,    // adjacency list
1235 |     eval_order: ArcSwap<Vec<NodeId>>,       // atomically swappable eval order
1236 | }
1237 | 
1238 | impl AudioGraph {
1239 |     /// Called on main thread when topology changes
1240 |     pub fn recompute_eval_order(&self) {
1241 |         let new_order = topological_sort(&self.nodes, &self.edges);
1242 |         self.eval_order.store(Arc::new(new_order));
1243 |     }
1244 |     
1245 |     /// Called in audio callback — MUST be realtime safe
1246 |     pub fn process(&self, context: &mut AudioContext) {
1247 |         let order = self.eval_order.load();
1248 |         for node_id in order.iter() {
1249 |             if let Some(node) = self.nodes.get(*node_id) {
1250 |                 node.process(context);
1251 |             }
1252 |         }
1253 |     }
1254 | }
1255 | ```
1256 | 
1257 | **Why topological sort?** The processing order must respect data dependencies: a reverb effect on a track must process after the track's instrument has generated audio. Topological sort produces a valid linear ordering of nodes that respects all edge dependencies.
1258 | 
1259 | **Why atomic pointer swap?** When the user adds a track, the graph topology changes. We cannot stop the audio thread to recompute the evaluation order. Instead, we compute the new order on the main thread and atomically swap the pointer. The audio thread always works with a consistent snapshot of the evaluation order.
1260 | 
1261 | **Cycle detection:** Pure cycles (A → B → A) are invalid in the audio graph. AUDIAW detects cycles at graph modification time and rejects the change. **Feedback cycles** (for physical modeling, convolution, etc.) are handled via dedicated feedback delay nodes that introduce a one-buffer delay, breaking the cycle for evaluation purposes.
1262 | 
1263 | ### 3.2.3 Node Processing Contract
1264 | 
1265 | Every AudioNode must implement the following contract:
1266 | 
1267 | ```rust
1268 | pub trait AudioNode: Send {
1269 |     /// Called once when node is added to graph. May allocate.
1270 |     fn initialize(&mut self, config: &AudioConfig) -> Result<(), AudioError>;
1271 |     
1272 |     /// Called in audio callback. MUST be realtime-safe.
1273 |     /// - NO heap allocation
1274 |     /// - NO mutex acquisition  
1275 |     /// - NO blocking I/O
1276 |     /// - NO floating point exception (must validate NaN/Inf on debug builds)
1277 |     fn process(&mut self, context: &mut NodeContext) -> ProcessResult;
1278 |     
1279 |     /// Called when graph is stopped. May block.
1280 |     fn shutdown(&mut self);
1281 |     
1282 |     /// Receive parameter update from UI. MUST be realtime-safe.
1283 |     fn receive_param_update(&mut self, update: ParamUpdate);
1284 |     
1285 |     /// Receive MIDI event. MUST be realtime-safe.
1286 |     fn receive_midi(&mut self, event: MidiEvent);
1287 |     
1288 |     /// Provide parameter info for automation/UI binding.
1289 |     fn param_info(&self) -> &[ParamInfo];
1290 |     
1291 |     /// Unique identifier for this node type (used in serialization)
1292 |     fn type_id(&self) -> NodeTypeId;
1293 | }
1294 | ```
1295 | 
1296 | The `NodeContext` provides the node with:
1297 | - Input audio buffers (read-only views of connected node outputs)
1298 | - Output audio buffers (pre-allocated, write-only)
1299 | - Current sample position
1300 | - Buffer size
1301 | - Sample rate
1302 | - Reference to the realtime allocator
1303 | - MIDI event list for this buffer period
1304 | 
</content>
</file>
<file><path>DOCS/AUDIAW-DOCS-VOL2.md</path>
<content lines="380-545">
380 | ## 5.1 Main Arrangement View
381 | 
382 | The Arrangement View is the primary working surface of AUDIAW. It represents time horizontally and tracks vertically, with audio/MIDI clips as rectangular objects on the timeline.
383 | 
384 | ### 5.1.1 Layout Anatomy
385 | 
386 | ```
387 | ARRANGEMENT VIEW — ANATOMY
388 | 
389 | ┌────────────────────────────────────────────────────────────────────┐
390 | │  RULER AREA                                                         │
391 | │  [Bar 1     ][Bar 2     ][Bar 3     ][Bar 4     ][Bar 5     ]...   │
392 | │  [1.1.1][1.2.1][1.3.1][1.4.1][2.1.1]...  ← tick marks             │
393 | ├──────────────────┬─────────────────────────────────────────────────┤
394 | │  TRACK HEADER    │  TIMELINE LANE                                   │
395 | │  ┌──────────────┐│┌──────────────────────────────────────────────┐ │
396 | │  │► Track 1     │││  [  CLIP A  ][  CLIP B  ]                    │ │
397 | │  │  Kick Drum   │││                                               │ │
398 | │  │  ♪ ○ ◉  🔇  │││                                               │ │
399 | │  └──────────────┘│└──────────────────────────────────────────────┘ │
400 | │  ┌──────────────┐│┌──────────────────────────────────────────────┐ │
401 | │  │► Track 2     │││  [      CLIP C               ][  CLIP D  ]   │ │
402 | │  │  Bass Synth  │││                                               │ │
403 | │  │  ♪ ○ ◉  🔇  │││                                               │ │
404 | │  └──────────────┘│└──────────────────────────────────────────────┘ │
405 | │  [+] Add Track   │                                                  │
406 | ├──────────────────┴─────────────────────────────────────────────────┤
407 | │  MINI TIMELINE (overview/navigation bar)                            │
408 | │  [▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] │
409 | └────────────────────────────────────────────────────────────────────┘
410 | ```
411 | 
412 | ### 5.1.2 Track Header Controls
413 | 
414 | The track header is a 216px wide panel containing all track controls:
415 | 
416 | **Standard Track Header (48px height):**
417 | ```
418 | [Color Bar][▶ Expand][  Track Name  (editable) ][🔇][◉][○][…]
419 |            Collapse    Double-click to rename    Mute Record Solo Menu
420 | ```
421 | 
422 | Controls (left to right):
423 | 1. **Color indicator strip** (4px): Click to open color picker. Drag to change color with visual preview.
424 | 2. **Expand/collapse toggle** (12px): Expand track to show waveform detail or collapse to 32px compact mode
425 | 3. **Track icon** (16px): Indicates track type. Audio (waveform icon), MIDI (note icon), Group (folder icon), Return (arrow icon)
426 | 4. **Track name** (elastic): Single click selects, double-click enters inline edit mode. 32-character display limit with text overflow ellipsis.
427 | 5. **Mute button** (M): Press M key with track focused. Visual: speaker icon. Muted state: icon with strikethrough + track lane desaturates to 30% opacity.
428 | 6. **Solo button** (S): Press S key. Visual: headphones icon. Solo state: all other tracks semi-transparent.
429 | 7. **Record arm button** (R): Press R key. Visual: circle icon (record symbol). Armed state: red dot, lane background shows subtle red tint.
430 | 8. **Track menu** (⋯): Contains: rename, color, duplicate, delete, freeze, export as stem, track properties.
431 | 
432 | **Compact Track Header (32px height):**
433 | All controls persist but labels are hidden. Icons only. Track name tooltip on hover.
434 | 
435 | **Tall Track Header (80px height):**
436 | Adds: volume fader (horizontal slider), pan knob, and pre-fader level meter. All editable inline.
437 | 
438 | ### 5.1.3 Timeline Lane & Clip Design
439 | 
440 | **Audio Clip anatomy:**
441 | ```
442 | ┌───────────────────────────────────────────────────┐
443 | │ Clip Name          [🔁 loop indicator]             │  ← Header bar (14px)
444 | │▓▓▓▓▓▓▓▓▓▓▓▓█░░░░░░██▓▓▓▓▓▓▓▓▓▓░░░░░░░░░█▓▓▓▓▓   │  ← Waveform
445 | │                                                    │
446 | └────────────────────────────────────────────────────┘
447 |   ▲                                                ▲
448 |   Left resize handle                   Right resize handle
449 | ```
450 | 
451 | Clip header bar contains:
452 | - Clip name (click to rename in-place)
453 | - Loop indicator (visible when clip is looped)
454 | - Clip color (inherits track color by default; independently overridable)
455 | 
456 | Waveform rendering:
457 | - GPU-accelerated via WGPU (see Architecture document)
458 | - Minimum 2px visible even for very short clips
459 | - RMS envelope as filled area + peak outline
460 | - Empty audio shows dotted outline
461 | - MIDI clips show colored MIDI note bars instead of waveform
462 | 
463 | **Clip interaction model:**
464 | 
465 | | Interaction | Effect | Cursor |
466 | |---|---|---|
467 | | Click (no modifier) | Select clip, deselect others | Pointer |
468 | | Shift+Click | Add to selection | Pointer |
469 | | Ctrl/Cmd+Click | Toggle in selection | Pointer |
470 | | Drag center | Move clip | Grab |
471 | | Drag left edge | Trim clip start | Resize-left |
472 | | Drag right edge | Trim clip end | Resize-right |
473 | | Alt+Drag | Create clip copy (non-destructive) | Copy |
474 | | Double-click audio | Open clip in waveform editor | — |
475 | | Double-click MIDI | Open clip in piano roll | — |
476 | | Right-click | Context menu | — |
477 | | Mouse wheel | Scroll timeline | — |
478 | | Ctrl+Mouse wheel | Zoom timeline horizontally | — |
479 | 
480 | **Context menu contents:**
481 | - Rename
482 | - Color (submenu with palette)
483 | - Duplicate
484 | - Loop (toggle)
485 | - Crop to content
486 | - Reverse (audio only)
487 | - Normalize (audio only)
488 | - Pitch shift (semitones ± input)
489 | - Time stretch (% input)
490 | - Export clip as audio
491 | - Convert to pattern (extract to reusable pattern)
492 | - Delete
493 | 
494 | ### 5.1.4 Selection Systems
495 | 
496 | **Selection models:**
497 | 
498 | 1. **Single selection:** Click a clip. Selection indicator: highlighted border, header bar darkens.
499 | 2. **Multi-selection:** Shift+Click, Ctrl/Cmd+Click, or rubber-band drag (click empty timeline space and drag)
500 | 3. **Track selection:** Click track header. All clips in track highlight.
501 | 4. **Time range selection:** Click-drag on the ruler. Creates a time selection overlay. Operations apply to selected time range.
502 | 5. **Combined selection:** Time range + track selection = operations apply to clips in selected tracks within selected time range.
503 | 
504 | **Selection affordances:**
505 | - Selected clips have a distinct border highlight (2px, accent color)
506 | - Group selection count shown in status bar: "3 clips selected"
507 | - Selection can be extended with Shift+Arrow keys (by snap unit)
508 | - Select All: Ctrl/Cmd+A (all clips in project)
509 | - Deselect: Escape or click empty space
510 | 
511 | ### 5.1.5 Zoom & Navigation
512 | 
513 | **Horizontal zoom:**
514 | - Ctrl+Mouse wheel: zoom centered on cursor position
515 | - Ctrl+Plus / Ctrl+Minus: zoom in/out centered on playhead
516 | - Ctrl+0: fit project to window width
517 | - Ctrl+1: zoom to selection
518 | - Zoom range: 1 pixel = 1 sample (maximum zoom-in) to 1 pixel = 4 bars (maximum zoom-out)
519 | - Zoom transitions are animated (80ms ease-out) but can be disabled in preferences
520 | 
521 | **Vertical zoom (track height):**
522 | - Ctrl+Alt+Mouse wheel: resize all track heights proportionally
523 | - Individual track: drag bottom edge of track header
524 | - `Z` key: cycle through compact/standard/tall for selected tracks
525 | 
526 | **Mini timeline (overview bar):**
527 | - Always shows full project duration
528 | - Viewport indicator: filled region showing current visible area
529 | - Drag viewport indicator to scroll
530 | - Click outside viewport indicator to jump (centers view on click position)
531 | - Highlighted clip density visualization to show content location
532 | 
533 | **Keyboard navigation (Vim-style for power users):**
534 | ```
535 | H / L          ← → scroll timeline
536 | J / K          ↑ ↓ select next/previous track
537 | Shift+H/L      scroll faster (4x)
538 | Z (hold)       zoom in while held
539 | X (hold)       zoom out while held
540 | F              fit project to window
541 | Shift+F        fit selection to window
542 | ```
543 | 
544 | ---
545 | 
</content>
</file>
<file><path>DOCS/AUDIAW-DOCS-VOL3.md</path>
<content lines="1110-1201">
1110 | ## 12.2 AUDIAW Sampler
1111 | 
1112 | ### 12.2.1 Architecture Overview
1113 | 
1114 | The AUDIAW Sampler is a multi-layer, multi-sample instrument with a flexible mapping system:
1115 | 
1116 | ```
1117 | SAMPLER ARCHITECTURE
1118 | 
1119 | MIDI Input
1120 |     │
1121 |     ▼
1122 | Voice Manager
1123 |   │ Polyphony: 1–256 voices
1124 |   │ Voice stealing algorithm: configurable
1125 |   │
1126 |   ├─ Voice 1 ──► Sample Selector ──► Stream Reader ──► Playback Engine
1127 |   ├─ Voice 2 ──► ...
1128 |   └─ Voice N ──► ...
1129 |                                               │
1130 |                                               ▼
1131 |                                     DSP per voice:
1132 |                                     ├─ Pitch/Tuning
1133 |                                     ├─ Sample Rate Conversion
1134 |                                     ├─ Envelope (AHDSR)
1135 |                                     ├─ Filter (6 types)
1136 |                                     ├─ LFO (2× per voice)
1137 |                                     └─ Velocity → Amp/Filter mapping
1138 |                                               │
1139 |                                               ▼
1140 |                                     Voice mixer (sum all voices)
1141 |                                               │
1142 |                                               ▼
1143 |                                     Output Effects:
1144 |                                     ├─ Saturation
1145 |                                     └─ Global Reverb
1146 | ```
1147 | 
1148 | ### 12.2.2 Sample Mapping System
1149 | 
1150 | Samples are mapped to MIDI notes and velocity ranges using a graphical **mapping view:**
1151 | 
1152 | ```
1153 | SAMPLE MAPPING VIEW
1154 | 
1155 | VELOCITY →
1156 |   127 ┤
1157 |       │     [Forte layer]
1158 |    80 ┤─────────────────────────────
1159 |       │     [Mezzo layer]
1160 |    40 ┤─────────────────────────────
1161 |       │     [Piano layer]
1162 |     0 ┤
1163 |       └─┬───┬───┬───┬───┬───┬───┬──
1164 |         C2  D2  E2  F2  G2  A2  B2   ← MIDI NOTE →
1165 | ```
1166 | 
1167 | **Mapping rules:**
1168 | - Round-robin: multiple samples at the same pitch/velocity zone cycle sequentially to avoid machine-gun effect
1169 | - Random weighting: within a round-robin group, samples have adjustable probability weights
1170 | - Crossfade: velocity zones can overlap with crossfade for smooth layer transitions
1171 | - Root note: each sample has a root note; AUDIAW pitch-shifts the sample for notes above/below root using high-quality resampling
1172 | 
1173 | ### 12.2.3 Sample Playback Engine
1174 | 
1175 | **Interpolation:** AUDIAW uses **Sinc interpolation** (128-point) for high-quality pitch transposition. For performance-critical use cases with many simultaneous voices, linear interpolation mode is available (4× cheaper, audible only at large transpositions).
1176 | 
1177 | **Looping:** Forward, backward, ping-pong loop modes. Loop crossfade (up to 1000ms) to eliminate loop clicks. Loop tuning: the loop point can be nudged at sub-sample accuracy.
1178 | 
1179 | **Streaming:** Samples longer than 10 seconds are streamed from disk. The first 10 seconds (the "pre-buffer") are loaded into RAM for instant response; the remainder streams in chunks.
1180 | 
1181 | **Granular playback mode:** The sampler includes a granular playback mode that decomposes any sample into small "grains" (10–500ms) and recombines them with independent control of pitch and speed. This enables extreme time stretching and creative texture synthesis from any sample.
1182 | 
1183 | ### 12.2.4 Voice Management
1184 | 
1185 | ```rust
1186 | pub enum VoiceStealingPolicy {
1187 |     /// Stop the oldest voice when polyphony is exceeded
1188 |     OldestFirst,
1189 |     /// Stop the quietest voice (by output amplitude)
1190 |     Quietest,
1191 |     /// Stop the voice furthest from the new note's pitch
1192 |     FurthestPitch,
1193 |     /// Never steal — drop new notes when polyphony is exceeded
1194 |     NoStealing,
1195 |     /// Stop notes in envelope release phase first, then oldest
1196 |     ReleaseFirst,  // Default
1197 | }
1198 | ```
1199 | 
1200 | Voice stealing is applied only when the polyphony limit is reached. AUDIAW provides visual feedback of active voice count in the instrument header.
1201 | 
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files
IBM BOB\BOB.md

# VSCode Open Tabs
IBM BOB/BOB.md

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T15:39:09.047Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.26

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>plan</slug>
<name>📝 Plan</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

