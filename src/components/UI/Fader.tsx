import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Fader Component
 * Vertical fader control for volume/level adjustments
 */

export interface FaderProps {
  value: number; // 0.0 to 1.0
  onChange: (value: number) => void;
  label?: string;
  height?: number;
  showValue?: boolean;
  showScale?: boolean;
  disabled?: boolean;
}

export const Fader: React.FC<FaderProps> = ({
  value,
  onChange,
  label,
  height = 120,
  showValue = true,
  showScale = true,
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const faderRef = useRef<HTMLDivElement>(null);

  const updateValue = useCallback((clientY: number) => {
    if (!faderRef.current) return;

    const rect = faderRef.current.getBoundingClientRect();
    const y = clientY - rect.top;
    const percentage = 1 - Math.max(0, Math.min(1, y / rect.height));

    onChange(percentage);
  }, [onChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    updateValue(e.clientY);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      updateValue(e.clientY);
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
  }, [isDragging, updateValue]);

  const valueToDb = (val: number): string => {
    if (val === 0) return '-inf';
    const db = 20 * Math.log10(val);
    return db.toFixed(1);
  };

  const fillHeight = value * 100;

  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <div className="text-xs text-tertiary font-medium">
          {label}
        </div>
      )}

      <div
        ref={faderRef}
        className={`
          relative w-8 bg-surface-2 rounded-full border border-DEFAULT
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-ns-resize'}
          ${isDragging ? 'ring-2 ring-accent' : ''}
        `}
        style={{ height: `${height}px` }}
        onMouseDown={handleMouseDown}
      >
        {showScale && (
          <div className="absolute -left-6 top-0 h-full flex flex-col justify-between text-xs text-tertiary">
            <span>0</span>
            <span>-6</span>
            <span>-12</span>
            <span>-24</span>
            <span>-inf</span>
          </div>
        )}

        <div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-accent to-accent/80 rounded-full transition-all duration-micro"
          style={{ height: `${fillHeight}%` }}
        />

        <div
          className={`
            absolute left-1/2 -translate-x-1/2 w-10 h-3
            bg-primary rounded-full border-2 border-surface-1
            shadow-lg transition-all duration-micro
            ${isDragging ? 'scale-110' : 'hover:scale-105'}
          `}
          style={{ bottom: `calc(${fillHeight}% - 6px)` }}
        />
      </div>

      {showValue && (
        <div className="text-xs font-mono text-primary">
          {valueToDb(value)} dB
        </div>
      )}
    </div>
  );
};
