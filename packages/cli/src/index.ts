/**
 * CLI utilities for building command line applications
 * @module @funish/cli
 */

import { existsSync, readFileSync } from "node:fs";
import {
  type ArgsDef,
  type CommandDef,
  defineCommand as cittyDefineCommand,
} from "citty";
import { defu } from "defu";
import { basename, dirname, resolve } from "pathe";
import type { PackageJson } from "pkg-types";

/**
 * Reads the nearest package.json file starting from the specified path
 * Traverses up the directory tree until a package.json is found
 *
 * @param path Starting directory path (defaults to the directory of the current script)
 * @returns The parsed package.json content or an empty object if not found
 * @example
 * ```ts
 * const pkg = readPackageJSON();
 * console.log(pkg.version); // "1.0.0"
 * ```
 */
export function readPackageJSON(path: string = process.cwd()): PackageJson {
  try {
    const pkgPath = resolve(path, "package.json");

    if (existsSync(pkgPath)) {
      const fileContent = readFileSync(pkgPath, "utf-8");
      return JSON.parse(fileContent) as PackageJson;
    }

    const parentPath = resolve(path, "..");
    if (parentPath === path) {
      return {};
    }
    return readPackageJSON(parentPath);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.warn(`Warning: Could not read package.json: ${error.message}`);
    } else {
      console.warn(`Warning: Could not read package.json: ${String(error)}`);
    }
    return {};
  }
}

/**
 * Defines a command with automatic metadata from package.json
 * Extends citty's defineCommand with automatic name, version and description
 *
 * @param def Command definition object
 * @returns Enhanced command definition with metadata from package.json
 * @example
 * ```ts
 * const cmd = defineCommand({
 *   args: {
 *     port: { type: 'number', default: 3000 }
 *   },
 *   run: (ctx) => {
 *     console.log(`Starting server on port ${ctx.args.port}`);
 *   }
 * });
 * ```
 */
export function defineCommand<T extends ArgsDef = ArgsDef>(
  def: CommandDef<T>,
): CommandDef<T> {
  const pkg = readPackageJSON();

  return cittyDefineCommand(
    defu(def, {
      meta: {
        name: basename(process.argv[1]),
        version: pkg.version || "0.0.0",
        description: pkg.description || "",
      },
    } as CommandDef<T>),
  );
}

export * from "citty";
