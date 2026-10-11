// src/actions/contracts.ts
"use server";

import { auth } from "@/auth";
import { extractDataFromPdfBuffer } from "@/lib/contracts/pdf-extractor";
import { ContractData } from "@/utils/types/contracts";

export async function parsePdfAction(formData: FormData): Promise<{ success: boolean; data?: ContractData; error?: string }> {
  const session = await auth();
  if (!session?.user) return { success: false, error: "Não autorizado" };

  const file = formData.get("file") as File;
  if (!file || file.type !== "application/pdf") {
    return { success: false, error: "Arquivo PDF inválido." };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const data = await extractDataFromPdfBuffer(buffer);
    
    return { success: true, data };
  } catch (error) {
    // ESTA LINHA VAI NOS MOSTRAR O VERDADEIRO PROBLEMA NO TERMINAL
    console.error("ERRO REAL NO PDF-PARSE:", error); 
    
    return { success: false, error: "Falha ao extrair dados do documento." };
  }
}