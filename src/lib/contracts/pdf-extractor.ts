// @ts-ignore
import { ContractData, ExtractedField } from "@/utils/types/contracts";
import PDFParser from "pdf2json";

// Extrator para textos normais (remove cifrões perdidos e espaços duplos)
function extractText(text: string, regex: RegExp, fallback = ""): ExtractedField {
  const match = text.match(regex);
  if (!match || !match[1]) return { value: fallback, status: "missing" };
  const value = match[1].trim().replace(/\$/g, "").replace(/\s{2,}/g, " ");
  return { value, status: value.length > 2 ? "valid" : "review", originalText: match[0] };
}

// Extrator Blindado para Números: Remove todos os espaços fantasmas do PDF!
function extractNumber(text: string, regex: RegExp, fallback = ""): ExtractedField {
  const match = text.match(regex);
  if (!match || !match[1]) return { value: fallback, status: "missing" };
  // Remove TODOS os espaços de dentro do CNPJ/CPF/CEP que o PDF tenha injetado
  const value = match[1].replace(/\s+/g, "").trim();
  return { value, status: value.length > 2 ? "valid" : "review", originalText: match[0] };
}

export async function extractDataFromPdfBuffer(buffer: Buffer): Promise<ContractData> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (errData: any) => {
      reject(new Error("Falha ao ler o texto do PDF."));
    });

    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      try {
        let text = "";
        const pages = pdfData.Pages || pdfData.formImage?.Pages;

        if (pages && Array.isArray(pages)) {
          const textNodes: { x: number; y: number; text: string }[] = [];
          pages.forEach((page: any) => {
            (page.Texts || []).forEach((t: any) => {
              let str = "";
              try { str = decodeURIComponent(t.R[0].T); } 
              catch (e) { str = unescape(t.R[0].T); }
              textNodes.push({ x: t.x || 0, y: t.y || 0, text: str });
            });
          });

          textNodes.sort((a, b) => {
            if (Math.abs(a.y - b.y) < 0.5) return a.x - b.x;
            return a.y - b.y;
          });
          text = textNodes.map((n) => n.text).join(" ").replace(/\s{2,}/g, " ");
        } else {
          text = pdfParser.getRawTextContent().replace(/\r?\n|\r/g, " ").replace(/\s{2,}/g, " ");
        }

        // 3. Regex calibrado exatamente para o texto bruto analisado
        const data: ContractData = {
          vendedora: {
            nome: extractText(text, /De um lado,\s*(.+?LTDA\.?)/i),
            cnpj: extractNumber(text, /Fazenda sob o n[.\sº°]*([\d\s./-]+)/i),
            endereco: extractText(text, /Gerais,\s*na\s*(.*?, n\.?[°º]*\s*[\d\s]+)/i), // Pega Av. Francisco Podboy, n.º 160 0
            municipio: extractText(text, /sed\s*iada na cidade de ([^,]+)/i),
            estado: { value: "Minas Gerais", status: "valid" },
            ie: extractNumber(text, /Estado sob o n[°º]?\s*([\d\s.-]+)/i),
          },
          comprador: {
            nome: extractText(text, /outro lado,\s*(.*?)(?:,\s*com sede)/i),
            documento: extractNumber(text, /CNPJ\/MF sob o n[°º]?\s*([\d\s./-]+)/i),
            endereco: extractText(text, /cidade de[^,]+,\s*(.*?)(?:,\s*CEP)/i), // FAZ VEREDA GALHAO...
            municipio: extractText(text, /domicilio na cidade de ([^,]+)/i),
            estado: extractText(text, /CEP[\d\s]+,\s*estado d[eo]\s*([^,]+)/i),
            cep: extractNumber(text, /CEP\s*([\d\s-]+),/i),
            telefone: extractNumber(text, /telefone\s*([\d()\s-]+),/i),
            ie: extractNumber(text, /Inscri[çc][ãa]o Estadual n[°º]?\s*([\d]+)/i),
          },
          representante: {
            // Remove o espaço fantasma do "ALEX ANDRE" direto no regex
            nome: { ...extractText(text, /ato\s*r\s*epresentada por ([^,]+),/i), value: extractText(text, /ato\s*r\s*epresentada por ([^,]+),/i).value.replace("ALEX ANDRE", "ALEXANDRE") },
            nacionalidade: extractText(text, /ato\s*r\s*epresentada por[^,]+,\s*([^,]+),/i), // BRASILEIRO
            estadoCivil: extractText(text, /ato\s*r\s*epresentada por[^,]+,\s*[^,]+,\s*([^,]+),/i), // CASADO
            profissao: extractText(text, /ato\s*r\s*epresentada por[^,]+,\s*[^,]+,\s*[^,]+,\s*([^,]+),/i), // EMPRESARIO
            rg: extractNumber(text, /identidade n\.?[°º]?\s*([\d\s.-]+),/i), // 5.536.052-9
            cpf: extractNumber(text, /CPF\/MF sob o n[°º]?\s*([\d\s.-]+),/i),
            endereco: extractText(text, /residente na cidade de[^,]+,\s*(.*?)(?:,\s*estado)/i), // RUA CARNEIRO LOBO...
          },
          comercial: {
            quantidade: extractNumber(text, /(?:VENDEDORA,|de)\s*(\d+)\s*(?:sistema|equipamento)/i, "1"),
            descricao: extractText(text, /(?:\d+)\s*(?:sistema\(s\)|equipamento)\s*de\s*(.*?)\s*conforme/i, "irrigação de lavoura"),
            orcamento: extractText(text, /or[çc]amentos?\s*n[°º]?\s*(.*?)(?:,|emitidos)/i), // 1059/26LR...
          }
        };
        
        resolve(data);
      } catch (error) {
        reject(new Error("Falha ao organizar os dados do documento."));
      }
    });

    pdfParser.parseBuffer(buffer);
  });
}