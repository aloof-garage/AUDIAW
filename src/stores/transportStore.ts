import { create } from 'zustand';
import { invoke } from '@tauri-apps/api/core';

/**
 * Transport Store
 * Manages playback state, position, tempo, and time signature
 */

export interface TransportState {
  // Playback state
  isPlaying: boolean;
  isPaused: boolean;
  isRecording: boolean;
  
  // Position (in samples)
  position: number;
  
  // Tempo and time signature
  tempo: number;
  timeSignature: {
    numerator: number;
    denominator: number;
  };
  
  // Loop state
  loopEnabled: boolean;
  loopStart: number;
  loopEnd: number;
  
  // Metronome
  metronomeEnabled: boolean;
  
  // Sample rate (from audio engine)
  sampleRate: number;
  
  // Actions
  play: () => void;
  pause: () => void;
  stop: () => void;
  togglePlayPause: () => void;
  startRecording: () => void;
  stopRecording: () => void;
  
  setPosition: (position: number) => void;
  syncPosition: (position: number) => void;
  setTempo: (tempo: number) => void;
  setTimeSignature: (numerator: number, denominator: number) => void;
  
  toggleLoop: () => void;
  setLoopRegion: (start: number, end: number) => void;
  
  toggleMetronome: () => void;
  
  // Utility functions
  getPositionInBars: () => { bars: number; beats: number; ticks: number };
  samplesToSeconds: (samples: number) => number;
  secondsToSamples: (seconds: number) => number;
}

const isTauriRuntime = () => '__TAURI_INTERNALS__' in window;

const invokeTransport = (command: string, payload?: Record<string, unknown>) => {
  if (!isTauriRuntime()) return;

  void invoke(command, payload).catch((error) => {
    console.error(`Transport command failed: ${command}`, error);
  });
};

export const useTransportStore = create<TransportState>((set, get) => ({
  // Initial state
  isPlaying: false,
  isPaused: false,
  isRecording: false,
  position: 0,
  tempo: 120,
  timeSignature: {
    numerator: 4,
    denominator: 4,
  },
  loopEnabled: false,
  loopStart: 0,
  loopEnd: 0,
  metronomeEnabled: false,
  sampleRate: 48000,
  
  // Actions
  play: () => {
    set({ isPlaying: true, isPaused: false });
    invokeTransport('play');
  },
  
  pause: () => {
    set({ isPlaying: false, isPaused: true });
    invokeTransport('pause');
  },
  
  stop: () => {
    set({
      isPlaying: false,
      isPaused: false,
      position: 0,
      isRecording: false,
    });
    invokeTransport('stop');
  },
  
  togglePlayPause: () => {
    const { isPlaying } = get();
    if (isPlaying) {
      set({ isPlaying: false, isPaused: true });
      invokeTransport('pause');
    } else {
      set({ isPlaying: true, isPaused: false });
      invokeTransport('play');
    }
  },
  
  startRecording: () => set({
    isRecording: true,
    isPlaying: true,
    isPaused: false
  }),
  
  stopRecording: () => set({ isRecording: false }),
  
  setPosition: (position: number) => {
    set({ position });
    invokeTransport('seek', { position });
  },

  syncPosition: (position: number) => set({ position }),
  
  setTempo: (tempo: number) => {
    if (tempo >= 20 && tempo <= 999) {
      set({ tempo });
    }
  },
  
  setTimeSignature: (numerator: number, denominator: number) => {
    set({ timeSignature: { numerator, denominator } });
  },
  
  toggleLoop: () => set((state) => ({ loopEnabled: !state.loopEnabled })),
  
  setLoopRegion: (start: number, end: number) => {
    if (start < end) {
      set({ loopStart: start, loopEnd: end });
    }
  },
  
  toggleMetronome: () => set((state) => ({ 
    metronomeEnabled: !state.metronomeEnabled 
  })),
  
  // Utility functions
  getPositionInBars: () => {
    const { position, tempo, timeSignature, sampleRate } = get();
    
    // Calculate beats per second
    const beatsPerSecond = tempo / 60;
    
    // Convert position to seconds
    const seconds = position / sampleRate;
    
    // Calculate total beats
    const totalBeats = seconds * beatsPerSecond;
    
    // Calculate bars, beats, and ticks
    const beatsPerBar = timeSignature.numerator;
    const bars = Math.floor(totalBeats / beatsPerBar);
    const beats = Math.floor(totalBeats % beatsPerBar);
    const ticks = Math.floor((totalBeats % 1) * 960); // 960 ticks per beat
    
    return { bars, beats, ticks };
  },
  
  samplesToSeconds: (samples: number) => {
    const { sampleRate } = get();
    return samples / sampleRate;
  },
  
  secondsToSamples: (seconds: number) => {
    const { sampleRate } = get();
    return Math.floor(seconds * sampleRate);
  },
}));
