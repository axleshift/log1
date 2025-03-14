import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { CButton, CSpinner, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react'
import api from '../../../../utils/api'
import { useToast } from '../../../../components/Toast/Toast'
const DeleteDriver = ({ driver, onDeleteDriver }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { showError, showSuccess } = useToast()

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await api.delete(`api/v1/driver/${driver._id}`)
      if (response.status === 200) {
        showSuccess(response.data.message)
        onDeleteDriver(driver._id)
        setLoading(false)
        setError(null)
      }
    } catch (error) {
      setError(error)
      showError(error.response.data.message)
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
