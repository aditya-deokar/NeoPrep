'use client';

import React from 'react';
import CourseCard from './CourseCard';
import { CourseListType } from '@/types/courseList';


const UserCourseList: React.FC<{ initialCourses: CourseListType[] }> = ({ initialCourses }) => {
  

  // console.log(initialCourses);

  return (
    <div className='mt-10'>
      <h2 className='font-medium text-xl'>My AI Courses</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
        {initialCourses.length > 0 ? (
          initialCourses.map((course, index) => (
            <CourseCard key={index} course={course} refreshData={() => {}} />
          ))
        ) : (
          [1, 2, 3, 4, 5].map((_, i) => (
            <div key={i} className='w-full bg-slate-300 animate-pulse rounded-lg h-[270px] mt-5'></div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserCourseList;
