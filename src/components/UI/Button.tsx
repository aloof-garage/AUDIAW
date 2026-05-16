import React from 'react';

/**
 * Button Component
 * Reusable button with multiple variants and states
 */

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  active?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = React.memo(({
  variant = 'primary',
  size = 'md',
  active = false,
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium rounded-lg
    transition-all duration-standard
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-1
    disabled:opacity-50 disabled:cursor-not-allowed
    select-none
  `;

  const variantStyles = {
    primary: `
      bg-accent hover:bg-accent-hover active:bg-accent-active
      text-white
      focus:ring-accent
      ${active ? 'bg-accent-hover' : ''}
    `,
    secondary: `
      bg-surface-2 hover:bg-surface-3 active:bg-surface-3
      text-primary border border-DEFAULT
      focus:ring-accent
      ${active ? 'bg-surface-3 border-accent' : ''}
    `,
    danger: `
      bg-status-error hover:bg-status-error/90 active:bg-status-error/80
      text-white
      focus:ring-status-error
      ${active ? 'bg-status-error/90' : ''}
    `,
    ghost: `
      bg-transparent hover:bg-surface-2 active:bg-surface-3
      text-primary
      focus:ring-accent
      ${active ? 'bg-surface-2 text-accent' : ''}
    `,
    icon: `
      bg-transparent hover:bg-surface-2 active:bg-surface-3
      text-secondary hover:text-primary
      focus:ring-accent
      ${active ? 'bg-surface-2 text-accent' : ''}
    `,
  };

  const sizeStyles = {
    sm: 'h-8 px-2 text-xs gap-1',
    md: 'h-8 px-4 text-sm gap-2',
    lg: 'h-8 px-6 text-base gap-2',
  };

  const iconSizeStyles = {
    sm: 'h-8 w-8',
    md: 'h-8 w-8',
    lg: 'h-8 w-8',
  };

  const finalClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${variant === 'icon' ? iconSizeStyles[size] : sizeStyles[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      className={finalClassName}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

// Made with Bob
