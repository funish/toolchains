/**
 * CLI interface for version bumping and publishing
 * @module @funish/bump/cli
 */

import { defineCommand, runMain } from "@funish/cli";
import type { ReleaseType } from "semver";
import { bumpPublish, bumpVersion } from "./index";

/**
 * Main CLI command definition
 * Provides subcommands for version bumping and publishing
 */
const main = defineCommand({
  meta: {
    name: "bump",
    description: "Version management and publishing for packages",
  },
  subCommands: {
    /**
     * Subcommand for publishing packages
     * Usage: bump publish [options]
     */
    publish: {
      meta: {
        name: "publish",
        description: "Publish a package to npm",
      },
      args: {
        path: {
          type: "string",
          description: "Path to package.json",
          alias: "p",
        },
        tag: {
          type: "string",
          description: "Tag to publish to",
          alias: "t",
        },
      },
      async run({ args }) {
        await bumpPublish({
          path: args.path as string,
          tag: args.tag as string,
        });
      },
    },
    /**
     * Subcommand for bumping package versions
     * Usage: bump version [options]
     */
    version: {
      meta: {
        name: "version",
        description: "Bump the version of a package",
      },
      args: {
        path: {
          type: "string",
          description: "Path to package.json",
          alias: "p",
        },
        release: {
          type: "string",
          description: "Release type (major, minor, patch, prerelease)",
          alias: "r",
          default: "prerelease",
        },
        tag: {
          type: "string",
          description: "Tag for prerelease versions",
          alias: "t",
        },
      },
      async run({ args }) {
        const release = args.release as ReleaseType;
        await bumpVersion({
          path: args.path,
          release,
          tag: args.tag as string,
        });
      },
    },
  },
});

runMain(main);
