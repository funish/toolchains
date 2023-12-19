import { CLI } from "@funish/cli";
import { ReleaseType } from "semver";
import { bumpPublish, bumpVersion } from ".";

export const cli = new CLI("bump");

cli.command({
  name: "publish",
  alias: "p",
  description: "Publish a package to npm",
  options: [
    {
      name: "path",
      description: "Path to package.json",
      alias: "p",
    },
    {
      name: "tag",
      description: "Tag to publish to",
      alias: "t",
    },
  ],
  action: async (argv) => {
    await bumpPublish({
      path: (argv.path as string) || process.cwd(),
      tag: argv.tag as string,
    });
  },
});

cli.command({
  name: "version",
  alias: "v",
  description: "Bump the version of a package",
  options: [
    {
      name: "path",
      description: "Path to package.json",
      alias: "p",
    },
    {
      name: "release",
      description: "Release type",
      alias: "r",
    },
    {
      name: "tag",
      description: "Tag to publish to",
      alias: "t",
    },
  ],
  action: async (argv) => {
    await bumpVersion({
      path: (argv.path as string) || process.cwd(),
      release: (argv.release as ReleaseType) || "prerelease",
      tag: argv.tag as string,
    });
  },
});

cli.version();

cli.help();
