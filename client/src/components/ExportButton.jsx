import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, FileJson, FileCode, ChevronDown } from 'lucide-react'

function generateHTML(portfolio, template) {
  const skills = portfolio.skills || []
  const projects = portfolio.projects || []
  const experience = portfolio.experience || []
  const education = portfolio.education || []

  const templateStyles = {
    glass: {
      bg: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
      color: '#ffffff',
      cardBg: 'rgba(255,255,255,0.08)',
      cardBorder: '1px solid rgba(255,255,255,0.15)',
      accent: '#3B82F6',
    },
    minimal: {
      bg: '#ffffff',
      color: '#111111',
      cardBg: '#f9f9f9',
      cardBorder: '1px solid #e5e7eb',
      accent: '#3B82F6',
    },
    cyber: {
      bg: '#0a0a0a',
      color: '#00ff41',
      cardBg: 'rgba(0,255,65,0.05)',
      cardBorder: '1px solid rgba(0,255,65,0.3)',
      accent: '#00ff41',
    },
  }

  const s = templateStyles[template] || templateStyles.glass

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${portfolio.full_name || 'Developer'} — Portfolio</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: ${s.bg}; color: ${s.color}; min-height: 100vh; }
    .container { max-width: 900px; margin: 0 auto; padding: 60px 20px; }
    .header { display: flex; align-items: center; gap: 30px; margin-bottom: 60px; }
    .avatar { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid ${s.accent}; }
    .avatar-placeholder { width: 100px; height: 100px; border-radius: 50%; background: ${s.accent}; display: flex; align-items: center; justify-content: center; font-size: 36px; font-weight: bold; color: #fff; }
    .name { font-size: 2.5rem; font-weight: 800; margin-bottom: 4px; }
    .title { font-size: 1.1rem; opacity: 0.6; margin-bottom: 8px; }
    .bio { font-size: 0.95rem; opacity: 0.5; line-height: 1.6; max-width: 500px; }
    .section { margin-bottom: 50px; }
    .section-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 20px; color: ${s.accent}; text-transform: uppercase; letter-spacing: 0.05em; }
    .skills { display: flex; flex-wrap: wrap; gap: 10px; }
    .skill { padding: 6px 14px; border-radius: 999px; background: ${s.cardBg}; border: ${s.cardBorder}; font-size: 0.85rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
    .card { background: ${s.cardBg}; border: ${s.cardBorder}; border-radius: 12px; padding: 20px; }
    .card h3 { font-size: 1rem; font-weight: 600; margin-bottom: 8px; }
    .card p { font-size: 0.85rem; opacity: 0.6; line-height: 1.5; }
    .contact { display: flex; flex-wrap: wrap; gap: 20px; }
    .contact a { color: ${s.accent}; text-decoration: none; font-size: 0.9rem; }
    .timeline { border-left: 2px solid ${s.accent}; padding-left: 20px; space-y: 20px; }
    .timeline-item { margin-bottom: 24px; position: relative; }
    .timeline-item::before { content: ''; position: absolute; left: -25px; top: 6px; width: 8px; height: 8px; border-radius: 50%; background: ${s.accent}; }
    .timeline-item h3 { font-size: 1rem; font-weight: 600; }
    .timeline-item .sub { font-size: 0.85rem; opacity: 0.5; margin-bottom: 4px; }
    .timeline-item p { font-size: 0.85rem; opacity: 0.6; }
    .tech-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
    .tech-tag { padding: 3px 10px; border-radius: 999px; font-size: 0.75rem; background: ${s.cardBg}; border: ${s.cardBorder}; }
    footer { text-align: center; opacity: 0.3; font-size: 0.8rem; margin-top: 80px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); }
  </style>
