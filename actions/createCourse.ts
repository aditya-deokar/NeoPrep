"use server";

import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from 'uuid';
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


// Define types for the API responses
type CreateCourseSuccess = { id: string };
type CreateCourseError = { error: string };
type CreateCourseResult = CreateCourseSuccess | CreateCourseError;


const fullCourseSchema = z.object({
  courseName: z.string().min(3),
  description: z.string(),
  level: z.string(),
  duration: z.string(),
  noOfChapters: z.number(),
  category: z.string(),
  chapters: z.array(
    z.object({ ChapterName: z.string(), About: z.string(), duration: z.string() })
  ),
});


//Derive the type from schema
type CourseType = z.infer<typeof fullCourseSchema>;


export async function GenerateCourseLayout(userCourseInput: any): Promise<CourseType> {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  try {
    const prompt = `
        Create a detailed course outline based on the following user input in JSON format, following this schema:
        {
            "courseName": "...",
            "description": "...",
            "level": "Beginner to Advanced",
            "duration": "X hours",
            "noOfChapters": X,
            "category": "Programming",
            "chapters": [
                {
                    "ChapterName": "...",
                    "About": "...",
                    "duration": "X hours"
                }
            ]
            
        }

        User Input:
        Category: ${userCourseInput?.category}
        Topic: ${userCourseInput?.topic}
        Level: ${userCourseInput?.level}
        Duration: ${userCourseInput?.duration}
        Number of Chapters: ${userCourseInput?.noOfChapter}
        `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    let courseData: CourseType;
    try {
      courseData = JSON.parse(cleanedText);
    } catch (parseError: any) {
      console.error("Error parsing JSON:", parseError);
      throw new Error("Failed to parse Gemini response as JSON");
    }

    try {
      fullCourseSchema.parse(courseData);
    } catch (validationError: any) {
      console.error("Validation error:", validationError);
      throw new Error("Invalid course data from Gemini");
    }

    return courseData;

  } catch (error: any) {
    console.error("AI Generation error:", error);
    throw new Error(error.message || "Failed to generate course layout"); //Re-throwing the errror
  }
}

export async function SaveCourseLayoutInDB(courseData: CourseType) {
  const authResult = await auth();
  const userId = authResult.userId;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  
    const id = uuidv4();

    const newCourse = await prisma.courseList.create({
      data: {
        courseId: id,
        name: courseData.courseName,
        category: courseData.category,
        level: courseData.level,
        courseOutput: courseData, // Store the whole course data. Adjust as needed.
        createdBy: userId,
        
      },
    });

    // revalidatePath(`/course/create-course/${id}`);
    redirect(`/course/create-course/${id}`);

    // return { id: newCourse.id }; //Return the new uuid not courseID
 
}






export async function getCourseById2(id: string) {  //Parameter changed to id
  try {
    const course = await prisma.courseList.findUnique({
      where: {
        courseId: id,  
      },
      include:{chapters:true}
    });
    return course;
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    return null; 
  }
}



// export async function GenerateAndSaveAllChapters(courseId: string) {
  
//   const authResult = await auth();
//   const userId = authResult.userId;
//   if (!userId) {
//     throw new Error("Unauthorized");
//   }

//   try {
//     // Fetch the course using the provided courseId
//     const course = await prisma.courseList.findUnique({
//       where: {
//         courseId: courseId,
//       },
//     });

//     if (!course) {
//       throw new Error("Course not found");
//     }

//     const courseName = course.name;  // Access the name properly

//     // Simulate chapter generation
//     const generatedChapters = Array.from({ length: 5 }, (_, i) => ({
//       chapterId: i + 1, // Replace this with your actual chapter ID generation logic.
//       courseId: course.courseId, // associate with existing courseId
//       content: {
//         title: `Chapter ${i + 1}: Introduction to ${courseName}`,
//         description: `An overview of the topics covered in chapter ${i + 1}.`,
//         details: `Detailed content for chapter ${i + 1} of the course.`,
//       },
//       videoId: `video-${i + 1}`,
//     }));

//     // Update the database with the generated chapters
//     await prisma.chapters.createMany({
//       data: generatedChapters.map((chapter) => ({
//         chapterId: chapter.chapterId,
//         courseId: chapter.courseId,  // Associate with existing courseId
//         content: chapter.content,
//         videoId: chapter.videoId,
//       })),
//     });

//     revalidatePath(`/course/create-course/${course.id}/finish`); // adjust revalidate Path
//   } catch (error: any) {
//     console.error("Error generating and saving chapters:", error);
//     throw new Error(error.message || "Failed to generate and save chapters");
//   }
// }