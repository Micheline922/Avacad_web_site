
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from 'react';
import { useCourseContext } from './course-context';

type Mode = 'work' | 'shortBreak' | 'longBreak';

interface ChronometreContextType {
  time: number;
  mode: Mode;
  isActive: boolean;
  pomodoros: number;
  activeCourseId: string | null;
  times: Record<Mode, number>;
  toggleTimer: (courseId: string) => void;
  resetTimer: (courseId: string) => void;
  switchMode: (newMode: Mode, courseId: string) => void;
  startTimerForCourse: (courseId: string) => void;
}

const ChronometreContext = createContext<ChronometreContextType | undefined>(undefined);

const WORK_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

export function ChronometreProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<Mode>('work');
    const [time, setTime] = useState(WORK_TIME);
    const [isActive, setIsActive] = useState(false);
    const [pomodoros, setPomodoros] = useState(0);
    const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const { addStudyTime } = useCourseContext();

    const times: Record<Mode, number> = {
        work: WORK_TIME,
        shortBreak: SHORT_BREAK_TIME,
        longBreak: LONG_BREAK_TIME,
    };
    
    const stopInterval = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startInterval = useCallback(() => {
        stopInterval();
        intervalRef.current = setInterval(() => {
            setTime(t => t - 1);
        }, 1000);
    }, [stopInterval]);

    const switchMode = useCallback((newMode: Mode, courseId: string) => {
        setIsActive(false);
        setMode(newMode);
        setTime(times[newMode]);
        setActiveCourseId(courseId);
    }, [times]);

    useEffect(() => {
        if (isActive) {
            startInterval();
        } else {
            stopInterval();
        }
        return stopInterval;
    }, [isActive, startInterval, stopInterval]);

    useEffect(() => {
        if (time === 0 && activeCourseId) {
            if (mode === 'work') {
                addStudyTime(activeCourseId, times.work);
                const newPomodoros = pomodoros + 1;
                setPomodoros(newPomodoros);
                switchMode(newPomodoros % 4 === 0 ? 'longBreak' : 'shortBreak', activeCourseId);
            } else { // shortBreak or longBreak
                switchMode('work', activeCourseId);
            }
        }
    }, [time, activeCourseId, mode, pomodoros, addStudyTime, times.work, switchMode]);


    const toggleTimer = (courseId: string) => {
        if (activeCourseId && activeCourseId !== courseId) {
            // Timer is running for another course, so reset and start for this one
             switchMode('work', courseId);
             setIsActive(true);
        } else {
            setActiveCourseId(courseId);
            setIsActive(!isActive);
        }
    };

    const resetTimer = (courseId: string) => {
        setIsActive(false);
        setTime(times[mode]);
        setActiveCourseId(courseId);
    };

    const startTimerForCourse = useCallback((courseId: string) => {
        if (activeCourseId !== courseId) {
           // Reset to default state for the new course page if no timer is active
           if (!isActive) {
              setMode('work');
              setTime(times.work);
              setPomodoros(0);
           }
        }
    }, [activeCourseId, isActive, times.work]);


    return (
        <ChronometreContext.Provider value={{ time, mode, isActive, pomodoros, activeCourseId, times, toggleTimer, resetTimer, switchMode, startTimerForCourse }}>
            {children}
        </ChronometreContext.Provider>
    );
}

export function useChronometre() {
    const context = useContext(ChronometreContext);
    if (context === undefined) {
        throw new Error('useChronometre must be used within a ChronometreProvider');
    }
    return context;
}
