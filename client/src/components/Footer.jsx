import { Zap, Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="about" className="border-t border-white/5 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Brand only */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <span className="text-white font-bold text-xl">
                Dev<span className="gradient-text">Snap</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Build beautiful developer portfolios in seconds. Modern design,
              live preview, and instant export.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex items-center justify-center">
          <p className="text-white/25 text-sm">
            © 2024 DevSnap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
