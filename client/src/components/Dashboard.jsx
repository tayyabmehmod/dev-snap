import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Search, Trash2, Eye, RefreshCw,
  Users, Calendar, TrendingUp, Layers, ChevronLeft, ChevronRight, X
} from 'lucide-react'
import { useApi } from '../hooks/useApi'

function StatCard({ icon: Icon, label, value, gradient, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card-strong p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: gradient }}>
          <Icon size={18} className="text-white" />
        </div>
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value ?? '—'}</p>
      <p className="text-white/40 text-sm">{label}</p>
    </motion.div>
  )
}

function PortfolioModal({ portfolio, onClose }) {
  if (!portfolio) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card-strong p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-white font-bold text-lg">{portfolio.full_name}</h3>
            <p className="text-white/40 text-sm">{portfolio.professional_title}</p>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {portfolio.bio && <p className="text-white/50 text-sm mb-4 leading-relaxed">{portfolio.bio}</p>}

        <div className="space-y-3 text-sm">
          {portfolio.location && <p className="text-white/40">📍 {portfolio.location}</p>}
          {portfolio.email && <p className="text-white/40">✉ {portfolio.email}</p>}
          {portfolio.skills?.length > 0 && (
            <div>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {portfolio.skills.map(s => (
                  <span key={s} className="px-2 py-0.5 rounded-full text-xs bg-primary/15 text-primary border border-primary/20">{s}</span>
                ))}
              </div>
            </div>
          )}
          {portfolio.projects?.filter(p => p.name).length > 0 && (
            <div>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Projects ({portfolio.projects.filter(p => p.name).length})</p>
              {portfolio.projects.filter(p => p.name).map((p, i) => (
                <p key={i} className="text-white/50 text-xs">• {p.name}</p>
              ))}
            </div>
          )}
          <p className="text-white/20 text-xs">
            Created: {portfolio.created_at ? new Date(portfolio.created_at).toLocaleDateString() : '—'}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Dashboard() {
  const { listPortfolios, deletePortfolio, getStats, loading } = useApi()
  const [portfolios, setPortfolios] = useState([])
  const [stats, setStats] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [selected, setSelected] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      const [portfolioRes, statsRes] = await Promise.all([
        listPortfolios({ page, per_page: 8, search }),
        getStats(),
      ])
      if (portfolioRes.success) {
        setPortfolios(portfolioRes.data.portfolios)
        setTotalPages(portfolioRes.data.pages)
        setTotal(portfolioRes.data.total)
      }
      if (statsRes.success) {
        setStats(statsRes.data)
      }
    } catch (e) {
      console.error(e)
    }
  }, [page, search, listPortfolios, getStats])

  useEffect(() => { fetchData() }, [fetchData])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this portfolio? This cannot be undone.')) return
    setDeletingId(id)
    try {
      await deletePortfolio(id)
      await fetchData()
    } catch (e) {
      console.error(e)
    } finally {
      setDeletingId(null)
    }
  }

  const templateColors = {
    glass: 'bg-purple-500/15 text-purple-300 border-purple-500/20',
    minimal: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
    cyber: 'bg-green-500/15 text-green-300 border-green-500/20',
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <LayoutDashboard size={18} className="text-white" />
              </div>
              <h1 className="text-white text-2xl font-bold">Dashboard</h1>
            </div>
            <p className="text-white/30 text-sm">Manage and view all saved portfolios</p>
          </div>
          <button
            onClick={fetchData}
            className="btn-secondary text-sm py-2 px-4 flex items-center gap-2"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard
            icon={Users}
            label="Total Portfolios"
            value={stats?.total_portfolios}
            gradient="linear-gradient(135deg, #3B82F6, #8B5CF6)"
            delay={0}
          />
          <StatCard
            icon={Calendar}
            label="Created Today"
            value={stats?.created_today}
            gradient="linear-gradient(135deg, #22D3EE, #3B82F6)"
            delay={0.05}
          />
          <StatCard
            icon={Layers}
            label="Glass Template"
            value={stats?.templates?.glass || 0}
            gradient="linear-gradient(135deg, #8B5CF6, #EC4899)"
            delay={0.1}
          />
          <StatCard
            icon={TrendingUp}
            label="Minimal Template"
            value={stats?.templates?.minimal || 0}
            gradient="linear-gradient(135deg, #22D3EE, #10B981)"
            delay={0.15}
          />
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
            <input
              id="dashboard-search"
              type="text"
              placeholder="Search portfolios..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="input-field pl-10"
            />
          </div>
          <p className="text-white/30 text-sm">{total} portfolio{total !== 1 ? 's' : ''}</p>
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden mb-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : portfolios.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <LayoutDashboard size={28} className="text-white/20" />
              </div>
              <p className="text-white/30 font-medium">No portfolios found</p>
              <p className="text-white/15 text-sm mt-1">
                {search ? 'Try a different search term' : 'Create your first portfolio on the home page'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-5 py-3.5 text-white/30 text-xs font-semibold uppercase tracking-wide">Developer</th>
                    <th className="text-left px-5 py-3.5 text-white/30 text-xs font-semibold uppercase tracking-wide hidden sm:table-cell">Template</th>
                    <th className="text-left px-5 py-3.5 text-white/30 text-xs font-semibold uppercase tracking-wide hidden md:table-cell">Skills</th>
                    <th className="text-left px-5 py-3.5 text-white/30 text-xs font-semibold uppercase tracking-wide hidden lg:table-cell">Created</th>
                    <th className="px-5 py-3.5" />
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {portfolios.map((p, i) => (
                      <motion.tr
                        key={p.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-white/3 hover:bg-white/2 transition-colors group"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                              {p.full_name?.charAt(0).toUpperCase() || '?'}
                            </div>
                            <div>
                              <p className="text-white font-medium text-sm">{p.full_name}</p>
                              <p className="text-white/35 text-xs">{p.professional_title || 'No title'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden sm:table-cell">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${templateColors[p.template] || templateColors.glass}`}>
                            {p.template || 'glass'}
                          </span>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {(p.skills || []).slice(0, 3).map(s => (
                              <span key={s} className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-white/40">{s}</span>
                            ))}
                            {(p.skills || []).length > 3 && (
                              <span className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-white/30">+{p.skills.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <p className="text-white/30 text-xs">
                            {p.created_at ? new Date(p.created_at).toLocaleDateString() : '—'}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              onClick={() => setSelected(p)}
                              className="p-1.5 rounded-lg text-white/25 hover:text-white hover:bg-white/5 transition-all"
                              title="View"
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              disabled={deletingId === p.id}
                              className="p-1.5 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-400/5 transition-all disabled:opacity-40"
                              title="Delete"
                            >
                              {deletingId === p.id ? (
                                <div className="w-3.5 h-3.5 border border-red-400 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Trash2 size={15} />
                              )}
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn-secondary p-2 disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                  page === p ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="btn-secondary p-2 disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <PortfolioModal portfolio={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  )
}
