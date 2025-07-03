import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Puzzle, Layers, GraduationCap } from 'lucide-react';

const revisionTools = [
  {
    title: 'Interactive Quizzes',
    description: 'Test your knowledge with quizzes tailored to your courses.',
    icon: Puzzle,
    link: '#',
  },
  {
    title: 'Flashcards',
    description: 'Create and review flashcards for key concepts and definitions.',
    icon: Layers,
    link: '#',
  },
  {
    title: 'Exam Tips',
    description: 'Get AI-powered advice and strategies to ace your exams.',
    icon: GraduationCap,
    link: '#',
  },
];

export default function RevisionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Revision Zone</h1>
        <p className="text-muted-foreground">Sharpen your skills and prepare for success.</p>
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
                Start Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
