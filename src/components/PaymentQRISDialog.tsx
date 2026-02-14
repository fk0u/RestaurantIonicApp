import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { formatRupiah } from '../data/constants';

type PaymentMethod = 'cash' | 'qris';
type EWallet = 'ovo' | 'dana' | 'gopay' | 'shopee';

const PaymentQRISDialog: React.FC = () => {
  const history = useHistory();
  const { state, dispatch } = useAppContext();
  const [method, setMethod] = useState<PaymentMethod>('qris');
  const [selectedWallet, setSelectedWallet] = useState<EWallet>('dana');
  const [showSuccess, setShowSuccess] = useState(false);

  const subtotal = state.cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = Math.round(subtotal * 0.11);
  const total = subtotal + tax;

  const wallets: { key: EWallet; label: string; color: string }[] = [
    { key: 'ovo', label: 'OVO', color: '#4C3494' },
    { key: 'dana', label: 'DANA', color: '#108EE9' },
    { key: 'gopay', label: 'GoPay', color: '#00AED6' },
    { key: 'shopee', label: 'ShopeePay', color: '#EE4D2D' },
  ];

  const handlePayment = () => {
    setShowSuccess(true);
    setTimeout(() => {
      dispatch({ type: 'COMPLETE_ORDER' });
      history.push('/receipt');
    }, 2000);
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const dialogVariants = {
    hidden: { y: 100, opacity: 0, scale: 0.95 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 200, damping: 25 } },
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <div className="relative min-h-screen w-full bg-[#f6f8f7] text-slate-800 font-[var(--font-display)] flex items-center justify-center p-3 sm:p-4 overflow-hidden">
          {/* Blurred Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-200/80 to-slate-300/80 backdrop-blur-md" />
          
          {/* Background shimmer */}
          <div className="fixed -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="fixed bottom-0 -left-20 w-72 h-72 bg-blue-400/8 rounded-full blur-[100px] pointer-events-none" />

          {/* Payment Dialog */}
          <motion.main
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-[400px] bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10"
          >
            {/* Dialog Header */}
            <div className="bg-gradient-to-r from-primary to-emerald-500 px-6 py-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold">Pembayaran</h2>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => history.goBack()}
                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                  >
                    <span className="material-icons-round text-sm">close</span>
                  </motion.button>
                </div>
                <p className="text-sm text-white/80">Total: <span className="font-bold text-white">{formatRupiah(total)}</span></p>
              </div>
            </div>

            {/* Payment Method Toggle */}
            <div className="px-6 py-4">
              <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
                {(['cash', 'qris'] as PaymentMethod[]).map(m => (
                  <motion.button
                    key={m}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setMethod(m)}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                      method === m ? 'bg-white text-primary shadow-md' : 'text-slate-400'
                    }`}
                  >
                    <span className="material-icons-round text-lg">{m === 'cash' ? 'payments' : 'qr_code_2'}</span>
                    {m === 'cash' ? 'Tunai' : 'QRIS'}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {method === 'qris' ? (
                  <motion.div
                    key="qris"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* QR Code */}
                    <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center mb-5">
                      <div className="w-48 h-48 bg-slate-50 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
                        {/* Fake QR Code Pattern */}
                        <div className="grid grid-cols-8 gap-[2px] p-4">
                          {Array.from({ length: 64 }).map((_, i) => (
                            <div key={i} className={`w-4 h-4 rounded-sm ${
                              (i * 7 + 3) % 5 !== 0 ? 'bg-slate-800' : 'bg-white'
                            }`} />
                          ))}
                        </div>
                        {/* Center logo */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center">
                            <span className="text-primary font-black text-lg">K</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 text-center">Scan QR code dengan aplikasi e-wallet</p>
                    </div>

                    {/* E-Wallet Pills */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Pilih E-Wallet</p>
                      <div className="flex gap-2 flex-wrap">
                        {wallets.map(w => (
                          <motion.button
                            key={w.key}
                            whileTap={{ scale: 0.93 }}
                            onClick={() => setSelectedWallet(w.key)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                              selectedWallet === w.key
                                ? 'text-white shadow-md'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}
                            style={selectedWallet === w.key ? { backgroundColor: w.color } : {}}
                          >
                            {w.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="cash"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center py-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <span className="material-icons-round text-4xl text-primary">payments</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1">Pembayaran Tunai</h3>
                    <p className="text-sm text-slate-400 text-center mb-4">Bayar di kasir sebesar</p>
                    <div className="text-3xl font-black text-primary">{formatRupiah(total)}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="px-6 pb-3">
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="font-semibold">{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">PPN (11%)</span>
                  <span className="font-semibold">{formatRupiah(tax)}</span>
                </div>
                <div className="border-t border-dashed border-slate-200 pt-2 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary">{formatRupiah(total)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6 pt-3 flex gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => history.goBack()}
                className="flex-1 py-3.5 rounded-full border-2 border-slate-200 text-slate-500 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Batalkan
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handlePayment}
                className="flex-[2] py-3.5 rounded-full bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30 hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-icons-round text-lg">check_circle</span>
                Selesai
              </motion.button>
            </div>
          </motion.main>

          {/* Success Overlay */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="fixed inset-0 z-50 bg-primary flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  className="text-center text-white"
                >
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring' }}
                      className="material-icons-round text-5xl"
                    >
                      check
                    </motion.span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Pembayaran Berhasil!</h2>
                  <p className="text-white/70 text-sm">Mengalihkan ke struk...</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PaymentQRISDialog;
