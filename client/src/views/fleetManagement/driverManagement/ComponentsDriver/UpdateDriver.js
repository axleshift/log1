/* eslint-disable prettier/prettier */
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import {
  CFormInput,
  CButton,
  CSpinner,
  CAlert,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CFormSelect,
  CModalTitle,
  CForm,
} from '@coreui/react'

const UpdateDriver = (props) => {
  const [visible, setVisible] = useState(false)
  const [vehiclesOptions, setVehiclesOptions] = useState([])
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const API_URL = import.meta.env.VITE_APP_API_URL
  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  })
  const [updateDriver, setUpdateDriver] = useState({
    idNum: props.driver.idNum,
    driverName: props.driver.driverName,
    email: props.driver.email,
    phone: props.driver.phone,
    address: props.driver.address,
    licenseNumber: props.driver.licenseNumber,
    status: props.driver.status,
    assignedVehicle: props.driver.assignedVehicle,
  })

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

  const handleUpdateDriver = async (e) => {
    setLoading(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
    }
    setValidated(true)
    const driverData = { ...updateDriver }

    if (driverData.assignedVehicle === '') {
      delete driverData.assignedVehicle
    }
    try {
      await api.put(`/api/v1/driver/${props.driver._id}`, updateDriver)
      setVisible(false)
      setValidated(false)
      fetchAvailableVehicles()
    } catch (error) {
      console.error('Error updating driver:', error)
      setError(error.response.data.message)
    } finally {
      setLoading(false)
      fetchAvailableVehicles()
    }
  }

  const options = [
    { value: 'available', label: 'Available' },
    { value: 'on_duty', label: 'On Duty' },
    { value: 'off_duty', label: 'Off Duty' },
  ]

  return (
    <>
      <>
        <CButton
          color="primary"
          variant="outline"
          disabled={loading}
          onClick={() => setVisible(true)}
          className="me-2"
        >
          {loading ? <CSpinner size="sm" /> : <FontAwesomeIcon icon={faPenToSquare} />}
        </CButton>
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Update Driver</CModalTitle>
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
                value={updateDriver.idNum}
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
                value={updateDriver.driverName}
                onChange={(e) => setUpdateDriver({ ...updateDriver, driverName: e.target.value })}
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
                value={updateDriver.email}
                onChange={(e) => setUpdateDriver({ ...updateDriver, email: e.target.value })}
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
                value={updateDriver.phone}
                required
                onChange={(e) => setUpdateDriver({ ...updateDriver, phone: e.target.value })}
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
                value={updateDriver.address}
                onChange={(e) => setUpdateDriver({ ...updateDriver, address: e.target.value })}
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
                value={updateDriver.licenseNumber}
                onChange={(e) =>
                  setUpdateDriver({ ...updateDriver, licenseNumber: e.target.value })
                }
              />
              <CFormSelect
                className="mb-3"
                floatingLabel="Status"
                placeholder="Status"
                id="status"
                label="Status"
                autoComplete="off"
                required
                value={updateDriver.status}
                onChange={(e) => setUpdateDriver({ ...updateDriver, status: e.target.value })}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
              {updateDriver.status === 'on_duty' ||
                (updateDriver.status === 'available' && (
                  <CFormSelect
                    className="mb-3"
                    floatingLabel="Vehicle"
                    label="Vehicle"
                    id="vehicle"
                    value={updateDriver.assignedVehicle || ''}
                    onChange={(e) =>
                      setUpdateDriver({ ...updateDriver, assignedVehicle: e.target.value })
                    }
                  >
                    <option value="">Select Vehicle</option>
                    {vehiclesOptions.map((vehicle) => (
                      <option key={vehicle._id} value={vehicle._id}>
                        {vehicle.brand} / {vehicle.model} / {vehicle.regisNumber}
                      </option>
                    ))}
                  </CFormSelect>
                ))}
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              variant="outline"
              disabled={loading}
              onClick={() => {
                setVisible(false)
                setError(null)
                setUpdateDriver(props.driver)
                setValidated(false)
              }}
            >
              {loading ? <CSpinner color="secondary" size="sm" /> : 'Close'}
            </CButton>

            <CButton
              color="success"
              variant="outline"
              disabled={loading}
              onClick={handleUpdateDriver}
            >
              {loading ? <CSpinner color="success" size="sm" /> : 'Save Changes'}
            </CButton>
          </CModalFooter>
        </CModal>
      </>
    </>
  )
}

export default UpdateDriver
