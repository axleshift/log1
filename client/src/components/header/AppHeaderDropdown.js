import React, { useEffect } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilAccountLogout, cilUser, cilUserPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar8 from './../../assets/images/avatars/8.jpg'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    console.log('Current user state:', user)
  }, [user])

  const handleLogout = async () => {
    console.log('Logging out...')
    try {
      // Call the logout endpoint on your server
      await axios.post('/api/user/logout')

      // Clear the Redux store
      dispatch({ type: 'set', user: {} })

      // Remove the access token from localStorage
      localStorage.removeItem('accessToken')

      // Clear all cookies
      document.cookie.split(';').forEach((c) => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
      })

      // Navigate to login page
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleRegisterClick = () => {
    navigate('/register')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem>
          <CIcon icon={cilUser} className="me-2" />
          {user.username ? user.username : 'User'} (Role: {user.role || 'N/A'})
        </CDropdownItem>
        {user.role === 'admin' && (
          <CDropdownItem onClick={handleRegisterClick}>
            <CIcon icon={cilUserPlus} className="me-2" />
            Register New User
          </CDropdownItem>
        )}
        <CDropdownItem onClick={handleLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
