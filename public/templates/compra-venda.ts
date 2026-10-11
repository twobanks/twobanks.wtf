import { ContractTemplate } from "@/utils/types/contracts";

export const templateCompraVenda: ContractTemplate = {
  id: "compra_venda_reserva_dominio",
  titulo: "CONTRATO DE COMPRA E VENDA COM RESERVA DE DOMÍNIO",
  secoes: [
    {
      tipo: "paragrafo",
      conteudo: "Pelo presente instrumento particular de Compra e Venda com Reserva de Domínio, as partes a seguir qualificadas, na melhor forma de direito, assim se contratam."
    },
    {
      tipo: "paragrafo",
      conteudo: "De um lado, {VENDEDORA_NOME}, sediada na cidade de {VENDEDORA_MUNICIPIO}, no Estado de {VENDEDORA_ESTADO}, na {VENDEDORA_ENDERECO}, inscrita no Cadastro Nacional de Pessoas Jurídicas do Ministério da Fazenda sob o n.º {VENDEDORA_CNPJ} e com inscrição no Estado sob o nº {VENDEDORA_IE}, doravante denominada simplesmente VENDEDORA."
    },
    {
      tipo: "paragrafo",
      conteudo: "De outro lado, {COMPRADOR_NOME}, com sede na cidade de {COMPRADOR_MUNICIPIO}, {COMPRADOR_ENDERECO}, CEP {COMPRADOR_CEP}, estado de {COMPRADOR_ESTADO}, telefone {COMPRADOR_TELEFONE}, inscrito no CNPJ/MF sob o n.º {COMPRADOR_DOC}, Inscrição Estadual nº {COMPRADOR_IE}, neste ato representado por {REP_NOME}, {REP_NACIONALIDADE}, {REP_ESTADOCIVIL}, {REP_PROFISSAO}, residente e domiciliado na {REP_ENDERECO}, portador da cédula de identidade n.º {REP_RG} e do CPF n.º {REP_CPF}, denominado simplesmente COMPRADOR."
    },
    {
      tipo: "clausula",
      numero: "1",
      titulo: "DO OBJETO",
      conteudo: "O presente contrato tem por objeto a venda de {COMERCIAL_QTD} sistema(s) de {COMERCIAL_DESC}, conforme orçamentos nº {COMERCIAL_ORCAMENTO}, emitidos pela VENDEDORA, conforme condições a seguir estabelecidas."
    },
    {
      tipo: "clausula",
      numero: "2",
      titulo: "DO PREÇO E CONDIÇÕES DE PAGAMENTO",
      conteudo: "O valor total da presente operação e as condições de pagamento estão dispostos no orçamento aprovado pelas partes."
    }
  ]
};