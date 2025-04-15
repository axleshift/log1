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
  CAlert,
} from '@coreui/react'
import AddReceiving from './AddReceiving'
import CompleteBtnReceiving from './CompleteBtnReceiving'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTruck, faEye, faPrint } from '@fortawesome/free-solid-svg-icons'

const TableReceiving = () => {
  const { showError } = useToast()
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
    return warehouse ? (
      <CBadge color="success">{warehouse.warehouseName}</CBadge>
    ) : (
      <CBadge color="danger">Not Yet Assigned</CBadge>
    )
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

  const handleView = (trackingId) => {
    try {
      const shipment = receiving.find((s) => s.tracking_id === trackingId)
      setSelectedShipment(shipment)
      setShowViewModal(true)
    } catch (error) {
      showError('Error viewing shipment details')
    }
  }

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
      <CAlert color="danger" className="text-center p-4">
        {error}
      </CAlert>
    )
  }
  const generateReceivingCopy = (shipment) => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
      }).format(amount)
    }

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
          }
          .company-logo {
            max-width: 150px;
            margin-bottom: 10px;
          }
          .document-title {
            font-size: 24px;
            font-weight: bold;
            margin: 10px 0;
          }
          .document-number {
            font-size: 14px;
            color: #666;
          }
          .section {
            margin-bottom: 20px;
          }
          .section-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            background-color: #f5f5f5;
            padding: 5px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .info-item {
            margin-bottom: 5px;
          }
          .label {
            font-weight: bold;
            color: #666;
          }
          .value {
            color: #333;
          }
          .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          .signatures {
            margin-top: 50px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .signature-line {
            border-top: 1px solid #333;
            margin-top: 25px;
            padding-top: 5px;
            text-align: center;
          }
          @media print {
            body {
              padding: 0;
              margin: 20px;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <!-- Replace with your company logo -->
          <div class="document-title">PICK UP DETAILS</div>
          <div class="document-number">Tracking ID: ${shipment.tracking_id}</div>
          <div>Date: ${currentDate}</div>
        </div>
  
        <div class="section">
          <div class="section-title">SHIPPER DETAILS</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Company:</span>
              <span class="value">${shipment.shipper?.shipper_company_name || 'N/A'}</span>
            </div>
            <div class="info-item">
              <span class="label">Contact Person:</span>
              <span class="value">${shipment.shipper?.shipper_contact_name || 'N/A'}</span>
            </div>
            <div class="info-item">
              <span class="label">Phone:</span>
              <span class="value">${shipment.shipper?.shipper_contact_phone_number || 'N/A'}</span>
            </div>
            <div class="info-item">
              <span class="label">Email:</span>
              <span class="value">${shipment.shipper?.shipper_contact_email_address || 'N/A'}</span>
            </div>
            <div class="info-item">
              <span class="label">Address:</span>
              <span class="value">${shipment.shipper?.shipper_company_address || 'N/A'}</span>
            </div>
          </div>
        </div>
  
        <div class="section">
          <div class="section-title">CONSIGNEE DETAILS</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Company:</span>
              <span class="value">${shipment.consignee?.consignee_company_name || 'N/A'}</span>
            </div>
            <div class="info-item">
              <span class="label">Contact Person:</span>
              <span class="value">${shipment.consignee?.consignee_contact_name || 'N/A'}</span>
            </div>
            <div class="info-item">
              <span class="label">Phone:</span>
              <span class="value">${shipment.consignee?.consignee_contact_phone_number || 'N/A'}</span>
            </div>
            <div class="info-item">
              <span class="label">Email:</span>
              <span class="value">${shipment.consignee?.consignee_contact_email_address || 'N/A'}</span>
            </div>
            <div class="info-item">
              <span class="label">Address:</span>
              <span class="value">${shipment.consignee?.consignee_company_address || 'N/A'}</span>
            </div>
          </div>
        </div>
  
        <div class="section">
          <div class="section-title">SHIPMENT DETAILS</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Description:</span>
              <span class="value">${shipment.shipment?.shipment_description || 'N/A'}</span>
            </div>
            <div class="info-item">
              <span class="label">Weight:</span>
              <span class="value">${shipment.shipment?.shipment_weight || '0'} kg</span>
            </div>
            <div class="info-item">
              <span class="label">Dimensions:</span>
              <span class="value">${shipment.shipment?.shipment_dimension_length || '0'} x ${
                shipment.shipment?.shipment_dimension_width || '0'
              } x ${shipment.shipment?.shipment_dimension_height || '0'} cm</span>
            </div>
            <div class="info-item">
              <span class="label">Volume:</span>
              <span class="value">${shipment.shipment?.shipment_volume || '0'} m³</span>
            </div>
            <div class="info-item">
              <span class="label">Declared Value:</span>
              <span class="value">${formatCurrency(shipment.shipment?.shipment_value || 0)}</span>
            </div>
          </div>
        </div>
  
        <div class="section">
          <div class="section-title">VEHICLE DETAILS</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Vehicle Type:</span>
              <span class="value">${shipment.vehicle?.name || 'N/A'}</span>
            </div>
            <div class="info-item">
              <span class="label">Driver Name:</span>
              <span class="value">${shipment.vehicle?.driver_name || 'N/A'}</span>
            </div>
           
            <div class="info-item">
              <span class="label">Vehicle Plate No:</span>
              <span class="value">${shipment.vehicle?.plate_no || 'N/A'}</span>
            </div>
          </div>
        </div>
  
        <div class="signatures">
          <div>
            <div class="signature-line">
              Received by (Name & Signature)
            </div>
          </div>
          <div>
            <div class="signature-line">
              Authorized by (Name & Signature)
            </div>
          </div>
        </div>
  
        <div class="footer">
          <p>This is an official receiving copy. Please retain for your records.</p>
          <p>Generated on: ${new Date().toLocaleString()}</p>
        </div>
      </body>
      </html>
    `
  }

  // Update the printReceipt function
  const printReceipt = (shipment) => {
    const receiptContent = generateReceivingCopy(shipment)
    const printWindow = window.open('', '_blank')
    printWindow.document.write(receiptContent)
    printWindow.document.close()
    printWindow.print()
  }

  if (
    receiving.filter((shipment) => !shipment.isInWarehouse && shipment.dispatch !== 'Completed')
      .length === 0
  ) {
    return (
      <div className="text-center d-flex justify-content-center align-items-center">
        <CAlert color="warning" className="w-75">
          {' '}
          Receiving shipments is done
        </CAlert>
      </div>
    )
  }

  const NavIcon = ({ icon }) => {
    const [isHovering, setIsHovering] = useState(false)

    return (
      <FontAwesomeIcon
        icon={icon}
        bounce={isHovering}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />
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
              id="searchInput2"
              placeholder="Search shipments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <div className="text-end">
              <span className="text-muted">
                Total Records:{' '}
                {
                  filteredShipments.filter(
                    (shipment) => !shipment.isInWarehouse && shipment.dispatch !== 'Completed',
                  ).length
                }
              </span>
            </div>
          </div>
        </div>
      </div>
      {Array.isArray(receiving) && receiving.length > 0 ? (
        <>
          <CTable hover responsive>
            <CTableHead className="text-center">
              <CTableRow>
                <CTableHeaderCell>Tracking ID</CTableHeaderCell>
                {/* <CTableHeaderCell>Type</CTableHeaderCell>
                <CTableHeaderCell>Payment Status</CTableHeaderCell> */}
                <CTableHeaderCell>Shipper Address</CTableHeaderCell>
                <CTableHeaderCell>Shipper</CTableHeaderCell>
                <CTableHeaderCell>Consignee</CTableHeaderCell>
                {/* <CTableHeaderCell>Shipping Type</CTableHeaderCell> */}
                <CTableHeaderCell>
                  <FontAwesomeIcon icon={faTruck} className="me-2" />
                  Vehicle
                </CTableHeaderCell>
                <CTableHeaderCell>
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Driver
                </CTableHeaderCell>
                <CTableHeaderCell>Storage Warehouse</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody className="text-center">
              {currentItems
                .filter((shipment) => !shipment.isInWarehouse && shipment.dispatch !== 'Completed')
                .map((shipment) => (
                  <CTableRow key={shipment.tracking_id}>
                    <CTableDataCell>{shipment.tracking_id}</CTableDataCell>
                    {/* <CTableDataCell>
                      <CBadge color="primary">{shipment.type || 'N/A'}</CBadge>
                    </CTableDataCell> */}
                    {/* <CTableDataCell>
                      <CBadge color={getBadgeColor(shipment.dispatch)}>
                        {shipment.dispatch || 'N/A'}
                      </CBadge>
                    </CTableDataCell> */}
                    {/* <CTableDataCell>
                      <CBadge color={getBadgeColor(shipment.paid)}>{shipment.paid || 'N/A'}</CBadge>
                    </CTableDataCell> */}
                    <CTableDataCell>
                      {shipment.shipper?.shipper_company_address || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell>
                      {shipment.shipper?.shipper_company_name || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell>
                      {shipment.consignee?.consignee_company_name || 'N/A'}
                    </CTableDataCell>
                    {/* <CTableDataCell>
                      <CBadge color="info">{shipment.shipping?.shipping_type || 'N/A'}</CBadge>
                    </CTableDataCell> */}
                    {/* <CTableDataCell>
                      {(shipment.vehicle.name && shipment.vehicle.plate_no) || 'N/A'}
                    </CTableDataCell> */}

                    <CTableDataCell>
                      {shipment.vehicle?.name && shipment.vehicle?.plate_no ? (
                        <CBadge color="info">
                          {shipment.vehicle.name} ({shipment.vehicle.plate_no})
                        </CBadge>
                      ) : (
                        <CBadge color="secondary">N/A</CBadge>
                      )}
                    </CTableDataCell>

                    <CTableDataCell>
                      {shipment.vehicle?.driver_name ? (
                        <CBadge color="info">{shipment.vehicle.driver_name}</CBadge>
                      ) : (
                        <CBadge color="secondary">N/A</CBadge>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>{getWarehouseName(shipment.warehouse_id)}</CTableDataCell>
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
                              <NavIcon icon={faEye} /> View
                            </CButton>
                            <CButton
                              color="secondary"
                              variant="outline"
                              className="mb-3"
                              onClick={() => printReceipt(shipment)}
                              disabled={loading || !shipment.vehicle}
                            >
                              <NavIcon icon={faPrint} /> Print
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
                {Math.min(
                  indexOfLastItem,
                  filteredShipments.filter(
                    (shipment) => !shipment.isInWarehouse && shipment.dispatch !== 'Completed',
                  ).length,
                )}{' '}
                of{' '}
                {
                  filteredShipments.filter(
                    (shipment) => !shipment.isInWarehouse && shipment.dispatch !== 'Completed',
                  ).length
                }{' '}
                entries
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
        <CAlert color="success" className="text-center p-4">
          No shipment records found
        </CAlert>
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
                  {/* <p>
                    <strong>Receive Date:</strong> {formatDate(selectedShipment.receiveDate)}
                  </p>
                  <p>
                    <strong>Type:</strong> {selectedShipment.type}
                  </p> */}
                  <p>
                    <strong>Dispatch Status:</strong> {selectedShipment.dispatch}
                  </p>
                  {/* <p>
                    <strong>Payment Status:</strong> {selectedShipment.paid}
                  </p> */}
                </div>
                <div className="col-md-6">
                  <h6>Shipping Country</h6>
                  {/* <p>
                    <strong>Shipping Type:</strong> {selectedShipment.shipping?.shipping_type}
                  </p>
                  <p>
                    <strong>Items:</strong> {selectedShipment.items}
                  </p>
                  <p>
                    <strong>Amount:</strong> {selectedShipment.amount}
                  </p> */}
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
