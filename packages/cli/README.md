# @funish/cli

![npm version](https://img.shields.io/npm/v/@funish/cli)
![npm downloads](https://img.shields.io/npm/dw/@funish/cli)
![npm license](https://img.shields.io/npm/l/@funish/cli)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> Programmatically create command lines, powered by [Funish](https://funish.net/).

## Getting started

```bash
# npm
$ npm install @funish/cli

# yarn
$ yarn add @funish/cli

# pnpm
$ pnpm add @funish/cli
```

## Usage

```ts
import { CLI } from "@funish/cli";

const cli = new CLI("my-cli");

cli.command({
  name: "foo",
  description: "foo command",
  options: [
    {
      name: "bar",
      description: "bar option",
      type: "string",
    },
  ],
  action: (argv) => {
    console.log(argv);
  },
});

cli.version();

cli.help();
```

## Interfaces

See it on [JSDoc](https://www.jsdocs.io/package/@funish/cli).

## License

- [MIT](LICENSE) &copy; [Funish](https://funish.net/)
