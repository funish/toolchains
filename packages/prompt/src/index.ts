import { createInterface } from "readline";

export interface Prompt {
  name: string;
  message: string;
  default?: string | boolean;
  validate: (answer: string) => boolean;
}

export interface NestedObject {
  [key: string]: string | boolean | NestedObject;
}

export function createPrompt(prompts: Prompt[]) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answers: NestedObject = {};

  return new Promise((resolve) => {
    const promptNext = (index: number) => {
      const currentPrompt = prompts[index];

      if (!currentPrompt) {
        rl.close();
        resolve(mergeAnswers(answers));
        return;
      }

      rl.question(
        `${currentPrompt.message} ${
          currentPrompt.default ? `(${currentPrompt.default})` : ""
        }: `,
        (answer) => {
          const validatedAnswer =
            answer.length === 0 && currentPrompt.default
              ? currentPrompt.default
              : currentPrompt.validate(answer)
                ? answer
                : null;

          if (validatedAnswer === null) {
            console.log("Invalid answer");
            promptNext(index);
            return;
          }
          answers[currentPrompt.name] = validatedAnswer;
          promptNext(index + 1);
        },
      );
    };

    promptNext(0);
  });
}

export function mergeAnswers(object: NestedObject) {
  const result = {};

  for (const key in object) {
    const value = object[key];
    const keys = key.split(".");
    let current: NestedObject = result;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const isLast = i === keys.length - 1;

      if (isLast) {
        current[key] = value;
      } else {
        if (!current[key]) {
          current[key] = {};
        }

        current = current[key] as NestedObject;
      }
    }
  }

  return result;
}
