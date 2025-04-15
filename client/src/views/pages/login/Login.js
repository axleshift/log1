// import React, { useState, useEffect } from 'react'
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
// import { cilLockLocked, cilUser, cilEnvelopeClosed } from '@coreui/icons'
// import { useNavigate } from 'react-router-dom'
// import api from '../../../utils/api'
// import { useToast } from '../../../components/Toast/Toast'

// const Login = () => {
//   const { showSuccess, showError } = useToast()
//   const initialState = {
//     username: '',
//     password: '',
//     isActive: true,
//   }
//   const [data, setData] = useState(initialState)
//   const [isLocked, setIsLocked] = useState(false)
//   const [lockTimer, setLockTimer] = useState(0)
//   const [attemptsLeft, setAttemptsLeft] = useState(5)
//   const [success, setSuccess] = useState(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState('')
//   const navigate = useNavigate()

//   // New states for verification
//   const [showVerification, setShowVerification] = useState(false)
//   const [verificationCode, setVerificationCode] = useState('')
//   const [canResend, setCanResend] = useState(false)
//   const [resendTimer, setResendTimer] = useState(0)

//   const handleChange = (e) => {
//     const { id, value } = e.target
//     setData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }))
//   }

//   // Existing lock timer effect
//   useEffect(() => {
//     let timer
//     if (isLocked && lockTimer > 0) {
//       timer = setInterval(() => {
//         setLockTimer((prev) => {
//           if (prev <= 1) {
//             setIsLocked(false)
//             return 0
//           }
//           return prev - 1
//         })
//       }, 1000)
//     }

//     return () => {
//       if (timer) {
//         clearInterval(timer)
//       }
//     }
//   }, [isLocked, lockTimer])

//   // New resend timer effect
//   useEffect(() => {
//     let timer
//     if (resendTimer > 0) {
//       timer = setInterval(() => {
//         setResendTimer((prev) => {
//           if (prev <= 1) {
//             setCanResend(true)
//             return 0
//           }
//           return prev - 1
//         })
//       }, 1000)
//     }

//     return () => {
//       if (timer) {
//         clearInterval(timer)
//       }
//     }
//   }, [resendTimer])

//   // Existing reCAPTCHA effects and function
//   useEffect(() => {
//     const loadRecaptcha = () => {
//       const script = document.createElement('script')
//       script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`
//       script.async = true
//       script.defer = true

//       script.onload = () => {
//         console.log('reCAPTCHA v3 script loaded')
//         showSuccess('reCAPTCHA v3 script loaded')
//       }

//       script.onerror = () => {
//         console.error('Error loading reCAPTCHA v3 script')
//         showError('Error loading reCAPTCHA v3 script')
//       }

//       document.head.appendChild(script)
//     }

//     loadRecaptcha()

//     return () => {
//       const script = document.querySelector('script[src*="recaptcha"]')
//       if (script) {
//         script.remove()
//       }
//     }
//   }, [])

//   const executeRecaptcha = async () => {
//     try {
//       return await window.grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, {
//         action: 'login',
//       })
//     } catch (error) {
//       console.error('reCAPTCHA execution error:', error)
//       showError('reCAPTCHA execution error', error)
//       throw error
//     }
//   }

//   // New function to handle resending verification code
//   const handleResendCode = async () => {
//     try {
//       setCanResend(false)
//       setResendTimer(60) // 60 seconds cooldown

//       const response = await api.post('api/v1/user/resend-verification', {
//         username: data.username,
//       })

//       if (response.data.success) {
//         showSuccess('New verification code sent to your email')
//       } else {
//         showError(response.data.message)
//       }
//     } catch (error) {
//       showError('Failed to resend verification code')
//     }
//   }

//   // Modified submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError('')
//     const token = await executeRecaptcha()
//     try {
//       const response = await api.post('api/v1/user/login', {
//         ...data,
//         verificationCode: showVerification ? verificationCode : undefined,
//         recaptchaToken: token,
//       })

//       if (response.data.requiresVerification) {
//         setShowVerification(true)
//         setCanResend(false)
//         setResendTimer(60)
//         showSuccess('Verification code sent to your email')
//         setIsLoading(false)
//         return
//       }

//       if (response.data.success) {
//         const { accessToken, refreshToken, user } = response.data

//         setAttemptsLeft(5)
//         setIsLocked(false)

//         if (!refreshToken) {
//           throw new Error('Refresh token not received from server')
//         }
//         sessionStorage.setItem('accessToken', accessToken)
//         sessionStorage.setItem('refreshToken', refreshToken)
//         sessionStorage.setItem('user', JSON.stringify(user))
//         showSuccess(response.data.message)
//         setData(initialState)
//         setTimeout(() => {
//           navigate('/dashboard')
//           setSuccess(null)
//         }, 2000)
//       }
//     } catch (error) {
//       if (error.response) {
//         const { data } = error.response

