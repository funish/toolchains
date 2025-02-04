import {
  githooksInstall,
  githooksMigrateFromHusky,
  githooksSetup,
  githooksUninstall,
} from "@funish/githooks";

// Example 1: Install Git hooks
console.log("\nExample 1: Install Git hooks");
async function installHooks() {
  try {
    // Install hooks in default directory (.githooks)
    await githooksInstall();

    // Install hooks in custom directory
    await githooksInstall(".git/custom-hooks", true);

    console.log("Git hooks installed successfully");
  } catch (error) {
    console.error("Failed to install hooks:", error);
  }
}

// Example 2: Setup specific hooks
console.log("\nExample 2: Setup specific hooks");
async function setupHooks() {
  try {
    // Setup pre-commit hook
    await githooksSetup(
      "pre-commit",
      `
#!/bin/sh
npm run lint
npm run test
    `,
    );

    // Setup commit-msg hook
    await githooksSetup(
      "commit-msg",
      `
#!/bin/sh
npx --no -- @funish/lint commit-msg $1
    `,
    );

    // Setup pre-push hook
    await githooksSetup(
      "pre-push",
      `
#!/bin/sh
npm run build
npm run test
    `,
    );

    console.log("Git hooks set up successfully");
  } catch (error) {
    console.error("Failed to setup hooks:", error);
  }
}

// Example 3: Migrate from Husky
console.log("\nExample 3: Migrate from Husky");
async function migrateFromHusky() {
  try {
    await githooksMigrateFromHusky();
    console.log("Successfully migrated from Husky");
  } catch (error) {
    console.error("Failed to migrate from Husky:", error);
  }
}

// Example 4: Uninstall hooks
console.log("\nExample 4: Uninstall hooks");
async function uninstallHooks() {
  try {
    await githooksUninstall();
    console.log("Git hooks uninstalled successfully");
  } catch (error) {
    console.error("Failed to uninstall hooks:", error);
  }
}

// Run examples
installHooks();
setupHooks();
migrateFromHusky();
// Uncomment to uninstall hooks:
// uninstallHooks();
