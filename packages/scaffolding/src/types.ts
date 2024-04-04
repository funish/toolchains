import type { Prompts, SelectOption } from "@funish/prompt";

export type ScaffoldingContext = {
  [key: string]:
    | string
    | boolean
    | SelectOption
    | string[]
    | SelectOption[]
    | undefined;
};

export type ScaffoldingConfig = {
  prompts?: Prompts;
  extends?: string | [string];
};
