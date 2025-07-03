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
                title: 'Content is empty',
                description: 'Please provide some slide content to generate a conclusion.'
            });
            return;
        }

        setIsLoading(true);
        setConclusion('');
        try {
            const result = await generateCourseConclusion({ courseName, slideContent });
            setConclusion(result.conclusion);
            toast({
                title: 'Conclusion Generated!',
                description: 'The AI has summarized your course material.',
            });
        } catch (error) {
            console.error("Failed to generate conclusion:", error);
            toast({
                variant: 'destructive',
                title: 'Generation Failed',
                description: 'An error occurred while generating the conclusion.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-xl">Course Conclusion Generator</CardTitle>
                <CardDescription>Let AI summarize your course slides into a concise conclusion.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label htmlFor="slideContent" className="text-sm font-medium">Slide Content</label>
                    <Textarea
                        id="slideContent"
                        placeholder="Paste the content from your slides here..."
                        value={slideContent}
                        onChange={(e) => setSlideContent(e.target.value)}
                        className="mt-1 min-h-[150px]"
                        disabled={isLoading}
                    />
                </div>
                <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    {isLoading ? 'Generating...' : 'Generate Conclusion'}
                </Button>
                {conclusion && (
                    <Card className="bg-primary/5 border-primary/20">
                         <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
                             <Sparkles className="h-5 w-5 text-primary"/>
                            <CardTitle className="font-headline text-lg text-primary">Generated Conclusion</CardTitle>
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
