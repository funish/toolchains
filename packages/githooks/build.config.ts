import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: true,
  entries: [
    "src/index",
    "src/cli",
    {
      input: "src/index",
      format: "cjs",
    },
  ],
  rollup: {
    emitCJS: true,
    esbuild: {
      minify: true,
    },
  },
});
