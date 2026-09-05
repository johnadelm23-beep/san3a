'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  FolderKanban, 
  Layers, 
  Tag, 
  Inbox, 
  Users, 
  Settings, 
  LogOut,
  ArrowUpRight,
  ShieldCheck,
  User,
  X
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Services', href: '/admin/services', icon: Layers },
  { label: 'Offers', href: '/admin/offers', icon: Tag },
  { label: 'Leads', href: '/admin/leads', icon: Inbox },
  { label: 'Team', href: '/admin/team', icon: Users },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

interface SidebarProps {
  mobileOpen: boolean
  onCloseMobile: () => void
}

export function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    document.cookie = 'san3a_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.push('/admin/login')
  }

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full p-6 font-mono text-xs">
      <div className="space-y-8">
        
        {/* SAN3A Logo Header */}
        <div className="flex items-center justify-between border-b border-studio-border pb-6">
          <Link href="/admin" className="flex items-center gap-2.5" onClick={onCloseMobile}>
            <span className="w-2 h-2 rounded-full bg-studio-accent animate-pulse" />
            <span className="font-extrabold tracking-widest text-lg text-studio-fg">
              SAN3A
            </span>
            <span className="text-[9px] text-studio-accent border border-studio-accent/40 px-1.5 py-0.5 uppercase">
              ADMIN
            </span>
          </Link>
          <button
            onClick={onCloseMobile}
            className="md:hidden text-studio-muted hover:text-studio-fg"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center space-x-3 px-3.5 py-3 uppercase tracking-wider font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-studio-bg text-studio-fg border-l-2 border-studio-accent'
                    : 'text-studio-muted hover:text-studio-fg hover:bg-studio-bg/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-studio-accent' : 'text-studio-muted'}`} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

      </div>

      {/* Footer Profile & Logout */}
      <div className="space-y-4 border-t border-studio-border pt-6">
        
        <div className="flex items-center justify-between p-2.5 border border-studio-border bg-studio-bg">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-full bg-studio-surface border border-studio-border flex items-center justify-center text-studio-accent">
              <User className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-studio-fg font-bold text-[11px]">SAN3A FOUNDER</div>
              <div className="text-studio-muted text-[9px]">OWNER // ADMIN</div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-studio-muted text-[11px] pt-1">
          <Link
            href="/"
            target="_blank"
            className="hover:text-studio-fg transition-colors flex items-center gap-1"
          >
            <span>Live Site</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>

          <button
            onClick={handleLogout}
            className="hover:text-red-400 transition-colors flex items-center gap-1"
          >
            <LogOut className="w-3 h-3" />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-studio-border bg-studio-surface shrink-0 sticky top-0 h-screen z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/80 backdrop-blur-md flex">
          <div className="w-72 bg-studio-surface border-r border-studio-border h-full overflow-y-auto">
            {sidebarContent}
          </div>
          <div className="flex-1" onClick={onCloseMobile} />
        </div>
      )}
    </>
  )
}
