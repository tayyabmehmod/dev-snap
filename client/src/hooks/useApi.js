import { useState, useCallback } from 'react'
import axios from 'axios'

const API_BASE = '/api'

export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (method, path, data = null) => {
    setLoading(true)
    setError(null)
    try {
      const config = {
        method,
        url: `${API_BASE}${path}`,
        headers: { 'Content-Type': 'application/json' },
      }
      if (data) config.data = data
      const response = await axios(config)
      return response.data
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'Something went wrong'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const savePortfolio = useCallback(
    (portfolioData) => request('POST', '/portfolio', portfolioData),
    [request]
  )

  const getPortfolio = useCallback(
    (id) => request('GET', `/portfolio/${id}`),
    [request]
  )

  const updatePortfolio = useCallback(
    (id, portfolioData) => request('PUT', `/portfolio/${id}`, portfolioData),
    [request]
  )

  const listPortfolios = useCallback(
    (params = {}) => {
      const query = new URLSearchParams(params).toString()
      return request('GET', `/portfolios${query ? `?${query}` : ''}`)
    },
    [request]
  )

  const deletePortfolio = useCallback(
    (id) => request('DELETE', `/portfolio/${id}`),
    [request]
  )

  const getStats = useCallback(() => request('GET', '/stats'), [request])

  return {
    loading,
    error,
    savePortfolio,
    getPortfolio,
    updatePortfolio,
    listPortfolios,
    deletePortfolio,
    getStats,
  }
}
