/**
 * Template compilation utilities for scaffolding
 * Uses Handlebars for template rendering
 * @module @funish/scaffolding/compile
 */

import {
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { basename, resolve } from "node:path";
import Handlebars from "handlebars";
import type { ScaffoldingContext } from "./types";

const compile = Handlebars.compile;

/**
 * Compiles a single file using Handlebars templating
 *
 * @param source Path to the source template file
 * @param target Directory where the compiled file should be written
 * @param context Context object containing values for template variables
 *
 * @example
 * ```ts
 * compileHandlebarsFile(
 *   './templates/README.md',
 *   './output',
 *   { projectName: 'My Project' }
 * );
 * ```
 */
export function compileHandlebarsFile(
  source: string,
  target: string,
  context: ScaffoldingContext,
) {
  const fileTemplateCompile = compile(readFileSync(source).toString())(context);
  writeFileSync(resolve(target, basename(source)), fileTemplateCompile);
}

/**
 * Creates a directory using a Handlebars template for its name
 *
 * @param source Template string for directory name
 * @param target Parent directory where the new directory should be created
 * @param context Context object containing values for template variables
 *
 * @example
 * ```ts
 * compileHandlebarsDir(
 *   '{{projectName}}-src',
 *   './output',
 *   { projectName: 'my-app' }
 * );
 * ```
 */
export function compileHandlebarsDir(
  source: string,
  target: string,
  context: ScaffoldingContext,
) {
  const dirTemplateCompile = compile(source)(context);
  mkdirSync(resolve(target, dirTemplateCompile), {
    recursive: true,
  });
}

/**
 * Recursively compiles a directory of templates
 * Handles both files and directories, applying Handlebars templating to names and contents
 *
 * @param source Root directory containing templates
 * @param target Directory where compiled files should be written
 * @param context Context object containing values for template variables
 *
 * @example
 * ```ts
 * compileScaffolding(
 *   './templates/vue-app',
 *   './output',
 *   {
 *     projectName: 'my-app',
 *     author: 'John Doe'
 *   }
 * );
 * ```
 */
export function compileScaffolding(
  source: string,
  target: string,
  context: ScaffoldingContext,
) {
  mkdirSync(target, { recursive: true });
  for (const filename of readdirSync(source)) {
    const stats = lstatSync(resolve(source, filename));

    if (stats.isDirectory()) {
      compileHandlebarsDir(resolve(source, filename), target, context);

      compileScaffolding(
        resolve(source, filename),
        resolve(target, compile(filename)(context)),
        context,
      );
    } else if (stats.isFile()) {
      compileHandlebarsFile(resolve(source, filename), target, context);
    }
  }
}
