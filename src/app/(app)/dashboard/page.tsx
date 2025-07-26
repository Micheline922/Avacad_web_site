"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Target, CheckCircle } from 'lucide-react';

const MotivationHub = () => {
    const weeklyGoals = [
        { id: 'goal1', label: 'Terminer le devoir de Structures de Données', completed: true },
        { id: 'goal2', label: 'Réviser les notes de cours pour Algorithmes', completed: false },
        { id: 'goal3', label: 'Commencer la recherche pour le projet final', completed: false },
        { id: 'goal4', label: "Se préparer pour le quiz de vendredi", completed: true },
    ];

    const progressChecklist = [
        { id: 'check1', label: 'Terminer le défi de codage quotidien', completed: true },
        { id: 'check2', label: 'Lire un chapitre de "Clean Code"', completed: false },
        { id: 'check3', label: "Organiser le matériel d'étude", completed: true },
    ];

    return (
        <div className="grid gap-8 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><Target />Objectifs de la semaine</CardTitle>
                    <CardDescription>Restez sur la bonne voie avec vos objectifs pour cette semaine.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {weeklyGoals.map((goal) => (
                        <div key={goal.id} className="flex items-center space-x-3 p-3 rounded-md bg-background hover:bg-secondary transition-colors">
                            <Checkbox id={goal.id} defaultChecked={goal.completed} />
                            <label
                                htmlFor={goal.id}
                                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${goal.completed ? 'text-muted-foreground' : ''}`}
                            >
                                {goal.label}
                            </label>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><CheckCircle />Progrès quotidiens</CardTitle>
                    <CardDescription>Les petits pas mènent à de grandes réalisations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     {progressChecklist.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3 p-3 rounded-md bg-background hover:bg-secondary transition-colors">
                            <Checkbox id={item.id} defaultChecked={item.completed} />
                            <label
                                htmlFor={item.id}
                                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${item.completed ? 'text-muted-foreground' : ''}`}
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
