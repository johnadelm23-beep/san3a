'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, ArrowUpLeft, Menu, X, Globe } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t, isRTL } = useLanguage()

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
    { label: t.nav.work, href: '/work' },
    { label: t.nav.services, href: '/services' },
    { label: t.nav.paizo, href: '/paizo' },
    { label: t.nav.offers, href: '/offers' },
    { label: t.nav.about, href: '/about' },
  ]

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  const ActionIcon = isRTL ? ArrowUpLeft : ArrowUpRight

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
              {t.nav.tagline}
            </span>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
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

          {/* Right: Language Switcher, Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Minimal & Professional Language Switcher Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 border border-studio-border hover:border-studio-fg px-2.5 py-1.5 text-[11px] font-mono tracking-wider text-studio-fg hover:bg-studio-surface transition-all rounded-none"
              title={language === 'en' ? 'التحويل إلى العربية' : 'Switch to English'}
              aria-label="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-studio-accent" />
              <span>{language === 'en' ? 'EN | العربية' : 'العربية | EN'}</span>
            </button>

            <Link
              href="/contact"
              className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-widest font-semibold border border-studio-border hover:border-studio-fg px-4 py-2 text-studio-fg hover:bg-studio-fg hover:text-studio-bg transition-all duration-300"
            >
              <span>{t.nav.startProject}</span>
              <ActionIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
            <div className="flex items-center justify-between border-b border-studio-border pb-4">
              <div className="flex items-center gap-3">
                <div className="relative w-7 h-7 border border-studio-border overflow-hidden">
                  <Image src="/projects/san3a.jpeg" alt="SAN3A" fill sizes="28px" className="object-cover" />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-studio-fg font-bold">
                  SAN3A
                </span>
              </div>
              
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 border border-studio-border px-3 py-1.5 text-xs font-mono text-studio-fg bg-studio-surface"
              >
                <Globe className="w-3.5 h-3.5 text-studio-accent" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </button>
            </div>

            <nav className="flex flex-col space-y-6">
              <Link
                href="/"
                className="text-2xl font-bold uppercase tracking-wider text-studio-fg hover:text-studio-accent transition-colors"
              >
                {isRTL ? 'الرئيسية' : 'Home'}
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.href}
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
              <span>{t.nav.startProject}</span>
              <ActionIcon className="w-4 h-4" />
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
