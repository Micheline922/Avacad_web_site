
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCourses, Course, Assignment } from '@/lib/courses';

interface CourseContextType {
  courses: Course[];
  updateCourseProgress: (courseId: string, newProgress: number) => void;
  addStudyTime: (courseId: string, seconds: number) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load courses from localStorage or use initial data
    try {
      const storedCourses = localStorage.getItem('courses');
      if (storedCourses) {
        setCourses(JSON.parse(storedCourses));
      } else {
        const initialCourses = getCourses();
        setCourses(initialCourses);
        localStorage.setItem('courses', JSON.stringify(initialCourses));
      }
    } catch (error) {
      console.error("Could not access localStorage:", error);
      setCourses(getCourses());
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveCoursesToLocalStorage = (updatedCourses: Course[]) => {
    try {
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
    } catch (error) {
      console.error("Could not access localStorage:", error);
    }
  };

  const updateCourseProgress = (courseId: string, newProgress: number) => {
    const updatedCourses = courses.map(course => {
        if (course.id === courseId) {
            return { ...course, progress: Math.min(100, newProgress) };
        }
        return course;
    });
    setCourses(updatedCourses);
    saveCoursesToLocalStorage(updatedCourses);
  };

  const addStudyTime = (courseId: string, seconds: number) => {
     setCourses(prevCourses => {
        let courseToUpdate: Course | undefined;
        const updatedCourses = prevCourses.map(course => {
            if (course.id === courseId) {
                const newTotalTime = course.totalStudyTime + seconds;
                courseToUpdate = { ...course, totalStudyTime: newTotalTime };
                return courseToUpdate;
            }
            return course;
        });

        if (courseToUpdate) {
            const fiveHoursInSeconds = 5 * 60 * 60;
            const previousProgressSegments = Math.floor( (courseToUpdate.totalStudyTime - seconds) / fiveHoursInSeconds);
            const newProgressSegments = Math.floor( courseToUpdate.totalStudyTime / fiveHoursInSeconds);

            if (newProgressSegments > previousProgressSegments) {
                const progressToAdd = (newProgressSegments - previousProgressSegments) * 4;
                const newProgress = Math.min(100, courseToUpdate.progress + progressToAdd);
                
                const finalCourses = updatedCourses.map(c => 
                  c.id === courseId ? {...c, progress: newProgress } : c
                );
                saveCoursesToLocalStorage(finalCourses);
                return finalCourses;
            }
        }
        
        saveCoursesToLocalStorage(updatedCourses);
        return updatedCourses;
    });
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <CourseContext.Provider value={{ courses, updateCourseProgress, addStudyTime }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourseContext() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
}
