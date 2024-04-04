import { defineCommand, runMain } from "@funish/cli";
import { createScaffolding } from "./scaffolding";

const main = defineCommand({
  meta: {
    name: "scaffolding",
  },
  args: {
    source: {
      type: "string",
      description: "Source template",
      alias: "s",
    },
    target: {
      type: "string",
      description: "Target directory",
      alias: "t",
    },
  },
  async run({ args }) {
    if (!args.source || !args.target) {
      throw new Error("Missing source or target");
    }
    await createScaffolding(args.source, args.target);
  },
});

runMain(main);
