import { parseArgc } from "./argc";
import type { Args } from "./types";

export function parserRegexp(argv: string[]) {
  const args: Args = { _: [] };

  const argRegexp = /^(-+)(?<param>\w+)(-(?<subParam>\w+))?(=(?<value>\S+))?/;

  for (let i = 0; i < argv.length; i++) {
    const currentArg = argv[i];
    const match = currentArg.match(argRegexp) as RegExpMatchArray & {
      groups: {
        param: string;
        subParam: string;
        value: string;
      };
    };

    if (match) {
      const { param, subParam, value } = match.groups;
      const key = subParam ? `${param}-${subParam}` : param;

      if (value) {
        args[key] = parseArgc(value);
      } else if (param === "no" && subParam) {
        args[subParam] = false;
      } else {
        const nextArg = argv[i + 1];
        args[key] = nextArg && !nextArg.startsWith("-") ? nextArg : true;
      }
    } else if (!argv[i - 1]?.startsWith("-")) {
      args._.push(currentArg);
    }
  }

  return args;
}
