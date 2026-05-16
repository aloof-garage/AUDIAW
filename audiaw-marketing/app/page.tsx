"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  AudioWaveform,
  Code2,
  Download,
  Github,
  GitFork,
  Laptop,
  Menu,
  MonitorDown,
  Play,
  Radio,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  X,
} from "lucide-react";

const repoUrl = "https://github.com/aloof-garage/AUDIAW";
const releasesUrl = `${repoUrl}/releases/latest`;
const releaseAssetUrl = `${releasesUrl}/download`;

const navItems = [
  ["Product", "#product"],
  ["Workflow", "#workflow"],
  ["Open Source", "#open-source"],
  ["Download", "#download"],
];

const downloadOptions = [
  {
    platform: "Windows",
    detail: "x64 setup installer",
    icon: MonitorDown,
    href: `${releaseAssetUrl}/AUDIAW-windows-x64-setup.exe`,
  },
  {
    platform: "macOS",
    detail: "DMG desktop app",
    icon: Laptop,
    href: `${releaseAssetUrl}/AUDIAW-macos.dmg`,
  },
  {
    platform: "Linux",
    detail: "x86_64 AppImage",
    icon: Terminal,
    href: `${releaseAssetUrl}/AUDIAW-linux-x86_64.AppImage`,
  },
];

const features = [
  {
    eyebrow: "Arrange",
    title: "A timeline made for speed",
    body: "Dense tracks, clip-first editing, zoomable grids, and transport feedback keep the session readable at production scale.",
  },
  {
    eyebrow: "Design",
    title: "Industrial, low-noise interface",
    body: "Matte surfaces, precise contrast, and hardware-inspired controls keep attention on sound instead of chrome.",
  },
  {
    eyebrow: "Engine",
    title: "Open foundation",
    body: "Built as a free, contributor-friendly DAW with a roadmap for native performance and modern production workflows.",
  },
];

const workflow = [
  "Sketch beats in the arrangement view",
  "Shape MIDI in a focused piano roll",
  "Balance tracks with clear metering",
  "Export and share without lock-in",
];

