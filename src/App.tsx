import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { open, save } from '@tauri-apps/plugin-dialog';
import { ErrorBoundary } from './components/ErrorBoundary';

type TrackType = 'audio' | 'midi' | 'return' | 'master';
type ViewMode = 'arrangement' | 'mixer' | 'piano-roll';
type ToolMode = 'pointer' | 'pencil' | 'scissors';
type BrowserTab = 'samples' | 'plugins' | 'projects';
type ToastKind = 'info' | 'success' | 'warn';

type Clip = {
  id: string;
  s: number;
  l: number;
  kind: 'audio' | 'midi';
  name?: string;
  sample?: string;
  notes?: Note[];
};

type Note = {
  id: string;
  pitch: number;
  s: number;
  l: number;
  velocity: number;
};

type Track = {
  id: string;
  name: string;
  type: TrackType;
  color: string;
  muted: boolean;
  solo: boolean;
  armed: boolean;
  volume: number;
  pan: number;
  instrument: 'drum' | 'bass' | 'synth' | 'pad' | 'sampler';
  sample?: string;
  effects: string[];
  sendA: number;
  automation: {
    volume: AutomationPoint[];
  };
  h: number;
  clips: Clip[];
};

type PersistedTrack = Omit<Track, 'automation'> & {
  automation?: Track['automation'];
};

type AutomationPoint = {
  id: string;
  beat: number;
  value: number;
};

type Toast = {
  id: number;
  msg: string;
  type: ToastKind;
  kbd?: string;
};

type ContextItem =
  | '---'
  | {
      label: string;
      kbd?: string;
      danger?: boolean;
      fn?: () => void;
    };

type ContextState = {
  x: number;
  y: number;
  items: ContextItem[];
};

const DS = {
  s0: '#070707',
  s1: '#0B0B0B',
  s2: '#0F0F0F',
  s3: '#151515',
  s4: '#1A1A1A',
  s5: '#212121',
  s6: '#282828',
  bs: 'rgba(255,255,255,0.055)',
  bi: 'rgba(255,255,255,0.085)',
  bh: 'rgba(255,255,255,0.15)',
  t1: 'rgba(255,255,255,0.92)',
  t2: 'rgba(255,255,255,0.58)',
  t3: 'rgba(255,255,255,0.34)',
  t4: 'rgba(255,255,255,0.18)',
  t5: 'rgba(255,255,255,0.08)',
  accB: 'rgba(255,255,255,0.07)',
  rec: '#FF2D2D',
  recD: 'rgba(255,45,45,0.10)',
  warn: 'rgba(220,160,0,0.90)',
  mono: "'Space Mono','JetBrains Mono','Courier New',monospace",
  ui: "'DM Sans','Inter','Segoe UI',system-ui,sans-serif",
  ease: 'cubic-bezier(0.16,1,0.3,1)',
};

const dotGrid = (op = 0.022) =>
  `radial-gradient(circle, rgba(255,255,255,${op}) 1px, transparent 1px)`;

const mkRng = (seed: number) => {
  let s = seed | 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) | 0;
    return (s >>> 0) / 0xffffffff;
  };
};

const hashStr = (str: string) =>
  str.split('').reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) | 0, 7);

const genWave = (seed: string, count = 78) => {
  const rng = mkRng(hashStr(seed));
  let smoothed = 0;
  return Array.from({ length: count }, (_, i) => {
    smoothed = smoothed * 0.62 + (rng() - 0.5) * 0.38;
    const env = Math.sin((i / count) * Math.PI) * 0.82 + 0.18;
    return Math.max(0.04, Math.min(0.96, 0.5 + smoothed * env * 0.82));
  });
};

const fmtTime = (beats: number) => {
  const bar = Math.floor(beats / 4) + 1;
  const beat = Math.floor(beats % 4) + 1;
  const tick = Math.floor((beats % 1) * 960);
  return `${String(bar).padStart(3, '0')} . ${String(beat).padStart(2, '0')} . ${String(tick).padStart(3, '0')}`;
};

const INIT_TRACKS: Track[] = patchInitialTracks();

const SAMPLES = [
  'Kick_Punchy_01.wav',
  'Kick_808_Deep.wav',
  'Snare_Crack_Hi.wav',
  'Snare_808_Snap.wav',
  'HH_Closed_Tight.wav',
  'HH_Open_Sizzle.wav',
  'Bass_Sub_Loop.wav',
  'Vocal_Chop_01.wav',
  'Pad_Atmosphere.wav',
  'Synth_Arp_128.wav',
  'Drum_Break_170.wav',
  'FX_Riser_Long.wav',
];

const PLUGINS = [
  { name: 'AUDIAW EQ8', type: 'EQ', fmt: 'Built-in' },
  { name: 'AUDIAW Comp', type: 'Dynamics', fmt: 'Built-in' },
  { name: 'AUDIAW Reverb', type: 'Reverb', fmt: 'Built-in' },
  { name: 'AUDIAW Delay', type: 'Delay', fmt: 'Built-in' },
  { name: 'AUDIAW Synth', type: 'Instrument', fmt: 'Built-in' },
];

const COMMANDS = [
  { id: 'play', label: 'Play / Pause', kbd: 'Space', cat: 'Transport' },
  { id: 'stop', label: 'Stop & Rewind', kbd: 'Esc', cat: 'Transport' },
  { id: 'record', label: 'Toggle Record', kbd: 'R', cat: 'Transport' },
  { id: 'loop', label: 'Toggle Loop', kbd: 'L', cat: 'Transport' },
  { id: 'arr', label: 'Arrangement View', kbd: 'Ctrl+1', cat: 'View' },
  { id: 'mix', label: 'Mixer View', kbd: 'Ctrl+2', cat: 'View' },
  { id: 'pr', label: 'Piano Roll View', kbd: 'Ctrl+3', cat: 'View' },
  { id: 'left', label: 'Toggle Browser', kbd: 'Ctrl+B', cat: 'View' },
  { id: 'right', label: 'Toggle Inspector', kbd: 'Ctrl+I', cat: 'View' },
  { id: 'bottom', label: 'Toggle Bottom Panel', kbd: 'Ctrl+J', cat: 'View' },
  { id: 'zin', label: 'Zoom In', kbd: 'Ctrl+=', cat: 'View' },
  { id: 'zout', label: 'Zoom Out', kbd: 'Ctrl+-', cat: 'View' },
  { id: 'export', label: 'Export Mixdown', kbd: 'Ctrl+E', cat: 'Project' },
  { id: 'save', label: 'Save Project', kbd: 'Ctrl+S', cat: 'Project' },
  { id: 'saveas', label: 'Save Project As...', kbd: 'Ctrl+Shift+S', cat: 'Project' },
  { id: 'load', label: 'Open Project...', kbd: 'Ctrl+O', cat: 'Project' },
  { id: 'new', label: 'New Project', kbd: 'Ctrl+N', cat: 'Project' },
  { id: 'renameproj', label: 'Rename Project', kbd: 'Ctrl+Shift+R', cat: 'Project' },
  { id: 'dupeproj', label: 'Duplicate Project', kbd: 'Ctrl+Shift+D', cat: 'Project' },
  { id: 'undo', label: 'Undo', kbd: 'Ctrl+Z', cat: 'Edit' },
  { id: 'redo', label: 'Redo', kbd: 'Ctrl+Y', cat: 'Edit' },
  { id: 'dupeclip', label: 'Duplicate Selected Clip', kbd: 'Ctrl+D', cat: 'Edit' },
  { id: 'splitclip', label: 'Split Selected Clip', kbd: 'C', cat: 'Edit' },
  { id: 'delclip', label: 'Delete Selected Clip', kbd: 'Delete', cat: 'Edit' },
  { id: 'addau', label: 'Add Audio Track', kbd: 'Ctrl+T', cat: 'Track' },
  { id: 'addmi', label: 'Add MIDI Track', kbd: 'Ctrl+M', cat: 'Track' },
];

const APP_VERSION = '1.0.0';
const PROJECT_KEY = 'audiaw.project.v2';
const LEGACY_PROJECT_KEY = 'audiaw.project.v1';
const AUTOSAVE_KEY = 'audiaw.autosave.v1';
const RECENTS_KEY = 'audiaw.recents.v1';
const BPM = 128;
const ARRANGEMENT_BEATS = 32;

type WorkspaceState = {
  view: ViewMode;
  leftOpen: boolean;
  rightOpen: boolean;
  bottomOpen: boolean;
  browserTab: BrowserTab;
  tool: ToolMode;
  zoom: number;
  selectedTrackId: string;
  selectedClipId: string | null;
};

type RecentProject = {
  id: string;
  name: string;
  path?: string;
  savedAt: string;
};

type ProjectData = {
  version: 2;
  id: string;
  name: string;
  bpm: number;
  sampleRate: number;
  appVersion: string;
  createdAt: string;
  tracks: PersistedTrack[];
  assets: Array<{ id: string; name: string; source: string; type: 'sample' | 'plugin' | 'project'; trackId?: string; clipId?: string }>;
  metadata: {
    durationBeats: number;
    trackCount: number;
    clipCount: number;
    notes: string;
  };
  workspace: WorkspaceState;
  playback: {
    beat: number;
    loop: boolean;
  };
  settings: {
    autoSave: boolean;
    snap: '1/4';
    exportFormat: 'wav';
  };
  savedAt: string;
  path?: string;
};

const isTauriRuntime = () => '__TAURI_INTERNALS__' in window;

const makeId = () => {
  if ('crypto' in window && 'randomUUID' in window.crypto) return window.crypto.randomUUID();
  return `audiaw-${Date.now()}-${Math.round(Math.random() * 1_000_000)}`;
};

