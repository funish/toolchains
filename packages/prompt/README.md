# @funish/prompt

![npm version](https://img.shields.io/npm/v/@funish/prompt)
![npm downloads](https://img.shields.io/npm/dw/@funish/prompt)
![npm license](https://img.shields.io/npm/l/@funish/prompt)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> Interactive command line prompts with beautiful UI and type safety, powered by [Funish](https://funish.net/) and built on [Consola](https://github.com/unjs/consola).

## Features

- 🎨 Beautiful and intuitive UI
- 🔒 Type-safe prompt definitions
- 📝 Multiple prompt types support
- 🎯 Easy to use API
- ⚡ Async/await support
- 🔄 Chainable prompts
- 💪 Full TypeScript support
- 🎭 Custom validation
- 🌈 Rich formatting options

## Installation

```bash
# npm
$ npm install @funish/prompt

# yarn
$ yarn add @funish/prompt

# pnpm
$ pnpm add @funish/prompt
```

## Usage

### Single Prompt

```ts
import { usePrompt } from "@funish/prompt";

// Basic text prompt
const name = await usePrompt("What is your name?", { type: "text" });

// Confirmation prompt
const confirm = await usePrompt("Are you sure?", { type: "confirm" });

// Selection prompt
const color = await usePrompt("Choose a color:", {
  type: "select",
  options: ["red", "blue", "green"],
});
```

### Multiple Prompts

```ts
import { createPrompt } from "@funish/prompt";

const answers = await createPrompt({
  // Text input
  name: {
    type: "text",
    placeholder: "Your name",
    required: true,
  },

  // Confirmation
  private: {
    type: "confirm",
    initial: false,
  },

  // Multiple selection
  keywords: {
    type: "multiselect",
    options: ["TypeScript", "Node.js", "React", "Vue"],
    required: true,
  },

  // Single selection
  framework: {
    type: "select",
    options: ["Next.js", "Nuxt", "Remix"],
    initial: "Next.js",
  },
});

console.log(answers);
// {
//   name: "John Doe",
//   private: false,
//   keywords: ["TypeScript", "Node.js"],
//   framework: "Next.js"
// }
```

### With Validation

```ts
const port = await usePrompt("Enter port number:", {
  type: "text",
  validate: (value) => {
    const num = parseInt(value);
    if (isNaN(num)) return "Must be a number";
    if (num < 1 || num > 65535) return "Must be between 1 and 65535";
    return true;
  },
});
```

## API Reference

### usePrompt(message, options?)

Creates a single interactive prompt.

#### Parameters

- `message` (string): The prompt message to display
- `options` (PromptOptions): Configuration options
  - `type`: Prompt type ("text" | "confirm" | "select" | "multiselect")
  - `placeholder`: Default placeholder text
  - `initial`: Initial value
  - `required`: Whether the input is required
  - `validate`: Custom validation function
  - `options`: Array of options for select/multiselect

### createPrompt(prompts)

Creates multiple interactive prompts.

#### Parameters

- `prompts` (Prompts): Object mapping prompt names to their configurations

#### Returns

Promise resolving to an object containing all prompt responses.

## Prompt Types

- `text`: Free-form text input
- `confirm`: Yes/no confirmation
- `select`: Single option selection
- `multiselect`: Multiple option selection

## Type Definitions

For detailed type definitions and interfaces, see our [API Documentation](https://www.jsdocs.io/package/@funish/prompt).

## Contributing

Please read our [Contributing Guide](../../CONTRIBUTING.md) before submitting a Pull Request to the project.

## License

[MIT](LICENSE) © [Funish](https://funish.net/)
