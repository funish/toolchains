/**
 * Type definitions for scaffolding functionality
 * @module @funish/scaffolding/types
 */

import type { Prompts, SelectOption } from "@funish/prompt";

/**
 * Context object containing values collected from prompts
 * Used for template rendering and scaffolding decisions
 * @interface ScaffoldingContext
 */
export type ScaffoldingContext = {
  [key: string]:
    | string
    | boolean
    | SelectOption
    | (string | SelectOption)[]
    | undefined;
};

/**
 * Configuration interface for scaffolding
 * @interface ScaffoldingConfig
 * @property {string} [$schema] Optional JSON schema URL for validation
 * @property {Prompts} [prompts] Interactive prompts configuration
 * @property {string | [string]} [extends] Base configuration(s) to extend from
 */
export type ScaffoldingConfig = {
  $schema?: string;
  prompts?: Prompts;
  extends?: string | [string];
};
