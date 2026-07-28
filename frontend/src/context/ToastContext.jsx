import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      
      {/* Toast Portal/Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 md:px-0">
        <AnimatePresence>
          {toasts.map((toast) => {
            let bgColor = 'bg-white dark:bg-zinc-900';
            let borderColor = 'border-slate-200 dark:border-zinc-800';
            let textColor = 'text-slate-800 dark:text-zinc-100';
            let Icon = Info;
            let iconColor = 'text-blue-500';

            if (toast.type === 'success') {
              bgColor = 'bg-emerald-50/95 dark:bg-emerald-950/20';
              borderColor = 'border-emerald-200/50 dark:border-emerald-800/30';
              textColor = 'text-emerald-800 dark:text-emerald-200';
              Icon = CheckCircle;
              iconColor = 'text-emerald-500';
            } else if (toast.type === 'error') {
              bgColor = 'bg-rose-50/95 dark:bg-rose-950/20';
              borderColor = 'border-rose-200/50 dark:border-rose-800/30';
              textColor = 'text-rose-800 dark:text-rose-200';
              Icon = AlertCircle;
              iconColor = 'text-rose-500';
            } else if (toast.type === 'warning') {
              bgColor = 'bg-amber-50/95 dark:bg-amber-950/20';
              borderColor = 'border-amber-200/50 dark:border-amber-800/30';
              textColor = 'text-amber-800 dark:text-amber-200';
              Icon = AlertCircle;
              iconColor = 'text-amber-500';
            }

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-lg ${bgColor} ${borderColor} ${textColor}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
                  <p className="text-sm font-medium leading-relaxed">{toast.message}</p>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
