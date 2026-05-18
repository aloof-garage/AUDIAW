# AUDIAW Marketing Website

Standalone Next.js marketing website for AUDIAW, separate from the main Tauri/Vite application.

## Tech

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Vercel free tier
- GitHub Releases for downloads

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Free Deployment

### Vercel Dashboard

1. Push this repo to GitHub.
2. Go to https://vercel.com/new.
3. Import `aloof-garage/AUDIAW`.
4. Set **Root Directory** to `audiaw-marketing`.
5. Keep the framework preset as `Next.js`.
6. Click **Deploy**.

### Vercel CLI

```bash
cd audiaw-marketing
vercel login
vercel --yes
```

Use `vercel --yes --prod` when you are ready to publish the production domain.

## Download System

The website serves Windows installers directly from the `/public/downloads/` directory:

- **Windows**: `/downloads/AUDIAW-Setup.exe` (served directly from Vercel)
- **macOS**: Coming soon (will use GitHub Releases)
- **Linux**: Coming soon (will use GitHub Releases)

### Updating the Windows Installer

1. Build the Windows installer:
   ```bash
   cd src-tauri
   pnpm tauri build
   ```

2. The installer will be created at:
   ```
   src-tauri/target/release/bundle/nsis/AUDIAW_1.0.0_x64-setup.exe
   ```

3. Copy it to the marketing website:
   ```bash
   cp src-tauri/target/release/bundle/nsis/AUDIAW_*_x64-setup.exe audiaw-marketing/public/downloads/AUDIAW-Setup.exe
   ```

4. Commit and push:
   ```bash
   git add audiaw-marketing/public/downloads/AUDIAW-Setup.exe
   git commit -m "Update Windows installer to v1.0.0"
   git push
   ```

5. Vercel will automatically redeploy with the new installer.

### Download Configuration

The download buttons are configured in `app/page.tsx`:

```typescript
const downloadOptions = [
  {
    platform: "Windows",
    href: `/downloads/AUDIAW-Setup.exe`,  // Served from public/downloads/
    available: true,
  },
  {
    platform: "macOS",
    href: `${releaseAssetUrl}/AUDIAW-macos.dmg`,  // GitHub Releases
    available: false,  // Coming soon
  },
  // ...
];
```

### File Size Considerations

- The Windows installer is ~50-100MB
- Vercel free tier has a 100MB file size limit per deployment
- If the installer exceeds this, consider:
  - Using GitHub Releases for all platforms
  - Upgrading to Vercel Pro
  - Using a CDN like Cloudflare R2

### Security Notes

- Installers are served over HTTPS via Vercel's CDN
- Users should verify the installer after download
- See `WINDOWS_RELEASE_GUIDE.md` for code signing instructions

For more details on the Windows build process, see the main project's `WINDOWS_RELEASE_GUIDE.md`.
