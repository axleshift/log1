// import axios from 'axios'
// const API_URL = import.meta.env.VITE_APP_API_URL
// const API_KEY = import.meta.env.VITE_APP_API_KEY
// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'multipart/form-data' && 'application/json',
//     'x-api-key': API_KEY,
//   },
// })

// api.interceptors.request.use(
//   (config) => {
//     const token = sessionStorage.getItem('accessToken')
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
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
  withCredentials: true, // Enable credentials
})

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Change from sessionStorage to localStorage
    const token = localStorage.getItem('accessToken')
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
