// import React, { useState } from 'react'
// import axios from 'axios'
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardGroup,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CAlert,
//   CRow,
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { cilLockLocked, cilUser } from '@coreui/icons'
// import { useNavigate } from 'react-router-dom'
// import api from '../../../utils/api'

// const Login = () => {
//   const initialState = {
//     username: '',
//     password: '',
//   }
//   const [data, setData] = useState(initialState)

//   const [success, setSuccess] = useState(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState('')
//   const navigate = useNavigate()

//   const handleChange = (e) => {
//     const { id, value } = e.target
//     setData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError('')
//     try {
//       const response = await api.post('api/v1/user/login', data)
//       if (response.data.success) {
//         const { accessToken, refreshToken, user } = response.data

//         // Check if refreshToken exists before storing
//         if (!refreshToken) {
//           throw new Error('Refresh token not received from server')
//         }
//         sessionStorage.setItem('accessToken', accessToken)
//         sessionStorage.setItem('refreshToken', refreshToken) // Store refresh token
//         sessionStorage.setItem('user', JSON.stringify(user))
//         setSuccess(response.data.message)
//         setTimeout(() => {
//           navigate('/dashboard')
//           setSuccess(null)
//         }, 2000)
//       }
//     } catch (error) {
//       // setError(error.response.data.message)
//       setError(error.response?.data?.message || error.message)
//       setTimeout(() => {
//         setError(null)
//       }, 5000)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
//       <CContainer>
//         <CRow className="justify-content-center">
//           {/* Adjust column sizes for different breakpoints */}
//           <CCol xs={12} sm={10} md={8} lg={6} xl={4}>
//             <CCardGroup>
//               <CCard className="p-4">
//                 <CCardBody>
//                   <CForm onSubmit={handleSubmit}>
//                     <h1 className="text-center mb-3">Login</h1>
//                     <p className="text-body-secondary text-center mb-4">Sign In to your account</p>
//                     {success && (
//                       <CAlert color="success" className="text-success mb-3">
//                         {success}
//                       </CAlert>
//                     )}
//                     {error && (
//                       <CAlert color="danger" className="text-danger mb-3">
//                         {error}
//                       </CAlert>
//                     )}
//                     <CInputGroup className="mb-3">
//                       <CInputGroupText>
//                         <CIcon icon={cilUser} />
//                       </CInputGroupText>
//                       <CFormInput
//                         type="text"
//                         placeholder="Username"
//                         autoComplete="off"
//                         id="username"
//                         required
//                         value={data.username}
//                         onChange={handleChange}
//                       />
//                     </CInputGroup>

//                     <CInputGroup className="mb-4">
//                       <CInputGroupText>
//                         <CIcon icon={cilLockLocked} />
//                       </CInputGroupText>
//                       <CFormInput
//                         type="password"
//                         placeholder="Password"
//                         autoComplete="off"
//                         id="password"
//                         required
//                         value={data.password}
//                         onChange={handleChange}
//                       />
//                     </CInputGroup>

//                     <CRow className="justify-content-center">
//                       <CCol xs={12} sm={8} md={6}>
//                         <CButton
//                           color="primary"
//                           className="px-4 w-100"
//                           type="submit"
//                           disabled={isLoading}
//                         >
//                           {isLoading ? 'Logging in...' : 'Login'}
//                         </CButton>
//                       </CCol>
//                     </CRow>
//                   </CForm>
//                 </CCardBody>
//               </CCard>
//             </CCardGroup>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   )
// }

// export default Login

import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
  const { showToast, showSuccess, showError } = useToast()
  const initialState = {
    username: '',
    password: '',
  }
  const [data, setData] = useState(initialState)
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
      // Cleanup script on unmount
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

        // Check if refreshToken exists before storing
        if (!refreshToken) {
          throw new Error('Refresh token not received from server')
        }
        sessionStorage.setItem('accessToken', accessToken)
        sessionStorage.setItem('refreshToken', refreshToken) // Store refresh token
        sessionStorage.setItem('user', JSON.stringify(user))
        showSuccess(response.data.message)
        setData(initialState)
        setTimeout(() => {
          navigate('/dashboard')
          setSuccess(null)
        }, 2000)
      }
    } catch (error) {
      // setError(error.response.data.message)
      setError(error.response?.data?.message || error.message)
      setData(initialState)
      setTimeout(() => {
        setError(null)
      }, 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          {/* Adjust column sizes for different breakpoints */}
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
                      />
                    </CInputGroup>
                    <div ref={window.recaptchaContainer} />
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          type="submit"
                          color="primary"
                          className="px-4"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Logging in...' : 'Login'}
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
