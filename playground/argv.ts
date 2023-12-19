import { parseArgs } from "citty";
import minimist from "minimist";
import mri from "mri";
import yargs from "yargs-parser";
import { parseArgv } from "../packages/argv/src";

const argv = ["-b", "--bool", "--no-meep", "--multi=baz", "--foo", "bar"];

console.log("\nparserSplit:");
console.log(parseArgv(argv));

if (
  !Object.is(
    JSON.stringify(parseArgv(argv)),
    JSON.stringify(
      parseArgv(argv, {
        parser: "regexp",
      }),
    ),
  )
) {
  console.log("\nparserRegexp:");
  console.log(
    parseArgv(argv, {
      parser: "regexp",
    }),
  );
}

if (
  !Object.is(
    JSON.stringify(parseArgv(argv)),
    JSON.stringify(parseArgs(argv, {})),
  )
) {
  console.log("\ncitty:");
  console.log(parseArgs(argv, {}));
}

if (!Object.is(JSON.stringify(parseArgv(argv)), JSON.stringify(mri(argv)))) {
  console.log("\nmri:");
  console.log(mri(argv));
}

if (
  !Object.is(JSON.stringify(parseArgv(argv)), JSON.stringify(minimist(argv)))
) {
  console.log("\nminimist:");
  console.log(minimist(argv));
}

if (!Object.is(JSON.stringify(parseArgv(argv)), JSON.stringify(yargs(argv)))) {
  console.log("\nyargs:");
  console.log(yargs(argv));
}
