import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, categories } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import './Catalog.css'

export default function Catalog({ onCartOpen }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'all')
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat) setActiveCategory(cat)
  }, [searchParams])

  const handleCategory = (catId) => {
    setActiveCategory(catId)
    if (catId === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ cat: catId })
    }
  }

  const filtered = useMemo(() => {
    let list = activeCategory === 'all'
      ? [...products]
      : products.filter(p => p.category === activeCategory)

    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sortBy === 'name') list.sort((a, b) => a.name.localeCompare(b.name))

    return list
  }, [activeCategory, sortBy])

  return (
    <div className="catalog">
      <div className="catalog__hero">
        <h1 className="catalog__hero-title">CATÁLOGO</h1>
        <p className="catalog__hero-sub">{products.length} PRENDAS</p>
      </div>

      <div className="catalog__controls">
        <div className="catalog__filters">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn${activeCategory === cat.id ? ' filter-btn--active' : ''}`}
              onClick={() => handleCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="catalog__sort">
          <label className="catalog__sort-label" htmlFor="sort">ORDENAR:</label>
          <select
            id="sort"
            className="catalog__sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="default">Relevancia</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name">Nombre A-Z</option>
          </select>
        </div>
      </div>

      <div className="catalog__body">
        {filtered.length === 0 ? (
          <div className="catalog__empty">
            <p>No hay productos en esta categoría</p>
          </div>
        ) : (
          <>
            <p className="catalog__count">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</p>
            <div className="catalog__grid">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} onCartOpen={onCartOpen} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
