/* eslint-disable prettier/prettier */
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {
  CButton,
  CRow,
  CCol,
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
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCircle } from '@fortawesome/free-solid-svg-icons'
import UpdateDriver from './UpdateDriver'
import DeleteDriver from './DeleteDriver'

const TableDriver = () => {
  const API_URL = import.meta.env.VITE_APP_API_URL
  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // This is important for cookies
  })
  const user = JSON.parse(sessionStorage.getItem('user'))
  const adminRoles = ['manager', 'admin']
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [driver, setDriver] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredDrivers, setFilteredDrivers] = useState([])

  const getDrivers = async () => {
    const response = await api.get('/api/v1/driver')
    if (response.status === 200) {
      setDriver(response.data.data)
      setLoading(false)
    }
  }

  useEffect(() => {
    const handleSearch = async () => {
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
          setError('No results found')
        } else {
          setError(null)
        }
      }
    }
    handleSearch()
    getDrivers()
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
      {loading && (
        <CRow className=" mt-5 d-flex justify-content-center ">
          <CCol sm="12" md="8">
            <CSpinner color="primary" />
          </CCol>
        </CRow>
      )}

      {filteredDrivers.length > 0 ? (
        <CAccordion className="m-2">
          {filteredDrivers.map((driver) => (
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
                    <UpdateDriver driver={driver} />
                  )}
                  {adminRoles.includes(user.data.user.role) && <DeleteDriver driver={driver} />}
                </CContainer>
              </CAccordionBody>
            </CAccordionItem>
          ))}
        </CAccordion>
      ) : (
        <CHeader className="justify-content-center">0 results found</CHeader>
      )}
      {error && (
        <CAlert color="danger" className="text-center justify-content-center">
          {error}
        </CAlert>
      )}
    </>
  )
}

export default TableDriver
