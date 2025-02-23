import React, { useState, useEffect } from 'react'
import { CAlert, CButton, CSpinner } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import api from '../../../utils/api'
import { useToast } from '../../../components/Toast/Toast'
const DeleteItem = ({ warehousing, onDeleteItem }) => {
  const { showError, showSuccess } = useToast()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleDelete = async () => {
    setLoading(true)
    const response = await api.delete(`/api/v1/warehouse/delete/${warehousing._id}`)
    if (response.data.success) {
      showSuccess(response.data.message)
      onDeleteItem(warehousing._id)
      setLoading(false)
    } else {
      setLoading(false)
      setError(response.data.message)
      showError(response.data.message)
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
