# Screens Reference

Dokumentasi lengkap untuk setiap screen di aplikasi KOU Restaurant POS.

---

## 01 — OnboardingScreen

**Route:** `/onboarding`
**File:** `src/components/OnboardingScreen.tsx`
**Theme:** Dark (background-dark)

### Deskripsi

Landing page pertama yang dilihat user. Menampilkan branding KOU dengan animasi glassmorphism, lalu menawarkan pilihan mode pesanan.

### Fitur

- Hero image dengan gradient overlay
- Logo & tagline animasi (Framer Motion)
- Dua tombol CTA:
  - **Makan Di Sini** → `SET_MODE('dine-in')` → navigasi ke `/tables`
  - **Bawa Pulang** → `SET_MODE('take-away')` → navigasi ke `/menu`
- Particle decoration animasi

### State yang Digunakan

- Dispatch: `SET_MODE`

---

## 02 — TableSelectionGrid

**Route:** `/tables`
**File:** `src/components/TableSelectionGrid.tsx`
**Theme:** Light (background-light)

### Deskripsi

Grid 12 meja restoran dengan status real-time. User bisa memilih meja dan jumlah tamu sebelum melanjutkan ke menu.

### Fitur

- Grid meja 3 kolom (mobile) / 4 kolom (desktop)
- Status meja: Available (hijau), Occupied (merah), Reserved (kuning)
- Guest counter (stepper +/-)
- Kapasitas meja: 2, 4, atau 6 orang
- Tombol **Lanjutkan** (CTA) muncul setelah memilih meja → navigasi ke `/menu`
- Animasi staggered grid reveal

### State yang Digunakan

- Read: `selectedTable`, `guestCount`
- Dispatch: `SET_TABLE`, `SET_GUESTS`

### Data Source

- `TABLES` dari `constants.ts` (12 meja, pre-defined status)

---

## 03 — MenuBrowsingGrid

**Route:** `/menu`
**File:** `src/components/MenuBrowsingGrid.tsx`
**Theme:** Light (background-light)

### Deskripsi

Katalog menu restoran dengan fitur pencarian dan filtering. Setiap item bisa langsung ditambahkan ke keranjang.

### Fitur

- Search bar (filter by name)
- Category filter tabs: Semua, Makanan, Minuman, Snack
- Card grid dengan gambar, nama, harga, badge, dan stok
- Tombol `+` untuk add to cart
- Counter badge menampilkan jumlah item di cart
- Floating cart button → navigasi ke `/cart`
- Animasi staggered card reveal

### State yang Digunakan

- Read: `cart`
- Dispatch: `ADD_TO_CART`

### Data Source

- `MENU_ITEMS` dari `constants.ts` (14 items)

---

## 04 — ShoppingCartDetails

**Route:** `/cart`
**File:** `src/components/ShoppingCartDetails.tsx`
**Theme:** Light (background-light)

### Deskripsi

Detail keranjang belanja dengan management kuantitas per item dan kalkulasi total otomatis.

### Fitur

- List item dengan gambar, nama, harga per item
- Stepper (+/-) untuk update quantity
- Tombol hapus (swipe-like delete)
- Kalkulasi otomatis: subtotal, PPN 11%, total
- Ringkasan jumlah item
- Tombol **Lanjut Bayar** → navigasi ke `/payment`
- Tombol kembali ke menu
- AnimatePresence untuk animasi remove item
- Empty state jika cart kosong

### State yang Digunakan

- Read: `cart`
- Dispatch: `UPDATE_QUANTITY`, `REMOVE_FROM_CART`

---

## 05 — PaymentQRISDialog

**Route:** `/payment`
**File:** `src/components/PaymentQRISDialog.tsx`
**Theme:** Light (background-light) dengan overlay blur

### Deskripsi

Dialog pembayaran dengan dua opsi: QRIS dan Cash. Menampilkan QR code pattern dan ringkasan order.

### Fitur

- Tab toggle: QRIS / Cash
- QRIS mode: QR code pattern + instruksi scan
- Cash mode: konfirmasi bayar di kasir
- Ringkasan total pembayaran
- Tombol **Batal** → kembali ke `/cart`
- Tombol **Bayar** → dispatch `COMPLETE_ORDER` → navigasi ke `/receipt`
- Dialog animasi spring entrance

