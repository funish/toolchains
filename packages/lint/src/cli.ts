/**
 * Command-line interface for @funish/lint
 * Provides CLI commands for commit message and staged files linting
 * @module @funish/lint/cli
 */

import { defineCommand, runMain } from "@funish/cli";
import { commitMsgLint } from "./commit-msg";
import { stagedLint } from "./staged";

/**
 * Main CLI command definition
 * Provides two subcommands:
 * - commit-msg: Validates commit messages against configured rules
 * - staged: Runs linters on staged files
 *
 * @example
 * ```bash
 * # Lint commit message
 * funish lint commit-msg
 *
 * # Lint staged files
 * funish lint staged
 * ```
 */
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
