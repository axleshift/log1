import React from 'react'
import { useState } from 'react'
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
  CInputGroup,
} from '@coreui/react'
import api from '../../../../utils/api'
import { useToast } from '../../../../components/Toast/Toast'

const UpdateVehicle = ({ vehicle, onUpdateVehicle }) => {
  const { showSuccess, showError } = useToast()
  const [visible, setVisible] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [validated, setValidated] = useState(false)
  const initialState = {
    idNum: vehicle.idNum,
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    regisExprationDate: vehicle.regisExprationDate,
    regisNumber: vehicle.regisNumber,
    type: vehicle.type,
    units: vehicle.units,
    capacity: vehicle.capacity,
    fuelType: vehicle.fuelType,
    currentMileage: vehicle.currentMileage,
  }
  const [editVehicle, setNewEditVehicle] = useState(initialState)
  const handleChange = (e) => {
    const { id, value } = e.target
    setNewEditVehicle((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }
  const vehicleTypes = [
    { label: 'Van', value: 'van' },
    { label: 'Pickup Truck', value: 'pickup' },
    { label: 'Box Truck', value: 'box' },
    { label: 'Straight Truck', value: 'straight' },
    { label: 'Semi-Trailer Trucks', value: 'semi' },
    { label: 'Refrigerated Trucks', value: 'refrigerated' },
    { label: 'Tanker Trucks', value: 'tanker' },
    { label: 'Flatbed Trucks', value: 'flatbed' },
  ]

  const fuelTypes = [
    { label: 'Diesel', value: 'Diesel' },
    { label: 'Gasoline', value: 'Gasoline' },
  ]

  const vehicleUnits = [
    { label: 'kilograms', value: 'kg' },
    { label: 'Tons', value: 'ton' },
  ]

  const handleEditVehicle = async (e) => {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preDefault()
      e.stopPropagation()
    }
    setValidated(true)
    setLoading(true)
    try {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const newExpirationDate = new Date(editVehicle.regisExprationDate)
      newExpirationDate.setHours(0, 0, 0, 0)

      if (newExpirationDate <= today) {
        setError('Registration date must be in the future')
        setIsLoading(false)
        return
      }

      const response = await api.put(`api/v1/vehicle/${vehicle._id}`, editVehicle)
      if (response.data.success) {
        showSuccess(response.data.message)
        onUpdateVehicle(response.data.data)
        setTimeout(() => {
          setLoading(false)
          setValidated(false)
          setVisible(false)
        }, 2000)
      }
    } catch (error) {
      // showError(error.response.data.message)
      // setError(error.response.data.message)
      showError(error.response?.data?.message || error.message)
      setError(error.response?.data?.message || error.message)
      setTimeout(() => {
        setError(null)
      }, 2000)
    } finally {
      setLoading(false)
    }
  }

  const currentYear = new Date().getFullYear()
  const MIN_YEAR = 1990
  const today = new Date().toISOString().split('T')[0]

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

      <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Update Vehicle</CModalTitle>
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
            <CInputGroup>
              <CFormInput
                className="mb-3"
                floatingLabel="ID Number"
                placeholder="ID Number"
                type="text"
                id="idNum"
                label="ID Number"
                value={editVehicle.idNum}
                disabled
              />
              <CFormInput
                className="mb-3"
                floatingLabel="Brand"
                placeholder="Brand"
                type="text"
                id="brand"
                label="Brand"
                required
                value={editVehicle.brand}
                onChange={handleChange}
              />
              <CFormInput
                className="mb-3"
                floatingLabel="Model"
                placeholder="Model"
                type="text"
                id="model"
                label="Model"
                required
                value={editVehicle.model}
                onChange={handleChange}
              />
            </CInputGroup>
            <CInputGroup>
              <CFormInput
                type="number"
                className="mb-3"
                floatingLabel="Year"
                placeholder="Year"
                id="year"
                value={editVehicle.year}
                required
                min={MIN_YEAR}
                max={currentYear}
                onChange={handleChange}
                onBlur={(e) => {
                  const inputYear = parseInt(e.target.value)
                  const isValidYear =
                    inputYear >= MIN_YEAR && inputYear <= currentYear && !isNaN(inputYear)

                  if (!isValidYear) {
                    alert(`Please enter a year between ${MIN_YEAR} and ${currentYear}`)
                    setNewEditVehicle({ ...editVehicle, year: MIN_YEAR })
                  }
                }}
              />

              <CFormInput
                className="mb-3"
                floatingLabel="Registration Number"
                placeholder="Registration Number"
                type="text"
                id="regisNumber"
                label="Registration Number"
                required
                value={editVehicle.regisNumber}
                onChange={handleChange}
              />
              <CFormInput
                className="mb-3"
                floatingLabel="Registration Expiration Date"
                placeholder="Registration Expiration Date"
                type="date"
                id="regisExprationDate"
                label="Registration Expiration Date"
                autoComplete="off"
                required
                min={today}
                value={editVehicle.regisExprationDate.split('T')[0]}
                onChange={handleChange}
              />
            </CInputGroup>
            <CInputGroup>
              <CFormSelect
                className="mb-3"
                floatingLabel="Vehicle Type"
                placeholder="Vehicle Type"
                id="type"
                value={editVehicle.type}
                required
                onChange={handleChange}
                options={[{ label: 'Select Vehicle Type', value: '' }, ...vehicleTypes]}
              />
              <CFormSelect
                className="mb-3"
                floatingLabel="Vehicle Unit"
                placeholder="Vehicle Unit"
                id="units"
                value={editVehicle.units}
                required
                onChange={handleChange}
                options={[{ label: 'Select Vehicle Unit', value: '' }, ...vehicleUnits]}
              />

              <CFormInput
                className="mb-2"
                type="number"
                floatingLabel="Capacity"
                placeholder="Capacity"
                id="capacity"
                label="Capacity"
                required
                min="0"
                value={editVehicle.capacity}
                onChange={handleChange}
              />

              <CFormSelect
                className="mb-3"
                floatingLabel="Fuel Type"
                placeholder="Fuel Type"
                id="fuelType"
                label="Fuel Type"
                value={editVehicle.fuelType}
                required
                onChange={handleChange}
                options={[{ label: 'Select Fuel Type', value: '' }, ...fuelTypes]}
              />
            </CInputGroup>
            <CFormInput
              className="mb-3"
              floatingLabel="Current Mileage"
              placeholder="Current Mileage"
              type="number"
              id="currentMileage"
              label="Current Mileage"
              required
              min="0"
              max="100000000000"
              value={editVehicle.currentMileage}
              onChange={handleChange}
            />
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
              setNewEditVehicle(initialState)
              setValidated(false)
            }}
          >
            {loading ? <CSpinner size="sm" color="secondary" /> : 'Cancel'}
          </CButton>

          <CButton color="success" variant="outline" disabled={loading} onClick={handleEditVehicle}>
            {loading ? <CSpinner size="sm" color="success" /> : 'Save Changes'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default UpdateVehicle
