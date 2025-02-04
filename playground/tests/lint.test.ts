/**
 * Tests for the @funish/lint package
 * Tests commit message and staged files linting functionality with various rules and configurations
 */

import { unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { commitMsgLint, stagedLint } from "@funish/lint";
import { assertEquals, assertThrowsAsync } from "./test-utils";
import type { TestSuite } from "./test-utils";

/**
 * Creates a temporary commit message file for testing
 * @param msg The commit message to write to the file
 * @returns Path to the created commit message file
 */
const setupCommitMsg = (msg: string) => {
  const msgPath = join(process.cwd(), ".git/COMMIT_EDITMSG");
  writeFileSync(msgPath, msg);
  return msgPath;
};

/**
 * Cleans up the temporary commit message file
 * Silently fails if the file doesn't exist
 */
const cleanupCommitMsg = () => {
  const msgPath = join(process.cwd(), ".git/COMMIT_EDITMSG");
  try {
    unlinkSync(msgPath);
  } catch {}
};

export const lintTests: TestSuite = {
  name: "lint",
  tests: [
    {
      name: "should validate valid commit message",
      async fn() {
        // Create a valid conventional commit message
        const msgPath = setupCommitMsg("feat(core): add new feature");
        try {
          // Should pass validation
          await commitMsgLint();
        } finally {
          // Clean up test file
          cleanupCommitMsg();
        }
      },
    },
    {
      name: "should reject invalid commit message",
      async fn() {
        // Create an invalid commit message
        const msgPath = setupCommitMsg("invalid commit message");
        try {
          // Should fail validation with conventional commit format error
          await assertThrowsAsync(
            () => commitMsgLint(),
            /Commit message does not match the conventional commit format/,
          );
        } finally {
          // Clean up test file
          cleanupCommitMsg();
        }
      },
    },
    {
      name: "should validate commit message with custom rules",
      async fn() {
        // Create a commit message that matches custom rules
        const msgPath = setupCommitMsg("feat(api): add new endpoint");
        try {
          // Should pass validation with custom type and scope rules
          await commitMsgLint({
            type: {
              enum: ["feat", "fix"], // Only allow feat and fix types
            },
            scope: {
              rules: ["lowercase"], // Require lowercase scope
            },
          });
        } finally {
          // Clean up test file
          cleanupCommitMsg();
        }
      },
    },
    {
      name: "should reject commit message violating custom rules",
      async fn() {
        // Create a commit message that violates custom rules
        const msgPath = setupCommitMsg("feat(API): add new endpoint");
        try {
          // Should fail validation due to uppercase scope
          await assertThrowsAsync(
            () =>
              commitMsgLint({
                scope: {
                  rules: ["lowercase"],
                },
              }),
            /Commit message scope does not match the rule lowercase/,
          );
        } finally {
          // Clean up test file
          cleanupCommitMsg();
        }
      },
    },
    {
      name: "should validate staged files",
      async fn() {
        // Test staged files linting with different file patterns
        await stagedLint({
          "*.ts": "echo 'linting ts'", // Lint TypeScript files
          "*.js": "echo 'linting js'", // Lint JavaScript files
        });
      },
    },
  ],
};
