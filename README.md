# Funish Toolchains

![GitHub](https://img.shields.io/github/license/funish/toolchains)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> A comprehensive collection of development toolchains for modern JavaScript/TypeScript projects, powered by [Funish](https://funish.net/).

## Features

- 🛠️ **Complete Toolset**: Everything you need for modern JS/TS development
- 📦 **Modular Design**: Use only what you need, each tool is a separate package
- 🔧 **Easy Configuration**: Simple and intuitive configuration for all tools
- 🚀 **Performance Focused**: Built with performance in mind
- 💪 **TypeScript First**: Full TypeScript support with type definitions
- 🔄 **Seamless Integration**: Tools work together perfectly
- 📚 **Well Documented**: Comprehensive documentation for each package
- 🧪 **Well Tested**: Extensive test coverage

## Packages

### Core Tools

- [@funish/cli](./packages/cli/README.md) - Powerful CLI creation utilities
- [@funish/argv](./packages/argv/README.md) - Command line argument parsing
- [@funish/prompt](./packages/prompt/README.md) - Interactive command line prompts

### Development Tools

- [@funish/bench](./packages/bench/README.md) - Performance benchmarking utilities
- [@funish/bump](./packages/bump/README.md) - Version management and publishing
- [@funish/lint](./packages/lint/README.md) - Code and commit message linting
- [@funish/scaffolding](./packages/scaffolding/README.md) - Project scaffolding

### Git Tools

- [@funish/githooks](./packages/githooks/README.md) - Git hooks management
- [@funish/githooks-config](./packages/githooks-config/README.md) - Default Git hooks configuration

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- pnpm 8.x or higher

### Installation

```bash
# Install all packages
pnpm install

# Or install individual packages
pnpm add @funish/cli @funish/argv # etc.
```

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Run linting
pnpm lint
```

## Project Structure

```
funish/
├── packages/         # Individual packages
├── playground/       # Examples and tests
├── docs/            # Documentation
└── scripts/         # Build and maintenance scripts
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Process

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/funish/toolchains/tags).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who have helped shape Funish Toolchains
- Inspired by many great open source projects in the JavaScript ecosystem

## Support

- 📫 [Report bugs or request features](https://github.com/funish/toolchains/issues)

---

[MIT](LICENSE) © [Funish](https://funish.net/)
