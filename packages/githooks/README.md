# @funish/githooks

![npm version](https://img.shields.io/npm/v/@funish/githooks)
![npm downloads](https://img.shields.io/npm/dw/@funish/githooks)
![npm license](https://img.shields.io/npm/l/@funish/githooks)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> Modern Git hooks management with configuration support, powered by [Funish](https://funish.net/).

## Features

- 🚀 Simple and intuitive CLI
- ⚙️ Configuration-driven setup
- 📦 Automatic package manager detection
- 🔄 Easy migration from husky
- 🎯 Supports all Git hooks
- 💪 TypeScript support
- 🔒 Secure hook execution
- 🌟 Zero dependencies

## Installation

```bash
# npm
$ npm install @funish/githooks

# yarn
$ yarn add @funish/githooks

# pnpm
$ pnpm add @funish/githooks
```

## Usage

### CLI

#### Install Hooks

```bash
# Install in default location (.githooks)
$ githooks install

# Install in custom directory
$ githooks install --path .hooks

# Install and save postinstall script
$ githooks install --script
```

#### Set Up Hooks

```bash
# Set up pre-commit hook
$ githooks setup pre-commit

# Set up with script
$ githooks setup pre-commit --script "npm test"
```

#### Uninstall Hooks

```bash
$ githooks uninstall
```

#### Migrate from Husky

```bash
$ githooks migrate
```

### Configuration

Create a `githooks.config.ts` file:

```ts
import { defineGithooksConfig } from "@funish/githooks";

export default defineGithooksConfig({
  // Custom hooks directory
  path: ".hooks",

  // Hook scripts
  hooks: {
    "pre-commit": "npm test",
    "pre-push": "npm run build",
  },

  // Additional Git config
  gitConfig: {
    core: {
      autocrlf: "input",
    },
  },
});
```

### Programmatic Usage

```ts
import {
  githooksInstall,
  githooksSetup,
  githooksUninstall,
  githooksMigrateFromHusky,
} from "@funish/githooks";

// Install hooks
await githooksInstall(".hooks", true);

// Set up a hook
await githooksSetup("pre-commit", "npm test");

// Uninstall hooks
await githooksUninstall();

// Migrate from husky
await githooksMigrateFromHusky();
```

## Supported Hooks

All standard Git hooks are supported:

- `applypatch-msg`
- `pre-applypatch`
- `post-applypatch`
- `pre-commit`
- `pre-merge-commit`
- `prepare-commit-msg`
- `commit-msg`
- `post-commit`
- `pre-rebase`
- `post-checkout`
- `post-merge`
- `pre-push`
- And [more](https://git-scm.com/docs/githooks)

## API Reference

### githooksInstall(path?, isSaveScript?)

Installs Git hooks in the specified directory.

- `path` (string): Directory to install hooks in
- `isSaveScript` (boolean | string): Whether to save installation script

### githooksSetup(hooks, script?)

Sets up a specific Git hook.

- `hooks` (GithooksName): Name of the hook to set up
- `script` (string): Script content for the hook

### githooksUninstall()

Uninstalls all Git hooks and restores original configuration.

### githooksMigrateFromHusky()

Migrates hooks from Husky to @funish/githooks.

### Configuration

#### GithooksConfig

```ts
interface GithooksConfig {
  path?: string; // Custom hooks directory
  hooks?: {
    // Hook scripts
    [key in GithooksName]?: string;
  };
  gitConfig?: object; // Additional Git config
  extends?: string | [string]; // Base config to extend
}
```

## Contributing

Please read our [Contributing Guide](../../CONTRIBUTING.md) before submitting a Pull Request to the project.

## License

[MIT](LICENSE) © [Funish](https://funish.net/)
