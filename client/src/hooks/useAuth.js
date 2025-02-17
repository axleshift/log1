// // src/hooks/useAuth.js
// import { useState, useEffect } from 'react'
// import { getUserInfo } from '../utils/auth'

// export const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [userRole, setUserRole] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const userInfo = getUserInfo()
//     setIsAuthenticated(!!userInfo)
//     setUserRole(userInfo?.role)
//     setIsLoading(false)
//   }, [])

//   return { isAuthenticated, userRole, isLoading }
// }

import { useState, useEffect } from 'react'
import { getUserInfo, getAuthToken, refreshToken } from './auth'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userInfo = getUserInfo()
    if (userInfo) {
      setIsAuthenticated(true)
      setUserRole(userInfo.role)
    } else {
      refreshToken().then((newAccessToken) => {
        if (newAccessToken) {
          setIsAuthenticated(true)
          setUserRole(getUserInfo().role)
        } else {
          setIsAuthenticated(false)
        }
      })
    }
    setIsLoading(false)
  }, [])

  return { isAuthenticated, userRole, isLoading }
}
