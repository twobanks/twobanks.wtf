'use client';

import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/patterns';

export default function AdminError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[AdminError]', error);
  }, [error]);

  return (
    <div className="min-h-[400px] w-full flex flex-col items-center justify-center">
      <EmptyState
        icon={AlertCircle}
        title="Ops, algo deu errado"
        description="Não foi possível carregar esta página administrativa. Tente novamente."
        action={
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <Button onClick={() => reset()}>
              <RefreshCw className="size-4 mr-2" />
              Tentar novamente
            </Button>
            <Link href="/admin" className="w-auto">
              <Button variant="outline">
                <Home className="size-4 mr-2" />
                Painel
              </Button>
            </Link>
          </div>
        }
      />
    </div>
  );
}
