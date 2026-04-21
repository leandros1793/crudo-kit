import { useCart } from '../../context/CartContext'
import { useMercadoPago } from '../../hooks/useMercadoPago'
import { formatARS, calcCuota } from '../../utils/precio'

export default function Cart() {
  const { items, total, totalConEnvio, costoEnvio, envioGratis, quitar, agregar } = useCart()
  const { iniciarPago, loading, error } = useMercadoPago()

  if (!items.length) {
    return (
      <div className="cart-empty">
        <span className="cart-empty-icon">🛍</span>
        <p>Tu bolsa está vacía.</p>
      </div>
    )
  }

  const handlePagar = () => {
    iniciarPago(items, { email: '' })
  }

  return (
    <div className="cart-wrap">
      <h2 className="cart-h">Tu bolsa</h2>

      {items.map(item => (
        <div key={item.id} className="cart-item">
          <div className="ci-img">{item.emoji}</div>
          <div className="ci-info">
            <p className="ci-name">{item.nombre}</p>
            <p className="ci-price">{formatARS(item.precio)} c/u</p>
          </div>
          <div className="ci-right">
            <p className="ci-subtotal">{formatARS(item.precio * item.qty)}</p>
            <div className="qty-row">
              <button className="qty-btn" onClick={() => quitar(item.id)}>−</button>
              <span className="qty-num">{item.qty}</span>
              <button className="qty-btn" onClick={() => agregar(item)}>+</button>
            </div>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <div className="sum-row">
          <span>Subtotal</span>
          <span>{formatARS(total)}</span>
        </div>
        <div className="sum-row">
          <span>Envío</span>
          <span>{envioGratis
            ? <span className="sum-envio">Gratis 🎉</span>
            : formatARS(costoEnvio)
          }</span>
        </div>
        <div className="sum-total">
          <span className="sum-total-label">Total</span>
          <span className="sum-total-val">{formatARS(totalConEnvio)}</span>
        </div>

        {error && <p className="mp-error">{error}</p>}

        <button
          className="mp-btn"
          onClick={handlePagar}
          disabled={loading}
        >
          {loading ? 'Redirigiendo...' : <>Pagar con <span className="mp-logo">MP</span></>}
        </button>

        <div className="cuotas-box">
          💳 12 cuotas sin interés de <strong>{calcCuota(totalConEnvio)}</strong>
        </div>
        <p className="mp-note">
          Pagá con tarjeta, débito, dinero en cuenta o Pago Fácil / Rapipago
        </p>
      </div>
    </div>
  )
}
