import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
  CAlert,
  CSpinner,
  CFormLabel,
  CImage,
} from '@coreui/react'
import api from '../../../../utils/api'
import avatar1 from '../../../../assets/images/avatars/1.jpg'

const EditUser = ({ user, visible, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    photo: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [preview, setPreview] = useState(null)

  const API_URL = import.meta.env.VITE_APP_API_URL
  // const token = sessionStorage.getItem('accessToken')

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
        setPreview(null) // Reset preview if no photo is available
      }
    }
  }, [user, API_URL])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate passwords match if changing password
      if (form.password || form.confirmPassword) {
        if (form.password !== form.confirmPassword) {
          throw new Error('Passwords do not match')
        }
      }
      if (!user || !user._id) {
        console.error('No user ID available')
        return
      }
      const formData = new FormData()
      formData.append('username', form.username)
      formData.append('email', form.email)
      formData.append('role', form.role)

      if (form.password) {
        formData.append('password', form.password)
      }

      if (form.photo) {
        formData.append('photo', form.photo)
      }

      // Only append fields that have values
      // if (form.username) formData.append('username', form.username)
      // if (form.email) formData.append('email', form.email)
      // if (form.password) formData.append('password', form.password)
      // if (form.role) formData.append('role', form.role)
      // if (form.photo) formData.append('photo', form.photo)

      const response = await api.put(`/api/v1/user/update-user/${user._id}`, formData)

      if (response.data.success) {
        setSuccess('User updated successfully')
        onUpdate(response.data.data)
        setTimeout(() => {
          onClose()
        }, 2000)
      }
    } catch (err) {
      console.error('Error updating user:', err)
      setError(err.response?.data?.message || err.message || 'Failed to update user')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

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

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Edit User: {user?.username}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {error && <CAlert color="danger">{error}</CAlert>}
        {success && <CAlert color="success">{success}</CAlert>}

        <CForm onSubmit={handleSubmit}>
          <CFormInput
            id="username"
            value={form.username}
            onChange={handleChange}
            className="mb-3"
            placeholder="Enter username"
            autoComplete="off"
            floatingLabel="Username"
            required
          />

          <CFormInput
            type="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className="mb-3"
            placeholder="Enter email"
            autoComplete="off"
            floatingLabel="Email"
            required
          />
          <CFormLabel htmlFor="password">New Password (leave blank to keep current)</CFormLabel>
          <CFormInput
            type="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            className="mb-3"
            autoComplete="off"
            placeholder="New Password"
            floatingLabel="New Password"
          />

          <CFormInput
            type="password"
            id="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="mb-3"
            autoComplete="off"
            placeholder="Confirm Password"
            floatingLabel="Confirm Password"
          />

          <CFormSelect
            id="role"
            label="Role"
            value={form.role}
            onChange={handleChange}
            className="mb-3"
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="inspector">Inspector</option>
            <option value="driver">Driver</option>
          </CFormSelect>

          <CFormInput
            type="file"
            id="photo"
            label="Profile Photo"
            onChange={handlePhotoChange}
            accept="image/*"
            className="mb-3"
          />

          {preview && (
            <div className="mb-3">
              <CImage
                src={preview || avatar1}
                alt="Preview"
                align="center"
                rounded
                width={200}
                height={200}
                crossOrigin="anonymous"
                onError={(e) => {
                  e.target.onerror = null // Prevents infinite loop if avatar1 also fails
                  e.target.src = avatar1
                }}
              />
            </div>
          )}
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? <CSpinner size="sm" /> : 'Save Changes'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditUser
