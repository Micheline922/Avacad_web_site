
"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eraser } from 'lucide-react';

const ScientificCalculator: React.FC = () => {
    const [display, setDisplay] = useState('0');
    const [expression, setExpression] = useState('');

    const handleButtonClick = (value: string) => {
        if (value === 'AC') {
            setDisplay('0');
            setExpression('');
        } else if (value === 'C') {
            setDisplay(display.slice(0, -1) || '0');
        } else if (value === '=') {
            try {
                // Replace ^ with ** for exponentiation
                const evalExpression = expression.replace(/\^/g, '**');
                const result = eval(evalExpression);
                setDisplay(String(result));
                setExpression(String(result));
            } catch (error) {
                setDisplay('Error');
                setExpression('');
            }
        } else if (value === 'sqrt') {
            try {
                const result = Math.sqrt(eval(expression));
                setDisplay(String(result));
                setExpression(String(result));
            } catch {
                setDisplay('Error');
                setExpression('');
            }
        } else if (value === 'sin' || value === 'cos' || value === 'tan') {
             try {
                const radians = eval(expression) * (Math.PI / 180);
                const result = Math[value](radians);
                setDisplay(String(result));
                setExpression(String(result));
            } catch {
                setDisplay('Error');
                setExpression('');
            }
        }
        else {
            if (display === '0' || display === 'Error') {
                setDisplay(value);
                setExpression(value);
            } else {
                setDisplay(display + value);
                setExpression(expression + value);
            }
        }
    };

    const buttons = [
        ['sin', 'cos', 'tan', 'C'],
        ['7', '8', '9', '/'],
        ['4', '5', '6', '*'],
        ['1', '2', '3', '-'],
        ['0', '.', '^', '+'],
        ['sqrt', '(', ')', '='],
    ];

    return (
        <div className="bg-background p-4 rounded-lg border">
            <Input
                type="text"
                value={display}
                readOnly
                className="mb-4 text-right text-3xl font-mono h-16"
            />
            <div className="grid grid-cols-4 gap-2">
                <Button
                    variant="destructive"
                    className="col-span-4"
                    onClick={() => handleButtonClick('AC')}
                >
                    <Eraser className="mr-2" /> Tout effacer (AC)
                </Button>
                {buttons.flat().map((btn, i) => (
                    <Button
                        key={i}
                        onClick={() => handleButtonClick(btn)}
                        variant={isNaN(Number(btn)) && btn !== '.' ? "secondary" : "default"}
                        className={`text-xl h-14 ${btn === '=' ? 'bg-primary hover:bg-primary/90' : ''}`}
                    >
                        {btn}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default ScientificCalculator;
