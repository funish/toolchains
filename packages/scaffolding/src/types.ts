export type ScaffoldingContextType = string | number | boolean;

export interface ScaffoldingContext {
  [key: string]:
    | ScaffoldingContextType
    | Record<string, ScaffoldingContextType | ScaffoldingContext>;
}

export type SelectOption = {
  label: string;
  value: string;
  hint?: string;
  message?: string;
};

export type TextOptions = {
  type?: "text";
  default?: string;
  placeholder?: string;
  initial?: string;
  message?: string;
};

export type ConfirmOptions = {
  type: "confirm";
  initial?: boolean;
  message?: string;
};

export type SelectOptions = {
  type: "select";
  initial?: string;
  options: (string | SelectOption)[];
  message?: string;
};

export type MultiSelectOptions = {
  type: "multiselect";
  initial?: string;
  options: string[] | SelectOption[];
  required?: boolean;
  message?: string;
};

export type PromptOptions =
  | TextOptions
  | ConfirmOptions
  | SelectOptions
  | MultiSelectOptions;
