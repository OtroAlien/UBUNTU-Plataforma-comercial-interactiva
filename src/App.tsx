import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Coffee,
  HeartHandshake,
  MapPin,
  Menu,
  Search,
  Scissors,
  Shirt,
  Sparkles,
  Sprout,
  Truck,
  X,
} from 'lucide-react'
import { Button } from './components/ui/button'
import { businesses, categories, localities, normalizeSearch, type Business } from './data/businesses'

const navigation = [
  { label: 'Explorar negocios', href: '#negocios' },
  { label: 'Categorías', href: '#categorias' },
  { label: 'Promociones', href: '#beneficios' },
  { label: 'Revista', href: '#revista' },
]

const categoryIcons = {
  coffee: Coffee,
  shirt: Shirt,
  scissors: Scissors,
  truck: Truck,
  sparkles: Sparkles,
  party: CalendarDays,
  plant: Sprout,
}

function scrollToSection(id: string) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
}

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.62, delay, ease: [0.2, 0.7, 0.1, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (value) => {
    const next = value > 24
    setScrolled((current) => current === next ? current : next)
  })

  return (
    <header className={scrolled ? 'site-header scrolled' : 'site-header'}>
      <div className="header-inner shell">
        <a className="brand" href="#inicio" aria-label="UBUNTU, ir al inicio" onClick={() => setMenuOpen(false)}>
          <img className="brand-logo" src="/images/ubuntu-seal.webp" alt="UBUNTU Sublimación" width="88" height="88" />
        </a>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>

        <div className="header-actions">
          <button className="header-search" aria-label="Ir al buscador" onClick={() => scrollToSection('buscador')}><Search size={20} strokeWidth={1.9} /></button>
          <Button asChild className="header-publish"><a href="#publica">Publicá tu negocio <ArrowUpRight size={17} /></a></Button>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegación móvil">
          {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={18} /></a>)}
          <a href="#publica" onClick={() => setMenuOpen(false)}>Publicá tu negocio<ArrowUpRight size={18} /></a>
        </nav>
      )}
    </header>
  )
}

function BusinessCard({ business, onOpen }: { business: Business; onOpen: (business: Business) => void }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.article className="business-card" initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: 12, transition: { duration: 0.18 } }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.62, ease: [0.2, 0.7, 0.1, 1] }}>
      <button className="business-card-link" type="button" onClick={() => onOpen(business)} aria-label={`Conocer ${business.name}`}>
        <div className="business-image-wrap">
          <img className="business-image" src={business.image} alt={business.imageAlt} loading="lazy" width="600" height="450" />
          <span className="card-arrow" aria-hidden="true"><ArrowUpRight size={22} /></span>
        </div>
        <div className="business-meta"><span>{business.category}</span><span><MapPin size={13} />{business.locality}</span></div>
        <h3>{business.name}</h3>
        <p>{business.description}</p>
      </button>
    </motion.article>
  )
}

function BusinessPreview({ business, onClose }: { business: Business; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        event.preventDefault()
        closeRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [onClose])

  return (
    <div className="preview-backdrop" onMouseDown={onClose}>
      <section className="preview-panel" role="dialog" aria-modal="true" aria-labelledby="preview-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="preview-close" ref={closeRef} type="button" onClick={onClose} aria-label="Cerrar vista previa"><X size={21} /></button>
        <img src={business.image} alt={business.imageAlt} width="800" height="600" />
        <div className="preview-content">
          <span className="preview-kicker">Vista previa · Comercio ficticio</span>
          <h2 id="preview-title">{business.name}</h2>
          <div className="business-meta"><span>{business.category}</span><span><MapPin size={14} />{business.locality}</span></div>
          <p>{business.description}</p>
          <p className="preview-note">En la próxima fase, cada comercio tendrá su propia vidriera digital con más información y formas de contacto.</p>
        </div>
      </section>
    </div>
  )
}

