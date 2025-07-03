"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { format, isPast, differenceInDays } from 'date-fns';
import ConclusionGenerator from '@/components/courses/conclusion-generator';

const mockCourses = {
  cs101: {
    title: 'Introduction to Computer Science',
    notes: 'This course covers the foundational concepts of programming using Python. We explored variables, data types, control flow, and basic data structures. The midterm focused on loops and functions, while the final project involved building a small application.',
    assignments: [
      { id: '1', title: 'Hello World in Python', dueDate: '2024-08-15', completed: true },
      { id: '2', title: 'FizzBuzz Implementation', dueDate: '2024-08-22', completed: true },
      { id: '3', title: 'Simple Calculator App', dueDate: '2024-09-01', completed: false },
    ],
  },
  ds202: {
    title: 'Data Structures and Algorithms',
    notes: 'Key topics include arrays, linked lists, stacks, queues, trees, and graphs. We also analyzed algorithm complexity using Big O notation. The practical assignments involved implementing these data structures from scratch.',
    assignments: [
      { id: '1', title: 'Implement a Linked List', dueDate: '2024-09-10', completed: true },
      { id: '2', title: 'Binary Search Tree', dueDate: '2024-09-24', completed: false },
      { id: '3', title: 'Graph Traversal (BFS, DFS)', dueDate: '2024-10-05', completed: false },
    ],
  },
  db303: {
    title: 'Database Systems',
    notes: 'Focus on relational model, SQL, normalization, and transaction management. We used PostgreSQL for our projects. Covered ER diagrams for database design.',
    assignments: [
      { id: '1', title: 'ER Diagram for a University', dueDate: '2024-08-30', completed: true },
      { id: '2', title: 'SQL Queries Practice', dueDate: '2024-09-15', completed: true },
    ],
  },
  os404: {
    title: 'Operating Systems',
    notes: 'Studied process management, scheduling algorithms, memory management techniques like paging and segmentation, and file systems. Learned about concurrency and deadlocks.',
    assignments: [
        { id: '1', title: 'Process Scheduler Simulation', dueDate: '2024-10-01', completed: false },
        { id: '2', title: 'Memory Manager Implementation', dueDate: '2024-10-15', completed: false },
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
        return <Badge variant="destructive">Overdue</Badge>
    }
    if (daysUntil <= 3) {
        return <Badge variant="destructive" className="bg-amber-500 hover:bg-amber-600 text-white">Due in {daysUntil+1} day(s)</Badge>
    }
    return <Badge variant="secondary">Due on {format(date, 'MMM d')}</Badge>
}

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as keyof typeof mockCourses;
  const course = mockCourses[courseId] || { title: 'Course Not Found', notes: '', assignments: [] };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="notes" className="w-full">
          <TabsList>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="conclusion">Conclusion AI</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notes" className="mt-4">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Course Notes</CardTitle>
                    <CardDescription>A summary of the topics covered in this course.</CardDescription>
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
                    <CardTitle className="font-headline text-xl">Homework & Deadlines</CardTitle>
                    <CardDescription>Keep track of your assignments.</CardDescription>
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
