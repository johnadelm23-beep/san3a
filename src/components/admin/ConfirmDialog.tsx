'use client'

import React from 'react'
import { AdminButton } from './AdminButton'
import { AlertTriangle } from 'lucide-react'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="border border-studio-border bg-studio-surface max-w-md w-full p-6 space-y-6 shadow-2xl">
        
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1 font-mono text-xs">
            <h3 className="text-sm font-extrabold text-studio-fg uppercase tracking-wider">
              {title}
            </h3>
            <p className="text-studio-muted leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-studio-border">
          <AdminButton variant="ghost" onClick={onCancel} disabled={loading}>
            {cancelText}
          </AdminButton>
          <AdminButton variant="danger" onClick={onConfirm} disabled={loading}>
            {loading ? 'Processing...' : confirmText}
          </AdminButton>
        </div>

      </div>
    </div>
  )
}
