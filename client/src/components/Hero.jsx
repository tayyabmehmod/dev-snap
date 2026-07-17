import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'

export default function Hero({ onStartBuilding }) {
  return (
    <section className="relative min-h-screen hero-gradient flex items-center justify-center overflow-hidden pt-16">
      {/* Floating Orbs */}
      <div className="orb orb-blue w-96 h-96 top-10 -left-24 animate-float" />
      <div className="orb orb-purple w-80 h-80 top-1/3 right-0 animate-float-delayed" />
      <div className="orb orb-cyan w-64 h-64 bottom-20 left-1/3 animate-float-slow" />

      {/* Floating shapes */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 right-[15%] w-20 h-20 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm hidden lg:block"
      />
      <motion.div
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-32 left-[12%] w-16 h-16 rounded-full border border-secondary/20 bg-secondary/5 backdrop-blur-sm hidden lg:block"
      />
      <motion.div
        animate={{ y: [-8, 12, -8], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/2 left-[8%] w-10 h-10 rounded-lg border border-accent/30 bg-accent/5 backdrop-blur-sm hidden xl:block"
      />
      <motion.div
        animate={{ y: [6, -12, 6], rotate: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-40 left-[20%] w-12 h-12 rounded-2xl border border-primary/15 bg-purple-500/5 backdrop-blur-sm hidden xl:block"
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium"
          style={{
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.3)',
            color: '#93C5FD',
          }}
        >
          <Sparkles size={14} />
          Introducing DevSnap v1.0
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight"
        >
          Build Your Developer
          <br />
          <span className="gradient-text">Portfolio in Seconds</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Create a professional developer portfolio with live preview, modern design,
          and export functionality. No code required.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            id="hero-start-building"
            onClick={onStartBuilding}
            className="btn-primary text-base px-8 py-4"
          >
            Start Building
            <ArrowRight size={18} />
          </button>
          <a
            href="#features"
            id="hero-live-demo"
            className="btn-secondary text-base px-8 py-4"
          >
            <Play size={16} className="fill-white/60" />
            See Features
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-8 mt-16"
        >
          {[
            { value: '3', label: 'Templates' },
            { value: '∞', label: 'Portfolios' },
            { value: '100%', label: 'Free' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold gradient-text">{stat.value}</p>
              <p className="text-xs text-white/30 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#09090B] to-transparent" />
    </section>
  )
}
