import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { CButton, CSpinner } from '@coreui/react'

const DeleteVehicle = ({ vehicle, onDeleteVehicle }) => {
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
      if (response.status === 200) {
        alert('Vehicle deleted successfully')
        setLoading(false)
        onDeleteVehicle(vehicle._id)
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
      <CButton color="danger" variant="outline" disabled={loading} onClick={handleDelete}>
        {loading ? <CSpinner size="sm" /> : <FontAwesomeIcon icon={faTrash} />}
      </CButton>
    </>
  )
}

export default DeleteVehicle
