'use server';
/**
 * @fileOverview An AI agent for summarizing computer science books.
 *
 * - summarizeBook - A function that handles the book summarization process.
 * - SummarizeBookInput - The input type for the summarizeBook function.
 * - SummarizeBookOutput - The return type for the summarizeBook function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeBookInputSchema = z.object({
  bookTitle: z.string().describe('The title of the computer science book to summarize.'),
});
export type SummarizeBookInput = z.infer<typeof SummarizeBookInputSchema>;

const SummarizeBookOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the book.'),
  keywords: z.array(z.string()).describe('A list of main keywords from the book.'),
});
export type SummarizeBookOutput = z.infer<typeof SummarizeBookOutputSchema>;

export async function summarizeBook(input: SummarizeBookInput): Promise<SummarizeBookOutput> {
  return summarizeBookFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeBookPrompt',
  input: {schema: SummarizeBookInputSchema},
  output: {schema: SummarizeBookOutputSchema},
  prompt: `Vous êtes un expert en informatique et un excellent communicateur. Résumez le livre d'informatique suivant et extrayez les mots-clés principaux. Le résumé doit couvrir les concepts clés, la structure et le public cible du livre. Les mots-clés doivent être une liste des termes ou concepts les plus importants abordés.

Titre du livre : {{{bookTitle}}}

Répondez en français.`,
});

const summarizeBookFlow = ai.defineFlow(
  {
    name: 'summarizeBookFlow',
    inputSchema: SummarizeBookInputSchema,
    outputSchema: SummarizeBookOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
