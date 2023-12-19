import { rmSync } from "fs";
import { DownloadTemplateOptions, downloadTemplate } from "giget";
import { compileScaffolding } from "./compile";
import { loadScaffoldingConfig } from "./config";

export async function createScaffolding(
  source: string,
  target: string,
  context?: object,
  options?: DownloadTemplateOptions,
) {
  const { dir } = await downloadTemplate(source, options);
  const prompts = (await loadScaffoldingConfig(dir)).prompts as object;
  compileScaffolding(dir, target, context || prompts);
  rmSync(dir, { recursive: true, force: true });
}
