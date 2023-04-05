import { commitMsgLint } from "./commit-msg";
import { stagedLint } from "./staged";
import cac from "cac";
import consola from "consola";
import { readPackageJSON } from "pkg-types";
import { fileURLToPath } from "url";

const cli = cac("lint");
const pkg = await readPackageJSON(
  fileURLToPath(new URL("../", import.meta.url))
);
const version = pkg.version as string;

// Listen to unknown commands
cli.on("command:*", () => {
  consola.error("Invalid command: %s", cli.args.join(" "));
  process.exit(1);
});

// Register commands
cli.command("commit-msg", "Lint commit message").action(() => {
  commitMsgLint();
});

cli.command("staged", "Lint staged files").action(() => {
  stagedLint();
});

// Display help message when `-h` or `--help` appears
cli.help();
// Display version number when `-v` or `--version` appears
// It's also used in help message
cli.version(version);

try {
  // Parse CLI args without running the command
  cli.parse(process.argv, { run: false });
  // Run the command yourself
  // You only need `await` when your command action returns a Promise
  await cli.runMatchedCommand();
} catch (error) {
  // Handle error here..
  // e.g.
  consola.error(error);
  process.exit(1);
}
