import { type IndustryData, IndustryDataSchema } from "./types"

// Raw data
const rawIndustryData = {
  industryName: "Cloud Computing (India)",
  overview:
    "Cloud Computing in India involves providing computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the Internet ('the cloud') to offer faster innovation, flexible resources, and economies of scale. It's a critical enabler for digital transformation across all sectors.",
  salaryRange: [
    {
      role: "Cloud Support Associate/Engineer",
      min: 400000,
      max: 1000000,
      median: 600000,
      location: "Bengaluru / Hyderabad / Pune / NCR",
    },
    {
      role: "Cloud Engineer (DevOps Focus)",
      min: 700000,
      max: 2200000,
      median: 1300000,
      location: "Bengaluru / Hyderabad / Pune / NCR",
    },
    { role: "Cloud Developer", min: 600000, max: 1800000, median: 1100000, location: "Major Cities" },
    { role: "Cloud Security Engineer", min: 800000, max: 2500000, median: 1500000, location: "Major Cities" },
    {
      role: "Cloud Solutions Architect",
      min: 1200000,
      max: 3500000,
      median: 2000000,
      location: "Bengaluru / Hyderabad / Pune / NCR",
    },
    { role: "Cloud Data Engineer", min: 700000, max: 2300000, median: 1400000, location: "Major Cities" },
  ],
  growthRate: 25.0,
  demandLevel: "HIGH",
  topSkills: [
    "AWS",
    "Azure",
    "GCP",
    "Docker",
    "Kubernetes",
    "Infrastructure as Code (Terraform, CloudFormation)",
    "CI/CD Pipelines",
    "Networking Concepts",
    "Security Best Practices",
    "Python/Go/Bash Scripting",
  ],
  marketOutlook: "POSITIVE",
  keyTrends: [
    "Hybrid and Multi-Cloud Adoption",
    "Serverless Computing Growth",
    "AI/ML Integration with Cloud Platforms",
    "Increased Focus on Cloud Security and Compliance (Cloud Security Posture Management - CSPM)",
    "FinOps (Cloud Financial Management)",
    "Rise of Edge Computing complementing Cloud",
    "Platform Engineering on Cloud",
  ],
  recommendedSkills: [
    "Advanced Certifications (e.g., AWS Solutions Architect Professional, Azure Expert Certs, GCP Professional Certs)",
    "Kubernetes Administration (CKA/CKAD)",
    "Advanced Terraform/IaC",
    "Cloud Security Specializations",
    "Serverless Development",
    "Data Engineering on Cloud Platforms",
    "Understanding Microservices Architecture",
  ],
  entryLevelOutlook: {
    prospects: "Excellent",
    commonRoles: [
      "Cloud Support Engineer",
      "Junior Cloud Engineer",
      "Associate Cloud Consultant",
      "NOC Engineer (Cloud Focus)",
      "DevOps Trainee",
    ],
    advice:
      "Obtain foundational cloud certifications (AWS CCP, AZ-900, GCP Cloud Digital Leader), build hands-on projects using free tiers, learn scripting (Python/Bash), understand core IT concepts (Networking, OS, Security), and contribute to open-source projects if possible.",
  },
  educationalPathways: {
    degrees: ["B.Tech/B.E. (CS, IT, ECE)", "MCA", "Relevant Diplomas"],
    certifications: [
      "AWS Certified Cloud Practitioner/Solutions Architect Associate/Developer Associate",
      "Microsoft Certified: Azure Fundamentals/Administrator Associate/Developer Associate",
      "Google Cloud Certified: Associate Cloud Engineer/Professional Cloud Architect",
      "CompTIA Cloud+",
    ],
    alternativeRoutes: [
      "Cloud-focused Bootcamps",
      "Vendor Training Programs",
      "Online Platforms (A Cloud Guru, Coursera, Udemy, Pluralsight)",
    ],
  },
  internshipOpportunities: {
    availability: "HIGH",
    commonAreas: [
      "Cloud Infrastructure Support",
      "Cloud Migration Assistance",
      "DevOps Support",
      "Cloud Monitoring",
      "Scripting/Automation",
    ],
    timing:
      "Summer (May-July) and Winter (Dec-Jan) breaks are common, but longer internships (6 months) are increasingly available.",
  },
  careerProgressionExamples: [
    "Cloud Support Engineer -> Cloud Engineer -> Senior Cloud Engineer -> Cloud Architect / Cloud Lead",
    "Junior DevOps Engineer -> DevOps Engineer -> Senior DevOps Engineer -> SRE / Platform Engineer",
    "Cloud Security Analyst -> Cloud Security Engineer -> Senior Cloud Security Architect",
  ],
  keyCompaniesHiring: [
    "Amazon Web Services (AWS)",
    "Microsoft Azure",
    "Google Cloud Platform (GCP)",
    "TCS",
    "Infosys",
    "Wipro",
    "HCL Tech",
    "Accenture",
    "Capgemini",
    "IBM Cloud",
    "Oracle Cloud",
    "Major Banks",
    "Large Enterprises",
    "Tech Startups",
  ],
}

// Validate data with Zod schema
export const industryData: IndustryData = IndustryDataSchema.parse(rawIndustryData)
