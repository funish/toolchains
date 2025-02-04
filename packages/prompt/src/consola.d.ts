import type { PromptOptions, inferPromptReturnType } from "./types";

declare module "consola" {
  export interface Consola {
    prompt<T extends PromptOptions>(
      message: string,
      options?: T,
    ): Promise<inferPromptReturnType<T>>;
  }
}
