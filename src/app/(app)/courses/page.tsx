
"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useCourseContext } from '@/context/course-context';

export default function CoursesPage() {
  const { courses } = useCourseContext();
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Card key={course.id} className="flex flex-col h-full hover:border-primary transition-all">
          <CardHeader>
            <CardTitle className="font-headline">{course.title}</CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Progression: {Math.round(course.progress)}%</p>
              <Progress value={course.progress} className="w-full" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/courses/${course.id}`}>
                Voir le cours <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
