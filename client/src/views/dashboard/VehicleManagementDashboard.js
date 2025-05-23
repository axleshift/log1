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
  CBadge,
} from '@coreui/react'
import api from '../../utils/api'
import { cilSearch } from '@coreui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const VehicleManagementDashboard = () => {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filteredVehicles, setFilteredVehicles] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    inUse: 0,
    maintenance: 0,
    forRegistration: 0,
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
              case 'forRegistration':
                acc.forRegistration++
                break
              default:
                break
            }
            return acc
          },
          { total: 0, available: 0, inUse: 0, maintenance: 0, forRegistration: 0 },
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

  useEffect(() => {
    setCurrentPage(1)
    if (searchTerm === '') {
      setFilteredVehicles(vehicles)
    } else {
      const filteredVehicles = vehicles.filter((vehicle) => {
        const searchLower = searchTerm.toLowerCase()
        return (
          vehicle.regisNumber.toLowerCase().includes(searchLower) ||
          vehicle.brand.toLowerCase().includes(searchLower) ||
          vehicle.model.toLowerCase().includes(searchLower) ||
          options
            .find((option) => option.value === vehicle.status)
            ?.label.toLowerCase()
            .includes(searchLower)
        )
      })
      setFilteredVehicles(filteredVehicles)
    }
  }, [searchTerm, vehicles])

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredVehicles.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Status Badge Component

  const getBadgeColor = (status) => {
    switch (status) {
      case 'available':
        return 'success'
      case 'in_use':
        return 'danger'
      case 'maintenance':
        return 'warning'
      case 'forRegistration':
      default:
        return 'secondary'
    }
  }

  const options = [
    { value: 'available', label: 'Available' },
    { value: 'in_use', label: 'In Use' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'inspection', label: 'Inspection' },
    { value: 'forRegistration', label: 'For Registration' },
  ]

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
              <CRow className="d-flex align-items-center flex-wrap gap-5">
                <CCol md={2}>
                  <div className="border-start border-start-4 border-start-success p-3">
                    <h6>Available Vehicles</h6>
                    <h4>{stats.available}</h4>
                  </div>
                </CCol>
                <CCol md={2}>
                  <div className="border-start border-start-4 border-start-danger p-3">
                    <h6>In Use</h6>
                    <h4>{stats.inUse}</h4>
                  </div>
                </CCol>
                <CCol md={2}>
                  <div className="border-start border-start-4 border-start-warning p-3">
                    <h6>Under Maintenance</h6>
                    <h4>{stats.maintenance}</h4>
                  </div>
                </CCol>
                <CCol md={2}>
                  <div className="border-start border-start-4 border-start-secondary p-3">
                    <h6>For Registration</h6>
                    <h4>{stats.forRegistration}</h4>
                  </div>
                </CCol>
                <CCol md={2}>
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
                      id="searchTerm2"
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
                    <CTableHeaderCell>Plate Number</CTableHeaderCell>
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
                        <CBadge color={getBadgeColor(vehicle.status)}>
                          {' '}
                          {options.find((option) => option.value === vehicle.status)?.label ||
                            vehicle.status}
                        </CBadge>
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
