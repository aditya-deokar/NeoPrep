import { z } from "zod"

// Zod schemas for data validation
export const SalaryRangeSchema = z.object({
  role: z.string(),
  min: z.number(),
  max: z.number(),
  median: z.number(),
  location: z.string(),
})

export const EntryLevelOutlookSchema = z.object({
  prospects: z.string(),
  commonRoles: z.array(z.string()),
  advice: z.string(),
})

export const EducationalPathwaysSchema = z.object({
  degrees: z.array(z.string()),
  certifications: z.array(z.string()),
  alternativeRoutes: z.array(z.string()),
})

export const InternshipOpportunitiesSchema = z.object({
  availability: z.string(),
  commonAreas: z.array(z.string()),
  timing: z.string(),
})

export const IndustryDataSchema = z.object({
  industryName: z.string(),
  overview: z.string(),
  salaryRange: z.array(SalaryRangeSchema),
  growthRate: z.number(),
  demandLevel: z.string(),
  topSkills: z.array(z.string()),
  marketOutlook: z.string(),
  keyTrends: z.array(z.string()),
  recommendedSkills: z.array(z.string()),
  entryLevelOutlook: EntryLevelOutlookSchema,
  educationalPathways: EducationalPathwaysSchema,
  internshipOpportunities: InternshipOpportunitiesSchema,
  careerProgressionExamples: z.array(z.string()),
  keyCompaniesHiring: z.array(z.string()),
})

// TypeScript types derived from Zod schemas
export type SalaryRange = z.infer<typeof SalaryRangeSchema>
export type EntryLevelOutlook = z.infer<typeof EntryLevelOutlookSchema>
export type EducationalPathways = z.infer<typeof EducationalPathwaysSchema>
export type InternshipOpportunities = z.infer<typeof InternshipOpportunitiesSchema>
export type IndustryData = z.infer<typeof IndustryDataSchema>
