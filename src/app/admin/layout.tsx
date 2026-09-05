'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { ToastProvider } from '@/context/ToastContext'
import { Sidebar } from '@/components/admin/Sidebar'
import { Topbar } from '@/components/admin/Topbar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  // If on login page, render children without admin layout shell
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#080808] text-[#F4F4F0] flex font-sans">
        
        {/* Desktop & Mobile Sidebar */}
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />
          <main className="p-6 md:p-10 flex-1 bg-studio-bg overflow-y-auto">
            {children}
          </main>
        </div>

      </div>
    </ToastProvider>
  )
}
