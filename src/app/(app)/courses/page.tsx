
"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookCopy } from 'lucide-react';
import { useCourseContext } from '@/context/course-context';
import { cn } from '@/lib/utils';
import { Course } from '@/lib/courses';

export default function CoursesPage() {
  const { courses } = useCourseContext();
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);

  const faculties = useMemo(() => {
    const allFaculties = courses.map(course => course.faculty);
    return ['Tous les cours', ...Array.from(new Set(allFaculties))];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    if (!selectedFaculty || selectedFaculty === 'Tous les cours') {
      return courses;
    }
    return courses.filter(course => course.faculty === selectedFaculty);
  }, [courses, selectedFaculty]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-headline mb-4">Filtrer par faculté</h2>
        <div className="flex flex-wrap gap-2">
          {faculties.map((faculty) => (
            <Button
              key={faculty}
              variant={selectedFaculty === faculty || (!selectedFaculty && faculty === 'Tous les cours') ? 'default' : 'outline'}
              onClick={() => setSelectedFaculty(faculty)}
            >
              {faculty}
            </Button>
          ))}
        </div>
      </div>
      
      {filteredCourses.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course: Course) => (
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
      ) : (
        <Card className="text-center p-12">
            <CardHeader>
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <BookCopy className="h-8 w-8" />
                 </div>
                <CardTitle className="font-headline text-2xl">Aucun cours trouvé</CardTitle>
                <CardDescription>Aucun cours ne correspond à la faculté sélectionnée.</CardDescription>
            </CardHeader>
        </Card>
      )}
    </div>
  );
}
