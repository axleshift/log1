/* eslint-disable prettier/prettier */
import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { CButton, CSpinner } from '@coreui/react'

const DeleteDriver = ({ driver, onDeleteDriver }) => {
  const token = sessionStorage.getItem('accessToken')
  const API = import.meta.env.VITE_APP_API_URL
  const api = axios.create({
    baseURL: API,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await api.delete(`/api/v1/driver/${driver._id}`)
      if (response.status === 200) {
        alert('Driver deleted successfully')
        onDeleteDriver(driver._id)
        setLoading(false)
        setError(null)
      }
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <CButton
        color="danger"
        variant="outline"
        onClick={handleDelete}
        className="me-2"
        disabled={loading}
      >
        {loading ? <CSpinner size="sm" /> : <FontAwesomeIcon icon={faTrash} />}
      </CButton>
    </>
  )
}

export default DeleteDriver