function App() {
  const reducedMotion = useReducedMotion()
  const heroVisualRef = useRef<HTMLDivElement>(null)
  const communityRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({ target: heroVisualRef, offset: ['start end', 'end start'] })
  const { scrollYProgress: communityProgress } = useScroll({ target: communityRef, offset: ['start end', 'end start'] })
  const heroImageY = useTransform(heroProgress, [0, 1], [22, -22])
  const eagleY = useTransform(communityProgress, [0, 1], [16, -16])
  const eagleRotate = useTransform(communityProgress, [0, 1], [-8, -4])
  const [query, setQuery] = useState('')
  const [locality, setLocality] = useState<(typeof localities)[number]>('Todas las localidades')
  const [appliedQuery, setAppliedQuery] = useState('')
  const [appliedLocality, setAppliedLocality] = useState<string>('Todas las localidades')
  const [category, setCategory] = useState('Todas')
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null)

  const filteredBusinesses = useMemo(() => businesses.filter((business) => {
    const normalizedQuery = normalizeSearch(appliedQuery)
    const searchable = normalizeSearch(`${business.name} ${business.category} ${business.locality} ${business.description} ${business.keywords?.join(' ') ?? ''}`)
    return (!normalizedQuery || searchable.includes(normalizedQuery))
      && (appliedLocality === 'Todas las localidades' || business.locality === appliedLocality)
      && (category === 'Todas' || business.category === category || business.keywords?.includes(category))
  }), [appliedQuery, appliedLocality, category])

  function searchBusinesses(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAppliedQuery(query)
    setAppliedLocality(locality)
    setCategory('Todas')
    window.setTimeout(() => scrollToSection('negocios'), 20)
  }

  function selectCategory(value: string) {
    setCategory(value)
    setAppliedQuery('')
    setAppliedLocality('Todas las localidades')
    setLocality('Todas las localidades')
    setQuery('')
    scrollToSection('negocios')
  }

  function clearFilters() {
    setQuery('')
    setLocality('Todas las localidades')
    setAppliedQuery('')
    setAppliedLocality('Todas las localidades')
    setCategory('Todas')
  }

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header />
      <main id="contenido">
        <section className="hero shell" id="inicio" aria-labelledby="hero-title">
          <div className="hero-content">
            <motion.div initial={reducedMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <p className="hero-intro"><span className="intro-line" /> Tu barrio tiene mucho para mostrar</p>
              <h1 id="hero-title">Lo que buscás,<br /><span>está más cerca</span><br />de lo que pensás<span className="hero-period">.</span></h1>
              <p className="hero-description">Descubrí comercios, servicios y emprendedores de tu barrio. Conectá con quienes hacen crecer nuestra comunidad.</p>
              <div className="hero-actions">
                <Button onClick={() => scrollToSection('negocios')}>Explorar negocios <ArrowUpRight size={19} /></Button>
                <Button variant="outline" onClick={() => scrollToSection('publica')}>Sumá tu emprendimiento <ArrowRight size={18} /></Button>
              </div>
            </motion.div>
          </div>
          <motion.div ref={heroVisualRef} className="hero-visual" initial={reducedMotion ? false : { opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, delay: 0.1 }}>
            <motion.img style={reducedMotion ? undefined : { y: heroImageY, scale: 1.08 }} src="/images/barrio.webp" alt="Comercios de barrio en una calle arbolada" width="1536" height="1024" fetchPriority="high" />
            <div className="hero-photo-label"><span>Encontrá lo tuyo</span><strong>ACÁ CERCA</strong><ArrowDownRight size={22} /></div>
          </motion.div>
        </section>

        <section className="search-section shell" id="buscador" aria-label="Buscar comercios">
          <form className="search-form" onSubmit={searchBusinesses}>
            <label className="search-field">
              <Search size={24} strokeWidth={1.8} aria-hidden="true" />
              <span className="sr-only">¿Qué estás buscando hoy?</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="¿Qué estás buscando hoy?" autoComplete="off" />
            </label>
            <label className="locality-field">
              <MapPin size={20} strokeWidth={1.8} aria-hidden="true" />
              <span className="sr-only">Elegí una localidad</span>
              <select value={locality} onChange={(event) => setLocality(event.target.value as (typeof localities)[number])}>
                {localities.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
              <ChevronDown size={17} aria-hidden="true" />
            </label>
            <Button type="submit">Buscar <ArrowRight size={19} /></Button>
          </form>
          <p className="search-hint">Probá con <button onClick={() => { clearFilters(); setQuery('Peluquería'); setAppliedQuery('Peluquería'); scrollToSection('negocios') }}>peluquería</button>, <button onClick={() => { clearFilters(); setQuery('Fletes'); setAppliedQuery('Fletes'); scrollToSection('negocios') }}>fletes</button> o <button onClick={() => { clearFilters(); setQuery('Sublimación'); setAppliedQuery('Sublimación'); scrollToSection('negocios') }}>sublimación</button>.</p>
        </section>

        <div className="statement-band" aria-hidden="true"><div className="statement-track"><span>COMPRÁ CERCA</span><span className="statement-spark">✳</span><span>CRECEMOS JUNTOS</span><span className="statement-spark">✳</span><span>DESCUBRÍ TU BARRIO</span><span className="statement-spark">✳</span><span>COMPRÁ CERCA</span><span className="statement-spark">✳</span><span>CRECEMOS JUNTOS</span><span className="statement-spark">✳</span><span>DESCUBRÍ TU BARRIO</span><span className="statement-spark">✳</span></div></div>

        <section className="categories-section shell section-spacing" id="categorias" aria-labelledby="categories-title">
          <div className="section-heading categories-heading">
            <Reveal><h2 id="categories-title">Cada búsqueda<br />tiene un lugar<span className="yellow-period">.</span></h2></Reveal>
            <Reveal delay={0.12}><p>Desde ese café al que siempre volvés hasta el servicio que justo necesitás. Empezá por acá.</p></Reveal>
          </div>
          <div className="category-grid">
            {categories.map((item, index) => {
              const Icon = categoryIcons[item.icon]
              return <Reveal key={item.label} delay={index % 4 * 0.07}><button className="category-tile" type="button" onClick={() => selectCategory(item.label)}>
                <span className="category-index">0{index + 1}</span><Icon size={31} strokeWidth={1.5} aria-hidden="true" /><span className="category-name">{item.label}</span><ArrowUpRight className="category-arrow" size={20} aria-hidden="true" />
              </button></Reveal>
            })}
          </div>
        </section>

        <section className="business-section shell section-spacing" id="negocios" aria-labelledby="business-title">
          <div className="business-heading">
            <Reveal><div><p className="section-kicker">GENTE QUE HACE</p><h2 id="business-title">Historias que<br />empiezan cerca<span className="yellow-period">.</span></h2></div></Reveal>
            <Reveal delay={0.12}><p>Una primera mirada a los comercios y emprendedores que hacen vibrar Zona Sur.</p></Reveal>
          </div>
          <div className="filter-row" aria-label="Filtrar comercios por categoría">
            <button className={category === 'Todas' ? 'filter-chip active' : 'filter-chip'} aria-pressed={category === 'Todas'} onClick={() => selectCategory('Todas')}>Todos</button>
            {categories.map((item) => <button key={item.label} className={category === item.label ? 'filter-chip active' : 'filter-chip'} aria-pressed={category === item.label} onClick={() => selectCategory(item.label)}>{item.label}</button>)}
          </div>
          {(appliedQuery || appliedLocality !== 'Todas las localidades' || category !== 'Todas') && <div className="results-summary"><span>{filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'resultado' : 'resultados'}{appliedQuery ? ` para “${appliedQuery}”` : ''}</span><button type="button" onClick={clearFilters}>Limpiar filtros <X size={15} /></button></div>}
          {filteredBusinesses.length ? <div className="business-grid"><AnimatePresence initial={false}>{filteredBusinesses.map((business) => <BusinessCard key={business.id} business={business} onOpen={setSelectedBusiness} />)}</AnimatePresence></div> : <div className="empty-state"><Search size={33} /><h3>No encontramos coincidencias en esta muestra.</h3><p>Probá otra categoría o localidad. La demo muestra seis comercios ficticios.</p><Button variant="outline" onClick={clearFilters}>Ver todos los comercios</Button></div>}
          <p className="demo-disclaimer">Contenido ficticio creado para esta demo. Los comercios, imágenes y descripciones son ejemplos ilustrativos.</p>
        </section>

        <section ref={communityRef} className="community-section" id="beneficios" aria-labelledby="community-title">
          <div className="shell community-layout">
            <div className="community-copy"><Reveal><span className="community-icon"><HeartHandshake size={33} strokeWidth={1.5} /></span><h2 id="community-title">Cuando a uno le va bien,<br /><em>crecemos todos.</em></h2><p>UBUNTU une el descubrimiento local con nuevas oportunidades para los emprendedores. Muy pronto, los beneficios de nuestra comunidad van a vivir acá.</p><span className="coming-soon">Beneficios y promociones · Próxima fase</span></Reveal></div>
            <motion.div className="community-watermark" aria-hidden="true" style={reducedMotion ? undefined : { y: eagleY, rotate: eagleRotate }}><img src="/images/eagle-watermark.webp" alt="" width="1254" height="1254" /></motion.div>
          </div>
        </section>

        <section className="magazine-section shell section-spacing" id="revista" aria-labelledby="magazine-title">
          <motion.div className="magazine-cover" aria-label="Portada conceptual de la revista UBUNTU" initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.68, ease: [0.2, 0.7, 0.1, 1] }}><div className="cover-top"><span>REVISTA LOCAL</span><span>EDICIÓN 01</span></div><strong>UBUNTU<span>.</span></strong><div className="cover-circle">Ideas que<br />nos unen</div><div className="cover-bottom">HISTORIAS · COMERCIOS · COMUNIDAD</div></motion.div>
          <Reveal className="magazine-copy" delay={0.12}><p className="section-kicker">DEL PAPEL A TU PANTALLA</p><h2 id="magazine-title">Una revista que<br />sigue viviendo.</h2><p>La edición impresa será una puerta de entrada a los negocios, historias y experiencias digitales del barrio.</p><span className="coming-soon">Revista interactiva · Próxima fase</span></Reveal>
        </section>

        <section className="publish-section shell" id="publica" aria-labelledby="publish-title"><div><p>PARA QUIENES EMPRENDEN</p><h2 id="publish-title">Tu próximo cliente<br />puede estar a unas<br /><em>cuadras de distancia.</em></h2></div><div className="publish-side"><p>Estamos construyendo un espacio para que más personas descubran lo que hacés. La propuesta comercial y el formulario de consultas llegarán en una próxima fase.</p><span>Publicá tu negocio · Próxima fase <ArrowUpRight size={19} /></span></div></section>
      </main>
      <footer className="footer"><div className="shell footer-inner"><div><a className="footer-brand" href="#inicio" aria-label="UBUNTU Sublimación, ir al inicio"><img src="/images/ubuntu-seal.webp" alt="UBUNTU Sublimación" width="132" height="132" /></a><p>Lo bueno está cerca.</p></div><div className="footer-links"><a href="#negocios">Explorar</a><a href="#categorias">Categorías</a><a href="#revista">Revista</a><a href="#publica">Para comercios</a></div><p className="footer-credit">Demo conceptual por Sodium Software · Contenido ficticio</p></div></footer>
      {selectedBusiness && <BusinessPreview business={selectedBusiness} onClose={() => setSelectedBusiness(null)} />}
    </>
  )
}

export default App
