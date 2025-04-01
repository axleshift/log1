import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CAlert,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import api from '../../../utils/api'
import { useToast } from '../../../components/Toast/Toast'

const Login = () => {
  const { showSuccess, showError } = useToast()
  const initialState = {
    username: '',
    password: '',
    isActive: true,
  }
  const [data, setData] = useState(initialState)
  const [isLocked, setIsLocked] = useState(false)
  const [lockTimer, setLockTimer] = useState(0)
  const [attemptsLeft, setAttemptsLeft] = useState(5)
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  useEffect(() => {
    let timer
    if (isLocked && lockTimer > 0) {
      timer = setInterval(() => {
        setLockTimer((prev) => {
          if (prev <= 1) {
            setIsLocked(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [isLocked, lockTimer])

  useEffect(() => {
    const loadRecaptcha = () => {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`
      script.async = true
      script.defer = true

      script.onload = () => {
        console.log('reCAPTCHA v3 script loaded')
        showSuccess('reCAPTCHA v3 script loaded')
      }

      script.onerror = () => {
        console.error('Error loading reCAPTCHA v3 script')
        showError('Error loading reCAPTCHA v3 script')
      }

      document.head.appendChild(script)
    }

    loadRecaptcha()

    return () => {
      const script = document.querySelector('script[src*="recaptcha"]')
      if (script) {
        script.remove()
      }
    }
  }, [])

  const executeRecaptcha = async () => {
    try {
      return await window.grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, {
        action: 'login',
      })
    } catch (error) {
      console.error('reCAPTCHA execution error:', error)
      showError('reCAPTCHA execution error', error)
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    const token = await executeRecaptcha()
    try {
      const response = await api.post('api/v1/user/login', {
        ...data,
        recaptchaToken: token,
      })

      if (response.data.success) {
        const { accessToken, refreshToken, user } = response.data

        setAttemptsLeft(5)
        setIsLocked(false)

        if (!refreshToken) {
          throw new Error('Refresh token not received from server')
        }
        sessionStorage.setItem('accessToken', accessToken)
        sessionStorage.setItem('refreshToken', refreshToken)
        sessionStorage.setItem('user', JSON.stringify(user))
        showSuccess(response.data.message)
        setData(initialState)
        setTimeout(() => {
          navigate('/dashboard')
          setSuccess(null)
        }, 2000)
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response

        // Handle temporary lock
        if (data.isLocked) {
          setIsLocked(true)
          const timeLeft = Math.ceil((new Date(data.lockUntil) - new Date()) / 1000)
          setLockTimer(timeLeft)
        }

        if (data.isDeactivated) {
          showError('Account has been deactivated. Please contact an administrator.')
        }

        if (data.attemptsLeft !== undefined) {
          setAttemptsLeft(data.attemptsLeft)
          showError(`Invalid credentials. ${data.attemptsLeft} attempts left`)
        }

        if (error.response?.status === 403) {
          showError(error.response.data.message)
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol xs={12} sm={10} md={8} lg={6} xl={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1 className="text-center mb-3">Login</h1>
                    <p className="text-body-secondary text-center mb-4">Sign In to your account</p>

                    {success && (
                      <CAlert color="success" className="text-success mb-3">
                        {success}
                      </CAlert>
                    )}

                    {error && (
                      <CAlert color="danger" className="text-danger mb-3">
                        {error}
                      </CAlert>
                    )}

                    {isLocked && (
                      <CAlert color="warning" className="mb-3">
                        Account temporarily locked. Please wait {Math.floor(lockTimer / 60)}:
                        {(lockTimer % 60).toString().padStart(2, '0')} minutes.
                      </CAlert>
                    )}

                    {!isLocked && attemptsLeft < 5 && attemptsLeft > 0 && (
                      <CAlert color="warning" className="mb-3">
                        Warning: {attemptsLeft} {attemptsLeft === 1 ? 'attempt' : 'attempts'}{' '}
                        remaining before temporary lock
                      </CAlert>
                    )}

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Username"
                        autoComplete="off"
                        id="username"
                        required
                        value={data.username}
                        onChange={handleChange}
                        disabled={isLocked || isLoading}
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                        id="password"
                        required
                        value={data.password}
                        onChange={handleChange}
                        disabled={isLocked || isLoading}
                      />
                    </CInputGroup>
                    <div ref={window.recaptchaContainer} />
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          type="submit"
                          color="primary"
                          className="px-4"
                          disabled={isLocked || isLoading}
                        >
                          {isLocked
                            ? `Locked (${Math.floor(lockTimer / 60)}:${(lockTimer % 60).toString().padStart(2, '0')})`
                            : isLoading
                              ? 'Logging in...'
                              : 'Login'}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
