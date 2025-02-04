# Funish Toolchains Examples

This directory contains practical examples demonstrating how to use various packages in the Funish Toolchains.

## Directory Structure

```
playground/
  examples/
    argv/           - Command line argument parsing examples
    bench/          - Performance benchmarking examples
    bump/           - Version management examples
    cli/            - CLI creation examples
    githooks/       - Git hooks management examples
    lint/           - Code and commit message linting examples
    prompt/         - Interactive prompt examples
    scaffolding/    - Project scaffolding examples
```

## Running Examples

Each example can be run using the following command:

```bash
# Install dependencies first
pnpm install

# Run specific example
pnpm tsx playground/examples/<package>/<example-file>.ts
```

For example:

```bash
# Run argv parsing example
pnpm tsx playground/examples/argv/parse-command.ts

# Run benchmarking example
pnpm tsx playground/examples/bench/performance-test.ts
```

## Example Descriptions

### argv

- `parse-command.ts`: Demonstrates parsing various types of command line arguments including flags, values, and arrays.

### bench

- `performance-test.ts`: Shows how to benchmark different operations including array operations, string manipulations, async operations, and object operations.

### bump

- `version-management.ts`: Examples of version bumping (patch, minor, major) and package publishing with different tags.

### cli

- `custom-command.ts`: Shows how to create custom CLI commands with subcommands, options, and validation.

### githooks

- `git-hooks-setup.ts`: Demonstrates installing, configuring, and managing Git hooks, including migration from Husky.

### lint

- `code-linting.ts`: Examples of linting commit messages and staged files with custom rules and configurations.

### prompt

- `interactive-prompts.ts`: Shows how to create interactive command line prompts for user input and configuration.

### scaffolding

- `create-project.ts`: Demonstrates creating different types of projects using templates.

## Notes

- Some examples require a Git repository to work properly (githooks, lint)
- The scaffolding examples require internet access to download templates
- The bump examples require npm registry access for publishing
