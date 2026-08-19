"use client"

import { deleteTransaction } from "@/actions/wallet"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface TableActionsProps {
  id: number
  editHref?: string
  onEdit?: () => void
  onDelete?: (id: number) => Promise<void>
}

export function TableActions({ id, editHref, onEdit, onDelete }: TableActionsProps) {
  const router = useRouter()

  async function handleDelete() {
    if (confirm("Tem certeza que deseja excluir este registro?")) {
      if (onDelete) {
        await onDelete(id)
      } else {
        const formData = new FormData()
        formData.set("id", String(id))
        await deleteTransaction(formData)
      }
      router.refresh()
    }
  }

  function handleEdit() {
    if (editHref) {
      router.push(editHref)
    } else if (onEdit) {
      onEdit()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <MoreHorizontalIcon />
            <span className="sr-only">Abrir menu</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem onClick={handleEdit}>Editar</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleDelete}>
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}