import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'

/** Dot cursor that grows and shows a label over any `[data-cursor]` element. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches || !ref.current) return
    const x = gsap.quickTo(ref.current, 'x', { duration: 0.35, ease: 'power3' })
    const y = gsap.quickTo(ref.current, 'y', { duration: 0.35, ease: 'power3' })
    const move = (e: MouseEvent) => { x(e.clientX); y(e.clientY) }
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor]')
      setLabel(el?.dataset.cursor ?? null)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  const big = label !== null
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[90] grid place-items-center rounded-full transition-[width,height,margin,background-color] duration-400 ease-lux [@media(hover:none)]:hidden ${
        big ? '-m-[42px] size-[84px] bg-maroon/85' : '-m-[5px] size-2.5 bg-maroon'
      }`}
    >
      <span className={`text-[10px] uppercase tracking-[.18em] text-white transition-opacity ${big ? 'opacity-100' : 'opacity-0'}`}>{label}</span>
    </div>
  )
}
