/* eslint-disable prettier/prettier */
import { CCard, CCardBody, CContainer, CHeader } from '@coreui/react'
import React, { useState, useEffect } from 'react'
import AddVehicle from './ComponentVehicle/AddVehicle'
import TableVehicle from './ComponentVehicle/TableVehicle'
import axios from 'axios'

const API = import.meta.env.VITE_APP_API_URL
const api = axios.create({
  baseURL: API,
})

const VehicleManagement = () => {
  const [vehicle, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchVehicle = async () => {
    setLoading(true)
    try {
      const response = await api.get('/api/v1/vehicle')
      if (response.status === 200) {
        setVehicles(response.data.data)
        setLoading(false)
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchVehicle()
  })
  const handleAddVehicle = (newVehicle) => {
    setVehicles((preVehicles) => [...preVehicles, newVehicle])
  }

  const handleDeleteVehicle = (vehicleId) => {
    setVehicles((preVehicles) => preVehicles.filter((vehicle) => vehicle.id !== vehicleId))
  }

  const handleUpdateVehicle = (updatedVehicle) => {
    setVehicles((preVehicles) =>
      preVehicles.map((vehicle) => (vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle)),
    )
  }
  return (
    <>
      <CHeader className="text-center">Vehicle Management</CHeader>
      <CContainer className="m-3">
        <AddVehicle onAddVehicle={handleAddVehicle} />
      </CContainer>
      <CCard>
        <CHeader>Vehicle List</CHeader>
        <CCardBody className="md-3">
          <TableVehicle
            vehicle={vehicle}
            error={error}
            onDeleteVehicle={handleDeleteVehicle}
            onUpdateVehicle={handleUpdateVehicle}
            loading={loading}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default VehicleManagement
