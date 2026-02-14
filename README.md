<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Ionic-8.7-3880FF?logo=ionic&logoColor=white" alt="Ionic" />
  <img src="https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.1-06B6D4?logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer&logoColor=white" alt="Framer Motion" />
</p>

# 🍱 KOU Restaurant POS

**KOU** adalah aplikasi Point-of-Sale (POS) berbasis web untuk restoran, dibangun dengan stack modern dan mobile-first design. Aplikasi ini mencakup _end-to-end flow_ dari onboarding pelanggan hingga analitik admin — semua dalam satu Single Page Application.

---

## 📸 Screens

| # | Screen | Route | Deskripsi |
|---|--------|-------|-----------|
| 01 | Onboarding | `/onboarding` | Landing page dengan pilihan dine-in / take-away |
| 02 | Table Selection | `/tables` | Grid pemilihan meja dengan status real-time |
| 03 | Menu Browsing | `/menu` | Katalog menu dengan search, filter & cart integration |
| 04 | Shopping Cart | `/cart` | Detail keranjang dengan quantity management |
| 05 | Payment QRIS | `/payment` | Dialog pembayaran QRIS / Cash |
| 06 | Digital Receipt | `/receipt` | Preview struk digital dengan QR code |
| 07 | Cashier POS | `/cashier` | Mode POS kasir (dark theme) |
| 08 | Kitchen Display | `/kitchen` | Ticket order untuk dapur (dark theme) |
| 09 | Admin Dashboard | `/admin` | Dashboard analitik & KPI |
| 10 | Design System | `/design-system` | UI Kit & style guide |

---

## ✨ Fitur Utama

- **Mobile-First Responsive** — `h-dvh` untuk viewport penuh di mobile, desktop preview mode di `sm` (640px+)
- **Glassmorphism UI** — Glass cards, panels, dan buttons dengan backdrop-blur effects
- **Micro-Interactions** — Animasi halus menggunakan Framer Motion (staggered reveals, spring transitions)
- **State Management** — Context API + `useReducer` untuk cart, table selection, dan order flow
- **Order Flow End-to-End** — Pemilihan meja → browse menu → cart → payment → receipt
- **Multi-Mode** — Dine-in & Take-away mode
- **Bahasa Indonesia** — UI dalam Bahasa Indonesia dengan currency Rupiah
- **Ionic Native Feel** — iOS mode dengan native page transitions

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19.2.0 |
| UI Framework | Ionic React | 8.7.17 |
| Build Tool | Vite | 7.3.1 |
| Language | TypeScript | 5.9.3 |
| Styling | TailwindCSS v4 | 4.1.18 |
| Animation | Framer Motion | 12.34.0 |
| Routing | React Router DOM | 5.3.4 |
| Icons | Material Icons Round + Lucide React | — |
| Font | Plus Jakarta Sans | — |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Ionic CLI** (opsional, untuk `ionic serve`)

### Installation

```bash
# Clone repository
git clone <repo-url>
cd RestaurantIonicApp

# Install dependencies
npm install

# (Opsional) Install Ionic CLI secara global
npm install -g @ionic/cli
```

### Development

```bash
# Jalankan dev server (Vite)
npm run dev

# Atau via Ionic CLI (port 8100)
ionic serve
```

