import React, { useMemo } from 'react';
import { theme } from '../../styles/theme';

/**
 * Meter Component
 * Level meter with peak hold indicator
 */

export interface MeterProps {
  level: number; // 0.0 to 1.0
  peak?: number; // 0.0 to 1.0
  height?: number;
  width?: number;
  stereo?: boolean;
  levelRight?: number; // for stereo
  peakRight?: number; // for stereo
}

export const Meter: React.FC<MeterProps> = React.memo(({
  level,
  peak,
  height = 120,
  width = 8,
  stereo = false,
  levelRight,
  peakRight,
}) => {
  // Convert linear level to dB for color calculation
  const levelToDb = (val: number): number => {
    if (val === 0) return -Infinity;
    return 20 * Math.log10(val);
  };

  // Get color based on dB level
  const getColor = (val: number): string => {
    const db = levelToDb(val);
    if (db >= -3) return theme.colors.meter.high;
    if (db >= -12) return theme.colors.meter.mid;
    return theme.colors.meter.low;
  };

  // Create gradient segments
  const segments = useMemo(() => {
    const segmentCount = 20;
    const result = [];
    
    for (let i = 0; i < segmentCount; i++) {
      const segmentValue = (i + 1) / segmentCount;
      const color = getColor(segmentValue);
      result.push({ value: segmentValue, color });
    }
    
    return result;
  }, []);

  const renderMeter = (levelValue: number, peakValue?: number) => {
    const peakHeight = peakValue ? peakValue * 100 : 0;

    return (
      <div
        className="relative bg-surface-2 rounded-sm overflow-hidden"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {/* Segments */}
        <div className="absolute inset-0 flex flex-col-reverse gap-0.5 p-0.5">
          {segments.map((segment, index) => {
            const segmentHeight = 100 / segments.length;
            const isActive = levelValue >= segment.value;
            
            return (
              <div
                key={index}
                className="rounded-sm transition-all duration-50"
                style={{
                  height: `${segmentHeight}%`,
                  backgroundColor: isActive ? segment.color : theme.colors.surfaces.level3,
                  opacity: isActive ? 1 : 0.3,
                }}
              />
            );
          })}
        </div>

        {/* Peak hold indicator */}
        {peakValue !== undefined && peakValue > 0 && (
          <div
            className="absolute left-0 right-0 h-0.5 bg-white transition-all duration-100"
            style={{ bottom: `${peakHeight}%` }}
          />
        )}
      </div>
    );
  };

  if (stereo && levelRight !== undefined) {
    return (
      <div className="flex gap-1">
        {renderMeter(level, peak)}
        {renderMeter(levelRight, peakRight)}
      </div>
    );
  }

  return renderMeter(level, peak);
});

Meter.displayName = 'Meter';
