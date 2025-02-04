# @funish/lint

![npm version](https://img.shields.io/npm/v/@funish/lint)
![npm downloads](https://img.shields.io/npm/dw/@funish/lint)
![npm license](https://img.shields.io/npm/l/@funish/lint)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> Comprehensive linting solution for code quality and commit messages, powered by [Funish](https://funish.net/).

## Features

- 🎯 Staged files linting
- 📝 Commit message validation
- ⚙️ Flexible configuration
- 🔄 Git hooks integration
- 🎨 Multiple linter support
- 🚀 Easy to use CLI
- 💪 TypeScript support
- 📦 Zero configuration defaults

## Installation

```bash
# npm
$ npm install -D @funish/lint

# yarn
$ yarn add -D @funish/lint

# pnpm
$ pnpm add -D @funish/lint
```

## Usage

### Configuration

Create a `lint.config.ts` file:

```ts
import { defineLintConfig } from "@funish/lint";

export default defineLintConfig({
  // Staged files linting configuration
  staged: {
    // Lint TypeScript files
    "*.ts": "eslint --fix",
    // Format other files
    "*.{json,md}": "prettier --write",
    // Run tests for changed files
    "__tests__/**/*.ts": "jest --findRelatedTests",
  },

  // Commit message validation
  commitMsg: {
    // Conventional commit types
    type: {
      enum: ["feat", "fix", "docs", "style", "refactor", "test", "chore"],
      rules: ["lowercase"],
    },
    // Scope validation
    scope: {
      rules: ["lowercase", "kebabcase"],
    },
    // Description validation
    description: {
      rules: ["phrasecase"],
    },
  },
});
```

### Git Hooks Integration

Use with [@funish/githooks](/packages/githooks/README.md) for seamless Git integration:

```ts
// githooks.config.ts
import { defineGithooksConfig } from "@funish/githooks";

export default defineGithooksConfig({
  hooks: {
    // Lint staged files before commit
    "pre-commit": "pnpm lint staged",
    // Validate commit message
    "commit-msg": "pnpm lint commit-msg",
  },
});
```

### CLI Usage

```bash
# Lint staged files
$ lint staged

# Validate commit message
$ lint commit-msg

# Show help
$ lint --help
```

## Configuration Options

### Staged Files Configuration

The `staged` configuration maps file patterns to lint commands:

```ts
{
  staged: {
    [pattern: string]: string | string[]
  }
}
```

- Supports glob patterns
- Can use negation patterns (`!pattern`)
- Accepts single command or array of commands
- Commands run in sequence for matched files

### Commit Message Configuration

The `commitMsg` configuration validates commit messages according to [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) specification:

```ts
{
  commitMsg: {
    type?: {
      enum?: string[]      // Allowed types (e.g., ['feat', 'fix', 'docs'])
      rules?: string[]     // Validation rules
    },
    scope?: {              // Optional scope validation
      rules?: string[]     // Validation rules
    },
    description?: {
      rules?: string[]     // Validation rules
    },
    body?: {               // Optional body validation
      rules?: string[]     // Validation rules
    }
  }
}
```

#### Commit Message Format

```
<type>[optional scope][!]: <description>

[optional body]

[optional footer(s)]
```

- `type`: The type of change (e.g., feat, fix, docs)
- `scope`: Optional scope of the change in parentheses (e.g., parser)
- `!`: Optional breaking change indicator
- `description`: Brief description of the change
- `body`: Optional detailed description
- `footer`: Optional footer (e.g., BREAKING CHANGE: description)

#### Breaking Changes

Breaking changes can be indicated in two ways:

1. Using the `!` character before the colon
2. Using a `BREAKING CHANGE:` or `BREAKING-CHANGE:` footer

Example:

```
feat(api)!: change authentication method

BREAKING CHANGE: new authentication method requires token
```

#### Available Rules

- `lowercase`: Must be lowercase
- `uppercase`: Must be uppercase
- `camelcase`: Must be camelCase
- `kebabcase`: Must be kebab-case
- `snakecase`: Must be snake_case
- `pascalcase`: Must be PascalCase
- `sentencecase`: Must be Sentence case
- `phrasecase`: Must be phrase case

#### Example Configuration

```ts
{
  commitMsg: {
    type: {
      enum: ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert'],
      rules: ['lowercase']
    },
    scope: {
      rules: ['lowercase']
    },
    description: {
      rules: ['phrasecase']
    },
    body: {
      rules: ['phrasecase']
    }
  }
}
```

## API Reference

### defineLintConfig(config)

Creates a type-safe lint configuration.

#### Parameters

- `config` (LintConfig): Configuration object
  - `staged`: Staged files configuration
  - `commitMsg`: Commit message configuration
  - `extends`: Base configuration to extend

### commitMsgLint(config?)

Validates commit messages against rules.

```ts
await commitMsgLint({
  type: { enum: ["feat", "fix"] },
});
```

### stagedLint(config?)

Runs linters on staged files.

```ts
await stagedLint({
  "*.ts": "eslint --fix",
});
```

## Contributing

Please read our [Contributing Guide](../../CONTRIBUTING.md) before submitting a Pull Request to the project.

## License

[MIT](LICENSE) © [Funish](https://funish.net/)
