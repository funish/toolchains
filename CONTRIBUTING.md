# Contributing to Funish Toolchains

First off, thank you for considering contributing to Funish Toolchains! It's people like you that make Funish Toolchains such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps which reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed after following the steps
- Explain which behavior you expected to see instead and why
- Include screenshots if possible

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- Use a clear and descriptive title
- Provide a step-by-step description of the suggested enhancement
- Provide specific examples to demonstrate the steps
- Describe the current behavior and explain which behavior you expected to see instead
- Explain why this enhancement would be useful

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints

## Development Process

1. Clone the repository

```bash
git clone https://github.com/funish/toolchains.git
cd toolchains
```

2. Install dependencies

```bash
pnpm install
```

3. Create a new branch

```bash
git checkout -b feature/your-feature-name
```

4. Make your changes and commit them using conventional commits

```bash
git commit -m "feat: add amazing feature"
```

5. Push to your fork and submit a pull request

```bash
git push origin feature/your-feature-name
```

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. This leads to more readable messages that are easy to follow when looking through the project history.

Examples:

- feat: add new feature
- fix: resolve specific issue
- docs: update documentation
- style: formatting, missing semi colons, etc
- refactor: code change that neither fixes a bug nor adds a feature
- test: adding missing tests
- chore: updating build tasks, package manager configs, etc.

## Development Setup

### Prerequisites

- Node.js (version 16.x or higher)
- pnpm (version 8.x or higher)

### Building

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @funish/[package-name] build
```

### Testing

```bash
# Run all tests
pnpm test

# Run specific package tests
pnpm --filter @funish/[package-name] test
```

### Linting

```bash
# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix
```

## Project Structure

```
funish/
├── packages/         # Individual packages
│   ├── cli/         # CLI package
│   ├── argv/        # Argument parsing
│   └── ...         # Other packages
├── playground/      # Examples and tests
├── docs/           # Documentation
└── scripts/        # Build and maintenance scripts
```

## Documentation

- Please update the documentation accordingly when you make changes
- Use clear and consistent terminology
- Include examples where appropriate
- Update the TypeScript types if you change any interfaces

## Questions?

Feel free to open an issue with the tag `question` if you have any questions about contributing.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
