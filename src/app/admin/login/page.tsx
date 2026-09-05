'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Basic admin credential check (can be replaced with Supabase Auth)
    if (email && password) {
      document.cookie = 'san3a_admin_session=authenticated; path=/; max-age=86400;'
      setLoading(false)
      router.push('/admin')
    } else {
      setLoading(false)
      setError('Please enter valid email and password.')
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#F4F4F0] flex items-center justify-center p-6 relative font-sans">
      <div className="max-w-md w-full border border-studio-border bg-studio-surface p-8 sm:p-10 space-y-8">
        
        {/* Brand Mark Header */}
        <div className="space-y-3 text-center border-b border-studio-border pb-6">
          <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-widest text-studio-accent">
            <ShieldCheck className="w-4 h-4" />
            <span>SAN3A ADMIN SYSTEM</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-studio-fg">
            FOUNDER AUTHENTICATION
          </h1>
          <p className="text-xs text-studio-muted">
            Enter credentials to access the protected SAN3A repository.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {error && (
            <div className="p-3 border border-red-500/40 bg-red-500/10 text-red-400 text-xs font-mono text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="font-mono text-xs text-studio-muted uppercase tracking-wider block">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@san3a.co"
              className="w-full bg-studio-bg border border-studio-border px-4 py-3 text-sm text-studio-fg focus:outline-none focus:border-studio-fg transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs text-studio-muted uppercase tracking-wider block">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-studio-bg border border-studio-border px-4 py-3 text-sm text-studio-fg focus:outline-none focus:border-studio-fg transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-studio-fg text-studio-bg py-4 text-xs uppercase tracking-widest font-extrabold flex items-center justify-center space-x-2 border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all duration-300"
          >
            <span>{loading ? 'Authenticating...' : 'Access Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center font-mono text-[10px] text-studio-darkmuted pt-2">
          <Link href="/" className="hover:text-studio-fg transition-colors">
            ← Return to SAN3A Public Site
          </Link>
        </div>

      </div>
    </div>
  )
}
