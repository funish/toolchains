import { defineGithooksConfig } from "@funish/githooks";

export default defineGithooksConfig({
  hooks: {
    "pre-commit": "pnpm lint staged",
    "commit-msg": "pnpm lint commit-msg",
  },
});
