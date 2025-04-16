'use server';

import { GenerateChapterContent_AI } from "@/configs/AIModel";
import { getVideo } from "@/configs/service";
import prisma from "@/lib/prisma";




export const GenerateChapterContentLayout = async (courseName: string, chapter: { ChapterName: string; About: string; Duration: string }) => {
  const CHAPTER_PROMPT = `Explain the concept in detail on Topic: ${courseName}, specific in Chapter: ${chapter.ChapterName}, cover all the chapter points like ${chapter.About} and add more. Format the output as JSON with an array of objects having fields: title, description, code (in <precode>), suitable for reading within ${chapter.Duration}.`

  const result = await GenerateChapterContent_AI.sendMessage(CHAPTER_PROMPT)
  const layout = JSON.parse( await result.response?.text())

//   console.log("lay--" + layout)
  return layout
}






export const SaveChapterInprisma = async ({
  courseId,
  chapterId,
  content,
  videoId = ""
}: {
  courseId: string
  chapterId: number
  content: any
  videoId?: string
}) => {
  const result = await prisma.chapters.create({
    data: {
      courseId,
      chapterId,
      content,
      videoId
    }
  })

  return result
}





export const GenerateAndSaveAllChapters = async (course: any) => {
    const courseOutputRaw = typeof course.courseOutput === "string"
      ? JSON.parse(course.courseOutput)
      : course.courseOutput;
  
    const courseOutput = Array.isArray(courseOutputRaw) ? courseOutputRaw[0] : courseOutputRaw;
    const chapters = courseOutput?.Chapters || [];
  
    const courseName = course.name;
  
    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
  
      // 1. Generate content
      const content = await GenerateChapterContentLayout(courseName, chapter);
  
      // 2. Fetch video
      const videos = await getVideo(`${courseName}:${chapter.ChapterName}`);
      const videoId = videos?.[0]?.id?.videoId || "";
  
      // 3. Save to prisma
      await SaveChapterInprisma({
        chapterId: i,
        courseId: course.courseId,
        content,
        videoId
      });
    }
  
    // 4. Mark course as published
    await prisma.course.update({
      where: { courseId: course.courseId },
      data: { publish: true }
    });
  }
  
