import { useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Save, Zap, RotateCcw, LayoutDashboard } from 'lucide-react'
import Hero from '../components/Hero'
import DeveloperForm from '../components/DeveloperForm'
import PortfolioPreview from '../components/PortfolioPreview'
import FeatureCard from '../components/FeatureCard'
import ExportButton from '../components/ExportButton'
import Toast from '../components/Toast'
import { usePortfolio } from '../hooks/usePortfolio'
import { useApi } from '../hooks/useApi'

const FEATURES = [
  {
    icon: '⚡',
    title: 'Live Preview',
    description: 'See your portfolio update in real time as you type. No page refreshes needed.',
    gradient: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3))',
  },
  {
    icon: '🎨',
    title: 'Beautiful Templates',
    description: 'Choose from Glass, Minimal, and Cyber themes to match your personal brand.',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(236,72,153,0.3))',
  },
  {
    icon: '📄',
    title: 'Export Portfolio',
    description: 'Download your portfolio as a standalone HTML file or JSON data instantly.',
    gradient: 'linear-gradient(135deg, rgba(34,211,238,0.3), rgba(59,130,246,0.3))',
  },
  {
    icon: '💾',
    title: 'Save Portfolio',
    description: 'Securely save your work to the cloud with our Flask-powered REST API.',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(34,211,238,0.3))',
  },
  {
    icon: '🚀',
    title: 'Fast Performance',
    description: 'Built with Vite and React for lightning-fast load times and smooth interactions.',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.3), rgba(239,68,68,0.3))',
  },
  {
    icon: '🔒',
    title: 'Secure Storage',
    description: 'Your portfolio data is stored securely in SQLite via SQLAlchemy ORM.',
    gradient: 'linear-gradient(135deg, rgba(239,68,68,0.3), rgba(139,92,246,0.3))',
  },
]

function useToast() {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((toast) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, ...toast }])
    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const updateToast = useCallback((id, updates) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  }, [])

  return { toasts, addToast, removeToast, updateToast }
}

