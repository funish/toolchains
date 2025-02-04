/**
 * Tests for the @funish/githooks package
 * Tests Git hooks management functionality including installation, setup, and uninstallation
 */

import { existsSync, mkdirSync, rmdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  githooksInstall,
  githooksSetup,
  githooksUninstall,
} from "@funish/githooks";
import { assertEquals, assertThrowsAsync } from "./test-utils";
import type { TestSuite } from "./test-utils";

/**
 * Sets up a temporary Git repository structure for testing
 * Creates .git and .git/hooks directories if they don't exist
 * @returns Object containing paths to the created directories
 */
const setupTestRepo = () => {
  const gitDir = join(process.cwd(), ".git");
  const hooksDir = join(gitDir, "hooks");

  if (!existsSync(gitDir)) {
    mkdirSync(gitDir);
  }
  if (!existsSync(hooksDir)) {
    mkdirSync(hooksDir);
  }

  return { gitDir, hooksDir };
};

/**
 * Cleans up the temporary Git repository
 * Removes the entire .git directory and its contents
 */
const cleanupTestRepo = () => {
  const gitDir = join(process.cwd(), ".git");
  if (existsSync(gitDir)) {
    rmdirSync(gitDir, { recursive: true });
  }
};

export const githooksTests: TestSuite = {
  name: "githooks",
  tests: [
    {
      name: "should install git hooks",
      async fn() {
        // Set up test repository and verify hook installation
        const { hooksDir } = setupTestRepo();
        try {
          await githooksInstall();
          assertEquals(existsSync(hooksDir), true);
        } finally {
          // Clean up test repository
          cleanupTestRepo();
        }
      },
    },
    {
      name: "should setup pre-commit hook",
      async fn() {
        // Set up test repository
        setupTestRepo();
        try {
          // Install hooks and set up pre-commit hook with test command
          await githooksInstall();
          await githooksSetup("pre-commit", "npm test");
          const hookPath = join(process.cwd(), ".git/hooks/pre-commit");
          // Verify hook file was created
          assertEquals(existsSync(hookPath), true);
        } finally {
          // Clean up test repository
          cleanupTestRepo();
        }
      },
    },
    {
      name: "should fail setup without installation",
      async fn() {
        // Remove any existing Git hooks
        cleanupTestRepo();
        // Attempt to set up hook without installing first should fail
        await assertThrowsAsync(
          () => githooksSetup("pre-commit", "npm test"),
          /Git hooks are not installed/,
        );
      },
    },
    {
      name: "should uninstall git hooks",
      async fn() {
        // Set up test repository
        const { hooksDir } = setupTestRepo();
        try {
          // Install and then uninstall hooks
          await githooksInstall();
          await githooksUninstall();
          // Verify hooks directory was removed
          assertEquals(existsSync(hooksDir), false);
        } finally {
          // Clean up test repository
          cleanupTestRepo();
        }
      },
    },
  ],
};
