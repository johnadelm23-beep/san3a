'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-studio-bg border-t border-studio-border text-studio-muted py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-studio-border">
          
          {/* Col 1: SAN3A Brand & Identity (5 Cols) */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-extrabold tracking-widest text-2xl text-studio-fg">
                SAN3A
              </span>
            </Link>
            <p className="text-xs text-studio-muted leading-relaxed max-w-sm font-normal">
              SAN3A is a two-person creative technology studio. We engineer web platforms, mobile applications, visual systems, and custom software solutions with precision.
            </p>
            <div className="font-mono text-[11px] uppercase text-studio-darkmuted tracking-wider">
              SAN3A CREATIVE TECHNOLOGY // EST. 2026
            </div>
          </div>

          {/* Col 2: Navigation Columns (4 Cols) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <span className="font-mono text-[11px] uppercase tracking-widest text-studio-fg block font-semibold">
                INDEX
              </span>
              <ul className="space-y-2.5 text-xs">
                {[
                  { name: 'Home', href: '/' },
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

            <div className="space-y-4">
              <span className="font-mono text-[11px] uppercase tracking-widest text-studio-fg block font-semibold">
                SERVICES
              </span>
              <ul className="space-y-2.5 text-xs text-studio-muted">
                <li><Link href="/services/web-development" className="hover:text-studio-fg transition-colors">Web Development</Link></li>
                <li><Link href="/services/mobile-development" className="hover:text-studio-fg transition-colors">Mobile Apps</Link></li>
                <li><Link href="/services/ui-ux-design" className="hover:text-studio-fg transition-colors">UI / UX Design</Link></li>
                <li><Link href="/services/branding" className="hover:text-studio-fg transition-colors">Branding</Link></li>
                <li><Link href="/services/custom-software" className="hover:text-studio-fg transition-colors">Custom Software</Link></li>
              </ul>
            </div>
          </div>

          {/* Col 3: Social & Admin Portal Link (3 Cols) */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-studio-fg block font-semibold">
              SYSTEM
            </span>
            <ul className="space-y-2.5 text-xs">
              {[
                { name: 'Twitter / X', url: '#' },
                { name: 'GitHub', url: '#' },
                { name: 'LinkedIn', url: '#' },
                { name: 'Admin Portal', url: '/admin' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="hover:text-studio-fg transition-colors duration-200 flex items-center justify-between group"
                  >
                    <span>{link.name}</span>
                    <span className="font-mono text-[10px] text-studio-darkmuted group-hover:text-studio-accent transition-colors">
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-studio-muted gap-4">
          <div>
            © {new Date().getFullYear()} SAN3A. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-6">
            <span>SAN3A DIGITAL</span>
            <span>//</span>
            <span>INTENTION & CRAFT</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
