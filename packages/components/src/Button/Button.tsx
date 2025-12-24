import React from 'react'

export interface ButtonProps {
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  /** Button size */
  size?: 'sm' | 'md' | 'lg'
  /** Button contents */
  label: string
  /** Optional click handler */
  onClick?: () => void
  /** Disabled state */
  disabled?: boolean
  /** Full width */
  fullWidth?: boolean
  /** Custom className */
  className?: string
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}

const variantClasses = {
  primary: 'bg-primary hover:bg-primary-hover shadow-md hover:shadow-lg border-transparent',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 border-transparent',
  outline: 'bg-transparent border-primary text-primary hover:bg-primary hover:text-white',
  ghost: 'bg-transparent text-primary hover:bg-primary/10 border-transparent',
  danger: 'bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg border-transparent'
}

/** Modern UI button component with multiple variants */
export const Button = ({
  variant = 'primary',
  size = 'md',
  label,
  onClick,
  disabled = false,
  fullWidth = false,
  className = ''
}: ButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button
      type="button"
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}12
    </button>
  )
}
