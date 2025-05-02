import React from 'react'
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
import api from '../../../../utils/api'
import { useToast } from '../../../../components/Toast/Toast'
const UpdateDriver = ({ driver, onUpdateDriver }) => {
  const { showSuccess, showError } = useToast()
  const [visible, setVisible] = useState(false)
  const [success, setSuccess] = useState(null)
  const [vehiclesOptions, setVehiclesOptions] = useState([])
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const initialState = {
    idNum: driver.idNum,
    driverName: driver.driverName,
    email: driver.email,
    phone: driver.phone,
    address: driver.address,
    licenseNumber: driver.licenseNumber,
    licenseRestriction: driver.licenseRestriction,
    status: driver.status,
    assignedVehicle: driver.assignedVehicle,
  }
  const [updateDriver, setUpdateDriver] = useState(initialState)
  const handleChange = (e) => {
    const { id, value } = e.target
    setUpdateDriver((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }
  const fetchAvailableVehicles = async () => {
    try {
      const response = await api.get('api/v1/vehicle/available')
      setVehiclesOptions(response.data.data)
    } catch (error) {
      showError(error.message)
    }
  }

  useEffect(() => {
    fetchAvailableVehicles()
  }, [])

  const handleUpdateDriver = async (e) => {
    e.preventDefault() // Add this to prevent form submission

    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
    }
    setValidated(true)
    setLoading(true)

    const driverData = { ...updateDriver }

    if (driverData.assignedVehicle === null) {
      delete driverData.assignedVehicle
    }
    try {
      const resposne = await api.put(`/api/v1/driver/${driver._id}`, updateDriver)
      if (resposne.data.success) {
        showSuccess(resposne.data.message)
        onUpdateDriver(resposne.data.data)
        setTimeout(() => {
          setVisible(false)
          setUpdateDriver(initialState)
        }, 2000)
      }
    } catch (error) {
      setError(error.response.data.message)
      showError(error.response.data.message)
      setTimeout(() => {
        setError(null)
      }, 2000)
    } finally {
      setLoading(false)
    }
  }

  const options2 = [
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

  const options = [
    { value: 'available', label: 'Available' },
    { value: 'on_duty', label: 'On Duty' },
    { value: 'off_duty', label: 'Off Duty' },
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
      <CButton
        color="primary"
        variant="outline"
        disabled={loading}
        onClick={() => setVisible(true)}
        className="me-2"
      >
        {loading ? <CSpinner size="sm" /> : <NavIcon icon={faPenToSquare} />} Update
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
        {success && (
          <CAlert color="success" className="m-3">
            {success}
          </CAlert>
        )}
        <CModalBody>
          <CForm noValidate validated={validated}>
            <>
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
                id="driverName"
                label="Name"
                autoComplete="off"
                required
                value={updateDriver.driverName}
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
                value={updateDriver.email}
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
                value={updateDriver.phone}
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
                value={updateDriver.address}
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
                value={updateDriver.licenseNumber}
                onChange={handleChange}
              />

              <CFormSelect
                className="mb-3"
                floatingLabel="License Type"
                label="License Type"
                id="licenseRestriction"
                required
                value={updateDriver.licenseRestriction}
                onChange={handleChange}
              >
                <option value={null}>Select License Type</option>
                {options2.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
              <CFormSelect
                className="mb-3"
                floatingLabel="Status"
                placeholder="Status"
                id="status"
                label="Status"
                autoComplete="off"
                required
                value={updateDriver.status || ''}
                onChange={handleChange}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
              {updateDriver.status === 'available' ||
                (updateDriver.status === 'on_duty' && (
                  <CFormSelect
                    className="mb-3"
                    floatingLabel="Assigned Vehicle"
                    label="Assigned Vehicle"
                    id="assignedVehicle"
                    value={updateDriver.assignedVehicle || ''}
                    onChange={handleChange}
                  >
                    <option value="">Select a vehicle</option>
                    {vehiclesOptions.map((vehicle) => (
                      <option key={vehicle._id} value={vehicle._id}>
                        {vehicle.brand} / {vehicle.model} / {vehicle.regisNumber}
                      </option>
                    ))}
                  </CFormSelect>
                ))}
            </>
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
  )
}

export default UpdateDriver
