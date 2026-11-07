import { useRef } from 'react'
import { gsap, useGSAP, reduceMotion } from '../lib/gsap'
import { Words } from './ui'

export interface WallPhoto { src: string; pos?: string }

/** Big title over a two-column photo wall; the right column sits half a photo lower. Each photo has a thin inset border. */
export default function PhotoWall({ title, photos }: { title: string; photos: WallPhoto[] }) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (reduceMotion) return
    gsap.from('.pw-title .word', { yPercent: 110, duration: 1.3, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: '.pw-title', start: 'top 85%' } })
    gsap.utils.toArray<HTMLElement>('.pw-photo').forEach((el) => {
      gsap.from(el, { clipPath: 'inset(100% 0 0 0)', duration: 1.5, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
      gsap.from(el.querySelector('img'), { scale: 1.3, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
    })
  }, { scope: ref })

  const col = (parity: number) => photos.filter((_, i) => i % 2 === parity)

  return (
    <section ref={ref} className="pt-20 pb-[200px]">
      <h2 className="pw-title px-gutter text-center font-serif text-[clamp(48px,7.5vw,150px)] font-medium leading-[1.05]">
        <Words text={title} />
      </h2>
      <div className="mx-auto mt-[clamp(60px,12vw,220px)] grid max-w-[1600px] gap-x-[clamp(24px,3.2vw,64px)] px-gutter md:grid-cols-2">
        {[0, 1].map((p) => (
          <div key={p} className={`flex flex-col gap-[clamp(24px,3.2vw,64px)] ${p === 1 ? 'md:mt-[min(11.8vw,236px)]' : ''}`}>
            {col(p).map((ph) => (
              <div key={ph.src} className="pw-photo relative aspect-[1.63] overflow-hidden">
                <img src={ph.src} alt="" style={{ objectPosition: ph.pos }} />
                <span aria-hidden="true" className="pointer-events-none absolute inset-[13px] border border-white/55" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
