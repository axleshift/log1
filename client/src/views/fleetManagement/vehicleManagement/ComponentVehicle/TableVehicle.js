import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
} from '@coreui/react'
import DeleteVehicle from './DeleteVehicle'
import UpdateVehicle from './UpdateVehicle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const TableVehicle = ({ vehicle, loading, error, onDeleteVehicle, onUpdateVehicle }) => {
  const [filteredVehicles, setFilteredVehicles] = useState([])
  const user = JSON.parse(sessionStorage.getItem('user'))
  const adminRoles = ['manager', 'admin']
  const [locaLError, setLocaLError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setFilteredVehicles(vehicle)
  }, [vehicle])

  useEffect(() => {
    const handleSearch = () => {
      if (searchQuery === '') {
        setFilteredVehicles(vehicle)
      } else {
        const filteredVehicles = vehicle.filter((vehicles) => {
          return (
            vehicles.idNum.toString().includes(searchQuery) ||
            vehicles.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicles.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicles.year.toString().includes(searchQuery) ||
            vehicles.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicles.regisNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicles.capacity.toString().includes(searchQuery) ||
            options
              .find((option) => option.value === vehicles.status)
              .label.toLowerCase()
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
  ]
  if (vehicle.length === 0) {
    return (
      <CAlert color="danger" className="text-center justify-content-center">
        No vehicles found
      </CAlert>
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
        {filteredVehicles.map((vehicle, index) => (
          <CAccordionItem key={vehicle._id || index}>
            <CAccordionHeader>
              <p className="w-100 m-1 ">
                Registration Number:<strong className="ms-2">{vehicle.regisNumber}</strong>
                <FontAwesomeIcon
                  icon={faCircle}
                  color={getStatusColor(vehicle.status)}
                  className="m-2 float-end"
                />
                <small className="m-2 float-end">
                  {options.find((option) => option.value === vehicle.status).label}
                </small>
              </p>
            </CAccordionHeader>
            <CAccordionBody>
              <CHeader>ID: {vehicle.idNum}</CHeader>
              <CHeader>Brand: {vehicle.brand}</CHeader>
              <CHeader>Model: {vehicle.model}</CHeader>
              <CHeader>Year: {vehicle.year}</CHeader>
              <CHeader>Type: {vehicle.type}</CHeader>
              <CHeader>Capacity: {vehicle.capacity}</CHeader>
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
                {adminRoles.includes(user.role) && (
                  <DeleteVehicle vehicle={vehicle} onDeleteVehicle={onDeleteVehicle} />
                )}
              </CContainer>
            </CAccordionBody>
          </CAccordionItem>
        ))}
      </CAccordion>

      {locaLError && (
        <CAlert color="danger" className="text-center justify-content-center">
          {locaLError}
        </CAlert>
      )}
    </>
  )
}

export default TableVehicle
