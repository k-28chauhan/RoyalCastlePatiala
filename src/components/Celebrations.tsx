import { useRef } from 'react'
import { gsap, useGSAP, reduceMotion } from '../lib/gsap'
import { venues } from '../data/content'
import { Pill } from './ui'

/** Venue cards scroll sideways while the section is pinned (desktop); swipeable row on mobile. */
export default function Celebrations() {
  const ref = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (reduceMotion) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 901px)', () => {
      const track = trackRef.current!
      const dist = () => track.scrollWidth - window.innerWidth
      gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top top', end: () => `+=${dist()}`, pin: '.cel-pin', scrub: 0.8, invalidateOnRefresh: true },
      })
        .to(track, { x: () => -dist(), ease: 'none' }, 0)
        .fromTo('.cel-bg', { xPercent: 0 }, { xPercent: -30, ease: 'none' }, 0)
        .to('.cel-progress', { scaleX: 1, ease: 'none' }, 0)
    })
  }, { scope: ref })

  return (
    <section id="celebrations" ref={ref} className="overflow-hidden bg-sand">
      <div className="cel-pin relative flex flex-col justify-center gap-12 py-[100px] min-[901px]:h-screen min-[901px]:py-0">
        <span className="cel-bg pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap font-serif text-[clamp(120px,22vw,340px)] font-light leading-none text-white/35">
          Celebrations
        </span>
        <h2 className="heading relative">Venues &amp; celebrations</h2>
        <div
          ref={trackRef}
          className="relative flex snap-x snap-mandatory gap-6 overflow-x-auto px-gutter will-change-transform min-[901px]:w-max min-[901px]:overflow-visible"
        >
          {venues.map((v) => (
            <article
              key={v.title}
              className="group relative aspect-4/3 w-[80vw] shrink-0 snap-start overflow-hidden text-white after:absolute after:inset-0 after:bg-linear-to-b after:from-black/5 after:to-[#1e0a0c]/75 min-[901px]:w-[clamp(280px,34vw,520px)]"
            >
              <img src={v.img} alt="" className="transition-transform duration-1200 ease-lux group-hover:scale-106" />
              <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-2.5 p-7">
                <span className="eyebrow text-[9px] opacity-75">{v.tag}</span>
                <h3 className="font-serif text-[clamp(24px,2.4vw,34px)] font-normal leading-[1.1]">{v.title}</h3>
                <p className="max-w-[360px] text-[13px] opacity-85">{v.text}</p>
                <Pill href={v.href ?? '#contact'} variant="light" size="sm">{v.href ? 'Explore' : 'Enquire'}</Pill>
              </div>
            </article>
          ))}
        </div>
        <div className="relative mx-auto hidden h-px w-[min(60vw,600px)] bg-ink/15 min-[901px]:block">
          <i className="cel-progress absolute inset-0 origin-left scale-x-0 bg-ink" />
        </div>
      </div>
    </section>
  )
}
