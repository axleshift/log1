// import axios from 'axios'
// const API_URL = import.meta.env.VITE_APP_API_URL
// const API_KEY = import.meta.env.VITE_APP_API_KEY

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'multipart/form-data' && 'application/json',
//     'x-api-key': API_KEY,
//   },
//   withCredentials: true, // Enable credentials
// })

// // Add request interceptor
// api.interceptors.request.use(
//   (config) => {
//     // Change from sessionStorage to localStorage
//     const token = localStorage.getItem('accessToken')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// export default api

import axios from 'axios'

const API_URL = import.meta.env.VITE_APP_API_URL
const API_KEY = import.meta.env.VITE_APP_API_KEY

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'x-api-key': API_KEY,
  },
  withCredentials: true,
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Set Content-Type based on data type
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    } else {
      config.headers['Content-Type'] = 'application/json'
    }

    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken')
    }
    return Promise.reject(error)
  },
)

export default api
