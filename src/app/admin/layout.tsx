'use client'

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
  ShieldCheck
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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  // If on login page, render children without admin layout shell
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const handleLogout = () => {
    // Clear session cookie
    document.cookie = 'san3a_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#F4F4F0] flex font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-studio-border bg-studio-surface flex flex-col justify-between p-6 shrink-0 min-h-screen sticky top-0 h-screen">
        <div className="space-y-8">
          
          {/* Logo Mark */}
          <div className="flex items-center justify-between border-b border-studio-border pb-6">
            <Link href="/admin" className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-studio-accent animate-pulse" />
              <span className="font-extrabold tracking-widest text-lg text-studio-fg">
                SAN3A
              </span>
              <span className="font-mono text-[9px] text-studio-accent border border-studio-accent/40 px-1.5 py-0.5 uppercase">
                ADMIN
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3.5 py-3 text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${
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

        {/* Bottom Actions */}
        <div className="space-y-4 border-t border-studio-border pt-6 font-mono text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-studio-muted hover:text-studio-fg transition-colors"
          >
            <span>Live Site</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-studio-muted hover:text-red-400 transition-colors w-full text-left pt-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="border-b border-studio-border bg-studio-bg px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center space-x-3 font-mono text-xs text-studio-muted">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>SAN3A REPOSITORY SYSTEM</span>
            <span className="text-studio-darkmuted">//</span>
            <span className="text-studio-fg uppercase">{pathname.replace('/admin', '') || '/ dashboard'}</span>
          </div>

          <div className="font-mono text-xs text-studio-muted">
            FOUNDER ACCESS // ONLINE
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8 flex-1 bg-studio-bg overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  )
}
