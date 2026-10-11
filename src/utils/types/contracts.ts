export type FieldStatus = "valid" | "review" | "missing";

export interface ExtractedField {
  value: string;
  status: FieldStatus;
  originalText?: string;
}

export interface ContractData {
  vendedora: {
    nome: ExtractedField;
    cnpj: ExtractedField;
    endereco: ExtractedField;
    municipio: ExtractedField;
    estado: ExtractedField;
    ie: ExtractedField;
  };
  comprador: {
    nome: ExtractedField;
    documento: ExtractedField; // CNPJ ou CPF
    endereco: ExtractedField;
    municipio: ExtractedField;
    estado: ExtractedField;
    cep: ExtractedField;
    telefone: ExtractedField;
    ie: ExtractedField;
  };
  representante: {
    nome: ExtractedField;
    nacionalidade: ExtractedField;
    estadoCivil: ExtractedField;
    profissao: ExtractedField;
    rg: ExtractedField;
    cpf: ExtractedField;
    endereco: ExtractedField;
  };
  comercial: {
    quantidade: ExtractedField;
    descricao: ExtractedField;
    orcamento: ExtractedField;
  };
}

export type SectionType = "paragrafo" | "clausula";

export interface TemplateSection {
  tipo: SectionType;
  numero?: string;
  titulo?: string;
  conteudo: string;
}

export interface ContractTemplate {
  id: string;
  titulo: string;
  secoes: TemplateSection[];
}