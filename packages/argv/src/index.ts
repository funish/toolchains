import { parserRegexp } from "./regexp";
import { parserSplit } from "./split";

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
  }
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
