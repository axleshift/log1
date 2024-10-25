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
import { useDispatch } from 'react-redux'
import axios from 'axios'
const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5057'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})
const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const user = useSelector((state) => state.user)
  const user = JSON.parse(sessionStorage.getItem('user'))

  const handleLogout = async () => {
    try {
      await api.post('/api/v1/user/logout', {}, { withCredentials: true })
      // Clear user from Redux store
      dispatch({ type: 'clearUser' })
      sessionStorage.removeItem('accessToken')
      sessionStorage.removeItem('user')
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
          {user.data.user.username} (Role: {user.data.user.role})
        </CDropdownItem>
        {user.data.user.role === 'admin' && (
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