Buka [http://localhost:5173](http://localhost:5173) di browser (atau port yang tersedia).

> 💡 **Tip:** Buka DevTools → Toggle Device Toolbar (Ctrl+Shift+M) untuk melihat tampilan mobile yang optimal.

### Build Production

```bash
# Type-check + build
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
npm run lint
```

---

## 📁 Struktur Project

```
RestaurantIonicApp/
├── index.html                    # Entry HTML dengan meta tags & font imports
├── ionic.config.json             # Konfigurasi Ionic CLI
├── vite.config.ts                # Vite config + TailwindCSS v4 plugin
├── tsconfig.json                 # Root TypeScript config
├── tsconfig.app.json             # App-specific TS config (strict mode)
├── package.json                  # Dependencies & scripts
│
├── public/                       # Static assets
│   └── vite.svg
│
└── src/
    ├── main.tsx                  # React entry point
    ├── App.tsx                   # Router & route definitions
    ├── index.css                 # Global styles, design tokens, glass components
    │
    ├── data/
    │   └── constants.ts          # Tipe data, menu items, tables, sample data
    │
    ├── store/
    │   └── AppContext.tsx         # Global state (Context + useReducer)
    │
    └── components/
        ├── OnboardingScreen.tsx       # 01 — Onboarding
        ├── TableSelectionGrid.tsx     # 02 — Pemilihan Meja
        ├── MenuBrowsingGrid.tsx       # 03 — Browse Menu
        ├── ShoppingCartDetails.tsx    # 04 — Keranjang
        ├── PaymentQRISDialog.tsx      # 05 — Pembayaran
        ├── DigitalReceiptPreview.tsx   # 06 — Struk Digital
        ├── CashierPOSMode.tsx         # 07 — Mode Kasir
        ├── KitchenOrderTickets.tsx     # 08 — Display Dapur
        ├── AdminDashboard.tsx         # 09 — Dashboard Admin
        └── DesignSystemUIKit.tsx      # 10 — Design System
```

---

## 🎨 Design System

### Color Palette

| Token | Hex | Penggunaan |
|-------|-----|------------|
| `--color-primary` | `#0fbd55` | Aksi utama, CTA, aksen |
| `--color-primary-dark` | `#0b8a3e` | Hover states |
| `--color-primary-light` | `#3fd67e` | Highlight & gradient |
| `--color-background-light` | `#f6f8f7` | Background light theme |
| `--color-background-dark` | `#102217` | Background dark theme |
| `--color-surface` | `#ffffff` | Card surfaces |
| `--color-surface-dark` | `#1a2e22` | Dark mode surfaces |

### Typography

- **Font Family:** Plus Jakarta Sans (400, 500, 600, 700, 800)
- **Icon Set:** Material Icons Round, Lucide React

### Glass Components (CSS Classes)

| Class | Deskripsi |
|-------|-----------|
| `.glass-card` | Dark glass card dengan blur effect |
| `.glass-panel` | Light glass panel |
| `.glass-panel-dark` | Dark glass panel |
| `.glass-btn` | Glass button dengan hover effects |
| `.glass-btn-light` | Light variant glass button |
| `.glass-btn-emerald` | Green glow hover effect |
| `.glass-btn-teal` | Teal glow hover effect |
| `.badge-success` / `warning` / `danger` / `info` | Status badges |
| `.receipt-zigzag` | Zigzag edge untuk struk |
| `.stepper-btn` | Quantity stepper button |
| `.table-dot-*` | Status indicators untuk meja |
| `.kitchen-ticket` | Kitchen display ticket card |

### Responsive Strategy

```
Mobile (< 640px)          Desktop Preview (≥ 640px)
┌──────────────────┐      ┌────────────────────────────┐
│ h-dvh            │      │    p-4                     │
│ p-0              │      │  ┌──────────────────────┐  │
│ rounded-none     │      │  │ max-w-[428px]        │  │
│ shadow-none      │      │  │ h-[min(926px,95vh)]  │  │
│ full-bleed       │      │  │ rounded-2xl          │  │
│                  │      │  │ shadow-lg            │  │
│                  │      │  │                      │  │
│                  │      │  └──────────────────────┘  │
└──────────────────┘      └────────────────────────────┘
```

---

## 🔄 State Management

Aplikasi menggunakan **React Context + useReducer** pattern.

### State Shape

```typescript
interface AppState {
  cart: CartItem[];              // Item dalam keranjang
  lastOrder: CartItem[] | null;  // Order terakhir (untuk receipt)
  selectedTable: TableInfo | null; // Meja yang dipilih
  guestCount: number;            // Jumlah tamu (1-12)
  orderMode: 'dine-in' | 'take-away'; // Mode order
  lang: 'ID' | 'EN';            // Bahasa
}
```

### Actions

| Action | Payload | Deskripsi |
|--------|---------|-----------|
| `ADD_TO_CART` | `CartItem` | Tambah item ke cart (auto-increment jika ada) |
| `REMOVE_FROM_CART` | `string` (id) | Hapus item dari cart |
| `UPDATE_QUANTITY` | `{ id, quantity }` | Update jumlah item |
| `CLEAR_CART` | — | Kosongkan cart |
| `COMPLETE_ORDER` | — | Simpan cart ke `lastOrder`, lalu kosongkan cart |
| `SET_TABLE` | `TableInfo \| null` | Pilih / reset meja |
| `SET_GUESTS` | `number` | Set jumlah tamu |
| `SET_MODE` | `'dine-in' \| 'take-away'` | Set mode order |
| `SET_LANG` | `'ID' \| 'EN'` | Ganti bahasa |

### Penggunaan

```tsx
import { useAppContext } from '../store/AppContext';

const MyComponent = () => {
  const { state, dispatch } = useAppContext();

  // Baca state
  const { cart, selectedTable, orderMode } = state;

  // Dispatch action
  dispatch({ type: 'ADD_TO_CART', payload: menuItem });
  dispatch({ type: 'SET_TABLE', payload: table });
};
```

---

## 🧭 User Flow

```
┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│  Onboarding  │───▶│ Table Select  │───▶│ Menu Browse  │
│  (Dine-in)   │    │  + Guests    │    │  + Search    │
└─────────────┘    └──────────────┘    └──────┬───────┘
       │                                       │
       │ (Take-away)                           ▼
       │                               ┌──────────────┐
       └──────────────────────────────▶│ Shopping Cart │
                                       │  + Quantity   │
                                       └──────┬───────┘
                                              │
                                              ▼
                                       ┌──────────────┐
                                       │   Payment     │
                                       │  QRIS / Cash  │
                                       └──────┬───────┘
                                              │
                                              ▼
                                       ┌──────────────┐
                                       │   Receipt     │
                                       │  + QR Code    │
                                       └──────────────┘

Staff Screens (Direct Access):
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Cashier POS  │  │ Kitchen DKP  │  │ Admin Panel  │
│  /cashier     │  │ /kitchen     │  │ /admin       │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## 📦 Data Types

Didefinisikan di `src/data/constants.ts`:

```typescript
// Item menu restoran
interface MenuItem {
  id: string;
  name: string;
  price: number;        // dalam Rupiah
  image: string;
  category: 'makanan' | 'minuman' | 'snack';
  description?: string;
  stock: number;
  badge?: string;       // "Best Seller", "New", "Premium", dll
}

// Item di cart (extends MenuItem)
interface CartItem extends MenuItem {
  quantity: number;
  notes?: string;
}

// Informasi meja
interface TableInfo {
  id: number;
  label: string;        // "T01", "T02", ...
  capacity: number;     // 2, 4, atau 6
  status: 'available' | 'occupied' | 'reserved';
}

// Ticket order dapur
interface OrderTicket {
  id: string;
  tableLabel: string;
  items: { name: string; qty: number; notes?: string }[];
  status: 'new' | 'cooking' | 'ready';
  time: string;
  elapsed: string;
}
```

---

## ⚙️ Konfigurasi

### Vite (`vite.config.ts`)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### TailwindCSS v4

TailwindCSS v4 menggunakan **CSS-first configuration** — tidak ada `tailwind.config.js`. Semua design tokens didefinisikan langsung di `src/index.css` via `@theme` directive:

```css
@import "tailwindcss";

@theme {
  --color-primary: #0fbd55;
  --color-background-dark: #102217;
  --font-display: "Plus Jakarta Sans", sans-serif;
  /* ... */
}
```

### Ionic

- Config file: `ionic.config.json`
- Type: `react-vite`
- Mode: `ios` (set di `App.tsx` via `setupIonicReact({ mode: 'ios' })`)

### TypeScript

- **Target:** ES2022
- **Strict mode:** Enabled
- **verbatimModuleSyntax:** Enabled (type-only imports required)
- **JSX:** react-jsx (automatic runtime)

---

## 📝 NPM Scripts

| Script | Perintah | Deskripsi |
|--------|----------|-----------|
| `dev` | `vite` | Jalankan dev server dengan HMR |
| `build` | `tsc -b && vite build` | Type-check dan build production |
| `lint` | `eslint .` | Jalankan ESLint |
| `preview` | `vite preview` | Preview build production secara lokal |

---

## 🌐 Browser Support

- Chrome / Edge 88+
- Firefox 78+
- Safari 15+
- iOS Safari 15+
- Samsung Internet 15+

> **Note:** Menggunakan `dvh` units yang membutuhkan browser modern.

---

## 📄 License

MIT

---

<p align="center">
  Dibangun dengan ❤️ menggunakan React, Ionic & TailwindCSS
</p>
