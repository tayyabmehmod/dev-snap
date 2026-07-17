import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, Phone, MapPin, Github, Linkedin, Globe,
  Twitter, ExternalLink, Calendar, GraduationCap
} from 'lucide-react'
import ProjectCard from './ProjectCard'

/* ─── Template Wrappers ─────────────────────────────────────────── */
const templateConfig = {
  glass: {
    wrapper: 'min-h-full text-white',
    bg: { background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' },
    name: 'text-white text-3xl font-black',
    title: 'text-purple-300 font-medium',
    bio: 'text-white/50',
    sectionTitle: 'text-white/70 text-xs uppercase tracking-widest font-semibold mb-3',
    contactItem: 'text-white/50 hover:text-white',
    expBorder: 'border-purple-500/40',
    expDot: 'bg-purple-400',
    expTitle: 'text-white font-semibold',
    expSub: 'text-purple-300/70',
    expDesc: 'text-white/40',
    eduCard: 'bg-white/5 border border-white/10 rounded-xl p-4',
    eduTitle: 'text-white font-semibold',
    eduSub: 'text-white/40',
    skillBadge: 'bg-white/10 text-white/70 border border-white/15',
    divider: 'border-white/10',
  },
  minimal: {
    wrapper: 'min-h-full text-gray-900 bg-white',
    bg: { background: '#f8fafc' },
    name: 'text-gray-900 text-3xl font-black',
    title: 'text-blue-600 font-medium',
    bio: 'text-gray-500',
    sectionTitle: 'text-gray-400 text-xs uppercase tracking-widest font-semibold mb-3',
    contactItem: 'text-gray-400 hover:text-gray-600',
    expBorder: 'border-blue-200',
    expDot: 'bg-blue-500',
    expTitle: 'text-gray-900 font-semibold',
    expSub: 'text-blue-500',
    expDesc: 'text-gray-500',
    eduCard: 'bg-gray-50 border border-gray-200 rounded-xl p-4',
    eduTitle: 'text-gray-900 font-semibold',
    eduSub: 'text-gray-400',
    skillBadge: 'bg-gray-100 text-gray-600 border border-gray-200',
    divider: 'border-gray-100',
  },
  cyber: {
    wrapper: 'min-h-full font-mono',
    bg: { background: '#0a0a0a', color: '#00ff41' },
    name: 'text-green-400 text-3xl font-black tracking-wider',
    title: 'text-green-300/70',
    bio: 'text-green-400/50',
    sectionTitle: 'text-green-400/60 text-xs uppercase tracking-widest font-semibold mb-3',
    contactItem: 'text-green-400/50 hover:text-green-400',
    expBorder: 'border-green-500/40',
    expDot: 'bg-green-400',
    expTitle: 'text-green-400 font-semibold',
    expSub: 'text-green-300/60',
    expDesc: 'text-green-400/40',
    eduCard: 'bg-green-400/5 border border-green-500/30 rounded-none p-4',
    eduTitle: 'text-green-400 font-semibold',
    eduSub: 'text-green-400/50',
    skillBadge: 'bg-green-400/10 text-green-400 border border-green-500/40',
    divider: 'border-green-500/20',
  },
}

/* ─── Avatar ─────────────────────────────────────────────────────── */
function Avatar({ src, name, template }) {
  const initials = (name || 'D').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  const ringStyles = {
    glass: 'ring-4 ring-purple-500/30',
    minimal: 'ring-4 ring-blue-500/20',
    cyber: 'ring-2 ring-green-500',
  }

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`w-20 h-20 rounded-full object-cover ${ringStyles[template]}`}
        onError={(e) => { e.target.style.display = 'none' }}
      />
    )
  }

  const bgStyles = {
    glass: 'bg-gradient-to-br from-primary to-secondary',
    minimal: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    cyber: 'bg-black border-2 border-green-500',
  }

  return (
    <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white ${bgStyles[template]} ${ringStyles[template]}`}>
      {template === 'cyber' ? <span className="text-green-400">{initials}</span> : initials}
    </div>
  )
}

export default function PortfolioPreview({ portfolio }) {
  const t = portfolio.template || 'glass'
  const cfg = templateConfig[t] || templateConfig.glass

  const hasProjects = portfolio.projects?.some(p => p.name)
  const hasExperience = portfolio.experience?.some(e => e.company)
  const hasEducation = portfolio.education?.some(e => e.institution)

  return (
    <div className={`${cfg.wrapper} overflow-auto`} style={cfg.bg}>
      <div className="p-8 max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          layout
          className="flex items-start gap-5 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Avatar src={portfolio.profile_image} name={portfolio.full_name} template={t} />
          <div className="flex-1 min-w-0">
            <motion.h1 layout className={`${cfg.name} leading-tight mb-1`}>
              {portfolio.full_name || (
                <span className="opacity-30">Your Name</span>
              )}
            </motion.h1>
            <p className={`${cfg.title} text-sm mb-2`}>
              {portfolio.professional_title || <span className="opacity-30">Professional Title</span>}
            </p>
            <p className={`${cfg.bio} text-sm leading-relaxed line-clamp-3`}>
              {portfolio.bio || <span className="opacity-30">Your bio will appear here...</span>}
            </p>
          </div>
        </motion.div>

        {/* Contact */}
        {(portfolio.email || portfolio.phone || portfolio.location || portfolio.github_url || portfolio.linkedin_url) && (
          <>
            <div className={`border-t ${cfg.divider} mb-6`} />
            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
              {portfolio.email && (
                <a href={`mailto:${portfolio.email}`} className={`flex items-center gap-1.5 text-xs ${cfg.contactItem} transition-colors`}>
                  <Mail size={12} /> {portfolio.email}
                </a>
              )}
              {portfolio.phone && (
                <span className={`flex items-center gap-1.5 text-xs ${cfg.contactItem}`}>
                  <Phone size={12} /> {portfolio.phone}
                </span>
              )}
              {portfolio.location && (
                <span className={`flex items-center gap-1.5 text-xs ${cfg.contactItem}`}>
                  <MapPin size={12} /> {portfolio.location}
                </span>
              )}
              {portfolio.github_url && (
                <a href={portfolio.github_url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1.5 text-xs ${cfg.contactItem} transition-colors`}>
                  <Github size={12} /> GitHub
                </a>
              )}
              {portfolio.linkedin_url && (
                <a href={portfolio.linkedin_url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1.5 text-xs ${cfg.contactItem} transition-colors`}>
                  <Linkedin size={12} /> LinkedIn
                </a>
              )}
              {portfolio.portfolio_url && (
                <a href={portfolio.portfolio_url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1.5 text-xs ${cfg.contactItem} transition-colors`}>
                  <Globe size={12} /> Portfolio
                </a>
              )}
            </div>
          </>
        )}

        {/* Skills */}
        {portfolio.skills?.length > 0 && (
          <div className="mb-6">
            <p className={cfg.sectionTitle}>Skills</p>
            <AnimatePresence>
              <div className="flex flex-wrap gap-2">
                {portfolio.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${cfg.skillBadge}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </AnimatePresence>
          </div>
        )}

        {/* Projects */}
        {hasProjects && (
          <div className="mb-6">
            <p className={cfg.sectionTitle}>Projects</p>
            <div className="grid gap-3">
              {portfolio.projects
                .filter(p => p.name)
                .map((project, i) => (
                  <ProjectCard key={project.id || i} project={project} template={t} index={i} />
                ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {hasExperience && (
          <div className="mb-6">
            <p className={cfg.sectionTitle}>Experience</p>
            <div className={`border-l-2 ${cfg.expBorder} pl-5 space-y-5`}>
              {portfolio.experience
                .filter(e => e.company)
                .map((exp, i) => (
                  <motion.div
                    key={exp.id || i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative"
                  >
                    <div className={`absolute -left-[25px] top-1.5 w-2.5 h-2.5 rounded-full ${cfg.expDot}`} />
                    <h4 className={`${cfg.expTitle} text-sm`}>{exp.role}</h4>
                    <p className={`${cfg.expSub} text-xs mt-0.5`}>
                      {exp.company}{exp.duration ? ` · ${exp.duration}` : ''}
                    </p>
                    {exp.description && (
                      <p className={`${cfg.expDesc} text-xs mt-1.5 leading-relaxed`}>{exp.description}</p>
                    )}
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* Education */}
        {hasEducation && (
          <div className="mb-6">
            <p className={cfg.sectionTitle}>Education</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {portfolio.education
                .filter(e => e.institution)
                .map((edu, i) => (
                  <motion.div
                    key={edu.id || i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={cfg.eduCard}
                  >
                    <div className="flex items-start gap-2">
                      <GraduationCap size={14} className={t === 'cyber' ? 'text-green-400 mt-0.5' : t === 'minimal' ? 'text-blue-500 mt-0.5' : 'text-purple-400 mt-0.5'} />
                      <div>
                        <p className={`${cfg.eduTitle} text-sm`}>{edu.degree}</p>
                        <p className={`${cfg.eduSub} text-xs mt-0.5`}>{edu.institution}</p>
                        {(edu.year || edu.gpa) && (
                          <p className={`${cfg.eduSub} text-xs mt-1 opacity-70`}>
                            {edu.year}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* Placeholder when empty */}
        {!portfolio.full_name && !hasProjects && !hasExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center opacity-20"
              style={{ background: 'rgba(255,255,255,0.1)' }}>
              <Globe size={28} />
            </div>
            <p className="text-sm opacity-30 font-medium">Start filling the form to see your portfolio here</p>
            <p className="text-xs opacity-20 mt-1">Updates happen in real time</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
