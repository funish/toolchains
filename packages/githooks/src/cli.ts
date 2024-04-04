import { defineCommand, runMain } from "@funish/cli";
import { GithooksArray, type GithooksName } from "./config";
import {
  githooksInstall,
  githooksMigrateFromHusky,
  githooksSetup,
  githooksUninstall,
} from "./githooks";

const main = defineCommand({
  meta: {
    name: "githooks",
  },
  subCommands: {
    install: {
      meta: {
        name: "install",
        description: "Install Git hooks.",
      },
      args: {
        path: {
          type: "string",
          description: "Path to store Git hooks.",
          alias: "p",
        },
        script: {
          type: "boolean",
          description:
            "Git hooks will be called during the post-install phase of the lifecycle.",
          alias: "s",
        },
      },
      async run({ args }) {
        await githooksInstall(args.path, args.saveScript);
      },
    },
    setup: {
      meta: {
        name: "setup",
        description: "Set up Git hooks.",
      },
      args: {
        hooks: {
          type: "string",
          description: "Git hooks to set up.",
        },
        script: {
          type: "boolean",
          description:
            "Git hooks will be called during the post-install phase of the lifecycle.",
          alias: "s",
        },
      },
      async run({ args }) {
        if (args.hooks && GithooksArray.includes(args.hooks as GithooksName)) {
          await githooksSetup(args.hooks, args.script);
        }
      },
    },
    uninstall: {
      meta: {
        name: "uninstall",
        description: "Uninstall Git hooks.",
      },
      async run() {
        await githooksUninstall();
      },
    },
    migrate: {
      meta: {
        name: "migrate",
        description: "Migrating from husky to @funish/githooks.",
      },
      async run() {
        await githooksMigrateFromHusky();
      },
    },
  },
});

runMain(main);
