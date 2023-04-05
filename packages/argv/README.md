# @funish/argv

![npm version](https://img.shields.io/npm/v/@funish/argv)
![npm downloads](https://img.shields.io/npm/dw/@funish/argv)
![npm license](https://img.shields.io/npm/l/@funish/argv)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> Programmatically parse command line parameters, powered by [Funish](https://funish.net/).

## Getting started

```bash
# npm
$ npm install @funish/argv

# yarn
$ yarn add @funish/argv

# pnpm
$ pnpm add @funish/argv
```

## Usage

```ts
import { parseArgv } from "@funish/argv";

const argv = parseArgv([
  "-b",
  "--bool",
  "--no-meep",
  "--multi=baz",
  "--foo",
  "bar",
]);
// => { _: [], b: true, bool: true, meep: false, multi: "baz", foo: "bar" }
```

## Interfaces

See it on [JSDoc](https://www.jsdocs.io/package/@funish/argv).

## License

- [MIT](LICENSE) &copy; [Funish](https://funish.net/)
