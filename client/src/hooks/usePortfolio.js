import { useState, useCallback } from 'react'

export const defaultPortfolio = {
  full_name: '',
  professional_title: '',
  bio: '',
  profile_image: '',
  github_url: '',
  linkedin_url: '',
  portfolio_url: '',
  email: '',
  phone: '',
  location: '',
  template: 'glass',
  skills: [],
  projects: [
    {
      id: Date.now(),
      name: '',
      description: '',
      technology: '',
      github_link: '',
      live_demo: '',
    },
  ],
  experience: [
    {
      id: Date.now() + 1,
      company: '',
      role: '',
      duration: '',
      description: '',
    },
  ],
  education: [
    {
      id: Date.now() + 2,
      institution: '',
      degree: '',
      year: '',
      gpa: '',
    },
  ],
  social_links: {
    twitter: '',
    instagram: '',
    youtube: '',
    dev_to: '',
  },
}

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState(defaultPortfolio)

  const updateField = useCallback((field, value) => {
    setPortfolio((prev) => ({ ...prev, [field]: value }))
  }, [])

  const updateProject = useCallback((index, field, value) => {
    setPortfolio((prev) => {
      const updated = [...prev.projects]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, projects: updated }
    })
  }, [])

  const addProject = useCallback(() => {
    setPortfolio((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now(),
          name: '',
          description: '',
          technology: '',
          github_link: '',
          live_demo: '',
        },
      ],
    }))
  }, [])

  const removeProject = useCallback((index) => {
    setPortfolio((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }))
  }, [])

  const updateExperience = useCallback((index, field, value) => {
    setPortfolio((prev) => {
      const updated = [...prev.experience]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, experience: updated }
    })
  }, [])

  const addExperience = useCallback(() => {
    setPortfolio((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          company: '',
          role: '',
          duration: '',
          description: '',
        },
      ],
    }))
  }, [])

  const removeExperience = useCallback((index) => {
    setPortfolio((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }))
  }, [])

  const updateEducation = useCallback((index, field, value) => {
    setPortfolio((prev) => {
      const updated = [...prev.education]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, education: updated }
    })
  }, [])

  const addEducation = useCallback(() => {
    setPortfolio((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          institution: '',
          degree: '',
          year: '',
          gpa: '',
        },
      ],
    }))
  }, [])

  const removeEducation = useCallback((index) => {
    setPortfolio((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
  }, [])

  const addSkill = useCallback((skill) => {
    if (!skill.trim()) return
    setPortfolio((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill.trim())
        ? prev.skills
        : [...prev.skills, skill.trim()],
    }))
  }, [])

  const removeSkill = useCallback((skill) => {
    setPortfolio((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }, [])

  const updateSocialLinks = useCallback((platform, value) => {
    setPortfolio((prev) => ({
      ...prev,
      social_links: { ...prev.social_links, [platform]: value },
    }))
  }, [])

  const resetPortfolio = useCallback(() => {
    setPortfolio(defaultPortfolio)
  }, [])

  const loadPortfolio = useCallback((data) => {
    setPortfolio({
      ...defaultPortfolio,
      ...data,
    })
  }, [])

  return {
    portfolio,
    updateField,
    updateProject,
    addProject,
    removeProject,
    updateExperience,
    addExperience,
    removeExperience,
    updateEducation,
    addEducation,
    removeEducation,
    addSkill,
    removeSkill,
    updateSocialLinks,
    resetPortfolio,
    loadPortfolio,
  }
}
