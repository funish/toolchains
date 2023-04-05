import { createPrompt } from "@funish/prompt";
import { execSync } from "child_process";
import { detectPackageManager } from "nypm";
import { readPackageJSON, resolvePackageJSON } from "pkg-types";
import { prerelease } from "semver";

export async function bumpPublish(
  options: { path?: string; tag?: string } = {
    path: process.cwd(),
  }
) {
  const npm = async (args: string[]) => {
    execSync(
      `${
        (await detectPackageManager(options.path || process.cwd())).name
      } ${args.join(" ")}`,
      { stdio: "inherit" }
    );
  };

  const { name, version } = await readPackageJSON(
    await resolvePackageJSON(options.path)
  );

  const pre = prerelease(version as string);

  if (!pre) {
    createPrompt([
      {
        name: "publish",
        message: `Are you sure you want to publish ${version} to latest?`,
        default: "n",
        validate: (answer) => {
          if (answer === "y" || answer === "yes") {
            npm(["publish", "--access", "public"]);
            npm(["dist-tag", "add", `${name}@${version}`, "edge"]);
            return true;
          } else {
            return false;
          }
        },
      },
    ]);
  } else {
    npm([
      "publish",
      "--tag",
      options.tag || (typeof pre[0] === "string" ? pre[0] : "edge"),
    ]);
  }
}
