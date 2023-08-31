import { GithooksName, loadGitConfig, loadGithooksConfig } from "./config";
import { saveScript } from "./script";
import { SpawnSyncReturns, spawnSync } from "child_process";
import consola from "consola";
import { defu } from "defu";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "fs";
import { encode } from "ini";

const git = (args: string[]): SpawnSyncReturns<Buffer> =>
  spawnSync("git", args, { stdio: "inherit" });

export async function githooksInstall(
  path?: string,
  isSaveScript?: boolean | string,
) {
  const config = await loadGithooksConfig();
  const hooksPath =
    path || config.hooks ? ".git/hooks" : config.path || ".githooks";

  git(["init"]);
  git(["config", "--unset", "core.hooksPath"]);

  // Create a folder for git hooks.
  mkdirSync(hooksPath, { recursive: true });

  if (config.hooks) {
    let ConfigHooks: GithooksName;
    for (ConfigHooks in config.hooks) {
      writeFileSync(
        `${hooksPath}/${ConfigHooks}`,
        `#!/bin/sh\n${config.hooks[ConfigHooks]}`,
        {
          mode: 0o0755,
        },
      );
    }

    consola.success("Git hooks are set up successfully.");
  } else {
    // Modify the git hooks directory.
    git(["config", "core.hooksPath", hooksPath]);

    if (isSaveScript) {
      typeof isSaveScript === "string"
        ? isSaveScript
        : isSaveScript === "postinstall";
      path === ".githooks"
        ? saveScript(`${isSaveScript}`, "githooks install")
        : saveScript(`${isSaveScript}`, `githooks install ${hooksPath}`);
    }

    consola.success(`Git hooks are installed in the ${hooksPath} directory.`);
  }

  if (config.gitConfig) {
    // Merge the git config file
    const gitConfig = defu(config.gitConfig, loadGitConfig());
    // Backup the git config file
    if (!existsSync(".git/config.bak")) {
      renameSync(".git/config", ".git/config.bak");
    }
    // Save the git config file
    writeFileSync(".git/config", encode(gitConfig));
  }
}

export async function githooksSetup(
  hooks: GithooksName,
  script?: string | null,
) {
  const config = await loadGithooksConfig();
  const hooksPath = loadGitConfig().core.hooksPath;

  if (config.hooks) {
    consola.error(
      "Setup failed, please change the hooks field in the configuration file to replace the setup command.",
    );
  } else if (!hooksPath) {
    consola.error(
      "Git hooks are not installed (try running githooks install [dir]).",
    );
  } else if (!existsSync(hooksPath)) {
    consola.error(
      `The ${hooksPath} directory does not exist (try running githooks install [dir]).`,
    );
  } else {
    script
      ? writeFileSync(`${hooksPath}/${hooks}`, `#!/bin/sh\n${script}`, {
          mode: 0o0755,
        })
      : writeFileSync(`${hooksPath}/${hooks}`, "#!/bin/sh", {
          mode: 0o0755,
        });

    consola.success("Git hooks are set up successfully.");
  }
}

export function githooksUninstall() {
  // Reset the git hooks directory to its default value.
  git(["config", "--unset", "core.hooksPath"]);
  // Remove the git hooks directory by nodejs api
  rmSync(".git/hooks", { recursive: true });
  // Restore the git config file
  if (existsSync(".git/config.bak")) {
    renameSync(".git/config.bak", ".git/config");
  }
  consola.success("Git hooks are uninstalled.");
}

export async function githooksMigrateFromHusky() {
  const config = await loadGithooksConfig();
  const hooksPath = loadGitConfig().core.hooksPath || config.path;

  if (config.hooks) {
    consola.error(
      "There are hooks in the configuration file that conflict with the husky migration process.",
    );
  } else if (!existsSync(hooksPath) || readdirSync(hooksPath).length === 0) {
    renameSync(".husky", hooksPath);
    consola.success(
      "Migration is complete, after that please deal with any conflicts manually.",
    );
  } else {
    consola.error(
      `The ${hooksPath} directory already exists, please try to migrate it manually.`,
    );
  }
}
