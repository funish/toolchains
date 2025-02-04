/**
 * Tests for the @funish/bench package
 * Tests the benchmarking functionality including task execution, timing, and result reporting
 */

import { Bench } from "@funish/bench";
import { assertEquals, assertThrows } from "./test-utils";
import type { TestSuite } from "./test-utils";

export const benchTests: TestSuite = {
  name: "bench",
  tests: [
    {
      name: "should create bench instance and run simple task",
      fn: () => {
        // Create a new benchmark instance with default settings
        const bench = new Bench();
        // Add a simple arithmetic operation to benchmark
        bench.add("test", () => {
          const a = 1 + 1;
        });
        // Verify the results format and content
        const results = bench.getResults();
        assertEquals(results.length, 1);
        assertEquals(results[0]["Task name"], "test");
        assertEquals(typeof results[0]["Average (ns)"], "number");
      },
    },
    {
      name: "should use custom time unit",
      fn: () => {
        // Create a benchmark instance with milliseconds as the time unit
        const bench = new Bench({ unit: "ms" });
        bench.add("test", () => {
          const a = 1 + 1;
        });
        // Verify that results use the specified time unit
        const results = bench.getResults();
        assertEquals(results.length, 1);
        assertEquals(results[0]["Task name"], "test");
        assertEquals(typeof results[0]["Average (ms)"], "number");
      },
    },
    {
      name: "should validate times option",
      fn: () => {
        // Test that negative iteration count is rejected
        assertThrows(
          () => new Bench({ times: -1 }),
          "Times must be a positive integer",
        );
        // Test that non-integer iteration count is rejected
        assertThrows(
          () => new Bench({ times: 1.5 }),
          "Times must be a positive integer",
        );
      },
    },
    {
      name: "should validate unit option",
      fn: () => {
        // Define valid time units for type checking
        type TimeUnit = "s" | "ms" | "µs" | "ns";
        // Test that invalid time unit is rejected
        assertThrows(
          () => new Bench({ unit: "invalid" as TimeUnit }),
          "Unit must be one of: s, ms, µs, ns",
        );
      },
    },
    {
      name: "should validate benchmark task",
      fn: () => {
        const bench = new Bench();
        // Test that empty task name is rejected
        assertThrows(
          () => bench.add("", () => {}),
          "Task name must be a non-empty string",
        );
        // Test that invalid task function is rejected
        assertThrows(
          () => bench.add("test", null as unknown as () => void),
          "Task function must be a function",
        );
      },
    },
  ],
};
