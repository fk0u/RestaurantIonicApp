import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { MENU_ITEMS, formatRupiah } from '../data/constants';
import type { CartItem, MenuItem } from '../data/constants';

type Category = 'semua' | 'makanan' | 'minuman' | 'snack';

const CashierPOSMode: React.FC = () => {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('semua');
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  const [panelOpen, setPanelOpen] = useState(true);

  const categories: { key: Category; label: string }[] = [
    { key: 'semua', label: 'Semua' },
    { key: 'makanan', label: 'Makanan' },
    { key: 'minuman', label: 'Minuman' },
    { key: 'snack', label: 'Snack' },
  ];

  const filteredItems = useMemo(() => {
    let items = MENU_ITEMS;
    if (activeCategory !== 'semua') items = items.filter(i => i.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(i => i.name.toLowerCase().includes(q));
    }
    return items;
  }, [activeCategory, search]);

  const addItem = (item: MenuItem) => {
    setOrderItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
    if (!panelOpen) setPanelOpen(true);
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setOrderItems(prev => prev.filter(i => i.id !== id));
    } else {
      setOrderItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
    }
  };

  const subtotal = orderItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = Math.round(subtotal * 0.11);
  const total = subtotal + tax;
  const totalItems = orderItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <div className="relative min-h-screen w-full bg-[#0d1a12] text-white font-[var(--font-display)] flex items-center justify-center p-0 sm:p-4 overflow-hidden">
          <div className="fixed -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          <main className="w-full max-w-[428px] h-dvh sm:h-[min(926px,95vh)] bg-[#0f1d14] rounded-none sm:rounded-2xl overflow-hidden flex flex-col relative border-0 sm:border sm:border-white/5">

            {/* Header */}
            <header className="pt-10 pb-3 px-5 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => history.goBack()} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="material-icons-round text-white/70 text-xl">chevron_left</span>
                </motion.button>
                <div>
                  <h2 className="text-base font-bold">Mode Kasir</h2>
                  <p className="text-[10px] text-white/40">Shift Siang — {new Date().toLocaleDateString('id-ID')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                </span>
                <span className="text-xs text-white/50">Online</span>
              </div>
            </header>

            {/* Search & Filters */}
            <div className="px-5 pb-3 z-10">
              <div className="relative mb-3">
                <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-lg">search</span>
                <input
                  type="text"
                  placeholder="Cari item..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-all"
                />
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {categories.map(cat => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
                      activeCategory === cat.key
                        ? 'bg-primary text-white'
                        : 'bg-white/5 text-white/50 hover:bg-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Compact Item Grid */}
            <section className={`flex-1 overflow-y-auto px-5 z-10 transition-all ${panelOpen ? 'pb-4' : 'pb-24'}`}>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {filteredItems.map(item => {
                  const qty = orderItems.find(o => o.id === item.id)?.quantity || 0;
                  return (
                    <motion.button
                      key={item.id}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => addItem(item)}
                      className={`relative rounded-xl p-2 flex flex-col items-center text-center transition-all ${
                        qty > 0
                          ? 'bg-primary/15 border border-primary/30'
                          : 'bg-white/5 border border-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="w-full aspect-square rounded-lg overflow-hidden mb-1.5">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-semibold text-white/80 leading-tight truncate w-full">{item.name}</span>
                      <span className="text-[10px] text-primary font-bold mt-0.5">{formatRupiah(item.price).replace('Rp ', '')}</span>
                      {qty > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow"
                        >
                          {qty}
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </section>

            {/* Sliding Order Panel */}
            <AnimatePresence>
              {panelOpen && orderItems.length > 0 && (
                <motion.div
                  initial={{ y: 300 }}
                  animate={{ y: 0 }}
                  exit={{ y: 300 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="absolute bottom-0 left-0 right-0 z-20 bg-[#152019] border-t border-white/10 rounded-t-2xl max-h-[45%] flex flex-col"
                >
                  {/* Drag Handle */}
                  <button
                    onClick={() => setPanelOpen(false)}
                    className="flex justify-center py-2"
                  >
                    <div className="w-10 h-1 rounded-full bg-white/20" />
                  </button>

                  {/* Header */}
                  <div className="flex items-center justify-between px-5 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-icons-round text-primary text-lg">receipt_long</span>
                      <span className="text-sm font-bold">Order ({totalItems})</span>
                    </div>
                    <button onClick={() => setOrderItems([])} className="text-[10px] text-red-400 font-semibold">
                      Hapus Semua
                    </button>
                  </div>

                  {/* Items List */}
                  <div className="flex-1 overflow-y-auto px-5 pb-2">
                    {orderItems.map(item => (
                      <div key={item.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-white/80 truncate">{item.name}</div>
                          <div className="text-[10px] text-white/40">{formatRupiah(item.price)}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20"
                          >
                            <span className="material-icons-round text-sm">remove</span>
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/30"
                          >
                            <span className="material-icons-round text-sm">add</span>
                          </button>
                          <span className="text-xs font-bold text-primary ml-2 w-16 text-right">{formatRupiah(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total & Pay */}
                  <div className="px-5 py-3 border-t border-white/10">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/40">Subtotal</span>
                      <span className="font-semibold">{formatRupiah(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-white/40">PPN 11%</span>
                      <span className="font-semibold">{formatRupiah(tax)}</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => history.push('/payment')}
                      className="w-full bg-primary text-white font-bold py-3 rounded-xl flex items-center justify-between px-4 shadow-lg shadow-primary/30 hover:bg-green-600 transition-colors"
                    >
                      <span className="text-sm">BAYAR</span>
                      <span className="text-sm font-bold">{formatRupiah(total)}</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapsed order bar */}
            {!panelOpen && orderItems.length > 0 && (
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                onClick={() => setPanelOpen(true)}
                className="absolute bottom-6 left-5 right-5 z-20 bg-primary text-white font-bold py-3.5 rounded-xl flex items-center justify-between px-5 shadow-lg shadow-primary/40"
              >
                <div className="flex items-center gap-2">
                  <span className="material-icons-round text-lg">receipt_long</span>
                  <span className="text-sm">{totalItems} item</span>
                </div>
                <span className="text-sm">{formatRupiah(total)}</span>
              </motion.button>
            )}
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CashierPOSMode;
