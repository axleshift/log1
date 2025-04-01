import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useToast } from '../Toast/Toast'

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { showError } = useToast()
  const token = sessionStorage.getItem('accessToken')
  const userRole = sessionStorage.getItem('user')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/401" replace />
  }

  return children
}

export default ProtectedRoute
