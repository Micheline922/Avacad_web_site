
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateExamTips } from '@/ai/flows/exam-tips-generator';
import { Loader2, GraduationCap, Sparkles, AlertCircle, Lightbulb, BookCheck } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function ExamTipsPage() {
    const [topic, setTopic] = useState('');
    const [tips, setTips] = useState<string[]>([]);
    const [resources, setResources] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) {
            toast({
                variant: 'destructive',
                title: 'Le sujet est vide',
                description: "Veuillez saisir un sujet d'examen."
            });
            return;
        }

        setIsLoading(true);
        setTips([]);
        setResources([]);
        try {
            const result = await generateExamTips({ topic });
            setTips(result.tips);
            setResources(result.additionalResources);
        } catch (error) {
            console.error("Failed to generate tips:", error);
            toast({
                variant: 'destructive',
                title: 'La génération a échoué',
                description: "Une erreur s'est produite lors de la récupération des conseils."
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <GraduationCap className="h-8 w-8" />
                        </div>
                        <div>
                            <CardTitle className="font-headline text-3xl">Conseils d'Examen par l'IA</CardTitle>
                            <CardDescription>Obtenez des stratégies de révision et des ressources pour n'importe quel sujet.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6">
                        <Input
                            placeholder="ex: 'Algorithmes de tri', 'Réseaux informatiques', 'SQL'"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            disabled={isLoading}
                        />
                        <Button type="submit" disabled={isLoading} className="sm:w-auto w-full">
                             {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            {isLoading ? 'Recherche...' : 'Obtenir des conseils'}
                        </Button>
                    </form>

                    {isLoading && (
                         <div className="text-center space-y-4">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary"/>
                            <p className="text-muted-foreground">L'IA prépare vos stratégies de réussite... Veuillez patienter.</p>
                         </div>
                    )}

                    {!isLoading && tips.length === 0 && (
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle className="font-headline">Prêt à réviser ?</AlertTitle>
                            <AlertDescription>
                                Saisissez un sujet d'examen ci-dessus pour recevoir des conseils personnalisés et des suggestions de ressources de la part de notre IA.
                            </AlertDescription>
                        </Alert>
                    )}

                    {!isLoading && (tips.length > 0 || resources.length > 0) && (
                         <div className="space-y-6">
                            <Card className="bg-background">
                                <CardHeader>
                                    <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2"><Lightbulb />Conseils de révision pour "{topic}"</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 list-disc pl-5 text-muted-foreground">
                                        {tips.map((tip, index) => (
                                            <li key={index}>{tip}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                             <Card className="bg-background">
                                <CardHeader>
                                    <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2"><BookCheck />Ressources supplémentaires</CardTitle>
                                </CardHeader>
                                <CardContent>
                                     <ul className="space-y-3 list-disc pl-5 text-muted-foreground">
                                        {resources.map((resource, index) => (
                                            <li key={index}>{resource}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                         </div>
                    )}

                </CardContent>
            </Card>
        </div>
    );
}
