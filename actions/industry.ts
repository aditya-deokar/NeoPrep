"use server";

// import { industryData } from "@/lib/data";
import prisma from "@/lib/prisma";

import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});


export const generateAIInsights = async (
  industry: string
) => {
  const prompt = `
  Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
  {
"$schema": "http://json-schema.org/draft-07/schema#",
"title": "Technology Industry Analysis for India",
"description": "Schema defining the structure for an analysis of the Technology Industry in India, tailored for students.",
"type": "object",
"properties": {
"industryName": {
"description": "The name of the industry and the specific region (India).",
"type": "string",
"examples": [
"Technology (India)"
]
},
"overview": {
"description": "A brief overview of the technology industry in India.",
"type": "string"
},
"salaryRange": {
"description": "An array of common roles with their corresponding salary ranges in Indian Rupees (INR).",
"type": "array",
"items": {
"type": "object",
"properties": {
"role": {
"description": "The job title or role.",
"type": "string"
},
"min": {
"description": "Minimum annual salary in INR (Lakhs or full amount).",
"type": "integer",
"minimum": 0
},
"max": {
"description": "Maximum annual salary in INR (Lakhs or full amount).",
"type": "integer",
"minimum": 0
},
"median": {
"description": "Median annual salary in INR (Lakhs or full amount).",
"type": "integer",
"minimum": 0
},
"location": {
"description": "Typical location(s) or note on location variance (e.g., Major Cities, specific tech hubs like Bengaluru, Hyderabad, Pune, NCR).",
"type": "string"
}
},
"required": [
"role",
"min",
"max",
"median",
"location"
]
}
},
"salaryFactors": {
"description": "Details on factors influencing salary levels within the industry.",
"type": "object",
"properties": {
"description": {
"description": "A general statement about what influences salaries.",
"type": "string",
"examples": [
"Several key factors influence salary ranges in this industry:"
]
},
"factors": {
"description": "An array containing specific factors and their descriptions.",
"type": "array",
"minItems": 1,
"items": {
"type": "object",
"properties": {
"factorName": {
"description": "The name of the influencing factor.",
"type": "string",
"enum": [
"Experience Level",
"Location",
"Certifications",
"Company Type",
"Skill Specialization"
]
},
"factorDescription": {
"description": "A paragraph describing the impact of the factor.",
"type": "string"
}
},
"required": [
"factorName",
"factorDescription"
]
}
}
},
"required": [
"description",
"factors"
]
},
"growthRate": {
"description": "Projected annual growth rate of the industry in India (as a percentage).",
"type": "number",
"format": "float",
"minimum": 0
},
"keyGrowthDrivers": {
"description": "Major factors contributing to the industry's growth in India.",
"type": "object",
"properties": {
"description": {
"description": "Introductory text for the growth drivers section.",
"type": "string",
"examples": [
"The industry's expansion is fueled by several key drivers:"
]
},
"drivers": {
"description": "An array of specific growth drivers and their descriptions.",
"type": "array",
"minItems": 1,
"items": {
"type": "object",
"properties": {
"driverName": {
"description": "Name of the growth driver.",
"type": "string",
"enum": [
"Digital India Initiatives",
"Remote Work Acceleration",
"Data Localization Policies",
"Startup Ecosystem Boom",
"Increased Cloud Adoption",
"Government Support & PLI Schemes"
]
},
"driverDescription": {
"description": "Description of how the driver contributes to growth.",
"type": "string"
}
},
"required": [
"driverName",
"driverDescription"
],
"examples": [
{
"driverName": "Digital India Initiatives",
"driverDescription": "Government focus on digitizing services and infrastructure creates vast opportunities for the tech sector."
},
{
"driverName": "Remote Work Acceleration",
"driverDescription": "The shift towards remote and hybrid work models has boosted demand for collaboration tools, cloud services, and cybersecurity."
},
{
"driverName": "Data Localization Policies",
"driverDescription": "Regulations requiring data storage within India drive investment in local data centers and cloud infrastructure."
},
{
"driverName": "Startup Ecosystem Boom",
"driverDescription": "A vibrant startup culture fosters innovation, creates jobs, and increases demand for tech talent and services."
}
]
}
}
},
"required": [
"description",
"drivers"
]
},
"demandLevel": {
"description": "The current demand level for professionals in this industry.",
"type": "string",
"enum": [
"HIGH",
"MEDIUM",
"LOW"
]
},
"topSkills": {
"description": "A list of the most currently in-demand technical and soft skills.",
"type": "array",
"items": {
"type": "string"
},
"minItems": 1
},
"marketOutlook": {
"description": "The overall future outlook for the industry in India.",
"type": "string",
"enum": [
"POSITIVE",
"NEUTRAL",
"NEGATIVE"
]
},
"keyTrends": {
"description": "Significant trends shaping the industry in India.",
"type": "array",
"items": {
"type": "string"
},
"minItems": 1
},
"recommendedSkills": {
"description": "Skills recommended for students to learn to succeed in the future.",
"type": "array",
"items": {
"type": "string"
},
"minItems": 1
},
"entryLevelOutlook": {
"description": "Information specifically for entry-level job seekers.",
"type": "object",
"properties": {
"prospects": {
"description": "Outlook for entry-level job prospects.",
"type": "string"
},
"commonRoles": {
"description": "Common job titles for entry-level positions.",
"type": "array",
"items": {
"type": "string"
}
},
"advice": {
"description": "Tips and advice for students entering the industry.",
"type": "string"
}
},
"required": [
"prospects",
"commonRoles",
"advice"
]
},
"educationalPathways": {
"description": "Common educational routes into the industry.",
"type": "object",
"properties": {
"degrees": {
"description": "Relevant university degrees.",
"type": "array",
"items": {
"type": "string"
}
},
"certifications": {
"description": "Valuable industry certifications.",
"type": "array",
"items": {
"type": "string"
}
},
"alternativeRoutes": {
"description": "Alternative paths like bootcamps or self-study.",
"type": "array",
"items": {
"type": "string"
}
}
},
"required": [
"degrees",
"certifications",
"alternativeRoutes"
]
},
"internshipOpportunities": {
"description": "Information about internship availability and types.",
"type": "object",
"properties": {
"availability": {
"description": "General availability of internships.",
"type": "string",
"enum": [
"HIGH",
"MEDIUM",
"LOW"
]
},
"commonAreas": {
"description": "Common fields or departments offering internships.",
"type": "array",
"items": {
"type": "string"
}
},
"timing": {
"description": "Typical timing for internships (e.g., summer, winter, duration).",
"type": "string"
}
},
"required": [
"availability",
"commonAreas",
"timing"
]
},
"tipsForSecuringInternships": {
"description": "Actionable tips for students seeking internships in this industry.",
"type": "array",
"minItems": 1,
"items": {
"type": "string"
},
"examples": [
"Build a strong portfolio showcasing relevant projects (e.g., on GitHub).",
"Tailor your resume and cover letter for each application.",
"Network actively online (LinkedIn) and attend virtual or in-person career fairs.",
"Practice coding challenges and technical fundamentals.",
"Gain relevant certifications or complete online courses.",
"Prepare for behavioral interview questions using the STAR method."
]
},
"challenges": {
"description": "Key challenges faced by the industry and professionals within it.",
"type": "array",
"minItems": 1,
"items": {
"type": "string"
},
"examples": [
"Intense competition for talent, especially in specialized areas.",
"Rapid technological obsolescence requiring continuous upskilling.",
"Infrastructure gaps in smaller cities and rural areas.",
"Data privacy and cybersecurity concerns.",
"Global economic uncertainty impacting IT spending.",
"Skill gap between academic curricula and industry demands."
]
},
"marketGrowthProjections": {
"description": "Data and configuration for visualizing market and job growth projections.",
"type": "object",
"properties": {
"description": {
"type": "string",
"description": "A brief description of the data being visualized.",
"examples": [ "Projected market size and job openings growth over the next few years." ]
},
"data": {
"type": "array",
"description": "Time-series data points for visualization.",
"minItems": 1,
"items": {
"type": "object",
"properties": {
"year": {
"type": "integer",
"description": "The year for the data point."
},
"market": {
"type": "number",
"description": "Market size metric (e.g., in
Billion)", "color": "hsl(var(--chart-1))" },
"jobs": { "label": "Job Openings (100K)", "color": "hsl(var(--chart-2))" }
}
]
}
},
"required": ["description", "data", "chartConfig"]
},
"careerProgressionExamples": {
"description": "Example career paths within the industry.",
"type": "array",
"items": {
"type": "string",
"examples": [
"Associate Software Engineer -> Software Engineer -> Senior Software Engineer -> Lead Engineer / Architect / Engineering Manager"
]
}
},
"keyCompaniesHiring": {
"description": "A list of major companies known for hiring in this industry in India.",
"type": "array",
"items": {
"type": "string"
}
}
},
"required": [
"industryName",
"overview",
"salaryRange",
"salaryFactors",
"growthRate",
"keyGrowthDrivers", // Added
"demandLevel",
"topSkills",
"marketOutlook",
"keyTrends",
"recommendedSkills",
"entryLevelOutlook",
"educationalPathways",
"internshipOpportunities",
"tipsForSecuringInternships",
"challenges", // Added
"marketGrowthProjections", // Added
"careerProgressionExamples",
"keyCompaniesHiring"
]
}

  IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
 
`;

  const result = await model.generateContent(prompt);
  
  const response = result.response;
  const text = response.text();
  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();


  return cleanedText;
};




export async function getIndustryInsights(){
    const {userId } = await auth();

    if(!userId) throw new Error("Unauthorized");

    const user =await prisma.user.findUnique({
        where:{
            clerkUserId:userId
        },
        include:{
            industryInsights:true,
        },
    });

    if(!user) throw new Error("User Not Found");


    if(!user.industryInsights){



        const insights= await generateAIInsights(user.industry!);

        try {
          JSON.stringify(insights); 
        } catch (e:any) {
          throw new Error("Invalid JSON content: " + e.message);
        }

        const industryInsight = await prisma.industryInsights.create({
            data:{
                industry:user.industry!,
                industryData: insights,
                nextUpdate: new Date(Date.now() + 7 * 24* 60* 60* 1000),
            }
        })

        return industryInsight;
    }

    return user.industryInsights;

}
