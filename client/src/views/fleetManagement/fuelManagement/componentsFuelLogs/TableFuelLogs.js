// import React, { useState, useEffect } from 'react'
// import {
//   CTable,
//   CTableHead,
//   CTableRow,
//   CTableHeaderCell,
//   CTableBody,
//   CTableDataCell,
//   CSpinner,
//   CButton,
//   CInputGroup,
//   CFormInput,
//   CFormSelect,
//   CDropdown,
//   CDropdownToggle,
//   CDropdownMenu,
//   CAlert,
//   CPagination,
//   CPaginationItem,
//   CInputGroupText,
//   CContainer,
//   CBadge,
// } from '@coreui/react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   faEye,
//   faTrash,
//   faEdit,
//   faSortUp,
//   faSortDown,
//   faSearch,
// } from '@fortawesome/free-solid-svg-icons'
// import { getRole } from '../../../../utils/auth'

// const TableFuelLogs = ({
//   fuelLogs,
//   vehicles,
//   drivers,
//   loading,
//   error,
//   onDeleteFuelLog,
//   onUpdateFuelLog,
//   onViewReceipt,
// }) => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [sortField, setSortField] = useState('date')
//   const [sortDirection, setSortDirection] = useState('desc')
//   const [filterVehicle, setFilterVehicle] = useState('')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [itemsPerPage] = useState(10) // You can make this adjustable if needed
//   const [localError, setLocalError] = useState(null)
//   const role = getRole()
//   const adminRoles = ['manager', 'admin']

//   // Sorting function
//   const handleSort = (field) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
//     } else {
//       setSortField(field)
//       setSortDirection('asc')
//     }
//   }

//   // Get vehicle details
//   const getVehicleDetails = (vehicleId, log) => {
//     if (
//       typeof vehicleId === 'object' &&
//       vehicleId?.brand &&
//       vehicleId?.model &&
//       vehicleId?.regisNumber
//     ) {
//       return `${vehicleId.brand} ${vehicleId.model} (${vehicleId.regisNumber})`
//     }

//     if (!vehicleId && log?.vehicleDetails) {
//       return `${log.vehicleDetails.brand} ${log.vehicleDetails.model} (${log.vehicleDetails.regisNumber}) [Deleted]`
//     }

//     const vehicle = vehicles.find((v) => v._id === vehicleId)
//     if (vehicle) {
//       return `${vehicle.brand} ${vehicle.model} (${vehicle.regisNumber})`
//     }
//     if (vehicle.deleted === true) {
//       return `${vehicle.brand} ${vehicle.model} (${vehicle.regisNumber}) [Deleted]`
//     }
//   }

//   // // Get driver details
//   const getDriverDetails = (driverId, log) => {
//     if (typeof driverId === 'object' && driverId?.driverName) {
//       return driverId.driverName
//     }

//     if (!driverId && log?.driverDetails?.driverName) {
//       return `${log.driverDetails.driverName} [Deleted]`
//     }

//     const driver = drivers.find((d) => d._id === driverId)
//     if (driver?.driverName) {
//       return driver.driverName
//     }
//   }

//   //   // Filter and sort data
//   const filteredAndSortedData = fuelLogs
//     .filter((log) => {
//       if (!log) return false // Skip if log is null

//       // Safely get vehicle and driver details
//       const vehicleDetails = getVehicleDetails(log.vehicleId, log).toLowerCase()
//       const driverDetails = getDriverDetails(log.driverId, log).toLowerCase()
//       const searchLower = searchTerm.toLowerCase()

//       // Safely check all searchable fields
//       const matchesSearch =
//         (log.receiptNumber?.toLowerCase() || '').includes(searchLower) ||
//         vehicleDetails.includes(searchLower) ||
//         driverDetails.includes(searchLower) ||
//         (log.date ? new Date(log.date).toLocaleDateString().includes(searchLower) : false) ||
//         (log.fuelQuantity?.toString() || '').includes(searchLower) ||
//         (log.totalCost?.toString() || '').includes(searchLower)

//       // Safely check vehicle filter
//       const matchesVehicle = filterVehicle
//         ? (typeof log.vehicleId === 'object' ? log.vehicleId?._id : log.vehicleId) === filterVehicle
//         : true

//       return matchesSearch && matchesVehicle
//     })
//     .sort((a, b) => {
//       let aValue, bValue

