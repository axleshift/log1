import React from 'react'
import { useState, useEffect } from 'react'
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
import api from '../../../../utils/api'
import { useToast } from '../../../../components/Toast/Toast'

const AddDrivers = ({ onAddDriver }) => {
  const { showSuccess, showError } = useToast()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
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
    licenseRestriction: '',
    status: 'available',
    assignedVehicle: '',
  }
  const [newDriver, setNewDriver] = useState(initialState)

  const handleChange = (e) => {
    const { id, value } = e.target
    setNewDriver((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }
  const fetchAvailableVehicles = async () => {
    try {
      const response = await api.get('api/v1/vehicle/available')
      setVehiclesOptions(response.data.data)
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      // showError(error.message)
    }
  }

  useEffect(() => {
    fetchAvailableVehicles()
  }, [])

  const handleAddDriver = async (e) => {
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

    setLoading(true)
    try {
      const response = await api.post('api/v1/driver', newDriver)
      if (response.status === 201) {
        showSuccess(response.data.message)
        onAddDriver(response.data.data)
        setTimeout(() => {
          setNewDriver(initialState)
          setValidated(false)
          setVisible(false)
          setLoading(false)
          setError
        }, 2000)
      }
    } catch (error) {
      setError(error.response.data.message)
      showError(error.response.data.message)
      setTimeout(() => {
        setError(null)
      }, 3000)
    } finally {
      setLoading(false)
    }
  }
  const options = [
    { value: 'A', label: 'A' },
    { value: 'A1', label: 'A1' },
    { value: 'B', label: 'B' },
    { value: 'B1', label: 'B1' },
    { value: 'B2', label: 'B2' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
    { value: 'E', label: 'E' },
    { value: 'BE', label: 'BE' },
  ]
  const NavIcon = ({ icon }) => {
    const [isHovering, setIsHovering] = useState(false)

    return (
      <FontAwesomeIcon
        icon={icon}
        bounce={isHovering}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />
    )
  }
  return (
    <>
      {loading ? (
        <CSpinner color="primary" size="sm" />
      ) : (
        <>
          <CButton
            color="primary"
            disabled={loading}
            variant="outline"
            onClick={() => setVisible(true)}
          >
            {loading ? <CSpinner color="primary" size="sm" /> : <NavIcon icon={faPlus} />} Add
            Driver
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
            {success && (
              <CAlert color="success" className="m-3">
                {success}
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
                  id="driverName"
                  label="Name"
                  autoComplete="off"
                  required
                  value={newDriver.driverName}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
                <CFormSelect
                  className="mb-3"
                  floatingLabel="License Type"
                  label="License Type"
                  id="licenseRestriction"
                  required
                  value={newDriver.licenseRestriction}
                  onChange={handleChange}
                >
                  <option value={null}>Select License Type</option>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </CFormSelect>

                <CFormSelect
                  className="mb-3"
                  floatingLabel="Vehicle"
                  label="Vehicle"
                  id="assignedVehicle"
                  required
                  value={newDriver.assignedVehicle}
                  onChange={handleChange}
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
                disabled={loading}
                onClick={() => {
                  setVisible(false)
                  setNewDriver(initialState)
                  setError(null)
                  setValidated(false)
                }}
              >
                {loading ? <CSpinner color="secondary" size="sm" /> : 'Cancel'}
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
