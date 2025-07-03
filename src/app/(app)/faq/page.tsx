"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { explainConcept } from '@/ai/flows/ai-faq';
import { Loader2, Lightbulb, Sparkles } from 'lucide-react';

export default function FaqPage() {
    const [concept, setConcept] = useState('');
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!concept.trim()) {
            toast({
                variant: 'destructive',
                title: 'Le concept est vide',
                description: "Veuillez saisir un concept informatique à expliquer."
            });
            return;
        }

        setIsLoading(true);
        setExplanation('');
        try {
            const result = await explainConcept({ concept });
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
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <Lightbulb className="h-8 w-8" />
                        </div>
                        <div>
                            <CardTitle className="font-headline text-3xl">FAQ alimentée par l'IA</CardTitle>
                            <CardDescription>Bloqué sur un concept ? Obtenez une explication claire de votre tuteur IA.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                        <Input
                            placeholder="ex: 'Notation Big O', 'Polymorphisme', 'DNS'"
                            value={concept}
                            onChange={(e) => setConcept(e.target.value)}
                            disabled={isLoading}
                        />
                        <Button type="submit" disabled={isLoading} className="sm:w-auto w-full">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {isLoading ? 'Réflexion...' : 'Expliquer'}
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

                    {explanation && (
                         <Card className="mt-6 bg-background">
                            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                                <Sparkles className="h-6 w-6 text-primary"/>
                                <CardTitle className="font-headline text-2xl text-primary">{concept}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground whitespace-pre-wrap">{explanation}</p>
                            </CardContent>
                        </Card>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
