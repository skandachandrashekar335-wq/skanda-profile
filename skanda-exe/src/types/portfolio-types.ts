export interface Project {
  id: string
  name: string
  slug: string
  shortDescription: string
  description: string
  category: string
  technologies: string[]
  features: string[]
  progress: number
  status: "idea" | "planning" | "in-progress" | "testing" | "deployed" | "completed" | "archived"
  github: string
  demo: string
  startDate: string
  lastUpdated: string
  milestones: Milestone[]
  image: string
  futurePlans?: string
}

export interface Milestone {
  title: string
  completed: boolean
}

export interface Skill {
  id: string
  name: string
  category: string
  level: string
  description: string
  technologies: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  startYear: number
  endYear: number
  description: string
  coursework: string[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  date: string
  organization: string
  link: string
}

export interface Profile {
  name: string
  degree: string
  college: string
  location: string
  bio: string
  tagline: string
  social: {
    github: string
    linkedin: string
    instagram?: string
    email: string
    phone: string
  }
}