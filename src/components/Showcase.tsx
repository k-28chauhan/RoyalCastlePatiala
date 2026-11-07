import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, reduceMotion } from '../lib/gsap'
import { showcase } from '../data/content'

const INTERVAL = 3000 // ms between photo changes

/**
 * One static section: a tilted frame straightens as it scrolls in, and the photos behind
 * the card change on their own (wipe up) while the card stays put.
 */
export default function Showcase() {
  const ref = useRef<HTMLElement>(null)
  const inView = useRef(false)

  useGSAP(() => {
    if (reduceMotion) return
    gsap.fromTo('.sc-frame', { rotateX: 38, rotateZ: -3, scale: 0.78, yPercent: 15 }, {
      rotateX: 0, rotateZ: 0, scale: 1, yPercent: 0, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'top top', scrub: true },
    })
    gsap.from('.sc-card', {
      autoAlpha: 0, y: 60, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top 60%', end: 'top 20%', scrub: true },
    })
    ScrollTrigger.create({
      trigger: ref.current, start: 'top 80%', end: 'bottom 20%',
      onToggle: (self) => { inView.current = self.isActive },
    })
  }, { scope: ref })

  // Auto-advance: the next photo wipes up over the current one. Paused while off-screen.
  useEffect(() => {
    if (reduceMotion) return
    const layers = Array.from(ref.current!.querySelectorAll<HTMLElement>('.sc-layer'))
    let current = 0
    let z = 1
    const id = window.setInterval(() => {
      if (!inView.current) return
      current = (current + 1) % layers.length
      const layer = layers[current]
      gsap.set(layer, { zIndex: ++z, clipPath: 'inset(100% 0% 0% 0%)' })
      gsap.to(layer, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' })
      gsap.fromTo(layer.querySelector('img'), { scale: 1.25 }, { scale: 1.05, duration: 2.4, ease: 'power2.out' })
    }, INTERVAL)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section ref={ref} className="grid min-h-screen place-items-center overflow-hidden bg-beige py-[6vh]">
      <div className="relative grid w-full place-items-center perspective-[1400px]">
        <div className="sc-frame relative h-[70vh] w-[92vw] origin-bottom will-change-transform sm:h-[82vh] sm:w-[80vw]">
          {showcase.images.map((im, i) => (
            <div key={im.src} style={{ zIndex: i === 0 ? 1 : 0 }} className={`sc-layer absolute inset-0 overflow-hidden ${i === 0 ? '' : '[clip-path:inset(100%_0_0_0)]'}`}>
              <img src={im.src} alt={im.alt} style={{ objectPosition: im.pos }} className="scale-105" />
            </div>
          ))}
        </div>

        <div className="sc-card absolute z-10 border border-white/30 p-6">
          <div className="relative flex w-[min(440px,76vw)] flex-col items-center justify-center bg-white px-8 py-[56px] text-center shadow-[0_20px_60px_rgba(0,0,0,.12)]">
            <span aria-hidden="true" className="pointer-events-none absolute inset-[26px] border border-ink/15" />
            <ul>
              {showcase.features.map((f) => (
                <li key={f} className="font-serif text-[clamp(15px,1.4vw,24px)] leading-[2.2] text-ink">{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
