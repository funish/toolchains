/**
 * Version bumping functionality
 * @module @funish/bump/version
 */

import {
  readPackageJSON,
  resolvePackageJSON,
  writePackageJSON,
} from "pkg-types";
import { type ReleaseType, type SemVer, inc, prerelease } from "semver";

/**
 * Bumps the version of a package according to semver rules
 *
 * @param options Configuration options
 * @param options.path Path to the package directory (defaults to current working directory)
 * @param options.release Type of version bump (defaults to 'prerelease')
 * @param options.tag Tag for prerelease versions (defaults to 'edge' or current prerelease tag)
 * @returns Promise that resolves when version is bumped
 * @throws Error if package.json cannot be found or version cannot be bumped
 *
 * @example
 * ```ts
 * // Bump prerelease version
 * await bumpVersion();
 *
 * // Bump minor version
 * await bumpVersion({ release: 'minor' });
 *
 * // Bump version with custom tag
 * await bumpVersion({ release: 'prerelease', tag: 'beta' });
 * ```
 */
export async function bumpVersion(
  options: {
    path?: string;
    release?: ReleaseType;
    tag?: string;
  } = { path: process.cwd(), release: "prerelease" },
) {
  const pkg = await readPackageJSON(await resolvePackageJSON(options.path));
  const pre = prerelease(pkg.version as unknown as SemVer);
  const version = inc(
    pkg.version as unknown as SemVer,
    options.release || (pre ? "prerelease" : "patch"),
    options.tag || (pre && typeof pre[0] === "string" ? pre[0] : "edge"),
  );
  if (version) {
    pkg.version = version;
    await writePackageJSON(await resolvePackageJSON(options.path), pkg);
  }
  return version;
}
