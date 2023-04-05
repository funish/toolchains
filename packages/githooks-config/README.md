# @funish/githooks-config

![npm version](https://img.shields.io/npm/v/@funish/githooks-config)
![npm downloads](https://img.shields.io/npm/dw/@funish/githooks-config)
![npm license](https://img.shields.io/npm/l/@funish/githooks-config)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> Shared githooks configuration, powered by [Funish](https://funish.net/).

## Getting started

```bash
# npm
$ npm install -D @funish/githooks-config

# yarn
$ yarn add -D @funish/githooks-config

# pnpm
$ pnpm add -D @funish/githooks-config
```

## Usage

```ts
// githooks.config.ts
import { defineGithooksConfig } from "@funish/githooks";

export default defineGithooksConfig({
  extends: ["@funish/githooks-config"],
});
```

## License

- [MIT](LICENSE) &copy; [Funish](https://funish.net/)
