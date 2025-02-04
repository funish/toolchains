/**
 * Type definitions for interactive command line prompts
 * @module @funish/prompt/types
 */

/**
 * Represents a selectable option in a prompt
 * @interface SelectOption
 * @property {string} label Display text for the option
 * @property {string} value Value returned when option is selected
 * @property {string} [hint] Optional hint text to display
 */
export type SelectOption = {
  label: string;
  value: string;
  hint?: string;
};

/**
 * Configuration options for text input prompts
 * @interface TextOptions
 * @property {"text"} [type] Type identifier for text prompts
 * @property {string} [default] Default value if no input is provided
 * @property {string} [placeholder] Placeholder text to display
 * @property {string} [initial] Initial value to display
 */
export type TextOptions = {
  type?: "text";
  default?: string;
  placeholder?: string;
  initial?: string;
};

/**
 * Configuration options for yes/no confirmation prompts
 * @interface ConfirmOptions
 * @property {"confirm"} type Type identifier for confirmation prompts
 * @property {boolean} [initial] Initial value (true/false)
 */
export type ConfirmOptions = {
  type: "confirm";
  initial?: boolean;
};

/**
 * Configuration options for single-select prompts
 * @interface SelectOptions
 * @property {"select"} type Type identifier for select prompts
 * @property {string} [initial] Initial selected value
 * @property {(string | SelectOption)[]} options Array of options to choose from
 */
export type SelectOptions = {
  type: "select";
  initial?: string;
  options: (string | SelectOption)[];
};

/**
 * Configuration options for multi-select prompts
 * @interface MultiSelectOptions
 * @property {"multiselect"} type Type identifier for multi-select prompts
 * @property {string[]} [initial] Initial selected values
 * @property {(string | SelectOption)[]} options Array of options to choose from
 * @property {boolean} [required] Whether at least one option must be selected
 */
export type MultiSelectOptions = {
  type: "multiselect";
  initial?: string[];
  options: (string | SelectOption)[];
  required?: boolean;
};

/**
 * Union type of all possible prompt configurations
 */
export type PromptOptions =
  | TextOptions
  | ConfirmOptions
  | SelectOptions
  | MultiSelectOptions;

/**
 * Type helper to infer the return type of a prompt based on its configuration
 * - Text prompts return string
 * - Confirm prompts return boolean
 * - Select prompts return the selected option
 * - Multi-select prompts return array of selected options
 */
export type inferPromptReturnType<T extends PromptOptions> =
  T extends TextOptions
    ? string
    : T extends ConfirmOptions
      ? boolean
      : T extends SelectOptions
        ? T["options"][number]
        : T extends MultiSelectOptions
          ? T["options"]
          : unknown;

/**
 * Configuration object for multiple prompts
 * Maps prompt names to their configurations
 */
export type Prompts = {
  [key: string]: PromptOptions;
};
