import React, { useRef, useEffect, useState } from 'react';
import { TimelineRuler } from './TimelineRuler';
import { useProjectStore } from '../../stores/projectStore';
import { useTransportStore } from '../../stores/transportStore';
import { useUIStore } from '../../stores/uiStore';

/**
 * Timeline Component
 * Main timeline with ruler, playhead, and loop markers
 */

export const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  
  const { sampleRate } = useProjectStore();
  const { position, isPlaying, loopEnabled, loopStart, loopEnd, tempo } = useTransportStore();
  const { horizontalZoom, zoomIn, zoomOut, resetZoom } = useUIStore();

  // Update width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Calculate playhead position
  const pixelsPerBeat = 40 * horizontalZoom;
  const beatsPerSecond = tempo / 60;
  const positionInSeconds = position / sampleRate;
  const positionInBeats = positionInSeconds * beatsPerSecond;
  const playheadX = positionInBeats * pixelsPerBeat;

  // Calculate loop region positions
  const loopStartX = (loopStart / sampleRate) * beatsPerSecond * pixelsPerBeat;
  const loopEndX = (loopEnd / sampleRate) * beatsPerSecond * pixelsPerBeat;

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-surface-1 border-b border-DEFAULT"
      onWheel={handleWheel}
    >
      {/* Zoom controls */}
      <div className="absolute top-1 right-2 flex items-center gap-1 z-10">
        <button
          onClick={zoomOut}
          className="px-2 py-1 text-xs bg-surface-2 hover:bg-surface-3 rounded border border-DEFAULT transition-colors duration-standard"
          title="Zoom Out"
        >
          −
        </button>
        <button
          onClick={resetZoom}
          className="px-2 py-1 text-xs bg-surface-2 hover:bg-surface-3 rounded border border-DEFAULT transition-colors duration-standard"
          title="Reset Zoom"
        >
          {Math.round(horizontalZoom * 100)}%
        </button>
        <button
          onClick={zoomIn}
          className="px-2 py-1 text-xs bg-surface-2 hover:bg-surface-3 rounded border border-DEFAULT transition-colors duration-standard"
          title="Zoom In"
        >
          +
        </button>
      </div>

      {/* Timeline ruler */}
      <TimelineRuler width={width} pixelsPerBeat={40} />

      {/* Loop region */}
      {loopEnabled && loopStart < loopEnd && (
        <div
          className="absolute top-0 bottom-0 bg-accent bg-opacity-10 border-l-2 border-r-2 border-accent pointer-events-none"
          style={{
            left: `${loopStartX}px`,
            width: `${loopEndX - loopStartX}px`,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
        </div>
      )}

      {/* Playhead */}
      <div
        className={`absolute top-0 bottom-0 w-0.5 bg-accent pointer-events-none z-20 ${
          isPlaying ? 'shadow-lg shadow-accent' : ''
        }`}
        style={{ left: `${playheadX}px` }}
      >
        {/* Playhead handle */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rounded-sm" />
      </div>
    </div>
  );
};

// Made with Bob
