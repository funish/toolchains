/**
 * Package.json scripts management utilities
 * @module @funish/githooks/script
 */

import { resolve } from "node:path";
import { cwd } from "node:process";
import { readPackageJSON, writePackageJSON } from "pkg-types";

/**
 * Saves a script to package.json scripts section
 *
 * @param name Name of the script to save
 * @param script Script command to save
 * @param path Optional path to package.json directory (defaults to current working directory)
 * @returns Promise that resolves when script is saved
 *
 * @example
 * ```ts
 * // Save in current directory
 * await saveScript('postinstall', 'githooks install');
 *
 * // Save in specific directory
 * await saveScript('test', 'jest', './packages/mypackage');
 * ```
 */
export async function saveScript(name: string, script: string, path?: string) {
  const pkg = await readPackageJSON(path ? path : cwd());

  pkg.scripts = {
    ...pkg.scripts,
    [name]: script,
  };

  await writePackageJSON(resolve(path ? path : cwd(), "package.json"), pkg);
}
