import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faListCheck,
  faCircle,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import { getRole, getUsername } from '../../../../utils/auth'
import {
  CAccordion,
  CAlert,
  CInputGroup,
  CAccordionItem,
  CAccordionBody,
  CAccordionHeader,
  CHeader,
  CFormInput,
  CInputGroupText,
  CContainer,
  CButton,
  CFormCheck,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCol,
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CListGroup,
  CListGroupItem,
  CBadge,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import api from '../../../../utils/api'
import { useToast } from '../../../../components/Toast/Toast'
import CompleteButtonMaintenance from './CompleteButtonMaintenance'
import UpdateMaintenance from './UpdateMaintenance'
const TableMaintenance = ({
  onDeleteMaintenance,
  onUpdateMaintenance,
  maintenance,
  onCompleted,
  vehicles,
  loading,
  error,
  selectedMaintenanceId,
}) => {
  const role = getRole()
  const { showError, showSuccess } = useToast()
  const adminRolse = ['admin', 'chief mechanic']
  const [locaLError, setLocalError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterdMaintenance, setFilterdMaintenance] = useState([])
  const [checklistModal, setChecklistModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filterdMaintenance.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filterdMaintenance.length / itemsPerPage)
  const [activeItems, setActiveItems] = useState([])
  const [selectedMaintenance, setSelectedMaintenance] = useState({ checklist: [] })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (selectedMaintenanceId) {
      console.log('Selected Maintenance ID:', selectedMaintenanceId) // Debug log
      setActiveItems([selectedMaintenanceId])

      // Scroll to element after a short delay to ensure rendering
      setTimeout(() => {
        const element = document.getElementById(`maintenance-${selectedMaintenanceId}`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    }
  }, [selectedMaintenanceId])

  useEffect(() => {
    setFilterdMaintenance(maintenance)
  }, [maintenance])

  const openChecklistModal = (maintenance) => {
    setSelectedMaintenance(maintenance)
    setChecklistModal(true)
  }

  const closeChecklistModal = () => {
    setSelectedMaintenance(null)
    setChecklistModal(false)
  }
  const handleChecklistItemToggle = async (maintenanceId, itemIndex) => {
    try {
      const username = getUsername()
      const response = await api.patch(
        `api/v1/maintenance/${maintenanceId}/checklist/${itemIndex}`,
        { completedBy: username },
      )
      if (response.data.success) {
        setFilterdMaintenance((prevMaintenance) =>
          prevMaintenance.map((m) => (m._id === maintenanceId ? response.data.data : m)),
        )
        // Update the selected maintenance as well
        if (selectedMaintenance?._id === maintenanceId) {
          setSelectedMaintenance(response.data.data)
        }
        showSuccess(response.data.message)
      }
    } catch (error) {
      console.error('Error updating checklist:', error)
      showError(error.response?.data?.message || 'Error updating checklist item')
    }
  }
  const getVehicleDetails = (vehicle) => {
    if (!vehicle) return 'N/A'
    return `${vehicle.brand || ''} ${vehicle.model || ''} ${vehicle.regisNumber || ''}`.trim()
  }

  useEffect(() => {
    const handleSearch = () => {
      setCurrentPage(1)
      if (searchQuery === '') {
        setFilterdMaintenance(maintenance)
      } else {
        const filteredMaintenance = maintenance.filter((maintenance) => {
          return (
            maintenance.vehicle?.regisNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            maintenance.vehicle?.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            maintenance.vehicle?.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
            maintenance.maintenanceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            maintenance.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
            maintenance.status.toLowerCase().includes(searchQuery.toLowerCase())
          )
        })

        setFilterdMaintenance(filteredMaintenance)
        if (filteredMaintenance.length === 0) {
          setLocalError('No vehicles found')
        } else {
          setLocalError(null)
        }
      }
    }
    handleSearch()
  }, [searchQuery, maintenance])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'green'
      case 'Scheduled':
        return 'orange'
      case 'In Progress':
        return 'yellow'
      default:
        return 'black'
    }
  }

  const options = [
    { value: 'Completed', label: 'Completed' },
    { value: 'Scheduled', label: 'Scheduled' },
    { value: 'In Progress', label: 'In Progress' },
  ]

  return (
    <>
      <CContainer className="mt-3">
        <CInputGroup className="mb-3">
          <CFormInput
            type="text"
            placeholder="Search"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <CInputGroupText>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </CInputGroupText>
        </CInputGroup>
      </CContainer>
      <CAccordion activeItems={activeItems} className="m-2">
        {currentItems.map((maintenance, index) => (
          <CAccordionItem
            key={maintenance._id}
            itemKey={maintenance._id}
            id={`maintenance-${maintenance._id}`}
          >
            <CAccordionHeader className="d-flex justify-content-between">
              <CContainer>
                <ul className="list-unstyled">
                  <li>
                    Vehicle: <strong>{getVehicleDetails(maintenance.vehicle)}</strong>
                  </li>
                  <li>
                    Priority: <strong>{maintenance.priority || 'N/A'}</strong>
                  </li>
                </ul>
              </CContainer>
              <CContainer className="d-flex justify-content-end">
                <FontAwesomeIcon
                  icon={faCircle}
                  color={getStatusColor(maintenance.status)}
                  className="m-2 float-end"
                />
                <small className="m2 float-end">
                  {options.find((option) => option.value === maintenance.status).label}
                </small>
              </CContainer>
            </CAccordionHeader>
            <CAccordionBody>
              <CHeader>Maintenance Type: {maintenance.maintenanceType || 'N/A'}</CHeader>
              <CHeader>
                Start Date:{' '}
                {maintenance.startDate
                  ? new Date(maintenance.startDate).toLocaleDateString()
                  : 'N/A'}
              </CHeader>
              <CHeader>
                Expected Date:{' '}
                {maintenance.expectedEndDate
                  ? new Date(maintenance.expectedEndDate).toLocaleDateString()
                  : 'N/A'}
              </CHeader>
              <CHeader>Description: {maintenance.description || 'N/A'}</CHeader>
              <CHeader>Category: {maintenance.category || 'N/A'}</CHeader>
              <CHeader>Notes: {maintenance.notes || 'N/A'}</CHeader>
              <CHeader>Completed By: {maintenance.completedBy || 'N/A'}</CHeader>

              <CCard className="mt-3">
                <CCardHeader>
                  <strong>Parts Required</strong>
                </CCardHeader>
                <CCardBody>
                  {maintenance.parts && maintenance.parts.length > 0 ? (
                    <>
                      <CListGroup>
                        {maintenance.parts.map((part, index) => (
                          <CListGroupItem
                            key={index}
                            className="d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <strong>{part.partName}</strong>
                            </div>
                            <div className="d-flex gap-3">
                              <CBadge color="primary">Qty: {part.quantity}</CBadge>
                            </div>
                          </CListGroupItem>
                        ))}
                      </CListGroup>
                    </>
                  ) : (
                    <CAlert color="info">No parts listed for this maintenance</CAlert>
                  )}
                </CCardBody>
              </CCard>

              <CContainer className="d-flex justify-content-end mt-3">
                {adminRolse.includes(role) && (
                  <UpdateMaintenance
                    maintenance={maintenance}
                    onUpdateMaintenance={onUpdateMaintenance}
                    vehicles={vehicles}
                    disabled={maintenance.status === 'Completed'}
                  />
                )}

                <CButton
                  color="primary"
                  className="m-1"
                  variant="outline"
                  onClick={() => openChecklistModal(maintenance)}
                >
                  <FontAwesomeIcon icon={faListCheck} />
                </CButton>
                <CButton
                  color="danger"
                  className="m-1"
                  variant="outline"
                  onClick={() => onDeleteMaintenance(maintenance._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </CButton>
              </CContainer>
            </CAccordionBody>
          </CAccordionItem>
        ))}
      </CAccordion>

      {filterdMaintenance.length > 0 && (
        <CContainer className="d-flex justify-content-between align-items-center">
          <CContainer>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filterdMaintenance.length)}{' '}
            of {filterdMaintenance.length} entries
          </CContainer>

          <CPagination className="mt-3">
            <CPaginationItem
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </CPaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <CPaginationItem
                key={page}
                active={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </CPaginationItem>
            ))}

            <CPaginationItem
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </CPaginationItem>
          </CPagination>
        </CContainer>
      )}
      {locaLError && <CAlert color="danger">{locaLError}</CAlert>}
      <CModal visible={checklistModal} onClose={closeChecklistModal} size="lg">
        <CModalHeader>
          <CModalTitle>
            Maintenance Checklist - {getVehicleDetails(selectedMaintenance?.vehicle)}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedMaintenance?.checklist && selectedMaintenance.checklist.length > 0 ? (
            <div className="checklist-container">
              <ul className="list-group">
                {selectedMaintenance.checklist.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <CFormCheck
                        type="checkbox"
                        id={`checkBoxList-${index}`}
                        checked={item.completed}
                        onChange={() => handleChecklistItemToggle(selectedMaintenance._id, index)}
                        disabled={!adminRolse.includes(role)}
                        className="me-2"
                      />{' '}
                      {item.task}
                    </div>
                    {item.completed && (
                      <small className="text-muted">
                        Completed by: {item.completedBy} at{' '}
                        {new Date(item.completedAt).toLocaleString()}
                      </small>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-center">No checklist items available</p>
          )}
        </CModalBody>
        <CModalFooter>
          {selectedMaintenance && (
            <CompleteButtonMaintenance
              maintenance={selectedMaintenance}
              isLoading={isLoading}
              onCompleted={onCompleted}
              disabled={!adminRolse.includes(role)}
            />
          )}
          <CButton color="secondary" onClick={closeChecklistModal}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default TableMaintenance
