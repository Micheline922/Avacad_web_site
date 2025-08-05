import React from 'react';
import PomodoroTimer from '@/components/pomodoro/pomodoro-timer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Timer } from 'lucide-react';

export default function PomodoroPage() {
    return (
        <div className="flex justify-center items-start h-full">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <Timer className="h-8 w-8" />
                        </div>
                        <div>
                            <CardTitle className="font-headline text-3xl">Horloge Pomodoro</CardTitle>
                            <CardDescription>Boostez votre productivité avec la technique Pomodoro.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <PomodoroTimer />
                </CardContent>
            </Card>
        </div>
    );
}
