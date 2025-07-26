// src/ai/flows/ai-tutor.ts
'use server';
/**
 * @fileOverview An AI-powered tutor that explains computer science concepts within the context of a course.
 *
 * - explainConceptInContext - A function that handles the explanation of a computer science concept.
 * - ExplainConceptInContextInput - The input type for the explainConceptInContext function.
 * - ExplainConceptInContextOutput - The return type for the explainConceptInContext function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainConceptInContextInputSchema = z.object({
  concept: z.string().describe('The computer science concept to explain.'),
  courseContext: z.string().describe('The context of the course, such as lecture notes or a course summary.'),
});
export type ExplainConceptInContextInput = z.infer<typeof ExplainConceptInContextInputSchema>;

const ExplainConceptInContextOutputSchema = z.object({
  explanation: z.string().describe('A clear and easy-to-understand explanation of the concept.'),
});
export type ExplainConceptInContextOutput = z.infer<typeof ExplainConceptInContextOutputSchema>;

export async function explainConceptInContext(input: ExplainConceptInContextInput): Promise<ExplainConceptInContextOutput> {
  return explainConceptInContextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainConceptInContextPrompt',
  input: {schema: ExplainConceptInContextInputSchema},
  output: {schema: ExplainConceptInContextOutputSchema},
  prompt: `Vous êtes un tuteur expert en informatique. Un étudiant vous pose une question sur un concept spécifique dans le cadre de son cours.
Expliquez le concept suivant d'une manière facile à comprendre, en utilisant le contexte du cours fourni pour rendre l'explication plus pertinente.

Contexte du cours:
{{{courseContext}}}

Question de l'étudiant / Concept à expliquer:
{{{concept}}}
`,
config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  }
});

const explainConceptInContextFlow = ai.defineFlow(
  {
    name: 'explainConceptInContextFlow',
    inputSchema: ExplainConceptInContextInputSchema,
    outputSchema: ExplainConceptInContextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
