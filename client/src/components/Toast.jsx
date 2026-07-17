import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Loader, X } from 'lucide-react'
import { useEffect } from 'react'

export default function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed top-5 right-5 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastItem({ toast, onRemove }) {
  useEffect(() => {
    if (toast.type !== 'loading') {
      const timer = setTimeout(() => onRemove(toast.id), toast.duration || 4000)
      return () => clearTimeout(timer)
    }
  }, [toast, onRemove])

  const icons = {
    success: <CheckCircle size={18} className="text-accent flex-shrink-0" />,
    error: <XCircle size={18} className="text-red-400 flex-shrink-0" />,
    loading: <Loader size={18} className="text-primary animate-spin flex-shrink-0" />,
  }

  const borderColors = {
    success: 'border-l-accent',
    error: 'border-l-red-400',
    loading: 'border-l-primary',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`toast toast-${toast.type} ${borderColors[toast.type]} pointer-events-auto flex items-start gap-3`}
    >
      {icons[toast.type]}
      <div className="flex-1">
        {toast.title && (
          <p className="font-semibold text-white text-sm">{toast.title}</p>
        )}
        <p className="text-white/70 text-sm">{toast.message}</p>
      </div>
      {toast.type !== 'loading' && (
        <button
          onClick={() => onRemove(toast.id)}
          className="text-white/30 hover:text-white/70 transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </motion.div>
  )
}
