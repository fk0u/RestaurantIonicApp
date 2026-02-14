# API & Data Reference

Referensi lengkap untuk tipe data, sample data, dan helper functions.

---

## File

`src/data/constants.ts`

---

## Interfaces

### `MenuItem`

Representasi item di menu restoran.

```typescript
interface MenuItem {
  id: string;           // Unique ID (e.g., 'm1', 'm2')
  name: string;         // Nama item (e.g., 'Salmon Don')
  price: number;        // Harga dalam Rupiah (e.g., 65000)
  image: string;        // URL gambar
  category: 'makanan' | 'minuman' | 'snack';
  description?: string; // Deskripsi singkat
  stock: number;        // Jumlah stok tersedia
  badge?: string;       // Label khusus (e.g., 'Best Seller', 'New')
}
```

### `CartItem`

Item dalam keranjang (extends MenuItem).

```typescript
interface CartItem extends MenuItem {
  quantity: number;     // Jumlah yang dipesan
  notes?: string;       // Catatan khusus dari customer
}
```

### `TableInfo`

Informasi meja restoran.

```typescript
interface TableInfo {
  id: number;           // ID meja (1-12)
  label: string;        // Label display (e.g., 'T01')
  capacity: number;     // Kapasitas (2, 4, atau 6)
  status: 'available' | 'occupied' | 'reserved';
}
```

### `OrderTicket`

Ticket order untuk kitchen display.

```typescript
interface OrderTicket {
  id: string;           // Order ID (e.g., 'ORD-001')
  tableLabel: string;   // Label meja (e.g., 'T01')
  items: {
    name: string;
    qty: number;
    notes?: string;
  }[];
  status: 'new' | 'cooking' | 'ready';
  time: string;         // Waktu order (e.g., '14:32')
  elapsed: string;      // Waktu elapsed (e.g., '2 min')
}
```

---

## Sample Data

### `MENU_ITEMS` (14 items)

| ID | Nama | Harga | Kategori | Badge |
|----|------|-------|----------|-------|
| m1 | Salmon Don | Rp 65.000 | makanan | Best Seller |
| m2 | Chicken Katsu | Rp 45.000 | makanan | — |
| m3 | Ramen Tonkotsu | Rp 55.000 | makanan | New |
| m4 | Beef Gyudon | Rp 60.000 | makanan | — |
| m5 | Tempura Udon | Rp 48.000 | makanan | — |
| m6 | Sushi Platter | Rp 85.000 | makanan | Premium |
| m7 | Matcha Latte | Rp 28.000 | minuman | — |
| m8 | Ocha Ice | Rp 15.000 | minuman | — |
| m9 | Yuzu Soda | Rp 22.000 | minuman | New |
| m10 | Sake | Rp 75.000 | minuman | — |
| m11 | Edamame | Rp 18.000 | snack | — |
| m12 | Takoyaki | Rp 25.000 | snack | Popular |
| m13 | Gyoza | Rp 30.000 | snack | — |
| m14 | Karaage | Rp 32.000 | snack | — |

### `TABLES` (12 meja)

Generated secara dinamis:

| Range | Kapasitas | Status Default |
|-------|-----------|---------------|
| T01 - T04 | 2 orang | Available (kecuali T03: Occupied) |
| T05 - T08 | 4 orang | Available (kecuali T06: Occupied, T08: Reserved) |
| T09 - T12 | 6 orang | Available (kecuali T10: Occupied) |

### `SAMPLE_TICKETS` (4 tickets)

| ID | Meja | Status | Items |
|----|------|--------|-------|
| ORD-001 | T01 | new | Salmon Don ×2, Matcha Latte ×2 |
| ORD-002 | T05 | cooking | Ramen Tonkotsu ×1, Gyoza ×1 (Extra sauce), Ocha Ice ×1 |
| ORD-003 | T08 | ready | Sushi Platter ×1, Sake ×2 |
| ORD-004 | T03 | cooking | Chicken Katsu ×2, Beef Gyudon ×1, Yuzu Soda ×3 |

---

## Helper Functions

### `formatRupiah(value: number): string`

Format angka ke format Rupiah Indonesia.

```typescript
formatRupiah(65000)   // → "Rp 65.000"
formatRupiah(1500000) // → "Rp 1.500.000"
```

---

## Kalkulasi

### Tax (PPN)

```typescript
const tax = Math.round(subtotal * 0.11); // PPN 11%
```

### Subtotal

```typescript
const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
```

### Total

```typescript
const total = subtotal + tax;
```

---

## Menambah Data Baru

### Menambah Kategori

1. Update union type di `MenuItem.category`:
   ```typescript
   category: 'makanan' | 'minuman' | 'snack' | 'dessert';
   ```
2. Tambah item dengan kategori baru di `MENU_ITEMS`
3. Update filter tabs di `MenuBrowsingGrid.tsx`

### Menambah Item Menu

Tambahkan objek baru di array `MENU_ITEMS`:

```typescript
{
  id: 'm15',           // unique, increment dari terakhir
  name: 'Nama Item',
  price: 50000,
  image: 'URL_GAMBAR',
  category: 'makanan',
  stock: 10,
  badge: 'New',        // opsional
  description: 'Deskripsi',
}
```

### Menambah Meja

Edit generator `TABLES` di `constants.ts`, atau tambah manual:

```typescript
export const TABLES: TableInfo[] = [
  // ...existing,
  { id: 13, label: 'T13', capacity: 8, status: 'available' },
];
```

### Gambar

Saat ini menggunakan placeholder dari Google Hosted Images. Untuk production, ganti dengan:
- URL CDN sendiri
- Import lokal dari `public/` atau `src/assets/`
- API endpoint yang serve gambar menu
