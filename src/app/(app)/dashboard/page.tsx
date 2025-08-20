
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Target, CheckCircle, Edit, Rocket, BookOpen, BrainCircuit, Lightbulb } from 'lucide-react';
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

const initialDailyProgress: Goal[] = [
    { id: 'check1', label: 'Terminer le défi de codage quotidien', completed: true },
    { id: 'check2', label: 'Lire un chapitre de "Clean Code"', completed: false },
    { id: 'check3', label: "Organiser le matériel d'étude", completed: true },
];

const tourSteps = [
    {
      icon: Rocket,
      title: "Bienvenue sur Avacad !",
      description: "Votre nouvel assistant académique. Suivez cette courte visite pour découvrir comment tirer le meilleur parti de la plateforme."
    },
    {
      icon: Target,
      title: "Votre Tableau de Bord",
      description: "C'est votre centre de commande. Suivez vos objectifs hebdomadaires et vos progrès quotidiens pour rester organisé et motivé."
    },
    {
      icon: BookOpen,
      title: "Accédez à vos Cours",
      description: "La section 'Cours' contient tout votre matériel d'étude, vos notes et vos devoirs. Vous y trouverez aussi des outils pour vous aider à réviser."
    },
    {
      icon: BrainCircuit,
      title: "Utilisez les Outils IA",
      description: "Bloqué sur un concept ? Besoin de conseils pour un examen ? La 'FAQ IA' et les 'Conseils d'examen' sont là pour vous aider à tout moment."
    }
  ];
  
