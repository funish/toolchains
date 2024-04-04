import { loadConfig } from "c12";
import type { ScaffoldingConfig } from "./types";

export function defineScaffoldingConfig(config: ScaffoldingConfig) {
  return config;
}

const ConfigDefaults = defineScaffoldingConfig({});

export async function loadScaffoldingConfig(
  cwd?: string,
  overrides?: Partial<ScaffoldingConfig>,
): Promise<ScaffoldingConfig> {
  const { config } = await loadConfig<ScaffoldingConfig>({
    cwd,
    name: "scaffolding",
    defaults: ConfigDefaults,
    overrides: overrides,
  });

  return config ? config : ConfigDefaults;
}
