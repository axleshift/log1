import React, { useEffect, useState, memo } from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CHeader,
  CButton,
  CContainer,
  CSpinner,
  CAlert,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCircle } from '@fortawesome/free-solid-svg-icons'
import DeleteItem from './DeleteItem'
import UpdateItem from './UpdateItem'
import axios from 'axios'

const API = import.meta.env.VITE_APP_API_URL
const api = axios.create({
  baseURL: API,
})

const TableWareHousing = ({ warehousing, loading, error, onDeleteItem, onUpdateItem }) => {
  const [filteredWarehousing, setFilteredWarehousing] = useState([])
  const [localError, setLocalError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const user = JSON.parse(sessionStorage.getItem('user'))
  const adminRoles = ['manager', 'admin']

  useEffect(() => {
    const handleSearch = () => {
      if (searchQuery === '') {
        setFilteredWarehousing(warehousing)
      } else {
        const filteredWarehousing = warehousing.filter((item) => {
          const categoryLabel =
            categories.find((category) => category.value === item.category)?.label.toLowerCase() ||
            ''
          return (
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.quantity.toString().includes(searchQuery) ||
            item.weight.toString().includes(searchQuery) ||
            formatDate(item.dateArrival).includes(searchQuery) ||
            categoryLabel.includes(searchQuery.toLowerCase())
          )
        })
        setFilteredWarehousing(filteredWarehousing)
        if (filteredWarehousing.length === 0) {
          setLocalError('No Item found')
        } else {
          setLocalError(null)
        }
      }
    }
    handleSearch()
  }, [searchQuery, warehousing])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  const categories = [
    { label: 'General Merchandise', value: 'generalMerchandise' },
    { label: 'Perishables', value: 'perishables' },
    { label: 'Hazardous Materials', value: 'hazardousMaterials' },
    { label: 'High-Value Goods', value: 'highValueGoods' },
    { label: 'Oversized/Heavy Goods', value: 'oversizedHeavy' },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Queued':
        return 'orange'
      case 'dispatched':
        return 'green'
      case 'on_process':
        return 'orange'
      case 'Cancelled':
        return 'red'
      default:
        return 'black'
    }
  }
  // const options = [
  //   { value: 'pending', label: 'Queued' },
  //   { value: 'dispatched', label: 'Dispatched' },
  //   { value: 'on_process', label: 'On process' },
  //   { value: 'Cancelled', label: 'Cancelled' },
  // ]

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  if (loading) {
    return <CSpinner color="primary" className="mt-5 w-15 mx-auto justify-content-center" />
  }
  if (warehousing.length === 0) {
    return (
      <CAlert color="warning" className="text-center mt-5 w-75 mx-auto">
        No data available
      </CAlert>
    )
  }
  return (
    <>
      <CContainer className="mt-3">
        <CInputGroup className="w-50 mb-3">
          <CFormInput
            type="text"
            placeholder="Search Items..."
            value={searchQuery}
            id="searchInput"
            onChange={handleSearchChange}
          />
          <CInputGroupText>
            <FontAwesomeIcon icon={faSearch} />
          </CInputGroupText>
        </CInputGroup>
      </CContainer>
      {error && (
        <CAlert color="danger" className="text-center mt-5 w-75 mx-auto">
          {error}
        </CAlert>
      )}

      {localError && (
        <CAlert color="danger" className="text-center mt-5 w-75 mx-auto">
          {localError}
        </CAlert>
      )}
      <CAccordion className="m-2 ">
        {filteredWarehousing.map((warehousing) => (
          <CAccordionItem key={warehousing._id}>
            <CAccordionHeader>
              <ul className="list-unstyled p-0 m-0 w-100">
                <li>
                  Name / Company: <strong>{warehousing.name}</strong>
                </li>
                <li>
                  From: <strong>{warehousing.from}</strong>
                </li>
              </ul>
              <FontAwesomeIcon
                icon={faCircle}
                color={getStatusColor(warehousing.status)}
                className="float-end"
              />
              <small className=" m-2 float-end">
                {/* {options.find((option) => option.value === warehousing.status)?.label ||
                  warehousing.status} */}
                {warehousing.status}
              </small>
            </CAccordionHeader>
            <CAccordionBody>
              <CHeader>Item Name: {warehousing.itemName}</CHeader>
              <CHeader>Quantity: {warehousing.quantity}</CHeader>
              <CHeader>Weight: {warehousing.weight}</CHeader>
              <CHeader>
                Dimension:{' '}
                {`${warehousing.length} x ${warehousing.width} x ${warehousing.height} cm`}
              </CHeader>
              <CHeader>Date Arrival: {formatDate(warehousing.dateArrival)}</CHeader>
              <CHeader>Received By: {warehousing.byReceived}</CHeader>
              <CHeader>
                Warehouse: {warehousing.warehouse ? warehousing.warehouse.warehouseName : 'Unknown'}
              </CHeader>
              <CHeader>
                Category:{' '}
                {categories.find((category) => category.value === warehousing.category)?.label ||
                  'Unknown'}
              </CHeader>
              <CContainer className="d-flex justify-content-end mt-3">
                <UpdateItem warehousing={warehousing} onUpdateItem={onUpdateItem} />
                {adminRoles.includes(user.data.user.role) && (
                  <DeleteItem warehousing={warehousing} onDeleteItem={onDeleteItem} />
                )}
              </CContainer>
            </CAccordionBody>
          </CAccordionItem>
        ))}
      </CAccordion>
    </>
  )
}

export default TableWareHousing
