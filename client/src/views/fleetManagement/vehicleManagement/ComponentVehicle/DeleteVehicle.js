import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { CButton, CSpinner, CAlert } from '@coreui/react'
import { useToast } from '../../../../components/Toast/Toast'

const DeleteVehicle = ({ vehicle, onDeleteVehicle }) => {
  const { showSuccess, showErrors } = useToast()
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
      const response = await api.delete(`/api/v1/vehicle/${vehicle._id}`)
      if (response.data.success) {
        showSuccess(response.data.message)
        setLoading(false)
        onDeleteVehicle(vehicle._id)
        setLoading(false)
        setError(null)
      }
    } catch (error) {
      setError(error)
      showErrors(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <CAlert color="danger" className="text-center mt-5 w-75 mx-auto">
        Error: {error.message}
      </CAlert>
    )
  }

  return (
    <>
      <CButton
        color="danger"
        variant="outline"
        disabled={loading}
        onClick={handleDelete}
        className="me-2"
      >
        {loading ? <CSpinner size="sm" /> : <FontAwesomeIcon icon={faTrash} />}
      </CButton>
    </>
  )
}

export default DeleteVehicle
