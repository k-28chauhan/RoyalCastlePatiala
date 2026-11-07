// Site copy and media. Unsplash URLs are temporary placeholders until the client sends photos.
const img = (name: string) => `/assets/img/${name}`
const estate = (name: string) => `/assets/img/estate/${name}.jpg`
const palace = (name: string) => `/assets/img/palace/${name}.jpg`
const room = (name: string) => `/assets/img/rooms/${name}.jpg`
const unsplash = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80`

export const media = {
  heroVideo: '/assets/video/hero.mp4',
  hall1: img('hall-1.jpg'),
  hall2: img('hall-2.jpg'),
  hall3: img('hall-3.jpg'),
  hall4: img('hall-4.jpg'),
  exterior: img('exterior.jpg'),
  // client estate photos
  entrance: estate('entrance'),
  lobby: estate('lobby'),
  gardenPath: estate('garden-path'),
  fountain: estate('fountain'),
  courtyard: estate('courtyard'),
  sunHaze: estate('sun-haze'),
  sunsetCars: estate('sunset-cars'),
  sunsetGate: estate('sunset-gate'),
  sunsetLawn: estate('sunset-lawn'),
  // placeholders
  // client room photos
  room1: room('bed-yellow'),
  room2: room('bed-pink'),
  room3: room('bed-floral'),
  room4: room('bed-dark'),
  restaurant1: unsplash('1517248135467-4c7edcad34c4', 1600),
  restaurant2: unsplash('1414235077428-338989a2e8c0'),
  restaurant3: unsplash('1559339352-11d035aa65de'),
  pool1: unsplash('1571896349842-33c89424de2d', 1600),
  pool2: unsplash('1520250497591-112f2f40a3f4'),
  party: unsplash('1519167758481-83f550bb49b3'),
  lawn: unsplash('1464366400600-7168b8af9bc3'),
  wedding: unsplash('1511795409834-ef04bbd61622', 800),
}

export interface NavLink { label: string; href: string }

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Rooms', href: '/rooms' },
  { label: 'Marriage Palace', href: '/marriage-palace' },
  { label: 'Party Hall', href: '#celebrations' },
  { label: 'Resort', href: '#resort' },
  { label: 'Restaurant', href: '#dining' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export const menuLinks: NavLink[] = [
  { label: 'Rooms & Suites', href: '/rooms' },
  { label: 'Marriage Palace', href: '/marriage-palace' },
  { label: 'Party Hall', href: '#celebrations' },
  { label: 'Resort', href: '#resort' },
  { label: 'Restaurant', href: '#dining' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

export const showcase = {
  /** `pos` is the object-position used where a portrait photo is cropped into the wide frame. */
  images: [
    { src: media.hall2, alt: 'Marriage palace hall with chandeliers' },
    { src: media.entrance, alt: 'Royal Castle entrance lit up at dusk', pos: 'center 62%' },
    { src: media.hall3, alt: 'Floral arch walkway in the hall' },
    { src: media.lobby, alt: 'Reception lobby with carved staircase' },
    { src: media.gardenPath, alt: 'Garden path through the lawns' },
    { src: media.courtyard, alt: 'Fountain courtyard and play area' },
  ] as { src: string; alt: string; pos?: string }[],
  features: ['A grand marriage palace', 'A royal welcome', 'Floral celebrations', 'Multi-cuisine dining', 'A resort to unwind'],
}

export const stayTypes = [
  { label: 'Rooms', href: '/rooms', img: media.room1, bg: '#cfd8d6' },
  { label: 'Suites', href: '/rooms', img: media.room2, bg: '#ecdfd0' },
  { label: 'Marriage Palace', href: '/marriage-palace', img: palace('grand-hall'), bg: '#efd6d6' },
]

export interface Room { name: string; pax: string; area: string; price: string; img: string }

export const rooms: Room[] = [
  { name: 'Deluxe Room', pax: '2 guests', area: '28 m² · garden view', price: 'from ₹4,500', img: media.room1 },
  { name: 'Premium Room', pax: '2 + 1', area: '34 m² · balcony', price: 'from ₹6,000', img: media.room2 },
  { name: 'Family Suite', pax: '4 guests', area: '48 m² · lounge', price: 'from ₹9,500', img: media.room3 },
  { name: 'Royal Bridal Suite', pax: '2 guests', area: '60 m² · private dressing', price: 'from ₹14,000', img: media.room4 },
]

// Rooms page
export const roomsIntro = [
  { src: room('bed-pink'), alt: 'Deluxe room' },
  { src: room('bed-yellow'), alt: 'Premium room' },
  { src: room('bed-dark'), alt: 'Royal bridal suite' },
  { src: room('bed-floral'), alt: 'Family suite' },
]

/** `pos` is the object-position used when a portrait photo is cropped into the landscape tile. */
export const roomGallery: { src: string; pos?: string }[] = [
  { src: room('bed-pink') },
  { src: room('bath-tub') },
  { src: room('bed-yellow') },
  { src: room('bath-marble') },
  { src: room('bed-floral') },
  { src: room('bath-vanity'), pos: 'center 75%' },
  { src: room('desk') },
  { src: room('wardrobe'), pos: 'center 55%' },
  { src: room('bed-dark') },
]

// Marriage palace page
export const palaceIntro = [
  { src: palace('grand-hall'), alt: 'Grand hall with chandeliers' },
  { src: palace('hall-seating'), alt: 'Banquet seating facing the stage' },
  { src: palace('lounge'), alt: 'Lounge seating under a floral canopy' },
  { src: palace('hall-tables'), alt: 'Tables with floral centrepieces' },
  { src: palace('lawn-night'), alt: 'Lawn set up for an evening function' },
]

export const palaceSpaces = [
  { title: 'The Grand Hall', tag: 'Main hall', stats: [['Capacity', 'Up to 1,500 guests'], ['Setting', 'Chandeliers & floral canopy']], img: palace('grand-hall') },
  { title: 'Floral Walkway', tag: 'Grand entry', stats: [['Entry', 'Arches of flowers & foliage'], ['Best for', 'Baraat & receptions']], img: palace('arch-red'), pos: 'center 60%' },
  { title: 'Lounge & Dining', tag: 'Seating', stats: [['Seating', 'Sofa lounges & banquet tables'], ['Best for', 'Cocktails & dinner']], img: palace('lounge') },
  { title: 'Evening Lawn', tag: 'Open air', stats: [['Capacity', 'Lawn for 600 guests'], ['Setting', 'Lit trees, stage & live counters']], img: palace('lawn-night') },
] as const

/** `pos` is the object-position used when a portrait photo is cropped into the landscape tile. */
export const palaceGallery: { src: string; pos?: string }[] = [
  { src: palace('grand-hall') },
  { src: palace('hall-tables') },
  { src: palace('arch-leaf'), pos: 'center 45%' },
  { src: palace('lawn-night') },
  { src: palace('lounge') },
  { src: palace('arch-red'), pos: 'center 60%' },
  { src: palace('hall-seating') },
  { src: palace('garden-path-night'), pos: 'center 65%' },
  { src: palace('curtain-view'), pos: 'center 40%' },
]

export const venues = [
  { title: 'The Marriage Palace', tag: 'Up to 1500 guests', text: 'Crystal chandeliers, a floral ceiling and a stage worthy of the big day.', img: media.hall4, href: '/marriage-palace' },
  { title: 'Wedding Receptions', tag: 'Floral walkways', text: 'Flower arches, warm light and a long walk to remember.', img: media.hall3 },
  { title: 'The Party Hall', tag: 'Up to 300 guests', text: 'Birthdays, anniversaries, kitty parties: an intimate hall for every occasion.', img: media.party },
  { title: 'Engagements & Roka', tag: 'Ring ceremonies', text: 'Elegant settings for the beginning of forever.', img: media.hall1 },
  { title: 'Lawn Functions', tag: 'Open air', text: 'Sangeet, mehendi and day events under the open sky.', img: palace('lawn-night') },
]

export const resortPanels = [
  { title: ['Royal', 'entrance'], text: 'Lit up every evening, a warm welcome for every guest.', img: media.entrance },
  { title: ['Garden', 'walks'], text: 'Clipped hedges, palms and winding paths across the estate.', img: media.gardenPath, cta: true },
  { title: ['Golden', 'hour'], text: 'Sunsets over the fields, best watched from the lawns.', img: media.sunsetLawn, pos: 'center 55%' },
  { title: ['Play &', 'leisure'], text: "A kids' play zone and open spaces for the whole family.", video: media.heroVideo },
]

export const dining = {
  lead: 'Food is at the heart of every Indian celebration. Our chefs cook classic North Indian dishes, tandoor specials and international plates with fresh, seasonal ingredients, for a quiet dinner or a wedding feast for a thousand.',
  images: [media.restaurant1, media.restaurant2, media.restaurant3],
  items: [
    { icon: '❦', title: 'The Restaurant', text: 'Multi-cuisine · North Indian, Chinese, Continental' },
    { icon: '✧', title: 'Banquet Catering', text: 'Custom menus for weddings & events' },
    { icon: '❖', title: 'Garden Café', text: 'Chai, snacks and evenings on the lawn' },
  ],
}

export const eventCards = [
  { title: 'For families', text: 'From sagan to reception, we take care of décor, catering and stay so you can enjoy your day.', img: media.hall2 },
  { title: 'For companies', text: 'Conferences, award nights and offsites with rooms, food and AV all under one roof.', img: media.hall4 },
]

export const galleryCols = [
  { speed: -60, images: [media.hall1, media.entrance, media.fountain, media.sunsetGate] },
  { speed: 80, images: [media.hall2, media.lobby, media.hall3, media.sunsetCars] },
  { speed: -30, images: [media.hall4, media.gardenPath, media.exterior, media.courtyard] },
]

export const contact = {
  address: ['[Address line]', '[City, State, PIN]'],
  phone: '+91 00000 00000',
  email: 'info@royalcastle.in',
}
