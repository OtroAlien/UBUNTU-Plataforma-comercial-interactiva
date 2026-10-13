export type Business = {
  id: string
  name: string
  category: string
  locality: string
  description: string
  image: string
  imageAlt: string
  keywords?: string[]
}

export const localities = ['Todas las localidades', 'Rafael Calzada', 'Adrogué', 'Burzaco', 'José Mármol', 'Longchamps'] as const

export const categories = [
  { label: 'Gastronomía', icon: 'coffee' },
  { label: 'Indumentaria', icon: 'shirt' },
  { label: 'Peluquería', icon: 'scissors' },
  { label: 'Fletes', icon: 'truck' },
  { label: 'Sublimación', icon: 'sparkles' },
  { label: 'Eventos', icon: 'party' },
  { label: 'Hogar y jardín', icon: 'plant' },
] as const

export const businesses: Business[] = [
  {
    id: 'cafe-esquina',
    name: 'Café de la Esquina',
    category: 'Gastronomía',
    locality: 'Adrogué',
    description: 'Café de especialidad, medialunas recién hechas y encuentros sin apuro.',
    image: '/images/cafe.webp',
    imageAlt: 'Café servido en un mostrador de barrio',
  },
  {
    id: 'vivero-sur',
    name: 'Vivero Sur',
    category: 'Hogar y jardín',
    locality: 'Rafael Calzada',
    description: 'Un rincón verde con plantas, flores y regalos para cada ocasión.',
    image: '/images/vivero.webp',
    imageAlt: 'Flores y plantas en un comercio local',
  },
  {
    id: 'estampa-barrial',
    name: 'Estampa Barrial',
    category: 'Sublimación',
    locality: 'Burzaco',
    description: 'Remeras, tazas y objetos personalizados con ideas propias.',
    image: '/images/estampa.webp',
    imageAlt: 'Taller de estampado de remeras',
    keywords: ['Indumentaria', 'Remeras personalizadas'],
  },
  {
    id: 'corte-urbano',
    name: 'Corte Urbano',
    category: 'Peluquería',
    locality: 'José Mármol',
    description: 'Un espacio para renovar tu estilo con atención cercana.',
    image: '/images/peluqueria.webp',
    imageAlt: 'Servicio de peluquería en un salón de barrio',
  },
  {
    id: 'fletes-del-sur',
    name: 'Fletes del Sur',
    category: 'Fletes',
    locality: 'Longchamps',
    description: 'Traslados y pequeñas mudanzas en Zona Sur.',
    image: '/images/fletes.webp',
    imageAlt: 'Flete de barrio cargando una camioneta',
  },
  {
    id: 'patio-fiesta',
    name: 'Patio Fiesta',
    category: 'Eventos',
    locality: 'Rafael Calzada',
    description: 'Celebraciones íntimas en un salón cálido y flexible.',
    image: '/images/eventos.webp',
    imageAlt: 'Salón de eventos preparado para una celebración',
  },
]

export function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es-AR').trim()
}
