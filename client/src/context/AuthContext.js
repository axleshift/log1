import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getUserInfo } from '../utils/auth'

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation()
  const userInfo = getUserInfo()

  // Check if user is authenticated
  if (!userInfo) {
    // Redirect to login while saving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check for role-based access if allowedRoles are specified
  if (allowedRoles.length > 0 && !allowedRoles.includes(userInfo.role)) {
    // Redirect to unauthorized page or dashboard
    return <Navigate to="/401" replace />
  }

  // If authenticated and authorized, render the protected component
  return children
}

export default ProtectedRoute
