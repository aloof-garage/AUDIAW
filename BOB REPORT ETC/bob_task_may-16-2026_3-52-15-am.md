**User:**

<task>
Analyze the AUDIAW-DESIGN.md file (4602 lines) and extract comprehensive design system specifications. This is a large file, so use the large file strategy:

1. Read the file in strategic sections to understand:
   - Visual style and design philosophy
   - Color system (all color tokens, palettes, semantic colors)
   - Typography system (font families, sizes, weights, line heights, hierarchy)
   - Spacing system (scale, padding, margins, gaps)
   - Layout systems (grid, flex patterns, container widths)
   - Component styling specifications
   - Interaction patterns and states (hover, active, focus, disabled)
   - Motion/animation guidelines (durations, easings, transitions)
   - Responsiveness rules (breakpoints, adaptive behaviors)
   - UI hierarchy principles

2. Create a structured summary document that organizes all design specifications into clear categories. Include specific values, tokens, and implementation guidelines.

3. Pay special attention to:
   - Exact color values and their semantic meanings
   - Typography scale and usage rules
   - Spacing tokens and their applications
   - Component-specific styling rules
   - Animation/transition specifications

4. Format the output as a comprehensive design system reference that can be used for implementation.

IMPORTANT: You must ONLY analyze and document the design specifications from AUDIAW-DESIGN.md. Do not make any code changes or suggest implementations. Your task is purely analytical - extract and organize the design information.

When complete, use attempt_completion with a thorough summary of the design system specifications organized by category (colors, typography, spacing, components, etc.).
</task>
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs
package.json,pnpm-workspace.yaml,.gitignore,src-tauri/Cargo.toml,src-tauri/build.rs,index.html,vite.config.ts,app-icon.png.svg,src-tauri/tauri.conf.json,src/index.css,DOCS/V0.5_TECHNICAL_SPECIFICATION.md,crates/audiaw-project/Cargo.toml,tsconfig.json,tsconfig.node.json,tailwind.config.js,postcss.config.js,SETUP.md,VERIFICATION.md,src/styles/theme.ts,src/styles/animations.css

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T22:18:40.034Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.00

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>


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
crates/audiaw-effects/src/reverb.rs
crates/audiaw-history/Cargo.toml
crates/audiaw-history/src/lib.rs
crates/audiaw-project/Cargo.toml
crates/audiaw-project/src/lib.rs
crates/audiaw-types/Cargo.toml
crates/audiaw-types/src/lib.rs
DOCS/
DOCS/DEMO.md
DOCS/DEVELOPMENT.md
DOCS/FEATURES.md
DOCS/HACKATHON.md
DOCS/ROADMAP.md
IBM BOB/
IBM BOB/BOB.md
IBM BOB/EXAMPLES.md
src/
src/vite-env.d.ts
src/stores/projectStore.ts
src/stores/transportStore.ts
src/stores/uiStore.ts
src/styles/animations.css
src/styles/theme.ts
src-tauri/
src-tauri/tauri.conf.json
src-tauri/icons/32x32.png
src-tauri/icons/64x64.png
src-tauri/icons/128x128.png
src-tauri/icons/128x128@2x.png
src-tauri/icons/icon.icns
src-tauri/icons/icon.ico
src-tauri/icons/icon.png
src-tauri/icons/Square30x30Logo.png
src-tauri/icons/Square44x44Logo.png
src-tauri/icons/Square71x71Logo.png
src-tauri/icons/Square89x89Logo.png
src-tauri/icons/Square107x107Logo.png
src-tauri/icons/Square142x142Logo.png
src-tauri/icons/Square150x150Logo.png
src-tauri/icons/Square284x284Logo.png
src-tauri/icons/Square310x310Logo.png
src-tauri/icons/StoreLogo.png
src-tauri/src/main.rs
target/.rustc_info.json
target/CACHEDIR.TAG
target/debug/.cargo-lock
target/debug/audiaw.d
target/debug/libaudiaw_effects.d
target/debug/libaudiaw_effects.rlib
target/debug/libaudiaw_engine.d
target/debug/libaudiaw_engine.rlib
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4.lock
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik442l76e-1shjeqq.lock
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/0iycm00nasj0vb40smxpmbryk.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/0nxojyyyh8i9otp67wjd4nctg.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/0qqep08ss6or8sa49d6neu8a4.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/0tha2szehlux3ayyqc8hvenkg.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/1egbdbje6h75l90pjzq6xjxo3.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/1j8s3w9webliuw2g30kosff7d.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/1jwugw7qdmskk85l1c0rcqijj.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/1p9g3h07ufisir0zldrpqlb5j.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/1p9r7nnf9tf28hfw5jnpvghw4.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/2bkptpjw9b8gs4yhfiy755at3.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/2fiokn2w5kqf8clc30tlf46nd.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/2q7vpmvmmscpvx0n724x2qwci.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/2zjfznzgvg90q917hlhoky9hj.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/3afi9gvp9190hft29l3tg01dc.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/3ea86w3znoi7u5a8xs7gbl9ob.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/3ogtb0v5gec9g2imk9dvgs4z8.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/3z7q8z0drbkuzl4wigejqz05c.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/3zcnwt5e0pu8vp68vhzf0cqih.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/4hbhqykwpww6n5coddawzvgyx.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/4if0nq7990svmwp8fkh3lgxhz.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/4jlaul60cj1d2du7ndus66bm0.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/4kwwvlov19ihgqgr6c9ngk1rz.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/4ngbijyumi92c9l50bek572l8.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/4w9n4byiyrj4f7ncl4xni4zqa.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/5cnokibtemmruw6vhx30nz88u.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/5hkgmq195xmvt4ga48lkty9e4.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/5kbnh5fg26g18k3exrzm1mvy2.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/5kr49l8z1ooo6c0tpsd8rnssk.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/5nmfgsszw8f9i4qh7ib2i7w5b.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/5rt6zuw317cobtvc8tx5lv610.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/5tgd9lzuqghlb4uqzxdqrjgjx.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/5tisgl0djz8gbsngos46k7cal.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/5y8r8s10c3bmr99wlt30jrlgb.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/6a7ftxa5ie4wixwyit6e0hbm9.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/6l35nqqn0hbcf5thnwi7h5ciu.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/6lqz1kklwnht5bwcpmvm0sxje.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/6tn1h2r0n6vjgi8mzih8gf4fm.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/7cumezcu7gd8owxm1f4eibkyd.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/7gp3qtxyarmmhggj5qarhh57q.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/7hybenznjqdxpsugpwl993nsu.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/7ih56p3xxinft7qu9zrygpy2t.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/7mv4esnw5nte3e8dddv2bt98o.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/7nhezr80gadi1ar5vis5r75rl.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/7tljcm00mkasrr6205ygw76fe.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/7tylyho9lg9qf6bgkwthjsfh5.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/7vvkngeatpuiwh919vr6xl0ln.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/7x204l30rofasx1k3aee0a6fv.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/7zqpi2sryk2w1swe8kqwik3jh.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/8ceukvdd6x8bzc4ko2xovux9h.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/8f4y0yms1xeid4zh8ansz935q.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/8hixqfk41yatebi57s4wi0nh0.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/8qy7jk9l5uwur31tdn79ofuu0.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/8rikz6nvxzhbl5li6ljw125yh.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/9crc62xjtnarp0idug2xc6x49.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/9ml474f58tobylm4i2a7dpjrs.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/9nmdpp9tpyoaeoe5qe60g9mtz.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/9qyup5nxbxgt0pjzuvsxkohl0.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/9xtcpg5pt2ltn44qlef140fwy.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/9yl6sl6hdofkygx5jfh03sx26.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/12yxef14ly7x32frwv0jol8jf.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/19l2mzd30zeh23heqdzv8tv91.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/30llozn7bqefsfbml941g24xh.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/36gww641w0ftf1t20kaapl5th.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/51qcx3c8ct5ecbwyu61koqc94.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/57bien7rkfowap09rstzzt9i3.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/59njyfxgfhsbcvt35v603gqib.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/78jf36b1ntqxb7jwcdynu38k6.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/86ozbkamv4vexov7om73uloa7.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/90i46nyonrkq4u7rzxu5g990k.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/433lncrlc51770w8vq87sckh3.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/602l3bjsq75l5jwzx28gzrmqg.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/935jhbgbzwpaslddoyhv4g9ih.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/2623i8flinazzec080oowo9el.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/22469ojbkfbek3qqx7ghgpecq.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/a1ekmyclwgum8ulx0d3rv1d6u.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/a4lt4ucm084110xorj9m4gasr.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/abxhp8b610bcwrsmiu18oexdq.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/abz7unzby0mnch1p165wrwpwm.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/acpia43icy0kf7uh4v2mxrztn.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/ad52f6mu510hcr9qqtphfjjds.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/aq70ehpa84qzzod87vsi2ii9v.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/b0jhdgna0yxuemd176ea63h7s.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/b4fu9l92qlej3wdevjegnhtz4.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/b9x2ser3rytnkj2npsr2k7eip.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/b9z5nmmcbnsp3wlsw105a021u.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/b52akxtldyc1fbcgclu66ydha.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/bfgm1nv1klo4c6004yrwfjejc.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/bm6aeazh9f0j3w472pssb4i1s.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/bmf45owr65wwhw09hozgd6kut.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/bmfoltncoovihza07n1ucz1iv.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/c6ma4jwwsl65zcmb39mx2o7r9.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/c0942bzy4baah2asexab6y6ri.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/c43812c6fs4c016z07pjnaejg.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/ca3bxec32bi9arpov24oyan8b.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/ccdrc2yq3kwpqst1pffu4u4xb.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/cdmg3u2oshismd6bv1pjpwyxv.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/ch9dn459526zjl2cdawfcdvzr.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/d5vu9lofl7dsacfc6k91wqowe.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/dban1fd6b4xx1qij0f7qjzeat.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/de9xcfqmc85ratgrrjful8r00.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/dep-graph.bin
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/drerbqkr6m05xd2bym6nwovk5.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/dv5wkcbxsnd9f6s7qvwk7wcmg.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/dyn2f0cf2wntm8bzadha17q1p.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/eydy0km500o4ie32ar8freh6u.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/ez41fmn10a072pbqnraa1bzd6.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/metadata.rmeta
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/query-cache.bin
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik3qjgk1i-1lbppf4-5rtj2pww6v166op1sfdi6aj4b/work-products.bin
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik442l76e-1shjeqq-dcu4yx12jv8u2zb7e6njshknf/0iycm00nasj0vb40smxpmbryk.o
target/debug/incremental/audiaw_engine-0mtb4f9jtfczv/s-hik442l76e-1shjeqq-dcu4yx12jv8u2zb7e6njshknf/0nxojyyyh8i9otp67wjd4nctg.o
target/debug/incremental/audiaw_engine-0uuku85w2f5ry/s-hik7a28cz2-10vshnn.lock
target/release/.cargo-lock
target/release/audiaw.d
target/release/audiaw.exe
target/release/audiaw.pdb
target/release/build/typeid-900e6bb7c119c803/output
target/release/build/typeid-900e6bb7c119c803/root-output
target/release/build/typeid-900e6bb7c119c803/stderr
target/release/build/windows_x86_64_msvc-de806d65cafd5786/invoked.timestamp
target/release/build/windows_x86_64_msvc-de806d65cafd5786/output
target/release/build/windows_x86_64_msvc-de806d65cafd5786/root-output
target/release/build/windows_x86_64_msvc-de806d65cafd5786/stderr
target/release/build/zmij-e5708303283a7629/invoked.timestamp
target/release/build/zmij-e5708303283a7629/output
target/release/build/zmij-e5708303283a7629/root-output
target/release/build/zmij-e5708303283a7629/stderr

(File list truncated. Use list_files on specific subdirectories if you need to explore further.)
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

I'll analyze the AUDIAW-DESIGN.md file systematically to extract comprehensive design system specifications. Let me start by reading the file in strategic sections.

<read_file>
<args>
  <file>
    <path>DOCS/AUDIAW-DESIGN.md</path>
    <line_range>1-500</line_range>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 'DOCS/AUDIAW-DESIGN.md'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>DOCS/AUDIAW-DESIGN.md</path>
<content lines="1-500">
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
101 | The visual and interaction design of AUDIAW is informed by a specific lineage of hardware and software that shares this conviction: studio equipment that communicates through precise labeling and physical feedback, not decoration; tools like Teenage Engineering's OP-series that make limitation feel intentional; operating systems like Nothing OS that treat whitespace and monochrome restraint as statements of confidence.
102 | 
103 | AUDIAW is not trying to look futuristic. It is not trying to look aggressive or technical. It is trying to look **engineered** — as though every surface was placed by someone who thought carefully about why it exists there, and removed everything that didn't earn its place.
104 | 
105 | **The visual promise of AUDIAW:** When a user opens the application for the first time, they should feel the same quiet confidence they feel holding a well-made piece of hardware. Nothing shouts. Everything is where it should be. The work can begin immediately.
106 | 
107 | **The interaction promise of AUDIAW:** Every interaction should feel like turning a well-machined knob. There is resistance, there is feedback, there is precision. Nothing slips. Nothing jitters. Nothing feels accidental.
108 | 
109 | **The emotional promise of AUDIAW:** Using AUDIAW should induce a state of focused creative flow, not cognitive overhead. The interface achieves this by keeping visual noise to an absolute minimum, prioritizing spatial memory over discoverability, and making the most common actions available without conscious navigation.
110 | 
111 | ---
112 | 
113 | # 2. PRODUCT IDENTITY
114 | 
115 | ## 2.1 Identity Statement
116 | 
117 | AUDIAW presents itself as **a precision instrument for music production**. Its visual identity communicates:
118 | 
119 | - Engineering rigor
120 | - Creative restraint
121 | - Professional seriousness
122 | - Quiet confidence
123 | - Material honesty
124 | 
125 | ## 2.2 Reference Vocabulary
126 | 
127 | The following products, objects, and aesthetics directly inform AUDIAW's visual and interaction language. Designers should study these references before contributing:
128 | 
129 | **Primary References:**
130 | - Nothing Phone and Nothing OS — monochrome hierarchy, dot-matrix accents, spatial structure, typographic precision
131 | - Teenage Engineering OP-1 / OP-Z — hardware-coded workflows, color as function not decoration, industrial form language
132 | - Linear (software) — dark surface depth, restrained motion, precision focus states, structural layout
133 | - Universal Audio hardware — professional metering, knob tactility, industrial labeling conventions
134 | - API and SSL mixing consoles — dense information without clutter, physical spatial memory
135 | - Dieter Rams' Braun products — maximum function, minimum form, "less but better"
136 | 
137 | **Secondary References:**
138 | - Leica M-series cameras — purposeful physical layout, honest materials
139 | - Native Instruments Maschine MK3 — dense but structured, functional color coding
140 | - Ableton Push 2 — dark ground, light content, structural grid discipline
141 | 
142 | **Explicitly NOT References:**
143 | - Gaming peripherals and their software
144 | - Any UI that uses glowing outlines as decoration
145 | - Glassmorphism applied decoratively
146 | - Synthwave / retrowave aesthetic
147 | - Skeuomorphic hardware emulation (bevels, fake screws, wood panels)
148 | - Generic SaaS dashboard aesthetics
149 | 
150 | ## 2.3 Visual Personality Adjectives
151 | 
152 | When a design decision is unclear, the following adjectives should guide the judgment:
153 | 
154 | | Should feel like | Should not feel like |
155 | |---|---|
156 | | Machined | Rendered |
157 | | Calibrated | Decorated |
158 | | Structural | Themed |
159 | | Monolithic | Fragmented |
160 | | Deliberate | Clever |
161 | | Restrained | Minimal (minimalism as aesthetic) |
162 | | Dense with purpose | Dense with content |
163 | | Weighted | Floaty |
164 | | Industrial | Sterile |
165 | | Earned | Assumed |
166 | 
167 | ---
168 | 
169 | # 3. DESIGN PHILOSOPHY
170 | 
171 | ## 3.1 The Three Governing Rules
172 | 
173 | Every design decision in AUDIAW is evaluated against three rules, in this priority order:
174 | 
175 | **Rule 1: Does this aid the work?**  
176 | If a visual element, interaction, or animation does not directly aid the user in completing a music production task, it must be eliminated or made invisible by default. Aesthetic interest is never a sufficient justification for visual presence.
177 | 
178 | **Rule 2: Is this the simplest form that fully communicates?**  
179 | Once a design element passes Rule 1, it must be reduced to its simplest viable form. A horizontal bar communicates level. The bar does not need a gradient, a glow, a rounded end cap, or a shadow to do so. Add nothing until the absence of that thing causes failure of communication.
180 | 
181 | **Rule 3: Is this consistent with established spatial memory?**  
182 | Professional users build spatial memory. They know where the fader is without looking. They know where the transport sits. Changes to established positions destroy this memory. New elements must be placed in positions that extend, not disrupt, existing spatial conventions.
183 | 
184 | ## 3.2 Progressive Disclosure Architecture
185 | 
186 | AUDIAW's interface operates on three levels of disclosure:
187 | 
188 | **Surface level (always visible):**  
189 | The essential working canvas. Waveforms, MIDI notes, the timeline, the transport, track names, level meters. The things a user needs to see 100% of the time.
190 | 
191 | **Contextual level (visible on focus or hover):**  
192 | Controls that modify the item currently in focus. Track mute/solo buttons appear on track header hover. Clip menu appears on clip right-click. Effect parameter details expand when a device is selected. This layer appears within 80ms of user intent signal and disappears 300ms after intent withdrawal.
193 | 
194 | **Modal level (explicit invocation only):**  
195 | System settings, export dialogs, plugin browsers, the command palette. These are never visible unless explicitly called. They cover content when active. They are dismissed by Escape or clicking outside their bounds.
196 | 
197 | This hierarchy is rigid. Controls must never float up a level unless there is a documented, tested justification.
198 | 
199 | ## 3.3 Spatial Grammar
200 | 
201 | AUDIAW's interface has a defined spatial grammar. Every region of the screen has a semantic identity:
202 | 
203 | - **Top:** Temporal and structural controls (transport, project state, global settings)
204 | - **Left:** Source material and asset management (browser, file tree)
205 | - **Center:** The active work surface (arrangement, piano roll, mixer, automation)
206 | - **Right:** Property and device inspection (selected item properties, plugin chain)
207 | - **Bottom:** Secondary editing surfaces and context panels (piano roll when docked, mixer when docked)
208 | 
209 | This grammar is fixed. It cannot be inverted. Left never becomes a device inspector. The bottom never becomes the primary work surface. Users can hide regions, collapse them, and resize them, but the semantic identity of each region is permanent.
210 | 
211 | ---
212 | 
213 | # 4. EMOTIONAL UX GOALS
214 | 
215 | ## 4.1 The Flow State Objective
216 | 
217 | The primary emotional objective of AUDIAW's design is to support **psychological flow** in creative work. Flow requires:
218 | 
219 | - Clear goals with immediate feedback
220 | - A sense of direct control over outcomes
221 | - Sufficient challenge without overwhelming complexity
222 | - Elimination of interruptions and friction
223 | 
224 | Every design decision should be evaluated: does this increase or decrease the likelihood of flow?
225 | 
226 | ## 4.2 First Launch Emotion
227 | 
228 | **Target emotion:** "I understand this. I can start immediately."
229 | 
230 | The user opening AUDIAW for the first time should not feel overwhelmed. They should feel oriented. The layout should communicate its own logic through visual hierarchy and spatial structure without requiring reading a manual.
231 | 
232 | **Anti-target:** Curiosity about what a specific control does. Any element whose purpose is not immediately inferrable from its visual form is a design failure at the surface level.
233 | 
234 | ## 4.3 Session Working Emotion
235 | 
236 | **Target emotion:** "The tool is responding to exactly what I intend."
237 | 
238 | During a production session, the interface should feel like a direct extension of intent. Knobs respond instantly. Clips snap to exactly the right position. The piano roll shows exactly what is expected. Nothing surprises. Nothing resists.
239 | 
240 | **Anti-target:** Any moment where the user pauses to think about the interface rather than the music.
241 | 
242 | ## 4.4 Deep Feature Emotion
243 | 
244 | **Target emotion:** "There's more here than I expected. This goes as deep as I need it to."
245 | 
246 | When a professional user discovers advanced routing, modulation systems, or complex automation capabilities, they should feel the satisfaction of earned depth — discovering capability that was already there, structured and waiting, not buried or hidden.
247 | 
248 | **Anti-target:** "This feature was obviously added later and doesn't fit." Depth must feel native.
249 | 
250 | ## 4.5 Error and Recovery Emotion
251 | 
252 | **Target emotion:** "The system caught this and handled it. My work is safe."
253 | 
254 | When something goes wrong (plugin crash, audio dropout, file not found), the user should feel the system absorbed the impact on their behalf. Recovery must feel automatic and competent.
255 | 
256 | **Anti-target:** Panic. Any UI response to an error that makes the user feel their work is at risk.
257 | 
258 | ---
259 | 
260 | # 5. CORE UX PRINCIPLES
261 | 
262 | ## 5.1 Principle 01: Silence is Not Emptiness
263 | 
264 | Whitespace in AUDIAW is not the absence of content. It is the structure that makes content readable. Every region of whitespace is intentional. Track lanes have vertical breathing room because without it, dense waveforms become indistinguishable. The transport bar has lateral margin because without it, controls crowd into illegibility.
265 | 
266 | **Implementation rule:** No new element may be introduced to a layout region that reduces existing whitespace below its defined minimum. Minimums are defined in the spacing system.
267 | 
268 | ## 5.2 Principle 02: Color Carries Meaning, Not Decoration
269 | 
270 | Color in AUDIAW is functional. It is not applied to make the interface look interesting. It is applied to communicate:
271 | 
272 | - Track identity (user-assigned, spatial memory anchor)
273 | - State (recording = red, active = accent, muted = desaturated)
274 | - Severity (error = red-value, warning = amber-value)
275 | - Level (metering gradient from safe to clip)
276 | 
277 | **Implementation rule:** No color may be introduced whose sole purpose is aesthetic. If a color is present, it communicates something that cannot be communicated by position, shape, or label alone.
278 | 
279 | ## 5.3 Principle 03: Interactions Have Physical Grammar
280 | 
281 | Users build physical intuition about interfaces. AUDIAW respects conventional physical grammar:
282 | 
283 | - Horizontal faders go left for less, right for more
284 | - Vertical faders go down for less, up for more
285 | - Knobs turn right for increase (clockwise)
286 | - Dragging up on a value increases it, down decreases it
287 | - Scrolling up on a timeline zooms in, down zooms out (when modifier held)
288 | 
289 | **Implementation rule:** AUDIAW never inverts these conventions. If a platform's native convention differs, AUDIAW follows the platform convention. If no platform convention exists, AUDIAW follows the above rules.
290 | 
291 | ## 5.4 Principle 04: Feedback is Immediate or Absent
292 | 
293 | Visual feedback must appear within one render frame (≤16ms at 60fps) of the triggering action. If feedback cannot be rendered within this budget, it must not be attempted — show no feedback rather than delayed feedback, which is worse than none.
294 | 
295 | **Exception:** Loading indicators for operations explicitly expected to take time (project open, export render). These must begin within 100ms of action trigger and must communicate progress, not just activity.
296 | 
297 | ## 5.5 Principle 05: Undo is a Safety Net, Not a Workflow
298 | 
299 | The existence of unlimited undo must not be used to justify potentially destructive interactions. Every significant action (clip delete, plugin remove, track delete) must require either:
300 | - A single reversible action (not a confirmation dialog), OR
301 | - Undo is immediately available and communicated
302 | 
303 | Confirmation dialogs for reversible actions are a UX failure. They interrupt flow and communicate distrust of the undo system.
304 | 
305 | ## 5.6 Principle 06: Dense Information, Low Visual Noise
306 | 
307 | Professional audio software must display a large volume of information simultaneously. The solution to this is not to hide information — it is to control visual weight so that the information hierarchy is clear at a glance.
308 | 
309 | **Weight hierarchy:**
310 | - Active/selected content: 100% opacity, full saturation
311 | - Passive content (present but not focus): 70–85% opacity, reduced saturation
312 | - Background structure (grid, guides, empty lanes): 20–40% opacity
313 | - Invisible until invoked (contextual controls): 0% opacity at rest
314 | 
315 | ---
316 | 
317 | # 6. VISUAL IDENTITY SYSTEM
318 | 
319 | ## 6.1 Primary Visual Language
320 | 
321 | AUDIAW's visual language is built on five structural elements:
322 | 
323 | **1. Dark Ground**  
324 | The application background is deep, near-black. Not pure black (`#000000`) — which reads as a void — but a structured dark neutral with a subtle cool-gray lean. The dark ground ensures that all content reads against it with high contrast while reducing eye fatigue during long sessions.
325 | 
326 | **2. Monochrome Structure**  
327 | The application structure (panels, separators, headers, labels) exists entirely in a grayscale range. Color is never used for structural elements. A panel border is never blue. A section header is never colored. Structure is communicated through tone, not hue.
328 | 
329 | **3. Weight Through Tone**  
330 | Visual hierarchy is expressed through tonal value, not size alone. The most important element in a region is the brightest. Secondary elements are mid-tone. Tertiary elements are near-background.
331 | 
332 | **4. Functional Color Isolation**  
333 | When color appears (track colors, meters, status indicators), it appears in isolation against the monochrome ground. This isolation gives color maximum communicative impact. A red record indicator reads instantly because nothing else is red.
334 | 
335 | **5. Typographic Precision**  
336 | Text is the primary communication surface. Typography is precise, consistent, and never decorative. No italic text in the UI except within content fields. No decorative type treatments.
337 | 
338 | ## 6.2 Surface Depth Model
339 | 
340 | AUDIAW uses a five-level surface depth model. Higher numbers are "closer" (more prominent):
341 | 
342 | ```
343 | Level 0 — Application void (below everything)
344 |   Value: #0D0D0F
345 |   Usage: Outside application window, truly empty regions
346 | 
347 | Level 1 — Base application surface (the ground)
348 |   Value: #111115
349 |   Usage: Main arrangement background, empty track lanes, panel backgrounds
350 | 
351 | Level 2 — Raised surfaces (panel interiors)
352 |   Value: #1A1A21
353 |   Usage: Track headers, mixer channel strips, panel content areas, sidebars
354 | 
355 | Level 3 — Elevated elements (active/focused content)
356 |   Value: #22222C
357 |   Usage: Selected items, hovered elements, dropdown backgrounds, tooltips
358 | 
359 | Level 4 — Floating elements (overlays)
360 |   Value: #2C2C39
361 |   Usage: Context menus, command palette, modal dialogs, popover panels
362 | 
363 | Level 5 — Highest emphasis (critical indicators)
364 |   Value: #363645
365 |   Usage: Focused input fields, active drag targets, prominent notifications
366 | ```
367 | 
368 | Each level must be visually distinguishable from adjacent levels. The step between levels is approximately 7–9% luminance increase. Levels must never be swapped in usage — a base application surface element must never use Level 4 values.
369 | 
370 | ## 6.3 Border Language
371 | 
372 | Borders in AUDIAW are defined by functional role, not by aesthetic style:
373 | 
374 | **Structural borders (region separators):**
375 | - Color: `rgba(255, 255, 255, 0.07)`
376 | - Width: `1px`
377 | - Style: solid
378 | - Usage: Panel edges, track header/lane separator, toolbar bottom edge
379 | 
380 | **Interactive borders (interactive element outlines at rest):**
381 | - Color: `rgba(255, 255, 255, 0.10)`
382 | - Width: `1px`
383 | - Style: solid
384 | - Usage: Text inputs at rest, dropdown buttons, collapsible panel edges
385 | 
386 | **Focus borders (currently focused element):**
387 | - Color: The active accent color at 100% opacity
388 | - Width: `1.5px` (never 2px — too heavy for this density)
389 | - Style: solid
390 | - Usage: Keyboard-focused inputs, selected controls, active knobs
391 | 
392 | **Status borders (state communication):**
393 | - Record active: `rgba(239, 68, 68, 0.6)` (red, 60% opacity)
394 | - Warning: `rgba(245, 158, 11, 0.5)` (amber, 50% opacity)
395 | - Error: `rgba(239, 68, 68, 0.8)` (red, 80% opacity)
396 | 
397 | ---
398 | 
399 | # 7. NOTHING-INSPIRED DESIGN LANGUAGE
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
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs
package.json,pnpm-workspace.yaml,.gitignore,src-tauri/Cargo.toml,src-tauri/build.rs,index.html,vite.config.ts,app-icon.png.svg,src-tauri/tauri.conf.json,src/index.css,DOCS/V0.5_TECHNICAL_SPECIFICATION.md,crates/audiaw-project/Cargo.toml,tsconfig.json,tsconfig.node.json,tailwind.config.js,postcss.config.js,SETUP.md,VERIFICATION.md,src/styles/theme.ts,src/styles/animations.css

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T22:18:44.909Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.05

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<read_file>
<args>
  <file>
    <path>DOCS/AUDIAW-DESIGN.md</path>
    <line_range>501-1000</line_range>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 'DOCS/AUDIAW-DESIGN.md'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>DOCS/AUDIAW-DESIGN.md</path>
