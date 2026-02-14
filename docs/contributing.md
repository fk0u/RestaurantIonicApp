# Contributing & Development Guide

Panduan untuk developer yang ingin kontribusi atau melanjutkan pengembangan KOU Restaurant POS.

---

## Prerequisites

| Tool | Minimum | Recommended |
|------|---------|-------------|
| Node.js | 18.x | 20.x+ |
| npm | 9.x | 10.x+ |
| Editor | Any | VS Code |
| Browser | Chrome 88+ | Chrome Latest |

### VS Code Extensions (Recommended)

- **Tailwind CSS IntelliSense** — autocomplete untuk TailwindCSS classes
- **ESLint** — inline linting
- **Ionic** — Ionic Framework support
- **TypeScript Importer** — auto import

---

## Setup

```bash
# Clone dan install
git clone <repo-url>
cd RestaurantIonicApp
npm install

# Jalankan dev server
npm run dev

# Buka di browser
# http://localhost:5173
```

---

## Development Workflow

### 1. Buat Branch

```bash
git checkout -b feature/nama-fitur
```

### 2. Jalankan Dev Server

```bash
npm run dev
```

### 3. Buat/Edit Component

Semua screen components ada di `src/components/`. Ikuti pattern yang ada:

```tsx
import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../store/AppContext';

const NewScreen: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <div className="relative min-h-screen w-full bg-background-light flex items-center justify-center p-0 sm:p-4">
          <main className="w-full max-w-[428px] h-dvh sm:h-[min(926px,95vh)] glass-panel rounded-none sm:rounded-2xl overflow-hidden flex flex-col relative shadow-none sm:shadow-[0_8px_32px_0_rgba(31,38,50,0.08)]">
            {/* Header */}
            {/* Content */}
            {/* Footer */}
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NewScreen;
```

### 4. Tambah Route (jika screen baru)

Di `src/App.tsx`:

```tsx
import NewScreen from './components/NewScreen';

// Di dalam IonRouterOutlet:
<Route exact path="/new-screen" component={NewScreen} />
```

### 5. Type Check

```bash
npx tsc --noEmit
```

### 6. Lint

```bash
npm run lint
```

### 7. Build Test

```bash
npm run build
```

---

## File Naming Conventions

| Tipe | Convention | Contoh |
|------|-----------|--------|
| Screen component | PascalCase | `MenuBrowsingGrid.tsx` |
| Store | PascalCase | `AppContext.tsx` |
| Data/constants | camelCase | `constants.ts` |
| Styles | camelCase | `index.css` |
| Config | camelCase | `vite.config.ts` |

---

## Code Conventions

### TypeScript

- **Strict mode** enabled — no `any`, no unused variables
- **`verbatimModuleSyntax`** — gunakan `import type` untuk type-only imports:
  ```typescript
  import type { CartItem } from '../data/constants';  // ✅
  import { CartItem } from '../data/constants';        // ❌
  ```
- **Functional components** — gunakan `React.FC` atau arrow functions
- **`as const`** untuk string literals di Framer Motion:
  ```typescript
  transition: { type: 'spring' as const }  // ✅
  transition: { type: 'spring' }           // ❌ TypeScript error
  ```

### React

- **No `Math.random()` in render** — gunakan `useMemo` atau deterministic values
- **No `new Date()` calls** yang tidak di-memo — wrap in `useMemo`
- **Gunakan `useHistory()`** dari react-router-dom untuk navigasi
- **Destructure context**: `const { state, dispatch } = useAppContext()`

### CSS / TailwindCSS

- **Mobile-first** — class tanpa prefix = mobile, `sm:` = desktop
- **Utility-first** — TailwindCSS class di className, bukan inline styles
- **Custom classes** hanya untuk pattern yang di-reuse > 3x (glass, badges, dll)
- **`h-dvh`** bukan `h-screen` untuk mobile viewport

---

## Adding New Features

### Menambah Menu Item

Edit `src/data/constants.ts`:

```typescript
export const MENU_ITEMS: MenuItem[] = [
  // ...existing items
  {
    id: 'm15',
    name: 'Nama Item',
    price: 50000,
    image: 'url-gambar',
    category: 'makanan',  // 'makanan' | 'minuman' | 'snack'
    stock: 10,
    badge: 'New',         // optional
    description: 'Deskripsi item',
  },
];
```

### Menambah State Baru

Lihat `docs/state-management.md` bagian "Extending State".

### Menambah Screen Baru

1. Buat file `src/components/NamaScreen.tsx`
2. Ikuti component pattern di atas
3. Tambah route di `src/App.tsx`
4. (Opsional) Tambah state baru jika dibutuhkan

### Menambah Custom CSS Class

Tambahkan di `src/index.css` dengan komentar section:

```css
/* ─── Nama Section ─── */
.nama-class {
  /* properties */
}
```

---

## Troubleshooting

### Port sudah digunakan

```
Port 5173 is in use, trying another one...
```

Vite otomatis mencoba port berikutnya. Atau kill proses yang menggunakan port tersebut.

### TailwindCSS class tidak bekerja

1. Pastikan class valid untuk TailwindCSS v4
2. Cek apakah menggunakan syntax lama (v3) — v4 tidak support `@apply` di semua konteks
3. Custom colors harus didefinisikan di `@theme` block di `index.css`

### Framer Motion type error

Tambahkan `as const` pada property `type` di transition:

```typescript
// ❌ Error
transition: { type: 'spring', stiffness: 150 }

// ✅ Fixed
transition: { type: 'spring' as const, stiffness: 150 }
```

### Ionic CLI tidak terinstall

```bash
npm install -g @ionic/cli
```

### Build error: verbatimModuleSyntax

Gunakan type-only import:

```typescript
// ❌ Error
import { ReactNode } from 'react';

// ✅ Fixed
import { type ReactNode } from 'react';
// atau
import type { ReactNode } from 'react';
```

---

## Project Scripts

| Script | Command | Deskripsi |
|--------|---------|-----------|
| `npm run dev` | `vite` | Dev server + HMR |
| `npm run build` | `tsc -b && vite build` | Production build |
| `npm run lint` | `eslint .` | Lint check |
| `npm run preview` | `vite preview` | Preview production build |
| `ionic serve` | Ionic CLI dev server | Alternative dev (port 8100) |
| `npx tsc --noEmit` | TypeScript check | Type-check tanpa output |
