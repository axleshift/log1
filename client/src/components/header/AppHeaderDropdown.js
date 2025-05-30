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
import avatar1 from './../../assets/images/avatars/1.jpg'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../utils/auth'
import axios from 'axios'
import api from '../../utils/api'
import { useToast } from '../Toast/Toast'

const AppHeaderDropdown = () => {
  const { showSuccess, showError } = useToast()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [preview, setPreview] = useState(null)
  const fetchUserData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Get the token from sessionStorage
      const token = sessionStorage.getItem('accessToken')

      const response = await api.get('/api/v1/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data.success) {
        setUser(response.data.data)
      }
    } catch (err) {
      console.error('Profile fetch error:', err)
      if (err.response?.status === 401) {
        sessionStorage.removeItem('accessToken')
        navigate('/login')
        return
      }
      setError(err.response?.data?.message || 'Error fetching user data')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchUserData()
  }, [])

  useEffect(() => {
    if (user?.photo) {
      if (user.photo.startsWith('http')) {
        setPreview(user.photo)
      } else {
        // Using api instance to get the full URL
        const photoUrl = `${api.defaults.baseURL}uploads/profiles/${user.photo}`
        setPreview(photoUrl)
      }
    } else {
      setPreview(null)
    }
  }, [user])

  const handleLogout = async () => {
    await logout()
    showSuccess('Logout successful')
    navigate('/login')
  }

  const handleRegisterClick = () => {
    navigate('/register')
  }
  const handleAccountClick = () => {
    navigate('/all-users')
  }
  const handleProfileClick = () => {
    navigate('/profile')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar
          src={preview || avatar1}
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
        {/* Add conditional rendering here */}
        {user && <CDropdownItem>{`Hi, ${user.username}. Your role is ${user.role}`}</CDropdownItem>}
        {/* Rest of your dropdown items with conditional rendering */}
        {user && (
          <>
            <CDropdownItem onClick={handleProfileClick}>
              <CIcon icon={cilUser} className="me-2" /> Profile
            </CDropdownItem>
            {user.role === 'super admin' && (
              <>
                <CDropdownItem onClick={handleRegisterClick}>
                  <CIcon icon={cilUserPlus} className="me-2" />
                  Register
                </CDropdownItem>
                <CDropdownItem onClick={handleAccountClick}>
                  <CIcon icon={cilUser} className="me-2" />
                  Accounts
                </CDropdownItem>
              </>
            )}
          </>
        )}
        <CDropdownItem className="d-flex justify-content-center">
          <CButton variant="outline" color="primary" onClick={handleLogout}>
            <CIcon icon={cilAccountLogout} className="me-2" />
            Logout
          </CButton>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}
export default AppHeaderDropdown