const safeProjectName = (name: string) =>
  name.trim().replace(/[<>:"/\\|?*\x00-\x1F]/g, '-').replace(/\s+/g, ' ').slice(0, 80) || 'Untitled Project';

const downloadTextFile = (filename: string, contents: string) => {
  const url = URL.createObjectURL(new Blob([contents], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const downloadBlob = (filename: string, blob: Blob) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const blobToBytes = async (blob: Blob) => Array.from(new Uint8Array(await blob.arrayBuffer()));

const collectAssets = (tracks: PersistedTrack[]): ProjectData['assets'] =>
  tracks.flatMap((track) =>
    (track.clips ?? []).flatMap((clip) => {
      const assets: ProjectData['assets'] = [];
      if (clip.sample) assets.push({ id: `${clip.id}-sample`, name: clip.sample, source: clip.sample, type: 'sample', trackId: track.id, clipId: clip.id });
      for (const effect of track.effects ?? []) assets.push({ id: `${track.id}-${effect}`, name: effect, source: effect, type: 'plugin', trackId: track.id });
      return assets;
    }),
  );

const defaultWorkspace = (): WorkspaceState => ({
  view: 'arrangement',
  leftOpen: true,
  rightOpen: true,
  bottomOpen: false,
  browserTab: 'samples',
  tool: 'pointer',
  zoom: 48,
  selectedTrackId: 't1',
  selectedClipId: null,
});

function buildProjectData(input: {
  id: string;
  name: string;
  tracks: Track[];
  workspace: WorkspaceState;
  loop: boolean;
  beat: number;
  createdAt: string;
  savedAt?: string;
  path?: string;
}): ProjectData {
  const savedAt = input.savedAt ?? new Date().toISOString();
  const tracks = input.tracks.map(normalizeTrack);
  const clipCount = tracks.reduce((total, track) => total + track.clips.length, 0);
  return {
    version: 2,
    id: input.id,
    name: safeProjectName(input.name),
    bpm: BPM,
    sampleRate: 48000,
    appVersion: APP_VERSION,
    createdAt: input.createdAt,
    tracks,
    assets: collectAssets(tracks),
    metadata: {
      durationBeats: ARRANGEMENT_BEATS,
      trackCount: tracks.length,
      clipCount,
      notes: '',
    },
    workspace: input.workspace,
    playback: {
      beat: clamp(input.beat, 0, ARRANGEMENT_BEATS),
      loop: input.loop,
    },
    settings: {
      autoSave: true,
      snap: '1/4',
      exportFormat: 'wav',
    },
    savedAt,
    path: input.path,
  };
}

function normalizeProjectData(raw: Partial<ProjectData> & { version?: number; tracks?: PersistedTrack[] }): ProjectData {
  const now = new Date().toISOString();
  const tracks = Array.isArray(raw.tracks) ? raw.tracks.map(normalizeTrack) : patchInitialTracks();
  return buildProjectData({
    id: typeof raw.id === 'string' ? raw.id : makeId(),
    name: typeof raw.name === 'string' ? raw.name : 'Untitled Project',
    tracks,
    workspace: { ...defaultWorkspace(), ...(raw.workspace ?? {}) },
    loop: Boolean(raw.playback?.loop),
    beat: Number(raw.playback?.beat ?? 0),
    createdAt: typeof raw.createdAt === 'string' ? raw.createdAt : now,
    savedAt: typeof raw.savedAt === 'string' ? raw.savedAt : now,
    path: typeof raw.path === 'string' ? raw.path : undefined,
  });
}

function loadProjectFromStorage(): ProjectData {
  for (const key of [AUTOSAVE_KEY, PROJECT_KEY, LEGACY_PROJECT_KEY]) {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) return normalizeProjectData(JSON.parse(raw));
    } catch {
      window.localStorage.removeItem(key);
    }
  }
  return normalizeProjectData({ name: 'Untitled Project', tracks: INIT_TRACKS });
}

function loadRecentProjects(): RecentProject[] {
  try {
    const recents = JSON.parse(window.localStorage.getItem(RECENTS_KEY) ?? '[]') as RecentProject[];
    return Array.isArray(recents) ? recents.filter((item) => item.id && item.name && item.savedAt).slice(0, 12) : [];
  } catch {
    return [];
  }
}

const dbToGain = (db: number) => Math.pow(10, db / 20);
const beatToSeconds = (beat: number, bpm = BPM) => (beat * 60) / bpm;
const midiToHz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

function makeClip(id: string, s: number, l: number, kind: 'audio' | 'midi', sample?: string, notes?: Note[]): Clip {
  return { id, s, l, kind, sample, notes };
}

function defaultNotes(trackName: string): Note[] {
  const lower = trackName.toLowerCase();
  if (lower.includes('bass') || lower.includes('808')) {
    return [
      { id: 'n1', pitch: 36, s: 0, l: 0.85, velocity: 0.9 },
      { id: 'n2', pitch: 36, s: 1.5, l: 0.45, velocity: 0.72 },
      { id: 'n3', pitch: 39, s: 2, l: 0.85, velocity: 0.84 },
      { id: 'n4', pitch: 34, s: 3, l: 0.75, velocity: 0.78 },
    ];
  }
  if (lower.includes('atmos')) {
    return [
      { id: 'n1', pitch: 60, s: 0, l: 4, velocity: 0.48 },
      { id: 'n2', pitch: 64, s: 0, l: 4, velocity: 0.42 },
      { id: 'n3', pitch: 67, s: 0, l: 4, velocity: 0.38 },
      { id: 'n4', pitch: 62, s: 4, l: 4, velocity: 0.44 },
      { id: 'n5', pitch: 65, s: 4, l: 4, velocity: 0.4 },
      { id: 'n6', pitch: 69, s: 4, l: 4, velocity: 0.36 },
    ];
  }
  return [
    { id: 'n1', pitch: 72, s: 0, l: 0.5, velocity: 0.72 },
    { id: 'n2', pitch: 76, s: 0.75, l: 0.5, velocity: 0.65 },
    { id: 'n3', pitch: 79, s: 1.5, l: 0.5, velocity: 0.75 },
    { id: 'n4', pitch: 83, s: 2.25, l: 0.75, velocity: 0.68 },
  ];
}

function patchInitialTracks(): Track[] {
  const tracks: PersistedTrack[] = [
    { id: 't1', name: 'Kick', type: 'audio', color: '#3B82F6', muted: false, solo: false, armed: false, volume: 0, pan: 0, instrument: 'drum', sample: 'Kick_Punchy_01.wav', effects: ['AUDIAW Comp'], sendA: 0.08, h: 48, clips: [makeClip('c1', 0, 4, 'audio', 'Kick_Punchy_01.wav'), makeClip('c1b', 8, 4, 'audio', 'Kick_Punchy_01.wav'), makeClip('c1c', 16, 4, 'audio', 'Kick_Punchy_01.wav'), makeClip('c1d', 24, 4, 'audio', 'Kick_Punchy_01.wav')] },
    { id: 't2', name: 'Snare', type: 'audio', color: '#8B5CF6', muted: false, solo: false, armed: false, volume: -3, pan: 0, instrument: 'drum', sample: 'Snare_Crack_Hi.wav', effects: ['AUDIAW Comp', 'AUDIAW Reverb'], sendA: 0.18, h: 48, clips: [makeClip('c2', 0, 8, 'audio', 'Snare_Crack_Hi.wav'), makeClip('c2b', 8, 8, 'audio', 'Snare_Crack_Hi.wav'), makeClip('c2c', 16, 8, 'audio', 'Snare_Crack_Hi.wav')] },
    { id: 't3', name: 'Hi-Hat', type: 'audio', color: '#10B981', muted: false, solo: false, armed: false, volume: -6, pan: 10, instrument: 'drum', sample: 'HH_Closed_Tight.wav', effects: [], sendA: 0.04, h: 48, clips: [makeClip('c3', 0, 16, 'audio', 'HH_Closed_Tight.wav'), makeClip('c3b', 20, 8, 'audio', 'HH_Closed_Tight.wav')] },
    { id: 't4', name: '808 Bass', type: 'midi', color: '#F59E0B', muted: false, solo: false, armed: false, volume: -2, pan: 0, instrument: 'bass', effects: ['AUDIAW Comp'], sendA: 0.02, h: 48, clips: [makeClip('c4', 0, 8, 'midi', undefined, defaultNotes('808 Bass')), makeClip('c4b', 12, 8, 'midi', undefined, defaultNotes('808 Bass'))] },
    { id: 't5', name: 'Synth Lead', type: 'midi', color: '#EC4899', muted: false, solo: false, armed: false, volume: -4, pan: 15, instrument: 'synth', effects: ['AUDIAW Delay'], sendA: 0.15, h: 48, clips: [makeClip('c5', 8, 8, 'midi', undefined, defaultNotes('Synth Lead')), makeClip('c5b', 20, 8, 'midi', undefined, defaultNotes('Synth Lead'))] },
    { id: 't6', name: 'Atmosphere', type: 'midi', color: '#06B6D4', muted: false, solo: false, armed: false, volume: -8, pan: -10, instrument: 'pad', effects: ['AUDIAW Reverb'], sendA: 0.32, h: 80, clips: [makeClip('c6', 0, 28, 'midi', undefined, defaultNotes('Atmosphere'))] },
    { id: 't7', name: 'Vocal Main', type: 'audio', color: '#F97316', muted: false, solo: false, armed: false, volume: 0, pan: 0, instrument: 'sampler', sample: 'Vocal_Chop_01.wav', effects: ['AUDIAW EQ8', 'AUDIAW Reverb'], sendA: 0.22, h: 64, clips: [makeClip('c7', 4, 12, 'audio', 'Vocal_Chop_01.wav'), makeClip('c7b', 18, 8, 'audio', 'Vocal_Chop_01.wav')] },
    { id: 't8', name: 'Vocal Harm', type: 'audio', color: '#FB923C', muted: true, solo: false, armed: false, volume: -6, pan: 20, instrument: 'sampler', sample: 'Vocal_Chop_01.wav', effects: ['AUDIAW Reverb'], sendA: 0.28, h: 48, clips: [makeClip('c8', 18, 6, 'audio', 'Vocal_Chop_01.wav')] },
    { id: 't9', name: 'FX Return A', type: 'return', color: '#6366F1', muted: false, solo: false, armed: false, volume: -10, pan: 0, instrument: 'sampler', effects: ['AUDIAW Reverb'], sendA: 0, h: 48, clips: [] },
    { id: 't10', name: 'Master', type: 'master', color: 'rgba(255,255,255,0.70)', muted: false, solo: false, armed: false, volume: 0, pan: 0, instrument: 'sampler', effects: ['Limiter'], sendA: 0, h: 48, clips: [] },
  ];
  return tracks.map(normalizeTrack);
}

function normalizeTrack(track: PersistedTrack): Track {
  return {
    ...track,
    instrument: track.instrument ?? (track.type === 'midi' ? 'synth' : 'sampler'),
    effects: track.effects ?? [],
    sendA: track.sendA ?? 0,
    automation: track.automation ?? { volume: [{ id: `${track.id}-vol-0`, beat: 0, value: track.volume }] },
    clips: (track.clips ?? []).map((clip) => ({
      ...clip,
      kind: clip.kind ?? (track.type === 'midi' ? 'midi' : 'audio'),
      notes: clip.notes ?? (track.type === 'midi' ? defaultNotes(track.name) : undefined),
    })),
  };
}

function connectTrack(ctx: BaseAudioContext, destination: AudioNode, track: Track, baseTime: number, startBeat: number) {
  const gain = ctx.createGain();
  const pan = ctx.createStereoPanner();
  const filter = ctx.createBiquadFilter();
  const compressor = ctx.createDynamicsCompressor();

  const baseGain = track.muted ? 0 : dbToGain(track.volume);
  gain.gain.setValueAtTime(baseGain, baseTime);
  track.automation.volume
    .filter((point) => point.beat >= startBeat)
    .sort((a, b) => a.beat - b.beat)
    .forEach((point) => {
      gain.gain.linearRampToValueAtTime(track.muted ? 0 : dbToGain(point.value), baseTime + beatToSeconds(point.beat - startBeat));
    });
  pan.pan.value = clamp(track.pan / 50, -1, 1);
  filter.type = 'lowpass';
  filter.frequency.value = track.effects.includes('AUDIAW EQ8') ? 9200 : 16000;
  compressor.threshold.value = track.effects.includes('AUDIAW Comp') ? -20 : 0;
  compressor.ratio.value = track.effects.includes('AUDIAW Comp') ? 4 : 1;

  gain.connect(pan);
  pan.connect(filter);
  filter.connect(compressor);
  compressor.connect(destination);
  return gain;
}

function scheduleTone(ctx: BaseAudioContext, destination: AudioNode, at: number, duration: number, pitch: number, velocity: number, track: Track, nodes: AudioScheduledSourceNode[]) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = track.instrument === 'bass' ? 'sawtooth' : track.instrument === 'pad' ? 'triangle' : 'square';
  osc.frequency.setValueAtTime(midiToHz(pitch), at);
  filter.type = track.instrument === 'pad' ? 'lowpass' : 'bandpass';
  filter.frequency.setValueAtTime(track.instrument === 'bass' ? 260 : track.instrument === 'pad' ? 1400 : 2400, at);
  filter.Q.value = track.instrument === 'bass' ? 2.2 : 0.75;

  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.001, velocity * 0.22), at + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + Math.max(0.04, duration));

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(destination);
  osc.start(at);
  osc.stop(at + Math.max(0.06, duration) + 0.05);
  nodes.push(osc);
}

function scheduleKick(ctx: BaseAudioContext, destination: AudioNode, at: number, nodes: AudioScheduledSourceNode[]) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(130, at);
  osc.frequency.exponentialRampToValueAtTime(42, at + 0.15);
  gain.gain.setValueAtTime(0.9, at);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.36);
  osc.connect(gain);
  gain.connect(destination);
  osc.start(at);
  osc.stop(at + 0.42);
  nodes.push(osc);
}

function scheduleNoiseHit(ctx: BaseAudioContext, destination: AudioNode, at: number, duration: number, tone: 'snare' | 'hat' | 'vocal' | 'fx', nodes: AudioScheduledSourceNode[]) {
  const buffer = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * duration)), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  const noise = mkRng(hashStr(`${tone}:${Math.round(at * 1000)}:${Math.round(duration * 1000)}`));
  for (let i = 0; i < data.length; i += 1) {
    const env = Math.pow(1 - i / data.length, tone === 'hat' ? 2.5 : 1.2);
    data[i] = (noise() * 2 - 1) * env;
  }
  const src = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  src.buffer = buffer;
  filter.type = tone === 'hat' ? 'highpass' : tone === 'vocal' ? 'bandpass' : 'bandpass';
  filter.frequency.value = tone === 'hat' ? 7400 : tone === 'vocal' ? 980 : tone === 'fx' ? 3400 : 2100;
  filter.Q.value = tone === 'vocal' ? 8 : 1.1;
  gain.gain.value = tone === 'hat' ? 0.22 : tone === 'vocal' ? 0.2 : tone === 'fx' ? 0.18 : 0.46;
  src.connect(filter);
  filter.connect(gain);
  gain.connect(destination);
  src.start(at);
  src.stop(at + duration);
  nodes.push(src);
}

function sampleKind(track: Track, clip: Clip) {
  const name = `${clip.sample ?? track.sample ?? track.name}`.toLowerCase();
  if (name.includes('kick')) return 'kick';
  if (name.includes('snare')) return 'snare';
  if (name.includes('hh') || name.includes('hat')) return 'hat';
  if (name.includes('riser') || name.includes('fx')) return 'fx';
  if (name.includes('vocal')) return 'vocal';
  if (name.includes('bass')) return 'bass';
  return 'loop';
}

function shouldHearTrack(track: Track, tracks: Track[]) {
  const anySolo = tracks.some((item) => item.solo && item.type !== 'master' && item.type !== 'return');
  if (track.type === 'master' || track.type === 'return') return false;
  if (track.muted) return false;
  return !anySolo || track.solo;
}

function scheduleClip(ctx: BaseAudioContext, destination: AudioNode, track: Track, clip: Clip, baseTime: number, playStartBeat: number, nodes: AudioScheduledSourceNode[]) {
  const clipStart = clip.s;
  const clipEnd = clip.s + clip.l;
  if (clipEnd <= playStartBeat) return;
  const eventToTime = (beat: number) => baseTime + beatToSeconds(beat - playStartBeat);

  if (clip.kind === 'midi') {
    (clip.notes ?? []).forEach((note) => {
      const beat = clipStart + note.s;
      if (beat < playStartBeat || beat >= clipEnd) return;
      scheduleTone(ctx, destination, eventToTime(beat), beatToSeconds(note.l), note.pitch, note.velocity, track, nodes);
    });
    return;
  }

  const kind = sampleKind(track, clip);
  for (let beat = Math.ceil(Math.max(clipStart, playStartBeat) * 4) / 4; beat < clipEnd; beat += 0.25) {
    const local = beat - clipStart;
    const isWhole = Math.abs(local - Math.round(local)) < 0.001;
    const isHalf = Math.abs(local * 2 - Math.round(local * 2)) < 0.001;
    const at = eventToTime(beat);
    if (kind === 'kick' && isWhole && Math.round(local) % 2 === 0) scheduleKick(ctx, destination, at, nodes);
    if (kind === 'snare' && isWhole && Math.round(local) % 4 === 2) scheduleNoiseHit(ctx, destination, at, 0.16, 'snare', nodes);
    if (kind === 'hat' && isHalf) scheduleNoiseHit(ctx, destination, at, 0.055, 'hat', nodes);
    if (kind === 'vocal' && isWhole) scheduleNoiseHit(ctx, destination, at, 0.26, 'vocal', nodes);
    if (kind === 'fx' && Math.abs(local) < 0.001) scheduleNoiseHit(ctx, destination, at, beatToSeconds(clip.l), 'fx', nodes);
    if (kind === 'bass' && isWhole) scheduleTone(ctx, destination, at, 0.22, 36 + (Math.round(local) % 3) * 2, 0.76, { ...track, instrument: 'bass' }, nodes);
    if (kind === 'loop' && isWhole) scheduleNoiseHit(ctx, destination, at, 0.12, 'hat', nodes);
  }
}

function scheduleProject(ctx: BaseAudioContext, destination: AudioNode, tracks: Track[], startBeat: number, nodes: AudioScheduledSourceNode[]) {
  const baseTime = ctx.currentTime + 0.035;
  const returnBus = ctx.createGain();
  const returnDelay = ctx.createDelay(1.2);
  const returnFeedback = ctx.createGain();
  returnBus.gain.value = 0.48;
  returnDelay.delayTime.value = beatToSeconds(0.75);
  returnFeedback.gain.value = 0.26;
  returnBus.connect(returnDelay);
  returnDelay.connect(returnFeedback);
  returnFeedback.connect(returnDelay);
  returnDelay.connect(destination);
  tracks.filter((track) => shouldHearTrack(track, tracks)).forEach((track) => {
    const channel = connectTrack(ctx, destination, track, baseTime, startBeat);
    if (track.sendA > 0) {
      const send = ctx.createGain();
      send.gain.value = track.sendA;
      channel.connect(send);
      send.connect(returnBus);
    }
    track.clips.forEach((clip) => scheduleClip(ctx, channel, track, clip, baseTime, startBeat, nodes));
  });
  return baseTime;
}

function encodeWav(buffer: AudioBuffer) {
  const channels = buffer.numberOfChannels;
  const length = buffer.length * channels * 2 + 44;
  const out = new ArrayBuffer(length);
  const view = new DataView(out);
  const write = (offset: number, text: string) => {
    for (let i = 0; i < text.length; i += 1) view.setUint8(offset + i, text.charCodeAt(i));
  };
  write(0, 'RIFF');
  view.setUint32(4, length - 8, true);
  write(8, 'WAVE');
  write(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, channels, true);
  view.setUint32(24, buffer.sampleRate, true);
  view.setUint32(28, buffer.sampleRate * channels * 2, true);
  view.setUint16(32, channels * 2, true);
  view.setUint16(34, 16, true);
  write(36, 'data');
  view.setUint32(40, length - 44, true);
  let offset = 44;
  for (let i = 0; i < buffer.length; i += 1) {
    for (let ch = 0; ch < channels; ch += 1) {
      const sample = clamp(buffer.getChannelData(ch)[i], -1, 1);
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      offset += 2;
    }
  }
  return new Blob([out], { type: 'audio/wav' });
}

