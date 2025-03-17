// import axios from 'axios'

// const API_URL = import.meta.env.VITE_APP_API_URL

// // Create the main API instance
// const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// })

// // Request interceptor
// api.interceptors.request.use((config) => {
//   const token = sessionStorage.getItem('accessToken')

//   // Set the Authorization header if token exists
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }

//   // Set Content-Type based on the request data
//   if (config.data instanceof FormData) {
//     config.headers['Content-Type'] = 'multipart/form-data'
//   } else {
//     config.headers['Content-Type'] = 'application/json'
//   }

//   return config
// })

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config

//     // If the error is due to token expiration and we haven't tried to refresh yet
//     if (
//       error.response?.status === 401 &&
//       error.response?.data?.isExpired &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true

//       try {
//         // Attempt to refresh the token
//         const newToken = await refreshToken()

//         if (newToken) {
//           // Update the authorization header
//           originalRequest.headers.Authorization = `Bearer ${newToken}`
//           // Retry the original request
//           return api(originalRequest)
//         }
//       } catch (refreshError) {
//         // If refresh token fails, redirect to login
//         sessionStorage.clear()
//         window.location.href = '/login'
//         return Promise.reject(refreshError)
//       }
//     }

//     return Promise.reject(error)
//   },
// )
// export default api

import axios from 'axios'

const API_URL = import.meta.env.VITE_APP_API_URL
const API_KEY = import.meta.env.VITE_APP_API_KEY

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Set default headers
    config.headers = config.headers || {}

    // Add token if exists
    const token = sessionStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Add API key
    config.headers['x-api-key'] = API_KEY

    // Set Content-Type
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    } else {
      config.headers['Content-Type'] = 'application/json'
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
    })
    return Promise.reject(error)
  },
)

export default api
