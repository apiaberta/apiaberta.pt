import { createContext, useContext, useState } from 'react'

const ApiContext = createContext(null)

export function ApiProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submitContact = async (formData) => {
    setLoading(true)
    setError(null)
    try {
      // Mock submission - replace with real endpoint when backend is ready
      await new Promise((resolve) => setTimeout(resolve, 1200))
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  return (
    <ApiContext.Provider value={{ loading, error, submitContact }}>
      {children}
    </ApiContext.Provider>
  )
}

export function useApi() {
  const ctx = useContext(ApiContext)
  if (!ctx) throw new Error('useApi must be used within ApiProvider')
  return ctx
}
