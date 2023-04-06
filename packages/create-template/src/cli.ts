import { CLI } from "@funish/cli";
import { createScaffolding } from "@funish/scaffolding";

const cli = new CLI();

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
    createScaffolding(argv.source as string, argv.target as string, {});
  },
});

cli.version();

cli.help();
