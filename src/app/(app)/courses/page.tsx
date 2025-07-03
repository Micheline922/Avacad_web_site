import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const courses = [
  {
    id: 'cs101',
    title: 'Introduction to Computer Science',
    description: 'Fundamentals of programming and computer science concepts.',
    progress: 75,
  },
  {
    id: 'ds202',
    title: 'Data Structures and Algorithms',
    description: 'In-depth study of data structures and algorithmic techniques.',
    progress: 50,
  },
  {
    id: 'db303',
    title: 'Database Systems',
    description: 'Learn about relational databases, SQL, and database design.',
    progress: 25,
  },
   {
    id: 'os404',
    title: 'Operating Systems',
    description: 'Core concepts of operating systems, including processes, memory management, and file systems.',
    progress: 90,
  },
];

export default function CoursesPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {courses.map((course) => (
        <Card key={course.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">{course.title}</CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Progress: {course.progress}%</p>
              <Progress value={course.progress} className="w-full" />
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/courses/${course.id}`} passHref legacyBehavior>
              <Button className="w-full">
                View Course <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