function Glyph({ name, size = 13 }: { name: string; size?: number }) {
  return <span style={{ fontFamily: DS.mono, fontSize: size, lineHeight: 1, opacity: 0.9 }}>{name}</span>;
}

function Btn({
  children,
  active,
  danger,
  title,
  onClick,
  circle,
  size = 28,
}: {
  children: React.ReactNode;
  active?: boolean;
  danger?: boolean;
  title?: string;
  onClick?: () => void;
  circle?: boolean;
  size?: number;
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: circle ? 99 : 2,
        border: `1px solid ${active ? DS.bh : DS.bi}`,
        background: danger ? DS.recD : active ? DS.accB : DS.s3,
        color: danger ? DS.rec : active ? DS.t1 : DS.t3,
        cursor: 'pointer',
        transition: `all 120ms ${DS.ease}`,
      }}
    >
      {children}
    </button>
  );
}

function StartupScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase(1), 180),
      window.setTimeout(() => setPhase(2), 620),
      window.setTimeout(() => setPhase(3), 1040),
      window.setTimeout(() => setOut(true), 1500),
      window.setTimeout(onDone, 1820),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [onDone]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        opacity: out ? 0 : 1,
        transition: `opacity 360ms ${DS.ease}`,
        backgroundColor: DS.s0,
        backgroundImage: dotGrid(0.03),
        backgroundSize: '20px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
      }}
    >
      {phase >= 1 && (
        <div style={{ textAlign: 'center', animation: `fadeup 500ms ${DS.ease}` }}>
          <div style={{ fontFamily: DS.mono, fontSize: 36, letterSpacing: '0.24em', fontWeight: 700, color: DS.t1, marginBottom: 10 }}>AUDIAW</div>
          {phase >= 2 && <div style={{ fontFamily: DS.ui, fontSize: 11, letterSpacing: '0.20em', textTransform: 'uppercase', color: DS.t4 }}>Sound, engineered.</div>}
        </div>
      )}
      {phase >= 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 1, height: 24, background: DS.bs }} />
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            {['Audio Engine', 'Sample Library', 'Plugin Host', 'UI Renderer'].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Glyph name="ok" size={8} />
                <span style={{ fontFamily: DS.mono, fontSize: 9, color: DS.t4, letterSpacing: '0.06em' }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ width: 220, height: 1, background: DS.s5, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: DS.t2, animation: 'loadbar 650ms ease-out forwards' }} />
          </div>
        </div>
      )}
    </div>
  );
}

