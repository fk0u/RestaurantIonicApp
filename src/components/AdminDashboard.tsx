import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { formatRupiah } from '../data/constants';

type Tab = 'dashboard' | 'orders' | 'menu' | 'settings';

const AdminDashboard: React.FC = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const kpis = [
    { label: 'Total Order', value: '148', change: '+12%', icon: 'receipt_long', color: 'bg-primary/10 text-primary' },
    { label: 'Pendapatan', value: formatRupiah(12450000), change: '+8%', icon: 'account_balance_wallet', color: 'bg-blue-500/10 text-blue-500' },
    { label: 'Menu Terlaris', value: 'Salmon Don', change: '32 porsi', icon: 'local_fire_department', color: 'bg-amber-500/10 text-amber-500' },
    { label: 'Meja Terpakai', value: '9/12', change: '75%', icon: 'table_restaurant', color: 'bg-purple-500/10 text-purple-500' },
  ];

  const quickAccess = [
    { label: 'Kasir', icon: 'point_of_sale', path: '/cashier' },
    { label: 'Dapur', icon: 'soup_kitchen', path: '/kitchen' },
    { label: 'Meja', icon: 'table_restaurant', path: '/tables' },
    { label: 'Menu', icon: 'restaurant_menu', path: '/menu' },
    { label: 'Struk', icon: 'receipt', path: '/receipt' },
    { label: 'Design', icon: 'palette', path: '/design-system' },
  ];

  const recentOrders = [
    { id: 'ORD-148', table: 'T-05', total: 245000, status: 'Selesai', time: '14:32' },
    { id: 'ORD-147', table: 'T-01', total: 185000, status: 'Dimasak', time: '14:28' },
    { id: 'ORD-146', table: 'T-08', total: 320000, status: 'Siap', time: '14:15' },
    { id: 'ORD-145', table: 'T-03', total: 128000, status: 'Selesai', time: '13:55' },
    { id: 'ORD-144', table: 'T-10', total: 95000, status: 'Selesai', time: '13:40' },
  ];

  const statusColor: Record<string, string> = {
    Selesai: 'badge-success',
    Dimasak: 'badge-info',
    Siap: 'badge-warning',
  };

  // Donut chart SVG data
  const donutSegments = [
    { pct: 45, color: '#0fbd55', label: 'Makanan' },
    { pct: 30, color: '#3b82f6', label: 'Minuman' },
    { pct: 25, color: '#f59e0b', label: 'Snack' },
  ];

  let cumulativeOffset = 0;
  const donutCircumference = 2 * Math.PI * 40;

  const tabs: { key: Tab; icon: string; label: string }[] = [
    { key: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { key: 'orders', icon: 'receipt_long', label: 'Order' },
    { key: 'menu', icon: 'restaurant_menu', label: 'Menu' },
    { key: 'settings', icon: 'settings', label: 'Setting' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 150, damping: 18 } },
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <div className="relative min-h-screen w-full bg-[#f6f8f7] text-slate-800 font-[var(--font-display)] flex items-center justify-center p-0 sm:p-4 overflow-hidden">
          <div className="fixed -top-20 -right-20 w-96 h-96 bg-primary/8 rounded-full blur-[80px] pointer-events-none" />

          <main className="w-full max-w-[428px] h-dvh sm:h-[min(926px,95vh)] glass-panel rounded-none sm:rounded-2xl overflow-hidden flex flex-col relative shadow-none sm:shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
            
            {/* Header */}
            <header className="pt-10 pb-4 px-6 z-10">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Selamat siang 👋</p>
                  <h1 className="text-xl font-bold">Admin Dashboard</h1>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-white/80 transition-colors relative">
                    <span className="material-icons-round text-slate-600">notifications</span>
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
                  </button>
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                    A
                  </div>
                </div>
              </div>
            </header>

            {/* Content */}
            <section className="flex-1 overflow-y-auto px-6 pb-24 z-10">
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                
                {/* KPI Cards */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {kpis.map(kpi => (
                    <motion.div
                      key={kpi.label}
                      variants={itemVariants}
                      className="bg-white rounded-2xl p-4 border border-slate-100/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
                    >
                      <div className={`w-10 h-10 rounded-xl ${kpi.color} flex items-center justify-center mb-3`}>
                        <span className="material-icons-round text-xl">{kpi.icon}</span>
                      </div>
                      <div className="text-xs text-slate-400 mb-0.5">{kpi.label}</div>
                      <div className="text-lg font-bold leading-tight mb-1">{kpi.value}</div>
                      <div className="text-[11px] font-semibold text-primary">{kpi.change}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Revenue Chart (Donut) */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-2xl p-5 border border-slate-100/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] mb-6"
                >
                  <h3 className="text-sm font-bold mb-4">Kategori Penjualan</h3>
                  <div className="flex items-center gap-6">
                    <svg viewBox="0 0 100 100" className="w-24 h-24 flex-shrink-0">
                      {donutSegments.map((seg, idx) => {
                        const offset = cumulativeOffset;
                        cumulativeOffset += (seg.pct / 100) * donutCircumference;
                        return (
                          <circle
                            key={idx}
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke={seg.color}
                            strokeWidth="12"
                            strokeDasharray={`${(seg.pct / 100) * donutCircumference} ${donutCircumference}`}
                            strokeDashoffset={-offset}
                            transform="rotate(-90 50 50)"
                            strokeLinecap="round"
                          />
                        );
                      })}
                      <text x="50" y="48" textAnchor="middle" className="fill-slate-800 text-xs font-bold">100%</text>
                      <text x="50" y="58" textAnchor="middle" className="fill-slate-400 text-[6px]">Total</text>
                    </svg>
                    <div className="flex-1 space-y-2">
                      {donutSegments.map(seg => (
                        <div key={seg.label} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: seg.color }} />
                          <span className="text-xs text-slate-500 flex-1">{seg.label}</span>
                          <span className="text-xs font-bold">{seg.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Quick Access */}
                <motion.div variants={itemVariants} className="mb-6">
                  <h3 className="text-sm font-bold mb-3">Akses Cepat</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {quickAccess.map(item => (
                      <motion.button
                        key={item.label}
                        whileTap={{ scale: 0.93 }}
                        onClick={() => history.push(item.path)}
                        className="bg-white rounded-2xl py-4 px-3 border border-slate-100/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                          <span className="material-icons-round text-xl">{item.icon}</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-600">{item.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-sm font-bold mb-3">Aktivitas Terbaru</h3>
                  <div className="space-y-2">
                    {recentOrders.map(order => (
                      <div key={order.id} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-slate-100/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
                        <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                          <span className="material-icons-round text-slate-400 text-lg">receipt</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold">{order.id}</span>
                            <span className={`badge ${statusColor[order.status] || 'badge-info'}`}>{order.status}</span>
                          </div>
                          <div className="text-[11px] text-slate-400">{order.table} • {order.time}</div>
                        </div>
                        <div className="text-sm font-bold text-slate-700">{formatRupiah(order.total)}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </section>

            {/* Bottom Tab Navigation */}
            <nav className="absolute bottom-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-lg border-t border-slate-100">
              <div className="flex justify-around py-2 pb-4">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-colors ${
                      activeTab === tab.key ? 'text-primary' : 'text-slate-400'
                    }`}
                  >
                    <span className="material-icons-round text-xl">{tab.icon}</span>
                    <span className="text-[10px] font-semibold">{tab.label}</span>
                    {activeTab === tab.key && (
                      <motion.div layoutId="tab-indicator" className="w-1 h-1 rounded-full bg-primary mt-0.5" />
                    )}
                  </button>
                ))}
              </div>
            </nav>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminDashboard;
