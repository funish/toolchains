# @funish/githooks

![npm version](https://img.shields.io/npm/v/@funish/githooks)
![npm downloads](https://img.shields.io/npm/dw/@funish/githooks)
![npm license](https://img.shields.io/npm/l/@funish/githooks)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> Programmatically create git hooks, powered by [Funish](https://funish.net/).

Inspired by [husky](https://github.com/typicode/husky) and with an extremely similar implementation, but modified and supplemented with some possible details.

## Getting started

```bash
# npm
$ npm install -D @funish/githooks

# yarn
$ yarn add -D @funish/githooks

# pnpm
$ pnpm add -D @funish/githooks
```

## Usage

### Recommend

For unified processes, we prefer to use configuration files to manage certain simple commands. This method is only suitable for fixed configuration management and `githooks install` should be re-run after making changes to the configuration file.

```ts
import { defineGithooksConfig } from "@funish/githooks";

export default defineGithooksConfig({
  hooks: {
    "pre-commit": "pnpm lint staged",
    "commit-msg": "pnpm lint commit-msg",
  },
});
```

### Configuration

#### Type definition

```ts
export interface GithooksConfig {
  path?: string;
  hooks?: {
    [key in GithooksName]?: string;
  };
  gitConfig?: object;
  extends?: string | [string];
}
```

### Husky Like

We can also use it in a similar way to Husky, except that the default folder will be `.githooks`.

```bash
# Install Git hooks during the post-installation phase of the lifecycle.
# Or you can use `pnpm githooks install -S prepare`.
$ pnpm githooks install -S

# Set up Git hooks.
$ pnpm githooks setup <hooks> [script]

# Uninstall Git hooks.
$ pnpm githooks uninstall

# Migrating from husky to @funish/githooks.
$ pnpm githooks migrate
```

### CLI

```bash
$ githooks -h

Usage:
  $ githooks <command> [options]

Commands:
  install [path]          Install Git hooks.
  setup <hooks> [script]  Set up Git hooks.
  uninstall               Uninstall Git hooks.
  migrate                 Migrating from husky to @funish/githooks.

For more info, run any command with the `--help` flag:
  $ githooks install --help
  $ githooks setup --help
  $ githooks uninstall --help
  $ githooks migrate --help

Options:
  -h, --help     Display this message
  -v, --version  Display version number
```

## Related Efforts

- [Husky](https://github.com/typicode/husky)

## License

- [MIT](LICENSE) &copy; [Funish](https://funish.net/)