function TransportBar(props: {
  playing: boolean;
  recording: boolean;
  loop: boolean;
  bpm: number;
  beats: number;
  view: ViewMode;
  leftOpen: boolean;
  rightOpen: boolean;
  bottomOpen: boolean;
  onPlay: () => void;
  onStop: () => void;
  onRec: () => void;
  onLoop: () => void;
  onView: (view: ViewMode) => void;
  onLeft: () => void;
  onRight: () => void;
  onBottom: () => void;
  onCmd: () => void;
  onExport: () => void;
}) {
  return (
    <div style={{ height: 58, background: DS.s1, borderBottom: `1px solid ${DS.bs}`, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 12, flexShrink: 0 }}>
      <div style={{ width: 178, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ fontFamily: DS.mono, fontSize: 18, fontWeight: 700, letterSpacing: '0.21em', color: DS.t1 }}>AUDIAW</div>
        <div style={{ width: 1, height: 24, background: DS.bs }} />
        <span style={{ fontFamily: DS.mono, fontSize: 9, color: DS.t5, letterSpacing: '0.12em' }}>v1.0</span>
      </div>

      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <Btn title="Stop" onClick={props.onStop}><Glyph name="[]" /></Btn>
        <Btn title="Play" active={props.playing} onClick={props.onPlay} circle size={34}><Glyph name={props.playing ? '||' : '>'} size={15} /></Btn>
        <Btn title="Record" danger={props.recording} active={props.recording} onClick={props.onRec} circle><Glyph name="o" /></Btn>
        <Btn title="Loop" active={props.loop} onClick={props.onLoop}><Glyph name="rep" size={10} /></Btn>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderLeft: `1px solid ${DS.bs}`, borderRight: `1px solid ${DS.bs}`, padding: '0 14px', height: 38 }}>
        <div>
          <div style={{ fontFamily: DS.mono, color: DS.t1, fontSize: 18, letterSpacing: '0.04em' }}>{fmtTime(props.beats)}</div>
          <div style={{ fontFamily: DS.mono, color: DS.t5, fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.18em' }}>bar . beat . tick</div>
        </div>
        <div style={{ height: 24, width: 1, background: DS.bs }} />
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: DS.mono, color: DS.t1, fontSize: 15 }}>{props.bpm.toFixed(0)} BPM</div>
          <div style={{ fontFamily: DS.mono, color: DS.t5, fontSize: 8, letterSpacing: '0.16em' }}>4/4 SNAP 1/4</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 4 }}>
        {([
          ['arrangement', 'Arrangement'],
          ['mixer', 'Mixer'],
          ['piano-roll', 'Piano Roll'],
        ] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => props.onView(id)}
            style={{
              height: 28,
              padding: '0 12px',
              borderRadius: 2,
              border: `1px solid ${props.view === id ? DS.bh : DS.bi}`,
              background: props.view === id ? DS.accB : DS.s2,
              color: props.view === id ? DS.t1 : DS.t4,
              cursor: 'pointer',
              fontFamily: DS.mono,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <Btn title="Command Palette" onClick={props.onCmd}><Glyph name="cmd" size={10} /></Btn>
        <Btn title="Export" onClick={props.onExport}><Glyph name="exp" size={10} /></Btn>
        <Btn title="Browser" active={props.leftOpen} onClick={props.onLeft}><Glyph name="L" /></Btn>
        <Btn title="Bottom Panel" active={props.bottomOpen} onClick={props.onBottom}><Glyph name="_" /></Btn>
        <Btn title="Inspector" active={props.rightOpen} onClick={props.onRight}><Glyph name="R" /></Btn>
      </div>
    </div>
  );
}

function ToolStrip({ tool, onTool, zoom, onZoom }: { tool: ToolMode; onTool: (tool: ToolMode) => void; zoom: number; onZoom: (delta: number) => void }) {
  const tools: Array<[ToolMode, string, string]> = [
    ['pointer', 'Pointer', 'V'],
    ['pencil', 'Pencil', 'B'],
    ['scissors', 'Scissors', 'C'],
  ];
  return (
    <div style={{ height: 34, background: DS.s2, borderBottom: `1px solid ${DS.bs}`, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6, flexShrink: 0 }}>
      {tools.map(([id, label, kbd]) => (
        <button key={id} title={label} onClick={() => onTool(id)} style={{ height: 24, minWidth: 32, borderRadius: 2, border: `1px solid ${tool === id ? DS.bh : DS.bi}`, background: tool === id ? DS.accB : DS.s3, color: tool === id ? DS.t1 : DS.t3, cursor: 'pointer', fontFamily: DS.mono, fontSize: 9 }}>
          {kbd}
        </button>
      ))}
      <div style={{ width: 1, height: 18, background: DS.bs, margin: '0 6px' }} />
      <button onClick={() => onZoom(-1)} style={miniButton}>-</button>
      <div style={{ width: 110, height: 3, background: DS.s5, borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${((zoom - 16) / 112) * 100}%`, height: '100%', background: DS.t2 }} />
      </div>
      <button onClick={() => onZoom(1)} style={miniButton}>+</button>
      <span style={{ fontFamily: DS.mono, fontSize: 9, color: DS.t4, letterSpacing: '0.08em' }}>{zoom}px/beat</span>
      <div style={{ flex: 1 }} />
      {['Snap 1/4', 'Grid', 'Follow', 'Automation'].map((item, index) => (
        <span key={item} style={{ fontFamily: DS.mono, fontSize: 9, color: index === 3 ? DS.t2 : DS.t4, border: `1px solid ${DS.bi}`, background: index === 3 ? DS.accB : DS.s3, padding: '4px 8px', borderRadius: 2 }}>{item}</span>
      ))}
    </div>
  );
}

const miniButton: React.CSSProperties = {
  height: 22,
  minWidth: 22,
  border: `1px solid ${DS.bi}`,
  background: DS.s3,
  color: DS.t3,
  borderRadius: 2,
  cursor: 'pointer',
  fontFamily: DS.mono,
  fontSize: 11,
};

function BrowserPanel({ open, tab, onTab, onUse, onSample, onPlugin, recentProjects, onOpenProject }: { open: boolean; tab: BrowserTab; onTab: (tab: BrowserTab) => void; onUse: (msg: string) => void; onSample: (sample: string) => void; onPlugin: (plugin: string) => void; recentProjects: RecentProject[]; onOpenProject: (path?: string) => void }) {
  const [query, setQuery] = useState('');
  if (!open) return null;
  const sampleList = SAMPLES.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  const pluginList = PLUGINS.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) || item.type.toLowerCase().includes(query.toLowerCase()));

  return (
    <aside style={{ width: 256, background: DS.s1, borderRight: `1px solid ${DS.bs}`, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <PanelTitle title="Browser" right="Ctrl+B" />
      <div style={{ padding: 10, borderBottom: `1px solid ${DS.bs}` }}>
        <div style={{ height: 30, display: 'flex', alignItems: 'center', gap: 8, background: DS.s3, border: `1px solid ${DS.bi}`, borderRadius: 2, padding: '0 9px' }}>
          <Glyph name="?" size={10} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search library" style={{ flex: 1, minWidth: 0, background: 'transparent', border: 0, outline: 0, color: DS.t1, fontFamily: DS.ui, fontSize: 12 }} />
        </div>
      </div>
      <div style={{ display: 'flex', borderBottom: `1px solid ${DS.bs}` }}>
        {(['samples', 'plugins', 'projects'] as const).map((id) => (
          <button key={id} onClick={() => onTab(id)} style={{ flex: 1, height: 31, border: 0, borderRight: `1px solid ${DS.bs}`, background: tab === id ? DS.s4 : DS.s2, color: tab === id ? DS.t1 : DS.t4, cursor: 'pointer', fontFamily: DS.mono, fontSize: 8, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{id}</button>
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: 8 }}>
        {tab === 'samples' && sampleList.map((item) => <BrowserRow key={item} name={item} meta="48kHz . 24-bit" dragData={`sample:${item}`} onClick={() => onSample(item)} />)}
        {tab === 'plugins' && pluginList.map((item) => <BrowserRow key={item.name} name={item.name} meta={`${item.type} . ${item.fmt}`} dragData={`plugin:${item.name}`} onClick={() => onPlugin(item.name)} />)}
        {tab === 'projects' && recentProjects.length === 0 && <BrowserRow name="Open project..." meta="Choose an .audiaw file" onClick={() => onOpenProject()} />}
        {tab === 'projects' && recentProjects.map((item) => <BrowserRow key={`${item.id}-${item.path ?? item.savedAt}`} name={item.name} meta={item.path ? item.path : `Autosaved ${new Date(item.savedAt).toLocaleString()}`} onClick={() => item.path ? onOpenProject(item.path) : onUse(`${item.name} is stored in local autosave`)} />)}
      </div>
    </aside>
  );
}

function BrowserRow({ name, meta, dragData, onClick }: { name: string; meta: string; dragData?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      draggable={Boolean(dragData)}
      onDragStart={(event) => {
        if (!dragData) return;
        event.dataTransfer.setData('application/audiaw', dragData);
        event.dataTransfer.effectAllowed = 'copy';
      }}
      style={{ width: '100%', display: 'grid', gridTemplateColumns: '22px 1fr', gap: 8, alignItems: 'center', background: 'transparent', border: 0, borderBottom: `1px solid ${DS.bs}`, padding: '8px 4px', textAlign: 'left', cursor: dragData ? 'grab' : 'pointer' }}
    >
      <div style={{ width: 18, height: 18, border: `1px solid ${DS.bi}`, background: DS.s3, display: 'flex', alignItems: 'center', justifyContent: 'center', color: DS.t4 }}>
        <Glyph name="f" size={9} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: DS.ui, fontSize: 12, color: DS.t2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
        <div style={{ fontFamily: DS.mono, fontSize: 8, color: DS.t5, letterSpacing: '0.04em', marginTop: 2 }}>{meta}</div>
      </div>
    </button>
  );
}

function PanelTitle({ title, right }: { title: string; right?: string }) {
  return (
    <div style={{ height: 34, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', background: DS.s2, borderBottom: `1px solid ${DS.bs}`, flexShrink: 0 }}>
      <span style={{ fontFamily: DS.mono, fontSize: 10, fontWeight: 700, color: DS.t3, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{title}</span>
      {right && <span style={{ fontFamily: DS.mono, fontSize: 8, color: DS.t5, letterSpacing: '0.08em' }}>{right}</span>}
    </div>
  );
}

function TrackHeader(props: {
  track: Track;
  selected: boolean;
  onSelect: () => void;
  onMute: () => void;
  onSolo: () => void;
  onArm: () => void;
  onCtx: (x: number, y: number) => void;
}) {
  const { track } = props;
  return (
    <div onClick={props.onSelect} onContextMenu={(event) => { event.preventDefault(); props.onCtx(event.clientX, event.clientY); }} style={{ height: track.h, display: 'flex', alignItems: 'center', gap: 7, padding: '0 8px', borderBottom: `1px solid ${DS.bs}`, background: props.selected ? DS.s4 : DS.s2, cursor: 'pointer' }}>
      <div style={{ width: 3, height: track.h - 16, background: track.color, opacity: track.muted ? 0.25 : 0.85 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: DS.ui, fontSize: 12, color: props.selected ? DS.t1 : DS.t2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.name}</div>
        <div style={{ fontFamily: DS.mono, fontSize: 8, color: DS.t5, letterSpacing: '0.09em', textTransform: 'uppercase' }}>{track.type}</div>
      </div>
      <SmallToggle label="M" active={track.muted} onClick={props.onMute} />
      <SmallToggle label="S" active={track.solo} onClick={props.onSolo} />
      <SmallToggle label="R" active={track.armed} danger onClick={props.onArm} />
    </div>
  );
}

function SmallToggle({ label, active, danger, onClick }: { label: string; active?: boolean; danger?: boolean; onClick: () => void }) {
  return (
    <button onClick={(event) => { event.stopPropagation(); onClick(); }} style={{ width: 19, height: 18, borderRadius: 2, border: `1px solid ${active ? DS.bh : DS.bi}`, background: active ? (danger ? DS.recD : DS.accB) : DS.s3, color: active ? (danger ? DS.rec : DS.t1) : DS.t4, cursor: 'pointer', fontFamily: DS.mono, fontSize: 8, fontWeight: 700 }}>
      {label}
    </button>
  );
}

function ArrangementView(props: {
  tracks: Track[];
  selId: string;
  selClip: string | null;
  tool: ToolMode;
  zoom: number;
  beats: number;
  loop: boolean;
  onSelectTrack: (id: string) => void;
  onSelectClip: (id: string) => void;
  onMoveClip: (trackId: string, clipId: string, start: number) => void;
  onResizeClip: (trackId: string, clipId: string, start: number, length: number) => void;
  onCreateClip: (trackId: string, start: number) => void;
  onDropSample: (trackId: string, sample: string, start: number) => void;
  onMute: (id: string) => void;
  onSolo: (id: string) => void;
  onArm: (id: string) => void;
  onTrackCtx: (trackId: string, x: number, y: number) => void;
  onClipCtx: (trackId: string, clipId: string, x: number, y: number) => void;
}) {
  const totalBeats = 32;
  const trackWidth = 188;
  const contentWidth = totalBeats * props.zoom;

  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden', backgroundColor: DS.s0 }}>
      <div style={{ width: trackWidth, backgroundColor: DS.s1, borderRight: `1px solid ${DS.bs}`, flexShrink: 0 }}>
        <PanelTitle title="Tracks" right={`${props.tracks.length}`} />
        {props.tracks.map((track) => (
          <TrackHeader key={track.id} track={track} selected={props.selId === track.id} onSelect={() => props.onSelectTrack(track.id)} onMute={() => props.onMute(track.id)} onSolo={() => props.onSolo(track.id)} onArm={() => props.onArm(track.id)} onCtx={(x, y) => props.onTrackCtx(track.id, x, y)} />
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
        <div style={{ minWidth: contentWidth, position: 'relative' }}>
          <div style={{ height: 34, position: 'sticky', top: 0, zIndex: 4, backgroundColor: DS.s2, borderBottom: `1px solid ${DS.bs}`, backgroundImage: `linear-gradient(to right, ${DS.bi} 1px, transparent 1px)`, backgroundSize: `${props.zoom * 4}px 100%` }}>
            {Array.from({ length: totalBeats / 4 + 1 }, (_, i) => (
              <div key={i} style={{ position: 'absolute', left: i * props.zoom * 4 + 8, top: 11, fontFamily: DS.mono, color: DS.t4, fontSize: 9 }}>{i + 1}</div>
            ))}
            {props.loop && <div style={{ position: 'absolute', left: props.zoom * 4, top: 4, height: 5, width: props.zoom * 8, background: 'rgba(255,255,255,0.12)', borderRadius: 1 }} />}
          </div>
          {props.tracks.map((track) => (
            <div
              key={track.id}
              onDragOver={(event) => {
                if (event.dataTransfer.types.includes('application/audiaw')) event.preventDefault();
              }}
              onDrop={(event) => {
                const payload = event.dataTransfer.getData('application/audiaw');
                if (!payload.startsWith('sample:')) return;
                event.preventDefault();
                const bounds = event.currentTarget.getBoundingClientRect();
                const start = Math.max(0, Math.round((event.clientX - bounds.left) / props.zoom));
                props.onDropSample(track.id, payload.slice('sample:'.length), start);
              }}
              onDoubleClick={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect();
                props.onCreateClip(track.id, Math.max(0, Math.round((event.clientX - bounds.left) / props.zoom)));
              }}
              style={{
                height: track.h,
                position: 'relative',
                borderBottom: `1px solid ${DS.bs}`,
                backgroundColor: props.selId === track.id ? 'rgba(255,255,255,0.026)' : DS.s0,
                backgroundImage: `linear-gradient(to right, ${DS.bs} 1px, transparent 1px), linear-gradient(to right, ${DS.t5} 1px, transparent 1px)`,
                backgroundSize: `${props.zoom}px 100%, ${props.zoom * 4}px 100%`,
              }}
            >
              {track.clips.map((clip) => (
                <ClipBlock key={clip.id} track={track} clip={clip} tool={props.tool} zoom={props.zoom} selected={props.selClip === clip.id} onSelect={() => { props.onSelectTrack(track.id); props.onSelectClip(clip.id); }} onMove={(start) => props.onMoveClip(track.id, clip.id, start)} onResize={(start, length) => props.onResizeClip(track.id, clip.id, start, length)} onCtx={(x, y) => props.onClipCtx(track.id, clip.id, x, y)} />
              ))}
            </div>
          ))}
          <div style={{ position: 'absolute', top: 34, bottom: 0, left: props.beats * props.zoom, width: 1, background: DS.t1, boxShadow: '0 0 10px rgba(255,255,255,0.30)', pointerEvents: 'none', zIndex: 6 }} />
        </div>
      </div>
    </div>
  );
}

function ClipBlock(props: {
  track: Track;
  clip: Clip;
  tool: ToolMode;
  zoom: number;
  selected: boolean;
  onSelect: () => void;
  onMove: (start: number) => void;
  onResize: (start: number, length: number) => void;
  onCtx: (x: number, y: number) => void;
}) {
  const [drag, setDrag] = useState<{ mode: 'move' | 'resize-left' | 'resize-right'; startX: number; startBeat: number; startLength: number } | null>(null);
  const [preview, setPreview] = useState<{ s: number; l: number } | null>(null);
  const values = useMemo(() => genWave(props.clip.id, 44), [props.clip.id]);
  const displayStart = preview?.s ?? props.clip.s;
  const displayLength = preview?.l ?? props.clip.l;

  useEffect(() => {
    if (!drag) return undefined;
    let current = { s: drag.startBeat, l: drag.startLength };
    const move = (event: MouseEvent) => {
      const delta = Math.round((event.clientX - drag.startX) / props.zoom);
      if (drag.mode === 'move') {
        current = { s: Math.max(0, drag.startBeat + delta), l: drag.startLength };
        setPreview(current);
        return;
      }
      if (drag.mode === 'resize-left') {
        const nextStart = Math.max(0, Math.min(drag.startBeat + drag.startLength - 1, drag.startBeat + delta));
        current = { s: nextStart, l: Math.max(1, drag.startLength + drag.startBeat - nextStart) };
        setPreview(current);
        return;
      }
      current = { s: drag.startBeat, l: Math.max(1, drag.startLength + delta) };
      setPreview(current);
    };
    const up = () => {
      if (drag.mode === 'move' && current.s !== drag.startBeat) {
        props.onMove(current.s);
      }
      if (drag.mode !== 'move' && (current.s !== drag.startBeat || current.l !== drag.startLength)) {
        props.onResize(current.s, current.l);
      }
      setPreview(null);
      setDrag(null);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, [drag, props.onMove, props.onResize, props.zoom]);

  return (
    <div
      onMouseDown={(event) => {
        if (event.button !== 0) return;
        props.onSelect();
        setPreview({ s: props.clip.s, l: props.clip.l });
        setDrag({ mode: props.tool === 'scissors' ? 'resize-right' : 'move', startX: event.clientX, startBeat: props.clip.s, startLength: props.clip.l });
      }}
      onContextMenu={(event) => { event.preventDefault(); props.onCtx(event.clientX, event.clientY); }}
      style={{ position: 'absolute', left: displayStart * props.zoom + 4, top: 6, width: Math.max(28, displayLength * props.zoom - 8), height: props.track.h - 12, borderRadius: 3, border: `1px solid ${props.selected ? DS.t2 : 'rgba(255,255,255,0.16)'}`, background: `linear-gradient(180deg, ${props.track.color}33, ${props.track.color}18)`, cursor: 'grab', overflow: 'hidden', boxShadow: props.selected ? '0 0 0 1px rgba(255,255,255,0.18)' : 'none' }}
    >
      <div style={{ height: 18, display: 'flex', alignItems: 'center', padding: '0 7px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <span style={{ fontFamily: DS.mono, fontSize: 9, color: DS.t1, letterSpacing: '0.03em' }}>{props.clip.name ?? props.clip.sample ?? props.track.name}</span>
      </div>
      <div style={{ position: 'absolute', inset: '22px 6px 5px', display: 'flex', alignItems: 'center', gap: 2 }}>
        {values.map((value, index) => <div key={index} style={{ flex: 1, height: `${value * 100}%`, background: props.track.type === 'midi' ? `${props.track.color}88` : 'rgba(255,255,255,0.34)', minWidth: 1 }} />)}
      </div>
      {props.selected && (
        <>
          <button
            aria-label="Resize clip start"
            onMouseDown={(event) => {
              event.stopPropagation();
              props.onSelect();
              setPreview({ s: props.clip.s, l: props.clip.l });
              setDrag({ mode: 'resize-left', startX: event.clientX, startBeat: props.clip.s, startLength: props.clip.l });
            }}
            style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 7, border: 0, background: 'rgba(255,255,255,0.18)', cursor: 'ew-resize' }}
          />
          <button
            aria-label="Resize clip end"
            onMouseDown={(event) => {
              event.stopPropagation();
              props.onSelect();
              setPreview({ s: props.clip.s, l: props.clip.l });
              setDrag({ mode: 'resize-right', startX: event.clientX, startBeat: props.clip.s, startLength: props.clip.l });
            }}
            style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 7, border: 0, background: 'rgba(255,255,255,0.18)', cursor: 'ew-resize' }}
          />
        </>
      )}
    </div>
  );
}

function Meter({ level, width = 4 }: { level: number; width?: number }) {
  const pct = Math.max(0, Math.min(100, ((level + 60) / 60) * 100));
  return (
    <div style={{ width, height: '100%', background: DS.s5, display: 'flex', alignItems: 'flex-end' }}>
      <div style={{ width: '100%', height: `${pct}%`, background: pct > 86 ? DS.rec : pct > 70 ? DS.warn : DS.t2, transition: 'height 70ms linear' }} />
    </div>
  );
}

function MixerView({ tracks, selectedId, meters, playing, onSelect, onVolume, onPan }: { tracks: Track[]; selectedId: string; meters: Record<string, number>; playing: boolean; onSelect: (id: string) => void; onVolume: (id: string, volume: number) => void; onPan: (id: string, pan: number) => void }) {
  return (
    <div style={{ flex: 1, overflow: 'auto', backgroundColor: DS.s0, backgroundImage: dotGrid(0.018), backgroundSize: '20px 20px', padding: 16, display: 'flex', gap: 8, alignItems: 'stretch' }}>
      {tracks.map((track) => (
        <div key={track.id} onClick={() => onSelect(track.id)} style={{ width: 82, minWidth: 82, border: `1px solid ${selectedId === track.id ? DS.bh : DS.bi}`, background: selectedId === track.id ? DS.s4 : DS.s2, borderRadius: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 8, gap: 8 }}>
          <div style={{ width: '100%', height: 2, background: track.color, opacity: track.muted ? 0.25 : 0.8 }} />
          <div style={{ height: 30, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DS.ui, fontSize: 11, color: DS.t2, textAlign: 'center', overflow: 'hidden' }}>{track.name}</div>
          <input type="range" min="-50" max="50" value={track.pan} onChange={(event) => onPan(track.id, Number(event.target.value))} style={{ width: 58 }} />
          <div style={{ flex: 1, minHeight: 210, display: 'flex', gap: 3, alignItems: 'stretch' }}>
            <Meter level={playing && !track.muted ? meters[track.id] ?? track.volume - 8 : -60} />
            <Meter level={playing && !track.muted ? (meters[track.id] ?? track.volume - 8) - 1 : -60} />
            <input type="range" min="-48" max="6" value={track.volume} onChange={(event) => onVolume(track.id, Number(event.target.value))} style={{ writingMode: 'vertical-lr', direction: 'rtl', accentColor: 'rgba(255,255,255,0.55)' }} />
          </div>
          <div style={{ fontFamily: DS.mono, color: DS.t4, fontSize: 9 }}>{track.volume > 0 ? '+' : ''}{track.volume} dB</div>
        </div>
      ))}
    </div>
  );
}

function PianoRollView({ track, selectedClip, onSelectClip, onAddNote, onUpdateNote, onDeleteNote }: { track?: Track; selectedClip: string | null; onSelectClip: (id: string) => void; onAddNote: (pitch: number, start: number) => void; onUpdateNote: (clipId: string, noteId: string, patch: Partial<Note>) => void; onDeleteNote: (clipId: string, noteId: string) => void }) {
  const midiClips = useMemo(() => (track?.clips ?? []).filter((clip) => clip.kind === 'midi'), [track]);
  const activeClip = midiClips.find((clip) => clip.id === selectedClip) ?? midiClips[0];
  const notes = activeClip?.notes ?? [];
  const pitchTop = 84;
  const pxPerBeat = 92;
  const rowHeight = 28;
  return (
    <div style={{ flex: 1, display: 'flex', backgroundColor: DS.s0 }}>
      <div style={{ width: 76, backgroundColor: DS.s1, borderRight: `1px solid ${DS.bs}` }}>
        <PanelTitle title="Keys" />
        {['C5', 'B4', 'A#4', 'A4', 'G#4', 'G4', 'F#4', 'F4', 'E4', 'D#4', 'D4', 'C#4', 'C4'].map((key) => (
          <div key={key} style={{ height: 28, display: 'flex', alignItems: 'center', paddingLeft: 12, borderBottom: `1px solid ${DS.bs}`, background: key.includes('#') ? DS.s4 : DS.s2, fontFamily: DS.mono, fontSize: 9, color: DS.t4 }}>{key}</div>
        ))}
      </div>
      <div
        onDoubleClick={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          const beat = clamp(Math.round(((event.clientX - bounds.left + event.currentTarget.scrollLeft) / pxPerBeat) * 4) / 4, 0, 31);
          const pitch = clamp(pitchTop - Math.floor((event.clientY - bounds.top + event.currentTarget.scrollTop - 24) / rowHeight), 36, 84);
          onAddNote(pitch, beat);
        }}
        style={{ flex: 1, overflow: 'auto', position: 'relative', backgroundImage: `linear-gradient(to right, ${DS.bs} 1px, transparent 1px), linear-gradient(to bottom, ${DS.bs} 1px, transparent 1px)`, backgroundSize: `${pxPerBeat / 2}px 100%, 100% ${rowHeight}px` }}
      >
        <div style={{ minWidth: 980, minHeight: 398, position: 'relative' }}>
          <div style={{ position: 'sticky', top: 0, height: 24, background: DS.s2, borderBottom: `1px solid ${DS.bs}`, zIndex: 2, display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 12 }}>
            {midiClips.map((clip) => (
              <button key={clip.id} onClick={(event) => { event.stopPropagation(); onSelectClip(clip.id); }} style={{ ...miniButton, height: 18, minWidth: 52, background: activeClip?.id === clip.id ? DS.s5 : DS.s3, fontSize: 8 }}>{clip.id}</button>
            ))}
            <span style={{ fontFamily: DS.mono, fontSize: 9, color: DS.t5 }}>double-click grid to add notes</span>
          </div>
          {activeClip && notes.map((note) => (
            <NoteBlock key={note.id} note={note} clipId={activeClip.id} color={track?.color ?? '#EC4899'} pxPerBeat={pxPerBeat} pitchTop={pitchTop} rowHeight={rowHeight} onUpdate={onUpdateNote} onDelete={onDeleteNote} />
          ))}
          <div style={{ position: 'absolute', left: 16, top: 32, fontFamily: DS.mono, fontSize: 10, color: DS.t4, letterSpacing: '0.08em' }}>{track?.name ?? 'Select MIDI track'} piano roll</div>
        </div>
      </div>
    </div>
  );
}

function NoteBlock({ note, clipId, color, pxPerBeat, pitchTop, rowHeight, onUpdate, onDelete }: { note: Note; clipId: string; color: string; pxPerBeat: number; pitchTop: number; rowHeight: number; onUpdate: (clipId: string, noteId: string, patch: Partial<Note>) => void; onDelete: (clipId: string, noteId: string) => void }) {
  const [drag, setDrag] = useState<{ x: number; y: number; s: number; pitch: number } | null>(null);
  const [preview, setPreview] = useState<{ s: number; pitch: number } | null>(null);
  const displayStart = preview?.s ?? note.s;
  const displayPitch = preview?.pitch ?? note.pitch;

  useEffect(() => {
    if (!drag) return undefined;
    let current = { s: drag.s, pitch: drag.pitch };
    const move = (event: MouseEvent) => {
      current = {
        s: clamp(Math.round((drag.s + (event.clientX - drag.x) / pxPerBeat) * 4) / 4, 0, 31),
        pitch: clamp(drag.pitch - Math.round((event.clientY - drag.y) / rowHeight), 36, 84),
      };
      setPreview(current);
    };
    const up = () => {
      if (current.s !== drag.s || current.pitch !== drag.pitch) {
        onUpdate(clipId, note.id, current);
      }
      setPreview(null);
      setDrag(null);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, [clipId, drag, note.id, onUpdate, pitchTop, pxPerBeat, rowHeight]);

  return (
    <div
      onMouseDown={(event) => {
        event.stopPropagation();
        setPreview({ s: note.s, pitch: note.pitch });
        setDrag({ x: event.clientX, y: event.clientY, s: note.s, pitch: note.pitch });
      }}
      onDoubleClick={(event) => { event.stopPropagation(); onDelete(clipId, note.id); }}
      title="Drag to move. Double-click to delete."
      style={{ position: 'absolute', left: displayStart * pxPerBeat + 20, top: (pitchTop - displayPitch) * rowHeight + 28, width: Math.max(18, note.l * pxPerBeat), height: 15, borderRadius: 2, background: `${color}99`, border: `1px solid ${color}`, cursor: 'grab' }}
    />
  );
}

function InspectorPanel({ open, track, beats, onVolume, onPan, onSend, onAutomationPoint }: { open: boolean; track?: Track; beats: number; onVolume: (id: string, volume: number) => void; onPan: (id: string, pan: number) => void; onSend: (id: string, send: number) => void; onAutomationPoint: (id: string) => void }) {
  if (!open) return null;
  return (
    <aside style={{ width: 286, background: DS.s1, borderLeft: `1px solid ${DS.bs}`, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <PanelTitle title="Inspector" right="Ctrl+I" />
      {track ? (
        <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div style={{ fontFamily: DS.ui, fontSize: 16, color: DS.t1, marginBottom: 3 }}>{track.name}</div>
            <div style={{ fontFamily: DS.mono, fontSize: 9, color: DS.t5, letterSpacing: '0.13em', textTransform: 'uppercase' }}>{track.type} channel</div>
          </div>
          <Section title="Channel">
            <Slider label="Volume" value={track.volume} min={-48} max={6} unit="dB" onChange={(value) => onVolume(track.id, value)} />
            <Slider label="Pan" value={track.pan} min={-50} max={50} unit="" onChange={(value) => onPan(track.id, value)} />
            <Slider label="Send A" value={Math.round(track.sendA * 100)} min={0} max={100} unit="%" onChange={(value) => onSend(track.id, value / 100)} />
          </Section>
          <Section title="Routing">
            {['Master', 'Sidechain Bus', 'FX Return A'].map((route) => <DetailRow key={route} label={route} value={route === 'Master' ? 'Post' : 'Send'} />)}
          </Section>
          <Section title="Device Rack">
            {['AUDIAW EQ8', 'AUDIAW Comp', track.type === 'midi' ? 'AUDIAW Synth' : 'Tape Saturator'].map((device) => <DetailRow key={device} label={device} value="on" />)}
          </Section>
          <Section title="Automation">
            <DetailRow label="Lane" value="Volume" />
            <DetailRow label="Mode" value="Read" />
            <DetailRow label="Points" value={String(track.automation.volume.length)} />
            <button onClick={() => onAutomationPoint(track.id)} style={{ ...miniButton, width: '100%', height: 26 }}>Write point @ bar {Math.floor(beats / 4) + 1}</button>
          </Section>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DS.mono, color: DS.t5, fontSize: 10 }}>Select a track</div>
      )}
    </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: `1px solid ${DS.bi}`, background: DS.s2, borderRadius: 3, overflow: 'hidden' }}>
      <div style={{ height: 28, display: 'flex', alignItems: 'center', padding: '0 10px', borderBottom: `1px solid ${DS.bs}`, fontFamily: DS.mono, fontSize: 9, color: DS.t4, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{title}</div>
      <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
      <span style={{ fontFamily: DS.ui, color: DS.t2, fontSize: 12 }}>{label}</span>
      <span style={{ fontFamily: DS.mono, color: DS.t5, fontSize: 9, letterSpacing: '0.05em' }}>{value}</span>
    </div>
  );
}

function Slider({ label, value, min, max, unit, onChange }: { label: string; value: number; min: number; max: number; unit: string; onChange: (value: number) => void }) {
  return (
    <label style={{ display: 'grid', gridTemplateColumns: '74px 1fr 48px', alignItems: 'center', gap: 8 }}>
      <span style={{ fontFamily: DS.ui, color: DS.t2, fontSize: 12 }}>{label}</span>
      <input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} />
      <span style={{ fontFamily: DS.mono, color: DS.t4, fontSize: 9, textAlign: 'right' }}>{value}{unit}</span>
    </label>
  );
}

function BottomPanel({ tracks, meters, playing, onClose }: { tracks: Track[]; meters: Record<string, number>; playing: boolean; onClose: () => void }) {
  return (
    <div style={{ height: 196, flexShrink: 0, borderTop: `1px solid ${DS.bs}`, background: DS.s1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 26, display: 'flex', alignItems: 'center', background: DS.s2, borderBottom: `1px solid ${DS.bs}`, padding: '0 10px', gap: 6, flexShrink: 0 }}>
        {['Mixer', 'Piano Roll', 'Event List'].map((item, index) => (
          <button key={item} style={{ padding: '2px 10px', borderRadius: 1, border: 'none', cursor: 'pointer', background: index === 0 ? DS.s5 : 'transparent', color: index === 0 ? DS.t1 : DS.t4, fontFamily: DS.mono, fontSize: 9, fontWeight: 700, letterSpacing: '0.04em' }}>{item}</button>
        ))}
        <div style={{ flex: 1 }} />
        <button onClick={onClose} style={{ ...miniButton, height: 18, minWidth: 18 }}>x</button>
      </div>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex' }}>
        {tracks.slice(0, 9).map((track) => (
          <div key={track.id} style={{ width: 60, flexShrink: 0, borderRight: `1px solid ${DS.bs}`, background: DS.s2, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '6px 4px', gap: 3 }}>
            <div style={{ width: '100%', height: 1, background: track.color, marginBottom: 2, opacity: 0.55 }} />
            <span style={{ fontFamily: DS.mono, fontSize: 8, color: DS.t4, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', letterSpacing: '0.02em' }}>{track.name}</span>
            <div style={{ flex: 1, display: 'flex', gap: 2, alignItems: 'flex-end', width: '100%' }}>
              <Meter level={playing && !track.muted ? meters[track.id] ?? track.volume - 5 : -60} />
              <Meter level={playing && !track.muted ? (meters[track.id] ?? track.volume - 5) - 0.4 : -60} />
            </div>
            <span style={{ fontFamily: DS.mono, fontSize: 7, color: DS.t5, letterSpacing: '0.02em' }}>{track.volume >= 0 ? '+' : ''}{track.volume}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommandPalette({ open, onClose, onExec }: { open: boolean; onClose: () => void; onExec: (id: string) => void }) {
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const filtered = useMemo(() => COMMANDS.filter((cmd) => !query || cmd.label.toLowerCase().includes(query.toLowerCase()) || cmd.cat.toLowerCase().includes(query.toLowerCase())), [query]);
  const grouped = useMemo(() => filtered.reduce<Record<string, typeof COMMANDS>>((acc, cmd) => { (acc[cmd.cat] ||= []).push(cmd); return acc; }, {}), [filtered]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setSel(0);
    window.setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 68, backdropFilter: 'blur(2px)' }}>
      <div onClick={(event) => event.stopPropagation()} style={{ width: 510, background: DS.s4, borderRadius: 4, border: `1px solid ${DS.bi}`, boxShadow: '0 32px 80px rgba(0,0,0,0.88)', overflow: 'hidden', animation: `cmdin 160ms ${DS.ease}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', borderBottom: `1px solid ${DS.bs}` }}>
          <Glyph name="cmd" size={10} />
          <input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setSel(0); }} placeholder="Type a command..." onKeyDown={(event) => {
            if (event.key === 'ArrowDown') { event.preventDefault(); setSel((value) => Math.min(value + 1, filtered.length - 1)); }
            if (event.key === 'ArrowUp') { event.preventDefault(); setSel((value) => Math.max(value - 1, 0)); }
            if (event.key === 'Enter') { const cmd = filtered[sel]; if (cmd) onExec(cmd.id); onClose(); }
            if (event.key === 'Escape') onClose();
          }} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontFamily: DS.ui, fontSize: 14, color: DS.t1 }} />
          <span style={{ fontFamily: DS.mono, fontSize: 9, color: DS.t5, background: DS.s5, padding: '2px 7px', borderRadius: 2, letterSpacing: '0.06em' }}>ESC</span>
        </div>
        <div style={{ maxHeight: 320, overflow: 'auto' }}>
          {Object.entries(grouped).map(([cat, cmds]) => (
            <div key={cat}>
              <div style={{ padding: '8px 16px 3px', fontFamily: DS.mono, fontSize: 8, color: DS.t5, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{cat}</div>
              {cmds.map((cmd) => {
                const idx = filtered.indexOf(cmd);
                return (
                  <button key={cmd.id} onClick={() => { onExec(cmd.id); onClose(); }} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', cursor: 'pointer', background: sel === idx ? 'rgba(255,255,255,0.055)' : 'transparent', border: 0, borderLeft: sel === idx ? `2px solid rgba(255,255,255,0.45)` : '2px solid transparent' }}>
                    <span style={{ fontFamily: DS.ui, fontSize: 13, color: DS.t1 }}>{cmd.label}</span>
                    <span style={{ fontFamily: DS.mono, fontSize: 10, color: DS.t4 }}>{cmd.kbd}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExportDialog({ open, projectName, onClose, onRender }: { open: boolean; projectName: string; onClose: () => void; onRender: (sampleRate: number) => Promise<void> }) {
  const [progress, setProgress] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [sampleRate, setSampleRate] = useState('48000');

  if (!open) return null;
  const startRender = async () => {
    setDone(false);
    setProgress(5);
    try {
      await onRender(Number(sampleRate));
      setProgress(100);
      setDone(true);
    } catch {
      setProgress(null);
    }
  };
  const close = () => {
    setProgress(null);
    setDone(false);
    onClose();
  };

  return (
    <div onClick={close} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)', zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)' }}>
      <div onClick={(event) => event.stopPropagation()} style={{ width: 440, background: DS.s4, borderRadius: 4, border: `1px solid ${DS.bi}`, boxShadow: '0 32px 80px rgba(0,0,0,0.88)', overflow: 'hidden', animation: `cmdin 180ms ${DS.ease}` }}>
        <div style={{ padding: '16px 18px', borderBottom: `1px solid ${DS.bs}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: DS.ui, fontSize: 13, fontWeight: 500, color: DS.t1 }}>Export Mixdown</div>
            <div style={{ fontFamily: DS.mono, fontSize: 10, color: DS.t4, marginTop: 2, letterSpacing: '0.04em' }}>{projectName}</div>
          </div>
          <button onClick={close} style={{ ...miniButton, height: 22, minWidth: 22 }}>x</button>
        </div>
        {progress !== null ? (
          <div style={{ padding: 32, textAlign: 'center' }}>
            {done ? (
              <>
                <div style={{ fontFamily: DS.ui, fontSize: 13, fontWeight: 500, color: DS.t1, marginBottom: 4 }}>Export complete</div>
                <div style={{ fontFamily: DS.mono, fontSize: 10, color: DS.t4, letterSpacing: '0.03em' }}>{safeProjectName(projectName)}.wav rendered</div>
                <button onClick={close} style={{ marginTop: 22, padding: '7px 22px', borderRadius: 2, border: `1px solid ${DS.bi}`, background: 'transparent', color: DS.t2, cursor: 'pointer', fontFamily: DS.ui, fontSize: 12 }}>Done</button>
              </>
            ) : (
              <>
                <div style={{ fontFamily: DS.mono, fontSize: 11, color: DS.t3, marginBottom: 18 }}>Rendering stems and master bus</div>
                <div style={{ width: '100%', height: 1, background: DS.s6 }}>
                  <div style={{ width: `${progress}%`, height: '100%', background: DS.t2, transition: 'width 100ms ease' }} />
                </div>
                <div style={{ fontFamily: DS.mono, fontSize: 11, color: DS.t4, marginTop: 10 }}>{Math.round(progress)}%</div>
              </>
            )}
          </div>
        ) : (
          <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <DetailRow label="Format" value="WAV" />
            <SelectRow label="Sample Rate" value={sampleRate} values={['44100', '48000', '96000']} onChange={setSampleRate} />
            <DetailRow label="Normalize" value="enabled" />
            <DetailRow label="Render Source" value="Master" />
            <button onClick={startRender} style={{ height: 34, marginTop: 6, border: `1px solid ${DS.bh}`, background: DS.accB, color: DS.t1, cursor: 'pointer', borderRadius: 2, fontFamily: DS.mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Start Export</button>
          </div>
        )}
      </div>
    </div>
  );
}

function SelectRow({ label, value, values, onChange }: { label: string; value: string; values: string[]; onChange: (value: string) => void }) {
  return (
    <label style={{ display: 'grid', gridTemplateColumns: '110px 1fr', alignItems: 'center', gap: 10 }}>
      <span style={{ fontFamily: DS.ui, fontSize: 12, color: DS.t2 }}>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} style={{ background: DS.s2, border: `1px solid ${DS.bi}`, borderRadius: 2, padding: '6px 10px', fontFamily: DS.mono, fontSize: 11, color: DS.t1, outline: 'none' }}>
        {values.map((item) => <option key={item}>{item}</option>)}
      </select>
    </label>
  );
}

function ContextMenu({ state, onClose }: { state: ContextState | null; onClose: () => void }) {
  useEffect(() => {
    if (!state) return undefined;
    const close = () => onClose();
    window.addEventListener('click', close);
    window.addEventListener('keydown', close);
    return () => {
      window.removeEventListener('click', close);
      window.removeEventListener('keydown', close);
    };
  }, [state, onClose]);

  if (!state) return null;
  return (
    <div onClick={(event) => event.stopPropagation()} style={{ position: 'fixed', left: Math.min(state.x, window.innerWidth - 216), top: Math.min(state.y, window.innerHeight - 240), zIndex: 9995, background: DS.s5, border: `1px solid ${DS.bi}`, borderRadius: 3, minWidth: 200, boxShadow: '0 12px 48px rgba(0,0,0,0.80)', overflow: 'hidden', padding: '3px 0' }}>
      {state.items.map((item, index) => item === '---' ? (
        <div key={index} style={{ height: 1, background: DS.bs, margin: '3px 0' }} />
      ) : (
        <button key={index} onClick={() => { item.fn?.(); onClose(); }} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', height: 30, cursor: 'pointer', border: 0, background: 'transparent', textAlign: 'left' }}>
          <span style={{ fontFamily: DS.ui, fontSize: 12, color: item.danger ? 'rgba(255,60,60,0.80)' : DS.t1 }}>{item.label}</span>
          {item.kbd && <span style={{ fontFamily: DS.mono, fontSize: 9, color: DS.t4, marginLeft: 24 }}>{item.kbd}</span>}
        </button>
      ))}
    </div>
  );
}

function Toasts({ toasts }: { toasts: Toast[] }) {
  return (
    <div style={{ position: 'fixed', bottom: 28, right: 16, zIndex: 9990, display: 'flex', flexDirection: 'column-reverse', gap: 5, pointerEvents: 'none' }}>
      {toasts.map((toast) => (
        <div key={toast.id} style={{ display: 'flex', alignItems: 'center', gap: 10, background: DS.s4, border: `1px solid ${DS.bi}`, borderLeft: `2px solid ${toast.type === 'success' ? 'rgba(255,255,255,0.45)' : toast.type === 'warn' ? DS.warn : DS.t3}`, borderRadius: 2, padding: '8px 14px', fontFamily: DS.ui, fontSize: 12, color: DS.t1, boxShadow: '0 4px 24px rgba(0,0,0,0.70)', animation: `toastin 160ms ${DS.ease}`, minWidth: 190 }}>
          {toast.msg}
          {toast.kbd && <span style={{ fontFamily: DS.mono, fontSize: 10, color: DS.t4, marginLeft: 'auto' }}>{toast.kbd}</span>}
        </div>
      ))}
    </div>
  );
}

function StatusBar({ playing, recording, selectedClip, beats, trackCount, canUndo, canRedo, projectName, dirty, autoSavedAt }: { playing: boolean; recording: boolean; selectedClip: string | null; beats: number; trackCount: number; canUndo: boolean; canRedo: boolean; projectName: string; dirty: boolean; autoSavedAt: string | null }) {
  return (
    <div style={{ height: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: DS.s1, borderTop: `1px solid ${DS.bs}`, padding: '0 14px', flexShrink: 0, userSelect: 'none' }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <span style={statusText}>48 kHz</span>
        <span style={statusText}>256 smpl</span>
        <span style={statusText}>24-bit Float</span>
        <span style={statusText}>{trackCount} tracks</span>
        <span style={statusText}>{projectName}{dirty ? ' *' : ''}</span>
        <span style={statusText}>Undo {canUndo ? 'ready' : 'empty'} / Redo {canRedo ? 'ready' : 'empty'}</span>
        {recording && <span style={{ ...statusText, color: DS.rec, animation: 'recpulse 1s ease-in-out infinite' }}>REC</span>}
        {playing && !recording && <span style={statusText}>PLAY</span>}
        {selectedClip && <span style={{ ...statusText, color: DS.t3 }}>Clip: {selectedClip}</span>}
      </div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <span style={statusText}>Bar {Math.floor(beats / 4) + 1}</span>
        <span style={statusText}>Snap: 1/4</span>
        {autoSavedAt && <span style={statusText}>Autosaved {new Date(autoSavedAt).toLocaleTimeString()}</span>}
        <span style={{ ...statusText, color: DS.t5 }}>AUDIAW v1.0</span>
      </div>
    </div>
  );
}

const statusText: React.CSSProperties = {
  fontFamily: DS.mono,
  fontSize: 9,
  color: DS.t4,
  letterSpacing: '0.06em',
};

function AppShell() {
  const initialProject = useMemo(() => loadProjectFromStorage(), []);
  const [startup, setStartup] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [recording, setRecording] = useState(false);
  const [loop, setLoop] = useState(initialProject.playback.loop);
  const [beats, setBeats] = useState(initialProject.playback.beat);
  const [view, setView] = useState<ViewMode>(initialProject.workspace.view);
  const [leftOpen, setLeftOpen] = useState(initialProject.workspace.leftOpen);
  const [rightOpen, setRightOpen] = useState(initialProject.workspace.rightOpen);
  const [bottomOpen, setBottomOpen] = useState(initialProject.workspace.bottomOpen);
  const [browserTab, setBrowserTab] = useState<BrowserTab>(initialProject.workspace.browserTab);
  const [tracks, setTracks] = useState<Track[]>(() => initialProject.tracks.map(normalizeTrack));
  const [projectId, setProjectId] = useState(initialProject.id);
  const [projectName, setProjectName] = useState(initialProject.name);
  const [projectPath, setProjectPath] = useState<string | undefined>(initialProject.path);
  const [projectCreatedAt, setProjectCreatedAt] = useState(initialProject.createdAt);
  const [lastSavedAt, setLastSavedAt] = useState(initialProject.savedAt);
  const [dirty, setDirty] = useState(false);
  const [autoSavedAt, setAutoSavedAt] = useState<string | null>(null);
  const [recentProjects, setRecentProjects] = useState<RecentProject[]>(loadRecentProjects);
  const [selectedId, setSelectedId] = useState(initialProject.workspace.selectedTrackId);
  const [selectedClip, setSelectedClip] = useState<string | null>(initialProject.workspace.selectedClipId);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [tool, setTool] = useState<ToolMode>(initialProject.workspace.tool);
  const [zoom, setZoom] = useState(initialProject.workspace.zoom);
  const [meters, setMeters] = useState<Record<string, number>>({});
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [context, setContext] = useState<ContextState | null>(null);
  const [undoStack, setUndoStack] = useState<Track[][]>([]);
  const [redoStack, setRedoStack] = useState<Track[][]>([]);
  const playingRef = useRef(playing);
  const lastTime = useRef<number | null>(null);
  const raf = useRef<number | null>(null);
  const audioCtx = useRef<AudioContext | null>(null);
  const audioNodes = useRef<AudioScheduledSourceNode[]>([]);
  const audioStartBeat = useRef(0);
  const audioStartTime = useRef(0);
  const recordingStartBeat = useRef(0);
  const recordingTrackId = useRef<string | null>(null);

  playingRef.current = playing;
  const selectedTrack = tracks.find((track) => track.id === selectedId);
  const selectedClipContext = useMemo(() => {
    if (!selectedClip) return null;
    for (const track of tracks) {
      const clip = track.clips.find((item) => item.id === selectedClip);
      if (clip) return { track, clip };
    }
    return null;
  }, [selectedClip, tracks]);
  const workspace = useMemo<WorkspaceState>(() => ({
    view,
    leftOpen,
    rightOpen,
    bottomOpen,
    browserTab,
    tool,
    zoom,
    selectedTrackId: selectedId,
    selectedClipId: selectedClip,
  }), [bottomOpen, browserTab, leftOpen, rightOpen, selectedClip, selectedId, tool, view, zoom]);

  const toast = useCallback((msg: string, type: ToastKind = 'info', kbd?: string) => {
    const id = Date.now();
    setToasts((items) => [...items.slice(-3), { id, msg, type, kbd }]);
    window.setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 2200);
  }, []);

  const stopAudio = useCallback(() => {
    audioNodes.current.forEach((node) => {
      try {
        node.stop();
      } catch {
        // Scheduled sources can already be stopped by the Web Audio clock.
      }
    });
    audioNodes.current = [];
  }, []);

  const startAudio = useCallback(async (fromBeat: number) => {
    const ctx = audioCtx.current ?? new AudioContext({ sampleRate: 48000 });
    audioCtx.current = ctx;
    if (ctx.state === 'suspended') await ctx.resume();
    stopAudio();
    audioStartBeat.current = fromBeat;
    audioStartTime.current = scheduleProject(ctx, ctx.destination, tracks, fromBeat, audioNodes.current);
  }, [stopAudio, tracks]);

  const stopTransport = useCallback(() => {
    stopAudio();
    setPlaying(false);
    setRecording(false);
    recordingTrackId.current = null;
    setBeats(0);
  }, [stopAudio]);

  const togglePlayback = useCallback(() => {
    if (playingRef.current) {
      stopAudio();
      setPlaying(false);
      return;
    }
    void startAudio(beats).then(() => setPlaying(true)).catch(() => toast('Audio engine could not start', 'warn'));
  }, [beats, startAudio, stopAudio, toast]);

  const snapshotProject = useCallback((path = projectPath, savedAt?: string) => buildProjectData({
    id: projectId,
    name: projectName,
    tracks,
    workspace,
    loop,
    beat: beats,
    createdAt: projectCreatedAt,
    savedAt,
    path,
  }), [beats, loop, projectCreatedAt, projectId, projectName, projectPath, tracks, workspace]);

  const rememberProject = useCallback((project: ProjectData) => {
    const recent: RecentProject = {
      id: project.id,
      name: project.name,
      path: project.path,
      savedAt: project.savedAt,
    };
    setRecentProjects((items) => {
      const next = [recent, ...items.filter((item) => item.id !== recent.id && item.path !== recent.path)].slice(0, 12);
      window.localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const persistProjectDocument = useCallback(async (project: ProjectData, path?: string) => {
    const contents = JSON.stringify({ ...project, path }, null, 2);
    window.localStorage.setItem(PROJECT_KEY, contents);
    if (path && isTauriRuntime()) {
      await invoke('write_project_document', { path, contents });
    }
  }, []);

  const applyProject = useCallback((project: ProjectData, sourcePath?: string) => {
    const normalized = normalizeProjectData({ ...project, path: sourcePath ?? project.path });
    stopTransport();
    setProjectId(normalized.id);
    setProjectName(normalized.name);
    setProjectPath(normalized.path);
    setProjectCreatedAt(normalized.createdAt);
    setLastSavedAt(normalized.savedAt);
    setTracks(normalized.tracks.map(normalizeTrack));
    setView(normalized.workspace.view);
    setLeftOpen(normalized.workspace.leftOpen);
    setRightOpen(normalized.workspace.rightOpen);
    setBottomOpen(normalized.workspace.bottomOpen);
    setBrowserTab(normalized.workspace.browserTab);
    setTool(normalized.workspace.tool);
    setZoom(normalized.workspace.zoom);
    setLoop(normalized.playback.loop);
    setBeats(normalized.playback.beat);
    setUndoStack([]);
    setRedoStack([]);
    setSelectedId(normalized.tracks.some((track) => track.id === normalized.workspace.selectedTrackId) ? normalized.workspace.selectedTrackId : normalized.tracks[0]?.id ?? 't1');
    setSelectedClip(normalized.workspace.selectedClipId);
    setDirty(false);
    window.localStorage.setItem(PROJECT_KEY, JSON.stringify(normalized));
    rememberProject(normalized);
  }, [rememberProject, stopTransport]);

  const saveProjectAs = useCallback(async () => {
    const savedAt = new Date().toISOString();
    const defaultPath = `${safeProjectName(projectName)}.audiaw`;
    let path = projectPath;
    if (isTauriRuntime()) {
      const selected = await save({
        defaultPath,
        filters: [{ name: 'AUDIAW Project', extensions: ['audiaw'] }],
      });
      if (!selected) return;
      path = selected;
    }
    const project = snapshotProject(path, savedAt);
    try {
      await persistProjectDocument(project, path);
      if (!isTauriRuntime()) downloadTextFile(`${safeProjectName(project.name)}.audiaw`, JSON.stringify(project, null, 2));
      setProjectPath(path);
      setLastSavedAt(savedAt);
      setDirty(false);
      rememberProject(project);
      toast('Project saved as .audiaw', 'success', 'Ctrl+Shift+S');
    } catch {
      toast('Save As failed', 'warn');
    }
  }, [persistProjectDocument, projectName, projectPath, rememberProject, snapshotProject, toast]);

  const saveProject = useCallback(async () => {
    if (!projectPath && isTauriRuntime()) {
      await saveProjectAs();
      return;
    }
    const savedAt = new Date().toISOString();
    const project = snapshotProject(projectPath, savedAt);
    try {
      await persistProjectDocument(project, projectPath);
      setLastSavedAt(savedAt);
      setDirty(false);
      rememberProject(project);
      toast('Project saved', 'success', 'Ctrl+S');
    } catch {
      toast('Project save failed', 'warn');
    }
  }, [persistProjectDocument, projectPath, rememberProject, saveProjectAs, snapshotProject, toast]);

  const importProjectFromFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        applyProject(normalizeProjectData(JSON.parse(String(reader.result))));
        toast('Project opened', 'success');
      } catch {
        toast('Invalid AUDIAW project file', 'warn');
      }
    };
    reader.readAsText(file);
  }, [applyProject, toast]);

  const loadProject = useCallback(async (path?: string) => {
    if (isTauriRuntime()) {
      try {
        const selected = path ?? (await open({
          multiple: false,
          filters: [{ name: 'AUDIAW Project', extensions: ['audiaw', 'json'] }],
        }));
        if (!selected || Array.isArray(selected)) return;
        const contents = await invoke<string>('read_project_document', { path: selected });
        applyProject(normalizeProjectData(JSON.parse(contents)), selected);
        toast('Project opened', 'success', 'Ctrl+O');
      } catch {
        toast('Open project failed', 'warn');
      }
      return;
    }
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.audiaw,application/json';
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) importProjectFromFile(file);
    };
    input.click();
  }, [applyProject, importProjectFromFile, toast]);

  const newProject = useCallback(() => {
    const name = safeProjectName(window.prompt('Project name', 'Untitled Project') ?? 'Untitled Project');
    stopTransport();
    setProjectId(makeId());
    setProjectName(name);
    setProjectPath(undefined);
    setProjectCreatedAt(new Date().toISOString());
    setLastSavedAt(new Date().toISOString());
    setTracks(patchInitialTracks());
    setUndoStack([]);
    setRedoStack([]);
    setSelectedId('t1');
    setSelectedClip(null);
    setDirty(true);
    toast('New project created', 'success');
  }, [stopTransport, toast]);

  const renameProject = useCallback(() => {
    const name = safeProjectName(window.prompt('Project name', projectName) ?? projectName);
    if (name === projectName) return;
    setProjectName(name);
    setDirty(true);
    toast('Project renamed', 'success');
  }, [projectName, toast]);

  const duplicateProject = useCallback(async () => {
    const nextName = safeProjectName(window.prompt('Duplicate project name', `${projectName} Copy`) ?? `${projectName} Copy`);
    const nextId = makeId();
    const now = new Date().toISOString();
    let path: string | undefined;
    if (isTauriRuntime()) {
      const selected = await save({
        defaultPath: `${safeProjectName(nextName)}.audiaw`,
        filters: [{ name: 'AUDIAW Project', extensions: ['audiaw'] }],
      });
      if (!selected) return;
      path = selected;
    }
    const project = buildProjectData({
      id: nextId,
      name: nextName,
      tracks,
      workspace,
      loop,
      beat: beats,
      createdAt: now,
      savedAt: now,
      path,
    });
    try {
      await persistProjectDocument(project, path);
      if (!isTauriRuntime()) downloadTextFile(`${safeProjectName(project.name)}.audiaw`, JSON.stringify(project, null, 2));
      setProjectId(nextId);
      setProjectName(nextName);
      setProjectPath(path);
      setProjectCreatedAt(now);
      setLastSavedAt(now);
      setDirty(false);
      rememberProject(project);
      toast('Project duplicated', 'success');
    } catch {
      toast('Project duplicate failed', 'warn');
    }
  }, [beats, loop, persistProjectDocument, projectName, rememberProject, toast, tracks, workspace]);

  const commitTracks = useCallback((updater: (tracks: Track[]) => Track[], _label: string) => {
    setTracks((prev) => {
      setUndoStack((history) => [...history.slice(-99), prev]);
      setRedoStack([]);
      setDirty(true);
      return updater(prev);
    });
  }, []);

  const finalizeRecording = useCallback((endBeat: number) => {
    const trackId = recordingTrackId.current;
    const start = recordingStartBeat.current;
    recordingTrackId.current = null;
    setRecording(false);
    if (!trackId) return;

    const snappedStart = Math.max(0, Math.round(start * 4) / 4);
    const length = Math.max(1, Math.round(Math.max(endBeat - snappedStart, 1) * 4) / 4);
    const clipId = `rec${Date.now()}`;

    commitTracks((items) => items.map((track) => {
      if (track.id !== trackId) return track;
      const isMidi = track.type === 'midi';
      return {
        ...track,
        armed: false,
        clips: [
          ...track.clips,
          makeClip(
            clipId,
            snappedStart,
            length,
            isMidi ? 'midi' : 'audio',
            isMidi ? undefined : track.sample,
            isMidi ? defaultNotes(track.name) : undefined,
          ),
        ],
      };
    }), 'Record take');
    setSelectedClip(clipId);
    toast('Recorded take committed', 'success');
  }, [commitTracks, toast]);

  const toggleRecording = useCallback(() => {
    if (recording) {
      finalizeRecording(beats);
      return;
    }

    const target = tracks.find((track) => track.armed && track.type !== 'master' && track.type !== 'return')
      ?? selectedTrack;
    if (!target || target.type === 'master' || target.type === 'return') {
      toast('Select or arm an audio/MIDI track first', 'warn', 'R');
      return;
    }

    recordingStartBeat.current = Math.max(0, Math.round(beats * 4) / 4);
    recordingTrackId.current = target.id;
    commitTracks((items) => items.map((track) => track.id === target.id ? { ...track, armed: true } : track), 'Arm recording track');
    setRecording(true);
    if (!playingRef.current) {
      void startAudio(beats).then(() => setPlaying(true)).catch(() => toast('Audio engine could not start', 'warn'));
    }
    toast(`Recording ${target.name}`, 'success', 'R');
  }, [beats, commitTracks, finalizeRecording, recording, selectedTrack, startAudio, toast, tracks]);

  const undo = useCallback(() => {
    setUndoStack((history) => {
      const previous = history[history.length - 1];
      if (!previous) return history;
      setRedoStack((redo) => [tracks, ...redo.slice(0, 99)]);
      setTracks(previous);
      toast('Undo', 'success', 'Ctrl+Z');
      return history.slice(0, -1);
    });
  }, [toast, tracks]);

  const redo = useCallback(() => {
    setRedoStack((redoHistory) => {
      const next = redoHistory[0];
      if (!next) return redoHistory;
      setUndoStack((history) => [...history.slice(-99), tracks]);
      setTracks(next);
      toast('Redo', 'success', 'Ctrl+Y');
      return redoHistory.slice(1);
    });
  }, [toast, tracks]);

  useEffect(() => {
    if (!playing) {
      if (raf.current) cancelAnimationFrame(raf.current);
      lastTime.current = null;
      return undefined;
    }
    const tick = (ts: number) => {
      if (!lastTime.current) lastTime.current = ts;
      lastTime.current = ts;
      const ctx = audioCtx.current;
      const audioBeat = ctx ? audioStartBeat.current + (ctx.currentTime - audioStartTime.current) * (BPM / 60) : 0;
      if (loop && audioBeat >= ARRANGEMENT_BEATS) {
        void startAudio(0);
        setBeats(0);
      } else if (audioBeat >= ARRANGEMENT_BEATS) {
        stopAudio();
        setPlaying(false);
        setBeats(ARRANGEMENT_BEATS);
      } else {
        setBeats(audioBeat);
      }
      if (playingRef.current) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [loop, playing, startAudio, stopAudio]);

  useEffect(() => {
    if (!playing) {
      setMeters({});
      return undefined;
    }
    const timer = window.setInterval(() => {
      const time = audioCtx.current?.currentTime ?? performance.now() / 1000;
      setMeters(tracks.reduce<Record<string, number>>((acc, track) => {
        if (!track.muted) {
          const phase = (hashStr(track.id) % 31) / 10;
          acc[track.id] = track.volume - 8 + Math.sin(time * 8 + phase) * 5 + Math.sin(time * 17 + phase) * 2;
        }
        return acc;
      }, {}));
    }, 80);
    return () => window.clearInterval(timer);
  }, [playing, tracks]);

  useEffect(() => {
    if (!playing) return;
    void startAudio(beats).catch(() => toast('Audio graph restart failed', 'warn'));
  }, [tracks]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const autoSaved = new Date().toISOString();
      const project = snapshotProject(projectPath, autoSaved);
      window.localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(project));
      window.localStorage.setItem(PROJECT_KEY, JSON.stringify(project));
      setAutoSavedAt(autoSaved);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [beats, browserTab, bottomOpen, leftOpen, loop, projectName, projectPath, rightOpen, selectedClip, selectedId, snapshotProject, tool, tracks, view, zoom]);

  const updateTrack = useCallback((id: string, patch: Partial<Track>) => {
    commitTracks((items) => items.map((track) => track.id === id ? { ...track, ...patch } : track), 'Update track');
  }, [commitTracks]);

  const addTrack = useCallback((type: TrackType) => {
    const id = `t${Date.now()}`;
    const name = type === 'midi' ? `MIDI ${tracks.filter((track) => track.type === 'midi').length + 1}` : `Audio ${tracks.filter((track) => track.type === 'audio').length + 1}`;
    const track: Track = { id, name, type, color: type === 'midi' ? '#EC4899' : '#3B82F6', muted: false, solo: false, armed: false, volume: -6, pan: 0, instrument: type === 'midi' ? 'synth' : 'sampler', effects: type === 'midi' ? ['AUDIAW Synth'] : [], sendA: 0.08, automation: { volume: [{ id: `${id}-vol-0`, beat: 0, value: -6 }] }, h: 48, clips: [] };
    commitTracks((items) => [...items.filter((item) => item.type !== 'master'), track, ...items.filter((item) => item.type === 'master')], 'Add track');
    setSelectedId(id);
    toast(`${name} added`, 'success');
  }, [commitTracks, toast, tracks]);

  const duplicateTrack = useCallback((id: string) => {
    const source = tracks.find((track) => track.id === id);
    if (!source) return;
    const copy: Track = { ...source, id: `t${Date.now()}`, name: `${source.name} Copy`, clips: source.clips.map((clip) => ({ ...clip, id: `${clip.id}d` })) };
    commitTracks((items) => [...items.filter((item) => item.type !== 'master'), copy, ...items.filter((item) => item.type === 'master')], 'Duplicate track');
    toast('Track duplicated', 'success');
  }, [commitTracks, toast, tracks]);

  const renameTrack = useCallback((id: string) => {
    const current = tracks.find((track) => track.id === id);
    if (!current) return;
    const name = window.prompt('Track name', current.name)?.trim();
    if (!name || name === current.name) return;
    commitTracks((items) => items.map((track) => track.id === id ? { ...track, name } : track), 'Rename track');
    toast('Track renamed', 'success');
  }, [commitTracks, toast, tracks]);

  const deleteTrack = useCallback((id: string) => {
    const target = tracks.find((track) => track.id === id);
    if (!target || target.type === 'master') return;
    commitTracks((items) => items.filter((track) => track.id !== id), 'Delete track');
    setSelectedId('t1');
    toast('Track deleted', 'warn');
  }, [commitTracks, toast, tracks]);

  const moveClip = useCallback((trackId: string, clipId: string, start: number) => {
    commitTracks((items) => items.map((track) => track.id === trackId ? { ...track, clips: track.clips.map((clip) => clip.id === clipId ? { ...clip, s: start } : clip) } : track), 'Move clip');
  }, [commitTracks]);

  const resizeClip = useCallback((trackId: string, clipId: string, start: number, length: number) => {
    commitTracks((items) => items.map((track) => track.id === trackId ? {
      ...track,
      clips: track.clips.map((clip) => clip.id === clipId ? { ...clip, s: Math.max(0, start), l: Math.max(1, length) } : clip),
    } : track), 'Resize clip');
  }, [commitTracks]);

  const createClip = useCallback((trackId: string, start: number) => {
    const clipId = `c${Date.now()}`;
    commitTracks((items) => items.map((track) => track.id === trackId ? { ...track, clips: [...track.clips, makeClip(clipId, start, 4, track.type === 'midi' ? 'midi' : 'audio', track.sample, track.type === 'midi' ? defaultNotes(track.name) : undefined)] } : track), 'Create clip');
    setSelectedId(trackId);
    setSelectedClip(clipId);
    toast('Clip created', 'success');
  }, [commitTracks, toast]);

  const splitClip = useCallback((trackId: string, clipId: string, splitAt: number) => {
    const rightId = `c${Date.now()}`;
    let didSplit = false;
    commitTracks((items) => items.map((track) => {
      if (track.id !== trackId) return track;
      const clip = track.clips.find((item) => item.id === clipId);
      if (!clip) return track;
      const beat = Math.round(splitAt * 4) / 4;
      if (beat <= clip.s + 0.25 || beat >= clip.s + clip.l - 0.25) return track;
      didSplit = true;
      return {
        ...track,
        clips: track.clips.flatMap((item) => {
          if (item.id !== clipId) return [item];
          return [
            { ...item, l: beat - item.s },
            { ...item, id: rightId, s: beat, l: item.s + item.l - beat, name: item.name ? `${item.name} B` : undefined },
          ];
        }),
      };
    }), 'Split clip');
    if (didSplit) {
      setSelectedClip(rightId);
      toast('Clip split', 'success', 'C');
    } else {
      toast('Move playhead inside the clip to split', 'warn');
    }
  }, [commitTracks, toast]);

  const deleteClip = useCallback((trackId: string, clipId: string) => {
    commitTracks((items) => items.map((track) => track.id === trackId ? { ...track, clips: track.clips.filter((clip) => clip.id !== clipId) } : track), 'Delete clip');
    setSelectedClip(null);
    toast('Clip deleted', 'warn');
  }, [commitTracks, toast]);

  const deleteSelectedClip = useCallback(() => {
    if (!selectedClipContext) return false;
    deleteClip(selectedClipContext.track.id, selectedClipContext.clip.id);
    return true;
  }, [deleteClip, selectedClipContext]);

  const duplicateClip = useCallback((trackId: string, clipId: string) => {
    const newId = `c${Date.now()}`;
    commitTracks((items) => items.map((track) => {
      if (track.id !== trackId) return track;
      const clip = track.clips.find((item) => item.id === clipId);
      return clip ? { ...track, clips: [...track.clips, { ...clip, id: newId, s: clip.s + clip.l }] } : track;
    }), 'Duplicate clip');
    setSelectedClip(newId);
    toast('Clip duplicated', 'success');
  }, [commitTracks, toast]);

  const duplicateSelectedClip = useCallback(() => {
    if (!selectedClipContext) return false;
    duplicateClip(selectedClipContext.track.id, selectedClipContext.clip.id);
    return true;
  }, [duplicateClip, selectedClipContext]);

  const splitSelectedClip = useCallback(() => {
    if (!selectedClipContext) return false;
    splitClip(selectedClipContext.track.id, selectedClipContext.clip.id, beats);
    return true;
  }, [beats, selectedClipContext, splitClip]);

  const renameClip = useCallback((trackId: string, clipId: string) => {
    const track = tracks.find((item) => item.id === trackId);
    const clip = track?.clips.find((item) => item.id === clipId);
    if (!clip) return;
    const name = window.prompt('Clip name', clip.name ?? clip.sample ?? track?.name ?? clip.id)?.trim();
    if (!name) return;
    commitTracks((items) => items.map((item) => item.id === trackId ? {
      ...item,
      clips: item.clips.map((candidate) => candidate.id === clipId ? { ...candidate, name } : candidate),
    } : item), 'Rename clip');
    toast('Clip renamed', 'success');
  }, [commitTracks, toast, tracks]);

  const loadSampleToSelectedTrack = useCallback((sample: string) => {
    const clipId = `c${Date.now()}`;
    let createdClip = false;
    commitTracks((items) => items.map((track) => {
      if (track.id !== selectedId) return track;
      const existingClipSelected = selectedClip && track.clips.some((clip) => clip.id === selectedClip);
      if (existingClipSelected) {
        return {
          ...track,
          sample,
          clips: track.clips.map((clip) => clip.id === selectedClip ? { ...clip, sample, name: sample } : clip),
        };
      }
      const isMidi = track.type === 'midi';
      const clip = makeClip(clipId, Math.max(0, Math.floor(beats)), 4, isMidi ? 'midi' : 'audio', sample, isMidi ? defaultNotes(track.name) : undefined);
      createdClip = true;
      return {
        ...track,
        sample,
        instrument: isMidi ? 'sampler' : track.instrument,
        clips: [...track.clips, clip],
      };
    }), 'Load sample');
    if (createdClip) setSelectedClip(clipId);
    toast(`${sample} assigned`, 'success');
  }, [beats, commitTracks, selectedClip, selectedId, toast]);

  const dropSampleOnTrack = useCallback((trackId: string, sample: string, start: number) => {
    const clipId = `c${Date.now()}`;
    commitTracks((items) => items.map((track) => {
      if (track.id !== trackId || track.type === 'master' || track.type === 'return') return track;
      const isMidi = track.type === 'midi';
      return {
        ...track,
        sample,
        instrument: isMidi ? 'sampler' : track.instrument,
        clips: [...track.clips, makeClip(clipId, Math.max(0, start), 4, isMidi ? 'midi' : 'audio', sample, isMidi ? defaultNotes(track.name) : undefined)],
      };
    }), 'Drop sample');
    setSelectedId(trackId);
    setSelectedClip(clipId);
    toast(`${sample} dropped`, 'success');
  }, [commitTracks, toast]);

  const insertPluginOnSelectedTrack = useCallback((plugin: string) => {
    commitTracks((items) => items.map((track) => track.id === selectedId ? { ...track, effects: Array.from(new Set([...track.effects, plugin])) } : track), 'Insert plugin');
    toast(`${plugin} inserted`, 'success');
  }, [commitTracks, selectedId, toast]);

  const addNoteToSelectedClip = useCallback((pitch: number, start: number) => {
    const targetClip = selectedClip ?? selectedTrack?.clips.find((clip) => clip.kind === 'midi')?.id;
    if (!selectedTrack || selectedTrack.type !== 'midi') {
      toast('Select a MIDI track to add notes', 'warn');
      return;
    }
    if (!targetClip) {
      const clipId = `c${Date.now()}`;
      commitTracks((items) => items.map((track) => track.id === selectedTrack.id ? { ...track, clips: [...track.clips, makeClip(clipId, Math.max(0, Math.floor(beats)), 8, 'midi', undefined, [{ id: `n${Date.now()}`, pitch, s: start, l: 0.5, velocity: 0.78 }])] } : track), 'Add MIDI clip');
      setSelectedClip(clipId);
      return;
    }
    commitTracks((items) => items.map((track) => track.id === selectedTrack.id ? { ...track, clips: track.clips.map((clip) => clip.id === targetClip ? { ...clip, notes: [...(clip.notes ?? []), { id: `n${Date.now()}`, pitch, s: start, l: 0.5, velocity: 0.78 }] } : clip) } : track), 'Add note');
  }, [beats, commitTracks, selectedClip, selectedTrack, toast]);

  const updateNote = useCallback((clipId: string, noteId: string, patch: Partial<Note>) => {
    if (!selectedTrack) return;
    commitTracks((items) => items.map((track) => track.id === selectedTrack.id ? { ...track, clips: track.clips.map((clip) => clip.id === clipId ? { ...clip, notes: (clip.notes ?? []).map((note) => note.id === noteId ? { ...note, ...patch } : note) } : clip) } : track), 'Edit note');
  }, [commitTracks, selectedTrack]);

  const deleteNote = useCallback((clipId: string, noteId: string) => {
    if (!selectedTrack) return;
    commitTracks((items) => items.map((track) => track.id === selectedTrack.id ? { ...track, clips: track.clips.map((clip) => clip.id === clipId ? { ...clip, notes: (clip.notes ?? []).filter((note) => note.id !== noteId) } : clip) } : track), 'Delete note');
  }, [commitTracks, selectedTrack]);

  const renderProject = useCallback(async (sampleRate = 48000) => {
    const offline = new OfflineAudioContext(2, Math.ceil(sampleRate * beatToSeconds(ARRANGEMENT_BEATS)), sampleRate);
    const nodes: AudioScheduledSourceNode[] = [];
    scheduleProject(offline, offline.destination, tracks, 0, nodes);
    const buffer = await offline.startRendering();
    const blob = encodeWav(buffer);
    const filename = `${safeProjectName(projectName)}.wav`;

    if (isTauriRuntime()) {
      const outputPath = await save({
        defaultPath: filename,
        filters: [{ name: 'WAV Audio', extensions: ['wav'] }],
      });
      if (!outputPath) {
        toast('Export cancelled', 'info');
        return;
      }
      await invoke('write_binary_file', { path: outputPath, bytes: await blobToBytes(blob) });
      toast('Rendered WAV export', 'success');
      return;
    }

    downloadBlob(filename, blob);
    toast('Rendered WAV export', 'success');
  }, [projectName, toast, tracks]);

  const writeAutomationPoint = useCallback((trackId: string) => {
    commitTracks((items) => items.map((track) => track.id === trackId ? {
      ...track,
      automation: {
        ...track.automation,
        volume: [...track.automation.volume.filter((point) => Math.abs(point.beat - beats) > 0.05), { id: `a${Date.now()}`, beat: Math.round(beats * 4) / 4, value: track.volume }].sort((a, b) => a.beat - b.beat),
      },
    } : track), 'Write automation');
    toast('Automation point written', 'success');
  }, [beats, commitTracks, toast]);

  const openTrackCtx = useCallback((trackId: string, x: number, y: number) => {
    setContext({ x, y, items: [
      { label: 'Rename Track', fn: () => renameTrack(trackId) },
      { label: 'Duplicate Track', fn: () => duplicateTrack(trackId) },
      '---',
      { label: 'Arm for Recording', kbd: 'R', fn: () => updateTrack(trackId, { armed: !tracks.find((track) => track.id === trackId)?.armed }) },
      { label: 'Mute Track', kbd: 'M', fn: () => updateTrack(trackId, { muted: !tracks.find((track) => track.id === trackId)?.muted }) },
      { label: 'Solo Track', kbd: 'S', fn: () => updateTrack(trackId, { solo: !tracks.find((track) => track.id === trackId)?.solo }) },
      '---',
      { label: 'Delete Track', danger: true, fn: () => deleteTrack(trackId) },
    ] });
  }, [deleteTrack, duplicateTrack, renameTrack, tracks, updateTrack]);

  const openClipCtx = useCallback((trackId: string, clipId: string, x: number, y: number) => {
    setContext({ x, y, items: [
      { label: 'Rename Clip', fn: () => renameClip(trackId, clipId) },
      { label: 'Duplicate Clip', fn: () => duplicateClip(trackId, clipId) },
      { label: 'Split at Playhead', kbd: 'C', fn: () => splitClip(trackId, clipId, beats) },
      '---',
      { label: 'Replace from Browser', fn: () => setBrowserTab('samples') },
      { label: 'Open Piano Roll', fn: () => setView('piano-roll') },
      '---',
      { label: 'Delete Clip', danger: true, fn: () => deleteClip(trackId, clipId) },
    ] });
  }, [beats, deleteClip, duplicateClip, renameClip, splitClip]);

  const execCommand = useCallback((id: string) => {
    if (id === 'play') togglePlayback();
    if (id === 'stop') stopTransport();
    if (id === 'record') toggleRecording();
    if (id === 'loop') setLoop((value) => !value);
    if (id === 'arr') setView('arrangement');
    if (id === 'mix') setView('mixer');
    if (id === 'pr') setView('piano-roll');
    if (id === 'left') setLeftOpen((value) => !value);
    if (id === 'right') setRightOpen((value) => !value);
    if (id === 'bottom') setBottomOpen((value) => !value);
    if (id === 'export') setExportOpen(true);
    if (id === 'save') void saveProject();
    if (id === 'saveas') void saveProjectAs();
    if (id === 'load') void loadProject();
    if (id === 'new') newProject();
    if (id === 'renameproj') renameProject();
    if (id === 'dupeproj') void duplicateProject();
    if (id === 'undo') undo();
    if (id === 'redo') redo();
    if (id === 'dupeclip') duplicateSelectedClip();
    if (id === 'splitclip') splitSelectedClip();
    if (id === 'delclip') deleteSelectedClip();
    if (id === 'zin') setZoom((value) => Math.min(value + 16, 128));
    if (id === 'zout') setZoom((value) => Math.max(value - 16, 16));
    if (id === 'addau') addTrack('audio');
    if (id === 'addmi') addTrack('midi');
  }, [addTrack, deleteSelectedClip, duplicateProject, duplicateSelectedClip, loadProject, newProject, redo, renameProject, saveProject, saveProjectAs, splitSelectedClip, stopTransport, togglePlayback, toggleRecording, undo]);

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) return;
      const mod = event.ctrlKey || event.metaKey;
      if (mod && event.key.toLowerCase() === 'k') { event.preventDefault(); setCmdOpen(true); return; }
      if (mod && event.key.toLowerCase() === 'e') { event.preventDefault(); setExportOpen(true); return; }
      if (mod && event.key.toLowerCase() === 'n') { event.preventDefault(); newProject(); return; }
      if (mod && event.key.toLowerCase() === 'o') { event.preventDefault(); void loadProject(); return; }
      if (mod && event.key.toLowerCase() === 'b') { event.preventDefault(); setLeftOpen((value) => !value); return; }
      if (mod && event.key.toLowerCase() === 'i') { event.preventDefault(); setRightOpen((value) => !value); return; }
      if (mod && event.key.toLowerCase() === 'j') { event.preventDefault(); setBottomOpen((value) => !value); return; }
      if (mod && event.key === '1') { event.preventDefault(); setView('arrangement'); return; }
      if (mod && event.key === '2') { event.preventDefault(); setView('mixer'); return; }
      if (mod && event.key === '3') { event.preventDefault(); setView('piano-roll'); return; }
      if (mod && event.shiftKey && event.key.toLowerCase() === 's') { event.preventDefault(); void saveProjectAs(); return; }
      if (mod && event.key.toLowerCase() === 's') { event.preventDefault(); void saveProject(); return; }
      if (mod && event.shiftKey && event.key.toLowerCase() === 'r') { event.preventDefault(); renameProject(); return; }
      if (mod && event.shiftKey && event.key.toLowerCase() === 'd') { event.preventDefault(); void duplicateProject(); return; }
      if (mod && event.key.toLowerCase() === 'z') { event.preventDefault(); undo(); return; }
      if (mod && event.key.toLowerCase() === 'y') { event.preventDefault(); redo(); return; }
      if (mod && event.key.toLowerCase() === 'd') { event.preventDefault(); if (!duplicateSelectedClip()) toast('Select a clip to duplicate', 'warn'); return; }
      if (mod && (event.key === '=' || event.key === '+')) { event.preventDefault(); setZoom((value) => Math.min(value + 16, 128)); return; }
      if (mod && event.key === '-') { event.preventDefault(); setZoom((value) => Math.max(value - 16, 16)); return; }
      if (event.key === 'Delete' || event.key === 'Backspace') { if (deleteSelectedClip()) event.preventDefault(); return; }
      if (event.key === ' ') { event.preventDefault(); togglePlayback(); return; }
      if (event.key === 'Escape') { event.preventDefault(); setCmdOpen(false); setExportOpen(false); setContext(null); stopTransport(); return; }
      if (event.key.toLowerCase() === 'l') setLoop((value) => !value);
      if (event.key.toLowerCase() === 'r') toggleRecording();
      if (event.key.toLowerCase() === 'v') setTool('pointer');
      if (event.key.toLowerCase() === 'b') setTool('pencil');
      if (event.key.toLowerCase() === 'c') {
        if (view === 'arrangement' && splitSelectedClip()) return;
        setTool('scissors');
      }
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, [deleteSelectedClip, duplicateProject, duplicateSelectedClip, loadProject, newProject, redo, renameProject, saveProject, saveProjectAs, splitSelectedClip, stopTransport, toast, togglePlayback, toggleRecording, undo, view]);

  return (
    <>
      <style>{`
        *{box-sizing:border-box}
        :root{color-scheme:dark}
        body{margin:0;background:${DS.s0};overflow:hidden}
        ::-webkit-scrollbar{width:3px;height:3px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.10);border-radius:1px}
        input::placeholder{color:${DS.t5}!important}
        input[type="range"]{accent-color:rgba(255,255,255,0.52)}
        button:hover{filter:brightness(1.14)}
        @keyframes cmdin{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes toastin{from{opacity:0;transform:translateX(8px)}to{opacity:1;transform:translateX(0)}}
        @keyframes fadeup{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes loadbar{from{width:0}to{width:100%}}
        @keyframes recpulse{0%,100%{opacity:.55}50%{opacity:1}}
      `}</style>
      {startup && <StartupScreen onDone={() => setStartup(false)} />}
      <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: DS.s0, overflow: 'hidden', color: DS.t1, fontFamily: DS.ui }}>
        <TransportBar playing={playing} recording={recording} loop={loop} bpm={BPM} beats={beats} view={view} leftOpen={leftOpen} rightOpen={rightOpen} bottomOpen={bottomOpen} onPlay={togglePlayback} onStop={stopTransport} onRec={toggleRecording} onLoop={() => setLoop((value) => !value)} onView={setView} onLeft={() => setLeftOpen((value) => !value)} onRight={() => setRightOpen((value) => !value)} onBottom={() => setBottomOpen((value) => !value)} onCmd={() => setCmdOpen(true)} onExport={() => setExportOpen(true)} />
        <ToolStrip tool={tool} onTool={setTool} zoom={zoom} onZoom={(delta) => setZoom((value) => Math.max(16, Math.min(128, value + delta * 16)))} />
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <BrowserPanel open={leftOpen} tab={browserTab} onTab={setBrowserTab} onUse={(msg) => toast(msg, 'success')} onSample={loadSampleToSelectedTrack} onPlugin={insertPluginOnSelectedTrack} recentProjects={recentProjects} onOpenProject={(path) => { void loadProject(path); }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              {view === 'arrangement' && <ArrangementView tracks={tracks} selId={selectedId} selClip={selectedClip} tool={tool} zoom={zoom} beats={beats} loop={loop} onSelectTrack={setSelectedId} onSelectClip={setSelectedClip} onMoveClip={moveClip} onResizeClip={resizeClip} onCreateClip={createClip} onDropSample={dropSampleOnTrack} onMute={(id) => updateTrack(id, { muted: !tracks.find((track) => track.id === id)?.muted })} onSolo={(id) => updateTrack(id, { solo: !tracks.find((track) => track.id === id)?.solo })} onArm={(id) => updateTrack(id, { armed: !tracks.find((track) => track.id === id)?.armed })} onTrackCtx={openTrackCtx} onClipCtx={openClipCtx} />}
              {view === 'mixer' && <MixerView tracks={tracks} selectedId={selectedId} meters={meters} playing={playing} onSelect={setSelectedId} onVolume={(id, volume) => updateTrack(id, { volume })} onPan={(id, pan) => updateTrack(id, { pan })} />}
              {view === 'piano-roll' && <PianoRollView track={selectedTrack} selectedClip={selectedClip} onSelectClip={setSelectedClip} onAddNote={addNoteToSelectedClip} onUpdateNote={updateNote} onDeleteNote={deleteNote} />}
            </div>
            {bottomOpen && <BottomPanel tracks={tracks} meters={meters} playing={playing} onClose={() => setBottomOpen(false)} />}
          </div>
          <InspectorPanel open={rightOpen} track={selectedTrack} beats={beats} onVolume={(id, volume) => updateTrack(id, { volume })} onPan={(id, pan) => updateTrack(id, { pan })} onSend={(id, sendA) => updateTrack(id, { sendA })} onAutomationPoint={writeAutomationPoint} />
        </div>
        <StatusBar playing={playing} recording={recording} selectedClip={selectedClip} beats={beats} trackCount={tracks.length} canUndo={undoStack.length > 0} canRedo={redoStack.length > 0} projectName={projectName} dirty={dirty} autoSavedAt={autoSavedAt} />
      </div>
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} onExec={execCommand} />
      <ExportDialog open={exportOpen} projectName={projectName} onClose={() => setExportOpen(false)} onRender={renderProject} />
      <ContextMenu state={context} onClose={() => setContext(null)} />
      <Toasts toasts={toasts} />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppShell />
    </ErrorBoundary>
  );
}

export default App;
