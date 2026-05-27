import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import logo from '../assets/logo_alt.png'
import './Navbar.css'

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
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="nav-link nav-link--hide-sm">
            IG
          </a>
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
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TIKTOK</a>
          </div>
        </div>
      )}
    </nav>
  )
}