//         if (data.isLocked) {
//           setIsLocked(true)
//           const timeLeft = Math.ceil((new Date(data.lockUntil) - new Date()) / 1000)
//           setLockTimer(timeLeft)
//         }

//         if (data.isDeactivated) {
//           showError('Account has been deactivated. Please contact an administrator.')
//         }

//         if (data.attemptsLeft !== undefined) {
//           setAttemptsLeft(data.attemptsLeft)
//           showError(`Invalid credentials. ${data.attemptsLeft} attempts left`)
//         }

//         if (error.response?.status === 403) {
//           showError(error.response.data.message)
//         }
//       }
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
//       <CContainer>
//         <CRow className="justify-content-center">
//           <CCol xs={12} sm={10} md={8} lg={6} xl={4}>
//             <CCardGroup>
//               <CCard className="p-4">
//                 <CCardBody>
//                   <CForm onSubmit={handleSubmit}>
//                     <h1 className="text-center mb-3">Login</h1>
//                     <p className="text-body-secondary text-center mb-4">
//                       {showVerification ? 'Enter verification code' : 'Sign In to your account'}
//                     </p>

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

//                     {isLocked && (
//                       <CAlert color="warning" className="mb-3">
//                         Account temporarily locked. Please wait {Math.floor(lockTimer / 60)}:
//                         {(lockTimer % 60).toString().padStart(2, '0')} minutes.
//                       </CAlert>
//                     )}

//                     {!isLocked && attemptsLeft < 5 && attemptsLeft > 0 && (
//                       <CAlert color="warning" className="mb-3">
//                         Warning: {attemptsLeft} {attemptsLeft === 1 ? 'attempt' : 'attempts'}{' '}
//                         remaining before temporary lock
//                       </CAlert>
//                     )}

//                     {!showVerification ? (
//                       <>
//                         <CInputGroup className="mb-3">
//                           <CInputGroupText>
//                             <CIcon icon={cilUser} />
//                           </CInputGroupText>
//                           <CFormInput
//                             type="text"
//                             placeholder="Username"
//                             autoComplete="off"
//                             id="username"
//                             required
//                             value={data.username}
//                             onChange={handleChange}
//                             disabled={isLocked || isLoading}
//                           />
//                         </CInputGroup>

//                         <CInputGroup className="mb-4">
//                           <CInputGroupText>
//                             <CIcon icon={cilLockLocked} />
//                           </CInputGroupText>
//                           <CFormInput
//                             type="password"
//                             placeholder="Password"
//                             autoComplete="off"
//                             id="password"
//                             required
//                             value={data.password}
//                             onChange={handleChange}
//                             disabled={isLocked || isLoading}
//                           />
//                         </CInputGroup>
//                       </>
//                     ) : (
//                       <>
//                         <CInputGroup className="mb-4">
//                           <CInputGroupText>
//                             <CIcon icon={cilEnvelopeClosed} />
//                           </CInputGroupText>
//                           <CFormInput
//                             type="text"
//                             placeholder="Enter verification code"
//                             autoComplete="off"
//                             value={verificationCode}
//                             onChange={(e) => setVerificationCode(e.target.value)}
//                             required
//                             disabled={isLocked || isLoading}
//                           />
//                         </CInputGroup>
//                         <CButton
//                           color="link"
//                           className="px-0 mb-4"
//                           onClick={handleResendCode}
//                           disabled={!canResend}
//                         >
//                           {resendTimer > 0
//                             ? `Resend code in ${resendTimer}s`
//                             : 'Resend verification code'}
//                         </CButton>
//                       </>
//                     )}

