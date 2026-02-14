# Architecture Overview

Dokumen ini menjelaskan arsitektur teknis aplikasi KOU Restaurant POS.

---

## High-Level Architecture

```
┌──────────────────────────────────────────────────────────┐
│                      Browser (SPA)                       │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │                   Ionic React App                  │  │
│  │                                                    │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │  │
│  │  │  Router   │  │  Context  │  │   Components    │ │  │
│  │  │ (5 routes │  │  + Reducer│  │   (10 screens)  │ │  │
│  │  │  + staff) │  │  (global) │  │                 │ │  │
│  │  └──────────┘  └──────────┘  └──────────────────┘ │  │
│  │                                                    │  │
│  │  ┌──────────────────┐  ┌────────────────────────┐ │  │
│  │  │    Data Layer     │  │     Style Layer        │ │  │
│  │  │  constants.ts     │  │  TailwindCSS v4        │ │  │
│  │  │  (types + data)   │  │  + Custom CSS classes  │ │  │
│  │  └──────────────────┘  └────────────────────────┘ │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │              Vite Dev Server / Build                │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

---

## Layer Breakdown

### 1. Entry Layer

| File | Peran |
|------|-------|
| `index.html` | Shell HTML, font imports, meta tags |
| `src/main.tsx` | React DOM mounting point |
| `src/App.tsx` | Ionic setup, router config, route definitions |

### 2. State Layer

| File | Peran |
|------|-------|
| `src/store/AppContext.tsx` | Context provider + useReducer |

State menggunakan pattern **Flux-like unidirectional data flow**:

```
Component ──dispatch(action)──▶ Reducer ──new state──▶ Context ──render──▶ Component
```

### 3. Data Layer

| File | Peran |
|------|-------|
| `src/data/constants.ts` | TypeScript interfaces, sample menu data, table config, helper functions |

Saat ini menggunakan data statis (sample data). Untuk production, layer ini bisa diganti dengan API calls ke backend.

### 4. View Layer (Components)

Setiap screen adalah satu file komponen React di `src/components/`. Komponen bersifat **self-contained** — mengandung logic, markup, dan styling dalam satu file.

| Kategori | Screens |
|----------|---------|
| Customer-facing | OnboardingScreen, TableSelectionGrid, MenuBrowsingGrid, ShoppingCartDetails, PaymentQRISDialog, DigitalReceiptPreview |
| Staff-facing | CashierPOSMode, KitchenOrderTickets, AdminDashboard |
| Developer | DesignSystemUIKit |

### 5. Style Layer

| File | Peran |
|------|-------|
| `src/index.css` | TailwindCSS import, `@theme` tokens, glass component classes, animations, Ionic overrides |

Styling menggunakan **utility-first** approach:
- TailwindCSS utilities langsung di className
- Custom CSS classes untuk pattern yang sering diulang (glass, badges, stepper, dll)
- Tidak ada CSS modules atau styled-components

---

## Routing Architecture

Router menggunakan **Ionic React Router** (wrapper dari React Router DOM v5):

```typescript
<IonReactRouter>
  <IonRouterOutlet>
    <Route exact path="/onboarding" component={OnboardingScreen} />
    <Route exact path="/tables" component={TableSelectionGrid} />
    <Route exact path="/menu" component={MenuBrowsingGrid} />
    <Route exact path="/cart" component={ShoppingCartDetails} />
    <Route exact path="/payment" component={PaymentQRISDialog} />
    <Route exact path="/receipt" component={DigitalReceiptPreview} />
    <Route exact path="/cashier" component={CashierPOSMode} />
    <Route exact path="/kitchen" component={KitchenOrderTickets} />
    <Route exact path="/admin" component={AdminDashboard} />
    <Route exact path="/design-system" component={DesignSystemUIKit} />
    <Redirect exact from="/" to="/onboarding" />
  </IonRouterOutlet>
</IonReactRouter>
```

Navigasi menggunakan `useHistory()` dari React Router:

```typescript
const history = useHistory();
history.push('/menu');
```

---

## Component Pattern

Setiap screen component mengikuti pattern yang konsisten:

```tsx
const ScreenName: React.FC = () => {
  // 1. Hooks (state, context, router)
  const { state, dispatch } = useAppContext();
  const history = useHistory();
  const [localState, setLocalState] = useState();

  // 2. Derived data
  const computed = useMemo(() => ..., [deps]);

  // 3. Animation variants (Framer Motion)
  const variants = {
    hidden: { ... },
    visible: { ..., transition: { type: 'spring' as const } },
  };

  // 4. Render
  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        {/* Outer wrapper: responsive container */}
        <div className="relative min-h-screen w-full ... flex items-center justify-center p-0 sm:p-4">
          {/* Main card: phone-frame on desktop */}
          <main className="w-full max-w-[428px] h-dvh sm:h-[min(926px,95vh)] ... rounded-none sm:rounded-2xl">
            {/* Header */}
            {/* Content */}
            {/* Footer/CTA */}
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};
```

---

## Build Pipeline

```
Source (.tsx, .css)
       │
       ▼
  Vite Dev Server / Build
       │
       ├── @vitejs/plugin-react  (JSX transform, Fast Refresh)
       ├── @tailwindcss/vite     (CSS processing, design tokens)
       │
       ▼
  Bundle (dist/)
       ├── index.html
       ├── assets/
       │   ├── index-[hash].js
       │   └── index-[hash].css
       └── vite.svg
```

---

## Key Design Decisions

### 1. Mengapa TailwindCSS v4?

TailwindCSS v4 menggunakan CSS-first configuration — semua design tokens didefinisikan di CSS via `@theme`, menghilangkan kebutuhan file config JavaScript terpisah. Ini menghasilkan setup yang lebih bersih dan performance yang lebih baik.

### 2. Mengapa React Context vs Redux/Zustand?

Untuk skala aplikasi ini (10 screens, state sederhana), Context + useReducer memberikan keseimbangan yang baik antara simplicity dan structure. Tidak perlu dependency tambahan.

### 3. Mengapa Ionic React?

Ionic menyediakan:
- Native-feel page transitions (iOS mode)
- `IonPage`/`IonContent` untuk proper viewport management
- Compatible dengan React Router
- PWA-ready out of the box

### 4. Mengapa Single-File Components?

Setiap screen dalam satu file memudahkan:
- Quick navigation ke screen tertentu
- Self-contained logic (tidak perlu trace antar file)
- Parallel development (setiap developer bisa handle satu screen)

### 5. Responsive Strategy: `h-dvh` vs `h-screen`

`h-dvh` (dynamic viewport height) menyelesaikan masalah klasik mobile browser di mana `100vh` termasuk address bar. `h-dvh` menggunakan viewport yang benar-benar visible.
