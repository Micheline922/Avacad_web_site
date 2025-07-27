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
  {
    id: 'elec101',
    title: "Électricité : Principes et applications",
    description: "Explorez les lois fondamentales de l'électricité et leurs applications pratiques.",
    progress: 60,
  },
  {
    id: 'droit201',
    title: "Droit civil et législation sociale",
    description: "Introduction aux concepts du droit civil et de la législation sociale.",
    progress: 40,
  },
  {
    id: 'eco101',
    title: "Principes de l'économie générale",
    description: "Comprendre les théories et les mécanismes de base de l'économie.",
    progress: 80,
  },
  {
    id: 'webdev301',
    title: "Programmation Web",
    description: "Créez des sites web dynamiques avec HTML5, CSS3 et JavaScript.",
    progress: 70,
  },
  {
    id: 'archi401',
    title: "Architecture de l'ordinateur",
    description: "Étude de la conception et de l'organisation des systèmes informatiques.",
    progress: 30,
  },
];

export default function CoursesPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Link href={`/courses/${course.id}?tab=tutor`} key={course.id} className="no-underline">
          <Card className="flex flex-col h-full hover:border-primary transition-all">
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
              <Button className="w-full">
                  Voir le cours <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
