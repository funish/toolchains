# @funish/scaffolding

![npm version](https://img.shields.io/npm/v/@funish/scaffolding)
![npm downloads](https://img.shields.io/npm/dw/@funish/scaffolding)
![npm license](https://img.shields.io/npm/l/@funish/scaffolding)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> Programmatically build scaffolding, powered by [Funish](https://funish.net/).

## Getting started

```bash
# npm
$ npm install @funish/scaffolding

# yarn
$ yarn add @funish/scaffolding

# pnpm
$ pnpm add @funish/scaffolding
```

## Usage

- You can see [giget](https://github.com/unjs/giget#downloadtemplatesource-options) to fill in the `source` and `options` parameters.
- `target` is the path to the directory where the scaffolding is generated.
- The context is an object that can be used in the template, you can see [handlebars](https://handlebarsjs.com/guide/context.html) for more information.

```ts
import { createScaffolding } from "@funish/scaffolding";

createScaffolding(
  source,
  target,
  {
    // context, e.g. { foo: "bar" }
  },
  options
);
```

## Interfaces

See it on [JSDoc](https://www.jsdocs.io/package/@funish/scaffolding).

## License

- [MIT](LICENSE) &copy; [Funish](https://funish.net/)
