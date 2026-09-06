'use client'

import { useLanguage } from '@/context/LanguageContext'
import PaizoImage from './PaizoImage'

export default function PaizoMarquee() {
  const { isRTL } = useLanguage()

  const row1Assets = [
    { src: 'https://res.cloudinary.com/no25n6db/image/upload/v1788725850/st_mime_w8covz.png', title: 'ST / S.T MIME', titleAr: 'إس تي ميم' },
    { src: 'https://res.cloudinary.com/no25n6db/image/upload/v1788726057/liveit_1_tfcpja.png', title: 'Levit — Session 1', titleAr: 'ليفيت — الفعالية ١' },
    { src: 'https://res.cloudinary.com/no25n6db/image/upload/v1788726020/tako_mkejzg.jpg', title: 'TAKO Speed Challenge', titleAr: 'تاكو — تحدي السرعة' },
    { src: 'https://res.cloudinary.com/no25n6db/image/upload/v1788726067/liveit_7_rbsdrq.png', title: 'Levit — Session 2', titleAr: 'ليفيت — الفعالية ٢' },
    { src: 'https://res.cloudinary.com/no25n6db/image/upload/v1788726029/bible_mime_v6aom7.png', title: 'Bible Mime', titleAr: 'ميم الكتاب المقدس' },
    { src: 'https://res.cloudinary.com/no25n6db/image/upload/v1788726068/liveit_5_f4529l.png', title: 'Levit — Session 3', titleAr: 'ليفيت — الفعالية ٣' },
  ]

  const row2Assets = [
    { src: 'https://res.cloudinary.com/no25n6db/image/upload/v1788726042/team_work_game_pr1prg.jpg', title: 'Team Work Game', titleAr: 'لعبة العمل الجماعي' },
    { src: 'https://res.cloudinary.com/no25n6db/image/upload/v1788726069/liveit_6_wufnqn.png', title: 'Levit — Session 4', titleAr: 'ليفيت — الفعالية ٤' },
    { src: 'https://res.cloudinary.com/no25n6db/image/upload/v1788726056/liveit_4_xa4ha2.png', title: 'Levit Keynote', titleAr: 'ليفيت — الجلسة الرئيسية' },
    { src: 'https://res.cloudinary.com/no25n6db/image/upload/v1788726075/liveit_8_vlygdr.png', title: 'Levit — Session 5', titleAr: 'ليفيت — الفعالية ٥' },
    { src: 'https://res.cloudinary.com/no25n6db/image/upload/v1788726075/liveit_2_qdcrri.png', title: 'Levit — Session 6', titleAr: 'ليفيت — الفعالية ٦' },
    { src: 'https://res.cloudinary.com/no25n6db/image/upload/v1788726079/liveit_3_itbazf.png', title: 'Levit — Session 7', titleAr: 'ليفيت — الفعالية ٧' },
  ]

  return (
    <div className="w-full space-y-6 overflow-hidden py-4">
      {/* Row 1: Forward Marquee */}
      <div className="relative w-full overflow-hidden border-t border-b border-studio-border/60 py-3 bg-studio-surface/40">
        <div className="animate-marquee flex items-center gap-6">
          {[...row1Assets, ...row1Assets, ...row1Assets].map((item, idx) => {
            const itemTitle = isRTL ? item.titleAr : item.title
            return (
              <div
                key={`r1-${item.src}-${idx}`}
                className="relative w-64 sm:w-72 md:w-80 shrink-0 rounded-xl overflow-hidden shadow-lg border border-studio-border group hover:border-studio-accent transition-colors"
              >
                <PaizoImage
                  src={item.src}
                  alt={`PAIZO ${itemTitle}`}
                  fallbackTitle={itemTitle}
                  aspectRatioClass="aspect-[16/10]"
                  className="group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent font-mono text-[11px] text-studio-fg">
                  <span className="truncate block font-semibold">{itemTitle}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Row 2: Reverse Marquee */}
      <div className="relative w-full overflow-hidden border-t border-b border-studio-border/60 py-3 bg-studio-surface/40">
        <div className="animate-marquee flex items-center gap-6 [animation-direction:reverse]">
          {[...row2Assets, ...row2Assets, ...row2Assets].map((item, idx) => {
            const itemTitle = isRTL ? item.titleAr : item.title
            return (
              <div
                key={`r2-${item.src}-${idx}`}
                className="relative w-64 sm:w-72 md:w-80 shrink-0 rounded-xl overflow-hidden shadow-lg border border-studio-border group hover:border-studio-accent transition-colors"
              >
                <PaizoImage
                  src={item.src}
                  alt={`PAIZO ${itemTitle}`}
                  fallbackTitle={itemTitle}
                  aspectRatioClass="aspect-[16/10]"
                  className="group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent font-mono text-[11px] text-studio-fg">
                  <span className="truncate block font-semibold">{itemTitle}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
