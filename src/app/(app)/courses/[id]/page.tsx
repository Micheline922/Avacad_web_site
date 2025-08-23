
"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import ConclusionGenerator from '@/components/courses/conclusion-generator';
import AiTutor from '@/components/courses/ai-tutor';
import QuizComponent from '@/components/courses/quiz-component';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Chronometre from '@/components/chronometre';
import { Timer } from 'lucide-react';
import { getCourseById, Course, Chapter } from '@/lib/courses';
import { useCourseContext } from '@/context/course-context';

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const { courses } = useCourseContext();
  
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const courseData = courses.find(c => c.id === courseId) || getCourseById(courseId) || null;
    setCourse(courseData);
  }, [courseId, courses]);

  if (!course) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Cours non trouvé</CardTitle>
                <CardDescription>Désolé, nous n'avons pas pu trouver les détails pour ce cours.</CardDescription>
            </CardHeader>
        </Card>
    );
  }

  const fullCourseContentForAI = Array.isArray(course.notes) ? course.notes.map((c: Chapter) => `Chapitre: ${c.title}\nContenu: ${c.content}`).join('\n\n') : '';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="notes" className="w-full">
          <TabsList>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="quiz">Quiz IA</TabsTrigger>
            <TabsTrigger value="tutor">Tuteur IA</TabsTrigger>
            <TabsTrigger value="conclusion">Conclusion IA</TabsTrigger>
            <TabsTrigger value="chronometre">Chronomètre</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notes" className="mt-4">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Notes de cours</CardTitle>
                    <CardDescription>Développez les chapitres pour voir le contenu du cours.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-96 pr-4">
                       <Accordion type="single" collapsible className="w-full">
                        {Array.isArray(course.notes) && course.notes.map((chapter: Chapter, index: number) => (
                          <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="font-headline text-lg hover:no-underline">{chapter.title}</AccordionTrigger>
                            <AccordionContent>
                              <p className="text-muted-foreground whitespace-pre-wrap">{chapter.content}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </ScrollArea>
                </CardContent>
             </Card>
          </TabsContent>
          
          <TabsContent value="quiz" className="mt-4">
            <QuizComponent 
                courseId={course.id} 
                courseName={course.title} 
                courseContent={fullCourseContentForAI} 
            />
          </TabsContent>
          
          <TabsContent value="tutor" className="mt-4">
            <AiTutor courseContext={fullCourseContentForAI} />
          </TabsContent>

          <TabsContent value="conclusion" className="mt-4">
             <ConclusionGenerator courseName={course.title} initialContent={fullCourseContentForAI} />
          </TabsContent>

          <TabsContent value="chronometre" className="mt-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <Timer className="h-8 w-8" />
                        </div>
                        <div>
                            <CardTitle className="font-headline text-3xl">Chronomètre</CardTitle>
                            <CardDescription>Boostez votre productivité avec le chronomètre pour ce cours.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Chronometre courseId={course.id} />
                </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </CardContent>
    </Card>
  );
}
