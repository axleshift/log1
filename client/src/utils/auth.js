import { jwtDecode } from 'jwt-decode'
import api from './api'
export const getAuthToken = () => {
  return sessionStorage.getItem('accessToken')
}

export const getRefreshToken = () => {
  return sessionStorage.getItem('refreshToken')
}

export const getUserInfo = () => {
  const token = getAuthToken()
  if (token) {
    try {
      const decodedToken = jwtDecode(token)
      return decodedToken
    } catch (error) {
      console.error('Error decoding token:', error)
      return null
    }
  }
  return null
}

export const refreshToken = async () => {
  const refreshToken = getRefreshToken()
  if (refreshToken) {
    try {
      const response = await api.post('api/v1/user/refresh-token', { refreshToken })
      const newAccessToken = response.data.accessToken
      sessionStorage.setItem('accessToken', newAccessToken)
      return newAccessToken
    } catch (error) {
      console.error('Refresh token failed:', error)
      sessionStorage.removeItem('accessToken')
      sessionStorage.removeItem('refreshToken')
      sessionStorage.removeItem('user')
      // window.location.href = '/login'
    }
  }
}

export const logout = async () => {
  try {
    await api.post('api/v1/user/logout')
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('refreshToken')
    sessionStorage.removeItem('user')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

export const hasRole = (requiredRole) => {
  const userInfo = getUserInfo()
  return userInfo?.role === requiredRole
}

export const getRole = () => {
  const accessToken = sessionStorage.getItem('accessToken')
  if (accessToken) {
    try {
      const decodedToken = jwtDecode(accessToken)
      return decodedToken.role
    } catch (error) {
      console.error('Error decoding token:', error)
      return null
    }
  }
  return null
}

export const getUsername = () => {
  const accessToken = sessionStorage.getItem('accessToken')
  if (accessToken) {
    try {
      const decodedToken = jwtDecode(accessToken)
      return decodedToken.username
    } catch (error) {
      console.error('Error decoding token:', error)
      return null
    }
  }
  return null
}
