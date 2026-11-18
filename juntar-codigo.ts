const fs = require("node:fs");
const path = require("node:path");

const rootDir: string = path.resolve(__dirname);
const outputPrefix = "contexto_parte_";
const MAX_CHARS_PER_PART = 100_000;

const ignoredFolders = new Set<string>([
  "node_modules",
  ".next",
  ".github",
  ".git",
  ".vercel",
  ".turbo",
  "dist",
  "build",
  "coverage",
  "ui",         // Componentes padrão do Shadcn/UI
  "migrations", // Snapshots SQL/JSON gerados pelo Drizzle
]);

const ignoredFiles = new Set<string>([
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "next-env.d.ts",
  "juntar-codigo.ts",
  "contexto_completo.txt",
]);

const allowedExtensions = new Set<string>([
  ".ts",
  ".tsx",
  ".json",
  ".md",
  ".css",
  ".mjs",
]);

const collectedFiles: string[] = [];

function findAndCollectFiles(dir: string): void {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!ignoredFolders.has(entry.name)) {
        findAndCollectFiles(path.join(dir, entry.name));
      }
      continue;
    }

    if (
      ignoredFiles.has(entry.name) ||
      entry.name.startsWith(outputPrefix)
    ) {
      continue;
    }

    const extension: string = path.extname(entry.name).toLowerCase();
    if (allowedExtensions.has(extension)) {
      collectedFiles.push(path.join(dir, entry.name));
    }
  }
}

// 1. Remove arquivos de contexto gerados anteriormente
for (const file of fs.readdirSync(rootDir)) {
  if (file.startsWith(outputPrefix) && file.endsWith(".txt")) {
    fs.unlinkSync(path.join(rootDir, file));
  }
}

// 2. Coleta e ordena os arquivos relevantes do projeto
findAndCollectFiles(rootDir);
collectedFiles.sort((a: string, b: string) => a.localeCompare(b));

// 3. Agrupa em partes respeitando o limite de caracteres sem cortar arquivos no meio
const parts: string[] = [];
let currentBuffer = "";

for (const filePath of collectedFiles) {
  const relativePath: string = path.relative(rootDir, filePath).replace(/\\/g, "/");
  const content: string = fs.readFileSync(filePath, "utf8");

  const fileBlock =
    `\n\n// ==========================================\n` +
    `// Arquivo: ${relativePath}\n` +
    `// ==========================================\n\n` +
    content;

  if (
    currentBuffer.length > 0 &&
    currentBuffer.length + fileBlock.length > MAX_CHARS_PER_PART
  ) {
    parts.push(currentBuffer.trimStart());
    currentBuffer = fileBlock;
  } else {
    currentBuffer += fileBlock;
  }
}

if (currentBuffer.trim().length > 0) {
  parts.push(currentBuffer.trimStart());
}

// 4. Salva cada parte em disco
console.log("Código reunido com sucesso!");
console.log(`Total de arquivos incluídos: ${collectedFiles.length}`);
console.log(`Arquivos gerados (${parts.length} parte(s)):\n`);

parts.forEach((partContent: string, index: number) => {
  const partFileName = `${outputPrefix}${index + 1}.txt`;
  const partPath = path.join(rootDir, partFileName);
  fs.writeFileSync(partPath, partContent, "utf8");
  console.log(
    `- ${partFileName} (${partContent.length.toLocaleString("pt-BR")} caracteres)`
  );
});