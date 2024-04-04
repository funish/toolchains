import { consola } from "consola";
import type { PromptOptions, Prompts, inferPromptReturnType } from "./types";

export async function usePrompt<T extends PromptOptions>(
  message: string,
  opts?: T,
): Promise<inferPromptReturnType<T>> {
  return consola.prompt(message, opts);
}

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
