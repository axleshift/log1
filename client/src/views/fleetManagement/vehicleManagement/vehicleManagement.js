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
import VehicleReport from './ComponentVehicle/VehicleReport'
import api from '../../../utils/api'
import { useToast } from '../../../components/Toast/Toast'
import RestoredVehicles from './ComponentVehicle/RestoredVehicles'
import { getRole } from '../../../utils/auth'

const VehicleManagement = () => {
  const role = getRole()
  const adminRoles = ['super admin', 'admin', 'manager', 'fleet manager']
  const { showSuccess, showError } = useToast()

  const [vehicle, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedLogId, setSelectedLogId] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [restoredVehicle, setRestoredVehicles] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const checkExpirations = () => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) => {
          const expDate = new Date(vehicle.regisExprationDate)
          expDate.setHours(0, 0, 0, 0)

          if (expDate <= today && vehicle.status !== 'forRegistration') {
            return { ...vehicle, status: 'forRegistration' }
          }
          return vehicle
        }),
      )
    }

    // Check on component mount and every day at midnight
    checkExpirations()
    const interval = setInterval(checkExpirations, 24 * 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [vehicle, restoredVehicle] = await Promise.all([
        api.get('api/v1/vehicle'),
        api.get('api/v1/vehicle/restored'),
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

  const handleDeleteClick = (id) => {
    setSelectedLogId(id)
    setDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      await api.patch(`api/v1/vehicle/${selectedLogId}`)
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
      fetchData(),
    )
  }
  if (loading) {
    return (
      <div className="text-center">
        <CSpinner color="primary" />
      </div>
    )
  }

  return (
    <>
      {role && adminRoles.includes(role) ? (
        <>
          <CHeader className="text-center">Vehicle Management</CHeader>

          <CContainer className="m-3">
            <AddVehicle onAddVehicle={handleAddVehicle} />
          </CContainer>
          <CTabs activeItemKey="Vehicle List">
            <CTabList variant="tabs">
              <CTab itemKey="Vehicle List">Vehicle List</CTab>
              <CTab itemKey="Restore Vehicles">Restore Vehicles</CTab>
              <CTab itemKey="Vehicle Report">Vehicle Report</CTab>
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
                {role && adminRoles.includes(role) && role !== 'fleet manager' ? (
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
              <CTabPanel itemKey="Vehicle Report">
                <CCard>
                  <CHeader>Vehicle Report</CHeader>
                  <CCardBody className="md-3">
                    <VehicleReport vehicle={vehicle} />
                  </CCardBody>
                </CCard>
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
      ) : (
        <CAlert color="danger" className="text-center justify-content-center m-5">
          You do not have permission to access this page.
        </CAlert>
      )}
    </>
  )
}

export default VehicleManagement
