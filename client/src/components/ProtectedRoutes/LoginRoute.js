// import { Navigate } from 'react-router-dom'
// import React from 'react'

// const LoginRoute = ({ children }) => {
//   const token = sessionStorage.getItem('accessToken')

//   // If user is already logged in, redirect to home or dashboard
//   if (token) {
//     return <Navigate to="/dashboard" replace />
//   }

//   return children
// }

// export default LoginRoute

import React, { useEffect, useCallback } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useToast } from '../Toast/Toast'

const LoginRoute = ({ children }) => {
  const { showError } = useToast()
  const location = useLocation()

  // Memoize the token check to prevent unnecessary re-renders
  const checkAuthStatus = useCallback(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      // If user is already logged in, redirect to the intended page or dashboard
      const intendedPath = location.state?.from || '/dashboard'
      return <Navigate to={intendedPath} replace />
    }
    return null
  }, [location.state?.from])

  // Run the check only once when component mounts
  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])

  // Simple token check for render decision
  const token = localStorage.getItem('accessToken')
  if (token) {
    const intendedPath = location.state?.from || '/dashboard'
    return <Navigate to={intendedPath} replace />
  }

  return children
}

export default LoginRoute