</head>
<body>
<div class="container">
  <header class="header">
    ${portfolio.profile_image
      ? `<img src="${portfolio.profile_image}" alt="${portfolio.full_name}" class="avatar" />`
      : `<div class="avatar-placeholder">${(portfolio.full_name || 'D').charAt(0).toUpperCase()}</div>`
    }
    <div>
      <h1 class="name">${portfolio.full_name || 'Developer'}</h1>
      <p class="title">${portfolio.professional_title || ''}</p>
      <p class="bio">${portfolio.bio || ''}</p>
    </div>
  </header>

  ${skills.length > 0 ? `
  <section class="section">
    <h2 class="section-title">Skills</h2>
    <div class="skills">
      ${skills.map(s => `<span class="skill">${s}</span>`).join('')}
    </div>
  </section>` : ''}

  ${projects.filter(p => p.name).length > 0 ? `
  <section class="section">
    <h2 class="section-title">Projects</h2>
    <div class="grid">
      ${projects.filter(p => p.name).map(p => `
      <div class="card">
        <h3>${p.name}</h3>
        <p>${p.description || ''}</p>
        ${p.technology ? `<div class="tech-tags">${p.technology.split(',').map(t => `<span class="tech-tag">${t.trim()}</span>`).join('')}</div>` : ''}
        <div style="margin-top:12px; display:flex; gap:12px;">
          ${p.github_link ? `<a href="${p.github_link}" style="color:${s.accent};font-size:0.8rem;">GitHub →</a>` : ''}
          ${p.live_demo ? `<a href="${p.live_demo}" style="color:${s.accent};font-size:0.8rem;">Live Demo →</a>` : ''}
        </div>
      </div>`).join('')}
    </div>
  </section>` : ''}

  ${experience.filter(e => e.company).length > 0 ? `
  <section class="section">
    <h2 class="section-title">Experience</h2>
    <div class="timeline">
      ${experience.filter(e => e.company).map(e => `
      <div class="timeline-item">
        <h3>${e.role || ''}</h3>
        <p class="sub">${e.company} ${e.duration ? `· ${e.duration}` : ''}</p>
        <p>${e.description || ''}</p>
      </div>`).join('')}
    </div>
  </section>` : ''}

  ${education.filter(e => e.institution).length > 0 ? `
  <section class="section">
    <h2 class="section-title">Education</h2>
    <div class="grid">
      ${education.filter(e => e.institution).map(e => `
      <div class="card">
        <h3>${e.degree || ''}</h3>
        <p>${e.institution}</p>
        ${e.year ? `<p style="opacity:0.4;margin-top:4px;font-size:0.8rem;">${e.year}${e.gpa ? ` · GPA: ${e.gpa}` : ''}</p>` : ''}
      </div>`).join('')}
    </div>
  </section>` : ''}

  <section class="section">
    <h2 class="section-title">Contact</h2>
    <div class="contact">
      ${portfolio.email ? `<a href="mailto:${portfolio.email}">✉ ${portfolio.email}</a>` : ''}
      ${portfolio.phone ? `<span>📞 ${portfolio.phone}</span>` : ''}
      ${portfolio.location ? `<span>📍 ${portfolio.location}</span>` : ''}
      ${portfolio.github_url ? `<a href="${portfolio.github_url}" target="_blank">GitHub</a>` : ''}
      ${portfolio.linkedin_url ? `<a href="${portfolio.linkedin_url}" target="_blank">LinkedIn</a>` : ''}
      ${portfolio.portfolio_url ? `<a href="${portfolio.portfolio_url}" target="_blank">Portfolio</a>` : ''}
    </div>
  </section>

  <footer>Generated with DevSnap • ${new Date().getFullYear()}</footer>
</div>
</body>
</html>`
}

export default function ExportButton({ portfolio }) {
  const [open, setOpen] = useState(false)

  const exportHTML = () => {
    const html = generateHTML(portfolio, portfolio.template || 'glass')
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(portfolio.full_name || 'portfolio').replace(/\s+/g, '-').toLowerCase()}-portfolio.html`
    a.click()
    URL.revokeObjectURL(url)
    setOpen(false)
  }

  const exportJSON = () => {
    const json = JSON.stringify(portfolio, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(portfolio.full_name || 'portfolio').replace(/\s+/g, '-').toLowerCase()}-portfolio.json`
    a.click()
    URL.revokeObjectURL(url)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        id="export-portfolio-btn"
        onClick={() => setOpen(!open)}
        className="btn-secondary text-sm py-2.5 px-4 flex items-center gap-2"
      >
        <Download size={15} />
        Export
        <ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 glass-card-strong py-2 z-50"
          >
            <button
              id="export-html-btn"
              onClick={exportHTML}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
            >
              <FileCode size={15} className="text-accent" />
              Export as HTML
            </button>
            <button
              id="export-json-btn"
              onClick={exportJSON}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
            >
              <FileJson size={15} className="text-primary" />
              Export as JSON
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
