// import axios from 'axios'

// const API_URL = import.meta.env.VITE_APP_API_URL

// const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// api.interceptors.request.use((config) => {
//   const token = sessionStorage.getItem('accessToken')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// api.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       // Refresh token logic
//       const refreshToken = sessionStorage.getItem('refreshToken')
//       if (refreshToken) {
//         api
//           .post('/api/v1/user/refresh-token', { refreshToken })
//           .then((response) => {
//             const newAccessToken = response.data.accessToken
//             sessionStorage.setItem('accessToken', newAccessToken)
//             error.config.headers.Authorization = `Bearer ${newAccessToken}`
//             return api.request(error.config)
//           })
//           .catch((error) => {
//             console.error('Refresh token failed:', error)
//             sessionStorage.removeItem('accessToken')
//             sessionStorage.removeItem('refreshToken')
//             // window.location.href = '/login'
//           })
//       } else {
//         sessionStorage.removeItem('accessToken')
//         // window.location.href = '/login'
//       }
//     }
//     return Promise.reject(error)
//   },
// )

// export default api

import axios from 'axios'

const API_URL = import.meta.env.VITE_APP_API_URL

// Create the main API instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

// Request interceptor
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken')

  // Set the Authorization header if token exists
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // Set Content-Type based on the request data
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data'
  } else {
    config.headers['Content-Type'] = 'application/json'
  }

  return config
})

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Refresh token logic
      const refreshToken = sessionStorage.getItem('refreshToken')
      if (refreshToken) {
        return api
          .post('/api/v1/user/refresh-token', { refreshToken })
          .then((response) => {
            const newAccessToken = response.data.accessToken
            sessionStorage.setItem('accessToken', newAccessToken)
            error.config.headers.Authorization = `Bearer ${newAccessToken}`
            return api.request(error.config)
          })
          .catch((error) => {
            console.error('Refresh token failed:', error)
            sessionStorage.removeItem('accessToken')
            sessionStorage.removeItem('refreshToken')
            // window.location.href = '/login'
          })
      } else {
        sessionStorage.removeItem('accessToken')
        // window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)

export default api
