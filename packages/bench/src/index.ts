/**
 * High-performance benchmarking utilities for Node.js and browser
 * @module @funish/bench
 */

/**
 * Configuration options for the benchmark
 * @interface BenchOptions
 * @property {number} times Number of times to run each benchmark (default: 1000)
 * @property {"s" | "ms" | "µs" | "ns"} unit Time unit for results (default: "ns")
 */
interface BenchOptions {
  times: number;
  unit: "s" | "ms" | "µs" | "ns";
}

/**
 * Result of a benchmark run
 * @interface BenchResult
 * @property {string} "Task name" Name of the benchmarked task
 * @property {string | number} [key] Various timing measurements in the specified unit
 */
interface BenchResult {
  "Task name": string;
  [key: string]: string | number;
}

/**
 * Gets the current high-resolution timestamp in nanoseconds
 * Works in both Node.js and browser environments
 * @returns {number} Current timestamp in nanoseconds
 * @throws {Error} If unable to get high-resolution time
 */
function now() {
  try {
    return typeof window !== "undefined"
      ? window.performance.now() * 1e6
      : Number(process.hrtime.bigint());
  } catch (error) {
    throw new Error(
      `Failed to get high-resolution time: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

/**
 * Validates and normalizes benchmark options
 * @param {Partial<BenchOptions>} options Partial benchmark options
 * @returns {Required<BenchOptions>} Complete benchmark options with defaults
 * @throws {Error} If options are invalid
 */
function validateOptions(
  options: Partial<BenchOptions>,
): Required<BenchOptions> {
  const times = options.times ?? 1e3;
  const unit = options.unit ?? "ns";

  if (times <= 0 || !Number.isInteger(times)) {
    throw new Error("Times must be a positive integer");
  }

  if (!["s", "ms", "µs", "ns"].includes(unit)) {
    throw new Error("Unit must be one of: s, ms, µs, ns");
  }

  return { times, unit };
}

/**
 * Main benchmark class for measuring code performance
 * @class Bench
 * @example
 * ```ts
 * const bench = new Bench({ times: 1000, unit: 'ms' });
 *
 * bench.add('Array.push', () => {
 *   const arr = [];
 *   arr.push(1);
 * });
 *
 * bench.print(); // Prints results in a table
 * ```
 */
export class Bench {
  private readonly times: number;
  private readonly unit: "s" | "ms" | "µs" | "ns";
  private readonly results: BenchResult[];

  /**
   * Creates a new benchmark instance
   * @param {Partial<BenchOptions>} options Benchmark configuration options
   * @throws {Error} If options are invalid
   */
  constructor(options: Partial<BenchOptions> = {}) {
    const validatedOptions = validateOptions(options);
    this.times = validatedOptions.times;
    this.unit = validatedOptions.unit;
    this.results = [];
  }

  /**
   * Adds a task to the benchmark
   * @param {string} name Name of the task
   * @param {() => void} fn Function to benchmark
   * @returns {this} The benchmark instance for chaining
   * @throws {Error} If name is invalid or function fails to execute
   */
  add(name: string, fn: () => void) {
    if (!name || typeof name !== "string") {
      throw new Error("Task name must be a non-empty string");
    }
    if (typeof fn !== "function") {
      throw new Error("Task function must be a function");
    }

    try {
      const stats: number[] = [];

      for (let i = 0; i < this.times; i++) {
        const start = now();
        fn();
        const end = now();
        stats.push(end - start);
      }

      if (stats.length === 0) {
        throw new Error("No measurements were collected");
      }

      const total = stats.reduce((a, b) => a + b, 0);
      const average = total / stats.length;

      // Sort the stats array
      stats.sort((a, b) => a - b);

      const fastest = stats[0];
      const slowest = stats[stats.length - 1];
      const median = stats[Math.floor(stats.length / 2)];

      const standardDeviation = Math.sqrt(
        stats.map((x) => (x - average) ** 2).reduce((a, b) => a + b, 0) /
          stats.length,
      );

      // Convert to the specified unit
      const numberator = 1e3 ** ["ns", "µs", "ms", "s"].indexOf(this.unit);

      this.results.push({
        "Task name": name,
        [`Total (${this.unit})`]: +(total / numberator).toFixed(3),
        [`Average (${this.unit})`]: +(average / numberator).toFixed(3),
        [`Fastest (${this.unit})`]: +(fastest / numberator).toFixed(3),
        [`Slowest (${this.unit})`]: +(slowest / numberator).toFixed(3),
        [`Median (${this.unit})`]: +(median / numberator).toFixed(3),
        "Standard deviation": +(standardDeviation / numberator).toFixed(3),
      });

      return this;
    } catch (error) {
      throw new Error(
        `Failed to benchmark task "${name}": ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  /**
   * Prints the benchmark results to the console in a table format
   * @returns {void}
   */
  print() {
    if (this.results.length === 0) {
      console.warn("No benchmark results to display");
      return;
    }
    console.table(this.results);
  }

  /**
   * Gets a copy of the benchmark results
   * @returns {readonly BenchResult[]} Array of benchmark results
   */
  getResults(): readonly BenchResult[] {
    return [...this.results];
  }
}
