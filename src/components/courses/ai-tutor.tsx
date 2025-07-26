
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { explainConceptInContext } from '@/ai/flows/ai-tutor';
import { Loader2, HelpCircle, Sparkles } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface AiTutorProps {
    courseContext: string;
}

export default function AiTutor({ courseContext }: AiTutorProps) {
    const [question, setQuestion] = useState('');
    const [explanation, setExplanation] = useState('');
    const [lastQuestion, setLastQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) {
            toast({
                variant: 'destructive',
                title: 'La question est vide',
                description: "Veuillez saisir une question ou un concept à expliquer."
            });
            return;
        }

        setIsLoading(true);
        setExplanation('');
        setLastQuestion(question);
        try {
            const result = await explainConceptInContext({ concept: question, courseContext });
            setExplanation(result.explanation);
        } catch (error) {
            console.error("Failed to explain concept:", error);
            toast({
                variant: 'destructive',
                title: "Échec de l'explication",
                description: "Une erreur s'est produite lors de la récupération de l'explication."
            });
        } finally {
            setIsLoading(false);
            setQuestion('');
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center gap-2"><HelpCircle /> Tuteur IA</CardTitle>
                <CardDescription>Vous avez une question sur ce cours ? Posez-la à votre tuteur IA.</CardDescription>
            </CardHeader>
            <CardContent>
                 <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6">
                    <Input
                        placeholder="ex: 'Qu'est-ce qu'une boucle for en Python ?'"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading} className="sm:w-auto w-full">
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {isLoading ? 'Réflexion...' : 'Poser une question'}
                    </Button>
                </form>

                {isLoading && (
                     <div className="mt-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                            <div className="h-5 w-1/3 bg-muted rounded animate-pulse"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 bg-muted rounded animate-pulse"></div>
                            <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
                            <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                        </div>
                     </div>
                )}
                
                {!isLoading && !explanation && (
                    <Alert>
                        <AlertTitle className="font-headline">Comment ça marche ?</AlertTitle>
                        <AlertDescription>
                            <ol className="list-decimal list-inside space-y-1 mt-2 text-muted-foreground">
                                <li>Saisissez un concept ou une question liée à ce cours.</li>
                                <li>Cliquez sur <strong>"Poser une question"</strong>.</li>
                                <li>L'IA vous fournira une explication personnalisée en se basant sur le contenu du cours.</li>
                            </ol>
                        </AlertDescription>
                    </Alert>
                )}

                {explanation && !isLoading && (
                     <Card className="mt-6 bg-background">
                        <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                            <Sparkles className="h-6 w-6 text-primary"/>
                            <CardTitle className="font-headline text-2xl text-primary">{lastQuestion}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground whitespace-pre-wrap">{explanation}</p>
                        </CardContent>
                    </Card>
                )}
            </CardContent>
        </Card>
    );
}
