"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Lightbulb, Target, CheckCircle } from 'lucide-react';

const MotivationHub = () => {
    const weeklyGoals = [
        { id: 'goal1', label: 'Finish Data Structures assignment', completed: true },
        { id: 'goal2', label: 'Review lecture notes for Algorithms', completed: false },
        { id: 'goal3', label: 'Start research for final project', completed: false },
        { id: 'goal4', label: 'Prepare for Friday\'s quiz', completed: true },
    ];

    const progressChecklist = [
        { id: 'check1', label: 'Complete daily coding challenge', completed: true },
        { id: 'check2', label: 'Read one chapter of "Clean Code"', completed: false },
        { id: 'check3', label: 'Organize study materials', completed: true },
    ];

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-3 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2"><Lightbulb />Quote of the Day</CardTitle>
                </CardHeader>
                <CardContent>
                    <blockquote className="text-xl italic">
                        "The best way to predict the future is to invent it."
                    </blockquote>
                    <p className="text-right mt-2 opacity-80">- Alan Kay</p>
                </CardContent>
            </Card>

            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><Target />Weekly Goals</CardTitle>
                    <CardDescription>Stay on track with your objectives for this week.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {weeklyGoals.map((goal) => (
                        <div key={goal.id} className="flex items-center space-x-3 p-3 rounded-md bg-background hover:bg-secondary transition-colors">
                            <Checkbox id={goal.id} defaultChecked={goal.completed} />
                            <label
                                htmlFor={goal.id}
                                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${goal.completed ? 'line-through text-muted-foreground' : ''}`}
                            >
                                {goal.label}
                            </label>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><CheckCircle />Daily Progress</CardTitle>
                    <CardDescription>Small steps lead to big achievements.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     {progressChecklist.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3 p-3 rounded-md bg-background hover:bg-secondary transition-colors">
                            <Checkbox id={item.id} defaultChecked={item.completed} />
                            <label
                                htmlFor={item.id}
                                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${item.completed ? 'line-through text-muted-foreground' : ''}`}
                            >
                                {item.label}
                            </label>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default MotivationHub;
