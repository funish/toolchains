# @funish/bump

![npm version](https://img.shields.io/npm/v/@funish/bump)
![npm downloads](https://img.shields.io/npm/dw/@funish/bump)
![npm license](https://img.shields.io/npm/l/@funish/bump)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> Automated version bumping and publishing for Node.js packages, powered by [Funish](https://funish.net/).

## Features

- 🚀 Simple and intuitive CLI
- 📦 Automatic package manager detection
- 🔄 Semantic version bumping
- 🏷️ Smart tag handling
- 🔒 Safe publishing workflow
- 💪 Prerelease support
- 🌟 Full TypeScript support
- 🤝 Works with npm, yarn, and pnpm

## Installation

```bash
# npm
$ npm install @funish/bump

# yarn
$ yarn add @funish/bump

# pnpm
$ pnpm add @funish/bump
```

## Usage

### CLI

#### Bump Version

```bash
# Bump prerelease version (default)
$ bump version

# Bump specific version type
$ bump version --release minor

# Bump version with tag
$ bump version --release prerelease --tag beta

# Bump version in specific directory
$ bump version --path ./packages/mypackage
```

#### Publish Package

```bash
# Publish package (interactive)
$ bump publish

# Publish with specific tag
$ bump publish --tag beta

# Publish from specific directory
$ bump publish --path ./packages/mypackage
```

### Programmatic Usage

#### Version Bumping

```ts
import { bumpVersion } from "@funish/bump";

// Bump prerelease version
await bumpVersion();

// Bump minor version
await bumpVersion({ release: "minor" });

// Bump version with tag
await bumpVersion({
  release: "prerelease",
  tag: "beta",
});
```

#### Publishing

```ts
import { bumpPublish } from "@funish/bump";

// Publish package
await bumpPublish();

// Publish with tag
await bumpPublish({ tag: "beta" });

// Publish from specific directory
await bumpPublish({ path: "./packages/mypackage" });
```

## API Reference

### bumpVersion(options?)

Bumps the version of a package according to semver rules.

#### Options

- `path` (string): Path to package directory (default: current directory)
- `release` (ReleaseType): Type of version bump (default: "prerelease")
- `tag` (string): Tag for prerelease versions (default: "edge")

### bumpPublish(options?)

Publishes a package to npm with smart tag handling.

#### Options

- `path` (string): Path to package directory (default: current directory)
- `tag` (string): Tag to publish with (default: prerelease identifier or "edge")

## Version Handling

- **Stable versions** (e.g., 1.0.0):

  - Published to `latest` tag
  - Also tagged as `edge`
  - Requires confirmation before publishing

- **Prerelease versions** (e.g., 1.0.0-beta.1):
  - Published directly to prerelease tag
  - Tag determined from version or specified manually
  - No confirmation required

## Contributing

Please read our [Contributing Guide](../../CONTRIBUTING.md) before submitting a Pull Request to the project.

## License

[MIT](LICENSE) © [Funish](https://funish.net/)
