/* eslint-disable prettier/prettier */
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
} from '@coreui/react'

const UpdateVehicle = (props) => {
  const API_URL = import.meta.env.VITE_APP_API_URL
  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // This is important for cookies
  })
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const randomId = Math.floor(Math.random() * 1000000).toString()
  const [editVehicle, setNewEditVehicle] = useState({
    idNum: props.vehicle.idNum,
    brand: props.vehicle.brand,
    model: props.vehicle.model,
    year: props.vehicle.year,
    regisNumber: props.vehicle.regisNumber,
    type: props.vehicle.type,
    capacity: props.vehicle.capacity,
    fuelType: props.vehicle.fuelType,
    currentMileage: props.vehicle.currentMileage,
  })

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

  const handleEditVehicle = async () => {
    setLoading(true)
    try {
      const response = await api.put(`/api/v1/vehicle/${props.vehicle._id}`, editVehicle)
      setVisible(false)
    } catch (error) {
      console.error('Error updating driver:', error)
      setError(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? (
        <CSpinner color="primary" style={{ width: '3rem', height: '3rem' }} />
      ) : (
        <>
          <CButton
            color="primary"
            variant="outline"
            onClick={() => setVisible(true)}
            className="me-2"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
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
                  if (
                    inputYear < 1990 ||
                    inputYear > new Date().getFullYear() ||
                    isNaN(inputYear)
                  ) {
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
                min="0"
                value={editVehicle.capacity}
                onChange={(e) => setNewEditVehicle({ ...editVehicle, capacity: e.target.value })}
              />

              {/* <CFormSelect
                className="mb-3"
                floatingLabel="Status"
                placeholder="Status"
                id="status"
                label="Status"
                value={editVehicle.status}
                required
                onChange={(e) => setNewEditVehicle({ ...editVehicle, status: e.target.value })}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect> */}

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
                min="0"
                value={editVehicle.currentMileage}
                onChange={(e) =>
                  setNewEditVehicle({ ...editVehicle, currentMileage: e.target.value })
                }
              />
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                variant="outline"
                onClick={() => {
                  setVisible(false)
                  setError(null)
                  setNewEditVehicle(props.vehicle)
                }}
              >
                Close
              </CButton>
              {loading ? (
                <CSpinner color="primary" style={{ width: '3rem', height: '3rem' }} />
              ) : (
                <CButton color="success" variant="outline" onClick={handleEditVehicle}>
                  Save changes
                </CButton>
              )}
            </CModalFooter>
          </CModal>
        </>
      )}
    </>
  )
}

export default UpdateVehicle
