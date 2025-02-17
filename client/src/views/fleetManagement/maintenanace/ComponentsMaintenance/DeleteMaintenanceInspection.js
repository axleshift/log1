import React, { useState } from 'react'
import axios from 'axios'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CButton, CSpinner } from '@coreui/react'
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
const DeleteMaintenanceInspection = (props) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleDelete = async () => {
    setLoading(true)
    const response = await api.delete(`/api/v1/maintenance/inspection/${props.item._id}`)
    if (response.status === 200) {
      alert('Maintenance Inspection deleted successfully')
      setLoading(false)
      setError(null)
    } else {
      setLoading(false)
      setError(response.data.message)
    }
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

export default DeleteMaintenanceInspection
