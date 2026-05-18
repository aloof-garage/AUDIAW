# AUDIAW Downloads Folder

This folder contains the AUDIAW desktop application installer files that are served to users through the marketing website.

## Current Files

- **AUDIAW-Setup.exe** - Windows installer for AUDIAW (tracked in git)
- **.gitkeep** - Ensures the folder structure is maintained in git

## Deployment Configuration

### Git Tracking

The `AUDIAW-Setup.exe` file is **explicitly tracked in git** despite the general `.gitignore` pattern that excludes `.exe` files. This is necessary for Vercel deployment.

**Why tracked in git?**
- Vercel deploys only files that are committed to the repository
- Binary files in `public/` folder need to be in git to be served
- The negation pattern `!public/downloads/AUDIAW-Setup.exe` in `.gitignore` allows this specific file

### Download Headers

Download files are configured with proper HTTP headers in two places for redundancy:

1. **vercel.json** - Vercel-specific configuration
2. **next.config.ts** - Next.js headers configuration

**Headers applied:**
- `Content-Disposition: attachment` - Forces browser to download instead of displaying
- `Cache-Control: public, max-age=31536000, immutable` - Aggressive caching for performance
- `X-Content-Type-Options: nosniff` - Security header to prevent MIME type sniffing

## Updating the Installer

### Step 1: Build the new installer
```bash
# From the root of the AUDIAW project
npm run tauri build
```

### Step 2: Copy the new installer
```bash
# Copy from Tauri build output to marketing site
cp src-tauri/target/release/bundle/nsis/AUDIAW_*_x64-setup.exe audiaw-marketing/public/downloads/AUDIAW-Setup.exe
```

### Step 3: Force add to git
```bash
cd audiaw-marketing
git add -f public/downloads/AUDIAW-Setup.exe
```

### Step 4: Commit and push
```bash
git commit -m "Update AUDIAW installer to version X.Y.Z"
git push
```

### Step 5: Verify deployment
After Vercel deploys, test the download:
```bash
curl -I https://your-domain.com/downloads/AUDIAW-Setup.exe
```

Check for:
- `Content-Disposition: attachment` header
- `200 OK` status
- Correct file size

## File Size Considerations

### Current Approach
- **Pros:**
  - Simple deployment process
  - No external dependencies
  - Fast CDN delivery via Vercel
  - Version control of installers

- **Cons:**
  - Large binary files in git repository
  - Increases repository size over time
  - Git is not optimized for binary files

### Repository Size Management

**Current file size:** Check with:
```bash
ls -lh audiaw-marketing/public/downloads/AUDIAW-Setup.exe
```

**Monitor repository size:**
```bash
git count-objects -vH
```

### Alternative Deployment Strategies

If the repository becomes too large, consider these alternatives:

#### Option 1: Git LFS (Large File Storage)
```bash
# Install Git LFS
git lfs install

# Track the exe file with LFS
git lfs track "audiaw-marketing/public/downloads/*.exe"

# Add and commit
git add .gitattributes
git add audiaw-marketing/public/downloads/AUDIAW-Setup.exe
git commit -m "Move installer to Git LFS"
```

**Note:** Vercel supports Git LFS, but it counts against your bandwidth quota.

#### Option 2: External Storage (S3, R2, etc.)
- Upload installers to cloud storage (AWS S3, Cloudflare R2)
- Update download links to point to storage URLs
- Implement signed URLs for security if needed
- Remove binary from git repository

#### Option 3: GitHub Releases
- Attach installers to GitHub releases
- Update download links to GitHub release assets
- Automatic versioning and changelog
- No impact on repository size

#### Option 4: Vercel Blob Storage
- Use Vercel's blob storage for large files
- Upload via Vercel CLI or API
- Serve through Vercel's CDN
- Pay-per-use pricing

## Security Considerations

### File Integrity
Consider adding checksums for download verification:

```bash
# Generate SHA256 checksum
sha256sum AUDIAW-Setup.exe > AUDIAW-Setup.exe.sha256

# Users can verify:
sha256sum -c AUDIAW-Setup.exe.sha256
```

### Code Signing
For production releases, the installer should be code-signed:
- Prevents Windows SmartScreen warnings
- Verifies publisher identity
- Increases user trust

## Troubleshooting

### Download not working on Vercel

1. **Check if file is in git:**
   ```bash
   git ls-files audiaw-marketing/public/downloads/AUDIAW-Setup.exe
   ```
   Should return the file path if tracked.

2. **Check Vercel deployment logs:**
   - Look for file size warnings
   - Check if file was included in deployment

3. **Verify headers:**
   ```bash
   curl -I https://your-domain.com/downloads/AUDIAW-Setup.exe
   ```

4. **Check .gitignore:**
   Ensure the negation pattern is present:
   ```
   public/downloads/*.exe
   !public/downloads/AUDIAW-Setup.exe
   ```

### File size limits

- **Git:** No hard limit, but large files slow down operations
- **GitHub:** Warning at 50MB, block at 100MB (use Git LFS)
- **Vercel:** 100MB per file limit for deployments
- **Git LFS:** 1GB free storage, then paid tiers

## Best Practices

1. **Version naming:** Consider including version in filename:
   ```
   AUDIAW-Setup-v1.0.0.exe
   ```

2. **Keep old versions:** For rollback capability:
   ```
   AUDIAW-Setup-v1.0.0.exe
   AUDIAW-Setup-v1.1.0.exe
   AUDIAW-Setup.exe (symlink or copy of latest)
   ```

3. **Automated updates:** Create a script to automate the update process

4. **Release notes:** Maintain a changelog alongside installers

5. **Testing:** Always test downloads after deployment

## Maintenance Schedule

- **Weekly:** Check download functionality
- **Monthly:** Review repository size
- **Per release:** Update installer and verify deployment
- **Quarterly:** Evaluate alternative storage strategies if needed

## Contact

For issues with the download system, contact the development team or check the main project documentation.

---

Last updated: 2026-05-18