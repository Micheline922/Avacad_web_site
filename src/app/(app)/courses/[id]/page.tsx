
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
import AiTutor from '@/components/courses/ai-tutor';

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
  elec101: {
    title: "Électricité : Principes et applications",
    notes: "Ce cours explore les lois fondamentales de l'électricité, y compris la loi d'Ohm, les circuits en série et en parallèle, et les concepts de base de l'électromagnétisme. Les applications pratiques dans les systèmes de puissance et l'électronique sont également abordées.",
    assignments: [
      { id: '1', title: "Analyse de circuits simples", dueDate: '2024-09-20', completed: false },
      { id: '2', title: "Laboratoire sur la loi d'Ohm", dueDate: '2024-10-04', completed: false },
    ],
  },
  droit201: {
    title: "Droit civil et législation sociale",
    notes: "Introduction aux principes fondamentaux du droit civil, y compris les contrats, la responsabilité et les biens. Le cours aborde également les bases de la législation sociale, couvrant le droit du travail et la sécurité sociale.",
    assignments: [
      { id: '1', title: "Étude de cas sur un contrat", dueDate: '2024-09-25', completed: true },
      { id: '2', title: "Recherche sur la législation du travail", dueDate: '2024-10-10', completed: false },
    ],
  },
  eco101: {
    title: "Principes de l'économie générale",
    notes: "Ce cours fournit une compréhension des concepts économiques de base, tels que l'offre et la demande, la microéconomie, la macroéconomie, l'inflation et la politique monétaire. Il explore comment ces principes s'appliquent aux décisions des individus et des gouvernements.",
    assignments: [
      { id: '1', title: "Analyse de l'offre et de la demande", dueDate: '2024-09-18', completed: true },
      { id: '2', title: "Dissertation sur la politique monétaire", dueDate: '2024-10-02', completed: false },
    ],
  },
  webdev301: {
    title: "Programmation Web",
    notes: "Apprenez à construire des sites web modernes et interactifs en utilisant HTML5 pour la structure, CSS3 pour le style et JavaScript pour la fonctionnalité. Le cours couvre également les principes de la conception réactive et l'interaction avec les API.",
    assignments: [
      { id: '1', title: "Créer une page de portfolio statique", dueDate: '2024-09-22', completed: true },
      { id: '2', title: "Développer une application 'To-Do List' interactive", dueDate: '2024-10-12', completed: false },
    ],
  },
  archi401: {
    title: "Architecture de l'ordinateur",
    notes: "Ce cours examine l'organisation et la conception des systèmes informatiques. Les sujets incluent la conception du processeur, la hiérarchie de la mémoire, les systèmes d'entrée/sortie et les concepts de traitement parallèle.",
    assignments: [
      { id: '1', title: "Conception d'une unité arithmétique et logique (ALU)", dueDate: '2024-10-08', completed: false },
      { id: '2', title: "Simulation d'un pipeline de processeur", dueDate: '2024-10-22', completed: false },
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
            <TabsTrigger value="tutor">Tuteur IA</TabsTrigger>
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
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
          
          <TabsContent value="tutor" className="mt-4">
            <AiTutor courseContext={course.notes} />
          </TabsContent>

          <TabsContent value="conclusion" className="mt-4">
             <ConclusionGenerator courseName={course.title} initialContent={course.notes} />
          </TabsContent>

        </Tabs>
      </CardContent>
    </Card>
  );
}