export default function Home() {
  const builderRef = useRef(null)
  const {
    portfolio,
    updateField, updateProject, addProject, removeProject,
    updateExperience, addExperience, removeExperience,
    updateEducation, addEducation, removeEducation,
    addSkill, removeSkill, updateSocialLinks, resetPortfolio,
  } = usePortfolio()

  const { savePortfolio, loading } = useApi()
  const { toasts, addToast, removeToast, updateToast } = useToast()
  const [savedId, setSavedId] = useState(null)

  const scrollToBuilder = () => {
    builderRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSave = async () => {
    if (!portfolio.full_name.trim()) {
      addToast({ type: 'error', title: 'Validation Error', message: 'Please enter your full name first.' })
      return
    }

    const toastId = addToast({ type: 'loading', title: 'Saving...', message: 'Storing your portfolio to the database.' })

    try {
      const res = await savePortfolio(portfolio)
      removeToast(toastId)
      setSavedId(res.data.id)
      addToast({
        type: 'success',
        title: 'Portfolio Saved!',
        message: `Portfolio #${res.data.id} saved successfully.`,
        duration: 5000,
      })
    } catch (err) {
      removeToast(toastId)
      addToast({ type: 'error', title: 'Save Failed', message: err.message, duration: 5000 })
    }
  }

  return (
    <div>
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Hero */}
      <Hero onStartBuilding={scrollToBuilder} />

      {/* Builder Section */}
      <section ref={builderRef} id="builder" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#93C5FD' }}>
              <Zap size={12} />
              Live Builder
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Build Your <span className="gradient-text">Portfolio</span>
            </h2>
            <p className="text-white/40 text-base max-w-xl mx-auto">
              Fill in the form on the left and watch your portfolio come to life on the right.
            </p>
          </motion.div>

          {/* Action Bar */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-white/30 text-xs">Live Preview Active</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetPortfolio}
                className="btn-secondary text-xs py-2 px-3 gap-1.5"
                title="Reset form"
              >
                <RotateCcw size={13} />
                Reset
              </button>
              <Link
                to="/dashboard"
                id="dashboard-nav-btn"
                className="btn-secondary text-sm py-2.5 px-4 flex items-center gap-2"
              >
                <LayoutDashboard size={15} />
                Dashboard
              </Link>
              <ExportButton portfolio={portfolio} />
              <button
                id="save-portfolio-btn"
                onClick={handleSave}
                disabled={loading}
                className="btn-primary text-sm py-2.5 px-5 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save size={15} />
                )}
                {savedId ? 'Update' : 'Save Portfolio'}
              </button>
            </div>
          </div>

          {/* Split Screen */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:max-h-[85vh] lg:overflow-y-auto lg:pr-1 space-y-4"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(59,130,246,0.3) transparent' }}
            >
              <DeveloperForm
                portfolio={portfolio}
                updateField={updateField}
                updateProject={updateProject}
                addProject={addProject}
                removeProject={removeProject}
                updateExperience={updateExperience}
                addExperience={addExperience}
                removeExperience={removeExperience}
                updateEducation={updateEducation}
                addEducation={addEducation}
                removeEducation={removeEducation}
                addSkill={addSkill}
                removeSkill={removeSkill}
                updateSocialLinks={updateSocialLinks}
              />
            </motion.div>

            {/* Right: Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-20 lg:self-start lg:max-h-[85vh] rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}
            >
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="ml-3 text-white/20 text-xs">Portfolio Preview</span>
              </div>
              <div className="lg:h-[calc(85vh-44px)] overflow-auto">
                <PortfolioPreview portfolio={portfolio} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="section-title">
              Everything You <span className="gradient-text">Need</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              A complete portfolio builder with all the tools developers need to showcase their work professionally.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature, i) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradient={feature.gradient}
                delay={i * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="section-title">
              Choose Your <span className="gradient-text">Style</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Three distinct templates, each with a unique personality. Switch between them instantly in the builder.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: 'glass',
                name: 'Glass',
                desc: 'Dark glassmorphism with purple gradients. Perfect for a mysterious, premium feel.',
                bg: 'linear-gradient(135deg, #0f0c29, #302b63)',
                tag: 'Most Popular',
                tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
              },
              {
                id: 'minimal',
                name: 'Minimal',
                desc: 'Clean white design with sharp typography. Ideal for a professional, corporate look.',
                bg: 'linear-gradient(135deg, #f0f4ff, #e8ecff)',
                tag: 'Clean',
                tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
              },
              {
                id: 'cyber',
                name: 'Cyber',
                desc: 'Neon green on black with monospace fonts. Stand out with a futuristic identity.',
                bg: 'linear-gradient(135deg, #0a0a0a, #001a00)',
                tag: 'Unique',
                tagColor: 'bg-green-500/20 text-green-300 border-green-500/30',
              },
            ].map((tpl, i) => (
              <motion.div
                key={tpl.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card overflow-hidden group cursor-pointer"
                onClick={scrollToBuilder}
              >
                {/* Preview */}
                <div className="h-40 relative overflow-hidden" style={{ background: tpl.bg }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-60">
                    <div className={`w-12 h-12 rounded-full ${tpl.id === 'cyber' ? 'border-2 border-green-400 text-green-400' : 'bg-white/20'} flex items-center justify-center text-lg font-bold text-white`}>D</div>
                    <div className={`w-24 h-2 rounded-full ${tpl.id === 'cyber' ? 'bg-green-400/40' : 'bg-white/20'}`} />
                    <div className={`w-16 h-1.5 rounded-full ${tpl.id === 'cyber' ? 'bg-green-400/20' : 'bg-white/10'}`} />
                  </div>
                  <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold border ${tpl.tagColor}`}>
                    {tpl.tag}
                  </span>
                </div>
                {/* Info */}
                <div className="p-5">
                  <h3 className="text-white font-bold text-lg mb-1">{tpl.name}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{tpl.desc}</p>
                  <button
                    className="mt-4 text-primary text-sm font-medium hover:underline flex items-center gap-1 group-hover:gap-2 transition-all"
                    onClick={(e) => { e.stopPropagation(); scrollToBuilder() }}
                  >
                    Use this template →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
