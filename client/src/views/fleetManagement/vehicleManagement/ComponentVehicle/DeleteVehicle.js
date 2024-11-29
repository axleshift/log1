import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { CButton, CSpinner } from '@coreui/react'

const DeleteVehicle = (props) => {
  const API_URL = import.meta.env.VITE_APP_API_URL
  const api = axios.create({
    baseURL: API_URL,
  })
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    const response = await api.delete(`/api/v1/vehicle/${props.vehicle._id}`)
    if (response.status === 200) {
      alert('Vehicle deleted successfully')
      setLoading(false)
    }
  }
  return (
    <>
      <CButton color="danger" disabled={loading} onClick={handleDelete}>
        {loading ? <CSpinner size="sm" /> : <FontAwesomeIcon icon={faTrash} />}
      </CButton>
    </>
  )
}

export default DeleteVehicle
