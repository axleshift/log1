import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const ProtectedRoute = ({ element: Element, isAdmin }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem('accessToken')
      if (!token) {
        setIsAuthenticated(false)
        setIsAuthorized(false)
        setIsLoading(false)
        return
      }

      try {
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000
        if (decodedToken.exp > currentTime) {
          setIsAuthenticated(true)
          setIsAuthorized(isAdmin ? decodedToken.role === 'admin' : true)
        } else {
          // Token has expired
          sessionStorage.removeItem('accessToken')
          setIsAuthenticated(false)
          setIsAuthorized(false)
        }
      } catch (error) {
        console.error('Error decoding token:', error)
        setIsAuthenticated(false)
        setIsAuthorized(false)
      }
      setIsLoading(false)
    }

    checkAuth()
    // Set up an interval to periodically check authentication status
    const intervalId = setInterval(checkAuth, 60000) // Check every minute

    return () => clearInterval(intervalId)
  }, [isAdmin])

  if (isLoading) {
    return <div>Loading...</div> // Or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (isAdmin && !isAuthorized) {
    return <Navigate to="/401" replace />
  }

  return <Element />
}

export default ProtectedRoute
