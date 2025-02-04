/**
 * Main module for command line argument parsing
 * @module @funish/argv
 */

import { parserRegexp } from "./regexp";
import { parserSplit } from "./split";

/**
 * Parses command line arguments and returns a structured object
 * @param argv Array of command line arguments to parse
 * @param options Configuration options for parsing
 * @param options.alias Object mapping aliases to their original option names (e.g. { p: 'port' })
 * @param options.default Object containing default values for options (e.g. { port: 8080 })
 * @param options.parser Parser to use ('split' or 'regexp')
 * @returns Object containing parsed arguments with types coerced appropriately
 * @example
 * ```ts
 * // Parse with aliases and defaults
 * parseArgv(['--port', '3000'], {
 *   alias: { p: 'port' },
 *   default: { port: 8080 }
 * });
 *
 * // Use regexp parser
 * parseArgv(['--name=value'], { parser: 'regexp' });
 * ```
 */
export function parseArgv(
  argv: string[],
  options?: {
    alias?: {
      [key: string]: string;
    };
    default?: {
      [key: string]: string | boolean | number;
    };
    parser?: "split" | "regexp";
  },
) {
  const parser = options?.parser || "split";
  const args = parser === "regexp" ? parserRegexp(argv) : parserSplit(argv);

  if (options?.alias) {
    for (const [key, alias] of Object.entries(options.alias)) {
      if (args[alias]) {
        args[key] = args[alias];
      } else if (args[key]) {
        args[alias] = args[key];
      }
    }
  }

  if (options?.default) {
    for (const [key, value] of Object.entries(options.default)) {
      if (!args[key]) {
        args[key] = value;
      }
    }
  }

  return args;
}

export { parserRegexp, parserSplit };
