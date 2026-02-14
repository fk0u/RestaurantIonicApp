import React from 'react';
import { motion } from 'framer-motion';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const DesignSystemUIKit: React.FC = () => {
  const history = useHistory();

  const colors = [
    { name: 'Primary', hex: '#0fbd55', css: 'bg-primary' },
    { name: 'Primary Dark', hex: '#0b8a3e', css: 'bg-primary-dark' },
    { name: 'Primary Light', hex: '#3fd67e', css: 'bg-primary-light' },
    { name: 'Background', hex: '#f6f8f7', css: 'bg-[#f6f8f7]' },
    { name: 'Dark BG', hex: '#102217', css: 'bg-background-dark' },
    { name: 'Surface', hex: '#ffffff', css: 'bg-white' },
  ];

  const typography = [
    { name: 'Display', size: '28px', weight: '800', sample: 'KOU Restaurant' },
    { name: 'Heading 1', size: '24px', weight: '700', sample: 'Pesan meja untuk' },
    { name: 'Heading 2', size: '20px', weight: '700', sample: 'Menu Favorit' },
    { name: 'Body', size: '14px', weight: '500', sample: 'Rasakan pengalaman dining otentik' },
    { name: 'Caption', size: '12px', weight: '500', sample: 'Dine In Service' },
    { name: 'Micro', size: '10px', weight: '600', sample: 'v1.0.4 • KOU POS' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <div className="relative min-h-screen w-full bg-[#f6f8f7] text-slate-800 font-[var(--font-display)] flex items-center justify-center p-0 sm:p-4 overflow-hidden">
          <div className="fixed -top-20 -right-20 w-96 h-96 bg-primary/8 rounded-full blur-[80px] pointer-events-none" />

          <main className="w-full sm:max-w-[428px] h-dvh sm:h-[min(926px,95vh)] glass-panel rounded-none sm:rounded-2xl overflow-hidden flex flex-col relative shadow-none sm:shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
            
            {/* Header */}
            <header className="pt-12 pb-4 px-6 flex items-center justify-between z-10 border-b border-slate-100">
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => history.goBack()} className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-white/80 transition-colors">
                <span className="material-icons-round text-slate-600">chevron_left</span>
              </motion.button>
              <h2 className="text-lg font-bold">Design System</h2>
              <div className="w-10" />
            </header>

            {/* Content */}
            <section className="flex-1 overflow-y-auto px-6 py-6 z-10">
              <motion.div variants={containerVariants} initial="hidden" animate="visible">

                {/* Color Palette */}
                <motion.div variants={itemVariants} className="mb-8">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Color Palette</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {colors.map(c => (
                      <div key={c.name} className="text-center">
                        <div className="w-full aspect-square rounded-2xl mb-2 border border-slate-100 shadow-sm" style={{ backgroundColor: c.hex }} />
                        <div className="text-xs font-semibold text-slate-700">{c.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{c.hex}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Typography */}
                <motion.div variants={itemVariants} className="mb-8">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Typography</h3>
                  <div className="bg-white rounded-2xl p-4 border border-slate-100/80 space-y-4">
                    {typography.map(t => (
                      <div key={t.name} className="flex items-baseline justify-between gap-3">
                        <span
                          className="text-slate-800 flex-1 truncate"
                          style={{ fontSize: t.size, fontWeight: parseInt(t.weight) }}
                        >
                          {t.sample}
                        </span>
                        <div className="text-right flex-shrink-0">
                          <div className="text-[10px] text-slate-400">{t.name}</div>
                          <div className="text-[10px] text-slate-300 font-mono">{t.size} / {t.weight}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Buttons */}
                <motion.div variants={itemVariants} className="mb-8">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Buttons</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-primary text-white font-bold py-3.5 rounded-full shadow-lg shadow-primary/30 hover:bg-green-600 transition-colors text-sm">
                      Primary Button
                    </button>
                    <button className="w-full bg-white text-slate-700 font-bold py-3.5 rounded-full border-2 border-slate-200 hover:border-primary/50 transition-colors text-sm">
                      Secondary Button
                    </button>
                    <button className="w-full bg-slate-100 text-slate-400 font-bold py-3.5 rounded-full cursor-not-allowed text-sm">
                      Disabled Button
                    </button>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-primary/10 text-primary font-bold py-3 rounded-xl text-sm hover:bg-primary/20 transition-colors">
                        Ghost
                      </button>
                      <button className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl text-sm hover:bg-red-600 transition-colors">
                        Danger
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Glass Components */}
                <motion.div variants={itemVariants} className="mb-8">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Glass Components</h3>
                  <div className="space-y-3">
                    {/* Light Glass */}
                    <div className="glass-panel rounded-2xl p-4">
                      <div className="text-sm font-bold mb-1">Glass Panel (Light)</div>
                      <div className="text-xs text-slate-400">rgba(255,255,255,0.7) + blur(20px)</div>
                    </div>
                    {/* Dark Glass */}
                    <div className="glass-card rounded-2xl p-4 text-white">
                      <div className="text-sm font-bold mb-1">Glass Card (Dark)</div>
                      <div className="text-xs text-white/50">rgba(16,34,23,0.6) + blur(20px)</div>
                    </div>
                    {/* Glass Button */}
                    <button className="glass-btn glass-btn-emerald rounded-xl px-6 py-3 text-white text-sm font-semibold">
                      Glass Button (Emerald Glow)
                    </button>
                  </div>
                </motion.div>

                {/* Badges */}
                <motion.div variants={itemVariants} className="mb-8">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Badges</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge badge-success">
                      <span className="material-icons-round text-[10px]">check_circle</span>
                      Success
                    </span>
                    <span className="badge badge-warning">
                      <span className="material-icons-round text-[10px]">warning</span>
                      Warning
                    </span>
                    <span className="badge badge-danger">
                      <span className="material-icons-round text-[10px]">error</span>
                      Danger
                    </span>
                    <span className="badge badge-info">
                      <span className="material-icons-round text-[10px]">info</span>
                      Info
                    </span>
                  </div>
                </motion.div>

                {/* Form Elements */}
                <motion.div variants={itemVariants} className="mb-8">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Form Elements</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 mb-1 block">Text Input</label>
                      <input type="text" placeholder="Enter text..." className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 mb-1 block">Search</label>
                      <div className="relative">
                        <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                        <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 mb-1 block">Stepper</label>
                      <div className="flex items-center gap-3 justify-center">
                        <button className="stepper-btn">
                          <span className="material-icons-round text-sm">remove</span>
                        </button>
                        <span className="text-xl font-bold w-8 text-center">2</span>
                        <button className="stepper-btn">
                          <span className="material-icons-round text-sm">add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Spacing */}
                <motion.div variants={itemVariants} className="mb-8">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Border Radius</h3>
                  <div className="flex gap-3 items-end">
                    {[
                      { r: '8px', label: 'sm' },
                      { r: '12px', label: 'md' },
                      { r: '16px', label: 'lg' },
                      { r: '24px', label: 'xl' },
                      { r: '9999px', label: 'full' },
                    ].map(item => (
                      <div key={item.label} className="flex-1 text-center">
                        <div
                          className="w-full aspect-square bg-primary/15 border-2 border-primary/30 mb-1"
                          style={{ borderRadius: item.r }}
                        />
                        <div className="text-[10px] text-slate-400 font-mono">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Footer */}
                <div className="text-center py-4 text-[10px] text-slate-300">
                  KOU Restaurant Design System v1.0<br />
                  Plus Jakarta Sans · Glassmorphism · Framer Motion
                </div>
              </motion.div>
            </section>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DesignSystemUIKit;
