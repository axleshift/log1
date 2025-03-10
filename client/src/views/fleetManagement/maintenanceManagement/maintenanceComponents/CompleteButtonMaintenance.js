import React, { useEffect, useState } from 'react'
import { CButton } from '@coreui/react'
import api from '../../../../utils/api'
import { useToast } from '../../../../components/Toast/Toast'
import { getRole, getUsername } from '../../../../utils/auth'
const CompleteButtonMaintenance = ({ onCompleted, maintenance }) => {
  const { showSuccess, showError } = useToast()
  const role = getRole()
  const adminRoles = ['admin', 'chief mechanic']

  if (!maintenance || !maintenance.checklist) {
    return null // or return a loading state/placeholder
  }

  const handleCompleteMaintenance = async (maintenanceId) => {
    try {
      const username = getUsername()
      const response = await api.patch(`/api/v1/maintenance/complete/${maintenanceId}`, {
        completedBy: username,
      })

      if (response.data.success) {
        showSuccess(response.data.message)
        onCompleted(response.data.data)
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error completing maintenance'
      showError(errorMessage)
      console.error('Error completing maintenance:', error)
    }
  }
  return (
    <>
      {adminRoles.includes(role) && (
        <CButton
          color="success"
          variant="outline"
          onClick={() => handleCompleteMaintenance(maintenance._id)}
          disabled={!maintenance.checklist?.every((item) => item.completed)}
        >
          Complete Maintenance
        </CButton>
      )}
    </>
  )
}

export default CompleteButtonMaintenance
