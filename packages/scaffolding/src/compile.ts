import {
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "fs";
import { basename, resolve } from "path";
import { consola } from "consola";
import { compile } from "handlebars";
import { ScaffoldingContext } from "./types";

export function compileHandlebarsFile(
  source: string,
  target: string,
  context: ScaffoldingContext,
) {
  const fileTemplateCompile = compile(readFileSync(source).toString())(context);
  writeFileSync(resolve(target, basename(source)), fileTemplateCompile);
}

export function compileHandlebarsDir(
  source: string,
  target: string,
  context: ScaffoldingContext,
) {
  const dirTemplateCompile = compile(source)(context);
  mkdirSync(resolve(target, dirTemplateCompile), {
    recursive: true,
  });
}

export function compileScaffolding(
  source: string,
  target: string,
  context: ScaffoldingContext,
) {
  mkdirSync(target, { recursive: true });
  for (const filename of readdirSync(source)) {
    const stats = lstatSync(resolve(source, filename));

    if (stats.isDirectory()) {
      compileHandlebarsDir(resolve(source, filename), target, context);

      compileScaffolding(
        resolve(source, filename),
        resolve(target, compile(filename)(context)),
        context,
      );
    } else if (stats.isFile()) {
      compileHandlebarsFile(resolve(source, filename), target, context);
    }
  }
}
