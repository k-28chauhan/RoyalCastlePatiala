import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { Crest } from './ui'

/** Counter preloader that wipes upward, then hands off to the hero intro. */
export default function Loader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const count = { v: 0 }
    gsap.timeline({ onComplete: onDone })
      .from('.loader-crest', { autoAlpha: 0, y: 20, duration: 0.8, ease: 'power3.out' })
      .to(count, {
        v: 100, duration: 1.6, ease: 'power2.inOut',
        onUpdate: () => { if (countRef.current) countRef.current.textContent = String(Math.round(count.v)) },
      }, 0)
      .to(ref.current, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '+=0.15')
  }, { scope: ref })

  return (
    <div ref={ref} aria-hidden="true" className="fixed inset-0 z-[100] grid place-items-center bg-maroon-deep text-sand [clip-path:inset(0)]">
      <div className="loader-crest flex flex-col items-center gap-4">
        <Crest className="size-[72px]" />
        <span className="font-serif text-[28px] uppercase tracking-[.3em]">Royal Castle</span>
      </div>
      <span ref={countRef} className="absolute bottom-8 right-(--gutter) font-serif text-[64px] font-light">0</span>
    </div>
  )
}
