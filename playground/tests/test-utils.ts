/**
 * Test utilities for the Funish toolchain test suite.
 * This module provides common testing functionality used across all test files.
 */

import { strict as assert } from "node:assert";

/**
 * Represents a single test case in a test suite
 */
export interface TestCase {
  /** The name of the test case */
  name: string;
  /** The test function that can be synchronous or asynchronous */
  fn: () => void | Promise<void>;
}

/**
 * Represents a collection of related test cases
 */
export interface TestSuite {
  /** The name of the test suite */
  name: string;
  /** Array of test cases in this suite */
  tests: TestCase[];
}

/**
 * Asserts that two values are deeply equal
 * @param actual The actual value to test
 * @param expected The expected value to compare against
 * @param message Optional message to display on failure
 */
export function assertEquals<T>(
  actual: T,
  expected: T,
  message?: string,
): void {
  assert.deepEqual(actual, expected, message);
}

/**
 * Asserts that a function throws an expected error
 * @param fn The function that should throw
 * @param error Expected error message, RegExp pattern, or Error object
 */
export function assertThrows(
  fn: () => unknown,
  error: Error | RegExp | string,
): void {
  if (error instanceof RegExp || typeof error === "string") {
    assert.throws(fn, (err: Error) => {
      return error instanceof RegExp
        ? error.test(err.message)
        : err.message === error;
    });
  } else {
    assert.throws(fn, error);
  }
}

/**
 * Asserts that an async function throws an expected error
 * @param fn The async function that should throw
 * @param expectedError Expected error message, RegExp pattern, or Error object
 */
export async function assertThrowsAsync(
  fn: () => Promise<unknown>,
  expectedError: Error | RegExp | string,
): Promise<void> {
  try {
    await fn();
    assert.fail("Expected function to throw an error");
  } catch (error) {
    if (error instanceof Error) {
      if (expectedError instanceof RegExp) {
        assert.match(error.message, expectedError);
      } else if (typeof expectedError === "string") {
        assert.strictEqual(error.message, expectedError);
      } else {
        assert.strictEqual(error, expectedError);
      }
    }
  }
}

/**
 * Runs a test suite and reports the results
 * @param suite The test suite to run
 * @returns Object containing the number of passed and failed tests
 */
export async function runTestSuite(
  suite: TestSuite,
): Promise<{ passed: number; failed: number }> {
  console.log(`\nRunning test suite: ${suite.name}`);
  let passed = 0;
  let failed = 0;

  for (const test of suite.tests) {
    try {
      await test.fn();
      console.log(`✓ ${test.name}`);
      passed++;
    } catch (error) {
      console.error(`✗ ${test.name}`);
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
      failed++;
    }
  }

  return { passed, failed };
}
