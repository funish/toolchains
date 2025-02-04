/**
 * Tests for the @funish/cli package
 * Tests command-line interface creation functionality including basic commands, subcommands, and options
 */

import { defineCommand } from "@funish/cli";
import { assertEquals } from "./test-utils";
import type { TestSuite } from "./test-utils";

/**
 * Command metadata interface defining name and description
 */
interface CommandMeta {
  name: string;
  description: string;
}

/**
 * Valid types for command argument values
 */
type CommandArgType = string | number | boolean;

/**
 * Interface for command argument definition
 */
interface CommandArg {
  type: string;
  description: string;
  required?: boolean;
  options?: string[];
  default?: CommandArgType;
}

/**
 * Map of argument names to their definitions
 */
interface CommandArgs {
  [key: string]: CommandArg;
}

/**
 * Complete command definition interface
 */
interface Command {
  meta: CommandMeta;
  args?: CommandArgs;
  subCommands?: {
    [key: string]: {
      meta: CommandMeta;
      run: () => string;
    };
  };
}

export const cliTests: TestSuite = {
  name: "cli",
  tests: [
    {
      name: "should define basic command",
      async fn() {
        // Define a simple command with a required name argument
        const cmd = (await defineCommand({
          meta: {
            name: "test",
            description: "test command",
          },
          args: {
            name: {
              type: "string",
              description: "name arg",
              required: true,
            },
          },
          run: ({ args }) => {
            return `Hello ${args.name}`;
          },
        })) as Command;

        // Verify command metadata and argument definition
        assertEquals(cmd.meta.name, "test");
        assertEquals(cmd.meta.description, "test command");
        assertEquals(cmd.args?.name.type, "string");
        assertEquals(cmd.args?.name.required, true);
      },
    },
    {
      name: "should define command with subcommands",
      async fn() {
        // Define a parent command with a child subcommand
        const cmd = (await defineCommand({
          meta: {
            name: "parent",
            description: "parent command",
          },
          subCommands: {
            child: {
              meta: {
                name: "child",
                description: "child command",
              },
              run: () => "child ran",
            },
          },
        })) as Command;

        // Verify parent and child command structure
        assertEquals(cmd.meta.name, "parent");
        assertEquals(cmd.subCommands?.child.meta.name, "child");
      },
    },
    {
      name: "should define command with options",
      async fn() {
        // Define a command with optional arguments and defaults
        const cmd = (await defineCommand({
          meta: {
            name: "test",
            description: "test command",
          },
          args: {
            mode: {
              type: "string",
              description: "mode arg",
              options: ["dev", "prod"],
              default: "dev",
            },
            verbose: {
              type: "boolean",
              description: "verbose flag",
              default: false,
            },
          },
          run: ({ args }) => {
            return `Mode: ${args.mode}, Verbose: ${args.verbose}`;
          },
        })) as Command;

        // Verify argument definitions and defaults
        assertEquals(cmd.args?.mode.options, ["dev", "prod"]);
        assertEquals(cmd.args?.mode.default, "dev");
        assertEquals(cmd.args?.verbose.type, "boolean");
        assertEquals(cmd.args?.verbose.default, false);
      },
    },
  ],
};
