import React, { useEffect, useState } from 'react'
import AddDriver from './ComponentsDriver/AddDrivers'
import TableDriver from './ComponentsDriver/TableDriver'
import {
  CCard,
  CCardBody,
  CContainer,
  CHeader,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react'
import api from '../../../utils/api'
import { useToast } from '../../../components/Toast/Toast'
const DriversManagement = () => {
  const { showError } = useToast()
  const [driver, setDrivers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedLogId, setSelectedLogId] = useState(null)

  const fetchDrivers = async () => {
    setLoading(true)
    try {
      const response = await api.get('/api/v1/driver')
      if (response.status === 200) {
        setDrivers(response.data.data)
        setLoading(false)
      } else {
        setError(response.data.message)
        showError(response.data.message)
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message)
      showError(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDrivers()
  }, [])

  const handleAddDriver = (newDriver) => {
    setDrivers((preDrivers) => [...preDrivers, newDriver])
    fetchDrivers()
  }
  const handleDeleteClick = (id) => {
    setSelectedLogId(id)
    setDeleteModal(true)
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
            onDeleteDriver={handleDeleteClick}
            onUpdateDriver={handleUpdateDriver}
          />
        </CCardBody>
      </CCard>
      <CModal visible={deleteModal} onClose={() => setDeleteModal(false)} alignment="center">
        <CModalHeader closeButton>Confirm Delete</CModalHeader>
        <CModalBody>
          Are you sure you want to delete this driver? This action cannot be undone.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeleteModal(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={handleDeleteDriver}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default DriversManagement
