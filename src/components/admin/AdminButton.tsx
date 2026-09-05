'use client'

import React from 'react'

interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
}

export function AdminButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  disabled,
  ...props
}: AdminButtonProps) {
  const baseStyle = 'inline-flex items-center justify-center space-x-2 font-mono text-xs uppercase tracking-widest font-extrabold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[11px]',
    md: 'px-5 py-3 text-xs',
    lg: 'px-7 py-4 text-xs',
  }

  const variantStyles = {
    primary: 'bg-studio-fg text-studio-bg border border-studio-fg hover:bg-transparent hover:text-studio-fg',
    secondary: 'bg-studio-surface text-studio-fg border border-studio-border hover:border-studio-border-light',
    outline: 'bg-transparent text-studio-fg border border-studio-border hover:border-studio-fg',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/40 hover:bg-red-500 hover:text-white',
    ghost: 'bg-transparent text-studio-muted hover:text-studio-fg border border-transparent',
  }

  return (
    <button
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
    </button>
  )
}
