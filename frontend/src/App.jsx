import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Catalog from './pages/Catalog/Catalog'
import CartPage from './pages/CartPage/CartPage'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Catalog />} />
        <Route path="/bolsa" element={<CartPage />} />
      </Routes>
      <div className="tech-bar">
        <span className="tech-label">Stack:</span>
        {['React 18','Node.js + Express','MercadoPago SDK','Supabase','Vercel','Railway','ARS nativo'].map(t => (
          <span key={t} className={`tech-pill${['React 18','Node.js + Express','MercadoPago SDK'].includes(t) ? ' hi' : ''}`}>{t}</span>
        ))}
      </div>
    </>
  )
}
