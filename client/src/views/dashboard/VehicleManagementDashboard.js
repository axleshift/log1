import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
  CAlert,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CPagination,
  CPaginationItem,
  CFormInput,
  CInputGroup,
  CButton,
} from '@coreui/react'
import api from '../../utils/api'
import { cilSearch } from '@coreui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const VehicleManagementDashboard = () => {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    inUse: 0,
    maintenance: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const vehiclesResponse = await api.get('/api/v1/vehicle')
        setVehicles(vehiclesResponse.data.data)

        // Calculate vehicle statistics
        const vehicleStats = vehiclesResponse.data.data.reduce(
          (acc, vehicle) => {
            acc.total++
            switch (vehicle.status) {
              case 'available':
                acc.available++
                break
              case 'in_use':
                acc.inUse++
                break
              case 'maintenance':
                acc.maintenance++
                break
              default:
                break
            }
            return acc
          },
          { total: 0, available: 0, inUse: 0, maintenance: 0 },
        )

        setStats(vehicleStats)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Search functionality
  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      vehicle.regisNumber.toLowerCase().includes(searchLower) ||
      vehicle.brand.toLowerCase().includes(searchLower) ||
      vehicle.model.toLowerCase().includes(searchLower) ||
      vehicle.status.toLowerCase().includes(searchLower)
    )
  })

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredVehicles.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    const getBadgeColor = (status) => {
      switch (status) {
        case 'available':
          return 'success'
        case 'in_use':
          return 'danger'
        case 'maintenance':
          return 'warning'
        default:
          return 'secondary'
      }
    }

    return <span className={`badge bg-${getBadgeColor(status)}`}>{status}</span>
  }

  if (loading) {
    return <CSpinner color="primary">Loading vehicle data...</CSpinner>
  }

  if (error) {
    return <CAlert color="danger">Error: {error}</CAlert>
  }

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>
              <h4>Vehicle Overview</h4>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={3}>
                  <div className="border-start border-start-4 border-start-success p-3">
                    <h6>Available Vehicles</h6>
                    <h4>{stats.available}</h4>
                  </div>
                </CCol>
                <CCol md={3}>
                  <div className="border-start border-start-4 border-start-danger p-3">
                    <h6>In Use</h6>
                    <h4>{stats.inUse}</h4>
                  </div>
                </CCol>
                <CCol md={3}>
                  <div className="border-start border-start-4 border-start-warning p-3">
                    <h6>Under Maintenance</h6>
                    <h4>{stats.maintenance}</h4>
                  </div>
                </CCol>
                <CCol md={3}>
                  <div className="border-start border-start-4 border-start-info p-3">
                    <h6>Total Fleet</h6>
                    <h4>{stats.total}</h4>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow className="align-items-center ">
                <CCol>
                  <h4>Vehicle List</h4>
                </CCol>
                <CCol xs="auto">
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Search vehicles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <CButton color="primary" variant="outline">
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </CButton>
                  </CInputGroup>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Registration</CTableHeaderCell>
                    <CTableHeaderCell>Brand</CTableHeaderCell>
                    <CTableHeaderCell>Model</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentItems.map((vehicle) => (
                    <CTableRow key={vehicle._id}>
                      <CTableDataCell>{vehicle.regisNumber}</CTableDataCell>
                      <CTableDataCell>{vehicle.brand}</CTableDataCell>
                      <CTableDataCell>{vehicle.model}</CTableDataCell>
                      <CTableDataCell>
                        <StatusBadge status={vehicle.status} />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>

              {filteredVehicles.length === 0 ? (
                <div className="text-center p-3">
                  <CAlert color="info">No vehicles found matching your search criteria.</CAlert>
                </div>
              ) : (
                <CPagination align="center" aria-label="Page navigation">
                  <CPaginationItem
                    disabled={currentPage === 1}
                    onClick={() => paginate(currentPage - 1)}
                  >
                    Previous
                  </CPaginationItem>

                  {[...Array(totalPages)].map((_, index) => (
                    <CPaginationItem
                      key={index + 1}
                      active={currentPage === index + 1}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </CPaginationItem>
                  ))}

                  <CPaginationItem
                    disabled={currentPage === totalPages}
                    onClick={() => paginate(currentPage + 1)}
                  >
                    Next
                  </CPaginationItem>
                </CPagination>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default VehicleManagementDashboard
