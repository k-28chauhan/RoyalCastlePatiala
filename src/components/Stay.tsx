import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useScrollTo } from '../hooks/useLenis'
import { stayTypes } from '../data/content'
import { Marker, Pill } from './ui'

const FOLLOW_X = 0.45 // how far the photo is pulled from its column toward the cursor
const FOLLOW_Y = 0.35

/**
 * Room types in three fixed columns. Hovering one fades a photo in behind it (white label,
 * tinted background). The photo glides with a long, soft lag between the label and the cursor,
 * and crossfades to the next room photo when you move across.
 */
export default function Stay() {
  const scrollTo = useScrollTo()
  const ref = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const slideRef = useRef<HTMLDivElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const prev = useRef<number | null>(null)
  const move = useRef<{ x: (v: number) => void; y: (v: number) => void }>(null)
  const [hover, setHover] = useState<number | null>(null)
  const [shown, setShown] = useState(0) // last hovered index, keeps the photo while it fades out

  useEffect(() => {
    stayTypes.forEach((s) => { new Image().src = s.img })
  }, [])

  /** Where the photo should sit for a column: its centre, pulled toward the cursor. */
  const target = (col: number) => {
    const r = gridRef.current!.getBoundingClientRect()
    const centre = (col + 0.5) * (r.width / 3)
    return {
      x: centre + (mouse.current.x - r.left - centre) * FOLLOW_X,
      y: (mouse.current.y - r.top - r.height / 2) * FOLLOW_Y,
    }
  }

  useGSAP(() => {
    gsap.set(slideRef.current, { xPercent: -50, yPercent: -50 })
    move.current = {
      x: gsap.quickTo(slideRef.current, 'x', { duration: 1.3, ease: 'power3.out' }),
      y: gsap.quickTo(slideRef.current, 'y', { duration: 1.3, ease: 'power3.out' }),
    }
  }, { scope: ref })

  useGSAP(() => {
    const was = prev.current
    prev.current = hover
    if (hover === null) {
      gsap.to(fadeRef.current, { autoAlpha: 0, scale: 0.96, duration: 0.9, ease: 'power2.inOut' })
      return
    }
    const t = target(hover)
    if (was === null) gsap.set(slideRef.current, t) // appear in place, then ease in
    else { move.current?.x(t.x); move.current?.y(t.y) }
    gsap.to(fadeRef.current, { autoAlpha: 1, scale: 1, duration: 0.9, ease: 'power2.out' })
  }, { scope: ref, dependencies: [hover] })

  const onMove = (e: React.MouseEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY }
    if (hover === null) return
    const t = target(hover)
    move.current?.x(t.x)
    move.current?.y(t.y)
  }

  const enter = (i: number) => () => { setHover(i); setShown(i) }

  return (
    <section
      id="stay"
      ref={ref}
      style={{ backgroundColor: hover === null ? undefined : stayTypes[hover].bg }}
      className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-ivory px-gutter pt-[12vh] pb-[10vh] transition-colors duration-1200 ease-in-out"
    >
      <Marker>II</Marker>

      <div ref={gridRef} onMouseMove={onMove} onMouseLeave={() => setHover(null)} className="relative grid w-full grid-cols-3">
        <div ref={slideRef} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-0 z-10 aspect-square w-[min(34vw,62vh)]">
          <div ref={fadeRef} className="invisible size-full overflow-hidden opacity-0">
            {stayTypes.map((s, i) => (
              <img
                key={s.label}
                src={s.img}
                alt=""
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === shown ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>
        </div>

        {stayTypes.map((s, i) => (
          <a
            key={s.label}
            href={s.href}
            onClick={(e) => { e.preventDefault(); scrollTo(s.href) }}
            onMouseEnter={enter(i)}
            onFocus={enter(i)}
            onBlur={() => setHover(null)}
            className={`relative z-20 py-16 text-center font-serif text-[clamp(40px,5.8vw,104px)] font-light leading-[1.05] transition-colors duration-700 ease-in-out ${i === hover ? 'text-white' : 'text-muted'}`}
          >
            {s.label}
          </a>
        ))}
      </div>

      <Pill href="/rooms" className="reveal-up">Accommodation</Pill>
    </section>
  )
}
