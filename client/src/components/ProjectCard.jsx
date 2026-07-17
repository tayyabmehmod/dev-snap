import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

export default function ProjectCard({ project, template = 'glass', index = 0 }) {
  const techList = project.technology
    ? project.technology.split(',').map((t) => t.trim()).filter(Boolean)
    : []

  const cardStyles = {
    glass: 'glass-card p-5 hover:border-blue-500/30 transition-all duration-300',
    minimal: 'bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all',
    cyber:
      'bg-black/80 border border-green-500/50 rounded-none p-5 hover:border-green-400 transition-all font-mono',
  }

  const techBadgeStyles = {
    glass: 'px-2.5 py-1 rounded-full text-xs bg-white/10 text-white/70 border border-white/10',
    minimal: 'px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-600 border border-gray-200',
    cyber: 'px-2.5 py-1 text-xs border border-green-500/50 text-green-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cardStyles[template] || cardStyles.glass}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h4
          className={`font-semibold text-base leading-tight ${
            template === 'minimal' ? 'text-gray-900' : template === 'cyber' ? 'text-green-400' : 'text-white'
          }`}
        >
          {project.name || 'Untitled Project'}
        </h4>
        <div className="flex items-center gap-2 flex-shrink-0">
          {project.github_link && (
            <a
              href={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:scale-110 transition-transform ${
                template === 'minimal' ? 'text-gray-500 hover:text-gray-800' : 'text-white/50 hover:text-white'
              }`}
            >
              <Github size={16} />
            </a>
          )}
          {project.live_demo && (
            <a
              href={project.live_demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:scale-110 transition-transform ${
                template === 'minimal' ? 'text-blue-500 hover:text-blue-700' : 'text-accent hover:text-blue-300'
              }`}
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {project.description && (
        <p
          className={`text-sm mb-3 leading-relaxed ${
            template === 'minimal' ? 'text-gray-600' : template === 'cyber' ? 'text-green-300/70' : 'text-white/60'
          }`}
        >
          {project.description}
        </p>
      )}

      {techList.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {techList.map((tech) => (
            <span key={tech} className={techBadgeStyles[template] || techBadgeStyles.glass}>
              {tech}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}
