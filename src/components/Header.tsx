'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Menu, X } from 'lucide-react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const navItems = [
    { label: 'Work', href: '/work' },
    { label: 'Services', href: '/services' },
    { label: 'Offers', href: '/offers' },
    { label: 'About', href: '/about' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/92 backdrop-blur-md py-3.5 border-b border-studio-border'
            : 'bg-transparent py-5 border-b border-studio-border/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Left: Official SAN3A Logo Image & Brand Name */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-none border border-studio-border overflow-hidden bg-studio-surface shrink-0">
              <Image
                src="/projects/san3a.jpeg"
                alt="SAN3A Logo"
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-widest text-xl text-studio-fg group-hover:text-white transition-colors">
                SAN3A
              </span>
            </div>
            <span className="hidden sm:inline-block font-mono text-[10px] uppercase text-studio-muted border border-studio-border px-2 py-0.5 tracking-widest">
              // STUDIO
            </span>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-xs uppercase tracking-widest font-medium transition-colors duration-200 hover-underline ${
                    isActive ? 'text-studio-fg font-bold' : 'text-studio-muted hover:text-studio-fg'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right: Action & Mobile Hamburger */}
          <div className="flex items-center space-x-4">
            <Link
              href="/contact"
              className="hidden sm:flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold border border-studio-border hover:border-studio-fg px-4 py-2.5 text-studio-fg hover:bg-studio-fg hover:text-studio-bg transition-all duration-300"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-studio-fg hover:text-studio-accent transition-colors border border-studio-border"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#080808]/98 backdrop-blur-xl md:hidden pt-24 px-6 pb-12 flex flex-col justify-between border-b border-studio-border font-sans">
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-studio-border pb-4">
              <div className="relative w-7 h-7 border border-studio-border overflow-hidden">
                <Image src="/projects/san3a.jpeg" alt="SAN3A" fill sizes="28px" className="object-cover" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-studio-fg font-bold">
                SAN3A NAVIGATION
              </span>
            </div>

            <nav className="flex flex-col space-y-6">
              <Link
                href="/"
                className="text-2xl font-bold uppercase tracking-wider text-studio-fg hover:text-studio-accent transition-colors"
              >
                Home
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-2xl font-bold uppercase tracking-wider text-studio-fg hover:text-studio-accent transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-6 border-t border-studio-border pt-8">
            <Link
              href="/contact"
              className="flex items-center justify-between w-full bg-studio-fg text-studio-bg px-6 py-4 text-xs uppercase tracking-widest font-extrabold"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <div className="font-mono text-[10px] text-studio-muted uppercase tracking-widest">
              SAN3A CREATIVE TECHNOLOGY STUDIO
            </div>
          </div>
        </div>
      )}
    </>
  )
}
