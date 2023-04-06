import { compileScaffolding } from "./compile";
import { loadScaffoldingConfig } from "./config";
import { rmSync } from "fs";
import { DownloadTemplateOptions, downloadTemplate } from "giget";

export async function createScaffolding(
  source: string,
  target: string,
  context?: Object,
  options?: DownloadTemplateOptions
) {
  const { dir } = await downloadTemplate(source, options);
  const prompts = (await loadScaffoldingConfig(dir)).prompts as Object;
  compileScaffolding(dir, target, context || prompts);
  rmSync(dir, { recursive: true, force: true });
}
