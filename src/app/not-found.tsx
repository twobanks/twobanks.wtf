import Link from 'next/link';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/patterns';

export default function RootNotFound() {
  return (
    <EmptyState
      icon={AlertTriangle}
      title="Página não encontrada"
      description="O endereço acessado não existe ou foi removido."
      action={
        <div className="flex flex-col sm:flex-row gap-3 items-center w-full max-w-xs">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              <Home className="size-4 mr-2" />
              Voltar ao início
            </Button>
          </Link>
        </div>
      }
      className="min-h-[340px] flex flex-col items-center justify-center w-full"
    />
  );
}