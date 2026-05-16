import React from 'react';
import { useTransportStore } from '../../stores/transportStore';
import { useUIStore } from '../../stores/uiStore';

/**
 * TimelineRuler Component
 * Displays bar numbers, beat subdivisions, and allows seeking
 */

export interface TimelineRulerProps {
  width: number;
  pixelsPerBeat?: number;
}

export const TimelineRuler: React.FC<TimelineRulerProps> = React.memo(({
  width,
  pixelsPerBeat = 40,
}) => {
  const { tempo, timeSignature, setPosition, secondsToSamples } = useTransportStore();
  const { horizontalZoom } = useUIStore();

  const adjustedPixelsPerBeat = pixelsPerBeat * horizontalZoom;
  const beatsPerBar = timeSignature.numerator;
  const pixelsPerBar = adjustedPixelsPerBeat * beatsPerBar;

  // Calculate how many bars to display
  const totalBars = Math.ceil(width / pixelsPerBar) + 2;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    // Convert pixel position to beats
    const beats = x / adjustedPixelsPerBeat;
    
    // Convert beats to seconds
    const beatsPerSecond = tempo / 60;
    const seconds = beats / beatsPerSecond;
    
    // Convert seconds to samples and set position
    const samples = secondsToSamples(seconds);
    setPosition(samples);
  };

  return (
    <div
      className="relative h-8 bg-surface-2 border-b border-DEFAULT cursor-pointer select-none overflow-hidden"
      onClick={handleClick}
      style={{ width: `${width}px` }}
    >
      {/* Bar markers */}
      {Array.from({ length: totalBars }).map((_, barIndex) => {
        const x = barIndex * pixelsPerBar;
        
        return (
          <div key={barIndex}>
            {/* Bar number */}
            <div
              className="absolute top-1 text-xs font-medium text-primary"
              style={{ left: `${x + 4}px` }}
            >
              {barIndex + 1}
            </div>
            
            {/* Bar line */}
            <div
              className="absolute top-0 bottom-0 w-px bg-border-DEFAULT"
              style={{ left: `${x}px` }}
            />
            
            {/* Beat subdivisions */}
            {Array.from({ length: beatsPerBar - 1 }).map((_, beatIndex) => {
              const beatX = x + (beatIndex + 1) * adjustedPixelsPerBeat;
              
              return (
                <div
                  key={beatIndex}
                  className="absolute top-4 bottom-0 w-px bg-border-DEFAULT opacity-50"
                  style={{ left: `${beatX}px` }}
                />
              );
            })}
          </div>
        );
      })}
      
      {/* Hover indicator */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 hover:bg-accent hover:bg-opacity-5 transition-colors duration-standard" />
      </div>
    </div>
  );
});

TimelineRuler.displayName = 'TimelineRuler';
