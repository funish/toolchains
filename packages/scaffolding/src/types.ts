export type SelectOption = {
  label: string;
  value: string;
  hint?: string;
};
export type TextOptions = {
  type?: "text";
  default?: string;
  placeholder?: string;
  initial?: string;
};
export type ConfirmOptions = {
  type: "confirm";
  initial?: boolean;
};
export type SelectOptions = {
  type: "select";
  initial?: string;
  options: (string | SelectOption)[];
};
export type MultiSelectOptions = {
  type: "multiselect";
  initial?: string;
  options: string[] | SelectOption[];
  required?: boolean;
};
export type PromptOptions =
  | TextOptions
  | ConfirmOptions
  | SelectOptions
  | MultiSelectOptions;
export type inferPromptReturnType<T> = T extends TextOptions
  ? string
  : T extends ConfirmOptions
    ? boolean
    : T extends SelectOptions
      ? T["options"][number]
      : T extends MultiSelectOptions
        ? T["options"]
        : unknown;
