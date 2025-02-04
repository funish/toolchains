/**
 * Configuration management for linting utilities
 * @module @funish/lint/config
 */

import { loadConfig } from "c12";
import type { commitMsgLintConfig } from "./commit-msg";
import type { stagedLintConfig } from "./staged";

/**
 * Main configuration interface for @funish/lint
 * @interface LintConfig
 * @property {stagedLintConfig} [staged] Configuration for staged files linting
 * @property {commitMsgLintConfig} [commitMsg] Configuration for commit message linting
 * @property {string | [string]} [extends] Base configuration(s) to extend from
 */
export interface LintConfig {
  staged?: stagedLintConfig;
  commitMsg?: commitMsgLintConfig;
  extends?: string | [string];
}

/**
 * Helper function to define lint configuration with type checking
 * @param config Configuration object
 * @returns Typed configuration object
 *
 * @example
 * ```ts
 * const config = defineLintConfig({
 *   commitMsg: {
 *     type: { enum: ['feat', 'fix'] }
 *   },
 *   staged: {
 *     '*.ts': 'eslint'
 *   }
 * });
 * ```
 */
export function defineLintConfig(config: LintConfig) {
  return config;
}

/**
 * Default configuration values
 * Provides sensible defaults for commit message validation:
 * - Conventional commit types
 * - Lowercase type and scope
 * - Phrase case description
 */
export const ConfigDefaults = {
  commitMsg: {
    type: {
      enum: [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
        "release",
        "wip",
      ],
      rules: ["lowercase"],
    },
    scope: {
      rules: ["lowercase"],
    },
    description: {
      rules: ["phrasecase"],
    },
  },
};

/**
 * Loads and merges lint configuration from various sources
 * Uses c12 to load configuration from lint.config.ts or similar files
 *
 * @param cwd Optional working directory to load config from
 * @param overrides Optional configuration overrides
 * @returns Resolved configuration object
 *
 * @example
 * ```ts
 * // Load from current directory
 * const config = await loadLintConfig();
 *
 * // Load from specific directory with overrides
 * const config = await loadLintConfig('./packages/myapp', {
 *   commitMsg: { type: { enum: ['feat', 'fix'] } }
 * });
 * ```
 */
export async function loadLintConfig(
  cwd?: string,
  overrides?: Partial<LintConfig>,
): Promise<LintConfig> {
  const { config } = await loadConfig<LintConfig>({
    cwd,
    name: "lint",
    defaults: ConfigDefaults,
    overrides: overrides,
  });

  return config ? config : ConfigDefaults;
}
