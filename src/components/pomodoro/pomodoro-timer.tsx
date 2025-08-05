"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw } from 'lucide-react';

type Mode = 'work' | 'shortBreak' | 'longBreak';

const PomodoroTimer: React.FC = () => {
    const [mode, setMode] = useState<Mode>('work');
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [pomodoros, setPomodoros] = useState(0);

    const audioRef = useRef<HTMLAudioElement>(null);
    
    const times: Record<Mode, number> = {
        work: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60,
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime(t => t - 1);
            }, 1000);
        } else if (time === 0) {
            if (audioRef.current) {
                audioRef.current.play();
            }
            if (mode === 'work') {
                const newPomodoros = pomodoros + 1;
                setPomodoros(newPomodoros);
                switchMode(newPomodoros % 4 === 0 ? 'longBreak' : 'shortBreak');
            } else {
                switchMode('work');
            }
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, time]);
    
    const switchMode = (newMode: Mode) => {
        setIsActive(false);
        setMode(newMode);
        setTime(times[newMode]);
    };

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTime(times[mode]);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-background p-6 rounded-lg border flex flex-col items-center">
            <Tabs defaultValue="work" value={mode} onValueChange={(value) => switchMode(value as Mode)} className="mb-8">
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
                <Button onClick={toggleTimer} size="lg" className="w-32">
                    {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                    {isActive ? 'Pause' : 'Démarrer'}
                </Button>
                <Button onClick={resetTimer} variant="outline" size="lg" className="p-3">
                    <RotateCcw />
                </Button>
            </div>
            
            <p className="text-muted-foreground mt-6 text-sm">Cycles terminés : {pomodoros}</p>

            <audio ref={audioRef} src="/notification.mp3" preload="auto" />
        </div>
    );
};

export default PomodoroTimer;
