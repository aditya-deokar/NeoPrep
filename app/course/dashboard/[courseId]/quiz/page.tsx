'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useParams } from "next/navigation";

export default function Home() {

   const params = useParams();
    const courseId = params?.courseId as string;
  return (
    
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-6">Quiz Dashboard</h1>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Python Fundamentals Assessment</CardTitle>
              <CardDescription>Test your knowledge of Python basics, data structures, and control flow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span>Questions: 20</span>
                  <span>Time Limit: 30 minutes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Difficulty: Mixed</span>
                  <span>Last Updated: April 10, 2025</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/course/dashboard/${courseId}/quiz/instructions`} className="w-full">
                <Button className="w-full">Start Quiz</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Previous Attempts</CardTitle>
              <CardDescription>View your past quiz results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Python Fundamentals</p>
                    <p className="text-sm text-muted-foreground">April 5, 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">16/20</p>
                    <p className="text-sm text-muted-foreground">80%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Python Fundamentals</p>
                    <p className="text-sm text-muted-foreground">March 28, 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">14/20</p>
                    <p className="text-sm text-muted-foreground">70%</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/history" className="w-full">
                <Button variant="outline" className="w-full">
                  View All Results
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
   
  )
}
