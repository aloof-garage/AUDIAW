# Contributing to AUDIAW

> Thank you for your interest in contributing to AUDIAW! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)
- [Community Guidelines](#community-guidelines)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of experience level, gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality.

### Our Standards

**Positive behavior includes**:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes**:
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team. All complaints will be reviewed and investigated promptly and fairly.

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Found a bug? Help us fix it!

1. **Check existing issues** - Someone may have already reported it
2. **Create a new issue** - Use the bug report template
3. **Provide details**:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - System information (OS, version)
   - Error messages or logs

### 💡 Suggesting Features

Have an idea for a new feature?

1. **Check the roadmap** - It might already be planned
2. **Search existing issues** - Someone may have suggested it
3. **Create a feature request** - Use the feature request template
4. **Explain the use case** - Why is this feature needed?
5. **Describe the solution** - How should it work?

### 📝 Improving Documentation

Documentation improvements are always welcome!

- Fix typos or unclear explanations
- Add examples or tutorials
- Improve API documentation
- Translate documentation (future)

### 💻 Contributing Code

Ready to write code? Great!

1. **Find an issue** - Look for issues labeled `good first issue` or `help wanted`
2. **Comment on the issue** - Let others know you're working on it
3. **Fork the repository**
4. **Create a branch** - Use a descriptive name
5. **Write code** - Follow our coding standards
6. **Test your changes** - Ensure everything works
7. **Submit a pull request** - Use the PR template

---

## Development Setup

### Prerequisites

- **Rust** 1.75+ ([install](https://rustup.rs/))
- **Node.js** 20+ ([install](https://nodejs.org/))
- **pnpm** 8+ (`npm install -g pnpm`)
- **Git** ([install](https://git-scm.com/))

### Setup Steps

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/audiaw.git
cd audiaw

# 3. Add upstream remote
git remote add upstream https://github.com/audiaw/audiaw.git

# 4. Install dependencies
pnpm install

# 5. Create a branch
git checkout -b feature/my-feature

# 6. Start development server
pnpm dev
```

### Keeping Your Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Merge upstream changes into your branch
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```

---

## Pull Request Process

### Before Submitting

- [ ] Code follows our style guidelines
- [ ] All tests pass (`cargo test`)
- [ ] Code is formatted (`cargo fmt`, `pnpm format`)
- [ ] No linter warnings (`cargo clippy`, `pnpm lint`)
- [ ] Documentation is updated if needed
- [ ] Commit messages follow our guidelines
- [ ] Branch is up to date with main

### Submitting a PR

1. **Push your branch** to your fork
2. **Open a pull request** on GitHub
3. **Fill out the PR template** completely
4. **Link related issues** (e.g., "Fixes #123")
5. **Request review** from maintainers
6. **Respond to feedback** promptly

### PR Review Process

1. **Automated checks** run (CI/CD)
2. **Maintainer review** - May request changes
3. **Address feedback** - Make requested changes
4. **Approval** - PR is approved
5. **Merge** - Maintainer merges your PR

### After Merge

- Your contribution is now part of AUDIAW! 🎉
- You'll be added to the contributors list
- Delete your feature branch

---

## Coding Standards

### Rust Code Style

**Follow Rust conventions**:

```rust
// Use snake_case for functions and variables
fn process_audio_buffer(sample_rate: u32) -> Vec<f32> {
    // Implementation
}

// Use CamelCase for types
struct AudioEngine {
    sample_rate: u32,
}

// Use SCREAMING_SNAKE_CASE for constants
const MAX_BUFFER_SIZE: usize = 4096;

// Document public APIs
/// Process audio samples
/// 
/// # Arguments
/// * `samples` - Input samples to process
/// 
/// # Returns
/// Processed samples
pub fn process(samples: &[f32]) -> Vec<f32> {
    // Implementation
}
```

**Format with rustfmt**:
```bash
cargo fmt
```

**Lint with clippy**:
```bash
cargo clippy -- -D warnings
```

### TypeScript Code Style

**Follow TypeScript conventions**:

```typescript
// Use camelCase for functions and variables
function processAudioBuffer(sampleRate: number): Float32Array {
  // Implementation
}

// Use PascalCase for types and components
interface AudioConfig {
  sampleRate: number;
}

function TransportBar() {
  // Implementation
}

// Use SCREAMING_SNAKE_CASE for constants
const MAX_BUFFER_SIZE = 4096;

// Document complex functions
/**
 * Process audio samples
 * @param samples - Input samples to process
 * @returns Processed samples
 */
function process(samples: Float32Array): Float32Array {
  // Implementation
}
```

**Format with Prettier**:
```bash
pnpm format
```

**Lint with ESLint**:
```bash
pnpm lint
```

### General Guidelines

1. **Keep functions small** - One responsibility per function
2. **Use meaningful names** - Descriptive variable and function names
3. **Comment complex logic** - Explain why, not what
4. **Avoid magic numbers** - Use named constants
5. **Handle errors properly** - Don't ignore errors
6. **Write tests** - Test your code
7. **Keep it simple** - Prefer simple solutions

---

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `ci` - CI/CD changes
- `build` - Build system changes

### Scopes

- `engine` - Audio engine
- `ui` - User interface
- `store` - State management
- `project` - Project management
- `transport` - Transport controls
- `mixer` - Mixer functionality
- `docs` - Documentation
- `deps` - Dependencies

### Examples

```bash
# Feature
feat(engine): add tempo control to audio engine

# Bug fix
fix(ui): correct track height calculation in arrangement view

# Documentation
docs(readme): update installation instructions for Windows

# Refactoring
refactor(store): simplify transport state management

# Performance
perf(engine): optimize audio buffer processing

# Tests
test(engine): add tests for track creation

# Chore
chore(deps): update Rust dependencies
```

### Rules

1. **Use imperative mood** - "add" not "added" or "adds"
2. **Don't capitalize first letter** - "add feature" not "Add feature"
3. **No period at the end** - "add feature" not "add feature."
4. **Keep it concise** - Max 72 characters for description
5. **Reference issues** - Use "Fixes #123" in footer

---

## Issue Reporting

### Bug Reports

Use the bug report template and include:

**Required Information**:
- Clear, descriptive title
- Steps to reproduce
- Expected behavior
- Actual behavior
- AUDIAW version
- Operating system and version
- Error messages or logs
- Screenshots (if applicable)

**Example**:

```markdown
**Title**: Audio playback stutters on Windows 11

**Description**:
Audio playback stutters every few seconds when playing back a project with 4+ tracks.

**Steps to Reproduce**:
1. Create a new project
2. Add 4 audio tracks
3. Add audio clips to each track
4. Press play

**Expected Behavior**:
Smooth audio playback without stuttering

**Actual Behavior**:
Audio stutters every 2-3 seconds

**Environment**:
- AUDIAW version: 0.1.0
- OS: Windows 11 22H2
- CPU: Intel i5-10400
- RAM: 16GB

**Logs**:
```
[ERROR] Buffer underrun detected
```

**Screenshots**:
[Attach screenshot if relevant]
```

---

## Feature Requests

Use the feature request template and include:

**Required Information**:
- Clear, descriptive title
- Problem description
- Proposed solution
- Alternative solutions considered
- Use cases
- Priority (nice-to-have, important, critical)

**Example**:

```markdown
**Title**: Add MIDI support for virtual instruments

**Problem**:
Currently, AUDIAW only supports audio tracks. Users cannot use MIDI controllers or virtual instruments.

**Proposed Solution**:
Add MIDI track type that can:
- Record MIDI input from controllers
- Display MIDI notes in piano roll
- Route MIDI to virtual instruments
- Support MIDI CC automation

**Alternatives**:
- Audio-only workflow (current limitation)
- External MIDI routing through DAW

**Use Cases**:
- Electronic music production
- Composing with virtual instruments
- MIDI controller integration

**Priority**: Important
```

---

## Community Guidelines

### Communication Channels

- **GitHub Issues** - Bug reports, feature requests
- **GitHub Discussions** - General questions, ideas
- **Discord** (coming soon) - Real-time chat
- **Twitter** (coming soon) - Updates and announcements

### Getting Help

**Before asking for help**:
1. Check the documentation
2. Search existing issues
3. Try the troubleshooting guide

**When asking for help**:
- Be specific about your problem
- Include relevant details (OS, version, etc.)
- Show what you've tried
- Be patient and respectful

### Helping Others

- Be welcoming to newcomers
- Share your knowledge
- Point to relevant documentation
- Be patient and kind

---

## Recognition

### Contributors

All contributors are recognized in:
- README.md contributors section
- GitHub contributors page
- Release notes

### Significant Contributions

Major contributions may be highlighted in:
- Blog posts
- Social media
- Project announcements

---

## Questions?

- **Documentation**: Check [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/audiaw/audiaw/issues)
- **Discussions**: [GitHub Discussions](https://github.com/audiaw/audiaw/discussions)
- **Email**: contact@audiaw.org (coming soon)

---

## License

By contributing to AUDIAW, you agree that your contributions will be licensed under the GPL-3.0 License.

---

**Thank you for contributing to AUDIAW!** 🎵

Every contribution, no matter how small, helps make AUDIAW better for everyone.

---

**Last Updated**: 2026-05-15  
**Version**: 0.1.0 MVP  
**Maintainers**: AUDIAW Contributors