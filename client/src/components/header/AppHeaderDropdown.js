import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilUser, cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()

  const handleRegister = () => {
    navigate('/register')
  }
  const handleLogout = () => {
    axios
      .get('/api/users/logout')
      .then((res) => {
        location.reload(true)
        navigate('/login')
      })
      .catch((err) => console.log(err))
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem onClick={handleLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
          Registration
        </CDropdownHeader>
        <CDropdownItem onClick={handleRegister}>
          <CIcon icon={cilUser} className="me-2" />
          Register
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
