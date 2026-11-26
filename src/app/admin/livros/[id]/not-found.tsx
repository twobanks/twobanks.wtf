import Link from 'next/link';
import { AlertTriangle, Book, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/patterns';

export default function LivroNotFound() {
  return (
    <div className="min-h-[400px] w-full flex flex-col items-center justify-center">
      <EmptyState
        icon={Book}
        title="Livro não encontrado"
        description="O livro solicitado não existe ou não pertence à sua conta."
        action={
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <Link href="/admin/livros" className="w-auto">
              <Button variant="outline">
                <ArrowLeft className="size-4 mr-2" />
                Voltar aos livros
              </Button>
            </Link>
          </div>
        }
      />
    </div>
  );
}
