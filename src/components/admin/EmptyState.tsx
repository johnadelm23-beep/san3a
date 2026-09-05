'use client'

import React from 'react'
import { AdminButton } from './AdminButton'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="border border-studio-border bg-studio-surface p-12 text-center space-y-5 my-4">
      {icon && <div className="text-studio-muted flex justify-center">{icon}</div>}
      
      <div className="space-y-2 max-w-md mx-auto">
        <h3 className="text-lg font-extrabold tracking-tight text-studio-fg uppercase font-mono">
          {title}
        </h3>
        <p className="text-xs text-studio-muted font-mono leading-relaxed">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <div className="pt-2">
          <AdminButton onClick={onAction} variant="outline" size="sm">
            {actionLabel}
          </AdminButton>
        </div>
      )}
    </div>
  )
}
