import React, { useEffect } from 'react';
import { useProjectStore } from '../../stores/projectStore';
import { useUIStore } from '../../stores/uiStore';
import { Button } from '../UI/Button';

/**
 * Toolbar Component
 * Displays undo/redo buttons and other global actions
 */
interface ToolbarProps {
  onExport: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onExport }) => {
  const {
    canUndo,
    canRedo,
    undoDescription,
    redoDescription,
    undo,
    redo,
    updateUndoRedoState,
  } = useProjectStore();
  const {
    activeView,
    workspacePreset,
    showBrowser,
    showInspector,
    showMixer,
    setActiveView,
    setWorkspacePreset,
    toggleBrowser,
    toggleInspector,
    toggleMixer,
  } = useUIStore();

  // Update undo/redo state periodically
  useEffect(() => {
    // Initial update
    updateUndoRedoState();

    // Poll every 500ms
    const interval = setInterval(() => {
      updateUndoRedoState();
    }, 500);

    return () => clearInterval(interval);
  }, [updateUndoRedoState]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Z or Cmd+Z for undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (canUndo) {
          undo();
        }
      }
      // Ctrl+Y or Cmd+Shift+Z for redo
      else if (
        ((e.ctrlKey || e.metaKey) && e.key === 'y') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z')
      ) {
        e.preventDefault();
        if (canRedo) {
          redo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo, undo, redo]);

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2 bg-surface-1 border-b border-DEFAULT">
      <div className="flex items-center gap-1 min-w-0">
      <Button
        variant="icon"
        onClick={undo}
        disabled={!canUndo}
        title={undoDescription ? `Undo: ${undoDescription} (Ctrl+Z)` : 'Undo (Ctrl+Z)'}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
          />
        </svg>
      </Button>

      <Button
        variant="icon"
        onClick={redo}
        disabled={!canRedo}
        title={redoDescription ? `Redo: ${redoDescription} (Ctrl+Y)` : 'Redo (Ctrl+Y)'}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6"
          />
        </svg>
      </Button>

      {(undoDescription || redoDescription) && (
        <div className="ml-3 text-xs text-tertiary">
          {canUndo && undoDescription && (
            <span>Can undo: {undoDescription}</span>
          )}
          {canRedo && redoDescription && !canUndo && (
            <span>Can redo: {redoDescription}</span>
          )}
        </div>
      )}
      </div>

      <div className="flex items-center gap-1 min-w-0">
        {(['arrange', 'perform', 'edit', 'mix'] as const).map((preset) => (
          <Button
            key={preset}
            variant="ghost"
            size="sm"
            onClick={() => setWorkspacePreset(preset)}
            active={workspacePreset === preset}
            title={`${preset} workspace`}
          >
            {preset}
          </Button>
        ))}
        <div className="w-px h-6 bg-border-DEFAULT mx-2" />
        {([
          ['arrangement', 'Arrange'],
          ['session', 'Session'],
          ['piano-roll', 'Piano'],
          ['channel-rack', 'Rack'],
          ['devices', 'Devices'],
          ['automation', 'Auto'],
          ['routing', 'Route'],
          ['settings', 'Prefs'],
        ] as const).map(([view, label]) => (
          <Button
            key={view}
            variant="secondary"
            size="sm"
            onClick={() => setActiveView(view)}
            active={activeView === view}
            title={label}
          >
            {label}
          </Button>
        ))}
        <div className="w-px h-6 bg-border-DEFAULT mx-2" />
        <Button variant="secondary" size="sm" onClick={toggleBrowser} active={showBrowser} title="Browser (B)">
          Browser
        </Button>
        <Button variant="secondary" size="sm" onClick={toggleMixer} active={showMixer} title="Mixer (M)">
          Mixer
        </Button>
        <Button variant="secondary" size="sm" onClick={toggleInspector} active={showInspector} title="Inspector (I)">
          Inspector
        </Button>
        <div className="w-px h-6 bg-border-DEFAULT mx-2" />
        <Button variant="primary" size="sm" onClick={onExport} title="Export Audio (Ctrl+E)">
          Export
        </Button>
      </div>
    </div>
  );
};
