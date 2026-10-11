import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import { NextResponse } from "next/server";
import { templateCompraVenda } from "../../../../../public/templates/compra-venda";

function replaceTags(text: string, data: Record<string, string>) {
  let result = text;
  Object.keys(data).forEach((key) => {
    result = result.replace(new RegExp(`{${key}}`, "g"), data[key] || "___________");
  });
  return result;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const template = templateCompraVenda;
    
    const docChildren: Paragraph[] = [
      new Paragraph({
        text: template.titulo,
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      })
    ];

    template.secoes.forEach(secao => {
      const conteudoFinal = replaceTags(secao.conteudo, body);

      if (secao.tipo === "clausula") {
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: `Cláusula ${secao.numero} - ${secao.titulo}`, bold: true })
            ],
            spacing: { before: 400, after: 200 },
          })
        );
      }

      docChildren.push(
        new Paragraph({
          text: conteudoFinal,
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200, line: 360 }, // Espaçamento 1.5
        })
      );
    });

    const doc = new Document({
      sections: [{ children: docChildren }]
    });

    const buffer = await Packer.toBuffer(doc);
    const uint8Array = new Uint8Array(buffer);

    // SOLUÇÃO: Converte o Node Buffer para um Web Blob, que o TypeScript e o Next.js aceitam perfeitamente
    const blob = new Blob([uint8Array], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="Contrato_${body.COMPRADOR_NOME?.replace(/\s+/g, '_') || 'Gerado'}.docx"`,
      },
    });
  } catch (error) {
    return new NextResponse("Erro interno ao gerar documento.", { status: 500 });
  }
}