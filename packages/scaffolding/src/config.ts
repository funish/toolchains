import { Prompt } from "@funish/prompt";
import { loadConfig } from "c12";

export interface ScaffoldingConfig {
  prompts?: Prompt[];
  extends?: string | [string];
}

export function defineScaffoldingConfig(config: ScaffoldingConfig) {
  return config;
}

const ConfigDefaults = defineScaffoldingConfig({});

export async function loadScaffoldingConfig(
  cwd?: string,
  overrides?: Partial<ScaffoldingConfig>
): Promise<ScaffoldingConfig> {
  const { config } = await loadConfig<ScaffoldingConfig>({
    cwd,
    name: "scaffolding",
    defaults: ConfigDefaults,
    overrides: overrides,
  });

  return config ? config : ConfigDefaults;
}
