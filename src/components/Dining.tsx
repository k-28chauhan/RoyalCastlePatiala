import { useRef, useState } from 'react'
import { ScrollTrigger, useGSAP } from '../lib/gsap'
import { dining } from '../data/content'
import { Pill, SectionHead } from './ui'

/** Sticky photo on the left wipes to the next image as each dining option scrolls past. */
export default function Dining() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(() => {
    ref.current!.querySelectorAll('.dish').forEach((dish, i) => {
      ScrollTrigger.create({ trigger: dish, start: 'top 60%', end: 'bottom 60%', onToggle: (self) => self.isActive && setActive(i) })
    })
  }, { scope: ref })

  return (
    <section id="dining" ref={ref} className="py-40">
      <SectionHead marker="V" eyebrow="Gastronomy" lines={[{ text: 'Exceptional food' }, { text: 'in royal surroundings', em: true }]} />
      <div className="mx-auto mt-[100px] grid max-w-[1100px] gap-[clamp(32px,8vw,120px)] px-gutter md:grid-cols-2">
        <div>
          <div className="sticky top-[70px] aspect-4/3 overflow-hidden md:top-[12vh] md:aspect-3/4">
            {dining.images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                className={`absolute inset-0 transition-[clip-path] duration-1100 ease-lux ${i <= active ? '[clip-path:inset(0)]' : '[clip-path:inset(0_0_100%_0)]'}`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <p className="mb-10 max-w-[360px] text-left text-sm md:mb-[30vh]">{dining.lead}</p>
          {dining.items.map((d) => (
            <div key={d.title} className="dish flex min-h-[40vh] flex-col items-center justify-center gap-2 after:mt-6 after:h-px after:w-10 after:bg-ink/20 md:min-h-[50vh]">
              <span className="text-xl text-gold">{d.icon}</span>
              <h3 className="font-serif text-[28px] font-normal">{d.title}</h3>
              <p className="text-xs text-muted">{d.text}</p>
            </div>
          ))}
          <Pill href="#contact">See the menu</Pill>
        </div>
      </div>
    </section>
  )
}
