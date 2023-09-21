# @funish/bench

![npm version](https://img.shields.io/npm/v/@funish/bench)
![npm downloads](https://img.shields.io/npm/dw/@funish/bench)
![npm license](https://img.shields.io/npm/l/@funish/bench)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> > Programmatically create benchmark tests, powered by Funish.

## Getting started

```bash
# npm
$ npm install @funish/bench

# yarn
$ yarn add @funish/bench

# pnpm
$ pnpm add @funish/bench
```

## Usage

### Bench

```ts
import { Bench } from "@funish/bench";

const bench = new Bench({
  times: 1000,
  unit: "ns",
});

bench.add("test", () => {
  // ...
});

bench.print();
```

## Interfaces

See it on [JSDoc](https://www.jsdocs.io/package/@funish/bench).

## License

- [MIT](LICENSE) &copy; [Funish](https://funish.net/)
