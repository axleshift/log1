import React, { useState, useEffect } from 'react'
import {
  CSpinner,
  CInputGroup,
  CFormInput,
  CInputGroupText,
  CContainer,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CHeader,
  CAlert,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCircle } from '@fortawesome/free-solid-svg-icons'
import UpdateDriver from './UpdateDriver'
import DeleteDriver from './DeleteDriver'
import { getRole } from './../../../../utils/auth'

const TableDriver = ({ driver, loading, onDeleteDriver, onUpdateDriver }) => {
  const role = getRole()
  const adminRoles = ['manager', 'admin']
  const [localError, setLocalError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredDrivers, setFilteredDrivers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredDrivers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage)

  useEffect(() => {
    const handleSearch = async () => {
      setCurrentPage(1)
      if (searchQuery === '') {
        setFilteredDrivers(driver)
      } else {
        const filteredDrivers = driver.filter((driver) => {
          return (
            driver.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            driver.idNum.toString().includes(searchQuery) ||
            driver.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            driver.phone.toString().includes(searchQuery) ||
            driver.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            driver.licenseNumber.toString().includes(searchQuery) ||
            options
              .find((option) => option.value === driver.status)
              .label.toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
        })
        setFilteredDrivers(filteredDrivers)
        if (filteredDrivers.length === 0) {
          setLocalError('No results found')
        } else {
          setLocalError(null)
        }
      }
    }
    handleSearch()
  }, [searchQuery, driver])

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'green'
      case 'on_duty':
        return 'red'
      case 'off_duty':
        return 'orange'
      default:
        return 'black'
    }
  }

  const options = [
    { label: 'Available', value: 'available' },
    { label: 'On Duty', value: 'on_duty' },
    { label: 'Off Duty', value: 'off_duty' },
  ]
  if (driver.length === 0) {
    return (
      <CAlert color="danger" className="justfy-content-center">
        No drivers found
      </CAlert>
    )
  }
  return (
    <>
      <CContainer className="mt-3">
        <CInputGroup className="w-50 mb-3 ">
          <CFormInput
            type="text"
            placeholder="Search Drivers..."
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
        {currentItems.map((driver) => (
          <CAccordionItem key={driver._id}>
            <CAccordionHeader>
              <p className="w-100 m-1">
                Driver Name: <strong> {driver.driverName} </strong>
                <FontAwesomeIcon
                  icon={faCircle}
                  color={getStatusColor(driver.status)}
                  className="m-2 float-end"
                />
                <small className="m-2 float-end">
                  {' '}
                  {options.find((option) => option.value === driver.status).label}
                </small>
              </p>
            </CAccordionHeader>
            <CAccordionBody>
              <CHeader>ID: {driver.idNum}</CHeader>
              <CHeader>Email: {driver.email}</CHeader>
              <CHeader>Phone: {driver.phone}</CHeader>
              <CHeader>Address: {driver.address}</CHeader>
              <CHeader>License Number: {driver.licenseNumber}</CHeader>
              <CHeader>
                Vehicle:{' '}
                {driver.assignedVehicle
                  ? `${driver.assignedVehicle.regisNumber} - ${driver.assignedVehicle.brand} ${driver.assignedVehicle.model}`
                  : 'No vehicle assigned'}
              </CHeader>
              <CHeader>
                Status: {options.find((option) => option.value === driver.status).label}
              </CHeader>
              <CContainer className="d-flex justify-content-end mt-3">
                {loading ? (
                  <CSpinner color="primary" size="sm" />
                ) : (
                  <UpdateDriver driver={driver} onUpdateDriver={onUpdateDriver} />
                )}
                {adminRoles.includes(role) && (
                  <DeleteDriver driver={driver} onDeleteDriver={onDeleteDriver} />
                )}
              </CContainer>
            </CAccordionBody>
          </CAccordionItem>
        ))}
      </CAccordion>

      {filteredDrivers.length > 0 && (
        <CContainer className="d-flex justify-content-between align-items-center">
          <CContainer>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredDrivers.length)} of{' '}
            {filteredDrivers.length} entries
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

      {localError && (
        <CAlert color="danger" className="text-center justify-content-center">
          {localError}
        </CAlert>
      )}
    </>
  )
}

export default TableDriver
