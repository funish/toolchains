/**
 * Commit message validation functionality
 * @module @funish/lint/commit-msg
 */

import { existsSync, readFileSync } from "node:fs";
import consola from "consola";
import {
  char,
  charNotIn,
  createRegExp,
  exactly,
  letter,
  maybe,
  oneOrMore,
  wordChar,
} from "magic-regexp";
import { loadLintConfig } from "./config";
import { git } from "./git";

/**
 * Configuration rules for commit message validation
 * @interface commitMsgLintConfigRules
 * @property {string[]} [enum] List of allowed values
 * @property {string[]} [rules] List of validation rules to apply
 */
export interface commitMsgLintConfigRules {
  enum?: string[];
  rules?: string[];
}

/**
 * Valid keys for commit message configuration
 */
export type commitMsgLintConfigKey = keyof commitMsgLintConfig;

/**
 * Configuration interface for commit message validation
 * @interface commitMsgLintConfig
 * @property {RegExp | commitMsgLintConfigRules} [type] Validation for commit type
 * @property {RegExp | commitMsgLintConfigRules} [scope] Validation for commit scope
 * @property {RegExp | commitMsgLintConfigRules} [description] Validation for commit description
 * @property {RegExp | commitMsgLintConfigRules} [body] Validation for commit body
 */
export interface commitMsgLintConfig {
  type?: RegExp | commitMsgLintConfigRules;
  scope?: RegExp | commitMsgLintConfigRules;
  description?: RegExp | commitMsgLintConfigRules;
  body?: RegExp | commitMsgLintConfigRules;
}

/**
 * Predefined regular expressions for common validation rules
 * @const
 */
