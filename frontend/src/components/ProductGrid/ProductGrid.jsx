import { useState } from 'react'
import { useProductos } from '../../hooks/useProductos'
import ProductCard from '../ProductCard/ProductCard'

const CATEGORIAS = [
  { key: 'todo', label: 'Todo' },
  { key: 'superior', label: 'Superior' },
  { key: 'inferior', label: 'Inferior' },
  { key: 'abrigos', label: 'Abrigos' },
  { key: 'calzado', label: 'Calzado' },
]

export default function ProductGrid() {
  const [cat, setCat] = useState('todo')
  const { productos, loading, error } = useProductos(cat)

  return (
    <div className="catalog-wrap">
      <div className="catalog-toolbar">
        <div className="catalog-title-row">
          <h2 className="catalog-h">Productos</h2>
          <span className="catalog-count">{productos.length} prendas</span>
        </div>
        <div className="filters">
          {CATEGORIAS.map(c => (
            <button
              key={c.key}
              className={`filter-btn ${cat === c.key ? 'active' : ''}`}
              onClick={() => setCat(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {loading && <p style={{color:'var(--apagado)',padding:'40px 0',textAlign:'center'}}>Cargando...</p>}
      {error && <p style={{color:'var(--rojo)',padding:'40px 0',textAlign:'center'}}>{error}</p>}

      <div className="grid">
        {productos.map((p, i) => (
          <ProductCard key={p.id} producto={p} index={i} />
        ))}
      </div>
    </div>
  )
}
