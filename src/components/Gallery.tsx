import { useRef } from 'react'
import { gsap, useGSAP, reduceMotion } from '../lib/gsap'
import { galleryCols } from '../data/content'
import { SectionHead } from './ui'

/** Three columns drifting at different speeds; each photo wipes up on entry. */
export default function Gallery() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (reduceMotion) return
    gsap.utils.toArray<HTMLElement>('.gl-col').forEach((col) => {
      const s = Number(col.dataset.speed)
      gsap.fromTo(col, { y: -s }, { y: s, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    })
    gsap.utils.toArray<HTMLElement>('.gl-col img').forEach((img) => {
      gsap.from(img, { clipPath: 'inset(100% 0 0 0)', duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: img, start: 'top 90%' } })
    })
  }, { scope: ref })

  return (
    <section id="gallery" ref={ref} className="overflow-hidden pt-40 pb-[120px]">
      <SectionHead marker="VI" lines={[{ text: 'Gallery' }]} />
      <div className="mx-auto mt-20 grid max-w-[1200px] grid-cols-2 gap-5 px-gutter sm:grid-cols-3">
        {galleryCols.map((col, ci) => (
          <div key={ci} data-speed={col.speed} className={`gl-col flex flex-col gap-5 ${ci === 1 ? 'mt-[120px]' : ''} ${ci === 2 ? 'hidden sm:flex' : ''}`}>
            {col.images.map((src, i) => (
              <img key={i} src={src} alt="" className={`h-auto ${i === 1 ? 'aspect-square' : 'aspect-4/5'}`} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
