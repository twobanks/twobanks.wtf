import Link from 'next/link';
import { AlertTriangle, FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/patterns';

export default function BlogPostNotFound() {
  return (
    <div className="min-h-[400px] w-full flex flex-col items-center justify-center">
      <EmptyState
        icon={FileText}
        title="Artigo não encontrado"
        description="O post solicitado não existe ou não pertence à sua conta."
        action={
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <Link href="/admin/blog" className="w-auto">
              <Button variant="outline">
                <ArrowLeft className="size-4 mr-2" />
                Voltar aos artigos
              </Button>
            </Link>
          </div>
        }
      />
    </div>
  );
}
