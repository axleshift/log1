import React, { useEffect, useState } from 'react'
import api from '../../../utils/api'
import { useToast } from '../../../components/Toast/Toast'
import AddMaintenance from './maintenanceComponents/AddMaintenance'
import TableMaintenance from './maintenanceComponents/TableMaintenance'
import UpdateMaintenance from './maintenanceComponents/UpdateMaintenance'
import {
  CCard,
  CCardBody,
  CContainer,
  CHeader,
  CSpinner,
  CTabList,
  CTabs,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CTab,
  CTabContent,
  CTabPanel,
} from '@coreui/react'

const MaintenanceManagement = () => {
  const [maintenance, setMaintenance] = useState([])
  const [vehilces, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { showError, showSuccess } = useToast()
  const [selectedMaintenanceId, setSelectedMaintenanceId] = useState(
    location.state?.selectedMaintenanceId || null,
  )
  const [deleteModal, setDeleteModal] = useState(false)

  const fetchMaintenance = async () => {
    setLoading(true)
    try {
      const [maintenance, vehicles] = await Promise.all([
        api.get('/api/v1/maintenance/all'),
        api.get('/api/v1/vehicle'),
      ])
      setMaintenance(maintenance.data.data)
      setVehicles(vehicles.data.date)
    } catch (error) {
      setError(error.message)
      showError(error.response?.data?.message || 'Error fetching data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMaintenance()
  }, [])

  if (loading) {
    return (
      <CSpinner color="primary" size="sm">
        Loading...
      </CSpinner>
    )
  }

  const handleDeleteClick = (id) => {
    setSelectedMaintenanceId(id)
    setDeleteModal(true)
  }

  const hanldeDeleteConfirm = async () => {
    try {
      await api.delete(`/api/v1/maintenance/delete/${selectedMaintenanceId}`)
      setMaintenance((prev) =>
        prev.filter((maintenance) => maintenance._id !== selectedMaintenanceId),
      )
      showSuccess('Maintenance deleted successfully')
      setDeleteModal(false)
    } catch (error) {
      showError(error.response.data.message)
    } finally {
      setDeleteModal(false)
    }
  }

  const handleAddMaintenance = (newMaintenance) => {
    setMaintenance((prevMaintenance) => [...prevMaintenance, newMaintenance])
    fetchMaintenance()
  }
  const handleMaintenanceCompleted = (completedMaintenance) => {
    setMaintenance((prevMaintenance) =>
      prevMaintenance.map((maintenance) =>
        maintenance._id === completedMaintenance._id ? completedMaintenance : maintenance,
      ),
    )
    fetchMaintenance()
  }

  const handleUpdateMaintenance = (updatedMaintenance) => {
    setMaintenance((prevMaintenance) =>
      prevMaintenance.map((maintenance) =>
        maintenance._id === updatedMaintenance._id ? updatedMaintenance : maintenance,
      ),
    )
    fetchMaintenance()
  }
  return (
    <>
      <CContainer>
        <CHeader>Maintenance Management</CHeader>
        <CCard>
          <CCardBody>
            <CContainer>
              <AddMaintenance onAddMaintenance={handleAddMaintenance} />
            </CContainer>
            <CTabs activeItemKey="Maintenance List">
              <CTabList variant="tabs">
                <CTab itemKey="Maintenance List">Maintenance List</CTab>
              </CTabList>
              <CTabContent>
                <CTabPanel itemKey="Maintenance List">
                  <CCardBody className="md-3">
                    <TableMaintenance
                      vehicles={vehilces}
                      maintenance={maintenance}
                      onCompleted={handleMaintenanceCompleted}
                      error={error}
                      onDeleteMaintenance={handleDeleteClick}
                      onUpdateMaintenance={handleUpdateMaintenance}
                      loading={loading}
                      selectedMaintenanceId={selectedMaintenanceId}
                    />
                  </CCardBody>
                </CTabPanel>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CContainer>

      {/* Delete Confirmation Modal */}
      <CModal visible={deleteModal} onClose={() => setDeleteModal(false)} alignment="center">
        <CModalHeader>
          <CModalTitle>Delete Maintenance</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this maintenance?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" variant="outline" onClick={() => setDeleteModal(false)}>
            Cancel
          </CButton>
          <CButton color="danger" variant="outline" onClick={hanldeDeleteConfirm}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default MaintenanceManagement
