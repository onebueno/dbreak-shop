import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import logo from '../assets/logo_alt.png'
import './Checkout.css'

const WHATSAPP_NUMBER = '51941573650'

const DISTRITOS_LIMA = [
  'Barranco', 'Breña', 'Callao', 'Chorrillos', 'Comas', 'El Agustino',
  'Independencia', 'Jesús María', 'La Molina', 'La Victoria', 'Lince',
  'Los Olivos', 'Lurín', 'Magdalena del Mar', 'Miraflores', 'Pueblo Libre',
  'Puente Piedra', 'Rímac', 'San Borja', 'San Isidro', 'San Juan de Lurigancho',
  'San Juan de Miraflores', 'San Luis', 'San Martín de Porres', 'San Miguel',
  'Santa Anita', 'Santiago de Surco', 'Surquillo', 'Villa El Salvador',
  'Villa María del Triunfo', 'Otro',
]

const initialForm = {
  nombres: '',
  apellidos: '',
  email: '',
  telefono: '',
  direccion: '',
  referencia: '',
  distrito: '',
  ciudad: 'Lima',
}

function Field({ label, error, children }) {
  return (
    <div className={`checkout-field${error ? ' checkout-field--error' : ''}`}>
      <label className="checkout-field__label">{label}</label>
      {children}
      {error && <p className="checkout-field__error">{error}</p>}
    </div>
  )
}

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.nombres.trim()) e.nombres = 'Campo requerido'
    if (!form.apellidos.trim()) e.apellidos = 'Campo requerido'
    if (!form.email.trim()) e.email = 'Campo requerido'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido'
    if (!form.telefono.trim()) e.telefono = 'Campo requerido'
    if (!form.direccion.trim()) e.direccion = 'Campo requerido'
    if (!form.distrito) e.distrito = 'Selecciona un distrito'
    return e
  }

  const buildWhatsAppMessage = () => {
    const orderLines = items.map(item =>
      `• ${item.name} / Talla: ${item.size}${item.color ? ` / Color: ${item.color}` : ''} x${item.quantity} — S/ ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n')

    const msg = [
      `Hola! Quiero confirmar mi pedido en Don't Break Worldwide 🛒`,
      ``,
      `👤 DATOS`,
      `Nombre: ${form.nombres} ${form.apellidos}`,
      `Email: ${form.email}`,
      `Teléfono: ${form.telefono}`,
      ``,
      `📦 DIRECCIÓN`,
      `${form.direccion}`,
      `${form.distrito}, ${form.ciudad}`,
      form.referencia ? `Referencia: ${form.referencia}` : null,
      ``,
      `🛍️ PEDIDO`,
      orderLines,
      ``,
      `💰 TOTAL: S/ ${totalPrice.toFixed(2)}`,
      ``,
      `Voy a realizar el YAPE al número 941 573 650 por S/ ${totalPrice.toFixed(2)}.`,
    ].filter(l => l !== null).join('\n')

    return encodeURIComponent(msg)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const firstError = document.querySelector('.checkout-field--error')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
    clearCart()
  }

  if (items.length === 0 && !submitted) {
    return (
      <div className="checkout-empty">
        <p>Tu carrito está vacío.</p>
        <Link to="/catalog">← Ver catálogo</Link>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="checkout-success">
        <div className="checkout-success__inner">
          <div className="checkout-success__icon">✓</div>
          <h2>¡Pedido enviado!</h2>
          <p>Te hemos redirigido a WhatsApp para confirmar tu pedido.<br />Nos pondremos en contacto contigo a la brevedad.</p>
          <Link to="/" className="checkout-success__btn">VOLVER AL INICIO</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout">
      <div className="checkout__header">
        <Link to="/" className="checkout__logo">
          <img src={logo} alt="dbreak" className="checkout__logo-img" />
        </Link>
      </div>

      <div className="checkout__layout">
        {/* FORM */}
        <form className="checkout__form" onSubmit={handleSubmit} noValidate>

          {/* Step 1 */}
          <div className="checkout__section">
            <h2 className="checkout__section-title">
              <span className="checkout__step">01</span>
              DATOS PERSONALES
            </h2>
            <div className="checkout__grid-2">
              <Field label="NOMBRES *" error={errors.nombres}>
                <input
                  className="checkout-input"
                  type="text"
                  name="nombres"
                  value={form.nombres}
                  onChange={handleChange}
                  placeholder="Juan"
                  autoComplete="given-name"
                />
              </Field>
              <Field label="APELLIDOS *" error={errors.apellidos}>
                <input
                  className="checkout-input"
                  type="text"
                  name="apellidos"
                  value={form.apellidos}
                  onChange={handleChange}
                  placeholder="Pérez"
                  autoComplete="family-name"
                />
              </Field>
              <Field label="EMAIL *" error={errors.email}>
                <input
                  className="checkout-input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="juan@email.com"
                  autoComplete="email"
                />
              </Field>
              <Field label="TELÉFONO *" error={errors.telefono}>
                <input
                  className="checkout-input"
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="987 654 321"
                  autoComplete="tel"
                />
              </Field>
            </div>
          </div>

          {/* Step 2 */}
          <div className="checkout__section">
            <h2 className="checkout__section-title">
              <span className="checkout__step">02</span>
              DIRECCIÓN DE ENVÍO
            </h2>
            <div className="checkout__grid-1">
              <Field label="DIRECCIÓN *" error={errors.direccion}>
                <input
                  className="checkout-input"
                  type="text"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  placeholder="Av. Ejemplo 123, Dpto. 4B"
                  autoComplete="street-address"
                />
              </Field>
            </div>
            <div className="checkout__grid-2">
              <Field label="DISTRITO *" error={errors.distrito}>
                <select
                  className="checkout-input checkout-select"
                  name="distrito"
                  value={form.distrito}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar distrito</option>
                  {DISTRITOS_LIMA.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </Field>
              <Field label="CIUDAD">
                <input
                  className="checkout-input checkout-input--readonly"
                  type="text"
                  name="ciudad"
                  value={form.ciudad}
                  readOnly
                />
              </Field>
            </div>
            <div className="checkout__grid-1">
              <Field label="REFERENCIA (opcional)">
                <input
                  className="checkout-input"
                  type="text"
                  name="referencia"
                  value={form.referencia}
                  onChange={handleChange}
                  placeholder="Frente al parque, edificio azul..."
                />
              </Field>
            </div>
          </div>

          {/* Step 3 */}
          <div className="checkout__section">
            <h2 className="checkout__section-title">
              <span className="checkout__step">03</span>
              MÉTODO DE PAGO
            </h2>

            <div className="checkout__yape-card">
              <div className="checkout__yape-header">
                <div className="checkout__yape-logo">
                  <span>YAPE</span>
                </div>
                <span className="checkout__yape-badge">Único método disponible</span>
              </div>

              <div className="checkout__yape-info">
                <div className="checkout__yape-row">
                  <span className="checkout__yape-row-label">Número Yape</span>
                  <span className="checkout__yape-row-value">941 573 650</span>
                </div>
                <div className="checkout__yape-row">
                  <span className="checkout__yape-row-label">Nombre</span>
                  <span className="checkout__yape-row-value">Don't Break</span>
                </div>
                <div className="checkout__yape-row checkout__yape-row--total">
                  <span className="checkout__yape-row-label">Monto a Yapear</span>
                  <span className="checkout__yape-row-value">S/ {totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="checkout__yape-note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p>Realiza tu Yape por <strong>S/ {totalPrice.toFixed(2)}</strong> al número <strong>941 573 650</strong>. Al confirmar, serás redirigido a WhatsApp donde podrás adjuntar el comprobante y verificar el estado de tu pedido.</p>
              </div>
            </div>
          </div>

          <button type="submit" className="checkout__submit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            CONFIRMAR PEDIDO POR WHATSAPP
          </button>
        </form>

        {/* ORDER SUMMARY */}
        <aside className="checkout__summary">
          <h3 className="checkout__summary-title">TU PEDIDO</h3>
          <div className="checkout__summary-items">
            {items.map(item => (
              <div key={item.key} className="checkout__summary-item">
                <div className="checkout__summary-img">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={e => { e.target.style.display = 'none' }}
                  />
                  <span className="checkout__summary-qty">{item.quantity}</span>
                </div>
                <div className="checkout__summary-info">
                  <p className="checkout__summary-name">{item.name}</p>
                  <p className="checkout__summary-meta">
                    {item.size}{item.color ? ` · ${item.color}` : ''}
                  </p>
                </div>
                <p className="checkout__summary-price">S/ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="checkout__summary-totals">
            <div className="checkout__summary-row">
              <span>Subtotal</span>
              <span>S/ {totalPrice.toFixed(2)}</span>
            </div>
            <div className="checkout__summary-row">
              <span>Envío</span>
              <span className="checkout__summary-shipping">A coordinar</span>
            </div>
            <div className="checkout__summary-row checkout__summary-row--total">
              <span>Total</span>
              <span>S/ {totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <p className="checkout__summary-note">
            El costo de envío será coordinado por WhatsApp según tu ubicación.
          </p>
        </aside>
      </div>
    </div>
  )
}
