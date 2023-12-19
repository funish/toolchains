import { basename, dirname } from "path";
import { parseArgv } from "@funish/argv";
import { readPackageJSON, resolvePackageJSON } from "pkg-types";

export interface Command {
  name?: string;
  description?: string;
  alias?: string;
  default?: { [key: string]: string | number | boolean };
  options?: {
    name: string;
    description: string;
    alias?: string;
    default?: { [key: string]: string | number | boolean };
  }[];
  action: (argv: {
    _: string[];
    [key: string]: string | boolean | number | string[];
  }) => void;
}

export class CLI {
  name: string;
  commands: Command[];

  constructor(name?: string) {
    this.name = name || basename(process.argv[1]);
    this.commands = [];
  }

  private async getPackageJSON() {
    const pkg = await readPackageJSON(
      await resolvePackageJSON(dirname(process.argv[1])),
    );
    return pkg;
  }

  argv(options?: {
    alias?: { [key: string]: string };
    default?: { [key: string]: string | number | boolean };
  }) {
    return parseArgv(process.argv.slice(2), options);
  }

  command(command: Command) {
    this.commands.push(command);

    const argv = this.argv({
      alias: command.options?.reduce(
        (acc: { [key: string]: string }, option) => {
          if (option.alias) {
            acc[option.name] = option.alias;
          }
          return acc;
        },
        {},
      ),
      default: command.default,
    });

    if (
      (command.name &&
        argv._.includes(command.name) &&
        (argv.help || argv.h)) ||
      (command.alias && argv._.includes(command.alias) && (argv.help || argv.h))
    ) {
      // print help
      console.log(`\nUsage: ${this.name} ${command.name} [options]`);

      console.log("\nOptions:");

      for (const option of command.options || []) {
        const length =
          16 - (option.alias?.length || 0) - (option.name?.length || 0);
        console.log(
          `  ${option.alias ? `-${option.alias}, ` : ""}--${option.name} ${
            (length > 0 ? "\x20".repeat(length) : `\n${"\x20".repeat(24)}`) +
            option.description
          }`,
        );
      }
    } else if (
      (command.name && argv._.includes(command.name)) ||
      (command.alias && argv._.includes(command.alias)) ||
      (argv._.length === 0 &&
        command.options?.some((option) => argv[option.name]))
    ) {
      command.action(argv);
    }

    return this;
  }

  version(version?: string) {
    this.command({
      options: [
        {
          name: "version",
          description: "Show version number",
          alias: "v",
        },
      ],
      action: async () => {
        console.log(
          `${this.name}/${version || (await this.getPackageJSON()).version}`,
        );
      },
    });
  }

  help() {
    this.command({
      options: [
        {
          name: "help",
          description: "Show help",
          alias: "h",
        },
      ],
      action: () => {
        console.log(`\nUsage: ${this.name} [command] [options]`);

        for (const command of this.commands) {
          // print command, description, alias
          // if command.name is not defined, don't print it
          if (command.name) {
            const length =
              19 - (command.alias?.length || -2) - (command.name?.length || 0);

            console.log(
              `  ${command.alias ? `${command.alias}, ` : ""}${command.name} ${
                (length > 0
                  ? "\x20".repeat(length)
                  : `\n${"\x20".repeat(27)}`) + command.description
              }`,
            );
          }
        }

        console.log("\nOptions:");

        for (const command of this.commands) {
          if (!command.name && command.options) {
            for (const option of command.options) {
              // print option, description, alias
              const length =
                16 - (option.alias?.length || 0) - (option.name?.length || 0);
              console.log(
                `  ${option.alias ? `-${option.alias}, ` : ""}--${
                  option.name
                } ${
                  (length > 0
                    ? "\x20".repeat(length)
                    : `\n${"\x20".repeat(24)}`) + option.description
                }`,
              );
            }
          }
        }
      },
    });
  }
}
