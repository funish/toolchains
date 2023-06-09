import {
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "fs";
import { compile } from "handlebars";
import { basename, resolve } from "path";

export function compileHandlebarsFile(
  source: string,
  target: string,
  context: Object
) {
  const fileTemplateCompile = compile(readFileSync(source).toString())(context);
  writeFileSync(resolve(target, basename(source)), fileTemplateCompile);
}

export function compileHandlebarsDir(
  source: string,
  target: string,
  context: Object
) {
  const dirTemplateCompile = compile(source)(context);
  mkdirSync(resolve(target, dirTemplateCompile), {
    recursive: true,
  });
}

export function compileScaffolding(
  source: string,
  target: string,
  context: Object
) {
  mkdirSync(target, { recursive: true });
  readdirSync(source).forEach((filename) => {
    const stats = lstatSync(resolve(source, filename));
    if (stats.isDirectory()) {
      compileHandlebarsDir(filename, target, context);
      compileScaffolding(
        resolve(source, filename),
        resolve(target, compile(filename)(context)),
        context
      );
    } else if (stats.isFile()) {
      compileHandlebarsFile(resolve(source, filename), target, context);
    }
  });
}
