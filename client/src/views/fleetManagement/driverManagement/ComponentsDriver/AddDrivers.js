import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
  CAlert,
  CFormInput,
  CFormSelect,
  CForm,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const AddDrivers = ({ vehicles }) => {
  const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5057'
  const api = axios.create({
    baseURL: API_URL,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [visible, setVisible] = useState(false)
  const [vehiclesOptions, setVehiclesOptions] = useState([])
  const [validated, setValidated] = useState(false)
  const randomId = Math.floor(Math.random() * 1000000).toString()
  const initialState = {
    idNum: randomId,
    driverName: '',
    email: '',
    phone: '',
    address: '',
    licenseNumber: '',
    status: 'available',
    assignedVehicle: '',
  }
  const [newDriver, setNewDriver] = useState(initialState)
  const fetchAvailableVehicles = async () => {
    try {
      const response = await api.get('/api/v1/vehicle/available')
      setVehiclesOptions(response.data.data)
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    }
  }

  useEffect(() => {
    fetchAvailableVehicles()
  }, [])

  const handleAddDriver = async (e) => {
    setLoading(true)
    setError(null)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preDefault()
      e.stopPropagation()
    }
    setValidated(true)

    const driverData = { ...newDriver }

    if (driverData.assignedVehicle === '') {
      delete driverData.assignedVehicle
    }

    try {
      const response = await api.post('/api/v1/driver', newDriver)
      if (response.data.success) {
        alert('Driver added successfully')
        setNewDriver(initialState)
        setValidated(false)
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      {loading ? (
        <CSpinner color="primary" size="sm" />
      ) : (
        <>
          <CButton color="primary" variant="outline" onClick={() => setVisible(true)}>
            <FontAwesomeIcon icon={faPlus} /> Add Driver
          </CButton>
          <CModal visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader>
              <CModalTitle>Add Driver</CModalTitle>
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
                  floatingLabel="ID Number"
                  placeholder="ID Number"
                  type="text"
                  id="idNum"
                  label="ID Number"
                  value={newDriver.idNum}
                  disabled
                />
                <CFormInput
                  className="mb-3"
                  floatingLabel="Name"
                  placeholder="Name"
                  type="text"
                  id="Name"
                  label="Name"
                  autoComplete="off"
                  required
                  value={newDriver.driverName}
                  onChange={(e) => setNewDriver({ ...newDriver, driverName: e.target.value })}
                />

                <CFormInput
                  className="mb-3"
                  floatingLabel="email"
                  placeholder="Model"
                  type="email"
                  id="email"
                  label="Email"
                  autoComplete="off"
                  required
                  value={newDriver.email}
                  onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })}
                />
                <CFormInput
                  type="phone"
                  className="mb-3"
                  floatingLabel="phone"
                  placeholder="phone"
                  id="phone"
                  label="Phone"
                  title="Please enter a valid phone number"
                  autoComplete="off"
                  value={newDriver.phone}
                  required
                  onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
                />
                <CFormInput
                  className="mb-3"
                  floatingLabel="Address"
                  placeholder="Address"
                  type="text"
                  id="address"
                  label="Address"
                  autoComplete="off"
                  required
                  value={newDriver.address}
                  onChange={(e) => setNewDriver({ ...newDriver, address: e.target.value })}
                />
                <CFormInput
                  className="mb-3"
                  floatingLabel="License Number"
                  placeholder="License Number"
                  type="text"
                  id="licenseNumber"
                  label="License Number"
                  autoComplete="off"
                  required
                  value={newDriver.licenseNumber}
                  onChange={(e) => setNewDriver({ ...newDriver, licenseNumber: e.target.value })}
                />

                <CFormSelect
                  className="mb-3"
                  floatingLabel="Vehicle"
                  label="Vehicle"
                  id="vehicle"
                  required
                  value={newDriver.assignedVehicle}
                  onChange={(e) => setNewDriver({ ...newDriver, assignedVehicle: e.target.value })}
                >
                  <option value={null}>Select Vehicle</option>
                  {vehiclesOptions.map((vehicle) => (
                    <option key={vehicle._id} value={vehicle._id}>
                      {vehicle.brand} /{vehicle.model} /{vehicle.regisNumber}
                    </option>
                  ))}
                </CFormSelect>
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                variant="outline"
                onClick={() => {
                  setVisible(false)
                  setNewDriver(initialState)
                  setError(null)
                  setValidated(false)
                }}
                disabled={loading}
              >
                {loading ? <CSpinner color="primary" size="sm" /> : 'Cancel'}
              </CButton>

              <CButton
                color="primary"
                variant="outline"
                onClick={handleAddDriver}
                disabled={loading}
              >
                {loading ? <CSpinner color="primary" size="sm" /> : 'Add Driver'}
              </CButton>
            </CModalFooter>
          </CModal>
        </>
      )}
    </>
  )
}

export default AddDrivers
