import { type SpawnSyncReturns, spawnSync } from "node:child_process";

export const git = (args: string[]): SpawnSyncReturns<Buffer> =>
  spawnSync("git", args);
