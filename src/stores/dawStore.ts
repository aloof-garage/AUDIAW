import { create } from 'zustand';

export type ClipLaunchState = 'empty' | 'loaded' | 'queued' | 'playing';
export type DeviceKind = 'instrument' | 'audio-effect' | 'midi-effect';
export type AutomationMode = 'read' | 'write' | 'touch' | 'off';

export interface SessionClip {
  id: string;
  trackId: string;
  sceneId: string;
  name: string;
  color: string;
  state: ClipLaunchState;
  quantize: '1 bar' | '1/2' | '1/4' | 'None';
}

export interface Scene {
  id: string;
  name: string;
  tempo?: number;
}

export interface MidiNote {
  id: string;
  pitch: number;
  start: number;
  length: number;
  velocity: number;
}

export interface PatternStep {
  id: string;
  instrument: string;
  steps: boolean[];
  accentSteps: boolean[];
}

export interface AutomationLane {
  id: string;
  trackId: string;
  target: string;
  mode: AutomationMode;
  points: Array<{ beat: number; value: number }>;
}

export interface DeviceSlot {
  id: string;
  trackId: string;
  name: string;
  kind: DeviceKind;
  enabled: boolean;
  parameters: Array<{ name: string; value: number; unit: string }>;
}

export interface RoutingNode {
  id: string;
  name: string;
  type: 'track' | 'return' | 'master' | 'sidechain';
  sends: Array<{ targetId: string; level: number; preFader: boolean }>;
}

export interface SampleAsset {
  id: string;
  name: string;
  type: 'loop' | 'one-shot' | 'instrument' | 'preset';
  bpm?: number;
  key?: string;
  length: string;
  tags: string[];
}

export interface Preferences {
  latencyMode: 'Eco' | 'Balanced' | 'Low Latency';
  defaultWarp: boolean;
  snapValue: '1/4' | '1/8' | '1/16' | '1/32';
  launchQuantization: '1 bar' | '1/2' | '1/4' | 'None';
  autoSave: boolean;
}

export interface DawState {
  scenes: Scene[];
  sessionClips: SessionClip[];
  midiNotes: MidiNote[];
  patternRows: PatternStep[];
  automationLanes: AutomationLane[];
  devices: DeviceSlot[];
  routing: RoutingNode[];
  samples: SampleAsset[];
  preferences: Preferences;
  selectedDeviceId: string | null;
  selectedAutomationLaneId: string | null;
  toggleSessionClip: (clipId: string) => void;
  togglePatternStep: (rowId: string, stepIndex: number) => void;
  updatePreference: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void;
  selectDevice: (deviceId: string) => void;
  setAutomationMode: (laneId: string, mode: AutomationMode) => void;
}

const makeSteps = (active: number[]): boolean[] =>
  Array.from({ length: 16 }, (_, index) => active.includes(index));

