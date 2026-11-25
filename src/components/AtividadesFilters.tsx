// src/components/AtividadesFilters.tsx
"use client"

import { SORT_OPTIONS } from "@/utils/mocks"
import { FiltersProps } from "@/utils/types"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AtividadesFilters({
  activityType,
  gearId,
  sortValue,
  typeOptions,
  shoes,
  bikes,
}: FiltersProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const params = new URLSearchParams()
    
    for (const [key, value] of formData.entries()) {
      const stringValue = String(value)
      if (stringValue === "" || stringValue === null || stringValue === undefined) continue
      if (key === "sort" && stringValue === "date_desc") continue
      params.set(key, stringValue)
    }
    
    const queryString = params.toString()
    router.push(queryString ? `/atividades?${queryString}` : "/atividades")
    setIsOpen(false) // Fecha o dropdown após aplicar
  }

  const handleClearFilters = () => {
    router.push("/atividades")
    setIsOpen(false)
  }

  // Verifica se há filtros ativos
  const hasActiveFilters = activityType !== "all" || gearId !== "" || sortValue !== "date_desc"

  return (
    <div className="relative">
      {/* Botão de Filtro */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
          hasActiveFilters
            ? "bg-orange-600 text-white hover:bg-orange-700"
            : "bg-surface-1 text-foreground border border-border hover:bg-surface-2"
        }`}
      >
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" 
          />
        </svg>
        FILTROS
        {hasActiveFilters && (
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-white text-orange-600 rounded-full">
            !
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Overlay para fechar ao clicar fora */}
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Conteúdo do dropdown */}
          <div className="absolute left-0 top-full mt-2 z-20 w-[400px] md:w-[600px]">
            <form 
              onSubmit={handleSubmit} 
              className="bg-surface-1 border border-border rounded-2xl shadow-xl p-6 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filtros</h2>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="text-sm text-[#FC4C02] hover:text-foreground"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Tipo de atividade */}
                <div className="space-y-1">
                  <label htmlFor="type" className="block text-sm font-medium text-muted-foreground">
                    Tipo de atividade
                  </label>
                  <select
                    id="type"
                    name="type"
                    defaultValue={activityType === "all" ? "" : activityType}
                    className="w-full bg-surface-2 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Todos</option>
                    {typeOptions.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Equipamento */}
                <div className="space-y-1">
                  <label htmlFor="gearId" className="block text-sm font-medium text-muted-foreground">
                    Equipamento
                  </label>
                  <select
                    id="gearId"
                    name="gearId"
                    defaultValue={gearId || ""}
                    className="w-full bg-surface-2 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Todos</option>
                    <optgroup label="👟 Tênis">
                      {shoes.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="🚴 Bicicleta">
                      {bikes.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Ordenação */}
                <div className="space-y-1">
                  <label htmlFor="sort" className="block text-sm font-medium text-muted-foreground">
                    Ordenar por
                  </label>
                  <select
                    id="sort"
                    name="sort"
                    defaultValue={sortValue}
                    className="w-full bg-surface-2 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {SORT_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-surface-2 hover:bg-surface-3 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#FC4C02] hover:bg-orange-700 text-white transition-colors"
                >
                  Aplicar Filtros
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}