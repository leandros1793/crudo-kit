import { useState } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export function useMercadoPago() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const iniciarPago = async (items, payer) => {
    setLoading(true)
    setError(null)

    try {
      const { data } = await axios.post(`${API}/pagos/crear-preferencia`, {
        items: items.map(i => ({
          id: i.id,
          name: i.nombre,
          price: i.precio,
          quantity: i.qty
        })),
        payer
      })

      // En producción: init_point
      // En sandbox/dev: sandbox_init_point
      const url = import.meta.env.PROD
        ? data.init_point
        : data.sandbox_init_point

      window.location.href = url
    } catch (err) {
      setError(err.response?.data?.error || 'Error al conectar con MercadoPago')
    } finally {
      setLoading(false)
    }
  }

  return { iniciarPago, loading, error }
}
