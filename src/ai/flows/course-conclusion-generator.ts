// This file is machine-generated - edit with care!
'use server';
/**
 * @fileOverview Generates conclusions for course slides using GenAI.
 *
 * - generateCourseConclusion - A function that generates a conclusion for course slides.
 * - GenerateCourseConclusionInput - The input type for the generateCourseConclusion function.
 * - GenerateCourseConclusionOutput - The return type for the generateCourseConclusion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCourseConclusionInputSchema = z.object({
  courseName: z.string().describe('The name of the course.'),
  slideContent: z.string().describe('The content of the course slides.'),
});
export type GenerateCourseConclusionInput = z.infer<typeof GenerateCourseConclusionInputSchema>;

const GenerateCourseConclusionOutputSchema = z.object({
  conclusion: z.string().describe('The generated conclusion for the course slides.'),
});
export type GenerateCourseConclusionOutput = z.infer<typeof GenerateCourseConclusionOutputSchema>;

export async function generateCourseConclusion(input: GenerateCourseConclusionInput): Promise<GenerateCourseConclusionOutput> {
  return generateCourseConclusionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCourseConclusionPrompt',
  input: {schema: GenerateCourseConclusionInputSchema},
  output: {schema: GenerateCourseConclusionOutputSchema},
  prompt: `You are an AI assistant designed to generate conclusions for course slides.

  Based on the course name and slide content provided, generate a concise and informative conclusion.

  Course Name: {{{courseName}}}
  Slide Content: {{{slideContent}}}
  `,
});

const generateCourseConclusionFlow = ai.defineFlow(
  {
    name: 'generateCourseConclusionFlow',
    inputSchema: GenerateCourseConclusionInputSchema,
    outputSchema: GenerateCourseConclusionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