<content lines="501-1000">
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
 701 | - Position is remembered per plugin instance per project
 702 | - Plugin windows are NOT "always on top" by default. User can toggle "Keep on top" from the plugin window title bar.
 703 | 
 704 | **Plugin window title bar controls:**
 705 | - Left edge: close button (×), 28×28px
 706 | - Center: plugin name and track name
 707 | - Right area: three buttons (each 28×28px):
 708 |   - Power (bypass toggle): filled circle when active, outlined when bypassed
 709 |   - Preset selector: labeled with current preset name, click to open preset browser
 710 |   - Keep-on-top toggle: pin icon
 711 | 
 712 | ---
 713 | 
 714 | # 11. DOCKING SYSTEM
 715 | 
 716 | ## 11.1 Dock Philosophy
 717 | 
 718 | The docking system in AUDIAW is **structural, not free-form.** Panels dock into defined zones — they do not float freely at arbitrary positions. The reason: arbitrary floating panels destroy spatial memory. Users should always know exactly where a panel is without looking for it.
 719 | 
 720 | Free-floating is reserved for one use case only: **plugin UI windows**, which cannot be reasonably docked because their sizes and proportions are controlled by the plugin.
 721 | 
 722 | ## 11.2 Dock Zones
 723 | 
 724 | Panels can be docked to the following zones (as defined in section 9):
 725 | - Left Panel Zone
 726 | - Right Panel Zone
 727 | - Bottom Panel Zone
 728 | 
 729 | Each zone can contain multiple panels, accessed via a tab bar at the top of the zone.
 730 | 
 731 | ## 11.3 Tab Bar Design (Within Docked Zones)
 732 | 
 733 | When multiple panels are docked to the same zone, a tab bar appears at the top of the zone:
 734 | 
 735 | **Tab bar height:** 34px  
 736 | **Tab bar background:** Level 2 surface, slightly darker than the panel content (`#171720`)  
 737 | **Tab bar bottom border:** 1px structural border  
 738 | **Tab separator:** vertical 1px lines between tabs at `rgba(255,255,255,0.07)`
 739 | 
 740 | **Individual tab design:**
 741 | - Height: 34px (full zone height)
 742 | - Horizontal padding: 14px left, 14px right
 743 | - Font: 11px Inter Medium
 744 | - Active tab text: opacity 0.90
 745 | - Inactive tab text: opacity 0.45
 746 | - Active tab indicator: a 2px horizontal line at the bottom of the active tab, accent color
 747 | - Active tab background: Level 2 surface
 748 | - Inactive tab background: transparent (on the darker tab bar)
 749 | - Tab hover: inactive tab background becomes `rgba(255,255,255,0.04)`, transition 80ms ease-out
 750 | - Tab close button: appears on hover, 16×16px, × icon, opacity 0.50, opacity 1.0 on the close button hover
 751 | 
 752 | **Tab overflow:** When more tabs than can be displayed, show a right-edge `…` button (16×34px) that opens a panel list dropdown.
 753 | 
 754 | ## 11.4 Panel Drag-to-Dock
 755 | 
 756 | Panels that are being dragged (e.g., the user is reorganizing their workspace) are indicated by:
 757 | 
 758 | 1. The panel shows a ghost representation (60% opacity of the panel content)
 759 | 2. Valid dock zones highlight: a 2px accent-colored border appears around valid drop targets
 760 | 3. When hovering over a valid dock zone, the zone shows a **dock preview**: a filled accent-color overlay at 8% opacity covering the zone
 761 | 4. On release in a valid zone: the panel docks with a 120ms ease-out scale-and-fade-in animation
 762 | 5. On release outside a valid zone: the panel returns to its original position with a 150ms spring animation
 763 | 
 764 | **Undock gesture:** Double-click a tab to undock the panel as a floating secondary window (for multi-monitor use). The window appears at the position the tab was, animating outward with a 100ms ease-out expand.
 765 | 
 766 | ---
 767 | 
 768 | # 12. WORKSPACE SYSTEM
 769 | 
 770 | ## 12.1 Workspace Definition
 771 | 
 772 | A workspace is a named, saveable snapshot of:
 773 | - Which panels are open and in which zones
 774 | - The size of each zone (left panel width, right panel width, bottom panel height)
 775 | - Which tab is active in each zone
 776 | - The active main view (arrangement / mixer / piano roll / automation)
 777 | - The track height mode (compact / standard / tall)
 778 | - The UI scale factor
 779 | 
 780 | A workspace does NOT save:
 781 | - Project content
 782 | - Plugin states
 783 | - Audio device configuration
 784 | - Zoom levels (these are per-project)
 785 | - Scroll positions (these are per-project)
 786 | 
 787 | ## 12.2 Workspace Switcher
 788 | 
 789 | The workspace switcher is a compact dropdown in the transport bar, positioned at the far right:
 790 | 
 791 | **Trigger:** A small button labeled with the current workspace name (e.g., "Production")
 792 | - Width: auto (minimum 80px, maximum 140px), truncated with ellipsis
 793 | - Height: 26px
 794 | - Font: 11px Inter Medium, opacity 0.75
 795 | - Icon: a small grid icon (2×2 dots) at 14px, 8px to the left of the label
 796 | - Background: transparent at rest, `rgba(255,255,255,0.06)` on hover
 797 | - Border: 1px interactive border
 798 | - Border-radius: 4px
 799 | 
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
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs
package.json,pnpm-workspace.yaml,.gitignore,src-tauri/Cargo.toml,src-tauri/build.rs,index.html,vite.config.ts,app-icon.png.svg,src-tauri/tauri.conf.json,src/index.css,DOCS/V0.5_TECHNICAL_SPECIFICATION.md,crates/audiaw-project/Cargo.toml,tsconfig.json,tsconfig.node.json,tailwind.config.js,postcss.config.js,SETUP.md,VERIFICATION.md,src/styles/theme.ts,src/styles/animations.css

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T22:18:48.905Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.12

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<read_file>
<args>
  <file>
    <path>DOCS/AUDIAW-DESIGN.md</path>
    <line_range>1001-1500</line_range>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 'DOCS/AUDIAW-DESIGN.md'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>DOCS/AUDIAW-DESIGN.md</path>
<content lines="1001-1500">
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
1401 | From: 0px (or translateX(-100%))
1402 | To: target width (or translateX(0))
1403 | Simultaneous: canvas zone resizes in the same duration
1404 | ```
1405 | 
1406 | **Panel close:**
1407 | ```
1408 | Duration: 120ms
1409 | Easing: --ease-in
1410 | Property: width (or translateX)
1411 | From: current width
1412 | To: 0px
1413 | ```
1414 | 
1415 | **Panel tab switch:**
1416 | ```
1417 | Duration: 0ms (instant — no animation between tabs)
1418 | Rationale: Tab switching is a frequent operation; any delay causes friction
1419 | ```
1420 | 
1421 | **Modal dialog enter:**
1422 | ```
1423 | Duration: 180ms
1424 | Easing: --ease-out
1425 | Backdrop: fade from opacity 0 to rgba(0,0,0,0.6)
1426 | Content: translateY from +16px to 0, opacity from 0 to 1
1427 | Both properties animate simultaneously
1428 | ```
1429 | 
1430 | **Modal dialog exit:**
1431 | ```
1432 | Duration: 120ms
1433 | Easing: --ease-in
1434 | Backdrop: fade from rgba(0,0,0,0.6) to 0
1435 | Content: opacity 1 to 0 only (no translate on exit — exits "in place")
1436 | ```
1437 | 
1438 | **Context menu open:**
1439 | ```
1440 | Duration: 90ms
1441 | Easing: --ease-out
1442 | transform-origin: the point where the user right-clicked
1443 | scale from 0.94 to 1.0
1444 | opacity from 0 to 1
1445 | ```
1446 | 
1447 | **Context menu close:**
1448 | ```
1449 | Duration: 60ms
1450 | Easing: --ease-in
1451 | opacity from 1 to 0 only (no scale — exits "in place")
1452 | ```
1453 | 
1454 | **Hover state enter:**
1455 | ```
1456 | Duration: 60ms
1457 | Easing: --ease-out
1458 | Properties: background-color, color, border-color
1459 | ```
1460 | 
1461 | **Hover state exit:**
1462 | ```
1463 | Duration: 90ms
1464 | Easing: --ease-out
1465 | Properties: background-color, color, border-color
1466 | Rationale: Slightly slower exit prevents flickering during cursor movement
1467 | ```
1468 | 
1469 | **Tooltip appear:**
1470 | ```
1471 | Delay before appearing: 600ms (of static hover)
1472 | Duration: 90ms
1473 | Easing: --ease-out
1474 | opacity from 0 to 1 only (no translate — tooltips appear in place)
1475 | ```
1476 | 
1477 | **Tooltip dismiss:**
1478 | ```
1479 | Duration: 60ms
1480 | opacity from 1 to 0
1481 | No delay
1482 | ```
1483 | 
1484 | **Clip drag (in timeline):**
1485 | ```
1486 | No animation — follows cursor exactly (0ms response)
1487 | Drag ghost: 80% opacity of the clip
1488 | Grid snap: snaps instantly (no animate-to-snap)
1489 | ```
1490 | 
1491 | **Track height resize:**
1492 | ```
1493 | No animation while dragging (tracks resize as you drag)
1494 | Snap-to-height-mode if released near a mode boundary: 80ms ease-out to target height
1495 | ```
1496 | 
1497 | **Workspace switch:**
1498 | ```
1499 | Duration: 240ms
1500 | Easing: --ease-standard
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs
package.json,pnpm-workspace.yaml,.gitignore,src-tauri/Cargo.toml,src-tauri/build.rs,index.html,vite.config.ts,app-icon.png.svg,src-tauri/tauri.conf.json,src/index.css,DOCS/V0.5_TECHNICAL_SPECIFICATION.md,crates/audiaw-project/Cargo.toml,tsconfig.json,tsconfig.node.json,tailwind.config.js,postcss.config.js,SETUP.md,VERIFICATION.md,src/styles/theme.ts,src/styles/animations.css

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T22:18:52.716Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.21

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<read_file>
<args>
  <file>
    <path>DOCS/AUDIAW-DESIGN.md</path>
    <line_range>1501-2000</line_range>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 'DOCS/AUDIAW-DESIGN.md'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>DOCS/AUDIAW-DESIGN.md</path>
