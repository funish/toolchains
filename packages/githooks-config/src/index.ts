/**
 * Default Git hooks configuration for Funish projects
 * Provides standard hooks for linting staged files and commit messages
 * @module @funish/githooks-config
 */

import { defineGithooksConfig } from "@funish/githooks";

/**
 * Default configuration object
 * Sets up:
 * - pre-commit hook for linting staged files
 * - commit-msg hook for validating commit messages
 */
export default defineGithooksConfig({
  hooks: {
    "pre-commit": "pnpm lint staged",
    "commit-msg": "pnpm lint commit-msg",
  },
});
