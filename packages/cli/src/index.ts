import { existsSync, readFileSync } from "node:fs";
import {
  type ArgsDef,
  type CommandDef,
  defineCommand as cittyDefineCommand,
} from "citty";
import { defu } from "defu";
import { basename, dirname, resolve } from "pathe";
import type { PackageJson } from "pkg-types";

export function readPackageJSON(
  path: string = dirname(process.argv[1]),
): PackageJson {
  const pkgPath = resolve(path, "package.json");

  if (existsSync(pkgPath)) {
    const fileContent = readFileSync(pkgPath, "utf-8");
    return JSON.parse(fileContent) as PackageJson;
  }

  const parentPath = resolve(path, "..");
  return parentPath !== path ? readPackageJSON(parentPath) : {};
}

export function defineCommand<T extends ArgsDef = ArgsDef>(
  def: CommandDef<T>,
): CommandDef<T> {
  const pkg = readPackageJSON();

  return cittyDefineCommand(
    defu(def, {
      meta: {
        name: basename(process.argv[1]),
        version: pkg.version,
        description: pkg.description,
      },
    } as CommandDef<T>),
  );
}

export * from "citty";
