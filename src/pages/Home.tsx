import { useOutletContext } from 'react-router-dom'
import type { LayoutContext } from '../components/Layout'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Showcase from '../components/Showcase'
import Stay from '../components/Stay'
import Banner from '../components/Banner'
import Celebrations from '../components/Celebrations'
import Resort from '../components/Resort'
import Dining from '../components/Dining'
import Events from '../components/Events'
import Gallery from '../components/Gallery'
import Contact from '../components/Contact'

export default function Home() {
  const { loaded } = useOutletContext<LayoutContext>()
  return (
    <>
      <Hero ready={loaded} />
      <Intro />
      <Showcase />
      <Stay />
      <Banner />
      <Celebrations />
      <Resort />
      <Dining />
      <Events />
      <Gallery />
      <Contact />
    </>
  )
}
