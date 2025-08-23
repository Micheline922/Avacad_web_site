
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateQuiz, GenerateQuizOutput } from '@/ai/flows/quiz-generator';
import { Loader2, Sparkles, Brain, CheckCircle, XCircle, RotateCw } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface QuizComponentProps {
    courseId: string;
    courseName: string;
    courseContent: string;
}

type QuizQuestion = GenerateQuizOutput['questions'][0];

export default function QuizComponent({ courseId, courseName, courseContent }: QuizComponentProps) {
    const [quizData, setQuizData] = useState<GenerateQuizOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const { toast } = useToast();

    const getCacheKey = (cId: string) => `quizData_${cId}`;
    const getCacheDateKey = (cId: string) => `quizDate_${cId}`;

    const getDailyCacheBuster = () => {
        const date = new Date();
        // Change every 2 days
        const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
        return `${date.getFullYear()}-${Math.floor(dayOfYear / 2)}`;
    };

    const fetchQuiz = useCallback(async () => {
        setIsLoading(true);
        try {
            const cacheKey = getCacheKey(courseId);
            const cacheDateKey = getCacheDateKey(courseId);
            
            const cachedData = localStorage.getItem(cacheKey);
            const cachedDate = localStorage.getItem(cacheDateKey);
            const cacheBuster = getDailyCacheBuster();

            if (cachedData && cachedDate === cacheBuster) {
                setQuizData(JSON.parse(cachedData));
            } else {
                const response = await generateQuiz({ courseName, courseContent, cacheBuster });
                setQuizData(response);
                localStorage.setItem(cacheKey, JSON.stringify(response));
                localStorage.setItem(cacheDateKey, cacheBuster);
            }
        } catch (error) {
            console.error("Failed to generate quiz:", error);
            toast({
                variant: 'destructive',
                title: 'La génération du quiz a échoué',
                description: "Une erreur s'est produite lors de la récupération du quiz."
            });
        } finally {
            setIsLoading(false);
        }
    }, [courseId, courseName, courseContent, toast]);

    useEffect(() => {
        fetchQuiz();
    }, [fetchQuiz]);

    const handleAnswerSelect = (answer: string) => {
        if (isAnswered) return;
        setSelectedAnswer(answer);
        setIsAnswered(true);

        if (answer === quizData?.questions[currentQuestionIndex].correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < (quizData?.questions.length ?? 0) - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            setIsFinished(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setScore(0);
        setIsFinished(false);
    };
    
    const forceNewQuiz = () => {
        localStorage.removeItem(getCacheKey(courseId));
        localStorage.removeItem(getCacheDateKey(courseId));
        restartQuiz();
        setQuizData(null);
        fetchQuiz();
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><Brain /> Quiz IA</CardTitle>
                    <CardDescription>Testez vos connaissances sur ce cours.</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4 h-64 flex flex-col justify-center items-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                    <p className="text-muted-foreground">L'IA prépare votre quiz... Veuillez patienter.</p>
                </CardContent>
            </Card>
        );
    }

    if (!quizData || !quizData.questions || quizData.questions.length === 0) {
        return (
            <Card>
                 <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><Brain /> Quiz IA</CardTitle>
                    <CardDescription>Testez vos connaissances sur ce cours.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Alert>
                        <Sparkles className="h-4 w-4" />
                        <AlertTitle className="font-headline">Aucun quiz disponible</AlertTitle>
                        <AlertDescription>
                            Nous n'avons pas pu générer de quiz pour le moment. Veuillez réessayer plus tard.
                             <Button onClick={forceNewQuiz} variant="link" className="p-0 h-auto ml-1">Forcer la génération d'un nouveau quiz.</Button>
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    const currentQuestion: QuizQuestion = quizData.questions[currentQuestionIndex];

    if (isFinished) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><Brain /> Quiz Terminé !</CardTitle>
                    <CardDescription>Voici vos résultats pour le quiz sur "{courseName}".</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-4xl font-bold">Votre score: {score} / {quizData.questions.length}</p>
                    <Progress value={(score / quizData.questions.length) * 100} className="w-full" />
                    <div className="flex gap-4 justify-center">
                         <Button onClick={restartQuiz}><RotateCw className="mr-2" /> Recommencer</Button>
                         <Button onClick={forceNewQuiz} variant="outline">Nouveau Quiz</Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                 <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="font-headline text-xl flex items-center gap-2"><Brain /> Quiz IA sur "{courseName}"</CardTitle>
                        <CardDescription>Question {currentQuestionIndex + 1} sur {quizData.questions.length}</CardDescription>
                    </div>
                    <Button onClick={forceNewQuiz} size="sm" variant="outline">Nouveau Quiz</Button>
                 </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <Progress value={((currentQuestionIndex + 1) / quizData.questions.length) * 100} className="w-full" />
                
                <p className="text-lg font-semibold">{currentQuestion.question}</p>

                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                        const isCorrect = option === currentQuestion.correctAnswer;
                        const isSelected = option === selectedAnswer;
                        
                        return (
                            <Button
                                key={index}
                                variant="outline"
                                className={cn(
                                    "w-full justify-start h-auto py-3 text-left whitespace-normal",
                                    isAnswered && isCorrect && "bg-green-100 border-green-500 text-green-800 hover:bg-green-200",
                                    isAnswered && isSelected && !isCorrect && "bg-red-100 border-red-500 text-red-800 hover:bg-red-200"
                                )}
                                onClick={() => handleAnswerSelect(option)}
                                disabled={isAnswered}
                            >
                                <span className="flex-1">{option}</span>
                                {isAnswered && isCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                                {isAnswered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-600" />}
                            </Button>
                        );
                    })}
                </div>

                {isAnswered && (
                     <Alert variant={selectedAnswer === currentQuestion.correctAnswer ? "default" : "destructive"} className={cn(selectedAnswer === currentQuestion.correctAnswer ? "border-green-300 bg-green-50" : "")}>
                         {selectedAnswer === currentQuestion.correctAnswer ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        <AlertTitle className="font-headline">{selectedAnswer === currentQuestion.correctAnswer ? "Bonne réponse !" : "Mauvaise réponse"}</AlertTitle>
                        <AlertDescription>
                            {selectedAnswer !== currentQuestion.correctAnswer && `La bonne réponse était : ${currentQuestion.correctAnswer}`}
                        </AlertDescription>
                     </Alert>
                )}

                <div className="text-right">
                    <Button onClick={handleNextQuestion} disabled={!isAnswered}>
                        {currentQuestionIndex < quizData.questions.length - 1 ? "Question suivante" : "Terminer le quiz"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
