"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { format, isPast, differenceInDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import ConclusionGenerator from '@/components/courses/conclusion-generator';

const mockCourses = {
  cs101: {
    title: "Introduction à l'informatique",
    notes: "Ce cours couvre les concepts fondamentaux de la programmation en utilisant Python. Nous avons exploré les variables, les types de données, le flux de contrôle et les structures de données de base. L'examen de mi-session portait sur les boucles et les fonctions, tandis que le projet final consistait à construire une petite application.",
    assignments: [
      { id: '1', title: 'Bonjour le monde en Python', dueDate: '2024-08-15', completed: true },
      { id: '2', title: 'Implémentation de FizzBuzz', dueDate: '2024-08-22', completed: true },
      { id: '3', title: 'Application de calculatrice simple', dueDate: '2024-09-01', completed: false },
    ],
  },
  ds202: {
    title: 'Structures de données et algorithmes',
    notes: "Les sujets clés incluent les tableaux, les listes chaînées, les piles, les files, les arbres et les graphes. Nous avons également analysé la complexité des algorithmes à l'aide de la notation Big O. Les travaux pratiques consistaient à implémenter ces structures de données à partir de zéro.",
    assignments: [
      { id: '1', title: 'Implémenter une liste chaînée', dueDate: '2024-09-10', completed: true },
      { id: '2', title: 'Arbre de recherche binaire', dueDate: '2024-09-24', completed: false },
      { id: '3', title: 'Parcours de graphe (BFS, DFS)', dueDate: '2024-10-05', completed: false },
    ],
  },
  db303: {
    title: 'Systèmes de bases de données',
    notes: "Concentration sur le modèle relationnel, SQL, la normalisation et la gestion des transactions. Nous avons utilisé PostgreSQL pour nos projets. Couverture des diagrammes ER pour la conception de bases de données.",
    assignments: [
      { id: '1', title: 'Diagramme ER pour une université', dueDate: '2024-08-30', completed: true },
      { id: '2', title: 'Pratique des requêtes SQL', dueDate: '2024-09-15', completed: true },
    ],
  },
  os404: {
    title: "Systèmes d'exploitation",
    notes: "Étude de la gestion des processus, des algorithmes d'ordonnancement, des techniques de gestion de la mémoire comme la pagination et la segmentation, et des systèmes de fichiers. Apprentissage de la concurrence et des interblocages.",
    assignments: [
        { id: '1', title: "Simulation d'ordonnanceur de processus", dueDate: '2024-10-01', completed: false },
        { id: '2', title: "Implémentation d'un gestionnaire de mémoire", dueDate: '2024-10-15', completed: false },
    ],
  },
};

type Assignment = { id: string; title: string; dueDate: string; completed: boolean; };

const DueDateBadge = ({ dueDate }: { dueDate: string }) => {
    const date = new Date(dueDate);
    const now = new Date();
    const daysUntil = differenceInDays(date, now);
    const isOverdue = isPast(date) && daysUntil < 0;

    if (isOverdue) {
        return <Badge variant="destructive">En retard</Badge>
    }
    if (daysUntil <= 3) {
        return <Badge variant="destructive" className="bg-amber-500 hover:bg-amber-600 text-white">À rendre dans {daysUntil+1} jour(s)</Badge>
    }
    return <Badge variant="secondary">À rendre le {format(date, 'd MMM', { locale: fr })}</Badge>
}

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as keyof typeof mockCourses;
  const course = mockCourses[courseId] || { title: 'Cours non trouvé', notes: '', assignments: [] };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="notes" className="w-full">
          <TabsList>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="assignments">Devoirs</TabsTrigger>
            <TabsTrigger value="conclusion">Conclusion IA</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notes" className="mt-4">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Notes de cours</CardTitle>
                    <CardDescription>Un résumé des sujets abordés dans ce cours.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-48">
                        <p className="text-muted-foreground">{course.notes}</p>
                    </ScrollArea>
                </CardContent>
             </Card>
          </TabsContent>
          
          <TabsContent value="assignments" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Devoirs &amp; Échéances</CardTitle>
                    <CardDescription>Gardez une trace de vos devoirs.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {course.assignments.map((assignment: Assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 rounded-md bg-background hover:bg-secondary transition-colors">
                        <div className="flex items-center space-x-3">
                            <Checkbox id={`assign-${assignment.id}`} defaultChecked={assignment.completed} />
                            <label
                                htmlFor={`assign-${assignment.id}`}
                                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${assignment.completed ? 'line-through text-muted-foreground' : ''}`}
                            >
                                {assignment.title}
                            </label>
                        </div>
                        <DueDateBadge dueDate={assignment.dueDate} />
                    </div>
                    ))}
                </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conclusion" className="mt-4">
             <ConclusionGenerator courseName={course.title} initialContent={course.notes} />
          </TabsContent>

        </Tabs>
      </CardContent>
    </Card>
  );
}
