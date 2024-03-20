import { resolve } from "node:path";
import { cwd } from "node:process";
import { readPackageJSON, writePackageJSON } from "pkg-types";

export async function saveScript(name: string, script: string, path?: string) {
  const pkg = await readPackageJSON(path ? path : cwd());

  pkg.scripts = {
    ...pkg.scripts,
    [name]: script,
  };

  await writePackageJSON(resolve(path ? path : cwd(), "package.json"), pkg);
}
