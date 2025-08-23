'use server';
/**
 * @fileOverview An AI-powered document analyzer.
 *
 * - analyzeDocument - A function that handles the analysis of a document.
 * - answerDocumentQuestion - A function that answers a question about a document.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Schema for the initial document analysis
const AnalyzeDocumentInputSchema = z.object({
  documentContent: z.string().describe('The full text content of the document to be analyzed.'),
});
export type AnalyzeDocumentInput = z.infer<typeof AnalyzeDocumentInputSchema>;

const AnalyzeDocumentOutputSchema = z.object({
  summary: z.string().describe('A comprehensive summary of the document.'),
  conclusion: z.string().describe('A concluding paragraph for the document.'),
});
export type AnalyzeDocumentOutput = z.infer<typeof AnalyzeDocumentOutputSchema>;

// Schema for the question-answering part
const AnswerQuestionInputSchema = z.object({
    documentContent: z.string().describe('The full text content of the document.'),
    question: z.string().describe('The user\'s question about the document.'),
});
export type AnswerQuestionInput = z.infer<typeof AnswerQuestionInputSchema>;

const AnswerQuestionOutputSchema = z.object({
    answer: z.string().describe('A clear and concise answer to the user\'s question based on the document.'),
});
export type AnswerQuestionOutput = z.infer<typeof AnswerQuestionOutputSchema>;


// Flow for initial analysis
const analyzePrompt = ai.definePrompt({
  name: 'analyzeDocumentPrompt',
  input: {schema: AnalyzeDocumentInputSchema},
  output: {schema: AnalyzeDocumentOutputSchema},
  prompt: `Vous êtes un assistant IA expert en analyse de documents. Veuillez analyser le contenu du document suivant.

Fournissez un résumé complet qui capture les points clés et les idées principales.
Ensuite, rédigez une conclusion concise qui synthétise les implications ou les points à retenir du document.

Contenu du document :
{{{documentContent}}}

Répondez en français.`,
});

const analyzeDocumentFlow = ai.defineFlow(
  {
    name: 'analyzeDocumentFlow',
    inputSchema: AnalyzeDocumentInputSchema,
    outputSchema: AnalyzeDocumentOutputSchema,
  },
  async (input) => {
    const {output} = await analyzePrompt(input);
    return output!;
  }
);

export async function analyzeDocument(input: AnalyzeDocumentInput): Promise<AnalyzeDocumentOutput> {
  return analyzeDocumentFlow(input);
}


// Flow for answering questions
const answerQuestionPrompt = ai.definePrompt({
    name: 'answerDocumentQuestionPrompt',
    input: {schema: AnswerQuestionInputSchema},
    output: {schema: AnswerQuestionOutputSchema},
    prompt: `Vous êtes un tuteur IA. En vous basant uniquement sur le contenu du document fourni, répondez à la question de l'utilisateur.

Contexte du document :
{{{documentContent}}}

Question de l'utilisateur :
{{{question}}}

Fournissez une réponse claire et directe. Si la réponse ne se trouve pas dans le document, indiquez que vous ne pouvez pas répondre à la question avec les informations fournies.
Répondez en français.`,
});

const answerDocumentQuestionFlow = ai.defineFlow(
    {
        name: 'answerDocumentQuestionFlow',
        inputSchema: AnswerQuestionInputSchema,
        outputSchema: AnswerQuestionOutputSchema,
    },
    async (input) => {
        const {output} = await answerQuestionPrompt(input);
        return output!;
    }
);

export async function answerDocumentQuestion(input: AnswerQuestionInput): Promise<AnswerQuestionOutput> {
    return answerDocumentQuestionFlow(input);
}
