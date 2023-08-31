interface BenchOptions {
  times: number;
  unit: "s" | "ms" | "µs" | "ns";
}

function now() {
  return typeof window !== "undefined"
    ? window.performance.now()
    : Number(process.hrtime.bigint());
}

export class Bench {
  times: number;
  unit: "s" | "ms" | "µs" | "ns";
  results: { [key: string]: string | number }[];

  constructor(
    options: Partial<BenchOptions> = {
      times: 1e3,
      unit: "ns",
    },
  ) {
    this.times = options.times || 1e3;
    this.unit = options.unit || "ns";
    this.results = [];
  }

  add(name: string, fn: () => void) {
    const stats = [] as number[];

    for (let i = 0; i < this.times; i++) {
      const start = now();
      fn();
      const end = now();
      stats.push(end - start);
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
      [`Total (${this.unit})`]: total / numberator,
      [`Average (${this.unit})`]: average / numberator,
      [`Fastest (${this.unit})`]: fastest / numberator,
      [`Slowest (${this.unit})`]: slowest / numberator,
      [`Median (${this.unit})`]: median / numberator,
      "Standard deviation": standardDeviation / numberator,
    });

    return this;
  }

  print() {
    console.table(this.results);
  }

  getResults() {
    return this.results;
  }
}
