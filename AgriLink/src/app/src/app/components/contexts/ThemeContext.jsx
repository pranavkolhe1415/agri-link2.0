import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    try {
      const savedTheme = window.localStorage?.getItem('svms-theme')
      if (savedTheme === 'dark') {
        setIsDark(true)
        document.documentElement.classList.add('dark')
      }
    } catch {
      // Embedded previews may block storage access.
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(currentValue => {
      const nextValue = !currentValue
      document.documentElement.classList.toggle('dark', nextValue)

      try {
        window.localStorage?.setItem('svms-theme', nextValue ? 'dark' : 'light')
      } catch {
        // Theme remains active for the current session when storage is blocked.
      }

      return nextValue
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
