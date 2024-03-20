import { parseArgc } from "./argc";
import type { Args } from "./types";

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
