import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import Navbar from './components/Navbar.jsx'
import Cart from './components/Cart.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Checkout from './pages/Checkout.jsx'

function AppInner() {
  const [cartOpen, setCartOpen] = useState(false)
  const location = useLocation()
  const isCheckout = location.pathname === '/checkout'
  const openCart = () => setCartOpen(true)

  return (
    <>
      {!isCheckout && <Navbar onCartOpen={openCart} />}
      {!isCheckout && <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />}
      <main>
        <Routes>
          <Route path="/" element={<Home onCartOpen={openCart} />} />
          <Route path="/catalog" element={<Catalog onCartOpen={openCart} />} />
          <Route path="/product/:id" element={<ProductDetail onCartOpen={openCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      {!isCheckout && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  )
}
