/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CTable,
  CAlert,
  CInputGroup,
  CInputGroupText,
  CContainer,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

const DriverManagement = () => {
  const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5057'

  const api = axios.create({
    baseURL: API_URL,
  })
  const user = JSON.parse(sessionStorage.getItem('user'))
  const adminRoles = ['manager', 'admin']
  const [visible, setVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editingDriver, setEditingDriver] = useState(null)
  const [drivers, setDrivers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const randomId = Math.floor(Math.random() * 10000000000).toString()
  const [error, setError] = useState()
  const [driver, setDriver] = useState({
    idNum: randomId,
    driverName: '',
    email: '',
    phone: '',
    address: '',
    licenseNumber: '',
  })
  useEffect(() => {
    getDrivers()
    // updateDriver()
  }, [])

  const getDrivers = async () => {
    const response = await api.get('/api/v1/driver')
    setDrivers(response.data.data)
  }
  const addDriver = async () => {
    try {
      const newDriver = {
        idNum: randomId,
        driverName: driver.driverName,
        email: driver.email,
        phone: driver.phone,
        address: driver.address,
        licenseNumber: driver.licenseNumber,
      }
      setDriver({ ...driver, driverName: '', email: '', phone: '', address: '', licenseNumber: '' })
      await api.post('/api/v1/driver', newDriver)
      getDrivers()
      setVisible(false)
    } catch (error) {
      console.error('Error adding driver:', error)
      setError(error.response.data.message)
    }
  }
  const deleteDriver = async (_id) => {
    await api.delete(`/api/v1/driver/${_id}`)
    getDrivers()
  }
  const handleEditClick = (driver) => {
    setEditingDriver(driver)
    setEditModalVisible(true)
  }

  const handleUpdateDriver = async () => {
    if (!editingDriver) return

    const updatedDriver = {
      idNum: editingDriver.idNum,
      driverName: editingDriver.driverName,
      email: editingDriver.email,
      phone: editingDriver.phone,
      address: editingDriver.address,
      licenseNumber: editingDriver.licenseNumber,
    }

    try {
      await api.put(`/api/v1/driver/${editingDriver._id}`, updatedDriver)
      getDrivers()
      setEditModalVisible(false)
      setEditingDriver(null)
    } catch (error) {
      console.error('Error updating driver:', error)
      setError(error.response.data.message)
    }
  }

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      getDrivers() // fetch the original data
    } else {
      const filteredDrivers = drivers.filter((driver) => {
        const searchTerms = searchQuery.toLowerCase().split(' ')
        return searchTerms.every((term) => {
          return (
            driver.driverName.toLowerCase().includes(term) ||
            driver.licenseNumber.toLowerCase().includes(term) ||
            driver.email.toLowerCase().includes(term) ||
            driver.phone.toLowerCase().includes(term) ||
            driver.address.toLowerCase().includes(term) ||
            driver.idNum.toLowerCase().includes(term)
          )
        })
      })
      setDrivers(filteredDrivers)
    }
  }

  return (
    <CContainer fluid className="p-3" style={{ height: '100vh', textAlign: 'center' }}>
      <h1 style={{ textAlign: 'center', margin: '10px' }}>Driver Management</h1>
      <CButton
        color="primary"
        style={{
          margin: '10px',
          display: 'block',
          float: 'left',
          width: '100px',
        }}
        onClick={() => setVisible(!visible)}
      >
        Add
      </CButton>
      <CModal visible={visible} onClose={() => setVisible(false)} aria-labelledby="LiveDemoExample">
        <CModalHeader id="LiveDemoExampleLabel">
          <CModalTitle>Add Driver</CModalTitle>
        </CModalHeader>
        {error && <CAlert color="danger">{error}</CAlert>}
        <CModalBody>
          <CForm>
            <CFormInput
              floatingLabel="Driver ID"
              type="text"
              label="Driver ID"
              placeholder="Driver ID"
              name="Driver ID"
              required
              style={{ width: '100%', marginBottom: '10px' }}
              disabled
              value={driver.idNum}
              onChange={(e) =>
                setDriver({
                  ...driver,
                  idNum: e.target.value,
                })
              }
            />
            <CFormInput
              floatingLabel="Name"
              type="text"
              label="Name"
              placeholder="Name"
              name="name"
              required
              style={{ width: '100%', marginBottom: '10px' }}
              value={driver.driverName}
              onChange={(e) =>
                setDriver({
                  ...driver,
                  driverName: e.target.value,
                })
              }
            />
            <CFormInput
              floatingLabel="Email"
              type="email"
              label="Email"
              placeholder="Email"
              name="email"
              required
              style={{ width: '100%', marginBottom: '10px' }}
              value={driver.email}
              onChange={(e) =>
                setDriver({
                  ...driver,
                  email: e.target.value,
                })
              }
            />
            <CFormInput
              floatingLabel="Phone"
              type="number"
              label="Phone"
              placeholder="Phone"
              name="phone"
              required
              style={{ width: '100%', marginBottom: '10px' }}
              value={driver.phone}
              onChange={(e) =>
                setDriver({
                  ...driver,
                  phone: e.target.value,
                })
              }
            />
            <CFormInput
              floatingLabel="Address"
              type="text"
              label="Address"
              placeholder="Address"
              name="address"
              required
              style={{ width: '100%', marginBottom: '10px' }}
              value={driver.address}
              onChange={(e) =>
                setDriver({
                  ...driver,
                  address: e.target.value,
                })
              }
            />
            <CFormInput
              floatingLabel="License Number"
              type="text"
              label="License Number"
              placeholder="License Number"
              name="licenseNumber"
              required
              style={{ width: '100%', marginBottom: '10px' }}
              value={driver.licenseNumber}
              onChange={(e) =>
                setDriver({
                  ...driver,
                  licenseNumber: e.target.value,
                })
              }
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={addDriver}>
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
      <CInputGroup className="mb-3" style={{ width: '50%', margin: '10px', float: 'right' }}>
        <CInputGroupText>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </CInputGroupText>
        <CFormInput
          type="search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            if (e.target.value.trim() === '') {
              getDrivers() // refresh the data when search query is empty
            } else {
              handleSearch()
            }
          }}
          placeholder="Search drivers..."
        />
      </CInputGroup>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Drivers name</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Phone</CTableHeaderCell>
            <CTableHeaderCell>Address</CTableHeaderCell>
            <CTableHeaderCell>License Number</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {drivers.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan="7" style={{ textAlign: 'center' }}>
                No drivers found
              </CTableDataCell>
            </CTableRow>
          ) : (
            drivers.map((driver, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{driver.idNum}</CTableDataCell>
                <CTableDataCell>{driver.driverName}</CTableDataCell>
                <CTableDataCell>{driver.email}</CTableDataCell>
                <CTableDataCell>{driver.phone}</CTableDataCell>
                <CTableDataCell>{driver.address}</CTableDataCell>
                <CTableDataCell>{driver.licenseNumber}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    style={{ marginRight: '10px' }}
                    onClick={() => handleEditClick(driver)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </CButton>
                  {adminRoles.includes(user.data.user.role) && (
                    <CButton color="danger" onClick={() => deleteDriver(driver._id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </CButton>
                  )}
                </CTableDataCell>
              </CTableRow>
            ))
          )}
        </CTableBody>
      </CTable>
      <CModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        aria-labelledby="EditDriverModal"
      >
        <CModalHeader id="EditDriverModalLabel">
          <CModalTitle>Edit Driver</CModalTitle>
        </CModalHeader>
        {error && <CAlert color="danger">{error}</CAlert>}
        <CModalBody>
          {editingDriver && (
            <CForm>
              <CFormInput
                floatingLabel="Driver ID"
                type="text"
                label="Driver ID"
                placeholder="Driver ID"
                name="Driver ID"
                style={{ width: '100%', marginBottom: '10px' }}
                value={editingDriver.idNum}
                onChange={(e) =>
                  setEditingDriver({
                    ...editingDriver,
                    idNum: e.target.value,
                  })
                }
              />
              <CFormInput
                floatingLabel="Name"
                type="text"
                label="Name"
                placeholder="Name"
                name="name"
                style={{ width: '100%', marginBottom: '10px' }}
                value={editingDriver.driverName}
                onChange={(e) =>
                  setEditingDriver({
                    ...editingDriver,
                    driverName: e.target.value,
                  })
                }
              />
              <CFormInput
                floatingLabel="Email"
                type="email"
                label="Email"
                placeholder="Email"
                name="email"
                style={{ width: '100%', marginBottom: '10px' }}
                value={editingDriver.email}
                onChange={(e) =>
                  setEditingDriver({
                    ...editingDriver,
                    email: e.target.value,
                  })
                }
              />
              <CFormInput
                floatingLabel="Phone"
                type="number"
                label="Phone"
                placeholder="Phone"
                name="phone"
                style={{ width: '100%', marginBottom: '10px' }}
                value={editingDriver.phone}
                onChange={(e) =>
                  setEditingDriver({
                    ...editingDriver,
                    phone: e.target.value,
                  })
                }
              />
              <CFormInput
                floatingLabel="Address"
                type="text"
                label="Address"
                placeholder="Address"
                name="address"
                style={{ width: '100%', marginBottom: '10px' }}
                value={editingDriver.address}
                onChange={(e) =>
                  setEditingDriver({
                    ...editingDriver,
                    address: e.target.value,
                  })
                }
              />
              <CFormInput
                floatingLabel="License Number"
                type="text"
                label="License Number"
                placeholder="License Number"
                name="licenseNumber"
                style={{ width: '100%', marginBottom: '10px' }}
                value={editingDriver.licenseNumber}
                onChange={(e) =>
                  setEditingDriver({
                    ...editingDriver,
                    licenseNumber: e.target.value,
                  })
                }
              />
            </CForm>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setEditModalVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => handleUpdateDriver(editingDriver)}>
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}

export default DriverManagement

// components/DriverList.js
