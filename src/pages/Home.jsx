import { Link } from 'react-router-dom'
import { products, featuredIds } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import heroImg from '../assets/IMG_5.png'
import mascotImg from '../assets/IMG_2.png'
import categoryLeft from '../assets/IMG_3.png'
import categoryRight from '../assets/IMG_10.png'
import './Home.css'

export default function Home({ onCartOpen }) {
  const featured = products.filter(p => featuredIds.includes(p.id))
  const newArrivals = products.filter(p => p.tag === 'NUEVO').slice(0, 4)

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero__bg">
          <img src={heroImg} alt="" className="hero__bg-img" aria-hidden="true" />
        </div>
        <div className="hero__content">
          <p className="hero__eyebrow">NUEVA COLECCIÓN — 2024</p>
          <h1 className="hero__title">
            DON'T<br />BREAK
          </h1>
          <p className="hero__sub">Prendas construidas para resistir.</p>
          <Link to="/catalog" className="hero__cta">
            EXPLORAR COLECCIÓN
          </Link>
        </div>
        <div className="hero__mascot">
          <img src={mascotImg} alt="dbreak mascot" />
        </div>
        <div className="hero__scroll-indicator">
          <span />
        </div>
      </section>

      {/* FEATURED */}
      <section className="home-section">
        <div className="home-section__header">
          <h2 className="section-title">DESTACADOS</h2>
          <Link to="/catalog" className="section-link">Ver todo →</Link>
        </div>
        <div className="home-featured-grid">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} onCartOpen={onCartOpen} />
          ))}
        </div>
      </section>

      {/* STATEMENT */}
      <section className="home-statement">
        <div className="home-statement__inner">
          <p className="home-statement__label">FILOSOFÍA</p>
          <blockquote className="home-statement__quote">
            "No rompas bajo presión.
            <br />Viste lo que te define."
          </blockquote>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="home-categories">
        <div className="home-cat home-cat--left">
          <div
            className="home-cat__img-wrap"
            style={{ backgroundImage: `url(${categoryLeft})` }}
          />
          <div className="home-cat__label">
            <span>JUICY DREAMS</span>
            <Link to="/catalog?cat=tees" className="home-cat__link">EXPLORAR</Link>
          </div>
        </div>
        <div className="home-cat home-cat--right">
          <div
            className="home-cat__img-wrap"
            style={{ backgroundImage: `url(${categoryRight})` }}
          />
          <div className="home-cat__label">
            <span>ESSENTIALS</span>
            <Link to="/catalog?cat=tees" className="home-cat__link">EXPLORAR</Link>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      {newArrivals.length > 0 && (
        <section className="home-section">
          <div className="home-section__header">
            <h2 className="section-title">NUEVOS INGRESOS</h2>
            <Link to="/catalog" className="section-link">Ver todo →</Link>
          </div>
          <div className="home-grid-4">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} onCartOpen={onCartOpen} />
            ))}
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      <section className="home-newsletter">
        <div className="home-newsletter__inner">
          <h3 className="home-newsletter__title">MANTENTE EN EL LOOP</h3>
          <p className="home-newsletter__sub">
            Drops exclusivos, lanzamientos limitados y acceso anticipado.
          </p>
          <form className="home-newsletter__form" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="tu@email.com"
              className="home-newsletter__input"
              required
            />
            <button type="submit" className="home-newsletter__btn">
              SUSCRIBIRSE
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