const tracks = [
  { name: "Kick", color: "#3B8BF5", clips: [0, 8, 16, 24] },
  { name: "Snare", color: "#8B5CF6", clips: [4, 12, 20, 28] },
  { name: "Hi-Hat", color: "#22C55E", clips: [0, 6, 14, 22] },
  { name: "808 Bass", color: "#F59E0B", clips: [0, 12, 18] },
  { name: "Synth Lead", color: "#EC4899", clips: [8, 20] },
  { name: "Atmosphere", color: "#06B6D4", clips: [0] },
];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroShift = useTransform(scrollYProgress, [0, 0.22], [0, -70]);
  const heroGlow = useTransform(scrollYProgress, [0, 0.22], [1, 0.35]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-surface-void text-primary">
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-black">
        Skip to content
      </a>
      <div className="noise" aria-hidden="true" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="hero-radiance relative min-h-[calc(100svh-64px)] overflow-hidden pt-14 sm:pt-16">
        <motion.div
          aria-hidden="true"
          style={{ y: heroShift, opacity: heroGlow }}
          className="absolute inset-x-0 top-20 h-[520px] bg-dot-grid bg-[length:22px_22px] opacity-[0.16] mask-fade"
        />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-surface-void" aria-hidden="true" />
        <div id="content" className="section-shell relative grid min-h-[calc(100svh-80px)] items-center gap-8 py-8 lg:grid-cols-[0.86fr_1.14fr] lg:py-0">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.09 }}
            className="max-w-[620px]"
          >
            <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-3 border border-white/10 bg-white/[0.035] px-3 py-2 text-[11px] text-secondary backdrop-blur">
              <span className="h-1.5 w-1.5 bg-accent shadow-signal" />
              <span className="font-mono uppercase tracking-[0.18em]">Free open-source DAW</span>
            </motion.div>
            <motion.p variants={fadeUp} className="mono-label mb-3">AUDIAW</motion.p>
            <motion.h1 variants={fadeUp} className="max-w-[700px] text-balance text-[clamp(3.7rem,7.8vw,7.1rem)] font-medium leading-[0.86] tracking-normal">
              Sound,
              <br />
              engineered.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-pretty text-lg leading-8 text-secondary sm:text-xl">
              A next-generation digital audio workstation for modern producers, built with a precise dark interface and an open-source core.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="#download" icon={Download}>Download AUDIAW</PrimaryLink>
              <SecondaryLink href={repoUrl} icon={Github}>View GitHub</SecondaryLink>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 36 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative min-h-[430px] lg:min-h-[620px]"
          >
            <div className="absolute inset-0 -right-28 rounded-full bg-accent/20 blur-[140px]" aria-hidden="true" />
            <DawStage />
          </motion.div>
        </div>
      </section>

      <SignalBand />

      <Section id="product" eyebrow="Product Showcase" title="A studio-grade workspace with no visual noise.">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <LargePreview />
          </Reveal>
          <div className="space-y-8">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.08}>
                <div className="border-l border-white/10 pl-5">
                  <p className="mono-label mb-3">{feature.eyebrow}</p>
                  <h3 className="text-2xl font-medium text-primary">{feature.title}</h3>
                  <p className="mt-3 max-w-md leading-7 text-secondary">{feature.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <section id="workflow" className="relative border-y border-white/[0.08] bg-white/[0.025] py-24 sm:py-32">
        <div className="section-shell">
          <div className="grid gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
            <Reveal>
              <p className="mono-label mb-5">Workflow</p>
              <h2 className="max-w-xl text-balance text-4xl font-medium leading-tight sm:text-6xl">
                From first loop to finished mix.
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-secondary">
                AUDIAW is shaped around the moments producers repeat all day: arranging, editing, balancing, and exporting.
              </p>
            </Reveal>
            <div className="space-y-1">
              {workflow.map((item, index) => (
                <Reveal key={item} delay={index * 0.07}>
                  <div className="group grid grid-cols-[52px_1fr_auto] items-center border-b border-white/[0.075] py-6 transition-colors duration-200 hover:border-white/20">
                    <span className="font-mono text-sm text-tertiary">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-xl text-primary sm:text-2xl">{item}</span>
                    <ArrowRight className="h-5 w-5 translate-x-0 text-tertiary transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section id="screenshots" eyebrow="Previews" title="Every surface feels like a focused production instrument.">
        <div className="grid gap-5 md:grid-cols-3">
          <PreviewPanel title="Arrangement" metric="64 bars" tone="#3B8BF5" />
          <PreviewPanel title="Piano Roll" metric="1/16 grid" tone="#8B5CF6" />
          <PreviewPanel title="Mixer" metric="48 kHz" tone="#22C55E" />
        </div>
      </Section>

      <section id="open-source" className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(59,139,245,0.18),transparent_34%,rgba(255,255,255,0.045)_68%,transparent)]" aria-hidden="true" />
        <div className="section-shell relative grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <Reveal>
            <p className="mono-label mb-5">Open Source</p>
            <h2 className="text-balance text-4xl font-medium leading-tight sm:text-6xl">
              Premium software, public by design.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-secondary">
              AUDIAW is built on GitHub so producers and developers can inspect the code, report issues, fork experiments, and contribute to the future of open music software.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href={repoUrl} icon={Star}>Star the repo</PrimaryLink>
              <SecondaryLink href={`${repoUrl}/fork`} icon={GitFork}>Fork AUDIAW</SecondaryLink>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="border border-white/10 bg-black/35 p-5 shadow-studio backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-primary" />
                  <span className="font-mono text-sm text-secondary">aloof-garage/AUDIAW</span>
                </div>
                <Code2 className="h-5 w-5 text-tertiary" />
              </div>
              <div className="grid gap-px py-5">
                {["src/components/ArrangementView", "src/components/Transport", "src-tauri/audio-engine", "DOCS/contributing"].map((path, index) => (
                  <div key={path} className="grid grid-cols-[28px_1fr_auto] items-center bg-white/[0.035] px-3 py-3 text-sm">
                    <span className="font-mono text-tertiary">{index + 1}</span>
                    <span className="font-mono text-secondary">{path}</span>
                    <span className="h-1.5 w-1.5 bg-accent" />
                  </div>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <MiniStat icon={ShieldCheck} label="Free tier" value="Deploy" />
                <MiniStat icon={Code2} label="License" value="Open" />
                <MiniStat icon={Radio} label="Community" value="GitHub" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="download" className="border-t border-white/[0.08] bg-[#050506] py-24 sm:py-32">
        <div className="section-shell">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mono-label mb-5">Download</p>
              <h2 className="text-balance text-4xl font-medium leading-tight sm:text-6xl">
                Install AUDIAW from GitHub Releases.
              </h2>
              <p className="mt-6 text-lg leading-8 text-secondary">
                Windows, macOS, and Linux builds are distributed through the project’s free GitHub release channel.
              </p>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {downloadOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <Reveal key={option.platform} delay={index * 0.08}>
                  <a
                    href={option.href}
                    className="download-focus group block min-h-[220px] border border-white/10 bg-white/[0.035] p-6 transition duration-200 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]"
                    aria-label={`Download AUDIAW for ${option.platform}`}
                  >
                    <Icon className="h-8 w-8 text-primary" />
                    <h3 className="mt-10 text-2xl font-medium">{option.platform}</h3>
                    <p className="mt-3 leading-7 text-secondary">{option.detail}</p>
                    <div className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-primary">
                      Download <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={0.15}>
            <div className="mt-8 border border-white/10 bg-white/[0.025] p-5 text-center text-sm leading-7 text-secondary">
              Each platform button downloads the matching asset from the latest GitHub Release.
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Navbar({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#070708]/78 backdrop-blur-xl">
      <nav className="section-shell flex h-16 items-center justify-between" aria-label="Primary navigation">
        <a href="#" className="flex items-center gap-3" aria-label="AUDIAW home">
          <span className="grid h-8 w-8 place-items-center border border-white/15 bg-white/[0.04]">
            <AudioWaveform className="h-4 w-4" />
          </span>
          <span className="font-mono text-sm uppercase tracking-[0.24em]">AUDIAW</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} className="text-sm text-secondary transition-colors hover:text-primary">
              {label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <a href={repoUrl} className="inline-flex h-10 items-center gap-2 border border-white/10 px-4 text-sm text-secondary transition hover:border-white/20 hover:text-primary">
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a href="#download" className="inline-flex h-10 items-center gap-2 bg-white px-4 text-sm font-medium text-black transition hover:bg-accent hover:text-white">
            Download
          </a>
        </div>
        <button
          className="grid h-10 w-10 place-items-center border border-white/10 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {menuOpen ? (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="border-t border-white/10 bg-[#070708] px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-2">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)} className="border border-white/10 px-4 py-3 text-secondary">
                {label}
              </a>
            ))}
            <a href="#download" onClick={() => setMenuOpen(false)} className="bg-white px-4 py-3 text-center font-medium text-black">
              Download
            </a>
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}

function DawStage() {
  return (
    <div className="absolute inset-0 flex items-center justify-center lg:justify-end">
      <div className="relative w-full max-w-[780px] rotate-0 lg:rotate-[-2deg]">
        <div className="absolute -inset-8 bg-accent/20 blur-3xl" aria-hidden="true" />
        <div className="relative overflow-hidden border border-white/12 bg-[#0a0a0c] shadow-studio">
          <div className="flex h-12 items-center justify-between border-b border-white/10 bg-white/[0.035] px-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-status-error" />
              <span className="h-2.5 w-2.5 bg-status-warning" />
              <span className="h-2.5 w-2.5 bg-status-success" />
            </div>
            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-tertiary">
              <span>128 BPM</span>
              <span>4/4</span>
              <span>48 kHz</span>
            </div>
          </div>
          <div className="grid grid-cols-[118px_1fr] sm:grid-cols-[150px_1fr]">
            <div className="border-r border-white/10 bg-white/[0.025]">
              {tracks.map((track) => (
                <div key={track.name} className="flex h-[52px] items-center gap-3 border-b border-white/[0.06] px-3">
                  <span className="h-2 w-2" style={{ background: track.color }} />
                  <span className="truncate font-mono text-[11px] text-secondary">{track.name}</span>
                </div>
              ))}
            </div>
            <div className="relative overflow-hidden bg-[#0c0c10]">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:52px_100%]" />
              <motion.div
                className="absolute bottom-0 top-0 w-px bg-white/60 shadow-signal"
                animate={{ left: ["8%", "91%", "8%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              {tracks.map((track, row) => (
                <div key={track.name} className="relative h-[52px] border-b border-white/[0.055]">
                  {track.clips.map((start, index) => (
                    <motion.div
                      key={`${track.name}-${start}`}
                      className="clip absolute top-2 h-8 border"
                      style={{
                        left: `${4 + start * 2.8}%`,
                        width: track.name === "Atmosphere" ? "72%" : `${13 + index * 2}%`,
                        borderColor: `${track.color}88`,
                        backgroundColor: `${track.color}22`,
                      }}
                      animate={{ opacity: [0.64, 1, 0.64] }}
                      transition={{ duration: 2.8 + index, repeat: Infinity, delay: row * 0.12 }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex h-16 items-center justify-between border-t border-white/10 bg-white/[0.025] px-4">
            <div className="flex items-center gap-2">
              <button className="grid h-9 w-9 place-items-center bg-white text-black" aria-label="Play demo preview">
                <Play className="h-4 w-4 fill-current" />
              </button>
              <span className="font-mono text-[11px] text-secondary">003 . 02 . 240</span>
            </div>
            <div className="flex items-end gap-1" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, index) => (
                <motion.span
                  key={index}
                  className="w-1 bg-accent"
                  animate={{ height: [8, 28 + ((index * 9) % 24), 12] }}
                  transition={{ duration: 1.1, repeat: Infinity, delay: index * 0.04 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalBand() {
  return (
    <div className="border-y border-white/[0.08] bg-white/[0.025] py-4">
      <div className="section-shell mask-fade overflow-hidden">
        <motion.div
          className="flex min-w-max gap-10 font-mono text-xs uppercase tracking-[0.18em] text-tertiary"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].flatMap(() => [
            "Arrangement",
            "Piano Roll",
            "Mixer",
            "Automation",
            "Open Source",
            "GitHub Releases",
            "Native Workflow",
            "Free Forever",
          ]).map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-10">
              {item}
              <span className="h-px w-14 signal-line" />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-24 sm:py-32">
      <div className="section-shell">
        <Reveal>
          <div className="mb-14 max-w-3xl">
            <p className="mono-label mb-5">{eyebrow}</p>
            <h2 className="text-balance text-4xl font-medium leading-tight sm:text-6xl">{title}</h2>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function LargePreview() {
  return (
    <div className="overflow-hidden border border-white/10 bg-[#09090b] shadow-studio">
      <div className="grid grid-cols-[96px_1fr] border-b border-white/10 bg-white/[0.035] p-3 font-mono text-[10px] uppercase tracking-[0.14em] text-tertiary">
        <span>Track</span>
        <span>Timeline 001-064</span>
      </div>
      <div className="grid grid-cols-[96px_1fr]">
        <div>
          {tracks.slice(0, 5).map((track) => (
            <div key={track.name} className="flex h-14 items-center border-b border-white/[0.065] px-3">
              <span className="truncate font-mono text-[11px] text-secondary">{track.name}</span>
            </div>
          ))}
        </div>
        <div className="relative overflow-hidden bg-[#0d0d11]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[length:48px_100%]" />
          {tracks.slice(0, 5).map((track) => (
            <div key={track.name} className="relative h-14 border-b border-white/[0.065]">
              {track.clips.slice(0, 3).map((start, index) => (
                <div
                  key={start}
                  className="clip absolute top-3 h-8 border"
                  style={{
                    left: `${6 + start * 2.4}%`,
                    width: `${15 + index * 4}%`,
                    borderColor: `${track.color}77`,
                    backgroundColor: `${track.color}20`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PreviewPanel({ title, metric, tone }: { title: string; metric: string; tone: string }) {
  return (
    <Reveal>
      <div className="group min-h-[310px] overflow-hidden border border-white/10 bg-white/[0.03] p-5 transition duration-200 hover:-translate-y-1 hover:border-white/20">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">{title}</h3>
          <span className="font-mono text-xs text-tertiary">{metric}</span>
        </div>
        <div className="mt-8 space-y-2">
          {Array.from({ length: 7 }).map((_, row) => (
            <div key={row} className="relative h-7 border-b border-white/[0.065]">
              <div
                className="absolute top-1 h-4 transition-all duration-300 group-hover:translate-x-1"
                style={{
                  left: `${(row * 13) % 48}%`,
                  width: `${20 + ((row * 7) % 26)}%`,
                  background: `${tone}33`,
                  border: `1px solid ${tone}99`,
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-secondary">
          <Sparkles className="h-4 w-4" style={{ color: tone }} />
          production ready
        </div>
      </div>
    </Reveal>
  );
}

function MiniStat({ icon: Icon, label, value }: { icon: typeof ShieldCheck; label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-white/[0.035] p-4">
      <Icon className="h-5 w-5 text-primary" />
      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-tertiary">{label}</p>
      <p className="mt-1 text-lg">{value}</p>
    </div>
  );
}

function PrimaryLink({ href, icon: Icon, children }: { href: string; icon: typeof Download; children: React.ReactNode }) {
  return (
    <a href={href} className="inline-flex h-12 items-center justify-center gap-2 bg-white px-5 text-sm font-medium text-black transition duration-200 hover:-translate-y-0.5 hover:bg-accent hover:text-white">
      <Icon className="h-4 w-4" />
      {children}
    </a>
  );
}

function SecondaryLink({ href, icon: Icon, children }: { href: string; icon: typeof Github; children: React.ReactNode }) {
  return (
    <a href={href} className="inline-flex h-12 items-center justify-center gap-2 border border-white/12 bg-white/[0.035] px-5 text-sm text-primary backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.065]">
      <Icon className="h-4 w-4" />
      {children}
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.08] py-10">
      <div className="section-shell flex flex-col gap-6 text-sm text-secondary md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3 text-primary">
            <AudioWaveform className="h-5 w-5" />
            <span className="font-mono uppercase tracking-[0.2em]">AUDIAW</span>
          </div>
          <p className="mt-3">Free, open-source music production software.</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <a href={repoUrl} className="hover:text-primary">GitHub</a>
          <a href={`${repoUrl}/issues`} className="hover:text-primary">Issues</a>
          <a href={`${repoUrl}/pulls`} className="hover:text-primary">Contribute</a>
          <a href={releasesUrl} className="hover:text-primary">Releases</a>
        </div>
      </div>
    </footer>
  );
}
