import React, { useState, useRef, useEffect, useCallback } from 'react';
import { theme } from '../../styles/theme';

/**
 * Knob Component
 * Rotary knob control for pan, send levels, etc.
 */

export interface KnobProps {
  value: number; // -1.0 to 1.0 for pan, 0.0 to 1.0 for others
  onChange: (value: number) => void;
  label?: string;
  min?: number;
  max?: number;
  size?: number;
  showValue?: boolean;
  disabled?: boolean;
  bipolar?: boolean; // true for pan (-1 to 1), false for unipolar (0 to 1)
}

export const Knob: React.FC<KnobProps> = ({
  value,
  onChange,
  label,
  min = -1,
  max = 1,
  size = 48,
  showValue = true,
  disabled = false,
  bipolar = true,
}) => {
  // Use refs to avoid race conditions with state updates
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startValueRef = useRef(0);
  const knobRef = useRef<HTMLDivElement>(null);
  
  // Keep state for visual feedback
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    startValueRef.current = value;
    setIsDragging(true);
  };

  // Memoize onChange to prevent stale closures
  const handleChange = useCallback((newValue: number) => {
    onChange(newValue);
  }, [onChange]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      
      const deltaY = startYRef.current - e.clientY;
      const sensitivity = 0.005;
      const newValue = startValueRef.current + deltaY * sensitivity * (max - min);
      const clampedValue = Math.max(min, Math.min(max, newValue));
      handleChange(clampedValue);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, min, max, handleChange]);

  // Calculate rotation angle (-135Â° to 135Â°)
  const normalizedValue = (value - min) / (max - min);
  const angle = -135 + normalizedValue * 270;

  // Format value for display
  const formatValue = (val: number): string => {
    if (bipolar) {
      if (val === 0) return 'C';
      if (val < 0) return `L${Math.abs(val * 100).toFixed(0)}`;
      return `R${(val * 100).toFixed(0)}`;
    }
    return `${(val * 100).toFixed(0)}%`;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <div className="text-xs text-tertiary font-medium">
          {label}
        </div>
      )}
      
      <div
        ref={knobRef}
        className={`
          relative rounded-full bg-surface-2 border-2 border-DEFAULT
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-ns-resize'}
          ${isDragging ? 'ring-2 ring-accent' : 'hover:border-accent/50'}
          transition-all duration-standard
        `}
        style={{ width: `${size}px`, height: `${size}px` }}
        onMouseDown={handleMouseDown}
      >
        {/* Track */}
        <svg
          className="absolute inset-0"
          viewBox="0 0 100 100"
        >
          {/* Background arc */}
          <path
            d="M 15,85 A 40 40 0 1 1 85,85"
            fill="none"
            stroke={theme.colors.border.default}
            strokeWidth="4"
            strokeLinecap="round"
          />
          
          {/* Value arc */}
          <path
            d={bipolar && value < 0
              ? `M 50,50 L 50,10 A 40 40 0 0 0 ${50 + 40 * Math.sin((angle + 135) * Math.PI / 180)},${50 - 40 * Math.cos((angle + 135) * Math.PI / 180)}`
              : `M 50,50 L 15,85 A 40 40 0 ${normalizedValue > 0.5 ? 1 : 0} 1 ${50 + 40 * Math.sin((angle + 135) * Math.PI / 180)},${50 - 40 * Math.cos((angle + 135) * Math.PI / 180)}`
            }
            fill="none"
            stroke={theme.colors.accent.primary}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>

        {/* Indicator */}
        <div
          className="absolute top-1 left-1/2 w-1 h-3 bg-primary rounded-full -translate-x-1/2 origin-bottom"
          style={{
            transform: `translateX(-50%) rotate(${angle}deg)`,
            transformOrigin: `center ${size / 2 - 4}px`,
          }}
        />

        {/* Center dot */}
        {bipolar && (
          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-tertiary rounded-full -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>

      {showValue && (
        <div className="text-xs font-mono text-primary">
          {formatValue(value)}
        </div>
      )}
    </div>
  );
};
