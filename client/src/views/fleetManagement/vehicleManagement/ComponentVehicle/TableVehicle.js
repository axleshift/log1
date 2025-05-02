import React, { useState, useEffect } from 'react'
import {
  CFormInput,
  CAlert,
  CContainer,
  CInputGroup,
  CInputGroupText,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CHeader,
  CBadge,
  CButton,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import UpdateVehicle from './UpdateVehicle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { getRole } from '../../../../utils/auth'

const TableVehicle = ({ vehicle, error, loading, onDeleteVehicle, onUpdateVehicle }) => {
  const [filteredVehicles, setFilteredVehicles] = useState([])
  const userRole = getRole()
  const adminRoles = ['manager', 'admin', 'super admin']
  const [locaLError, setLocaLError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredVehicles.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage)

  useEffect(() => {
    setFilteredVehicles(vehicle)
  }, [vehicle])

  useEffect(() => {
    const handleSearch = () => {
      setCurrentPage(1)
      if (searchQuery === '') {
        setFilteredVehicles(vehicle)
      } else {
        const filteredVehicles = vehicle.filter((vehicles) => {
          return (
            vehicles.idNum?.toString().includes(searchQuery) ||
            vehicles.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicles.model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicles.year?.toString().includes(searchQuery) ||
            vehicles.regisExprationDate?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicles.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicles.regisNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicles.capacity?.toString().includes(searchQuery) ||
            (options.find((option) => option.value === vehicles.status)?.label || '')
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
        })

        setFilteredVehicles(filteredVehicles)
        if (filteredVehicles.length === 0) {
          setLocaLError('No vehicles found')
        } else {
          setLocaLError(null)
        }
      }
    }
    handleSearch()
  }, [searchQuery, vehicle])

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'green'
      case 'in_use':
        return 'red'
      case 'maintenance':
        return 'orange'
      case 'inspection':
        return 'yellow'
      case 'forRegistration':
        return 'grey'
      default:
        return 'black'
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
  if (vehicle.length === 0) {
    return (
      <CAlert color="danger" className="text-center justify-content-center">
        No vehicles found
      </CAlert>
    )
  }

  const getExpirationStatus = (expirationDate) => {
    if (!expirationDate) return { text: 'No expiration date', badge: 'secondary' }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const expDate = new Date(expirationDate)
    expDate.setHours(0, 0, 0, 0)

    // Calculate the difference in days
    const diffTime = expDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    // For expired vehicles (negative days or today)
    if (diffDays < 0) {
      const daysAgo = Math.abs(diffDays)
      return {
        text: `Expired ${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`,
        badge: 'danger',
      }
    }

    // For today
    if (diffDays === 0) {
      return { text: 'Expires Today', badge: 'danger' }
    }

    // For upcoming expiration
    if (diffDays <= 14) {
      return {
        text: `Expires in ${diffDays} ${diffDays === 1 ? 'day' : 'days'}`,
        badge: 'warning',
      }
    }

    // For vehicles with more than 2 weeks until expiration
    return { text: 'Registered', badge: 'success' }
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
      <CContainer className="mt-3">
        <CInputGroup className="w-50 mb-3">
          <CFormInput
            type="text"
            placeholder="Search vehicles"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-50 me-2 "
          />
          <CInputGroupText>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </CInputGroupText>
        </CInputGroup>
      </CContainer>
      <CAccordion className="m-2">
        {currentItems.map((vehicle, index) => (
          <CAccordionItem key={vehicle._id || index}>
            <CAccordionHeader className="d-flex justify-content-between">
              <CContainer>
                <ul className="list-unstyled">
                  <li>
                    Registration Number: <strong>{vehicle.regisNumber}</strong>
                  </li>
                  <li>
                    Driver:{' '}
                    <strong>
                      {vehicle.assignedDriver
                        ? `${vehicle.assignedDriver.driverName} - ${vehicle.assignedDriver.licenseNumber}`
                        : 'Not assigned'}
                    </strong>
                  </li>
                  <li>
                    Registration expiration Date:{' '}
                    <strong>
                      {vehicle.regisExprationDate ? (
                        <>
                          {new Date(vehicle.regisExprationDate).toLocaleDateString()}{' '}
                          <CBadge color={getExpirationStatus(vehicle.regisExprationDate).badge}>
                            {getExpirationStatus(vehicle.regisExprationDate).text}
                          </CBadge>
                        </>
                      ) : (
                        'No expiration date'
                      )}
                    </strong>
                  </li>
                </ul>
              </CContainer>
              <CContainer className="d-flex justify-content-end">
                <FontAwesomeIcon
                  icon={faCircle}
                  color={getStatusColor(vehicle.status)}
                  className="m-2 float-end"
                />
                <small className="m-2 float-end">
                  {options.find((option) => option.value === vehicle.status).label}
                </small>
              </CContainer>
            </CAccordionHeader>
            <CAccordionBody>
              <CHeader>ID: {vehicle.idNum}</CHeader>
              <CHeader>Brand: {vehicle.brand}</CHeader>
              <CHeader>Model: {vehicle.model}</CHeader>
              <CHeader>Year: {vehicle.year}</CHeader>
              <CHeader>Type: {vehicle.type}</CHeader>
              <CHeader>
                Capacity: {vehicle.units}: {vehicle.capacity}
              </CHeader>
              <CHeader>
                Status: {options.find((option) => option.value === vehicle.status).label}
              </CHeader>
              <CHeader>
                Driver:{' '}
                {vehicle.assignedDriver
                  ? `${vehicle.assignedDriver.driverName} - ${vehicle.assignedDriver.licenseNumber}`
                  : 'Not assigned'}
              </CHeader>
              <CHeader>Fuel Type: {vehicle.fuelType}</CHeader>
              <CHeader>Current Mileage: {vehicle.currentMileage}</CHeader>

              <CContainer className="d-flex justify-content-end mt-3">
                <UpdateVehicle vehicle={vehicle} onUpdateVehicle={onUpdateVehicle} />
                {adminRoles.includes(userRole) && (
                  <CButton
                    color="danger"
                    variant="outline"
                    onClick={() => onDeleteVehicle(vehicle._id)}
                  >
                    <NavIcon icon={faTrash} /> Delete
                  </CButton>
                )}
              </CContainer>
            </CAccordionBody>
          </CAccordionItem>
        ))}
      </CAccordion>

      {filteredVehicles.length > 0 && (
        <CContainer className="d-flex justify-content-between align-items-center">
          <CContainer>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredVehicles.length)}{' '}
            of {filteredVehicles.length} entries
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

      {locaLError && (
        <CAlert color="danger" className="text-center justify-content-center">
          {locaLError}
        </CAlert>
      )}
    </>
  )
}

export default TableVehicle
