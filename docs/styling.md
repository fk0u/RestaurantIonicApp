# Styling Guide

Panduan lengkap tentang styling dan design system di KOU Restaurant POS.

---

## Setup

### TailwindCSS v4

Aplikasi menggunakan TailwindCSS v4 dengan CSS-first configuration:

```
vite.config.ts  → @tailwindcss/vite plugin
src/index.css   → @theme tokens + custom classes
```

**Tidak ada:**
- `tailwind.config.js`
- `postcss.config.js` (TailwindCSS v4 berjalan via Vite plugin)

### Konfigurasi Design Tokens

Semua tokens didefinisikan di `src/index.css` menggunakan `@theme` directive:

```css
@import "tailwindcss";

@theme {
  --color-primary: #0fbd55;
  --color-primary-dark: #0b8a3e;
  --color-primary-light: #3fd67e;
  --color-background-light: #f6f8f7;
  --color-background-dark: #102217;
  --color-surface: #ffffff;
  --color-surface-dark: #1a2e22;
  --color-glass-border: rgba(255, 255, 255, 0.15);
  --color-glass-bg: rgba(255, 255, 255, 0.08);
  --color-glass-highlight: rgba(255, 255, 255, 0.25);
  --font-display: "Plus Jakarta Sans", sans-serif;
  --animate-spin-slow: spin 8s linear infinite;
  --animate-pulse-slow: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

Token ini otomatis available sebagai Tailwind utility classes:
- `bg-primary` → `#0fbd55`
- `text-background-dark` → `#102217`
- `font-display` → Plus Jakarta Sans

---

## Color System

### Primary Colors

| Utility | Hex | Penggunaan |
|---------|-----|------------|
| `bg-primary` | `#0fbd55` | CTA buttons, aksen utama |
| `bg-primary-dark` | `#0b8a3e` | Hover states |
| `bg-primary-light` | `#3fd67e` | Highlights, gradient ends |

### Background Colors

| Utility | Hex | Penggunaan |
|---------|-----|------------|
| `bg-background-light` | `#f6f8f7` | Light theme pages |
| `bg-background-dark` | `#102217` | Dark theme pages, onboarding |

### Surface Colors

| Utility | Hex | Penggunaan |
|---------|-----|------------|
| `bg-surface` | `#ffffff` | Cards, panels (light) |
| `bg-surface-dark` | `#1a2e22` | Cards, panels (dark) |

### Status Colors (dari TailwindCSS default)

| Warna | Penggunaan |
|-------|------------|
| `emerald-*` | Success, available |
| `red-*` / `rose-*` | Error, occupied, danger |
| `amber-*` / `yellow-*` | Warning, reserved |
| `blue-*` | Info, new |
| `slate-*` | Neutral, text, borders |

---

## Typography

### Font Family

```css
font-family: "Plus Jakarta Sans", sans-serif;
```

Diimport via Google Fonts di `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

### Weight Scale

| Weight | Utility | Penggunaan |
|--------|---------|------------|
| 400 | `font-normal` | Body text |
| 500 | `font-medium` | Labels, secondary text |
| 600 | `font-semibold` | Subheadings, emphasis |
| 700 | `font-bold` | Headings, buttons |
| 800 | `font-extrabold` | Hero text, prices |

### Size Scale (yang sering digunakan)

| Utility | ~Size | Penggunaan |
|---------|-------|------------|
| `text-[10px]` | 10px | Fine print, timestamps |
| `text-xs` | 12px | Captions, badges |
| `text-sm` | 14px | Body text, labels |
| `text-base` | 16px | Default text |
| `text-lg` | 18px | Subheadings |
| `text-xl` | 20px | Section headings |
| `text-2xl` | 24px | Page titles |
| `text-3xl` | 30px | Hero text |

---

## Icons

### Material Icons Round

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
```

Penggunaan:
```tsx
<span className="material-icons-round text-xl">restaurant</span>
<span className="material-icons-round text-sm">arrow_back</span>
```

### Lucide React

```tsx
import { ShoppingCart, Search, Plus } from 'lucide-react';

<ShoppingCart size={20} />
<Search className="w-5 h-5" />
```

---

## Glass Components

### `.glass-card` — Dark Glass Card

```css
.glass-card {
  background: rgba(16, 34, 23, 0.60);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.10);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.30);
}
```

