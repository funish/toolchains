import { loadConfig } from "c12";
import { readFileSync } from "fs";
import { parse } from "ini";

// https://git-scm.com/docs/githooks
export const GithooksArray = [
  "applypatch-msg",
  "pre-applypatch",
  "post-applypatch",
  "pre-commit",
  "pre-merge-commit",
  "prepare-commit-msg",
  "commit-msg",
  "post-commit",
  "pre-rebase",
  "post-checkout",
  "post-merge",
  "pre-push",
  "pre-receive",
  "update",
  "proc-receive",
  "post-receive",
  "post-update",
  "reference-transaction",
  "push-to-checkout",
  "pre-auto-gc",
  "post-rewrite",
  "sendemail-validate",
  "fsmonitor-watchman",
  "p4-changelist",
  "p4-prepare-changelist",
  "p4-post-changelist",
  "p4-pre-submit",
  "post-index-change",
] as const;

export type GithooksName = (typeof GithooksArray)[number];

export interface GithooksConfig {
  path?: string;
  hooks?: {
    [key in GithooksName]?: string;
  };
  gitConfig?: object;
  extends?: string | [string];
}

export function defineGithooksConfig(config: GithooksConfig) {
  return config;
}

const ConfigDefaults = defineGithooksConfig({
  path: ".githooks",
});

export async function loadGithooksConfig(
  cwd?: string,
  overrides?: Partial<GithooksConfig>
): Promise<GithooksConfig> {
  const { config } = await loadConfig<GithooksConfig>({
    cwd,
    name: "githooks",
    defaults: ConfigDefaults,
    overrides: overrides,
  });

  return config ? config : ConfigDefaults;
}

export function loadGitConfig(path = ".git/config") {
  return parse(readFileSync(path, "utf-8"));
}
