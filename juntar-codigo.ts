import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const currentFilePath: string = fileURLToPath(import.meta.url);
const rootDir: string = path.dirname(currentFilePath);
const currentScriptName: string = path.basename(currentFilePath);

const outputPrefix = "contexto_parte_";
const MAX_CHARS_PER_PART = 100_000;
const BLOCK_SEPARATOR = "\n\n";

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
  "contexto_completo.txt",
  "juntar-codigo.ts",
  "juntar-codigo.mts",
  currentScriptName,
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

interface CollectedFile {
  fullPath: string;
  relativePath: string;
  extension: string;
}

function toPosixPath(filePath: string): string {
  return filePath.replace(/\\/g, "/");
}

function findAndCollectFiles(
  dir: string,
  collectedFiles: CollectedFile[],
  collectedIcons: string[]
): void {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isSymbolicLink()) continue;

    const fullPath = path.join(dir, entry.name);
    const relativePath = toPosixPath(path.relative(rootDir, fullPath));

    if (entry.isDirectory()) {
      if (!ignoredFolders.has(entry.name)) {
        findAndCollectFiles(fullPath, collectedFiles, collectedIcons);
      }
      continue;
    }

    if (!entry.isFile()) continue;

    if (
      ignoredFiles.has(entry.name) ||
      (entry.name.startsWith(outputPrefix) && entry.name.endsWith(".txt"))
    ) {
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();

    // Captura apenas os caminhos dos ícones em public/icons (sem ler conteúdo)
    if (relativePath.startsWith("public/icons/")) {
      if (allowedIconExtensions.has(extension)) {
        collectedIcons.push(`/${relativePath.replace(/^public\//, "")}`);
      }
      continue;
    }

    if (allowedExtensions.has(extension)) {
      collectedFiles.push({ fullPath, relativePath, extension });
    }
  }
}

// Compacta código sem destruir a estrutura de arquivos Markdown
function minifyCode(rawContent: string, extension: string): string {
  const normalized = rawContent.replace(/\r\n/g, "\n");

  if (extension === ".md") {
    return normalized.replace(/\n{3,}/g, "\n\n").trim();
  }

  return normalized
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");
}

// Monta o bloco do arquivo e o divide em subpartes se ultrapassar MAX_CHARS_PER_PART
function buildFileBlocks(
  relativePath: string,
  content: string,
  maxChars: number
): string[] {
  const createHeader = (partLabel = ""): string =>
    `// ==========================================\n` +
    `// Arquivo: ${relativePath}${partLabel}\n` +
    `// ==========================================\n`;

  const singleBlock = `${createHeader()}${content}`;
  if (singleBlock.length <= maxChars) {
    return [singleBlock];
  }

  const safeLimit = Math.max(1_000, maxChars - 300);
  const lines = content.split("\n");
  const chunks: string[] = [];
  let currentLines: string[] = [];
  let currentLength = 0;

  for (const line of lines) {
    // Quebra linhas únicas gigantes (ex.: SVG ou JSON minificado em 1 linha)
    if (line.length > safeLimit) {
      if (currentLines.length > 0) {
        chunks.push(currentLines.join("\n"));
        currentLines = [];
        currentLength = 0;
      }
      for (let i = 0; i < line.length; i += safeLimit) {
        chunks.push(line.slice(i, i + safeLimit));
      }
      continue;
    }

    const addedLength = line.length + (currentLines.length > 0 ? 1 : 0);
    if (currentLines.length > 0 && currentLength + addedLength > safeLimit) {
      chunks.push(currentLines.join("\n"));
      currentLines = [line];
      currentLength = line.length;
    } else {
      currentLines.push(line);
      currentLength += addedLength;
    }
  }

  if (currentLines.length > 0) {
    chunks.push(currentLines.join("\n"));
  }

  return chunks.map(
    (chunk, index) =>
      `${createHeader(` (parte ${index + 1}/${chunks.length})`)}${chunk}`
  );
}

function cleanPreviousOutputs(): void {
  for (const file of fs.readdirSync(rootDir)) {
    if (file.startsWith(outputPrefix) && file.endsWith(".txt")) {
      fs.unlinkSync(path.join(rootDir, file));
    }
  }
}

export function juntarCodigo(): void {
  const collectedFiles: CollectedFile[] = [];
  const collectedIcons: string[] = [];

  // 1. Remove arquivos de contexto gerados anteriormente
  cleanPreviousOutputs();

  // 2. Coleta e ordena os arquivos relevantes do projeto pelo caminho relativo
  findAndCollectFiles(rootDir, collectedFiles, collectedIcons);
  collectedFiles.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
  collectedIcons.sort((a, b) => a.localeCompare(b));

  // 3. Agrupa em partes respeitando o limite de caracteres
  const parts: string[] = [];
  let currentBuffer = "";

  const appendBlock = (block: string): void => {
    if (currentBuffer.length === 0) {
      currentBuffer = block;
      return;
    }

    if (
      currentBuffer.length + BLOCK_SEPARATOR.length + block.length <=
      MAX_CHARS_PER_PART
    ) {
      currentBuffer += BLOCK_SEPARATOR + block;
    } else {
      parts.push(currentBuffer);
      currentBuffer = block;
    }
  };

  if (collectedIcons.length > 0) {
    const iconsHeader =
      `// ==========================================\n` +
      `// Ícones disponíveis em /public/icons (${collectedIcons.length})\n` +
      `// ==========================================\n`;

    const iconsBlocks = buildFileBlocks(
      "public/icons (índice)",
      collectedIcons.join("\n"),
      MAX_CHARS_PER_PART
    );

    if (iconsBlocks.length === 1) {
      appendBlock(`${iconsHeader}${collectedIcons.join("\n")}`);
    } else {
      for (const block of iconsBlocks) {
        appendBlock(block);
      }
    }
  }

  for (const file of collectedFiles) {
    let rawContent: string;
    try {
      rawContent = fs.readFileSync(file.fullPath, "utf8");
    } catch (error) {
      console.warn(`Aviso: não foi possível ler ${file.relativePath}:`, error);
      continue;
    }

    const minifiedContent = minifyCode(rawContent, file.extension);
    const fileBlocks = buildFileBlocks(
      file.relativePath,
      minifiedContent,
      MAX_CHARS_PER_PART
    );

    for (const block of fileBlocks) {
      appendBlock(block);
    }
  }

  if (currentBuffer.length > 0) {
    parts.push(currentBuffer);
  }

  // 4. Salva cada parte em disco
  console.log("Código reunido com sucesso!");
  console.log(`Total de arquivos de código: ${collectedFiles.length}`);
  console.log(`Total de ícones mapeados: ${collectedIcons.length}`);
  console.log(`Arquivos gerados (${parts.length} parte(s)):\n`);

  parts.forEach((partContent, index) => {
    const partFileName = `${outputPrefix}${index + 1}.txt`;
    const partPath = path.join(rootDir, partFileName);
    fs.writeFileSync(partPath, partContent, "utf8");
    console.log(
      `- ${partFileName} (${partContent.length.toLocaleString("pt-BR")} caracteres)`
    );
  });
}

juntarCodigo();