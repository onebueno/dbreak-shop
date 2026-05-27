import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { products } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import './ProductDetail.css'

const ACCORDION_ITEMS = [
  {
    id: 'description',
    label: 'DESCRIPCIÓN',
    content: null,
  },
  {
    id: 'materials',
    label: 'MATERIALES Y CUIDADO',
    content: 'Lavado a mano o máquina en frío. No usar secadora. Planchar a temperatura media. No usar blanqueador.',
  },
  {
    id: 'shipping',
    label: 'ENVÍOS Y DEVOLUCIONES',
    content: 'Envíos a todo el Perú. Lima Metropolitana: 1-2 días hábiles. Provincias: 3-5 días hábiles. Devoluciones aceptadas dentro de 10 días con etiqueta original.',
  },
]

function Accordion({ label, children, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen ?? false)
  return (
    <div className="accordion">
      <button className="accordion__trigger" onClick={() => setOpen(v => !v)} aria-expanded={open}>
        <span>{label}</span>
        <span className={`accordion__icon${open ? ' accordion__icon--open' : ''}`}>+</span>
      </button>
      {open && <div className="accordion__body">{children}</div>}
    </div>
  )
}

export default function ProductDetail({ onCartOpen }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === Number(id))
  const { addItem } = useCart()

  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] ?? null)
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [imgError, setImgError] = useState(false)

  if (!product) {
    return (
      <div className="pd-not-found">
        <p>Producto no encontrado.</p>
        <Link to="/catalog">← Volver al catálogo</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true)
      return
    }
    setSizeError(false)
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
    })
    setAdded(true)
    if (onCartOpen) onCartOpen()
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="pd">
      <div className="pd__breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/catalog">Catálogo</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="pd__layout">
        {/* LEFT: image */}
        <div className="pd__gallery">
          <div className="pd__main-image">
            {!imgError ? (
              <img
                src={product.image}
                alt={product.name}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="pd__img-placeholder" />
            )}
          </div>
          {product.tag && (
            <span className="pd__tag">{product.tag}</span>
          )}
        </div>

        {/* RIGHT: info */}
        <div className="pd__info">
          <div className="pd__info-header">
            <p className="pd__category">{product.category.toUpperCase()}</p>
            <h1 className="pd__name">{product.name}</h1>
            <p className="pd__price">S/ {product.price.toFixed(2)}</p>
          </div>

          {/* Color selector */}
          {product.colors && product.colors.length > 1 && (
            <div className="pd__option-group">
              <p className="pd__option-label">
                COLOR — <span className="pd__option-value">{selectedColor}</span>
              </p>
              <div className="pd__colors">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`color-btn${selectedColor === color ? ' color-btn--active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          <div className="pd__option-group">
            <p className={`pd__option-label${sizeError ? ' pd__option-label--error' : ''}`}>
              TALLA {selectedSize ? `— ${selectedSize}` : ''}
              {sizeError && <span className="pd__size-error"> — Selecciona una talla</span>}
            </p>
            <div className="pd__sizes">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`pd-size-btn${selectedSize === size ? ' pd-size-btn--active' : ''}`}
                  onClick={() => { setSelectedSize(size); setSizeError(false) }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button
            className={`pd__add-btn${added ? ' pd__add-btn--added' : ''}`}
            onClick={handleAddToCart}
          >
            {added ? '✓ AGREGADO AL CARRITO' : 'AGREGAR AL CARRITO'}
          </button>

          {/* Accordions */}
          <div className="pd__accordions">
            <Accordion label="DESCRIPCIÓN" defaultOpen>
              <p>{product.description}</p>
            </Accordion>
            <Accordion label="MATERIALES Y CUIDADO">
              <p>Lavado a mano o máquina en frío. No usar secadora. Planchar a temperatura media. No usar blanqueador.</p>
            </Accordion>
            <Accordion label="ENVÍOS Y DEVOLUCIONES">
              <p><strong>Cambios de producto</strong><br />
              Aceptamos cambios dentro de los 14 días desde la recepción del pedido. El producto debe estar sin uso, en perfectas condiciones y en su empaque original. Puedes cambiarlo por otra talla, otro color u otro producto del mismo valor. Si el nuevo producto tiene un valor mayor, se paga la diferencia. El costo de envío corre por cuenta del cliente, salvo que el cambio sea por error nuestro.</p>
              <p><strong>Devoluciones</strong><br />
              No realizamos devoluciones de dinero por cambios de opinión o error al elegir talla/color. Esto se debe a que trabajamos con stock limitado y prendas cuidadosamente controladas. Recomendamos revisar la guía de tallas antes de comprar. Si tienes dudas, puedes escribirnos antes de finalizar tu compra.</p>
              <p><strong>Productos con falla o error</strong><br />
              Si recibes un producto con falla de fábrica, error en el modelo, color, talla, diseño o estampado, escríbenos dentro de las 48 horas desde que recibes tu pedido. En estos casos, si bien no es posible la devolución, nos hacemos cargo del cambio y cubrimos el envío correspondiente.</p>
              <p><strong>Condiciones importantes</strong><br />
              No se aceptan cambios en productos usados, lavados o dañados por mal uso.</p>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
