import Link from 'next/link';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/patterns';

export default function AdminNotFound() {
  return (
    <div className="min-h-[400px] w-full flex flex-col items-center justify-center">
      <EmptyState
        icon={AlertTriangle}
        title="Página não encontrada"
        description="O endereço acessado não existe ou foi removido."
        action={
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <Link href="/admin" className="w-auto">
              <Button variant="outline">
                <Home className="size-4 mr-2" />
                Voltar ao painel
              </Button>
            </Link>
          </div>
        }
      />
    </div>
  );
}
