import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext(null)

const initialState = { items: [] }

function cartReducer(state, action) {
  switch (action.type) {
    case 'AGREGAR': {
      const existe = state.items.find(i => i.id === action.producto.id)
      if (existe) {
        return {
          items: state.items.map(i =>
            i.id === action.producto.id ? { ...i, qty: i.qty + 1 } : i
          )
        }
      }
      return { items: [...state.items, { ...action.producto, qty: 1 }] }
    }
    case 'QUITAR': {
      return {
        items: state.items
          .map(i => i.id === action.id ? { ...i, qty: i.qty - 1 } : i)
          .filter(i => i.qty > 0)
      }
    }
    case 'ELIMINAR':
      return { items: state.items.filter(i => i.id !== action.id) }
    case 'VACIAR':
      return initialState
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const agregar = (producto) => dispatch({ type: 'AGREGAR', producto })
  const quitar = (id) => dispatch({ type: 'QUITAR', id })
  const eliminar = (id) => dispatch({ type: 'ELIMINAR', id })
  const vaciar = () => dispatch({ type: 'VACIAR' })

  const total = state.items.reduce((acc, i) => acc + i.precio * i.qty, 0)
  const cantidad = state.items.reduce((acc, i) => acc + i.qty, 0)
  const envioGratis = total >= 80000
  const costoEnvio = envioGratis ? 0 : 6500
  const totalConEnvio = total + costoEnvio

  return (
    <CartContext.Provider value={{
      items: state.items,
      total,
      cantidad,
      envioGratis,
      costoEnvio,
      totalConEnvio,
      agregar,
      quitar,
      eliminar,
      vaciar
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
