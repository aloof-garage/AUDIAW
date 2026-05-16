# Contributing

Thanks for helping improve AUDIAW. Keep contributions focused, tested, and easy to review.

## Start Here

1. Fork the repository.
2. Clone your fork.
3. Install dependencies with `pnpm install`.
4. Create a branch for your change.
5. Make the smallest useful change.
6. Run verification.
7. Open a pull request.

```bash
git clone https://github.com/YOUR_USERNAME/AUDIAW.git
cd AUDIAW
pnpm install
git checkout -b feature/my-change
```

## Verification

Run these before opening a pull request:

```bash
npm run build:frontend
cargo check
```

When changing release packaging, also run the platform build available on your machine:

```bash
npm run build:windows
npm run build:macos
npm run build:linux
```

## Pull Requests

Before submitting:

- Keep the change scoped to one purpose.
- Update docs when behavior changes.
- Do not modify `audiaw-marketing/` unless the change is specifically about the website.
- Do not commit generated build folders such as `dist/`, `target/`, or `dist-release/`.
- Explain what changed and how you verified it.

## Code Style

- TypeScript and React live in `src/`.
- Rust crates live in `crates/` and `src-tauri/`.
- Prefer existing patterns over new abstractions.
- Keep UI behavior responsive and desktop-focused.
- Avoid adding dependencies unless they clearly reduce maintenance burden.

## Commit Messages

Use short, imperative messages:

```text
feat: add project autosave recovery
fix: preserve export path extension
docs: simplify release guide
build: add Linux AppImage workflow
```

## Bug Reports

Include:

- AUDIAW version
- Operating system
- Steps to reproduce
- Expected result
- Actual result
- Screenshots or logs when useful

## Feature Requests

Describe:

- The workflow you want to improve
- Why the current behavior is insufficient
- Any examples from real DAW usage

## License

By contributing, you agree your contribution is licensed under GPL-3.0.