//       switch (sortField) {
//         case 'vehicle':
//           aValue = getVehicleDetails(a.vehicleId, a)
//           bValue = getVehicleDetails(b.vehicleId, b)
//           break
//         case 'driver':
//           aValue = getDriverDetails(a.driverId, a)
//           bValue = getDriverDetails(b.driverId, b)
//           break
//         case 'date':
//           aValue = new Date(a.date || '').getTime()
//           bValue = new Date(b.date || '').getTime()
//           break
//         case 'fuelQuantity':
//         case 'costPerLiter':
//         case 'totalCost':
//           aValue = parseFloat(a[sortField] || 0)
//           bValue = parseFloat(b[sortField] || 0)
//           break
//         default:
//           aValue = a[sortField] || ''
//           bValue = b[sortField] || ''
//       }

//       // Handle null/undefined values in sorting
//       if (!aValue && !bValue) return 0
//       if (!aValue) return 1
//       if (!bValue) return -1

//       if (sortDirection === 'asc') {
//         return aValue > bValue ? 1 : -1
//       } else {
//         return aValue < bValue ? 1 : -1
//       }
//     })

//   // Pagination calculations
//   const indexOfLastItem = currentPage * itemsPerPage
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage
//   const currentItems = filteredAndSortedData.slice(indexOfFirstItem, indexOfLastItem)
//   const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)

//   // Reset to first page when filters change
//   useEffect(() => {
//     setCurrentPage(1)
//   }, [searchTerm, filterVehicle])

//   // Update error state
//   useEffect(() => {
//     if (filteredAndSortedData.length === 0) {
//       setLocalError('No matching records found')
//     } else {
//       setLocalError(null)
//     }
//   }, [filteredAndSortedData])

//   if (loading) {
//     return <CSpinner />
//   }

//   if (error) {
//     return <CAlert color="danger">{error}</CAlert>
//   }

//   return (
//     <>
//       {/* Search and Filter Controls */}

//       <CContainer className="col-6 mt-3 mb-3">
//         <CInputGroup>
//           <CFormInput
//             placeholder="Search by receipt #, vehicle, driver, date..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             id="search"
//           />
//           <CInputGroupText>
//             <FontAwesomeIcon icon={faSearch} />
//           </CInputGroupText>
//         </CInputGroup>
//       </CContainer>

