/**
 * String splitting based command line argument parser
 * @module @funish/argv/split
 */

import { parseArgc } from "./argc";
import type { Args } from "./types";

/**
 * Parses command line arguments using string splitting
 * Supports the following formats:
 * - Long options: --name=value, --flag
 * - Short options: -n=value, -f
 * - Negated flags: --no-flag
 * - Positional arguments
 *
 * This parser is simpler than the regexp parser but handles most common cases
 *
 * @param argv Array of command line argument strings to parse
 * @returns Object containing parsed arguments with appropriate types
 * @example
 * ```ts
 * parserSplit(['--name=value', '-f', '--no-debug']);
 * // Returns: { name: 'value', f: true, debug: false, _: [] }
 * ```
 */
export function parserSplit(argv: string[]) {
  const args: Args = { _: [] };

  for (let i = 0; i < argv.length; i++) {
    const currentArg = argv[i];

    if (currentArg.startsWith("-")) {
      const currentParam = currentArg.startsWith("--")
        ? currentArg.slice(2)
        : currentArg.slice(1);

      if (currentParam.includes("=")) {
        const [key, value] = currentParam.split("=");
        args[key] = parseArgc(value);
      } else if (currentParam.startsWith("no-")) {
        const key = currentParam.slice(3);
        args[key] = false;
      } else {
        const nextArg = argv[i + 1];
        args[currentParam] =
          nextArg && !nextArg.startsWith("-") ? nextArg : true;
      }
    } else if (!argv[i - 1]?.startsWith("-")) {
      args._.push(currentArg);
    }
  }

  return args;
}
