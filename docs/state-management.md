# State Management

Dokumentasi lengkap tentang state management di KOU Restaurant POS.

---

## Overview

Aplikasi menggunakan **React Context API + `useReducer`** untuk global state management. Pattern ini dipilih karena:

1. Tidak membutuhkan library eksternal
2. Cukup untuk skala aplikasi ini
3. Type-safe dengan TypeScript
4. Unidirectional data flow yang predictable

---

## File

`src/store/AppContext.tsx`

---

## State Interface

```typescript
interface AppState {
  cart: CartItem[];               // Keranjang belanja
  lastOrder: CartItem[] | null;   // Order terakhir (untuk receipt)
  selectedTable: TableInfo | null; // Meja yang dipilih
  guestCount: number;             // Jumlah tamu (1-12)
  orderMode: 'dine-in' | 'take-away'; // Mode pesanan
  lang: 'ID' | 'EN';             // Bahasa UI
}
```

### Initial State

```typescript
const initialState: AppState = {
  cart: [],
  lastOrder: null,
  selectedTable: null,
  guestCount: 2,
  orderMode: 'dine-in',
  lang: 'ID',
};
```

---

## Actions

### `ADD_TO_CART`

Tambah item ke keranjang. Jika item sudah ada (berdasarkan `id`), quantity di-increment.

```typescript
dispatch({ type: 'ADD_TO_CART', payload: menuItem });
```

**Logic:**
- Jika `id` sudah ada di cart → `quantity += 1`
- Jika belum ada → tambahkan dengan `quantity: 1`

---

### `REMOVE_FROM_CART`

Hapus item dari keranjang berdasarkan `id`.

```typescript
dispatch({ type: 'REMOVE_FROM_CART', payload: 'm1' });
```

---

### `UPDATE_QUANTITY`

Update quantity item tertentu. Jika quantity ≤ 0, item dihapus dari cart.

```typescript
dispatch({
  type: 'UPDATE_QUANTITY',
  payload: { id: 'm1', quantity: 3 }
});
```

**Logic:**
- `quantity <= 0` → item dihapus (sama seperti REMOVE_FROM_CART)
- `quantity > 0` → update quantity

---

### `CLEAR_CART`

Kosongkan seluruh cart tanpa menyimpan data.

```typescript
dispatch({ type: 'CLEAR_CART' });
```

---

### `COMPLETE_ORDER`

Simpan cart ke `lastOrder`, lalu kosongkan cart. Digunakan saat pembayaran berhasil agar receipt bisa menampilkan data order.

```typescript
dispatch({ type: 'COMPLETE_ORDER' });
```

**Logic:**
```typescript
{
  ...state,
  lastOrder: [...state.cart],  // simpan salinan cart
  cart: []                      // kosongkan cart
}
```

**Perbedaan dengan `CLEAR_CART`:**
- `CLEAR_CART` → cart = [], lastOrder tidak berubah
- `COMPLETE_ORDER` → cart = [], lastOrder = salinan cart sebelumnya

---

### `SET_TABLE`

Pilih atau reset meja.

```typescript
dispatch({ type: 'SET_TABLE', payload: tableInfo });
dispatch({ type: 'SET_TABLE', payload: null }); // reset
```

---

### `SET_GUESTS`

Set jumlah tamu. Otomatis di-clamp ke range 1-12.

```typescript
dispatch({ type: 'SET_GUESTS', payload: 4 });
```

**Logic:**
```typescript
Math.max(1, Math.min(12, action.payload))
```

---

### `SET_MODE`

Set mode pesanan.

```typescript
dispatch({ type: 'SET_MODE', payload: 'dine-in' });
dispatch({ type: 'SET_MODE', payload: 'take-away' });
```

---

### `SET_LANG`

Ganti bahasa UI.

```typescript
dispatch({ type: 'SET_LANG', payload: 'ID' });
dispatch({ type: 'SET_LANG', payload: 'EN' });
```

---

## Action Type (Union)

```typescript
type Action =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'COMPLETE_ORDER' }
  | { type: 'SET_TABLE'; payload: TableInfo | null }
  | { type: 'SET_GUESTS'; payload: number }
  | { type: 'SET_MODE'; payload: 'dine-in' | 'take-away' }
  | { type: 'SET_LANG'; payload: 'ID' | 'EN' };
```

---

## Usage Pattern

### Setup (di App.tsx)

```tsx
import { AppProvider } from './store/AppContext';

const App = () => (
  <IonApp>
    <AppProvider>
      <IonReactRouter>
        {/* routes */}
      </IonReactRouter>
    </AppProvider>
  </IonApp>
);
```

### Consume (di component)

```tsx
import { useAppContext } from '../store/AppContext';

const MyScreen = () => {
  const { state, dispatch } = useAppContext();

  // Read state
  const itemCount = state.cart.reduce((s, i) => s + i.quantity, 0);
  const isTableSelected = state.selectedTable !== null;

  // Write state
  const handleAddItem = (item: MenuItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity: 1 } });
  };

  const handleSelectTable = (table: TableInfo) => {
    dispatch({ type: 'SET_TABLE', payload: table });
  };
};
```

---

## Data Flow per Screen

| Screen | Reads | Dispatches |
|--------|-------|------------|
| OnboardingScreen | — | `SET_MODE` |
| TableSelectionGrid | `selectedTable`, `guestCount` | `SET_TABLE`, `SET_GUESTS` |
| MenuBrowsingGrid | `cart` | `ADD_TO_CART` |
| ShoppingCartDetails | `cart` | `UPDATE_QUANTITY`, `REMOVE_FROM_CART` |
| PaymentQRISDialog | `cart` | `COMPLETE_ORDER` |
| DigitalReceiptPreview | `lastOrder`, `cart` | — |
| CashierPOSMode | — (local state) | — |
| KitchenOrderTickets | — (local state) | — |
| AdminDashboard | — (local state) | — |
| DesignSystemUIKit | — (static) | — |

---

## Extending State

Untuk menambah state baru:

1. Tambah field di `AppState` interface
2. Tambah initial value di `initialState`
3. Tambah action type di `Action` union
4. Tambah case di `appReducer` switch
5. Gunakan di component via `useAppContext()`

Contoh menambah field `darkMode`:

```typescript
// 1. Interface
interface AppState {
  // ...existing
  darkMode: boolean;
}

// 2. Initial
const initialState: AppState = {
  // ...existing
  darkMode: false,
};

// 3. Action type
type Action =
  | // ...existing
  | { type: 'TOGGLE_DARK_MODE' };

// 4. Reducer
case 'TOGGLE_DARK_MODE':
  return { ...state, darkMode: !state.darkMode };

// 5. Component
const { state } = useAppContext();
const isDark = state.darkMode;
```
