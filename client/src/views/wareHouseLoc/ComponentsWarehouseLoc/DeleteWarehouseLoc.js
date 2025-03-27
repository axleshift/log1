import React, { useState } from 'react'
import { CButton, CSpinner, CAlert } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import api from '../../../utils/api'
import { useToast } from '../../../components/Toast/Toast'

const DeleteWarehouseLoc = ({ warehouseLoc, onDeleteWarehouseLoc }) => {
  const { showSuccess, showError } = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const deleteWarehouseLoc = async () => {
    setLoading(true)
    try {
      const response = await api.patch(`api/v1/warehouseLoc/delete/${warehouseLoc._id}`)
      if (response.data.success) {
        showSuccess(response.data.message)
        onDeleteWarehouseLoc(warehouseLoc._id)
        setLoading(false)
        setError(null)
      }
    } catch (err) {
      setError(err)
      showError(err.message)
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
        disabled={loading}
        variant="outline"
        onClick={deleteWarehouseLoc}
        className="me-2"
      >
        {loading ? <CSpinner size="sm" /> : <FontAwesomeIcon icon={faTrash} />} Delete
      </CButton>
    </>
  )
}

export default DeleteWarehouseLoc
