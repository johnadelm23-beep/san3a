'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { Sparkles } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface PaizoImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackTitle?: string
  aspectRatioClass?: string
}

export default function PaizoImage({
  src,
  alt,
  fallbackTitle = 'PAIZO Game Asset',
  aspectRatioClass = 'aspect-[16/10]',
  className = '',
  sizes = '(max-width: 768px) 100vw, 500px',
  priority = false,
  ...props
}: PaizoImageProps) {
  const { isRTL } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  return (
    <div className={`relative w-full overflow-hidden bg-studio-surface border border-studio-border ${aspectRatioClass}`}>
      {/* Skeleton Shimmer Loading Placeholder */}
      {isLoading && !isError && (
        <div className="absolute inset-0 z-10 bg-studio-card overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.8s_infinite] -translate-x-full" />
          <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-studio-darkmuted uppercase tracking-widest gap-2">
            <Sparkles className="w-3.5 h-3.5 text-studio-accent animate-pulse" />
            <span>{isRTL ? 'جاري تحميل عنصر PAIZO...' : 'PAIZO ASSET LOADING'}</span>
          </div>
        </div>
      )}

      {/* Graceful Error Fallback Container */}
      {isError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-studio-surface border border-studio-border text-center space-y-3 font-mono text-xs">
          <div className="w-10 h-10 border border-studio-border bg-studio-bg flex items-center justify-center text-studio-accent font-bold">
            P
          </div>
          <div className="space-y-1">
            <span className="text-studio-fg font-bold block uppercase">{fallbackTitle}</span>
            <span className="text-studio-muted text-[10px] uppercase tracking-wider block">
              {isRTL ? 'عنصر تفاعلي معتمد من PAIZO' : 'PAIZO INTERACTIVE ASSET'}
            </span>
          </div>
        </div>
      ) : (
        /* Actual Image with Blur-Up Transition */
        <Image
          src={src}
          alt={alt || fallbackTitle}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setIsError(true)
          }}
          className={`object-cover transition-all duration-700 ease-out ${
            isLoading ? 'scale-105 blur-lg opacity-40' : 'scale-100 blur-0 opacity-100'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  )
}