//                     <div ref={window.recaptchaContainer} />
//                     <CRow>
//                       <CCol xs={6}>
//                         <CButton
//                           type="submit"
//                           color="primary"
//                           className="px-4"
//                           disabled={isLocked || isLoading}
//                         >
//                           {isLocked
//                             ? `Locked (${Math.floor(lockTimer / 60)}:${(lockTimer % 60)
//                                 .toString()
//                                 .padStart(2, '0')})`
//                             : isLoading
//                               ? 'Logging in...'
//                               : showVerification
//                                 ? 'Verify'
//                                 : 'Login'}
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
import { cilLockLocked, cilUser, cilEnvelopeClosed } from '@coreui/icons'
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
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showVerification, setShowVerification] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [isDeactivated, setIsDeactivated] = useState(false)
  const [canResend, setCanResend] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  const navigate = useNavigate()

  const resetStates = () => {
    setIsLocked(false)
    setLockTimer(0)
    setAttemptsLeft(5)
    setLoginAttempts(0)
    setIsDeactivated(false)
    setError('')
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  // Lock timer effect
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

  // Resend timer effect
  useEffect(() => {
    let timer
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true)
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
  }, [resendTimer])

  // reCAPTCHA effect
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
      showError('reCAPTCHA execution error')
      throw error
    }
  }

  const handleResendCode = async () => {
    try {
      setCanResend(false)
      setResendTimer(60)

      const response = await api.post('api/v1/user/resend-verification', {
        username: data.username,
      })

      if (response.data.success) {
        showSuccess('New verification code sent to your email')
      }
    } catch (error) {
      showError('Failed to resend verification code')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const token = await executeRecaptcha()
      const response = await api.post('api/v1/user/login', {
        ...data,
        verificationCode: showVerification ? verificationCode : undefined,
        recaptchaToken: token,
      })

      if (response.data.requiresVerification) {
        setShowVerification(true)
        setCanResend(false)
        setResendTimer(60)
        showSuccess('Verification code sent to your email')
        setIsLoading(false)
        return
      }

      if (response.data.success) {
        const { accessToken, refreshToken, user } = response.data
        resetStates()
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('user', JSON.stringify(user))
        showSuccess(response.data.message)
        setData(initialState)
        setTimeout(() => {
          navigate('/dashboard')
          setSuccess(null)
        }, 2000)
      }
    } catch (error) {
      if (error.response) {
        const { data, status } = error.response

        if (status === 403 && data.isDeactivated) {
          setIsDeactivated(true)
          showError(
            'Account has been deactivated due to too many failed attempts. Please contact support.',
          )
        } else if (status === 423 && data.isLocked) {
          setIsLocked(true)
          setLockTimer(data.timeLeft || Math.ceil((new Date(data.lockUntil) - new Date()) / 1000))
          setAttemptsLeft(data.attemptsLeft)
          setLoginAttempts(data.loginAttempts || 5)
          showError(
            `Account temporarily locked. ${data.attemptsLeft} attempts remaining before deactivation.`,
          )
        } else if (status === 401) {
          setAttemptsLeft(data.attemptsLeft)
          setLoginAttempts(data.loginAttempts || 0)
          showError(data.message)
        } else {
          showError(data.message || 'An error occurred')
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
                    <p className="text-body-secondary text-center mb-4">
                      {showVerification ? 'Enter verification code' : 'Sign In to your account'}
                    </p>

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

                    {/* First warning - before temporary lock */}
                    {!isLocked && !isDeactivated && attemptsLeft < 5 && attemptsLeft > 0 && (
                      <CAlert color="warning" className="mb-3">
                        Warning: {attemptsLeft} {attemptsLeft === 1 ? 'attempt' : 'attempts'}{' '}
                        remaining before temporary lock
                      </CAlert>
                    )}

                    {/* Second warning - after lock, before deactivation */}
                    {!isDeactivated && attemptsLeft <= 5 && loginAttempts >= 5 && (
                      <CAlert color="danger" className="mb-3">
                        Warning: Account will be deactivated after {attemptsLeft} more failed{' '}
                        {attemptsLeft === 1 ? 'attempt' : 'attempts'}
                      </CAlert>
                    )}

                    {/* Lock message */}
                    {isLocked && (
                      <CAlert color="warning" className="mb-3">
                        Account temporarily locked. Please wait {Math.floor(lockTimer / 60)}:
                        {(lockTimer % 60).toString().padStart(2, '0')} minutes.
                        {attemptsLeft > 0 &&
                          ` ${attemptsLeft} attempts remaining before deactivation.`}
                      </CAlert>
                    )}

                    {/* Deactivation message */}
                    {isDeactivated && (
                      <CAlert color="danger" className="mb-3">
                        Your account has been deactivated due to too many failed attempts. Please
                        contact support to reactivate your account.
                      </CAlert>
                    )}

                    {!showVerification ? (
                      <>
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
                            disabled={isLocked || isLoading || isDeactivated}
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
                            disabled={isLocked || isLoading || isDeactivated}
                          />
                        </CInputGroup>
                      </>
                    ) : (
                      <>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilEnvelopeClosed} />
                          </CInputGroupText>
                          <CFormInput
                            type="text"
                            placeholder="Enter verification code"
                            autoComplete="off"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                            disabled={isLocked || isLoading || isDeactivated}
                          />
                        </CInputGroup>
                        <CButton
                          color="link"
                          className="px-0 mb-4"
                          onClick={handleResendCode}
                          disabled={!canResend}
                        >
                          {resendTimer > 0
                            ? `Resend code in ${resendTimer}s`
                            : 'Resend verification code'}
                        </CButton>
                      </>
                    )}

                    <div ref={window.recaptchaContainer} />
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          type="submit"
                          color="primary"
                          className="px-4"
                          disabled={isLocked || isLoading || isDeactivated}
                        >
                          {isDeactivated
                            ? 'Account Deactivated'
                            : isLocked
                              ? `Locked (${Math.floor(lockTimer / 60)}:${(lockTimer % 60)
                                  .toString()
                                  .padStart(2, '0')})`
                              : isLoading
                                ? 'Logging in...'
                                : showVerification
                                  ? 'Verify'
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
