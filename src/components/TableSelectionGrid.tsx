import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { TABLES } from '../data/constants';

const TableSelectionGrid: React.FC = () => {
  const history = useHistory();
  const { state, dispatch } = useAppContext();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    const table = TABLES.find(t => t.id === id);
    if (!table || table.status !== 'available') return;
    setSelectedId(id);
    dispatch({ type: 'SET_TABLE', payload: table });
  };

  const handleContinue = () => {
    if (selectedId) history.push('/menu');
  };

  const guests = state.guestCount;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring' as const, stiffness: 200, damping: 20 } },
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <div className="relative min-h-screen w-full bg-[#f6f8f7] text-slate-800 font-[var(--font-display)] flex items-center justify-center p-0 sm:p-4 overflow-hidden">
          {/* Background Blobs */}
          <div className="fixed -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="fixed top-1/2 -left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Main Container */}
          <main className="w-full max-w-[428px] h-dvh sm:h-[min(926px,95vh)] glass-panel rounded-none sm:rounded-2xl overflow-hidden flex flex-col relative shadow-none sm:shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
            
            {/* Header */}
            <header className="pt-12 pb-6 px-6 flex items-center justify-between z-10">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => history.goBack()}
                className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-white/80 transition-colors"
              >
                <span className="material-icons-round text-slate-600">chevron_left</span>
              </motion.button>
              <div className="text-sm font-semibold tracking-wide text-primary uppercase">Reservasi</div>
              <button className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-white/80 transition-colors">
                <span className="material-icons-round text-slate-600">menu</span>
              </button>
            </header>

            {/* Guest Stepper */}
            <section className="px-6 mb-8 z-10">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-2xl font-bold mb-6 text-center leading-tight"
              >
                Pesan meja untuk<br />berapa orang?
              </motion.h1>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between bg-white rounded-full p-2 shadow-sm border border-slate-100 mx-auto max-w-[280px]"
              >
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch({ type: 'SET_GUESTS', payload: guests - 1 })}
                  className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <span className="material-icons-round">remove</span>
                </motion.button>
                <div className="flex items-center gap-2 px-4">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={guests}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="text-3xl font-bold text-slate-800"
                    >
                      {guests}
                    </motion.span>
                  </AnimatePresence>
                  <span className="material-icons-round text-primary text-2xl">person</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch({ type: 'SET_GUESTS', payload: guests + 1 })}
                  className="w-12 h-12 rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 flex items-center justify-center transition-transform active:scale-95"
                >
                  <span className="material-icons-round">add</span>
                </motion.button>
              </motion.div>
            </section>

            {/* Table Grid */}
            <section className="flex-1 overflow-y-auto px-6 pb-24 z-10 scroll-smooth">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4"
              >
                {TABLES.map(table => {
                  const isSelected = selectedId === table.id;
                  const isOccupied = table.status === 'occupied';
                  const isReserved = table.status === 'reserved';
                  const isDisabled = isOccupied || isReserved;

                  return (
                    <motion.div
                      key={table.id}
                      variants={itemVariants}
                      className={`relative ${isDisabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer group'}`}
                      onClick={() => !isDisabled && handleSelect(table.id)}
                    >
                      <motion.div
                        whileHover={!isDisabled ? { scale: 1.05 } : {}}
                        whileTap={!isDisabled ? { scale: 0.95 } : {}}
                        className={`w-full aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${
                          isSelected
                            ? 'bg-primary shadow-lg shadow-primary/40 scale-105 border-2 border-white/20'
                            : isDisabled
                            ? 'bg-red-500/5 border border-red-500/10'
                            : 'bg-white/60 border border-primary/10 shadow-[0_4px_16px_0_rgba(31,38,135,0.05)] hover:border-primary/50'
                        }`}
                      >
                        <span className={`text-xs font-medium mb-1 ${
                          isSelected ? 'text-white/90' : isDisabled ? 'text-red-300' : 'text-slate-400'
                        }`}>
                          {table.label}
                        </span>
                        {isSelected ? (
                          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                            <span className="material-icons-round text-primary text-sm font-bold">check</span>
                          </div>
                        ) : isDisabled ? (
                          <span className="material-icons-round text-red-200">lock</span>
                        ) : (
                          <span className="material-icons-round text-slate-300">table_restaurant</span>
                        )}
                      </motion.div>
                      {/* Capacity Badge */}
                      <div className={`absolute -top-2 -right-2 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border ${
                        isSelected
                          ? 'bg-primary text-white border-white/20'
                          : isDisabled
                          ? 'bg-red-50 text-red-400 border-red-100'
                          : 'bg-white text-primary border-slate-100'
                      }`}>
                        {table.capacity}P
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
              <div className="h-20" />
            </section>

            {/* Bottom Action Bar */}
            <footer className="absolute bottom-8 left-6 right-6 z-20">
              <motion.button
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContinue}
                disabled={!selectedId}
                className={`w-full font-bold py-4 px-6 rounded-full shadow-lg flex items-center justify-between transition-all group ${
                  selectedId
                    ? 'bg-primary hover:bg-green-600 text-white shadow-primary/40'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                <span className="text-lg">Lanjutkan</span>
                <div className="flex items-center gap-2">
                  {selectedId && (
                    <span className="text-sm font-normal opacity-80">
                      Meja {TABLES.find(t => t.id === selectedId)?.label}
                    </span>
                  )}
                  <span className="material-icons-round group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </motion.button>
              {/* Legend */}
              <div className="flex justify-center gap-6 mt-4 opacity-70">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">Dipilih</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">Tersedia</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">Terisi</span>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TableSelectionGrid;
