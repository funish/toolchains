import { execSync } from "node:child_process";
import { basename } from "node:path";
import micromatch from "micromatch";
import { loadLintConfig } from "./config";
import { git } from "./git";

export interface stagedLintConfig {
  [key: string]: string;
}

export const stagedLintConfigDefault = {
  "*.ts": "eslint --fix",
};

export const stagedFiles = git([
  "diff",
  "--cached",
  "--name-only",
  "--diff-filter=ACM",
]);

export async function stagedLint(config?: stagedLintConfig) {
  const loadStagedLintConfig = config || (await loadLintConfig()).staged;

  const files = stagedFiles.stdout.toString().split("\n");

  for (const key in loadStagedLintConfig) {
    for (const file of files) {
      if (micromatch.isMatch(basename(file), key)) {
        execSync(loadStagedLintConfig[key], { stdio: "inherit" });
        git(["add", "."]);
        break;
      }
    }
  }
}
