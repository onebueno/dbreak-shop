import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import './Cart.css'

function CartItem({ item }) {
  const { removeItem, updateQty } = useCart()
  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <img
          src={item.image}
          alt={item.name}
          onError={e => { e.target.style.display = 'none' }}
        />
      </div>
      <div className="cart-item__info">
        <p className="cart-item__name">{item.name}</p>
        <p className="cart-item__meta">
          {item.color && <span>{item.color}</span>}
          {item.size && <span> / {item.size}</span>}
        </p>
        <p className="cart-item__price">S/ {item.price.toFixed(2)}</p>
        <div className="cart-item__controls">
          <div className="cart-item__qty">
            <button onClick={() => updateQty(item.key, item.quantity - 1)} aria-label="Disminuir">−</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQty(item.key, item.quantity + 1)} aria-label="Aumentar">+</button>
          </div>
          <button className="cart-item__remove" onClick={() => removeItem(item.key)} aria-label="Eliminar">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Cart({ isOpen, onClose }) {
  const { items, totalItems, totalPrice, clearCart } = useCart()
  const overlayRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  return (
    <>
      <div
        className={`cart-overlay${isOpen ? ' cart-overlay--visible' : ''}`}
        onClick={onClose}
        ref={overlayRef}
        aria-hidden="true"
      />
      <aside className={`cart${isOpen ? ' cart--open' : ''}`} role="dialog" aria-label="Carrito de compras">
        <div className="cart__header">
          <h2 className="cart__title">CARRITO <span className="cart__count">{totalItems > 0 ? `(${totalItems})` : ''}</span></h2>
          <button className="cart__close" onClick={onClose} aria-label="Cerrar carrito">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="cart__body">
          {items.length === 0 ? (
            <div className="cart__empty">
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="cart__items">
              {items.map(item => (
                <CartItem key={item.key} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart__footer">
            <div className="cart__subtotal">
              <span>SUBTOTAL</span>
              <span>S/ {totalPrice.toFixed(2)}</span>
            </div>
            <p className="cart__shipping-note">Envío calculado al finalizar</p>
            <button className="cart__checkout-btn" onClick={handleCheckout}>
              PROCEDER AL PAGO
            </button>
            <button className="cart__clear-btn" onClick={clearCart}>
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
