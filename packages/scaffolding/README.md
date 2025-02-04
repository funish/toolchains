# @funish/scaffolding

![npm version](https://img.shields.io/npm/v/@funish/scaffolding)
![npm downloads](https://img.shields.io/npm/dw/@funish/scaffolding)
![npm license](https://img.shields.io/npm/l/@funish/scaffolding)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> Powerful project scaffolding with template support and interactive prompts, powered by [Funish](https://funish.net/).

## Features

- 🚀 Quick project setup
- 📦 Multiple template sources
- 🔧 Interactive configuration
- 🎨 Handlebars templating
- 💪 TypeScript support
- 🔄 Git repository support
- 🎯 Custom prompts
- ⚡ Fast and lightweight
- 🌟 Extensible design

## Installation

```bash
# npm
$ npm install @funish/scaffolding

# yarn
$ yarn add @funish/scaffolding

# pnpm
$ pnpm add @funish/scaffolding
```

## Usage

### Basic Usage

```ts
import { createScaffolding } from "@funish/scaffolding";

// Create from GitHub template
await createScaffolding("github:user/repo", "./my-project", {
  projectName: "my-awesome-project",
  description: "An awesome project",
});

// Create from local template
await createScaffolding("./templates/vue-app", "./my-vue-app", {
  name: "My Vue App",
  version: "1.0.0",
});
```

### With Configuration File

Create a `scaffolding.config.ts` file:

```ts
import { defineScaffoldingConfig } from "@funish/scaffolding";

export default defineScaffoldingConfig({
  // Interactive prompts
  prompts: {
    projectName: {
      type: "text",
      placeholder: "Project name",
    },
    framework: {
      type: "select",
      options: ["vue", "react", "svelte"],
    },
    features: {
      type: "multiselect",
      options: ["typescript", "eslint", "prettier", "testing", "ci"],
    },
  },
});
```

### Template Sources

Supports multiple template sources through [giget](https://github.com/unjs/giget):

```ts
// GitHub repository
await createScaffolding("github:user/repo");

// GitLab repository
await createScaffolding("gitlab:user/repo");

// npm package
await createScaffolding("npm:package-name");

// Local directory
await createScaffolding("./path/to/template");
```

### Template Structure

Templates can use Handlebars syntax for dynamic content:

```
my-template/
├── package.json.hbs          # Template files use .hbs extension
├── README.md.hbs
└── src/
    ├── {{name}}.ts          # Dynamic file names
    └── components/
        └── {{pascalCase name}}.vue
```

Example template file (`package.json.hbs`):

```json
{
  "name": "{{projectName}}",
  "version": "{{version}}",
  "description": "{{description}}",
  "author": "{{author}}",
  "license": "{{license}}",
  "dependencies": {
    {{#each dependencies}}
    "{{@key}}": "{{this}}"
    {{/each}}
  }
}
```

## API Reference

### createScaffolding(source, target, context?, options?)

Creates a new project from a template.

#### Parameters

- `source` (string): Template source (git repository, npm package, or local path)
- `target` (string): Directory where the project should be created
- `context` (object): Template variables
- `options` (object): Download options (auth tokens, branch name, etc)

### defineScaffoldingConfig(config)

Creates a type-safe scaffolding configuration.

#### Parameters

- `config` (ScaffoldingConfig): Configuration object
  - `prompts`: Interactive prompts configuration
  - `extends`: Base configuration to extend

## Template Context

Templates have access to:

- User-provided context variables
- Built-in helpers:
  - `camelCase`
  - `pascalCase`
  - `kebabCase`
  - `snakeCase`
  - Date/time helpers
  - Conditional helpers

## Contributing

Please read our [Contributing Guide](../../CONTRIBUTING.md) before submitting a Pull Request to the project.

## License

[MIT](LICENSE) © [Funish](https://funish.net/)
