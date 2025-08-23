
"use client";

import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useChronometre } from '@/context/chronometre-context';

type Mode = 'work' | 'shortBreak' | 'longBreak';

interface ChronometreProps {
  courseId: string;
}

const Chronometre: React.FC<ChronometreProps> = ({ courseId }) => {
    const { 
      time, 
      mode, 
      isActive, 
      pomodoros,
      times,
      toggleTimer, 
      resetTimer,
      switchMode,
      startTimerForCourse
    } = useChronometre();

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // This ensures the audio object is available on the client
        if (!audioRef.current) {
            audioRef.current = new Audio('/notification.mp3');
            audioRef.current.preload = 'auto';
        }
    }, []);

    useEffect(() => {
      startTimerForCourse(courseId);
    }, [courseId, startTimerForCourse]);

    useEffect(() => {
      if (time === 0 && isActive) {
        audioRef.current?.play().catch(e => console.error("Error playing audio:", e));
      }
    }, [time, isActive]);

    const handleToggle = () => {
        toggleTimer(courseId);
    };
    
    const handleReset = () => {
        resetTimer(courseId);
    };

    const handleSwitchMode = (newMode: Mode) => {
        switchMode(newMode, courseId);
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-background p-6 rounded-lg border flex flex-col items-center">
            <Tabs defaultValue="work" value={mode} onValueChange={(value) => handleSwitchMode(value as Mode)} className="mb-8">
                <TabsList>
                    <TabsTrigger value="work">Travail</TabsTrigger>
                    <TabsTrigger value="shortBreak">Pause Courte</TabsTrigger>
                    <TabsTrigger value="longBreak">Pause Longue</TabsTrigger>
                </TabsList>
            </Tabs>
            
            <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <svg className="absolute inset-0" viewBox="0 0 100 100">
                    <circle className="text-secondary" strokeWidth="7" cx="50" cy="50" r="45" fill="transparent"/>
                    <circle 
                        className="text-primary" 
                        strokeWidth="7" 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 45}
                        strokeDashoffset={2 * Math.PI * 45 * (1 - time / times[mode])}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                        style={{ transition: 'stroke-dashoffset 1s linear' }}
                    />
                </svg>
                <span className="relative font-mono text-5xl font-bold">{formatTime(time)}</span>
            </div>

            <div className="flex items-center gap-4">
                <Button onClick={handleToggle} size="lg" className="w-32">
                    {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                    {isActive ? 'Pause' : 'Démarrer'}
                </Button>
                <Button onClick={handleReset} variant="outline" size="lg" className="p-3">
                    <RotateCcw />
                </Button>
            </div>
            
            <p className="text-muted-foreground mt-6 text-sm">Cycles terminés : {pomodoros}</p>

        </div>
    );
};

export default Chronometre;
