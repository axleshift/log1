import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CButton,
  CForm,
  CFormSelect,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CAlert,
  CSpinner,
  CFormTextarea,
  CModalFooter,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const AddMaintenanceInspaction = () => {
  const API_URL = import.meta.env.VITE_APP_API_URL
  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // This is important for cookies
  })
  const today = new Date().toISOString().split('T')[0]
  const initialState = {
    inspector: '',
    vehicleId: '',
    status: 'Pending',
    scheduledDate: today,
  }
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState(null)
  const [vehicle, setVehicle] = useState([])
  const [newMaintenance, setNewMaintenance] = useState(initialState)
  const [validated, setValidated] = useState(false)

  const fetchVehicleInspection = async () => {
    try {
      const response = await api.get('/api/v1/vehicle/inspection')
      if (response.status === 200) {
        setVehicle(response.data.data)
        setLoading(false)
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchVehicleInspection()
  }, [])
  const handleSubmit = async (e) => {
    setLoading(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)
    try {
      const response = await api.post('/api/v1/maintenance/inspection', newMaintenance)
      console.log(response)
      if (response.data.success) {
        setNewMaintenance(initialState)
        setVisible(false)
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? (
        <CSpinner color="primary" size="sm" />
      ) : (
        <CButton
          color="primary"
          className="mb-3"
          variant="outline"
          onClick={() => setVisible(!visible)}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Inspection
        </CButton>
      )}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add Inspection</CModalTitle>
        </CModalHeader>
        {error && (
          <CAlert color="danger" className="m-3">
            {error}
          </CAlert>
        )}
        <CModalBody>
          <CForm noValidate validated={validated}>
            <CFormInput
              className="mb-3"
              type="text"
              floatingLabel="Inspector"
              name="inspector"
              placeholder="Inspector"
              required
              value={newMaintenance.inspector}
              onChange={(e) => setNewMaintenance({ ...newMaintenance, inspector: e.target.value })}
            />
            <CFormSelect
              className="mb-3"
              aria-label="Select Vehicle"
              name="vehicleId"
              required
              value={newMaintenance.vehicleId}
              onChange={(e) => setNewMaintenance({ ...newMaintenance, vehicleId: e.target.value })}
            >
              <option value="">Select Vehicle</option>
              {vehicle.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.brand} - {vehicle.model} - {vehicle.regisNumber}
                </option>
              ))}
            </CFormSelect>

            <CFormInput
              className="mb-3"
              type="date"
              name="scheduledDate"
              placeholder="Scheduled Date"
              required
              min={today}
              value={newMaintenance.scheduledDate}
              onChange={(e) =>
                setNewMaintenance({ ...newMaintenance, scheduledDate: e.target.value })
              }
            />

            <CModalFooter>
              {loading ? (
                <CSpinner color="secondary" size="sm" />
              ) : (
                <CButton
                  color="secondary"
                  variant="outline"
                  onClick={() => {
                    setVisible(false)
                    setNewMaintenance(initialState)
                    setError(null)
                    setValidated(false)
                  }}
                >
                  Cancel
                </CButton>
              )}

              {loading ? (
                <CSpinner color="primary" size="sm" />
              ) : (
                <CButton color="primary" variant="outline" onClick={handleSubmit}>
                  Add Inspection
                </CButton>
              )}
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}

export default AddMaintenanceInspaction
