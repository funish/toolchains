import { execSync } from "child_process";
import { consola } from "consola";
import { detectPackageManager } from "nypm";
import { readPackageJSON, resolvePackageJSON } from "pkg-types";
import { prerelease } from "semver";

export async function bumpPublish(
  options: { path?: string; tag?: string } = {
    path: process.cwd(),
  },
) {
  const npm = async (args: string[]) => {
    const detectedPackageManager = await detectPackageManager(
      options.path || process.cwd(),
      {
        includeParentDirs: true,
      },
    );
    if (!detectedPackageManager) {
      throw new Error("Could not detect a package manager.");
    }
    execSync(`${detectedPackageManager.name} ${args.join(" ")}`, {
      stdio: "inherit",
    });
  };

  const { name, version } = await readPackageJSON(
    await resolvePackageJSON(options.path),
  );

  const pre = prerelease(version as string);

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
