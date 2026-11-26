import Link from 'next/link';
import { CreditCard, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/patterns';

export default function CartaoNotFound() {
  return (
    <div className="min-h-[400px] w-full flex flex-col items-center justify-center">
      <EmptyState
        icon={CreditCard}
        title="Cartão não encontrado"
        description="O cartão solicitado não existe."
        action={
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <Link href="/admin/carteira" className="w-auto">
              <Button variant="outline">
                <ArrowLeft className="size-4 mr-2" />
                Voltar à carteira
              </Button>
            </Link>
          </div>
        }
      />
    </div>
  );
}
