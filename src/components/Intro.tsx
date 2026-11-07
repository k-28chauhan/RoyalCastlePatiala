import { useRef } from 'react'
import { gsap, useGSAP, reduceMotion } from '../lib/gsap'
import { Marker, Pill, Words } from './ui'

const text =
  'A stay at Royal Castle means every moment is looked after. Celebrate in our grand palace, unwind on green lawns and dine like royalty.'

/** Paragraph whose words fill from grey to ink as it scrolls through. */
export default function Intro() {
  const ref = useRef<HTMLParagraphElement>(null)
  useGSAP(() => {
    if (reduceMotion) return
    gsap.fromTo('.word', { opacity: 0.12 }, {
      opacity: 1, stagger: 0.08, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'bottom 45%', scrub: true },
    })
  }, { scope: ref })

  return (
    <section id="about" className="flex min-h-[90vh] flex-col items-center justify-center gap-10 px-gutter py-[120px] text-center">
      <Marker>I</Marker>
      <p ref={ref} className="max-w-[900px] font-serif text-[clamp(26px,3.2vw,46px)] font-normal leading-[1.3]">
        <Words text={text} />
      </p>
      <Pill href="#stay" cursor="Explore" className="reveal-up">The estate</Pill>
    </section>
  )
}
