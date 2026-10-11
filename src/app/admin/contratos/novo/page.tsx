import { auth } from "@/auth";
import { ContractWizard } from "@/components/Contracts/ContractWizard";
import { redirect } from "next/navigation";

export const metadata = { title: "Novo Contrato" };

export default async function NovoContratoPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  return (
    <div className="flex flex-col gap-6 max-w-full mx-auto w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Gerador de Contratos</h1>
        <p className="text-sm text-muted-foreground">
          Envie o PDF de origem, revise os dados extraídos e gere o DOCX final com visualização em tempo real.
        </p>
      </div>
      <ContractWizard />
    </div>
  );
}