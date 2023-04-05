import { commitMsgLintConfig } from "./commit-msg";
import { stagedLintConfig } from "./staged";
import { loadConfig } from "c12";

export interface LintConfig {
  staged?: stagedLintConfig;
  commitMsg?: commitMsgLintConfig;
  extends?: string | [string];
}

export function defineLintConfig(config: LintConfig) {
  return config;
}

const ConfigDefaults = defineLintConfig({
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
});

export async function loadLintConfig(
  cwd?: string,
  overrides?: Partial<LintConfig>
): Promise<LintConfig> {
  const { config } = await loadConfig<LintConfig>({
    cwd,
    name: "lint",
    defaults: ConfigDefaults,
    overrides: overrides,
  });

  return config ? config : ConfigDefaults;
}
