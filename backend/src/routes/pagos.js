import { Router } from 'express'
import { MercadoPagoConfig, Preference } from 'mercadopago'

const router = Router()

const useMockMP = !process.env.MP_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN.includes('xxxx')
const mp = useMockMP ? null : new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN })

router.post('/crear-preferencia', async (req, res) => {
  if (useMockMP) {
    return res.json({
      ok: true,
      init_point: 'https://www.mercadopago.com.ar',
      sandbox_init_point: 'https://sandbox.mercadopago.com.ar',
      source: 'mock'
    })
  }
  try {
    const { items, payer } = req.body
    const preference = new Preference(mp)
    const response = await preference.create({
      body: {
        items: items.map(item => ({
          id: String(item.id),
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: 'ARS'
        })),
        payer: { email: payer?.email || 'comprador@mail.com' },
        back_urls: {
          success: `${process.env.CLIENT_URL}/pedido/exito`,
          failure: `${process.env.CLIENT_URL}/pedido/error`,
          pending: `${process.env.CLIENT_URL}/pedido/pendiente`
        },
        auto_return: 'approved',
        payment_methods: { installments: 12 },
        statement_descriptor: 'CRUDO STORE'
      }
    })
    res.json({ ok: true, init_point: response.init_point, sandbox_init_point: response.sandbox_init_point })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
})

router.post('/webhook', async (req, res) => {
  const { type, data } = req.body
  if (type === 'payment') console.log('Pago recibido:', data.id)
  res.sendStatus(200)
})

export default router
