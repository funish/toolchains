/**
 * Regular expression based command line argument parser
 * @module @funish/argv/regexp
 */

import { parseArgc } from "./argc";
import type { Args } from "./types";

/**
 * Parses command line arguments using regular expressions
 * Supports the following formats:
 * - Long options: --name=value, --flag
 * - Short options: -n=value, -f
 * - Negated flags: --no-flag
 * - Positional arguments
 *
 * @param argv Array of command line argument strings to parse
 * @returns Object containing parsed arguments with appropriate types
 * @example
 * ```ts
 * parserRegexp(['--name=value', '-f', '--no-debug']);
 * // Returns: { name: 'value', f: true, debug: false, _: [] }
 * ```
 */
export function parserRegexp(argv: string[]) {
  const args: Args = { _: [] };

  const argRegexp = /^(-{1,2})(?:no-)?(?<param>\w+)(?:=(?<value>\S+))?$/;

  for (let i = 0; i < argv.length; i++) {
    const currentArg = argv[i];
    const match = currentArg.match(argRegexp);

    if (match) {
      const { param, value } = match.groups as {
        param: string;
        value?: string;
      };
      const isLongOption = match[1] === "--";

      if (currentArg.startsWith("--no-")) {
        args[param] = false;
      } else if (value) {
        args[param] = parseArgc(value);
      } else {
        const nextArg = argv[i + 1];
        if (nextArg && !nextArg.startsWith("-")) {
          args[param] = parseArgc(nextArg);
          i++;
        } else {
          args[param] = true;
        }
      }
    } else if (
      !argv[i - 1] ||
      !argv[i - 1].startsWith("-") ||
      (argv[i - 1].startsWith("-") && args[argv[i - 1].slice(1)] !== true)
    ) {
      args._.push(currentArg);
    }
  }

  return args;
}
