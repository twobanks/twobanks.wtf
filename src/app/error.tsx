'use client';

import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/patterns';

export default function RootError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[RootError]', error);
  }, [error]);

  return (
    <EmptyState
      icon={AlertCircle}
      title="Ops, algo deu errado"
      description="Não foi possível carregar esta página. Tente novamente ou volte para o início."
      action={
        <div className="flex flex-col sm:flex-row gap-3 items-center w-full max-w-xs">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto"
          >
            <RefreshCw className="size-4 mr-2" />
            Tentar novamente
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              <Home className="size-4 mr-2" />
              Início
            </Button>
          </Link>
        </div>
      }
      className="min-h-[340px] flex flex-col items-center justify-center w-full"
    />
  );
}