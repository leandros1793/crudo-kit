import { useCart } from '../../context/CartContext'
import { formatARS } from '../../utils/precio'

const BADGE_MAP = {
  new: { label: 'Nuevo', clase: 'badge-new' },
  hot: { label: '🔥 Hot', clase: 'badge-hot' },
  last: { label: 'Últimos', clase: 'badge-last' },
}

export default function ProductCard({ producto }) {
  const { agregar, items } = useCart()
  const enCarrito = items.find(i => i.id === producto.id)
  const badge = BADGE_MAP[producto.badge]

  return (
    <div className="prod">
      <div className="prod-img">
        {badge && <span className={`prod-badge ${badge.clase}`}>{badge.label}</span>}
        <span>{producto.emoji}</span>
      </div>
      <div className="prod-body">
        <p className="prod-name">{producto.nombre}</p>
        <p className="prod-desc">{producto.descripcion}</p>
        <div className="prod-bottom">
          <p className="prod-price">
            {formatARS(producto.precio)} <span>ARS</span>
          </p>
          <button
            className={`add-btn ${enCarrito ? 'added' : ''}`}
            onClick={() => agregar(producto)}
          >
            {enCarrito ? '✓ Agregado' : '+ Bolsa'}
          </button>
        </div>
      </div>
    </div>
  )
}
