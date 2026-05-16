import React, { useRef, useEffect, useState } from 'react';
import { useProjectStore } from '../../stores/projectStore';
import { useUIStore } from '../../stores/uiStore';
import { TrackLane } from './TrackLane.tsx';

/**
 * ArrangementView Component
 * Main arrangement canvas with track lanes and clips
 */

export const ArrangementView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  
  const { tracks } = useProjectStore();
  const { horizontalZoom, setScrollPosition } = useUIStore();

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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setScrollPosition(target.scrollLeft, target.scrollTop);
  };

  const pixelsPerBeat = 40 * horizontalZoom;
  const totalWidth = Math.max(width, pixelsPerBeat * 4 * 64); // 64 bars minimum

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-auto bg-surface-1"
      onScroll={handleScroll}
    >
      <div
        className="relative"
        style={{
          width: `${totalWidth}px`,
          minHeight: '100%',
        }}
      >
        {/* Grid background */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 64 }).map((_, barIndex) => (
            <div
              key={barIndex}
              className="absolute top-0 bottom-0 border-l border-DEFAULT opacity-30"
              style={{ left: `${barIndex * pixelsPerBeat * 4}px` }}
            />
          ))}
        </div>

        {/* Track lanes */}
        {tracks.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-[400px]">
            <div className="text-center">
              <svg className="w-16 h-16 text-tertiary mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
              </svg>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Empty Arrangement
              </h3>
              <p className="text-sm text-tertiary">
                Add tracks to start creating your project
              </p>
            </div>
          </div>
        ) : (
          <div className="relative">
            {tracks.map((track, index) => (
              <TrackLane
                key={track.id}
                track={track}
                pixelsPerBeat={pixelsPerBeat}
                yOffset={tracks.slice(0, index).reduce((sum, t) => sum + t.height, 0)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Made with Bob
