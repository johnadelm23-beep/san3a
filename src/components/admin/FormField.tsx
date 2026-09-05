'use client'

import React from 'react'

interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  helperText?: string
  children: React.ReactNode
  className?: string
}

export function FormField({
  label,
  required = false,
  error,
  helperText,
  children,
  className = '',
}: FormFieldProps) {
  return (
    <div className={`space-y-1.5 font-mono text-xs ${className}`}>
      <label className="text-studio-muted uppercase tracking-wider block font-medium">
        {label} {required && <span className="text-studio-accent">*</span>}
      </label>

      {children}

      {error && (
        <p className="text-red-400 text-[11px] pt-0.5">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-studio-darkmuted text-[10px]">{helperText}</p>
      )}
    </div>
  )
}
