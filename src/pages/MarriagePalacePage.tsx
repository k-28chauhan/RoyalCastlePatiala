import PageIntro from '../components/PageIntro'
import FeatureCards, { type FeatureCard } from '../components/FeatureCards'
import PhotoWall from '../components/PhotoWall'
import Contact from '../components/Contact'
import { palaceGallery, palaceIntro, palaceSpaces } from '../data/content'

const cards: FeatureCard[] = palaceSpaces.map((s) => ({ title: s.title, tag: s.tag, stats: [[...s.stats[0]], [...s.stats[1]]] as FeatureCard['stats'], img: s.img, pos: 'pos' in s ? s.pos : undefined }))

export default function MarriagePalacePage() {
  return (
    <>
      <PageIntro images={palaceIntro} title="The Marriage Palace" crumbs={['Home', 'Celebrations', 'Marriage Palace']} next="#cards" />
      <FeatureCards marker="I" eyebrow="Explore" lines={[{ text: 'Spaces made for' }, { text: 'every ceremony', em: true }]} cards={cards} />
      <PhotoWall title="Gallery Palace" photos={palaceGallery} />
      <Contact />
    </>
  )
}
