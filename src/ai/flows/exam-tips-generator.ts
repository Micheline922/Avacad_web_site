'use server';
/**
 * @fileOverview An AI-powered exam tips generator.
 *
 * - generateExamTips - A function that handles the generation of exam tips.
 * - GenerateExamTipsInput - The input type for the generateExamTips function.
 * - GenerateExamTipsOutput - The return type for the generateExamTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExamTipsInputSchema = z.object({
  topic: z.string().describe('The exam topic for which to generate tips.'),
});
export type GenerateExamTipsInput = z.infer<typeof GenerateExamTipsInputSchema>;

const GenerateExamTipsOutputSchema = z.object({
  tips: z.array(z.string()).describe('A list of actionable exam tips.'),
  additionalResources: z.array(z.string()).describe('A list of suggested additional resources.'),
  suggestedBooks: z.array(z.object({
    title: z.string().describe("The title of the book."),
    author: z.string().describe("The author of the book."),
    summary: z.string().describe("A brief summary of why the book is recommended for the topic.")
  })).describe("A list of recommended books to read for the course.")
});
export type GenerateExamTipsOutput = z.infer<typeof GenerateExamTipsOutputSchema>;

export async function generateExamTips(input: GenerateExamTipsInput): Promise<GenerateExamTipsOutput> {
  return generateExamTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExamTipsPrompt',
  input: {schema: GenerateExamTipsInputSchema},
  output: {schema: GenerateExamTipsOutputSchema},
  prompt: `Vous êtes un conseiller académique IA, spécialisé dans la fourniture de stratégies de révision pour les étudiants en informatique. Un étudiant a besoin de conseils pour son prochain examen sur le sujet suivant : {{{topic}}}.

Générez une liste de conseils d'étude spécifiques et exploitables. Incluez des stratégies pour comprendre les concepts clés, des techniques de mémorisation, des approches de résolution de problèmes et des conseils pour le jour de l'examen.

En plus des conseils, suggérez une liste de ressources supplémentaires, telles que des tutoriels en ligne, des sites web de pratique ou des chaînes YouTube pertinentes qui pourraient aider l'étudiant à se préparer.

Enfin, proposez une liste de 3 à 5 livres de référence sur le sujet. Pour chaque livre, fournissez le titre, l'auteur et un court résumé expliquant pourquoi il est pertinent pour le sujet de l'examen.
Incluez des classiques et des ouvrages de référence lorsque cela est pertinent pour le sujet, en choisissant parmi les domaines suivants :
- Algorithmique : "Introduction to Algorithms" de CLRS.
- Qualité de code : "Clean Code" de Robert C. Martin.
- Concepts fondamentaux : "Structure and Interpretation of Computer Programs" de Abelson et Sussman.
- Génie Logiciel : Des livres sur les patrons de conception (Design Patterns), les méthodologies agiles ou l'architecture logicielle.
- Réseaux et Télécommunications : Des ouvrages de référence comme "Computer Networking: A Top-Down Approach" de Kurose et Ross.
- Systèmes d'Information : Des livres sur la modélisation (Merise, UML) ou la gestion de projet SI.
- Sécurité Informatique : Des références sur la cryptographie, la sécurité des réseaux ou le hacking éthique.
- Développement Mobile : Des livres sur le développement natif (Swift, Kotlin) ou multiplateforme (React Native, Flutter).
- Programmation Orientée Objet : Des ouvrages expliquant les concepts de l'OO avec des exemples en Java, C++ ou Python.
- Intelligence Artificielle : Des classiques comme "Artificial Intelligence: A Modern Approach" de Russell et Norvig.
- Langages de programmation : Suggérez également, si pertinent, un livre qui explore et compare plusieurs langages de programmation, expliquant leurs forces, leurs faiblesses et leurs domaines d'application.

Répondez en français.`,
});

const generateExamTipsFlow = ai.defineFlow(
  {
    name: 'generateExamTipsFlow',
    inputSchema: GenerateExamTipsInputSchema,
    outputSchema: GenerateExamTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
