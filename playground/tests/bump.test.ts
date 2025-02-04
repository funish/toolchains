/**
 * Tests for the @funish/bump package
 * Tests version management functionality including patch, minor, major, and prerelease version bumping
 */

import { unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { bumpPublish, bumpVersion } from "@funish/bump";
import { assertEquals, assertThrowsAsync } from "./test-utils";
import type { TestSuite } from "./test-utils";

/**
 * Creates a temporary package.json file for testing
 * @param version Initial version string to set in package.json
 * @returns Path to the created temporary file
 */
const createTempPackageJson = (version: string) => {
  const pkgPath = join(process.cwd(), "temp-pkg.json");
  writeFileSync(
    pkgPath,
    JSON.stringify({
      name: "test-package",
      version,
    }),
  );
  return pkgPath;
};

export const bumpTests: TestSuite = {
  name: "bump",
  tests: [
    {
      name: "should bump patch version",
      async fn() {
        // Create temporary package.json with initial version
        const pkgPath = createTempPackageJson("1.0.0");
        try {
          // Bump patch version (1.0.0 -> 1.0.1)
          await bumpVersion({
            path: pkgPath,
            release: "patch",
          });
          const pkg = require(pkgPath);
          assertEquals(pkg.version, "1.0.1");
        } finally {
          // Clean up temporary file
          unlinkSync(pkgPath);
        }
      },
    },
    {
      name: "should bump minor version",
      async fn() {
        // Create temporary package.json with initial version
        const pkgPath = createTempPackageJson("1.0.0");
        try {
          // Bump minor version (1.0.0 -> 1.1.0)
          await bumpVersion({
            path: pkgPath,
            release: "minor",
          });
          const pkg = require(pkgPath);
          assertEquals(pkg.version, "1.1.0");
        } finally {
          // Clean up temporary file
          unlinkSync(pkgPath);
        }
      },
    },
    {
      name: "should bump major version",
      async fn() {
        // Create temporary package.json with initial version
        const pkgPath = createTempPackageJson("1.0.0");
        try {
          // Bump major version (1.0.0 -> 2.0.0)
          await bumpVersion({
            path: pkgPath,
            release: "major",
          });
          const pkg = require(pkgPath);
          assertEquals(pkg.version, "2.0.0");
        } finally {
          // Clean up temporary file
          unlinkSync(pkgPath);
        }
      },
    },
    {
      name: "should use prerelease as default release type",
      async fn() {
        // Create temporary package.json with initial version
        const pkgPath = createTempPackageJson("1.0.0");
        try {
          // Default behavior should bump to prerelease (1.0.0 -> 1.0.1-edge.0)
          await bumpVersion({
            path: pkgPath,
          });
          const pkg = require(pkgPath);
          assertEquals(pkg.version, "1.0.1-edge.0");
        } finally {
          // Clean up temporary file
          unlinkSync(pkgPath);
        }
      },
    },
    {
      name: "should bump prerelease version with custom tag",
      async fn() {
        // Create temporary package.json with initial version
        const pkgPath = createTempPackageJson("1.0.0");
        try {
          // Bump to prerelease version with alpha tag (1.0.0 -> 1.0.1-alpha.0)
          await bumpVersion({
            path: pkgPath,
            release: "prerelease",
            tag: "alpha",
          });
          const pkg = require(pkgPath);
          assertEquals(pkg.version, "1.0.1-alpha.0");
        } finally {
          // Clean up temporary file
          unlinkSync(pkgPath);
        }
      },
    },
    {
      name: "should fail with invalid package.json",
      async fn() {
        // Test error handling when package.json doesn't exist
        await assertThrowsAsync(
          () =>
            bumpVersion({
              path: "non-existent-package.json",
              release: "patch",
            }),
          /Could not find package.json/,
        );
      },
    },
  ],
};
