

export interface Chapter {
    ChapterName: string;
    About: string;
    Duration: string;
  }
  
  export interface CourseOutput {
    CourseName: string;
    Description: string;
    Category: string;
    Topic: string;
    Level: string;
    Duration: string;
    NoOfChapters: number;
    Chapters: Chapter[];
  }