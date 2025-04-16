import React, { useEffect, useState } from 'react'
import api from '../../../../utils/api'
import DIspatchingBtn from './DIspatchingBtn'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPrint } from '@fortawesome/free-solid-svg-icons'
import {
  CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CPagination,
  CPaginationItem,
  CBadge,
  CAlert,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CContainer,
  CDropdownItem,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormTextarea,
  CFormSelect,
  CSpinner,
} from '@coreui/react'
import { useToast } from '../../../../components/Toast/Toast'
import CompleteBtnDispatching from './CompleteBtnDispatching'

const TableDispatching = () => {
  const [dispatching, setDispatching] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [vehicle, setVehicle] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [warehouses, setWarehouses] = useState([])
  const { showError, showSuccess } = useToast()
  const [selectedShipment, setSelectedShipment] = useState(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [showDispatchModal, setShowDispatchModal] = useState(false)

  const fectchShipmment = async () => {
    setLoading(true)
    try {
      const response = await api.get(`${import.meta.env.VITE_APP_API_URL_LOG2}api/v1/shipment`)

      if (response.status === 200) {
        const shipmentData = response.data.shipments || []
        setDispatching(shipmentData)
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
    return warehouse ? warehouse.warehouseName : 'Not Yet Assigned'
  }

  const getWarehouseAddress = (warehouseId) => {
    if (!warehouses.length) return 'Loading...'
    const warehouse = warehouses.find((w) => w._id === warehouseId)
    return warehouse ? warehouse.address : 'Not Yet Assigned'
  }

  const filteredShipments = dispatching.filter((shipment) => {
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
      const shipment = dispatching.find((s) => s.tracking_id === trackingId)
      setSelectedShipment(shipment)
      setShowViewModal(true)
    } catch (error) {
      showError('Error viewing shipment details')
    }
  }
  useEffect(() => {
    fectchShipmment()
  }, [])
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

    const airFreightSection =
      shipment.shipping?.shipping_type === 'air'
        ? `
    <div class="section">
      <div class="section-title">AIR FREIGHT DETAILS</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Destination Airport:</span>
          <span class="value">${shipment.shipping?.shipping_details?.destination_airport || 'N/A'}</span>
        </div>
        <div class="info-item">
          <span class="label">Flight Details:</span>
          <span class="value">${shipment.shipping?.shipping_details?.flight_type || 'N/A'}</span>
        </div>
        <div class="info-item">
          <span class="label">Preferred Departure:</span>
          <span class="value">${formatDate(shipment.shipping?.shipping_details?.preferred_departure_date) || 'N/A'}</span>
        </div>
        <div class="info-item">
          <span class="label">Preferred Arrival:</span>
          <span class="value">${formatDate(shipment.shipping?.shipping_details?.preferred_arrival_date) || 'N/A'}</span>
        </div>
      </div>
    </div>
  `
        : ''

    // Sea Freight Section
    const seaFreightSection =
      shipment.shipping?.shipping_type === 'sea'
        ? `
    <div class="section">
      <div class="section-title">SEA FREIGHT DETAILS</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Port of Loading:</span>
          <span class="value">${shipment.shipping?.shipping_details?.loading_port || 'N/A'}</span>
        </div>
        <div class="info-item">
          <span class="label">Port of Discharge:</span>
          <span class="value">${shipment.shipping?.shipping_details?.discharge_port || 'N/A'}</span>
        </div>
        <div class="info-item">
          <span class="label">Vessel Name:</span>
          <span class="value">${shipment.shipping?.shipping_details?.destination_address || 'N/A'}</span>
        </div>
        <div class="info-item">
          <span class="label">Container Type:</span>
          <span class="value">${shipment.shipping?.shipping_details?.cargo_type || 'N/A'}</span>
        </div>
        <div class="info-item">
          <span class="label">Estimated Departure:</span>
          <span class="value">${formatDate(shipment.shipping?.shipping_details?.sailing_date) || 'N/A'}</span>
        </div>
        <div class="info-item">
          <span class="label">Estimated Arrival:</span>
          <span class="value">${formatDate(shipment.shipping?.shipping_details?.estimated_arrival_date) || 'N/A'}</span>
        </div>
      </div>
    </div>
  `
        : ''

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
          <div class="document-title">RECEIVING COPY</div>
          <div class="document-number">Tracking ID: ${shipment.tracking_id}</div>
          <div>Date: ${currentDate}</div>
        </div>
  
        <div class="section">
          <div class="section-title">Storage Details</div>
          <div class="info-grid">    
            <div class="info-item">
              <span class="label">Warehouse:</span>
              <span class="value">${getWarehouseName(shipment.warehouse_id)}</span>
            </div>
            <div class="info-item">
              <span class="label">Warehouse Address:</span>
              <span class="value">${getWarehouseAddress(shipment.warehouse_id)}</span>
            </div>
            
          </div>
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
          <div class="section-title">VEHICLE INFORMATION</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Vehicle:</span>
              <span class="value">${shipment.vehicle?.name || 'N/A'}</span>
            </div>
            <div class="info-item">
              <span class="label">Plate No:</span>
              <span class="value">${shipment.vehicle?.plate_no || 'N/A'}</span>
            </div>
            <div class="info-item">
              <span class="label">Driver:</span>
              <span class="value">${shipment.vehicle?.driver_name || 'N/A'}</span>
            </div>
          </div>
        </div>

              ${airFreightSection}
              ${seaFreightSection}
              

  
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
              id="searchInput9"
              placeholder="Search shipments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <div className="text-end">
              <span className="text-muted">
                Total Records:{' '}
                {filteredShipments.filter((shipment) => shipment.isInWarehouse).length}
              </span>
            </div>
          </div>
        </div>
      </div>
      {Array.isArray(dispatching) && dispatching.length > 0 ? (
        <>
          <CTable hover responsive>
            <CTableHead className="text-center">
              <CTableRow>
                <CTableHeaderCell>Tracking ID</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                {/* <CTableHeaderCell>Payment Status</CTableHeaderCell> */}
                <CTableHeaderCell>Shipper</CTableHeaderCell>
                <CTableHeaderCell>Consignee</CTableHeaderCell>
                <CTableHeaderCell>Consignee Address</CTableHeaderCell>
                {/* <CTableHeaderCell>Shipping Type</CTableHeaderCell> */}
                <CTableHeaderCell>Vehicle</CTableHeaderCell>
                <CTableHeaderCell>Driver</CTableHeaderCell>
                <CTableHeaderCell>Storage Warehouse</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody className="text-center">
              {currentItems
                .filter((shipment) => shipment.isInWarehouse)
                .map((shipment) => (
                  <CTableRow key={shipment.tracking_id}>
                    <CTableDataCell>{shipment.tracking_id}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={getBadgeColor(shipment.dispatch)}>
                        {shipment.dispatch || 'N/A'}
                      </CBadge>
                    </CTableDataCell>
                    {/* <CTableDataCell>
                          <CBadge color={getBadgeColor(shipment.dispatch)}>
                            {shipment.dispatch || 'N/A'}
                          </CBadge>
                        </CTableDataCell> */}
                    {/* <CTableDataCell>
                      <CBadge color={getBadgeColor(shipment.paid)}>{shipment.paid || 'N/A'}</CBadge>
                    </CTableDataCell> */}
                    <CTableDataCell>
                      {shipment.shipper?.shipper_company_name || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell>
                      {shipment.consignee?.consignee_company_name || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell>
                      {shipment.consignee?.consignee_company_address || 'N/A'}
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
                    <CTableDataCell>
                      {shipment.warehouse_id ? (
                        <CBadge color="success">{getWarehouseName(shipment.warehouse_id)}</CBadge>
                      ) : (
                        <CBadge color="secondary">N/A</CBadge>
                      )}
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
                              <NavIcon icon={faEye} /> View
                            </CButton>

                            <CButton
                              color="secondary"
                              variant="outline"
                              className="mb-3"
                              onClick={() => printReceipt(shipment)}
                              disabled={loading || !shipment.vehicle.name}
                            >
                              <NavIcon icon={faPrint} /> Print
                            </CButton>

                            <DIspatchingBtn shipment={shipment} onSuccess={fectchShipmment} />

                            <CompleteBtnDispatching
                              shipment={shipment}
                              onSuccess={fectchShipmment}
                            />
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
                  filteredShipments.filter((shipment) => shipment.isInWarehouse).length,
                )}{' '}
                of {filteredShipments.filter((shipment) => shipment.isInWarehouse).length} entries
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
                  </p> */}
                  {/* <p>
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
                  <h6>Shipping Details</h6>
                  {/* <p>
                    <strong>Shipping Type:</strong> {selectedShipment.shipping?.shipping_type}
                  </p> */}
                  {/* <p>
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
    </>
  )
}

export default TableDispatching
