'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, MessageSquare, Code, Palette, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function TeamSection() {
  const { t } = useLanguage()

  const team = [
    {
      name: t.team.johnName,
      role: t.team.johnRole,
      bio: t.team.johnBio,
      photo: '/projects/JohnPhoto.jpeg',
      icon: Code,
      phone: '01226806622',
      whatsapp: 'https://wa.me/201226806622',
      badge: 'Software Lead',
    },
    {
      name: t.team.georgeName,
      role: t.team.georgeRole,
      bio: t.team.georgeBio,
      photo: '/projects/george_photo.jpg',
      icon: Palette,
      phone: '+20 12 29518750',
      whatsapp: 'https://wa.me/201229518750',
      badge: 'Creative Lead',
    },
  ]

  return (
    <section id="team" className="py-24 md:py-36 border-b border-studio-border bg-studio-bg relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-studio-border pb-8 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-studio-muted border-l border-studio-accent pl-3 block mb-2 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-3">
              {t.team.tag}
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-studio-fg">
              {t.team.title}
            </h2>
          </div>
          <div className="font-mono text-xs text-studio-muted uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t.team.directAccess}</span>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {team.map((member, idx) => {
            const Icon = member.icon

            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="border border-studio-border bg-studio-surface p-6 sm:p-8 flex flex-col justify-between group hover:border-studio-border-light transition-all duration-300 relative"
              >
                <div className="space-y-6">
                  {/* Photo & Role Header */}
                  <div className="flex items-center gap-5 border-b border-studio-border pb-6">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-none border border-studio-border overflow-hidden bg-black group-hover:border-studio-accent transition-colors duration-300">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 96px, 120px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-studio-accent border border-studio-border px-2 py-0.5 bg-studio-bg">
                          {member.badge}
                        </span>
                        <Icon className="w-4 h-4 text-studio-muted" />
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-studio-fg">
                        {member.name}
                      </h3>

                      <p className="text-xs font-mono text-studio-muted uppercase tracking-wider">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {/* Short Business Bio */}
                  <p className="text-sm text-studio-muted leading-relaxed font-sans">
                    {member.bio}
                  </p>
                </div>

                {/* Direct Actions */}
                <div className="grid grid-cols-2 gap-3 pt-6 mt-6 border-t border-studio-border font-mono text-xs">
                  <a
                    href={`tel:${member.phone.replace(/\s+/g, '')}`}
                    className="flex items-center justify-center gap-2 p-2.5 border border-studio-border bg-studio-bg text-studio-fg hover:border-studio-fg hover:bg-studio-surface transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-studio-accent" />
                    <span>{t.team.call}</span>
                  </a>

                  <a
                    href={member.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 border border-studio-border bg-studio-bg text-emerald-400 hover:border-emerald-500/60 hover:bg-studio-surface transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{t.team.whatsapp}</span>
                  </a>
                </div>

              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
