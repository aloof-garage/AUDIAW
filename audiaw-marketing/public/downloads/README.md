# AUDIAW Downloads Folder

This folder is maintained for backward compatibility and local testing, but **production downloads now use GitHub Releases**.

## Current Download Strategy

### Production (Recommended)
All download links on the website point to **GitHub Releases**:
- **URL Format:** `https://github.com/aloof-garage/AUDIAW/releases/latest/download/AUDIAW-Setup.exe`
- **Benefits:**
  - No large binaries in git repository
  - Automatic versioning through GitHub
  - Reliable CDN delivery via GitHub
  - Easy rollback to previous versions
  - No repository size bloat

### Local Files (Backup/Testing)
- **AUDIAW-Setup.exe** - Windows installer (3.2MB, tracked in git for fallback)
- **.gitkeep** - Ensures folder structure is maintained

## How It Works

### Website Configuration
The landing page (`app/page.tsx`) uses GitHub Release URLs:
```typescript
const releaseAssetUrl = `${repoUrl}/releases/latest/download`;

const downloadOptions = [
  {
    platform: "Windows",
    href: `${releaseAssetUrl}/AUDIAW-Setup.exe`,
    available: true,
  },
  // ... other platforms
];
```

### Download Headers
Headers are configured for the `/downloads/` path (for local fallback):

1. **vercel.json** - Vercel-specific configuration
2. **next.config.ts** - Next.js headers configuration

**Headers applied:**
- `Content-Disposition: attachment` - Forces browser to download
- `Cache-Control: public, max-age=31536000, immutable` - Aggressive caching
- `X-Content-Type-Options: nosniff` - Security header

## Releasing a New Version

### Step 1: Build the installer
```bash
# From the root of the AUDIAW project
npm run tauri build
```

### Step 2: Create a GitHub Release
```bash
# Tag the release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Or use GitHub CLI
gh release create v1.0.0 \
  src-tauri/target/release/bundle/nsis/AUDIAW_*_x64-setup.exe#AUDIAW-Setup.exe \
  --title "AUDIAW v1.0.0" \
  --notes "Release notes here"
```

### Step 3: Rename the asset (if needed)
When uploading to GitHub Releases, ensure the file is named exactly:
- `AUDIAW-Setup.exe` (for Windows)
- `AUDIAW-macos.dmg` (for macOS, when available)
- `AUDIAW-linux-x86_64.AppImage` (for Linux, when available)

### Step 4: Verify the download
Test the GitHub Release URL:
```bash
curl -I https://github.com/aloof-garage/AUDIAW/releases/latest/download/AUDIAW-Setup.exe
```

Check for:
- `302 Found` redirect to actual download URL
- Final `200 OK` status
- Correct file size in `Content-Length` header

### Step 5: Website automatically updates
The website uses `/releases/latest/download/` which automatically serves the newest release.
No website deployment needed!

## Advantages of GitHub Releases Strategy

### Benefits
✅ **No repository bloat** - Binaries stored separately from code
✅ **Automatic versioning** - Each release is tagged and versioned
✅ **Reliable CDN** - GitHub's global CDN serves downloads
✅ **Easy rollback** - Previous versions remain accessible
✅ **Changelog integration** - Release notes alongside downloads
✅ **Free hosting** - No additional costs for file storage
✅ **Bandwidth** - GitHub handles all download traffic
✅ **Security** - GitHub's infrastructure and checksums

### Comparison with Alternatives

| Strategy | Repo Size | Cost | Complexity | Reliability |
|----------|-----------|------|------------|-------------|
| **GitHub Releases** ✅ | Clean | Free | Low | High |
| Git LFS | Moderate | Paid | Medium | Medium |
| External Storage (S3) | Clean | Paid | High | High |
| Vercel Blob | Clean | Paid | Medium | High |
| Direct in Repo | Bloated | Free | Low | Medium |

