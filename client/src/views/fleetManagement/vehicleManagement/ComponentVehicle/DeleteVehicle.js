import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { CButton } from '@coreui/react'

const DeleteVehicle = (props) => {
  const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5057'
  const api = axios.create({
    baseURL: API_URL,
  })

  const handleDelete = async () => {
    const response = await api.delete(`/api/v1/vehicle/${props.vehicle._id}`)
    if (response.status === 200) {
      alert('Vehicle deleted successfully')
    }
  }
  return (
    <>
      <CButton color="danger" variant="outline" onClick={handleDelete} className="me-2">
        <FontAwesomeIcon icon={faTrash} />
      </CButton>
    </>
  )
}

export default DeleteVehicle
