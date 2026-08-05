import { useEffect, useState } from 'react'
import { Menu, MoonStar, Search, Sun, X } from './Icons'

const links = [
  ['Services', '#services'], ['Why Us', '#why-us'], ['Experience', '#experience'],
  ['Gallery', '#gallery'], ['Locations', '#locations'], ['FAQ', '#faq'], ['Blog', '#blog'],
]

export default function Navbar({ theme, toggleTheme, onSearch }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <a href="#home" className="brand" aria-label="SOAP Hand Car Wash home">
        <picture>
          <source media="(max-width: 600px)" srcSet="/images/logo.svg" />
          <img src="/images/soapheader_logo.png" alt="SOAP Hand Car Wash" />
        </picture>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>

      <div className="nav-actions">
        <button onClick={onSearch} className="icon-button" aria-label="Search site"><Search size={18} /></button>
        <span className="nav-action-divider" aria-hidden="true" />
        <a
          href={theme === 'ocean' ? '?theme=night' : '?theme=ocean'}
          onClick={(event) => { event.preventDefault(); toggleTheme() }}
          className="theme-button"
          aria-label={`Switch to ${theme === 'ocean' ? 'Night Wash' : 'Ocean Blue'} color scheme`}
          title={`Switch to ${theme === 'ocean' ? 'Night Wash' : 'Ocean Blue'} theme`}
        >
          <span className="theme-button__icon">{theme === 'ocean' ? <MoonStar size={17} /> : <Sun size={17} />}</span>
          <span className="theme-button__copy">
            <small>Color scheme</small>
            <strong>{theme === 'ocean' ? 'Night wash' : 'Ocean blue'}</strong>
          </span>
        </a>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
      )}
    </header>
  )
}
