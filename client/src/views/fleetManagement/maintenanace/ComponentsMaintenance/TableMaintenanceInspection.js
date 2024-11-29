import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CAccordion,
  CHeader,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CSpinner,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CContainer,
  CAlert,
  CButton,
  CPopover,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCircle, faListCheck } from '@fortawesome/free-solid-svg-icons'
import DeleteMaintenanceInspection from './DeleteMaintenanceInspection'
import AddMaintenanceCheckList from './AddMiantenanceCheckList'

const TableMaintenanceInspection = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const API_URL = import.meta.env.VITE_APP_API_URL
  const api = axios.create({
    baseURL: API_URL,
  })
  const [data, setData] = useState([])
  const [Loading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [fildteredData, setFilteredData] = useState([])
  const [error, setError] = useState(null)
  const user = JSON.parse(sessionStorage.getItem('user'))
  const adminRoles = ['manager', 'admin']

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await api.get('/api/v1/maintenance/inspections')
      setData(response.data.data)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setIsLoading(false)
    }
  }

  const handleUpdate = () => {
    fetchData()
  }
  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery === '') {
        setFilteredData(data)
      } else {
        const filtered = data.filter((item) => {
          return (
            item.vehicleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.vehicleId.regisNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.scheduledDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.inspector.toLowerCase().includes(searchQuery.toLowerCase())
          )
        })
        setFilteredData(filtered)
        if (filtered.length === 0) {
          setError('No results found')
        } else {
          setError(null)
        }
      }
    }
    handleSearch()
    fetchData()
  }, [searchQuery, data])
  const options = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Cancelled', label: 'Cancelled' },
    { value: 'In Progress', label: 'In Progress' },
  ]
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'yellow'
      case 'Completed':
        return 'green'
      case 'In Progress':
        return 'orange'
      case 'Cancelled':
        return 'red'
      default:
        return 'black'
    }
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
      {modalVisible && (
        <AddMaintenanceCheckList
          item={selectedItem}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onUpdate={handleUpdate}
        />
      )}
      {fildteredData.length > 0 ? (
        <CAccordion className="m-2">
          {fildteredData.map((item) => (
            <CAccordionItem key={item._id}>
              <CAccordionHeader>
                <p className="w-100 m-1 ">
                  Registration Number:
                  <strong className="ms-2">
                    {item.vehicleId
                      ? `${item.vehicleId.regisNumber} - ${item.vehicleId.model}`
                      : ''}
                  </strong>
                </p>
                <FontAwesomeIcon
                  icon={faCircle}
                  color={getStatusColor(item.status)}
                  className="m-2 float-end"
                />
                <small className="m-2 float-end">
                  {' '}
                  {options.find((option) => option.value === item.status).label}
                </small>
              </CAccordionHeader>
              <CAccordionBody>
                <CHeader>
                  Scheduled Date: {new Date(item.scheduledDate).toLocaleDateString()}
                </CHeader>
                <CHeader>Name of Inspector: {item.inspector}</CHeader>
                <CContainer className="d-flex justify-content-end mt-3">
                  <CPopover
                    content="It is disable if the status is completed"
                    placement="right"
                    trigger={['hover', 'focus']}
                  >
                    <span className="d-inline-block" tabIndex={0}>
                      <CButton
                        color="primary"
                        className="me-2"
                        variant="outline"
                        disabled={item.status === 'Completed'}
                        onClick={() => {
                          setSelectedItem(item)
                          setModalVisible(true)
                        }}
                      >
                        <FontAwesomeIcon icon={faListCheck} />
                      </CButton>
                    </span>
                  </CPopover>
                  {adminRoles.includes(user.data.user.role) && (
                    <DeleteMaintenanceInspection item={item} />
                  )}
                </CContainer>
              </CAccordionBody>
            </CAccordionItem>
          ))}
        </CAccordion>
      ) : (
        <CHeader>0 results found</CHeader>
      )}

      {error && (
        <CAlert color="danger" className="text-center justify-content-center">
          {error}
        </CAlert>
      )}
    </>
  )
}

export default TableMaintenanceInspection
