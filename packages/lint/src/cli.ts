import { defineCommand, runMain } from "@funish/cli";
import { commitMsgLint } from "./commit-msg";
import { stagedLint } from "./staged";

const main = defineCommand({
  meta: {
    name: "lint",
  },
  subCommands: {
    "commit-msg": {
      meta: {
        name: "commit-msg",
        description: "Lint commit message",
      },
      async run({ args }) {
        await commitMsgLint(args.path);
      },
    },
    staged: {
      meta: {
        name: "staged",
        description: "Lint staged files",
      },
      async run({ args }) {
        await stagedLint(args.path);
      },
    },
  },
});

runMain(main);
