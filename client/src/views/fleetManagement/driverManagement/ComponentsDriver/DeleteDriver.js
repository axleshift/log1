/* eslint-disable prettier/prettier */
import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { CButton } from '@coreui/react'

const DeleteDriver = (props) => {
  const API_URL = import.meta.env.VITE_APP_API_URL
  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // This is important for cookies
  })
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    const response = await api.delete(`/api/v1/driver/${props.driver._id}`)
    if (response.status === 200) {
      alert('Driver deleted successfully')
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

export default DeleteDriver
