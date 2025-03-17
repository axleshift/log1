import React, { useState, useEffect, use } from 'react'
import api from '../../../../utils/api'
import {
  CAccordion,
  CAlert,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CBadge,
  CSpinner,
  CHeader,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCircle } from '@fortawesome/free-solid-svg-icons'
import RestoreButton from './RetoredButton'
const RestoredVehicles = ({ restoredVehicle, onRestoreVehicle }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredVehicles, setFilteredVehicles] = useState([])
  const [locaLError, setLocaLError] = useState(null)

  useEffect(() => {
    const handleSearch = () => {
      if (searchQuery === '') {
        setFilteredVehicles(restoredVehicle)
      } else {
        const filteredVehicles = restoredVehicle.filter((vehicles) => {
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
  }, [searchQuery, restoredVehicle])

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
  if (filteredVehicles.length === 0) {
    return (
      <CAlert color="danger" className="text-center justify-content-center">
        No vehicles found to restore
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
  return (
    <>
      <CContainer className="mt-3">
        <CInputGroup className="w-50 mb-3">
          <CFormInput
            type="text"
            placeholder="Search vehicles"
            id="searchRestoredVehicles"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-50 me-2 "
          />
          <CInputGroupText>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </CInputGroupText>
        </CInputGroup>
      </CContainer>
      {locaLError && <CAlert color="danger">{locaLError}</CAlert>}
      <CAccordion>
        {filteredVehicles.map((vehicle) => (
          <CAccordionItem key={vehicle._id}>
            <CAccordionHeader className="d-flex justify-content-between">
              <CContainer>
                <ul>
                  <li>
                    Registration Number: <strong>{vehicle.regisNumber}</strong>
                  </li>
                  <li>
                    Registration expiration Date:{' '}
                    <strong>
                      {vehicle.regisExprationDate ? (
                        <>
                          {new Date(vehicle.regisExprationDate).toISOString().split('T')[0]}{' '}
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
              <CHeader>Year: {vehicle.year}</CHeader>
              <CHeader>Type: {vehicle.type}</CHeader>
              <CHeader>Capacity: {vehicle.capacity}</CHeader>
              <CHeader>Status: {vehicle.status}</CHeader>
              <CContainer className="d-flex justify-content-end mt-3">
                <RestoreButton restoredVehicle={vehicle._id} onRestoreVehicle={onRestoreVehicle} />
              </CContainer>
            </CAccordionBody>
          </CAccordionItem>
        ))}
      </CAccordion>
    </>
  )
}

export default RestoredVehicles
