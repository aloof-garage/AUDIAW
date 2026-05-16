import React, { useState, useCallback } from 'react';
import { useTransportStore } from '../../stores/transportStore';
import { useProjectStore } from '../../stores/projectStore';
import { useUIStore } from '../../stores/uiStore';
import { useDawStore } from '../../stores/dawStore';
import { Button } from '../UI/Button';

/**
 * TransportBar Component
 * Main transport controls for playback, recording, and tempo
 */

export const TransportBar: React.FC = () => {
  const {
    isPlaying,
    loopEnabled,
    metronomeEnabled,
    tempo,
    timeSignature,
    position,
    togglePlayPause,
    stop,
    toggleLoop,
    toggleMetronome,
    setTempo,
    getPositionInBars,
  } = useTransportStore();
  
  const {
    isRecording,
    tracks,
    startRecording: startProjectRecording,
    stopRecording: stopProjectRecording,
  } = useProjectStore();
  const { gridEnabled, snapEnabled, toggleGrid, toggleSnap } = useUIStore();
  const { preferences } = useDawStore();

  const [isEditingTempo, setIsEditingTempo] = useState(false);
  const [tempoInput, setTempoInput] = useState(tempo.toString());

  const handleTempoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTempoInput(e.target.value);
  }, []);

  const handleTempoBlur = useCallback(() => {
    const newTempo = parseInt(tempoInput, 10);
    if (!isNaN(newTempo) && newTempo >= 20 && newTempo <= 999) {
      setTempo(newTempo);
    } else {
      setTempoInput(tempo.toString());
    }
    setIsEditingTempo(false);
  }, [tempoInput, tempo, setTempo]);

  const handleTempoKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTempoBlur();
    } else if (e.key === 'Escape') {
      setTempoInput(tempo.toString());
      setIsEditingTempo(false);
    }
  }, [handleTempoBlur, tempo]);

  const handleRecordClick = useCallback(() => {
    if (isRecording) {
      stopProjectRecording();
    } else {
      // Find first armed track
      const armedTrack = tracks.find(t => t.armed);
      if (armedTrack) {
        startProjectRecording(armedTrack.id);
      } else {
        alert('Please arm a track for recording first');
      }
    }
  }, [isRecording, stopProjectRecording, startProjectRecording, tracks]);

  const { bars, beats, ticks } = getPositionInBars();
  const positionDisplay = `${bars + 1}.${beats + 1}.${ticks.toString().padStart(3, '0')}`;

  return (
    <div className="h-[52px] flex items-center justify-between px-4 bg-surface-2 border-b border-DEFAULT">
      {/* Left: Transport Controls */}
      <div className="flex items-center gap-2">
        {/* Play/Pause */}
        <Button
          variant="primary"
          size="md"
          onClick={togglePlayPause}
          active={isPlaying}
          title="Play/Pause (Space)"
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </Button>

        {/* Stop */}
        <Button
          variant="secondary"
          size="md"
          onClick={stop}
          disabled={!isPlaying && position === 0}
          title="Stop"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="6" width="12" height="12" rx="1" />
          </svg>
        </Button>

        {/* Record */}
        <Button
          variant={isRecording ? 'danger' : 'secondary'}
          size="md"
          onClick={handleRecordClick}
          active={isRecording}
          title="Record (R)"
          className={isRecording ? 'pulse' : ''}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="6" />
          </svg>
        </Button>

        <div className="w-px h-8 bg-border-DEFAULT mx-2" />

        {/* Loop */}
        <Button
          variant="icon"
          size="md"
          onClick={toggleLoop}
          active={loopEnabled}
          title="Toggle Loop (L)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M17 2l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" />
          </svg>
        </Button>

        {/* Metronome */}
        <Button
          variant="icon"
          size="md"
          onClick={toggleMetronome}
          active={metronomeEnabled}
          title="Toggle Metronome (M)"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L4 20h16L12 2zm0 4l5 12H7l5-12z" />
          </svg>
        </Button>

        <Button
          variant="icon"
          size="md"
          onClick={toggleGrid}
          active={gridEnabled}
          title="Toggle Grid"
        >
          #
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={toggleSnap}
          active={snapEnabled}
          title="Toggle Snap"
        >
          {snapEnabled ? preferences.snapValue : 'Off'}
        </Button>
      </div>

      {/* Center: Position Display */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <div className="text-xs text-secondary mb-1">Position</div>
          <div className="font-mono text-lg text-primary bg-surface-1 px-4 py-1 rounded border border-DEFAULT">
            {positionDisplay}
          </div>
        </div>

        <div className="w-px h-12 bg-border-DEFAULT" />

        {/* Tempo */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-secondary mb-1">Tempo</div>
          {isEditingTempo ? (
            <input
              type="number"
              value={tempoInput}
              onChange={handleTempoChange}
              onBlur={handleTempoBlur}
              onKeyDown={handleTempoKeyDown}
              className="font-mono text-lg text-primary bg-surface-1 px-4 py-1 rounded border border-accent w-24 text-center focus:outline-none focus:ring-2 focus:ring-accent"
              autoFocus
              min="20"
              max="999"
            />
          ) : (
            <button
              onClick={() => setIsEditingTempo(true)}
              className="font-mono text-lg text-primary bg-surface-1 px-4 py-1 rounded border border-DEFAULT hover:border-accent/50 transition-colors duration-standard"
            >
              {tempo} <span className="text-secondary text-sm">BPM</span>
            </button>
          )}
        </div>

        {/* Time Signature */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-secondary mb-1">Time Sig</div>
          <div className="font-mono text-lg text-primary bg-surface-1 px-4 py-1 rounded border border-DEFAULT">
            {timeSignature.numerator}/{timeSignature.denominator}
          </div>
        </div>
      </div>

      {/* Right: System Info */}
      <div className="flex items-center gap-4 text-xs text-secondary">
        <div className="flex items-center gap-2">
          <span>CPU:</span>
          <div className="w-16 h-2 bg-surface-1 rounded-full overflow-hidden">
            <div className="h-full bg-accent" style={{ width: '35%' }} />
          </div>
          <span>35%</span>
        </div>
        <div className="flex items-center gap-2">
          <span>48kHz</span>
          <span>•</span>
          <span>512</span>
        </div>
      </div>
    </div>
  );
};

// Made with Bob
