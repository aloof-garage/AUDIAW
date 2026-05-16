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

Downloads point to the official GitHub Releases page:

https://github.com/aloof-garage/AUDIAW/releases/latest
