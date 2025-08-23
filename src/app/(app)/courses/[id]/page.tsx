
"use client";

import React, { useEffect, useState } from 'react';
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Chronometre from '@/components/chronometre';
import { Timer, Edit } from 'lucide-react';
import { getCourseById, Course, Chapter, Assignment } from '@/lib/courses';
import { useCourseContext } from '@/context/course-context';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';

const DueDateBadge = ({ dueDate }: { dueDate: string }) => {
    const date = new Date(dueDate);
    const now = new Date();
    const daysUntil = differenceInDays(date, now);
    
    if (!isPast(date) && daysUntil <= 3) {
        return <Badge variant="destructive" className="bg-amber-500 hover:bg-amber-600 text-white">À rendre dans {daysUntil+1} jour(s)</Badge>
    }
    return <Badge variant="secondary">À rendre le {format(date, 'd MMM', { locale: fr })}</Badge>
}


const EditAssignmentDialog = ({ assignment, courseId }: { assignment: Assignment; courseId: string }) => {
    const { updateAssignmentDetails } = useCourseContext();
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(assignment.title);
    const [dueDate, setDueDate] = useState<Date | undefined>(new Date(assignment.dueDate));

    const handleSave = () => {
        if (title && dueDate) {
            updateAssignmentDetails(courseId, assignment.id, {
                title,
                dueDate: dueDate.toISOString(),
            });
            setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Modifier le devoir</DialogTitle>
                    <DialogDescription>
                        Mettez à jour les détails de votre devoir.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Titre
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="dueDate" className="text-right">
                            Échéance
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !dueDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dueDate ? format(dueDate, 'PPP', { locale: fr }) : <span>Choisissez une date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={dueDate}
                                    onSelect={setDueDate}
                                    initialFocus
                                    locale={fr}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>Annuler</Button>
                    <Button onClick={handleSave}>Sauvegarder</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const { courses, updateAssignmentCompletion } = useCourseContext();
  
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const courseData = courses.find(c => c.id === courseId) || null;
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
            <TabsTrigger value="assignments">Devoirs</TabsTrigger>
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
                            <Checkbox 
                              id={`assign-${assignment.id}`} 
                              checked={assignment.completed}
                              onCheckedChange={(checked) => updateAssignmentCompletion(course.id, assignment.id, !!checked)}
                            />
                            <label
                                htmlFor={`assign-${assignment.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {assignment.title}
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                           <DueDateBadge dueDate={assignment.dueDate} />
                           <EditAssignmentDialog assignment={assignment} courseId={course.id} />
                        </div>
                    </div>
                    ))}
                </CardContent>
            </Card>
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
