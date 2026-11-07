import { useRef } from 'react'
import { gsap, useGSAP, reduceMotion } from '../lib/gsap'
import { media } from '../data/content'
import { Pill } from './ui'

export default function Banner() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (reduceMotion) return
    gsap.fromTo('.bn-media', { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    gsap.from('.bn-content > *', { autoAlpha: 0, y: 30, stagger: 0.12, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 60%' } })
  }, { scope: ref })

  return (
    <section ref={ref} className="relative grid h-[80vh] place-items-center overflow-hidden text-center text-white">
      <div className="bn-media absolute inset-x-0 -inset-y-[15%] after:absolute after:inset-0 after:bg-[#1e0a0c]/45">
        <img src={media.sunHaze} alt="Sunset over Royal Castle and its grounds" />
      </div>
      <div className="bn-content relative z-10 flex flex-col items-center gap-[22px] px-gutter">
        <span className="eyebrow">Royal Castle</span>
        <p className="max-w-[620px] font-serif text-[clamp(22px,2.6vw,36px)] leading-[1.3]">
          Take a break. Celebrate the people you love. Make it unforgettable.
        </p>
        <Pill href="#contact" variant="light">Reservations</Pill>
      </div>
    </section>
  )
}
