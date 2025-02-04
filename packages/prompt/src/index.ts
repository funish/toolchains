/**
 * Interactive command line prompt utilities
 * @module @funish/prompt
 */

import { consola } from "consola";
import type { PromptOptions, Prompts, inferPromptReturnType } from "./types";

/**
 * Creates a single interactive prompt
 *
 * @param message The prompt message to display
 * @param opts Optional configuration for the prompt
 * @returns Promise resolving to the user's response with appropriate type
 *
 * @example
 * ```ts
 * // Text prompt
 * const name = await usePrompt('What is your name?');
 *
 * // Confirmation prompt
 * const confirm = await usePrompt('Are you sure?', { type: 'confirm' });
 *
 * // Select prompt
 * const color = await usePrompt('Choose a color:', {
 *   type: 'select',
 *   options: ['red', 'blue', 'green']
 * });
 * ```
 */
export async function usePrompt<T extends PromptOptions>(
  message: string,
  opts?: T,
): Promise<inferPromptReturnType<T>> {
  const result = await consola.prompt(message, opts);
  return result as inferPromptReturnType<T>;
}

/**
 * Creates multiple interactive prompts from a configuration object
 *
 * @param prompts Object mapping prompt names to their configurations
 * @returns Promise resolving to an object containing all prompt responses
 *
 * @example
 * ```ts
 * const answers = await createPrompt({
 *   name: { type: 'text', placeholder: 'Your name' },
 *   age: { type: 'text', placeholder: 'Your age' },
 *   colors: {
 *     type: 'multiselect',
 *     options: ['red', 'blue', 'green'],
 *     required: true
 *   }
 * });
 * ```
 */
export async function createPrompt<T extends Prompts>(
  prompts: T,
): Promise<{
  [key in keyof T]?: inferPromptReturnType<(typeof prompts)[key]>;
}> {
  const answers: {
    [key in keyof T]?: inferPromptReturnType<(typeof prompts)[key]>;
  } = {};

  for (const prompt in prompts) {
    const promptOption = prompts[prompt];
    const message = prompt;
    const answer = await usePrompt(message, promptOption);

    answers[prompt] = answer;
  }

  return answers;
}

export * from "./types";
