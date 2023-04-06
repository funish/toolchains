import { parseArgv } from "@funish/argv";
import { Bench } from "@funish/bench";
import { parseArgs } from "citty";
import minimist from "minimist";
import mri from "mri";
import yargs from "yargs-parser";

const argv = [
  "cmd",
  "-b",
  "--bool",
  "--no-meep",
  "--multi=baz",
  "--foo",
  "bar",
];

const bench = new Bench({
  unit: "ns",
});

bench
  .add("parserSplit", () => {
    parseArgv(argv);
  })
  .add("parserRegexp", () => {
    parseArgv(argv, {
      parser: "regexp",
    });
  })
  .add("citty", () => {
    parseArgs(argv, {});
  })
  .add("mri", () => {
    mri(argv);
  })
  .add("minimist", () => {
    minimist(argv);
  })
  .add("yargs", () => {
    yargs(argv);
  });

bench.print();
