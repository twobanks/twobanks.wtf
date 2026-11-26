import Link from 'next/link';
import { Map, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/patterns';

export default function DiaViagemNotFound() {
  return (
    <EmptyState
      icon={Map}
      title="Etapa da viagem não encontrada"
      description="O dia da viagem solicitado não existe."
      action={
        <div className="flex flex-col sm:flex-row gap-3 items-center w-full max-w-xs">
          <Link href="/viagens" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="size-4 mr-2" />
              Todas as viagens
            </Button>
          </Link>
        </div>
      }
      className="min-h-[340px] flex flex-col items-center justify-center w-full"
    />
  );
}
