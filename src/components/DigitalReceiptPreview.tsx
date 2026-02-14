import React from 'react';
import { motion } from 'framer-motion';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { formatRupiah, MENU_ITEMS } from '../data/constants';

const DigitalReceiptPreview: React.FC = () => {
  const history = useHistory();
  const { state } = useAppContext();

  // Use lastOrder (from completed payment), fallback to cart, then sample
  const items = state.lastOrder && state.lastOrder.length > 0
    ? state.lastOrder
    : state.cart.length > 0
    ? state.cart
    : MENU_ITEMS.slice(0, 3).map(i => ({ ...i, quantity: 1 }));

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = Math.round(subtotal * 0.11);
  const total = subtotal + tax;
  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  const orderId = React.useMemo(() => `KOU-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`, []);

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <div className="relative min-h-screen w-full bg-[#f6f8f7] text-slate-800 font-[var(--font-display)] flex items-center justify-center p-0 sm:p-4 overflow-hidden">
          <div className="fixed -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

          <main className="w-full max-w-[428px] h-dvh sm:h-[min(926px,95vh)] glass-panel rounded-none sm:rounded-2xl overflow-hidden flex flex-col relative shadow-none sm:shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
            
            {/* Header */}
            <header className="pt-12 pb-4 px-6 flex items-center justify-between z-10">
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => history.push('/onboarding')} className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-white/80 transition-colors">
                <span className="material-icons-round text-slate-600">close</span>
              </motion.button>
              <h2 className="text-lg font-bold">Struk Digital</h2>
              <button className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-white/80 transition-colors">
                <span className="material-icons-round text-slate-600">share</span>
              </button>
            </header>

            {/* Receipt */}
            <section className="flex-1 overflow-y-auto px-6 pb-8 z-10 flex flex-col items-center">
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                className="w-full max-w-[360px] bg-white rounded-2xl shadow-lg overflow-hidden relative receipt-zigzag"
              >
                {/* Branding */}
                <div className="bg-gradient-to-r from-primary to-emerald-500 px-6 py-8 text-white text-center relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/10 rounded-full" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                      <span className="text-2xl font-black">K</span>
                    </div>
                    <h1 className="text-xl font-bold mb-0.5">KOU Restaurant</h1>
                    <p className="text-xs text-white/70">Modern Japanese Dining</p>
                  </div>
                </div>

                {/* Order Info */}
                <div className="px-6 py-4 border-b border-dashed border-slate-200">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block mb-0.5">No. Order</span>
                      <span className="font-bold text-slate-700">{orderId}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block mb-0.5">Tanggal</span>
                      <span className="font-bold text-slate-700">{dateStr}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">Waktu</span>
                      <span className="font-bold text-slate-700">{timeStr}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block mb-0.5">Meja</span>
                      <span className="font-bold text-slate-700">{state.selectedTable?.label || 'T-04'}</span>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="px-6 py-4 border-b border-dashed border-slate-200">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Detail Pesanan</h3>
                  {items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center mb-2.5 last:mb-0">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-slate-700 truncate">{item.name}</div>
                        <div className="text-xs text-slate-400">{item.quantity}x {formatRupiah(item.price)}</div>
                      </div>
                      <div className="text-sm font-semibold text-slate-700 ml-4">{formatRupiah(item.price * item.quantity)}</div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="px-6 py-4 border-b border-dashed border-slate-200">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-400">Subtotal</span>
                    <span className="font-semibold">{formatRupiah(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-slate-400">PPN (11%)</span>
                    <span className="font-semibold">{formatRupiah(tax)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-100">
                    <span className="text-base font-bold">Total</span>
                    <span className="text-base font-bold text-primary">{formatRupiah(total)}</span>
                  </div>
                </div>

                {/* QR Code */}
                <div className="px-6 py-5 flex flex-col items-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-xl mb-2 flex items-center justify-center">
                    <div className="grid grid-cols-5 gap-[1px]">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className={`w-3 h-3 rounded-[1px] ${i % 3 !== 1 ? 'bg-slate-800' : 'bg-white'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 text-center">Scan untuk verifikasi</p>
                </div>

                {/* Footer */}
                <div className="px-6 pb-8 pt-2 text-center">
                  <p className="text-xs text-slate-400">Terima kasih telah berkunjung</p>
                  <p className="text-[10px] text-slate-300 mt-1">Powered by KOU POS v1.0</p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex gap-3 mt-6 w-full max-w-[360px]"
              >
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
                >
                  <span className="material-icons-round text-lg">download</span>
                  Download PDF
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:bg-green-600 transition-colors"
                >
                  <span className="material-icons-round text-lg">print</span>
                  Cetak
                </motion.button>
              </motion.div>

              {/* Back to Home */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => history.push('/onboarding')}
                className="mt-4 text-sm text-primary font-semibold flex items-center gap-1 hover:underline"
              >
                <span className="material-icons-round text-sm">home</span>
                Kembali ke Beranda
              </motion.button>
            </section>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DigitalReceiptPreview;
