# CRUDO® Ecommerce Kit 🧥

**Starter kit de e-commerce para marcas de indumentaria argentina.**  
React 18 + Node.js/Express + Supabase + MercadoPago. Listo para deployar en Vercel + Railway.

---

## ¿Qué incluye?

| Módulo | Detalle |
|--------|---------|
| Frontend | React 18 + Vite, React Router, Context API |
| Backend | Node.js + Express, API REST |
| Base de datos | Supabase (PostgreSQL) |
| Pagos | MercadoPago SDK — hasta 12 cuotas sin interés |
| Precios | ARS nativos con `toLocaleString('es-AR')` |
| Deploy | Vercel (frontend) + Railway (backend) |

---

## Estructura

```
crudo-kit/
├── frontend/
│   └── src/
│       ├── components/     # Navbar, ProductCard, Cart, Lookbook
│       ├── context/        # CartContext (useReducer)
│       ├── hooks/          # useProductos, useMercadoPago
│       ├── pages/          # Home, Catalog, CartPage
│       └── utils/          # formatARS, calcCuota
├── backend/
│   └── src/
│       ├── routes/         # productos, pagos, pedidos
│       └── controllers/    # lógica de negocio
└── docs/
    └── supabase-schema.sql # Tablas + datos de ejemplo
```

---

## Instalación en 5 pasos

**1. Clonar y instalar dependencias**
```bash
git clone <tu-repo>
cd crudo-kit
npm run install:all
```

**2. Crear proyecto en Supabase**
- Entrá a [supabase.com](https://supabase.com) y creá un proyecto gratis
- Ejecutá el contenido de `docs/supabase-schema.sql` en el SQL Editor
- Copiá tu `SUPABASE_URL` y `SUPABASE_ANON_KEY`

**3. Configurar variables de entorno**
```bash
# backend/.env
cp backend/.env.example backend/.env
# Completá SUPABASE_URL, SUPABASE_ANON_KEY, MP_ACCESS_TOKEN

# frontend/.env
cp frontend/.env.example frontend/.env
```

**4. Obtener credenciales de MercadoPago**
- Entrá a [mercadopago.com.ar/developers](https://www.mercadopago.com.ar/developers)
- Creá una aplicación y copiá tu `Access Token` de prueba
- Para producción: usá el Access Token de producción

**5. Correr el proyecto**
```bash
npm run dev
# Frontend: http://localhost:5173
# Backend:  http://localhost:3001
```

---

## Deploy

**Frontend → Vercel**
```bash
cd frontend
vercel
# Configurar VITE_API_URL con la URL de tu backend en Railway
```

**Backend → Railway**
- Creá un nuevo proyecto en [railway.app](https://railway.app)
- Conectá tu repo de GitHub
- Configurá las variables de entorno del `.env`

---

## Personalización rápida

| Qué cambiar | Dónde |
|-------------|-------|
| Nombre de la marca | `frontend/src/components/Navbar` |
| Colores | Variables CSS en `frontend/src/index.css` |
| Productos | Tabla `productos` en Supabase |
| Precio de envío gratis | `frontend/src/context/CartContext.jsx` línea 42 |
| Cuotas | `backend/src/routes/pagos.js` línea `installments` |

---

## Stack técnico

- **React 18** — Hooks, Context API, React Router 6
- **Vite** — Build ultrarrápido, HMR
- **Node.js + Express** — API REST con rutas limpias
- **Supabase** — PostgreSQL + Auth + Row Level Security
- **MercadoPago SDK v2** — Checkout Pro con cuotas
- **Vercel + Railway** — Deploy gratuito para empezar

---

## Soporte

¿Dudas o problemas? Abrí un issue o escribime a [tu-mail@gmail.com].

---

*Hecho en Argentina 🇦🇷 — por y para marcas del AMBA*
