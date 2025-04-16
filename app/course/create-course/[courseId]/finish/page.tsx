'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { ClipboardCopy } from 'lucide-react';

import CourseBasicInfo from '../_components/CourseBasicInfo';
import { getCourseByUser } from '@/action/course';


interface FinishScreenPageProps {
  params: {
    courseId: string;
  };
}

interface Course {
  courseId: string;
  name: string;
  category: string;
  level: string;
  courseOutput: any;
  createdBy: string;
  userName: string;
  userProfileImage: string;
  publish: boolean;
}

const FinishScreenPage: React.FC<FinishScreenPageProps> = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState<Course | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (user && params.courseId) {
      getCourse();
    }
  }, [user, params.courseId]);

  const getCourse = async () => {
    const data = await getCourseByUser(params.courseId);
    if (data) {
      setCourse(data);
    }
  };

  return (
    <div className='px-10 md:px-20 lg:px-44 my-7 text-primary'>
      <h2 className='text-center font-bold text-2xl my-3'>Congrats! Your Course is ready</h2>

      <h2 className='mt-3'>Course URL:</h2>
      <h2 className='text-center text-gray-400 border p-2 rounded flex justify-evenly items-center gap-2'>
        {`${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`}

        <ClipboardCopy
          className='h-5 w-5 hover:text-gray-900 cursor-pointer'
          onClick={async () =>
            await navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`
            )
          }
        />
      </h2>

      {course && (
        <CourseBasicInfo course={course} refreshData={() => console.log('refresh')} />
      )}
    </div>
  );
};

export default FinishScreenPage;
