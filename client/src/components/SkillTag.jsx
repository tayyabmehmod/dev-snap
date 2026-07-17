import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function SkillTag({ skill, onRemove, animate = true }) {
  const Wrapper = animate ? motion.div : 'div'
  const props = animate
    ? {
        initial: { opacity: 0, scale: 0.7 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.7 },
        whileHover: { scale: 1.05 },
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }
    : {}

  return (
    <Wrapper {...props} className="skill-badge group">
      <span>{skill}</span>
      {onRemove && (
        <button
          onClick={() => onRemove(skill)}
          className="ml-1 opacity-50 group-hover:opacity-100 transition-opacity hover:text-red-400"
          aria-label={`Remove ${skill}`}
        >
          <X size={12} />
        </button>
      )}
    </Wrapper>
  )
}
