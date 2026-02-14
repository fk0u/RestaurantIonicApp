import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { SAMPLE_TICKETS } from '../data/constants';
import type { OrderTicket } from '../data/constants';

const statusConfig = {
  new: { label: 'BARU', bg: 'bg-amber-500', text: 'text-white', icon: 'notifications_active', action: 'Mulai Proses', actionColor: 'bg-amber-500' },
  cooking: { label: 'DIMASAK', bg: 'bg-blue-500', text: 'text-white', icon: 'local_fire_department', action: 'Siap Antar', actionColor: 'bg-blue-500' },
  ready: { label: 'SIAP', bg: 'bg-primary', text: 'text-white', icon: 'check_circle', action: 'Selesai', actionColor: 'bg-primary' },
};

const KitchenOrderTickets: React.FC = () => {
  const history = useHistory();
  const [tickets, setTickets] = useState<OrderTicket[]>(SAMPLE_TICKETS);
  const [filter, setFilter] = useState<'all' | 'new' | 'cooking' | 'ready'>('all');

  const filteredTickets = filter === 'all' ? tickets : tickets.filter(t => t.status === filter);

  const advanceStatus = (id: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id !== id) return t;
      if (t.status === 'new') return { ...t, status: 'cooking' as const };
      if (t.status === 'cooking') return { ...t, status: 'ready' as const };
      return t;
    }));
  };

  const stats = {
    total: tickets.length,
    newCount: tickets.filter(t => t.status === 'new').length,
    cooking: tickets.filter(t => t.status === 'cooking').length,
    ready: tickets.filter(t => t.status === 'ready').length,
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <div className="relative min-h-screen w-full bg-[#0d1a12] text-white font-[var(--font-display)] flex items-center justify-center p-0 sm:p-4 overflow-hidden">
          {/* Dark Kitchen Ambiance */}
          <div className="fixed inset-0 bg-gradient-to-b from-[#0d1a12] via-[#0f1d14] to-[#0a1510]" />
          <div className="fixed -top-20 -right-20 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="fixed bottom-0 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

          <main className="w-full max-w-[428px] h-dvh sm:h-[min(926px,95vh)] relative z-10 overflow-hidden flex flex-col rounded-none sm:rounded-2xl border-0 sm:border sm:border-white/5 bg-[#0f1d14]">
            
            {/* Header */}
            <header className="pt-10 pb-4 px-5 z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => history.goBack()} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="material-icons-round text-white/70 text-xl">chevron_left</span>
                  </motion.button>
                  <div>
                    <h2 className="text-base font-bold flex items-center gap-2">
                      Dapur
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                      </span>
                    </h2>
                    <p className="text-[10px] text-white/40">Live Kitchen Display</p>
                  </div>
                </div>
                <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center relative">
                  <span className="material-icons-round text-white/70 text-xl">notifications</span>
                  {stats.newCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                      {stats.newCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Stats Bar */}
              <div className="flex gap-2">
                {[
                  { label: 'Total', value: stats.total, color: 'bg-white/10', filter: 'all' as const },
                  { label: 'Baru', value: stats.newCount, color: 'bg-amber-500/15', filter: 'new' as const },
                  { label: 'Masak', value: stats.cooking, color: 'bg-blue-500/15', filter: 'cooking' as const },
                  { label: 'Siap', value: stats.ready, color: 'bg-primary/15', filter: 'ready' as const },
                ].map(stat => (
                  <button
                    key={stat.label}
                    onClick={() => setFilter(stat.filter)}
                    className={`flex-1 rounded-xl py-2.5 text-center transition-all ${
                      filter === stat.filter
                        ? 'ring-2 ring-primary/50 ' + stat.color
                        : stat.color + ' hover:opacity-80'
                    }`}
                  >
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-[10px] text-white/50">{stat.label}</div>
                  </button>
                ))}
              </div>
            </header>

            {/* Tickets */}
            <section className="flex-1 overflow-y-auto px-5 pb-6 z-10">
              <AnimatePresence mode="popLayout">
                {filteredTickets.map((ticket, index) => {
                  const config = statusConfig[ticket.status];
                  return (
                    <motion.div
                      key={ticket.id}
                      layout
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1, transition: { delay: index * 0.08 } }}
                      exit={{ x: -50, opacity: 0, transition: { duration: 0.2 } }}
                      className="kitchen-ticket mb-4 bg-[#152019] border border-white/8"
                    >
                      {/* Ticket Header */}
                      <div className={`${config.bg} px-4 py-3 flex items-center justify-between`}>
                        <div className="flex items-center gap-2">
                          <span className="material-icons-round text-lg">{config.icon}</span>
                          <span className="text-xs font-bold tracking-wider uppercase">{config.label}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold">{ticket.id}</div>
                          <div className="text-[10px] opacity-70">{ticket.time}</div>
                        </div>
                      </div>

                      {/* Ticket Body */}
                      <div className="p-4">
                        {/* Table & Time */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="material-icons-round text-primary text-sm">table_restaurant</span>
                            <span className="text-sm font-bold">{ticket.tableLabel}</span>
                          </div>
                          <div className="flex items-center gap-1 text-white/40">
                            <span className="material-icons-round text-sm">timer</span>
                            <span className="text-xs">{ticket.elapsed}</span>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="space-y-2 mb-4">
                          {ticket.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2">
                              <div className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                                {item.qty}x
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold text-white/80 truncate">{item.name}</div>
                                {item.notes && (
                                  <div className="text-[10px] text-amber-400/80 flex items-center gap-1 mt-0.5">
                                    <span className="material-icons-round text-[10px]">info</span>
                                    {item.notes}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Action */}
                        {ticket.status !== 'ready' ? (
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => advanceStatus(ticket.id)}
                            className={`w-full ${config.actionColor} text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-colors`}
                          >
                            <span className="material-icons-round text-lg">
                              {ticket.status === 'new' ? 'play_arrow' : 'check'}
                            </span>
                            {config.action}
                          </motion.button>
                        ) : (
                          <div className="flex items-center justify-center gap-2 py-2 text-primary">
                            <span className="material-icons-round text-lg">check_circle</span>
                            <span className="text-sm font-bold">Siap Disajikan</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {filteredTickets.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <span className="material-icons-round text-5xl text-white/10 mb-3">restaurant_menu</span>
                  <p className="text-sm text-white/30">Tidak ada order{filter !== 'all' ? ` ${filter}` : ''}</p>
                </div>
              )}
            </section>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default KitchenOrderTickets;
