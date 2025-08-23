'use server';
/**
 * @fileOverview Generates daily quizzes for courses.
 *
 * - generateQuiz - Generates a 10-question multiple-choice quiz.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizInputSchema = z.object({
  courseName: z.string().describe('The name of the course.'),
  courseContent: z.string().describe('The content of the course to base the quiz on.'),
  cacheBuster: z.string().describe("A string, like a date, to ensure the quiz is regenerated periodically.")
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const QuizQuestionSchema = z.object({
    question: z.string().describe("The question text."),
    options: z.array(z.string()).describe("An array of 4 possible answers."),
    correctAnswer: z.string().describe("The correct answer from the options array."),
});

const GenerateQuizOutputSchema = z.object({
  questions: z.array(QuizQuestionSchema).describe('An array of 10 multiple-choice questions.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GenerateQuizOutputSchema},
  prompt: `Vous êtes un expert en création de quiz pour les étudiants en informatique.
  
  En fonction du nom du cours et du contenu fourni, générez un quiz de 10 questions à choix multiples. Chaque question doit avoir 4 options de réponse, dont une seule est correcte. Les questions doivent tester la compréhension des concepts clés du cours.

  Variez la difficulté des questions. Assurez-vous que les questions sont différentes chaque jour en vous basant sur cet identifiant : {{{cacheBuster}}}.

  Nom du cours: {{{courseName}}}
  Contenu du cours: {{{courseContent}}}
  
  Répondez en français.
  `,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
