"use client";

import { parsePdfAction } from "@/actions/contracts";
import { FloatingAlert } from "@/components/ui/floating-alert";
import { ContractData, ExtractedField } from "@/utils/types/contracts";
import { AlertCircle, FileText, Loader2, UploadCloud } from "lucide-react";
import { useState } from "react";
import { templateCompraVenda } from "../../../public/templates/compra-venda";

export function ContractWizard() {
  const [step, setStep] = useState<1 | 2>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [contractData, setContractData] = useState<ContractData | null>(null);
  const [formDataState, setFormDataState] = useState<Record<string, string>>({});
  const [alert, setAlert] = useState<{type: "error"|"success", message: string} | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsProcessing(true);
    const formData = new FormData();
    formData.append("file", file);

    const result = await parsePdfAction(formData);
    setIsProcessing(false);

    if (result.success && result.data) {
      setContractData(result.data);
      const initialFlatState: Record<string, string> = {
        // Vendedora
        VENDEDORA_NOME: result.data.vendedora.nome.value,
        VENDEDORA_CNPJ: result.data.vendedora.cnpj.value,
        VENDEDORA_MUNICIPIO: result.data.vendedora.municipio.value,
        VENDEDORA_ESTADO: result.data.vendedora.estado.value,
        VENDEDORA_ENDERECO: result.data.vendedora.endereco.value,
        VENDEDORA_IE: result.data.vendedora.ie.value,
        // Comprador
        COMPRADOR_NOME: result.data.comprador.nome.value,
        COMPRADOR_DOC: result.data.comprador.documento.value,
        COMPRADOR_MUNICIPIO: result.data.comprador.municipio.value,
        COMPRADOR_ENDERECO: result.data.comprador.endereco.value,
        COMPRADOR_CEP: result.data.comprador.cep.value,
        COMPRADOR_ESTADO: result.data.comprador.estado.value,
        COMPRADOR_TELEFONE: result.data.comprador.telefone.value,
        COMPRADOR_IE: result.data.comprador.ie.value,
        // Representante
        REP_NOME: result.data.representante.nome.value,
        REP_NACIONALIDADE: result.data.representante.nacionalidade.value,
        REP_ESTADOCIVIL: result.data.representante.estadoCivil.value,
        REP_PROFISSAO: result.data.representante.profissao.value,
        REP_RG: result.data.representante.rg.value,
        REP_CPF: result.data.representante.cpf.value,
        REP_ENDERECO: result.data.representante.endereco.value,
        // Comercial
        COMERCIAL_QTD: result.data.comercial.quantidade.value,
        COMERCIAL_DESC: result.data.comercial.descricao.value,
        COMERCIAL_ORCAMENTO: result.data.comercial.orcamento.value,
      };
      setFormDataState(initialFlatState);
      setStep(2);
    } else {
      setAlert({ type: "error", message: result.error || "Erro ao processar PDF." });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGenerate = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/contratos/gerar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataState),
      });

      if (!response.ok) throw new Error("Falha ao gerar DOCX");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Contrato_${formDataState.COMPRADOR_NOME || 'Gerado'}.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      setAlert({ type: "success", message: "Download concluído com sucesso!" });
    } catch (err) {
      setAlert({ type: "error", message: "Erro ao gerar o documento." });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        {step === 1 && (
          <div className="border-2 border-dashed border-border rounded-xl p-12 flex flex-col items-center justify-center text-center">
            {isProcessing ? <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" /> : <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />}
            <h3 className="text-lg font-semibold mb-2">Envie o Contrato Base (PDF)</h3>
            <label className="bg-primary text-primary-foreground px-4 py-2 rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
              Selecionar Arquivo PDF
              <input type="file" accept="application/pdf" className="hidden" onChange={handleUpload} disabled={isProcessing} />
            </label>
          </div>
        )}

        {step === 2 && contractData && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* COLUNA ESQUERDA: Formulário */}
            <div className="space-y-6">
              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg flex gap-3 text-amber-500 text-sm">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p>Revise os campos extraídos. Alterações feitas aqui refletem em tempo real no contrato ao lado.</p>
              </div>

              {/* DADOS DA VENDEDORA */}
              <div className="space-y-4">
                <h3 className="font-semibold border-b pb-2">Dados da Vendedora</h3>
                <FieldInput label="Nome Vendedora" name="VENDEDORA_NOME" field={contractData.vendedora.nome} value={formDataState.VENDEDORA_NOME} onChange={handleInputChange} />
                
                <div className="grid grid-cols-2 gap-4">
                  <FieldInput label="CNPJ Vendedora" name="VENDEDORA_CNPJ" field={contractData.vendedora.cnpj} value={formDataState.VENDEDORA_CNPJ} onChange={handleInputChange} />
                  <FieldInput label="Inscrição Estadual" name="VENDEDORA_IE" field={contractData.vendedora.ie} value={formDataState.VENDEDORA_IE} onChange={handleInputChange} />
                </div>

                <FieldInput label="Endereço (Logradouro)" name="VENDEDORA_ENDERECO" field={contractData.vendedora.endereco} value={formDataState.VENDEDORA_ENDERECO} onChange={handleInputChange} />
                
                <div className="grid grid-cols-2 gap-4">
                  <FieldInput label="Município" name="VENDEDORA_MUNICIPIO" field={contractData.vendedora.municipio} value={formDataState.VENDEDORA_MUNICIPIO} onChange={handleInputChange} />
                  <FieldInput label="Estado" name="VENDEDORA_ESTADO" field={contractData.vendedora.estado} value={formDataState.VENDEDORA_ESTADO} onChange={handleInputChange} />
                </div>
              </div>

              {/* DADOS DO COMPRADOR */}
              <div className="space-y-4">
                <h3 className="font-semibold border-b pb-2">Dados do Comprador</h3>
                <FieldInput label="Nome Comprador" name="COMPRADOR_NOME" field={contractData.comprador.nome} value={formDataState.COMPRADOR_NOME} onChange={handleInputChange} />
                
                <div className="grid grid-cols-2 gap-4">
                  <FieldInput label="CNPJ/CPF Comprador" name="COMPRADOR_DOC" field={contractData.comprador.documento} value={formDataState.COMPRADOR_DOC} onChange={handleInputChange} />
                  <FieldInput label="Inscrição Estadual" name="COMPRADOR_IE" field={contractData.comprador.ie} value={formDataState.COMPRADOR_IE} onChange={handleInputChange} />
                </div>

                <FieldInput label="Sede / Endereço" name="COMPRADOR_ENDERECO" field={contractData.comprador.endereco} value={formDataState.COMPRADOR_ENDERECO} onChange={handleInputChange} />
                
                <div className="grid grid-cols-2 gap-4">
                  <FieldInput label="Município" name="COMPRADOR_MUNICIPIO" field={contractData.comprador.municipio} value={formDataState.COMPRADOR_MUNICIPIO} onChange={handleInputChange} />
                  <FieldInput label="Estado" name="COMPRADOR_ESTADO" field={contractData.comprador.estado} value={formDataState.COMPRADOR_ESTADO} onChange={handleInputChange} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FieldInput label="CEP" name="COMPRADOR_CEP" field={contractData.comprador.cep} value={formDataState.COMPRADOR_CEP} onChange={handleInputChange} />
                  <FieldInput label="Telefone" name="COMPRADOR_TELEFONE" field={contractData.comprador.telefone} value={formDataState.COMPRADOR_TELEFONE} onChange={handleInputChange} />
                </div>
              </div>

              {/* DADOS DO REPRESENTANTE */}
              <div className="space-y-4">
                <h3 className="font-semibold border-b pb-2">Dados do Representante</h3>
                <FieldInput label="Nome Representante" name="REP_NOME" field={contractData.representante.nome} value={formDataState.REP_NOME} onChange={handleInputChange} />
                
                <div className="grid grid-cols-2 gap-4">
                  <FieldInput label="Nacionalidade" name="REP_NACIONALIDADE" field={contractData.representante.nacionalidade} value={formDataState.REP_NACIONALIDADE} onChange={handleInputChange} />
                  <FieldInput label="Estado Civil" name="REP_ESTADOCIVIL" field={contractData.representante.estadoCivil} value={formDataState.REP_ESTADOCIVIL} onChange={handleInputChange} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FieldInput label="Profissão" name="REP_PROFISSAO" field={contractData.representante.profissao} value={formDataState.REP_PROFISSAO} onChange={handleInputChange} />
                  <FieldInput label="RG" name="REP_RG" field={contractData.representante.rg} value={formDataState.REP_RG} onChange={handleInputChange} />
                </div>

                <FieldInput label="CPF Representante" name="REP_CPF" field={contractData.representante.cpf} value={formDataState.REP_CPF} onChange={handleInputChange} />
                <FieldInput label="Endereço Residencial" name="REP_ENDERECO" field={contractData.representante.endereco} value={formDataState.REP_ENDERECO} onChange={handleInputChange} />
              </div>

              {/* DADOS COMERCIAIS */}
              <div className="space-y-4">
                <h3 className="font-semibold border-b pb-2">Dados Comerciais</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FieldInput label="Qtd. Equipamentos" name="COMERCIAL_QTD" field={contractData.comercial.quantidade} value={formDataState.COMERCIAL_QTD} onChange={handleInputChange} />
                  <FieldInput label="Nº do Orçamento" name="COMERCIAL_ORCAMENTO" field={contractData.comercial.orcamento} value={formDataState.COMERCIAL_ORCAMENTO} onChange={handleInputChange} />
                </div>
                <FieldInput label="Descrição do Objeto" name="COMERCIAL_DESC" field={contractData.comercial.descricao} value={formDataState.COMERCIAL_DESC} onChange={handleInputChange} />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button type="button" onClick={() => setStep(1)} className="px-4 py-2 bg-zinc-800 text-zinc-200 rounded-lg">Voltar</button>
                <button type="button" onClick={handleGenerate} disabled={isProcessing} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 w-full justify-center">
                  {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                  Baixar Contrato Oficial DOCX
                </button>
              </div>
            </div>

            {/* COLUNA DIREITA: Preview em tempo real */}
            <div className="bg-zinc-50 dark:bg-zinc-950 border rounded-xl p-6 h-[800px] overflow-y-auto font-serif shadow-inner">
              <h2 className="text-xl font-bold text-center mb-8 uppercase text-zinc-800 dark:text-zinc-200">
                {templateCompraVenda.titulo}
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 text-justify">
                {templateCompraVenda.secoes.map((secao, i) => {
                  let texto = secao.conteudo;
                  Object.keys(formDataState).forEach(key => {
                    texto = texto.replace(new RegExp(`{${key}}`, "g"), formDataState[key] || "___________");
                  });

                  if (secao.tipo === "clausula") {
                    return (
                      <div key={i} className="pt-4">
                        <strong className="block mb-2 text-zinc-900 dark:text-zinc-100">Cláusula {secao.numero} - {secao.titulo}</strong>
                        <p>{texto}</p>
                      </div>
                    );
                  }
                  return <p key={i}>{texto}</p>;
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {alert && <FloatingAlert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
    </div>
  );
}

function FieldInput({ label, name, field, value, onChange }: { label: string, name: string, field: ExtractedField, value: string, onChange: any }) {
  const statusColors = {
    valid: "border-zinc-800 focus:border-brand-blue",
    review: "border-amber-500/50 focus:border-amber-500 bg-amber-500/5",
    missing: "border-red-500/50 focus:border-red-500 bg-red-500/5"
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{label}</label>
        {field.status === "review" && <span className="text-[10px] text-amber-500 font-bold uppercase">Conferir</span>}
        {field.status === "missing" && <span className="text-[10px] text-red-500 font-bold uppercase">Faltante</span>}
      </div>
      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        className={`w-full h-10 px-3 rounded-md bg-zinc-900/50 text-sm text-zinc-100 transition-colors border focus:outline-none focus:ring-1 ${statusColors[field.status]}`}
      />
    </div>
  );
}