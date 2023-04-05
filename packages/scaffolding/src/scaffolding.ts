import { compileScaffolding } from "./compile";
import { rmSync } from "fs";
import { DownloadTemplateOptions, downloadTemplate } from "giget";

export async function createScaffolding(
  source: string,
  target: string,
  context: Object,
  options?: DownloadTemplateOptions
) {
  const { dir } = await downloadTemplate(source, options);
  compileScaffolding(dir, target, context);
  rmSync(dir, { recursive: true, force: true });
}
