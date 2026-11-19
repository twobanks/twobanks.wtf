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
  ".svg",
]);

// Extensões aceitas especificamente para listar assets em public/icons
const allowedIconExtensions = new Set<string>([
  ".svg",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".ico",
]);

const collectedFiles: string[] = [];
const collectedIcons: string[] = [];

function findAndCollectFiles(dir: string): void {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(rootDir, fullPath).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      if (!ignoredFolders.has(entry.name)) {
        findAndCollectFiles(fullPath);
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

    // Captura apenas os caminhos dos ícones em public/icons (sem ler conteúdo)
    if (relativePath.startsWith("public/icons/")) {
      if (allowedIconExtensions.has(extension)) {
        collectedIcons.push(`/${relativePath.replace(/^public\//, "")}`);
      }
      continue;
    }

    if (allowedExtensions.has(extension)) {
      collectedFiles.push(fullPath);
    }
  }
}

// Minificação segura: remove indentação redundante e linhas em branco extras
function minifyCode(rawContent: string): string {
  return rawContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");
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
collectedIcons.sort((a: string, b: string) => a.localeCompare(b));

// 3. Agrupa em partes respeitando o limite de caracteres sem cortar arquivos no meio
const parts: string[] = [];
let currentBuffer = "";

// Adiciona o índice de ícones disponíveis no início da primeira parte
if (collectedIcons.length > 0) {
  currentBuffer +=
    `// ==========================================\n` +
    `// Ícones disponíveis em /public/icons (${collectedIcons.length})\n` +
    `// ==========================================\n` +
    collectedIcons.join("\n");
}

for (const filePath of collectedFiles) {
  const relativePath: string = path.relative(rootDir, filePath).replace(/\\/g, "/");
  const rawContent: string = fs.readFileSync(filePath, "utf8");
  const minifiedContent: string = minifyCode(rawContent);

  const fileBlock =
    `\n\n// ==========================================\n` +
    `// Arquivo: ${relativePath}\n` +
    `// ==========================================\n` +
    minifiedContent;

  if (
    currentBuffer.length > 0 &&
    currentBuffer.length + fileBlock.length > MAX_CHARS_PER_PART
  ) {
    parts.push(currentBuffer.trimStart());
    currentBuffer = fileBlock.trimStart();
  } else {
    currentBuffer += fileBlock;
  }
}

if (currentBuffer.trim().length > 0) {
  parts.push(currentBuffer.trimStart());
}

// 4. Salva cada parte em disco
console.log("Código reunido com sucesso!");
console.log(`Total de arquivos de código: ${collectedFiles.length}`);
console.log(`Total de ícones mapeados: ${collectedIcons.length}`);
console.log(`Arquivos gerados (${parts.length} parte(s)):\n`);

parts.forEach((partContent: string, index: number) => {
  const partFileName = `${outputPrefix}${index + 1}.txt`;
  const partPath = path.join(rootDir, partFileName);
  fs.writeFileSync(partPath, partContent, "utf8");
  console.log(
    `- ${partFileName} (${partContent.length.toLocaleString("pt-BR")} caracteres)`
  );
});