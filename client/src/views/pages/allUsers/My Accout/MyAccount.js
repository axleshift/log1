import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CAlert,
  CSpinner,
  CImage,
  CContainer,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import api from '../../../../utils/api'
import avarat1 from '../../../../assets/images/avatars/1.jpg'

const MyAccount = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [preview, setPreview] = useState(null)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    photo: null,
  })

  const API_URL = import.meta.env.VITE_APP_API_URL
  const token = sessionStorage.getItem('accessToken')

  // Fetch user data
  const fetchUserData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Get the token from sessionStorage
      const token = sessionStorage.getItem('accessToken')

      const response = await api.get('/api/v1/user/profile')

      if (response.data.success) {
        setUser(response.data.data)
        // ... rest of your success handling code
        setForm((prev) => ({
          ...prev,
          username: response.data.data.username,
          email: response.data.data.email,
          photo: null,
        }))
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
    // Check if token exists
    if (!token) {
      navigate('/login')
      return
    }

    fetchUserData()
  }, [])

  const handleChange = (e) => {
    const { id, value } = e.target
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
        role: user.role || '',
        photo: null,
      })

      // Update preview URL handling
      if (user.photo) {
        const photoUrl = user.photo.startsWith('http')
          ? user.photo
          : `${API_URL}/uploads/profiles/${user.photo}`
        setPreview(photoUrl)
      } else {
        setPreview(avarat1)
      }
    }
  }, [user, API_URL])

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setForm((prev) => ({
        ...prev,
        photo: file,
      }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const HomeButton = () => {
    navigate('/dashboard')
  }
  const cancelEdit = () => {
    setIsEditing(false)
    setPreview(null)
    setForm((prev) => ({
      ...prev,
      username: user.username,
      email: user.email,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      photo: null,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Validate passwords if changing
      if (form.newPassword || form.confirmPassword) {
        if (!form.currentPassword) {
          throw new Error('Current password is required to set new password')
        }
        if (form.newPassword !== form.confirmPassword) {
          throw new Error('New passwords do not match')
        }
      }

      const formData = new FormData()
      formData.append('username', form.username)
      formData.append('email', form.email)

      if (form.currentPassword) {
        formData.append('currentPassword', form.currentPassword)
      }
      if (form.newPassword) {
        formData.append('newPassword', form.newPassword)
      }
      if (form.photo) {
        formData.append('photo', form.photo)
      }

      const response = await api.put('/api/v1/user/update-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success) {
        setSuccess('Profile updated successfully')
        setUser(response.data.data)
        setIsEditing(false)

        // Clear sensitive form fields
        setForm((prev) => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }))
      } else {
        throw new Error(response.data.message || 'Failed to update profile')
      }
    } catch (err) {
      console.error('Profile update error:', err)
      setError(err.response?.data?.message || err.message)

      // Handle unauthorized error
      if (err.response?.status === 401) {
        sessionStorage.removeItem('accessToken')
        navigate('/login')
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading && !user) {
    return (
      <CContainer
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '200px' }}
      >
        <CSpinner />
      </CContainer>
    )
  }

  return (
    <CContainer className="mt-4">
      <CRow>
        <CCol md={8} className="mx-auto">
          <CCard>
            <CCardHeader>
              <h4 className="mb-0">My Account</h4>
            </CCardHeader>
            <CCardBody>
              {error && (
                <CAlert color="danger" dismissible onClose={() => setError(null)}>
                  {error}
                </CAlert>
              )}
              {success && (
                <CAlert color="success" dismissible onClose={() => setSuccess(null)}>
                  {success}
                </CAlert>
              )}

              {user && (
                <CForm onSubmit={handleSubmit}>
                  <CRow className="mb-3">
                    <CCol md={4} className="text-center">
                      <CImage rounded src={preview} width={150} height={150} className="mb-3" />
                    </CCol>

                    <CCol md={8}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="username">Username</CFormLabel>
                        <CFormInput
                          type="text"
                          id="username"
                          autoComplete="off"
                          value={form.username}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="email">Email</CFormLabel>
                        <CFormInput
                          type="email"
                          id="email"
                          autoComplete="off"
                          value={form.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>

                      {isEditing && (
                        <>
                          <div className="mb-3">
                            <CFormLabel htmlFor="currentPassword">Current Password</CFormLabel>
                            <CFormInput
                              type="password"
                              id="currentPassword"
                              value={form.currentPassword}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-3">
                            <CFormLabel htmlFor="newPassword">New Password</CFormLabel>
                            <CFormInput
                              type="password"
                              id="newPassword"
                              value={form.newPassword}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-3">
                            <CFormLabel htmlFor="confirmPassword">Confirm Password</CFormLabel>
                            <CFormInput
                              type="password"
                              id="confirmPassword"
                              value={form.confirmPassword}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-3">
                            <CFormLabel htmlFor="photo">Profile Photo</CFormLabel>
                            <CFormInput
                              type="file"
                              id="photo"
                              onChange={handlePhotoChange}
                              accept="image/*"
                            />
                          </div>
                        </>
                      )}
                    </CCol>
                  </CRow>

                  <div className="d-flex justify-content-end">
                    {!isEditing ? (
                      <>
                        <CButton
                          color="primary"
                          variant="outline"
                          onClick={() => setIsEditing(true)}
                        >
                          Edit Profile
                        </CButton>

                        <CButton
                          className="ms-2"
                          color="secondary"
                          variant="outline"
                          onClick={HomeButton}
                        >
                          Dashboard
                        </CButton>
                      </>
                    ) : (
                      <>
                        <CButton
                          color="secondary"
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false)
                            cancelEdit
                          }}
                          className="me-2"
                        >
                          Cancel
                        </CButton>
                        <CButton color="primary" variant="outline" type="submit" disabled={loading}>
                          {loading ? <CSpinner size="sm" /> : 'Save Changes'}
                        </CButton>
                      </>
                    )}
                  </div>
                </CForm>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default MyAccount
