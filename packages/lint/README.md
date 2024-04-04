# @funish/lint

![npm version](https://img.shields.io/npm/v/@funish/lint)
![npm downloads](https://img.shields.io/npm/dw/@funish/lint)
![npm license](https://img.shields.io/npm/l/@funish/lint)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> Integrated one-click Linter, powered by [Funish](https://funish.net/).

## Getting started

```bash
# npm
$ npm install -D @funish/lint

# yarn
$ yarn add -D @funish/lint

# pnpm
$ pnpm add -D @funish/lint
```

## Usage

```ts
// lint.config.ts
import { defineLintConfig } from "@funish/lint";

export default defineLintConfig({
  staged: {
    "*.ts": "pnpm check",
    "!*.ts": "pnpm format",
  },
});
```

Use [@funish/githooks](/packages/githooks/README.md) to integrate it with Git hooks.

```ts
// githooks.config.ts
import { defineGithooksConfig } from "@funish/githooks";

export default defineGithooksConfig({
  hooks: {
    "pre-commit": "pnpm lint staged",
    "commit-msg": "pnpm lint commit-msg",
  },
});
```

### CLI

```bash
$ lint -h

USAGE lint commit-msg|staged

COMMANDS

  commit-msg    Lint commit message
      staged    Lint staged files

Use lint <command> --help for more information about a command.
```

## Interfaces

See it on [JSDoc](https://www.jsdocs.io/package/@funish/lint).

## License

- [MIT](LICENSE) &copy; [Funish](https://funish.net/)
