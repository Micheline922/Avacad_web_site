"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateCourseConclusion } from '@/ai/flows/course-conclusion-generator';
import { Loader2, Wand2, Sparkles } from 'lucide-react';

interface ConclusionGeneratorProps {
    courseName: string;
    initialContent?: string;
}

export default function ConclusionGenerator({ courseName, initialContent = '' }: ConclusionGeneratorProps) {
    const [slideContent, setSlideContent] = useState(initialContent);
    const [conclusion, setConclusion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleGenerate = async () => {
        if (!slideContent.trim()) {
            toast({
                variant: 'destructive',
                title: 'Le contenu est vide',
                description: 'Veuillez fournir du contenu de diapositive pour générer une conclusion.'
            });
            return;
        }

        setIsLoading(true);
        setConclusion('');
        try {
            const result = await generateCourseConclusion({ courseName, slideContent });
            setConclusion(result.conclusion);
            toast({
                title: 'Conclusion générée !',
                description: "L'IA a résumé le matériel de votre cours.",
            });
        } catch (error) {
            console.error("Failed to generate conclusion:", error);
            toast({
                variant: 'destructive',
                title: 'La génération a échoué',
                description: "Une erreur s'est produite lors de la génération de la conclusion."
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-xl">Générateur de conclusion de cours</CardTitle>
                <CardDescription>Laissez l'IA résumer les diapositives de votre cours en une conclusion concise.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label htmlFor="slideContent" className="text-sm font-medium">Contenu de la diapositive</label>
                    <Textarea
                        id="slideContent"
                        placeholder="Collez le contenu de vos diapositives ici..."
                        value={slideContent}
                        onChange={(e) => setSlideContent(e.target.value)}
                        className="mt-1 min-h-[150px]"
                        disabled={isLoading}
                    />
                </div>
                <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    {isLoading ? 'Génération en cours...' : 'Générer la conclusion'}
                </Button>
                {conclusion && (
                    <Card className="bg-primary/5 border-primary/20">
                         <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
                             <Sparkles className="h-5 w-5 text-primary"/>
                            <CardTitle className="font-headline text-lg text-primary">Conclusion générée</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-foreground/80">{conclusion}</p>
                        </CardContent>
                    </Card>
                )}
            </CardContent>
        </Card>
    );
}
