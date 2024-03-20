import { rmSync } from "node:fs";
import { consola } from "consola";
import { type DownloadTemplateOptions, downloadTemplate } from "giget";
import { compileScaffolding } from "./compile";
import { loadScaffoldingConfig } from "./config";
import type { ScaffoldingContext, ScaffoldingContextType } from "./types";

export async function createScaffolding(
  source: string,
  target: string,
  context?: ScaffoldingContext,
  options?: DownloadTemplateOptions,
) {
  const { dir } = await downloadTemplate(source, options);

  const scaffoldingContext = context || {};

  const prompts = (await loadScaffoldingConfig(dir)).prompts;

  if (prompts) {
    for (const prompt in prompts) {
      const promptOption = prompts[prompt];

      const message = promptOption.message || prompt;

      const answer = (await consola.prompt(
        message,
        promptOption,
      )) as ScaffoldingContextType;

      scaffoldingContext[prompt] = answer;
    }
  }

  compileScaffolding(dir, target, scaffoldingContext);

  rmSync(dir, { recursive: true, force: true });
}