export const useDawStore = create<DawState>((set) => ({
  scenes: [
    { id: 'scene-1', name: 'Intro', tempo: 120 },
    { id: 'scene-2', name: 'Verse' },
    { id: 'scene-3', name: 'Drop' },
    { id: 'scene-4', name: 'Break' },
  ],
  sessionClips: [
    { id: 'clip-a1', trackId: 'track-1', sceneId: 'scene-1', name: 'Air Chords', color: '#8b5cf6', state: 'loaded', quantize: '1 bar' },
    { id: 'clip-a2', trackId: 'track-1', sceneId: 'scene-2', name: 'Filtered Pad', color: '#8b5cf6', state: 'queued', quantize: '1 bar' },
    { id: 'clip-b1', trackId: 'track-2', sceneId: 'scene-1', name: 'Tight Drums', color: '#22C55E', state: 'playing', quantize: '1 bar' },
    { id: 'clip-b3', trackId: 'track-2', sceneId: 'scene-3', name: 'Drop Beat', color: '#22C55E', state: 'loaded', quantize: '1 bar' },
    { id: 'clip-c2', trackId: 'track-3', sceneId: 'scene-2', name: 'Sub Pulse', color: '#F59E0B', state: 'loaded', quantize: '1 bar' },
  ],
  midiNotes: [
    { id: 'n1', pitch: 60, start: 0, length: 1, velocity: 0.82 },
    { id: 'n2', pitch: 64, start: 1, length: 1, velocity: 0.76 },
    { id: 'n3', pitch: 67, start: 2, length: 2, velocity: 0.9 },
    { id: 'n4', pitch: 72, start: 4, length: 0.5, velocity: 0.68 },
    { id: 'n5', pitch: 71, start: 4.5, length: 0.5, velocity: 0.64 },
    { id: 'n6', pitch: 67, start: 5, length: 1, velocity: 0.72 },
  ],
  patternRows: [
    { id: 'kick', instrument: 'Kick', steps: makeSteps([0, 4, 8, 12]), accentSteps: makeSteps([0, 8]) },
    { id: 'snare', instrument: 'Snare', steps: makeSteps([4, 12]), accentSteps: makeSteps([12]) },
    { id: 'hat', instrument: 'Hat', steps: makeSteps([2, 4, 6, 10, 12, 14]), accentSteps: makeSteps([6, 14]) },
    { id: 'perc', instrument: 'Perc', steps: makeSteps([3, 7, 11, 15]), accentSteps: makeSteps([15]) },
  ],
  automationLanes: [
    { id: 'auto-1', trackId: 'track-1', target: 'Filter Cutoff', mode: 'read', points: [{ beat: 0, value: 0.2 }, { beat: 2, value: 0.72 }, { beat: 4, value: 0.44 }, { beat: 8, value: 0.86 }] },
    { id: 'auto-2', trackId: 'track-2', target: 'Send A', mode: 'touch', points: [{ beat: 0, value: 0.1 }, { beat: 4, value: 0.35 }, { beat: 8, value: 0.2 }] },
    { id: 'auto-3', trackId: 'track-3', target: 'Volume', mode: 'read', points: [{ beat: 0, value: 0.82 }, { beat: 8, value: 0.74 }, { beat: 12, value: 0.9 }] },
  ],
  devices: [
    { id: 'dev-1', trackId: 'track-1', name: 'Drift Synth', kind: 'instrument', enabled: true, parameters: [{ name: 'Cutoff', value: 0.64, unit: '%' }, { name: 'Resonance', value: 0.22, unit: '%' }, { name: 'Drive', value: 0.18, unit: 'dB' }] },
    { id: 'dev-2', trackId: 'track-1', name: 'Parametric EQ', kind: 'audio-effect', enabled: true, parameters: [{ name: 'Low', value: 0.42, unit: 'dB' }, { name: 'Mid', value: 0.58, unit: 'dB' }, { name: 'High', value: 0.51, unit: 'dB' }] },
    { id: 'dev-3', trackId: 'track-2', name: 'Drum Rack', kind: 'instrument', enabled: true, parameters: [{ name: 'Swing', value: 0.16, unit: '%' }, { name: 'Humanize', value: 0.24, unit: '%' }] },
    { id: 'dev-4', trackId: 'return-a', name: 'Space Reverb', kind: 'audio-effect', enabled: true, parameters: [{ name: 'Decay', value: 0.62, unit: 's' }, { name: 'Wet', value: 0.35, unit: '%' }] },
  ],
  routing: [
    { id: 'track-1', name: 'Audio 1', type: 'track', sends: [{ targetId: 'return-a', level: 0.22, preFader: false }] },
    { id: 'track-2', name: 'Audio 2', type: 'track', sends: [{ targetId: 'return-a', level: 0.18, preFader: false }] },
    { id: 'track-3', name: 'Reference', type: 'track', sends: [] },
    { id: 'return-a', name: 'Return A', type: 'return', sends: [{ targetId: 'master', level: 1, preFader: false }] },
    { id: 'master', name: 'Master', type: 'master', sends: [] },
  ],
  samples: [
    { id: 's1', name: 'Warehouse Kick 01', type: 'one-shot', key: 'C', length: '0.8s', tags: ['drums', 'kick', 'punch'] },
    { id: 's2', name: 'Glass Pad Loop', type: 'loop', bpm: 120, key: 'Am', length: '4 bars', tags: ['pad', 'ambient'] },
    { id: 's3', name: 'Sub Bass Pulse', type: 'loop', bpm: 120, key: 'F', length: '2 bars', tags: ['bass', 'mono'] },
    { id: 's4', name: 'Drift Lead Preset', type: 'preset', key: 'Any', length: '-', tags: ['synth', 'lead'] },
  ],
  preferences: {
    latencyMode: 'Balanced',
    defaultWarp: true,
    snapValue: '1/16',
    launchQuantization: '1 bar',
    autoSave: true,
  },
  selectedDeviceId: 'dev-1',
  selectedAutomationLaneId: 'auto-1',
  toggleSessionClip: (clipId) => set((state) => ({
    sessionClips: state.sessionClips.map((clip) => {
      if (clip.id !== clipId) return clip;
      const nextState: ClipLaunchState = clip.state === 'playing' ? 'loaded' : clip.state === 'queued' ? 'playing' : 'queued';
      return { ...clip, state: nextState };
    }),
  })),
  togglePatternStep: (rowId, stepIndex) => set((state) => ({
    patternRows: state.patternRows.map((row) => {
      if (row.id !== rowId) return row;
      return {
        ...row,
        steps: row.steps.map((enabled, index) => index === stepIndex ? !enabled : enabled),
      };
    }),
  })),
  updatePreference: (key, value) => set((state) => ({
    preferences: { ...state.preferences, [key]: value },
  })),
  selectDevice: (deviceId) => set({ selectedDeviceId: deviceId }),
  setAutomationMode: (laneId, mode) => set((state) => ({
    selectedAutomationLaneId: laneId,
    automationLanes: state.automationLanes.map((lane) => lane.id === laneId ? { ...lane, mode } : lane),
  })),
}));
