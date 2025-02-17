import { useEffect } from 'react'
import { refreshToken } from '../utils/auth'
import { jwtDecode } from 'jwt-decode'

export const useTokenExpiration = () => {
  useEffect(() => {
    const checkTokenExpiration = async () => {
      const token = sessionStorage.getItem('accessToken')

      if (token) {
        const decoded = jwtDecode(token)
        const expirationTime = decoded.exp * 1000 // Convert to milliseconds
        const currentTime = Date.now()
        const timeUntilExpiration = expirationTime - currentTime

        // If token will expire in less than 1 minute, refresh it
        if (timeUntilExpiration < 60000 && timeUntilExpiration > 0) {
          await refreshToken()
        }
      }
    }

    // Check token expiration every 30 seconds
    const interval = setInterval(checkTokenExpiration, 30000)

    return () => clearInterval(interval)
  }, [])
}
