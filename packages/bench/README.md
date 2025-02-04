# @funish/bench

![npm version](https://img.shields.io/npm/v/@funish/bench)
![npm downloads](https://img.shields.io/npm/dw/@funish/bench)
![npm license](https://img.shields.io/npm/l/@funish/bench)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> High-performance benchmarking utilities for Node.js and browser environments, powered by [Funish](https://funish.net/).

## Features

- 🚀 Simple and intuitive API
- 📊 Comprehensive statistical analysis
- ⏱️ High-resolution timing
- 🔄 Multiple time units support (s, ms, µs, ns)
- 🌐 Works in Node.js and browsers
- 📈 Detailed performance metrics
- 📦 Zero dependencies
- 🌟 Full TypeScript support

## Installation

```bash
# npm
$ npm install @funish/bench

# yarn
$ yarn add @funish/bench

# pnpm
$ pnpm add @funish/bench
```

## Usage

### Basic Benchmarking

```ts
import { Bench } from "@funish/bench";

const bench = new Bench({
  times: 1000, // Number of iterations
  unit: "ms", // Time unit (s, ms, µs, ns)
});

// Add tasks to benchmark
bench.add("Array.push", () => {
  const arr = [];
  arr.push(1);
});

bench.add("Array literal", () => {
  const arr = [1];
});

// Print results
bench.print();
```

### Chaining API

```ts
new Bench()
  .add("Task 1", () => {
    /* ... */
  })
  .add("Task 2", () => {
    /* ... */
  })
  .print();
```

### Getting Results Programmatically

```ts
const bench = new Bench();
bench.add("test", () => {
  /* ... */
});

const results = bench.getResults();
// Process results as needed
```

## API Reference

### Bench Class

#### Constructor

```ts
new Bench(options?: BenchOptions)
```

##### Options

- `times` (number, default: 1000): Number of iterations for each task
- `unit` ("s" | "ms" | "µs" | "ns", default: "ns"): Time unit for results

#### Methods

##### add(name: string, fn: () => void): Bench

Adds a task to benchmark.

- `name`: Task identifier
- `fn`: Function to benchmark
- Returns: The Bench instance for chaining

##### print(): void

Prints results to console in a table format.

##### getResults(): readonly BenchResult[]

Returns a copy of the benchmark results.

#### Result Format

Each result contains:

- Task name
- Total time
- Average time
- Fastest time
- Slowest time
- Median time
- Standard deviation

Example output:

```
┌─────────┬────────────┬─────────────┬─────────────┬─────────────┬─────────────┬────────────────────┐
│ Task    │ Total (ms) │ Average (ms)│ Fastest (ms)│ Slowest (ms)│ Median (ms) │ Standard deviation │
├─────────┼────────────┼─────────────┼─────────────┼─────────────┼─────────────┼────────────────────┤
│ Task 1  │ 100.000    │ 0.100       │ 0.080       │ 0.150       │ 0.095       │ 0.015             │
└─────────┴────────────┴─────────────┴─────────────┴─────────────┴─────────────┴────────────────────┘
```

## Contributing

Please read our [Contributing Guide](../../CONTRIBUTING.md) before submitting a Pull Request to the project.

## License

[MIT](LICENSE) © [Funish](https://funish.net/)
