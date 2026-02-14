import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { MENU_ITEMS, formatRupiah } from '../data/constants';
import type { MenuItem } from '../data/constants';

type Category = 'semua' | 'makanan' | 'minuman' | 'snack';

const MenuBrowsingGrid: React.FC = () => {
  const history = useHistory();
  const { state, dispatch } = useAppContext();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('semua');

  const categories: { key: Category; label: string; icon: string }[] = [
    { key: 'semua', label: 'Semua', icon: 'apps' },
    { key: 'makanan', label: 'Makanan', icon: 'restaurant' },
    { key: 'minuman', label: 'Minuman', icon: 'local_cafe' },
    { key: 'snack', label: 'Snack', icon: 'tapas' },
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

  const totalItems = state.cart.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const addToCart = (item: MenuItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity: 1 } });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  };
  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 150, damping: 18 } },
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <div className="relative min-h-screen w-full bg-[#f6f8f7] text-slate-800 font-[var(--font-display)] flex items-center justify-center p-0 sm:p-4 overflow-hidden">
          {/* Background Blobs */}
          <div className="fixed -top-20 -right-20 w-96 h-96 bg-primary/8 rounded-full blur-[80px] pointer-events-none" />
          <div className="fixed bottom-0 -left-20 w-72 h-72 bg-teal-400/8 rounded-full blur-[80px] pointer-events-none" />

          <main className="w-full max-w-[428px] h-dvh sm:h-[min(926px,95vh)] glass-panel rounded-none sm:rounded-2xl overflow-hidden flex flex-col relative shadow-none sm:shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
            
            {/* Header */}
            <header className="pt-12 pb-4 px-6 z-10">
              <div className="flex items-center justify-between mb-4">
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => history.goBack()} className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-white/80 transition-colors">
                  <span className="material-icons-round text-slate-600">chevron_left</span>
                </motion.button>
                <h2 className="text-lg font-bold">Menu</h2>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => history.push('/cart')}
                  className="relative w-10 h-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-white/80 transition-colors"
                >
                  <span className="material-icons-round text-slate-600">shopping_bag</span>
                  {totalItems > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </motion.button>
              </div>

              {/* Search Bar */}
              <div className="relative mb-4">
                <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                <input
                  type="text"
                  placeholder="Cari menu favorit..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-100 text-sm placeholder-slate-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>

              {/* Category Chips */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map(cat => (
                  <motion.button
                    key={cat.key}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      activeCategory === cat.key
                        ? 'bg-primary text-white shadow-md shadow-primary/25'
                        : 'bg-white text-slate-500 border border-slate-100 hover:border-primary/30'
                    }`}
                  >
                    <span className="material-icons-round text-sm">{cat.icon}</span>
                    {cat.label}
                  </motion.button>
                ))}
              </div>
            </header>

            {/* Menu Grid */}
            <section className="flex-1 overflow-y-auto px-6 pb-32 z-10">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 gap-3">
                <AnimatePresence mode="popLayout">
                  {filteredItems.map(item => {
                    const cartQty = state.cart.find(c => c.id === item.id)?.quantity || 0;
                    return (
                      <motion.div
                        key={item.id}
                        variants={cardVariants}
                        layout
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-white rounded-2xl overflow-hidden border border-slate-100/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow group cursor-pointer"
                        onClick={() => addToCart(item)}
                      >
                        {/* Image */}
                        <div className="relative h-28 overflow-hidden">
                          <motion.img
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.4 }}
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          {item.badge && (
                            <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              item.badge === 'Best Seller' ? 'bg-amber-400 text-amber-900' :
                              item.badge === 'New' ? 'bg-blue-500 text-white' :
                              item.badge === 'Premium' ? 'bg-purple-500 text-white' :
                              'bg-primary text-white'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                          {item.stock <= 5 && (
                            <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/90 text-white">
                              Sisa {item.stock}
                            </span>
                          )}
                          {/* Cart quantity overlay */}
                          {cartQty > 0 && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute bottom-2 right-2 w-7 h-7 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
                            >
                              {cartQty}
                            </motion.div>
                          )}
                        </div>
                        {/* Info */}
                        <div className="p-3">
                          <h3 className="text-sm font-bold text-slate-800 mb-0.5 truncate">{item.name}</h3>
                          <p className="text-[11px] text-slate-400 mb-2 truncate">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-primary">{formatRupiah(item.price)}</span>
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={e => { e.stopPropagation(); addToCart(item); }}
                              className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                            >
                              <span className="material-icons-round text-lg">add</span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </section>

            {/* Floating Cart Summary */}
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.footer
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  className="absolute bottom-8 left-6 right-6 z-20"
                >
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => history.push('/cart')}
                    className="w-full bg-primary hover:bg-green-600 text-white font-bold py-4 px-6 rounded-full shadow-lg shadow-primary/40 flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="material-icons-round text-lg">shopping_bag</span>
                      </div>
                      <span className="text-base">{totalItems} Item</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{formatRupiah(totalPrice)}</span>
                      <span className="material-icons-round text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                  </motion.button>
                </motion.footer>
              )}
            </AnimatePresence>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MenuBrowsingGrid;
