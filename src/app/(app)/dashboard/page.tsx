
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
];

const MotivationHub = () => {
    const [weeklyGoals, setWeeklyGoals] = useState<Goal[]>(initialWeeklyGoals);
    const [isSaturday, setIsSaturday] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [tempGoals, setTempGoals] = useState<Goal[]>([]);

    useEffect(() => {
        const today = new Date();
        // Day 6 is Saturday
        if (today.getDay() === 6) {
            setIsSaturday(true);
        }
    }, []);

    const handleGoalChange = (index: number, newLabel: string) => {
        const updatedGoals = [...tempGoals];
        updatedGoals[index].label = newLabel;
        setTempGoals(updatedGoals);
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
    
    const handleGoalCompletion = (goalId: string) => {
      setWeeklyGoals(weeklyGoals.map(goal => 
        goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
      ));
    };

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
                                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${goal.completed ? 'text-muted-foreground line-through' : ''}`}
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
                            selected={new Date()}
                            locale={fr}
                            className="w-full border-0 shadow-none"
                            classNames={{
                                months: "w-full",
                                month: "w-full",
                                table: "w-full",
                                head_row: "w-full",
                                row: "w-full",
                            }}
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
                                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${item.completed ? 'text-muted-foreground line-through' : ''}`}
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
