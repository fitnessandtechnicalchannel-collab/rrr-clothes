'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useUIStore, Toast } from '@/store/uiStore';

const icons = {
  success: <CheckCircle size={16} style={{ color: '#16a34a' }} />,
  error: <XCircle size={16} style={{ color: '#dc2626' }} />,
  info: <Info size={16} style={{ color: 'var(--gold)' }} />,
};

export default function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  return (
    <div className="fixed top-20 right-4 z-[300] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast: Toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-white shadow-xl border border-gray-100 min-w-[240px] max-w-[320px]"
          >
            {icons[toast.type]}
            <p className="text-sm font-medium flex-1" style={{ color: 'var(--charcoal)' }}>
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-0.5 rounded hover:bg-gray-100 transition-colors"
            >
              <X size={14} style={{ color: 'var(--gray-mid)' }} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
