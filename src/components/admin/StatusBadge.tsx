'use client'

import React from 'react'

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const normalized = status.toUpperCase()

  let style = 'border-studio-muted text-studio-muted'

  if (['PUBLISHED', 'ACTIVE', 'COMPLETED'].includes(normalized)) {
    style = 'border-emerald-500/60 bg-emerald-500/10 text-emerald-400'
  } else if (['NEW', 'FEATURED', 'IN PROGRESS'].includes(normalized)) {
    style = 'border-studio-accent bg-studio-accent/10 text-studio-accent'
  } else if (['EXPIRED', 'REJECTED', 'INACTIVE'].includes(normalized)) {
    style = 'border-red-500/40 bg-red-500/10 text-red-400'
  } else if (['DRAFT', 'CONTACTED'].includes(normalized)) {
    style = 'border-studio-border bg-studio-surface text-studio-muted'
  }

  return (
    <span className={`inline-block px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border ${style} ${className}`}>
      {status}
    </span>
  )
}
