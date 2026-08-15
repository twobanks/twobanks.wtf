"use client"

export function DeleteButton() {
  return (
    <button 
      type="submit"
      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
      onClick={(e) => {
        if (!window.confirm("Tem certeza que deseja apagar este livro?")) {
          e.preventDefault()
        }
      }}
    >
      Excluir
    </button>
  )
}