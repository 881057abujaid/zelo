import { build } from "esbuild";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");

const entryPoint = resolve(
    projectRoot,
    "src/features/challenges/editor/codemirror.entry.js",
);

const outputFile = resolve(
    projectRoot,
    "src/features/challenges/editor/codemirror.bundle.js",
);

const generatedFile = resolve(
    projectRoot,
    "src/features/challenges/editor/codemirror.generated.ts",
);

await mkdir(dirname(outputFile), { recursive: true });

await build({
    entryPoints: [entryPoint],
    outfile: outputFile,
    bundle: true,
    platform: "browser",
    format: "iife",
    globalName: "CodeMirrorBundle",
    target: ["es2020"],
    minify: true,
    sourcemap: false,
});

const bundle = await readFile(outputFile, "utf8");

const generatedSource = `// Automatically generated. Do not edit manually.
export const codeMirrorBundle = ${JSON.stringify(bundle)};
`;

await writeFile(generatedFile, generatedSource, "utf8");

console.log(`CodeMirror bundle created: ${outputFile}`);
console.log(`TypeScript asset created: ${generatedFile}`);