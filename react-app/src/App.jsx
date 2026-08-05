import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, Clock3,
  Droplets, Leaf, Mail, MapPin, Phone, Search, ShieldCheck, Sparkles, X,
} from './components/Icons'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SectionHeading from './components/SectionHeading'
import { amenities, details, extras, faqs, gallery, locations, posts, washes, whyItems } from './data/siteData'

function App() {
  const [theme, setTheme] = useState(() => {
    const linkedTheme = new URLSearchParams(window.location.search).get('theme')
    return ['ocean', 'night'].includes(linkedTheme) ? linkedTheme : (localStorage.getItem('soap-theme') || 'ocean')
  })
  const [activeFaq, setActiveFaq] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [galleryOpen, setGalleryOpen] = useState(null)
  const [serviceTab, setServiceTab] = useState('washes')
  const [visiblePosts, setVisiblePosts] = useState(6)
  const [selectedLocation, setSelectedLocation] = useState(0)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('soap-theme', theme)
    const url = new URL(window.location.href)
    url.searchParams.set('theme', theme)
    window.history.replaceState({}, '', url)
  }, [theme])

  useEffect(() => {
    document.body.style.overflow = (searchOpen || galleryOpen !== null) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [searchOpen, galleryOpen])

  const searchResults = useMemo(() => {
    if (searchTerm.trim().length < 2) return []
    const pool = [
      ...washes.map(item => ({ title: item.name, type: 'Service', href: '#services' })),
      ...details.map(item => ({ title: item.name, type: 'Detail', href: '#services' })),
      ...locations.map(item => ({ title: `${item.short} — ${item.address}`, type: 'Location', href: '#locations' })),
      ...posts.map(item => ({ title: item.title, type: 'Article', href: '#blog' })),
      ...faqs.map(item => ({ title: item[0], type: 'FAQ', href: '#faq' })),
    ]
    return pool.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 7)
  }, [searchTerm])

  return (
    <div className="app-shell">
      <Navbar theme={theme} toggleTheme={() => setTheme(theme === 'ocean' ? 'night' : 'ocean')} onSearch={() => setSearchOpen(true)} />

      <main>
        <section id="home" className="hero section-screen">
          <div className="hero-media" aria-hidden="true">
            <img src="/images/25-400x284.jpg" alt="" />
          </div>
          <div className="hero-overlay" />
          <div className="bubble bubble-one" /><div className="bubble bubble-two" />
          <div className="hero-content">
            <span className="hero-kicker" data-aos="fade-down"><Sparkles size={16} /> Houston’s hand wash experts</span>
            <h1 data-aos="fade-up" data-aos-delay="100">We focus on<br /><em>the details.</em></h1>
            <p data-aos="fade-up" data-aos-delay="180">An eco-friendly hand wash and detailing experience, crafted for people who care about their car.</p>
            <div className="hero-buttons" data-aos="fade-up" data-aos-delay="240">
              <a href="#locations" className="button button--primary">View locations <ArrowRight size={18} /></a>
              <a href="#services" className="button button--glass">Explore services</a>
            </div>
          </div>
          <div className="amenity-rail" data-aos="fade-up" data-aos-delay="320">
            {amenities.map(({ label, icon: Icon }) => <div key={label}><span><Icon /></span><small>{label}</small></div>)}
          </div>
          <a href="#services" className="scroll-cue" aria-label="Scroll to services"><span>Discover SOAP</span><ChevronDown /></a>
        </section>

        <section id="services" className="services section-pad">
          <div className="container-wide">
            <div className="services-intro">
              <SectionHeading eyebrow="Our services" title="Professional washes. Friendly prices." text="Choose the level of care your vehicle needs. Every service is completed by hand with paint-safe tools and a careful eye." />
              <div className="vehicle-note" data-aos="fade-left"><span>Pricing shown for</span><strong>Cars · Sedans · Hatchbacks</strong><small>SUVs, trucks, minivans and work vehicles may vary.</small></div>
            </div>
            <div className="tab-list" data-aos="fade-up">
              {[['washes','Washes'], ['details','Detailing'], ['extras','Extras']].map(([key,label]) => <button key={key} onClick={() => setServiceTab(key)} className={serviceTab === key ? 'active' : ''}>{label}</button>)}
            </div>

            {serviceTab === 'washes' && <div className="pricing-grid">
              {washes.map((wash, index) => <article key={wash.name} className={`price-card ${wash.featured ? 'price-card--featured' : ''}`} data-aos="fade-up" data-aos-delay={index * 80}>
                {wash.featured && <span className="popular">Most popular</span>}
                <div className="price-card-head"><div><small>Hand wash</small><h3>{wash.name}</h3></div><div className="price"><sup>$</sup>{wash.price}</div></div>
                <ul>{wash.items.map(item => <li key={item}><Check size={16} />{item}</li>)}</ul>
                <a href="#locations">Choose this wash <ArrowRight size={17} /></a>
              </article>)}
            </div>}

            {serviceTab === 'details' && <div className="detail-grid">
              {details.map((detail, index) => <article key={detail.name} data-aos="fade-up" data-aos-delay={index * 60}>
                <div><span>Detail package</span><h3>{detail.name}</h3><strong>${detail.price}</strong></div>
                <p>{detail.lead}</p><ul>{detail.items.map(item => <li key={item}><Check size={14} />{item}</li>)}</ul>
              </article>)}
            </div>}

            {serviceTab === 'extras' && <div className="extras-panel" data-aos="fade-up">
              <div><span>À la carte care</span><h3>We do it all.</h3><p>Build the precise service your car needs with these available add-ons.</p></div>
              <div className="extras-list">{extras.map(([name, price]) => <div key={name}><span>{name}</span><strong>{price}</strong></div>)}<div><span>Many more services to choose from</span><strong>Ask us</strong></div></div>
            </div>}
            <p className="pricing-disclaimer">*Pricing may be higher based on vehicle condition (dirt, hair, sand).</p>
          </div>
        </section>

        <section id="why-us" className="relative flex items-center overflow-hidden bg-[var(--surface-soft)] px-4 py-12 sm:px-6 sm:py-14 min-[901px]:px-5 min-[901px]:py-[58px]">
          <div className="mx-auto grid w-full max-w-[1500px] gap-4 min-[901px]:min-h-[650px] min-[901px]:grid-cols-2 xl:gap-5">
            <div className="group relative min-h-[440px] overflow-hidden rounded-[28px] bg-[#06345f] shadow-[0_28px_80px_rgba(0,45,90,.2)] sm:min-h-[520px] min-[901px]:min-h-0" data-aos="fade-right">
              <img className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105" src="/images/30-400x284.jpg" alt="Classic car with a flawless finish after a SOAP hand wash" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,24,46,.08)_22%,rgba(2,25,48,.86)_100%)]" />
              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-[#062846]/75 px-4 py-2 text-[9px] font-black uppercase tracking-[.16em] text-[#9cdcf9] backdrop-blur-md sm:left-7 sm:top-7">
                <ShieldCheck size={17} /> The SOAP standard
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-10 sm:bottom-9 sm:left-9 sm:right-[190px]">
                <p className="mb-3 text-[9px] font-black uppercase tracking-[.18em] text-white/55">Thoughtful care at every touchpoint</p>
                <h2 className="max-w-[520px] font-display text-[clamp(34px,4vw,58px)] font-extrabold uppercase leading-[.94] tracking-[-.055em] text-white">
                  Hand-finished.<br /><span className="font-light text-[#9cdcf9]">Paint protected.</span>
                </h2>
              </div>

              <div className="absolute bottom-8 right-8 z-20 hidden h-[132px] w-[132px] flex-col items-center justify-center rounded-full border border-white/30 bg-[#0054a6]/85 text-center text-white shadow-2xl backdrop-blur-md sm:flex xl:h-[148px] xl:w-[148px]">
                <span className="text-[7px] font-black uppercase tracking-[.16em] text-white/65">As few as</span>
                <span className="flex items-baseline gap-1"><strong className="text-[46px] font-black leading-none tracking-[-.08em]">10</strong><small className="text-[9px] font-black uppercase tracking-wider text-[#9cdcf9]">gal</small></span>
                <span className="mt-1 text-[7px] font-bold uppercase tracking-[.08em] text-white/60">per wash</span>
              </div>
            </div>

            <div className="relative flex min-w-0 flex-col justify-center overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--surface)] px-5 py-8 shadow-[0_24px_70px_rgba(0,60,120,.1)] sm:px-8 sm:py-10 min-[901px]:px-[clamp(24px,3.2vw,50px)] min-[901px]:py-5" data-aos="fade-left">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--surface-blue)] blur-3xl" />
              <div className="relative">
                <div className="mb-4 flex items-center justify-between gap-4 border-b border-[var(--line)] pb-3 text-[8px] font-black uppercase tracking-[.14em] text-[var(--muted)]">
                  <span className="text-[var(--primary)]">01 / Why SOAP?</span>
                  <span className="text-right">Five standards. One spotless finish.</span>
                </div>

                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[.19em] text-[var(--primary)] before:h-0.5 before:w-7 before:bg-[var(--primary)]">Built around your finish</span>
                <h2 className="mb-3 mt-3 max-w-[650px] font-display text-[clamp(34px,3.7vw,56px)] font-extrabold leading-[.98] tracking-[-.055em] text-[var(--ink)]">Safe, spotless and eco-friendly.</h2>
                <p className="max-w-[620px] text-[clamp(12px,1vw,15px)] leading-relaxed text-[var(--muted)]">Every tool, towel and technique is selected to protect your paint while delivering a genuinely better clean.</p>

                <div className="mt-5 grid gap-2.5 sm:grid-cols-2 min-[901px]:mt-4">
                  {whyItems.map((item, index) => (
                    <article key={item.title} className={`group/card flex min-w-0 gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface-soft)] p-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:shadow-[0_12px_28px_rgba(0,70,140,.1)] ${index === whyItems.length - 1 ? 'sm:col-span-2' : ''}`} data-aos="fade-up" data-aos-delay={index * 45}>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--surface-blue)] text-[9px] font-black text-[var(--primary)] transition-colors group-hover/card:bg-[var(--primary)] group-hover/card:text-white">0{index + 1}</span>
                      <div className="min-w-0">
                        <h3 className="mb-1 text-[13px] font-extrabold tracking-[-.01em] text-[var(--ink)]">{item.title}</h3>
                        <p className="line-clamp-2 text-[10px] leading-[1.5] text-[var(--muted)]">{item.text}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[linear-gradient(135deg,var(--surface-blue),var(--surface))] p-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--primary)] text-white"><Droplets size={18} /></span>
                  <p className="text-[10px] leading-[1.5] text-[var(--muted)]"><strong className="block text-[11px] text-[var(--ink)]">Smarter with water.</strong>As few as 10 gallons per wash—far less than tunnel or at-home washing.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="programs" className="programs section-pad">
          <div className="container-wide programs-grid">
            <div>
              <SectionHeading eyebrow="The SOAP standard" title="Care that feels different." text="Good car care is a habit. SOAP makes that habit easier with a consistent, thoughtful process every visit." light />
              <div className="program-points">
                <div data-aos="fade-up"><ShieldCheck /><span><strong>Paint-safe process</strong>Gentle mitts and separated towels protect your finish.</span></div>
                <div data-aos="fade-up" data-aos-delay="80"><Leaf /><span><strong>Eco-friendly care</strong>Significantly less water than washing at home.</span></div>
                <div data-aos="fade-up" data-aos-delay="160"><Sparkles /><span><strong>Detail-driven team</strong>Quality workmanship at a competitive price.</span></div>
              </div>
              <a className="button button--white" href="#locations">Find your SOAP <ArrowRight size={18} /></a>
            </div>
            <div className="program-collage" data-aos="zoom-in">
              <img src="/images/20-400x284.jpg" alt="SOAP team hand washing a white sports car" />
              <img src="/images/10-400x284.jpg" alt="Detailed black sports car outside SOAP" />
              <div className="program-quote"><span>“</span><p>Weekly washing is best for protecting your car’s paint.</p></div>
            </div>
          </div>
        </section>

        <section id="experience" className="experience">
          <div className="experience-visual" data-aos="fade-right">
            <img src="/images/14-400x284.jpg" alt="SOAP specialist carefully hand washing a black vehicle" />
            <div className="experience-visual-shade" />
            <span className="experience-stamp"><Sparkles /> <strong>100%</strong> washed by hand</span>
            <div className="experience-proof">
              <ShieldCheck />
              <span><strong>Paint-safe care</strong>Thoughtful tools. Trained hands.</span>
            </div>
          </div>

          <div className="experience-content">
            <div className="experience-topline" data-aos="fade-down">
              <span>The SOAP experience</span>
              <span>Houston, Texas</span>
            </div>
            <SectionHeading eyebrow="Simple by design" title="A better clean, from pull-in to pull-out." text="No conveyor belts and no rushed shortcuts—just an easy visit and meticulous attention where your car needs it most." />

            <div className="experience-steps">
              <article data-aos="fade-left" data-aos-delay="80">
                <span className="experience-number">01</span>
                <div><h3>Pull in</h3><p>Choose your service and leave the keys with our friendly team.</p></div>
                <MapPin />
              </article>
              <article data-aos="fade-left" data-aos-delay="150">
                <span className="experience-number">02</span>
                <div><h3>We perfect every detail</h3><p>Your vehicle is washed and finished by hand with paint-safe tools.</p></div>
                <Droplets />
              </article>
              <article data-aos="fade-left" data-aos-delay="220">
                <span className="experience-number">03</span>
                <div><h3>Drive out spotless</h3><p>Step back into a car that looks cared for—because it truly was.</p></div>
                <Sparkles />
              </article>
            </div>

            <div className="experience-action" data-aos="fade-up" data-aos-delay="260">
              <a href="#locations" className="button button--primary">Find your nearest SOAP <ArrowRight size={18} /></a>
              <span>Three convenient Houston locations</span>
            </div>
          </div>
        </section>

        <section id="visit" className="visit-section">
          <div className="visit-backdrop" aria-hidden="true">
            <img src="/images/33-400x284.jpg" alt="" />
          </div>
          <div className="visit-glow visit-glow--one" aria-hidden="true" />
          <div className="visit-glow visit-glow--two" aria-hidden="true" />

          <div className="visit-shell">
            <div className="visit-copy" data-aos="fade-right">
              <span className="visit-kicker"><span /> Your car called</span>
              <h2>Ready for that<br /><em>fresh-car feeling?</em></h2>
              <p>Pull in, hand us the keys, and relax. No appointment is needed for a wash—just choose the SOAP closest to you.</p>

              <div className="visit-trust">
                <div><ShieldCheck /><span><strong>100% by hand</strong>Paint-safe care</span></div>
                <div><Clock3 /><span><strong>18–25 min</strong>Average wash</span></div>
                <div><Droplets /><span><strong>Eco-minded</strong>As few as 10 gallons</span></div>
              </div>
            </div>

            <div className="visit-card" data-aos="fade-left" data-aos-delay="120">
              <div className="visit-card-head">
                <div>
                  <span>Plan your visit</span>
                  <h3>Pick your SOAP</h3>
                </div>
                <span className="visit-open"><i /> Open 7 days</span>
              </div>

              <div className="visit-location-tabs" role="tablist" aria-label="Choose a SOAP location">
                {locations.map((location, index) => (
                  <button
                    key={location.short}
                    type="button"
                    role="tab"
                    aria-selected={selectedLocation === index}
                    className={selectedLocation === index ? 'active' : ''}
                    onClick={() => setSelectedLocation(index)}
                  >
                    <span>0{index + 1}</span>{location.short}
                  </button>
                ))}
              </div>

              <div className="visit-location-detail" key={locations[selectedLocation].short}>
                <span className="visit-pin"><MapPin /></span>
                <div>
                  <small>{locations[selectedLocation].short} location</small>
                  <h4>{locations[selectedLocation].address}</h4>
                  <p>{locations[selectedLocation].city}</p>
                </div>
              </div>

              <div className="visit-hours">
                <Clock3 />
                <span><small>Monday — Saturday</small><strong>8:30 AM — 5:30 PM</strong></span>
                <span>Drop-ins welcome</span>
              </div>

              <div className="visit-actions">
                <a
                  className="button button--visit"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locations[selectedLocation].address + ' ' + locations[selectedLocation].city)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Get directions <ArrowRight size={18} />
                </a>
                <a className="visit-call" href={`tel:${locations[selectedLocation].phone.replaceAll('-', '')}`} aria-label={`Call SOAP ${locations[selectedLocation].short}`}><Phone /></a>
              </div>
            </div>
          </div>

          <div className="visit-marquee" aria-hidden="true">
            <span>HAND WASHED</span><i />
            <span>HOUSTON PROUD</span><i />
            <span>PAINT SAFE</span><i />
            <span>DRIVE OUT SPOTLESS</span>
          </div>
        </section>

        <section id="gallery" className="gallery section-pad">
          <div className="container-wide">
            <div className="gallery-head"><SectionHeading eyebrow="Gallery" title="Houston cars, at their best." text="From daily drivers to rare classics, every car gets our full attention." /><span data-aos="fade-left">29 original moments · SOAP Houston</span></div>
            <div className="gallery-grid">
              {gallery.slice(0, 12).map((src, index) => <button key={src} onClick={() => setGalleryOpen(index)} className={`gallery-item gallery-item--${index + 1}`} data-aos="fade-up" data-aos-delay={(index % 4) * 50} aria-label={`Open gallery image ${index + 1}`}><img src={src} alt={`SOAP Hand Car Wash gallery vehicle ${index + 1}`} loading="lazy" /><span><Search /></span></button>)}
            </div>
            <button className="gallery-more" onClick={() => setGalleryOpen(12)}>Explore all 29 photos <ArrowRight size={18} /></button>
          </div>
        </section>

        <section id="locations" className="locations section-pad">
          <div className="container-wide">
            <SectionHeading eyebrow="Locations" title="Three places to leave spotless." text="Visit the SOAP Hand Car Wash nearest you. Drop-offs are welcome during business hours, subject to available space." align="center" />
            <div className="location-grid">
              {locations.map((location, index) => <article key={location.short} data-aos="fade-up" data-aos-delay={index * 80}>
                <div className="location-number">0{index + 1}</div><span className="location-tag"><MapPin size={14} /> {location.short}</span>
                <h3>{location.address}</h3><p>{location.city}</p>
                <div className="hours"><Clock3 /><p>Mon – Thurs: 8:30–5:30<br />Fri – Sat: 8:30 to 5:30<br />Sunday: 9:30 to 5:30</p></div>
                <div className="location-actions"><a href={`tel:${location.phone.replaceAll('-', '')}`}><Phone />{location.phone}</a><a href={`mailto:${location.email}`}><Mail />{location.email}</a></div>
                <a className="directions" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address + ' ' + location.city)}`} target="_blank" rel="noreferrer">Get directions <ArrowRight /></a>
              </article>)}
            </div>
          </div>
        </section>

        <section id="faq" className="faq">
          <div className="faq-aside">
            <SectionHeading eyebrow="FAQ" title="We’ve got answers." text="Everything you need to know before pulling in for your next wash." light />
            <img src="/images/25-400x284.jpg" alt="SOAP Hand Car Wash service bay" />
            <p>Still have a question?</p><a href="tel:7136369646">Call 713-636-9646 <ArrowRight /></a>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => <article key={question} className={activeFaq === index ? 'open' : ''}>
              <button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}><span>{question}</span><span>{activeFaq === index ? '−' : '+'}</span></button>
              <div><p>{answer}</p></div>
            </article>)}
            <p className="faq-note">Our prices vary with the condition of the vehicle and what needs to be done to satisfy the customer’s needs. Extra work requires seeing the car in person first for a proper estimate, including removal of swirl marks, mud, tree sap, pet hair, scratches, oxidation, water spots, stains, overspray and brake dust.</p>
          </div>
        </section>

        <section id="blog" className="blog section-pad">
          <div className="container-wide">
            <div className="blog-head"><SectionHeading eyebrow="From the blog" title="Better habits. Better shine." text="Practical ideas about washing, detailing and caring for your vehicle in Houston." /><a href="#blog">Browse insights <ArrowRight /></a></div>
            <div className="blog-grid">
              {posts.slice(0, visiblePosts).map((post, index) => <article key={post.title} data-aos="fade-up" data-aos-delay={(index % 3) * 70}>
                <div className="blog-image"><img src={gallery[(index * 3 + 3) % gallery.length]} alt="SOAP Hand Car Wash article" loading="lazy" /><span>{post.category}</span></div>
                <div className="blog-copy"><p>{post.date} · by Alexander</p><h3>{post.title}</h3><span>{post.excerpt}</span><a href="#blog">Read article <ArrowRight /></a></div>
              </article>)}
            </div>
            {visiblePosts < posts.length && <button className="load-more" onClick={() => setVisiblePosts(posts.length)}>Older entries <ChevronDown /></button>}
          </div>
        </section>
      </main>

      <Footer />

      {searchOpen && <div className="search-modal" role="dialog" aria-modal="true" aria-label="Site search">
        <button className="modal-close" onClick={() => setSearchOpen(false)} aria-label="Close search"><X /></button>
        <div><span className="eyebrow">Find it fast</span><h2>What can we help you find?</h2><label><Search /><input autoFocus value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search services, locations, articles…" /></label>
          <div className="search-results">{searchResults.map(item => <a href={item.href} key={`${item.type}-${item.title}`} onClick={() => setSearchOpen(false)}><span>{item.type}</span><strong>{item.title}</strong><ArrowRight /></a>)}{searchTerm.length >= 2 && !searchResults.length && <p>No matching results. Try “wash”, “detail” or “Houston”.</p>}</div>
        </div>
      </div>}

      {galleryOpen !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo gallery">
        <button className="modal-close" onClick={() => setGalleryOpen(null)} aria-label="Close gallery"><X /></button>
        <button className="lightbox-nav prev" onClick={() => setGalleryOpen((galleryOpen - 1 + gallery.length) % gallery.length)} aria-label="Previous image"><ChevronLeft /></button>
        <figure><img src={gallery[galleryOpen]} alt={`SOAP Hand Car Wash gallery ${galleryOpen + 1}`} /><figcaption><span>SOAP Houston</span>{String(galleryOpen + 1).padStart(2, '0')} / {gallery.length}</figcaption></figure>
        <button className="lightbox-nav next" onClick={() => setGalleryOpen((galleryOpen + 1) % gallery.length)} aria-label="Next image"><ChevronRight /></button>
      </div>}
    </div>
  )
}

export default App
