# @funish/argv

![npm version](https://img.shields.io/npm/v/@funish/argv)
![npm downloads](https://img.shields.io/npm/dw/@funish/argv)
![npm license](https://img.shields.io/npm/l/@funish/argv)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> A flexible and powerful command line argument parser, powered by [Funish](https://funish.net/).

## Features

- 🚀 Simple and intuitive API
- 💪 Supports both long and short options
- 🎯 Automatic type conversion (numbers, booleans)
- 🔄 Option aliases support
- ⚙️ Default values configuration
- 🔧 Multiple parsing strategies (regexp or split)
- 📦 Zero dependencies
- 🌟 TypeScript support

## Installation

```bash
# npm
$ npm install @funish/argv

# yarn
$ yarn add @funish/argv

# pnpm
$ pnpm add @funish/argv
```

## Usage

### Basic Usage

```ts
import { parseArgv } from "@funish/argv";

const args = parseArgv([
  "-b",
  "--bool",
  "--no-meep",
  "--multi=baz",
  "--foo",
  "bar",
]);
// => { _: [], b: true, bool: true, meep: false, multi: "baz", foo: "bar" }
```

### With Aliases and Defaults

```ts
const args = parseArgv(["--port", "3000"], {
  alias: { p: "port" },
  default: { port: 8080 },
});
// => { _: [], port: 3000, p: 3000 }
```

### Using Different Parsers

```ts
// Using regexp parser
const args1 = parseArgv(["--name=value"], { parser: "regexp" });

// Using split parser (default)
const args2 = parseArgv(["--name", "value"], { parser: "split" });
```

## Supported Formats

- Long options with values: `--name=value` or `--name value`
- Long boolean flags: `--flag`
- Negated flags: `--no-flag`
- Short options with values: `-n=value` or `-n value`
- Short boolean flags: `-f`
- Multiple short flags: `-abc` (equivalent to `-a -b -c`)
- Positional arguments: `command arg1 arg2`

## API Reference

### parseArgv(argv, options?)

Main function to parse command line arguments.

#### Parameters

- `argv` (string[]): Array of command line arguments to parse
- `options` (object, optional):
  - `alias` (object): Map of option aliases (e.g., `{ p: 'port' }`)
  - `default` (object): Default values for options
  - `parser` ('split' | 'regexp'): Parser to use (default: 'split')

#### Returns

Returns an object containing:

- `_`: Array of positional arguments
- Named properties for each option with their parsed values

## Contributing

Please read our [Contributing Guide](../../CONTRIBUTING.md) before submitting a Pull Request to the project.

## License

[MIT](LICENSE) © [Funish](https://funish.net/)
