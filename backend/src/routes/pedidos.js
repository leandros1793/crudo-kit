import { Router } from 'express'
import { supabase, useMock } from '../db.js'

const router = Router()

router.post('/', async (req, res) => {
  if (useMock) {
    return res.json({ ok: true, data: { id: Date.now(), ...req.body, estado: 'pendiente' }, source: 'mock' })
  }
  try {
    const { data, error } = await supabase
      .from('pedidos')
      .insert({ ...req.body, estado: 'pendiente', created_at: new Date().toISOString() })
      .select().single()
    if (error) throw error
    res.json({ ok: true, data })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  if (useMock) {
    return res.json({ ok: true, data: { id: req.params.id, estado: 'pendiente' }, source: 'mock' })
  }
  try {
    const { data, error } = await supabase.from('pedidos').select('*').eq('id', req.params.id).single()
    if (error) throw error
    res.json({ ok: true, data })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
})

export default router
