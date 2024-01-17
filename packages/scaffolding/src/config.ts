import { loadConfig } from "c12";
import { consola } from "consola";
import { PromptOptions, inferPromptReturnType } from "./types";

export type ScaffoldingConfig = {
  prompts?: {
    [key: string]: inferPromptReturnType<PromptOptions>;
  }[];
  extends?: string | [string];
};

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
