import PageIntro from '../components/PageIntro'
import FeatureCards, { type FeatureCard } from '../components/FeatureCards'
import PhotoWall from '../components/PhotoWall'
import Contact from '../components/Contact'
import { roomGallery, rooms, roomsIntro } from '../data/content'

const cards: FeatureCard[] = rooms.map((r) => ({
  title: r.name,
  tag: r.pax,
  stats: [['Area', r.area.replace(' · ', ' + ')], ['Price', r.price]],
  img: r.img,
}))

export default function RoomsPage() {
  return (
    <>
      <PageIntro images={roomsIntro} title="Rooms made for rest" crumbs={['Home', 'Accommodation', 'Rooms']} next="#cards" />
      <FeatureCards marker="I" eyebrow="Choose" lines={[{ text: 'Comfortably furnished rooms' }, { text: 'for every guest', em: true }]} cards={cards} />
      <PhotoWall title="Gallery Rooms" photos={roomGallery} />
      <Contact />
    </>
  )
}
