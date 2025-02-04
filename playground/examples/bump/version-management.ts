import { bumpPublish, bumpVersion } from "@funish/bump";

// Example 1: Bump version for a package
console.log("\nExample 1: Bump package version");
async function bumpPackageVersion() {
  try {
    // Bump to next patch version (e.g., 1.0.0 -> 1.0.1)
    await bumpVersion({
      path: "./example-package",
      release: "patch",
    });

    // Bump to next minor version (e.g., 1.0.1 -> 1.1.0)
    await bumpVersion({
      path: "./example-package",
      release: "minor",
    });

    // Bump to next major version (e.g., 1.1.0 -> 2.0.0)
    await bumpVersion({
      path: "./example-package",
      release: "major",
    });

    // Bump to prerelease version (e.g., 2.0.0 -> 2.0.1-alpha.0)
    await bumpVersion({
      path: "./example-package",
      release: "prerelease",
      tag: "alpha",
    });
  } catch (error) {
    console.error("Failed to bump version:", error);
  }
}

// Example 2: Publish package
console.log("\nExample 2: Publish package");
async function publishPackage() {
  try {
    // Publish to npm with public access
    await bumpPublish({
      path: "./example-package",
    });

    // Publish with specific tag
    await bumpPublish({
      path: "./example-package",
      tag: "beta",
    });
  } catch (error) {
    console.error("Failed to publish package:", error);
  }
}

// Run examples
bumpPackageVersion();
publishPackage();
