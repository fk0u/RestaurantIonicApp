/* ─── Menu Items Data ─── */
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'makanan' | 'minuman' | 'snack';
  description?: string;
  stock: number;
  badge?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  notes?: string;
}

export interface TableInfo {
  id: number;
  label: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
}

export interface OrderTicket {
  id: string;
  tableLabel: string;
  items: { name: string; qty: number; notes?: string }[];
  status: 'new' | 'cooking' | 'ready';
  time: string;
  elapsed: string;
}

/* ─── Sample Data ─── */
const FOOD_IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDFk-hS7J9Brcl_LJGrDh41bxZmVhSMqFDwAUONKuVP-RJH_BZT85h5BIU0K3FDXlREePxbEoF9sFXvb2LlbZ2tQl-dkpLZOzZPMuNL_Z3lQ4QOaL_q2jV2IwTlqmPRbXkKSY_sME6ek7lnFUcfZFZv1z9KMwb-vUPJxYZsDkmj-xEaBcyWmXGHV3Pq0piqvvOZNGy_VZ5TrZEqLPz9Wy2U9OL1_jqBr0s3HUZK3vMuhJzNsPL96vwCCg2SuH3fvIU69nFWPiCYVb',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAGdWxNdWzBjSIoqXlAaF97raMzj_R35v2dNX8j2OVmyR7K6gdLYkCR3L0lJfp5v1c-xIZVfRJGEGP0iXqBOHjLqBN8pFpxCCt75-h3wJP9CpFwKQxSfR-bnC1YgbK0I7PqkDx7Zv8VhfLgzfkHPrZ4O-UY2iIEJdSqaL6-wjfMuE-5Ghr3lQWWxo7cVNV7tGN27snoKaZnwIL',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA6aPaJR7tkE_k7GKNtJJsocWXoVuJH-LzYKAXhUw7j7pUQJJvZLT9q-MVFJI8u1Ev07APjLw-TXVOmBjJCEiPR27ZfyQ1oMXwL12F3bh3UXPmhLB4FVkx2n-FnhbK4pBKu7JQJVZMzg',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAlxGPvjBazsxKdVjPMW_cjrxM1sJCnss92jrvQj1wlp5JRJq2c22qFGvlJ-G_b39cAPgI6RFuH_Qvt_E_5pPL2vJvTDflJcXfmjKbHlGDRjNUfjV5uajM3HmhdfTchHUP-8jVFIFSPVQ',
];

export const MENU_ITEMS: MenuItem[] = [
  { id: 'm1', name: 'Salmon Don', price: 65000, image: FOOD_IMAGES[0], category: 'makanan', stock: 12, badge: 'Best Seller', description: 'Fresh salmon sashimi rice bowl' },
  { id: 'm2', name: 'Chicken Katsu', price: 45000, image: FOOD_IMAGES[1], category: 'makanan', stock: 8, description: 'Crispy panko fried chicken' },
  { id: 'm3', name: 'Ramen Tonkotsu', price: 55000, image: FOOD_IMAGES[2], category: 'makanan', stock: 5, badge: 'New', description: 'Rich pork bone broth ramen' },
  { id: 'm4', name: 'Beef Gyudon', price: 60000, image: FOOD_IMAGES[3], category: 'makanan', stock: 10, description: 'Tender simmered beef bowl' },
  { id: 'm5', name: 'Tempura Udon', price: 48000, image: FOOD_IMAGES[0], category: 'makanan', stock: 7, description: 'Hot udon with crispy tempura' },
  { id: 'm6', name: 'Sushi Platter', price: 85000, image: FOOD_IMAGES[1], category: 'makanan', stock: 3, badge: 'Premium', description: '12 pcs assorted sushi' },
  { id: 'm7', name: 'Matcha Latte', price: 28000, image: FOOD_IMAGES[2], category: 'minuman', stock: 20, description: 'Creamy Japanese matcha' },
  { id: 'm8', name: 'Ocha Ice', price: 15000, image: FOOD_IMAGES[3], category: 'minuman', stock: 25, description: 'Chilled green tea' },
  { id: 'm9', name: 'Yuzu Soda', price: 22000, image: FOOD_IMAGES[0], category: 'minuman', stock: 15, badge: 'New', description: 'Refreshing citrus soda' },
  { id: 'm10', name: 'Sake', price: 75000, image: FOOD_IMAGES[1], category: 'minuman', stock: 8, description: 'Premium Japanese rice wine' },
  { id: 'm11', name: 'Edamame', price: 18000, image: FOOD_IMAGES[2], category: 'snack', stock: 30, description: 'Steamed salted soybeans' },
  { id: 'm12', name: 'Takoyaki', price: 25000, image: FOOD_IMAGES[3], category: 'snack', stock: 12, badge: 'Popular', description: '6 pcs octopus balls' },
  { id: 'm13', name: 'Gyoza', price: 30000, image: FOOD_IMAGES[0], category: 'snack', stock: 15, description: 'Pan-fried pork dumplings' },
  { id: 'm14', name: 'Karaage', price: 32000, image: FOOD_IMAGES[1], category: 'snack', stock: 10, description: 'Japanese fried chicken bites' },
];

export const TABLES: TableInfo[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  label: `T${String(i + 1).padStart(2, '0')}`,
  capacity: i < 4 ? 2 : i < 8 ? 4 : 6,
  status: (i === 2 || i === 5 || i === 9) ? 'occupied' as const : (i === 7) ? 'reserved' as const : 'available' as const,
}));

export const SAMPLE_TICKETS: OrderTicket[] = [
  { id: 'ORD-001', tableLabel: 'T01', items: [{ name: 'Salmon Don', qty: 2 }, { name: 'Matcha Latte', qty: 2 }], status: 'new', time: '14:32', elapsed: '2 min' },
  { id: 'ORD-002', tableLabel: 'T05', items: [{ name: 'Ramen Tonkotsu', qty: 1 }, { name: 'Gyoza', qty: 1, notes: 'Extra sauce' }, { name: 'Ocha Ice', qty: 1 }], status: 'cooking', time: '14:28', elapsed: '6 min' },
  { id: 'ORD-003', tableLabel: 'T08', items: [{ name: 'Sushi Platter', qty: 1 }, { name: 'Sake', qty: 2 }], status: 'ready', time: '14:15', elapsed: '19 min' },
  { id: 'ORD-004', tableLabel: 'T03', items: [{ name: 'Chicken Katsu', qty: 2 }, { name: 'Beef Gyudon', qty: 1 }, { name: 'Yuzu Soda', qty: 3 }], status: 'cooking', time: '14:25', elapsed: '9 min' },
];

export const formatRupiah = (value: number): string => {
  return 'Rp ' + value.toLocaleString('id-ID');
};
