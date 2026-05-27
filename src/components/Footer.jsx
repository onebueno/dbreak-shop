import { Link } from 'react-router-dom'
import logo from '../assets/logo_alt.png'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo-link">
            <img src={logo} alt="dbreak" className="footer__logo-img" />
          </Link>
          <p className="footer__tagline">
            Ropa para quienes se mantienen de pie.<br />
            Worldwide since 2024.
          </p>
        </div>

        <div className="footer__nav">
          <h4 className="footer__heading">NAVEGACIÓN</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/catalog">Catálogo</Link></li>
            <li><Link to="/about">Nosotros</Link></li>
          </ul>
        </div>

        <div className="footer__help">
          <h4 className="footer__heading">AYUDA</h4>
          <ul>
            <li><a href="#">Guía de tallas</a></li>
            <li><a href="#">Envíos y devoluciones</a></li>
            <li><a href="#">Preguntas frecuentes</a></li>
            <li><a href="#">Política de privacidad</a></li>
          </ul>
        </div>

        <div className="footer__contact">
          <h4 className="footer__heading">CONTACTO</h4>
          <ul>
            <li>
              <a href="https://instagram.com/dontbreak" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
                Instagram
              </a>
            </li>
            <li>
              <a href="https://tiktok.com/@dontbreak" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.51V6.75a4.84 4.84 0 01-1-.06z"/>
                </svg>
                TikTok
              </a>
            </li>
            <li>
              <a href="mailto:contact@dontbreak.com" className="footer__social-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                contact@dontbreak.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2026 Don't Break Worldwide. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
