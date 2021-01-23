const getThemeColor = () => {
      const theme = typeof window !== 'undefined' && window.__theme

      if (theme === 'light') return '#f3f5f7'
      if (theme === 'dark') return '#121517'
}

export default getThemeColor