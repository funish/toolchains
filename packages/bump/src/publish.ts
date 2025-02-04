/**
 * Package publishing functionality
 * @module @funish/bump/publish
 */

import { execSync } from "node:child_process";
import { consola } from "consola";
import { detectPackageManager } from "nypm";
import { readPackageJSON, resolvePackageJSON } from "pkg-types";
import { prerelease } from "semver";

/**
 * Executes an NPM command using the detected package manager
 *
 * @param path Directory path where the command should be executed
 * @param args Command arguments to pass to the package manager
 * @throws Error if package manager cannot be detected or command fails
 * @internal
 */
export async function useNPM(path: string | undefined, args: string[]) {
  try {
    const pkgPath = path || process.cwd();

    const detectedPackageManager = await detectPackageManager(pkgPath, {
      includeParentDirs: true,
    });
    if (!detectedPackageManager) {
      throw new Error(
        "Could not detect a package manager in the current directory or parent directories.",
      );
    }
    execSync(`${detectedPackageManager.name} ${args.join(" ")}`, {
      stdio: "inherit",
    });
  } catch (error) {
    consola.error(
      `Failed to execute npm command: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    throw error;
  }
}

/**
 * Publishes a package to npm with version tag handling
 *
 * For stable versions:
 * - Prompts for confirmation
 * - Publishes to 'latest' tag
 * - Also adds 'edge' tag
 *
 * For prerelease versions:
 * - Publishes directly with prerelease tag
 *
 * @param options Configuration options
 * @param options.path Path to the package directory (defaults to current working directory)
 * @param options.tag Tag to publish with (defaults to prerelease identifier or 'edge')
 * @throws Error if package.json cannot be found or publishing fails
 *
 * @example
 * ```ts
 * // Publish from current directory
 * await bumpPublish();
 *
 * // Publish with custom tag
 * await bumpPublish({ tag: 'beta' });
 *
 * // Publish from specific directory
 * await bumpPublish({ path: './packages/mypackage' });
 * ```
 */
export async function bumpPublish(
  options: { path?: string; tag?: string } = {
    path: process.cwd(),
  },
) {
  try {
    const pkgJsonPath = await resolvePackageJSON(options.path);
    if (!pkgJsonPath) {
      throw new Error(`Could not find package.json in ${options.path}`);
    }

    const { name, version } = await readPackageJSON(pkgJsonPath);

    if (!name || !version) {
      throw new Error("Package name and version are required in package.json");
    }

    const npm = async (args: string[]) => {
      await useNPM(options.path, args);
    };

    const pre = prerelease(version);

    if (!pre) {
      const answer = await consola.prompt(
        `Are you sure you want to publish ${name}@${version} to latest?`,
        {
          type: "confirm",
        },
      );

      if (answer) {
        await npm(["publish", "--access", "public"]);
        await npm(["dist-tag", "add", `${name}@${version}`, "edge"]);
        consola.success(`Successfully published ${name}@${version}`);
      } else {
        consola.info(`Publish cancelled for ${name}@${version}`);
      }
    } else {
      const tag = options.tag || (typeof pre[0] === "string" ? pre[0] : "edge");
      await npm(["publish", "--tag", tag]);
      consola.success(
        `Successfully published ${name}@${version} with tag ${tag}`,
      );
    }
  } catch (error) {
    consola.error(
      `Failed to publish package: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    throw error;
  }
}