Digunakan di: OnboardingScreen, dark theme components.

### `.glass-panel` — Light Glass Panel

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.70);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.80);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.06);
}
```

Digunakan di: main container semua light theme screens.

### `.glass-panel-dark` — Dark Glass Panel

Digunakan di: dark theme screens (Cashier, Kitchen).

### `.glass-btn` — Glass Button

Button transparan dengan blur dan hover effects. Varian:
- `.glass-btn-emerald` — green glow on hover
- `.glass-btn-teal` — teal glow on hover
- `.glass-btn-light` — light background variant

---

## Responsive Pattern

### Container Pattern

Setiap screen menggunakan pattern 2-layer:

```tsx
{/* Layer 1: Full-screen background wrapper */}
<div className="relative min-h-screen w-full bg-background-light flex items-center justify-center p-0 sm:p-4">

  {/* Layer 2: Phone-frame card */}
  <main className="w-full max-w-[428px] h-dvh sm:h-[min(926px,95vh)] rounded-none sm:rounded-2xl shadow-none sm:shadow-[0_8px_32px_...]">
    {/* content */}
  </main>
</div>
```

### Breakpoint Strategy

Satu breakpoint utama: `sm` (640px)

| Property | Mobile (< 640px) | Desktop (≥ 640px) |
|----------|-----------------|-------------------|
| Padding | `p-0` | `p-4` |
| Height | `h-dvh` | `h-[min(926px,95vh)]` |
| Border Radius | `rounded-none` | `rounded-2xl` |
| Shadow | `shadow-none` | `shadow-[...]` |
| Max Width | `w-full` | `max-w-[428px]` |

### Grid Responsiveness

```tsx
{/* 3 kolom di mobile, 4 di desktop */}
<div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
```

---

## Animation Patterns

### Framer Motion Variants

Pattern standar untuk staggered reveal:

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 150, damping: 18 }
  },
};
```

**Penting:** Selalu gunakan `as const` pada `type: 'spring'` untuk menghindari TypeScript error.

### Penggunaan

```tsx
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {/* content */}
    </motion.div>
  ))}
</motion.div>
```

### CSS Animations

Didefinisikan di `index.css`:

| Animation | Penggunaan |
|-----------|------------|
| `animate-float` | Floating decoration elements |
| `animate-spin-slow` | Slow rotation (8s) |
| `animate-pulse-slow` | Slow pulse (4s) |

---

## Utility Classes (Custom)

### Status Badges

```html
<span class="badge badge-success">Active</span>
<span class="badge badge-warning">Reserved</span>
<span class="badge badge-danger">Occupied</span>
<span class="badge badge-info">New</span>
```

### Table Status Dots

```html
<div class="table-dot table-dot-available"></div>  <!-- green + glow -->
<div class="table-dot table-dot-occupied"></div>    <!-- red + glow -->
<div class="table-dot table-dot-reserved"></div>    <!-- yellow + glow -->
```

### Stepper Button

```html
<button class="stepper-btn">+</button>
<button class="stepper-btn">-</button>
```

### Receipt Zigzag

```html
<div class="receipt-zigzag">
  <!-- receipt content -->
</div>
<!-- Creates zigzag tear-off edge at bottom -->
```

### Kitchen Ticket

```html
<div class="kitchen-ticket">
  <!-- ticket content, includes hover transform effect -->
</div>
```

---

## Scrollbar

Custom scrollbar styling (thin, green accent):

```css
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(15, 189, 85, 0.3); border-radius: 9999px; }
```

---

## Ionic Overrides

```css
ion-content { --background: transparent; }
ion-page { --background: transparent; }
```

Background Ionic diset transparan agar TailwindCSS backgrounds terlihat. Ionic hanya digunakan untuk routing dan page management.

---

## Best Practices

1. **Gunakan utility classes** dari Tailwind sebisa mungkin sebelum membuat custom CSS
2. **`as const`** wajib untuk string literal di Framer Motion variants
3. **Jangan gunakan `Math.random()`** di render — gunakan `useMemo` atau deterministic patterns
4. **Mobile-first** — tulis class untuk mobile dulu, lalu tambahkan `sm:` untuk desktop
5. **Glass classes** untuk container utama, Tailwind utilities untuk detail internal
6. **`h-dvh`** bukan `h-screen` untuk mobile viewport yang akurat
