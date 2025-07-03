'use server';

/**
 * @fileOverview Implements Gemini-secured access for user authentication.
 *
 * - secureAccessWithGemini - A function to authenticate users using Gemini.
 * - SecureAccessInput - The input type for the secureAccessWithGemini function.
 * - SecureAccessOutput - The return type for the secureAccessWithGemini function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SecureAccessInputSchema = z.object({
  biometricData: z
    .string()
    .describe(
      'Biometric data for authentication, such as fingerprint or facial recognition data as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected description
    ),
});
export type SecureAccessInput = z.infer<typeof SecureAccessInputSchema>;

const SecureAccessOutputSchema = z.object({
  accessGranted: z.boolean().describe('Indicates whether access is granted or not.'),
  reason: z.string().describe('The reason for access denial, if any.'),
});
export type SecureAccessOutput = z.infer<typeof SecureAccessOutputSchema>;

export async function secureAccessWithGemini(input: SecureAccessInput): Promise<SecureAccessOutput> {
  return secureAccessFlow(input);
}

const secureAccessPrompt = ai.definePrompt({
  name: 'secureAccessPrompt',
  input: {schema: SecureAccessInputSchema},
  output: {schema: SecureAccessOutputSchema},
  prompt: `You are an AI assistant specializing in biometric authentication.

  Based on the provided biometric data, determine if access should be granted.

  Biometric Data: {{media url=biometricData}}

  Provide a JSON output indicating 'accessGranted' (true or false) and, if access is denied, a 'reason'.`,
});

const secureAccessFlow = ai.defineFlow(
  {
    name: 'secureAccessFlow',
    inputSchema: SecureAccessInputSchema,
    outputSchema: SecureAccessOutputSchema,
  },
  async input => {
    try {
      const {output} = await secureAccessPrompt(input);
      return output!;
    } catch (error: any) {
      console.error('Error during secure access:', error);
      return {
        accessGranted: false,
        reason: 'Authentication failed due to an internal error.',
      };
    }
  }
);
