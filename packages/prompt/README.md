# @funish/prompt

![npm version](https://img.shields.io/npm/v/@funish/prompt)
![npm downloads](https://img.shields.io/npm/dw/@funish/prompt)
![npm license](https://img.shields.io/npm/l/@funish/prompt)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> Programmatically create interactive prompts, powered by [Funish](https://funish.net/).

## Getting started

```bash
# npm
$ npm install @funish/prompt

# yarn
$ yarn add @funish/prompt

# pnpm
$ pnpm add @funish/prompt
```

## Usage

```ts
import { createPrompt } from "@funish/prompt";

const prompt = createPrompt([
  {
    name: "foo",
    message: "foo",
    default: "bar",
    validate: (value) => {
      if (value === "bar") {
        return true;
      }

      return "foo must be bar";
    },
  },
]);
```

## Interfaces

See it on [JSDoc](https://www.jsdocs.io/package/@funish/prompt).

## License

- [MIT](LICENSE) &copy; [Funish](https://funish.net/)
