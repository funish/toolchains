import { execSync } from "node:child_process";
import { consola } from "consola";
import { detectPackageManager } from "nypm";
import { readPackageJSON, resolvePackageJSON } from "pkg-types";
import { prerelease } from "semver";

export async function useNPM(path: string | undefined, args: string[]) {
  const pkgPath = path || process.cwd();

  const detectedPackageManager = await detectPackageManager(pkgPath, {
    includeParentDirs: true,
  });
  if (!detectedPackageManager) {
    throw new Error("Could not detect a package manager.");
  }
  execSync(`${detectedPackageManager.name} ${args.join(" ")}`, {
    stdio: "inherit",
  });
}

export async function bumpPublish(
  options: { path?: string; tag?: string } = {
    path: process.cwd(),
  },
) {
  const { name, version } = await readPackageJSON(
    await resolvePackageJSON(options.path),
  );

  const npm = async (args: string[]) => {
    await useNPM(options.path, args);
  };

  const pre = prerelease(version as string);

  if (name && version) {
    if (!pre) {
      const answer = await consola.prompt(
        `Are you sure you want to publish ${name}@${version} to latest?`,
        {
          type: "confirm",
        },
      );

      if (answer) {
        npm(["publish", "--access", "public"]);
        npm(["dist-tag", "add", `${name}@${version}`, "edge"]);
      } else {
        consola.error(`Publish has been cancelled.(${name}@${version})`);
      }
    } else {
      npm([
        "publish",
        "--tag",
        options.tag || (typeof pre[0] === "string" ? pre[0] : "edge"),
      ]);
    }
  }
}
