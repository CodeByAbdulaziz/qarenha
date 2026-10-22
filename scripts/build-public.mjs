import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const destination = path.join(root, "_site");
if (path.dirname(destination) !== path.resolve(root)) throw new Error("Invalid output directory");
await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
for (const entry of await readdir(root, { withFileTypes: true })) {
  if (entry.isFile() && (/\.(html|css|js|xml)$/.test(entry.name) || entry.name === ".nojekyll")) {
    await cp(path.join(root, entry.name), path.join(destination, entry.name));
  }
}
for (const directory of ["assets", "data"]) {
  await cp(path.join(root, directory), path.join(destination, directory), { recursive: true });
}
console.log("Built public files in _site; source scripts and repository metadata are excluded.");
