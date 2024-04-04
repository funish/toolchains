import { rmSync } from "node:fs";
import { createPrompt } from "@funish/prompt";
import { type DownloadTemplateOptions, downloadTemplate } from "giget";
import { compileScaffolding } from "./compile";
import { loadScaffoldingConfig } from "./config";
import type { ScaffoldingContext } from "./types";

export async function createScaffolding(
  source: string,
  target: string,
  context?: ScaffoldingContext,
  options?: DownloadTemplateOptions,
) {
  const { dir } = await downloadTemplate(source, options);

  let scaffoldingContext = context || {};

  const prompts = (await loadScaffoldingConfig(dir)).prompts;

  if (prompts) {
    scaffoldingContext = await createPrompt(prompts);
  }

  compileScaffolding(dir, target, scaffoldingContext);

  rmSync(dir, { recursive: true, force: true });
}
