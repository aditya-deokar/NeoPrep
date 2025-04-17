"use client";


import { getChapter } from "@/actions/createChapters";
import { ChapterContent } from "@/components/course/chapter-content";
import { ChapterExercises } from "@/components/course/chapter-exercises";
import { ChapterNavigation } from "@/components/course/chapter-navigation";
import { ChapterObjectives } from "@/components/course/chapter-objectives";
import { ChapterProgress } from "@/components/course/chapter-progress";
import { ChapterQuiz } from "@/components/course/chapter-quiz";
import { ChapterResources } from "@/components/course/chapter-resources";
import { ChapterVideo } from "@/components/course/chapter-video";
import { DashboardShell } from "@/components/course/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChaptersType } from "@/types/chapters";
import { useUser } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { toast } from "sonner";

interface ChapterPageProps {
  params: {
    courseId: string;
    chapterId: string;
  };
}

export default function ChapterPage(promiseParams: { params: Promise<ChapterPageProps["params"]> }) {
  const { courseId, chapterId } = use(promiseParams.params); // ✅ unwrap using use()

  const numericChapterId = parseInt(chapterId, 10);

  const { user } = useUser();
  const router = useRouter();

  const [chapter, setChapter] = useState<ChaptersType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChapter = async () => {
      if (courseId && !isNaN(numericChapterId)) {
        setLoading(true);
        try {
          const result = await getChapter(courseId, numericChapterId);
          setChapter(result);
        } catch (error) {
          console.error("Error fetching chapter:", error);
          toast.error("Failed to load chapter.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchChapter();
  }, [courseId, numericChapterId]);

  if (!chapter) {
    return <div>Loading chapter...</div>;
  }

  return (

    <DashboardShell>
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <ChapterProgress />
      </div>
      <Separator className="my-4" />

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
          <TabsTrigger value="objectives">Objectives</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <TabsContent value="content" className="mt-0">
              <ChapterContent chapter={chapter.content} /> {/* Pass chapter directly and change all child component props, remove id */}
            </TabsContent>

            <TabsContent value="video" className="mt-0">
              <ChapterVideo chapter={chapter.content} /> {/* Pass chapter directly and change all child component props, remove id */}
            </TabsContent>

            <TabsContent value="exercises" className="mt-0">
              <ChapterExercises chapter={chapter.content} /> {/* Pass chapter directly and change all child component props, remove id */}
            </TabsContent>

            <TabsContent value="objectives" className="mt-0">
              <ChapterObjectives chapter={chapter.content} /> {/* Pass chapter directly and change all child component props, remove id */}
            </TabsContent>

            <TabsContent value="quiz" className="mt-0">
              <ChapterQuiz chapter={chapter.content} /> {/* Pass chapter directly and change all child component props, remove id */}
            </TabsContent>

            <TabsContent value="resources" className="mt-0">
              <ChapterResources chapter={chapter.content} /> {/* Pass chapter directly and change all child component props, remove id */}
            </TabsContent>
          </div>

          <div>
            <ChapterNavigation />
          </div>
        </div>
      </Tabs>
    </DashboardShell>
  );
}