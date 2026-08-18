"use client";

import { useState } from "react";

import { addItem, deleteItem, deleteList, toggleItem, updateList } from "@/actions/shopping";
import type { ShoppingListWithItems } from "@/database/schema";

const typeLabels: Record<ShoppingListWithItems["type"], string> = {
  supermercado: "Supermercado",
  varejao: "Varejão",
  acougue: "Açougue",
};

export function ListCard({ list }: { list: ShoppingListWithItems }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-4">
        {isEditing ? (
          <form
            action={updateList.bind(null, list.id)}
            className="space-y-2 w-full"
          >
            <input
              name="name"
              defaultValue={list.name}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="type"
              defaultValue={list.type}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="supermercado">Supermercado</option>
              <option value="varejao">Varejão</option>
              <option value="acougue">Açougue</option>
            </select>
            <div className="flex gap-2">
              <button
                type="submit"
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-sm bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h3 className="text-lg font-semibold text-gray-100">{list.name}</h3>
            <span className="inline-block mt-1 text-xs bg-gray-800 text-gray-300 rounded-full px-2 py-1">
              {typeLabels[list.type]}
            </span>
          </div>
        )}

        {!isEditing && (
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Editar
            </button>
            <form action={deleteList.bind(null, list.id)}>
              <button
                type="submit"
                className="text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                Excluir
              </button>
            </form>
          </div>
        )}
      </div>

      <ul className="flex-1 space-y-2 mt-2">
        {list.items.map((item) => (
          <li key={item.id} className="flex items-center gap-3 text-sm">
            <form
              action={toggleItem.bind(null, item.id)}
              className="flex items-center gap-3 flex-1"
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(e) => {
                  e.target.form?.requestSubmit();
                }}
                className="rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
              />
              <span
                className={`flex-1 ${
                  item.checked ? "line-through text-gray-500" : "text-gray-200"
                }`}
              >
                {item.quantity && item.quantity > 1
                  ? `${item.quantity} `
                  : ""}
                {item.unit ? `${item.unit} ` : ""}
                {item.name}
              </span>
            </form>
            <form action={deleteItem.bind(null, item.id)}>
              <button
                type="submit"
                className="text-gray-500 hover:text-red-400 transition-colors"
                aria-label="Excluir item"
              >
                ✕
              </button>
            </form>
          </li>
        ))}
      </ul>

      {isAddingItem ? (
        <form
          action={addItem.bind(null, list.id)}
          className="mt-4 flex flex-wrap gap-2 items-center"
        >
          <input
            name="name"
            placeholder="Novo item"
            required
            className="flex-1 min-w-[120px] bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="quantity"
            type="number"
            min="1"
            defaultValue="1"
            className="w-20 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="unit"
            placeholder="un"
            className="w-20 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setIsAddingItem(false)}
            className="text-gray-400 hover:text-gray-200 text-sm px-2 py-1"
          >
            Cancelar
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsAddingItem(true)}
          className="mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors self-start"
        >
          + Adicionar item
        </button>
      )}
    </div>
  );
}