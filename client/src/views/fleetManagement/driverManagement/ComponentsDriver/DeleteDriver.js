import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { CButton, CSpinner } from '@coreui/react'
import api from '../../../../utils/api'
const DeleteDriver = ({ driver, onDeleteDriver }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await api.delete(`/api/v1/driver/${driver._id}`)
      if (response.status === 200) {
        alert('Driver deleted successfully')
        onDeleteDriver(driver._id)
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
