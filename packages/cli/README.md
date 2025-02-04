# @funish/cli

![npm version](https://img.shields.io/npm/v/@funish/cli)
![npm downloads](https://img.shields.io/npm/dw/@funish/cli)
![npm license](https://img.shields.io/npm/l/@funish/cli)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> A powerful CLI framework for building command line applications, powered by [Funish](https://funish.net/).

## Features

- 🚀 Simple and intuitive API
- 📦 Automatic package.json metadata integration
- 🎯 Type-safe command definitions
- 🔄 Nested subcommands support
- ⚙️ Automatic help generation
- 🎨 Beautiful command-line output
- 💪 Built on top of [citty](https://github.com/unjs/citty)
- 🌟 Full TypeScript support

## Installation

```bash
# npm
$ npm install @funish/cli

# yarn
$ yarn add @funish/cli

# pnpm
$ pnpm add @funish/cli
```

## Usage

### Basic Command

```ts
import { defineCommand } from "@funish/cli";

const cmd = defineCommand({
  meta: {
    name: "greet",
  },
  args: {
    name: {
      type: "string",
      description: "Name to greet",
      required: true,
    },
  },
  run: (ctx) => {
    console.log(`Hello, ${ctx.args.name}!`);
  },
});
```

### With Subcommands

```ts
const cmd = defineCommand({
  meta: {
    name: "app",
  },
  subCommands: {
    serve: {
      args: {
        port: {
          type: "number",
          default: 3000,
        },
      },
      run: (ctx) => {
        console.log(`Starting server on port ${ctx.args.port}`);
      },
    },
  },
});
```

### Automatic Metadata

The `defineCommand` function automatically reads metadata from your package.json:

```ts
const cmd = defineCommand({
  // No need to specify name, version, or description
  // They are automatically loaded from package.json
  args: {
    // ...
  },
  run: (ctx) => {
    // ...
  },
});
```

## API Reference

### defineCommand(def)

Creates a command definition with automatic metadata from package.json.

#### Parameters

- `def` (CommandDef): Command definition object
  - `meta?`: Command metadata
  - `args?`: Command arguments definition
  - `subCommands?`: Nested subcommands
  - `run`: Command execution function

#### Returns

Returns an enhanced command definition with metadata from package.json.

### readPackageJSON(path?)

Reads the nearest package.json file.

#### Parameters

- `path` (string, optional): Starting directory path (defaults to current script directory)

#### Returns

Returns the parsed package.json content or an empty object if not found.

## Contributing

Please read our [Contributing Guide](../../CONTRIBUTING.md) before submitting a Pull Request to the project.

## License

[MIT](LICENSE) © [Funish](https://funish.net/)
