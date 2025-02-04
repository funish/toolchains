/**
 * Configuration management for scaffolding
 * @module @funish/scaffolding/config
 */

import { loadConfig } from "c12";
import type { ScaffoldingConfig } from "./types";

/**
 * Helper function to define scaffolding configuration with type checking
 *
 * @param config Configuration object
 * @returns Typed configuration object
 *
 * @example
 * ```ts
 * const config = defineScaffoldingConfig({
 *   prompts: {
 *     name: { type: 'text', placeholder: 'Project name' },
 *     framework: { type: 'select', options: ['vue', 'react'] }
 *   }
 * });
 * ```
 */
export function defineScaffoldingConfig(config: ScaffoldingConfig) {
  return config;
}

/**
 * Default configuration with empty values
 */
const ConfigDefaults = defineScaffoldingConfig({});

/**
 * Loads and merges scaffolding configuration from various sources
 * Uses c12 to load configuration from scaffolding.config.ts or similar files
 *
 * @param cwd Optional working directory to load config from
 * @param overrides Optional configuration overrides
 * @returns Promise resolving to the merged configuration
 *
 * @example
 * ```ts
 * // Load from current directory
 * const config = await loadScaffoldingConfig();
 *
 * // Load with overrides
 * const config = await loadScaffoldingConfig('./', {
 *   prompts: {
 *     name: { type: 'text' }
 *   }
 * });
 * ```
 */
export async function loadScaffoldingConfig(
  cwd?: string,
  overrides?: Partial<ScaffoldingConfig>,
): Promise<ScaffoldingConfig> {
  const { config } = await loadConfig<ScaffoldingConfig>({
    cwd,
    name: "scaffolding",
    defaults: ConfigDefaults,
    overrides: overrides,
  });

  return config ? config : ConfigDefaults;
}
