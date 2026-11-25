// src/components/PageSizeSelector.tsx
"use client"

import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from "@/utils/mocks"
import { PageSizeSelectorProps } from "@/utils/types"
import { useRouter } from "next/navigation"

export default function PageSizeSelector({ pageSize, filters }: PageSizeSelectorProps) {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const params = new URLSearchParams()
    
    for (const [key, value] of formData.entries()) {
      const stringValue = String(value)
      if (stringValue === "" || stringValue === null || stringValue === undefined) continue
      if (key === "pageSize" && stringValue === String(DEFAULT_PAGE_SIZE)) continue
      params.set(key, stringValue)
    }
    
    const queryString = params.toString()
    router.push(queryString ? `/atividades?${queryString}` : "/atividades")
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <label htmlFor="pageSize" className="text-sm text-subtle-foreground whitespace-nowrap">
        Itens:
      </label>
      <select
        id="pageSize"
        name="pageSize"
        defaultValue={pageSize}
        className="bg-surface-2 border border-border rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        {PAGE_SIZE_OPTIONS.map(size => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>
      {Object.entries(filters).map(([key, value]) => (
        value !== undefined && value !== "" && (
          <input key={key} type="hidden" name={key} value={String(value)} />
        )
      ))}
      <button
        type="submit"
        className="px-3 py-1.5 text-sm font-medium bg-surface-2 hover:bg-surface-3 rounded-md transition-colors"
      >
        OK
      </button>
    </form>
  )
}