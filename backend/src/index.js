import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import productosRouter from './routes/productos.js'
import pagosRouter from './routes/pagos.js'
import pedidosRouter from './routes/pedidos.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

// Rutas
app.use('/api/productos', productosRouter)
app.use('/api/pagos', pagosRouter)
app.use('/api/pedidos', pedidosRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})
