import { defineCommand, runMain } from "@funish/cli";
import type { ReleaseType } from "semver";
import { bumpPublish, bumpVersion } from ".";

const main = defineCommand({
  meta: {
    name: "bump",
  },
  subCommands: {
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
          path: (args.path as string) || process.cwd(),
          tag: args.tag as string,
        });
      },
    },
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
          description: "Release type",
          alias: "r",
        },
        tag: {
          type: "string",
          description: "Tag to publish to",
          alias: "t",
        },
      },
      async run({ args }) {
        await bumpVersion({
          path: (args.path as string) || process.cwd(),
          release: (args.release as ReleaseType) || "prerelease",
          tag: args.tag as string,
        });
      },
    },
  },
});

runMain(main);
