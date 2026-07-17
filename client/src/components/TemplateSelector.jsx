import { motion } from 'framer-motion'

const TEMPLATES = [
  {
    id: 'glass',
    name: 'Glass',
    description: 'Dark glassmorphism',
    preview: (
      <div className="w-full h-16 rounded-lg overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63)' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-1 rounded bg-white/40 mr-2" />
          <div className="w-12 h-1 rounded bg-purple-400/60" />
        </div>
      </div>
    ),
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean & light',
    preview: (
      <div className="w-full h-16 rounded-lg overflow-hidden bg-white border border-gray-200">
        <div className="flex items-center justify-center h-full gap-2">
          <div className="w-8 h-1 rounded bg-gray-300" />
          <div className="w-12 h-1 rounded bg-blue-400" />
        </div>
      </div>
    ),
  },
  {
    id: 'cyber',
    name: 'Cyber',
    description: 'Neon futuristic',
    preview: (
      <div className="w-full h-16 rounded-lg overflow-hidden bg-black border border-green-500/50">
        <div className="flex items-center justify-center h-full gap-2">
          <div className="w-8 h-0.5 bg-green-400/60" />
          <div className="w-12 h-0.5 bg-green-400" />
        </div>
        <div className="absolute top-1 left-2 text-[10px] text-green-400/60 font-mono">{'> _'}</div>
      </div>
    ),
  },
]

export default function TemplateSelector({ selected, onSelect }) {
  return (
    <div className="space-y-3">
      <p className="form-section-label">Choose Template</p>
      <div className="grid grid-cols-3 gap-3">
        {TEMPLATES.map((template, i) => (
          <motion.button
            key={template.id}
            onClick={() => onSelect(template.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`relative flex flex-col gap-2 p-3 rounded-xl border-2 transition-all duration-200 text-left cursor-pointer ${
              selected === template.id
                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                : 'border-white/10 bg-white/3 hover:border-white/20'
            }`}
          >
            {selected === template.id && (
              <motion.div
                layoutId="template-selected"
                className="absolute top-2 right-2 w-3 h-3 rounded-full bg-primary"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <div className="relative">{template.preview}</div>
            <div>
              <p className={`text-sm font-semibold ${selected === template.id ? 'text-primary' : 'text-white'}`}>
                {template.name}
              </p>
              <p className="text-[11px] text-white/40">{template.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
