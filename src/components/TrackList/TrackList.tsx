import React from 'react';
import { useProjectStore } from '../../stores/projectStore';
import { TrackControls } from './TrackControls';
import { Button } from '../UI/Button';
import { theme } from '../../styles/theme';

/**
 * TrackList Component
 * Sidebar with all track controls
 */

export const TrackList: React.FC = () => {
  const {
    tracks,
    selectedTrackIds,
    addTrack,
    setTrackMute,
    setTrackSolo,
    setTrackArmed,
    setTrackVolume,
    setTrackPan,
    updateTrack,
    selectTrack,
    importAudioFile,
  } = useProjectStore();

  const handleAddTrack = (type: 'audio' | 'midi' | 'return') => {
    const label = type === 'midi' ? 'MIDI' : type === 'return' ? 'Return' : 'Audio';
    addTrack(`${label} ${tracks.length + 1}`, type);
  };

  return (
    <div
      className="flex flex-col bg-surface-2 border-r border-DEFAULT overflow-y-auto"
      style={{ width: `${theme.spacing.trackHeaderWidth}px` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-DEFAULT bg-surface-1 sticky top-0 z-10">
        <h2 className="text-sm font-semibold text-primary uppercase">
          Tracks
        </h2>
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleAddTrack('audio')}
          title="Add Audio Track"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-1 p-2 border-b border-DEFAULT bg-surface-1">
        <Button variant="ghost" size="sm" onClick={() => handleAddTrack('audio')} title="Audio Track">Audio</Button>
        <Button variant="ghost" size="sm" onClick={() => handleAddTrack('midi')} title="MIDI Track">MIDI</Button>
        <Button variant="ghost" size="sm" onClick={() => handleAddTrack('return')} title="Return Track">Return</Button>
      </div>

      {/* Track list */}
      <div className="flex-1">
        {tracks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <svg className="w-12 h-12 text-tertiary mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
            </svg>
            <p className="text-sm text-tertiary mb-3">
              No tracks yet
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleAddTrack('audio')}
            >
              Add Your First Track
            </Button>
          </div>
        ) : (
          tracks.map((track) => (
            <TrackControls
              key={track.id}
              track={track}
              isSelected={selectedTrackIds.includes(track.id)}
              onSelect={() => selectTrack(track.id)}
              onMuteToggle={() => setTrackMute(track.id, !track.muted)}
              onSoloToggle={() => setTrackSolo(track.id, !track.solo)}
              onArmToggle={() => setTrackArmed(track.id, !track.armed)}
              onVolumeChange={(volume) => setTrackVolume(track.id, volume)}
              onPanChange={(pan) => setTrackPan(track.id, pan)}
              onNameChange={(name) => updateTrack(track.id, { name })}
              onImportAudio={() => importAudioFile(track.id)}
            />
          ))
        )}
      </div>

      {/* Footer with track count */}
      <div className="p-2 border-t border-DEFAULT bg-surface-1 text-xs text-tertiary text-center">
        {tracks.length} {tracks.length === 1 ? 'track' : 'tracks'}
      </div>
    </div>
  );
};
