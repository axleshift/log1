// import { jwtDecode } from 'jwt-decode'
// import api from './api'

// export const getAuthToken = () => {
//   return sessionStorage.getItem('accessToken')
// }

// export const getRefreshToken = () => {
//   return sessionStorage.getItem('refreshToken')
// }

// export const getUserInfo = () => {
//   const token = getAuthToken()
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token)
//       return decodedToken
//     } catch (error) {
//       console.error('Error decoding token:', error)
//       return null
//     }
//   }
//   return null
// }

// export const refreshToken = async () => {
//   const refreshToken = getRefreshToken()
//   if (refreshToken) {
//     try {
//       const response = await api.post('api/v1/user/refresh-token', { refreshToken })
//       const newAccessToken = response.data.accessToken
//       sessionStorage.setItem('accessToken', newAccessToken)
//       return newAccessToken
//     } catch (error) {
//       console.error('Refresh token failed:', error)
//       sessionStorage.removeItem('accessToken')
//       sessionStorage.removeItem('refreshToken')
//       sessionStorage.removeItem('user')
//       // window.location.href = '/login'
//     }
//   }
// }

// export const logout = async () => {
//   try {
//     const token = sessionStorage.getItem('accessToken')
//     if (!token) {
//       // If no token exists, just clear storage
//       sessionStorage.removeItem('accessToken')
//       sessionStorage.removeItem('refreshToken')
//       sessionStorage.removeItem('user')
//       return
//     }

//     await api.post(
//       'api/v1/user/logout',
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     )

//     // Clear storage after successful logout
//     sessionStorage.removeItem('accessToken')
//     sessionStorage.removeItem('refreshToken')
//     sessionStorage.removeItem('user')
//   } catch (error) {
//     console.error('Logout error:', error)
//     // Even if the server request fails, clear local storage
//     sessionStorage.removeItem('accessToken')
//     sessionStorage.removeItem('refreshToken')
//     sessionStorage.removeItem('user')
//   }
// }

// export const hasRole = (requiredRole) => {
//   const userInfo = getUserInfo()
//   return userInfo?.role === requiredRole
// }

// export const getRole = () => {
//   const accessToken = sessionStorage.getItem('accessToken')
//   if (accessToken) {
//     try {
//       const decodedToken = jwtDecode(accessToken)
//       return decodedToken.role
//     } catch (error) {
//       console.error('Error decoding token:', error)
//       return null
//     }
//   }
//   return null
// }

// export const getUsername = () => {
//   const accessToken = sessionStorage.getItem('accessToken')
//   if (accessToken) {
//     try {
//       const decodedToken = jwtDecode(accessToken)
//       return decodedToken.username
//     } catch (error) {
//       console.error('Error decoding token:', error)
//       return null
//     }
//   }
//   return null
// }

import { jwtDecode } from 'jwt-decode'
import api from './api'

export const getAuthToken = () => {
  return localStorage.getItem('accessToken') // Change to localStorage
}

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken') // Change to localStorage
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
      localStorage.setItem('accessToken', newAccessToken) // Change to localStorage
      return newAccessToken
    } catch (error) {
      console.error('Refresh token failed:', error)
      localStorage.removeItem('accessToken') // Change to localStorage
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
    }
  }
}

export const getRole = () => {
  const accessToken = localStorage.getItem('accessToken')
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
  const accessToken = localStorage.getItem('accessToken')
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

export const logout = async () => {
  try {
    const token = localStorage.getItem('accessToken') // Change to localStorage
    if (!token) {
      // If no token exists, just clear storage
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      return
    }

    await api.post(
      'api/v1/user/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    // Clear storage after successful logout
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  } catch (error) {
    console.error('Logout error:', error)
    // Even if the server request fails, clear local storage
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }
}
