
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, AlertCircle, Library } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { summarizeBook } from '@/ai/flows/summarize-book';

const csBooks = [
  "Structure and Interpretation of Computer Programs (SICP)",
  "The Pragmatic Programmer: From Journeyman to Master",
  "Clean Code: A Handbook of Agile Software Craftsmanship",
  "Introduction to Algorithms (CLRS)",
  "Code: The Hidden Language of Computer Hardware and Software",
  "Design Patterns: Elements of Reusable Object-Oriented Software",
  "The Mythical Man-Month: Essays on Software Engineering",
  "Artificial Intelligence: A Modern Approach (AIMA)",
  "Compilers: Principles, Techniques, and Tools (Dragon Book)",
  "Gödel, Escher, Bach: an Eternal Golden Braid",
  "Operating System Concepts (Dinosaur Book)",
  "Database System Concepts",
  "Cracking the Coding Interview",
  "Électricité : Principes et applications",
  "Droit civil : Introduction et personnes",
  "Législation sociale expliquée",
  "Principes de l'économie générale",
  "Programmation Web avec HTML5, CSS3 et JavaScript",
  "Architecture de l'ordinateur : Une approche quantitative",
];

export default function BookSummarizerPage() {
    const [selectedBook, setSelectedBook] = useState<string>('');
    const [summary, setSummary] = useState('');
    const [keywords, setKeywords] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBook) {
            setError("Veuillez d'abord sélectionner un livre.");
            return;
        }

        setIsLoading(true);
        setError('');
        setSummary('');
        setKeywords([]);

        try {
            const result = await summarizeBook({ bookTitle: selectedBook });
            setSummary(result.summary);
            setKeywords(result.keywords);
            toast({
                title: 'Résumé généré !',
                description: 'Le livre a été résumé avec succès.',
            });
        } catch (err: any) {
            const errorMessage = err.message || "Une erreur s'est produite lors de la génération du résumé.";
            setError(errorMessage);
            toast({
                variant: 'destructive',
                title: 'La génération a échoué',
                description: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <Library className="h-8 w-8" />
                        </div>
                        <div>
                            <CardTitle className="font-headline text-3xl">Résumés de livres IA</CardTitle>
                            <CardDescription>Sélectionnez un livre d'informatique pour obtenir un résumé et les points clés.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle className="font-headline">Comment ça marche ?</AlertTitle>
                        <AlertDescription>
                            <ol className="list-decimal list-inside space-y-1 mt-2 text-muted-foreground">
                                <li>Choisissez un livre dans la liste déroulante.</li>
                                <li>Cliquez sur le bouton <strong>"Générer le résumé"</strong>.</li>
                                <li>L'IA vous fournira un résumé concis et une liste de mots-clés pour le livre sélectionné.</li>
                            </ol>
                        </AlertDescription>
                    </Alert>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                             <label htmlFor="book-select" className="font-medium text-sm">Choisissez un livre</label>
                             <div className="flex flex-col sm:flex-row gap-2">
                                <Select onValueChange={setSelectedBook} value={selectedBook} disabled={isLoading}>
                                    <SelectTrigger id="book-select" className="flex-grow">
                                        <SelectValue placeholder="Sélectionnez un livre..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {csBooks.map((book) => (
                                            <SelectItem key={book} value={book}>{book}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button type="submit" disabled={isLoading || !selectedBook} className="w-full sm:w-auto">
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                    {isLoading ? 'Analyse...' : 'Générer le résumé'}
                                </Button>
                            </div>
                        </div>
                    </form>

                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Erreur</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {isLoading && (
                         <div className="pt-6 text-center space-y-4">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary"/>
                            <p className="text-muted-foreground">L'IA est en train de lire et de synthétiser le livre... Veuillez patienter.</p>
                         </div>
                    )}

                    {(summary || keywords.length > 0) && !isLoading && (
                         <Card className="mt-6 bg-background">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl text-primary">{selectedBook}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="font-headline text-xl mb-2">Résumé</h3>
                                    <p className="text-muted-foreground whitespace-pre-wrap">{summary}</p>
                                </div>
                                <div>
                                    <h3 className="font-headline text-xl mb-2">Mots-clés</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {keywords.map((keyword, index) => (
                                            <Badge key={index} variant="secondary">{keyword}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
