import { supabase, useMock } from '../db.js'

const MOCK = [
  { id:1, nombre:'Campera Cargo',   descripcion:'Tela resistente al viento. 4 bolsillos.',   precio:89990, categoria:'abrigos',  talles:['S','M','L','XL'],        emoji:'🧥', badge:'new'  },
  { id:2, nombre:'Buzo Oversize',   descripcion:'Algodon 340g. Fit holgado, punos canale.',  precio:47500, categoria:'superior', talles:['S','M','L','XL'],        emoji:'👕', badge:'hot'  },
  { id:3, nombre:'Cargo Baggy',     descripcion:'Rip-stop con refuerzo en rodilla.',         precio:62000, categoria:'inferior', talles:['28','30','32','34'],      emoji:'👖', badge:null   },
  { id:4, nombre:'Zapatilla Low',   descripcion:'Suela vulcanizada. Lona premium.',          precio:74500, categoria:'calzado',  talles:['39','40','41','42','43'], emoji:'👟', badge:'hot'  },
  { id:5, nombre:'Remera Pesada',   descripcion:'Jersey 220g. Cuello canale ancho.',         precio:28900, categoria:'superior', talles:['S','M','L','XL'],        emoji:'🎽', badge:null   },
  { id:6, nombre:'Chaleco Tecnico', descripcion:'Relleno sintetico. Liviano y calido.',      precio:71000, categoria:'abrigos',  talles:['M','L'],                 emoji:'🦺', badge:'last' },
  { id:7, nombre:'Short Cargo',     descripcion:'6 bolsillos. Tela Taslan.',                 precio:38500, categoria:'inferior', talles:['S','M','L','XL'],        emoji:'🩳', badge:null   },
  { id:8, nombre:'Bota Urbana',     descripcion:'Cana media. Suela dentada antideslizante.', precio:95000, categoria:'calzado',  talles:['39','40','41','42'],      emoji:'🥾', badge:'new'  },
]

export async function getProductos(req, res) {
  try {
    const { categoria, orden } = req.query
    if (useMock) {
      let data = [...MOCK]
      if (categoria && categoria !== 'todo') data = data.filter(p => p.categoria === categoria)
      if (orden === 'precio_asc') data.sort((a,b) => a.precio - b.precio)
      if (orden === 'precio_desc') data.sort((a,b) => b.precio - a.precio)
      return res.json({ ok: true, data })
    }
    let query = supabase.from('productos').select('*').eq('activo', true)
    if (categoria && categoria !== 'todo') query = query.eq('categoria', categoria)
    if (orden === 'precio_asc') query = query.order('precio', { ascending: true })
    else if (orden === 'precio_desc') query = query.order('precio', { ascending: false })
    else query = query.order('created_at', { ascending: false })
    const { data, error } = await query
    if (error) throw error
    res.json({ ok: true, data })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
}

export async function getProductoById(req, res) {
  try {
    if (useMock) {
      const data = MOCK.find(p => p.id === Number(req.params.id))
      if (!data) return res.status(404).json({ ok: false, error: 'No encontrado' })
      return res.json({ ok: true, data })
    }
    const { data, error } = await supabase.from('productos').select('*').eq('id', req.params.id).single()
    if (error) throw error
    res.json({ ok: true, data })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
}
