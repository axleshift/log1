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
  CBadge,
  CInputGroup,
  CFormInput,
  CFormSelect,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CAlert,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

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
  const [localError, setLocalError] = useState(null)
  // Get vehicle details
  const getVehicleDetails = (vehicleId) => {
    if (
      typeof vehicleId === 'object' &&
      vehicleId.brand &&
      vehicleId.model &&
      vehicleId.regisNumber
    ) {
      return `${vehicleId.brand} ${vehicleId.model} (${vehicleId.regisNumber})`
    }
    const vehicle = vehicles.find((v) => v._id === vehicleId)
    if (vehicle) {
      return `${vehicle.brand} ${vehicle.model} (${vehicle.regisNumber})`
    }
    return 'N/A'
  }

  // Get driver details
  const getDriverDetails = (driverId) => {
    if (typeof driverId === 'object' && driverId.driverName) {
      return driverId.driverName
    }
    const driver = drivers.find((d) => d._id === driverId)
    return driver?.driverName || 'N/A'
  }
  // Sorting function
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredAndSortedData = fuelLogs
    .filter((log) => {
      const vehicleDetails = getVehicleDetails(log.vehicleId).toLowerCase()
      const driverDetails = getDriverDetails(log.driverId).toLowerCase()
      const searchLower = searchTerm.toLowerCase()

      const matchesSearch =
        log.receiptNumber.toLowerCase().includes(searchLower) ||
        vehicleDetails.includes(searchLower) ||
        driverDetails.includes(searchLower)

      const matchesVehicle = filterVehicle
        ? (typeof log.vehicleId === 'object' ? log.vehicleId._id : log.vehicleId) === filterVehicle
        : true

      return matchesSearch && matchesVehicle
    })
    .sort((a, b) => {
      let aValue, bValue

      // Special handling for vehicle and driver sorting
      if (sortField === 'vehicle') {
        aValue = getVehicleDetails(a.vehicleId)
        bValue = getVehicleDetails(b.vehicleId)
      } else if (sortField === 'driver') {
        aValue = getDriverDetails(a.driverId)
        bValue = getDriverDetails(b.driverId)
      } else {
        aValue = a[sortField]
        bValue = b[sortField]
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  useEffect(() => {
    if (filteredAndSortedData.length === 0) {
      setLocalError('No data found')
    } else {
      setLocalError(null)
    }
  }, [filteredAndSortedData])
  if (fuelLogs.length === 0) {
    return (
      <CAlert color="info" className="text-center">
        No fuel logs found.
      </CAlert>
    )
  }
  if (loading) {
    return <CSpinner size="sm" />
  }

  if (error) {
    return <div className="text-danger">Error: {error}</div>
  }

  return (
    <>
      {/* Search and Filter Controls */}
      <CInputGroup className="mb-3">
        <CFormInput
          placeholder="Search by receipt #, vehicle, or driver..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          id="search"
        />
        <CFormSelect
          id="allVehicles"
          value={filterVehicle}
          onChange={(e) => setFilterVehicle(e.target.value)}
        >
          <option value="">All Vehicles</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle._id} value={vehicle._id}>
              {`${vehicle.brand} / ${vehicle.model} / ${vehicle.regisNumber}`}
            </option>
          ))}
        </CFormSelect>
      </CInputGroup>
      {/* Error Messages */}

      {/* Fuel Logs Table */}
      <CTable hover responsive className="text-center">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
              Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
            </CTableHeaderCell>
            <CTableHeaderCell
              onClick={() => handleSort('receiptNumber')}
              style={{ cursor: 'pointer' }}
            >
              Receipt # {sortField === 'receiptNumber' && (sortDirection === 'asc' ? '↑' : '↓')}
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

        <CTableBody>
          {filteredAndSortedData.map((log) => (
            <CTableRow key={log._id}>
              <CTableDataCell>{new Date(log.date).toLocaleDateString()}</CTableDataCell>
              <CTableDataCell>{log.receiptNumber}</CTableDataCell>
              <CTableDataCell>{getVehicleDetails(log.vehicleId)}</CTableDataCell>
              <CTableDataCell>{getDriverDetails(log.driverId)}</CTableDataCell>
              <CTableDataCell>{log.fuelQuantity}</CTableDataCell>
              <CTableDataCell>{log.costPerLiter}</CTableDataCell>
              <CTableDataCell>{log.totalCost}</CTableDataCell>
              <CTableDataCell>
                <div>{log.litersPer100km} L/100km</div>
                <div>{log.kmPerLiter} km/L</div>
                <div>{log.mpg} MPG</div>
              </CTableDataCell>
              <CTableDataCell>
                <CDropdown variant="input-group" className="align-items-center">
                  <CDropdownToggle color="secondary" variant="outline">
                    Actions
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CButton
                      color="primary"
                      variant="ghost"
                      className="me-2"
                      onClick={() => onViewReceipt(log)}
                    >
                      <FontAwesomeIcon icon={faEye} /> View Receipt
                    </CButton>
                    <CButton
                      color="info"
                      variant="ghost"
                      className="me-2"
                      onClick={() => onUpdateFuelLog(log)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </CButton>
                    <CButton
                      color="danger"
                      variant="ghost"
                      onClick={() => onDeleteFuelLog(log._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </CButton>
                  </CDropdownMenu>
                </CDropdown>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      {error && (
        <CAlert color="danger" className="text-center">
          {error}
        </CAlert>
      )}

      {localError && (
        <CAlert color="info" className="text-center">
          {localError}
        </CAlert>
      )}
    </>
  )
}

TableFuelLogs.propTypes = {
  fuelLogs: PropTypes.array.isRequired,
  vehicles: PropTypes.array.isRequired,
  drivers: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onDeleteFuelLog: PropTypes.func.isRequired,
  onUpdateFuelLog: PropTypes.func.isRequired,
  onViewReceipt: PropTypes.func.isRequired,
}

export default TableFuelLogs
