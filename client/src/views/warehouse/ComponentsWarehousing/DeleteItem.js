import React, { useState, useEffect } from 'react'
import { CAlert, CButton, CSpinner } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
const API = import.meta.env.VITE_APP_API_URL
const api = axios.create({
  baseURL: API,
})
const DeleteItem = ({ warehousing, onDeleteItem }) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleDelete = async () => {
    setLoading(true)
    const response = await api.delete(`/api/v1/warehouse/delete/${warehousing._id}`)
    if (response.status === 200) {
      alert('Item deleted successfully')
      onDeleteItem(warehousing._id)
      setLoading(false)
      setError(null)
    } else {
      setLoading(false)
      setError(response.data.message)
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
      <CButton color="danger" variant="outline" onClick={handleDelete} className="me-2">
        {loading ? <CSpinner size="sm" /> : <FontAwesomeIcon icon={faTrash} />}
      </CButton>
    </>
  )
}

export default DeleteItem
