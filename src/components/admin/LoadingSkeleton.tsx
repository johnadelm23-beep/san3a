'use client'

import React from 'react'

export function LoadingSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3 animate-pulse font-mono text-xs">
      <div className="h-10 bg-studio-surface border border-studio-border rounded-none" />
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-14 bg-studio-surface/60 border border-studio-border/50 rounded-none flex items-center justify-between px-4"
        >
          <div className="w-1/3 h-4 bg-studio-border/60" />
          <div className="w-1/4 h-4 bg-studio-border/40" />
          <div className="w-1/6 h-4 bg-studio-border/60" />
        </div>
      ))}
    </div>
  )
}
