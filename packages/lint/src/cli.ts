import { CLI } from "@funish/cli";
import { commitMsgLint } from "./commit-msg";
import { stagedLint } from "./staged";

export const cli = new CLI("lint");

cli.command({
  name: "commit-msg",
  description: "Lint commit message",
  action: async () => {
    await commitMsgLint();
  },
});

cli.command({
  name: "staged",
  description: "Lint staged files",
  action: async () => {
    await stagedLint();
  },
});

cli.version();

cli.help();
