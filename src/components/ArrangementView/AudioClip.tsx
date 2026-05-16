import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Clip, useProjectStore } from '../../stores/projectStore';
import { useTransportStore } from '../../stores/transportStore';

/**
 * AudioClip Component
 * Visual representation of audio clips with waveform preview
 */

export interface AudioClipProps {
  clip: Clip;
  pixelsPerBeat: number;
  trackHeight: number;
}

export const AudioClip: React.FC<AudioClipProps> = ({
  clip,
  pixelsPerBeat,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, clipStartTime: 0 });
  const { selectedClipIds, selectClip, updateClip, sampleRate } = useProjectStore();
  const { tempo } = useTransportStore();

  const isSelected = selectedClipIds.includes(clip.id);

  // Calculate clip position and width
  const beatsPerSecond = tempo / 60;
  const startTimeInSeconds = clip.startTime / sampleRate;
  const durationInSeconds = clip.duration / sampleRate;
  const startTimeInBeats = startTimeInSeconds * beatsPerSecond;
  const durationInBeats = durationInSeconds * beatsPerSecond;

  const x = startTimeInBeats * pixelsPerBeat;
  const width = durationInBeats * pixelsPerBeat;
  const waveform = useMemo(() => {
    const count = Math.max(8, Math.min(96, Math.floor(width / 4)));
    return Array.from({ length: count }, (_, index) => {
      const seed = clip.id.length * 17 + index * 31;
      return 22 + Math.abs(Math.sin(seed)) * 68;
    });
  }, [clip.id, width]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectClip(clip.id, e.shiftKey);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      e.stopPropagation();
      setIsDragging(true);
      dragStartPos.current = {
        x: e.clientX,
        clipStartTime: clip.startTime,
      };
    }
  };

  // Global mouse event handlers for drag
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartPos.current.x;

      // Calculate new start time based on pixel movement
      const deltaBeats = deltaX / pixelsPerBeat;
      const beatsPerSecond = tempo / 60;
      const deltaSeconds = deltaBeats / beatsPerSecond;
      const deltaSamples = deltaSeconds * sampleRate;
      
      const newStartTime = Math.max(0, dragStartPos.current.clipStartTime + deltaSamples);
      
      // Update clip position in store
      updateClip(clip.id, { startTime: newStartTime });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, pixelsPerBeat, tempo, sampleRate, clip.id, updateClip]);

  return (
    <div
      className={`
        absolute top-1 bottom-1 rounded
        border-2 transition-all duration-micro
        cursor-move select-none
        ${isSelected
          ? 'border-accent bg-accent bg-opacity-30'
          : 'border-DEFAULT bg-surface-3 hover:border-accent/50'
        }
        ${isDragging ? 'opacity-70 scale-105' : ''}
      `}
      style={{
        left: `${x}px`,
        width: `${width}px`,
        backgroundColor: isSelected ? undefined : `${clip.color}40`,
        borderColor: isSelected ? undefined : clip.color,
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      {/* Clip content */}
      <div className="relative h-full p-2 overflow-hidden">
        {/* Clip name */}
        <div className="text-xs font-medium text-primary truncate mb-1">
          {clip.name}
        </div>

        {/* Simplified waveform visualization */}
        <div className="absolute bottom-2 left-2 right-2 h-8 flex items-center gap-0.5">
          {waveform.map((height, i) => {
            return (
              <div
                key={i}
                className="flex-1 bg-current opacity-50"
                style={{
                  height: `${height}%`,
                  minWidth: '2px',
                }}
              />
            );
          })}
        </div>

        {/* Resize handles */}
        {isSelected && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-accent cursor-ew-resize hover:bg-accent-hover transition-colors duration-micro" />
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-accent cursor-ew-resize hover:bg-accent-hover transition-colors duration-micro" />
          </>
        )}
      </div>
    </div>
  );
};

// Made with Bob
