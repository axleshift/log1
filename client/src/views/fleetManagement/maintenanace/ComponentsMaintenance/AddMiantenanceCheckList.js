import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormCheck,
  CAlert,
  CSpinner,
  CFormTextarea,
} from '@coreui/react'
import PropTypes from 'prop-types'
import axios from 'axios'

const AddMaintenanceCheckList = ({ item, visible, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isScheduledDateMet, setIsScheduledDateMet] = useState(false)
  const API_URL = import.meta.env.VITE_APP_API_URL
  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  })
  const [checkList, setCheckList] = useState({
    visualInspection: {
      physical: {
        cracks: false,
        corrosion: false,
        wear: false,
        damage: false,
      },
      operational: {
        noise: false,
        leaks: false,
        misalignment: false,
        looseFasteners: false,
      },
      safety: {
        guards: false,
        emergencyStop: false,
        lockoutTagout: false,
        fireSafety: false,
      },
      mechanical: {
        bearings: {
          play: false,
          overheating: false,
          metalShavings: false,
        },
        belts: {
          tension: false,
          wear: false,
          damage: false,
        },
        motors: {
          noise: false,
          overheating: false,
          looseConnections: false,
        },
      },
      electrical: {
        wiring: {
          insulation: false,
          termination: false,
          overheating: false,
        },
        controlPanels: {
          functionality: false,
          labeling: false,
          damage: false,
        },
      },
      fluidSystems: {
        lubrication: {
          oilLevel: false,
          lubrication: false,
          cleanliness: false,
        },
        hydraulicFluid: {
          level: false,
          condition: false,
          filter: false,
        },
      },
      documents: {
        registration: false,
        insurance: false,
      },
    },
    notes: '',
  })

  useEffect(() => {
    // Check if scheduled date is met
    const checkScheduledDate = () => {
      if (item?.scheduledDate) {
        const currentDate = new Date()
        const scheduledDate = new Date(item.scheduledDate)
        setIsScheduledDateMet(currentDate >= scheduledDate)
      }
    }
    checkScheduledDate()
    // Set up interval to check every minute
    const interval = setInterval(checkScheduledDate, 60000)

    return () => clearInterval(interval)
  }, [item])

  useEffect(() => {
    if (item && item.visualInspection) {
      setCheckList({ visualInspection: item.visualInspection })
    }
  }, [item])

  const handleCheckChange = (event) => {
    if (!isScheduledDateMet) {
      setError('Cannot update inspection before scheduled date')
      return
    }

    const { name, checked } = event.target
    setCheckList((prevState) => {
      const newState = { ...prevState }
      const path = name.split('.')
      let current = newState

      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]]
      }

      current[path[path.length - 1]] = checked
      return newState
    })
  }

  const handleSubmit = async () => {
    if (!item?._id) {
      setError('Invalid item ID')
      return
    }

    try {
      setLoading(true)
      setError(null)
      setSuccess(null)

      console.log('Sending data:', {
        inspectionId: item._id,
        checkList: checkList,
      })

      const response = await api.put(`/api/v1/maintenance/inspection/${item._id}`, checkList)

      if (response.status === 200) {
        setSuccess('Maintenance checklist updated successfully')
        if (onUpdate) {
          onUpdate()
        }
        setTimeout(() => {
          onClose()
        }, 2000)
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while updating the checklist')
    } finally {
      setLoading(false)
    }
  }

  const renderCheckboxes = (obj, parentKey = '') => {
    return Object.entries(obj).map(([key, value]) => {
      const currentKey = parentKey ? `${parentKey}.${key}` : key

      if (typeof value === 'object' && value !== null) {
        return (
          <div key={currentKey} className="ms-3">
            <h6 className="text-capitalize">{key}</h6>
            {renderCheckboxes(value, currentKey)}
          </div>
        )
      }

      return (
        <CFormCheck
          key={currentKey}
          id={currentKey}
          label={key.charAt(0).toUpperCase() + key.slice(1)}
          name={currentKey}
          checked={value}
          onChange={handleCheckChange}
          disabled={!isScheduledDateMet}
        />
      )
    })
  }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Maintenance Check List</CModalTitle>
      </CModalHeader>

      {error && (
        <CAlert color="danger" className="m-3">
          {error}
        </CAlert>
      )}

      {success && (
        <CAlert color="success" className="m-3">
          {success}
        </CAlert>
      )}

      {!isScheduledDateMet && (
        <CAlert color="warning" className="m-3">
          This inspection cannot be updated until{' '}
          {new Date(item?.scheduledDate).toLocaleDateString()}
        </CAlert>
      )}

      <CModalBody>
        <CForm>{renderCheckboxes(checkList.visualInspection, 'visualInspection')}</CForm>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
        <CButton color="primary" onClick={handleSubmit} disabled={loading || !isScheduledDateMet}>
          {loading ? (
            <>
              <CSpinner size="sm" className="me-2" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

AddMaintenanceCheckList.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    visualInspection: PropTypes.object,
  }),
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
}

export default AddMaintenanceCheckList
