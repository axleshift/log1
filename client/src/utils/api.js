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

// Response interceptor balik mo to pag nag expire parin
// api.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       // Refresh token logic
//       const refreshToken = sessionStorage.getItem('refreshToken')
//       if (refreshToken) {
//         return api
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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If the error is due to token expiration and we haven't tried to refresh yet
    if (
      error.response?.status === 401 &&
      error.response?.data?.isExpired &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        // Attempt to refresh the token
        const newToken = await refreshToken()

        if (newToken) {
          // Update the authorization header
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          // Retry the original request
          return api(originalRequest)
        }
      } catch (refreshError) {
        // If refresh token fails, redirect to login
        sessionStorage.clear()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)
export default api
