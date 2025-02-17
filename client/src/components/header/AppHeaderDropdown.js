import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CButton,
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
import { logout } from '../../utils/auth'
const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5057'
const AppHeaderDropdown = () => {
  const users = JSON.parse(sessionStorage.getItem('user'))
  const [user, setUser] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(null)
  const navigate = useNavigate()

  const getUserFromSession = () => {
    try {
      const userStr = sessionStorage.getItem('user')
      if (!userStr) return null
      return JSON.parse(userStr)
    } catch (error) {
      console.error('Error parsing user from session:', error)
      return null
    }
  }

  useEffect(() => {
    const userData = getUserFromSession()
    if (userData) {
      setUser(userData)
      // Set photo URL if user has a photo
      if (userData.photo) {
        setPhotoUrl(`${API_URL}/uploads/${userData.photo}`)
      }
    }
  }, [])
  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleRegisterClick = () => {
    navigate('/register')
  }
  const handleAccountClick = () => {
    navigate('/all-users')
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar
          src={photoUrl || avatar8} // Provide a default avatar
          size="md"
          style={{
            width: '40px',
            height: '40px',
            objectFit: 'cover',
            border: '2px solid #fff',
            borderRadius: '50%',
          }}
        />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem>
          <CIcon icon={cilUser} className="me-2" />
          {`Hi, ${users.username}. Your role is ${users.role}`}
        </CDropdownItem>
        {user?.role === 'admin' && (
          <CDropdownItem onClick={handleRegisterClick}>
            <CIcon icon={cilUserPlus} className="me-2" />
            Register
          </CDropdownItem>
        )}
        {user?.role === 'admin' && (
          <CDropdownItem onClick={handleAccountClick}>
            <CIcon icon={cilUser} className="me-2" />
            Accounts
          </CDropdownItem>
        )}
        <CDropdownItem className="d-flex justify-content-center">
          <CButton variant="ghost" color="light" onClick={handleLogout}>
            <CIcon icon={cilAccountLogout} className="me-2" />
            Logout
          </CButton>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
