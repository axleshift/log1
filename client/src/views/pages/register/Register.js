import React, { useState, useEffect } from 'react'
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
  CFormSelect,
  CAlert,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import api from '../../../utils/api'

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    role: '',
    photo: null,
  })

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [preview, setPreview] = useState(null)

  const handleChange = (e) => {
    const { id, value } = e.target
    setForm((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Password match validation
      if (form.password !== form.repeatPassword) {
        setError('Passwords do not match')
        setIsLoading(false)
        return
      }
      const response = await api.post('api/v1/user/register', form)

      if (response.data && response.data.success) {
        setSuccess('Registration successful')
        // Store any returned token if applicable
        if (response.data.token) {
          sessionStorage.setItem('accessToken', response.data.token)
        }
        setTimeout(() => {
          setSuccess(null)
          navigate('/dashboard')
        }, 2000)
      } else {
        setError(response.data?.message || 'Registration failed')
      }
    } catch (err) {
      console.error('Full error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      })

      const errorMessage =
        err.response?.data?.message || err.message || 'An error occurred during registration'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/dashboard')
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register New User</h1>
                  {error && (
                    <CAlert color="danger" className="text-center w-75 mx-auto">
                      {error}
                    </CAlert>
                  )}
                  {success && (
                    <CAlert color="success" className="text-center w-75 mx-auto">
                      {success}
                    </CAlert>
                  )}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="off"
                      id="username"
                      value={form.username}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="off"
                      id="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      type="email"
                      disabled={isLoading}
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
                      id="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
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
                      value={form.repeatPassword}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Role</CInputGroupText>
                    <CFormSelect
                      id="role"
                      value={form.role}
                      onChange={handleChange}
                      disabled={isLoading}
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="inspector">Inspector</option>
                      <option value="driver">Driver</option>
                    </CFormSelect>
                  </CInputGroup>

                  <CButton color="success" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <CSpinner size="sm" /> Loading...
                      </>
                    ) : (
                      'Create'
                    )}
                  </CButton>
                  <CButton
                    color="secondary"
                    className="ms-2"
                    onClick={handleBack}
                    disabled={isLoading}
                  >
                    Back
                  </CButton>
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
