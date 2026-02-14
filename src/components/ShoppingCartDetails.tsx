import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { formatRupiah } from '../data/constants';

const ShoppingCartDetails: React.FC = () => {
  const history = useHistory();
  const { state, dispatch } = useAppContext();
  const { cart } = state;

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = Math.round(subtotal * 0.11);
  const total = subtotal + tax;
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 150, damping: 18 } },
    exit: { x: 60, opacity: 0, height: 0, marginBottom: 0, transition: { duration: 0.3 } },
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <div className="relative min-h-screen w-full bg-[#f6f8f7] text-slate-800 font-[var(--font-display)] flex items-center justify-center p-0 sm:p-4 overflow-hidden">
          <div className="fixed -top-20 -right-20 w-96 h-96 bg-primary/8 rounded-full blur-[80px] pointer-events-none" />

          <main className="w-full max-w-[428px] h-dvh sm:h-[min(926px,95vh)] glass-panel rounded-none sm:rounded-2xl overflow-hidden flex flex-col relative shadow-none sm:shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
            
            {/* Header */}
            <header className="pt-12 pb-4 px-6 flex items-center justify-between z-10">
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => history.goBack()} className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-white/80 transition-colors">
                <span className="material-icons-round text-slate-600">chevron_left</span>
              </motion.button>
              <h2 className="text-lg font-bold">Keranjang ({totalItems})</h2>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
                className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
              >
                <span className="material-icons-round text-red-400 text-xl">delete_outline</span>
              </motion.button>
            </header>

            {/* Cart Items */}
            <section className="flex-1 overflow-y-auto px-6 pb-8 z-10">
              {cart.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center">
                  <span className="material-icons-round text-6xl text-slate-200 mb-4">shopping_cart</span>
                  <h3 className="text-lg font-bold text-slate-400 mb-2">Keranjang Kosong</h3>
                  <p className="text-sm text-slate-400 mb-6">Yuk mulai pilih menu favorit kamu</p>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => history.push('/menu')}
                    className="px-6 py-3 rounded-full bg-primary text-white font-semibold text-sm shadow-lg shadow-primary/30"
                  >
                    Lihat Menu
                  </motion.button>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {cart.map(item => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      className="flex gap-4 mb-4 bg-white rounded-2xl p-3 border border-slate-100/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-slate-800 truncate">{item.name}</h3>
                          <p className="text-xs text-slate-400 truncate">{item.description}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-primary">{formatRupiah(item.price * item.quantity)}</span>
                          <div className="flex items-center gap-3">
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}
                              className="stepper-btn"
                            >
                              <span className="material-icons-round text-sm">remove</span>
                            </motion.button>
                            <AnimatePresence mode="wait">
                              <motion.span
                                key={item.quantity}
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 10, opacity: 0 }}
                                className="text-sm font-bold w-5 text-center"
                              >
                                {item.quantity}
                              </motion.span>
                            </AnimatePresence>
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                              className="stepper-btn"
                            >
                              <span className="material-icons-round text-sm">add</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                      {/* Delete Button */}
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                        className="self-start p-1 rounded-full hover:bg-red-50 transition-colors"
                      >
                        <span className="material-icons-round text-slate-300 hover:text-red-400 text-lg">close</span>
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </section>

            {/* Summary & CTA */}
            {cart.length > 0 && (
              <motion.div 
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="px-6 pb-8 pt-4 z-10 border-t border-slate-100"
              >
                <div className="bg-white rounded-2xl p-4 border border-slate-100/80 shadow-sm mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Subtotal</span>
                    <span className="font-semibold">{formatRupiah(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-slate-400">PPN (11%)</span>
                    <span className="font-semibold">{formatRupiah(tax)}</span>
                  </div>
                  <div className="border-t border-dashed border-slate-200 pt-3 flex justify-between">
                    <span className="text-base font-bold">Total</span>
                    <span className="text-base font-bold text-primary">{formatRupiah(total)}</span>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => history.push('/payment')}
                  className="w-full bg-primary hover:bg-green-600 text-white font-bold py-4 px-6 rounded-full shadow-lg shadow-primary/40 flex items-center justify-center gap-2 transition-all group"
                >
                  <span className="text-lg">Lanjut Bayar</span>
                  <span className="material-icons-round group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </motion.button>
              </motion.div>
            )}
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ShoppingCartDetails;
