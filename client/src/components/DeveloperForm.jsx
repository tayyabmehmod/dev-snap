import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Briefcase, FileText, Image, Github, Linkedin, Globe, Mail,
  Phone, MapPin, Plus, Trash2, ChevronDown, ChevronUp, Code, BookOpen, Award
} from 'lucide-react'
import SkillTag from './SkillTag'
import TemplateSelector from './TemplateSelector'

const INPUT_CLASS = 'input-field'
const LABEL_CLASS = 'block text-white/50 text-xs mb-1.5 font-medium'

function FormInput({ label, icon: Icon, id, ...props }) {
  return (
    <div>
      {label && <label htmlFor={id} className={LABEL_CLASS}>{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none">
            <Icon size={15} />
          </div>
        )}
        <input
          id={id}
          className={`${INPUT_CLASS} ${Icon ? 'pl-10' : ''}`}
          {...props}
        />
      </div>
    </div>
  )
}

function FormTextarea({ label, id, ...props }) {
  return (
    <div>
      {label && <label htmlFor={id} className={LABEL_CLASS}>{label}</label>}
      <textarea
        id={id}
        className={`${INPUT_CLASS} resize-none`}
        rows={3}
        {...props}
      />
    </div>
  )
}

function Section({ title, icon: Icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="glass-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/3 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
            <Icon size={14} className="text-primary" />
          </div>
          <span className="text-white font-semibold text-sm">{title}</span>
        </div>
        {open ? <ChevronUp size={16} className="text-white/30" /> : <ChevronDown size={16} className="text-white/30" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function DeveloperForm({
  portfolio,
  updateField,
  updateProject, addProject, removeProject,
  updateExperience, addExperience, removeExperience,
  updateEducation, addEducation, removeEducation,
  addSkill, removeSkill,
  updateSocialLinks,
}) {
  const [skillInput, setSkillInput] = useState('')
  const skillInputRef = useRef(null)

  const handleSkillKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      if (skillInput.trim()) {
        addSkill(skillInput)
        setSkillInput('')
      }
    }
  }

  return (
    <div className="space-y-4">
      {/* Personal Info */}
      <Section title="Personal Information" icon={User}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormInput
            label="Full Name *"
            icon={User}
            id="field-full-name"
            placeholder="John Doe"
            value={portfolio.full_name}
            onChange={(e) => updateField('full_name', e.target.value)}
          />
          <FormInput
            label="Professional Title"
            icon={Briefcase}
            id="field-title"
            placeholder="Full Stack Developer"
            value={portfolio.professional_title}
            onChange={(e) => updateField('professional_title', e.target.value)}
          />
        </div>
        <FormTextarea
          label="Short Bio"
          id="field-bio"
          placeholder="Write a brief professional bio..."
          value={portfolio.bio}
          onChange={(e) => updateField('bio', e.target.value)}
        />
        <FormInput
          label="Profile Image URL"
          icon={Image}
          id="field-image"
          placeholder="https://example.com/your-photo.jpg"
          value={portfolio.profile_image}
          onChange={(e) => updateField('profile_image', e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormInput
            label="Location"
            icon={MapPin}
            id="field-location"
            placeholder="San Francisco, CA"
            value={portfolio.location}
            onChange={(e) => updateField('location', e.target.value)}
          />
          <FormInput
            label="Phone"
            icon={Phone}
            id="field-phone"
            placeholder="+1 (555) 000-0000"
            value={portfolio.phone}
            onChange={(e) => updateField('phone', e.target.value)}
          />
        </div>
        <FormInput
          label="Email"
          icon={Mail}
          id="field-email"
          type="email"
          placeholder="john@example.com"
          value={portfolio.email}
          onChange={(e) => updateField('email', e.target.value)}
        />
      </Section>

      {/* Links */}
      <Section title="Links & Social" icon={Globe} defaultOpen={false}>
        <FormInput
          label="GitHub URL"
          icon={Github}
          id="field-github"
          placeholder="https://github.com/username"
          value={portfolio.github_url}
          onChange={(e) => updateField('github_url', e.target.value)}
        />
        <FormInput
          label="LinkedIn URL"
          icon={Linkedin}
          id="field-linkedin"
          placeholder="https://linkedin.com/in/username"
          value={portfolio.linkedin_url}
          onChange={(e) => updateField('linkedin_url', e.target.value)}
        />
        <FormInput
          label="Portfolio/Website URL"
          icon={Globe}
          id="field-portfolio-url"
          placeholder="https://yourwebsite.com"
          value={portfolio.portfolio_url}
          onChange={(e) => updateField('portfolio_url', e.target.value)}
        />
        <div className="grid grid-cols-2 gap-3">
          <FormInput
            label="Twitter"
            id="field-twitter"
            placeholder="@username"
            value={portfolio.social_links?.twitter || ''}
            onChange={(e) => updateSocialLinks('twitter', e.target.value)}
          />
          <FormInput
            label="Dev.to"
            id="field-devto"
            placeholder="username"
            value={portfolio.social_links?.dev_to || ''}
            onChange={(e) => updateSocialLinks('dev_to', e.target.value)}
          />
        </div>
      </Section>

      {/* Skills */}
      <Section title="Skills" icon={Code} defaultOpen={false}>
        <div>
          <label className={LABEL_CLASS}>Add Skills (press Enter or comma)</label>
          <input
            ref={skillInputRef}
            id="field-skill-input"
            className={INPUT_CLASS}
            placeholder="e.g. React, Python, Docker..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKey}
          />
        </div>
        {portfolio.skills.length > 0 && (
          <AnimatePresence>
            <div className="flex flex-wrap gap-2 mt-2">
              {portfolio.skills.map((skill) => (
                <SkillTag key={skill} skill={skill} onRemove={removeSkill} />
              ))}
            </div>
          </AnimatePresence>
        )}
      </Section>

      {/* Projects */}
      <Section title="Projects" icon={Code} defaultOpen={false}>
        <div className="space-y-4">
          {portfolio.projects.map((project, idx) => (
            <motion.div
              key={project.id || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl space-y-3"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-xs font-semibold">Project {idx + 1}</span>
                {portfolio.projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProject(idx)}
                    className="text-red-400/50 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  placeholder="Project Name"
                  id={`project-name-${idx}`}
                  value={project.name}
                  onChange={(e) => updateProject(idx, 'name', e.target.value)}
                />
                <FormInput
                  placeholder="Technologies (React, Node...)"
                  id={`project-tech-${idx}`}
                  value={project.technology}
                  onChange={(e) => updateProject(idx, 'technology', e.target.value)}
                />
              </div>
              <FormTextarea
                placeholder="Project description..."
                id={`project-desc-${idx}`}
                value={project.description}
                onChange={(e) => updateProject(idx, 'description', e.target.value)}
              />
              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  icon={Github}
                  placeholder="GitHub URL"
                  id={`project-github-${idx}`}
                  value={project.github_link}
                  onChange={(e) => updateProject(idx, 'github_link', e.target.value)}
                />
                <FormInput
                  icon={Globe}
                  placeholder="Live Demo URL"
                  id={`project-demo-${idx}`}
                  value={project.live_demo}
                  onChange={(e) => updateProject(idx, 'live_demo', e.target.value)}
                />
              </div>
            </motion.div>
          ))}
          <button
            type="button"
            onClick={addProject}
            className="w-full py-3 rounded-xl text-sm text-white/40 hover:text-white/60 transition-colors flex items-center justify-center gap-2"
            style={{ border: '1px dashed rgba(255,255,255,0.1)' }}
          >
            <Plus size={14} />
            Add Project
          </button>
        </div>
      </Section>

      {/* Experience */}
      <Section title="Experience" icon={Briefcase} defaultOpen={false}>
        <div className="space-y-4">
          {portfolio.experience.map((exp, idx) => (
            <motion.div
              key={exp.id || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl space-y-3"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-xs font-semibold">Experience {idx + 1}</span>
                {portfolio.experience.length > 1 && (
                  <button type="button" onClick={() => removeExperience(idx)} className="text-red-400/50 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  placeholder="Company Name"
                  id={`exp-company-${idx}`}
                  value={exp.company}
                  onChange={(e) => updateExperience(idx, 'company', e.target.value)}
                />
                <FormInput
                  placeholder="Your Role"
                  id={`exp-role-${idx}`}
                  value={exp.role}
                  onChange={(e) => updateExperience(idx, 'role', e.target.value)}
                />
              </div>
              <FormInput
                placeholder="Duration (e.g. Jan 2022 – Present)"
                id={`exp-duration-${idx}`}
                value={exp.duration}
                onChange={(e) => updateExperience(idx, 'duration', e.target.value)}
              />
              <FormTextarea
                placeholder="What you worked on..."
                id={`exp-desc-${idx}`}
                value={exp.description}
                onChange={(e) => updateExperience(idx, 'description', e.target.value)}
              />
            </motion.div>
          ))}
          <button
            type="button"
            onClick={addExperience}
            className="w-full py-3 rounded-xl text-sm text-white/40 hover:text-white/60 transition-colors flex items-center justify-center gap-2"
            style={{ border: '1px dashed rgba(255,255,255,0.1)' }}
          >
            <Plus size={14} />
            Add Experience
          </button>
        </div>
      </Section>

      {/* Education */}
      <Section title="Education" icon={BookOpen} defaultOpen={false}>
        <div className="space-y-4">
          {portfolio.education.map((edu, idx) => (
            <motion.div
              key={edu.id || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl space-y-3"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-xs font-semibold">Education {idx + 1}</span>
                {portfolio.education.length > 1 && (
                  <button type="button" onClick={() => removeEducation(idx)} className="text-red-400/50 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  placeholder="Institution"
                  id={`edu-inst-${idx}`}
                  value={edu.institution}
                  onChange={(e) => updateEducation(idx, 'institution', e.target.value)}
                />
                <FormInput
                  placeholder="Degree"
                  id={`edu-degree-${idx}`}
                  value={edu.degree}
                  onChange={(e) => updateEducation(idx, 'degree', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  placeholder="Year (e.g. 2020 – 2024)"
                  id={`edu-year-${idx}`}
                  value={edu.year}
                  onChange={(e) => updateEducation(idx, 'year', e.target.value)}
                />
                <FormInput
                  placeholder="GPA (optional)"
                  id={`edu-gpa-${idx}`}
                  value={edu.gpa}
                  onChange={(e) => updateEducation(idx, 'gpa', e.target.value)}
                />
              </div>
            </motion.div>
          ))}
          <button
            type="button"
            onClick={addEducation}
            className="w-full py-3 rounded-xl text-sm text-white/40 hover:text-white/60 transition-colors flex items-center justify-center gap-2"
            style={{ border: '1px dashed rgba(255,255,255,0.1)' }}
          >
            <Plus size={14} />
            Add Education
          </button>
        </div>
      </Section>

      {/* Template Selector */}
      <div className="glass-card p-5">
        <TemplateSelector
          selected={portfolio.template}
          onSelect={(t) => updateField('template', t)}
        />
      </div>
    </div>
  )
}
