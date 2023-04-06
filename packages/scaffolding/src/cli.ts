import { createScaffolding } from "./scaffolding";
import { CLI } from "@funish/cli";

const cli = new CLI("scaffolding");

// Register commands
cli.command({
  options: [
    {
      name: "source",
      alias: "s",
      description: "Source directory",
    },
    {
      name: "target",
      alias: "t",
      description: "Target directory",
    },
  ],
  action: async (argv) => {
    if (argv.source && argv.target) {
      createScaffolding(argv.source as string, argv.target as string);
    } else {
      cli.help();
    }
  },
});

cli.version();

cli.help();
