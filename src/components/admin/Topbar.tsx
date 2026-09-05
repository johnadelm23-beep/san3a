'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, Search, Bell, ShieldCheck, User } from 'lucide-react'

interface TopbarProps {
  onToggleMobileSidebar: () => void
}

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard Overview',
  '/admin/projects': 'Projects Repository',
  '/admin/projects/new': 'Create New Project',
  '/admin/services': 'Services & Disciplines',
  '/admin/services/new': 'Create New Service',
  '/admin/offers': 'Offers & Packages',
  '/admin/offers/new': 'Create New Offer',
  '/admin/leads': 'Project Leads & Inquiries',
  '/admin/team': 'Team & Founder Profiles',
  '/admin/settings': 'Studio Settings',
}

export function Topbar({ onToggleMobileSidebar }: TopbarProps) {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const title = pageTitles[pathname] || 'Admin Management'

  return (
    <header className="border-b border-studio-border bg-studio-bg px-6 py-4 flex items-center justify-between sticky top-0 z-20 font-mono text-xs">
      
      {/* Left: Mobile Menu Toggle & Page Title */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 border border-studio-border text-studio-fg hover:text-studio-accent"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-4 h-4 text-emerald-500 hidden sm:inline" />
          <h1 className="text-sm font-extrabold tracking-wider text-studio-fg uppercase font-sans">
            {title}
          </h1>
        </div>
      </div>

      {/* Right: Search, Notifications & Profile */}
      <div className="flex items-center space-x-3">
        
        {/* Search Field */}
        <div className="relative">
          {searchOpen ? (
            <div className="flex items-center space-x-2 bg-studio-surface border border-studio-border px-3 py-1.5">
              <Search className="w-3.5 h-3.5 text-studio-muted" />
              <input
                type="text"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                onBlur={() => !searchTerm && setSearchOpen(false)}
                className="bg-transparent text-xs text-studio-fg focus:outline-none w-36 sm:w-48"
              />
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 border border-studio-border text-studio-muted hover:text-studio-fg transition-colors"
              title="Search"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Notifications Icon */}
        <button
          className="p-2 border border-studio-border text-studio-muted hover:text-studio-fg transition-colors relative"
          title="Notifications"
        >
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-studio-accent" />
        </button>

        {/* Profile Avatar Badge */}
        <div className="hidden sm:flex items-center space-x-2 border border-studio-border px-3 py-1.5 bg-studio-surface">
          <User className="w-3.5 h-3.5 text-studio-accent" />
          <span className="text-[10px] text-studio-fg uppercase font-bold">FOUNDER</span>
        </div>

      </div>

    </header>
  )
}
