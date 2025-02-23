import React, { useState, useEffect } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CSpinner,
  CButton,
  CInputGroup,
  CFormInput,
  CFormSelect,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CAlert,
  CPagination,
  CPaginationItem,
  CInputGroupText,
  CContainer,
  CBadge,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faTrash,
  faEdit,
  faSortUp,
  faSortDown,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { getRole } from '../../../../utils/auth'

const TableFuelLogs = ({
  fuelLogs,
  vehicles,
  drivers,
  loading,
  error,
  onDeleteFuelLog,
  onUpdateFuelLog,
  onViewReceipt,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState('date')
  const [sortDirection, setSortDirection] = useState('desc')
  const [filterVehicle, setFilterVehicle] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10) // You can make this adjustable if needed
  const [localError, setLocalError] = useState(null)
  const role = getRole()
  const adminRoles = ['manager', 'admin']

  // Sorting function
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Get vehicle details
  // const getVehicleDetails = (vehicleId, log) => {
  //   if (
  //     typeof vehicleId === 'object' &&
  //     vehicleId?.brand &&
  //     vehicleId?.model &&
  //     vehicleId?.regisNumber
  //   ) {
  //     return `${vehicleId.brand} ${vehicleId.model} (${vehicleId.regisNumber})`
  //   }

  //   if (!vehicleId && log?.vehicleDetails) {
  //     return `${log.vehicleDetails.brand} ${log.vehicleDetails.model} (${log.vehicleDetails.regisNumber}) [Deleted]`
  //   }

  //   const vehicle = vehicles.find((v) => v._id === vehicleId)
  //   if (vehicle) {
  //     return `${vehicle.brand} ${vehicle.model} (${vehicle.regisNumber})`
  //   }

  // }

  // // // Get driver details
  // const getDriverDetails = (driverId, log) => {
  //   if (typeof driverId === 'object' && driverId?.driverName) {
  //     return driverId.driverName
  //   }

  //   if (!driverId && log?.driverDetails?.driverName) {
  //     return `${log.driverDetails.driverName} [Deleted]`
  //   }

  //   const driver = drivers.find((d) => d._id === driverId)
  //   if (driver?.driverName) {
  //     return driver.driverName
  //   }

  // }

  // Delete these functions as they're not needed
  // const getVehicleDetails = (vehicleId, log) => { ... }
  // const getDriverDetails = (driverId, log) => { ... }
  const filteredAndSortedData = fuelLogs.filter((log) => {
    if (!log) return false

    const searchLower = searchTerm.toLowerCase()

    // Get vehicle and driver info for searching
    const vehicleInfo = log.vehicleId
      ? `${log.vehicleId.brand} ${log.vehicleId.model} ${log.vehicleId.regisNumber}`
      : `${log.vehicleDetails.brand} ${log.vehicleDetails.model} ${log.vehicleDetails.regisNumber}`

    const driverInfo = log.driverId ? log.driverId.driverName : log.driverDetails.driverName

    // Search in all relevant fields
    return (
      vehicleInfo.toLowerCase().includes(searchLower) ||
      driverInfo.toLowerCase().includes(searchLower) ||
      (log.receiptNumber?.toLowerCase() || '').includes(searchLower) ||
      (log.date ? new Date(log.date).toLocaleDateString().includes(searchLower) : false) ||
      (log.fuelQuantity?.toString() || '').includes(searchLower) ||
      (log.totalCost?.toString() || '').includes(searchLower)
    )
  })

  //   // Filter and sort data
  // const filteredAndSortedData = fuelLogs
  //   .filter((log) => {
  //     if (!log) return false // Skip if log is null

  //     // Safely get vehicle and driver details
  //     const vehicleDetails = getVehicleDetails(log.vehicleId, log).toLowerCase()
  //     const driverDetails = getDriverDetails(log.driverId, log).toLowerCase()
  //     const searchLower = searchTerm.toLowerCase()

  //     // Safely check all searchable fields
  //     const matchesSearch =
  //       (log.receiptNumber?.toLowerCase() || '').includes(searchLower) ||
  //       vehicleDetails.includes(searchLower) ||
  //       driverDetails.includes(searchLower) ||
  //       (log.date ? new Date(log.date).toLocaleDateString().includes(searchLower) : false) ||
  //       (log.fuelQuantity?.toString() || '').includes(searchLower) ||
  //       (log.totalCost?.toString() || '').includes(searchLower)

  //     // Safely check vehicle filter
  //     const matchesVehicle = filterVehicle
  //       ? (typeof log.vehicleId === 'object' ? log.vehicleId?._id : log.vehicleId) === filterVehicle
  //       : true

  //     return matchesSearch && matchesVehicle
  //   })
  //   .sort((a, b) => {
  //     let aValue, bValue

  //     switch (sortField) {
  //       case 'vehicle':
  //         aValue = getVehicleDetails(a.vehicleId, a)
  //         bValue = getVehicleDetails(b.vehicleId, b)
  //         break
  //       case 'driver':
  //         aValue = getDriverDetails(a.driverId, a)
  //         bValue = getDriverDetails(b.driverId, b)
  //         break
  //       case 'date':
  //         aValue = new Date(a.date || '').getTime()
  //         bValue = new Date(b.date || '').getTime()
  //         break
  //       case 'fuelQuantity':
  //       case 'costPerLiter':
  //       case 'totalCost':
  //         aValue = parseFloat(a[sortField] || 0)
  //         bValue = parseFloat(b[sortField] || 0)
  //         break
  //       default:
  //         aValue = a[sortField] || ''
  //         bValue = b[sortField] || ''
  //     }

  //     // Handle null/undefined values in sorting
  //     if (!aValue && !bValue) return 0
  //     if (!aValue) return 1
  //     if (!bValue) return -1

  //     if (sortDirection === 'asc') {
  //       return aValue > bValue ? 1 : -1
  //     } else {
  //       return aValue < bValue ? 1 : -1
  //     }
  //   })

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredAndSortedData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterVehicle])

  // Update error state
  useEffect(() => {
    if (filteredAndSortedData.length === 0) {
      setLocalError('No matching records found')
    } else {
      setLocalError(null)
    }
  }, [filteredAndSortedData])

  if (loading) {
    return <CSpinner />
  }

  if (error) {
    return <CAlert color="danger">{error}</CAlert>
  }

  return (
    <>
      {/* Search and Filter Controls */}
      <CContainer className="mb-3">
        <CContainer className="row g-3 mb-3">
          <CContainer className="col-md-6 mt-3">
            <CInputGroup>
              <CFormInput
                placeholder="Search by receipt #, vehicle, driver, date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="search"
              />
              <CInputGroupText>
                <FontAwesomeIcon icon={faSearch} />
              </CInputGroupText>
            </CInputGroup>
          </CContainer>
          {/* <CContainer className="col-md-6 mt-3">
            <CFormSelect
              id="filterVehicle"
              value={filterVehicle}
              onChange={(e) => setFilterVehicle(e.target.value)}
            >
              <option value="">All Vehicles</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>
                  {`${vehicle.brand} ${vehicle.model} (${vehicle.regisNumber})`}
                </option>
              ))}
            </CFormSelect>
          </CContainer> */}
        </CContainer>
      </CContainer>

      {/* Table */}
      <CTable hover responsive className="text-center">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
              Date{' '}
              {sortField === 'date' && (
                <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown} />
              )}
            </CTableHeaderCell>
            <CTableHeaderCell
              onClick={() => handleSort('receiptNumber')}
              style={{ cursor: 'pointer' }}
            >
              Receipt #{' '}
              {sortField === 'receiptNumber' && (
                <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown} />
              )}
            </CTableHeaderCell>
            <CTableHeaderCell onClick={() => handleSort('vehicle')} style={{ cursor: 'pointer' }}>
              Vehicle {sortField === 'vehicle' && (sortDirection === 'asc' ? '↑' : '↓')}
            </CTableHeaderCell>
            <CTableHeaderCell onClick={() => handleSort('driver')} style={{ cursor: 'pointer' }}>
              Driver {sortField === 'driver' && (sortDirection === 'asc' ? '↑' : '↓')}
            </CTableHeaderCell>
            <CTableHeaderCell
              onClick={() => handleSort('fuelQuantity')}
              style={{ cursor: 'pointer' }}
            >
              Quantity (L) {sortField === 'fuelQuantity' && (sortDirection === 'asc' ? '↑' : '↓')}
            </CTableHeaderCell>
            <CTableHeaderCell
              onClick={() => handleSort('costPerLiter')}
              style={{ cursor: 'pointer' }}
            >
              Cost/L {sortField === 'costPerLiter' && (sortDirection === 'asc' ? '↑' : '↓')}
            </CTableHeaderCell>
            <CTableHeaderCell onClick={() => handleSort('totalCost')} style={{ cursor: 'pointer' }}>
              Total Cost {sortField === 'totalCost' && (sortDirection === 'asc' ? '↑' : '↓')}
            </CTableHeaderCell>
            <CTableHeaderCell>Fuel Efficiency</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody className="align-middle">
          {currentItems.map((log) => (
            <CTableRow key={log._id}>
              <CTableDataCell>{new Date(log.date).toLocaleDateString()}</CTableDataCell>
              <CTableDataCell>{log.receiptNumber}</CTableDataCell>
              <CTableDataCell>
                {/* Use stored vehicle details if vehicle is deleted */}
                {log.vehicleId ? (
                  `${log.vehicleId.brand} ${log.vehicleId.model} (${log.vehicleId.regisNumber})`
                ) : (
                  <>
                    {`${log.vehicleDetails.brand} ${log.vehicleDetails.model} (${log.vehicleDetails.regisNumber}) `}
                    <CBadge color="danger" className="ms-2">
                      Deleted
                    </CBadge>
                  </>
                )}
              </CTableDataCell>
              <CTableDataCell>
                {/* Use stored driver details if driver is deleted */}
                {log.driverId ? (
                  log.driverId.driverName
                ) : (
                  <>
                    {log.driverDetails.driverName}{' '}
                    <CBadge color="danger" className="ms-2">
                      Deleted
                    </CBadge>
                  </>
                )}
              </CTableDataCell>
              <CTableDataCell>{log.fuelQuantity}</CTableDataCell>
              <CTableDataCell>{log.costPerLiter}</CTableDataCell>
              <CTableDataCell>{log.totalCost}</CTableDataCell>
              <CTableDataCell>
                <CContainer>{log.litersPer100km} L/100km</CContainer>
                <CContainer>{log.kmPerLiter} km/L</CContainer>
                <CContainer>{log.mpg} MPG</CContainer>
              </CTableDataCell>
              <CTableDataCell>
                <CDropdown variant="input-group">
                  <CDropdownToggle color="secondary" variant="outline">
                    Actions
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CButton
                      color="primary"
                      variant="ghost"
                      className="m-2"
                      onClick={() => onViewReceipt(log)}
                    >
                      <FontAwesomeIcon icon={faEye} /> View Receipt
                    </CButton>
                    <CButton
                      color="info"
                      variant="ghost"
                      className="m-2"
                      onClick={() => onUpdateFuelLog(log)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </CButton>
                    {adminRoles.includes(role) && (
                      <CButton
                        color="danger"
                        variant="ghost"
                        className="m-2"
                        onClick={() => onDeleteFuelLog(log._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </CButton>
                    )}
                  </CDropdownMenu>
                </CDropdown>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {/* Pagination */}
      {filteredAndSortedData.length > 0 && (
        <CContainer className="d-flex justify-content-between align-items-center">
          <CContainer>
            Showing {indexOfFirstItem + 1} to{' '}
            {Math.min(indexOfLastItem, filteredAndSortedData.length)} of{' '}
            {filteredAndSortedData.length} entries
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

      {/* Error Messages */}
      {localError && (
        <CAlert color="info" className="text-center">
          {localError}
        </CAlert>
      )}
    </>
  )
}

export default TableFuelLogs
