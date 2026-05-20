**User:**

<task>
Create a comprehensive implementation plan to align the AUDIAW UI with the design specifications. Based on the audit findings, develop a detailed, prioritized plan for fixing all design system inconsistencies.

**Audit Summary - Critical Issues Found:**

1. **Color System Mismatches:**
   - Surface colors incorrect (#0a0a0a vs #0D0D0F, etc.)
   - Text uses solid colors instead of opacity-based system
   - Accent color wrong (#3b82f6 vs #3B8BF5)
   - Success color incorrect (#10b981 vs #22C55E)

2. **Typography Issues:**
   - Font family not "Inter Variable" or "Geist Mono"
   - Font scale completely wrong (12px vs 10px for xs, etc.)
   - Missing sizes: 2xs (9px), md (13px), 3xl (28px)
   - Line heights incorrect (1.25 vs 1.2 for tight)

3. **Spacing Problems:**
   - Layout dimensions wrong (transport 56px vs 52px, track header 240px vs 216px)
   - Track heights incorrect (compact 48px vs 32px, standard 64px vs 48px)
   - No spacing scale defined

4. **Motion/Animation Issues:**
   - Durations wrong (100ms vs 60ms/90ms, 200ms vs 120ms, 300ms vs 240ms)
   - Missing ease-out easing variant
   - Animation classes use incorrect timings

5. **Component Mismatches:**
   - Button heights vary, should be 32px
   - Border radius incorrect (xl is 12px vs 8px)
   - Hardcoded values throughout components

6. **Missing Design Tokens:**
   - No CSS custom properties in index.css
   - Missing surface levels (void, overlay, highest)
   - No spacing scale tokens
   - Missing motion duration tokens

**Your Task:**

Create a detailed implementation plan document that includes:

1. **Phase 1: Foundation Updates (Critical)**
   - Update theme.ts with correct design tokens
   - Add CSS custom properties to index.css
   - Update tailwind.config.js
   - Priority order and dependencies

2. **Phase 2: Component Refactoring**
   - List each component that needs updates
   - Specify what changes are needed per component
   - Identify hardcoded values to replace
   - Order by dependency (base components first)

3. **Phase 3: Animation System**
   - Update animations.css with correct durations
   - Add missing easing variants
   - Update component transition classes

4. **Phase 4: Verification & Testing**
   - Visual regression testing approach
   - Accessibility compliance checks
   - Performance validation
   - Documentation updates

5. **Implementation Strategy:**
   - Estimated time per phase
   - Risk assessment
   - Rollback strategy
   - Testing checkpoints

6. **File-by-File Breakdown:**
   - Specific changes needed for each file
   - Before/after examples for key changes
   - Migration notes for breaking changes

**Format the plan as a structured markdown document with:**
- Clear section headers
- Prioritized task lists
- Code examples where helpful
- Dependencies and prerequisites
- Success criteria for each phase

IMPORTANT: This is a planning task only. Do not make any code changes. Create a comprehensive implementation plan that can be executed by Code mode.

When complete, use attempt_completion with the full implementation plan.
</task>
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs
package.json,pnpm-workspace.yaml,.gitignore,src-tauri/Cargo.toml,src-tauri/build.rs,index.html,vite.config.ts,app-icon.png.svg,src-tauri/tauri.conf.json,src/index.css,DOCS/V0.5_TECHNICAL_SPECIFICATION.md,crates/audiaw-project/Cargo.toml,tsconfig.json,tsconfig.node.json,tailwind.config.js,postcss.config.js,SETUP.md,VERIFICATION.md,src/styles/theme.ts,src/styles/animations.css

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T22:24:17.306Z
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
.gitignore
app-icon.png.svg
Cargo.lock
Cargo.toml
CHANGELOG.md
CONTRIBUTING.md
index.html
INSTALL.md
LICENSE
package.json
PHASE_3_FIXES_REPORT.md
pnpm-lock.yaml
pnpm-workspace.yaml
postcss.config.js
QUICKSTART.md
README.md
SETUP.md
tailwind.config.js
.github/
crates/
crates/audiaw-project/Cargo.toml
crates/audiaw-project/src/lib.rs
crates/audiaw-types/Cargo.toml
DOCS/
DOCS/API.md
DOCS/ARCHITECTURE.md
DOCS/AUDIAW-DESIGN.md
DOCS/AUDIAW-DOCS-VOL1.md
DOCS/AUDIAW-DOCS-VOL2.md
DOCS/AUDIAW-DOCS-VOL3.md
DOCS/AUDIAW-DOCS-VOL4.md
DOCS/DEMO.md
DOCS/DEVELOPMENT.md
DOCS/FEATURES.md
DOCS/HACKATHON.md
DOCS/ROADMAP.md
IBM BOB/
IBM BOB/EXAMPLES.md
src/
src/App.tsx
src/index.css
src/main.tsx
src/vite-env.d.ts
src/components/ErrorBoundary.tsx
src/components/ArrangementView/ArrangementView.tsx
src/components/ArrangementView/AudioClip.tsx
src/components/ArrangementView/TrackLane.tsx
src/components/ExportDialog/ExportDialog.tsx
src/components/Timeline/Timeline.tsx
src/components/Timeline/TimelineRuler.tsx
src/components/Toolbar/Toolbar.tsx
src/components/TrackList/TrackControls.tsx
src/components/TrackList/TrackList.tsx
src/components/Transport/TransportBar.tsx
src/components/UI/Button.tsx
src/components/UI/Fader.tsx
src/components/UI/Knob.tsx
src/components/UI/Meter.tsx
src/stores/projectStore.ts
src/stores/transportStore.ts
src/stores/uiStore.ts
src/styles/animations.css
src/styles/theme.ts
src-tauri/
src-tauri/build.rs
src-tauri/Cargo.toml
src-tauri/tauri.conf.json
src-tauri/icons/icon.icns
src-tauri/icons/icon.ico
src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml
src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png
src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png
src-tauri/icons/android/mipmap-hdpi/ic_launcher.png
src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png
src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png
src-tauri/icons/android/mipmap-mdpi/ic_launcher.png
src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png
src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png
src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png
src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png
src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png
src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png
src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png
src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png
src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png
src-tauri/icons/android/values/ic_launcher_background.xml
src-tauri/src/main.rs
target/release/.cargo-lock
target/release/audiaw.d
target/release/audiaw.exe
target/release/audiaw.pdb
target/release/build/audiaw-9e7c039f07bab161/invoked.timestamp
target/release/build/audiaw-9e7c039f07bab161/output
target/release/build/audiaw-9e7c039f07bab161/root-output
target/release/build/audiaw-9e7c039f07bab161/stderr
target/release/build/cookie-882971c2c7e9cfa7/build_script_build-882971c2c7e9cfa7.d
target/release/build/cookie-882971c2c7e9cfa7/build_script_build-882971c2c7e9cfa7.exe
target/release/build/cookie-882971c2c7e9cfa7/build_script_build-882971c2c7e9cfa7.pdb
target/release/build/cookie-882971c2c7e9cfa7/build_script_build.pdb
target/release/build/cookie-882971c2c7e9cfa7/build-script-build.exe
target/release/build/cpal-c6cd4db903c168a1/invoked.timestamp
target/release/build/cpal-c6cd4db903c168a1/output
target/release/build/cpal-c6cd4db903c168a1/root-output
target/release/build/cpal-c6cd4db903c168a1/stderr
target/release/build/libc-ed48444f5f3a984a/invoked.timestamp
target/release/build/libc-ed48444f5f3a984a/output
target/release/build/libc-ed48444f5f3a984a/root-output
target/release/build/libc-ed48444f5f3a984a/stderr
target/release/build/rfd-083e6cf901209540/invoked.timestamp
target/release/build/rfd-083e6cf901209540/output
target/release/build/rfd-083e6cf901209540/root-output
target/release/build/rfd-083e6cf901209540/stderr
target/release/build/thiserror-6db9b618bd21875b/build_script_build-6db9b618bd21875b.d
target/release/build/thiserror-6db9b618bd21875b/build_script_build-6db9b618bd21875b.exe
target/release/build/thiserror-60efa191800b60ff/root-output
target/release/build/thiserror-60efa191800b60ff/stderr
target/release/build/typeid-8e8e21e2b8caca3a/build_script_build-8e8e21e2b8caca3a.d
target/release/build/typeid-8e8e21e2b8caca3a/build_script_build-8e8e21e2b8caca3a.exe
target/release/build/typeid-8e8e21e2b8caca3a/build_script_build-8e8e21e2b8caca3a.pdb
target/release/build/typeid-8e8e21e2b8caca3a/build_script_build.pdb
target/release/build/typeid-8e8e21e2b8caca3a/build-script-build.exe
target/release/build/typeid-111d3ff9fab5bc84/invoked.timestamp
target/release/build/typeid-111d3ff9fab5bc84/output
target/release/build/typeid-111d3ff9fab5bc84/root-output
target/release/build/typeid-111d3ff9fab5bc84/stderr
target/release/build/typeid-900e6bb7c119c803/invoked.timestamp
target/release/build/typeid-900e6bb7c119c803/output
target/release/build/typeid-900e6bb7c119c803/root-output
target/release/build/typeid-900e6bb7c119c803/stderr
target/release/build/vswhom-sys-8c649cbfa6bc0e8a/build_script_build-8c649cbfa6bc0e8a.d
target/release/build/vswhom-sys-8c649cbfa6bc0e8a/build_script_build-8c649cbfa6bc0e8a.exe
target/release/build/vswhom-sys-8c649cbfa6bc0e8a/build_script_build-8c649cbfa6bc0e8a.pdb
target/release/build/vswhom-sys-8c649cbfa6bc0e8a/build_script_build.pdb
target/release/build/vswhom-sys-8c649cbfa6bc0e8a/build-script-build.exe
target/release/build/vswhom-sys-50052c37d002770c/invoked.timestamp
target/release/build/vswhom-sys-50052c37d002770c/output
target/release/build/vswhom-sys-50052c37d002770c/root-output
target/release/build/vswhom-sys-50052c37d002770c/stderr
target/release/build/web_atoms-989c8ce9454af68c/invoked.timestamp
target/release/build/web_atoms-989c8ce9454af68c/output
target/release/build/web_atoms-989c8ce9454af68c/root-output
target/release/build/web_atoms-989c8ce9454af68c/stderr
target/release/build/web_atoms-27845c45877fb3bb/build_script_build-27845c45877fb3bb.d
target/release/build/web_atoms-27845c45877fb3bb/build_script_build-27845c45877fb3bb.exe
target/release/build/web_atoms-27845c45877fb3bb/build_script_build-27845c45877fb3bb.pdb
target/release/build/web_atoms-27845c45877fb3bb/build_script_build.pdb
target/release/build/web_atoms-27845c45877fb3bb/build-script-build.exe
target/release/build/webview2-com-sys-3a530da44298a44f/invoked.timestamp
target/release/build/webview2-com-sys-3a530da44298a44f/output
target/release/build/webview2-com-sys-3a530da44298a44f/root-output
target/release/build/webview2-com-sys-3a530da44298a44f/stderr
target/release/build/webview2-com-sys-88019f907f925695/build_script_build-88019f907f925695.d
target/release/build/webview2-com-sys-88019f907f925695/build_script_build-88019f907f925695.exe
target/release/build/webview2-com-sys-88019f907f925695/build_script_build-88019f907f925695.pdb
target/release/build/webview2-com-sys-88019f907f925695/build_script_build.pdb
target/release/build/webview2-com-sys-88019f907f925695/build-script-build.exe
target/release/build/windows_x86_64_msvc-06bcfc521d4cf3d1/invoked.timestamp
target/release/build/windows_x86_64_msvc-06bcfc521d4cf3d1/output
target/release/build/windows_x86_64_msvc-06bcfc521d4cf3d1/root-output
target/release/build/windows_x86_64_msvc-06bcfc521d4cf3d1/stderr
target/release/build/windows_x86_64_msvc-17f685874710de12/build_script_build-17f685874710de12.d
target/release/build/windows_x86_64_msvc-17f685874710de12/build_script_build-17f685874710de12.exe
target/release/build/windows_x86_64_msvc-17f685874710de12/build_script_build-17f685874710de12.pdb
target/release/build/windows_x86_64_msvc-17f685874710de12/build_script_build.pdb
target/release/build/windows_x86_64_msvc-17f685874710de12/build-script-build.exe
target/release/build/windows_x86_64_msvc-b9ce4e6de9451732/invoked.timestamp
target/release/build/windows_x86_64_msvc-b9ce4e6de9451732/output
target/release/build/windows_x86_64_msvc-b9ce4e6de9451732/root-output
target/release/build/windows_x86_64_msvc-b9ce4e6de9451732/stderr
target/release/build/windows_x86_64_msvc-d2fedce17f031367/build_script_build-d2fedce17f031367.d
target/release/build/windows_x86_64_msvc-d2fedce17f031367/build_script_build-d2fedce17f031367.exe
target/release/build/windows_x86_64_msvc-d2fedce17f031367/build_script_build-d2fedce17f031367.pdb
target/release/build/windows_x86_64_msvc-d2fedce17f031367/build_script_build.pdb
target/release/build/windows_x86_64_msvc-d2fedce17f031367/build-script-build.exe
target/release/build/windows_x86_64_msvc-de806d65cafd5786/invoked.timestamp
target/release/build/windows_x86_64_msvc-de806d65cafd5786/output
target/release/build/windows_x86_64_msvc-de806d65cafd5786/root-output
target/release/build/windows_x86_64_msvc-de806d65cafd5786/stderr
target/release/build/wry-2d6e9e25251fadd2/invoked.timestamp
target/release/build/wry-2d6e9e25251fadd2/output
target/release/build/wry-2d6e9e25251fadd2/root-output
target/release/build/wry-2d6e9e25251fadd2/stderr
target/release/build/wry-1260323eeefeee45/build_script_build-1260323eeefeee45.d
target/release/build/wry-1260323eeefeee45/build_script_build-1260323eeefeee45.exe
target/release/build/wry-1260323eeefeee45/build_script_build-1260323eeefeee45.pdb
target/release/build/wry-1260323eeefeee45/build_script_build.pdb
target/release/build/wry-1260323eeefeee45/build-script-build.exe
target/release/build/zmij-7af9eed5a26f91c2/build_script_build-7af9eed5a26f91c2.d
target/release/build/zmij-7af9eed5a26f91c2/build_script_build-7af9eed5a26f91c2.exe
target/release/build/zmij-7af9eed5a26f91c2/build_script_build-7af9eed5a26f91c2.pdb
target/release/build/zmij-7af9eed5a26f91c2/build_script_build.pdb
target/release/build/zmij-7af9eed5a26f91c2/build-script-build.exe
target/release/build/zmij-a748ac5162542bbd/invoked.timestamp
target/release/build/zmij-a748ac5162542bbd/output
target/release/build/zmij-a748ac5162542bbd/root-output
target/release/build/zmij-a748ac5162542bbd/stderr
target/release/build/zmij-e5708303283a7629/invoked.timestamp
target/release/build/zmij-e5708303283a7629/output
target/release/build/zmij-e5708303283a7629/root-output
target/release/build/zmij-e5708303283a7629/stderr

(File list truncated. Use list_files on specific subdirectories if you need to explore further.)
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

I'll analyze the current codebase to understand the design system implementation and create a comprehensive plan to align it with the specifications.

<read_file>
<args>
  <file>
    <path>src/styles/theme.ts</path>
  </file>
  <file>
    <path>src/index.css</path>
  </file>
  <file>
    <path>tailwind.config.js</path>
  </file>
  <file>
    <path>src/styles/animations.css</path>
  </file>
  <file>
    <path>DOCS/AUDIAW-DESIGN.md</path>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 5 files] Result:
<files>
<file><path>src/styles/theme.ts</path>
<content lines="1-122">
  1 | /**
  2 |  * AUDIAW Theme System
  3 |  * Professional DAW color palette and design tokens
  4 |  */
  5 | 
  6 | export const theme = {
  7 |   colors: {
  8 |     background: {
  9 |       primary: '#0a0a0a',
 10 |       secondary: '#1a1a1a',
 11 |       tertiary: '#242424',
 12 |       elevated: '#2a2a2a',
 13 |     },
 14 |     text: {
 15 |       primary: '#ffffff',
 16 |       secondary: '#e5e5e5',
 17 |       tertiary: '#a0a0a0',
 18 |       muted: '#737373',
 19 |       disabled: '#505050',
 20 |     },
 21 |     accent: {
 22 |       primary: '#3b82f6',
 23 |       primaryHover: '#2563eb',
 24 |       primaryActive: '#1d4ed8',
 25 |       success: '#10b981',
 26 |       successHover: '#059669',
 27 |       warning: '#f59e0b',
 28 |       warningHover: '#d97706',
 29 |       danger: '#ef4444',
 30 |       dangerHover: '#dc2626',
 31 |     },
 32 |     track: {
 33 |       audio: '#3b82f6',
 34 |       midi: '#8b5cf6',
 35 |       group: '#10b981',
 36 |       return: '#f59e0b',
 37 |       master: '#ef4444',
 38 |     },
 39 |     border: {
 40 |       default: '#2a2a2a',
 41 |       hover: '#404040',
 42 |       active: '#3b82f6',
 43 |       focus: '#3b82f6',
 44 |     },
 45 |     meter: {
 46 |       low: '#10b981',
 47 |       mid: '#f59e0b',
 48 |       high: '#ef4444',
 49 |       peak: '#dc2626',
 50 |     },
 51 |   },
 52 |   spacing: {
 53 |     trackHeight: 64,
 54 |     trackHeightCompact: 48,
 55 |     trackHeightExpanded: 96,
 56 |     trackHeaderWidth: 240,
 57 |     transportHeight: 56,
 58 |     timelineHeight: 32,
 59 |     mixerStripWidth: 80,
 60 |     browserWidth: 280,
 61 |     scrollbarSize: 8,
 62 |   },
 63 |   typography: {
 64 |     fontFamily: {
 65 |       sans: 'Inter, system-ui, -apple-system, sans-serif',
 66 |       mono: 'JetBrains Mono, Consolas, monospace',
 67 |     },
 68 |     fontSize: {
 69 |       xs: '0.75rem',    // 12px
 70 |       sm: '0.875rem',   // 14px
 71 |       base: '1rem',     // 16px
 72 |       lg: '1.125rem',   // 18px
 73 |       xl: '1.25rem',    // 20px
 74 |       '2xl': '1.5rem',  // 24px
 75 |     },
 76 |     fontWeight: {
 77 |       normal: 400,
 78 |       medium: 500,
 79 |       semibold: 600,
 80 |       bold: 700,
 81 |     },
 82 |     lineHeight: {
 83 |       tight: 1.25,
 84 |       normal: 1.5,
 85 |       relaxed: 1.75,
 86 |     },
 87 |   },
 88 |   borderRadius: {
 89 |     sm: '0.25rem',   // 4px
 90 |     md: '0.375rem',  // 6px
 91 |     lg: '0.5rem',    // 8px
 92 |     xl: '0.75rem',   // 12px
 93 |     full: '9999px',
 94 |   },
 95 |   shadows: {
 96 |     sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
 97 |     md: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
 98 |     lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
 99 |     xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
100 |   },
101 |   transitions: {
102 |     fast: '100ms cubic-bezier(0.4, 0, 0.2, 1)',
103 |     normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
104 |     slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
105 |   },
106 |   zIndex: {
107 |     base: 0,
108 |     dropdown: 1000,
109 |     modal: 2000,
110 |     tooltip: 3000,
111 |     notification: 4000,
112 |   },
113 | } as const;
114 | 
115 | export type Theme = typeof theme;
116 | 
117 | // Helper function to get color with opacity
118 | export const withOpacity = (color: string, opacity: number): string => {
119 |   return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
120 | };
121 | 
122 | // Made with Bob
</content>
</file>
<file><path>src/index.css</path>
<content lines="1-60">
 1 | @import './styles/animations.css';
 2 | 
 3 | @tailwind base;
 4 | @tailwind components;
 5 | @tailwind utilities;
 6 | 
 7 | :root {
 8 |   font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
 9 |   line-height: 1.5;
10 |   font-weight: 400;
11 | 
12 |   color-scheme: dark;
13 |   color: rgba(255, 255, 255, 0.87);
14 |   background-color: #0a0a0a;
15 | 
16 |   font-synthesis: none;
17 |   text-rendering: optimizeLegibility;
18 |   -webkit-font-smoothing: antialiased;
19 |   -moz-osx-font-smoothing: grayscale;
20 | }
21 | 
22 | body {
23 |   margin: 0;
24 |   display: flex;
25 |   place-items: center;
26 |   min-width: 320px;
27 |   min-height: 100vh;
28 | }
29 | 
30 | #root {
31 |   width: 100%;
32 |   height: 100vh;
33 |   margin: 0;
34 |   padding: 0;
35 | }
36 | 
37 | * {
38 |   box-sizing: border-box;
39 | }
40 | 
41 | /* Custom scrollbar */
42 | ::-webkit-scrollbar {
43 |   width: 8px;
44 |   height: 8px;
45 | }
46 | 
47 | ::-webkit-scrollbar-track {
48 |   background: #1a1a1a;
49 | }
50 | 
51 | ::-webkit-scrollbar-thumb {
52 |   background: #404040;
53 |   border-radius: 4px;
54 | }
55 | 
56 | ::-webkit-scrollbar-thumb:hover {
57 |   background: #505050;
58 | }
59 | 
60 | /* Made with Bob */
</content>
</file>
<file><path>tailwind.config.js</path>
<content lines="1-41">
 1 | /** @type {import('tailwindcss').Config} */
 2 | export default {
 3 |   content: [
 4 |     "./index.html",
 5 |     "./src/**/*.{js,ts,jsx,tsx}",
 6 |   ],
 7 |   theme: {
 8 |     extend: {
 9 |       colors: {
10 |         // AUDIAW brand colors
11 |         primary: {
12 |           50: '#f0f9ff',
13 |           100: '#e0f2fe',
14 |           200: '#bae6fd',
15 |           300: '#7dd3fc',
16 |           400: '#38bdf8',
17 |           500: '#0ea5e9',
18 |           600: '#0284c7',
19 |           700: '#0369a1',
20 |           800: '#075985',
21 |           900: '#0c4a6e',
22 |         },
23 |         // Dark theme colors
24 |         dark: {
25 |           bg: '#0a0a0a',
26 |           surface: '#1a1a1a',
27 |           border: '#2a2a2a',
28 |           text: '#e5e5e5',
29 |           muted: '#737373',
30 |         }
31 |       },
32 |       fontFamily: {
33 |         sans: ['Inter', 'system-ui', 'sans-serif'],
34 |         mono: ['JetBrains Mono', 'monospace'],
35 |       },
36 |     },
37 |   },
38 |   plugins: [],
39 | }
40 | 
41 | // Made with Bob
</content>
</file>
<file><path>src/styles/animations.css</path>
<content lines="1-221">
  1 | /**
  2 |  * AUDIAW Animation System
  3 |  * Smooth 60fps animations for professional DAW feel
  4 |  */
  5 | 
  6 | /* Fade animations */
  7 | @keyframes fadeIn {
  8 |   from {
  9 |     opacity: 0;
 10 |   }
 11 |   to {
 12 |     opacity: 1;
 13 |   }
 14 | }
 15 | 
 16 | @keyframes fadeOut {
 17 |   from {
 18 |     opacity: 1;
 19 |   }
 20 |   to {
 21 |     opacity: 0;
 22 |   }
 23 | }
 24 | 
 25 | /* Slide animations */
 26 | @keyframes slideInFromLeft {
 27 |   from {
 28 |     transform: translateX(-100%);
 29 |     opacity: 0;
 30 |   }
 31 |   to {
 32 |     transform: translateX(0);
 33 |     opacity: 1;
 34 |   }
 35 | }
 36 | 
 37 | @keyframes slideInFromRight {
 38 |   from {
 39 |     transform: translateX(100%);
 40 |     opacity: 0;
 41 |   }
 42 |   to {
 43 |     transform: translateX(0);
 44 |     opacity: 1;
 45 |   }
 46 | }
 47 | 
 48 | @keyframes slideInFromTop {
 49 |   from {
 50 |     transform: translateY(-100%);
 51 |     opacity: 0;
 52 |   }
 53 |   to {
 54 |     transform: translateY(0);
 55 |     opacity: 1;
 56 |   }
 57 | }
 58 | 
 59 | @keyframes slideInFromBottom {
 60 |   from {
 61 |     transform: translateY(100%);
 62 |     opacity: 0;
 63 |   }
 64 |   to {
 65 |     transform: translateY(0);
 66 |     opacity: 1;
 67 |   }
 68 | }
 69 | 
 70 | /* Scale animations */
 71 | @keyframes scaleIn {
 72 |   from {
 73 |     transform: scale(0.9);
 74 |     opacity: 0;
 75 |   }
 76 |   to {
 77 |     transform: scale(1);
 78 |     opacity: 1;
 79 |   }
 80 | }
 81 | 
 82 | @keyframes scaleOut {
 83 |   from {
 84 |     transform: scale(1);
 85 |     opacity: 1;
 86 |   }
 87 |   to {
 88 |     transform: scale(0.9);
 89 |     opacity: 0;
 90 |   }
 91 | }
 92 | 
 93 | /* Button press effect */
 94 | @keyframes buttonPress {
 95 |   0% {
 96 |     transform: scale(1);
 97 |   }
 98 |   50% {
 99 |     transform: scale(0.95);
100 |   }
101 |   100% {
102 |     transform: scale(1);
103 |   }
104 | }
105 | 
106 | /* Pulse animation for recording */
107 | @keyframes pulse {
108 |   0%, 100% {
109 |     opacity: 1;
110 |   }
111 |   50% {
112 |     opacity: 0.5;
113 |   }
114 | }
115 | 
116 | /* Meter animation */
117 | @keyframes meterPulse {
118 |   0%, 100% {
119 |     transform: scaleY(1);
120 |   }
121 |   50% {
122 |     transform: scaleY(0.95);
123 |   }
124 | }
125 | 
126 | /* Shimmer loading effect */
127 | @keyframes shimmer {
128 |   0% {
129 |     background-position: -1000px 0;
130 |   }
131 |   100% {
132 |     background-position: 1000px 0;
133 |   }
134 | }
135 | 
136 | /* Playhead animation */
137 | @keyframes playheadMove {
138 |   from {
139 |     transform: translateX(0);
140 |   }
141 |   to {
142 |     transform: translateX(100%);
143 |   }
144 | }
145 | 
146 | /* Utility classes */
147 | .fade-in {
148 |   animation: fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1);
149 | }
150 | 
151 | .fade-out {
152 |   animation: fadeOut 200ms cubic-bezier(0.4, 0, 0.2, 1);
153 | }
154 | 
155 | .slide-in-left {
156 |   animation: slideInFromLeft 300ms cubic-bezier(0.4, 0, 0.2, 1);
157 | }
158 | 
159 | .slide-in-right {
160 |   animation: slideInFromRight 300ms cubic-bezier(0.4, 0, 0.2, 1);
161 | }
162 | 
163 | .slide-in-top {
164 |   animation: slideInFromTop 300ms cubic-bezier(0.4, 0, 0.2, 1);
165 | }
166 | 
167 | .slide-in-bottom {
168 |   animation: slideInFromBottom 300ms cubic-bezier(0.4, 0, 0.2, 1);
169 | }
170 | 
171 | .scale-in {
172 |   animation: scaleIn 200ms cubic-bezier(0.4, 0, 0.2, 1);
173 | }
174 | 
175 | .scale-out {
176 |   animation: scaleOut 200ms cubic-bezier(0.4, 0, 0.2, 1);
177 | }
178 | 
179 | .button-press {
180 |   animation: buttonPress 100ms cubic-bezier(0.4, 0, 0.2, 1);
181 | }
182 | 
183 | .pulse {
184 |   animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
185 | }
186 | 
187 | .meter-pulse {
188 |   animation: meterPulse 100ms cubic-bezier(0.4, 0, 0.2, 1);
189 | }
190 | 
191 | .shimmer {
192 |   background: linear-gradient(
193 |     90deg,
194 |     rgba(255, 255, 255, 0) 0%,
195 |     rgba(255, 255, 255, 0.05) 50%,
196 |     rgba(255, 255, 255, 0) 100%
197 |   );
198 |   background-size: 1000px 100%;
199 |   animation: shimmer 2s infinite;
200 | }
201 | 
202 | /* Smooth transitions */
203 | .transition-fast {
204 |   transition: all 100ms cubic-bezier(0.4, 0, 0.2, 1);
205 | }
206 | 
207 | .transition-normal {
208 |   transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
209 | }
210 | 
211 | .transition-slow {
212 |   transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
213 | }
214 | 
215 | /* Hardware acceleration for smooth animations */
216 | .gpu-accelerated {
217 |   transform: translateZ(0);
218 |   will-change: transform;
219 | }
220 | 
221 | /* Made with Bob */
</content>
</file>
<file><path>DOCS/AUDIAW-DESIGN.md</path><file_outline>File: AUDIAW-DESIGN.md (4602 lines)

