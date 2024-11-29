/* eslint-disable prettier/prettier */
import React from 'react'
import axios from 'axios'
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
} from '@coreui/react'
import { CModalTitle } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const AddVehicle = () => {
  const API_URL = import.meta.env.VITE_APP_API_URL
  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  })
  const [validated, setValidated] = useState(false)
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const initialState = {
    idNum: Math.floor(Math.random() * 1000000).toString(),
    brand: '',
    model: '',
    year: '',
    regisNumber: '',
    type: '',
    capacity: '',
    fuelType: '',
    currentMileage: '',
    status: 'available',
    assignedDriver: '',
  }
  const [newVehicle, setNewVehicle] = useState(initialState)

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
    { label: 'Diesel', value: 'diesel' },
    { label: 'Gasoline', value: 'gasoline' },
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

    const vehicleData = { ...newVehicle }

    if (vehicleData.assignedDriver === '') {
      delete vehicleData.assignedDriver
    }

    try {
      const response = await api.post('/api/v1/vehicle', newVehicle)
      if (response.data.success) {
        alert('Vehicle added successfully')
        setNewVehicle(initialState)
        setLoading(false)
        setVisible(false)
      } else {
        setError(response.data.message)
        setLoading(false)
      }
    } catch (error) {
      setError(error.response.data.message)
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
            <FontAwesomeIcon icon={faPlus} /> Add Vehicle
          </CButton>
          <CModal visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader>
              <CModalTitle>Add Vehicle</CModalTitle>
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
                  onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
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
                  onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                />
                <CFormInput
                  type="number"
                  className="mb-3"
                  floatingLabel="Year"
                  placeholder="Year"
                  id="year"
                  autoComplete="off"
                  value={newVehicle.year}
                  required
                  min="1990"
                  max={new Date().getFullYear()}
                  onChange={(e) => {
                    const inputYear = e.target.value
                    setNewVehicle({ ...newVehicle, year: inputYear })
                  }}
                  onBlur={(e) => {
                    const inputYear = parseInt(e.target.value)
                    if (
                      inputYear < 1990 ||
                      inputYear > new Date().getFullYear() ||
                      isNaN(inputYear)
                    ) {
                      alert('Please enter a year between 1990 and ' + new Date().getFullYear())
                      setNewVehicle({ ...newVehicle, year: 1990 })
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
                  onChange={(e) => setNewVehicle({ ...newVehicle, regisNumber: e.target.value })}
                />
                <CFormSelect
                  className="mb-3"
                  floatingLabel="Vehicle Type"
                  placeholder="Vehicle Type"
                  id="type"
                  value={newVehicle.type}
                  required
                  onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
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
                  onChange={(e) => setNewVehicle({ ...newVehicle, capacity: e.target.value })}
                />

                <CFormSelect
                  className="mb-3"
                  floatingLabel="Fuel Type"
                  placeholder="Fuel Type"
                  id="fuelType"
                  value={newVehicle.fuelType}
                  required
                  onChange={(e) => setNewVehicle({ ...newVehicle, fuelType: e.target.value })}
                  options={[{ label: 'Select Fuel Type', value: '' }, ...fuelTypes]}
                />

                <CFormInput
                  className="mb-3"
                  floatingLabel="Current Mileage"
                  placeholder="Current Mileage"
                  type="number"
                  id="mileage"
                  label="Current Mileage"
                  autoComplete="off"
                  required
                  value={newVehicle.currentMileage}
                  min="0"
                  onChange={(e) => setNewVehicle({ ...newVehicle, currentMileage: e.target.value })}
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
