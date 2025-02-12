import React from 'react'
import { useState } from 'react'
import axios from 'axios'
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

const UpdateVehicle = ({ vehicle, onUpdateVehicle }) => {
  const API_URL = import.meta.env.VITE_APP_API_URL
  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // This is important for cookies
  })

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
    regisNumber: vehicle.regisNumber,
    type: vehicle.type,
    capacity: vehicle.capacity,
    fuelType: vehicle.fuelType,
    currentMileage: vehicle.currentMileage,
  }
  const [editVehicle, setNewEditVehicle] = useState(initialState)

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

  const handleEditVehicle = async (e) => {
    setLoading(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
    }
    setValidated(true)
    try {
      const response = await api.put(`/api/v1/vehicle/${vehicle._id}`, editVehicle)
      if (response.data.success) {
        setSuccess('Vehicle updated successfully')
        onUpdateVehicle(response.data.data)
        setTimeout(() => {
          setNewEditVehicle(initialState)
          setSuccess(null)
          setLoading(false)
          setValidated(false)
          setVisible(false)
        }, 2000)
      }
    } catch (error) {
      setError(error.response.data.message)
      setTimeout(() => {
        setError(null)
      }, 2000)
    } finally {
      setLoading(false)
    }
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
        {loading ? <CSpinner size="sm" /> : <FontAwesomeIcon icon={faPenToSquare} />}
      </CButton>

      <CModal visible={visible} onClose={() => setVisible(false)}>
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
              onChange={(e) => setNewEditVehicle({ ...editVehicle, brand: e.target.value })}
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
              onChange={(e) => setNewEditVehicle({ ...editVehicle, model: e.target.value })}
            />
            <CFormInput
              type="number"
              className="mb-3"
              floatingLabel="Year"
              placeholder="Year"
              id="year"
              value={editVehicle.year}
              required
              min="1990"
              max={new Date().getFullYear()}
              onChange={(e) => {
                const inputYear = e.target.value
                setNewEditVehicle({ ...editVehicle, year: inputYear })
              }}
              onBlur={(e) => {
                const inputYear = parseInt(e.target.value)
                if (inputYear < 1990 || inputYear > new Date().getFullYear() || isNaN(inputYear)) {
                  alert('Please enter a year between 1990 and ' + new Date().getFullYear())
                  setNewEditVehicle({ ...editVehicle, year: 1990 })
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
              onChange={(e) => setNewEditVehicle({ ...editVehicle, regisNumber: e.target.value })}
            />
            <CFormSelect
              className="mb-3"
              floatingLabel="Vehicle Type"
              placeholder="Vehicle Type"
              id="type"
              value={editVehicle.type}
              required
              onChange={(e) => setNewEditVehicle({ ...editVehicle, type: e.target.value })}
              options={[{ label: 'Select Vehicle Type', value: '' }, ...vehicleTypes]}
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
              onChange={(e) => setNewEditVehicle({ ...editVehicle, capacity: e.target.value })}
            />

            <CFormSelect
              className="mb-3"
              floatingLabel="Fuel Type"
              placeholder="Fuel Type"
              id="fuelType"
              label="Fuel Type"
              value={editVehicle.fuelType}
              required
              onChange={(e) => setNewEditVehicle({ ...editVehicle, fuelType: e.target.value })}
              options={[{ label: 'Select Fuel Type', value: '' }, ...fuelTypes]}
            />
            <CFormInput
              className="mb-3"
              floatingLabel="Current Mileage"
              placeholder="Current Mileage"
              type="number"
              id="mileage"
              label="Current Mileage"
              required
              min="0"
              value={editVehicle.currentMileage}
              onChange={(e) =>
                setNewEditVehicle({ ...editVehicle, currentMileage: e.target.value })
              }
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
              setNewEditVehicle(vehicle)
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