</file_outline>
<notice>This file is large (4601 lines). You will use the following strategy to understand this file:
- Inform the user you are going to use large file strategy, to efficiently understand the file
- Use the file_outline provided to get an overview of the file structure to help decide next action. This is not the full file. It is not the full depth of the contents.
- If you read the file, use precise file reads with line ranges for specific sections of interest
- Consider if other commands/tools are better suited for extracting information from that file type
- Use ask_followup_question tool if needed to identify the best next action
</notice></file>
</files>
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs
package.json,pnpm-workspace.yaml,.gitignore,src-tauri/Cargo.toml,src-tauri/build.rs,index.html,vite.config.ts,app-icon.png.svg,src-tauri/tauri.conf.json,src/index.css,DOCS/V0.5_TECHNICAL_SPECIFICATION.md,crates/audiaw-project/Cargo.toml,tsconfig.json,tsconfig.node.json,tailwind.config.js,postcss.config.js,SETUP.md,VERIFICATION.md,src/styles/theme.ts,src/styles/animations.css

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T22:24:21.861Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.04

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

I need to read the design specification document to understand the correct design tokens. Let me read specific sections of the AUDIAW-DESIGN.md file.

<read_file>
<args>
  <file>
    <path>DOCS/AUDIAW-DESIGN.md</path>
    <line_range>1-100</line_range>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 'DOCS/AUDIAW-DESIGN.md'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>DOCS/AUDIAW-DESIGN.md</path>
