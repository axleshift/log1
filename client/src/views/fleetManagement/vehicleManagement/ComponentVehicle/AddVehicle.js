import React from 'react'
import { useState } from 'react'
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
  CForm,
  CInputGroup,
} from '@coreui/react'
import { CModalTitle } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import api from '../../../../utils/api'
import { useToast } from '../../../../components/Toast/Toast'

const AddVehicle = ({ onAddVehicle }) => {
  const { showSuccess, showError } = useToast()
  const [validated, setValidated] = useState(false)
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)
  const initialState = {
    idNum: Math.floor(Math.random() * 1000000).toString(),
    brand: '',
    model: '',
    year: '',
    regisExprationDate: '',
    regisNumber: '',
    capacity: '',
    fuelType: '',
    currentMileage: '',
    status: 'available',
  }
  const [newVehicle, setNewVehicle] = useState(initialState)
  const handleChange = (e) => {
    const { id, value } = e.target
    setNewVehicle((prevData) => ({
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

  const options = [
    { label: 'Maintenance', value: 'maintenance' },
    { label: 'In Use', value: 'in_use' },
  ]
  const handleAddVehicle = async (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preDefault()
      e.stopPropagation()
    }
    setValidated(true)
    setLoading(true)
    try {
      const response = await api.post('api/v1/vehicle', newVehicle)
      if (response.data.success) {
        showSuccess(response.data.message)
        onAddVehicle(response.data.data)
        setTimeout(() => {
          setNewVehicle(initialState)
          setLoading(false)
          setValidated(false)
          setVisible(false)
        }, 2000)
      }
    } catch (error) {
      showError(error.response?.data?.message || error.message)
      setError(error.response?.data?.message || error.message)
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
    setLoading(false)
  }
  const currentYear = new Date().getFullYear()
  const MIN_YEAR = 1990
  const today = new Date().toISOString().split('T')[0]
  return (
    <>
      {loading ? (
        <CSpinner color="primary" size="sm" />
      ) : (
        <>
          <CButton color="primary" variant="outline" onClick={() => setVisible(true)}>
            <FontAwesomeIcon icon={faPlus} /> Add Vehicle
          </CButton>
          <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
            <CModalHeader closeButton>
              <CModalTitle>Add Vehicle</CModalTitle>
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
                    value={newVehicle.idNum}
                    disabled
                  />
                  <CFormInput
                    className="mb-3"
                    floatingLabel="Brand"
                    placeholder="Brand"
                    type="text"
                    id="brand"
                    label="Brand"
                    autoComplete="off"
                    required
                    value={newVehicle.brand}
                    onChange={handleChange}
                  />
                  <CFormInput
                    className="mb-3"
                    floatingLabel="Model"
                    placeholder="Model"
                    type="text"
                    id="model"
                    label="Model"
                    autoComplete="off"
                    required
                    value={newVehicle.model}
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
                    value={newVehicle.year}
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
                        setNewVehicle({ ...newVehicle, year: MIN_YEAR })
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
                    autoComplete="off"
                    required
                    value={newVehicle.regisNumber}
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
                    value={newVehicle.regisExprationDate}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup>
                  <CFormSelect
                    className="mb-3"
                    floatingLabel="Vehicle Type"
                    placeholder="Vehicle Type"
                    id="type"
                    value={newVehicle.type}
                    required
                    onChange={handleChange}
                    options={[{ label: 'Select Vehicle Type', value: '' }, ...vehicleTypes]}
                  />

                  <CFormInput
                    className="mb-2"
                    type="number"
                    floatingLabel="Capacity"
                    placeholder="Capacity"
                    id="capacity"
                    label="Capacity"
                    autoComplete="off"
                    required
                    min="0"
                    value={newVehicle.capacity}
                    onChange={handleChange}
                  />

                  <CFormSelect
                    className="mb-3"
                    floatingLabel="Fuel Type"
                    placeholder="Fuel Type"
                    id="fuelType"
                    value={newVehicle.fuelType}
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
                  autoComplete="off"
                  required
                  value={newVehicle.currentMileage}
                  min="0"
                  max="100000000000"
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
                  setNewVehicle(initialState)
                  setValidated(false)
                  setError(null)
                }}
              >
                {loading ? <CSpinner color="secondary" size="sm" /> : 'Cancel'}
              </CButton>

              <CButton
                color="primary"
                variant="outline"
                disabled={loading}
                onClick={handleAddVehicle}
              >
                {loading ? <CSpinner color="primary" size="sm" /> : 'Save'}
              </CButton>
            </CModalFooter>
          </CModal>
        </>
      )}
    </>
  )
}

export default AddVehicle
