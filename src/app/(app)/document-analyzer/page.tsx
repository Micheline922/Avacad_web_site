
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { analyzeDocument, answerDocumentQuestion } from '@/ai/flows/document-analyzer';
import { Loader2, Sparkles, FileText, Upload, BrainCircuit, MessageSquare, Send, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import pdfParse from 'pdf-parse';

type AnalysisResult = {
    summary: string;
    conclusion: string;
};

export default function DocumentAnalyzerPage() {
    const [file, setFile] = useState<File | null>(null);
    const [documentContent, setDocumentContent] = useState('');
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isAsking, setIsAsking] = useState(false);
    const { toast } = useToast();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        // Reset state
        setFile(selectedFile);
        setDocumentContent('');
        setAnalysis(null);
        setAnswer('');
        setQuestion('');

        if (selectedFile.type === 'application/pdf') {
            const arrayBuffer = await selectedFile.arrayBuffer();
            try {
                const data = await pdfParse(arrayBuffer);
                setDocumentContent(data.text);
            } catch (error) {
                console.error('Failed to parse PDF', error);
                toast({ variant: 'destructive', title: 'Erreur de lecture du PDF', description: 'Le fichier est peut-être corrompu.' });
            }
        } else if (selectedFile.type === 'text/plain') {
            const text = await selectedFile.text();
            setDocumentContent(text);
        } else {
            toast({ variant: 'destructive', title: 'Type de fichier non supporté', description: 'Veuillez sélectionner un fichier PDF ou TXT.' });
            setFile(null);
        }
    };

    const handleAnalyze = async () => {
        if (!documentContent) {
            toast({ variant: 'destructive', title: 'Aucun contenu de document', description: 'Veuillez sélectionner un fichier valide.' });
            return;
        }
        setIsAnalyzing(true);
        try {
            const result = await analyzeDocument({ documentContent });
            setAnalysis(result);
            toast({ title: 'Analyse terminée !', description: 'Le résumé et la conclusion sont prêts.' });
        } catch (error) {
            console.error('Failed to analyze document:', error);
            toast({ variant: 'destructive', title: 'L\'analyse a échoué', description: 'Une erreur est survenue.' });
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleAskQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) {
            toast({ variant: 'destructive', title: 'Question vide', description: 'Veuillez poser une question.' });
            return;
        }
        setIsAsking(true);
        setAnswer('');
        try {
            const result = await answerDocumentQuestion({ documentContent, question });
            setAnswer(result.answer);
        } catch (error) {
            console.error('Failed to ask question:', error);
            toast({ variant: 'destructive', title: 'Erreur', description: 'Impossible de poser la question.' });
        } finally {
            setIsAsking(false);
            setQuestion('');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <FileText className="h-8 w-8" />
                        </div>
                        <div>
                            <CardTitle className="font-headline text-3xl">Analyse de Document par l'IA</CardTitle>
                            <CardDescription>Téléchargez un document (PDF, TXT) pour obtenir un résumé, une conclusion et poser des questions.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-4 border-2 border-dashed rounded-lg text-center space-y-2">
                        <label htmlFor="file-upload" className="cursor-pointer space-y-2">
                             <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Upload className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold">Cliquez pour télécharger un document</h3>
                            <p className="text-sm text-muted-foreground">{file ? `Fichier sélectionné : ${file.name}` : 'PDF ou TXT uniquement'}</p>
                        </label>
                        <Input id="file-upload" type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.txt" />
                    </div>

                    {file && documentContent && (
                        <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full">
                            {isAnalyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
                            {isAnalyzing ? 'Analyse en cours...' : `Analyser "${file.name}"`}
                        </Button>
                    )}
                    
                    {isAnalyzing && (
                        <div className="text-center">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                            <p className="text-muted-foreground mt-2">L'IA lit et synthétise votre document...</p>
                        </div>
                    )}
                    
                    {!analysis && !isAnalyzing && (
                        <Alert>
                           <AlertCircle className="h-4 w-4" />
                           <AlertTitle className="font-headline">En attente d'un document</AlertTitle>
                           <AlertDescription>
                              Veuillez sélectionner un fichier et cliquer sur "Analyser" pour commencer.
                           </AlertDescription>
                        </Alert>
                    )}

                    {analysis && (
                        <div className="space-y-6">
                            <Card className="bg-background">
                                <CardHeader>
                                    <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2"><Sparkles /> Résumé du document</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground whitespace-pre-wrap">{analysis.summary}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-background">
                                <CardHeader>
                                    <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2"><Sparkles /> Conclusion</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground whitespace-pre-wrap">{analysis.conclusion}</p>
                                </CardContent>
                            </Card>

                             <Card>
                                <CardHeader>
                                    <CardTitle className="font-headline text-xl flex items-center gap-2"><MessageSquare /> Poser une question sur le document</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleAskQuestion} className="flex gap-2">
                                        <Input
                                            placeholder="Posez votre question ici..."
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                            disabled={isAsking}
                                        />
                                        <Button type="submit" disabled={isAsking} size="icon">
                                            {isAsking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                        </Button>
                                    </form>
                                     {isAsking && (
                                        <div className="text-center mt-4">
                                            <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                                            <p className="text-muted-foreground text-sm mt-2">L'IA recherche la réponse...</p>
                                        </div>
                                    )}
                                    {answer && (
                                        <div className="mt-4 p-4 bg-muted rounded-md">
                                            <p className="text-muted-foreground whitespace-pre-wrap">{answer}</p>
                                        </div>
                                    )}
                                </CardContent>
                             </Card>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
