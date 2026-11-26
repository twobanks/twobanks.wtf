"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { kanbanTasks } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// 1. Validação com Zod
const kanbanSchema = z.object({
  title: z.string().min(2, "O título deve ter no mínimo 2 caracteres").max(255),
  description: z.string().optional().nullable(),
  status: z.enum(["to_do", "in_progress", "pending", "canceled", "done"]).default("to_do"),
  urgency: z.enum(["low", "medium", "high"]).default("medium"),
  dueDate: z.string().optional().nullable(),
  assignedToId: z.string().optional().nullable(),
})

// Caminho para revalidação de cache (ajuste se a sua rota for diferente)
const KANBAN_ROUTE = "/admin/kanban"

// ==========================================
// 1. CRIAR TAREFA (Via Formulário)
// ==========================================
export async function createKanbanTask(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Não autorizado")

    const parsedData = kanbanSchema.parse({
      title: formData.get("title"),
      description: formData.get("description"),
      status: formData.get("status") || "to_do",
      urgency: formData.get("urgency") || "medium",
      dueDate: formData.get("dueDate"),
      assignedToId: formData.get("assignedToId"),
    })

    await db.insert(kanbanTasks).values({
      ...parsedData,
      createdById: session.user.id,
    })

    revalidatePath(KANBAN_ROUTE)
  } catch (error) {
    console.error("Erro ao criar tarefa Kanban:", error);
    if (error instanceof Error && error.message === "Não autorizado") {
      throw error;
    }
    throw new Error("Não foi possível criar a tarefa.");
  }
}

// ==========================================
// 2. ATUALIZAR STATUS (Para o Drag-and-Drop)
// Recebe os parâmetros diretamente, otimizado para o @dnd-kit
// ==========================================
export async function updateKanbanTaskStatus(taskId: string, newStatus: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Não autorizado")

    // Validar se o status recebido é um dos permitidos
    const statusParser = z.enum(["to_do", "in_progress", "pending", "canceled", "done"])
    const parsedStatus = statusParser.parse(newStatus)

    // Atualização atômica direta no Neon
    await db.update(kanbanTasks)
      .set({ status: parsedStatus })
      .where(eq(kanbanTasks.id, taskId))

    revalidatePath(KANBAN_ROUTE)
  } catch (error) {
    console.error("Erro ao atualizar status da tarefa Kanban:", error);
    if (error instanceof Error && error.message === "Não autorizado") {
      throw error;
    }
    throw new Error("Não foi possível atualizar o status da tarefa.");
  }
}

// ==========================================
// 3. EDITAR TAREFA COMPLETA (Via Formulário)
// ==========================================
export async function updateKanbanTask(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Não autorizado")

    const taskId = formData.get("id") as string
    if (!taskId) throw new Error("ID da tarefa não fornecido")

    const parsedData = kanbanSchema.parse({
      title: formData.get("title"),
      description: formData.get("description"),
      status: formData.get("status"),
      urgency: formData.get("urgency"),
      dueDate: formData.get("dueDate"),
      assignedToId: formData.get("assignedToId"),
    })

    await db.update(kanbanTasks)
      .set(parsedData)
      .where(eq(kanbanTasks.id, taskId))

    revalidatePath(KANBAN_ROUTE)
  } catch (error) {
    console.error("Erro ao editar tarefa Kanban:", error);
    if (error instanceof Error && (error.message === "Não autorizado" || error.message === "ID da tarefa não fornecido")) {
      throw error;
    }
    throw new Error("Não foi possível editar a tarefa.");
  }
}

// ==========================================
// 4. CLONAR TAREFA
// Excelente para tarefas repetitivas.
// ==========================================
export async function cloneKanbanTask(taskId: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Não autorizado")

    const [taskToClone] = await db.select().from(kanbanTasks).where(eq(kanbanTasks.id, taskId))
  
    if (!taskToClone) throw new Error("Tarefa não encontrada")

    await db.insert(kanbanTasks).values({
      title: `${taskToClone.title} (Cópia)`,
      description: taskToClone.description,
      status: "to_do", // Clones sempre nascem na primeira coluna
      urgency: taskToClone.urgency,
      dueDate: taskToClone.dueDate,
      assignedToId: taskToClone.assignedToId, // Mantém o mesmo responsável
      createdById: session.user.id, // O autor passa a ser quem clonou
    })

    revalidatePath(KANBAN_ROUTE)
  } catch (error) {
    console.error("Erro ao clonar tarefa Kanban:", error);
    if (error instanceof Error && (error.message === "Não autorizado" || error.message === "Tarefa não encontrada")) {
      throw error;
    }
    throw new Error("Não foi possível clonar a tarefa.");
  }
}

// ==========================================
// 5. EXCLUIR TAREFA
// ==========================================
export async function deleteKanbanTask(taskId: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Não autorizado")

    await db.delete(kanbanTasks).where(eq(kanbanTasks.id, taskId))
  
    revalidatePath(KANBAN_ROUTE)
  } catch (error) {
    console.error("Erro ao excluir tarefa Kanban:", error);
    if (error instanceof Error && error.message === "Não autorizado") {
      throw error;
    }
    throw new Error("Não foi possível excluir a tarefa.");
  }
}