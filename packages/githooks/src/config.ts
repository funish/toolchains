/**
 * Configuration management for Git hooks
 * @module @funish/githooks/config
 */

import { readFileSync } from "node:fs";
import { loadConfig } from "c12";
import { parse } from "ini";

/**
 * List of all available Git hooks
 * @see https://git-scm.com/docs/githooks
 */
export const GithooksArray = [
  "applypatch-msg",
  "pre-applypatch",
  "post-applypatch",
  "pre-commit",
  "pre-merge-commit",
  "prepare-commit-msg",
  "commit-msg",
  "post-commit",
  "pre-rebase",
  "post-checkout",
  "post-merge",
  "pre-push",
  "pre-receive",
  "update",
  "proc-receive",
  "post-receive",
  "post-update",
  "reference-transaction",
  "push-to-checkout",
  "pre-auto-gc",
  "post-rewrite",
  "sendemail-validate",
  "fsmonitor-watchman",
  "p4-changelist",
  "p4-prepare-changelist",
  "p4-post-changelist",
  "p4-pre-submit",
  "post-index-change",
] as const;

/**
 * Type representing valid Git hook names
 */
export type GithooksName = (typeof GithooksArray)[number];

/**
 * Configuration interface for @funish/githooks
 * @interface GithooksConfig
 * @property {string} [path] Custom path for Git hooks directory
 * @property {Object.<GithooksName, string>} [hooks] Map of hook names to their scripts
 * @property {object} [gitConfig] Additional Git configuration to apply
 * @property {string | [string]} [extends] Base configuration to extend from
 */
export interface GithooksConfig {
  path?: string;
  hooks?: {
    [key in GithooksName]?: string;
  };
  gitConfig?: object;
  extends?: string | [string];
}

/**
 * Helper function to define githooks configuration with type checking
 * @param config Configuration object
 * @returns Typed configuration object
 *
 * @example
 * ```ts
 * const config = defineGithooksConfig({
 *   path: '.hooks',
 *   hooks: {
 *     'pre-commit': 'npm test'
 *   }
 * });
 * ```
 */
export function defineGithooksConfig(config: GithooksConfig) {
  return config;
}

/**
 * Default configuration values
 * @internal
 */
const ConfigDefaults = defineGithooksConfig({
  path: ".githooks",
});

/**
 * Loads and merges githooks configuration from various sources
 *
 * @param cwd Working directory to start configuration search from
 * @param overrides Configuration values to override defaults
 * @returns Resolved configuration object
 *
 * @example
 * ```ts
 * const config = await loadGithooksConfig();
 * console.log(config.path); // ".githooks" or custom path
 * ```
 */
export async function loadGithooksConfig(
  cwd?: string,
  overrides?: Partial<GithooksConfig>,
): Promise<GithooksConfig> {
  const { config } = await loadConfig<GithooksConfig>({
    cwd,
    name: "githooks",
    defaults: ConfigDefaults,
    overrides: overrides,
  });

  return config ? config : ConfigDefaults;
}

/**
 * Loads and parses Git configuration from a file
 *
 * @param path Path to Git config file (defaults to .git/config)
 * @returns Parsed Git configuration object
 *
 * @example
 * ```ts
 * const gitConfig = loadGitConfig();
 * console.log(gitConfig.core.hooksPath);
 * ```
 */
export function loadGitConfig(path = ".git/config") {
  return parse(readFileSync(path, "utf-8"));
}
