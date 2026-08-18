"use client";

import { createList } from "@/actions/shopping";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Criando..." : "Criar lista"}
    </button>
  );
}

export function CreateListForm() {
  return (
    <form
      action={createList}
      className="bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-sm space-y-3"
    >
      <h2 className="text-lg font-semibold text-gray-200">Nova lista</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
          Nome da lista
        </label>
        <input
          id="name"
          name="name"
          required
          placeholder="Ex: Compras da semana"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">
          Tipo
        </label>
        <select
          id="type"
          name="type"
          required
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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