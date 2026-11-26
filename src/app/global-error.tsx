'use client';

import { AlertCircle, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/patterns';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error('[GlobalError]', error);

  return (
    <html>
      <body>
        <EmptyState
          icon={AlertCircle}
          title="Erro inesperado"
          description="Ocorreu um erro inesperado. Tente recarregar a página."
          action={
            <div className="flex flex-col sm:flex-row gap-3 items-center w-full max-w-xs">
              <Button
                onClick={() => reset()}
                className="w-full sm:w-auto"
              >
                Recarregar
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
      </body>
    </html>
  );
}