import { useRef } from 'react'
import { gsap, useGSAP, reduceMotion } from '../lib/gsap'
import { media } from '../data/content'
import { Chars, Crest } from './ui'

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)

  // Intro plays once the loader has wiped away.
  useGSAP(() => {
    if (!ready) {
      gsap.set('.char', { yPercent: 110 })
      gsap.set('.hero-fade', { autoAlpha: 0, y: 20 })
      return
    }
    gsap.timeline()
      .from('.hero-video', { scale: 1.25, duration: 2.2, ease: 'expo.out' })
      .to('.char', { yPercent: 0, duration: 1.2, stagger: 0.04, ease: 'expo.out' }, 0.1)
      .to('.hero-fade', { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }, 0.4)
  }, { scope: ref, dependencies: [ready] })

  // Parallax out on scroll.
  useGSAP(() => {
    if (reduceMotion) return
    const st = { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true }
    gsap.to('.hero-content', { yPercent: 35, opacity: 0, ease: 'none', scrollTrigger: st })
    gsap.to('.hero-media', { yPercent: 20, scale: 1.08, ease: 'none', scrollTrigger: st })
  }, { scope: ref })

  return (
    <section ref={ref} className="relative h-svh min-h-[560px] overflow-hidden text-white">
      <div className="hero-media absolute inset-0 after:absolute after:inset-0 after:bg-linear-to-b after:from-maroon-deep/55 after:via-maroon-deep/35 after:to-[#1e0a0c]/70">
        <video className="hero-video" src={media.heroVideo} poster={media.hall2} autoPlay muted loop playsInline />
      </div>

      <div className="hero-content relative z-10 flex h-full flex-col items-center justify-center gap-[18px] px-gutter text-center">
        <Crest className="hero-fade size-14" />
        <p className="hero-fade eyebrow">Resort · Marriage Palace · Restaurant</p>
        <h1 className="overflow-hidden pb-[.08em] font-serif text-[clamp(56px,10vw,160px)] font-light leading-[.95]">
          <Chars text="Royal Castle" />
        </h1>
        <p className="hero-fade max-w-[440px] text-[13px] tracking-[.04em] opacity-85">
          Where every celebration becomes a memory.
          <br />
          Stay, dine and celebrate, all on one estate.
        </p>
      </div>

      <div className="hero-fade absolute bottom-8 left-(--gutter) z-10 grid size-[92px] place-items-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 animate-[spin-slow_16s_linear_infinite]">
          <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" fill="none" />
          <text className="fill-white text-[8.4px] tracking-[.2em]">
            <textPath href="#circ">SCROLL · DISCOVER · SCROLL · DISCOVER ·</textPath>
          </text>
        </svg>
        <span>↓</span>
      </div>
    </section>
  )
}