### State yang Digunakan

- Read: `cart`
- Dispatch: `COMPLETE_ORDER` (menyimpan cart ke `lastOrder` sebelum clear)

### Catatan Penting

`COMPLETE_ORDER` menyimpan data cart ke `lastOrder` agar screen Receipt bisa menampilkan item yang benar setelah cart dikosongkan.

---

## 06 — DigitalReceiptPreview

**Route:** `/receipt`
**File:** `src/components/DigitalReceiptPreview.tsx`
**Theme:** Light (background-light)

### Deskripsi

Preview struk digital dengan desain receipt klasik, termasuk QR code untuk verifikasi.

### Fitur

- Header gradient dengan logo & nama restoran
- Order ID otomatis (format: KOU-YYYYMMDD-NNNN)
- Tanggal & waktu otomatis (format Indonesia)
- List item pesanan dengan qty dan harga
- Kalkulasi: subtotal, PPN 11%, total
- Mini QR code untuk verifikasi
- Info metode pembayaran
- Zigzag edge effect (CSS)
- Tombol **Pesan Lagi** → kembali ke `/onboarding`
- Tombol **Bagikan** (placeholder)

### State yang Digunakan

- Read: `lastOrder` (fallback ke `cart` jika null, fallback ke sample data jika keduanya kosong)

### Data Fallback Chain

```
lastOrder → cart → sample data (Salmon Don + Matcha Latte)
```

---

## 07 — CashierPOSMode

**Route:** `/cashier`
**File:** `src/components/CashierPOSMode.tsx`
**Theme:** Dark (background-dark / surface-dark)

### Deskripsi

Interface POS untuk kasir dengan grid menu quick-select dan order summary panel.

### Fitur

- Dark theme interface
- Grid menu 3 kolom (mobile) / 4 kolom (desktop)
- Quick-add ke order list
- Order summary sidebar
- Stepper quantity di order list
- Total kalkulasi real-time
- Tombol **Proses Pesanan**
- Status bar atas dengan info kasir

### State yang Digunakan

- Local state (tidak terhubung ke global context)

---

## 08 — KitchenOrderTickets

**Route:** `/kitchen`
**File:** `src/components/KitchenOrderTickets.tsx`
**Theme:** Dark (background-dark)

### Deskripsi

Display dapur (Kitchen Display System) menampilkan ticket order yang perlu diproses.

### Fitur

- Dark theme optimized untuk kitchen environment
- Horizontal scrollable ticket cards
- Status badges: Baru (biru), Dimasak (kuning), Siap (hijau)
- Timer elapsed per ticket
- Detail item per order + catatan khusus
- Tombol aksi per ticket (Update Status / Selesai)
- Header dengan jumlah order aktif

### State yang Digunakan

- Local state (sample tickets dari `constants.ts`)

### Data Source

- `SAMPLE_TICKETS` dari `constants.ts`

---

## 09 — AdminDashboard

**Route:** `/admin`
**File:** `src/components/AdminDashboard.tsx`
**Theme:** Light (background-light)

### Deskripsi

Dashboard analitik untuk pemilik/manager restoran dengan KPI cards dan ringkasan performa.

### Fitur

- KPI cards: Total Pendapatan, Order Hari Ini, Pelanggan, Rating
- Grafik bar mini (visual only)
- Top menu items list
- Revenue trend indicators
- Periode filter (Hari Ini)
- Animasi staggered reveal

### State yang Digunakan

- Local state (sample analytics data)

---

## 10 — DesignSystemUIKit

**Route:** `/design-system`
**File:** `src/components/DesignSystemUIKit.tsx`
**Theme:** Light & Dark (split sections)

### Deskripsi

Style guide dan UI kit dokumentasi yang menampilkan semua design tokens, komponen, dan pattern yang digunakan di aplikasi.

### Fitur

- Color palette swatches
- Typography scale
- Button variants
- Form inputs
- Badge/chip variants
- Glass component demos
- Dark/light section preview

### State yang Digunakan

- Tidak menggunakan state (static display)
