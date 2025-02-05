import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CSpinner,
  CAlert,
} from '@coreui/react'

const API_URL = import.meta.env.VITE_APP_API_URL
const api = axios.create({
  baseURL: API_URL,
})

const AddReceiving = ({ visible, onClose, onAdd }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    vehicleId: '',
    pickUpLocation: '',
    warehouseLocation: '',
    scheduledDate: new Date().toISOString().split('T')[0],
    weight: '',
  })
  const [vehicles, setVehicles] = useState([])
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await api.get('/api/v1/receiving/vehicles-in-use')
        setVehicles(response.data.data)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchVehicles()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await api.post('/api/v1/receiving/add', formData)
      if (response.data.success) {
        onAdd()
        onClose()
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Add Receiving Schedule</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {error && <CAlert color="danger">{error}</CAlert>}
        <CForm onSubmit={handleSubmit}>
          <CFormSelect name="vehicleId" value={formData.vehicleId} onChange={handleChange} required>
            <option value="">Select Vehicle</option>
            {vehicles && vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.brand} - {vehicle.model} - {vehicle.regisNumber}
                </option>
              ))
            ) : (
              <option disabled>No vehicles available</option>
            )}
          </CFormSelect>
          <CFormInput
            type="text"
            name="pickUpLocation"
            placeholder="Pick Up Location"
            value={formData.pickUpLocation}
            onChange={handleChange}
            required
          />
          <CFormInput
            type="text"
            name="warehouseLocation"
            placeholder="Warehouse Location"
            value={formData.warehouseLocation}
            onChange={handleChange}
            required
          />
          <CFormInput
            type="date"
            name="scheduledDate"
            placeholder="Scheduled Date"
            value={formData.scheduledDate}
            onChange={handleChange}
            required
          />
          <CFormInput
            type="number"
            name="weight"
            placeholder="Weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
          <CModalFooter>
            <CButton color="secondary" onClick={onClose} disabled={loading}>
              {loading ? <CSpinner size="sm" /> : 'Cancel'}
            </CButton>
            <CButton type="submit" color="primary" disabled={loading}>
              {loading ? <CSpinner size="sm" /> : 'Add'}
            </CButton>
          </CModalFooter>
        </CForm>
      </CModalBody>
    </CModal>
  )
}

export default AddReceiving
