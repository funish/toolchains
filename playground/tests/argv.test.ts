/**
 * Tests for the @funish/argv package
 * Tests various command line argument parsing scenarios using the parserRegexp function
 */

import { parserRegexp } from "@funish/argv";
import { assertEquals } from "./test-utils";
import type { TestSuite } from "./test-utils";

export const argvTests: TestSuite = {
  name: "argv",
  tests: [
    {
      name: "should parse basic arguments",
      fn: () => {
        // Test parsing of named arguments and positional arguments
        const args = parserRegexp([
          "--name=john",
          "--age=25",
          "file1.txt",
          "file2.txt",
        ]);
        assertEquals(args, {
          name: "john",
          age: 25,
          _: ["file1.txt", "file2.txt"], // Positional arguments stored in _ array
        });
      },
    },
    {
      name: "should parse boolean flags",
      fn: () => {
        // Test parsing of boolean flags with positive and negative forms
        const args = parserRegexp(["--verbose", "--no-cache", "build"]);
        assertEquals(args, {
          verbose: true, // Flag without value becomes true
          cache: false, // --no-prefix sets flag to false
          _: ["build"],
        });
      },
    },
    {
      name: "should parse short options",
      fn: () => {
        // Test parsing of short-form options (-p) and mixed with long-form options
        const args = parserRegexp([
          "-p=8080",
          "--host=localhost",
          "-v",
          "start",
        ]);
        assertEquals(args, {
          p: 8080, // Short option with numeric value
          host: "localhost", // Long option with string value
          v: true, // Short flag becomes boolean true
          _: ["start"],
        });
      },
    },
    {
      name: "should parse complex command",
      fn: () => {
        // Test parsing of a complex deployment command with various option types
        const args = parserRegexp([
          "deploy",
          "--env=prod",
          "--region=us-east-1",
          "--instances=5",
          "--no-backup",
          "-f",
          "--tags=service=api,env=prod",
        ]);
        assertEquals(args, {
          env: "prod",
          region: "us-east-1",
          instances: 5, // Numeric value is automatically converted
          backup: false, // Negative flag
          f: true, // Short flag
          tags: "service=api,env=prod", // Complex string value
          _: ["deploy"], // Command as positional argument
        });
      },
    },
  ],
};
