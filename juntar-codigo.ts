
const fs = require("fs");
const path = require("path");

const outputFileName = "contexto_completo.txt";
const rootDir = path.resolve(__dirname);

const ignoredFolders = new Set([
  "node_modules",
  ".next",
  ".github",
  ".git",
  "dist",
  "build",
]);

const allowedExtensions = new Set([".ts", ".tsx"]);

const outputPath = path.join(rootDir, outputFileName);
const collectedFiles: any = [];

function findAndCollectFiles(dir: any) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    // Ignora pastas específicas
    if (entry.isDirectory() && ignoredFolders.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      findAndCollectFiles(fullPath);
      continue;
    }

    // Verifica a extensão real do arquivo
    const extension = path.extname(entry.name).toLowerCase();

    if (
      allowedExtensions.has(extension) &&
      fullPath !== outputPath
    ) {
      collectedFiles.push(fullPath);
    }
  }
}

// Percorre todo o projeto
findAndCollectFiles(rootDir);

// Ordena os arquivos para facilitar a leitura
collectedFiles.sort();

let output = "";

for (const filePath of collectedFiles) {
  const relativePath = path.relative(rootDir, filePath);
  const content = fs.readFileSync(filePath, "utf8");

  output +=
    `\n\n// ==========================================\n` +
    `// Arquivo: ${relativePath}\n` +
    `// ==========================================\n\n` +
    content;
}

// Escreve tudo de uma vez
fs.writeFileSync(outputPath, output, "utf8");

console.log("Código reunido com sucesso!");
console.log(`Arquivos encontrados: ${collectedFiles.length}`);
console.log(`Arquivo gerado: ${outputPath}`);

console.log("\nArquivos .ts encontrados:");
collectedFiles
  .filter((file: any) => path.extname(file).toLowerCase() === ".ts")
  .forEach((file: any) => {
    console.log(`- ${path.relative(rootDir, file)}`);
  });
