/**
 * Command-line interface for scaffolding functionality
 * Provides commands for creating projects from templates
 * @module @funish/scaffolding/cli
 */

import { defineCommand, runMain } from "@funish/cli";
import { createScaffolding } from "./scaffolding";

/**
 * Main CLI command definition
 * Provides a command to create projects from templates with the following options:
 * - source (-s): Source template location
 * - target (-t): Target directory for the new project
 *
 * @example
 * ```bash
 * # Create a project from a GitHub template
 * scaffolding -s github:user/repo -t ./my-project
 *
 * # Create a project from a local template
 * scaffolding -s ./templates/vue-app -t ./my-vue-app
 * ```
 */
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
