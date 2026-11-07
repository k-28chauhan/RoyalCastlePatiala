import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP, reduceMotion } from '../lib/gsap'
import { eventCards } from '../data/content'
import { Pill } from './ui'

const word = 'Weddings'

/**
 * A sticky stage holds a large tilted photo with a giant repeating word drifting across it.
 * Framed cards scroll up over the stage; the photo swaps as each card passes the centre.
 */
export default function Events() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(() => {
    ref.current!.querySelectorAll('.ev-card').forEach((card, i) => {
      ScrollTrigger.create({ trigger: card, start: 'top 55%', end: 'bottom 55%', onToggle: (self) => self.isActive && setActive(i) })
    })
    if (reduceMotion) return
    gsap.fromTo('.ev-frame', { rotateX: -30, scale: 0.85 }, {
      rotateX: 0, scale: 1, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'top top', scrub: true },
    })
    gsap.fromTo('.ev-marquee', { xPercent: 5 }, {
      xPercent: -45, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
    })
  }, { scope: ref })

  return (
    // Background is tweened on <main> by App (page tints to slate through this section)
    <section id="events" ref={ref} className={`relative ${reduceMotion ? 'bg-slate' : ''}`}>
      <div className="sticky top-0 z-10 h-screen overflow-hidden perspective-[1400px]">
        <div className="ev-frame absolute inset-x-[12.5vw] top-[12vh] bottom-[8vh] origin-top overflow-hidden">
          {eventCards.map((c, i) => (
            <img
              key={c.title}
              src={c.img}
              alt={c.title}
              className={`absolute inset-0 transition-[clip-path] duration-1100 ease-lux ${i <= active ? '[clip-path:inset(0)]' : '[clip-path:inset(0_0_100%_0)]'}`}
            />
          ))}
        </div>
        <div aria-hidden="true" className="ev-marquee pointer-events-none absolute top-1/2 left-0 z-20 -translate-y-1/2 whitespace-nowrap">
          <span className="font-serif text-[clamp(110px,15vw,240px)] font-light leading-none text-white/55">
            {Array.from({ length: 8 }, () => word).join('  ')}
          </span>
        </div>
      </div>

      {/* Cards overlap the stage above (-mt-screen) and scroll past it */}
      <div className="relative z-30 -mt-[100vh] flex justify-center pt-[75vh] pb-[45vh]">
        <div className="flex flex-col gap-[14vh] border border-white/30 p-3">
          {eventCards.map((c) => (
            <div key={c.title} className="ev-card relative flex aspect-square w-[min(405px,84vw)] flex-col items-center justify-center gap-6 bg-[#f2ece4] px-12 text-center shadow-[0_30px_60px_rgba(0,0,0,.15)]">
              <span aria-hidden="true" className="pointer-events-none absolute inset-3 border border-ink/10" />
              <h3 className="font-serif text-[clamp(30px,3vw,42px)] font-normal leading-[1.15]">{c.title}</h3>
              <p className="max-w-[300px] text-xs leading-relaxed text-ink">{c.text}</p>
              <Pill href="#contact" size="sm" className="px-10 py-4">More</Pill>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
