import React, { useCallback } from 'react';
import { Track } from '../../stores/projectStore';
import { Button } from '../UI/Button';
import { Knob } from '../UI/Knob';
import { Fader } from '../UI/Fader';
import { theme } from '../../styles/theme';

/**
 * TrackControls Component
 * Individual track control strip with mute, solo, volume, pan, etc.
 */

export interface TrackControlsProps {
  track: Track;
  onMuteToggle: () => void;
  onSoloToggle: () => void;
  onArmToggle: () => void;
  onVolumeChange: (volume: number) => void;
  onPanChange: (pan: number) => void;
  onNameChange: (name: string) => void;
  onSelect: () => void;
  onImportAudio?: () => void;
  isSelected: boolean;
}

export const TrackControls: React.FC<TrackControlsProps> = ({
  track,
  onMuteToggle,
  onSoloToggle,
  onArmToggle,
  onVolumeChange,
  onPanChange,
  onNameChange,
  onSelect,
  onImportAudio,
  isSelected,
}) => {
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [nameInput, setNameInput] = React.useState(track.name);

  const handleNameClick = useCallback(() => {
    setIsEditingName(true);
  }, []);

  const handleNameBlur = useCallback(() => {
    if (nameInput.trim()) {
      onNameChange(nameInput.trim());
    } else {
      setNameInput(track.name);
    }
    setIsEditingName(false);
  }, [nameInput, onNameChange, track.name]);

  const handleNameKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameBlur();
    } else if (e.key === 'Escape') {
      setNameInput(track.name);
      setIsEditingName(false);
    }
  }, [handleNameBlur, track.name]);

  // Memoize event handlers to prevent unnecessary re-renders
  const handleMuteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onMuteToggle();
  }, [onMuteToggle]);

  const handleSoloClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSoloToggle();
  }, [onSoloToggle]);

  const handleArmClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onArmToggle();
  }, [onArmToggle]);

  const handleImportClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onImportAudio) {
      onImportAudio();
    }
  }, [onImportAudio]);

  return (
    <div
      className={`
        flex flex-col p-3 bg-surface-2 border-b border-DEFAULT
        transition-all duration-standard
        ${isSelected ? 'bg-surface-3 border-l-2 border-l-accent' : 'border-l-2 border-l-transparent'}
      `}
      style={{
        height: `${track.height}px`,
        borderLeftColor: isSelected ? theme.colors.accent.primary : 'transparent',
      }}
      onClick={onSelect}
    >
      {/* Track name and color */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-3 h-3 rounded-sm flex-shrink-0"
          style={{ backgroundColor: track.color }}
        />
        {isEditingName ? (
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onBlur={handleNameBlur}
            onKeyDown={handleNameKeyDown}
            className="flex-1 px-2 py-1 text-sm bg-surface-1 border border-accent rounded focus:outline-none focus:ring-2 focus:ring-accent"
            autoFocus
          />
        ) : (
          <button
            onClick={handleNameClick}
            className="flex-1 text-left text-sm font-medium text-primary hover:text-accent transition-colors duration-standard truncate"
          >
            {track.name}
          </button>
        )}
      </div>

      {/* Control buttons */}
      <div className="flex items-center gap-1 mb-2">
        <Button
          variant="icon"
          size="sm"
          onClick={handleMuteClick}
          active={track.muted}
          title="Mute (M)"
          className="flex-1"
        >
          M
        </Button>
        <Button
          variant="icon"
          size="sm"
          onClick={handleSoloClick}
          active={track.solo}
          title="Solo (S)"
          className="flex-1"
        >
          S
        </Button>
        <Button
          variant="icon"
          size="sm"
          onClick={handleArmClick}
          active={track.armed}
          title="Arm for Recording (R)"
          className="flex-1"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="6" />
          </svg>
        </Button>
      </div>

      {/* Import Audio button (for audio tracks) */}
      {track.type === 'audio' && onImportAudio && track.height >= 96 && (
        <Button
          variant="secondary"
          size="sm"
          onClick={handleImportClick}
          title="Import Audio File"
          className="w-full mb-2"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Import
        </Button>
      )}

      {/* Volume and Pan (if space allows) */}
      {track.height >= 96 && (
        <div className="flex items-center gap-2 mt-auto">
          <div className="flex-1">
            <Knob
              value={track.pan}
              onChange={onPanChange}
              label="Pan"
              size={32}
              showValue={false}
              bipolar={true}
            />
          </div>
          <div className="flex-1 flex justify-center">
            <Fader
              value={track.volume}
              onChange={onVolumeChange}
              height={40}
              showValue={false}
              showScale={false}
            />
          </div>
        </div>
      )}

      {/* Track type indicator */}
      {track.height >= 80 && (
        <div className="mt-auto pt-2 text-xs text-tertiary uppercase">
          {track.type}
        </div>
      )}
    </div>
  );
};

// Made with Bob
