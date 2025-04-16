'use server';
/**
 * @fileOverview AI-powered layout suggestion for mind maps.
 *
 * - suggestLayout - A function that suggests an initial layout for a mind map.
 * - SuggestLayoutInput - The input type for the suggestLayout function.
 * - SuggestLayoutOutput - The return type for the suggestLayout function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SuggestLayoutInputSchema = z.object({
  mindMapData: z.string().describe('The mind map data in JSON format.'),
});
export type SuggestLayoutInput = z.infer<typeof SuggestLayoutInputSchema>;

const SuggestLayoutOutputSchema = z.object({
  layout: z.string().describe('The suggested layout for the mind map in JSON format.'),
});
export type SuggestLayoutOutput = z.infer<typeof SuggestLayoutOutputSchema>;

export async function suggestLayout(input: SuggestLayoutInput): Promise<SuggestLayoutOutput> {
  return suggestLayoutFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLayoutPrompt',
  input: {
    schema: z.object({
      mindMapData: z.string().describe('The mind map data in JSON format.'),
    }),
  },
  output: {
    schema: z.object({
      layout: z.string().describe('The suggested layout for the mind map in JSON format.'),
    }),
  },
  prompt: `You are an AI expert in creating visually appealing and organized mind map layouts.

  Given the following mind map data, suggest an initial layout in JSON format that optimizes visual appeal and readability.

  Mind Map Data:
  {{mindMapData}}

  The layout should be a JSON object where the keys are the node IDs and the values are objects containing the x and y coordinates of the node.
  Ensure that the layout is well-spaced and avoids overlapping nodes.
`,
});

const suggestLayoutFlow = ai.defineFlow<
  typeof SuggestLayoutInputSchema,
  typeof SuggestLayoutOutputSchema
>(
  {
    name: 'suggestLayoutFlow',
    inputSchema: SuggestLayoutInputSchema,
    outputSchema: SuggestLayoutOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
