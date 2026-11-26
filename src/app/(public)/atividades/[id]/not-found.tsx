import Link from 'next/link';
import { Activity, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/patterns';

export default function AtividadeNotFound() {
  return (
    <EmptyState
      icon={Activity}
      title="Atividade não encontrada"
      description="A atividade solicitada não existe."
      action={
        <div className="flex flex-col sm:flex-row gap-3 items-center w-full max-w-xs">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="size-4 mr-2" />
              Início
            </Button>
          </Link>
        </div>
      }
      className="min-h-[340px] flex flex-col items-center justify-center w-full"
    />
  );
}
