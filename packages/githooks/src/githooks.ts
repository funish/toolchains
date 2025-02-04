/**
 * Core Git hooks management functionality
 * @module @funish/githooks/githooks
 */

import { type SpawnSyncReturns, spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import consola from "consola";
import { defu } from "defu";
import { encode } from "ini";
import { type GithooksName, loadGitConfig, loadGithooksConfig } from "./config";
import { saveScript } from "./script";

/**
 * Helper function to execute git commands
 * @param args Array of command arguments
 * @returns Result of the git command execution
 * @internal
 */
const git = (args: string[]): SpawnSyncReturns<Buffer> =>
  spawnSync("git", args, { stdio: "inherit" });

/**
 * Installs Git hooks in the specified directory
 *
 * @param path Directory to install hooks in (defaults to .git/hooks or .githooks)
 * @param isSaveScript Whether to save the installation script (true/false or script name)
 * @throws Error if installation fails
 *
 * @example
 * ```ts
 * // Install hooks in default location
 * await githooksInstall();
 *
 * // Install hooks in custom directory
 * await githooksInstall('.custom-hooks');
 *
 * // Install and save postinstall script
 * await githooksInstall('.githooks', true);
 * ```
 */
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
      const savedScript =
        typeof isSaveScript === "string" ? isSaveScript : "postinstall";
      path === ".githooks"
        ? saveScript(`${savedScript}`, "githooks install")
        : saveScript(`${savedScript}`, `githooks install ${hooksPath}`);
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

/**
 * Sets up a specific Git hook with the provided script
 *
 * @param hooks Name of the hook to set up
 * @param script Script content for the hook (optional)
 * @throws Error if setup fails or prerequisites are not met
 *
 * @example
 * ```ts
 * // Set up pre-commit hook
 * await githooksSetup('pre-commit', 'npm test');
 *
 * // Set up empty hook
 * await githooksSetup('post-merge');
 * ```
 */
export async function githooksSetup(
  hooks: GithooksName,
  script?: string | null,
) {
  try {
    const config = await loadGithooksConfig();
    const gitConfig = loadGitConfig();

    if (!gitConfig.core) {
      throw new Error("Git configuration is missing core section");
    }

    const hooksPath = gitConfig.core.hooksPath;

    if (config.hooks) {
      throw new Error(
        "Setup failed: hooks field already exists in configuration file. Please modify the hooks field instead of using setup command.",
      );
    }

    if (!hooksPath) {
      throw new Error(
        "Git hooks are not installed. Please run 'githooks install [dir]' first.",
      );
    }

    // Ensure hooks directory exists with correct permissions
    if (!existsSync(hooksPath)) {
      mkdirSync(hooksPath, { recursive: true, mode: 0o755 });
    }

    const hookScript = script ? `#!/bin/sh\n${script}` : "#!/bin/sh";
    const hookPath = `${hooksPath}/${hooks}`;

    writeFileSync(hookPath, hookScript, {
      mode: 0o0755,
    });

    consola.success(
      `Git hook '${hooks}' was set up successfully in ${hookPath}`,
    );
  } catch (error) {
    consola.error(
      `Failed to setup git hook: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    throw error;
  }
}

/**
 * Uninstalls all Git hooks and restores original configuration
 *
 * - Removes hooks directory
 * - Restores original Git config
 * - Resets hooks path setting
 *
 * @throws Error if uninstallation fails
 *
 * @example
 * ```ts
 * await githooksUninstall();
 * ```
 */
export async function githooksUninstall() {
  try {
    // Reset the git hooks directory to its default value
    git(["config", "--unset", "core.hooksPath"]);

    const hooksDir = ".git/hooks";

    // Only attempt to remove if directory exists
    if (existsSync(hooksDir)) {
      rmSync(hooksDir, { recursive: true, force: true });
      consola.info(`Removed git hooks directory: ${hooksDir}`);
    }

    // Restore git config backup if exists
    const configBackup = ".git/config.bak";
    if (existsSync(configBackup)) {
      renameSync(configBackup, ".git/config");
      consola.info("Restored git config from backup");
    }

    consola.success("Git hooks were successfully uninstalled");
  } catch (error) {
    consola.error(
      `Failed to uninstall git hooks: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    throw error;
  }
}

/**
 * Migrates hooks from Husky to @funish/githooks
 *
 * - Moves hooks from .husky directory to configured hooks path
 * - Preserves hook scripts and permissions
 * - Validates migration prerequisites
 *
 * @throws Error if migration fails or conflicts exist
 *
 * @example
 * ```ts
 * await githooksMigrateFromHusky();
 * ```
 */
export async function githooksMigrateFromHusky() {
  try {
    const config = await loadGithooksConfig();
    const gitConfig = loadGitConfig();

    if (!gitConfig.core) {
      throw new Error("Git configuration is missing core section");
    }

    const hooksPath = gitConfig.core.hooksPath || config.path;

    if (!hooksPath) {
      throw new Error(
        "No hooks path configured in git config or githooks config",
      );
    }

    if (config.hooks) {
      throw new Error(
        "Migration failed: hooks field exists in configuration file that would conflict with husky migration.",
      );
    }

    const huskyDir = ".husky";
    if (!existsSync(huskyDir)) {
      throw new Error("Husky directory '.husky' not found");
    }

    if (existsSync(hooksPath) && readdirSync(hooksPath).length > 0) {
      throw new Error(
        `The ${hooksPath} directory already exists and is not empty. Please migrate manually to avoid conflicts.`,
      );
    }

    renameSync(huskyDir, hooksPath);
    consola.success(
      `Successfully migrated husky hooks to ${hooksPath}. Please review the migrated hooks for any needed adjustments.`,
    );
  } catch (error) {
    consola.error(
      `Failed to migrate from husky: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    throw error;
  }
}