//       {/* Table */}
//       <CTable hover responsive className="text-center">
//         <CTableHead>
//           <CTableRow>
//             <CTableHeaderCell onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
//               Date{' '}
//               {sortField === 'date' && (
//                 <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown} />
//               )}
//             </CTableHeaderCell>
//             <CTableHeaderCell
//               onClick={() => handleSort('receiptNumber')}
//               style={{ cursor: 'pointer' }}
//             >
//               Receipt #{' '}
//               {sortField === 'receiptNumber' && (
//                 <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown} />
//               )}
//             </CTableHeaderCell>
//             <CTableHeaderCell onClick={() => handleSort('vehicle')} style={{ cursor: 'pointer' }}>
//               Vehicle {sortField === 'vehicle' && (sortDirection === 'asc' ? '↑' : '↓')}
//             </CTableHeaderCell>
//             <CTableHeaderCell onClick={() => handleSort('driver')} style={{ cursor: 'pointer' }}>
//               Driver {sortField === 'driver' && (sortDirection === 'asc' ? '↑' : '↓')}
//             </CTableHeaderCell>
//             <CTableHeaderCell
//               onClick={() => handleSort('fuelQuantity')}
//               style={{ cursor: 'pointer' }}
//             >
//               Quantity (L) {sortField === 'fuelQuantity' && (sortDirection === 'asc' ? '↑' : '↓')}
//             </CTableHeaderCell>
//             <CTableHeaderCell
//               onClick={() => handleSort('costPerLiter')}
//               style={{ cursor: 'pointer' }}
//             >
//               Cost/L {sortField === 'costPerLiter' && (sortDirection === 'asc' ? '↑' : '↓')}
//             </CTableHeaderCell>
//             <CTableHeaderCell onClick={() => handleSort('totalCost')} style={{ cursor: 'pointer' }}>
//               Total Cost {sortField === 'totalCost' && (sortDirection === 'asc' ? '↑' : '↓')}
//             </CTableHeaderCell>
//             <CTableHeaderCell>Fuel Efficiency</CTableHeaderCell>
//             <CTableHeaderCell>Actions</CTableHeaderCell>
//           </CTableRow>
//         </CTableHead>
//         <CTableBody className="align-middle">
//           {currentItems.map((log) => (
//             <CTableRow key={log._id}>
//               <CTableDataCell>{new Date(log.date).toLocaleDateString()}</CTableDataCell>
//               <CTableDataCell>{log.receiptNumber}</CTableDataCell>
//               <CTableDataCell>
//                 {/* Use stored vehicle details if vehicle is deleted */}
//                 {log.vehicleId ? (
//                   <>
//                     {`${log.vehicleId.brand} ${log.vehicleId.model} (${log.vehicleId.regisNumber})`}
//                     {log.vehicleId.deleted && (
//                       <CBadge color="danger" className="ms-2">
//                         Deleted
//                       </CBadge>
//                     )}
//                   </>
//                 ) : (
//                   <>
//                     {`${log.vehicleDetails.brand} ${log.vehicleDetails.model} (${log.vehicleDetails.regisNumber}) `}
//                     <CBadge color="danger" className="ms-2">
//                       Deleted
//                     </CBadge>
//                   </>
//                 )}
//               </CTableDataCell>
//               <CTableDataCell>
//                 {/* Use stored driver details if driver is deleted */}
//                 {log.driverId ? (
//                   log.driverId.driverName
//                 ) : (
//                   <>
//                     {log.driverDetails.driverName}{' '}
//                     <CBadge color="danger" className="ms-2">
//                       Deleted
//                     </CBadge>
//                   </>
//                 )}
//               </CTableDataCell>
//               <CTableDataCell>{log.fuelQuantity}</CTableDataCell>
//               <CTableDataCell>{log.costPerLiter}</CTableDataCell>
//               <CTableDataCell>{log.totalCost}</CTableDataCell>
//               <CTableDataCell>
//                 <CContainer>{log.litersPer100km} L/100km</CContainer>
//                 <CContainer>{log.kmPerLiter} km/L</CContainer>
//                 <CContainer>{log.mpg} MPG</CContainer>
//               </CTableDataCell>
//               <CTableDataCell>
//                 <CContainer className="d-flex align-center  mt-3">
//                   <CDropdown variant="input-group">
//                     <CDropdownToggle color="secondary" variant="outline">
//                       Actions
//                     </CDropdownToggle>
//                     <CDropdownMenu>
//                       <CContainer className="d-flex flex-column justify-content-center">
//                         <CButton
//                           color="primary"
//                           variant="outline"
//                           className="m-2"
//                           onClick={() => onViewReceipt(log)}
//                         >
//                           <FontAwesomeIcon icon={faEye} /> View Receipt
//                         </CButton>
//                         {log.vehicleId.deleted !== true && (
//                           <CButton
//                             color="info"
//                             variant="outline"
//                             className="m-2"
//                             onClick={() => onUpdateFuelLog(log)}
//                           >
//                             <FontAwesomeIcon icon={faEdit} /> Edit
//                           </CButton>
//                         )}
//                         {adminRoles.includes(role) && (
//                           <CButton
//                             color="danger"
//                             variant="outline"
//                             className="m-2"
//                             onClick={() => onDeleteFuelLog(log._id)}
//                           >
//                             <FontAwesomeIcon icon={faTrash} /> Delete
//                           </CButton>
//                         )}
//                       </CContainer>
//                     </CDropdownMenu>
//                   </CDropdown>
//                 </CContainer>
//               </CTableDataCell>
//             </CTableRow>
//           ))}
//         </CTableBody>
//       </CTable>

//       {/* Pagination */}
//       {filteredAndSortedData.length > 0 && (
//         <CContainer className="d-flex justify-content-between align-items-center">
//           <CContainer>
//             Showing {indexOfFirstItem + 1} to{' '}
//             {Math.min(indexOfLastItem, filteredAndSortedData.length)} of{' '}
//             {filteredAndSortedData.length} entries
//           </CContainer>

