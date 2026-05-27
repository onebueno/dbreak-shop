import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import logo from '../assets/logo_alt.png'
import './Navbar.css'

const SOCIALS = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/dontbreak.pe/?hl=es',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@dontbreak.pe',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.51V6.75a4.84 4.84 0 01-1-.06z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/dontbreak.pe',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
]

function SocialsDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="socials-dropdown" ref={ref}>
      <button
        className={`nav-link socials-dropdown__trigger${open ? ' socials-dropdown__trigger--open' : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        REDES
        <svg className="socials-dropdown__chevron" width="8" height="5" viewBox="0 0 8 5" fill="currentColor">
          <path d="M0 0l4 5 4-5z"/>
        </svg>
      </button>

      {open && (
        <div className="socials-dropdown__menu">
          {SOCIALS.map(s => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="socials-dropdown__item"
              onClick={() => setOpen(false)}
            >
              {s.icon}
              <span>{s.name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navbar({ onCartOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const navClass = `navbar${isHome && !scrolled ? ' navbar--transparent' : ''}${menuOpen ? ' navbar--open' : ''}`

  return (
    <nav className={navClass}>
      <div className="navbar__inner">
        <div className="navbar__left">
          <Link to="/catalog" className="nav-link">CATÁLOGO</Link>
          <Link to="/about" className="nav-link">NOSOTROS</Link>
        </div>

        <Link to="/" className="navbar__logo">
          <img src={logo} alt="dbreak" className="navbar__logo-img" />
        </Link>

        <div className="navbar__right">
          <div className="nav-link--hide-sm">
            <SocialsDropdown />
          </div>
          <button className="navbar__cart-btn" onClick={onCartOpen} aria-label="Abrir carrito">
            <span className="navbar__cart-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {totalItems > 0 && (
                <span className="navbar__cart-count">{totalItems}</span>
              )}
            </span>
          </button>

          <button
            className="navbar__menu-btn"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menú"
          >
            <span className={`hamburger${menuOpen ? ' hamburger--open' : ''}`}>
              <span /><span /><span />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="navbar__mobile-menu">
          <Link to="/" className="mobile-nav-link">HOME</Link>
          <Link to="/catalog" className="mobile-nav-link">CATÁLOGO</Link>
          <Link to="/about" className="mobile-nav-link">NOSOTROS</Link>
          <button className="mobile-nav-link mobile-nav-link--cart" onClick={() => { onCartOpen(); setMenuOpen(false) }}>
            CARRITO {totalItems > 0 && `(${totalItems})`}
          </button>
          <div className="mobile-nav-socials">
            {SOCIALS.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">
                {s.name.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
