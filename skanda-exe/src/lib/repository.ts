import type { Project } from "@/types/portfolio-types"
import type { Skill } from "@/types/portfolio-types"
import type { Education } from "@/types/portfolio-types"
import type { Achievement } from "@/types/portfolio-types"
import type { Profile } from "@/types/portfolio-types"
import { sampleProjects } from "@/data/projects/sample-projects"
import { profileData } from "@/data/profile/profile-data"
import { skillsData } from "@/data/skills/skills-data"
import { educationData } from "@/data/education/education-data"
import { achievementsData } from "@/data/achievements/achievements-data"

// In production, these would connect to Supabase/PostgreSQL
// For now, return sample/local data

export const PortfolioRepository = {
  // Projects
  getProjects(): Project[] {
    return sampleProjects
  },

  getProject(id: string): Project | undefined {
    return sampleProjects.find((p) => p.id === id)
  },

  createProject(project: Omit<Project, "id">): Project {
    const newProject: Project = { ...project, id: Date.now().toString() }
    ;(sampleProjects as Project[]).push(newProject)
    return newProject
  },

  updateProject(id: string, updates: Partial<Project>): Project | undefined {
    const projectIndex = sampleProjects.findIndex((p) => p.id === id)
    if (projectIndex === -1) return undefined
    const updated = { ...sampleProjects[projectIndex], ...updates }
    sampleProjects[projectIndex] = updated
    return updated
  },

  deleteProject(id: string): boolean {
    const index = sampleProjects.findIndex((p) => p.id === id)
    if (index === -1) return false
    sampleProjects.splice(index, 1)
    return true
  },

  // Skills
  getSkills(): Skill[] {
    // @ts-ignore - category type mismatch between data and interface
    return skillsData
  },

  getSkill(id: string): Skill | undefined {
    // @ts-ignore - category type mismatch between data and interface
    return skillsData.find((s) => s.id === id)
  },

  createSkill(skill: Omit<Skill, "id">): Skill {
    const newSkill: Skill = { ...skill, id: Date.now().toString() }
    ;(skillsData as Skill[]).push(newSkill)
    return newSkill
  },

  updateSkill(id: string, updates: Partial<Skill>): Skill | undefined {
    const skillIndex = skillsData.findIndex((s) => s.id === id)
    if (skillIndex === -1) return undefined
    const updated = { ...skillsData[skillIndex], ...updates }
    skillsData[skillIndex] = updated
    return updated
  },

  deleteSkill(id: string): boolean {
    const index = skillsData.findIndex((s) => s.id === id)
    if (index === -1) return false
    skillsData.splice(index, 1)
    return true
  },

  // Education
  getEducation(): Education {
    return educationData
  },

  // Achievements
  getAchievements(): Achievement[] {
    return achievementsData
  },

  // Profile
  getProfile(): Profile {
    return profileData
  },
}