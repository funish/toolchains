/**
 * Git command execution utilities
 * @module @funish/lint/git
 */

import { type SpawnSyncReturns, spawnSync } from "node:child_process";

/**
 * Executes a Git command synchronously
 *
 * @param args Array of command arguments to pass to Git
 * @returns Result of the Git command execution including stdout and stderr
 *
 * @example
 * ```ts
 * // Get current branch
 * const result = git(['rev-parse', '--abbrev-ref', 'HEAD']);
 * console.log(result.stdout.toString());
 *
 * // List staged files
 * const staged = git(['diff', '--cached', '--name-only']);
 * console.log(staged.stdout.toString());
 * ```
 */
export const git = (args: string[]): SpawnSyncReturns<Buffer> =>
  spawnSync("git", args);
