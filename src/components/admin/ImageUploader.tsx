'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { UploadCloud, X, Loader2, RefreshCw } from 'lucide-react'
import { uploadStorageFile } from '@/lib/supabase/storage'

interface ImageUploaderProps {
  label: string
  value?: string
  onChange: (url: string, path?: string) => void
  bucket?: 'projects' | 'services' | 'offers' | 'team'
  folderPath?: string
  helperText?: string
}

export function ImageUploader({
  label,
  value,
  onChange,
  bucket = 'projects',
  folderPath = '',
  helperText = 'Upload files directly to Supabase Storage or enter image URL.',
}: ImageUploaderProps) {
  const [inputUrl, setInputUrl] = useState(value || '')
  const [showInput, setShowInput] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [imageFailed, setImageFailed] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')
    setImageFailed(false)

    const result = await uploadStorageFile(bucket, folderPath, file)

    setUploading(false)
    if (result.error) {
      setError(result.error)
    } else if (result.url) {
      onChange(result.url, result.path)
    }
  }

  const handleUrlSubmit = () => {
    setImageFailed(false)
    onChange(inputUrl)
    setShowInput(false)
  }

  const handleClear = () => {
    setInputUrl('')
    setImageFailed(false)
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2 font-mono text-xs">
      <div className="flex justify-between items-center">
        <label className="text-studio-muted uppercase tracking-wider block font-medium">
          {label}
        </label>
        <span className="text-[10px] text-studio-accent">// SUPABASE STORAGE ACTIVE</span>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      {error && (
        <div className="p-2 border border-red-500/40 bg-red-500/10 text-red-400 text-[11px]">
          Upload warning: {error}
        </div>
      )}

      {value ? (
        <div className="relative border border-studio-border bg-studio-bg p-3 space-y-3 group">
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-studio-border bg-studio-surface flex items-center justify-center">
            {imageFailed ? (
              <div className="text-center p-4 text-studio-muted space-y-1">
                <span className="text-amber-400 font-bold uppercase block text-xs">Image Preview Error</span>
                <span className="text-[10px] text-studio-darkmuted truncate max-w-xs block">{value}</span>
              </div>
            ) : (
              <Image
                src={value}
                alt="Uploaded preview"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
                onError={() => setImageFailed(true)}
              />
            )}
          </div>

          <div className="flex items-center justify-between px-1 text-[10px] text-studio-muted gap-2">
            <span className="truncate flex-1 font-mono text-studio-fg">{value}</span>
            <div className="flex items-center space-x-3 shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-studio-accent hover:text-studio-fg font-bold uppercase flex items-center gap-1"
                disabled={uploading}
              >
                {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                <span>Replace</span>
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="text-red-400 hover:text-red-300 font-bold uppercase"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-studio-border bg-studio-bg p-6 text-center space-y-3 hover:border-studio-border-light transition-colors">
          {uploading ? (
            <div className="space-y-2 py-4">
              <Loader2 className="w-8 h-8 text-studio-accent animate-spin mx-auto" />
              <p className="text-studio-fg font-semibold uppercase text-xs">
                Uploading to Supabase Storage...
              </p>
            </div>
          ) : (
            <>
              <UploadCloud className="w-8 h-8 text-studio-muted mx-auto" />
              
              <div className="space-y-1">
                <p className="text-studio-fg font-semibold uppercase text-xs">
                  Upload File or Enter Image URL
                </p>
                <p className="text-[10px] text-studio-muted max-w-xs mx-auto">
                  {helperText}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-studio-fg text-studio-bg font-bold uppercase text-[11px] hover:bg-studio-accent transition-colors"
                >
                  Choose File
                </button>

                {!showInput ? (
                  <button
                    type="button"
                    onClick={() => setShowInput(true)}
                    className="px-4 py-2 border border-studio-border text-[11px] uppercase tracking-wider text-studio-fg hover:border-studio-fg transition-colors"
                  >
                    + Enter URL
                  </button>
                ) : null}
              </div>

              {showInput && (
                <div className="flex items-center space-x-2 max-w-md mx-auto pt-2">
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="/projects/san3a.jpeg or https://..."
                    className="flex-1 bg-studio-surface border border-studio-border px-3 py-2 text-xs text-studio-fg focus:outline-none focus:border-studio-fg"
                  />
                  <button
                    type="button"
                    onClick={handleUrlSubmit}
                    className="px-3 py-2 bg-studio-fg text-studio-bg font-bold uppercase text-[11px]"
                  >
                    Set
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowInput(false)}
                    className="p-2 text-studio-muted hover:text-studio-fg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