<content lines="1-100">
  1 | # AUDIAW — DESIGN.md
  2 | ## Complete Product Design Specification
  3 | 
  4 | **Document Type:** Single Source of Truth — Design, UX, Interaction, Visual Identity  
  5 | **Version:** 1.0.0  
  6 | **Status:** Living Document  
  7 | **Audience:** Designers, Frontend Engineers, Contributors, UX Reviewers
  8 | 
  9 | > This document defines exactly how AUDIAW looks, feels, and behaves. If something is not written here, it does not exist in the design system. Every state, every measurement, every animation, every interaction is explicitly specified. Designers create directly from this. Developers implement directly from this.
 10 | 
 11 | ---
 12 | 
 13 | ## TABLE OF CONTENTS
 14 | 
 15 | 1. [Product Vision](#1-product-vision)
 16 | 2. [Product Identity](#2-product-identity)
 17 | 3. [Design Philosophy](#3-design-philosophy)
 18 | 4. [Emotional UX Goals](#4-emotional-ux-goals)
 19 | 5. [Core UX Principles](#5-core-ux-principles)
 20 | 6. [Visual Identity System](#6-visual-identity-system)
 21 | 7. [Nothing-Inspired Design Language](#7-nothing-inspired-design-language)
 22 | 8. [Industrial Design Principles](#8-industrial-design-principles)
 23 | 9. [Layout Architecture](#9-layout-architecture)
 24 | 10. [Window Management System](#10-window-management-system)
 25 | 11. [Docking System](#11-docking-system)
 26 | 12. [Workspace System](#12-workspace-system)
 27 | 13. [Grid System](#13-grid-system)
 28 | 14. [Spacing System](#14-spacing-system)
 29 | 15. [Typography System](#15-typography-system)
 30 | 16. [Color System](#16-color-system)
 31 | 17. [Contrast System](#17-contrast-system)
 32 | 18. [Monochrome UI Rules](#18-monochrome-ui-rules)
 33 | 19. [Accent Color Rules](#19-accent-color-rules)
 34 | 20. [Iconography](#20-iconography)
 35 | 21. [Motion Design System](#21-motion-design-system)
 36 | 22. [Animation Rules](#22-animation-rules)
 37 | 23. [Transition Hierarchy](#23-transition-hierarchy)
 38 | 24. [Interaction Feedback System](#24-interaction-feedback-system)
 39 | 25. [Cursor Behavior](#25-cursor-behavior)
 40 | 26. [Hover State Philosophy](#26-hover-state-philosophy)
 41 | 27. [Focus State System](#27-focus-state-system)
 42 | 28. [Keyboard Navigation Standards](#28-keyboard-navigation-standards)
 43 | 29. [Accessibility Standards](#29-accessibility-standards)
 44 | 30. [Touch & Tablet UX](#30-touch--tablet-ux)
 45 | 31. [Multi-Monitor UX](#31-multi-monitor-ux)
 46 | 32. [Startup Experience](#32-startup-experience)
 47 | 33. [Loading States](#33-loading-states)
 48 | 34. [Empty States](#34-empty-states)
 49 | 35. [Error States](#35-error-states)
 50 | 36. [Crash Recovery UX](#36-crash-recovery-ux)
 51 | 37. [Project Recovery UX](#37-project-recovery-ux)
 52 | 38. [Timeline UX](#38-timeline-ux)
 53 | 39. [Mixer UX](#39-mixer-ux)
 54 | 40. [Channel Strip UX](#40-channel-strip-ux)
 55 | 41. [Piano Roll UX](#41-piano-roll-ux)
 56 | 42. [Automation UX](#42-automation-ux)
 57 | 43. [Audio Routing UX](#43-audio-routing-ux)
 58 | 44. [Plugin Browser UX](#44-plugin-browser-ux)
 59 | 45. [Plugin Hosting UX](#45-plugin-hosting-ux)
 60 | 46. [Plugin Sandbox UX](#46-plugin-sandbox-ux)
 61 | 47. [Command Palette UX](#47-command-palette-ux)
 62 | 48. [Search UX](#48-search-ux)
 63 | 49. [File Browser UX](#49-file-browser-ux)
 64 | 50. [Transport Controls](#50-transport-controls)
 65 | 51. [DSP Visualization](#51-dsp-visualization)
 66 | 52. [Waveform Rendering](#52-waveform-rendering)
 67 | 53. [Metering Systems](#53-metering-systems)
 68 | 54. [GPU Rendering Considerations](#54-gpu-rendering-considerations)
 69 | 55. [Performance Constraints](#55-performance-constraints)
 70 | 56. [Latency UX Expectations](#56-latency-ux-expectations)
 71 | 57. [Scroll Physics](#57-scroll-physics)
 72 | 58. [Drag & Drop Systems](#58-drag--drop-systems)
 73 | 59. [Snapping Systems](#59-snapping-systems)
 74 | 60. [Resizing Systems](#60-resizing-systems)
 75 | 61. [Panel Behavior](#61-panel-behavior)
 76 | 62. [Context Menus](#62-context-menus)
 77 | 63. [Inspector Panels](#63-inspector-panels)
 78 | 64. [State Persistence](#64-state-persistence)
 79 | 65. [Workspace Presets](#65-workspace-presets)
 80 | 66. [Theme Engine](#66-theme-engine)
 81 | 67. [Design Tokens](#67-design-tokens)
 82 | 68. [Component Design Standards](#68-component-design-standards)
 83 | 69. [Responsive Scaling](#69-responsive-scaling)
 84 | 70. [Open Source Contribution Design Rules](#70-open-source-contribution-design-rules)
 85 | 71. [Branding System](#71-branding-system)
 86 | 72. [Logo Usage](#72-logo-usage)
 87 | 73. [UI Sound Design](#73-ui-sound-design)
 88 | 74. [AI Assistant UX](#74-ai-assistant-ux)
 89 | 75. [Collaboration UX](#75-collaboration-ux)
 90 | 76. [Export Workflow UX](#76-export-workflow-ux)
 91 | 77. [Recording Workflow UX](#77-recording-workflow-ux)
 92 | 78. [Live Performance UX](#78-live-performance-ux)
 93 | 79. [Future Expansion Philosophy](#79-future-expansion-philosophy)
 94 | 
 95 | ---
 96 | 
 97 | # 1. PRODUCT VISION
 98 | 
 99 | AUDIAW is a professional digital audio workstation built with the conviction that the best creative tools are invisible. The interface should not call attention to itself. It should recede — becoming an extension of the user's intent rather than a barrier to it.
100 | 
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs
package.json,pnpm-workspace.yaml,.gitignore,src-tauri/Cargo.toml,src-tauri/build.rs,index.html,vite.config.ts,app-icon.png.svg,src-tauri/tauri.conf.json,src/index.css,DOCS/V0.5_TECHNICAL_SPECIFICATION.md,crates/audiaw-project/Cargo.toml,tsconfig.json,tsconfig.node.json,tailwind.config.js,postcss.config.js,SETUP.md,VERIFICATION.md,src/styles/theme.ts,src/styles/animations.css

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T22:24:26.020Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.10

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
    <path>DOCS/AUDIAW-DESIGN.md</path>
    <line_range>400-700</line_range>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 'DOCS/AUDIAW-DESIGN.md'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>DOCS/AUDIAW-DESIGN.md</path>
<content lines="400-700">
400 | 
401 | ## 7.1 Philosophy Adaptation
402 | 
403 | Nothing's design philosophy — developed for a consumer smartphone — is adapted here for professional desktop audio software. The core principles that transfer:
404 | 
405 | **Monochrome confidence:** Nothing OS derives power from what it removes. Its interface works in grayscale because the content (your apps, your data) provides all the color needed. AUDIAW applies this same logic: the interface is monochrome because the music — represented through waveforms, MIDI notes, and audio signal — provides all the visual interest needed.
406 | 
407 | **Dot-matrix as texture, not decoration:** Nothing uses dot-matrix elements for charging indicators and specific branding moments. AUDIAW uses dot-matrix styling for:
408 | - The transport time display (bars:beats:ticks)
409 | - BPM readout
410 | - Sample rate / buffer size indicators in the status bar
411 | - The startup sequence
412 | - The clip position indicator in the status bar
413 | 
414 | Dot-matrix is never used in:
415 | - Track names
416 | - Plugin names
417 | - Menu items
418 | - Dialog text
419 | - Panel labels
420 | - Any continuously readable text
421 | 
422 | **Structural openness:** Nothing designs with generous, structural whitespace that makes the layout feel organized, not sparse. AUDIAW applies this in the spacing between functional regions, the padding within panels, and the breathing room around the transport bar.
423 | 
424 | ## 7.2 Dot-Matrix Implementation
425 | 
426 | The dot-matrix display style for AUDIAW uses a custom monospace display typeface rendered with specific visual rules:
427 | 
428 | **Font:** `"Geist Mono"` with a custom CSS filter for dot-matrix character (described below)
429 | 
430 | **Dot-matrix visual treatment:**
431 | ```css
432 | .dot-matrix-display {
433 |   font-family: "Geist Mono", monospace;
434 |   font-size: 14px;
435 |   font-weight: 400;
436 |   letter-spacing: 0.08em;
437 |   color: rgba(255, 255, 255, 0.90);
438 |   text-shadow: 
439 |     0 0 8px rgba(255, 255, 255, 0.15),   /* subtle glow, not dramatic */
440 |     0 0 2px rgba(255, 255, 255, 0.08);
441 |   /* Background for display contexts */
442 |   background: #0D0D0F;
443 |   padding: 4px 8px;
444 |   border: 1px solid rgba(255, 255, 255, 0.07);
445 | }
446 | ```
447 | 
448 | **Dot-matrix display contexts and sizes:**
449 | 
450 | | Context | Font Size | Letter Spacing | Display Dimensions |
451 | |---|---|---|---|
452 | | Transport time (primary) | 22px | 0.12em | Min 220px wide |
453 | | BPM display | 18px | 0.10em | Min 80px wide |
454 | | Sample rate display | 11px | 0.06em | Status bar inline |
455 | | Buffer size display | 11px | 0.06em | Status bar inline |
456 | | Clip position (hover) | 11px | 0.06em | Floating tooltip |
457 | | Startup sequence | 16px | 0.10em | Centered, full width |
458 | 
459 | **Inactive dot-matrix display:**
460 | When the transport is stopped, the time display dims:
461 | ```
462 | color: rgba(255, 255, 255, 0.35)
463 | text-shadow: none
464 | ```
465 | 
466 | **Active/playing dot-matrix display:**
467 | ```
468 | color: rgba(255, 255, 255, 0.92)
469 | text-shadow: 0 0 8px rgba(255, 255, 255, 0.18), 0 0 2px rgba(255, 255, 255, 0.10)
470 | ```
471 | 
472 | **Recording dot-matrix display:**
473 | ```
474 | color: rgba(239, 68, 68, 0.95)    /* Red during record */
475 | text-shadow: 0 0 8px rgba(239, 68, 68, 0.25), 0 0 2px rgba(239, 68, 68, 0.12)
476 | ```
477 | 
478 | ## 7.3 Grid Texture Accent
479 | 
480 | In select background regions (empty arrangement lanes, empty mixer areas, the startup screen background), a subtle dot-grid texture is applied:
481 | 
482 | **Dot-grid specification:**
483 | ```css
484 | .dot-grid-background {
485 |   background-image: radial-gradient(
486 |     circle,
487 |     rgba(255, 255, 255, 0.04) 1px,
488 |     transparent 1px
489 |   );
490 |   background-size: 20px 20px;
491 |   background-position: 0 0;
492 | }
493 | ```
494 | 
495 | **Usage rules:**
496 | - Dot-grid is only applied to empty surfaces — never over content
497 | - Dot-grid disappears when content is present (tracks, clips, notes fill the grid)
498 | - Dot-grid does NOT animate or shift
499 | - Dot-grid opacity must not exceed 4% against the background surface
500 | - Dot-grid spacing is always 20px × 20px — never varied
501 | 
502 | ## 7.4 Nothing-Influenced Typography Rhythm
503 | 
504 | Nothing OS uses a clear typographic rhythm that separates labels from values, creates hierarchy through weight and case. AUDIAW applies this:
505 | 
506 | **Label–Value Pairing Rule:**
507 | In any context where a label accompanies a value (e.g., "BPM: 140", "Sample Rate: 48000 Hz"), the label and value are visually differentiated:
508 | 
509 | ```
510 | LABEL:     10px, Inter Regular, UPPERCASE, letter-spacing: 0.10em, opacity: 0.45
511 | VALUE:     14px, Geist Mono Regular, TitleCase/Numeric, opacity: 0.90
512 | GAP:       8px between label and value when stacked vertically
513 |            4px between label and value when horizontal (label to left)
514 | ```
515 | 
516 | This pairing appears in:
517 | - Status bar items
518 | - Inspector panel properties
519 | - Audio device settings
520 | - Transport information display
521 | - Plugin parameter labels and values
522 | 
523 | ---
524 | 
525 | # 8. INDUSTRIAL DESIGN PRINCIPLES
526 | 
527 | ## 8.1 Functional Honesty
528 | 
529 | Industrial design — from Braun to professional audio hardware — is honest about what objects are and do. AUDIAW reflects this:
530 | 
531 | **No visual deception:** A button that triggers a one-time action looks different from a toggle. A display that shows real-time data looks different from a static label. A draggable fader looks draggable — its affordance communicates its function.
532 | 
533 | **Material consistency:** All buttons of the same functional type look identical, regardless of their position in the interface. A mute button on a track header looks exactly like a mute button on a mixer channel strip — same size, same style, same interaction model.
534 | 
535 | **Physical proportion:** Control sizes relate to their precision requirements. A coarse control (volume fader) is large. A fine control (micro-timing offset) is small with modifier-key precision access. Size communicates precision expectation.
536 | 
537 | ## 8.2 Labeling as Professional Communication
538 | 
539 | Professional hardware is labeled precisely and economically. "GAIN" not "Input Gain Level." "HPF" not "High-Pass Filter Toggle." "BUS" not "Send to Group Bus."
540 | 
541 | **Label rules:**
542 | - Labels are as short as possible while remaining unambiguous
543 | - Labels use professional audio vocabulary without apology
544 | - Labels never use marketing language
545 | - Labels are in mixed case (not ALL CAPS except for abbreviations)
546 | - Abbreviations are used for standard audio terms: HPF, LPF, EQ, LFO, ADSR, RMS, dBFS
547 | - Non-standard abbreviations are never used without tooltip expansion
548 | 
549 | **Tooltip rule:** Every abbreviated label must have a tooltip with the full term. Tooltip appears after 600ms of hover with no cursor movement. Tooltip uses 11px Inter Regular, white, on a Level 4 surface with 6px horizontal padding, 4px vertical padding, 4px border-radius.
550 | 
551 | ## 8.3 Control Density Philosophy
552 | 
553 | Professional mixing hardware (SSL, Neve, API) is densely packed — every square centimeter earns its place. AUDIAW adopts this density philosophy in its dense views (mixer channel strips, device racks) while preserving breathing room in its content views (arrangement, piano roll).
554 | 
555 | **Density mode definitions:**
556 | 
557 | | Mode | Context | Track Height | Font Size | Control Visibility |
558 | |---|---|---|---|---|
559 | | Ultra-compact | Mixer strip (≤56px wide) | N/A | 10px | Icons only, no labels |
560 | | Compact | Arrangement (32px track height) | 32px | 11px | Name + mute/solo icons |
561 | | Standard | Arrangement (48px track height) | 48px | 12px | Name + mute/solo/arm + mini meter |
562 | | Tall | Arrangement (80px track height) | 80px | 12px | Name + all controls + waveform + meter |
563 | | Expanded | Arrangement (120px+) | 120px | 13px | Full controls + prominent waveform |
564 | 
565 | Users can set track height individually (drag track bottom edge) or globally (Ctrl+Alt+scroll). The density mode is computed automatically based on pixel height.
566 | 
567 | ---
568 | 
569 | # 9. LAYOUT ARCHITECTURE
570 | 
571 | ## 9.1 Primary Layout Zones
572 | 
573 | The AUDIAW application window is divided into five permanent zones. These zones cannot be removed, only collapsed:
574 | 
575 | ```
576 | ┌──────────────────────────────────────────────────────────────────┐
577 | │  TRANSPORT ZONE                                           52px H  │
578 | │  Always visible. Never collapsible. Contains all transport,       │
579 | │  project name, CPU/memory meters, global toolbar actions.         │
580 | ├──────────────────────────────────────────────────────────────────┤
581 | │ LEFT  │                                               │  RIGHT   │
582 | │ PANEL │           PRIMARY CANVAS ZONE                │  PANEL   │
583 | │ ZONE  │    (arrangement / mixer / piano roll /        │  ZONE    │
584 | │       │     automation / clip launcher)               │          │
585 | │  min  │                                               │  min     │
586 | │ 160px │    This zone fills all remaining space.       │ 200px    │
587 | │  max  │    It cannot be covered by other zones.       │  max     │
588 | │ 400px │                                               │ 520px    │
589 | │       │                                               │          │
590 | │       │                                               │          │
591 | ├───────┴───────────────────────────────────────────────┴──────────┤
592 | │  BOTTOM PANEL ZONE                                   variable H  │
593 | │  Collapsible. Default: collapsed. Min 160px, Max 50% window H.   │
594 | │  Contains: Mixer (docked), Piano Roll (docked), Event List.       │
595 | ├──────────────────────────────────────────────────────────────────┤
596 | │  STATUS BAR ZONE                                          22px H  │
597 | │  Always visible. Never collapsible.                               │
598 | └──────────────────────────────────────────────────────────────────┘
599 | ```
600 | 
601 | ## 9.2 Zone Sizing Constraints
602 | 
603 | **Transport Zone:**
604 | - Height: exactly 52px. Fixed. Never resized.
605 | - Width: 100% of window width.
606 | - Background: Level 2 surface (`#1A1A21`)
607 | - Bottom border: 1px structural border (`rgba(255,255,255,0.07)`)
608 | - Internal horizontal padding: 16px left, 16px right
609 | 
610 | **Left Panel Zone:**
611 | - Default width: 260px
612 | - Minimum width: 160px (below this, collapse to icon-only mode)
613 | - Maximum width: 400px
614 | - Collapsible: Yes. Collapse trigger: click the left edge toggle button (6px wide, vertically centered, 32px tall button)
615 | - Collapsed width: 0px (invisible, zero-space). The toggle button remains at the very edge of the canvas zone, 6px wide.
616 | - Resize: drag the right edge of the left panel. A 4px hot zone exists for this drag.
617 | - Background: Level 2 surface (`#1A1A21`)
618 | - Right border: 1px structural border
619 | 
620 | **Right Panel Zone:**
621 | - Default width: 320px
622 | - Minimum width: 200px
623 | - Maximum width: 520px
624 | - Collapsible: Yes. Same mechanism as left panel, mirrored.
625 | - Collapsed width: 0px
626 | - Left border: 1px structural border
627 | 
628 | **Primary Canvas Zone:**
629 | - This zone is the remainder after left panel, right panel, and any fixed-size transport/status bars.
630 | - No border. No background modification from the canvas content.
631 | - Minimum effective width: 400px (below this, the left panel must be auto-collapsed)
632 | 
633 | **Bottom Panel Zone:**
634 | - Default height: 0px (collapsed)
635 | - Minimum height when open: 160px
636 | - Maximum height: 50% of total window height (excluding transport and status zones)
637 | - Toggle: drag the bottom edge of the canvas zone upward to open. A 4px hot zone exists.
638 | - Toggle button: same style as left/right panel toggle, horizontally centered, 32px wide, 6px tall.
639 | - Top border: 1px structural border
640 | 
641 | **Status Bar Zone:**
642 | - Height: exactly 22px. Fixed. Never resized.
643 | - Width: 100% of window width.
644 | - Background: Level 1 surface (`#111115`)
645 | - Top border: 1px structural border
646 | - Internal horizontal padding: 12px left, 12px right
647 | 
648 | ## 9.3 Zone Interaction Rules
649 | 
650 | **Simultaneous collapse:** If the user collapses both the left and right panels, the canvas zone expands to fill the full width. This should happen with the same animation as a single panel collapse.
651 | 
652 | **Minimum window size:** The application window enforces a minimum size of 900px × 600px. Below this, the layout is allowed to scroll rather than collapse further.
653 | 
654 | **Zone memory:** Every zone's open/closed state and size is persisted to the active workspace preset. When the application restarts, all zones restore to exactly the state they were in when the application last closed.
655 | 
656 | **Zone resize feedback:** When the user drags a zone border to resize, a 1px accent-colored line indicates the drag position. No labels, no size readout — the visual result is the feedback.
657 | 
658 | ---
659 | 
660 | # 10. WINDOW MANAGEMENT SYSTEM
661 | 
662 | ## 10.1 Main Application Window
663 | 
664 | AUDIAW presents as a single main application window. The window has:
665 | 
666 | **Title bar (macOS):**
667 | - Uses native macOS title bar with traffic lights (red/yellow/green close/minimize/maximize)
668 | - Title bar background: Level 2 surface (`#1A1A21`), blended with the transport zone
669 | - Window title: displays project name only ("Untitled Project" for new projects). No " — AUDIAW" suffix.
670 | - Title font: 12px Inter Medium, opacity 0.65 (subdued, not competing with transport content)
671 | - Title position: centered between traffic lights and transport controls, or in the center of the title bar if space allows
672 | 
673 | **Title bar (Windows):**
674 | - Custom title bar drawn by the application (Tauri frameless + custom)
675 | - Custom minimize/maximize/close buttons at right edge, 46px each button width
676 | - Button styles: close (×), maximize (□), minimize (—)
677 | - Button hover: close button uses `rgba(239, 68, 68, 0.2)` background on hover. Maximize/minimize use `rgba(255, 255, 255, 0.06)` on hover.
678 | - Title bar height: merged into the transport zone. The 52px transport zone serves as the title bar.
679 | - Drag region: the transport zone is draggable (the window can be dragged from the transport bar) except over interactive controls.
680 | 
681 | **Title bar (Linux):**
682 | - Respects the user's desktop environment (GTK/Qt title bar). AUDIAW does not force custom title bars on Linux.
683 | - If the desktop environment supports it, AUDIAW can request a flat title bar style.
684 | 
685 | ## 10.2 Plugin Windows
686 | 
687 | Plugin UI windows are secondary windows spawned when a plugin's UI is opened:
688 | 
689 | **Appearance:**
690 | - Window background: Level 1 surface (`#111115`) — not the plugin's internal UI background, which is defined by the plugin developer
691 | - Window title bar: 28px height, compact
692 | - Title: "[Plugin Name] — [Track Name]"
693 | - Title font: 11px Inter Regular, opacity 0.70
694 | - No resize grip decoration — but window IS resizable by dragging edges (if plugin supports)
695 | - Always a true window (not a popover or sheet) — appears in the taskbar/dock
696 | 
697 | **Plugin window behavior:**
698 | - Plugin windows default to floating (not docked)
699 | - Plugin windows can be grouped: multiple plugin windows snap to each other magnetically with 8px spacing
700 | - Default position: centered over the device chain area it was opened from, offset 32px down and 32px right
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs
package.json,pnpm-workspace.yaml,.gitignore,src-tauri/Cargo.toml,src-tauri/build.rs,index.html,vite.config.ts,app-icon.png.svg,src-tauri/tauri.conf.json,src/index.css,DOCS/V0.5_TECHNICAL_SPECIFICATION.md,crates/audiaw-project/Cargo.toml,tsconfig.json,tsconfig.node.json,tailwind.config.js,postcss.config.js,SETUP.md,VERIFICATION.md,src/styles/theme.ts,src/styles/animations.css

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T22:24:29.051Z
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
    <path>DOCS/AUDIAW-DESIGN.md</path>
    <line_range>1100-1400</line_range>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 'DOCS/AUDIAW-DESIGN.md'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>DOCS/AUDIAW-DESIGN.md</path>
<content lines="1100-1400">
1100 | 
1101 | # 17. CONTRAST SYSTEM
1102 | 
1103 | ## 17.1 Minimum Contrast Ratios
1104 | 
1105 | AUDIAW meets or exceeds WCAG 2.1 AA for all text elements:
1106 | 
1107 | | Text Type | Minimum Ratio | AUDIAW Target |
1108 | |---|---|---|
1109 | | Normal text (< 18px) | 4.5:1 | 5.5:1+ |
1110 | | Large text (≥ 18px, or ≥ 14px bold) | 3:1 | 4.0:1+ |
1111 | | UI components and states | 3:1 | 3.5:1+ |
1112 | | Decorative / non-informational | None | N/A |
1113 | 
1114 | **Verified contrast values (AUDIAW Dark theme):**
1115 | 
1116 | | Element | Foreground | Background | Ratio |
1117 | |---|---|---|---|
1118 | | Primary text | `rgba(255,255,255,0.92)` | `#1A1A21` | 11.2:1 ✓ |
1119 | | Secondary text | `rgba(255,255,255,0.58)` | `#1A1A21` | 5.8:1 ✓ |
1120 | | Tertiary text | `rgba(255,255,255,0.35)` | `#1A1A21` | 3.4:1 ✓ |
1121 | | Tab label active | `rgba(255,255,255,0.90)` | `#1A1A21` | 10.8:1 ✓ |
1122 | | Tab label inactive | `rgba(255,255,255,0.45)` | `#171720` | 4.6:1 ✓ |
1123 | | Disabled text | `rgba(255,255,255,0.20)` | any | < 3:1 (acceptable: non-interactive) |
1124 | 
1125 | ## 17.2 Non-Text Contrast
1126 | 
1127 | Interactive non-text elements (buttons, checkboxes, knob outlines) must meet 3:1 against adjacent surfaces.
1128 | 
1129 | ---
1130 | 
1131 | # 18. MONOCHROME UI RULES
1132 | 
1133 | ## 18.1 The Monochrome Principle
1134 | 
1135 | The AUDIAW interface is fundamentally monochrome. The neutral gray scale is the only color used for:
1136 | - All backgrounds and surfaces
1137 | - All borders and separators
1138 | - All non-status labels and text
1139 | - All icons in rest state
1140 | - All structural decorations (grid lines, rulers, guides)
1141 | 
1142 | This monochrome principle exists not as aesthetic minimalism but as a functional discipline: **it reserves chromatic color for information that genuinely requires it.**
1143 | 
1144 | ## 18.2 The Color Permission List
1145 | 
1146 | Color (non-neutral) may only appear in the AUDIAW interface in these specific contexts. Any usage not on this list is a design error:
1147 | 
1148 | 1. **Track and clip colors** — assigned by the user for spatial memory
1149 | 2. **Level meter colors** — green/amber/red zones for safe/caution/clip
1150 | 3. **Record status** — red (#EF4444) when recording is active
1151 | 4. **Loop markers** — accent color (blue default) for loop region overlay
1152 | 5. **Playhead indicator** — white (near-pure) line against colored content
1153 | 6. **Automation lane** — each lane uses a saturated color tied to its parameter
1154 | 7. **Accent interactive elements** — the accent color for primary call-to-action buttons, active focus states, and the current selection indicator
1155 | 8. **Status indicators** — success (green), warning (amber), error (red)
1156 | 9. **Waveform fill** — track color tinted fill (40% opacity of track color)
1157 | 10. **MIDI note fill** — track color at 70% opacity
1158 | 11. **Plugin crash indicator** — red (#EF4444) banner
1159 | 12. **Dot-matrix displays** — white text with subtle glow during playback, red during record
1160 | 
1161 | ## 18.3 Icon Color Rules
1162 | 
1163 | Icons follow a specific color discipline:
1164 | 
1165 | **At rest:** Icons use `rgba(255,255,255,0.50)` — neutral, secondary emphasis  
1166 | **On hover:** Icons use `rgba(255,255,255,0.80)` — lighter, indicating interactivity  
1167 | **When active/toggled on:** Icons use `rgba(255,255,255,0.92)` — near-white, full presence  
1168 | **When disabled:** Icons use `rgba(255,255,255,0.20)` — barely visible, not interactive  
1169 | **Status icons (mute, solo, record):** Use their designated status color when active:
1170 | - Mute active: amber (`#F59E0B`)
1171 | - Solo active: cyan (`#06B6D4`)
1172 | - Record arm: dim red (`#8B2020`)
1173 | - Recording active: bright red (`#EF4444`)
1174 | 
1175 | ---
1176 | 
1177 | # 19. ACCENT COLOR RULES
1178 | 
1179 | ## 19.1 Default Accent Color
1180 | 
1181 | The default accent color is `hsl(213, 90%, 60%)` — a clear, medium blue:
1182 | - Hex: `#3B8BF5`
1183 | - Usage: focus states, selected items, primary CTA buttons, active UI highlights
1184 | 
1185 | ## 19.2 User-Configurable Accent
1186 | 
1187 | Users can change the accent color in Preferences → Appearance → Accent Color. Available accent presets:
1188 | 
1189 | | Name | Hue | Hex |
1190 | |---|---|---|
1191 | | Blue (default) | 213° | `#3B8BF5` |
1192 | | Indigo | 240° | `#6366F1` |
1193 | | Violet | 262° | `#8B5CF6` |
1194 | | Emerald | 160° | `#10B981` |
1195 | | Teal | 180° | `#06B6D4` |
1196 | | Amber | 38° | `#F59E0B` |
1197 | | Rose | 341° | `#F43F5E` |
1198 | | White | — | `#E2E2E8` |
1199 | 
1200 | No custom color picker is available for accent in v1.0. Fixed palette ensures the accent colors are guaranteed to meet contrast requirements.
1201 | 
1202 | ## 19.3 Accent Usage Constraints
1203 | 
1204 | The accent color is used for exactly these purposes:
1205 | 
1206 | 1. **Focus ring:** 1.5px solid outline around keyboard-focused elements
1207 | 2. **Active tab indicator:** 2px horizontal bar at bottom of active tab
1208 | 3. **Primary button fill:** background of primary action buttons (Export, Save, Confirm)
1209 | 4. **Selection highlight:** background of selected text and selected list items (at 15% opacity)
1210 | 5. **Toggle active state:** filled background of active toggle switches
1211 | 6. **Loop region overlay:** 15% opacity accent fill over the loop region
1212 | 7. **Active automation lane header:** left border of the currently visible automation lane
1213 | 8. **Playhead head** (the small triangle at the top): filled accent color
1214 | 9. **Clip selection border:** 1.5px accent border on selected clips
1215 | 
1216 | The accent color is **never** used for:
1217 | - Backgrounds of entire panels or sections
1218 | - Track colors (separate system)
1219 | - Decorative purposes
1220 | - Text emphasis (use weight/opacity instead)
1221 | 
1222 | ---
1223 | 
1224 | # 20. ICONOGRAPHY
1225 | 
1226 | ## 20.1 Icon Grid and Construction
1227 | 
1228 | All AUDIAW icons are constructed on a 20×20px artboard with 1px inner padding (18×18px effective area). Icons are drawn with:
1229 | 
1230 | - **Stroke weight:** 1.5px at 20px size, scaling proportionally
1231 | - **Cap style:** Round
1232 | - **Join style:** Round
1233 | - **Corner radius for rectangles within icons:** 1.5px
1234 | - **Fill:** Never (icon set is stroke-only, except for specific filled states like the "active/on" version of toggles)
1235 | 
1236 | ## 20.2 Icon Sizes in Context
1237 | 
1238 | | Context | Rendered Size | Source Size | Usage |
1239 | |---|---|---|---|
1240 | | Status bar | 12px | 20px (scaled) | Smallest in-UI |
1241 | | Track header controls | 14px | 20px (scaled) | Mute, solo, arm, etc. |
1242 | | Tab bar labels | 14px | 20px (scaled) | Tab icons |
1243 | | Transport buttons (secondary) | 16px | 20px (scaled) | Loop, metro, etc. |
1244 | | Transport buttons (primary) | 20px | 20px (1:1) | Play, stop, record |
1245 | | Panel section headers | 14px | 20px (scaled) | Section identifiers |
1246 | | Command palette icons | 14px | 20px (scaled) | Command icons |
1247 | | Context menu icons | 14px | 20px (scaled) | Menu item icons |
1248 | | Plugin browser thumbnails | 24px | 20px (scaled) | Plugin format badges |
1249 | | Empty state illustrations | 48px | SVG (vector) | Large empty state art |
1250 | 
1251 | ## 20.3 Icon Set Catalog
1252 | 
1253 | **Transport:**
1254 | - `play` — right-pointing triangle (filled when active, stroke when inactive)
1255 | - `pause` — two vertical bars
1256 | - `stop` — square (4px corner radius)
1257 | - `record` — circle (filled when armed/recording, stroke when off)
1258 | - `rewind` — two left-pointing chevrons
1259 | - `fast-forward` — two right-pointing chevrons
1260 | - `loop` — circular arrow (closed loop path)
1261 | - `metronome` — pendulum shape (distinctive, not generic)
1262 | 
1263 | **Track Types:**
1264 | - `audio-track` — horizontal waveform lines (3 lines, varying lengths)
1265 | - `midi-track` — musical note symbol (8th note)
1266 | - `group-track` — folder with stacked layers inside
1267 | - `return-track` — curved arrow returning left
1268 | - `master-track` — crown shape (3 points)
1269 | 
1270 | **Editing Tools:**
1271 | - `pointer` — standard cursor arrow
1272 | - `pencil` — pencil at 45° angle
1273 | - `eraser` — rectangle with angled top
1274 | - `scissors` — scissors, closed
1275 | - `slice` — vertical line with small perpendicular marks
1276 | - `zoom-in` — magnifying glass with plus
1277 | - `zoom-out` — magnifying glass with minus
1278 | 
1279 | **Controls:**
1280 | - `mute` — speaker with X
1281 | - `solo` — headphones
1282 | - `arm` — record circle (small)
1283 | - `monitor` — speaker with in-arrow
1284 | - `freeze` — snowflake (6-pointed, simple)
1285 | - `lock` — padlock
1286 | - `eye-off` — eye with slash
1287 | 
1288 | **Navigation:**
1289 | - `arrow-left`, `arrow-right`, `arrow-up`, `arrow-down` — directional chevrons (not full arrows)
1290 | - `chevron-down` — simple V shape
1291 | - `chevron-right` — simple > shape
1292 | 
1293 | **File and Project:**
1294 | - `folder` — folder shape
1295 | - `file` — document with folded corner
1296 | - `save` — floppy disk (universally recognized)
1297 | - `export` — box with up-arrow
1298 | - `import` — box with down-arrow
1299 | 
1300 | **Interface:**
1301 | - `gear` — 8-tooth gear (settings)
1302 | - `grid` — 2×2 dot grid
1303 | - `close` — X (two 45° lines)
1304 | - `plus` — plus sign
1305 | - `minus` — minus sign / dash
1306 | - `more` — three horizontal dots (…)
1307 | - `expand` — four-corner outward arrows
1308 | - `collapse` — four-corner inward arrows
1309 | 
1310 | **Device/DSP:**
1311 | - `waveform` — sine wave
1312 | - `spectrum` — ascending bars (EQ-style)
1313 | - `plugin` — puzzle piece
1314 | - `fx` — lightning bolt
1315 | - `modulation` — curved sine with dots
1316 | 
1317 | ## 20.4 Icon States
1318 | 
1319 | Every icon exists in three visual states, applied via opacity and color (never separate SVG files):
1320 | 
1321 | ```css
1322 | /* Rest state */
1323 | .icon { color: rgba(255,255,255,0.50); }
1324 | 
1325 | /* Hover state (on parent hover or direct hover) */
1326 | .icon:hover, .icon-button:hover .icon { color: rgba(255,255,255,0.80); }
1327 | 
1328 | /* Active / toggled on state */
1329 | .icon.active, [data-active="true"] .icon { color: rgba(255,255,255,0.92); }
1330 | 
1331 | /* Disabled state */
1332 | .icon.disabled, [disabled] .icon { color: rgba(255,255,255,0.20); }
1333 | ```
1334 | 
1335 | Status-specific icon colors override these:
1336 | ```css
1337 | .icon.muted { color: #F59E0B; }      /* Amber when muted */
1338 | .icon.soloed { color: #06B6D4; }      /* Cyan when soloed */
1339 | .icon.armed { color: #8B2020; }       /* Dim red when armed */
1340 | .icon.recording { color: #EF4444; }   /* Bright red when recording */
1341 | ```
1342 | 
1343 | ---
1344 | 
1345 | # 21. MOTION DESIGN SYSTEM
1346 | 
1347 | ## 21.1 Motion Philosophy
1348 | 
1349 | Motion in AUDIAW serves comprehension, not delight. An animation exists to help the user understand a state change, not to make the interface feel more polished in isolation.
1350 | 
1351 | **The three valid reasons for motion:**
1352 | 1. **Spatial orientation** — showing where something came from or where it went (panel slide-in from the left communicates it lives on the left)
1353 | 2. **State confirmation** — confirming that an action was received (a button pressing down confirms the click)
1354 | 3. **Continuity** — maintaining visual continuity across state changes (a clip dragging with the cursor maintains the user's sense of where the clip is)
1355 | 
1356 | **Invalid reasons for motion:**
1357 | - Making the interface feel "premium"
1358 | - Providing visual interest to an otherwise static region
1359 | - Following current UI animation trends
1360 | - Demonstrating technical capability
1361 | 
1362 | ## 21.2 Animation Duration Scale
1363 | 
1364 | ```
1365 | --duration-instant:   0ms    /* State: immediate, no visual transition */
1366 | --duration-micro:    60ms    /* Micro: button press depth, hover state enter */
1367 | --duration-fast:     90ms    /* Fast: hover state exit, panel resize feedback */
1368 | --duration-standard:120ms    /* Standard: panel open/close, selection change */
1369 | --duration-moderate: 180ms   /* Moderate: modal enter/exit */
1370 | --duration-slow:     240ms   /* Slow: workspace switch, view transitions */
1371 | --duration-crawl:    400ms   /* Crawl: startup sequence, onboarding reveals */
1372 | ```
1373 | 
1374 | ## 21.3 Easing Curve Definitions
1375 | 
1376 | ```css
1377 | /* Primary UI easing: fast start, decelerate to rest (feels responsive) */
1378 | --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
1379 | 
1380 | /* Reciprocal: slow start, fast end (for dismiss/collapse) */
1381 | --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
1382 | 
1383 | /* Both directions: for transitions where content leaves and enters */
1384 | --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
1385 | 
1386 | /* Standard: the classic ease-out for most UI transitions */
1387 | --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
1388 | 
1389 | /* Spring: very slight overshoot for panel docking */
1390 | --ease-spring: cubic-bezier(0.34, 1.12, 0.64, 1);
1391 | /* NOTE: Overshoot is ≤12%. Never more. Never use for content transitions. */
1392 | ```
1393 | 
1394 | ## 21.4 Specific Animation Definitions
1395 | 
1396 | **Panel open (left/right panel):**
1397 | ```
1398 | Duration: 150ms
1399 | Easing: --ease-out
1400 | Property: width (or translateX)
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs
package.json,pnpm-workspace.yaml,.gitignore,src-tauri/Cargo.toml,src-tauri/build.rs,index.html,vite.config.ts,app-icon.png.svg,src-tauri/tauri.conf.json,src/index.css,DOCS/V0.5_TECHNICAL_SPECIFICATION.md,crates/audiaw-project/Cargo.toml,tsconfig.json,tsconfig.node.json,tailwind.config.js,postcss.config.js,SETUP.md,VERIFICATION.md,src/styles/theme.ts,src/styles/animations.css

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T22:24:33.006Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.23

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
    <path>DOCS/AUDIAW-DESIGN.md</path>
    <line_range>800-1100</line_range>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 'DOCS/AUDIAW-DESIGN.md'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>DOCS/AUDIAW-DESIGN.md</path>
<content lines="800-1100">
 800 | **Workspace dropdown:**
 801 | - Appears below the button, right-aligned
 802 | - Width: 200px
 803 | - Background: Level 4 surface (`#2C2C39`)
 804 | - Border: 1px at `rgba(255,255,255,0.12)`
 805 | - Border-radius: 6px
 806 | - Padding: 6px 0px (zero horizontal, 6px top/bottom)
 807 | - Shadow: `0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)`
 808 | 
 809 | **Workspace list items:**
 810 | - Height: 32px each
 811 | - Horizontal padding: 12px
 812 | - Font: 12px Inter Regular
 813 | - Active workspace: text at opacity 0.90, a 2px accent line at left edge
 814 | - Inactive workspaces: text at opacity 0.65, no accent line
 815 | - Hover: background `rgba(255,255,255,0.06)`
 816 | - At bottom of list: a separator at 1px `rgba(255,255,255,0.07)`, then "+ New Workspace" item
 817 | 
 818 | ## 12.3 Built-in Workspaces
 819 | 
 820 | Five workspaces ship with AUDIAW and cannot be deleted (but can be duplicated and modified):
 821 | 
 822 | | Name | Main View | Left Panel | Right Panel | Bottom Panel |
 823 | |---|---|---|---|---|
 824 | | Production | Arrangement | Browser | Device View | Closed |
 825 | | Mixing | Mixer | Closed | Device View | Closed |
 826 | | Beatmaking | Arrangement | Browser | Device View | Piano Roll |
 827 | | Mastering | Arrangement | Closed | Spectrum/LUFS | Closed |
 828 | | Performance | Clip Launcher | Closed | Closed | Closed |
 829 | 
 830 | ---
 831 | 
 832 | # 13. GRID SYSTEM
 833 | 
 834 | ## 13.1 Base Grid Unit
 835 | 
 836 | AUDIAW's layout system is built on a **4px base unit**. All spacing, sizes, and positions are multiples of 4px.
 837 | 
 838 | The only exceptions:
 839 | - 1px borders (explicit visual purpose)
 840 | - 1.5px focus borders (explicit visual purpose)
 841 | - Text sizes in points/pixels where 4px multiples would create inharmonious type scale
 842 | 
 843 | ## 13.2 Layout Grid
 844 | 
 845 | The transport bar, status bar, and panel headers use a **12-column internal grid** for positioning their internal elements:
 846 | 
 847 | **Column width:** Flexible (distributes available space)  
 848 | **Gutter width:** 8px  
 849 | **Outer margin:** 16px (left and right)
 850 | 
 851 | This is a reference grid for layout decisions, not a visual element. It does not appear on screen.
 852 | 
 853 | ## 13.3 Content Grid
 854 | 
 855 | Within the primary canvas zone, content (tracks, mixer channels, piano roll notes) follows **its own content grid** defined by the current zoom level and snapping settings. This is the musical grid — bar lines, beat lines, sub-beat lines — and is described fully in the Timeline UX section.
 856 | 
 857 | ## 13.4 Pixel-Perfect Rendering Rules
 858 | 
 859 | At standard (1×) DPI:
 860 | - All borders are exactly 1px (not `0.5px` — 1px at 1× DPI)
 861 | - All element heights are integers
 862 | - All element widths are integers when static; dynamic widths may be non-integer but must be rendered with `will-change: transform` to avoid subpixel jitter
 863 | 
 864 | At HiDPI (2×):
 865 | - 1px borders render as 0.5px logical pixels (2px physical) — crisp
 866 | - CSS will automatically handle this via `devicePixelRatio`
 867 | - GPU-rendered elements (waveforms, meters) are rendered at native device resolution
 868 | 
 869 | ---
 870 | 
 871 | # 14. SPACING SYSTEM
 872 | 
 873 | ## 14.1 Spacing Scale
 874 | 
 875 | ```
 876 | --space-0:    0px    /* No spacing */
 877 | --space-px:   1px    /* Border-only gaps */
 878 | --space-1:    4px    /* Inline icon–label gap, tightest content spacing */
 879 | --space-2:    8px    /* Intra-control spacing, button internal padding */
 880 | --space-3:   12px    /* Control group spacing, tight panel padding */
 881 | --space-4:   16px    /* Standard panel padding, section gap */
 882 | --space-5:   20px    /* Moderate section separation */
 883 | --space-6:   24px    /* Large section gap, prominent visual breathing room */
 884 | --space-8:   32px    /* Major structural separation */
 885 | --space-10:  40px    /* Large layout anchoring */
 886 | --space-12:  48px    /* Maximum inline spacing */
 887 | --space-16:  64px    /* Maximum layout spacing */
 888 | ```
 889 | 
 890 | ## 14.2 Application-Specific Spatial Constants
 891 | 
 892 | These constants override the scale above for specific purposes. They are non-negotiable:
 893 | 
 894 | ```
 895 | --height-transport-bar:        52px   /* Transport zone, always */
 896 | --height-status-bar:           22px   /* Status zone, always */
 897 | --height-tab-bar:              34px   /* Panel tab bars */
 898 | --height-track-compact:        32px   /* Minimum track height */
 899 | --height-track-standard:       48px   /* Default track height */
 900 | --height-track-tall:           80px   /* Expanded track height */
 901 | --height-track-max:           200px   /* User can drag up to this */
 902 | --width-track-header:         216px   /* Track header panel width */
 903 | --width-track-header-min:     160px   /* Minimum (narrow mode) */
 904 | --width-mixer-channel-compact: 56px   /* Compact mixer strip */
 905 | --width-mixer-channel:         72px   /* Standard mixer strip */
 906 | --width-mixer-channel-wide:    96px   /* Wide mixer strip */
 907 | --height-piano-key-width:      80px   /* Piano keyboard area in piano roll */
 908 | --height-velocity-editor:      80px   /* Velocity editor strip height */
 909 | --height-context-menu-item:    32px   /* Context menu rows */
 910 | --height-dropdown-item:        32px   /* Dropdown list rows */
 911 | --height-toolbar-button:       28px   /* Transport bar buttons */
 912 | --radius-standard:              4px   /* Standard border-radius */
 913 | --radius-large:                 6px   /* Larger elements (cards, dropdowns) */
 914 | --radius-pill:                 99px   /* Fully round (status indicators) */
 915 | ```
 916 | 
 917 | ## 14.3 Padding Within Components
 918 | 
 919 | Component internal padding must follow these rules:
 920 | 
 921 | **Buttons:**
 922 | - Small button: 4px vertical, 8px horizontal
 923 | - Standard button: 6px vertical, 12px horizontal
 924 | - Large button: 8px vertical, 16px horizontal
 925 | 
 926 | **Input fields:**
 927 | - Height: 28px for single-line
 928 | - Vertical padding: computed from height and line-height (center align text)
 929 | - Horizontal padding: 8px left, 8px right
 930 | 
 931 | **Panel sections:**
 932 | - Top padding: 16px
 933 | - Bottom padding: 16px
 934 | - Left padding: 16px
 935 | - Right padding: 16px
 936 | 
 937 | **Dropdown menus:**
 938 | - Vertical padding: 6px above first item, 6px below last item
 939 | - Item vertical padding: 0px (height is set to 32px, text is vertically centered)
 940 | - Item horizontal padding: 12px left, 12px right
 941 | 
 942 | ---
 943 | 
 944 | # 15. TYPOGRAPHY SYSTEM
 945 | 
 946 | ## 15.1 Font Stack
 947 | 
 948 | **Primary UI Typeface: Inter Variable**  
 949 | Source: Google Fonts / Fontsource (bundled in application, no network call)  
 950 | Usage: All UI labels, panel text, menu items, status messages, button labels, dialog text  
 951 | Fallback: `system-ui, -apple-system, BlinkMacSystemFont, sans-serif`
 952 | 
 953 | **Monospace / Display Typeface: Geist Mono**  
 954 | Source: Vercel / Fontsource (bundled)  
 955 | Usage: Time displays, BPM, sample rates, position indicators, technical numeric values, note names in piano roll  
 956 | Fallback: `"JetBrains Mono", "Fira Code", ui-monospace, monospace`
 957 | 
 958 | **These are the only two typefaces in AUDIAW.** No third typeface is introduced for any reason. Not for headings, not for branding, not for marketing panels.
 959 | 
 960 | ## 15.2 Type Scale
 961 | 
 962 | ```
 963 | --type-2xs:  9px    /* Keyboard shortcut badges, microscopic labels */
 964 | --type-xs:  10px    /* Meter tick labels, secondary status bar text */
 965 | --type-sm:  11px    /* Compact track names, tab labels, tooltips, status bar */
 966 | --type-base: 12px   /* Standard UI text, track names, menu items, inputs */
 967 | --type-md:  13px    /* Panel section headers, important labels */
 968 | --type-lg:  14px    /* Prominent values, dialog titles */
 969 | --type-xl:  16px    /* Section headers in settings panels */
 970 | --type-2xl: 20px    /* Onboarding headings, template names in start screen */
 971 | --type-3xl: 28px    /* Startup screen wordmark, first-run splash */
 972 | ```
 973 | 
 974 | ## 15.3 Font Weights
 975 | 
 976 | **Inter Variable weights used:**
 977 | 
 978 | | Weight | Value | Usage |
 979 | |---|---|---|
 980 | | Regular | 400 | Body text, labels, input values, menu items |
 981 | | Medium | 500 | Panel headers, tab labels, button text, track names |
 982 | | Semibold | 600 | Section titles, modal dialog titles |
 983 | 
 984 | No weight above Semibold (600) is ever used in the UI.  
 985 | No Italic is ever used in the UI (only in text content areas, such as user notes).
 986 | 
 987 | ## 15.4 Line Heights
 988 | 
 989 | ```
 990 | --leading-tight:   1.2    /* Single-line labels, buttons (crop descenders) */
 991 | --leading-snug:    1.35   /* Multi-line labels, control names */
 992 | --leading-normal:  1.5    /* Body text in documentation panels */
 993 | --leading-relaxed: 1.65   /* Onboarding text, tutorial content */
 994 | ```
 995 | 
 996 | ## 15.5 Letter Spacing
 997 | 
 998 | ```
 999 | --tracking-tight:  -0.01em   /* Large display text (20px+) */
1000 | --tracking-normal:  0em      /* Standard text (12-16px) */
1001 | --tracking-wide:    0.04em   /* Small uppercase labels (10-11px) */
1002 | --tracking-wider:   0.08em   /* All-caps micro labels (9-10px) */
1003 | --tracking-widest:  0.12em   /* Dot-matrix display text */
1004 | ```
1005 | 
1006 | ## 15.6 Text Opacity Hierarchy
1007 | 
1008 | Text never uses `color: rgba(0,0,0,X)` on dark surfaces. Instead, white text with opacity:
1009 | 
1010 | ```
1011 | --text-primary:   rgba(255, 255, 255, 0.92)   /* Main content, active states */
1012 | --text-secondary: rgba(255, 255, 255, 0.58)   /* Labels, secondary info */
1013 | --text-tertiary:  rgba(255, 255, 255, 0.35)   /* Placeholders, disabled, hints */
1014 | --text-ghost:     rgba(255, 255, 255, 0.18)   /* Almost invisible, guide text */
1015 | ```
1016 | 
1017 | ## 15.7 Text Rendering
1018 | 
1019 | ```css
1020 | body {
1021 |   -webkit-font-smoothing: antialiased;
1022 |   -moz-osx-font-smoothing: grayscale;
1023 |   text-rendering: optimizeLegibility;
1024 |   font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
1025 | }
1026 | ```
1027 | 
1028 | Subpixel antialiasing is disabled. Grayscale antialiasing provides better rendering on dark backgrounds across all operating systems.
1029 | 
1030 | ---
1031 | 
1032 | # 16. COLOR SYSTEM
1033 | 
1034 | ## 16.1 Base Palette
1035 | 
1036 | AUDIAW's base palette is entirely defined in HSL to allow precise relationship management:
1037 | 
1038 | **Neutral Scale (the structural backbone):**
1039 | ```
1040 | --neutral-900: hsl(240, 10%, 6%)    /* #0D0D0F — Void */
1041 | --neutral-850: hsl(240, 9%, 8%)     /* #111115 — Level 1 surface */
1042 | --neutral-800: hsl(240, 10%, 11%)   /* #1A1A21 — Level 2 surface */
1043 | --neutral-750: hsl(240, 10%, 14%)   /* #22222C — Level 3 surface */
1044 | --neutral-700: hsl(240, 10%, 17%)   /* #2C2C39 — Level 4 surface */
1045 | --neutral-650: hsl(240, 9%, 20%)    /* #363645 — Level 5 surface */
1046 | --neutral-600: hsl(240, 8%, 28%)    /* #444455 — Strong border */
1047 | --neutral-500: hsl(240, 6%, 42%)    /* #696978 — Mid-tone, disabled */
1048 | --neutral-400: hsl(240, 5%, 55%)    /* #8888A0 — Secondary text */
1049 | --neutral-300: hsl(240, 4%, 68%)    /* #AAAABB — Primary-secondary text */
1050 | --neutral-200: hsl(240, 4%, 82%)    /* #CCCCDD — Near-white text */
1051 | --neutral-100: hsl(240, 3%, 92%)    /* #EAEAEC — White text */
1052 | ```
1053 | 
1054 | **Status Colors:**
1055 | ```
1056 | --status-record:    hsl(0, 83%, 60%)    /* #EF4444 */
1057 | --status-record-dim: hsl(0, 83%, 35%)  /* #8B2020 — Record arm, not active */
1058 | --status-warning:   hsl(38, 90%, 50%)  /* #F59E0B */
1059 | --status-error:     hsl(0, 83%, 60%)   /* #EF4444 (same as record) */
1060 | --status-success:   hsl(142, 70%, 45%) /* #22C55E */
1061 | --status-info:      hsl(213, 94%, 68%) /* #60A5FA */
1062 | ```
1063 | 
1064 | **Meter Colors:**
1065 | ```
1066 | --meter-safe:       hsl(142, 70%, 45%) /* #22C55E — 0 to -12 dBFS */
1067 | --meter-caution:    hsl(38, 90%, 50%)  /* #F59E0B — -12 to -3 dBFS */
1068 | --meter-danger:     hsl(0, 83%, 60%)   /* #EF4444 — -3 to 0 dBFS */
1069 | --meter-clip:       hsl(0, 100%, 50%)  /* #FF0000 — Clipping */
1070 | --meter-bg:         hsl(240, 10%, 9%)  /* #131318 — Meter background */
1071 | ```
1072 | 
1073 | ## 16.2 Track Color Palette
1074 | 
1075 | 16 user-assignable track colors. Each color has three variants:
1076 | 
1077 | | ID | Name | Hue | Main | Dim (30% sat) | Bright (waveform) |
1078 | |---|---|---|---|---|---|
1079 | | 1 | Crimson | 0° | `#EF4444` | `#553333` | `#FF6666` |
1080 | | 2 | Ember | 20° | `#F97316` | `#553722` | `#FF8844` |
1081 | | 3 | Amber | 38° | `#F59E0B` | `#554422` | `#FFBB33` |
1082 | | 4 | Gold | 50° | `#EAB308` | `#554822` | `#FFCC22` |
1083 | | 5 | Lime | 84° | `#84CC16` | `#3A4D18` | `#AAEE33` |
1084 | | 6 | Emerald | 142° | `#22C55E` | `#1A4D2E` | `#44EE77` |
1085 | | 7 | Teal | 170° | `#10B981` | `#1A4438` | `#22DDAA` |
1086 | | 8 | Cyan | 186° | `#06B6D4` | `#1A4455` | `#22DDEE` |
1087 | | 9 | Blue | 213° | `#3B82F6` | `#1A3366` | `#5599FF` |
1088 | | 10 | Violet | 262° | `#8B5CF6` | `#3A2966` | `#AA77FF` |
1089 | | 11 | Fuchsia | 292° | `#D946EF` | `#551966` | `#EE55FF` |
1090 | | 12 | Rose | 341° | `#F43F5E` | `#553344` | `#FF5577` |
1091 | | 13 | Slate | 215° | `#64748B` | `#2A3344` | `#8899AA` |
1092 | | 14 | Stone | 25° | `#78716C` | `#33302E` | `#99887F` |
1093 | | 15 | Neutral | 240° | `#A3A3A3` | `#3D3D3D` | `#BBBBBB` |
1094 | | 16 | White | 240° | `#E2E2E8` | `#444455` | `#FFFFFF` |
1095 | 
1096 | **Color picker UI:**
1097 | A 4×4 grid of color swatches, each 24×24px, 4px gap, 4px border-radius. Active track color has a 2px white border. Appears as a floating Level 4 surface panel (160px wide, auto height), opened by clicking the track color strip.
1098 | 
1099 | ---
1100 | 
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs
package.json,pnpm-workspace.yaml,.gitignore,src-tauri/Cargo.toml,src-tauri/build.rs,index.html,vite.config.ts,app-icon.png.svg,src-tauri/tauri.conf.json,src/index.css,DOCS/V0.5_TECHNICAL_SPECIFICATION.md,crates/audiaw-project/Cargo.toml,tsconfig.json,tsconfig.node.json,tailwind.config.js,postcss.config.js,SETUP.md,VERIFICATION.md,src/styles/theme.ts,src/styles/animations.css

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T22:24:36.840Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.32

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

<search_files>
<path>src/components</path>
<regex>className.*=.*["`']</regex>
<file_pattern>*.tsx</file_pattern>
</search_files>

---

**User:**

[search_files for 'className.*=.*["`']' in '*.tsx'] Result:
Found 101 results.

# src/components/UI/Meter.tsx
 61 |       <div
 62 |         className="relative bg-dark-surface rounded-sm overflow-hidden"
 63 |         style={{ width: `${width}px`, height: `${height}px` }}
----
 65 |         {/* Segments */}
 66 |         <div className="absolute inset-0 flex flex-col-reverse gap-0.5 p-0.5">
 67 |           {segments.map((segment, index) => {
----
 73 |                 key={index}
 74 |                 className="rounded-sm transition-all duration-50"
 75 |                 style={{
----
 87 |           <div
 88 |             className="absolute left-0 right-0 h-0.5 bg-white transition-all duration-100"
 89 |             style={{ bottom: `${peakHeight}%` }}
----
 97 |     return (
 98 |       <div className="flex gap-1">
 99 |         {renderMeter(level, peak)}
----

# src/components/UI/Knob.tsx
 95 |   return (
 96 |     <div className="flex flex-col items-center gap-2">
 97 |       {label && (
 98 |         <div className="text-xs text-dark-muted font-medium">
 99 |           {label}
----
104 |         ref={knobRef}
105 |         className={`
106 |           relative rounded-full bg-dark-surface border-2 border-dark-border
----
115 |         <svg
116 |           className="absolute inset-0"
117 |           viewBox="0 0 100 100"
----
142 |         <div
143 |           className="absolute top-1 left-1/2 w-1 h-3 bg-dark-text rounded-full -translate-x-1/2 origin-bottom"
144 |           style={{
----
151 |         {bipolar && (
152 |           <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-dark-muted rounded-full -translate-x-1/2 -translate-y-1/2" />
153 |         )}
----
156 |       {showValue && (
157 |         <div className="text-xs font-mono text-dark-text">
158 |           {formatValue(value)}
----

# src/components/UI/Fader.tsx
 75 |   return (
 76 |     <div className="flex flex-col items-center gap-2">
 77 |       {label && (
 78 |         <div className="text-xs text-dark-muted font-medium">
 79 |           {label}
----
 84 |         ref={faderRef}
 85 |         className={`
 86 |           relative w-8 bg-dark-surface rounded-full border border-dark-border
----
 93 |         {/* dB Scale Markers */}
 94 |         <div className="absolute -left-6 top-0 h-full flex flex-col justify-between text-xs text-dark-muted">
 95 |           <span>0</span>
----
103 |         <div
104 |           className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-600 to-primary-400 rounded-full transition-all duration-100"
105 |           style={{ height: `${fillHeight}%` }}
----
109 |         <div
110 |           className={`
111 |             absolute left-1/2 -translate-x-1/2 w-10 h-3
----
120 |       {showValue && (
121 |         <div className="text-xs font-mono text-dark-text">
122 |           {valueToDb(value)} dB
----

# src/components/UI/Button.tsx
 23 |   disabled = false,
 24 |   className = '',
 25 |   children,
----

# src/components/Transport/TransportBar.tsx
 79 |   return (
 80 |     <div className="flex items-center justify-between px-6 py-3 bg-dark-surface border-b border-dark-border">
 81 |       {/* Left: Transport Controls */}
 82 |       <div className="flex items-center gap-2">
 83 |         {/* Play/Pause */}
----
 91 |           {isPlaying ? (
 92 |             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
 93 |               <rect x="6" y="4" width="4" height="16" rx="1" />
----
 96 |           ) : (
 97 |             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
 98 |               <path d="M8 5v14l11-7z" />
----
110 |         >
111 |           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
112 |             <rect x="6" y="6" width="12" height="12" rx="1" />
----
122 |           title="Record (R)"
123 |           className={isRecording ? 'pulse' : ''}
124 |         >
125 |           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
126 |             <circle cx="12" cy="12" r="6" />
----
129 | 
130 |         <div className="w-px h-8 bg-dark-border mx-2" />
131 | 
----
139 |         >
140 |           <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
141 |             <path d="M17 2l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" />
----
152 |         >
153 |           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
154 |             <path d="M12 2L4 20h16L12 2zm0 4l5 12H7l5-12z" />
----
159 |       {/* Center: Position Display */}
160 |       <div className="flex items-center gap-4">
161 |         <div className="flex flex-col items-center">
162 |           <div className="text-xs text-dark-muted mb-1">Position</div>
163 |           <div className="font-mono text-lg text-dark-text bg-dark-bg px-4 py-1 rounded border border-dark-border">
164 |             {positionDisplay}
----
167 | 
168 |         <div className="w-px h-12 bg-dark-border" />
169 | 
170 |         {/* Tempo */}
171 |         <div className="flex flex-col items-center">
172 |           <div className="text-xs text-dark-muted mb-1">Tempo</div>
173 |           {isEditingTempo ? (
----
179 |               onKeyDown={handleTempoKeyDown}
180 |               className="font-mono text-lg text-dark-text bg-dark-bg px-4 py-1 rounded border border-primary-600 w-24 text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
181 |               autoFocus
----
187 |               onClick={() => setIsEditingTempo(true)}
188 |               className="font-mono text-lg text-dark-text bg-dark-bg px-4 py-1 rounded border border-dark-border hover:border-dark-hover transition-colors"
189 |             >
190 |               {tempo} <span className="text-dark-muted text-sm">BPM</span>
191 |             </button>
----
195 |         {/* Time Signature */}
196 |         <div className="flex flex-col items-center">
197 |           <div className="text-xs text-dark-muted mb-1">Time Sig</div>
198 |           <div className="font-mono text-lg text-dark-text bg-dark-bg px-4 py-1 rounded border border-dark-border">
199 |             {timeSignature.numerator}/{timeSignature.denominator}
----
204 |       {/* Right: System Info */}
205 |       <div className="flex items-center gap-4 text-xs text-dark-muted">
206 |         <div className="flex items-center gap-2">
207 |           <span>CPU:</span>
208 |           <div className="w-16 h-2 bg-dark-bg rounded-full overflow-hidden">
209 |             <div className="h-full bg-primary-600" style={{ width: '35%' }} />
210 |           </div>
----
212 |         </div>
213 |         <div className="flex items-center gap-2">
214 |           <span>48kHz</span>
----

# src/components/TrackList/TrackList.tsx
 32 |     <div
 33 |       className="flex flex-col bg-dark-surface border-r border-dark-border overflow-y-auto"
 34 |       style={{ width: `${theme.spacing.trackHeaderWidth}px` }}
----
 36 |       {/* Header */}
 37 |       <div className="flex items-center justify-between p-3 border-b border-dark-border bg-dark-bg sticky top-0 z-10">
 38 |         <h2 className="text-sm font-semibold text-dark-text uppercase">
 39 |           Tracks
----
 46 |         >
 47 |           <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
 48 |             <path d="M12 5v14M5 12h14" />
----
 53 |       {/* Track list */}
 54 |       <div className="flex-1">
 55 |         {tracks.length === 0 ? (
 56 |           <div className="flex flex-col items-center justify-center h-full p-6 text-center">
 57 |             <svg className="w-12 h-12 text-dark-muted mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
 58 |               <path d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
 59 |             </svg>
 60 |             <p className="text-sm text-dark-muted mb-3">
 61 |               No tracks yet
----
 90 |       {/* Footer with track count */}
 91 |       <div className="p-2 border-t border-dark-border bg-dark-bg text-xs text-dark-muted text-center">
 92 |         {tracks.length} {tracks.length === 1 ? 'track' : 'tracks'}
----

# src/components/TrackList/TrackControls.tsx
 87 |     <div
 88 |       className={`
 89 |         flex flex-col p-3 bg-dark-surface border-b border-dark-border
----
 99 |       {/* Track name and color */}
100 |       <div className="flex items-center gap-2 mb-2">
101 |         <div
102 |           className="w-3 h-3 rounded-sm flex-shrink-0"
103 |           style={{ backgroundColor: track.color }}
----
111 |             onKeyDown={handleNameKeyDown}
112 |             className="flex-1 px-2 py-1 text-sm bg-dark-bg border border-primary-600 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
113 |             autoFocus
----
117 |             onClick={handleNameClick}
118 |             className="flex-1 text-left text-sm font-medium text-dark-text hover:text-primary-500 transition-colors truncate"
119 |           >
----
125 |       {/* Control buttons */}
126 |       <div className="flex items-center gap-1 mb-2">
127 |         <Button
----
132 |           title="Mute (M)"
133 |           className="flex-1"
134 |         >
----
142 |           title="Solo (S)"
143 |           className="flex-1"
144 |         >
----
152 |           title="Arm for Recording (R)"
153 |           className="flex-1"
154 |         >
155 |           <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
156 |             <circle cx="12" cy="12" r="6" />
----
167 |           title="Import Audio File"
168 |           className="w-full mb-2"
169 |         >
170 |           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
171 |             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
----
178 |       {track.height >= 96 && (
179 |         <div className="flex items-center gap-2 mt-auto">
180 |           <div className="flex-1">
181 |             <Knob
----
189 |           </div>
190 |           <div className="flex-1 flex justify-center">
191 |             <Fader
----
201 |       {/* Track type indicator */}
202 |       <div className="mt-auto pt-2 text-xs text-dark-muted uppercase">
203 |         {track.type}
----

# src/components/Toolbar/Toolbar.tsx
 59 |   return (
 60 |     <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-gray-700">
 61 |       {/* Undo Button */}
----
 65 |         title={undoDescription ? `Undo: ${undoDescription} (Ctrl+Z)` : 'Undo (Ctrl+Z)'}
 66 |         className="flex items-center gap-2"
 67 |       >
 68 |         <svg
 69 |           className="w-4 h-4"
 70 |           fill="none"
----
 80 |         </svg>
 81 |         <span className="hidden sm:inline">Undo</span>
 82 |       </Button>
----
 88 |         title={redoDescription ? `Redo: ${redoDescription} (Ctrl+Y)` : 'Redo (Ctrl+Y)'}
 89 |         className="flex items-center gap-2"
 90 |       >
 91 |         <svg
 92 |           className="w-4 h-4"
 93 |           fill="none"
----
103 |         </svg>
104 |         <span className="hidden sm:inline">Redo</span>
105 |       </Button>
----
108 |       {(undoDescription || redoDescription) && (
109 |         <div className="ml-4 text-sm text-gray-400">
110 |           {canUndo && undoDescription && (
----

# src/components/Timeline/TimelineRuler.tsx
 47 |     <div
 48 |       className="relative h-8 bg-dark-surface border-b border-dark-border cursor-pointer select-none overflow-hidden"
 49 |       onClick={handleClick}
----
 59 |             <div
 60 |               className="absolute top-1 text-xs font-medium text-dark-text"
 61 |               style={{ left: `${x + 4}px` }}
----
 67 |             <div
 68 |               className="absolute top-0 bottom-0 w-px bg-dark-border"
 69 |               style={{ left: `${x}px` }}
----
 78 |                   key={beatIndex}
 79 |                   className="absolute top-4 bottom-0 w-px bg-dark-border opacity-50"
 80 |                   style={{ left: `${beatX}px` }}
----
 88 |       {/* Hover indicator */}
 89 |       <div className="absolute inset-0 pointer-events-none">
 90 |         <div className="absolute inset-0 hover:bg-primary-600 hover:bg-opacity-5 transition-colors" />
 91 |       </div>
----

# src/components/Timeline/Timeline.tsx
 58 |       ref={containerRef}
 59 |       className="relative bg-dark-bg border-b border-dark-border"
 60 |       onWheel={handleWheel}
----
 62 |       {/* Zoom controls */}
 63 |       <div className="absolute top-1 right-2 flex items-center gap-1 z-10">
 64 |         <button
 65 |           onClick={zoomOut}
 66 |           className="px-2 py-1 text-xs bg-dark-surface hover:bg-dark-border rounded border border-dark-border transition-colors"
 67 |           title="Zoom Out"
----
 72 |           onClick={resetZoom}
 73 |           className="px-2 py-1 text-xs bg-dark-surface hover:bg-dark-border rounded border border-dark-border transition-colors"
 74 |           title="Reset Zoom"
----
 79 |           onClick={zoomIn}
 80 |           className="px-2 py-1 text-xs bg-dark-surface hover:bg-dark-border rounded border border-dark-border transition-colors"
 81 |           title="Zoom In"
----
 92 |         <div
 93 |           className="absolute top-0 bottom-0 bg-primary-600 bg-opacity-10 border-l-2 border-r-2 border-primary-600 pointer-events-none"
 94 |           style={{
----
 98 |         >
 99 |           <div className="absolute top-0 left-0 right-0 h-1 bg-primary-600" />
100 |           <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600" />
101 |         </div>
----
105 |       <div
106 |         className={`absolute top-0 bottom-0 w-0.5 bg-primary-500 pointer-events-none z-20 ${
107 |           isPlaying ? 'shadow-lg shadow-primary-500' : ''
----
111 |         {/* Playhead handle */}
112 |         <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-sm" />
113 |       </div>
----

# src/components/ExportDialog/ExportDialog.tsx
 62 |   return (
 63 |     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
 64 |       <div className="bg-gray-800 rounded-lg p-6 w-[500px] max-w-[90vw]">
 65 |         <h2 className="text-xl font-bold mb-4 text-white">Export Audio</h2>
 66 | 
 67 |         {isExporting ? (
 68 |           <div className="space-y-4">
 69 |             <p className="text-gray-300">Exporting audio...</p>
 70 |             <div className="w-full bg-gray-700 rounded-full h-4">
 71 |               <div
 72 |                 className="bg-blue-500 h-4 rounded-full transition-all duration-300"
 73 |                 style={{ width: `${exportProgress}%` }}
----
 75 |             </div>
 76 |             <p className="text-sm text-gray-400 text-center">{exportProgress}%</p>
 77 |           </div>
----
 79 |           <>
 80 |             <div className="space-y-4 mb-6">
 81 |               {/* Sample Rate */}
 82 |               <div>
 83 |                 <label className="block text-sm font-medium text-gray-300 mb-2">
 84 |                   Sample Rate
----
 88 |                   onChange={(e) => setSettings({ ...settings, sample_rate: parseInt(e.target.value) })}
 89 |                   className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
 90 |                 >
----
 98 |               <div>
 99 |                 <label className="block text-sm font-medium text-gray-300 mb-2">
100 |                   Bit Depth
----
104 |                   onChange={(e) => setSettings({ ...settings, bit_depth: e.target.value as 'I16' | 'I24' | 'F32' })}
105 |                   className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
106 |                 >
----
113 |               {/* Normalize */}
114 |               <div className="flex items-center space-x-3">
115 |                 <input
----
122 |                   })}
123 |                   className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
124 |                 />
125 |                 <label htmlFor="normalize" className="text-sm text-gray-300">
126 |                   Normalize to -0.1 dB
----
130 |               {/* Dither */}
131 |               <div className="flex items-center space-x-3">
132 |                 <input
----
136 |                   onChange={(e) => setSettings({ ...settings, dither: e.target.checked })}
137 |                   className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
138 |                 />
139 |                 <label htmlFor="dither" className="text-sm text-gray-300">
140 |                   Apply dither
----
145 |             {/* Buttons */}
146 |             <div className="flex justify-end space-x-3">
147 |               <Button
----

# src/components/ErrorBoundary.tsx
 57 |       return (
 58 |         <div className="min-h-screen bg-dark-bg flex items-center justify-center p-8">
 59 |           <div className="max-w-2xl w-full bg-dark-surface rounded-lg border border-dark-border p-8">
 60 |             {/* Error Icon */}
 61 |             <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-red-500 bg-opacity-20 rounded-full">
 62 |               <svg
 63 |                 className="w-8 h-8 text-red-500"
 64 |                 fill="none"
----
 77 |             {/* Error Title */}
 78 |             <h1 className="text-2xl font-bold text-dark-text text-center mb-4">
 79 |               Something went wrong
----
 82 |             {/* Error Message */}
 83 |             <p className="text-dark-muted text-center mb-6">
 84 |               The application encountered an unexpected error. Please try reloading the page.
----
 88 |             {isDevelopment && this.state.error && (
 89 |               <div className="mb-6 p-4 bg-dark-bg rounded border border-dark-border">
 90 |                 <h2 className="text-sm font-semibold text-red-400 mb-2">
 91 |                   Error Details:
 92 |                 </h2>
 93 |                 <pre className="text-xs text-dark-muted overflow-auto max-h-48">
 94 |                   {this.state.error.toString()}
----
105 |             {/* Action Buttons */}
106 |             <div className="flex gap-4 justify-center">
107 |               <button
108 |                 onClick={this.handleReset}
109 |                 className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200"
110 |               >
----
114 |                 onClick={() => window.location.reload()}
115 |                 className="px-6 py-2 bg-dark-elevated hover:bg-dark-hover text-dark-text rounded-lg border border-dark-border transition-colors duration-200"
116 |               >
----
121 |             {/* Support Info */}
122 |             <p className="text-xs text-dark-muted text-center mt-6">
123 |               If this problem persists, please report it to the development team.
----

# src/components/ArrangementView/TrackLane.tsx
 22 |     <div
 23 |       className="absolute left-0 right-0 border-b border-dark-border bg-dark-surface hover:bg-dark-elevated transition-colors"
 24 |       style={{
----
 29 |       {/* Track lane content */}
 30 |       <div className="relative h-full">
 31 |         {/* Clips */}
----
 42 |         {track.clips.length === 0 && (
 43 |           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
 44 |             <span className="text-xs text-dark-muted opacity-50">
 45 |               Drop audio files here or record
----

# src/components/ArrangementView/ArrangementView.tsx
 42 |       ref={containerRef}
 43 |       className="flex-1 overflow-auto bg-dark-bg"
 44 |       onScroll={handleScroll}
----
 46 |       <div
 47 |         className="relative"
 48 |         style={{
----
 53 |         {/* Grid background */}
 54 |         <div className="absolute inset-0 pointer-events-none">
 55 |           {Array.from({ length: 64 }).map((_, barIndex) => (
----
 57 |               key={barIndex}
 58 |               className="absolute top-0 bottom-0 border-l border-dark-border opacity-30"
 59 |               style={{ left: `${barIndex * pixelsPerBeat * 4}px` }}
----
 65 |         {tracks.length === 0 ? (
 66 |           <div className="flex items-center justify-center h-full min-h-[400px]">
 67 |             <div className="text-center">
 68 |               <svg className="w-16 h-16 text-dark-muted mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
 69 |                 <path d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
 70 |               </svg>
 71 |               <h3 className="text-lg font-semibold text-dark-text mb-2">
 72 |                 Empty Arrangement
 73 |               </h3>
 74 |               <p className="text-sm text-dark-muted">
 75 |                 Add tracks to start creating your project
----
 79 |         ) : (
 80 |           <div className="relative">
 81 |             {tracks.map((track, index) => (
----

# src/components/ArrangementView/AudioClip.tsx
 91 |     <div
 92 |       className={`
 93 |         absolute top-1 bottom-1 rounded
----
111 |       {/* Clip content */}
112 |       <div className="relative h-full p-2 overflow-hidden">
113 |         {/* Clip name */}
114 |         <div className="text-xs font-medium text-dark-text truncate mb-1">
115 |           {clip.name}
----
118 |         {/* Simplified waveform visualization */}
119 |         <div className="absolute bottom-2 left-2 right-2 h-8 flex items-center gap-0.5">
120 |           {Array.from({ length: Math.floor(width / 4) }).map((_, i) => {
----
124 |                 key={i}
125 |                 className="flex-1 bg-current opacity-50"
126 |                 style={{
----
137 |           <>
138 |             <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary-500 cursor-ew-resize hover:bg-primary-400" />
139 |             <div className="absolute right-0 top-0 bottom-0 w-2 bg-primary-500 cursor-ew-resize hover:bg-primary-400" />
140 |           </>
----
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs
package.json,pnpm-workspace.yaml,.gitignore,src-tauri/Cargo.toml,src-tauri/build.rs,index.html,vite.config.ts,app-icon.png.svg,src-tauri/tauri.conf.json,src/index.css,DOCS/V0.5_TECHNICAL_SPECIFICATION.md,crates/audiaw-project/Cargo.toml,tsconfig.json,tsconfig.node.json,tailwind.config.js,postcss.config.js,SETUP.md,VERIFICATION.md,src/styles/theme.ts,src/styles/animations.css

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T22:24:41.301Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.43

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

Now I have a comprehensive understanding of the current implementation and the design specifications. Let me create a detailed implementation plan to align the AUDIAW UI with the design system.

<update_todo_list>
<todos>
[ ] Review and validate the implementation plan with stakeholders
[ ] Phase 1: Update foundation design tokens (theme.ts, index.css, tailwind.config.js)
[ ] Phase 2: Refactor core UI components (Button, Fader, Knob, Meter)
[ ] Phase 3: Update layout components (Transport, TrackList, Timeline, Arrangement)
[ ] Phase 4: Fix animation system (animations.css)
[ ] Phase 5: Verification and testing
[ ] Phase 6: Documentation updates
</todos>
</update_todo_list>

<attempt_completion>
<result>
# AUDIAW Design System Alignment

[Response interrupted by a tool use result. Only one tool may be used at a time and should be placed at the end of the message.]

---

**User:**

[update_todo_list] Result:
Todo list updated successfully.
Tool [attempt_completion] was not executed because a tool has already been used in this message. Only one tool may be used per message. You must assess the first tool's result before proceeding to use the next tool.
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs
package.json,pnpm-workspace.yaml,.gitignore,src-tauri/Cargo.toml,src-tauri/build.rs,index.html,vite.config.ts,app-icon.png.svg,src-tauri/tauri.conf.json,src/index.css,DOCS/V0.5_TECHNICAL_SPECIFICATION.md,crates/audiaw-project/Cargo.toml,tsconfig.json,tsconfig.node.json,tailwind.config.js,postcss.config.js,SETUP.md,VERIFICATION.md,src/styles/theme.ts,src/styles/animations.css

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T22:24:49.474Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.43

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>plan</slug>
<name>📝 Plan</name>
====

REMINDERS

Below is your current list of reminders for this task. Keep them updated as you progress.

| # | Content | Status |
|---|---------|--------|
| 1 | Review and validate the implementation plan with stakeholders | Pending |
| 2 | Phase 1: Update foundation design tokens (theme.ts, index.css, tailwind.config.js) | Pending |
| 3 | Phase 2: Refactor core UI components (Button, Fader, Knob, Meter) | Pending |
| 4 | Phase 3: Update layout components (Transport, TrackList, Timeline, Arrangement) | Pending |
| 5 | Phase 4: Fix animation system (animations.css) | Pending |
| 6 | Phase 5: Verification and testing | Pending |
| 7 | Phase 6: Documentation updates | Pending |


IMPORTANT: When task status changes, remember to call the `update_todo_list` tool to update your progress.

</environment_details>

---

**Assistant:**

<attempt_completion>
<result>
# AUDIAW Design System Alignment - Implementation Plan

## Executive Summary

This document provides a comprehensive, prioritized implementation plan to align the AUDIAW UI with the design specifications outlined in [`AUDIAW-DESIGN.md`](DOCS/AUDIAW-DESIGN.md). The audit identified critical mismatches across color system, typography, spacing, motion, and component implementations. This plan breaks down the work into 6 phases with clear dependencies, estimated timelines, and success criteria.

---

## Phase 1: Foundation Updates (CRITICAL - Week 1)

**Priority:** HIGHEST - All other phases depend on this foundation

### 1.1 Update [`theme.ts`](src/styles/theme.ts:1)

**Current Issues:**
- Surface colors incorrect (`#0a0a0a` vs `#0D0D0F`)
- Text uses solid colors instead of opacity-based system
- Accent color wrong (`#3b82f6` vs `#3B8BF5`)
- Success color incorrect (`#10b981` vs `#22C55E`)
- Missing surface levels (void, overlay, highest)
- No spacing scale tokens
- Font family not "Inter Variable" or "Geist Mono"
- Font scale completely wrong
- Missing sizes: 2xs (9px), md (13px), 3xl (28px)
- Line heights incorrect
- Motion durations wrong

**Required Changes:**

```typescript
// BEFORE (lines 8-13)
background: {
  primary: '#0a0a0a',
  secondary: '#1a1a1a',
  tertiary: '#242424',
  elevated: '#2a2a2a',
}

// AFTER - Use HSL-based neutral scale from design spec
surfaces: {
  void: 'hsl(240, 10%, 6%)',      // #0D0D0F
  level1: 'hsl(240, 9%, 8%)',     // #111115
  level2: 'hsl(240, 10%, 11%)',   // #1A1A21
  level3: 'hsl(240, 10%, 14%)',   // #22222C
  level4: 'hsl(240, 10%, 17%)',   // #2C2C39
  level5: 'hsl(240, 9%, 20%)',    // #363645
  overlay: 'rgba(0, 0, 0, 0.8)',
  highest: 'hsl(240, 10%, 20%)',
}
```

```typescript
// BEFORE (lines 14-20)
text: {
  primary: '#ffffff',
  secondary: '#e5e5e5',
  tertiary: '#a0a0a0',
  muted: '#737373',
  disabled: '#505050',
}

// AFTER - Opacity-based system
text: {
  primary: 'rgba(255, 255, 255, 0.92)',
  secondary: 'rgba(255, 255, 255, 0.58)',
  tertiary: 'rgba(255, 255, 255, 0.35)',
  ghost: 'rgba(255, 255, 255, 0.18)',
}
```

```typescript
// BEFORE (lines 21-31)
accent: {
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  primaryActive: '#1d4ed8',
  success: '#10b981',
  // ...
}

// AFTER
accent: {
  primary: '#3B8BF5',  // hsl(213, 90%, 60%)
  primaryHover: '#2563eb',
  primaryActive: '#1d4ed8',
}
status: {
  success: '#22C55E',  // hsl(142, 70%, 45%)
  warning: '#F59E0B',  // hsl(38, 90%, 50%)
  error: '#EF4444',    // hsl(0, 83%, 60%)
  record: '#EF4444',
  recordDim: '#8B2020',
}
```

```typescript
// BEFORE (lines 52-62) - Missing spacing scale
spacing: {
  trackHeight: 64,
  trackHeightCompact: 48,
  // ...
}

// AFTER - Add complete spacing scale
spacing: {
  0: '0px',
  px: '1px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  // Application-specific constants
  transportHeight: '52px',  // NOT 56px
  statusBarHeight: '22px',
  trackHeaderWidth: '216px',  // NOT 240px
  trackHeightCompact: '32px',  // NOT 48px
  trackHeightStandard: '48px',  // NOT 64px
  trackHeightTall: '80px',
  mixerChannelCompact: '56px',
  mixerChannel: '72px',
}
```

```typescript
// BEFORE (lines 63-87) - Wrong font families and scale
typography: {
  fontFamily: {
    sans: 'Inter, system-ui, -apple-system, sans-serif',
    mono: 'JetBrains Mono, Consolas, monospace',
  },
  fontSize: {
    xs: '0.75rem',    // 12px - WRONG
    sm: '0.875rem',   // 14px - WRONG
    // ...
  }
}

// AFTER
typography: {
  fontFamily: {
    sans: '"Inter Variable", system-ui, -apple-system, sans-serif',
    mono: '"Geist Mono", "JetBrains Mono", ui-monospace, monospace',
  },
  fontSize: {
    '2xs': '9px',   // NEW
    xs: '10px',     // FIXED
    sm: '11px',     // FIXED
    base: '12px',   // FIXED
    md: '13px',     // NEW
    lg: '14px',     // FIXED
    xl: '16px',     // FIXED
    '2xl': '20px',  // FIXED
    '3xl': '28px',  // NEW
  },
  lineHeight: {
    tight: 1.2,     // NOT 1.25
    snug: 1.35,     // NEW
    normal: 1.5,
    relaxed: 1.65,  // NOT 1.75
  },
  letterSpacing: {
    tight: '-0.01em',
    normal: '0em',
    wide: '0.04em',
    wider: '0.08em',
    widest: '0.12em',
  },
}
```

```typescript
// BEFORE (lines 88-94) - Wrong border radius
borderRadius: {
  sm: '0.25rem',   // 4px
  md: '0.375rem',  // 6px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px - WRONG
  full: '9999px',
}

// AFTER
borderRadius: {
  standard: '4px',
  large: '6px',
  xl: '8px',      // NOT 12px
  pill: '99px',
}
```

```typescript
// BEFORE (lines 101-105) - Wrong durations
transitions: {
  fast: '100ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
}

// AFTER
motion: {
  duration: {
    instant: '0ms',
    micro: '60ms',    // NOT 100ms
    fast: '90ms',     // NOT 100ms
    standard: '120ms', // NOT 200ms
    moderate: '180ms',
    slow: '240ms',    // NOT 300ms
    crawl: '400ms',
  },
  easing: {
    out: 'cubic-bezier(0.16, 1, 0.3, 1)',
    in: 'cubic-bezier(0.7, 0, 0.84, 0)',
    inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.12, 0.64, 1)',
  },
}
```

**Estimated Time:** 4-6 hours

---

### 1.2 Update [`index.css`](src/index.css:1)

**Current Issues:**
- No CSS custom properties defined
- Hardcoded colors in root
- Missing design token variables

**Required Changes:**

```css
/* AFTER line 6 - Add complete CSS custom properties */
:root {
  /* Surfaces */
  --surface-void: hsl(240, 10%, 6%);
  --surface-level-1: hsl(240, 9%, 8%);
  --surface-level-2: hsl(240, 10%, 11%);
  --surface-level-3: hsl(240, 10%, 14%);
  --surface-level-4: hsl(240, 10%, 17%);
  --surface-level-5: hsl(240, 9%, 20%);
  
  /* Text */
  --text-primary: rgba(255, 255, 255, 0.92);
  --text-secondary: rgba(255, 255, 255, 0.58);
  --text-tertiary: rgba(255, 255, 255, 0.35);
  --text-ghost: rgba(255, 255, 255, 0.18);
  
  /* Borders */
  --border-default: rgba(255, 255, 255, 0.07);
  --border-hover: rgba(255, 255, 255, 0.12);
  --border-strong: rgba(255, 255, 255, 0.15);
  
  /* Accent */
  --accent-primary: #3B8BF5;
  
  /* Status */
  --status-success: #22C55E;
  --status-warning: #F59E0B;
  --status-error: #EF4444;
  --status-record: #EF4444;
  --status-record-dim: #8B2020;
  
  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  
  /* Layout */
  --height-transport: 52px;
  --height-status-bar: 22px;
  --height-track-compact: 32px;
  --height-track-standard: 48px;
  --width-track-header: 216px;
  
  /* Motion */
  --duration-micro: 60ms;
  --duration-fast: 90ms;
  --duration-standard: 120ms;
  --duration-moderate: 180ms;
  --duration-slow: 240ms;
  
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Typography */
  --font-sans: "Inter Variable", system-ui, sans-serif;
  --font-mono: "Geist Mono", "JetBrains Mono", monospace;
  
  /* Font sizes */
  --type-2xs: 9px;
  --type-xs: 10px;
  --type-sm: 11px;
  --type-base: 12px;
  --type-md: 13px;
  --type-lg: 14px;
  --type-xl: 16px;
  --type-2xl: 20px;
  --type-3xl: 28px;
  
  /* Line heights */
  --leading-tight: 1.2;
  --leading-snug: 1.35;
  --leading-normal: 1.5;
  --leading-relaxed: 1.65;
}
```

```css
/* REPLACE lines 7-20 */
:root {
  font-family: var(--font-sans);
  line-height: var(--leading-normal);
  font-weight: 400;

  color-scheme: dark;
  color: var(--text-primary);
  background-color: var(--surface-void);

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
}
```

```css
/* UPDATE scrollbar colors (lines 47-58) */
::-webkit-scrollbar-track {
  background: var(--surface-level-2);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.25);
}
```

**Estimated Time:** 2-3 hours

---

### 1.3 Update [`tailwind.config.js`](tailwind.config.js:1)

**Current Issues:**
- Colors don't match design system
- Missing design tokens
- No spacing scale
- Wrong font configuration

**Required Changes:**

```javascript
// REPLACE entire extend section (lines 8-35)
extend: {
  colors: {
    // Surface levels
    surface: {
      void: 'hsl(240, 10%, 6%)',
      1: 'hsl(240, 9%, 8%)',
      2: 'hsl(240, 10%, 11%)',
      3: 'hsl(240, 10%, 14%)',
      4: 'hsl(240, 10%, 17%)',
      5: 'hsl(240, 9%, 20%)',
    },
    // Text with opacity
    text: {
      primary: 'rgba(255, 255, 255, 0.92)',
      secondary: 'rgba(255, 255, 255, 0.58)',
      tertiary: 'rgba(255, 255, 255, 0.35)',
      ghost: 'rgba(255, 255, 255, 0.18)',
    },
    // Borders
    border: {
      DEFAULT: 'rgba(255, 255, 255, 0.07)',
      hover: 'rgba(255, 255, 255, 0.12)',
      strong: 'rgba(255, 255, 255, 0.15)',
    },
    // Accent
    accent: {
      DEFAULT: '#3B8BF5',
      hover: '#2563eb',
      active: '#1d4ed8',
    },
    // Status
    status: {
      success: '#22C55E',
      warning: '#F59E0B',
      error: '#EF4444',
      record: '#EF4444',
      'record-dim': '#8B2020',
    },
  },
  fontFamily: {
    sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
    mono: ['"Geist Mono"', '"JetBrains Mono"', 'monospace'],
  },
  fontSize: {
    '2xs': '9px',
    xs: '10px',
    sm: '11px',
    base: '12px',
    md: '13px',
    lg: '14px',
    xl: '16px',
    '2xl': '20px',
    '3xl': '28px',
  },
  lineHeight: {
    tight: '1.2',
    snug: '1.35',
    normal: '1.5',
    relaxed: '1.65',
  },
  spacing: {
    0: '0px',
    px: '1px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
  },
  borderRadius: {
    standard: '4px',
    large: '6px',
    xl: '8px',
    pill: '99px',
  },
  transitionDuration: {
    micro: '60ms',
    fast: '90ms',
    standard: '120ms',
    moderate: '180ms',
    slow: '240ms',
    crawl: '400ms',
  },
  transitionTimingFunction: {
    'ease-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
    'ease-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
    'ease-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
    'ease-standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'ease-spring': 'cubic-bezier(0.34, 1.12, 0.64, 1)',
  },
}
```

**Estimated Time:** 2-3 hours

---

## Phase 2: Component Refactoring (Week 2-3)

**Priority:** HIGH - Core UI building blocks

### 2.1 Update [`Button.tsx`](src/components/UI/Button.tsx:1)

**Issues:**
- Button heights vary, should be 32px standard
- Hardcoded colors
- Missing proper states

**Changes:**
- Replace all color references with design tokens
- Standardize height to 32px (6px vertical padding + 12px horizontal)
- Use proper opacity-based text colors
- Fix hover/active states with correct durations (60ms micro)

**Example:**
```tsx
// BEFORE
className="px-3 py-2 bg-primary-600 hover:bg-primary-700"

// AFTER
className="h-8 px-3 bg-accent hover:bg-accent-hover transition-colors duration-micro"
```

**Estimated Time:** 3-4 hours

---

### 2.2 Update [`Fader.tsx`](src/components/UI/Fader.tsx:1)

**Issues:**
- Uses wrong color classes (`bg-dark-surface`, `text-dark-muted`)
- Wrong transition duration
- Hardcoded dimensions

**Changes:**
- Replace `bg-dark-surface` with `bg-surface-2`
- Replace `text-dark-muted` with `text-tertiary`
- Change `duration-100` to `duration-micro` (60ms)
- Use design token spacing

**Estimated Time:** 2-3 hours

---

### 2.3 Update [`Knob.tsx`](src/components/UI/Knob.tsx:1)

**Issues:**
- Same color system issues as Fader
- Wrong border colors
- Hardcoded sizes

**Changes:**
- Update all color references to design tokens
- Fix border colors to use `border-DEFAULT`
- Standardize sizing with spacing scale

**Estimated Time:** 2-3 hours

---

### 2.4 Update [`Meter.tsx`](src/components/UI/Meter.tsx:1)

**Issues:**
- Wrong meter colors (using `primary-600` instead of status colors)
- Wrong transition duration (`duration-50` should be `duration-micro`)
- Hardcoded background colors

**Changes:**
```tsx
// BEFORE (line 74)
className="rounded-sm transition-all duration-50"

// AFTER
className="rounded-sm transition-all duration-micro"

// Update meter colors to use status colors
// Safe: status-success (#22C55E)
// Caution: status-warning (#F59E0B)
// Danger: status-error (#EF4444)
```

**Estimated Time:** 2-3 hours

---

## Phase 3: Layout Components (Week 3-4)

**Priority:** MEDIUM - Visual consistency

### 3.1 Update [`TransportBar.tsx`](src/components/Transport/TransportBar.tsx:1)

**Issues:**
- Height should be 52px (currently using py-3 which is variable)
- Wrong background color
- Wrong border color
- Text colors not using opacity system
- Button sizes inconsistent

**Changes:**
```tsx
// BEFORE (line 80)
className="flex items-center justify-between px-6 py-3 bg-dark-surface border-b border-dark-border"

// AFTER
className="flex items-center justify-between h-[52px] px-4 bg-surface-2 border-b border-DEFAULT"

// Update all text colors
// "text-dark-muted" → "text-secondary"
// "text-dark-text" → "text-primary"
// "bg-dark-bg" → "bg-surface-1"
```

**Estimated Time:** 4-5 hours

---

### 3.2 Update [`TrackList.tsx`](src/components/TrackList/TrackList.tsx:1)

**Issues:**
- Track header width should be 216px (currently 240px from theme)
- Wrong surface colors
- Border colors incorrect

**Changes:**
```tsx
// BEFORE (line 34)
style={{ width: `${theme.spacing.trackHeaderWidth}px` }}

// AFTER - Use corrected value
style={{ width: '216px' }}

// Update all color classes
// "bg-dark-surface" → "bg-surface-2"
// "bg-dark-bg" → "bg-surface-1"
// "border-dark-border" → "border-DEFAULT"
// "text-dark-text" → "text-primary"
// "text-dark-muted" → "text-secondary"
```

**Estimated Time:** 3-4 hours

---

### 3.3 Update [`TrackControls.tsx`](src/components/TrackList/TrackControls.tsx:1)

**Issues:**
- Track heights wrong (compact 48px vs 32px, standard 64px vs 48px)
- Button styling inconsistent
- Color system mismatches

**Changes:**
- Update height calculations to use correct values
- Standardize button heights to 32px
- Fix all color references

**Estimated Time:** 4-5 hours

---

### 3.4 Update [`Timeline.tsx`](src/components/Timeline/Timeline.tsx:1) & [`TimelineRuler.tsx`](src/components/Timeline/TimelineRuler.tsx:1)

**Issues:**
- Background colors wrong
- Border colors incorrect
- Playhead styling needs update

**Changes:**
- Update all surface and border colors
- Fix playhead color to use accent
- Update hover states

**Estimated Time:** 3-4 hours

---

### 3.5 Update [`ArrangementView.tsx`](src/components/ArrangementView/ArrangementView.tsx:1), [`TrackLane.tsx`](src/components/ArrangementView/TrackLane.tsx:1), [`AudioClip.tsx`](src/components/ArrangementView/AudioClip.tsx:1)

**Issues:**
- Grid background colors wrong
- Track lane colors incorrect
- Clip styling needs updates

**Changes:**
- Update all color references
- Fix grid opacity
- Update clip borders and backgrounds

**Estimated Time:** 5-6 hours

---

## Phase 4: Animation System (Week 4)

**Priority:** MEDIUM - Motion consistency

### 4.1 Update [`animations.css`](src/styles/animations.css:1)

**Issues:**
- All durations wrong (100ms vs 60ms, 200ms vs 120ms, 300ms vs 240ms)
- Missing ease-out easing variant
- Animation classes use incorrect timings

**Changes:**

```css
/* BEFORE (lines 148-149) */
.fade-in {
  animation: fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* AFTER */
.fade-in {
  animation: fadeIn 120ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* BEFORE (lines 156-157) */
.slide-in-left {
  animation: slideInFromLeft 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* AFTER */
.slide-in-left {
  animation: slideInFromLeft 240ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* BEFORE (lines 180-181) */
.button-press {
  animation: buttonPress 100ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* AFTER */
.button-press {
  animation: buttonPress 60ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* BEFORE (lines 188-189) */
.meter-pulse {
  animation: meterPulse 100ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* AFTER */
.meter-pulse {
  animation: meterPulse 60ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* BEFORE (lines 203-213) */
.transition-fast {
  transition: all 100ms cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-normal {
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-slow {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* AFTER */
.transition-micro {
  transition: all 60ms cubic-bezier(0.16, 1, 0.3, 1);
}

.transition-fast {
  transition: all 90ms cubic-bezier(0.16, 1, 0.3, 1);
}

.transition-standard {
  transition: all 120ms cubic-bezier(0.16, 1, 0.3, 1);
}

.transition-slow {
  transition: all 240ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

**Estimated Time:** 3-4 hours

---

## Phase 5: Verification & Testing (Week 5)

**Priority:** HIGH - Quality assurance

### 5.1 Visual Regression Testing

**Approach:**
1. Take screenshots of all major views before changes
2. Take screenshots after each phase
3. Compare side-by-side for:
   - Color accuracy
   - Spacing consistency
   - Typography correctness
   - Animation smoothness

**Tools:**
- Manual visual inspection
- Browser DevTools color picker
- Measure tool for spacing verification

**Estimated Time:** 8-10 hours

---

### 5.2 Accessibility Compliance

**Checks:**
1. Verify all text meets WCAG 2.1 AA contrast ratios:
   - Primary text: 5.5:1+ (target met with rgba(255,255,255,0.92))
   - Secondary text: 4.5:1+ (verify rgba(255,255,255,0.58))
   - Tertiary text: 3:1+ (verify rgba(255,255,255,0.35))

2. Test keyboard navigation:
   - All interactive elements focusable
   - Focus indicators visible (1.5px accent outline)
   - Tab order logical

3. Screen reader testing:
   - All buttons have proper labels
   - Status changes announced
   - Error messages accessible

**Tools:**
- Chrome DevTools Lighthouse
- axe DevTools
- Manual keyboard testing
- NVDA/JAWS screen reader testing

**Estimated Time:** 6-8 hours

---

### 5.3 Performance Validation

**Metrics:**
1. Animation frame rate: Maintain 60fps
2. Paint times: < 16ms per frame
3. Layout shifts: Minimize CLS
4. Memory usage: No leaks from transitions

**Tools:**
- Chrome DevTools Performance tab
- React DevTools Profiler
- Manual testing on lower-end hardware

**Estimated Time:** 4-6 hours

---

### 5.4 Cross-Browser Testing

**Browsers:**
- Chrome/Edge (Chromium)
- Firefox
- Safari (if available)

**Test:**
- Color rendering accuracy
- Font rendering
- Animation smoothness
- Layout consistency

**Estimated Time:** 4-6 hours

---

## Phase 6: Documentation (Week 5-6)

**Priority:** MEDIUM - Knowledge transfer

### 6.1 Update Component Documentation

**Create/Update:**
1. `DESIGN_TOKENS.md` - Complete reference of all design tokens
2. `COMPONENT_GUIDE.md` - Usage guidelines for each component
3. Update inline code comments with design rationale

**Estimated Time:** 6-8 hours

---

### 6.2 Create Migration Guide

**Document:**
1. Breaking changes from old to new system
2. Search/replace patterns for common updates
3. Before/after examples
4. Common pitfalls and solutions

**Estimated Time:** 4-6 hours

---

### 6.3 Update CHANGELOG.md

**Document:**
- All design system changes
- Breaking changes
- Migration notes
- Version bump rationale

**Estimated Time:** 2-3 hours

---

## Implementation Strategy

### Timeline Summary

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1: Foundation | Week 1 (20-24h) | None |
| Phase 2: Components | Week 2-3 (20-24h) | Phase 1 complete |
| Phase 3: Layout | Week 3-4 (20-24h) | Phase 1, 2 complete |
| Phase 4: Animation | Week 4 (3-4h) | Phase 1 complete |
| Phase 5: Testing | Week 5 (22-30h) | Phase 1-4 complete |
| Phase 6: Docs | Week 5-6 (12-17h) | Phase 1-5 complete |
| **Total** | **5-6 weeks** | **97-123 hours** |

---

### Risk Assessment

#### HIGH RISK
1. **Breaking Changes to Components**
   - **Risk:** Existing component usage may break
   - **Mitigation:** Create comprehensive test suite before changes
   - **Rollback:** Git branches for each phase

2. **Performance Regression**
   - **Risk:** New animations may cause jank
   - **Mitigation:** Profile before/after each change
   - **Rollback:** Keep old animation classes as fallback

#### MEDIUM RISK
3. **Color Contrast Issues**
   - **Risk:** New opacity values may fail WCAG
   - **Mitigation:** Test each color combination
   - **Rollback:** Adjust opacity values incrementally

4. **Font Loading**
   - **Risk:** Inter Variable/Geist Mono may not load
   - **Mitigation:** Ensure proper fallbacks configured
   - **Rollback:** Keep existing font stack as fallback

#### LOW RISK
5. **Spacing Inconsistencies**
   - **Risk:** New spacing scale may create gaps
   - **Mitigation:** Visual regression testing
   - **Rollback:** Easy to adjust spacing values

---

### Rollback Strategy

**Per-Phase Rollback:**
1. Each phase in separate Git branch
2. Merge to main only after testing
3. Tag each phase completion
4. Can revert individual phases if needed

**Emergency Rollback:**
1. Keep `theme.ts.backup` with old values
2. Feature flag for new design system
3. Can toggle between old/new in development

**Rollback Triggers:**
- Critical accessibility failure
- Performance regression > 20%
- Major visual bugs in production
- User feedback indicating confusion

---

### Testing Checkpoints

**After Phase 1:**
- [ ] All design tokens accessible in components
- [ ] CSS custom properties working
- [ ] Tailwind classes generating correctly
- [ ] No console errors

**After Phase 2:**
- [ ] All UI components render correctly
- [ ] Button heights standardized to 32px
- [ ] Color system consistent across components
- [ ] Hover/active states working

**After Phase 3:**
- [ ] Transport bar exactly 52px height
- [ ] Track header exactly 216px width
- [ ] Track heights correct (32px/48px/80px)
- [ ] All layout components using design tokens

**After Phase 4:**
- [ ] All animations use correct durations
- [ ] Smooth 60fps performance
- [ ] Easing curves feel natural
- [ ] No animation jank

**After Phase 5:**
- [ ] All WCAG AA requirements met
- [ ] Keyboard navigation working
- [ ] Performance metrics acceptable
- [ ] Cross-browser compatibility verified

**After Phase 6:**
- [ ] Documentation complete and accurate
- [ ] Migration guide tested
- [ ] CHANGELOG updated
- [ ] Team trained on new system

---

## File-by-File Breakdown

### Critical Files (Must Update)

1. **[`src/styles/theme.ts`](src/styles/theme.ts:1)** - 122 lines
   - Lines 8-13: Surface colors
   - Lines 14-20: Text colors
   - Lines 21-31: Accent/status colors
   - Lines 52-62: Spacing system
   - Lines 63-87: Typography
   - Lines 88-94: Border radius
   - Lines 101-105: Motion/transitions

2. **[`src/index.css`](src/index.css:1)** - 60 lines
   - Lines 7-20: Root styles
   - Lines 42-58: Scrollbar styles
   - Add: CSS custom properties (after line 6)

3. **[`tailwind.config.js`](tailwind.config.js:1)** - 41 lines
   - Lines 8-35: Extend configuration
   - Complete rewrite of color/spacing/typography

4. **[`src/styles/animations.css`](src/styles/animations.css:1)** - 221 lines
   - Lines 148-213: Utility classes
   - Update all durations and easing

### High Priority Components

5. **[`src/components/UI/Button.tsx`](src/components/UI/Button.tsx:1)**
   - Update all className references
   - Standardize heights
   - Fix color system

6. **[`src/components/UI/Fader.tsx`](src/components/UI/Fader.tsx:1)**
   - Lines 76-122: All styling
   - Replace color classes
   - Fix transitions

7. **[`src/components/UI/Knob.tsx`](src/components/UI/Knob.tsx:1)**
   - Lines 96-158: All styling
   - Update colors and borders

8. **[`src/components/UI/Meter.tsx`](src/components/UI/Meter.tsx:1)**
   - Lines 61-99: Meter rendering
   - Fix colors and transitions

9. **[`src/components/Transport/TransportBar.tsx`](src/components/Transport/TransportBar.tsx:1)**
   - Line 80: Container height/colors
   - Lines 82-204: All child elements
   - Comprehensive color update

10. **[`src/components/TrackList/TrackList.tsx`](src/components/TrackList/TrackList.tsx:1)**
    - Line 34: Width correction
    - Lines 32-92: All styling

11. **[`src/components/TrackList/TrackControls.tsx`](src/components/TrackList/TrackControls.tsx:1)**
    - Lines 87-203: Complete component
    - Height calculations
    - Color system

### Medium Priority Components

12. **[`src/components/Timeline/Timeline.tsx`](src/components/Timeline/Timeline.tsx:1)**
13. **[`src/components/Timeline/TimelineRuler.tsx`](src/components/Timeline/TimelineRuler.tsx:1)**
14. **[`src/components/ArrangementView/ArrangementView.tsx`](src/components/ArrangementView/ArrangementView.tsx:1)**
15. **[`src/components/ArrangementView/TrackLane.tsx`](src/components/ArrangementView/TrackLane.tsx:1)**
16. **[`src/components/ArrangementView/AudioClip.tsx`](src/components/ArrangementView/AudioClip.tsx:1)**

---

## Success Criteria

### Phase 1 Success
- [ ] All design tokens match specification exactly
- [ ] CSS custom properties accessible throughout app
- [ ] Tailwind generating correct utility classes
- [ ] No TypeScript errors
- [ ] Theme object exports correctly

### Phase 2 Success
- [ ] All UI components use design tokens exclusively
- [ ] No hardcoded colors remain
- [ ] Button heights standardized to 32px
- [ ] Transitions use correct durations (60ms/90ms/120ms)
- [ ] Components render without visual breaks

### Phase 3 Success
- [ ] Transport bar exactly 52px height
- [ ] Track header exactly 216px width
- [ ] Track heights correct (32px compact, 48px standard, 80px tall)
- [ ] All layout components visually consistent
- [ ] No spacing inconsistencies

### Phase 4 Success
- [ ] All animations use correct durations from spec
- [ ] Easing curves match design system
- [ ] 60fps maintained during all animations
- [ ] No animation jank or stuttering

### Phase 5 Success
- [ ] All WCAG 2.1 AA requirements met
- [ ] Keyboard navigation fully functional
- [ ] Performance metrics within acceptable range
- [ ] Cross-browser compatibility verified
- [ ] No visual regressions

### Phase 6 Success
- [ ] Complete documentation of design system
- [ ] Migration guide tested and accurate
- [ ] CHANGELOG comprehensive
- [ ] Team trained and confident with new system

---

## Next Steps

1. **Review this plan** with the development team
2. **Get approval** from stakeholders
3. **Create feature branch** for Phase 1
4. **Begin implementation** starting with [`theme.ts`](src/styles/theme.ts:1)
5. **Test incrementally** after each file change
6. **Document learnings** as you progress

---

## Notes

- This is a **planning document only** - no code changes have been made
- All line numbers reference current file state
- Estimated times are for experienced developer
- Testing time may vary based on thoroughness required
- Consider pair programming for critical components
- Use feature flags if deploying incrementally

**Ready to switch to Code mode for implementation when approved.**
</result>
</attempt_completion>

