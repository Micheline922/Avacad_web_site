import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Puzzle, Layers, GraduationCap } from 'lucide-react';

const revisionTools = [
  {
    title: 'Quiz interactifs',
    description: 'Testez vos connaissances avec des quiz adaptés à vos cours.',
    icon: Puzzle,
    link: '#',
  },
  {
    title: 'Fiches de révision',
    description: 'Créez et révisez des fiches pour les concepts et définitions clés.',
    icon: Layers,
    link: '#',
  },
  {
    title: "Conseils d'examen",
    description: "Obtenez des conseils et des stratégies alimentés par l'IA pour réussir vos examens.",
    icon: GraduationCap,
    link: '#',
  },
];

export default function RevisionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Zone de révision</h1>
        <p className="text-muted-foreground">Affûtez vos compétences et préparez-vous à la réussite.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {revisionTools.map((tool) => (
          <Card key={tool.title} className="flex flex-col justify-between">
            <CardHeader className="flex-row items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <tool.icon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="font-headline">{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Commencer maintenant <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
