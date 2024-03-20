import { CLI } from "@funish/cli";
import { GithooksArray, type GithooksName } from "./config";
import {
  githooksInstall,
  githooksMigrateFromHusky,
  githooksSetup,
  githooksUninstall,
} from "./githooks";

export const cli = new CLI("githooks");

cli.command({
  name: "install",
  alias: "i",
  description: "Install Git hooks.",
  options: [
    {
      name: "path",
      description: "Path to store Git hooks.",
      alias: "p",
    },
    {
      name: "script",
      description:
        "Git hooks will be called during the post-install phase of the lifecycle.",
      alias: "s",
    },
  ],
  action: async (argv) => {
    await githooksInstall(argv.path as string, argv.saveScript as boolean);
  },
});

cli.command({
  name: "setup",
  description: "Set up Git hooks.",
  options: [
    {
      name: "hooks",
      description: "Git hooks to set up.",
    },
    {
      name: "script",
      description:
        "Git hooks will be called during the post-install phase of the lifecycle.",
      alias: "s",
    },
  ],
  action: async (argv) => {
    if (argv.hooks && GithooksArray.includes(argv.hooks as GithooksName)) {
      await githooksSetup(
        argv.hooks as GithooksName,
        argv.script ? (argv.script as string) : null,
      );
    }
  },
});

cli.command({
  name: "uninstall",
  alias: "un",
  description: "Uninstall Git hooks.",
  action: () => {
    githooksUninstall();
  },
});

cli.command({
  name: "migrate",
  description: "Migrating from husky to @funish/githooks.",
  action: async () => {
    await githooksMigrateFromHusky();
  },
});

cli.version();

cli.help();
