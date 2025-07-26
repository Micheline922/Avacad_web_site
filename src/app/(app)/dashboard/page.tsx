
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Target, CheckCircle, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { fr } from 'date-fns/locale';

interface Goal {
    id: string;
    label: string;
    completed: boolean;
}

const initialWeeklyGoals: Goal[] = [
    { id: 'goal1', label: 'Terminer le devoir de Structures de Données', completed: true },
    { id: 'goal2', label: 'Réviser les notes de cours pour Algorithmes', completed: false },
    { id: 'goal3', label: 'Commencer la recherche pour le projet final', completed: false },
    { id: 'goal4', label: "Se préparer pour le quiz de vendredi", completed: true },
    { id: 'goal5', label: "Planifier la semaine d'étude", completed: true },
    { id: 'goal6', label: "Participer au groupe d'étude de Droit Civil", completed: false },
];

const MotivationHub = () => {
    const [weeklyGoals, setWeeklyGoals] = useState<Goal[]>(initialWeeklyGoals);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [tempGoals, setTempGoals] = useState<Goal[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date('2025-07-27T00:00:00'));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(prevDate => {
                const newDate = new Date(prevDate);
                newDate.setDate(newDate.getDate() + 1);
                return newDate;
            });
        }, 24 * 60 * 60 * 1000); // Mettre à jour toutes les 24 heures

        return () => clearInterval(interval);
    }, []);

    const isSaturday = currentDate.getDay() === 6;

    const handleGoalChange = (index: number, newLabel: string) => {
        const updatedGoals = [...tempGoals];
        updatedGoals[index].label = newLabel;
        setTempGoals(updatedGoals);
    };
    
    const handleGoalCompletion = (goalId: string) => {
      setWeeklyGoals(weeklyGoals.map(goal => 
        goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
      ));
    };

    const openEditDialog = () => {
        setTempGoals([...weeklyGoals]);
        setIsDialogOpen(true);
    };

    const saveGoals = () => {
        setWeeklyGoals(tempGoals);
        setIsDialogOpen(false);
    };

    const progressChecklist = [
        { id: 'check1', label: 'Terminer le défi de codage quotidien', completed: true },
        { id: 'check2', label: 'Lire un chapitre de "Clean Code"', completed: false },
        { id: 'check3', label: "Organiser le matériel d'étude", completed: true },
    ];

    const sundayMatcher = { dayOfWeek: 0 };
    const sundayStyle = { color: 'hsl(var(--primary))', fontWeight: 'bold' };

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="font-headline flex items-center gap-2"><Target />Objectifs de la semaine</CardTitle>
                            <CardDescription>Restez sur la bonne voie avec vos objectifs pour cette semaine.</CardDescription>
                        </div>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" disabled={!isSaturday} onClick={openEditDialog}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Modifier
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Modifier les objectifs de la semaine</DialogTitle>
                                    <DialogDescription>
                                        Mettez à jour vos objectifs pour la semaine à venir.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    {tempGoals.map((goal, index) => (
                                        <Input
                                            key={goal.id}
                                            value={goal.label}
                                            onChange={(e) => handleGoalChange(index, e.target.value)}
                                        />
                                    ))}
                                </div>
                                <DialogFooter>
                                    <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
                                    <Button onClick={saveGoals}>Sauvegarder</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {weeklyGoals.map((goal) => (
                        <div key={goal.id} className="flex items-center space-x-3 p-3 rounded-md bg-background hover:bg-secondary transition-colors">
                            <Checkbox 
                                id={goal.id} 
                                checked={goal.completed} 
                                onCheckedChange={() => handleGoalCompletion(goal.id)}
                            />
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

            <div className="space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Calendrier</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center p-0">
                        <Calendar
                            mode="single"
                            selected={currentDate}
                            onSelect={(date) => date && setCurrentDate(date)}
                            month={currentDate}
                            onMonthChange={setCurrentDate}
                            locale={fr}
                            className="p-3"
                            numberOfMonths={1}
                            modifiers={{ sunday: sundayMatcher }}
                            modifiersStyles={{ sunday: sundayStyle }}
                        />
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
        </div>
    );
};

export default MotivationHub;
