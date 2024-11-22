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
  const initialState = {
    inspector: '',
    vehicleId: '',
    status: 'Pending',
    description: '',
    scheduledDate: '',
  }
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState(null)
  const [vehicle, setVehicle] = useState([])
  const [newMaintenance, setNewMaintenance] = useState(initialState)

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
    e.preventDefault()
    setLoading(true)
    // Add your logic to submit the form data here
    try {
      const response = await api.post('/api/v1/maintenance/inspection', newMaintenance)
      console.log(response) // Add this line
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
      <CButton
        color="primary"
        className="mb-3"
        variant="outline"
        onClick={() => setVisible(!visible)}
      >
        <FontAwesomeIcon icon={faPlus} /> Add Inspection
      </CButton>
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
          <CForm>
            <CFormInput
              className="mb-3"
              type="text"
              floatingLabel="Inspector"
              name="inspector"
              placeholder="Inspector"
              value={newMaintenance.inspector}
              onChange={(e) => setNewMaintenance({ ...newMaintenance, inspector: e.target.value })}
            />
            <CFormSelect
              className="mb-3"
              aria-label="Select Vehicle"
              name="vehicleId"
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
            <CFormTextarea
              className="mb-3"
              floatingLabel="Description"
              placeholder="Description"
              style={{ height: '100px' }}
              name="description"
              value={newMaintenance.description}
              onChange={(e) =>
                setNewMaintenance({ ...newMaintenance, description: e.target.value })
              }
            />

            <CFormInput
              className="mb-3"
              type="date"
              name="scheduledDate"
              placeholder="Scheduled Date"
              value={newMaintenance.scheduledDate}
              onChange={(e) =>
                setNewMaintenance({ ...newMaintenance, scheduledDate: e.target.value })
              }
            />

            <CModalFooter>
              <CButton color="secondary" variant="outline" onClick={() => setVisible(false)}>
                Cancel
              </CButton>
              <CButton color="primary" variant="outline" onClick={handleSubmit}>
                {loading ? <CSpinner component="span" size="sm" aria-hidden="true" /> : 'Submit'}
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}

export default AddMaintenanceInspaction
