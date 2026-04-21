import { useState, useEffect } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export function useProductos(categoria = 'todo') {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    const params = categoria !== 'todo' ? { categoria } : {}

    axios.get(`${API}/productos`, { params })
      .then(res => setProductos(res.data.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [categoria])

  return { productos, loading, error }
}
