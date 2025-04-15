import React, { useState, useEffect } from 'react'
import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CButton,
  CFormInput,
  CBadge,
  CPagination,
  CPaginationItem,
  CAlert,
  CSpinner,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import api from '../../../utils/api'
import axios from 'axios'
import { useToast } from '../../../components/Toast/Toast'

const ShipmentItemWarehouse = () => {
  const { showError, showSuccess } = useToast()
  const [receiving, setReceiving] = useState([]) // Initialize as empty array
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState(null)
  const [localError, setLocalError] = useState(null)
  const [warehouses, setWarehouses] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const navigate = useNavigate()

  //   // Fetch Data
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(`${import.meta.env.VITE_APP_API_URL_LOG2}api/v1/shipment`)
  //         // Ensure we're setting an array
  //         setReceiving(Array.isArray(response.data) ? response.data : [])
  //         setLoading(false)
  //       } catch (error) {
  //         console.error('Error fetching data:', error)
  //         showError('Failed to fetch shipment data')
  //         setReceiving([]) // Set to empty array on error
  //         setLoading(false)
  //       }
  //     }
  //     fetchData()
  //   }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL_LOG2}api/v1/shipment`)

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
    fetchData()
  }, [])

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

  // Filter shipments based on search query
  const filteredShipments = Array.isArray(receiving)
    ? receiving.filter((shipment) => {
        const searchString = searchQuery.toLowerCase()
        return (
          shipment?.tracking_id?.toLowerCase().includes(searchString) ||
          shipment?.shipper?.shipper_company_name?.toLowerCase().includes(searchString) ||
          shipment?.dispatch?.toLowerCase().includes(searchString) ||
          shipment?.warehouse_id?.toString().includes(searchString)
        )
      })
    : []

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredShipments.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredShipments.length / itemsPerPage)

  // Handle view details

  // Get badge color based on dispatch status
  const getBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'warning'
      case 'completed':
        return 'success'
      case 'cancelled':
        return 'danger'
      default:
        return 'info'
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <CSpinner color="primary" />
      </div>
    )
  }

  return (
    <div className="container-fluid">
      <div className="mb-3">
        <div className="row align-items-center">
          <div className="col-md-6">
            <CInputGroup className="mb-2 mt-2">
              <CFormInput
                type="text"
                id="searchInput"
                placeholder="Search by tracking ID, shipper, status, warehouse..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <CInputGroupText>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </CInputGroupText>
            </CInputGroup>
          </div>
          <div className="col-md-6">
            <div className="text-end">
              <span className="text-muted">
                Total Records:{' '}
                {
                  filteredShipments.filter(
                    (shipment) => shipment.isInWarehouse && shipment.dispatch !== 'Completed',
                  ).length
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {filteredShipments.length > 0 ? (
        <>
          <CAccordion flush>
            {currentItems
              .filter((shipment) => shipment.isInWarehouse && shipment.dispatch !== 'Completed')
              .map((shipment) => (
                <CAccordionItem key={shipment.tracking_id || Math.random()}>
                  <CAccordionHeader>
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <div>
                        <strong>Tracking ID:</strong> {shipment.tracking_id}
                      </div>
                      <div className="d-flex gap-3 me-3">
                        {getWarehouseName(shipment.warehouse_id)}
                        <CBadge color={getBadgeColor(shipment.dispatch)}>
                          {shipment.dispatch || 'N/A'}
                        </CBadge>
                      </div>
                    </div>
                  </CAccordionHeader>
                  <CAccordionBody>
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="mb-3">Shipper Details</h6>
                        <p>
                          <strong>Company:</strong>{' '}
                          {shipment.shipper?.shipper_company_name || 'N/A'}
                        </p>
                        <p>
                          <strong>Address:</strong>{' '}
                          {shipment.shipper?.shipper_company_address || 'N/A'}
                        </p>
                        <p>
                          <strong>Contact:</strong>{' '}
                          {shipment.shipper?.shipper_contact_name || 'N/A'}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <h6 className="mb-3">Consignee Details</h6>
                        <p>
                          <strong>Company:</strong>{' '}
                          {shipment.consignee?.consignee_company_name || 'N/A'}
                        </p>
                        <p>
                          <strong>Address:</strong>{' '}
                          {shipment.consignee?.consignee_company_address || 'N/A'}
                        </p>
                        <p>
                          <strong>Contact:</strong>{' '}
                          {shipment.consignee?.consignee_contact_name || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <h6 className="mb-3">Vehicle Details</h6>
                        <p>
                          <strong>Vehicle:</strong>{' '}
                          {shipment.vehicle?.name && shipment.vehicle?.plate_no
                            ? `${shipment.vehicle.name} (${shipment.vehicle.plate_no})`
                            : 'N/A'}
                        </p>
                        <p>
                          <strong>Driver:</strong> {shipment.vehicle?.driver_name || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </CAccordionBody>
                </CAccordionItem>
              ))}
          </CAccordion>

          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <span className="text-muted">
                  Showing {indexOfFirstItem + 1} to{' '}
                  {Math.min(
                    indexOfLastItem,
                    filteredShipments.filter(
                      (shipment) => shipment.isInWarehouse && shipment.dispatch !== 'Completed',
                    ).length,
                  )}{' '}
                  of{' '}
                  {
                    filteredShipments.filter(
                      (shipment) => shipment.isInWarehouse && shipment.dispatch !== 'Completed',
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
          )}
        </>
      ) : (
        <CAlert color="info" className="text-center p-4">
          No shipment records found
        </CAlert>
      )}
    </div>
  )
}

export default ShipmentItemWarehouse
