import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IonPage, IonContent } from '@ionic/react';
import { Globe, UtensilsCrossed, ShoppingBag, ArrowRight } from 'lucide-react';
import { useHistory } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';

const OnboardingScreen: React.FC = () => {
  const [lang, setLang] = useState<'ID' | 'EN'>('ID');
  const history = useHistory();
  const { dispatch } = useAppContext();

  const toggleLang = () => setLang(prev => prev === 'ID' ? 'EN' : 'ID');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  };

  const orbVariants = {
    animate: {
      y: [0, -20, 0],
      scale: [1, 1.1, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false} className="no-scroll">
        <div className="relative min-h-screen w-full overflow-hidden bg-background-dark text-white font-display">
          
          {/* Background Layer with Parallax-like effect */}
          <div className="fixed inset-0 z-0">
            <motion.img 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ duration: 1.5 }}
              alt="Restaurant Interior"
              className="w-full h-full object-cover filter blur-lg brightness-50"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPwR-6YbFn0YF17gOXErVRIEQfipMtZRGROGclNtshUSaXdbprWS6TZ9cvERFgJwjqJ9D2YneNuVMERZ4o3DwTFfjIhvrT-5OvECMSLu5kEV-63UqsfyjoTXJCKST-gUrVit6j2XhxEWiDBRL4WMtl1AcweGeaEvXjrBRhDKFC_zwpB-aeKPss04HImsqF8MjLcwVt3r623egiEsBDB-xYJxBgP5Ss5V2FZlI4WjvwYfJ4qxPgA7FiZ89KEsoukOuO0e2rABoStzU"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-background-dark/80 to-background-dark/95"></div>
            
            {/* Animated Orbs */}
            <motion.div 
              variants={orbVariants}
              animate="animate"
              className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" 
            />
            <motion.div 
              variants={orbVariants}
              animate="animate"
              transition={{ delay: 2.5, duration: 6, repeat: Infinity }}
              className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]" 
            />
          </div>

          {/* Main Content */}
          <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="w-full max-w-sm glass-card rounded-[2rem] p-1 overflow-hidden relative group transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20"
            >
              
              {/* Image Section */}
              <div className="relative h-[45vh] max-h-[420px] rounded-[1.8rem] overflow-hidden group">
                {/* Parallax Image inside card */}
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPwR-6YbFn0YF17gOXErVRIEQfipMtZRGROGclNtshUSaXdbprWS6TZ9cvERFgJwjqJ9D2YneNuVMERZ4o3DwTFfjIhvrT-5OvECMSLu5kEV-63UqsfyjoTXJCKST-gUrVit6j2XhxEWiDBRL4WMtl1AcweGeaEvXjrBRhDKFC_zwpB-aeKPss04HImsqF8MjLcwVt3r623egiEsBDB-xYJxBgP5Ss5V2FZlI4WjvwYfJ4qxPgA7FiZ89KEsoukOuO0e2rABoStzU"
                  className="w-full h-full object-cover"
                  alt="Interior"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

                {/* Top Bar */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
                    {/* Status Indicator */}
                    <div className="flex items-center gap-2 glass-btn px-3 py-1.5 rounded-full bg-black/20 border-white/10">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </span>
                        <span className="text-xs font-medium tracking-wide text-white/90 uppercase">Open</span>
                    </div>

                    {/* Language Toggle */}
                    <button 
                        onClick={toggleLang}
                        className="glass-btn p-2 rounded-full text-white/90 hover:text-white flex items-center justify-center gap-2 group/lang"
                    >
                        <Globe size={18} className="group-hover/lang:rotate-12 transition-transform" />
                        <span className="text-xs font-bold pr-1">{lang}</span>
                    </button>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6 relative -mt-20 z-20">
                <div className="backdrop-blur-xl bg-black/40 rounded-2xl p-5 border border-white/5 shadow-2xl">
                    <motion.div variants={itemVariants}>
                        <h1 className="text-3xl font-display font-bold leading-tight mb-2">
                           {lang === 'ID' ? 'Seni Kuliner' : 'The Art of'} 
                           <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-emerald-200">
                               {lang === 'ID' ? 'Jepang Modern' : 'Modern Japanese'}
                           </span>
                        </h1>
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                            {lang === 'ID' 
                                ? 'Rasakan pengalaman dining otentik dengan sentuhan modern di jantung kota.'
                                : 'Experience authentic dining with a modern touch in the heart of the city.'}
                        </p>
                    </motion.div>

                    {/* Buttons */}
                    <div className="space-y-3">
                        <motion.button
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              dispatch({ type: 'SET_MODE', payload: 'dine-in' });
                              dispatch({ type: 'SET_LANG', payload: lang });
                              history.push('/tables');
                            }}
                            className="w-full glass-btn glass-btn-emerald group relative overflow-hidden rounded-xl p-4 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="p-2 rounded-full bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <UtensilsCrossed size={20} />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-bold text-white group-hover:text-shadow">Makan Di Sini</div>
                                    <div className="text-[10px] text-white/50 group-hover:text-white/80">Dine In Service</div>
                                </div>
                            </div>
                            <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                <ArrowRight size={20} className="text-white" />
                            </div>
                            {/* Glow effect handled by CSS class glass-btn-emerald */}
                        </motion.button>

                        <motion.button
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              dispatch({ type: 'SET_MODE', payload: 'take-away' });
                              dispatch({ type: 'SET_LANG', payload: lang });
                              history.push('/menu');
                            }}
                            className="w-full glass-btn glass-btn-teal group relative overflow-hidden rounded-xl p-4 flex items-center justify-between"
                        >
                             <div className="flex items-center gap-3 relative z-10">
                                <div className="p-2 rounded-full bg-teal-500/20 text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                                    <ShoppingBag size={20} />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-bold text-white">Bawa Pulang</div>
                                    <div className="text-[10px] text-white/50 group-hover:text-white/80">Take Away</div>
                                </div>
                            </div>
                            <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                <ArrowRight size={20} className="text-white" />
                            </div>
                        </motion.button>
                    </div>
                </div>
              </div>

            </motion.div>

            {/* Footer */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 flex items-center gap-2 text-white/20 text-xs font-medium tracking-widest uppercase"
            >
                <span>v1.0.4</span>
                <span className="w-1 h-1 rounded-full bg-white/20"></span>
                <span>Kou POS Immersive</span>
            </motion.div>

          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OnboardingScreen;
