import {
  readPackageJSON,
  resolvePackageJSON,
  writePackageJSON,
} from "pkg-types";
import { type ReleaseType, type SemVer, inc, prerelease } from "semver";

export async function bumpVersion(
  options: {
    path?: string;
    release?: ReleaseType;
    tag?: string;
  } = { path: process.cwd(), release: "prerelease" },
) {
  const pkg = await readPackageJSON(await resolvePackageJSON(options.path));
  const pre = prerelease(pkg.version as unknown as SemVer);
  const version = inc(
    pkg.version as unknown as SemVer,
    options.release || (pre ? "prerelease" : "patch"),
    options.tag || (pre && typeof pre[0] === "string" ? pre[0] : "edge"),
  );
  if (version) {
    pkg.version = version;
    await writePackageJSON(await resolvePackageJSON(options.path), pkg);
  }
}
