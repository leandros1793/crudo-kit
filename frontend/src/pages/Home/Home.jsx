// Home.jsx
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const nav = useNavigate()
  return (
    <div className="view active" id="v-home">
      <div className="hero">
        <div>
          <p className="hero-eyebrow">Nueva temporada — Buenos Aires</p>
          <h1 className="hero-title">USALO<br/>EN LA<br/><em>CALLE</em></h1>
          <p className="hero-sub">Ropa que resiste el AMBA. Sin logos innecesarios, sin hype importado. Streetwear argento hecho para durar.</p>
          <button className="hero-cta" onClick={() => nav('/productos')}>Ver colección</button>
        </div>
        <div className="hero-visual">
          <div className="hero-card" style={{background:'#111'}}>
            <div className="hero-card-emoji">🧥</div>
            <div className="hero-card-name">Campera Cargo</div>
            <div className="hero-card-price">$89.990</div>
          </div>
          <div className="hero-card" style={{background:'#0e0e0e'}}>
            <div className="hero-card-emoji">👟</div>
            <div className="hero-card-name">Zapatilla Low</div>
            <div className="hero-card-price">$74.500</div>
          </div>
        </div>
      </div>
      <div className="promo-bar">
        Envío gratis a todo el país en compras +$80.000 — Pagá en hasta 12 cuotas sin interés con Mercado Pago
      </div>
    </div>
  )
}
