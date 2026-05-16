import React from 'react';
import { Track } from '../../stores/projectStore';
import { AudioClip } from './AudioClip';

/**
 * TrackLane Component
 * Individual track lane in the arrangement view
 */

export interface TrackLaneProps {
  track: Track;
  pixelsPerBeat: number;
  yOffset: number;
}

export const TrackLane: React.FC<TrackLaneProps> = React.memo(({
  track,
  pixelsPerBeat,
  yOffset,
}) => {
  return (
    <div
      className="absolute left-0 right-0 border-b border-DEFAULT bg-surface-2 hover:bg-surface-3 transition-colors duration-standard"
      style={{
        top: `${yOffset}px`,
        height: `${track.height}px`,
      }}
    >
      {/* Track lane content */}
      <div className="relative h-full">
        {/* Clips */}
        {track.clips.map((clip) => (
          <AudioClip
            key={clip.id}
            clip={clip}
            pixelsPerBeat={pixelsPerBeat}
            trackHeight={track.height}
          />
        ))}

        {/* Empty state hint */}
        {track.clips.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xs text-tertiary opacity-50">
              Drop audio files here or record
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

TrackLane.displayName = 'TrackLane';
