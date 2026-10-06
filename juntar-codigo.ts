const fs = require('fs');
const path = require('path');

const outputFileName = 'contexto_completo.txt';
// Agora podemos escanear a raiz inteira de forma segura
const directoriesToScan = ['./']; 
// Pastas que serão ignoradas
const ignoredFolders = ['node_modules', '.next', '.github', '.git']; 

// Remove o arquivo anterior se existir
if (fs.existsSync(outputFileName)) {
  fs.unlinkSync(outputFileName);
}

function findAndAppendFiles(dir: any) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);

  for (const file of files) {
    // Se a pasta ou arquivo atual estiver na lista de ignorados, pula para o próximo
    if (ignoredFolders.includes(file)) {
      continue;
    }

    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      findAndAppendFiles(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const header = `\n\n// ==========================================\n// Arquivo: ${fullPath}\n// ==========================================\n\n`;
      fs.appendFileSync(outputFileName, header + content);
    }
  }
}

directoriesToScan.forEach(dir => findAndAppendFiles(dir));
console.log(`Pronto! Código reunido em ${outputFileName}`);