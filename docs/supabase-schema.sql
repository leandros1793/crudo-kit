-- ==========================================
-- CRUDO ECOMMERCE KIT — Schema Supabase
-- Ejecutar en el SQL Editor de tu proyecto
-- ==========================================

-- Tabla productos
create table if not exists productos (
  id          bigint primary key generated always as identity,
  nombre      text not null,
  descripcion text,
  precio      numeric not null,
  categoria   text not null check (categoria in ('superior','inferior','abrigos','calzado')),
  talles      text[] default '{}',
  emoji       text,
  badge       text check (badge in ('new','hot','last') or badge is null),
  activo      boolean default true,
  created_at  timestamptz default now()
);

-- Tabla pedidos
create table if not exists pedidos (
  id                bigint primary key generated always as identity,
  items             jsonb not null,
  comprador         jsonb,
  total             numeric not null,
  mp_preference_id  text,
  mp_payment_id     text,
  estado            text default 'pendiente'
                      check (estado in ('pendiente','aprobado','rechazado','cancelado')),
  created_at        timestamptz default now()
);

-- Row Level Security — solo lectura pública para productos
alter table productos enable row level security;
create policy "Productos visibles" on productos
  for select using (activo = true);

-- Datos de ejemplo
insert into productos (nombre, descripcion, precio, categoria, talles, emoji, badge) values
  ('Campera Cargo',   'Tela resistente al viento. 4 bolsillos.',    89990, 'abrigos',  array['S','M','L','XL'],       '🧥', 'new'),
  ('Buzo Oversize',   'Algodón 340g. Fit holgado, puños canale.',   47500, 'superior', array['S','M','L','XL'],       '👕', 'hot'),
  ('Cargo Baggy',     'Rip-stop con refuerzo en rodilla.',          62000, 'inferior', array['28','30','32','34'],    '👖', null),
  ('Zapatilla Low',   'Suela vulcanizada. Lona premium.',           74500, 'calzado',  array['39','40','41','42','43'],'👟', 'hot'),
  ('Remera Pesada',   'Jersey 220g. Cuello canalé ancho.',          28900, 'superior', array['S','M','L','XL'],       '🎽', null),
  ('Chaleco Técnico', 'Relleno sintético. Liviano y cálido.',       71000, 'abrigos',  array['M','L'],                '🦺', 'last'),
  ('Short Cargo',     '6 bolsillos. Tela Taslan.',                  38500, 'inferior', array['S','M','L','XL'],       '🩳', null),
  ('Bota Urbana',     'Caña media. Suela dentada antideslizante.',  95000, 'calzado',  array['39','40','41','42'],    '🥾', 'new');
