# @funish/githooks-config

Default Git hooks configuration for Funish projects. This package provides a standardized set of Git hooks for linting staged files and validating commit messages.

## Features

- Pre-configured Git hooks for common development tasks
- Seamless integration with `@funish/githooks`
- Built-in support for staged files linting and commit message validation
- Zero configuration needed for standard use cases

## Installation

```bash
# Using npm
npm install @funish/githooks-config

# Using yarn
yarn add @funish/githooks-config

# Using pnpm
pnpm add @funish/githooks-config
```

## Usage

1. Install the package as a development dependency
2. Reference it in your `githooks.config.ts`:

```typescript
import config from "@funish/githooks-config";

export default config;
```

Or extend it with your own configuration:

```typescript
import baseConfig from "@funish/githooks-config";
import { defineGithooksConfig } from "@funish/githooks";

export default defineGithooksConfig({
  ...baseConfig,
  hooks: {
    ...baseConfig.hooks,
    "pre-push": "npm test", // Add your own hooks
  },
});
```

## Default Configuration

This package provides the following default Git hooks:

- `pre-commit`: Runs `pnpm lint staged` to lint staged files before committing
- `commit-msg`: Runs `pnpm lint commit-msg` to validate commit messages

## Requirements

- Node.js 16.x or higher
- Git
- pnpm (for default hooks)

## Related Packages

- [@funish/githooks](https://github.com/funish/toolchains/tree/main/packages/githooks) - Git hooks management system
- [@funish/lint](https://github.com/funish/toolchains/tree/main/packages/lint) - Linting utilities for staged files and commit messages

## License

- [MIT](LICENSE) &copy; [Funish](https://funish.net/)
