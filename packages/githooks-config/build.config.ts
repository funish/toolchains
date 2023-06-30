import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: true,
  entries: [
    "src/index",
    {
      input: "src/index",
      format: "cjs",
    },
  ],
  rollup: {
    emitCJS: true,
  },
});
