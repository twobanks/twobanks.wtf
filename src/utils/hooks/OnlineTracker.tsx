"use client"

import { useEffect } from "react"

export function OnlineTracker() {
  useEffect(() => {
    const ping = async () => {
      try {
        await fetch("/api/presence", { method: "POST" })
      } catch (error) {
        // Silencia erros de rede em segundo plano
      }
    }

    // Ping inicial ao carregar
    ping()

    // Ping a cada 30 segundos
    const interval = setInterval(ping, 30000)
    return () => clearInterval(interval)
  }, [])

  return null
}