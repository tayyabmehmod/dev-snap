import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, Phone, MapPin, Github, Linkedin, Globe,
  ExternalLink, Calendar, GraduationCap, Briefcase,
  Award, Sparkles, Download, ArrowRight
} from 'lucide-react'

/* ─── Category mapping for smart grouping ─────────────────────── */
const CATEGORY_MAP = {
  // Mobile
  Kotlin: 'Mobile',
  'Jetpack Compose': 'Mobile',
  Android: 'Mobile',
  Flutter: 'Mobile',
  Swift: 'Mobile',
  SwiftUI: 'Mobile',
  'React Native': 'Mobile',
  // Frontend
  React: 'Frontend',
  'Next.js': 'Frontend',
  Vite: 'Frontend',
  'Tailwind CSS': 'Frontend',
  Tailwind: 'Frontend',
  JavaScript: 'Frontend',
  TypeScript: 'Frontend',
  HTML: 'Frontend',
  CSS: 'Frontend',
  Vue: 'Frontend',
  Angular: 'Frontend',
  // Backend
  Python: 'Backend',
  Flask: 'Backend',
  Django: 'Backend',
  Node: 'Backend',
  'Node.js': 'Backend',
  Express: 'Backend',
  'REST APIs': 'Backend',
  'REST API': 'Backend',
  API: 'Backend',
  PHP: 'Backend',
  Laravel: 'Backend',
  Java: 'Backend',
  'Spring Boot': 'Backend',
  Go: 'Backend',
  Golang: 'Backend',
  Ruby: 'Backend',
  Rails: 'Backend',
  // Database
  MySQL: 'Database',
  PostgreSQL: 'Database',
  MongoDB: 'Database',
  Firebase: 'Database',
  Oracle: 'Database',
  SQLite: 'Database',
  Redis: 'Database',
  // Tools
  Git: 'Tools',
  GitHub: 'Tools',
  Docker: 'Tools',
  Kubernetes: 'Tools',
  'VS Code': 'Tools',
  'Android Studio': 'Tools',
  Webpack: 'Tools',
  Vercel: 'Tools',
  AWS: 'Tools',
  Figma: 'Tools',
}

const categorizeSkills = (skills) => {
  const categories = {
    Mobile: [],
    Frontend: [],
    Backend: [],
    Database: [],
    Tools: [],
    General: []
  }

  skills.forEach(skill => {
    const matchedCategory = CATEGORY_MAP[skill] || Object.keys(CATEGORY_MAP).find(key => skill.toLowerCase().includes(key.toLowerCase()))
    if (matchedCategory) {
      const catName = CATEGORY_MAP[matchedCategory] || matchedCategory
      if (categories[catName]) {
        categories[catName].push(skill)
        return
      }
    }
    categories.General.push(skill)
  })

  return Object.fromEntries(
    Object.entries(categories).filter(([_, list]) => list.length > 0)
  )
}

