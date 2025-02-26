import React, { useState } from 'react'
import axios from 'axios'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CButton, CSpinner } from '@coreui/react'
import api from '../../../../utils/api'
import { useToast } from '../../../../components/Toast/Toast'

const token = sessionStorage.getItem('accessToken')

const DeleteMaintenanceInspection = (props) => {
  const { showError, showSuccess } = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleDelete = async () => {
    setLoading(true)
    const response = await api.delete(`/api/v1/maintenance/inspection/${props.item._id}`)
    if (response.data.success) {
      showSuccess(response.data.message)
      setLoading(false)
      setError(null)
    } else {
      setLoading(false)
      setError(response.data.message)
      showError(response.data.message)
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