const OnboardingTour = ({ onComplete }: { onComplete: () => void }) => {
    const [step, setStep] = useState(0);
    const CurrentIcon = tourSteps[step].icon;

    const handleNext = () => {
        if (step < tourSteps.length - 1) {
            setStep(step + 1);
        } else {
            onComplete();
        }
    };

    return (
        <Dialog open onOpenChange={(isOpen) => !isOpen && onComplete()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="items-center text-center">
                    <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                        <CurrentIcon className="h-8 w-8" />
                    </div>
                    <DialogTitle className="font-headline text-2xl">{tourSteps[step].title}</DialogTitle>
                    <DialogDescription className="mt-2 text-base">
                        {tourSteps[step].description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4 sm:justify-center">
                     <Button onClick={handleNext}>
                        {step < tourSteps.length - 1 ? "Suivant" : "Commencer"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const MotivationHub = () => {
    const [weeklyGoals, setWeeklyGoals] = useState<Goal[]>(initialWeeklyGoals);
    const [dailyProgress, setDailyProgress] = useState<Goal[]>(initialDailyProgress);
    
    const [isWeeklyGoalsDialogOpen, setIsWeeklyGoalsDialogOpen] = useState(false);
    const [isDailyProgressDialogOpen, setIsDailyProgressDialogOpen] = useState(false);
    
    const [tempWeeklyGoals, setTempWeeklyGoals] = useState<Goal[]>([]);
    const [tempDailyProgress, setTempDailyProgress] = useState<Goal[]>([]);

    const [date, setDate] = useState<Date | undefined>(undefined);

    const [showTour, setShowTour] = useState(false);

    useEffect(() => {
        const hasSeenTour = localStorage.getItem('hasSeenAvacadTour');
        if (!hasSeenTour) {
            setShowTour(true);
        }
    }, []);

    const handleTourComplete = () => {
        localStorage.setItem('hasSeenAvacadTour', 'true');
        setShowTour(false);
    };

    useEffect(() => {
        setDate(new Date());
    }, []);

    const handleGoalChange = (goals: Goal[], setGoals: React.Dispatch<React.SetStateAction<Goal[]>>, index: number, newLabel: string) => {
        const updatedGoals = [...goals];
        updatedGoals[index].label = newLabel;
        setGoals(updatedGoals);
    };
    
    const handleCompletionChange = (goals: Goal[], setGoals: React.Dispatch<React.SetStateAction<Goal[]>>, goalId: string) => {
      setGoals(goals.map(goal => 
        goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
      ));
    };

    const openEditDialog = (type: 'weekly' | 'daily') => {
        if (type === 'weekly') {
            setTempWeeklyGoals([...weeklyGoals]);
            setIsWeeklyGoalsDialogOpen(true);
        } else {
            setTempDailyProgress([...dailyProgress]);
            setIsDailyProgressDialogOpen(true);
        }
    };

    const saveGoals = (type: 'weekly' | 'daily') => {
        if (type === 'weekly') {
            setWeeklyGoals(tempWeeklyGoals);
            setIsWeeklyGoalsDialogOpen(false);
        } else {
            setDailyProgress(tempDailyProgress);
            setIsDailyProgressDialogOpen(false);
        }
    };
    
    return (
        <>
            {showTour && <OnboardingTour onComplete={handleTourComplete} />}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="font-headline flex items-center gap-2"><Target />Objectifs de la semaine</CardTitle>
                                <CardDescription>Restez sur la bonne voie avec vos objectifs pour cette semaine.</CardDescription>
                            </div>
                            <Dialog open={isWeeklyGoalsDialogOpen} onOpenChange={setIsWeeklyGoalsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" onClick={() => openEditDialog('weekly')}>
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
                                        {tempWeeklyGoals.map((goal, index) => (
                                            <Input
                                                key={goal.id}
                                                value={goal.label}
                                                onChange={(e) => handleGoalChange(tempWeeklyGoals, setTempWeeklyGoals, index, e.target.value)}
                                            />
                                        ))}
                                    </div>
                                    <DialogFooter>
                                        <Button variant="secondary" onClick={() => setIsWeeklyGoalsDialogOpen(false)}>Annuler</Button>
                                        <Button onClick={() => saveGoals('weekly')}>Sauvegarder</Button>
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
                                    onCheckedChange={() => handleCompletionChange(weeklyGoals, setWeeklyGoals, goal.id)}
                                />
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

                <div className="space-y-8">
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Calendrier</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                           {date && <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                locale={fr}
                                className="rounded-md"
                                numberOfMonths={1}
                            />}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-3 grid gap-8 md:grid-cols-2">
                     <Card>
                        <CardHeader>
                             <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="font-headline flex items-center gap-2"><CheckCircle />Progrès quotidiens</CardTitle>
                                    <CardDescription>Les petits pas mènent à de grandes réalisations.</CardDescription>
                                </div>
                                 <Dialog open={isDailyProgressDialogOpen} onOpenChange={setIsDailyProgressDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" onClick={() => openEditDialog('daily')}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Modifier
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Modifier les progrès quotidiens</DialogTitle>
                                            <DialogDescription>
                                                Mettez à jour vos tâches pour aujourd'hui.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                            {tempDailyProgress.map((goal, index) => (
                                                <Input
                                                    key={goal.id}
                                                    value={goal.label}
                                                    onChange={(e) => handleGoalChange(tempDailyProgress, setTempDailyProgress, index, e.target.value)}
                                                />
                                            ))}
                                        </div>
                                        <DialogFooter>
                                            <Button variant="secondary" onClick={() => setIsDailyProgressDialogOpen(false)}>Annuler</Button>
                                            <Button onClick={() => saveGoals('daily')}>Sauvegarder</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             {dailyProgress.map((item) => (
                                <div key={item.id} className="flex items-center space-x-3 p-3 rounded-md bg-background hover:bg-secondary transition-colors">
                                    <Checkbox 
                                        id={item.id} 
                                        checked={item.completed} 
                                        onCheckedChange={() => handleCompletionChange(dailyProgress, setDailyProgress, item.id)}
                                    />
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
                     <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg flex flex-col">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl flex items-center gap-2"><Lightbulb />Citation du jour</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-grow justify-center">
                            <blockquote className="text-xl italic">
                                "La connaissance s'acquiert par l'expérience, tout le reste n'est que de l'information."
                            </blockquote>
                            <p className="text-right mt-2 opacity-80">- Albert Einstein</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default MotivationHub;

    