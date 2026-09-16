"use client";

import { createList } from "@/actions/shopping";
import { Plus } from "lucide-react"; // Lembre-se de importar do lucide-react
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 bg-zinc-100 hover:bg-white text-zinc-900 font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto h-10"
    >
      <Plus size={16} />
      {pending ? "Criando..." : "Nova lista"}
    </button>
  );
}

export function CreateListForm() {
  return (
    <form
      action={createList}
      className="w-full bg-zinc-900/40 border border-zinc-800/80 p-4 rounded-xl flex flex-col md:flex-row md:items-end gap-4"
    >
      <div className="flex-1">
        <label htmlFor="name" className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
          Nome da lista
        </label>
        <input
          id="name"
          name="name"
          required
          placeholder="Ex: Compras da semana"
          className="w-full h-10 bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all"
        />
      </div>
      <div className="w-full md:w-48">
        <label htmlFor="type" className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
          Categoria
        </label>
        <select
          id="type"
          name="type"
          required
          className="w-full h-10 bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all appearance-none"
        >
          <option value="supermercado">Supermercado</option>
          <option value="varejao">Varejão</option>
          <option value="acougue">Açougue</option>
        </select>
      </div>
      <SubmitButton />
    </form>
  );
}