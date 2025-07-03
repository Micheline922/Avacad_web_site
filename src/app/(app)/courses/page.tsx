import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const courses = [
  {
    id: 'cs101',
    title: "Introduction à l'informatique",
    description: "Fondamentaux de la programmation et des concepts informatiques.",
    progress: 75,
  },
  {
    id: 'ds202',
    title: 'Structures de données et algorithmes',
    description: "Étude approfondie des structures de données et des techniques algorithmiques.",
    progress: 50,
  },
  {
    id: 'db303',
    title: 'Systèmes de bases de données',
    description: "Apprenez les bases de données relationnelles, SQL et la conception de bases de données.",
    progress: 25,
  },
   {
    id: 'os404',
    title: "Systèmes d'exploitation",
    description: "Concepts de base des systèmes d'exploitation, y compris les processus, la gestion de la mémoire et les systèmes de fichiers.",
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
              <p className="text-sm text-muted-foreground mb-2">Progression: {course.progress}%</p>
              <Progress value={course.progress} className="w-full" />
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/courses/${course.id}`} passHref legacyBehavior>
              <Button className="w-full">
                Voir le cours <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
