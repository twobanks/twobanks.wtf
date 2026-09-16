"use client";

import { useState } from "react";

import { addItem, deleteItem, deleteList, toggleItem, updateList } from "@/actions/shopping";
import type { ShoppingListWithItems } from "@/db/schema";
import { Check, Edit2, Plus, Trash2, X } from "lucide-react";

const typeLabels: Record<ShoppingListWithItems["type"], string> = {
  supermercado: "Supermercado",
  varejao: "Varejão",
  acougue: "Açougue",
};

export function ListCard({ list }: { list: ShoppingListWithItems }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors rounded-xl p-5 flex flex-col h-full">
      <div className="flex justify-between items-start mb-5 pb-4 border-b border-zinc-800/80">
        {isEditing ? (
          <form action={updateList.bind(null, list.id)} className="space-y-3 w-full">
            <input
              name="name"
              defaultValue={list.name}
              required
              className="w-full h-9 bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            />
            <div className="flex gap-2">
              <select
                name="type"
                defaultValue={list.type}
                className="flex-1 h-9 bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 appearance-none"
              >
                <option value="supermercado">Supermercado</option>
                <option value="varejao">Varejão</option>
                <option value="acougue">Açougue</option>
              </select>
              <button
                type="submit"
                className="h-9 px-3 bg-zinc-100 text-zinc-900 rounded-lg text-sm font-medium hover:bg-white transition-colors flex items-center justify-center"
              >
                <Check size={16} />
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="h-9 px-3 bg-zinc-800 text-zinc-300 rounded-lg text-sm hover:bg-zinc-700 transition-colors flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>
          </form>
        ) : (
          <>
            <div>
              <h3 className="text-lg font-medium text-zinc-100 leading-tight">
                {list.name}
              </h3>
              <span className="inline-block mt-1.5 text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                {typeLabels[list.type]}
              </span>
            </div>

            <div className="flex items-center gap-1 -mr-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors"
                title="Editar lista"
              >
                <Edit2 size={16} />
              </button>
              <form action={deleteList.bind(null, list.id)}>
                <button
                  type="submit"
                  className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  title="Excluir lista"
                >
                  <Trash2 size={16} />
                </button>
              </form>
            </div>
          </>
        )}
      </div>

      <ul className="flex-1 space-y-1">
        {list.items.map((item) => (
          <li key={item.id} className="group flex items-center gap-3 text-sm py-1.5 rounded-md hover:bg-zinc-800/30 -mx-2 px-2 transition-colors">
            <form action={toggleItem.bind(null, item.id)} className="flex items-center gap-3 flex-1 cursor-pointer">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(e) => {
                  e.target.form?.requestSubmit();
                }}
                className="size-4 rounded border-zinc-600 bg-zinc-800 checked:bg-zinc-500 checked:border-zinc-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <span className={`flex-1 transition-colors ${item.checked ? "line-through text-zinc-600" : "text-zinc-300 group-hover:text-zinc-200"}`}>
                {item.quantity && item.quantity > 1 ? (
                  <span className="font-medium mr-1">{item.quantity}</span>
                ) : ""}
                {item.unit ? <span className="text-zinc-500 text-xs mr-1">{item.unit}</span> : ""}
                {item.name}
              </span>
            </form>
            
            <form action={deleteItem.bind(null, item.id)}>
              <button
                type="submit"
                className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400 transition-all p-1"
                aria-label="Excluir item"
              >
                <Trash2 size={14} />
              </button>
            </form>
          </li>
        ))}
      </ul>

      <div className="mt-4 pt-4 border-t border-zinc-800/50">
        {isAddingItem ? (
          <form action={addItem.bind(null, list.id)} className="flex flex-wrap gap-2 items-center">
            <input
              name="name"
              placeholder="Novo item"
              required
              autoFocus
              className="flex-1 min-w-[120px] h-9 bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            />
            <input
              name="quantity"
              type="number"
              min="1"
              defaultValue="1"
              placeholder="Qtd"
              className="w-16 h-9 bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            />
            <input
              name="unit"
              placeholder="Un (opcional)"
              className="w-24 h-9 bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            />
            <div className="flex gap-1 w-full mt-1">
              <button
                type="submit"
                className="flex-1 h-9 bg-zinc-100 hover:bg-white text-zinc-900 rounded-lg text-sm font-medium transition-colors"
              >
                Adicionar
              </button>
              <button
                type="button"
                onClick={() => setIsAddingItem(false)}
                className="h-9 px-3 bg-zinc-800 text-zinc-300 rounded-lg text-sm hover:bg-zinc-700 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAddingItem(true)}
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors w-full p-1"
          >
            <Plus size={16} />
            Adicionar item
          </button>
        )}
      </div>
    </div>
  );
}