### Why GitHub Releases Wins
- **Zero cost** for open-source projects
- **Zero configuration** beyond creating releases
- **Automatic latest** via `/releases/latest/download/` URL
- **Built-in versioning** with git tags
- **Community standard** for distributing software

## Security & Integrity

### Code Signing
The Windows installer should be code-signed before release:
- Prevents Windows SmartScreen warnings
- Verifies publisher identity
- Increases user trust
- See `WINDOWS_SIGNING_AND_RELEASE.md` for details

### Checksums
GitHub automatically provides SHA256 checksums for all release assets.
Users can verify downloads using GitHub's checksums.

### HTTPS
All downloads are served over HTTPS:
- GitHub Releases: `https://github.com/...`
- Ensures integrity during download
- Prevents man-in-the-middle attacks

## Troubleshooting

### Download not working from GitHub

1. **Check if release exists:**
   ```bash
   gh release view latest
   ```

2. **Verify asset name:**
   ```bash
   gh release view latest --json assets
   ```
   Asset must be named exactly `AUDIAW-Setup.exe`

3. **Test the URL:**
   ```bash
   curl -I https://github.com/aloof-garage/AUDIAW/releases/latest/download/AUDIAW-Setup.exe
   ```
   Should return `302 Found` redirect

4. **Check release visibility:**
   - Release must be published (not draft)
   - Repository must be public or user must have access

### Local fallback not working

If you need to serve from `/downloads/` locally:
1. Ensure file is in git: `git ls-files public/downloads/`
2. Check Vercel deployment logs
3. Verify headers with: `curl -I https://your-domain.com/downloads/AUDIAW-Setup.exe`

## Best Practices

1. **Consistent naming:** Always use exact filenames:
   - `AUDIAW-Setup.exe` (Windows)
   - `AUDIAW-macos.dmg` (macOS)
   - `AUDIAW-linux-x86_64.AppImage` (Linux)

2. **Release workflow:**
   ```bash
   # 1. Build
   npm run tauri build
   
   # 2. Tag version
   git tag -a v1.0.0 -m "Release v1.0.0"
   git push origin v1.0.0
   
   # 3. Create release with asset
   gh release create v1.0.0 \
     src-tauri/target/release/bundle/nsis/AUDIAW_*_x64-setup.exe#AUDIAW-Setup.exe \
     --title "AUDIAW v1.0.0" \
     --notes-file RELEASE_NOTES.md
   ```

3. **Testing checklist:**
   - [ ] Build completes successfully
   - [ ] Installer is code-signed (production)
   - [ ] GitHub release is published
   - [ ] Download URL works: `curl -I https://github.com/aloof-garage/AUDIAW/releases/latest/download/AUDIAW-Setup.exe`
   - [ ] Website download button works
   - [ ] Installer runs and installs correctly

4. **Version management:**
   - Use semantic versioning (v1.0.0, v1.1.0, etc.)
   - Tag releases in git
   - Write clear release notes
   - Keep previous releases available for rollback

## Maintenance

### Regular Checks
- **Per release:** Test download functionality
- **Monthly:** Review GitHub release analytics
- **Quarterly:** Update documentation if process changes

### Monitoring
- Check GitHub release download counts
- Monitor user feedback on installation issues
- Track Windows SmartScreen warnings (indicates need for code signing)

## Quick Reference

### Current Setup
- **Strategy:** GitHub Releases (production-ready)
- **Windows URL:** `https://github.com/aloof-garage/AUDIAW/releases/latest/download/AUDIAW-Setup.exe`
- **Fallback:** Local file in `public/downloads/` (3.2MB, tracked in git)
- **Headers:** Configured in `vercel.json` and `next.config.ts`

### Key Files
- `app/page.tsx` - Download button configuration
- `vercel.json` - Vercel deployment headers
- `next.config.ts` - Next.js headers
- `.gitignore` - File tracking rules

---

**Last updated:** 2026-05-18
**Strategy:** GitHub Releases (recommended for production)