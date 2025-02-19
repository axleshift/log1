import React, { useEffect, useState } from 'react'
import AddDriver from './ComponentsDriver/AddDrivers'
import TableDriver from './ComponentsDriver/TableDriver'
import { CCard, CCardBody, CContainer, CHeader } from '@coreui/react'
import api from '../../../utils/api'
const DriversManagement = () => {
  const [driver, setDrivers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchDrivers = async () => {
    setLoading(true)
    try {
      const response = await api.get('/api/v1/driver')
      if (response.status === 200) {
        setDrivers(response.data.data)
        setLoading(false)
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDrivers()
  }, [])

  const handleAddDriver = (newDriver) => {
    setDrivers((preDrivers) => [...preDrivers, newDriver])
  }

  const handleDeleteDriver = (driverId) => {
    setDrivers((preDrivers) => preDrivers.filter((driver) => driver._id !== driverId))
  }

  const handleUpdateDriver = (updatedDriver) => {
    setDrivers((preDrivers) =>
      preDrivers.map((driver) => (driver._id === updatedDriver._id ? updatedDriver : driver)),
    )
  }
  return (
    <>
      <CHeader className="text-center">Driver Management</CHeader>
      <CContainer className="m-3">
        <AddDriver onAddDriver={handleAddDriver} />
      </CContainer>
      <CCard>
        <CHeader>Drivers list</CHeader>
        <CCardBody className="md-3">
          <TableDriver
            driver={driver}
            loading={loading}
            error={error}
            onDeleteDriver={handleDeleteDriver}
            onUpdateDriver={handleUpdateDriver}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default DriversManagement
