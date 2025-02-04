/**
 * Main test runner for the Funish toolchain
 * Executes all test suites and reports overall results
 */

import { argvTests } from "./argv.test";
import { benchTests } from "./bench.test";
import { bumpTests } from "./bump.test";
import { cliTests } from "./cli.test";
import { githooksTests } from "./githooks.test";
import { lintTests } from "./lint.test";
import { promptTests } from "./prompt.test";
import { scaffoldingTests } from "./scaffolding.test";
import { runTestSuite } from "./test-utils";

/**
 * Runs all test suites and reports the results
 * Exits with code 1 if any tests fail
 */
async function runAllTests() {
  // Collection of all test suites to run
  const testSuites = [
    argvTests, // Command-line argument parsing tests
    benchTests, // Performance benchmarking tests
    bumpTests, // Version management tests
    cliTests, // CLI creation tests
    githooksTests, // Git hooks management tests
    lintTests, // Linting tests
    promptTests, // Interactive prompt tests
    scaffoldingTests, // Project scaffolding tests
  ];

  let totalPassed = 0;
  let totalFailed = 0;

  // Run each test suite and collect results
  for (const suite of testSuites) {
    const { passed, failed } = await runTestSuite(suite);
    totalPassed += passed;
    totalFailed += failed;
  }

  // Print final test results
  console.log("\nFinal Test Results:");
  console.log(`Total Tests: ${totalPassed + totalFailed}`);
  console.log(`Passed: ${totalPassed}`);
  console.log(`Failed: ${totalFailed}`);

  // Exit with error code if any tests failed
  if (totalFailed > 0) {
    process.exit(1);
  }
}

// Run all tests and handle any errors
runAllTests().catch(console.error);
