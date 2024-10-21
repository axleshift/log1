import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const ProtectedRoute = ({ element: Element, isAdmin }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('accessToken')
    if (!token) return false

    try {
      const decodedToken = jwtDecode(token)
      const currentTime = Date.now() / 1000
      return decodedToken.exp > currentTime
    } catch (error) {
      return false
    }
  }

  const hasAdminRole = () => {
    const token = localStorage.getItem('accessToken')
    if (!token) return false

    try {
      const decodedToken = jwtDecode(token)
      return decodedToken.role === 'admin'
    } catch (error) {
      return false
    }
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  if (isAdmin && !hasAdminRole()) {
    return <Navigate to="/401" replace />
  }

  return <Element />
}

export default ProtectedRoute
