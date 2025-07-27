
"use client";

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, AlertCircle, Library, Upload } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { summarizeBook } from '@/ai/flows/summarize-book';
import { generateSummaryForFile } from '../summarizer/actions';

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
    const [file, setFile] = useState<File | null>(null);
    const [summary, setSummary] = useState('');
    const [keywords, setKeywords] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [resultTitle, setResultTitle] = useState('');
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.type === 'application/pdf' || selectedFile.type === 'text/plain') {
                setFile(selectedFile);
                setError('');
            } else {
                setError("Type de fichier non valide. Veuillez sélectionner un fichier PDF ou TXT.");
                toast({
                    variant: 'destructive',
                    title: 'Type de fichier non valide',
                    description: "Veuillez sélectionner un fichier PDF ou .txt.",
                });
                setFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }
        }
    };

    const handleBookSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBook) {
            setError("Veuillez d'abord sélectionner un livre.");
            return;
        }

        setIsLoading(true);
        setError('');
        setSummary('');
        setKeywords([]);
        setResultTitle(selectedBook);

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
    
    const handleFileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setError("Veuillez d'abord sélectionner un fichier.");
            return;
        }

        setIsLoading(true);
        setError('');
        setSummary('');
        setKeywords([]);
        setResultTitle(file.name);


        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const dataUrl = reader.result as string;
                try {
                    const result = await generateSummaryForFile({ dataUrl, type: file.type });
                    setSummary(result.summary);
                    setKeywords(result.keywords);
                    toast({
                        title: 'Synthèse générée !',
                        description: 'Votre document a été résumé avec succès.',
                    });
                } catch (err: any) {
                    const errorMessage = err.message || "Une erreur s'est produite lors de la génération de la synthèse.";
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
            reader.onerror = () => {
                setError("Échec de la lecture du fichier.");
                setIsLoading(false);
            };
        } catch (err) {
            setError("Une erreur inattendue est survenue.");
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
                            <CardTitle className="font-headline text-3xl">Résumés IA</CardTitle>
                            <CardDescription>Obtenez un résumé et les points clés à partir d'un livre ou de votre propre document.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Tabs defaultValue="book" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="book"><Library className="mr-2 h-4 w-4" />À partir d'un livre</TabsTrigger>
                            <TabsTrigger value="file"><Upload className="mr-2 h-4 w-4" />À partir d'un fichier</TabsTrigger>
                        </TabsList>
                        <TabsContent value="book" className="mt-6">
                             <form onSubmit={handleBookSubmit} className="space-y-4">
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
                        </TabsContent>
                        <TabsContent value="file" className="mt-6">
                            <form onSubmit={handleFileSubmit} className="space-y-4">
                                <div className="space-y-2">
                                     <label htmlFor="file-upload" className="font-medium text-sm">Télécharger un document (PDF, .txt)</label>
                                     <div className="flex flex-col sm:flex-row gap-2">
                                        <Input
                                            id="file-upload"
                                            type="file"
                                            accept=".pdf,.txt"
                                            onChange={handleFileChange}
                                            ref={fileInputRef}
                                            disabled={isLoading}
                                            className="flex-grow"
                                        />
                                        <Button type="submit" disabled={isLoading || !file} className="w-full sm:w-auto">
                                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                            {isLoading ? 'Analyse...' : 'Générer le résumé'}
                                        </Button>
                                    </div>
                                    {file && <p className="text-sm text-muted-foreground mt-2">Fichier sélectionné : {file.name}</p>}
                                </div>
                            </form>
                        </TabsContent>
                    </Tabs>

                    {error && (
                        <Alert variant="destructive" className="mt-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Erreur</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {isLoading && (
                         <div className="pt-6 text-center space-y-4">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary"/>
                            <p className="text-muted-foreground">L'IA est en train de lire et de synthétiser... Veuillez patienter.</p>
                         </div>
                    )}

                    {(summary || keywords.length > 0) && !isLoading && (
                         <Card className="mt-6 bg-background">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl text-primary">{resultTitle}</CardTitle>
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

    