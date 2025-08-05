
import React from 'react';
import ScientificCalculator from '@/components/calculator/scientific-calculator';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Calculator } from 'lucide-react';

export default function CalculatorPage() {
    return (
        <div className="flex justify-center items-start h-full">
            <Card className="w-full max-w-md">
                 <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <Calculator className="h-8 w-8" />
                        </div>
                        <div>
                            <CardTitle className="font-headline text-3xl">Calculatrice Scientifique</CardTitle>
                            <CardDescription>Un outil puissant pour vos besoins mathématiques.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <ScientificCalculator />
                </CardContent>
            </Card>
        </div>
    );
}
