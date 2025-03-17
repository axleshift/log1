import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' // Add this import
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
  CAlert,
  CCarousel,
  CCarouselItem,
  CBadge,
  CButton,
  CFormInput,
  CInputGroup,
} from '@coreui/react'
import api from '../../utils/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faWrench,
  faCalendarAlt,
  faClock,
  faTools,
  faCarSide,
} from '@fortawesome/free-solid-svg-icons'
import './style.css'

const MaintenanceManagementDashboard = () => {
  const navigate = useNavigate() // Add this hook
  const [maintenance, setMaintenance] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [stats, setStats] = useState({
    total: 0,
    scheduled: 0,
    inProgress: 0,
    completed: 0,
  })

  // Number of cards per carousel slide
  const cardsPerSlide = 3

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const maintenanceResponse = await api.get('/api/v1/maintenance/all')
        setMaintenance(maintenanceResponse.data.data)

        // Calculate maintenance statistics
        const maintenanceStats = maintenanceResponse.data.data.reduce(
          (acc, maintenance) => {
            acc.total++
            switch (maintenance.status) {
              case 'Scheduled':
                acc.scheduled++
                break
              case 'In Progress':
                acc.inProgress++
                break
              case 'Completed':
                acc.completed++
                break
              default:
                break
            }
            return acc
          },
          { total: 0, scheduled: 0, inProgress: 0, completed: 0 },
        )

        setStats(maintenanceStats)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching maintenance data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Handle card click
  const handleCardClick = (maintenanceId) => {
    navigate('/fleetManagement/MaintenanceManagement', {
      state: { selectedMaintenanceId: maintenanceId },
    })
  }

  // Search functionality
  const filteredMaintenance = maintenance.filter((item) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      item.vehicle?.regisNumber.toLowerCase().includes(searchLower) ||
      item.maintenanceType.toLowerCase().includes(searchLower) ||
      item.status.toLowerCase().includes(searchLower) ||
      item.priority.toLowerCase().includes(searchLower)
    )
  })

  // Function to get status-based color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success'
      case 'In Progress':
        return 'warning'
      case 'Scheduled':
        return 'info'
      default:
        return 'primary'
    }
  }

  // Function to get priority-based color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'danger'
      case 'Medium':
        return 'warning'
      case 'Low':
        return 'info'
      default:
        return 'secondary'
    }
  }

  // Group maintenance cards into slides
  const maintenanceSlides = []
  for (let i = 0; i < filteredMaintenance.length; i += cardsPerSlide) {
    maintenanceSlides.push(filteredMaintenance.slice(i, i + cardsPerSlide))
  }

  if (loading) {
    return <CSpinner color="primary">Loading maintenance data...</CSpinner>
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
              <CRow className="align-items-center">
                <CCol>
                  <h4>Maintenance List</h4>
                </CCol>
                <CCol xs="auto">
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Search maintenance..."
                      value={searchTerm}
                      id="searchTerm"
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
              {filteredMaintenance.length === 0 ? (
                <CAlert color="info">
                  No maintenance records found matching your search criteria.
                </CAlert>
              ) : (
                <CCarousel controls indicators dark>
                  {maintenanceSlides.map((slide, slideIndex) => (
                    <CCarouselItem key={slideIndex}>
                      <CRow>
                        {slide.map((item) => (
                          <CCol md={4} key={item._id}>
                            <CCard
                              className={`mb-4 h-100 border-${getStatusColor(
                                item.status,
                              )} maintenance-card`} // Added maintenance-card class
                              onClick={() => handleCardClick(item._id)}
                              style={{ cursor: 'pointer' }} // Add cursor pointer
                            >
                              <CCardHeader className={`bg-${getStatusColor(item.status)}`}>
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <FontAwesomeIcon icon={faCarSide} /> {item.vehicle?.regisNumber}
                                  </div>
                                  <CBadge color={getPriorityColor(item.priority)}>
                                    {item.priority}
                                  </CBadge>
                                </div>
                              </CCardHeader>
                              <CCardBody>
                                <div className="mb-3">
                                  <FontAwesomeIcon icon={faWrench} /> <strong>Type:</strong>{' '}
                                  {item.maintenanceType}
                                </div>
                                <div className="mb-3">
                                  <FontAwesomeIcon icon={faCalendarAlt} /> <strong>Start:</strong>{' '}
                                  {new Date(item.startDate).toLocaleDateString()}
                                </div>
                                <div className="mb-3">
                                  <FontAwesomeIcon icon={faClock} /> <strong>Expected End:</strong>{' '}
                                  {new Date(item.expectedEndDate).toLocaleDateString()}
                                </div>
                                <div>
                                  <FontAwesomeIcon icon={faTools} /> <strong>Status:</strong>{' '}
                                  <CBadge color={getStatusColor(item.status)}>{item.status}</CBadge>
                                </div>
                              </CCardBody>
                            </CCard>
                          </CCol>
                        ))}
                      </CRow>
                    </CCarouselItem>
                  ))}
                </CCarousel>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default MaintenanceManagementDashboard
