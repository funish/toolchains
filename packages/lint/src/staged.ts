/**
 * Staged files linting functionality
 * Provides utilities for linting files that are staged in Git
 * @module @funish/lint/staged
 */

import { execSync } from "node:child_process";
import { basename } from "node:path";
import micromatch from "micromatch";
import { loadLintConfig } from "./config";
import { git } from "./git";

/**
 * Configuration interface for staged files linting
 * Maps file patterns to lint commands
 * @interface stagedLintConfig
 * @example
 * ```ts
 * {
 *   "*.ts": "eslint --fix",
 *   "*.js": "prettier --write",
 *   "*.css": "stylelint --fix"
 * }
 * ```
 */
export interface stagedLintConfig {
  [key: string]: string;
}

/**
 * Default configuration for staged files linting
 * Applies ESLint to TypeScript files by default
 */
export const stagedLintConfigDefault = {
  "*.ts": "eslint --fix",
};

/**
 * List of currently staged files in Git
 * Uses git diff to get files that are:
 * - Cached (staged)
 * - Only filenames
 * - Added, Created, or Modified (ACM)
 */
export const stagedFiles = git([
  "diff",
  "--cached",
  "--name-only",
  "--diff-filter=ACM",
]);

/**
 * Lints staged files according to configuration
 * For each staged file that matches a pattern in the config,
 * runs the corresponding lint command and stages the changes
 *
 * @param config Optional configuration object (defaults to loaded config)
 *
 * @example
 * ```ts
 * // Use default config
 * await stagedLint();
 *
 * // Use custom config
 * await stagedLint({
 *   "*.ts": "eslint --fix",
 *   "*.css": "stylelint --fix"
 * });
 * ```
 */
export async function stagedLint(config?: stagedLintConfig) {
  const loadStagedLintConfig = config || (await loadLintConfig()).staged;

  const files = stagedFiles.stdout.toString().split("\n");

  for (const key in loadStagedLintConfig) {
    for (const file of files) {
      if (micromatch.isMatch(basename(file), key)) {
        execSync(loadStagedLintConfig[key], { stdio: "inherit" });
        git(["add", "."]);
        break;
      }
    }
  }
}
