import { defineCommand, runMain } from "@funish/cli";

// Example 1: Basic CLI command
const basicCommand = defineCommand({
  meta: {
    name: "greet",
    description: "A simple greeting command",
  },
  args: {
    name: {
      type: "string",
      description: "Name to greet",
      required: true,
    },
    loud: {
      type: "boolean",
      description: "Whether to greet loudly",
      default: false,
    },
  },
  run({ args }) {
    const greeting = `Hello, ${args.name}!`;
    console.log(args.loud ? greeting.toUpperCase() : greeting);
  },
});

// Example 2: CLI with subcommands
const deployCommand = defineCommand({
  meta: {
    name: "deploy",
    description: "Deploy application",
  },
  subCommands: {
    staging: {
      meta: {
        name: "staging",
        description: "Deploy to staging environment",
      },
      args: {
        version: {
          type: "string",
          description: "Version to deploy",
          required: true,
        },
      },
      run({ args }) {
        console.log(`Deploying version ${args.version} to staging...`);
      },
    },
    production: {
      meta: {
        name: "production",
        description: "Deploy to production environment",
      },
      args: {
        version: {
          type: "string",
          description: "Version to deploy",
          required: true,
        },
        force: {
          type: "boolean",
          description: "Force deployment",
          default: false,
        },
      },
      run({ args }) {
        if (args.force) {
          console.log("Force deploying...");
        }
        console.log(`Deploying version ${args.version} to production...`);
      },
    },
  },
});

// Example 3: CLI with options and validation
const buildCommand = defineCommand({
  meta: {
    name: "build",
    description: "Build application",
  },
  args: {
    mode: {
      type: "string",
      description: "Build mode",
      options: ["development", "production", "test"],
      default: "development",
    },
    minify: {
      type: "boolean",
      description: "Minify output",
      default: false,
    },
    outDir: {
      type: "string",
      description: "Output directory",
      default: "dist",
    },
  },
  run({ args }) {
    console.log("Building application...");
    console.log("Mode:", args.mode);
    console.log("Minify:", args.minify);
    console.log("Output directory:", args.outDir);
  },
});

// Run the commands
console.log("\nExample 1: Basic command");
runMain(basicCommand);

console.log("\nExample 2: Command with subcommands");
runMain(deployCommand);

console.log("\nExample 3: Command with options");
runMain(buildCommand);
