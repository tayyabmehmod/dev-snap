import { motion } from 'framer-motion'

export default function FeatureCard({ icon, title, description, gradient, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="feature-card p-7 group cursor-default"
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110`}
        style={{ background: gradient }}
      >
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{description}</p>

      {/* Glow line on hover */}
      <div
        className="h-0.5 mt-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: gradient }}
      />
    </motion.div>
  )
}
