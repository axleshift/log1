// import axios from 'axios'

// const API_URL = import.meta.env.VITE_APP_API_URL
// const API_KEY = import.meta.env.VITE_APP_API_KEY

// const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// })

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     // Set default headers
//     config.headers = config.headers || {}

//     // Add token if exists
//     const token = sessionStorage.getItem('accessToken')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }

//     // Add API key
//     config.headers['x-api-key'] = API_KEY

//     // Set Content-Type
//     if (config.data instanceof FormData) {
//       config.headers['Content-Type'] = 'multipart/form-data'
//     } else {
//       config.headers['Content-Type'] = 'application/json'
//     }

//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// // Add response interceptor for better error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', {
//       status: error.response?.status,
//       data: error.response?.data,
//       config: error.config,
//     })
//     return Promise.reject(error)
//   },
// )

// export default api

// api.js
import axios from 'axios'
const API_URL = import.meta.env.VITE_APP_API_URL
const API_KEY = import.meta.env.VITE_APP_API_KEY
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data' && 'application/json',
    'x-api-key': API_KEY,
  },
})

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
