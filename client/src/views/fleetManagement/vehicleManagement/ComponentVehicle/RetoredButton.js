import React, { useState } from 'react'
import { CButton, CSpinner } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { useToast } from '../../../../components/Toast/Toast'
import api from '../../../../utils/api'

const RestoreButton = ({ restoredVehicle, onRestoreVehicle }) => {
  const [loading, setLoading] = useState(false)
  const { showSuccess, showError } = useToast()
  const [localError, setLocalError] = useState(null)

  const handleRestore = async () => {
    setLoading(true)
    try {
      const response = await api.patch(`/api/v1/vehicle/restore/${restoredVehicle}`)
      if (response.data.success) {
        showSuccess(response.data.message)

        // Call the callback function to update the parent component
        onRestoreVehicle(response.data.data)
      }
    } catch (error) {
      showError(error.response?.data?.message || 'Error restoring vehicle')
      console.error('Error restoring vehicle:', error)
      // Handle error
    } finally {
      setLoading(false)
    }
  }

  return (
    <CButton color="success" size="sm" onClick={handleRestore} disabled={loading} className="mx-1">
      {loading ? (
        <CSpinner size="sm" />
      ) : (
        <>
          <FontAwesomeIcon icon={faRotateLeft} className="me-1" />
          Restore
        </>
      )}
    </CButton>
  )
}

export default RestoreButton
