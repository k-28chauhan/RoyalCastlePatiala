import { useEffect, useRef } from 'react'
import { gsap, useGSAP, reduceMotion } from '../lib/gsap'
import { useScrollTo } from '../hooks/useLenis'
import { Chars } from './ui'

const INTERVAL = 3250 // ms between photos

export interface IntroImage { src: string; alt: string; pos?: string }

interface Props {
  images: IntroImage[]
  title: string
  /** Breadcrumb labels; the first links home. */
  crumbs: string[]
  /** Selector the down-arrow button scrolls to. */
  next: string
}

/**
 * Opening of a sub-page: full-screen photo with the title. Photos change on their own,
 * the next one wiping in from the right edge; no scrolling involved.
 */
export default function PageIntro({ images, title, crumbs, next }: Props) {
  const ref = useRef<HTMLElement>(null)
  const scrollTo = useScrollTo()

  useGSAP(() => {
    gsap.timeline({ delay: 0.2 })
      .from('.pi-char', { yPercent: 110, duration: 1.3, stagger: 0.04, ease: 'expo.out' })
      .from('.pi-fade', { autoAlpha: 0, y: 20, duration: 1, stagger: 0.12, ease: 'power3.out' }, 0.5)
      .from('.pi-first img', { scale: 1.25, duration: 2.2, ease: 'expo.out' }, 0)
    if (reduceMotion) return
    // Photos drift down slowly as you scroll away
    gsap.to('.pi-media', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
  }, { scope: ref })

  useEffect(() => {
    if (reduceMotion) return
    const layers = Array.from(ref.current!.querySelectorAll<HTMLElement>('.pi-layer'))
    let current = 0
    let z = 1
    const id = window.setInterval(() => {
      current = (current + 1) % layers.length
      const layer = layers[current]
      gsap.set(layer, { zIndex: ++z, clipPath: 'inset(0% 0% 0% 100%)' })
      gsap.to(layer, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' })
      gsap.fromTo(layer.querySelector('img'), { scale: 1.3, xPercent: 6 }, { scale: 1.05, xPercent: 0, duration: 2.6, ease: 'power2.out' })
    }, INTERVAL)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section ref={ref} className="relative h-svh min-h-[560px] overflow-hidden text-white">
      <div className="pi-media absolute inset-0">
        {images.map((im, i) => (
          <div
            key={im.src}
            style={{ zIndex: i === 0 ? 1 : 0 }}
            className={`pi-layer absolute inset-0 overflow-hidden ${i === 0 ? 'pi-first' : '[clip-path:inset(0_0_0_100%)]'}`}
          >
            <img src={im.src} alt={im.alt} style={{ objectPosition: im.pos }} className="scale-105" />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 z-[100] bg-linear-to-b from-[#1e0a0c]/50 via-[#1e0a0c]/25 to-[#1e0a0c]/55" />

      <nav aria-label="Breadcrumb" className="pi-fade absolute inset-x-0 top-[24vh] z-[101] hidden items-center justify-center gap-6 text-[11px] uppercase tracking-[.28em] md:flex">
        {crumbs.map((c, i) => (
          <span key={c} className="flex items-center gap-6">
            <button onClick={() => i === 0 && scrollTo('/')} className={i === crumbs.length - 1 ? 'font-medium' : 'cursor-pointer opacity-75'}>{c}</button>
            {i < crumbs.length - 1 && <i className="h-1.5 w-3 rounded-full border border-white/70" />}
          </span>
        ))}
      </nav>

      <div className="relative z-[101] flex h-full flex-col items-center justify-center px-gutter pt-[14vh] text-center">
        <h1 className="overflow-hidden pb-[.12em] font-serif text-[clamp(44px,8vw,140px)] font-normal leading-none">
          <Chars text={title} />
        </h1>
      </div>

      <button
        onClick={() => scrollTo(next)}
        aria-label="Scroll down"
        data-cursor="Scroll"
        className="pi-fade absolute bottom-[6vh] left-1/2 z-[101] grid h-[52px] w-[130px] -translate-x-1/2 cursor-pointer place-items-center rounded-full border border-white/50 bg-white/10 backdrop-blur-sm transition-colors duration-500 hover:bg-white/25"
      >
        <svg viewBox="0 0 12 8" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m1 1.5 5 5 5-5" /></svg>
      </button>
    </section>
  )
}
