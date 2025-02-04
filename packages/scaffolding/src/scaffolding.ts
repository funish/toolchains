/**
 * Main scaffolding functionality
 * Downloads templates and processes them with user input
 * @module @funish/scaffolding
 */

import { rmSync } from "node:fs";
import { createPrompt } from "@funish/prompt";
import { type DownloadTemplateOptions, downloadTemplate } from "giget";
import { compileScaffolding } from "./compile";
import { loadScaffoldingConfig } from "./config";
import type { ScaffoldingContext } from "./types";

/**
 * Creates a new project from a template
 * Downloads the template, prompts for information if needed,
 * compiles the template with the context, and cleans up temporary files
 *
 * @param source Template source (can be a git repository, npm package, or local path)
 * @param target Directory where the project should be created
 * @param context Optional pre-defined context values
 * @param options Optional download options (auth tokens, branch name, etc)
 *
 * @example
 * ```ts
 * // Create from a GitHub template
 * await createScaffolding(
 *   'github:user/repo',
 *   './my-project',
 *   { projectName: 'my-project' }
 * );
 *
 * // Create from a local template
 * await createScaffolding(
 *   './templates/vue-app',
 *   './my-vue-app',
 *   undefined,
 *   { provider: 'local' }
 * );
 * ```
 */
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