const getProjectBanner = (projectName, tech) => {
  const hash = (projectName || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const gradients = [
    'linear-gradient(135deg, #1e3a8a, #3b82f6, #06b6d4)',
    'linear-gradient(135deg, #311042, #7c3aed, #ec4899)',
    'linear-gradient(135deg, #064e3b, #10b981, #34d399)',
    'linear-gradient(135deg, #78350f, #f59e0b, #fbbf24)',
    'linear-gradient(135deg, #581c87, #8b5cf6, #c084fc)',
  ]
  const gradient = gradients[hash % gradients.length]
  return (
    <div style={{ background: gradient }} className="w-full h-32 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" />
      <span className="text-white/90 font-bold text-sm tracking-wider font-mono uppercase z-10 px-4 text-center leading-snug">
        {projectName || 'Project'}
      </span>
      <div className="absolute bottom-2 right-3 bg-black/55 text-white/70 text-[9px] px-2 py-0.5 rounded font-mono">
        {tech?.split(',')[0] || 'App'}
      </div>
    </div>
  )
}

const TECH_LOGOS = [
  { name: 'React', bg: 'rgba(97,218,251,0.1)', border: 'rgba(97,218,251,0.2)', text: '#61DAFB' },
  { name: 'Tailwind', bg: 'rgba(56,178,172,0.1)', border: 'rgba(56,178,172,0.2)', text: '#38B2AC' },
  { name: 'Flask', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)', text: '#FFFFFF' },
  { name: 'Python', bg: 'rgba(55,118,171,0.1)', border: 'rgba(55,118,171,0.2)', text: '#3776AB' },
  { name: 'Firebase', bg: 'rgba(255,202,40,0.1)', border: 'rgba(255,202,40,0.2)', text: '#FFCA28' },
  { name: 'MySQL', bg: 'rgba(68,121,161,0.1)', border: 'rgba(68,121,161,0.2)', text: '#4479A1' },
  { name: 'Docker', bg: 'rgba(36,150,237,0.1)', border: 'rgba(36,150,237,0.2)', text: '#2496ED' },
  { name: 'Git', bg: 'rgba(240,80,50,0.1)', border: 'rgba(240,80,50,0.2)', text: '#F05032' }
]

/* ─── Avatar ─────────────────────────────────────────────────────── */
function Avatar({ src, name }) {
  const initials = (name || 'D').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  if (src) {
    return (
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
        <img
          src={src}
          alt={name}
          className="w-24 h-24 rounded-full object-cover border-2 border-white/10 relative z-10"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      </div>
    )
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
      <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white bg-gradient-to-br from-primary/80 to-secondary/80 border-2 border-white/10 relative z-10 font-mono">
        {initials}
      </div>
    </div>
  )
}

export default function PortfolioPreview({ portfolio }) {
  const hasProjects = portfolio.projects?.some(p => p.name)
  const hasExperience = portfolio.experience?.some(e => e.company)
  const hasEducation = portfolio.education?.some(e => e.institution)
  const categorizedSkills = categorizeSkills(portfolio.skills || [])

  // Calculate Years of Experience & Completed Projects for the About Me metrics
  const totalProjects = portfolio.projects?.filter(p => p.name).length || 0
  const yearsExp = portfolio.experience?.length ? `${portfolio.experience.length}+ Years` : '1+ Year'

  return (
    <div className="min-h-full bg-[#09090B] text-white overflow-auto relative selection:bg-primary/30 selection:text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Background Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-80 h-80 rounded-full bg-secondary/10 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-64 h-64 rounded-full bg-accent/5 blur-[80px] pointer-events-none" />

      <div className="p-8 max-w-3xl mx-auto space-y-12 relative z-10">
        
        {/* ─── Hero Section ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-6 pt-6"
        >
          <Avatar src={portfolio.profile_image} name={portfolio.full_name} />
          
          <div className="space-y-3">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for Freelance
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-none font-mono" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {portfolio.full_name || <span className="opacity-30">Your Name</span>}
            </h1>
            
            <p className="text-lg font-medium bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {portfolio.professional_title || <span className="opacity-30">Professional Title</span>}
            </p>
          </div>

          <p className="text-white/60 text-sm sm:text-base max-w-xl leading-relaxed">
            {portfolio.bio || <span className="opacity-30">Your bio will appear here to introduce you to recruiters and clients...</span>}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {portfolio.email && (
              <a href={`mailto:${portfolio.email}`} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 flex items-center justify-center text-white/60 hover:text-primary transition-all duration-300">
                <Mail size={18} />
              </a>
            )}
            {portfolio.github_url && (
              <a href={portfolio.github_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 flex items-center justify-center text-white/60 hover:text-primary transition-all duration-300">
                <Github size={18} />
              </a>
            )}
            {portfolio.linkedin_url && (
              <a href={portfolio.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 flex items-center justify-center text-white/60 hover:text-primary transition-all duration-300">
                <Linkedin size={18} />
              </a>
            )}
            {portfolio.portfolio_url && (
              <a href={portfolio.portfolio_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 flex items-center justify-center text-white/60 hover:text-primary transition-all duration-300">
                <Globe size={18} />
              </a>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <a href="#contact" className="btn-primary text-xs py-2.5 px-5 flex items-center gap-1.5 cursor-pointer">
              Contact Me
              <ArrowRight size={13} />
            </a>
            {portfolio.portfolio_url && (
              <a href={portfolio.portfolio_url} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-2.5 px-5 flex items-center gap-1.5 cursor-pointer">
                <Download size={13} />
                Download Resume
              </a>
            )}
          </div>
        </motion.div>

        {/* ─── About Me Section ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 space-y-4"
        >
          <h2 className="text-lg font-bold tracking-wide flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <Sparkles size={16} className="text-secondary" />
            About Me
          </h2>
          <div className="grid grid-cols-3 gap-4 text-center border-t border-white/5 pt-4">
            <div className="space-y-1">
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-mono">{yearsExp}</p>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Experience</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-mono">{totalProjects}+</p>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Projects Built</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-mono">
                {portfolio.skills?.length || 0}+
              </p>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Technologies</p>
            </div>
          </div>
        </motion.div>

        {/* ─── Skills Section ──────────────────────────────────────── */}
        {portfolio.skills?.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold tracking-wide flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <Award size={16} className="text-primary" />
              Core Competencies
            </h2>
            <div className="space-y-4">
              {Object.entries(categorizedSkills).map(([category, skills]) => (
                <div key={category} className="space-y-2">
                  <p className="text-xs font-semibold tracking-wider text-white/40 uppercase font-mono">{category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                        className="px-3 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-white/80 transition-all font-mono"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Featured Projects Section ───────────────────────────── */}
        {hasProjects && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold tracking-wide flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <Globe size={16} className="text-accent" />
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolio.projects
                .filter(p => p.name)
                .map((project, i) => (
                  <motion.div
                    key={project.id || i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="glass-card overflow-hidden group border border-white/10 hover:border-primary/30 transition-all duration-300"
                  >
                    {getProjectBanner(project.name, project.technology)}
                    <div className="p-4 space-y-3">
                      <h3 className="font-bold text-sm tracking-wide text-white group-hover:text-primary transition-colors font-mono">
                        {project.name}
                      </h3>
                      {project.description && (
                        <p className="text-xs text-white/60 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      )}
                      {project.technology && (
                        <div className="flex flex-wrap gap-1">
                          {project.technology.split(',').map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/5 text-white/50 font-mono">
                              {t.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                        {project.github_link && (
                          <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] text-white/50 hover:text-white transition-colors">
                            <Github size={12} /> Code
                          </a>
                        )}
                        {project.live_demo && (
                          <a href={project.live_demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] text-accent hover:text-blue-300 transition-colors ml-auto">
                            <ExternalLink size={12} /> Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* ─── Experience Timeline Section ─────────────────────────── */}
        {hasExperience && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold tracking-wide flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <Briefcase size={16} className="text-secondary" />
              Professional Journey
            </h2>
            <div className="relative border-l border-white/10 pl-5 ml-2.5 space-y-6">
              {portfolio.experience
                .filter(e => e.company)
                .map((exp, i) => (
                  <motion.div
                    key={exp.id || i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative space-y-1.5"
                  >
                    {/* Bullet dot */}
                    <div className="absolute -left-[26px] top-1.5 w-3 h-3 rounded-full bg-[#09090B] border-2 border-secondary flex items-center justify-center" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-bold text-sm text-white font-mono">{exp.role}</h4>
                      <span className="inline-flex items-center gap-1 text-[10px] text-white/40 font-mono">
                        <Calendar size={10} />
                        {exp.duration}
                      </span>
                    </div>
                    
                    <p className="text-xs text-secondary/80 font-medium">{exp.company}</p>
                    
                    {exp.description && (
                      <p className="text-xs text-white/50 leading-relaxed font-mono">{exp.description}</p>
                    )}
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* ─── Education Section ───────────────────────────────────── */}
        {hasEducation && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold tracking-wide flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <GraduationCap size={16} className="text-primary" />
              Education & Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolio.education
                .filter(e => e.institution)
                .map((edu, i) => (
                  <motion.div
                    key={edu.id || i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-4 space-y-2 border border-white/5"
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-xs sm:text-sm text-white font-mono">{edu.degree}</h4>
                      {edu.year && <span className="text-[10px] text-white/40 font-mono">{edu.year}</span>}
                    </div>
                    <p className="text-xs text-white/50">{edu.institution}</p>
                    {edu.gpa && (
                      <span className="inline-block px-2 py-0.5 rounded text-[9px] bg-primary/10 text-primary border border-primary/20 font-mono">
                        GPA: {edu.gpa}
                      </span>
                    )}
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* ─── Tech Stack Grid Section ─────────────────────────────── */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold tracking-wide flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <Award size={16} className="text-accent" />
            Core Technologies
          </h2>
          <div className="grid grid-cols-4 gap-2.5">
            {TECH_LOGOS.map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{ scale: 1.05, y: -2 }}
                className="p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center"
                style={{ backgroundColor: tech.bg, borderColor: tech.border }}
              >
                <span className="text-xs font-bold font-mono tracking-wide" style={{ color: tech.text }}>
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Contact Call-to-Action Section ──────────────────────── */}
        <motion.div
          id="contact"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-8 text-center space-y-6 bg-gradient-to-br from-white/[0.02] to-white/[0.04] border border-white/10"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight font-mono" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Let's Build Something<br />
            <span className="gradient-text">Amazing Together</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-white/50 max-w-md mx-auto leading-relaxed">
            I am currently open to new contract opportunities, remote positions, and project collaborations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono text-white/60">
            {portfolio.email && <span>✉ {portfolio.email}</span>}
            {portfolio.phone && <span>📞 {portfolio.phone}</span>}
            {portfolio.location && <span>📍 {portfolio.location}</span>}
          </div>

          {portfolio.email && (
            <a href={`mailto:${portfolio.email}`} className="btn-primary text-xs py-2.5 px-6 inline-flex items-center gap-2 cursor-pointer mx-auto">
              Get in Touch
              <ArrowRight size={13} />
            </a>
          )}
        </motion.div>

        {/* ─── Footer Section ──────────────────────────────────────── */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30 font-mono">
          <span>© {new Date().getFullYear()} {portfolio.full_name || 'DevSnap'}. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <span>Powered by DevSnap</span>
          </div>
        </div>

      </div>
    </div>
  )
}
