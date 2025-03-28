import React, { useState, useEffect } from 'react'
import api from './../../../../utils/api'
import { useToast } from '../../../../components/Toast/Toast'
import {
  CTable,
  CTableRow,
  CTableDataCell,
  CTableBody,
  CTableHeaderCell,
  CTableHead,
  CBadge,
  CSpinner,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormInput,
  CPagination,
  CPaginationItem,
  CButton,
  CContainer,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CRow,
  CCol,
  CFormSelect,
} from '@coreui/react'
import AddReceiving from './AddReceiving'
import CompleteBtnReceiving from './CompleteBtnReceiving'

const TableReceiving = () => {
  const { showError, showSuccess } = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [receiving, setReceiving] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedShipment, setSelectedShipment] = useState(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [warehouses, setWarehouses] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const fectchShipmment = async () => {
    setLoading(true)
    try {
      const response = await api.get(`${import.meta.env.VITE_APP_API_URL_LOG2}api/v1/shipment`)
      console.log(response.data)

      if (response.status === 200) {
        const shipmentData = response.data.shipments || []
        setReceiving(shipmentData)
        setError(null)
      }
    } catch (error) {
      setError(error?.response?.data?.message || 'Error fetching data')
      showError(error?.response?.data?.message || 'Error fetching data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Fetch warehouses
    const fetchWarehouses = async () => {
      try {
        const response = await api.get('/api/v1/warehouseLoc/locations')
        if (response.data.data) {
          setWarehouses(response.data.data)
          showSuccess(response.data.message)
        }
      } catch (error) {
        setLocalError(error?.response?.data.message)
        showError(error?.response?.data.message || 'Error fetching warehouses')
      }
    }
    fetchWarehouses()
  }, [])
  const getWarehouseName = (warehouseId) => {
    if (!warehouses.length) return 'Loading...'
    const warehouse = warehouses.find((w) => w._id === warehouseId)
    return warehouse ? warehouse.warehouseName : 'Not Yet Assigned'
  }

  const filteredShipments = receiving.filter((shipment) => {
    const searchTerm = searchQuery.toLowerCase()
    return (
      shipment.tracking_id?.toLowerCase().includes(searchTerm) ||
      shipment.shipper?.shipper_company_name?.toLowerCase().includes(searchTerm) ||
      shipment.consignee?.consignee_company_name?.toLowerCase().includes(searchTerm) ||
      shipment.type?.toLowerCase().includes(searchTerm) ||
      shipment.dispatch?.toLowerCase().includes(searchTerm) ||
      shipment.paid?.toLowerCase().includes(searchTerm) ||
      shipment.vehicle?.driver_name?.toLowerCase().includes(searchTerm) ||
      shipment.vehicle?.vehicle_plate_no?.toLowerCase().includes(searchTerm) ||
      shipment.vehicle?.name?.toLowerCase().includes(searchTerm) ||
      shipment.vehicle?.plate_no?.toLowerCase().includes(searchTerm) ||
      getWarehouseName(shipment.warehouse_id)?.toLowerCase().includes(searchTerm)
    )
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredShipments.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredShipments.length / itemsPerPage)
  // Add formatDate function
  const formatDate = (date) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Add getBadgeColor function
  const getBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'warning'
      case 'dispatching':
        return 'info'
      case 'completed':
        return 'success'
      case 'unpaid':
        return 'danger'
      case 'paid':
        return 'success'
      case 'void':
        return 'secondary'
      default:
        return 'primary'
    }
  }

  const handleView = (trackingId) => {
    try {
      const shipment = receiving.find((s) => s.tracking_id === trackingId)
      setSelectedShipment(shipment)
      setShowViewModal(true)
    } catch (error) {
      showError('Error viewing shipment details')
    }
  }

  // const handleEdit = (trackingId) => {
  //   try {
  //     const shipment = receiving.find((s) => s.tracking_id === trackingId)
  //     setSelectedShipment(shipment)
  //     setShowEditModal(true)
  //   } catch (error) {
  //     showError('Error editing shipment')
  //   }
  // }

  useEffect(() => {
    fectchShipmment()
  }, [])

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-4">
        <CSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )
  }

  return (
    <>
      <div className="mb-3">
        <div className="row align-items-center">
          <div className="col-md-6">
            <CFormInput
              type="text"
              className="mb-2"
              id="searchInput"
              placeholder="Search shipments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <div className="text-end">
              <span className="text-muted">
                Total Records:{' '}
                {filteredShipments.filter((shipment) => !shipment.isInWarehouse).length}
              </span>
            </div>
          </div>
        </div>
      </div>
      {Array.isArray(receiving) && receiving.length > 0 ? (
        <>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Tracking ID</CTableHeaderCell>
                <CTableHeaderCell>Type</CTableHeaderCell>
                <CTableHeaderCell>Payment Status</CTableHeaderCell>
                <CTableHeaderCell>Shipper</CTableHeaderCell>
                <CTableHeaderCell>Consignee</CTableHeaderCell>
                <CTableHeaderCell>Shipping Type</CTableHeaderCell>
                <CTableHeaderCell>Vehicle</CTableHeaderCell>
                <CTableHeaderCell>Driver</CTableHeaderCell>
                <CTableHeaderCell>Storage Warehouse</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentItems
                .filter((shipment) => !shipment.isInWarehouse)
                .map((shipment) => (
                  <CTableRow key={shipment.tracking_id}>
                    <CTableDataCell>{shipment.tracking_id}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color="primary">{shipment.type || 'N/A'}</CBadge>
                    </CTableDataCell>
                    {/* <CTableDataCell>
                      <CBadge color={getBadgeColor(shipment.dispatch)}>
                        {shipment.dispatch || 'N/A'}
                      </CBadge>
                    </CTableDataCell> */}
                    <CTableDataCell>
                      <CBadge color={getBadgeColor(shipment.paid)}>{shipment.paid || 'N/A'}</CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      {shipment.shipper?.shipper_company_name || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell>
                      {shipment.consignee?.consignee_company_name || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CBadge color="info">{shipment.shipping?.shipping_type || 'N/A'}</CBadge>
                    </CTableDataCell>
                    {/* <CTableDataCell>
                      {(shipment.vehicle.name && shipment.vehicle.plate_no) || 'N/A'}
                    </CTableDataCell> */}

                    <CTableDataCell>
                      {shipment.vehicle?.name && shipment.vehicle?.plate_no
                        ? `${shipment.vehicle.name} (${shipment.vehicle.plate_no})`
                        : 'N/A'}
                    </CTableDataCell>

                    <CTableDataCell>{shipment.vehicle?.driver_name || 'N/A'}</CTableDataCell>
                    <CTableDataCell>
                      {getWarehouseName(shipment.warehouse_id) || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="secondary" size="sm">
                          Actions
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CContainer>
                            <CButton
                              color="info"
                              variant="outline"
                              className="mb-3"
                              onClick={() => handleView(shipment.tracking_id)}
                            >
                              View
                            </CButton>

                            <AddReceiving shipment={shipment} onSuccess={fectchShipmment} />

                            <CompleteBtnReceiving shipment={shipment} onSuccess={fectchShipmment} />
                          </CContainer>
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableDataCell>
                  </CTableRow>
                ))}
            </CTableBody>
          </CTable>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <span className="text-muted">
                Showing {indexOfFirstItem + 1} to{' '}
                {Math.min(indexOfLastItem, filteredShipments.length)} of{' '}
                {filteredShipments.filter((shipment) => !shipment.isInWarehouse).length} entries
              </span>
            </div>
            <CPagination aria-label="Page navigation">
              <CPaginationItem
                aria-label="Previous"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <span aria-hidden="true">Previous</span>
              </CPaginationItem>

              {[...Array(totalPages)].map((_, index) => (
                <CPaginationItem
                  key={index + 1}
                  active={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </CPaginationItem>
              ))}

              <CPaginationItem
                aria-label="Next"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <span aria-hidden="true">Next</span>
              </CPaginationItem>
            </CPagination>
          </div>
        </>
      ) : (
        <div className="text-center p-4">No shipment records found</div>
      )}

      {/* View Modal */}
      <CModal visible={showViewModal} onClose={() => setShowViewModal(false)} size="lg">
        <CModalHeader closeButton>
          <h5>Shipment Details</h5>
        </CModalHeader>
        <CModalBody>
          {selectedShipment && (
            <div className="container">
              <div className="row mb-3">
                <div className="col-md-6">
                  <h6>Basic Information</h6>
                  <p>
                    <strong>Tracking ID:</strong> {selectedShipment.tracking_id}
                  </p>
                  <p>
                    <strong>Receive Date:</strong> {formatDate(selectedShipment.receiveDate)}
                  </p>
                  <p>
                    <strong>Type:</strong> {selectedShipment.type}
                  </p>
                  <p>
                    <strong>Dispatch Status:</strong> {selectedShipment.dispatch}
                  </p>
                  <p>
                    <strong>Payment Status:</strong> {selectedShipment.paid}
                  </p>
                </div>
                <div className="col-md-6">
                  <h6>Shipping Details</h6>
                  <p>
                    <strong>Shipping Type:</strong> {selectedShipment.shipping?.shipping_type}
                  </p>
                  <p>
                    <strong>Items:</strong> {selectedShipment.items}
                  </p>
                  <p>
                    <strong>Amount:</strong> {selectedShipment.amount}
                  </p>
                  <p>
                    <strong>Country:</strong> {selectedShipment.country}
                  </p>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <h6>Shipper Information</h6>
                  <p>
                    <strong>Company:</strong> {selectedShipment.shipper?.shipper_company_name}
                  </p>
                  <p>
                    <strong>Contact:</strong> {selectedShipment.shipper?.shipper_contact_name}
                  </p>
                  <p>
                    <strong>Email:</strong>{' '}
                    {selectedShipment.shipper?.shipper_contact_email_address}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedShipment.shipper?.shipper_contact_phone_number}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedShipment.shipper?.shipper_company_address}
                  </p>
                </div>
                <div className="col-md-6">
                  <h6>Consignee Information</h6>
                  <p>
                    <strong>Company:</strong> {selectedShipment.consignee?.consignee_company_name}
                  </p>
                  <p>
                    <strong>Contact:</strong> {selectedShipment.consignee?.consignee_contact_name}
                  </p>
                  <p>
                    <strong>Email:</strong>{' '}
                    {selectedShipment.consignee?.consignee_contact_email_address}
                  </p>
                  <p>
                    <strong>Phone:</strong>{' '}
                    {selectedShipment.consignee?.consignee_contact_phone_number}
                  </p>
                  <p>
                    <strong>Address:</strong>{' '}
                    {selectedShipment.consignee?.consignee_company_address}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <h6>Shipment Details</h6>
                  <p>
                    <strong>Description:</strong> {selectedShipment.shipment?.shipment_description}
                  </p>
                  <p>
                    <strong>Weight:</strong> {selectedShipment.shipment?.shipment_weight} kg
                  </p>
                  <p>
                    <strong>Dimensions:</strong>{' '}
                    {selectedShipment.shipment?.shipment_dimension_length} x{' '}
                    {selectedShipment.shipment?.shipment_dimension_width} x{' '}
                    {selectedShipment.shipment?.shipment_dimension_height} cm
                  </p>
                  <p>
                    <strong>Volume:</strong> {selectedShipment.shipment?.shipment_volume} m³
                  </p>
                  <p>
                    <strong>Value:</strong> {selectedShipment.shipment?.shipment_value}
                  </p>
                  <p>
                    <strong>Instructions:</strong>{' '}
                    {selectedShipment.shipment?.shipment_instructions}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" variant="outline" onClick={() => setShowViewModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Edit Modal */}
      {/* <CModal visible={showEditModal} onClose={() => setShowEditModal(false)} size="lg">
        <CModalHeader closeButton>
          <h5>Edit Shipment</h5>
        </CModalHeader>
        <CModalBody>
        
          <p>Edit form coming soon...</p>
        </CModalBody>
        <CModalFooter>
          <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              
              setShowEditModal(false)
            }}
          >
            Save Changes
          </button>
        </CModalFooter>
      </CModal> */}
    </>
  )
}

export default TableReceiving
