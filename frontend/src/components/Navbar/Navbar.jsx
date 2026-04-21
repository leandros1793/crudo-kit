import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function Navbar() {
  const { cantidad } = useCart()
  const { pathname } = useLocation()

  return (
    <nav>
      <Link to="/" className="logo">CRUDO<span>®</span></Link>
      <div className="nav-center">
        <Link to="/" className={`nav-tab ${pathname === '/' ? 'active' : ''}`}>Inicio</Link>
        <Link to="/productos" className={`nav-tab ${pathname === '/productos' ? 'active' : ''}`}>Productos</Link>
      </div>
      <div className="nav-right">
        <Link to="/bolsa" className="cart-trigger">
          Bolsa <span className="cart-badge">{cantidad}</span>
        </Link>
      </div>
    </nav>
  )
}
