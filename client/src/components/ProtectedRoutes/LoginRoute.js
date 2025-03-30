import { Navigate } from 'react-router-dom'
import React from 'react'

const LoginRoute = ({ children }) => {
  const token = sessionStorage.getItem('accessToken')

  // If user is already logged in, redirect to home or dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default LoginRoute
