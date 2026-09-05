'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, MessageSquare, ArrowUpRight } from 'lucide-react'
import { FacebookIcon } from '@/components/icons/FacebookIcon'

export default function Footer() {
  return (
    <footer className="bg-studio-bg border-t border-studio-border text-studio-muted py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-studio-border">
          
          {/* Col 1: SAN3A Brand & Identity (5 Cols) */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-9 h-9 border border-studio-border overflow-hidden shrink-0 bg-studio-surface">
                <Image
                  src="/projects/san3a.jpeg"
                  alt="SAN3A Studio Logo"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <span className="font-extrabold tracking-widest text-2xl text-studio-fg">
                SAN3A
              </span>
            </Link>

            <p className="text-xs text-studio-muted leading-relaxed max-w-sm font-normal">
              SAN3A is a two-person creative technology studio by John & George. We engineer web platforms, mobile applications, visual systems, and custom software.
            </p>

            <div className="font-mono text-[11px] uppercase text-studio-darkmuted tracking-wider">
              SAN3A CREATIVE TECHNOLOGY // EST. 2026
            </div>
          </div>

          {/* Col 2: Navigation Links (3 Cols) */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-studio-fg block font-semibold">
              NAVIGATION
            </span>
            <ul className="space-y-2.5 text-xs font-mono">
              {[
                { name: 'Work', href: '/work' },
                { name: 'Services', href: '/services' },
                { name: 'Offers', href: '/offers' },
                { name: 'About', href: '/about' },
                { name: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-studio-fg transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Founders Contact & Facebook (4 Cols) */}
          <div className="md:col-span-4 space-y-6">
            <span className="font-mono text-[11px] uppercase tracking-widest text-studio-fg block font-semibold">
              DIRECT CONTACT
            </span>

            {/* John Contact */}
            <div className="space-y-1.5 font-mono text-xs border-l-2 border-studio-accent pl-3">
              <div className="text-studio-fg font-bold">JOHN</div>
              <div className="flex flex-wrap items-center gap-4 text-studio-muted">
                <a href="tel:01226806622" className="hover:text-studio-fg transition-colors flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-studio-accent" />
                  <span>01226806622</span>
                </a>
                <a href="https://wa.me/201226806622" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* George Contact */}
            <div className="space-y-1.5 font-mono text-xs border-l-2 border-studio-accent pl-3">
              <div className="text-studio-fg font-bold">GEORGE</div>
              <div className="flex flex-wrap items-center gap-4 text-studio-muted">
                <a href="tel:+201229518750" className="hover:text-studio-fg transition-colors flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-studio-accent" />
                  <span>+20 12 29518750</span>
                </a>
                <a href="https://wa.me/201229518750" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Facebook Social (ONLY Social Link) */}
            <div className="pt-2">
              <a
                href="https://www.facebook.com/share/p/191qx2khJL/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 border border-studio-border bg-studio-surface px-4 py-2 text-xs font-mono text-studio-fg hover:border-studio-fg transition-all group"
              >
                <FacebookIcon className="w-4 h-4 text-blue-500" />
                <span>SAN3A Official Facebook</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-studio-muted group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-studio-muted gap-4">
          <div>
            © {new Date().getFullYear()} SAN3A. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="hover:text-studio-fg transition-colors">
              Admin Portal
            </Link>
            <span>//</span>
            <span>INTENTION & CRAFT</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
