import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  // const [name, setName] = useState()
  // const [email, setEmail] = useState()
  // const [password, setPassword] = useState()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (data.password !== data.repeatPassword) {
      setError('Passwords do not match')
      return
    }
    // Check for empty fields
    if (!data.name || !data.email || !data.password) {
      setError('All fields are required')
      return
    }
    setLoading(true)

    // axios
    //   .post('/api/users/register', data)
    //   .then((res) => {
    //     if (res.data.success) {
    //       navigate('/login')
    //     } else {
    //       setError(res.data.message)
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     setError(err.message || 'Registration failed')
    //   })
    //   .finally(() => {
    //     setLoading(false)
    //   })
    axios
      .post('/api/users/register', data)
      .then((res) => {
        console.log('Response data:', res.data)
        if (res.status >= 200 && res.status < 300) {
          navigate('/login')
        } else {
          setError(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err)
        setError(err.message || 'Registration failed')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Name"
                      autoComplete="off"
                      id="name"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="off"
                      value={data.email}
                      id="email"
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="off"
                      value={data.password}
                      id="password"
                      onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="off"
                      id="repeatPassword"
                      value={data.repeatPassword}
                      onChange={(e) => setData({ ...data, repeatPassword: e.target.value })}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type="submit" disabled={loading}>
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
