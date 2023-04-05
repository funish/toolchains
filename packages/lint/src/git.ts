import { SpawnSyncReturns, spawnSync } from "child_process";

export const git = (args: string[]): SpawnSyncReturns<Buffer> =>
  spawnSync("git", args);