<content lines="1501-2000">
1501 | Outgoing view: opacity from 1 to 0 in first 120ms
1502 | Incoming view: opacity from 0 to 1 in last 120ms
1503 | No translate — opacity crossfade only
1504 | Rationale: A translate would cause confusion about spatial relationships
1505 | ```
1506 | 
1507 | **Waveform zoom:**
1508 | ```
1509 | No animation — waveform updates at the next GPU frame
1510 | Target: sub-16ms response from zoom gesture to visual update
1511 | Rationale: Animation delays in zoom feel like lag, not smoothness
1512 | ```
1513 | 
1514 | ---
1515 | 
1516 | # 22. ANIMATION RULES
1517 | 
1518 | ## 22.1 Rules That Are Absolute
1519 | 
1520 | **Rule A: No animation may delay user action.**  
1521 | If a button triggers an action, the action begins the moment the button is pressed. The animation confirming the press is simultaneous with, not before, the action.
1522 | 
1523 | **Rule B: No looping animations in the main interface.**  
1524 | Loading spinners loop. Everything else does not. A blinking cursor in a text field is the only exception. Record button blinking during active recording is an exception: 1s on/off, 50/50 duty cycle.
1525 | 
1526 | **Rule C: All animations respect `prefers-reduced-motion`.**  
1527 | When `prefers-reduced-motion: reduce` is set:
1528 | - All transitions that change position or scale → instant (0ms, no transition)
1529 | - All opacity transitions → allowed (they remain, but duration halved)
1530 | - Blinking (record indicator) → solid on, no blink
1531 | 
1532 | **Rule D: No animation is applied to an element that updates at >10Hz.**  
1533 | Level meters update at 60Hz. They use direct CSS variable updates — no CSS transition. Attempting to animate at 60Hz through CSS transitions causes GPU compositor overload.
1534 | 
1535 | **Rule E: The waveform never animates.**  
1536 | Waveform content is GPU-rendered and updates immediately. No CSS transition is ever applied to the waveform display canvas.
1537 | 
1538 | ## 22.2 The Anti-Animation List
1539 | 
1540 | These animation types are explicitly banned from AUDIAW:
1541 | 
1542 | - Bounce / spring physics with >12% overshoot
1543 | - Parallax scrolling effects
1544 | - Particle effects
1545 | - Shimmer / skeleton loading animations (use static placeholder instead)
1546 | - Rotating icons (except the loop button's rotation indicator, which is a 1-second CSS rotation indicating playback)
1547 | - "Ripple" click effects (Material Design ripple)
1548 | - Page-flip transitions
1549 | - Blur-in animations
1550 | - Scale animations on content that grows from > 0.8 (distracting, feels like growing object)
1551 | - Any animation that obscures content while animating (content must be readable throughout)
1552 | 
1553 | ---
1554 | 
1555 | # 23. TRANSITION HIERARCHY
1556 | 
1557 | ## 23.1 System-Level Transitions
1558 | 
1559 | System-level transitions change the fundamental state of the application. They are the slowest and most deliberate:
1560 | 
1561 | **View switch (Arrangement ↔ Mixer ↔ Piano Roll):**
1562 | - Duration: 240ms
1563 | - Pattern: opacity crossfade (outgoing fades out, incoming fades in)
1564 | - The transport bar and status bar do not transition — they are always visible and do not change
1565 | 
1566 | **Workspace switch:**
1567 | - Duration: 240ms
1568 | - Same pattern as view switch
1569 | - Panel positions change after the crossfade, without their own animation
1570 | 
1571 | **Application startup to working state:**
1572 | - Described in Section 32 (Startup Experience)
1573 | 
1574 | ## 23.2 Component-Level Transitions
1575 | 
1576 | Component-level transitions respond to direct user actions on individual components:
1577 | 
1578 | **Panels:** 120–150ms ease-out for open/close  
1579 | **Dropdowns:** 90ms ease-out for open, 60ms ease-in for close  
1580 | **Modals:** 180ms ease-out for open, 120ms ease-in for close  
1581 | **Tooltips:** 90ms ease-out appear, 60ms ease-in disappear  
1582 | 
1583 | ## 23.3 State-Level Transitions
1584 | 
1585 | State-level transitions communicate changes in element state (hover, active, focus):
1586 | 
1587 | **All hover states:** 60ms enter, 90ms exit  
1588 | **All focus states:** 0ms (instant — focus ring appears immediately on keyboard navigation)  
1589 | **All active/pressed states:** 60ms enter, 90ms exit  
1590 | **Record state change:** 120ms ease-out (the red color transitions in)  
1591 | 
1592 | ---
1593 | 
1594 | # 24. INTERACTION FEEDBACK SYSTEM
1595 | 
1596 | ## 24.1 Feedback Modes
1597 | 
1598 | AUDIAW uses three feedback modes for interactions. Every interactive element uses exactly one of these modes:
1599 | 
1600 | **Mode A: Immediate (< 16ms)**  
1601 | Used for: transport play/stop/record, clip select, note select, fader drag start  
1602 | The visual change happens within the same frame as the input event.
1603 | 
1604 | **Mode B: Confirmed (16–100ms)**  
1605 | Used for: command execution, project save, export start, plugin load  
1606 | A visual indicator (button state change, progress start) confirms receipt within 100ms. The actual operation may take longer.
1607 | 
1608 | **Mode C: Progressive (100ms–indefinite)**  
1609 | Used for: project open, export render, plugin scan  
1610 | A loading indicator with progress (where possible) or activity (where progress is unknown).
1611 | 
1612 | ## 24.2 Button Press Feedback
1613 | 
1614 | All clickable buttons use this feedback sequence:
1615 | 
1616 | 1. **Pointer-down:** Background brightens by `rgba(255,255,255,0.04)`, scale `transform: scale(0.98)` in 60ms ease-out
1617 | 2. **Pointer-up:** Scale returns to 1.0 in 90ms ease-out, background returns to hover state
1618 | 
1619 | The scale transform is applied only if the button is > 24px in its smallest dimension. Buttons ≤ 24px (icon-only buttons) use only the background change, no scale.
1620 | 
1621 | ## 24.3 Knob Interaction Feedback
1622 | 
1623 | Rotary knobs have a specific interaction model:
1624 | 
1625 | **Hover state:** The knob's indicator track brightens slightly. The knob background shows a subtle highlight. Cursor changes to `ns-resize`.
1626 | 
1627 | **Drag state:** A value tooltip appears above the knob showing the exact current value. The tooltip updates in real-time during drag. The knob indicator moves in real-time.
1628 | 
1629 | **Precision mode:** Holding `Shift` during drag reduces sensitivity to 10% of normal. A label "FINE" appears below the knob in 10px, `rgba(255,255,255,0.45)`.
1630 | 
1631 | **Reset:** Double-click on any knob resets it to its default value. A brief flash animation (knob indicator bounces to default in 120ms) confirms the reset.
1632 | 
1633 | **Value display:** Right-clicking a knob opens an inline input field (28px height, monospace font) pre-populated with the current value. User can type a specific value and press Enter to confirm.
1634 | 
1635 | ## 24.4 Fader Interaction Feedback
1636 | 
1637 | **Hover:** Fader cap brightens. The value is shown in a floating label next to the fader cap.
1638 | 
1639 | **Drag:** The value label persists and updates. If dragging moves the cap beyond the fader track, the cap clamps to the track end. Out-of-bounds dragging is accepted (the value clamps internally, the visual position clamps at track boundary).
1640 | 
1641 | **Click on track (not cap):** The fader jumps to the clicked position. Duration: instant. No animation.
1642 | 
1643 | **Precision mode:** Same as knob — `Shift` reduces to 10% sensitivity.
1644 | 
1645 | **Reset:** Double-click on fader cap resets to 0 dB (or default value for non-level faders).
1646 | 
1647 | ---
1648 | 
1649 | # 25. CURSOR BEHAVIOR
1650 | 
1651 | ## 25.1 System Cursors Used
1652 | 
1653 | AUDIAW uses system cursors for all standard interactions. No custom cursor images except where noted:
1654 | 
1655 | | Interaction | Cursor |
1656 | |---|---|
1657 | | Default / pointer | `default` |
1658 | | Clickable element | `pointer` |
1659 | | Text input | `text` |
1660 | | Horizontal resize (panel border) | `col-resize` |
1661 | | Vertical resize (panel border, track height) | `row-resize` |
1662 | | Fader / knob drag | `ns-resize` |
1663 | | Clip drag (active drag) | `grabbing` |
1664 | | Clip drag (hover, ready to drag) | `grab` |
1665 | | Clip resize (left/right edge hover) | `col-resize` or `ew-resize` |
1666 | | Pencil tool (piano roll draw mode) | `crosshair` |
1667 | | Eraser tool | custom: `url('cursors/eraser.svg') 0 20, cell` |
1668 | | Scissors tool | custom: `url('cursors/scissors.svg') 10 10, cell` |
1669 | | Zoom tool | `zoom-in` or `zoom-out` depending on modifier |
1670 | | Selection rubber-band | `crosshair` |
1671 | | Unavailable / disabled | `not-allowed` |
1672 | | Drag-over valid target | `copy` (during file drag) |
1673 | | Drag-over invalid target | `no-drop` |
1674 | 
1675 | ## 25.2 Custom Cursor Specifications
1676 | 
1677 | **Eraser cursor:**
1678 | - SVG: 20×20px, eraser shape
1679 | - Hotspot: `0, 20` (bottom-left corner)
1680 | - Color: white outline
1681 | 
1682 | **Scissors cursor:**
1683 | - SVG: 20×20px, scissors shape
1684 | - Hotspot: `10, 10` (center, between blades)
1685 | - Color: white outline
1686 | 
1687 | Custom cursors are cached by the browser and should never cause performance concerns.
1688 | 
1689 | ## 25.3 Cursor Transitions
1690 | 
1691 | Cursor changes are instant (OS-controlled). AUDIAW does not animate cursor changes.
1692 | 
1693 | ---
1694 | 
1695 | # 26. HOVER STATE PHILOSOPHY
1696 | 
1697 | ## 26.1 Hover as Discovery
1698 | 
1699 | Hover states serve two purposes in AUDIAW:
1700 | 
1701 | 1. **Confirmation:** Confirming to the user that an element is interactive (changes color, reveals controls)
1702 | 2. **Contextual disclosure:** Revealing controls that are hidden at rest (the "Level 5 — invisible until invoked" layer)
1703 | 
1704 | ## 26.2 Track Header Hover Behavior
1705 | 
1706 | At rest, a track header shows only: color strip, track name, and minimal controls (type icon).
1707 | 
1708 | On hover (cursor enters the track header):
1709 | - Transition: 60ms ease-out
1710 | - Background shifts from Level 2 (`#1A1A21`) to Level 3 (`#22222C`)
1711 | - Mute button appears: transition from opacity 0 to 0.50 in 60ms
1712 | - Solo button appears: same
1713 | - Record arm button appears: same
1714 | - Track settings button (⋯) appears: same
1715 | - Track height drag handle appears at the bottom edge: a 2px horizontal line at `rgba(255,255,255,0.15)`
1716 | 
1717 | On hover exit:
1718 | - Transition: 90ms ease-out
1719 | - Background returns to Level 2
1720 | - Contextual controls fade to opacity 0 (unless one of them is in an active state — active mute stays visible, active solo stays visible)
1721 | 
1722 | **Exception: always-visible controls**  
1723 | If a track is muted, the mute button remains visible at rest (no fade to 0), at opacity 0.80. Same for solo and record-arm.
1724 | 
1725 | ## 26.3 Clip Hover Behavior
1726 | 
1727 | On hover (cursor enters a clip):
1728 | - Clip border brightens: from `rgba(255,255,255,0.08)` to `rgba(255,255,255,0.20)`
1729 | - Clip header bar background: from track_color at 15% to track_color at 25%
1730 | - Clip name: opacity shifts from 0.70 to 0.90
1731 | - Resize handles appear: left and right edges show a 4px wide hover zone with cursor `ew-resize`
1732 | - Position tooltip: appears at cursor position showing the clip's bar:beat:tick position, 600ms after hover starts
1733 | 
1734 | ## 26.4 Button Hover Behavior
1735 | 
1736 | Standard button hover:
1737 | - Background: adds `rgba(255,255,255,0.05)` to current background
1738 | - Border: increases opacity by 0.05 (e.g., interactive border from 0.10 to 0.15)
1739 | - Transition: 60ms ease-out
1740 | 
1741 | Icon-only button hover:
1742 | - Icon color: from `rgba(255,255,255,0.50)` to `rgba(255,255,255,0.80)`
1743 | - Optional: background appears as `rgba(255,255,255,0.06)` — only if the button has a defined bounding box
1744 | - Transition: 60ms ease-out
1745 | 
1746 | ---
1747 | 
1748 | # 27. FOCUS STATE SYSTEM
1749 | 
1750 | ## 27.1 Focus State Design
1751 | 
1752 | Focus states in AUDIAW are visible, precise, and unambiguous. They are the primary navigation affordance for keyboard users.
1753 | 
1754 | **Standard focus ring:**
1755 | ```css
1756 | :focus-visible {
1757 |   outline: 1.5px solid var(--accent-primary);   /* #3B8BF5 */
1758 |   outline-offset: 2px;
1759 |   border-radius: var(--radius-standard);         /* 4px */
1760 | }
1761 | ```
1762 | 
1763 | The focus ring is:
1764 | - Always 1.5px (thinner than a typical 2px — more precise)
1765 | - Always 2px outside the element edge (outline-offset)
1766 | - Always the current accent color
1767 | - Always 100% opacity (never faded or subtle — accessibility requirement)
1768 | - Applied immediately (0ms transition) on keyboard focus
1769 | - Removed immediately (0ms) when focus leaves
1770 | 
1771 | ## 27.2 Focus Context Behavior
1772 | 
1773 | **Text inputs:**
1774 | - Focus state adds the standard focus ring
1775 | - Additionally: the bottom border of the input transitions to accent color at full opacity (180° turn — the input's `border-bottom` becomes accent)
1776 | 
1777 | **Knobs:**
1778 | - Standard focus ring around the knob's circular bounding area
1779 | - Arrow keys adjust the knob value (↑/→ = increase, ↓/← = decrease) by the standard step value
1780 | 
1781 | **Faders:**
1782 | - Standard focus ring around the entire fader track area
1783 | - Arrow keys adjust the fader (↑/→ = increase, ↓/← = decrease) by 0.5dB per keypress
1784 | - Shift + arrow keys: 0.1dB per keypress
1785 | - Ctrl + arrow keys: 1dB per keypress
1786 | 
1787 | **Clip (timeline):**
1788 | - Selection border brightens from selection color to accent color when keyboard-focused
1789 | - Arrow keys navigate between clips on the same track
1790 | - Up/down arrows navigate between tracks (carrying selection)
1791 | 
1792 | ## 27.3 Focus Trap
1793 | 
1794 | Modal dialogs and the command palette implement focus trapping:
1795 | - When a modal opens, focus moves to the first focusable element inside the modal
1796 | - Tab cycles through focusable elements within the modal only
1797 | - Shift+Tab cycles in reverse
1798 | - Escape dismisses the modal and returns focus to the element that triggered the modal
1799 | 
1800 | ---
1801 | 
1802 | # 28. KEYBOARD NAVIGATION STANDARDS
1803 | 
1804 | ## 28.1 Global Tab Order
1805 | 
1806 | The Tab key navigates through focusable elements in this order within each zone:
1807 | 
1808 | 1. Transport zone (left to right: rewind, play, stop, record, loop, BPM, time signature, workspace selector, CPU meter)
1809 | 2. Main canvas zone (timeline ruler, then tracks top-to-bottom, then track controls left-to-right within each track)
1810 | 3. Left panel zone (search field, location list, asset list, preview player)
1811 | 4. Right panel zone (device chain list, each device, each device's controls)
1812 | 5. Bottom panel zone (active panel's tab order)
1813 | 6. Status bar (read-only, not in tab order)
1814 | 
1815 | ## 28.2 Arrow Key Conventions
1816 | 
1817 | Arrow keys provide navigation within complex components:
1818 | 
1819 | **Timeline/arrangement:**
1820 | - Left/Right: move selection by one snap unit
1821 | - Up/Down: navigate between tracks
1822 | - Shift + Left/Right: extend selection by one snap unit
1823 | - Ctrl + Left/Right: navigate by 1 bar
1824 | 
1825 | **Piano roll:**
1826 | - Left/Right: navigate between selected notes (or move selected notes)
1827 | - Up/Down: navigate pitch (or transpose selected notes by semitone)
1828 | - Shift + arrows: extend note selection
1829 | - Ctrl + Up/Down: transpose by octave
1830 | 
1831 | **Lists (browser, preset list, etc.):**
1832 | - Up/Down: navigate items
1833 | - Right: expand folder / drill into item
1834 | - Left: collapse folder / go up one level
1835 | - Enter: select / activate
1836 | - Space: preview (samples in browser)
1837 | 
1838 | ## 28.3 Keyboard Shortcut Display
1839 | 
1840 | Keyboard shortcuts are shown in context in three places:
1841 | 
1842 | 1. **Tooltips:** Keyboard shortcut shown at right side of tooltip in `rgba(255,255,255,0.45)` color, separated from label by 16px space
1843 | 2. **Context menus:** Keyboard shortcut shown at right edge of menu item, right-aligned
1844 | 3. **Command palette:** Keyboard shortcut shown at right edge of each result
1845 | 
1846 | Shortcut format: macOS uses `⌘`, `⌥`, `⇧`, `⌃` symbols. Windows/Linux uses "Ctrl", "Alt", "Shift" text labels.
1847 | 
1848 | ---
1849 | 
1850 | # 29. ACCESSIBILITY STANDARDS
1851 | 
1852 | ## 29.1 WCAG 2.1 AA Compliance
1853 | 
1854 | AUDIAW targets WCAG 2.1 AA compliance as a minimum for all interface elements. This includes:
1855 | 
1856 | - All text meets 4.5:1 contrast (normal) or 3:1 (large text)
1857 | - All interactive elements meet 3:1 contrast for their boundaries
1858 | - No information is conveyed by color alone
1859 | - All interactive elements are keyboard accessible
1860 | - All images and icons have appropriate alt text or aria-label
1861 | - Focus is always visible and clearly indicated
1862 | - No content flashes more than 3 times per second
1863 | 
1864 | ## 29.2 Reduced Motion
1865 | 
1866 | When `prefers-reduced-motion: reduce` is detected:
1867 | 
1868 | ```css
1869 | @media (prefers-reduced-motion: reduce) {
1870 |   /* Position-based animations become instant */
1871 |   *, *::before, *::after {
1872 |     animation-duration: 0.01ms !important;
1873 |     animation-iteration-count: 1 !important;
1874 |     transition-duration: 0.01ms !important;
1875 |     scroll-behavior: auto !important;
1876 |   }
1877 |   
1878 |   /* Opacity transitions are allowed but halved */
1879 |   .opacity-transition {
1880 |     transition-duration: 60ms !important;
1881 |   }
1882 |   
1883 |   /* Record blink is replaced with solid red */
1884 |   .record-indicator.blinking {
1885 |     animation: none;
1886 |     opacity: 1;
1887 |   }
1888 | }
1889 | ```
1890 | 
1891 | ## 29.3 Screen Reader Support
1892 | 
1893 | **ARIA landmark regions:**
1894 | ```html
1895 | <header role="banner" aria-label="Transport Bar">
1896 | <main role="main" aria-label="Arrangement">
1897 | <aside role="complementary" aria-label="Browser" id="left-panel">
1898 | <aside role="complementary" aria-label="Device Inspector" id="right-panel">
1899 | <footer role="contentinfo" aria-label="Status Bar">
1900 | ```
1901 | 
1902 | **Live regions for real-time updates:**
1903 | ```html
1904 | <!-- Transport state announcements -->
1905 | <div aria-live="polite" aria-atomic="true" id="transport-announcer" class="sr-only">
1906 |   <!-- "Playing", "Stopped", "Recording started" etc. -->
1907 | </div>
1908 | 
1909 | <!-- Error and critical notifications -->
1910 | <div aria-live="assertive" aria-atomic="true" id="alert-announcer" class="sr-only">
1911 |   <!-- Plugin crashes, audio dropouts, critical errors -->
1912 | </div>
1913 | ```
1914 | 
1915 | **Meter accessibility:**
1916 | Level meters are not individually describable in real-time for screen readers (too noisy). Instead:
1917 | - A summary meter level is spoken once per 5 seconds via polite live region: "Master output: -8 dBFS"
1918 | - Users can request a meter level reading via keyboard shortcut (default: Alt+M)
1919 | 
1920 | ## 29.4 Colorblind Accessibility
1921 | 
1922 | AUDIAW's design is tested under three colorblindness simulations using the Pilestone method:
1923 | 
1924 | **Deuteranopia (red-green):**
1925 | - Meters: green/amber/red zones remain distinguishable by value context (bar height position conveys level; color zones provide supplementary info)
1926 | - Record state: red is supplemented by the pulsing animation and the "REC" text label
1927 | - Track colors: all 16 track colors are verified distinguishable under deuteranopia simulation
1928 | 
1929 | **Protanopia (red-green variant):**
1930 | - Same considerations as deuteranopia
1931 | 
1932 | **Tritanopia (blue-yellow):**
1933 | - The accent color (blue default) may appear differently. Users can switch to a non-blue accent. The Rose or Emerald accents are recommended for tritanopia.
1934 | 
1935 | ---
1936 | 
1937 | # 30. TOUCH & TABLET UX
1938 | 
1939 | ## 30.1 Touch Target Sizes
1940 | 
1941 | All interactive elements have a minimum touch target of 44×44px (Apple HIG and WCAG 2.5.5):
1942 | - If the visual element is smaller than 44×44px, the touch area is extended invisibly around it
1943 | - Example: a 14px icon button has a 44×44px invisible touch target centered on the icon
1944 | 
1945 | ## 30.2 Gesture Support
1946 | 
1947 | AUDIAW supports these standard touch gestures:
1948 | 
1949 | **Pinch to zoom:** Zooms the timeline horizontally (arrangement view) or the piano roll. Center point of pinch is the zoom anchor.
1950 | 
1951 | **Two-finger scroll:** Scrolls the active canvas (timeline, mixer, piano roll). Natural scrolling direction by default.
1952 | 
1953 | **Two-finger horizontal scroll:** Navigates the timeline or piano roll horizontally.
1954 | 
1955 | **Long press:** Equivalent to right-click (shows context menu). Minimum hold: 500ms. Visual feedback: a subtle radial ripple appears at the press point after 300ms to communicate "long press detected."
1956 | 
1957 | **Swipe on track header:** Swipe left on a track header reveals contextual quick actions: Mute, Solo, Delete. Actions are revealed one-by-one as the swipe progresses (30%, 60%, 90% of header width reveals Mute, +Solo, +Delete respectively).
1958 | 
1959 | ## 30.3 Tablet Optimizations
1960 | 
1961 | On tablet form factors (> 768px wide in tablet mode):
1962 | 
1963 | - Minimum touch target increases to 48×48px
1964 | - Track heights default to "Tall" (80px) for easier selection
1965 | - The command palette can be accessed by swiping down from the top of the canvas zone
1966 | - The left panel defaults to closed (more canvas space)
1967 | 
1968 | ---
1969 | 
1970 | # 31. MULTI-MONITOR UX
1971 | 
1972 | ## 31.1 Primary Window Behavior
1973 | 
1974 | The AUDIAW main window always occupies exactly one monitor. Its monitor is the "primary" monitor for AUDIAW. Settings, transport state, and project data are associated with this window.
1975 | 
1976 | ## 31.2 Secondary Window Behavior
1977 | 
1978 | Plugin windows and detached panels appear on the monitor where they are positioned. Window managers on each OS handle this natively.
1979 | 
1980 | **Detached panel behavior:**
1981 | - Any docked panel can be detached to a secondary monitor by double-clicking its tab or via context menu → "Move to New Window"
1982 | - Detached panels appear as secondary windows with full panel functionality
1983 | - The tab in the original zone remains, showing a "moved to secondary window" indicator (small monitor icon)
1984 | - The secondary window reattaches to the main window by closing it or via context menu → "Return to Main Window"
1985 | 
1986 | **Workspace memory for multi-monitor:**
1987 | - AUDIAW identifies monitors by their hardware ID (where available) or logical index
1988 | - Secondary window positions and sizes are saved per-monitor configuration
1989 | - If a secondary monitor is disconnected, its windows are moved to the primary monitor on next launch
1990 | 
1991 | ## 31.3 Multi-Monitor Consistency
1992 | 
1993 | All AUDIAW windows use the same theme, font rendering, and UI scale. Scale cannot be set per-monitor (the OS handles HiDPI scaling differences between monitors).
1994 | 
1995 | ---
1996 | 
1997 | # 32. STARTUP EXPERIENCE
1998 | 
1999 | ## 32.1 Cold Launch Sequence
2000 | 
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs
package.json,pnpm-workspace.yaml,.gitignore,src-tauri/Cargo.toml,src-tauri/build.rs,index.html,vite.config.ts,app-icon.png.svg,src-tauri/tauri.conf.json,src/index.css,DOCS/V0.5_TECHNICAL_SPECIFICATION.md,crates/audiaw-project/Cargo.toml,tsconfig.json,tsconfig.node.json,tailwind.config.js,postcss.config.js,SETUP.md,VERIFICATION.md,src/styles/theme.ts,src/styles/animations.css

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T22:18:56.756Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.33

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<read_file>
<args>
  <file>
    <path>DOCS/AUDIAW-DESIGN.md</path>
    <line_range>2001-2500</line_range>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 'DOCS/AUDIAW-DESIGN.md'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>DOCS/AUDIAW-DESIGN.md</path>
<content lines="2001-2500">
2001 | The startup sequence has four visual phases, totaling ≤ 2500ms on reference hardware:
2002 | 
2003 | **Phase 1: Window Appears (0–50ms)**
2004 | The application window appears immediately. Background: Level 1 surface (`#111115`). Nothing else. No flash, no white screen, no OS loading animation.
2005 | 
2006 | **Phase 2: Brand Reveal (50–600ms)**
2007 | Centered in the window, the AUDIAW wordmark fades in at opacity 0 → 1 over 400ms (ease-out). Below the wordmark, a dot-matrix status line appears:
2008 | ```
2009 | AUDIAW  [dot-matrix text, 16px Geist Mono, opacity 0.45]
2010 | "INITIALIZING..."
2011 | ```
2012 | The dot-matrix text uses the styling from section 7.2.
2013 | 
2014 | **Phase 3: Initialization Progress (600–2000ms)**
2015 | The status line updates with initialization progress messages in sequence. Each message appears by fading in (100ms ease-out) and the previous message fades simultaneously. Messages are exact:
2016 | ```
2017 | "LOADING AUDIO ENGINE"     → appears at ~600ms
2018 | "CONNECTING AUDIO DEVICE"  → appears at ~900ms
2019 | "INDEXING PLUGIN CACHE"    → appears at ~1100ms
2020 | "LOADING WORKSPACE"        → appears at ~1500ms
2021 | "READY"                    → appears at ~2000ms, stays for 300ms
2022 | ```
2023 | 
2024 | The status message typography:
2025 | - Font: 13px Geist Mono
2026 | - Color: `rgba(255,255,255,0.45)`
2027 | - Letter spacing: 0.08em
2028 | - Uppercase
2029 | 
2030 | **Phase 4: Interface Reveal (2000–2500ms)**
2031 | After "READY" appears, the full interface fades in over 400ms (ease-out). The wordmark and status line fade out simultaneously (200ms ease-in). The interface appears already complete — no individual element "flying in."
2032 | 
2033 | If a previous project exists, it is shown fully loaded in the interface as it fades in.
2034 | 
2035 | ## 32.2 Warm Launch (Recent Project)
2036 | 
2037 | When launching with a recent project loaded from a previous session:
2038 | 
2039 | - Phases 1 and 2 are the same
2040 | - Phase 3 is shorter: "RESTORING PROJECT" → "READY"
2041 | - The project content (tracks, clips) is visible in the interface as it fades in
2042 | - Plugin instruments load in the background after the interface is visible — placeholders are shown (grayed-out device cards)
2043 | 
2044 | ## 32.3 First Launch (No Previous Session)
2045 | 
2046 | On the very first launch, after Phase 4, instead of an empty arrangement:
2047 | 
2048 | - A **Start Screen** appears in the primary canvas zone
2049 | - The start screen is NOT a separate window — it replaces the canvas
2050 | - Layout: centered content within the canvas, max-width 760px
2051 | 
2052 | **Start Screen layout:**
2053 | ```
2054 | [Large AUDIAW wordmark — 28px Inter Semibold, opacity 0.90]
2055 |                  16px gap
2056 | [Subtitle — 13px Inter Regular, opacity 0.50]
2057 | "A free, open-source DAW built for everyone."
2058 |                  48px gap
2059 | [Template Gallery — horizontal scroll row]
2060 | [6 genre cards: each 180×120px, with genre name and BPM hint]
2061 |                  24px gap
2062 | [Secondary actions row]
2063 |   [Open Project]  [Start Empty]
2064 | ```
2065 | 
2066 | **Template cards:**
2067 | - Size: 180×120px
2068 | - Background: Level 3 surface
2069 | - Border: 1px interactive border
2070 | - Border-radius: 6px
2071 | - Content: A waveform illustration in the track color for that genre (pre-drawn SVG, not interactive waveform)
2072 | - Label: genre name in 13px Inter Medium, white, bottom-left of card, 12px padding
2073 | - BPM hint: "140 BPM" in 10px Geist Mono, opacity 0.45, bottom-right of card
2074 | - Hover: border transitions to `rgba(255,255,255,0.25)`, background to Level 4
2075 | 
2076 | ---
2077 | 
2078 | # 33. LOADING STATES
2079 | 
2080 | ## 33.1 Loading State Categories
2081 | 
2082 | AUDIAW has three types of loading:
2083 | 
2084 | **Type A: Instant (< 100ms)** — No loading state shown. If the operation completes within 100ms, the result simply appears. No spinner was shown, no progress indicator was visible.
2085 | 
2086 | **Type B: Short (100ms – 3s)** — A loading indicator appears. Specifically: the button or action trigger shows a subtle activity indicator (a 16px spinner positioned inside or adjacent to the trigger). The spinner is a simple circle with a gap, rotating at 2 rotations/second.
2087 | 
2088 | **Type C: Long (> 3s)** — A loading indicator with either a progress bar (if progress is deterministic) or an activity bar (if not).
2089 | 
2090 | ## 33.2 Spinner Design
2091 | 
2092 | The AUDIAW loading spinner:
2093 | - Size: 16px (standard), 12px (small/compact contexts)
2094 | - Visual: a 16px circle with a 3px stroke, 60° arc gap
2095 | - Colors: the full circle is `rgba(255,255,255,0.15)`, the animated arc is `rgba(255,255,255,0.70)`
2096 | - Animation: 360° rotation, 500ms per rotation, linear easing (constant speed)
2097 | - CSS:
2098 |   ```css
2099 |   .spinner {
2100 |     width: 16px; height: 16px;
2101 |     border: 2px solid rgba(255,255,255,0.15);
2102 |     border-top-color: rgba(255,255,255,0.70);
2103 |     border-radius: 50%;
2104 |     animation: spin 500ms linear infinite;
2105 |   }
2106 |   @keyframes spin { to { transform: rotate(360deg); } }
2107 |   ```
2108 | 
2109 | ## 33.3 Progress Bar Design
2110 | 
2111 | Long loading operations (project open, export, plugin scan):
2112 | - Displayed in a non-blocking notification bar at the bottom of the canvas zone (above the status bar)
2113 | - Height: 32px
2114 | - Background: Level 4 surface
2115 | - Content: [spinner 14px] [operation name] [optional: "Item X of Y"] [progress bar]
2116 | - Progress bar: full-width (within notification bar), 2px height, positioned at very bottom of notification bar
2117 | - Progress bar fill: accent color, left-to-right
2118 | - Progress bar background: `rgba(255,255,255,0.10)`
2119 | - Indeterminate progress: a 40% wide bar that moves left-to-right in 1.2s loop (ease-in-out)
2120 | 
2121 | ## 33.4 Waveform Loading Placeholder
2122 | 
2123 | When a clip is visible but its waveform thumbnail is not yet loaded:
2124 | - The clip shows its standard visual structure (border, header, color)
2125 | - The waveform area shows a subtle horizontal line at the clip's vertical center (`rgba(255,255,255,0.12)`)
2126 | - No spinner — the loading is background and unobtrusive
2127 | - When the waveform is ready, it fades in over 120ms ease-out
2128 | 
2129 | ---
2130 | 
2131 | # 34. EMPTY STATES
2132 | 
2133 | ## 34.1 Empty Arrangement
2134 | 
2135 | When the arrangement view has no tracks:
2136 | - The track lane area shows the dot-grid background texture (section 7.3)
2137 | - Centered vertically in the canvas, a minimal empty state message:
2138 |   ```
2139 |   [Icon: music note, 32px, opacity 0.20]
2140 |   8px gap
2141 |   ["No tracks yet" — 13px Inter Medium, opacity 0.35]
2142 |   4px gap
2143 |   ["Press ⌘N to add a track, or choose a template." — 11px Inter Regular, opacity 0.25]
2144 |   ```
2145 | - No button in the empty state (the shortcut hint is sufficient)
2146 | 
2147 | ## 34.2 Empty Browser
2148 | 
2149 | When a browser location has no files:
2150 | - The file list area shows:
2151 |   ```
2152 |   [Icon: folder, 24px, opacity 0.20]
2153 |   8px gap
2154 |   ["No files found" — 12px Inter Medium, opacity 0.35]
2155 |   ```
2156 | 
2157 | When search returns no results:
2158 | - The file list area shows:
2159 |   ```
2160 |   [Icon: search, 20px, opacity 0.20]
2161 |   8px gap
2162 |   ["No results for '[query]'" — 12px Inter Medium, opacity 0.35]
2163 |   4px gap
2164 |   ["Try different keywords or remove filters." — 11px Inter Regular, opacity 0.25]
2165 |   ```
2166 | 
2167 | ## 34.3 Empty Plugin Chain
2168 | 
2169 | When a track has no devices in its chain (shown in the right panel):
2170 | - A single dashed-border add slot occupies the full width:
2171 |   - Height: 48px
2172 |   - Border: 1px dashed at `rgba(255,255,255,0.15)`
2173 |   - Border-radius: 6px
2174 |   - Content: [Icon: plus, 14px, opacity 0.30] ["Add Device" — 11px, opacity 0.30]
2175 |   - Hover: border becomes solid at `rgba(255,255,255,0.25)`, content brightens
2176 | 
2177 | ---
2178 | 
2179 | # 35. ERROR STATES
2180 | 
2181 | ## 35.1 Non-Critical Errors (Warnings)
2182 | 
2183 | Non-blocking warnings appear as notification banners above the status bar:
2184 | 
2185 | **Design:**
2186 | - Height: 32px
2187 | - Background: `rgba(245, 158, 11, 0.12)` (amber tint)
2188 | - Left border: 2px solid `#F59E0B`
2189 | - Content: [Icon: warning triangle, 14px, amber] [Message — 12px Inter Regular, opacity 0.80] [Dismiss button: × at right edge]
2190 | - Display duration: stays until dismissed (not auto-dismiss for warnings)
2191 | - Multiple warnings: stack vertically, newest on top, max 3 visible at once
2192 | 
2193 | ## 35.2 Critical Errors
2194 | 
2195 | Critical errors (plugin crash, audio device disconnect, autosave failure) use a higher-prominence banner:
2196 | 
2197 | **Design:**
2198 | - Height: 40px
2199 | - Background: `rgba(239, 68, 68, 0.12)` (red tint)
2200 | - Left border: 2px solid `#EF4444`
2201 | - Content: [Icon: alert circle, 14px, red] [Message — 12px Inter Medium, opacity 0.90] [Action button: "Resolve"] [Dismiss button: ×]
2202 | - The "Resolve" button is an accent-colored small button (described in Section 68)
2203 | - Never auto-dismissed
2204 | 
2205 | ## 35.3 Input Validation Errors
2206 | 
2207 | For form inputs with invalid values (e.g., BPM outside 20–999 range):
2208 | - The input field's bottom border turns red (`#EF4444`)
2209 | - Below the input, an error message appears: 10px Inter Regular, red, 2px below input
2210 | - Error message appears within 200ms of the invalid input
2211 | - Error disappears immediately when the value becomes valid
2212 | 
2213 | ## 35.4 Missing Asset Error (Clip)
2214 | 
2215 | When an audio asset referenced by a clip cannot be found:
2216 | - The clip shows with a red-tinted overlay at 15% opacity over its waveform area
2217 | - The waveform is replaced by a centered icon: missing file icon, 14px, opacity 0.50
2218 | - The clip header shows a small warning indicator (! triangle, 10px, amber)
2219 | - The clip tooltip on hover says: "Audio file not found: [filename]. Right-click to locate."
2220 | 
2221 | ---
2222 | 
2223 | # 36. CRASH RECOVERY UX
2224 | 
2225 | ## 36.1 Crash Detection at Next Launch
2226 | 
2227 | If AUDIAW detects a crash indicator on startup (before Phase 2 of startup):
2228 | 
2229 | **A recovery dialog appears after Phase 4 (interface is visible):**
2230 | 
2231 | The dialog is a centered modal:
2232 | - Width: 480px
2233 | - Background: Level 4 surface
2234 | - Border-radius: 8px
2235 | - Shadow: `0 24px 80px rgba(0,0,0,0.8)`
2236 | - Internal padding: 32px
2237 | 
2238 | **Content:**
2239 | ```
2240 | [Icon: alert circle, 24px, amber]
2241 | 16px gap
2242 | ["AUDIAW exited unexpectedly" — 16px Inter Semibold]
2243 | 8px gap
2244 | ["An autosave was found from [time]. Would you like to restore it?"
2245 |  — 13px Inter Regular, opacity 0.65]
2246 | 24px gap
2247 | [Restore Autosave button — primary, full width]
2248 | 8px gap
2249 | [Open last saved version — secondary, full width]
2250 | 8px gap
2251 | [Start fresh — tertiary text button, full width, lower opacity]
2252 | 16px gap
2253 | [Separator]
2254 | 8px gap
2255 | ["Submit anonymous crash report" — 11px, checkbox left, opacity 0.50]
2256 | ```
2257 | 
2258 | Checkboxes: 16×16px, accent-colored check when checked, standard border when unchecked.
2259 | 
2260 | ## 36.2 UI Crash During Audio Playback
2261 | 
2262 | If the UI (WebView) crashes while the audio engine continues:
2263 | 
2264 | - Audio continues without interruption (audio engine is isolated)
2265 | - The window shows a simplified recovery UI (rendered via a fallback HTML page):
2266 | 
2267 | ```
2268 | Level 1 surface background, centered content:
2269 | 
2270 | [AUDIAW wordmark — 20px]
2271 | 16px
2272 | ["The interface encountered an error." — 13px, opacity 0.65]
2273 | 8px
2274 | ["Audio is still playing." — 13px, opacity 0.90, accent-colored]
2275 | 24px
2276 | [Reload Interface — primary button]
2277 | ```
2278 | 
2279 | The "Reload Interface" button reloads the WebView without restarting the audio engine. Target: interface restores to pre-crash state within 3 seconds.
2280 | 
2281 | ---
2282 | 
2283 | # 37. PROJECT RECOVERY UX
2284 | 
2285 | ## 37.1 Missing File Resolution
2286 | 
2287 | When a project has missing audio files, and the user chooses to proceed:
2288 | 
2289 | **Missing files panel:**
2290 | A banner above the arrangement (not a modal — the user can still work):
2291 | - Height: 40px
2292 | - Background: amber tint (same as non-critical error style)
2293 | - Content: "N audio files missing. [Locate Files]"
2294 | - "Locate Files" opens the resolution dialog
2295 | 
2296 | **Resolution dialog:**
2297 | - Width: 600px, max-height: 80vh, scrollable
2298 | - A list of missing files, each with:
2299 |   - Filename (12px Inter Medium)
2300 |   - Last known path (10px Geist Mono, opacity 0.45, truncated)
2301 |   - "[Browse…]" button (small, secondary)
2302 |   - "[Search folder…]" button (small, secondary)
2303 |   - Status: "[Found]" in green or "[Missing]" in amber
2304 | - Primary button: "Apply and Close"
2305 | - Secondary button: "Skip All (play silence)"
2306 | 
2307 | ## 37.2 Version Incompatibility
2308 | 
2309 | If a project file was created in a newer version of AUDIAW than currently installed:
2310 | 
2311 | **Version warning dialog:**
2312 | - Width: 440px
2313 | - Content: "[Warning icon] This project was created in AUDIAW [newer version]. Some features may not be available. [Continue] [Cancel]"
2314 | - Continue proceeds with partial compatibility (features from the newer version are silently omitted)
2315 | 
2316 | ---
2317 | 
2318 | # 38. TIMELINE UX
2319 | 
2320 | ## 38.1 Ruler Design
2321 | 
2322 | The timeline ruler sits at the top of the arrangement canvas, 28px tall:
2323 | 
2324 | **Ruler background:** Level 2 surface, `#1A1A21`  
2325 | **Ruler bottom border:** 1px structural border  
2326 | **Ruler text:** Geist Mono, 10px, `rgba(255,255,255,0.45)`, letter-spacing 0.04em
2327 | 
2328 | **Ruler grid levels (zoom-dependent):**
2329 | 
2330 | At all zoom levels, the ruler shows:
2331 | - **Primary markers:** Every 1 bar. Line height: 12px (from ruler bottom). Label: bar number.
2332 | - **Secondary markers:** Every beat within a bar. Line height: 8px. Label: none.
2333 | - **Tertiary markers:** Every sub-beat (1/8th or 1/16th depending on zoom). Line height: 4px. No label.
2334 | 
2335 | At high zoom (> 800% / 1 pixel = 1 sample range):
2336 | - Shows individual samples
2337 | - Ruler switches to show time in milliseconds (Geist Mono, 9px)
2338 | 
2339 | **Ruler label visibility rules:**
2340 | - Labels only appear if they have at least 40px of horizontal space (prevents label overlap)
2341 | - If bar labels would crowd, every Nth bar is labeled (N = 2, 4, 8 depending on space available)
2342 | 
2343 | ## 38.2 Grid Line Design
2344 | 
2345 | The timeline grid lines extend vertically through all track lanes:
2346 | 
2347 | ```
2348 | Bar lines (beat 1 of each bar):
2349 |   color: rgba(255, 255, 255, 0.10)
2350 |   width: 1px
2351 | 
2352 | Beat lines (beats 2, 3, 4 of each bar):
2353 |   color: rgba(255, 255, 255, 0.05)
2354 |   width: 1px
2355 | 
2356 | Sub-beat lines (1/8th notes):
2357 |   color: rgba(255, 255, 255, 0.03)
2358 |   width: 1px
2359 |   Visible only when horizontal zoom is sufficient (≥ 24px per beat)
2360 | 
2361 | 16th note lines:
2362 |   color: rgba(255, 255, 255, 0.02)
2363 |   width: 1px
2364 |   Visible only when horizontal zoom is sufficient (≥ 48px per beat)
2365 | ```
2366 | 
2367 | **Grid line performance:** Grid lines are rendered on the GPU canvas layer, not in the DOM. They are computed once per zoom level and cached. Scrolling is achieved by shifting the GPU canvas position, not re-rendering the lines.
2368 | 
2369 | ## 38.3 Playhead Design
2370 | 
2371 | The playhead is a vertical indicator showing the current transport position:
2372 | 
2373 | ```
2374 | Playhead line:
2375 |   width: 1px
2376 |   color: rgba(255, 255, 255, 0.70)
2377 |   extends full height of arrangement canvas
2378 | 
2379 | Playhead head (triangle above ruler):
2380 |   shape: downward-pointing triangle
2381 |   size: 10px wide, 8px tall
2382 |   fill: accent color (default: #3B8BF5)
2383 |   positioned: top of ruler, centered on playhead line
2384 | 
2385 | Playhead line rendering:
2386 |   GPU-rendered, not DOM
2387 |   Position updates at 60fps during playback
2388 |   No transition (instant position = exact playback position)
2389 | ```
2390 | 
2391 | **Playhead during recording:**
2392 | ```
2393 | Playhead line: color: rgba(239, 68, 68, 0.70)  /* Red */
2394 | Playhead head fill: #EF4444                      /* Red */
2395 | ```
2396 | 
2397 | ## 38.4 Loop Region
2398 | 
2399 | The loop region is a semi-transparent overlay on the timeline:
2400 | 
2401 | ```
2402 | Loop region fill:
2403 |   color: accent color at 10% opacity: rgba(59, 139, 245, 0.10)
2404 |   extends full height of arrangement canvas
2405 | 
2406 | Loop region borders (left and right):
2407 |   color: accent color at 50% opacity
2408 |   width: 1px
2409 | 
2410 | Loop region start/end handles:
2411 |   Visible on hover of the ruler
2412 |   size: 6px wide, 20px tall (in ruler area)
2413 |   fill: accent color
2414 |   Draggable: left handle sets loop start, right handle sets loop end
2415 |   Cursor: col-resize
2416 | ```
2417 | 
2418 | ## 38.5 Track Lane Design
2419 | 
2420 | Each track lane is a horizontal strip corresponding to a track:
2421 | 
2422 | **Track lane structure:**
2423 | ```
2424 | Track header (left, fixed width 216px):
2425 |   Background: Level 2 surface
2426 |   Right border: 1px structural border
2427 | 
2428 | Track content area (right, flexible width):
2429 |   Background: alternating between two values:
2430 |     Odd tracks:  #111115 (Level 1)
2431 |     Even tracks: rgba(255,255,255,0.012) above Level 1
2432 |   
2433 |   The alternation is subtle — just enough to separate adjacent tracks visually.
2434 |   
2435 |   Bottom border (between tracks): 1px at rgba(255,255,255,0.05)
2436 | ```
2437 | 
2438 | **Track lane hover state:**
2439 | When the cursor is over a track lane (not a clip):
2440 | - The cursor changes to `crosshair` (indicating: click here to draw a new clip)
2441 | - No visual change to the lane background (too noisy for a view that users hover over constantly)
2442 | 
2443 | **Empty lane click:**
2444 | - Click in empty track lane: places the playhead at the clicked position
2445 | - Alt+click in empty track lane: creates a new clip starting at the clicked position (in the current tool mode)
2446 | 
2447 | ## 38.6 Clip Design — Complete Specification
2448 | 
2449 | **Audio Clip:**
2450 | 
2451 | ```
2452 | Container:
2453 |   background: track_color at 14% opacity
2454 |   border: 1px solid track_color at 35% opacity
2455 |   border-radius: 3px (top corners only, bottom corners 0px)
2456 |   min-width: 4px (even very short clips are visible)
2457 | 
2458 | Header bar:
2459 |   height: 16px
2460 |   background: track_color at 28% opacity
2461 |   border-bottom: 1px solid track_color at 20% opacity
2462 |   border-radius: 3px 3px 0 0 (matching top of container)
2463 | 
2464 | Clip name (in header bar):
2465 |   font: 11px Inter Medium
2466 |   color: rgba(255,255,255,0.80)
2467 |   position: left edge + 6px padding
2468 |   max-width: clip width - 12px
2469 |   overflow: hidden, ellipsis
2470 |   line-height: 16px (vertically centered in header)
2471 | 
2472 | Waveform area:
2473 |   position: below header bar
2474 |   fills remaining clip height
2475 |   rendered via WGPU (GPU canvas, not DOM)
2476 |   waveform fill: track_color at 40% opacity
2477 |   waveform outline (peak): track_color at 70% opacity
2478 |   waveform background: transparent
2479 | 
2480 | Loop indicator (when loop is enabled):
2481 |   A circular arrow icon (10px) at top-right of header bar
2482 |   color: rgba(255,255,255,0.50)
2483 |   right-padding: 6px
2484 | 
2485 | Fade-in indicator (when fade-in > 0):
2486 |   A triangular shaded region at the left of the waveform area
2487 |   fill: Level 1 surface color, fading from 100% at left to 0% at fade end
2488 | 
2489 | Fade-out indicator (when fade-out > 0):
2490 |   A triangular shaded region at the right of the waveform area
2491 |   fill: Level 1 surface color, fading from 0% at fade start to 100% at right
2492 | ```
2493 | 
2494 | **Selected audio clip (additional styles applied):**
2495 | ```
2496 | border: 1.5px solid accent_color at 80% opacity
2497 | header bar: track_color at 40% opacity (slightly brighter)
2498 | ```
2499 | 
2500 | **MIDI Clip:**
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs
package.json,pnpm-workspace.yaml,.gitignore,src-tauri/Cargo.toml,src-tauri/build.rs,index.html,vite.config.ts,app-icon.png.svg,src-tauri/tauri.conf.json,src/index.css,DOCS/V0.5_TECHNICAL_SPECIFICATION.md,crates/audiaw-project/Cargo.toml,tsconfig.json,tsconfig.node.json,tailwind.config.js,postcss.config.js,SETUP.md,VERIFICATION.md,src/styles/theme.ts,src/styles/animations.css

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T22:19:01.275Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.47

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<read_file>
<args>
  <file>
    <path>DOCS/AUDIAW-DESIGN.md</path>
    <line_range>2501-3000</line_range>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 'DOCS/AUDIAW-DESIGN.md'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>DOCS/AUDIAW-DESIGN.md</path>
<content lines="2501-3000">
2501 | ```
2502 | Container: same as audio clip
2503 | Header bar: same as audio clip
2504 | 
2505 | MIDI note preview (in body):
2506 |   Each MIDI note is a horizontal bar
2507 |   Height: proportional to full pitch range in the clip
2508 |   color: track_color at 70% opacity
2509 |   min-height: 2px (very short notes still visible)
2510 |   no border on individual notes (too small)
2511 |   rendered via WGPU
2512 | ```
2513 | 
2514 | ## 38.7 Zoom System
2515 | 
2516 | **Horizontal zoom:**
2517 | - Range: 1px = 4 bars (minimum zoom, full overview) → 1px = 1 sample (maximum zoom)
2518 | - Control: Ctrl + Mouse Wheel (centered on cursor position)
2519 | - Keyboard: Ctrl+] to zoom in, Ctrl+[ to zoom out, both centered on playhead
2520 | - Ctrl+0: fit project to window (show full project length)
2521 | - Ctrl+1: zoom to current selection
2522 | 
2523 | **Zoom animation:** No animation. Waveforms and content update at the next GPU frame. The goal is 0-perceived-latency zoom response.
2524 | 
2525 | **Zoom indicator:** In the status bar: current zoom level expressed as "1 bar = Xpx" or "Xbars visible". 10px Geist Mono, opacity 0.45.
2526 | 
2527 | ## 38.8 Mini Timeline (Overview Bar)
2528 | 
2529 | A compact overview of the full project at the bottom of the arrangement canvas, above the status bar (or at the bottom of the arrangement zone):
2530 | 
2531 | - Height: 32px
2532 | - Full width of canvas zone
2533 | - Shows: all tracks compressed to colored strips, the current viewport indicator, the playhead position
2534 | - Background: Level 2 surface
2535 | - Top border: 1px structural border
2536 | 
2537 | **Viewport indicator:**
2538 | - A translucent filled rectangle showing the currently visible portion
2539 | - fill: `rgba(255,255,255,0.06)`
2540 | - Border: 1px at `rgba(255,255,255,0.20)`
2541 | - Draggable: click and drag to scroll the viewport
2542 | 
2543 | **Track strip (per track):**
2544 | - Height: 4px, stacked vertically (8 tracks = 32px total, limited to mini timeline height)
2545 | - Color: track color at 60% opacity
2546 | - No waveform detail at this zoom level
2547 | 
2548 | **Clicking on mini timeline (outside viewport indicator):**
2549 | - Moves viewport to center on clicked position (instant, no animation)
2550 | 
2551 | ---
2552 | 
2553 | # 39. MIXER UX
2554 | 
2555 | ## 39.1 Mixer View Layout
2556 | 
2557 | The mixer is a horizontal scrolling channel strip view. Its layout:
2558 | 
2559 | ```
2560 | [Master Channel — always leftmost after Groups]
2561 | [Group Channels — sorted by creation order]
2562 | [Track Channels — sorted by arrangement order]
2563 | [Return Channels — always rightmost]
2564 | ```
2565 | 
2566 | The channel strip order cannot be rearranged by the user (it follows the track order from the arrangement). Users navigate it by scrolling horizontally or by using the filter controls at the top.
2567 | 
2568 | **Mixer header bar (above channel strips):**
2569 | - Height: 36px
2570 | - Background: Level 2 surface
2571 | - Bottom border: 1px structural border
2572 | - Content: [Filter: All / Tracks / Groups / Returns] [Search tracks: input field] [Channel width selector: Compact / Standard / Wide]
2573 | 
2574 | ## 39.2 Mixer Scroll Behavior
2575 | 
2576 | **Horizontal scroll:** Mouse wheel (no modifier) scrolls the mixer channel strip list horizontally when the mixer has focus.  
2577 | **Horizontal scroll speed:** 1 scroll unit = 1 channel strip width  
2578 | **Track search:** When a search term is entered in the mixer header search field, channels not matching are dimmed to 20% opacity but remain in position (they are not removed). This preserves spatial memory while communicating the filter.
2579 | 
2580 | ## 39.3 Master Channel Design
2581 | 
2582 | The master channel is always the leftmost visible channel (before groups). It is distinguished by:
2583 | - Slightly wider: 88px (vs standard 72px)
2584 | - Header label: "MASTER" in 9px Inter Medium, uppercase, letter-spacing 0.10em, opacity 0.50
2585 | - A gold/amber accent strip: 2px left border in `rgba(245, 158, 11, 0.40)` (subtle, not prominent)
2586 | - Limiter slot: at the very top of the insert chain area, labeled "LIMIT" — the master limiter is always present and cannot be removed
2587 | 
2588 | ---
2589 | 
2590 | # 40. CHANNEL STRIP UX
2591 | 
2592 | ## 40.1 Channel Strip — Complete Specification
2593 | 
2594 | **Standard channel strip width:** 72px  
2595 | **Channel strip height:** fills the mixer view height minus the header bar  
2596 | **Channel strip background:** Level 2 surface (`#1A1A21`)  
2597 | **Channel strip right border:** 1px structural border  
2598 | 
2599 | **Internal layout (top to bottom):**
2600 | 
2601 | ```
2602 | [Plugin Insert Slots Area — variable height, min 0 (no plugins), max 6 slots]
2603 |   Each slot: 72px wide, 22px tall
2604 |   Empty slot: dashed border, + icon, label "ADD"
2605 |   Loaded slot: plugin name (10px Geist Mono, truncated), power button, remove button
2606 | 
2607 | [Send Slots Area — variable height, min 0, shows if sends exist]
2608 |   Each slot: 72px wide, 20px tall
2609 |   Content: send destination label (left) + amount knob (right, 16px diameter)
2610 | 
2611 | [Pan Control — 28px height area]
2612 |   Knob: 20px diameter, centered horizontally
2613 |   Center detent line: visible as 1px white line at top of knob at 50% opacity
2614 |   Label: none (position communicates function)
2615 | 
2616 | [Fader Area — remaining height, minimum 100px]
2617 |   Fader track: 4px wide, full height of fader area, centered horizontally
2618 |   Fader track color: rgba(255,255,255,0.12)
2619 |   Fader cap: 32px wide, 14px tall, rounded rect (4px radius)
2620 |   Fader cap color: rgba(255,255,255,0.25) at rest, rgba(255,255,255,0.40) on hover
2621 |   Unity mark: horizontal 20px line across fader track at 0dB position, rgba(255,255,255,0.25)
2622 | 
2623 | [Level Meter Area — 12px wide, sits to the right of the fader, same height]
2624 |   Two 4px wide bars (L and R), 2px gap between them, 2px right margin
2625 |   Meter background: #131318
2626 |   Meter fill: gradient (green → amber → red per spec in section 16.1)
2627 |   Peak hold: a 1px white line at the peak position, decays after 2 seconds
2628 | 
2629 | [Fader Value — 14px height area]
2630 |   Value: 11px Geist Mono, centered, opacity 0.70
2631 |   Format: "+0.0 dB" for 0dB, "-12.0 dB" for -12dB, "-∞" for -infinity
2632 | 
2633 | [MuteButton SoloButton ArmButton — 22px height row]
2634 |   Three buttons, each 24×22px, centered in their third of the 72px width
2635 |   M button: "M" label, 10px Inter Medium, letter-spacing 0.06em
2636 |   S button: "S" label
2637 |   R button: "R" label
2638 | 
2639 | [Track Name — 20px height area]
2640 |   Track name: 10px Inter Medium, centered, opacity 0.70, truncated with ellipsis
2641 |   Background: the track color at 20% opacity (the only color in the strip)
2642 | ```
2643 | 
2644 | ## 40.2 Channel Strip Hover Behavior
2645 | 
2646 | On hover (cursor enters the channel strip):
2647 | - Background lightens: Level 2 → Level 3 surface (60ms ease-out)
2648 | - The plugin insert + slot becomes more prominent: dashed border brightens
2649 | - A grab cursor appears at the top 8px area (for reordering — future feature)
2650 | 
2651 | ---
2652 | 
2653 | # 41. PIANO ROLL UX
2654 | 
2655 | ## 41.1 Piano Roll Layout
2656 | 
2657 | ```
2658 | ┌─────────────────────────────────────────────────────────────────────┐
2659 | │  TOOLBAR (28px)                                                      │
2660 | ├───────────┬─────────────────────────────────────────────────────────┤
2661 | │ PIANO KEY │           NOTE GRID                                      │
2662 | │ AREA      │                                                          │
2663 | │ 80px wide │     (WGPU-rendered, GPU canvas)                          │
2664 | │           │                                                          │
2665 | │           │                                                          │
2666 | ├───────────┴─────────────────────────────────────────────────────────┤
2667 | │  VELOCITY EDITOR (80px height)                                       │
2668 | └─────────────────────────────────────────────────────────────────────┘
2669 | ```
2670 | 
2671 | ## 41.2 Piano Key Area Design
2672 | 
2673 | **Width:** 80px (fixed)  
2674 | **Background:** Level 2 surface  
2675 | **Right border:** 1px structural border
2676 | 
2677 | **White keys:**
2678 | - Background: `rgba(255,255,255,0.10)`
2679 | - Height: calculated from view height / number of visible octaves / 7 (white keys per octave)
2680 | - Bottom border: 1px at `rgba(255,255,255,0.06)`
2681 | - Label: note name on C notes only (e.g., "C3"), 9px Geist Mono, opacity 0.40, right-aligned, 4px right padding
2682 | - Hover: `rgba(255,255,255,0.18)`
2683 | - Active (MIDI input playing): `rgba(255,255,255,0.30)`, transitions with 40ms ease-out
2684 | 
2685 | **Black keys:**
2686 | - Background: Level 1 surface (`#111115`)
2687 | - Width: 52px (65% of white key width)
2688 | - Border: 1px at `rgba(255,255,255,0.12)`
2689 | - Hover: `rgba(255,255,255,0.08)`
2690 | - Active: `rgba(255,255,255,0.20)`
2691 | 
2692 | **Scale highlighting:**
2693 | When a scale is active, non-scale notes (both black and white keys) are slightly dimmed:
2694 | - Non-scale white keys: background `rgba(255,255,255,0.06)` (dimmer)
2695 | - Non-scale black keys: same as standard (they're already dark)
2696 | - Scale highlight indicator: a thin 2px left border on all scale white keys in the accent color at 50% opacity
2697 | 
2698 | ## 41.3 Note Grid Design
2699 | 
2700 | The note grid is GPU-rendered (WGPU canvas, covers the note content area):
2701 | 
2702 | **Background:** Level 1 surface  
2703 | **Horizontal grid (pitch rows):**
2704 | - White note rows: no background modification
2705 | - Black note rows: `rgba(0,0,0,0.25)` overlay (darker stripe to distinguish black note lanes)
2706 | 
2707 | **Vertical grid (time):**
2708 | - Same grid structure as the arrangement timeline (bar, beat, sub-beat lines)
2709 | - Same opacity values as the arrangement grid
2710 | 
2711 | **MIDI Note Design:**
2712 | ```
2713 | Fill: track color at 70% opacity
2714 | Border: track color at full opacity, 1px
2715 | Border-radius: 2px
2716 | Min-width: 4px (16px if note is selected — selection increases min-width)
2717 | Height: proportional to note occupying its pitch row, with 1px margin top and bottom
2718 | 
2719 | Selected note:
2720 |   Fill: track color at 90% opacity
2721 |   Border: accent color, 1.5px
2722 |   A small drag handle appears at the right edge (4px wide)
2723 | ```
2724 | 
2725 | ## 41.4 Velocity Editor Design
2726 | 
2727 | **Height:** 80px  
2728 | **Background:** Level 2 surface  
2729 | **Top border:** 1px structural border
2730 | 
2731 | **Velocity bars:**
2732 | - One bar per note, aligned with the note's horizontal position
2733 | - Width: matches note width (minimum 2px)
2734 | - Height: proportional to velocity (127 = full height, 0 = no height)
2735 | - Fill: track color gradient (bottom = track color at 40%, top = track color at 90%)
2736 | - Selected bar (corresponding note is selected): fill shifts to accent color gradient
2737 | 
2738 | **Velocity editing:**
2739 | - Click and drag on a bar: changes velocity (drag up = increase, down = decrease)
2740 | - Drag across multiple bars: applies the drag direction proportionally to all dragged bars
2741 | - Right-click bar: shows mini-menu with velocity presets (32 / 64 / 96 / 127 / Custom)
2742 | 
2743 | ---
2744 | 
2745 | # 42. AUTOMATION UX
2746 | 
2747 | ## 42.1 Automation Lane Design
2748 | 
2749 | Automation lanes are revealed below each track in the arrangement view. Each lane shows one automated parameter:
2750 | 
2751 | **Lane reveal trigger:** Click the triangle/arrow expand control in the track header, or press `A` when a track is selected.
2752 | 
2753 | **Lane layout:**
2754 | ```
2755 | Lane header (left, same width as track header 216px):
2756 |   Height: same as track height setting (min 32px for automation lanes)
2757 |   Background: Level 2 surface, with a 2px left border in the automation lane color
2758 |   Content: [Parameter name — 11px Inter Medium] [Value indicator — current value, 10px Geist Mono]
2759 |   Right-click on lane header: shows parameter selection menu
2760 | 
2761 | Lane content (right, full canvas width):
2762 |   Background: slightly transparent overlay on the track lane beneath: rgba(0,0,0,0.15)
2763 |   The automation curve is drawn in the lane content area
2764 | ```
2765 | 
2766 | ## 42.2 Automation Curve Design
2767 | 
2768 | ```
2769 | Automation curve line:
2770 |   color: automation lane color (each parameter gets a distinct color from the track palette)
2771 |   weight: 1.5px
2772 |   no anti-aliasing artifacts (GPU rendered)
2773 | 
2774 | Automation breakpoints (control points):
2775 |   Shape: circle, 6px diameter
2776 |   Fill: automation lane color
2777 |   Border: 1px white border
2778 |   Hover: diameter increases to 8px in 60ms ease-out
2779 | 
2780 | Automation segments between breakpoints:
2781 |   Linear: straight line
2782 |   Smooth: cubic bezier curve with control handles visible on hover of the breakpoints
2783 |   Step: horizontal line then instant vertical jump at next point
2784 | 
2785 | Value fill (below the curve, above zero):
2786 |   automation lane color at 12% opacity
2787 |   helps visually communicate the shape of the automation
2788 | ```
2789 | 
2790 | ## 42.3 Automation Editing Interactions
2791 | 
2792 | **Pencil tool in automation lane:**
2793 | - Click: creates a new breakpoint at the click position
2794 | - Click and drag: draws a series of breakpoints (continuous curve drawing)
2795 | - Drag an existing breakpoint: moves it
2796 | - Alt+drag a segment: adjusts the curve shape (tension) for smooth segments
2797 | 
2798 | **Select tool in automation lane:**
2799 | - Click breakpoint: selects it (highlighted in accent color)
2800 | - Rubber-band drag: selects multiple breakpoints
2801 | - Delete: deletes selected breakpoints
2802 | - Arrow keys: nudge selected breakpoints by the current time grid unit (horizontal) or 1% of parameter range (vertical)
2803 | 
2804 | **Right-click on automation segment:**
2805 | - Context menu: "Linear", "Smooth", "Step" — changes interpolation for that segment
2806 | 
2807 | ---
2808 | 
2809 | # 43. AUDIO ROUTING UX
2810 | 
2811 | ## 43.1 Routing Visualization
2812 | 
2813 | The routing view is accessible from the right panel (Device View) when viewing send/return routing. It shows:
2814 | 
2815 | **Send slot (in channel strip or device view):**
2816 | - Each send is a row: [destination track name, truncated] [level knob, 20px] [pre/post fader toggle]
2817 | - Level knob shows the send amount (0 = silent, 100% = unity)
2818 | - The destination track name uses the destination track's color as a 2px left border
2819 | 
2820 | **Visual routing indicator:**
2821 | - When hovering a send slot, a dashed line appears connecting the channel strip (in the mixer view) to the return channel. This connection indicator:
2822 |   - Width: 1px dashed, dash: 4px on, 4px off
2823 |   - Color: accent color at 50% opacity
2824 |   - Animates: the dash pattern scrolls at 2px/second in the direction of signal flow
2825 | 
2826 | ---
2827 | 
2828 | # 44. PLUGIN BROWSER UX
2829 | 
2830 | ## 44.1 Plugin Browser Layout
2831 | 
2832 | Within the Browser panel (left zone), the Plugins tab:
2833 | 
2834 | ```
2835 | [Search field — full width minus padding]
2836 | 8px gap
2837 | [Filter row: All | Instruments | Effects | MIDI | Format: All | VST3 | CLAP | AU | LV2]
2838 | 8px gap
2839 | [Plugin list — full remaining height, scrollable]
2840 | ```
2841 | 
2842 | ## 44.2 Plugin List Item Design
2843 | 
2844 | Each plugin in the list:
2845 | - Height: 40px
2846 | - Padding: 0 12px
2847 | - Content (left to right):
2848 |   - Format badge: 24×16px, 3px border-radius, background at 15% opacity of status color, label: "VST3" / "CLAP" / "AU" / "LV2" in 8px uppercase, letter-spacing 0.08em
2849 |   - 8px gap
2850 |   - Plugin name: 12px Inter Medium, opacity 0.85
2851 |   - Category (right-aligned): 10px Inter Regular, opacity 0.40 (e.g., "Synth", "Reverb", "EQ")
2852 | - Hover: background Level 3 surface, 60ms ease-out
2853 | - Double-click: loads plugin onto the selected track (or last focused track)
2854 | - Drag: drag the plugin from the browser to a track or device chain slot
2855 | 
2856 | **Crashed/invalid plugins:**
2857 | - A warning icon (12px, amber) appears after the plugin name
2858 | - Tooltip on hover: "This plugin failed validation. [View details]"
2859 | - These plugins are still shown (users may want to troubleshoot) but visually de-emphasized: name opacity 0.45
2860 | 
2861 | ## 44.3 Plugin Preview
2862 | 
2863 | When a plugin is selected in the browser (single click), the right panel (if open and on "Device View") shows:
2864 | - Plugin name: 14px Inter Semibold
2865 | - Vendor: 11px, opacity 0.45
2866 | - Format + version
2867 | - Category
2868 | - Number of presets (if known from scan)
2869 | - A "Load on track" button (full width, primary)
2870 | - A list of factory presets (if available from scan metadata)
2871 | 
2872 | ---
2873 | 
2874 | # 45. PLUGIN HOSTING UX
2875 | 
2876 | ## 45.1 Device Card Design (in Device Chain / Right Panel)
2877 | 
2878 | Each loaded plugin appears as a "Device Card" in the device chain view:
2879 | 
2880 | ```
2881 | Device card:
2882 |   Width: full panel width minus 32px (16px padding each side)
2883 |   Height: 48px (collapsed), expanded height variable (based on controls)
2884 |   Background: Level 3 surface
2885 |   Border: 1px interactive border
2886 |   Border-radius: 6px
2887 |   Margin-bottom: 4px
2888 | 
2889 | Device card header (always visible, 48px):
2890 |   Left 8px: collapse/expand triangle (8px, opacity 0.45)
2891 |   Left 24px: device type icon (14px)
2892 |   Left 44px: device name (12px Inter Medium, opacity 0.85)
2893 |   Right edge (from right): bypass toggle (16×16px power icon), drag handle (vertical dots, 16×12px)
2894 |   All controls: 8px right margin
2895 | ```
2896 | 
2897 | **Collapsed state:** Only the header is visible (48px)  
2898 | **Expanded state:** The header plus a compact parameter grid appears below
2899 | 
2900 | **Bypass state:**
2901 | - Bypass toggle (power icon): when bypassed, icon is `rgba(255,255,255,0.25)`, header background dims to Level 2 surface
2902 | - The device name shows: `rgba(255,255,255,0.35)` opacity (clearly inactive)
2903 | - A "BYPASS" label appears in 9px uppercase at the right of the device name
2904 | 
2905 | ## 45.2 Device Reordering
2906 | 
2907 | Devices in the chain are reorderable by dragging:
2908 | - Drag handle: vertical 3-dot grip (⋮⋮) at right edge of device card
2909 | - Drag activates: card lifts with a shadow (`0 8px 24px rgba(0,0,0,0.5)`) and scale `1.02`
2910 | - Drop target: a 2px accent line appears between cards where the dragged card will land
2911 | - Drop animation: card settles into new position with 150ms ease-spring (≤8% overshoot)
2912 | 
2913 | ---
2914 | 
2915 | # 46. PLUGIN SANDBOX UX
2916 | 
2917 | ## 46.1 Plugin Process Status Indicator
2918 | 
2919 | When a plugin runs in a sandboxed separate process, a subtle status indicator appears in the device card:
2920 | 
2921 | **Active (running normally):**
2922 | - A 4px green dot at the top-right corner of the device card
2923 | - Color: `#22C55E`, no animation
2924 | 
2925 | **Loading (plugin process starting):**
2926 | - A 4px amber dot, slowly pulsing (1s on/off cycle, opacity 0.3 → 1.0)
2927 | 
2928 | **Crashed:**
2929 | - A 4px red dot
2930 | - The device card's border changes to `rgba(239,68,68,0.40)`
2931 | - The device name shows a warning prefix: "⚠ [Plugin Name]"
2932 | - A "Relaunch" button appears below the device name in the card header
2933 | 
2934 | ## 46.2 Plugin Crash UX
2935 | 
2936 | When a plugin crashes during an active session:
2937 | 
2938 | **Step 1 (immediate, within 1 audio callback):** Audio continues — silence replaces the plugin output. The user hears a sudden silence on that channel.
2939 | 
2940 | **Step 2 (< 500ms later):** An error banner appears at the top of the canvas zone:
2941 | ```
2942 | [Red left border, 2px]
2943 | [Alert icon, 14px, red]
2944 | "[Plugin Name] crashed on [Track Name]. Audio silenced."
2945 | [Relaunch] button — small, right-aligned
2946 | [✕] dismiss button — right edge
2947 | ```
2948 | 
2949 | **Step 3 (user action — Relaunch):**
2950 | - The plugin process restarts in the background
2951 | - The device card shows loading state (amber pulsing dot)
2952 | - When restarted, audio resumes from the last known plugin state
2953 | - The banner updates: "[Plugin Name] relaunched." — then auto-dismisses after 3 seconds
2954 | 
2955 | ---
2956 | 
2957 | # 47. COMMAND PALETTE UX
2958 | 
2959 | ## 47.1 Command Palette Design
2960 | 
2961 | The command palette overlays the center of the screen:
2962 | 
2963 | **Trigger:** `Ctrl+Shift+P` (Windows/Linux) / `Cmd+Shift+P` (macOS)
2964 | 
2965 | **Layout:**
2966 | - Width: 560px
2967 | - Max-height: 480px (scrollable if more results)
2968 | - Position: centered horizontally, positioned at 20% from top of window
2969 | - Background: Level 4 surface (`#2C2C39`)
2970 | - Border: 1px at `rgba(255,255,255,0.15)`
2971 | - Border-radius: 8px
2972 | - Shadow: `0 24px 80px rgba(0,0,0,0.80), 0 4px 16px rgba(0,0,0,0.50)`
2973 | - Backdrop: `rgba(0,0,0,0.40)` overlay on the rest of the UI (not blur — performance)
2974 | 
2975 | **Search input:**
2976 | - Height: 52px (larger than standard — this is the primary interaction point)
2977 | - Background: transparent (within the Level 4 surface)
2978 | - Border-bottom: 1px structural border
2979 | - Font: 15px Inter Regular, opacity 0.90
2980 | - Placeholder: "Search commands, settings, tracks…" — opacity 0.35
2981 | - Left padding: 16px
2982 | - Left icon: magnifying glass, 16px, opacity 0.35
2983 | - No border-radius (the palette surface provides the containing shape)
2984 | - Cursor: blinking text cursor at accent color, 2px wide
2985 | 
2986 | **Results list:**
2987 | - Each result: 40px height
2988 | - Left padding: 16px
2989 | - Content: [icon 14px] [8px gap] [command name 12px Inter Regular] [right-aligned: keyboard shortcut in 10px Geist Mono, opacity 0.35]
2990 | - Active/highlighted result: background `rgba(255,255,255,0.08)`, left border 2px accent color
2991 | - Result grouping: categories separated by a 1px structural border + category label (10px, uppercase, letter-spacing 0.10em, opacity 0.35, 4px padding)
2992 | 
2993 | **Empty results:**
2994 | - "No results" centered in the results area: 12px, opacity 0.35
2995 | 
2996 | **Keyboard navigation in palette:**
2997 | - Type to search (real-time filtering)
2998 | - Arrow Up/Down: navigate results
2999 | - Enter: execute highlighted command
3000 | - Escape: dismiss palette, return focus to previous element
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs
package.json,pnpm-workspace.yaml,.gitignore,src-tauri/Cargo.toml,src-tauri/build.rs,index.html,vite.config.ts,app-icon.png.svg,src-tauri/tauri.conf.json,src/index.css,DOCS/V0.5_TECHNICAL_SPECIFICATION.md,crates/audiaw-project/Cargo.toml,tsconfig.json,tsconfig.node.json,tailwind.config.js,postcss.config.js,SETUP.md,VERIFICATION.md,src/styles/theme.ts,src/styles/animations.css

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T22:19:05.891Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.62

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<read_file>
<args>
  <file>
    <path>DOCS/AUDIAW-DESIGN.md</path>
    <line_range>3001-3500</line_range>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 'DOCS/AUDIAW-DESIGN.md'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>DOCS/AUDIAW-DESIGN.md</path>
<content lines="3001-3500">
3001 | 
3002 | ---
3003 | 
3004 | # 48. SEARCH UX
3005 | 
3006 | ## 48.1 Universal Search Behavior
3007 | 
3008 | All search inputs in AUDIAW share these behavioral rules:
3009 | 
3010 | **Debounce:** Search executes 150ms after the last keypress. No search on every character.
3011 | 
3012 | **Minimum query length:** Search executes at 1 character for the browser (filenames). 2 characters for the command palette.
3013 | 
3014 | **Highlight:** Matched characters in results are highlighted:
3015 | - Background behind matched characters: `rgba(59, 139, 245, 0.20)` (accent at 20%)
3016 | - No bold or other treatment — only the background highlight
3017 | 
3018 | **Clear button:** Appears inside the search input at the right edge when input has content. Width: 20px, icon: × at 12px, opacity 0.45, opacity 0.80 on hover. Clicking clears the input and results.
3019 | 
3020 | **Loading during search:** For searches that query the database (browser search), the clear button becomes a 12px spinner while results are loading.
3021 | 
3022 | ---
3023 | 
3024 | # 49. FILE BROWSER UX
3025 | 
3026 | ## 49.1 Browser Panel Structure
3027 | 
3028 | The file browser occupies the Left Panel Zone and has four tabs:
3029 | 
3030 | | Tab | Icon | Content |
3031 | |---|---|---|
3032 | | Samples | Waveform icon | Audio files |
3033 | | Plugins | Puzzle piece | VST3/CLAP/AU/LV2 |
3034 | | Presets | Sliders icon | Plugin/instrument presets |
3035 | | Projects | Folder icon | Recent and located projects |
3036 | 
3037 | ## 49.2 Sample Browser Design
3038 | 
3039 | **Location tree (top section, ~30% of panel height):**
3040 | - A collapsible tree of sample locations
3041 | - Each location: folder icon + location name + (item count in dim text)
3042 | - Arrow to expand/collapse sub-folders
3043 | - "AUDIAW Library" and "User Library" are always present at the top, separated from user-added locations by a 1px separator
3044 | - Folder hover: background Level 3 surface
3045 | - Active (selected) folder: background Level 3 surface + 2px left accent border
3046 | 
3047 | **Sample list (bottom section, remaining height):**
3048 | - Sorted by: filename, date added, duration, BPM (user-selectable)
3049 | - Each item: 28px height
3050 |   - Left: play/pause button (14px triangle) — appears on hover
3051 |   - Left+: waveform mini-thumbnail (32px wide, full item height, rendered as tiny GPU waveform)
3052 |   - Middle: filename (11px Inter Regular, truncated with ellipsis)
3053 |   - Right: duration (9px Geist Mono, opacity 0.40)
3054 |   - Far right: favorite star (12px, visible on hover or when favorited)
3055 | 
3056 | **Preview player (bottom of browser panel, 40px):**
3057 | - Compact player for the currently previewing sample
3058 | - [◀◀] [▶/▌▌] [■] progress-bar ──●── time-display [🔁]
3059 | - Height: 40px, background Level 3 surface, top border structural border
3060 | 
3061 | ---
3062 | 
3063 | # 50. TRANSPORT CONTROLS
3064 | 
3065 | ## 50.1 Transport Bar Layout
3066 | 
3067 | The transport bar (52px height) is the always-visible top zone. Its internal layout:
3068 | 
3069 | ```
3070 | LEFT SECTION (left 33% of bar):
3071 |   [Rewind] [Play/Pause] [Stop] [Record]
3072 |   All buttons spaced 4px apart, left margin 16px
3073 | 
3074 | CENTER SECTION (center 34% of bar, centered):
3075 |   [Time Display] [BPM] [Time Signature] [Loop Toggle] [Metronome Toggle]
3076 |   These are the primary orientation controls
3077 | 
3078 | RIGHT SECTION (right 33% of bar):
3079 |   [Project Name (text)] [CPU meter] [Memory meter] [Workspace selector]
3080 |   Right margin 16px
3081 | ```
3082 | 
3083 | ## 50.2 Transport Button Specifications
3084 | 
3085 | **Play/Pause button (primary transport action):**
3086 | - Size: 36×36px
3087 | - Shape: circular (border-radius: 50%)
3088 | - Background at rest: `rgba(255,255,255,0.08)`
3089 | - Background on hover: `rgba(255,255,255,0.14)`
3090 | - Background when playing: accent color at full opacity (`#3B8BF5`)
3091 | - Icon: play triangle (14px) or pause bars (14px), white
3092 | - Border: 1px interactive border at rest, none when playing (the fill communicates the border)
3093 | 
3094 | **Stop button:**
3095 | - Size: 28×28px
3096 | - Shape: circular
3097 | - Background at rest: transparent
3098 | - Icon: stop square (10px, rounded 2px corners), white at 0.60 opacity
3099 | - Hover: background `rgba(255,255,255,0.08)`, icon opacity 0.80
3100 | 
3101 | **Record button:**
3102 | - Size: 28×28px
3103 | - Shape: circular
3104 | - Background at rest: transparent
3105 | - Icon: record circle (filled, 12px diameter), `#8B2020` (dim red, indicates armed state)
3106 | - When armed (not recording): background `rgba(139,32,32,0.15)`, icon red `#8B2020`
3107 | - When recording: background `#EF4444`, icon white, button pulses: opacity 0.9 → 1.0 → 0.9, 1s cycle
3108 | 
3109 | **Rewind button:**
3110 | - Size: 24×28px
3111 | - Shape: rounded rect (4px radius)
3112 | - Icon: rewind double-chevron (14px), opacity 0.60 at rest
3113 | - Hover: opacity 0.90
3114 | 
3115 | **Loop toggle:**
3116 | - Size: 28×28px
3117 | - Shape: rounded rect (4px radius)
3118 | - Icon: loop circular arrow (14px)
3119 | - Active: icon becomes accent color, background `rgba(59,139,245,0.15)`
3120 | - Inactive: icon `rgba(255,255,255,0.40)`
3121 | 
3122 | **Metronome toggle:**
3123 | - Size: 28×28px
3124 | - Same active/inactive style as loop toggle
3125 | - Icon: metronome shape (14px)
3126 | 
3127 | ## 50.3 Time Display (Dot-Matrix)
3128 | 
3129 | Position: center of transport bar, centered between BPM and the play buttons.
3130 | 
3131 | Display format: `001 . 01 . 001` (Bar . Beat . Tick)
3132 | 
3133 | ```
3134 | Primary time display:
3135 |   Font: 22px Geist Mono
3136 |   Spacing: 0.12em
3137 |   Color: rgba(255,255,255,0.90) when playing, 0.40 when stopped
3138 |   Dot separators: 4px smaller, opacity 0.30
3139 |   
3140 | Width: fixed at 220px regardless of content (prevents layout shift as numbers change)
3141 | Background: Level 1 surface (#111115)
3142 | Border: 1px structural border
3143 | Padding: 8px 12px
3144 | Border-radius: 4px
3145 | ```
3146 | 
3147 | **Click on time display:** Opens an inline edit field (same visual treatment, Geist Mono) where the user can type a bar/beat to jump to. Enter confirms, Escape cancels.
3148 | 
3149 | ## 50.4 BPM Display
3150 | 
3151 | ```
3152 | BPM display:
3153 |   Font: 18px Geist Mono
3154 |   Color: rgba(255,255,255,0.80)
3155 |   Width: 80px fixed
3156 |   Format: "140.00" (two decimal places for precision, even if it's a whole number)
3157 |   
3158 |   [↑] / [↓] nudge buttons: 14px tall each, appear on hover
3159 |   Click and drag vertically: changes BPM (drag up = faster, drag down = slower)
3160 |   Double-click: opens inline edit
3161 |   Shift+drag: 10× slower adjustment (for 0.01 BPM precision)
3162 | ```
3163 | 
3164 | ## 50.5 Time Signature Display
3165 | 
3166 | Adjacent to BPM:
3167 | ```
3168 | Format: "4/4" — two numbers separated by a slash
3169 | Numerator: 14px Geist Mono, opacity 0.80
3170 | Slash separator: opacity 0.30
3171 | Denominator: 14px Geist Mono, opacity 0.80
3172 | Width: 48px fixed
3173 | Click: opens a compact dropdown with common time signatures (4/4, 3/4, 6/8, 5/4, 7/8, Custom)
3174 | ```
3175 | 
3176 | ---
3177 | 
3178 | # 51. DSP VISUALIZATION
3179 | 
3180 | ## 51.1 Spectrum Analyzer
3181 | 
3182 | The spectrum analyzer is a panel-based component (appears in right panel or as a floating window):
3183 | 
3184 | **Visual specification:**
3185 | - Background: Level 1 surface
3186 | - Frequency range: 20 Hz – 20 kHz (logarithmic scale)
3187 | - Amplitude range: -90 dBFS to 0 dBFS
3188 | - Update rate: 30 fps (not 60 — spectrum doesn't require 60fps and this saves GPU time)
3189 | - FFT size: 4096 points (displayed as ~300-point binned spectrum for readability)
3190 | 
3191 | **Spectrum bar color:**
3192 | - A single gradient from bottom to top: accent color at bottom → accent color brighter at top
3193 | - No multi-color (keeps the display monochrome-adjacent)
3194 | - The bars are rendered as a filled area (not individual bars) — smoother appearance
3195 | 
3196 | **Grid lines:**
3197 | - Vertical: at 50Hz, 100Hz, 200Hz, 500Hz, 1kHz, 2kHz, 5kHz, 10kHz, 20kHz
3198 | - Horizontal: at -12dBFS, -24dBFS, -48dBFS, -72dBFS
3199 | - All grid lines: 1px, `rgba(255,255,255,0.05)`
3200 | - Labels: 9px Geist Mono, opacity 0.30
3201 | 
3202 | **Peak hold line:**
3203 | - 1px line at peak position per frequency bin
3204 | - Color: `rgba(255,255,255,0.45)`
3205 | - Hold: 2 seconds, then decays at 6dB/second
3206 | 
3207 | ## 51.2 LUFS Meter
3208 | 
3209 | The LUFS meter panel shows integrated, short-term, and momentary loudness:
3210 | 
3211 | **Layout (vertical, in right panel):**
3212 | ```
3213 | [Integrated LUFS value — 20px Geist Mono, centered]
3214 | [-14.2 LUFS I]
3215 | 8px
3216 | [Short-term — 14px Geist Mono]
3217 | [-12.8 LUFS S]
3218 | 8px
3219 | [Momentary — 14px Geist Mono]
3220 | [-10.2 LUFS M]
3221 | 8px
3222 | [True Peak — 14px Geist Mono, colored red if positive]
3223 | [-0.8 dBTP]
3224 | 16px
3225 | [Target line selector: -23 / -18 / -16 / -14 / Custom]
3226 | ```
3227 | 
3228 | **Color coding:**
3229 | - If Integrated LUFS is within 2 LUFS of target: value color = status green
3230 | - If 2–4 LUFS above target: status amber
3231 | - If > 4 LUFS above target: status red
3232 | - If below target: no special color (not a problem — can be addressed in mastering)
3233 | 
3234 | ---
3235 | 
3236 | # 52. WAVEFORM RENDERING
3237 | 
3238 | ## 52.1 GPU Rendering Architecture Impact on UX
3239 | 
3240 | Waveforms in AUDIAW are rendered via WGPU (not DOM/Canvas2D). This has specific UX implications:
3241 | 
3242 | **The waveform canvas is a separate layer** from the DOM UI. It is composited by the OS window manager. This means:
3243 | - Waveforms can update at 60fps without causing React re-renders
3244 | - Waveform data cannot overlap with DOM elements (DOM elements must never be positioned over the waveform canvas)
3245 | - The waveform canvas area has a defined z-index that DOM elements cannot exceed (except for popover layers, context menus, modals)
3246 | 
3247 | **Pixel-perfect clip boundaries:** Because waveforms are GPU-rendered, their edges must align exactly with the DOM-rendered clip borders. The clip border is rendered in DOM (1px), and the waveform begins exactly 1px inside the border. Any misalignment > 0.5px is a rendering bug.
3248 | 
3249 | ## 52.2 Waveform Visual Specification
3250 | 
3251 | **Waveform data representation:** Peak/RMS dual-display:
3252 | - Peak data: the absolute maximum sample value within each display pixel's time range
3253 | - RMS data: the root-mean-square value within the same time range
3254 | - Peak is rendered as the outer boundary of the waveform shape
3255 | - RMS is rendered as a filled inner region (lighter, indicating average energy)
3256 | 
3257 | ```
3258 | Waveform fill (RMS):
3259 |   Color: track color at 45% opacity
3260 |   This is the "body" of the waveform
3261 | 
3262 | Waveform outline (peak):
3263 |   Color: track color at 75% opacity
3264 |   1px line at the peak boundary
3265 | 
3266 | Selected waveform fill: track color at 65% opacity
3267 | Selected waveform outline: track color at 90% opacity
3268 | 
3269 | Centered axis line (zero crossing):
3270 |   Color: rgba(255,255,255,0.08)
3271 |   Width: 1px
3272 |   Horizontal, at vertical center of waveform area
3273 | ```
3274 | 
3275 | ## 52.3 Waveform Zoom Levels
3276 | 
3277 | | Zoom Level | Description | Rendering Source |
3278 | |---|---|---|
3279 | | Overview (< 1px per bar) | Full project overview in mini timeline | Mip level 4 (pre-computed) |
3280 | | Standard (1px = 1–16 beats) | Normal arrangement view | Mip level 2–3 |
3281 | | Detailed (1px = 1–4 beats) | Zoomed arrangement | Mip level 1–2 |
3282 | | Fine (1px = 1–8 beats) | Fine editing | Mip level 0–1 |
3283 | | Sample-level (1px < 1 beat) | Sample editing | Direct sample data |
3284 | 
3285 | Waveforms never visually "re-render" during zoom — the appropriate mip level is already in GPU memory. The transition between mip levels is instantaneous.
3286 | 
3287 | ## 52.4 Missing Waveform Placeholder
3288 | 
3289 | While a waveform is being computed (new recording, first project load before cache is warm):
3290 | - The clip body shows a center horizontal line: 1px at `rgba(255,255,255,0.15)`, the track color at 30% opacity fills above and below this line with 6px height total
3291 | - No spinner (too noisy in the arrangement view)
3292 | - Waveform fades in over 120ms ease-out when ready
3293 | 
3294 | ---
3295 | 
3296 | # 53. METERING SYSTEMS
3297 | 
3298 | ## 53.1 Level Meter Design
3299 | 
3300 | Level meters appear in: channel strips (mixer), track headers (tall mode), the transport bar (master output meters), and the standalone meter panel.
3301 | 
3302 | **Meter specification:**
3303 | 
3304 | ```
3305 | Meter bar width: 4px (standard), 3px (compact/narrow contexts)
3306 | Meter bar background: #131318
3307 | Meter bar height: full height of the containing area
3308 | 
3309 | Color gradient (applied as CSS linear-gradient, vertical):
3310 |   0% (top/0dBFS):     #FF0000 (clip — above 0dBFS: entire bar red)
3311 |   0%  to 12.5%:        #EF4444 (danger zone: 0 to -3 dBFS)
3312 |   12.5% to 37.5%:      Gradient: #EF4444 → #F59E0B (-3 to -12 dBFS)
3313 |   37.5% to 100%:       Gradient: #F59E0B → #22C55E (-12 to -∞ dBFS)
3314 | 
3315 | The gradient is fixed — the fill height represents the level.
3316 | Above 0dBFS (clip): the entire bar turns solid #FF0000
3317 | ```
3318 | 
3319 | **Peak hold line:**
3320 | - 1px horizontal line at peak position
3321 | - Color: the color at that dBFS level (inherits the gradient color at that position)
3322 | - Hold duration: 2000ms from peak
3323 | - Decay: after hold, drops at 6dB/second (visual)
3324 | - Clip hold: the clip indicator stays red until the user clicks it (or a configurable period)
3325 | 
3326 | **Stereo meters:** Two adjacent bars (L, R), 1px gap between them. No "L/R" labels — position conveys identity. For surround channels, labels are shown below at 8px.
3327 | 
3328 | **Update rate:** Meters update at 60fps during playback, 0fps when stopped (static at last value, decaying naturally).
3329 | 
3330 | ## 53.2 Master Output Meter (Transport Bar)
3331 | 
3332 | A compact stereo meter in the transport bar, right section:
3333 | 
3334 | - Two vertical bars, each 6px wide (wider than channel meters — they're more prominent)
3335 | - Height: 28px (fitting the 52px bar with 12px top/bottom margin)
3336 | - Positioned: to the left of the workspace selector
3337 | - Same color gradient as channel meters
3338 | - A "MASTER" label below in 8px, uppercase, opacity 0.30
3339 | 
3340 | ---
3341 | 
3342 | # 54. GPU RENDERING CONSIDERATIONS
3343 | 
3344 | ## 54.1 What is GPU-Rendered vs DOM-Rendered
3345 | 
3346 | | Element | Rendering | Reason |
3347 | |---|---|---|
3348 | | Waveforms | GPU (WGPU) | High-frequency updates, dense data |
3349 | | MIDI note grid | GPU (WGPU) | Dense data, smooth zoom |
3350 | | Spectrum analyzer | GPU (WGPU) | 30fps continuous data |
3351 | | Level meters | GPU (canvas or CSS) | 60fps continuous |
3352 | | Timeline grid lines | GPU (WGPU) | Scrolls continuously |
3353 | | Automation curves | GPU (WGPU) | Dense curve data |
3354 | | All other UI | DOM (React) | Standard UI, infrequent updates |
3355 | 
3356 | ## 54.2 Design Constraints from GPU Rendering
3357 | 
3358 | **No DOM elements over WGPU canvas:** Any DOM element positioned over the WGPU canvas layer will not composite correctly on all platforms. All popovers, tooltips, context menus, and modals that appear over the canvas area use a separate full-screen overlay layer (position: fixed, z-index above the canvas).
3359 | 
3360 | **Canvas size = clip area:** The WGPU canvas is sized exactly to the area it needs to cover. It must not be larger (wastes GPU memory). The clip areas (track lane content area) define the WGPU canvas dimensions.
3361 | 
3362 | **Layer identification:** The WGPU layer has a defined stacking position. DOM layout must account for this layer explicitly. The WGPU canvas has `pointer-events: none` — all interaction on the canvas area is handled by an invisible DOM overlay above it.
3363 | 
3364 | ---
3365 | 
3366 | # 55. PERFORMANCE CONSTRAINTS
3367 | 
3368 | ## 55.1 Design Rules for Performance
3369 | 
3370 | These rules exist to keep the UI fast on the minimum supported hardware (integrated Intel/AMD GPU, 8GB RAM, 4-core CPU):
3371 | 
3372 | **Rule P1: No blur effects anywhere in the UI.**  
3373 | CSS `backdrop-filter: blur()` and `filter: blur()` are expensive on integrated GPUs. No part of AUDIAW uses blur effects. Overlays use solid or semi-transparent backgrounds, not blurred.
3374 | 
3375 | **Rule P2: No box-shadow on animated elements.**  
3376 | Box shadows cause re-paints. Static elements (cards, modals) may use box-shadow. Animated elements (dragged clips, dragged panels) must not have box-shadow — use a border instead.
3377 | 
3378 | **Rule P3: `will-change` must be used correctly.**  
3379 | Only elements that are actively animating position or transform should have `will-change: transform`. Static elements must not have `will-change`. Applying `will-change` to all elements creates GPU memory waste.
3380 | 
3381 | **Rule P4: Virtualized lists for all lists > 100 items.**  
3382 | The browser asset list, plugin list, and arrangement track list must use virtualized rendering (only rendering DOM nodes for items in the viewport).
3383 | 
3384 | **Rule P5: No CSS gradients in high-frequency update paths.**  
3385 | CSS gradients on elements that update at > 10Hz (meter bars) must be replaced with solid colors or canvas-rendered gradients.
3386 | 
3387 | **Rule P6: React component memoization required in track list.**  
3388 | Every track component that renders within the virtualized track list must be wrapped in `React.memo`. Callbacks passed to tracks must be `useCallback`. Values must use `useMemo`.
3389 | 
3390 | ## 55.2 Target Frame Budget (Per Frame at 60fps = 16.7ms)
3391 | 
3392 | | Operation | Budget | Priority |
3393 | |---|---|---|
3394 | | DOM React updates (UI state changes) | 4ms | Must-hit |
3395 | | CSS transitions and animations | 2ms | Must-hit |
3396 | | WGPU waveform render pass | 3ms | Must-hit |
3397 | | WGPU meter render pass | 0.5ms | Must-hit |
3398 | | WGPU spectrum render pass | 0.5ms | Must-hit |
3399 | | Compositor (OS window manager) | 2ms | External |
3400 | | Buffer | 4.2ms | Safety |
3401 | 
3402 | If the React render budget exceeds 4ms, UI animations will drop frames. This is treated as a rendering performance bug.
3403 | 
3404 | ---
3405 | 
3406 | # 56. LATENCY UX EXPECTATIONS
3407 | 
3408 | ## 56.1 Perceptible Latency Thresholds
3409 | 
3410 | | Latency Range | User Perception | AUDIAW Target |
3411 | |---|---|---|
3412 | | 0–10ms | Instantaneous | All UI feedback |
3413 | | 10–50ms | Minor delay, acceptable | Parameter changes, clip snapping |
3414 | | 50–100ms | Noticeable but tolerable | Complex operations (routing changes) |
3415 | | 100–300ms | Feels slow | Must trigger loading indicator |
3416 | | > 300ms | Unacceptable for interactive controls | Never for synchronous UI response |
3417 | 
3418 | ## 56.2 Audio Latency Visual Communication
3419 | 
3420 | The status bar always shows the current round-trip audio latency:
3421 | ```
3422 | "6.3 ms RTL" (6.3ms round-trip latency)
3423 | ```
3424 | Format: latency value in Geist Mono, 10px, opacity 0.45, followed by "ms RTL"
3425 | 
3426 | Color coding of the latency value:
3427 | - < 10ms: opacity 0.45 (neutral, acceptable)
3428 | - 10–20ms: amber text (`#F59E0B`) — borderline for tracking
3429 | - > 20ms: red text (`#EF4444`) — problematic for tracking
3430 | 
3431 | When the user hovers over the latency display, a tooltip appears:
3432 | "Buffer: [N] samples. Sample rate: [N] Hz. Backend: [ASIO/CoreAudio/JACK/etc.]"
3433 | 
3434 | ---
3435 | 
3436 | # 57. SCROLL PHYSICS
3437 | 
3438 | ## 57.1 Timeline Scrolling
3439 | 
3440 | **Horizontal scroll (timeline navigation):**
3441 | - Two-finger trackpad swipe or mouse wheel: scrolls horizontally
3442 | - Speed: 1:1 with input on trackpad (natural, no acceleration)
3443 | - Speed on mouse wheel: 80px per scroll unit
3444 | - Momentum: trackpad momentum is preserved (OS-native momentum scrolling)
3445 | - Mouse wheel without momentum: no additional deceleration — stops immediately on input stop
3446 | 
3447 | **Vertical scroll (track list navigation):**
3448 | - Mouse wheel: scrolls track list vertically when cursor is over track headers or lanes
3449 | - Speed: 1 track height per scroll unit (48px default)
3450 | - Or: 24px per scroll unit if faster-than-track-height scrolling feels wrong (test with users)
3451 | - Momentum: same as horizontal
3452 | 
3453 | **Scroll boundaries:**
3454 | - Horizontal: can scroll left to bar 1 (no earlier). Can scroll right up to 10% past the last clip.
3455 | - Vertical: can scroll up to track 1 (no earlier). Can scroll down to 5 track heights past the last track.
3456 | 
3457 | **Scroll snapping:** No scroll snap. Scrolling is free (not snap-to-track).
3458 | 
3459 | ## 57.2 Piano Roll Scrolling
3460 | 
3461 | Both horizontal (time) and vertical (pitch) scroll:
3462 | - Same rules as timeline for horizontal
3463 | - Vertical: scrolls by pitch. 1 scroll unit = one note height (12px at standard zoom). No snap.
3464 | 
3465 | ## 57.3 Scroll Bars
3466 | 
3467 | Scroll bars in AUDIAW:
3468 | 
3469 | - Thin: 6px width (vertical), 6px height (horizontal)
3470 | - Visible only when scrolling or when hovering over the scroll area
3471 | - Fade in over 100ms when scrolling starts
3472 | - Fade out over 600ms after scrolling stops
3473 | - Color: `rgba(255,255,255,0.25)` track, `rgba(255,255,255,0.45)` thumb
3474 | - No arrows on scroll bars (space is too tight)
3475 | - Hover on thumb: thumb brightens to `rgba(255,255,255,0.65)`
3476 | - Border-radius: 3px (rounded ends)
3477 | 
3478 | ---
3479 | 
3480 | # 58. DRAG & DROP SYSTEMS
3481 | 
3482 | ## 58.1 Clip Drag (Within Timeline)
3483 | 
3484 | **Drag initiation:**
3485 | - Threshold: 4px of cursor movement after mousedown before drag begins (prevents accidental drags on click)
3486 | - On drag start: the clip visual lifts — box shadow appears (`0 4px 20px rgba(0,0,0,0.6)`) and scale becomes `1.01`
3487 | - The clip remains in its original position as a ghost (30% opacity) showing where it will return if dropped outside a valid zone
3488 | 
3489 | **During drag:**
3490 | - The clip follows the cursor at 1:1 (no lag)
3491 | - Snapping occurs to the current grid setting (see Section 59)
3492 | - A position tooltip appears: "Bar 3, Beat 2" or "3.2.0" in Geist Mono
3493 | - Adjacent clips light up their edges when the dragged clip is within 16px of them (potential adjacency indicator)
3494 | 
3495 | **Drag to new track:**
3496 | - The dragged clip shows a track insertion indicator: a 2px horizontal accent line between tracks where the clip will land
3497 | - If dragging to a track of incompatible type (audio clip to MIDI track): the indicator becomes red and a "No" cursor appears
3498 | 
3499 | **Drop:**
3500 | - Release: clip snaps to target position, scale returns to 1.0 in 80ms ease-out, box-shadow removes in 80ms
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs
package.json,pnpm-workspace.yaml,.gitignore,src-tauri/Cargo.toml,src-tauri/build.rs,index.html,vite.config.ts,app-icon.png.svg,src-tauri/tauri.conf.json,src/index.css,DOCS/V0.5_TECHNICAL_SPECIFICATION.md,crates/audiaw-project/Cargo.toml,tsconfig.json,tsconfig.node.json,tailwind.config.js,postcss.config.js,SETUP.md,VERIFICATION.md,src/styles/theme.ts,src/styles/animations.css

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T22:19:11.586Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.80

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<read_file>
<args>
  <file>
    <path>DOCS/AUDIAW-DESIGN.md</path>
    <line_range>3501-4000</line_range>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 'DOCS/AUDIAW-DESIGN.md'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>DOCS/AUDIAW-DESIGN.md</path>
<content lines="3501-4000">
3501 | - Original ghost fades out: 120ms ease-in
3502 | 
3503 | ## 58.2 Multi-Clip Drag
3504 | 
3505 | Selecting multiple clips and dragging moves all selected clips simultaneously:
3506 | - All clips maintain their relative positions to each other
3507 | - The primary clip (the one clicked to initiate drag) anchors to the cursor
3508 | - All other clips move in lockstep
3509 | - The snap position is computed based on the primary clip's position
3510 | 
3511 | ## 58.3 Sample Drag From Browser
3512 | 
3513 | **Drag start (from browser list item):**
3514 | - The list item lifts visually: background Level 5 surface, scale `1.02`
3515 | - A drag ghost appears: a compact version of the clip that would be created (shows filename, waveform thumbnail if available, estimated duration)
3516 | - Ghost size: 120px wide, 32px tall, same visual as a real clip at compact height
3517 | - Ghost follows cursor at 1:1
3518 | 
3519 | **Valid drop zones:**
3520 | - Empty track lane: highlighted with a 1px accent dashed border around the drop zone
3521 | - Existing track lane: accent dashed outline around the track lane
3522 | - Empty space below all tracks: shows a new track preview (2px accent line with label "New Track")
3523 | 
3524 | **Invalid drop zones:**
3525 | - Anywhere outside the arrangement canvas
3526 | - A MIDI track lane (for an audio sample)
3527 | - The transport bar, status bar, or any panel header
3528 | 
3529 | **Drop:**
3530 | - Audio file on track lane: creates audio clip at the drop position
3531 | - Audio file on empty space below tracks: creates a new audio track and places the clip
3532 | - On drop: the ghost disappears (120ms opacity fade), the real clip appears in the timeline (120ms fade in)
3533 | 
3534 | ---
3535 | 
3536 | # 59. SNAPPING SYSTEMS
3537 | 
3538 | ## 59.1 Snap Grid Settings
3539 | 
3540 | The current snap setting is shown in the transport bar area (or a dedicated snap control):
3541 | 
3542 | **Snap control design:**
3543 | ```
3544 | [Snap toggle: small grid icon, 16px]
3545 | [Snap size dropdown: "1/16" with chevron]
3546 | ```
3547 | 
3548 | Available snap values:
3549 | - Off (no snap)
3550 | - 1 bar
3551 | - 1/2 bar
3552 | - 1/4 bar
3553 | - 1 beat (1/4 note)
3554 | - 1/8 note
3555 | - 1/16 note
3556 | - 1/32 note
3557 | - 1/64 note
3558 | - Triplet variants: 1/8T, 1/16T
3559 | - Dotted variants: 1/8., 1/16.
3560 | 
3561 | ## 59.2 Snap Visual Feedback
3562 | 
3563 | **During drag:** The drag ghost snaps to the grid. The snap is instant — no animation between snap positions. The snapping feels like physical detents on a hardware knob.
3564 | 
3565 | **Snap indicator:** When a clip is being dragged and snaps to a position, a subtle 1px vertical accent line flashes at the snap position in the timeline for 100ms (appears at snap, fades in 100ms). This confirms the snap visually.
3566 | 
3567 | **Override snap:** Holding `Alt` during drag disables snapping temporarily. A label "SNAP OFF" appears in 10px near the drag ghost while Alt is held.
3568 | 
3569 | ## 59.3 Magnetic Clip Edges
3570 | 
3571 | Independent of the grid snap, clips also snap to the edges of other clips:
3572 | 
3573 | - If the dragged clip's start edge comes within 8 screen pixels of another clip's end edge, the clips "magnetize" together
3574 | - A yellow 1px line appears at the snap point (distinguished from the accent blue grid snap)
3575 | - The magnetic snap takes priority over the grid snap at distances < 8px
3576 | 
3577 | ---
3578 | 
3579 | # 60. RESIZING SYSTEMS
3580 | 
3581 | ## 60.1 Clip Resize (Start/End Trim)
3582 | 
3583 | **Hover detection:** A 6px zone at each clip edge activates the resize cursor (`ew-resize`)
3584 | 
3585 | **During resize:**
3586 | - The clip edge moves with the cursor
3587 | - The opposite edge is fixed
3588 | - The resize snaps to the current grid setting
3589 | - A duration tooltip appears: "2 bars, 3 beats" or "2.3.0"
3590 | - If the clip is trimmed past its audio content start/end: the trim handle turns amber (indicating: content limit reached, resizing further will add silence/repeat loops)
3591 | 
3592 | **Minimum clip size:** 4px (one snap unit minimum). A clip cannot be resized to 0 width.
3593 | 
3594 | ## 60.2 Panel Resize
3595 | 
3596 | Panel boundaries (between left panel and canvas, between canvas and right panel, between canvas and bottom panel):
3597 | 
3598 | **Resize hot zone:** 4px centered on the border  
3599 | **Resize cursor:** `col-resize` for vertical borders, `row-resize` for horizontal  
3600 | **During resize:** The border follows the cursor. Content in each panel reflows at the new size. No "ghost" — the resize is live.
3601 | 
3602 | **Snap-to-size:** Panels snap to specific widths:
3603 | - The snap positions are: any multiple of 40px within the allowed range
3604 | - Additionally, panels snap to their "standard" sizes (e.g., 260px for browser, 320px for device view)
3605 | - Snap is magnetic: within 12px of a snap position, the panel snaps
3606 | - Override: hold `Alt` during resize to disable snapping
3607 | 
3608 | **Minimum size enforcement:** When a panel is resized below its minimum width:
3609 | - The resize is prevented (the panel clamps at the minimum)
3610 | - The cursor remains as the resize cursor (so the user understands the boundary)
3611 | - No feedback beyond the clamp — the visual stop is self-explanatory
3612 | 
3613 | ---
3614 | 
3615 | # 61. PANEL BEHAVIOR
3616 | 
3617 | ## 61.1 Panel Open/Close Animation
3618 | 
3619 | **Left panel open:** width transitions from 0 to target width in 150ms ease-out. The canvas zone simultaneously expands its left edge by the same amount.
3620 | 
3621 | **Left panel close:** width transitions from current to 0 in 120ms ease-in.
3622 | 
3623 | **The canvas content does NOT re-render during the panel transition** — it simply reflows. This is achieved by using CSS width transitions (not JavaScript-driven) so the browser handles the reflow optimally.
3624 | 
3625 | ## 61.2 Panel Collapse vs. Close
3626 | 
3627 | **Collapse:** The panel goes to 0 width but the toggle button remains visible at the edge. The panel can be re-opened by clicking the toggle. State: "collapsed."
3628 | 
3629 | **Close (tab close):** The tab is removed from the zone. The panel content is unmounted. State: "closed." Opening requires going to the panel menu and re-adding the panel.
3630 | 
3631 | ## 61.3 Panel Content Scrolling
3632 | 
3633 | Every panel that might have more content than visible height must handle overflow:
3634 | 
3635 | - Overflow behavior: `overflow-y: auto` (scrollbar appears when needed)
3636 | - Scroll bar style: same as section 57.3 (6px, thin, fade-in/out)
3637 | - Content padding-bottom: 16px (so the last item is not cut off by the scroll container edge)
3638 | 
3639 | ---
3640 | 
3641 | # 62. CONTEXT MENUS
3642 | 
3643 | ## 62.1 Context Menu Design
3644 | 
3645 | Context menus appear on right-click (or two-finger tap on trackpad/touchscreen):
3646 | 
3647 | **Container:**
3648 | - Background: Level 4 surface (`#2C2C39`)
3649 | - Border: 1px at `rgba(255,255,255,0.12)`
3650 | - Border-radius: 6px
3651 | - Padding: 4px top, 4px bottom, 0px horizontal
3652 | - Shadow: `0 8px 32px rgba(0,0,0,0.70), 0 2px 8px rgba(0,0,0,0.40)`
3653 | - Min width: 180px
3654 | - Max width: 280px
3655 | - Width: determined by longest item label + padding
3656 | 
3657 | **Positioning:**
3658 | - Opens at cursor position by default
3659 | - If menu would clip screen edge, repositions: appears above cursor if insufficient space below; shifts left if insufficient space to the right
3660 | - Never exceeds screen boundaries
3661 | 
3662 | **Items:**
3663 | - Height: 32px
3664 | - Horizontal padding: 12px
3665 | - Icon (if present): 14px, left of label, 8px gap between icon and label. Icons use `rgba(255,255,255,0.50)` color.
3666 | - Label: 12px Inter Regular, opacity 0.85
3667 | - Keyboard shortcut: right-aligned, 10px Geist Mono, opacity 0.35
3668 | - Hover: background `rgba(255,255,255,0.07)`, transition 60ms ease-out
3669 | - Active (triggered): background `rgba(255,255,255,0.12)` for 100ms, then menu closes
3670 | 
3671 | **Disabled items:**
3672 | - Label opacity: 0.25
3673 | - No hover effect
3674 | - Cursor: `default` (not pointer)
3675 | - No keyboard shortcut shown
3676 | 
3677 | **Separators:**
3678 | - 1px horizontal line at `rgba(255,255,255,0.07)`
3679 | - 4px margin top and bottom
3680 | 
3681 | **Submenus:**
3682 | - Items with submenus have a right-pointing chevron (8px) at the right edge
3683 | - Submenu opens on hover of the parent item (200ms delay to prevent accidental opens)
3684 | - Submenu closes when cursor leaves both the parent item and the submenu
3685 | - Submenu opens adjacent to the parent item (right-aligned if space, left-aligned if at screen edge)
3686 | 
3687 | ## 62.2 Context Menu Animation
3688 | 
3689 | **Open:** scale from 0.94 → 1.0, opacity 0 → 1, 90ms ease-out, transform-origin at cursor position  
3690 | **Close:** opacity 1 → 0, 60ms ease-in (no scale change on close)
3691 | 
3692 | ## 62.3 Context Menu Contents by Context
3693 | 
3694 | **Track header right-click:**
3695 | ```
3696 | Rename
3697 | Color: ► [color submenu]
3698 | Duplicate
3699 | ---
3700 | Add MIDI Track Above
3701 | Add Audio Track Above
3702 | ---
3703 | Group Selected Tracks
3704 | ---
3705 | Freeze Track
3706 | Bounce to Audio
3707 | ---
3708 | Properties         Ctrl+I
3709 | Delete             Backspace
3710 | ```
3711 | 
3712 | **Clip right-click:**
3713 | ```
3714 | Rename
3715 | Color: ► [color submenu]
3716 | Duplicate          Ctrl+D
3717 | ---
3718 | Split at Playhead  S
3719 | Crop to Content
3720 | Reverse
3721 | ---
3722 | Clip Gain…
3723 | Pitch Shift…
3724 | Time Stretch…
3725 | Fade In: ► [None / 10ms / 50ms / 100ms / Custom]
3726 | Fade Out: ► [None / 10ms / 50ms / 100ms / Custom]
3727 | ---
3728 | Quantize Audio     Q
3729 | ---
3730 | Open in Waveform Editor
3731 | Convert to MIDI (AI)
3732 | ---
3733 | Delete             Backspace
3734 | ```
3735 | 
3736 | ---
3737 | 
3738 | # 63. INSPECTOR PANELS
3739 | 
3740 | ## 63.1 Inspector Panel Purpose
3741 | 
3742 | The inspector panel (in the right panel zone) shows properties of the currently selected item. It is context-sensitive: selecting a track shows track properties, selecting a clip shows clip properties, selecting a MIDI note shows note properties.
3743 | 
3744 | ## 63.2 Inspector Panel Design
3745 | 
3746 | **Section headers within the inspector:**
3747 | ```
3748 | Font: 9px Inter Medium, uppercase, letter-spacing 0.10em
3749 | Color: rgba(255,255,255,0.35)
3750 | Background: Level 3 surface
3751 | Padding: 8px 16px
3752 | Border-bottom: 1px structural border
3753 | ```
3754 | 
3755 | **Property rows:**
3756 | ```
3757 | Height: 28px
3758 | Padding: 0 16px
3759 | Layout: label left, value right
3760 | Label: 11px Inter Regular, opacity 0.50
3761 | Value: 11px Geist Mono, opacity 0.85
3762 | Editable values: click to focus, becomes text input
3763 | ```
3764 | 
3765 | **Multi-selection inspector:**
3766 | When multiple tracks or clips are selected, the inspector shows:
3767 | - Properties that are the same for all selected: shown as their value
3768 | - Properties that differ: shown as "—" (em dash)
3769 | - Editing a "—" value applies the new value to all selected items
3770 | 
3771 | ---
3772 | 
3773 | # 64. STATE PERSISTENCE
3774 | 
3775 | ## 64.1 What is Persisted
3776 | 
3777 | **Persisted per workspace:**
3778 | - Panel open/closed state
3779 | - Panel widths/heights
3780 | - Active main view
3781 | - Active tab in each panel zone
3782 | 
3783 | **Persisted per project:**
3784 | - Zoom level (horizontal, in arrangement)
3785 | - Scroll position (horizontal and vertical, in arrangement)
3786 | - Zoom level (horizontal and vertical, in piano roll)
3787 | - Which tracks are expanded (showing automation lanes)
3788 | - Which clips are selected at time of last save
3789 | 
3790 | **Persisted globally (across all projects):**
3791 | - Active workspace
3792 | - Theme (dark/light)
3793 | - Accent color
3794 | - UI scale factor
3795 | - Keybinding overrides
3796 | - Audio device configuration
3797 | 
3798 | ## 64.2 Persistence Mechanism
3799 | 
3800 | UI state is persisted to a local SQLite database (not the project file). This database lives at:
3801 | - macOS: `~/Library/Application Support/AUDIAW/ui-state.db`
3802 | - Windows: `%APPDATA%\AUDIAW\ui-state.db`
3803 | - Linux: `~/.local/share/audiaw/ui-state.db`
3804 | 
3805 | Writes to this database are debounced: any state change triggers a write after a 500ms quiet period. Not every state change triggers an immediate write (this would be excessive for scroll position changes).
3806 | 
3807 | ---
3808 | 
3809 | # 65. WORKSPACE PRESETS
3810 | 
3811 | ## 65.1 Workspace Preset Management
3812 | 
3813 | Access via: Transport bar workspace selector → dropdown → "Manage Workspaces"
3814 | 
3815 | **Management panel (modal dialog):**
3816 | - Width: 440px
3817 | - List of workspaces with:
3818 |   - Name (editable inline on double-click)
3819 |   - Preview thumbnail (a 80×50px screenshot of the workspace layout — static image captured when the workspace was last active)
3820 |   - Actions: Duplicate, Delete (built-in workspaces: duplicate only, not deletable)
3821 | - Drag to reorder workspaces in the list
3822 | - "New Workspace" button at bottom
3823 | 
3824 | ## 65.2 Workspace Switching Transition
3825 | 
3826 | As specified in section 23: 240ms opacity crossfade. The workspace switch is triggered by selecting a workspace from the dropdown. The dropdown closes immediately, and the crossfade begins.
3827 | 
3828 | ---
3829 | 
3830 | # 66. THEME ENGINE
3831 | 
3832 | ## 66.1 Theme System Architecture
3833 | 
3834 | Themes in AUDIAW are implemented as CSS custom property overrides on the `:root` element. The theme engine:
3835 | 
3836 | 1. Loads the built-in theme base (compiled into the application)
3837 | 2. Loads the user's selected theme (if custom or non-default)
3838 | 3. Applies user overrides (accent color, if changed)
3839 | 4. Injects the final property set to `:root`
3840 | 
3841 | The React component tree uses only CSS custom properties for colors, never hardcoded values. This ensures that any theme change (even at runtime) is applied instantly without re-render.
3842 | 
3843 | ## 66.2 Light Theme Specification
3844 | 
3845 | AUDIAW ships with a light theme ("AUDIAW Light"). Key differences from the dark theme:
3846 | 
3847 | ```
3848 | --neutral-900: hsl(240, 8%, 97%)    /* Near-white */
3849 | --neutral-850: hsl(240, 6%, 95%)    /* Page background */
3850 | --neutral-800: hsl(240, 5%, 91%)    /* Raised surface */
3851 | --neutral-750: hsl(240, 5%, 86%)    /* Level 3 surface */
3852 | --neutral-700: hsl(240, 4%, 80%)    /* Level 4 surface */
3853 | --neutral-650: hsl(240, 4%, 73%)    /* Level 5 surface */
3854 | 
3855 | Text (on light surface):
3856 | --text-primary:   rgba(0, 0, 0, 0.88)
3857 | --text-secondary: rgba(0, 0, 0, 0.52)
3858 | --text-tertiary:  rgba(0, 0, 0, 0.32)
3859 | 
3860 | Dot-matrix text (transport): invert to dark text on light display
3861 | --dot-matrix-color: rgba(0, 0, 0, 0.80)
3862 | 
3863 | Waveforms: track colors retain their hue but waveform fills are at higher opacity (60%) since the contrast is reversed.
3864 | 
3865 | Borders: rgba(0,0,0,0.08) instead of rgba(255,255,255,0.07)
3866 | ```
3867 | 
3868 | All other design decisions (spacing, typography scale, motion, interaction) are identical between light and dark themes.
3869 | 
3870 | ---
3871 | 
3872 | # 67. DESIGN TOKENS
3873 | 
3874 | ## 67.1 Token Categories and Format
3875 | 
3876 | Design tokens are defined as CSS custom properties and additionally exported as a JSON file for tooling integration. Every value used in AUDIAW's styling comes from a token.
3877 | 
3878 | **Token naming convention:** `--category-variant-modifier`
3879 | 
3880 | ```css
3881 | :root {
3882 |   /* ── SURFACES ────────────────────────────────────── */
3883 |   --surface-void:          #0D0D0F;
3884 |   --surface-base:          #111115;
3885 |   --surface-raised:        #1A1A21;
3886 |   --surface-elevated:      #22222C;
3887 |   --surface-overlay:       #2C2C39;
3888 |   --surface-highest:       #363645;
3889 | 
3890 |   /* ── TEXT ────────────────────────────────────────── */
3891 |   --text-primary:          rgba(255, 255, 255, 0.92);
3892 |   --text-secondary:        rgba(255, 255, 255, 0.58);
3893 |   --text-tertiary:         rgba(255, 255, 255, 0.35);
3894 |   --text-ghost:            rgba(255, 255, 255, 0.18);
3895 | 
3896 |   /* ── BORDERS ─────────────────────────────────────── */
3897 |   --border-subtle:         rgba(255, 255, 255, 0.07);
3898 |   --border-default:        rgba(255, 255, 255, 0.10);
3899 |   --border-strong:         rgba(255, 255, 255, 0.20);
3900 |   --border-focus:          var(--accent-primary);
3901 | 
3902 |   /* ── ACCENT ──────────────────────────────────────── */
3903 |   --accent-primary:        #3B8BF5;
3904 |   --accent-secondary:      #60A5FA;
3905 |   --accent-dim:            rgba(59, 139, 245, 0.15);
3906 |   --accent-text:           #3B8BF5;
3907 | 
3908 |   /* ── STATUS ──────────────────────────────────────── */
3909 |   --status-record:         #EF4444;
3910 |   --status-record-dim:     #8B2020;
3911 |   --status-warning:        #F59E0B;
3912 |   --status-error:          #EF4444;
3913 |   --status-success:        #22C55E;
3914 |   --status-info:           #60A5FA;
3915 |   --status-mute:           #F59E0B;
3916 |   --status-solo:           #06B6D4;
3917 | 
3918 |   /* ── METERS ──────────────────────────────────────── */
3919 |   --meter-safe:            #22C55E;
3920 |   --meter-caution:         #F59E0B;
3921 |   --meter-danger:          #EF4444;
3922 |   --meter-clip:            #FF0000;
3923 |   --meter-bg:              #131318;
3924 | 
3925 |   /* ── TYPOGRAPHY ──────────────────────────────────── */
3926 |   --font-ui:               "Inter Variable", system-ui, sans-serif;
3927 |   --font-mono:             "Geist Mono", "JetBrains Mono", monospace;
3928 | 
3929 |   --size-2xs:   9px;
3930 |   --size-xs:   10px;
3931 |   --size-sm:   11px;
3932 |   --size-base: 12px;
3933 |   --size-md:   13px;
3934 |   --size-lg:   14px;
3935 |   --size-xl:   16px;
3936 |   --size-2xl:  20px;
3937 |   --size-3xl:  28px;
3938 | 
3939 |   --weight-regular:  400;
3940 |   --weight-medium:   500;
3941 |   --weight-semibold: 600;
3942 | 
3943 |   /* ── SPACING ─────────────────────────────────────── */
3944 |   --space-1:   4px;
3945 |   --space-2:   8px;
3946 |   --space-3:  12px;
3947 |   --space-4:  16px;
3948 |   --space-5:  20px;
3949 |   --space-6:  24px;
3950 |   --space-8:  32px;
3951 |   --space-10: 40px;
3952 |   --space-12: 48px;
3953 |   --space-16: 64px;
3954 | 
3955 |   /* ── LAYOUT ──────────────────────────────────────── */
3956 |   --height-transport:        52px;
3957 |   --height-statusbar:        22px;
3958 |   --height-tabbar:           34px;
3959 |   --height-track-compact:    32px;
3960 |   --height-track-standard:   48px;
3961 |   --height-track-tall:       80px;
3962 |   --width-track-header:     216px;
3963 |   --width-mixer-channel:     72px;
3964 | 
3965 |   /* ── RADIUS ──────────────────────────────────────── */
3966 |   --radius-sm:    2px;
3967 |   --radius-base:  4px;
3968 |   --radius-lg:    6px;
3969 |   --radius-xl:    8px;
3970 |   --radius-full:  9999px;
3971 | 
3972 |   /* ── MOTION ──────────────────────────────────────── */
3973 |   --duration-micro:     60ms;
3974 |   --duration-fast:      90ms;
3975 |   --duration-standard: 120ms;
3976 |   --duration-moderate: 180ms;
3977 |   --duration-slow:     240ms;
3978 | 
3979 |   --ease-out:      cubic-bezier(0.16, 1, 0.3, 1);
3980 |   --ease-in:       cubic-bezier(0.7, 0, 0.84, 0);
3981 |   --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
3982 |   --ease-spring:   cubic-bezier(0.34, 1.12, 0.64, 1);
3983 | }
3984 | ```
3985 | 
3986 | ---
3987 | 
3988 | # 68. COMPONENT DESIGN STANDARDS
3989 | 
3990 | ## 68.1 Button Component
3991 | 
3992 | AUDIAW has four button variants. Their differences are semantic (meaning) not just visual:
3993 | 
3994 | **Primary Button** (one per context maximum):
3995 | ```
3996 | Background: var(--accent-primary)
3997 | Color: #FFFFFF
3998 | Font: 12px Inter Medium
3999 | Height: 32px
4000 | Padding: 0 14px
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs
package.json,pnpm-workspace.yaml,.gitignore,src-tauri/Cargo.toml,src-tauri/build.rs,index.html,vite.config.ts,app-icon.png.svg,src-tauri/tauri.conf.json,src/index.css,DOCS/V0.5_TECHNICAL_SPECIFICATION.md,crates/audiaw-project/Cargo.toml,tsconfig.json,tsconfig.node.json,tailwind.config.js,postcss.config.js,SETUP.md,VERIFICATION.md,src/styles/theme.ts,src/styles/animations.css

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T22:19:15.957Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$1.00

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<read_file>
<args>
  <file>
    <path>DOCS/AUDIAW-DESIGN.md</path>
    <line_range>4001-4602</line_range>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 'DOCS/AUDIAW-DESIGN.md'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>DOCS/AUDIAW-DESIGN.md</path>
<content lines="4001-4602">
4001 | Border-radius: var(--radius-base) [4px]
4002 | Border: none
4003 | Hover: background lightens by 8% (CSS: filter: brightness(1.08))
4004 | Active/pressed: scale 0.98, duration var(--duration-micro) ease-out
4005 | Disabled: background var(--accent-dim), color rgba(255,255,255,0.40), cursor not-allowed
4006 | ```
4007 | 
4008 | **Secondary Button:**
4009 | ```
4010 | Background: rgba(255, 255, 255, 0.06)
4011 | Color: var(--text-primary)
4012 | Font: 12px Inter Regular
4013 | Height: 32px
4014 | Padding: 0 14px
4015 | Border-radius: var(--radius-base)
4016 | Border: 1px solid var(--border-default)
4017 | Hover: background rgba(255,255,255,0.10), border var(--border-strong)
4018 | Active: scale 0.98
4019 | Disabled: opacity 0.40, cursor not-allowed
4020 | ```
4021 | 
4022 | **Ghost Button** (text-only):
4023 | ```
4024 | Background: transparent
4025 | Color: var(--text-secondary)
4026 | Font: 12px Inter Regular
4027 | Height: 32px
4028 | Padding: 0 10px
4029 | Border-radius: var(--radius-base)
4030 | Border: none
4031 | Hover: background rgba(255,255,255,0.06), color var(--text-primary)
4032 | Active: scale 0.98
4033 | ```
4034 | 
4035 | **Danger Button** (destructive actions):
4036 | ```
4037 | Background: rgba(239, 68, 68, 0.12)
4038 | Color: #EF4444
4039 | Font: 12px Inter Medium
4040 | Height: 32px
4041 | Padding: 0 14px
4042 | Border-radius: var(--radius-base)
4043 | Border: 1px solid rgba(239, 68, 68, 0.30)
4044 | Hover: background rgba(239, 68, 68, 0.20), border rgba(239,68,68,0.50)
4045 | Active: scale 0.98
4046 | ```
4047 | 
4048 | ## 68.2 Input Field Component
4049 | 
4050 | ```
4051 | Standard text input:
4052 |   Height: 28px
4053 |   Background: var(--surface-base)
4054 |   Border: 1px solid var(--border-default)
4055 |   Border-radius: var(--radius-base)
4056 |   Font: 12px var(--font-ui)
4057 |   Color: var(--text-primary)
4058 |   Padding: 0 8px (horizontally)
4059 |   
4060 |   Placeholder: var(--text-ghost), same font
4061 |   
4062 |   Focus:
4063 |     Border-color: var(--accent-primary), 1.5px solid
4064 |     Background: var(--surface-elevated)
4065 |     No outline (the border change is the focus indicator)
4066 |   
4067 |   Invalid:
4068 |     Border-color: var(--status-error)
4069 |     Background: rgba(239, 68, 68, 0.04)
4070 |   
4071 |   Disabled:
4072 |     Background: var(--surface-raised)
4073 |     Border: var(--border-subtle)
4074 |     Color: var(--text-tertiary)
4075 |     Cursor: not-allowed
4076 | ```
4077 | 
4078 | ## 68.3 Toggle Switch Component
4079 | 
4080 | ```
4081 | Track (outer):
4082 |   Width: 32px
4083 |   Height: 18px
4084 |   Border-radius: 9px
4085 |   Background off: rgba(255,255,255,0.12)
4086 |   Background on: var(--accent-primary)
4087 |   Transition: background-color var(--duration-fast) var(--ease-out)
4088 | 
4089 | Thumb:
4090 |   Width: 14px
4091 |   Height: 14px
4092 |   Border-radius: 50%
4093 |   Background: white
4094 |   Position off: translateX(2px)
4095 |   Position on: translateX(16px) [32 - 14 - 2 = 16]
4096 |   Transition: transform var(--duration-fast) var(--ease-spring)
4097 |   Box-shadow: 0 1px 3px rgba(0,0,0,0.4)
4098 | ```
4099 | 
4100 | ## 68.4 Dropdown/Select Component
4101 | 
4102 | ```
4103 | Trigger button:
4104 |   Height: 28px
4105 |   Background: var(--surface-raised)
4106 |   Border: 1px solid var(--border-default)
4107 |   Border-radius: var(--radius-base)
4108 |   Font: 12px var(--font-ui), var(--text-primary)
4109 |   Padding: 0 8px
4110 |   Right side: chevron icon (8px, opacity 0.45)
4111 |   Hover: background var(--surface-elevated), border var(--border-strong)
4112 |   Open state: border-color var(--accent-primary)
4113 | 
4114 | Dropdown panel:
4115 |   Background: var(--surface-overlay)
4116 |   Border: 1px solid var(--border-strong)
4117 |   Border-radius: var(--radius-lg) [6px]
4118 |   Shadow: 0 8px 32px rgba(0,0,0,0.60)
4119 |   Padding: 4px 0
4120 |   Min-width: matches trigger width
4121 |   Max-height: 240px (scrollable above this)
4122 | 
4123 | Item:
4124 |   Height: 32px
4125 |   Padding: 0 12px
4126 |   Font: 12px var(--font-ui), var(--text-primary)
4127 |   Hover: background rgba(255,255,255,0.07)
4128 |   Selected: background var(--accent-dim), left border 2px var(--accent-primary)
4129 | ```
4130 | 
4131 | ## 68.5 Knob Component
4132 | 
4133 | ```
4134 | Visual:
4135 |   Outer ring: 36px diameter circle
4136 |   Ring background: rgba(255,255,255,0.06)
4137 |   Ring border: 1px rgba(255,255,255,0.12)
4138 |   Ring border-radius: 50%
4139 |   
4140 |   Indicator track (the arc showing the full range):
4141 |     Stroke width: 3px
4142 |     Color: rgba(255,255,255,0.10)
4143 |     Arc: from 7 o'clock to 5 o'clock (280° range)
4144 |   
4145 |   Indicator fill (the arc showing the current value):
4146 |     Stroke width: 3px
4147 |     Color: var(--accent-primary)
4148 |     Arc: from 7 o'clock to current value position
4149 |   
4150 |   Dot (at the current value position):
4151 |     Diameter: 4px
4152 |     Color: white
4153 |     Positioned on the outer edge of the indicator fill arc
4154 | 
4155 | Hover state:
4156 |   Ring border: rgba(255,255,255,0.25)
4157 |   Indicator fill: var(--accent-secondary) [lighter accent]
4158 | 
4159 | Focus state (keyboard):
4160 |   Focus ring: 1.5px solid var(--accent-primary), 3px offset
4161 |   Ring border: var(--accent-primary) at 50% opacity
4162 | 
4163 | Dragging:
4164 |   Value tooltip: floats 8px above the knob center
4165 |   Contains: the exact value in Geist Mono, 11px
4166 |   Background: var(--surface-overlay)
4167 |   Border-radius: 4px
4168 |   Padding: 3px 6px
4169 | ```
4170 | 
4171 | ---
4172 | 
4173 | # 69. RESPONSIVE SCALING
4174 | 
4175 | ## 69.1 UI Scale Factor System
4176 | 
4177 | AUDIAW supports four UI scale presets plus a custom scale (80%–200%):
4178 | 
4179 | | Scale Name | CSS Transform Scale | Best For |
4180 | |---|---|---|
4181 | | Compact | 0.90 | Large monitors (27"+), dense workflows |
4182 | | Standard | 1.00 | Default, 1080p–1440p |
4183 | | Comfortable | 1.15 | 1080p laptops, accessibility |
4184 | | Large | 1.30 | Touch screens, high accessibility need |
4185 | | Custom | User-set | Any |
4186 | 
4187 | **Implementation:** The scale is applied via `transform: scale(X)` on the root application container, with `transform-origin: top left` and a compensating size adjustment so the window continues to fill its bounds.
4188 | 
4189 | **Exception:** The WGPU canvas layer does not scale via CSS transform. It is resized directly to match the scaled viewport dimensions, rendering at native resolution.
4190 | 
4191 | ## 69.2 Window Size Adaptations
4192 | 
4193 | **< 1100px wide:**
4194 | - Right panel auto-collapses if left panel is open
4195 | - Transport bar enters compact mode: removes secondary controls (CPU meter label, hides project name)
4196 | 
4197 | **< 900px wide:**
4198 | - Minimum enforced: layout does not reduce further. Horizontal scrollbar appears.
4199 | 
4200 | **> 2560px wide (ultrawide or 4K+):**
4201 | - The primary canvas zone grows to fill. No maximum canvas width.
4202 | - Track header panel can expand to 280px (slightly wider, more readable labels)
4203 | 
4204 | ---
4205 | 
4206 | # 70. OPEN SOURCE CONTRIBUTION DESIGN RULES
4207 | 
4208 | ## 70.1 Design Contribution Standards
4209 | 
4210 | These rules apply to any UI contribution (new component, new view, modification of existing UI):
4211 | 
4212 | **Rule C1: Use only design tokens.**  
4213 | No hardcoded color values, font sizes, spacing values, or animation durations in contributed code. Every value must reference a CSS custom property from the design token system.
4214 | 
4215 | **Rule C2: Follow the component library.**  
4216 | New UI features must be built from existing components where possible. If a new component is needed, it must be designed in the style of existing components and added to the component library with documentation.
4217 | 
4218 | **Rule C3: Accessibility is not optional.**  
4219 | Every interactive element in a contribution must have a keyboard interaction model, a visible focus state, and appropriate ARIA labels. PRs that introduce inaccessible UI will not be merged.
4220 | 
4221 | **Rule C4: Performance is a design constraint.**  
4222 | Any new component that introduces render performance problems (causes jank in the track list, increases main thread blocking) will be sent back for revision regardless of visual quality.
4223 | 
4224 | **Rule C5: Mockup before code.**  
4225 | Significant UI changes require a Figma mockup (or equivalent) to be reviewed and approved before implementation begins. The mockup must use the established design token values and show all interactive states.
4226 | 
4227 | **Rule C6: Follow the monochrome principle.**  
4228 | Do not introduce new uses of color that are not on the Color Permission List (section 18.2). Any new color usage must be justified by a documented informational need.
4229 | 
4230 | ---
4231 | 
4232 | # 71. BRANDING SYSTEM
4233 | 
4234 | ## 71.1 Brand Name
4235 | 
4236 | The product name is **AUDIAW**. Always all-uppercase when used as a wordmark. In natural text (documentation, descriptions), it may be written as "Audiaw."
4237 | 
4238 | Never: "audiaw", "AudiAW", "Audi AW", "Audio AW."
4239 | 
4240 | ## 71.2 Brand Wordmark
4241 | 
4242 | The wordmark is set in:
4243 | - Font: Inter Variable, Semibold (600)
4244 | - Letter spacing: -0.02em (slightly tighter than tracking-tight)
4245 | - Case: ALL CAPS
4246 | - Color: var(--text-primary) on dark surfaces; `rgba(0,0,0,0.85)` on light surfaces
4247 | 
4248 | The wordmark must never be:
4249 | - Italicized
4250 | - Outlined (stroked)
4251 | - Used on a colored background (only on neutral surfaces)
4252 | - Decorated with drop shadows
4253 | - Distorted in proportion
4254 | 
4255 | **Minimum size:** 16px tall (the wordmark must never be rendered smaller than this)
4256 | 
4257 | ## 71.3 Brand Symbol (Logomark)
4258 | 
4259 | The logomark (a standalone visual element distinct from the wordmark) is described below, but its final form is pending design review. Until officially approved, the wordmark alone is used for all branding.
4260 | 
4261 | **Logomark concept (under review):**
4262 | A stylized "A" constructed from three horizontal lines of varying length — evoking both the letter A and a spectrum analyzer display. Monochrome. Geometric. Industrial.
4263 | 
4264 | ## 71.4 Tagline
4265 | 
4266 | **"Sound, engineered."**
4267 | 
4268 | Used: on the startup screen (optional, small size, low opacity), on the website, in marketing materials. Never used within the application UI itself (the app doesn't need to market itself to its own users).
4269 | 
4270 | ---
4271 | 
4272 | # 72. LOGO USAGE
4273 | 
4274 | ## 72.1 Application Icon
4275 | 
4276 | The application icon is used in the OS dock/taskbar and file associations.
4277 | 
4278 | **Design requirements for the application icon:**
4279 | - Dark background (the icon should be dark, like the app itself)
4280 | - The AUDIAW logomark centered, in white
4281 | - No drop shadows or effects on the icon itself
4282 | - Follows each platform's icon shape convention:
4283 |   - macOS: square with rounded corners (radius = 22.4% of icon size), shadow added by macOS automatically
4284 |   - Windows: square, no radius (Windows applies its own shape)
4285 |   - Linux: PNG without shape constraint
4286 | 
4287 | **Sizes required:**
4288 | - macOS: 1024×1024 (source), automatically scaled by the OS
4289 | - Windows: 256×256, 128×128, 64×64, 32×32, 16×16 (ICO format)
4290 | - Linux: 512×512, 256×256, 128×128, 64×64, 32×32 (PNG format)
4291 | 
4292 | ## 72.2 In-App Logo Placement
4293 | 
4294 | The logo within the application appears only in:
4295 | - Startup screen (large, centered)
4296 | - About dialog (standard size)
4297 | - Crash recovery screen
4298 | 
4299 | The logo does not appear in the application's normal working interface (the transport bar, panels, status bar do not contain the logo).
4300 | 
4301 | ---
4302 | 
4303 | # 73. UI SOUND DESIGN
4304 | 
4305 | ## 73.1 Philosophy
4306 | 
4307 | AUDIAW has minimal UI sound. Audio feedback in a DAW competes directly with the production audio and creates interference in the user's monitoring environment. For this reason:
4308 | 
4309 | **UI sounds are disabled by default.**
4310 | 
4311 | Users who want UI audio feedback can enable it in Preferences → Appearance → UI Sounds.
4312 | 
4313 | ## 73.2 Optional UI Sound Events
4314 | 
4315 | If enabled, these events have associated sounds:
4316 | 
4317 | | Event | Sound Character | Duration |
4318 | |---|---|---|
4319 | | Project saved | A brief, soft chime (high, single note) | 80ms |
4320 | | Export complete | Two ascending tones | 150ms |
4321 | | Plugin crash | A soft low thud (not alarming — the visual communication carries the severity) | 100ms |
4322 | | Transport play | Subtle "click" (simulates physical button) | 20ms |
4323 | | Transport stop | Subtle "click" (lower pitch than play) | 20ms |
4324 | | Record start | A soft click + brief buzz (like a tape machine engaging) | 30ms |
4325 | | Error/warning | A short, low-pitched soft tone (not a traditional error beep — less alarming) | 60ms |
4326 | 
4327 | All UI sounds:
4328 | - Are rendered as mono audio
4329 | - Are mixed at -24 dBFS relative to their maximum
4330 | - Route through the system audio output (not the AUDIAW audio device — to avoid appearing in recordings)
4331 | - Are non-spatialized
4332 | 
4333 | ## 73.3 Sound Files
4334 | 
4335 | All UI sounds are stored as WAV files (44.1kHz, 16-bit, mono) in the application bundle at:
4336 | `/assets/ui-sounds/[event-name].wav`
4337 | 
4338 | ---
4339 | 
4340 | # 74. AI ASSISTANT UX
4341 | 
4342 | ## 74.1 AI Features in AUDIAW (v2.0+)
4343 | 
4344 | AI features in AUDIAW are entirely opt-in and clearly labeled. They are never activated without explicit user action. AI features are presented as tools, not as an autonomous agent.
4345 | 
4346 | ## 74.2 AI Feature UX Principles
4347 | 
4348 | **Principle AI-1: AI is a tool, not a collaborator.**  
4349 | AI suggestions are presented as options to accept, modify, or reject. The AI never modifies the project without the user explicitly applying the suggestion.
4350 | 
4351 | **Principle AI-2: AI features are labeled.**  
4352 | Every AI-powered feature is labeled with a small "AI" badge or indicator. Users always know when they are using an AI feature. The badge:
4353 | - Size: 14×14px
4354 | - Shape: rounded rect (3px radius)
4355 | - Background: `rgba(139, 92, 246, 0.15)` (violet, distinct from the accent color)
4356 | - Text: "AI" in 7px Inter Bold, color `#8B5CF6`
4357 | 
4358 | **Principle AI-3: No internet required for AI features.**  
4359 | All AI processing in v2.0 runs locally. No audio data, project data, or user data is sent to external servers. This is a fundamental promise.
4360 | 
4361 | ## 74.3 AI Feature Locations (v2.0 planned)
4362 | 
4363 | **Smart Quantize:** In the piano roll toolbar, a button labeled "Smart Q" with the AI badge. Clicking applies an intelligent quantization that preserves human feel (not hard quantize). A dialog shows before/after preview.
4364 | 
4365 | **Pitch Correction:** In the clip context menu → "Pitch Correction (AI)". Opens a non-destructive pitch correction view.
4366 | 
4367 | **Convert to MIDI:** In the clip context menu → "Convert to MIDI (AI)". Analyzes audio and generates a MIDI approximation. Shown as a new MIDI clip on a new track, not overwriting the original.
4368 | 
4369 | ---
4370 | 
4371 | # 75. COLLABORATION UX
4372 | 
4373 | ## 75.1 Collaboration Features (v2.0+)
4374 | 
4375 | Real-time collaboration (multiple users editing the same project simultaneously) is a planned v2.0 feature. Its UX design principles:
4376 | 
4377 | **Presence Indicators:**
4378 | - Each collaborator has an assigned color (from the track color palette, starting with Color 9 Blue for the first collaborator)
4379 | - The collaborator's cursor is visible to all other users as a small cursor shape in their assigned color with their display name
4380 | - Collaborator cursor labels: 10px Inter Regular, white on collaborator-colored background, 4px border-radius, 4px padding horizontal
4381 | 
4382 | **Conflict Resolution:**
4383 | - Simultaneous edits to the same clip: the second edit is queued and applied after the first completes
4384 | - No "last write wins" — edits are merged where possible, flagged for resolution where not
4385 | - Merge conflicts appear as a subtle amber border on the conflicting element
4386 | 
4387 | **Collaboration Status:**
4388 | - In the transport bar (right section, left of workspace selector): collaborator avatars shown as 24×24px circles with initials in their assigned color
4389 | - Hovering an avatar shows their display name
4390 | - A "Live" indicator (3px green dot) appears when any collaborator is active
4391 | 
4392 | ---
4393 | 
4394 | # 76. EXPORT WORKFLOW UX
4395 | 
4396 | ## 76.1 Export Dialog Design
4397 | 
4398 | Access via: `Ctrl/Cmd+E`
4399 | 
4400 | **Dialog:**
4401 | - Width: 480px
4402 | - Background: Level 4 surface
4403 | - Border-radius: 8px
4404 | - Shadow: `0 24px 80px rgba(0,0,0,0.80)`
4405 | - Padding: 28px
4406 | 
4407 | **Content sections:**
4408 | 
4409 | **Section 1: What to Export**
4410 | ```
4411 | Radio options:
4412 |   ○ Full Project (entire arrangement length)
4413 |   ○ Loop Region (current loop start → end)
4414 |   ○ Selection (current time selection)
4415 | 
4416 | Track export options:
4417 |   ○ Master Output
4418 |   ○ Export Stems (one file per track/group)
4419 |     └─ [✓] Include FX    [✓] Normalize stems individually
4420 | ```
4421 | 
4422 | **Section 2: Format Settings**
4423 | ```
4424 | Format: [WAV ▾]    [FLAC ▾]    [MP3 ▾]    [AIFF ▾]
4425 | 
4426 | Sample Rate: [48000 Hz ▾]
4427 | Bit Depth: [24-bit ▾]    (for WAV/AIFF/FLAC)
4428 | MP3 Quality: [320 kbps ▾]    (for MP3 only)
4429 | 
4430 | [✓] Normalize to target LUFS
4431 | Target: [-14.0 LUFS ▾]    [or: -1.0 dBTP true peak ▾]
4432 | ```
4433 | 
4434 | **Section 3: Output**
4435 | ```
4436 | File name: [Project Name_export]     ← editable text field
4437 | Save to: [/Users/.../Music/]        [Browse…]
4438 | ```
4439 | 
4440 | **Actions (bottom):**
4441 | ```
4442 | [Cancel]    [Export]
4443 | ```
4444 | 
4445 | **Export Progress:**
4446 | After clicking Export, the dialog transforms:
4447 | - The form content is replaced by a progress view
4448 | - Progress bar: full width, 4px height, at bottom of dialog
4449 | - Content: [spinning indicator] "Rendering track 3 of 8…" or "Exporting stem: Lead Vocal…"
4450 | - A "Cancel" button remains accessible
4451 | 
4452 | **Export Complete:**
4453 | ```
4454 | [✓ green checkmark icon, 24px]
4455 | "Export complete."
4456 | "24 tracks exported to [folder path]"
4457 | [Open Folder]    [Done]
4458 | ```
4459 | 
4460 | ---
4461 | 
4462 | # 77. RECORDING WORKFLOW UX
4463 | 
4464 | ## 77.1 Pre-Recording Setup
4465 | 
4466 | Before recording, the user must arm at least one track. The pre-recording UI state:
4467 | 
4468 | **Armed track visual:**
4469 | - Track header: the arm button shows the dim red state (`#8B2020`)
4470 | - Track lane: a very subtle red tint on the track lane background: `rgba(139,32,32,0.05)` — perceptible but not distracting
4471 | - Input meter: appears in the track header (mini meter showing input signal, not playback level)
4472 | 
4473 | **Input level monitoring:**
4474 | A small input meter appears in the track header of armed tracks (or in the right panel inspector):
4475 | - 16px wide, full track header height
4476 | - Same color gradient as standard meters
4477 | - Updates in real-time even without playback
4478 | - An "OK" zone indicator: a small amber mark at -12 dBFS ("aim for here")
4479 | 
4480 | ## 77.2 During Recording
4481 | 
4482 | **Visual changes when recording starts:**
4483 | - Transport bar: play button accent fill turns red, record button pulses
4484 | - All track lanes: a subtle red border appears at the top edge of the canvas (2px, red at 30% opacity) — a peripheral signal that recording is active
4485 | - Armed track lane: a red waveform builds in real-time as audio is captured. The waveform is rendered progressively as the recording cursor moves rightward.
4486 | - Recording clip label: "[Recording]" in 10px, red
4487 | 
4488 | **Real-time waveform during recording:**
4489 | - The incoming audio is rendered as a live waveform filling the clip area as the playhead moves
4490 | - The waveform updates at 30fps (adequate for visual feedback without excessive GPU use)
4491 | - Color: red at 60% opacity (matches record state)
4492 | 
4493 | ## 77.3 Take Management
4494 | 
4495 | After multiple recordings on the same track with loop recording enabled, take lanes appear:
4496 | 
4497 | **Take lane visual:**
4498 | - Takes stack below the main track header
4499 | - Each take is 20px tall (compact, to maximize visible takes)
4500 | - Active take: full opacity waveform
4501 | - Inactive takes: waveform at 35% opacity
4502 | - Take label: "Take 1", "Take 2" etc. in 9px Geist Mono, left-aligned in lane
4503 | - The "best take" (user-indicated) has a small star icon at right of lane label
4504 | 
4505 | ---
4506 | 
4507 | # 78. LIVE PERFORMANCE UX
4508 | 
4509 | ## 78.1 Performance Mode Activation
4510 | 
4511 | Performance mode is activated via: Transport bar → "Performance" button (visible when the clip launcher view is active), or via the Workspace preset "Performance."
4512 | 
4513 | **Performance mode indicator:**
4514 | - A persistent "LIVE" badge appears in the transport bar (right of the loop button)
4515 | - Badge: 40×20px, background `rgba(239, 68, 68, 0.15)`, border `rgba(239, 68, 68, 0.30)`, text "LIVE" in 10px Inter Semibold, `#EF4444`
4516 | - The badge pulses very subtly: opacity 0.8 → 1.0 → 0.8, 2s cycle (slower than record pulse — calmer)
4517 | 
4518 | ## 78.2 Clip Launcher View
4519 | 
4520 | **Layout:**
4521 | 
4522 | ```
4523 | CLIP LAUNCHER
4524 | 
4525 | Track headers: top row, same width as columns
4526 |   Each header: track name, mute, solo (horizontal layout in header)
4527 | 
4528 | Scene launch buttons: leftmost column (64px wide)
4529 |   Each scene: scene name (editable), launch button (▶)
4530 | 
4531 | Clip grid: tracks (columns) × scenes (rows)
4532 |   Each cell: clip clip trigger button
4533 | 
4534 | Column footer: track stop button (■)
4535 | ```
4536 | 
4537 | **Clip cell design:**
4538 | - Size: fills column width × 56px height
4539 | - Empty cell: dashed border `rgba(255,255,255,0.10)`, 4px border-radius, no content
4540 | - Loaded cell: track color fill at 15%, clip name in 11px Inter Regular, centered
4541 | - Playing cell: track color fill at 30%, a progress bar at the bottom (2px, track color, fills left-to-right as clip plays through)
4542 | - Triggered (queued): a countdown ring animation clockwise fills the cell border over the quantize period
4543 | 
4544 | **Scene launch button:**
4545 | - Width: 64px, height: 56px (matching clip row height)
4546 | - Contains: scene name (11px, left-aligned) + ▶ icon (right-aligned, 16px)
4547 | - Active scene: left border 2px accent color
4548 | - Hover: background Level 3 surface
4549 | 
4550 | ## 78.3 Performance Mode UI Reductions
4551 | 
4552 | In performance mode, the following are automatically reduced:
4553 | - UI frame rate targeting: halved (30fps UI instead of 60fps — frees CPU for audio)
4554 | - All non-essential UI animations: disabled
4555 | - The arrangement view is not accessible (it's unnecessary during performance and adds memory pressure)
4556 | - Plugin edit UIs cannot be opened (a "Performance mode active" tooltip appears if attempted)
4557 | 
4558 | ---
4559 | 
4560 | # 79. FUTURE EXPANSION PHILOSOPHY
4561 | 
4562 | ## 79.1 Design System Extensibility
4563 | 
4564 | The AUDIAW design system is built to accommodate future features without requiring system-wide redesign:
4565 | 
4566 | **New panels:** Any new panel must fit within the existing Left / Right / Bottom zone structure. If a new panel doesn't fit in existing zones, a new zone category must be defined (with an RFC process) rather than violating the existing spatial grammar.
4567 | 
4568 | **New instrument views:** New built-in instruments (if added) must use the existing device card container system and the standard parameter display patterns (label-value pairs, knobs, sliders). Instrument-specific visual elements (e.g., a wavetable display, an FM operator diagram) are placed inside the device card expanded area.
4569 | 
4570 | **New meters and visualizations:** New DSP visualizations must follow the GPU rendering rules (Section 54) and the visual specification style established by the spectrum analyzer and level meters. They must use the existing surface and text token system.
4571 | 
4572 | ## 79.2 Design Debt Management
4573 | 
4574 | As new features are added, the design system must be audited quarterly:
4575 | 
4576 | - Are any new features using hardcoded values (not tokens)?
4577 | - Are any new components inconsistent with existing component standards?
4578 | - Has the type scale been violated?
4579 | - Have new colors been introduced that aren't on the Color Permission List?
4580 | 
4581 | Design debt is tracked as issues labeled `design-debt` in the repository. These issues are prioritized in every release sprint. No design debt may be introduced by a feature PR without a corresponding `design-debt` issue being filed simultaneously.
4582 | 
4583 | ## 79.3 Non-Negotiable Design Principles (Version-Locked)
4584 | 
4585 | These principles will not change with future AUDIAW versions. They are locked:
4586 | 
4587 | 1. The application is fundamentally dark-themed. Light theme is secondary.
4588 | 2. The spatial grammar (top/left/center/right/bottom zones) is fixed.
4589 | 3. The monochrome principle (color serves only functional communication) is fixed.
4590 | 4. GPU-rendered waveforms are non-negotiable.
4591 | 5. No animation may delay user action.
4592 | 6. No UI element requires a network connection to render.
4593 | 7. Accessibility is not a feature — it is a quality standard.
4594 | 
4595 | ---
4596 | 
4597 | *End of AUDIAW DESIGN.md*
4598 | 
4599 | *Version 1.0.0 — This document represents the complete design specification for AUDIAW. It is a living document updated with each significant design decision. Changes require a design RFC and maintainer approval.*
4600 | 
4601 | *"Sound, engineered."*
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs
package.json,pnpm-workspace.yaml,.gitignore,src-tauri/Cargo.toml,src-tauri/build.rs,index.html,vite.config.ts,app-icon.png.svg,src-tauri/tauri.conf.json,src/index.css,DOCS/V0.5_TECHNICAL_SPECIFICATION.md,crates/audiaw-project/Cargo.toml,tsconfig.json,tsconfig.node.json,tailwind.config.js,postcss.config.js,SETUP.md,VERIFICATION.md,src/styles/theme.ts,src/styles/animations.css

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T22:19:20.404Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$1.22

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<attempt_completion>
<result>
# AUDIAW Design System Specification - Comprehensive Analysis

I've completed a thorough analysis of the AUDIAW-DESIGN.md file (4602 lines). Below is a structured summary of all design specifications organized by category.

---

## 1. DESIGN PHILOSOPHY & IDENTITY

### Core Principles
- **Product Vision**: Professional DAW where the interface is invisible, becoming an extension of user intent
- **Design Philosophy**: "Less but better" - Dieter Rams inspired, industrial design honesty
- **Three Governing Rules**:
  1. Does this aid the work?
  2. Is this the simplest form that fully communicates?
  3. Is this consistent with established spatial memory?

### Visual Identity
- **Primary References**: Nothing Phone/OS, Teenage Engineering OP-1, Linear, Universal Audio hardware
- **Visual Language**: Dark ground, monochrome structure, weight through tone, functional color isolation, typographic precision
- **Emotional Goals**: Support psychological flow, immediate understanding, direct control, earned depth

---

## 2. COLOR SYSTEM

### Surface Depth Model (5 Levels)
```
Level 0 (Void):      #0D0D0F
Level 1 (Base):      #111115
Level 2 (Raised):    #1A1A21
Level 3 (Elevated):  #22222C
Level 4 (Floating):  #2C2C39
Level 5 (Highest):   #363645
```

### Neutral Scale (HSL-based)
```
--neutral-900: hsl(240, 10%, 6%)   #0D0D0F
--neutral-850: hsl(240, 9%, 8%)    #111115
--neutral-800: hsl(240, 10%, 11%)  #1A1A21
--neutral-750: hsl(240, 10%, 14%)  #22222C
--neutral-700: hsl(240, 10%, 17%)  #2C2C39
--neutral-650: hsl(240, 9%, 20%)   #363645
--neutral-600: hsl(240, 8%, 28%)   #444455
--neutral-500: hsl(240, 6%, 42%)   #696978
--neutral-400: hsl(240, 5%, 55%)   #8888A0
--neutral-300: hsl(240, 4%, 68%)   #AAAABB
--neutral-200: hsl(240, 4%, 82%)   #CCCCDD
--neutral-100: hsl(240, 3%, 92%)   #EAEAEC
```

### Status Colors
```
Record:    hsl(0, 83%, 60%)    #EF4444
Record Dim: hsl(0, 83%, 35%)   #8B2020
Warning:   hsl(38, 90%, 50%)   #F59E0B
Error:     hsl(0, 83%, 60%)    #EF4444
Success:   hsl(142, 70%, 45%)  #22C55E
Info:      hsl(213, 94%, 68%)  #60A5FA
```

### Meter Colors
```
Safe:      hsl(142, 70%, 45%)  #22C55E  (0 to -12 dBFS)
Caution:   hsl(38, 90%, 50%)   #F59E0B  (-12 to -3 dBFS)
Danger:    hsl(0, 83%, 60%)    #EF4444  (-3 to 0 dBFS)
Clip:      hsl(0, 100%, 50%)   #FF0000  (Clipping)
Background: hsl(240, 10%, 9%)  #131318
```

### Track Color Palette (16 Colors)
Each with Main, Dim (30% sat), and Bright (waveform) variants:
1. Crimson (0°), 2. Ember (20°), 3. Amber (38°), 4. Gold (50°)
5. Lime (84°), 6. Emerald (142°), 7. Teal (170°), 8. Cyan (186°)
9. Blue (213°), 10. Violet (262°), 11. Fuchsia (292°), 12. Rose (341°)
13. Slate (215°), 14. Stone (25°), 15. Neutral (240°), 16. White (240°)

### Accent Color System
- **Default**: `hsl(213, 90%, 60%)` #3B8BF5 (Blue)
- **User-Configurable**: Blue, Indigo, Violet, Emerald, Teal, Amber, Rose, White
- **Usage**: Focus rings, active tabs, primary buttons, selection highlights, loop regions, playhead head, clip selection borders

### Monochrome UI Rules
**Color Permission List** (ONLY these contexts may use color):
1. Track/clip colors (user-assigned)
2. Level meter colors
3. Record status (red)
4. Loop markers (accent)
5. Playhead indicator (white)
6. Automation lanes (saturated colors)
7. Accent interactive elements
8. Status indicators
9. Waveform fill (track color 40% opacity)
10. MIDI note fill (track color 70% opacity)
11. Plugin crash indicator (red)
12. Dot-matrix displays (white/red)

---

## 3. TYPOGRAPHY SYSTEM

### Font Stack
- **Primary UI**: Inter Variable (400, 500, 600 weights only)
- **Monospace/Display**: Geist Mono
- **Fallbacks**: `system-ui, -apple-system, BlinkMacSystemFont, sans-serif` / `"JetBrains Mono", "Fira Code", ui-monospace, monospace`

### Type Scale
```
--type-2xs:  9px   (Keyboard shortcuts, microscopic labels)
--type-xs:  10px   (Meter ticks, secondary status bar)
--type-sm:  11px   (Compact track names, tabs, tooltips)
--type-base: 12px  (Standard UI text, track names, menus)
--type-md:  13px   (Panel headers, important labels)
--type-lg:  14px   (Prominent values, dialog titles)
--type-xl:  16px   (Section headers in settings)
--type-2xl: 20px   (Onboarding headings, templates)
--type-3xl: 28px   (Startup wordmark, splash)
```

### Font Weights
- Regular: 400 (body text, labels, inputs, menus)
- Medium: 500 (panel headers, tabs, buttons, track names)
- Semibold: 600 (section titles, modal titles)
- **No weights above 600, no italic in UI**

### Line Heights
```
--leading-tight:   1.2   (Single-line labels, buttons)
--leading-snug:    1.35  (Multi-line labels, controls)
--leading-normal:  1.5   (Body text in docs)
--leading-relaxed: 1.65  (Onboarding, tutorials)
```

### Letter Spacing
```
--tracking-tight:  -0.01em  (Large display 20px+)
--tracking-normal:  0em     (Standard 12-16px)
--tracking-wide:    0.04em  (Small uppercase 10-11px)
--tracking-wider:   0.08em  (All-caps micro 9-10px)
--tracking-widest:  0.12em  (Dot-matrix display)
```

### Text Opacity Hierarchy
```
--text-primary:   rgba(255, 255, 255, 0.92)  (Main content, active)
--text-secondary: rgba(255, 255, 255, 0.58)  (Labels, secondary)
--text-tertiary:  rgba(255, 255, 255, 0.35)  (Placeholders, disabled)
--text-ghost:     rgba(255, 255, 255, 0.18)  (Almost invisible)
```

### Text Rendering
```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;
font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
```

---

## 4. SPACING SYSTEM

### Base Grid: 4px unit (all spacing multiples of 4px)

### Spacing Scale
```
--space-0:    0px
--space-px:   1px   (Border-only gaps)
--space-1:    4px   (Inline icon-label gap)
--space-2:    8px   (Intra-control spacing)
--space-3:   12px   (Control group spacing)
--space-4:   16px   (Standard panel padding)
--space-5:   20px   (Moderate section separation)
--space-6:   24px   (Large section gap)
--space-8:   32px   (Major structural separation)
--space-10:  40px   (Large layout anchoring)
--space-12:  48px   (Maximum inline spacing)
--space-16:  64px   (Maximum layout spacing)
```

### Application-Specific Constants
```
--height-transport-bar:        52px
--height-status-bar:           22px
--height-tab-bar:              34px
--height-track-compact:        32px
--height-track-standard:       48px
--height-track-tall:           80px
--height-track-max:           200px
--width-track-header:         216px
--width-track-header-min:     160px
--width-mixer-channel-compact: 56px
--width-mixer-channel:         72px
--width-mixer-channel-wide:    96px
--height-piano-key-width:      80px
--height-velocity-editor:      80px
--height-context-menu-item:    32px
--height-dropdown-item:        32px
--height-toolbar-button:       28px
--radius-standard:              4px
--radius-large:                 6px
--radius-pill:                 99px
```

### Component Padding Rules
**Buttons**: Small (4px/8px), Standard (6px/12px), Large (8px/16px)
**Input fields**: 28px height, 8px horizontal padding
**Panel sections**: 16px all sides
**Dropdown menus**: 6px vertical, 12px horizontal per item

---

## 5. LAYOUT ARCHITECTURE

### Primary Layout Zones (Fixed Semantic Structure)
```
┌─────────────────────────────────────────────────┐
│  TRANSPORT ZONE (52px, always visible)          │
├──────┬──────────────────────────────────┬───────┤
│ LEFT │     PRIMARY CANVAS ZONE          │ RIGHT │
│PANEL │  (arrangement/mixer/piano roll)  │ PANEL │
│160-  │                                  │ 200-  │
│400px │                                  │ 520px │
├──────┴──────────────────────────────────┴───────┤
│  BOTTOM PANEL ZONE (collapsible, 0-50% height)  │
├─────────────────────────────────────────────────┤
│  STATUS BAR ZONE (22px, always visible)         │
└─────────────────────────────────────────────────┘
```

### Zone Sizing
- **Transport**: 52px fixed height, Level 2 surface, 16px horizontal padding
- **Left Panel**: Default 260px, min 160px, max 400px, collapsible
- **Right Panel**: Default 320px, min 200px, max 520px, collapsible
- **Bottom Panel**: Default 0px (collapsed), min 160px, max 50% window height
- **Status Bar**: 22px fixed height, Level 1 surface, 12px horizontal padding
- **Minimum Window**: 900px × 600px

### Border Language
```
Structural borders:  rgba(255, 255, 255, 0.07), 1px solid
Interactive borders: rgba(255, 255, 255, 0.10), 1px solid
Focus borders:       Accent color 100%, 1.5px solid
Status borders:      Record/Warning/Error specific colors
```

---

## 6. MOTION DESIGN SYSTEM

### Animation Duration Scale
```
--duration-instant:   0ms    (Immediate, no transition)
--duration-micro:    60ms    (Button press, hover enter)
--duration-fast:     90ms    (Hover exit, panel resize)
--duration-standard:120ms    (Panel open/close, selection)
--duration-moderate: 180ms   (Modal enter/exit)
--duration-slow:     240ms   (Workspace switch, view transitions)
--duration-crawl:    400ms   (Startup, onboarding)
```

### Easing Curves
```css
--ease-out:      cubic-bezier(0.16, 1, 0.3, 1);      /* Fast start, decelerate */
--ease-in:       cubic-bezier(0.7, 0, 0.84, 0);      /* Slow start, fast end */
--ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1);     /* Both directions */
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);       /* Classic ease-out */
--ease-spring:   cubic-bezier(0.34, 1.12, 0.64, 1);  /* Slight overshoot ≤12% */
```

### Animation Rules (Absolute)
- **Rule A**: No animation may delay user action
- **Rule B**: No looping animations in main interface (except record blink, loading spinners)
- **Rule C**: All animations respect `prefers-reduced-motion`
- **Rule D**: No animation on elements updating >10Hz
- **Rule E**: Waveforms never animate

### Specific Animations
- **Panel open**: 150ms ease-out, width/translateX
- **Panel close**: 120ms ease-in
- **Modal enter**: 180ms ease-out, backdrop fade + content translateY(+16px→0) + opacity
- **Modal exit**: 120ms ease-in, opacity only
- **Context menu open**: 90ms ease-out, scale(0.94→1.0) + opacity
- **Hover enter**: 60ms ease-out
- **Hover exit**: 90ms ease-out
- **Tooltip appear**: 600ms delay, 90ms ease-out, opacity only
- **Workspace switch**: 240ms ease-standard, opacity crossfade

---

## 7. INTERACTION PATTERNS

### Hover States
- **Track header**: Background Level 2→3, controls fade in (60ms), fade out (90ms)
- **Clip**: Border brightens, header background increases, resize handles appear
- **Button**: Background +rgba(255,255,255,0.05), border opacity +0.05
- **Icon-only**: Icon opacity 0.50→0.80, optional background rgba(255,255,255,0.06)

### Focus States
```css
:focus-visible {
  outline: 1.5px solid var(--accent-primary);
  outline-offset: 2px;
  border-radius: 4px;
}
```
- Applied immediately (0ms)
- Always 100% opacity
- Text inputs: bottom border becomes accent color
- Knobs/faders: arrow keys adjust values

### Button Press Feedback
1. Pointer-down: Background +rgba(255,255,255,0.04), scale(0.98) in 60ms
2. Pointer-up: Scale→1.0 in 90ms, background→hover state
- Scale only applied if button >24px smallest dimension

### Cursor Behavior
- Default: `default`
- Clickable: `pointer`
- Text input: `text`
- Panel resize: `col-resize` / `row-resize`
- Fader/knob: `ns-resize`
- Clip drag: `grab` / `grabbing`
- Pencil tool: `crosshair`
- Custom: Eraser, Scissors (SVG cursors)

---

## 8. COMPONENT SPECIFICATIONS

### Buttons (4 Variants)
**Primary**: Accent background, white text, 32px height, 14px padding, 4px radius
**Secondary**: rgba(255,255,255,0.06) background, 1px border, 32px height
**Ghost**: Transparent background, text-only, 32px height, 10px padding
**Danger**: Red tinted background, red text, red border, 32px height

### Input Fields
- Height: 28px
- Background: Level 1 surface
- Border: 1px default, 1.5px accent on focus
- Font: 12px Inter
- Padding: 0 8px
- Placeholder: text-ghost opacity

### Toggle Switch
- Track: 32×18px, 9px radius
- Thumb: 14×14px circle, white
- Off: rgba(255,255,255,0.12) background
- On: Accent background
- Transition: fast ease-out (background), fast ease-spring (thumb)

### Knob
- Diameter: 36px
- Ring: 1px border, rgba(255,255,255,0.12)
- Indicator track: 3px stroke, rgba(255,255,255,0.10), 280° arc
- Indicator fill: 3px stroke, accent color
- Dot: 4px white, on arc edge
- Value tooltip on drag: 11px Geist Mono

### Dropdown/Select
- Trigger: 28px height, Level 2 surface, 1px border
- Panel: Level 4 surface, 6px radius, shadow
- Items: 32px height, 12px padding
- Selected: accent-dim background, 2px left accent border

---

## 9. SPECIALIZED UI ELEMENTS

### Dot-Matrix Display (Nothing-Inspired)
```css
font-family: "Geist Mono", monospace;
font-size: 14-22px (context-dependent);
letter-spacing: 0.08-0.12em;
color: rgba(255, 255, 255, 0.90);
text-shadow: 0 0 8px rgba(255, 255, 255, 0.15);
background: #0D0D0F;
```
**Contexts**: Transport time, BPM, sample rate, buffer size, clip position, startup sequence
**States**: Inactive (0.35 opacity), Active (0.92 opacity), Recording (red #EF4444)

### Dot-Grid Background Texture
```css
background-image: radial-gradient(
  circle,
  rgba(255, 255, 255, 0.04) 1px,
  transparent 1px
);
background-size: 20px 20px;
```
**Usage**: Empty arrangement lanes, empty mixer areas, startup screen
**Rules**: Only on empty surfaces, disappears when content present, never animates

### Level Meters
- Width: 4px (standard), 3px (compact)
- Background: #131318
- Gradient: Green (#22C55E) → Amber (#F59E0B) → Red (#EF4444)
- Peak hold: 1px line, 2s hold, 6dB/s decay
- Update: 60fps during playback
- Clip indicator: Entire bar red above 0dBFS

### Waveform Rendering (GPU/WGPU)
- **RMS fill**: Track color 45% opacity
- **Peak outline**: Track color 75% opacity, 1px line
- **Selected**: RMS 65%, Peak 90% opacity
- **Zero axis**: rgba(255,255,255,0.08), 1px horizontal
- **Rendering**: GPU canvas, not DOM, 60fps updates
- **Mip levels**: 5 levels for different zoom ranges

---

## 10. TIMELINE & ARRANGEMENT

### Ruler Design
- Height: 28px
- Background: Level 2 surface
- Font: 10px Geist Mono, rgba(255,255,255,0.45)
- **Primary markers**: Every bar, 12px line, labeled
- **Secondary markers**: Every beat, 8px line
- **Tertiary markers**: Sub-beats, 4px line

### Grid Lines
```
Bar lines:      rgba(255, 255, 255, 0.10), 1px
Beat lines:     rgba(255, 255, 255, 0.05), 1px
Sub-beat lines: rgba(255, 255, 255, 0.03), 1px (≥24px/beat)
16th lines:     rgba(255, 255, 255, 0.02), 1px (≥48px/beat)
```
**Performance**: GPU-rendered, cached per zoom level

### Playhead
- Line: 1px, rgba(255,255,255,0.70), full canvas height
- Head: 10×8px downward triangle, accent color
- Recording: Line and head become red (#EF4444, 0.70 opacity)
- Update: 60fps, no transition (instant = exact position)

### Loop Region
- Fill: Accent color 10% opacity
- Borders: Accent color 50% opacity, 1px
- Handles: 6×20px, accent color, draggable, appear on ruler hover

### Clip Design (Audio)
```
Container: track_color 14% opacity background
Border: track_color 35% opacity, 1px, 3px top radius
Header: 16px height, track_color 28% opacity
Name: 11px Inter Medium, rgba(255,255,255,0.80)
Waveform: GPU-rendered, track_color 40% fill, 70% outline
Selected: 1.5px accent border, brighter header
```

### Clip Design (MIDI)
- Same container/header as audio
- MIDI notes: Horizontal bars, track_color 70% opacity
- Min height: 2px per note
- GPU-rendered

---

## 11. MIXER & CHANNEL STRIPS

### Mixer Layout
```
[Master] [Groups] [Tracks] [Returns]
```
- Master: 88px wide, gold accent strip
- Standard channel: 72px wide
- Compact: 56px, Wide: 96px

### Channel Strip Structure (Top to Bottom)
1. **Plugin Insert Slots**: 72×22px each, max 6
2. **Send Slots**: 72×20px each, variable
3. **Pan Control**: 28px height, 20px knob
4. **Fader Area**: Remaining height, min 100px
   - Track: 4px wide, centered
   - Cap: 32×14px, rounded
   - Unity mark: 20px line at 0dB
5. **Level Meter**: 12px wide, L/R bars (4px each, 2px gap)
6. **Fader Value**: 14px height, 11px Geist Mono
7. **M/S/R Buttons**: 22px height row, 24×22px each
8. **Track Name**: 20px height, track color 20% background

---

## 12. PIANO ROLL

### Layout
```
┌─────────────────────────────────────┐
│  TOOLBAR (28px)                     │
├──────────┬──────────────────────────┤
│ PIANO    │  NOTE GRID               │
│ KEYS     │  (GPU-rendered)          │
│ 80px     │                          │
├──────────┴──────────────────────────┤
│  VELOCITY EDITOR (80px)             │
└─────────────────────────────────────┘
```

### Piano Keys
- **White keys**: rgba(255,255,255,0.10), C notes labeled
- **Black keys**: Level 1 surface, 52px wide (65% of white)
- **Hover**: White +0.08, Black +0.08 opacity
- **Active (MIDI)**: White 0.30, Black 0.20 opacity
- **Scale highlight**: 2px left accent border on scale notes

### MIDI Notes
- Fill: Track color 70% opacity
- Border: Track color 100%, 1px
- Border-radius: 2px
- Min-width: 4px (16px if selected)
- Selected: 90% opacity fill, 1.5px accent border

### Velocity Editor
- Height: 80px
- Bars: Match note width, min 2px
- Fill: Track color gradient (40%→90% bottom to top)
- Selected: Accent color gradient

---

## 13. AUTOMATION

### Automation Lane
- Height: Matches track height (min 32px)
- Header: 2px left border in automation color
- Content: rgba(0,0,0,0.15) overlay on track
- Parameter name: 11px Inter Medium
- Value: 10px Geist Mono

### Automation Curve
- Line: 1.5px, automation lane color
- Breakpoints: 6px circle, lane color, 1px white border
- Hover: 8px diameter (60ms ease-out)
- Segments: Linear (straight), Smooth (bezier), Step (horizontal+vertical)
- Fill below curve: Lane color 12% opacity

---

## 14. TRANSPORT CONTROLS

### Transport Bar Layout (52px)
```
LEFT: [Rewind] [Play/Pause] [Stop] [Record]
CENTER: [Time] [BPM] [Time Sig] [Loop] [Metro]
RIGHT: [Project Name] [CPU] [Memory] [Workspace]
```

### Play/Pause Button (Primary)
- Size: 36×36px circular
- Rest: rgba(255,255,255,0.08) background
- Playing: Accent color fill
- Icon: 14px play triangle or pause bars

### Record Button
- Size: 28×28px circular
- Armed: rgba(139,32,32,0.15) background, #8B2020 icon
- Recording: #EF4444 background, white icon, pulses (1s cycle)

### Time Display (Dot-Matrix)
- Format: `001 . 01 . 001` (Bar.Beat.Tick)
- Font: 22px Geist Mono, 0.12em spacing
- Width: 220px fixed
- Playing: rgba(255,255,255,0.90)
- Stopped: rgba(255,255,255,0.40)

### BPM Display
- Font: 18px Geist Mono
- Format: "140.00" (2 decimals always)
- Width: 80px fixed
- Drag vertically to adjust
- Shift+drag: 10× slower (0.01 precision)

---

## 15. MODALS & OVERLAYS

### Modal Dialog
- Background: Level 4 surface
- Border: 1px rgba(255,255,255,0.15)
- Border-radius: 8px
- Shadow: `0 24px 80px rgba(0,0,0,0.80)`
- Backdrop: rgba(0,0,0,0.40) (no blur)
- Enter: 180ms ease-out, translateY(+16px→0) + opacity
- Exit: 120ms ease-in, opacity only

### Context Menu
- Background: Level 4 surface
- Border: 1px rgba(255,255,255,0.12)
- Border-radius: 6px
- Shadow: `0 8px 32px rgba(0,0,0,0.70)`
- Padding: 4px vertical, 0px horizontal
- Items: 32px height, 12px padding
- Enter: 90ms ease-out, scale(0.94→1.0) + opacity
- Exit: 60ms ease-in, opacity only

### Command Palette
- Width: 560px, max-height 480px
- Position: Centered horizontal, 20% from top
- Background: Level 4 surface
- Border-radius: 8px
- Search input: 52px height, 15px font
- Results: 40px per item
- Active result: rgba(255,255,255,0.08) background, 2px left accent border

### Tooltip
- Background: Level 4 surface
- Font: 11px Inter Regular
- Padding: 4px vertical, 6px horizontal
- Border-radius: 4px
- Delay: 600ms static hover
- Appear: 90ms ease-out, opacity only
- Dismiss: 60ms, no delay

---

## 16. LOADING & ERROR STATES

### Loading Spinner
- Size: 16px (standard), 12px (compact)
- Visual: Circle, 2px stroke, 60° gap
- Colors: Full circle rgba(255,255,255,0.15), arc rgba(255,255,255,0.70)
- Animation: 360° rotation, 500ms linear infinite

### Progress Bar
- Height: 2px (in notification bar)
- Background: rgba(255,255,255,0.10)
- Fill: Accent color, left-to-right
- Indeterminate: 40% wide bar, 1.2s loop ease-in-out

### Error Banner (Non-Critical)
- Height: 32px
- Background: rgba(245, 158, 11, 0.12) (amber tint)
- Left border: 2px #F59E0B
- Content: Warning icon + message + dismiss button

### Error Banner (Critical)
- Height: 40px
- Background: rgba(239, 68, 68, 0.12) (red tint)
- Left border: 2px #EF4444
- Content: Alert icon + message + action button + dismiss

### Empty States
- Icon: 20-32px, opacity 0.20
- Primary text: 12-13px Inter Medium, opacity 0.35
- Secondary text: 11px Inter Regular, opacity 0.25
- No buttons (keyboard shortcuts provided instead)

---

## 17. ACCESSIBILITY

### WCAG 2.1 AA Compliance
- Normal text (<18px): 4.5:1 minimum, 5.5:1+ target
- Large text (≥18px or ≥14px bold): 3:1 minimum, 4.0:1+ target
- UI components: 3:1 minimum, 3.5:1+ target

### Verified Contrast Ratios
- Primary text on Level 2: 11.2:1 ✓
- Secondary text on Level 2: 5.8:1 ✓
- Tertiary text on Level 2: 3.4:1 ✓

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  /* Position/scale animations → instant (0.01ms) */
  /* Opacity transitions → allowed but halved */
  /* Record blink → solid red */
}
```

### Screen Reader Support
- ARIA landmark regions for all major zones
- Live regions for transport state and critical alerts
- Meter levels announced on request (Alt+M)
- All interactive elements keyboard accessible

### Keyboard Navigation
- Tab order: Transport → Canvas → Left Panel → Right Panel → Bottom Panel
- Arrow keys: Navigate within components
- Focus ring: 1.5px accent, 2px offset, always visible
- All shortcuts shown in tooltips/menus

---

## 18. PERFORMANCE CONSTRAINTS

### Design Rules for Performance
- **P1**: No blur effects anywhere
- **P2**: No box-shadow on animated elements
- **P3**: `will-change` only on actively animating elements
- **P4**: Virtualized lists for >100 items
- **P5**: No CSS gradients in >10Hz update paths
- **P6**: React.memo required in track list

### Frame Budget (60fps = 16.7ms)
- DOM React updates: 4ms
- CSS transitions: 2ms
- WGPU waveform: 3ms
- WGPU meters: 0.5ms
- WGPU spectrum: 0.5ms
- Compositor: 2ms
- Buffer: 4.2ms

### GPU Rendering
- **GPU-rendered**: Waveforms, MIDI grid, spectrum, meters, timeline grid, automation curves
- **DOM-rendered**: All other UI (React)
- **Constraint**: No DOM elements over WGPU canvas (use overlay layer)

---

## 19. DESIGN TOKENS (CSS Custom Properties)

```css
:root {
  /* SURFACES */
  --surface-void: #0D0D0F;
  --surface-base: #111115;
  --surface-raised: #1A1A21;
  --surface-elevated: #22222C;
  --surface-overlay: #2C2C39;
  --surface-highest: #363645;

  /* TEXT */
  --text-primary: rgba(255, 255, 255, 0.92);
  --text-secondary: rgba(255, 255, 255, 0.58);
  --text-tertiary: rgba(255, 255, 255, 0.35);
  --text-ghost: rgba(255, 255, 255, 0.18);

  /* BORDERS */
  --border-subtle: rgba(255, 255, 255, 0.07);
  --border-default: rgba(255, 255, 255, 0.10);
  --border-strong: rgba(255, 255, 255, 0.20);
  --border-focus: var(--accent-primary);

  /* ACCENT */
  --accent-primary: #3B8BF5;
  --accent-secondary: #60A5FA;
  --accent-dim: rgba(59, 139, 245, 0.15);

  /* STATUS */
  --status-record: #EF4444;
  --status-record-dim: #8B2020;
  --status-warning: #F59E0B;
  --status-error: #EF4444;
  --status-success: #22C55E;
  --status-mute: #F59E0B;
  --status-solo: #06B6D4;

  /* METERS */
  --meter-safe: #22C55E;
  --meter-caution: #F59E0B;
  --meter-danger: #EF4444;
  --meter-clip: #FF0000;
  --meter-bg: #131318;

  /* TYPOGRAPHY */
  --font-ui: "Inter Variable", system-ui, sans-serif;
  --font-mono: "Geist Mono", monospace;
  --size-2xs: 9px; --size-xs: 10px; --size-sm: 11px;
  --size-base: 12px; --size-md: 13px; --size-lg: 14px;
  --size-xl: 16px; --size-2xl: 20px; --size-3xl: 28px;
  --weight-regular: 400; --weight-medium: 500; --weight-semibold: 600;

  /* SPACING */
  --space-1: 4px; --space-2: 8px; --space-3: 12px;
  --space-4: 16px; --space-5: 20px; --space-6: 24px;
  --space-8: 32px; --space-10: 40px; --space-12: 48px;

  /* LAYOUT */
  --height-transport: 52px; --height-statusbar: 22px;
  --height-tabbar: 34px; --height-track-compact: 32px;
  --height-track-standard: 48px; --height-track-tall: 80px;
  --width-track-header: 216px; --width-mixer-channel: 72px;

  /* RADIUS */
  --radius-sm: 2px; --radius-base: 4px; --radius-lg: 6px;
  --radius-xl: 8px; --radius-full: 9999px;

  /* MOTION */
  --duration-micro: 60ms; --duration-fast: 90ms;
  --duration-standard: 120ms; --duration-moderate: 180ms;
  --duration-slow: 240ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.12, 0.64, 1);
}
```

---

## 20. CONTRIBUTION RULES

### Design Contribution Standards
- **C1**: Use only design tokens (no hardcoded values)
- **C2**: Follow component library (build from existing components)
- **C3**: Accessibility is not optional (keyboard, focus, ARIA)
- **C4**: Performance is a design constraint (no jank)
- **C5**: Mockup before code (Figma review required)
- **C6**: Follow monochrome principle (Color Permission List only)

### Non-Negotiable Principles (Version-Locked)
1. Fundamentally dark-themed (light theme secondary)
2. Spatial grammar fixed (top/left/center/right/bottom zones)
3. Monochrome principle fixed (color = function only)
4. GPU-rendered waveforms non-negotiable
5. No animation may delay user action
6. No UI requires network connection
7. Accessibility is quality standard, not feature

---

## SUMMARY

The AUDIAW design system is a comprehensive, meticulously specified design language built on principles of industrial design, functional honesty, and professional audio workflow optimization. Every aspect—from the 4px base grid to the 60fps frame budget—is precisely defined to create a cohesive, performant, and accessible professional audio workstation.

Key characteristics:
- **Monochrome-first**: Color serves only functional communication
- **Nothing-inspired**: Dot-matrix displays, structural whitespace, typographic precision
- **Performance-conscious**: GPU rendering, virtualization, strict frame budgets
- **Accessibility-native**: WCAG 2.1 AA compliance, keyboard navigation, screen reader support
- **Token-based**: All values defined as CSS custom properties for consistency and themability
- **Spatially consistent**: Fixed semantic zones preserve spatial memory

The system is designed to be extensible while maintaining strict design discipline through contribution rules and version-locked principles.
</result>
</attempt_completion>

