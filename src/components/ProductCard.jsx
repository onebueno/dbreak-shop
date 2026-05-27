import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import './ProductCard.css'

export default function ProductCard({ product, onCartOpen }) {
  const [selectedSize, setSelectedSize] = useState(null)
  const [showSizes, setShowSizes] = useState(false)
  const [added, setAdded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!selectedSize) {
      setShowSizes(true)
      return
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: product.colors?.[0] ?? null,
    })
    setAdded(true)
    if (onCartOpen) onCartOpen()
    setTimeout(() => setAdded(false), 2000)
  }

  const handleSizeClick = (e, size) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedSize(size)
  }

  return (
    <article className="product-card">
      <Link
        to={`/product/${product.id}`}
        className="product-card__image-wrap"
        onMouseEnter={() => setShowSizes(true)}
        onMouseLeave={() => setShowSizes(false)}
        aria-label={`Ver detalles de ${product.name}`}
      >
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-card__img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="product-card__img-placeholder" aria-label={product.name} />
        )}

        {product.tag && (
          <span className="product-card__tag">{product.tag}</span>
        )}

        <div className={`product-card__overlay${showSizes ? ' product-card__overlay--visible' : ''}`}>
          {showSizes && (
            <div className="product-card__sizes">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`size-btn${selectedSize === size ? ' size-btn--active' : ''}`}
                  onClick={(e) => handleSizeClick(e, size)}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
          <button
            className={`product-card__add-btn${added ? ' product-card__add-btn--added' : ''}`}
            onClick={handleAddToCart}
          >
            {added ? '✓ AGREGADO' : selectedSize ? 'AGREGAR AL CARRITO' : 'SELECCIONAR TALLA'}
          </button>
        </div>
      </Link>

      <div className="product-card__info">
        <h3 className="product-card__name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="product-card__price">S/ {product.price.toFixed(2)}</p>
      </div>
    </article>
  )
}
