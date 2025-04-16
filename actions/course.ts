// app/actions/getUserCourses.ts
'use server';

import { v4 as uuidv4 } from 'uuid';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { CourseOutput } from '@/types/courseOutput';
import { GenerateCourseLayout_AI } from '@/configs/AIModel';








export const getCourseById = async (courseId: string) => {
    try {
      const result = await prisma.course.findUnique({
        where: {
          courseId: courseId,
        },
      });
  
      if (!result) return undefined;
  
      return {
        ...result,
        courseOutput: result.courseIndex
          ? (JSON.parse(result.courseIndex as string) as CourseOutput)
          : null,
      };
    } catch (error) {
      console.error("Error fetching course:", error);
      return undefined;
    }
  };


  
export const getCourseWithOutput = async (courseId: string) => {
    try {
      const result = await prisma.course.findUnique({
        where: {
          courseId,
        },
      });
  
      if (!result) return undefined;
  
      return {
        ...result,
        courseOutput: result.courseIndex
          ? (JSON.parse(result.courseIndex as string) as CourseOutput)
          : null,
      };
    } catch (error) {
      console.error('Error fetching course:', error);
      return undefined;
    }
  };



  
export const getChapterContent = async (courseId: string) => {
    try {
      const result = await prisma.course({
        where: {
          courseId,
          // You could add title matching if needed.
        },
      });
  
      return {
        videoId: result?.videoId || null,
        content: result?.content ? JSON.parse(result?.content as string) : null,
      };
    } catch (error) {
      console.error("Error fetching chapter content:", error);
      return undefined;
    }
  };





// export const fetchCourseById = async (
//   courseId: string
// ): Promise<(CourseList & { courseOutput: CourseOutput | null }) | null> => {
//   try {
//     const result = await prisma.course.findUnique({
//       where: { courseId },
//     });

//     if (!result) return null;

//     const parsedOutput = result.courseOutput
//       ? (JSON.parse(result.courseOutput as string) as CourseOutput)
//       : null;

//     return {
//       ...result,
//       courseOutput: parsedOutput,
//     };
//   } catch (error) {
//     console.error('[fetchCourseById] Error:', error);
//     return null;
//   }
// };






export const GenerateCourseLayout = async (userCourseInput: any) => {
  const BASIC_PROMPT = "Generate A Course Tutorial on following details with field as CourseName, Description, Along with ChapterName, About, duration";
  const USER_INPUT_PROMPT = `category:${userCourseInput?.category}, Topic: ${userCourseInput?.topic}, level: ${userCourseInput?.level}, Duration: ${userCourseInput?.duration}, NoOfChapters: ${userCourseInput?.noOfChapter}, in JSON format`;
  const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;

  const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
  const layoutJSON = JSON.parse(await result.response?.text());

  return layoutJSON;
};

export const SaveCourseLayoutInDB = (asynserCourseInput: any, courseLayout: any ) => {
  const user = await currentUser();
  const id = uuidv4();

  await prisma.course.create({
    data: {
      courseId: id,
      name: userCourseInput?.topic,
      level: userCourseInput?.level,
      category: userCourseInput?.category,
      courseOutput: courseLayout,
      createprismay: userimaryEmailAddress?.emailAddress || '',
      userName: user?.fullName || '',
      userProfileImage: user?.imageUrl || ''
    }
  });
  

  redirect(`/course/create-course/${id}`);

};


