import {
  CCard,
  CCardBody,
  CContainer,
  CHeader,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CButton,
  CTabs,
  CTabList,
  CTab,
  CTabPanel,
  CTabContent,
  CSpinner,
  CAlert,
} from '@coreui/react'
import React, { useState, useEffect } from 'react'
import AddVehicle from './ComponentVehicle/AddVehicle'
import TableVehicle from './ComponentVehicle/TableVehicle'
import api from '../../../utils/api'
import { useToast } from '../../../components/Toast/Toast'
import RestoredVehicles from './ComponentVehicle/RestoredVehicles'
import { getRole } from '../../../utils/auth'

const VehicleManagement = () => {
  const role = getRole()
  const roles = 'admin'
  const { showSuccess, showError } = useToast()
  const [vehicle, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedLogId, setSelectedLogId] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [restoredVehicle, setRestoredVehicles] = useState([])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [vehicle, restoredVehicle] = await Promise.all([
        api.get('/api/v1/vehicle'),
        api.get('/api/v1/vehicle/restored'),
      ])
      setVehicles(vehicle.data.data)
      setRestoredVehicles(restoredVehicle.data.data)
    } catch (error) {
      showError(error.response?.data?.message || 'Error fetching data')
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDeleteClick = (id) => {
    setSelectedLogId(id)
    setDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      await api.patch(`/api/v1/vehicle/${selectedLogId}`)
      setVehicles((prev) => prev.filter((log) => log._id !== selectedLogId))
      showSuccess('Vehicle deleted successfully')
      setDeleteModal(false)
      fetchData()
    } catch (error) {
      showError(error.response?.data?.message || 'Error deleting vehicle')
    }
  }

  const handleAddVehicle = (newVehicle) => {
    setVehicles((preVehicles) => [...preVehicles, newVehicle])
  }

  const handleRestoreVehicle = (restoredVehicle) => {
    setRestoredVehicles((prevVehicles) =>
      prevVehicles.map((v) => (v._id === restoredVehicle._id ? restoredVehicle : v)),
    )
    fetchData()
  }

  const handleUpdateVehicle = (updatedVehicle) => {
    setVehicles(
      (preVehicles) =>
        preVehicles.map((vehicle) =>
          vehicle._id === updatedVehicle._id ? updatedVehicle : vehicle,
        ),
      fetchVehicle(),
    )
  }

  return (
    <>
      <CHeader className="text-center">Vehicle Management</CHeader>

      <CContainer className="m-3">
        <AddVehicle onAddVehicle={handleAddVehicle} />
      </CContainer>
      <CTabs activeItemKey="Vehicle List">
        <CTabList variant="tabs">
          <CTab itemKey="Vehicle List">Vehicle List</CTab>
          <CTab itemKey="Restore Vehicles">Restore Vehicles</CTab>
        </CTabList>
        <CTabContent>
          <CTabPanel itemKey="Vehicle List">
            <CCard>
              <CHeader>Vehicle List</CHeader>
              <CCardBody className="md-3">
                <TableVehicle
                  vehicle={vehicle}
                  error={error}
                  onDeleteVehicle={handleDeleteClick}
                  onUpdateVehicle={handleUpdateVehicle}
                  loading={loading}
                />
              </CCardBody>
            </CCard>
          </CTabPanel>
          <CTabPanel itemKey="Restore Vehicles">
            {role.includes(roles) ? (
              <CCard>
                <CHeader>Restore Vehicles</CHeader>
                <CCardBody className="md-3">
                  <RestoredVehicles
                    restoredVehicle={restoredVehicle}
                    onRestoreVehicle={handleRestoreVehicle}
                  />
                </CCardBody>
              </CCard>
            ) : (
              <CAlert color="danger" className="text-center justify-content-center m-5">
                You are not authorized to view this tab
              </CAlert>
            )}
          </CTabPanel>
        </CTabContent>
      </CTabs>

      <CModal visible={deleteModal} onClose={() => setDeleteModal(false)} alignment="center">
        <CModalHeader>Confirm Delete</CModalHeader>
        <CModalBody>Are you sure you want to delete this vehicle?</CModalBody>
        <CModalFooter>
          <CButton color="danger" variant="outline" onClick={handleDeleteConfirm}>
            Delete
          </CButton>
          <CButton color="secondary" variant="outline" onClick={() => setDeleteModal(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default VehicleManagement
