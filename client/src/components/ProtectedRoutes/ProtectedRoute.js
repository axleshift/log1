// import React from 'react'
// import { Navigate } from 'react-router-dom'
// import { jwtDecode } from 'jwt-decode'
// import { useToast } from '../Toast/Toast'

// const ProtectedRoute = ({ children, requiredRole = null }) => {
//   const { showError } = useToast()
//   const token = sessionStorage.getItem('accessToken')
//   const userRole = sessionStorage.getItem('user')

//   if (!token) {
//     return <Navigate to="/login" replace />
//   }

//   if (requiredRole && userRole !== requiredRole) {
//     return <Navigate to="/401" replace />
//   }

//   return children
// }

// export default ProtectedRoute

import React, { useEffect, useCallback } from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useToast } from '../Toast/Toast'
import { refreshToken } from '../../utils/auth'

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { showError } = useToast()

  // Move token check outside of render to prevent unnecessary re-renders
  const checkTokenExpiration = useCallback(async () => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000

        // If token is about to expire (e.g., within 5 minutes)
        if (decodedToken.exp - currentTime < 300) {
          await refreshToken()
        }
      } catch (error) {
        console.error('Token validation error:', error)
      }
    }
  }, []) // Empty dependency array since it doesn't depend on any props or state

  useEffect(() => {
    checkTokenExpiration()

    // Optional: Set up an interval to check token periodically
    const intervalId = setInterval(checkTokenExpiration, 4 * 60 * 1000) // Check every 4 minutes

    return () => {
      clearInterval(intervalId) // Cleanup interval on unmount
    }
  }, [checkTokenExpiration])

  // Move these checks outside useEffect
  const token = localStorage.getItem('accessToken')
  const userRole = localStorage.getItem('user')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/401" replace />
  }

  return children
}

export default ProtectedRoute