//           <CPagination className="mt-3">
//             <CPaginationItem
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             >
//               Previous
//             </CPaginationItem>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <CPaginationItem
//                 key={page}
//                 active={page === currentPage}
//                 onClick={() => setCurrentPage(page)}
//               >
//                 {page}
//               </CPaginationItem>
//             ))}
//             <CPaginationItem
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             >
//               Next
//             </CPaginationItem>
//           </CPagination>
//         </CContainer>
//       )}

//       {/* Error Messages */}
//       {localError && (
//         <CAlert color="info" className="text-center">
//           {localError}
//         </CAlert>
//       )}
//     </>
//   )
// }

// export default TableFuelLogs

import React, { useState, useEffect } from 'react'
import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CSpinner,
  CButton,
  CInputGroup,
  CFormInput,
  CInputGroupText,
  CContainer,
  CBadge,
  CRow,
  CCol,
  CPagination,
  CPaginationItem,
  CAlert,
  CCard,
  CCardBody,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faTrash,
  faEdit,
  faSearch,
  faGasPump,
  faCar,
  faUser,
  faRoute,
  faMoneyBill,
  faChartLine,
  faCalendar,
  faTruck,
} from '@fortawesome/free-solid-svg-icons'
import { getRole } from '../../../../utils/auth'
import { icon } from '@fortawesome/fontawesome-svg-core'

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
  const [activeItem, setActiveItem] = useState(null)
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
  const getVehicleDetails = (vehicleId, log) => {
    if (
      typeof vehicleId === 'object' &&
      vehicleId?.brand &&
      vehicleId?.model &&
      vehicleId?.regisNumber
    ) {
      return `${vehicleId.brand} ${vehicleId.model} (${vehicleId.regisNumber})`
    }

    if (!vehicleId && log?.vehicleDetails) {
      return `${log.vehicleDetails.brand} ${log.vehicleDetails.model} (${log.vehicleDetails.regisNumber}) [Deleted]`
    }

    const vehicle = vehicles.find((v) => v._id === vehicleId)
    if (vehicle) {
      return `${vehicle.brand} ${vehicle.model} (${vehicle.regisNumber})`
    }
    if (vehicle.deleted === true) {
      return `${vehicle.brand} ${vehicle.model} (${vehicle.regisNumber}) [Deleted]`
    }
  }

  // // Get driver details
  const getDriverDetails = (driverId, log) => {
    if (typeof driverId === 'object' && driverId?.driverName) {
      return driverId.driverName
    }

    if (!driverId && log?.driverDetails?.driverName) {
      return `${log.driverDetails.driverName} [Deleted]`
    }

    const driver = drivers.find((d) => d._id === driverId)
    if (driver?.driverName) {
      return driver.driverName
    }
  }

  //   // Filter and sort data
  const filteredAndSortedData = fuelLogs
    .filter((log) => {
      if (!log) return false // Skip if log is null

      // Safely get vehicle and driver details
      const vehicleDetails = getVehicleDetails(log.vehicleId, log).toLowerCase()
      const driverDetails = getDriverDetails(log.driverId, log).toLowerCase()
      const searchLower = searchTerm.toLowerCase()

      // Safely check all searchable fields
      const matchesSearch =
        (log.receiptNumber?.toLowerCase() || '').includes(searchLower) ||
        vehicleDetails.includes(searchLower) ||
        driverDetails.includes(searchLower) ||
        (log.date ? new Date(log.date).toLocaleDateString().includes(searchLower) : false) ||
        (log.fuelQuantity?.toString() || '').includes(searchLower) ||
        (log.totalCost?.toString() || '').includes(searchLower)

      // Safely check vehicle filter
      const matchesVehicle = filterVehicle
        ? (typeof log.vehicleId === 'object' ? log.vehicleId?._id : log.vehicleId) === filterVehicle
        : true

      return matchesSearch && matchesVehicle
    })
    .sort((a, b) => {
      let aValue, bValue

      switch (sortField) {
        case 'vehicle':
          aValue = getVehicleDetails(a.vehicleId, a)
          bValue = getVehicleDetails(b.vehicleId, b)
          break
        case 'driver':
          aValue = getDriverDetails(a.driverId, a)
          bValue = getDriverDetails(b.driverId, b)
          break
        case 'date':
          aValue = new Date(a.date || '').getTime()
          bValue = new Date(b.date || '').getTime()
          break
        case 'fuelQuantity':
        case 'costPerLiter':
        case 'totalCost':
          aValue = parseFloat(a[sortField] || 0)
          bValue = parseFloat(b[sortField] || 0)
          break
        default:
          aValue = a[sortField] || ''
          bValue = b[sortField] || ''
      }

      // Handle null/undefined values in sorting
      if (!aValue && !bValue) return 0
      if (!aValue) return 1
      if (!bValue) return -1

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

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
    <CContainer fluid className="p-0">
      {/* Enhanced Search Bar */}
      <CCard className="mb-4 shadow-sm border-0">
        <CCardBody>
          <CRow className="align-items-center">
            <CCol xs={12} md={6}>
              <CInputGroup>
                <CFormInput
                  placeholder="Search fuel logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-end-0"
                />
                <CInputGroupText className="bg-transparent">
                  <FontAwesomeIcon icon={faSearch} />
                </CInputGroupText>
              </CInputGroup>
            </CCol>
            <CCol xs={12} md={6} className="mt-3 mt-md-0 text-end">
              <span className="text-muted">Total Records: {filteredAndSortedData.length}</span>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      {/* Accordion List */}
      <CAccordion>
        {currentItems.map((log) => (
          <CAccordionItem key={log._id}>
            <CAccordionHeader
              onClick={() => setActiveItem(activeItem === log._id ? null : log._id)}
            >
              <div className="d-flex justify-content-sm-between w-100">
                <ul className="list-unstyled">
                  <li className="ps-3">
                    <strong>Receipt Number:</strong> {log.receiptNumber}
                  </li>
                  <li className="ps-3">
                    <FontAwesomeIcon icon={faCalendar} /> {new Date(log.date).toLocaleDateString()}
                  </li>
                </ul>
                <div className="float-end p-3">
                  <FontAwesomeIcon icon={faTruck} />{' '}
                  <strong>
                    {log.vehicleDetails.regisNumber} {`(${log.vehicleDetails.model})`}
                  </strong>
                </div>
              </div>

              {/* <CRow className="w-100 align-items-center g-3">
                <CCol xs={12} md={1}>
                  <CBadge color={log.vehicleId?.deleted ? 'danger' : 'primary'}>
                    {log.receiptNumber}
                  </CBadge>
                </CCol>
                <CCol xs={12} md={1}>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faCalendar} className="text-primary me-2" />
                    <strong>{new Date(log.date).toLocaleDateString()}</strong>
                  </div>
                </CCol>
                <CCol xs={12} md={1}>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faCar} className="text-secondary me-2" />
                    {log.vehicleId ? (
                      <span>{`${log.vehicleId.brand} ${log.vehicleId.model}`}</span>
                    ) : (
                      <span className="text-muted">Vehicle Deleted</span>
                    )}
                  </div>
                </CCol>
                <CCol xs={12} md={1}>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faMoneyBill} className="text-success me-2" />
                    <strong>{log.totalCost}</strong>
                  </div>
                </CCol>
              </CRow> */}
            </CAccordionHeader>

            <CAccordionBody>
              <CRow className="g-4">
                {/* Vehicle Information Card */}
                <CCol xs={12} md={4}>
                  <CCard className="h-100 border-0 shadow-sm">
                    <CCardBody>
                      <h6 className="mb-3">
                        <FontAwesomeIcon icon={faCar} className="text-primary me-2" />
                        Vehicle Details
                      </h6>
                      <div className="ms-4">
                        <p className="mb-2">
                          <strong>Registration:</strong>{' '}
                          {log.vehicleId?.regisNumber || log.vehicleDetails?.regisNumber}
                        </p>
                        <p className="mb-2">
                          <strong>Model:</strong>{' '}
                          {log.vehicleId?.model || log.vehicleDetails?.model}
                        </p>
                        <p className="mb-0">
                          <strong>Brand:</strong>{' '}
                          {log.vehicleId?.brand || log.vehicleDetails?.brand}
                        </p>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCol>

                {/* Driver Information Card */}
                <CCol xs={12} md={4}>
                  <CCard className="h-100 border-0 shadow-sm">
                    <CCardBody>
                      <h6 className="mb-3">
                        <FontAwesomeIcon icon={faUser} className="text-primary me-2" />
                        Driver Details
                      </h6>
                      <div className="ms-4">
                        <p className="mb-0">
                          <strong>Name:</strong>{' '}
                          {log.driverId ? (
                            log.driverId.driverName
                          ) : (
                            <span>
                              {log.driverDetails.driverName}{' '}
                              <CBadge color="danger" className="ms-2">
                                Deleted
                              </CBadge>
                            </span>
                          )}
                        </p>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCol>

                {/* Route Information Card */}
                <CCol xs={12} md={4}>
                  <CCard className="h-100 border-0 shadow-sm">
                    <CCardBody>
                      <h6 className="mb-3">
                        <FontAwesomeIcon icon={faRoute} className="text-primary me-2" />
                        Route Start To End
                      </h6>
                      <div className="ms-4">
                        <p className="mb-2">
                          <strong>Start Location:</strong> {log.route.start}
                        </p>
                        <p className="mb-0">
                          <strong>End Location:</strong> {log.route.end}
                        </p>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCol>

                {/* Fuel Details Card */}
                <CCol xs={12} md={4}>
                  <CCard className="h-100 border-0 shadow-sm">
                    <CCardBody>
                      <h6 className="mb-3">
                        <FontAwesomeIcon icon={faGasPump} className="text-primary me-2" />
                        Fuel Details
                      </h6>
                      <div className="ms-4">
                        <p className="mb-2">
                          <strong>Quantity:</strong> {log.fuelQuantity} L
                        </p>
                        <p className="mb-2">
                          <strong>Cost/L:</strong> {log.costPerLiter}
                        </p>
                        <p className="mb-0">
                          <strong>Total:</strong> {log.totalCost}
                        </p>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCol>

                {/* Efficiency Metrics Card */}
                <CCol xs={12} md={4}>
                  <CCard className="h-100 border-0 shadow-sm">
                    <CCardBody>
                      <h6 className="mb-3">
                        <FontAwesomeIcon icon={faChartLine} className="text-primary me-2" />
                        Efficiency Metrics
                      </h6>
                      <div className="ms-4">
                        <p className="mb-2">
                          <strong>L/100km:</strong> {log.litersPer100km}
                        </p>
                        <p className="mb-2">
                          <strong>km/L:</strong> {log.kmPerLiter}
                        </p>
                        <p className="mb-0">
                          <strong>MPG:</strong> {log.mpg}
                        </p>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCol>

                {/* Actions Card */}
                <CCol xs={12} md={4}>
                  <CCard className="h-100 border-0 shadow-sm">
                    <CCardBody>
                      <h6 className="mb-3">
                        <FontAwesomeIcon icon={faEdit} className="text-primary me-2" />
                        Actions
                      </h6>
                      <div className="d-grid gap-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          onClick={() => onViewReceipt(log)}
                        >
                          <NavIcon icon={faEye} className="me-2" />
                          View Receipt
                        </CButton>

                        {log.vehicleId?.deleted !== true && (
                          <CButton
                            color="info"
                            variant="outline"
                            onClick={() => onUpdateFuelLog(log)}
                          >
                            <NavIcon icon={faEdit} className="me-2" />
                            Edit
                          </CButton>
                        )}

                        {adminRoles.includes(role) && (
                          <CButton
                            color="danger"
                            variant="outline"
                            onClick={() => onDeleteFuelLog(log._id)}
                          >
                            <NavIcon icon={faTrash} className="me-2" />
                            Delete
                          </CButton>
                        )}
                      </div>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CAccordionBody>
          </CAccordionItem>
        ))}
      </CAccordion>

      {/* Enhanced Pagination */}
      {filteredAndSortedData.length > 0 && (
        <CCard className="mt-4 border-0 shadow-sm">
          <CCardBody>
            <CRow className="align-items-center">
              <CCol xs={12} md={6} className="mb-3 mb-md-0">
                <span className="text-muted">
                  Showing {indexOfFirstItem + 1} to{' '}
                  {Math.min(indexOfLastItem, filteredAndSortedData.length)} of{' '}
                  {filteredAndSortedData.length} entries
                </span>
              </CCol>
              <CCol xs={12} md={6}>
                <CPagination className="justify-content-end m-0">
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
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      )}

      {/* Error Messages */}
      {localError && (
        <CAlert color="info" className="text-center mt-4">
          {localError}
        </CAlert>
      )}
    </CContainer>
  )
}

export default TableFuelLogs
