import { create } from 'zustand';

/**
 * UI Store
 * Manages UI state, panel visibility, and view settings
 */

export type ViewMode = 'arrangement' | 'session' | 'piano-roll' | 'channel-rack' | 'devices' | 'automation' | 'routing' | 'settings';
export type WorkspacePreset = 'arrange' | 'mix' | 'perform' | 'edit';

export interface UIState {
  // Active view
  activeView: ViewMode;
  workspacePreset: WorkspacePreset;
  
  // Panel visibility
  showMixer: boolean;
  showBrowser: boolean;
  showInspector: boolean;
  
  // Zoom levels
  horizontalZoom: number; // 1.0 = 100%
  verticalZoom: number;   // 1.0 = 100%
  
  // Scroll position
  scrollX: number;
  scrollY: number;
  
  // Grid settings
  gridEnabled: boolean;
  snapEnabled: boolean;
  
  // Theme
  theme: 'dark' | 'light';
  
  // Actions
  setActiveView: (view: ViewMode) => void;
  setWorkspacePreset: (preset: WorkspacePreset) => void;
  toggleMixer: () => void;
  toggleBrowser: () => void;
  toggleInspector: () => void;
  
  setHorizontalZoom: (zoom: number) => void;
  setVerticalZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  
  setScrollPosition: (x: number, y: number) => void;
  
  toggleGrid: () => void;
  toggleSnap: () => void;
  
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  // Initial state
  activeView: 'arrangement',
  workspacePreset: 'arrange',
  showMixer: false,
  showBrowser: false,
  showInspector: false,
  horizontalZoom: 1.0,
  verticalZoom: 1.0,
  scrollX: 0,
  scrollY: 0,
  gridEnabled: true,
  snapEnabled: true,
  theme: 'dark',
  
  // Actions
  setActiveView: (view) => set({ activeView: view }),

  setWorkspacePreset: (preset) => {
    const layouts: Record<WorkspacePreset, Partial<UIState>> = {
      arrange: {
        activeView: 'arrangement',
        showBrowser: true,
        showMixer: false,
        showInspector: true,
      },
      mix: {
        activeView: 'devices',
        showBrowser: false,
        showMixer: true,
        showInspector: true,
      },
      perform: {
        activeView: 'session',
        showBrowser: false,
        showMixer: true,
        showInspector: false,
      },
      edit: {
        activeView: 'piano-roll',
        showBrowser: true,
        showMixer: false,
        showInspector: true,
      },
    };

    set({ workspacePreset: preset, ...layouts[preset] });
  },
  
  toggleMixer: () => set((state) => ({ showMixer: !state.showMixer })),
  
  toggleBrowser: () => set((state) => ({ showBrowser: !state.showBrowser })),
  
  toggleInspector: () => set((state) => ({ 
    showInspector: !state.showInspector 
  })),
  
  setHorizontalZoom: (zoom) => {
    const clampedZoom = Math.max(0.1, Math.min(10, zoom));
    set({ horizontalZoom: clampedZoom });
  },
  
  setVerticalZoom: (zoom) => {
    const clampedZoom = Math.max(0.5, Math.min(2, zoom));
    set({ verticalZoom: clampedZoom });
  },
  
  zoomIn: () => {
    const { horizontalZoom } = get();
    const newZoom = Math.min(10, horizontalZoom * 1.2);
    set({ horizontalZoom: newZoom });
  },
  
  zoomOut: () => {
    const { horizontalZoom } = get();
    const newZoom = Math.max(0.1, horizontalZoom / 1.2);
    set({ horizontalZoom: newZoom });
  },
  
  resetZoom: () => set({ horizontalZoom: 1.0, verticalZoom: 1.0 }),
  
  setScrollPosition: (x, y) => set({ scrollX: x, scrollY: y }),
  
  toggleGrid: () => set((state) => ({ gridEnabled: !state.gridEnabled })),
  
  toggleSnap: () => set((state) => ({ snapEnabled: !state.snapEnabled })),
  
  setTheme: (theme) => set({ theme }),
}));

// Made with Bob
