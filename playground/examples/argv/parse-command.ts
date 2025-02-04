import { parserRegexp } from "@funish/argv";

// Example 1: Basic command line parsing
console.log("\nExample 1: Basic command parsing");
const args1 = parserRegexp([
  "--name=john",
  "--age=25",
  "file1.txt",
  "file2.txt",
]);
console.log("Parsed arguments:", args1);
// Output: { name: "john", age: 25, _: ["file1.txt", "file2.txt"] }

// Example 2: Boolean flags
console.log("\nExample 2: Boolean flags");
const args2 = parserRegexp(["--verbose", "--no-cache", "build"]);
console.log("Parsed arguments:", args2);
// Output: { verbose: true, cache: false, _: ["build"] }

// Example 3: Combined short options
console.log("\nExample 3: Combined options");
const args3 = parserRegexp(["-p=8080", "--host=localhost", "-v", "start"]);
console.log("Parsed arguments:", args3);
// Output: { p: 8080, host: "localhost", v: true, _: ["start"] }

// Example 4: Complex command
console.log("\nExample 4: Complex command");
const args4 = parserRegexp([
  "deploy",
  "--env=prod",
  "--region=us-east-1",
  "--instances=5",
  "--no-backup",
  "-f",
  "--tags=service=api,env=prod",
]);
console.log("Parsed arguments:", args4);
