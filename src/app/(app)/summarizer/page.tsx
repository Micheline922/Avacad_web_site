"use client";

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileText, Sparkles, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { generateSummaryForFile } from './actions';

export default function SummarizerPage() {
    const [file, setFile] = useState<File | null>(null);
    const [summary, setSummary] = useState('');
    const [keywords, setKeywords] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
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
                if(fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setError("Veuillez d'abord sélectionner un fichier.");
            return;
        }

        setIsLoading(true);
        setError('');
        setSummary('');
        setKeywords([]);

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
                            <FileText className="h-8 w-8" />
                        </div>
                        <div>
                            <CardTitle className="font-headline text-3xl">Synthèse de Documents IA</CardTitle>
                            <CardDescription>Téléchargez un document pour obtenir un résumé et les points clés.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle className="font-headline">Comment ça marche ?</AlertTitle>
                        <AlertDescription>
                            <ol className="list-decimal list-inside space-y-1 mt-2 text-muted-foreground">
                                <li>Cliquez sur <strong>"Choisir un fichier"</strong> pour sélectionner un document PDF ou .txt.</li>
                                <li>Cliquez sur le bouton <strong>"Générer la synthèse"</strong>.</li>
                                <li>L'IA lira votre document et générera une synthèse concise et une liste de mots-clés.</li>
                            </ol>
                        </AlertDescription>
                    </Alert>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                             <label htmlFor="file-upload" className="font-medium text-sm">Télécharger un document</label>
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
                                    {isLoading ? 'Analyse...' : 'Générer la synthèse'}
                                </Button>
                            </div>
                            {file && <p className="text-sm text-muted-foreground mt-2">Fichier sélectionné : {file.name}</p>}
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
                            <p className="text-muted-foreground">L'IA est en train de lire et de synthétiser votre document... Veuillez patienter.</p>
                         </div>
                    )}

                    {(summary || keywords.length > 0) && !isLoading && (
                         <Card className="mt-6 bg-background">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl text-primary">Résultats de la synthèse</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="font-headline text-xl mb-2">Synthèse</h3>
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
