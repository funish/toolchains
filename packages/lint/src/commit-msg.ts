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

export interface commitMsgLintConfigRules {
  enum?: string[];
  rules?: string[];
}

export type commitMsgLintConfigKey = keyof commitMsgLintConfig;

export interface commitMsgLintConfig {
  type?: RegExp | commitMsgLintConfigRules;
  scope?: RegExp | commitMsgLintConfigRules;
  description?: RegExp | commitMsgLintConfigRules;
}

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

export const commitMsgRaw = existsSync(".git/COMMIT_EDITMSG")
  ? readFileSync(".git/COMMIT_EDITMSG", "utf-8")
  : git(["log", "-1", "--pretty=%B"]).stdout.toString();

// Commit message format: type(scope)!: description
export const commitMsgRegexp = createRegExp(
  oneOrMore(wordChar).as("type"),
  maybe(exactly("(", oneOrMore(char).as("scope"), ")").grouped()),
  maybe(exactly("!").as("breaking")),
  ": ",
  oneOrMore(char).as("description"),
);

export const commitMsg = commitMsgRaw.match(commitMsgRegexp)?.groups as {
  [key in commitMsgLintConfigKey]: string;
};

export async function commitMsgLint(config?: commitMsgLintConfig) {
  const loadCommitMsgLint = config || (await loadLintConfig()).commitMsg || {};
  const keys = Object.keys(loadCommitMsgLint);
  const { groups: commitMsgGroups } = commitMsgRegexp.exec(commitMsgRaw) ?? {};

  if (!commitMsgGroups || !keys.some((key) => key in commitMsgGroups)) {
    if (!commitMsgRaw.startsWith("Merge branch")) {
      consola.error(
        "Commit message does not match the conventional commit format.",
      );
    }
    process.exit(1);
  }

  for (const key of keys) {
    const element = loadCommitMsgLint[key as commitMsgLintConfigKey];

    if (element instanceof RegExp) {
      if (!element.test(commitMsgGroups[key])) {
        consola.error(
          `Commit message ${key} does not match the regular expression ${element}.`,
        );
        process.exit(1);
      }
    } else if (typeof element === "object") {
      const { enum: enumValues, rules } = element;

      if (enumValues) {
        if (!enumValues.includes(commitMsgGroups[key])) {
          consola.error(
            `Commit message ${key} does not match the enum ${enumValues}.`,
          );
          process.exit(1);
        }
      } else if (rules) {
        for (const rule of rules) {
          const ruleRegex = commitMsgLintConfigRulesRegexp[rule];
          if (!ruleRegex.test(commitMsgGroups[key])) {
            consola.error(
              `Commit message ${key} does not match the rule ${rule}.`,
            );
            process.exit(1);
          }
        }
      } else {
        consola.error(
          "Commit message does not match the conventional commit format.",
        );
        process.exit(1);
      }
    }
  }
}
