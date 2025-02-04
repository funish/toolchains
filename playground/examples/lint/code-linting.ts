import { commitMsgLint, stagedLint } from "@funish/lint";

// Example 1: Lint commit messages
console.log("\nExample 1: Lint commit messages");
async function lintCommitMessage() {
  try {
    // Basic commit message linting
    await commitMsgLint();

    // Custom commit message rules
    await commitMsgLint({
      type: {
        enum: ["feat", "fix", "docs", "style", "refactor", "test", "chore"],
      },
      scope: {
        rules: ["lowercase", "kebabcase"],
      },
      description: {
        rules: ["phrasecase"],
      },
    });

    console.log("Commit message validation passed");
  } catch (error) {
    console.error("Commit message validation failed:", error);
  }
}

// Example 2: Lint staged files
console.log("\nExample 2: Lint staged files");
async function lintStagedFiles() {
  try {
    // Basic staged files linting
    await stagedLint();

    // Custom staged files configuration
    await stagedLint({
      "*.ts": "eslint --fix && prettier --write",
      "*.js": "eslint --fix && prettier --write",
      "*.json": "prettier --write",
      "*.md": "markdownlint --fix",
    });

    console.log("Staged files linting passed");
  } catch (error) {
    console.error("Staged files linting failed:", error);
  }
}

// Run examples
lintCommitMessage();
lintStagedFiles();
