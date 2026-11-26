import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Inicializa com o valor atual para evitar setState síncrono no efeito
  React.useEffect(() => {
    setTimeout(() => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT), 0);
  }, [])

  return !!isMobile
}
