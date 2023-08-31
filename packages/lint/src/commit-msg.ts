import { loadLintConfig } from "./config";
import { git } from "./git";
import consola from "consola";
import { existsSync, readFileSync } from "fs";

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

export const commitMsgLintConfigRulesRegexp = {
  lowercase: /^[a-z]+$/,
  uppercase: /^[A-Z]+$/,
  camelcase: /^[a-z]+([A-Z][a-z]+)*$/,
  kebabcase: /^[a-z]+(-[a-z]+)*$/,
  snakecase: /^[a-z]+(_[a-z]+)*$/,
  pascalcase: /^[A-Z][a-z]+([A-Z][a-z]+)*$/,
  sentencecase: /^[A-Z][a-z]+$/,
  phrasecase: /^[a-z]+.+[^.]$/,
  semver:
    /^(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*)(?:-(?<prerelease>(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+(?<buildmetadata>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/,
} as {
  [key: string]: RegExp;
};

export const commitMsgRaw = existsSync(".git/COMMIT_EDITMSG")
  ? readFileSync(".git/COMMIT_EDITMSG", "utf-8")
  : git(["log", "-1", "--pretty=%B"]).stdout.toString();

// Commit message format: type(scope)!: description
export const commitMsgRegexp =
  /(?<type>\w+)(\((?<scope>.+)\))?(?<breaking>!)?: (?<description>.+)/;

export const commitMsg = commitMsgRaw.match(commitMsgRegexp)?.groups as {
  [key in commitMsgLintConfigKey]: string;
};

export async function commitMsgLint(config?: commitMsgLintConfig) {
  const loadCommitMsgLint = config || (await loadLintConfig()).commitMsg;

  if (loadCommitMsgLint && commitMsgRegexp.test(commitMsgRaw)) {
    for (const key in loadCommitMsgLint) {
      if (Object.prototype.hasOwnProperty.call(loadCommitMsgLint, key)) {
        const element = loadCommitMsgLint[key as commitMsgLintConfigKey];
        if (element instanceof RegExp) {
          if (!element.test(commitMsg[key as commitMsgLintConfigKey])) {
            consola.error(
              `Commit message ${key} does not match the regular expression ${element}.`,
            );
            process.exit(1);
          }
        } else if (typeof element === "object") {
          if (element.enum) {
            if (
              !element.enum.includes(commitMsg[key as commitMsgLintConfigKey])
            ) {
              consola.error(
                `Commit message ${key} does not match the enum ${element.enum}.`,
              );
              process.exit(1);
            }
          } else if (element.rules) {
            for (const rule of element.rules) {
              if (
                !commitMsgLintConfigRulesRegexp[rule].test(
                  commitMsg[key as commitMsgLintConfigKey],
                )
              ) {
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
  } else if (!commitMsgRaw.startsWith("Merge branch")) {
    consola.error(
      "Commit message does not match the conventional commit format.",
    );
    process.exit(1);
  }
}
