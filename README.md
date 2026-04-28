# 🍞 Bukan Roti Biasa (BRB) — Website + Keranjang Belanja

Website company profile + sistem keranjang belanja dengan Supabase untuk toko roti artisan **BRB**, Harapan Raya, Pekanbaru.

---

## 🛠️ Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Supabase** — database cart & produk (realtime)
- **Lucide React** — icon library
- **Google Fonts** — Playfair Display + DM Sans + Caveat

---

## 🚀 Setup Lengkap

### 1. Rename file env
Salin `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

Edit file `.env` dengan data Supabase kamu:
```env
VITE_SUPABASE_URL=https://xxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_WHATSAPP_NUMBER=6281234567890
```

> ⚠️ Format nomor WA: **62** + nomor tanpa 0 di awal. Contoh: `08123456789` → `628123456789`

---

### 2. Setup Supabase

Buka **SQL Editor** di dashboard Supabase, jalankan query berikut:

```sql
-- Tabel produk
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT,
  description TEXT,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabel cart
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX ON cart_items(session_id);

-- RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Cart full access" ON cart_items FOR ALL USING (true) WITH CHECK (true);

-- Aktifkan Realtime untuk cart_items
-- Masuk ke: Database > Replication > tambahkan tabel cart_items
```

### 3. Insert produk
```sql
INSERT INTO products (name, price, category, description) VALUES
  ('Roti Guling',    25000, 'roti',    'Roti guling lembut dengan isian varian pilihan'),
  ('Roti Roll',      22000, 'roti',    'Roti roll premium dengan filling creamy'),
  ('Dubai Chewy',    35000, 'special', 'Viral Dubai chocolate chewy cookies'),
  ('Cookies Choco',  18000, 'cookies', 'Soft cookies cokelat premium ukuran jumbo'),
  ('Tiramisu Cake',  55000, 'cake',    'Tiramisu cake lembut dengan mascarpone'),
  ('Box Hampers',   150000, 'hampers', 'Box hampers cantik siap kirim, cocok untuk hadiah');
```

### 4. Aktifkan Realtime
Di Supabase Dashboard:
1. Klik **Database** → **Replication**
2. Klik tabel **cart_items** → aktifkan toggle

---

### 5. Install & jalankan
```bash
npm install
npm run dev
```

Buka: **http://localhost:5173**

---

## 📁 Struktur Folder

```
brb-website/
├── public/
│   └── favicon.svg
├── src/
│   ├── lib/
│   │   └── supabase.ts          ← Supabase client
│   ├── hooks/
│   │   └── useCart.ts           ← Cart logic (CRUD + realtime)
│   ├── types/
│   │   └── index.ts             ← TypeScript types
│   ├── components/
│   │   ├── Navbar.tsx/css       ← Navbar + cart icon badge
│   │   ├── Hero.tsx/css         ← Landing section
│   │   ├── Marquee.tsx/css      ← Ticker berjalan
│   │   ├── About.tsx/css        ← Cerita brand
│   │   ├── Products.tsx/css     ← Grid produk + tombol cart
│   │   ├── CartDrawer.tsx/css   ← Sidebar keranjang belanja
│   │   ├── WhyUs.tsx/css        ← Keunggulan BRB
│   │   ├── Testimonials.tsx/css ← Slider ulasan
│   │   ├── Location.tsx/css     ← Cabang & ojol
│   │   └── Footer.tsx/css       ← Footer
│   ├── App.tsx / App.css
│   ├── index.css
│   └── main.tsx
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🛒 Cara Kerja Sistem Keranjang

1. Pembeli buka website → **session ID** otomatis dibuat (simpan di localStorage)
2. Klik **"Tambah"** pada produk → data tersimpan ke Supabase `cart_items`
3. Tambah/kurang qty → database **otomatis update** (realtime)
4. Klik **"Pesan via WhatsApp"** → diarahkan ke WA admin dengan format pesanan lengkap
5. Pembayaran dikonfirmasi oleh admin via WhatsApp

---

## 🏗️ Build Production

```bash
npm run build
```

Output: folder `dist/` — siap di-upload ke hosting (Vercel, Netlify, dll).
