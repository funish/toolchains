import { exec } from "node:child_process";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: true,
  entries: ["src/index", "src/cli"],
  rollup: {
    emitCJS: true,
    esbuild: {
      minify: true,
    },
  },
  hooks: {
    "rollup:done": () => {
      exec(
        "ts-json-schema-generator --path dist/index.d.ts --type ScaffoldingConfig -o dist/schema.json -e all",
      );
    },
  },
});