export const commitMsgLintConfigRulesRegexp: {
  [key: string]: RegExp;
} = {
  lowercase: createRegExp(
    oneOrMore(letter.lowercase).at.lineStart().at.lineEnd(),
  ),
  uppercase: createRegExp(
    oneOrMore(letter.uppercase).at.lineStart().at.lineEnd(),
  ),
  camelcase: createRegExp(
    oneOrMore(letter.lowercase).at.lineStart(),
    letter.uppercase,
    oneOrMore(letter.lowercase).grouped().times.any().at.lineEnd(),
  ),
  kebabcase: createRegExp(
    oneOrMore(letter.lowercase).at.lineStart(),
    "-",
    oneOrMore(letter.lowercase).grouped().times.any().at.lineEnd(),
  ),
  snakecase: createRegExp(
    oneOrMore(letter.lowercase).at.lineStart(),
    "_",
    oneOrMore(letter.lowercase).grouped().times.any().at.lineEnd(),
  ),
  pascalcase: createRegExp(
    letter.uppercase.at.lineStart(),
    oneOrMore(letter.lowercase),
    letter.uppercase,
    oneOrMore(letter.lowercase).grouped().times.any().at.lineEnd(),
  ),
  sentencecase: createRegExp(
    letter.uppercase.at.lineStart(),
    oneOrMore(letter.lowercase).at.lineEnd(),
  ),
  phrasecase: createRegExp(
    oneOrMore(letter.lowercase).at.lineStart(),
    oneOrMore(char),
    charNotIn(".").at.lineEnd(),
  ),
  semver:
    /^(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*)(?:-(?<prerelease>(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+(?<buildmetadata>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/,
};

/**
 * Raw commit message from Git
 * Reads from .git/COMMIT_EDITMSG or last commit if not available
 */
export const commitMsgRaw = existsSync(".git/COMMIT_EDITMSG")
  ? readFileSync(".git/COMMIT_EDITMSG", "utf-8")
  : git(["log", "-1", "--pretty=%B"]).stdout.toString();

/**
 * Parsed commit message components
 */
export interface CommitMessage {
  type?: string;
  scope?: string;
  description?: string;
  body?: string;
  breaking?: string;
}

/**
 * Regular expression for parsing conventional commit format
 * Format: type(scope)!: description
 *
 * [optional body]
 *
 * [optional footer(s)]
 */
export const commitMsgRegexp = createRegExp(
  // Type must be a noun
  oneOrMore(wordChar).as("type"),
  // Optional scope in parentheses
  maybe(exactly("(", oneOrMore(char).as("scope"), ")").grouped()),
  // Optional breaking change marker
  maybe(exactly("!").as("breaking")),
  // Required colon and space
  ": ",
  // Description (first line)
  oneOrMore(charNotIn("\n")).as("description"),
  // Optional body after blank line
  maybe(exactly("\n\n", oneOrMore(char)).as("body")),
);

/**
 * Regular expression for parsing footer format
 * Format: token: value or token #value
 */
export const footerRegexp = createRegExp(
  // Token must use - in place of whitespace
  oneOrMore(wordChar.or("-")).as("token"),
  // Separator can be : or #
  exactly(": ").or(exactly(" #")).grouped(),
  // Value can contain spaces and newlines
  oneOrMore(char).as("value"),
);

/**
 * Parsed commit message components
 */
export const commitMsg = commitMsgRaw.match(commitMsgRegexp)?.groups as {
  [key in commitMsgLintConfigKey]: string;
};

/**
 * Validates a commit message against configured rules
 *
 * @param config Optional configuration object (defaults to loaded config)
 * @throws Error if validation fails
 *
 * @example
 * ```ts
 * // Use default config
 * await commitMsgLint();
 *
 * // Use custom config
 * await commitMsgLint({
 *   type: { enum: ['feat', 'fix', 'docs'] },
 *   scope: { rules: ['lowercase'] },
 *   description: { rules: ['sentencecase'] }
 * });
 * ```
 */
export async function commitMsgLint(config?: commitMsgLintConfig) {
  try {
    const loadCommitMsgLint =
      config || (await loadLintConfig()).commitMsg || {};
    const keys = Object.keys(loadCommitMsgLint) as commitMsgLintConfigKey[];
    const commitMsgMatch = commitMsgRegexp.exec(commitMsgRaw);
    const commitMsgGroups = commitMsgMatch?.groups as CommitMessage | undefined;

    if (!commitMsgGroups || !keys.some((key) => key in commitMsgGroups)) {
      if (!commitMsgRaw.startsWith("Merge branch")) {
        throw new Error(
          "Commit message does not match the conventional commit format",
        );
      }
      return;
    }

    // Check for BREAKING CHANGE in footer
    const hasBreakingChange =
      commitMsgGroups.breaking === "!" ||
      (commitMsgGroups.body &&
        /^BREAKING[- ]CHANGE:\s/m.test(commitMsgGroups.body));

    for (const key of keys) {
      const element = loadCommitMsgLint[key];
      const value = commitMsgGroups[key];

      // Make scope optional
      if (!value && key === "scope") {
        continue;
      }

      // Make body optional
      if (!value && key === "body") {
        continue;
      }

      if (!value) {
        throw new Error(`Missing ${key} in commit message`);
      }

      if (element instanceof RegExp) {
        if (!element.test(value)) {
          throw new Error(
            `Commit message ${key} does not match the regular expression ${element}`,
          );
        }
      } else if (typeof element === "object") {
        const { enum: enumValues, rules } = element;

        if (enumValues?.length) {
          if (!enumValues.includes(value)) {
            throw new Error(
              `Commit message ${key} must be one of: ${enumValues.join(", ")}`,
            );
          }
        } else if (rules?.length) {
          for (const rule of rules) {
            const ruleRegex = commitMsgLintConfigRulesRegexp[rule];
            if (!ruleRegex) {
              throw new Error(`Unknown rule: ${rule}`);
            }
            if (!ruleRegex.test(value)) {
              throw new Error(
                `Commit message ${key} does not match the rule ${rule}`,
              );
            }
          }
        } else {
          throw new Error(
            `Invalid configuration for ${key}: must specify either enum or rules`,
          );
        }
      }
    }

    // Parse and validate footers if body exists and contains footers
    if (commitMsgGroups.body) {
      const footers = commitMsgGroups.body
        .split("\n")
        .filter((line) => footerRegexp.test(line));

      for (const footer of footers) {
        const match = footerRegexp.exec(footer);
        if (match?.groups) {
          const { token, value } = match.groups;
          // Validate BREAKING CHANGE token
          if (token === "BREAKING-CHANGE" || token === "BREAKING CHANGE") {
            if (!value.trim()) {
              throw new Error("BREAKING CHANGE footer must have a description");
            }
          }
        }
      }
    }

    consola.success("Commit message validation passed");
  } catch (error) {
    consola.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
