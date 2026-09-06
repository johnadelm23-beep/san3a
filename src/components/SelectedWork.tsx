'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowUpLeft, ExternalLink, Smartphone, Globe, ShoppingBag, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function SelectedWork() {
  const { t, isRTL } = useLanguage()

  const egtma3naScreenshots = [
    { src: '/projects/home_egtma3na.jpeg', title: 'Home Dashboard' },
    { src: '/projects/dayCotent_egtma3na.jpeg', title: 'Daily Content' },
    { src: '/projects/exam_egtma3na.jpeg', title: 'Exams & Quizzes' },
    { src: '/projects/profile_egtma3na.jpeg', title: 'User Profile' },
    { src: '/projects/qr_egtma3na.jpeg', title: 'QR Attendance' },
  ]

  const [activeScreenIndex, setActiveScreenIndex] = useState(0)

  // Real projects list — filtering to include ONLY projects with valid real image assets
  const otherProjects = [
    {
      title: t.projects.san3aOsTitle,
      category: t.projects.san3aOsTag,
      description: t.projects.san3aOsDesc,
      image: '/projects/san3a.jpeg',
      tags: ['Next.js', 'Supabase', 'Framer Motion'],
      year: '2026',
    },
  ]

  const ActionIcon = isRTL ? ArrowUpLeft : ArrowUpRight

  return (
    <section id="work" className="py-24 md:py-36 border-b border-studio-border bg-studio-bg relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-studio-border pb-8 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-studio-muted border-l border-studio-accent pl-3 block mb-2 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-3">
              {t.projects.tag}
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-studio-fg">
              {t.projects.title}
            </h2>
          </div>
          <p className="text-sm text-studio-muted max-w-md">
            {t.projects.subtitle}
          </p>
        </div>

        {/* ==================================================================== */}
        {/* 1. FEATURED PROJECT #1: EGTMA3NA (ANIMATED MULTI-SCREENSHOT MARQUEE) */}
        {/* ==================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border border-studio-border bg-studio-surface p-6 sm:p-10 md:p-14 relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info Column (5 cols) */}
            <div className="lg:col-span-5 space-y-8 z-10">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-studio-accent border border-studio-border px-3 py-1.5 bg-studio-bg">
                <Smartphone className="w-4 h-4" />
                <span>{t.projects.featuredApp}</span>
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-studio-fg">
                  {t.projects.egtma3naTitle}
                </h3>
                <p className="text-base sm:text-lg text-studio-muted leading-relaxed font-normal">
                  {t.projects.egtma3naDesc}
                </p>
              </div>

              {/* Technologies Badges */}
              <div className="space-y-3 pt-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-studio-darkmuted block">
                  // TECH STACK
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Flutter', 'Firebase', 'Real-time', 'Offline'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 border border-studio-border font-mono text-xs text-studio-fg bg-studio-bg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Screenshot Controls / Selector */}
              <div className="space-y-3 border-t border-studio-border pt-6 font-mono text-xs">
                <span className="text-studio-muted block text-[11px] uppercase tracking-wider">
                  {t.projects.interactiveScreenshots}
                </span>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {egtma3naScreenshots.map((screen, idx) => (
                    <button
                      key={screen.src}
                      onClick={() => setActiveScreenIndex(idx)}
                      className={`px-2.5 py-1.5 text-[11px] border transition-all whitespace-nowrap ${
                        activeScreenIndex === idx
                          ? 'border-studio-accent bg-studio-accent/10 text-studio-fg font-bold'
                          : 'border-studio-border text-studio-muted hover:text-studio-fg'
                      }`}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Interactive Animated Marquee & Phone Showcase (7 cols) */}
            <div className="lg:col-span-7 relative flex flex-col items-center justify-center space-y-6">
              
              {/* Active Screen Device Mockup */}
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/18] rounded-[2.5rem] border-[6px] border-[#222222] bg-black shadow-2xl overflow-hidden p-2 group hover:scale-[1.02] transition-transform duration-500">
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#222222] rounded-full z-20" />
                
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-black">
                  <Image
                    src={egtma3naScreenshots[activeScreenIndex].src}
                    alt={egtma3naScreenshots[activeScreenIndex].title}
                    fill
                    sizes="320px"
                    className="object-cover transition-opacity duration-300"
                    priority
                  />
                </div>
              </div>

              {/* Continuous Auto-Scrolling Screenshots Marquee Ribbon */}
              <div className="w-full overflow-hidden border border-studio-border bg-studio-bg/80 py-3 relative">
                <div className="animate-marquee flex items-center gap-4">
                  {[...egtma3naScreenshots, ...egtma3naScreenshots].map((screen, idx) => (
                    <div
                      key={`${screen.src}-${idx}`}
                      onClick={() => setActiveScreenIndex(idx % egtma3naScreenshots.length)}
                      className="relative w-20 h-36 shrink-0 border border-studio-border overflow-hidden cursor-pointer hover:border-studio-accent transition-colors"
                    >
                      <Image
                        src={screen.src}
                        alt={screen.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </motion.div>

        {/* ==================================================================== */}
        {/* 2. FEATURED PROJECT #2: THE HAMMER (BROWSER MOCKUP SHOWCASE) */}
        {/* ==================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border border-studio-border bg-studio-surface p-6 sm:p-10 md:p-14 relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Content Details Column (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-studio-accent border border-studio-border px-3 py-1.5 bg-studio-bg">
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t.projects.digitalCommerce}</span>
                </span>
                
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-emerald-400 border border-studio-border px-2.5 py-1 bg-emerald-950/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t.projects.deployedLive}</span>
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-studio-fg">
                  {t.projects.theHammerTitle}
                </h3>
                <p className="text-base text-studio-muted leading-relaxed font-normal">
                  {t.projects.theHammerDesc}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-studio-darkmuted block">
                  // TECH & ARCHITECTURE
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Digital Commerce', 'Industrial Motors', 'Multilingual', 'Next.js'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 border border-studio-border font-mono text-xs text-studio-fg bg-studio-bg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Live Website Link Button */}
              <div className="pt-4 border-t border-studio-border">
                <a
                  href="https://thehammer.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-studio-fg text-studio-bg px-7 py-4 text-xs uppercase tracking-widest font-extrabold border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all duration-300 font-mono"
                >
                  <span>{t.projects.visitWebsite}</span>
                  <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Browser Screenshot Mockup Frame (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="border border-studio-border bg-[#0D0D0D] rounded-t-lg overflow-hidden shadow-2xl group hover:border-studio-accent/60 transition-colors duration-500">
                
                {/* Browser Header Bar */}
                <div className="bg-[#181818] px-4 py-3 flex items-center justify-between border-b border-studio-border font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  </div>

                  <div className="bg-black/60 border border-studio-border px-4 py-1 text-[11px] text-studio-muted rounded max-w-xs truncate font-mono">
                    https://thehammer.uk
                  </div>

                  <Globe className="w-4 h-4 text-studio-muted" />
                </div>

                {/* Screenshot Image with subtle hover zoom */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <Image
                    src="/projects/thehammer.png"
                    alt="The Hammer Industrial Motors Digital Commerce Platform"
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    priority
                  />
                </div>

              </div>
            </div>

          </div>
        </motion.div>

        {/* ==================================================================== */}
        {/* 3. FEATURED PROJECT #3: SAINT JOHN YOUTH MEETING (BROWSER MOCKUP) */}
        {/* ==================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border border-studio-border bg-studio-surface p-6 sm:p-10 md:p-14 relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Browser Screenshot Mockup Frame (7 cols) */}
            <div className="lg:col-span-7 space-y-3 order-2 lg:order-1">
              <div className="border border-studio-border bg-[#0D0D0D] rounded-t-lg overflow-hidden shadow-2xl group hover:border-studio-accent/60 transition-colors duration-500">
                
                {/* Browser Header Bar */}
                <div className="bg-[#181818] px-4 py-3 flex items-center justify-between border-b border-studio-border font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  </div>

                  <div className="bg-black/60 border border-studio-border px-4 py-1 text-[11px] text-studio-muted rounded max-w-xs truncate font-mono">
                    https://saint-john.vercel.app
                  </div>

                  <Globe className="w-4 h-4 text-studio-muted" />
                </div>

                {/* Screenshot Image with subtle hover zoom */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <Image
                    src="/projects/saint_john_site.png"
                    alt="St. John the Beloved Youth Meeting Website"
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                </div>

              </div>
            </div>

            {/* Content Details Column (5 cols) */}
            <div className="lg:col-span-5 space-y-8 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-400 border border-studio-border px-3 py-1.5 bg-studio-bg">
                <Globe className="w-4 h-4" />
                <span>{t.projects.webPlatform}</span>
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-studio-fg">
                  {t.projects.saintJohnTitle}
                </h3>
                <p className="text-base text-studio-muted leading-relaxed">
                  {t.projects.saintJohnDesc}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-studio-darkmuted block">
                  // STACK
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'React', 'Tailwind CSS', 'Vercel'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 border border-studio-border font-mono text-xs text-studio-fg bg-studio-bg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Live Website Link Button */}
              <div className="pt-4 border-t border-studio-border">
                <a
                  href="https://saint-john.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-studio-fg text-studio-bg px-7 py-4 text-xs uppercase tracking-widest font-extrabold border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all duration-300 font-mono"
                >
                  <span>{t.projects.visitWebsite}</span>
                  <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

            </div>

          </div>
        </motion.div>

        {/* ==================================================================== */}
        {/* 4. OTHER REAL PROJECTS GRID (FILTERED FOR VALID IMAGE ASSETS) */}
        {/* ==================================================================== */}
        {otherProjects.length > 0 && (
          <div className="space-y-12">
            <div className="flex items-center justify-between border-b border-studio-border pb-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-studio-fg">
                {isRTL ? 'أنظمة واستوديوهات أخرى' : 'Studio Architecture & Systems'}
              </h3>
              <span className="font-mono text-xs text-studio-muted">[ REAL ASSETS ]</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherProjects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="border border-studio-border bg-studio-surface p-6 space-y-6 group hover:border-studio-border-light transition-colors duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    {/* Image container with hover zoom */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden border border-studio-border bg-black">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-studio-accent font-bold uppercase tracking-wider">
                          {project.category}
                        </span>
                        <span className="text-studio-muted">{project.year}</span>
                      </div>

                      <h4 className="text-2xl font-bold tracking-tight text-studio-fg group-hover:text-white transition-colors">
                        {project.title}
                      </h4>

                      <p className="text-sm text-studio-muted leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-studio-border space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 border border-studio-border font-mono text-[10px] text-studio-fg bg-studio-bg">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Link to Full Work Page */}
            <div className="pt-8 text-center">
              <Link
                href="/work"
                className="group inline-flex items-center gap-3 bg-transparent text-studio-fg px-8 py-4 text-xs uppercase tracking-widest font-extrabold border border-studio-border hover:border-studio-fg transition-all duration-300 font-mono"
              >
                <span>{t.projects.viewAllWork}</span>
                <ActionIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
