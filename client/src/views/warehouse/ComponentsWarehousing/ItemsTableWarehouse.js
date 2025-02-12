import React, { useState, useEffect } from 'react'
import {
  CTable,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CTableHead,
  CTableBody,
  CSpinner,
  CAlert,
  CContainer,
  CInputGroup,
  CFormInput,
  CInputGroupText,
  CBadge,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const API = import.meta.env.VITE_APP_API_URL
const api = axios.create({
  baseURL: API,
})

const ItemsTableWarehouse = ({ items, loading, error }) => {
  const [filteredItems, setFilteredItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [localError, setLocalError] = useState(null)
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  // Status badge colors
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Stocked':
        return 'success'
      case 'Out of Stock':
        return 'danger'
      default:
        return 'secondary'
    }
  }

  useEffect(() => {
    setFilteredItems(items)
  }, [items])

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredItems(items)
      setLocalError(null)
    } else {
      const filtered = items.filter((item) => {
        const matchesItemName = item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesWarehouse = item.locations.some((location) => {
          const warehouse = location.warehouse
          return (
            warehouse.warehouseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            warehouse.address.toLowerCase().includes(searchQuery.toLowerCase())
          )
        })
        return matchesItemName || matchesWarehouse
      })

      setFilteredItems(filtered)
      setCurrentPage(1)
      if (filtered.length === 0) {
        setLocalError('No results found')
      } else {
        setLocalError(null)
      }
    }
  }, [searchQuery, items])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const getUniqueLocations = (locations) => {
    if (!locations) return []

    const uniqueWarehouses = new Map()

    locations.forEach((location) => {
      const warehouseId = location.warehouse._id
      if (!uniqueWarehouses.has(warehouseId)) {
        uniqueWarehouses.set(warehouseId, {
          ...location.warehouse,
          quantity: location.quantity,
          status: location.status || 'Stocked', // Include status
        })
      } else {
        const existing = uniqueWarehouses.get(warehouseId)
        existing.quantity += location.quantity
        uniqueWarehouses.set(warehouseId, existing)
      }
    })

    return Array.from(uniqueWarehouses.values())
  }

  if (loading) {
    return (
      <CSpinner color="primary" className="text-center mt-5 w-75 mx-auto justify-content-center" />
    )
  }

  if (error) {
    return (
      <CAlert color="danger" className="text-center mt-5 w-75 mx-auto justify-content-center">
        Error: {error}
      </CAlert>
    )
  }
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

  return (
    <>
      <CContainer className="m-3">
        <CInputGroup className="w-50 mb-3">
          <CFormInput
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by item name or warehouse..."
          />
          <CInputGroupText>
            <FontAwesomeIcon icon={faSearch} />
          </CInputGroupText>
        </CInputGroup>
      </CContainer>
      <strong className="m-3 align-self-start">Total Items: {currentItems.length}</strong>

      {localError ? (
        <CAlert color="warning">{localError}</CAlert>
      ) : (
        <CTable hover responsive striped className="text-center">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Item Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Total Quantity</CTableHeaderCell>
              <CTableHeaderCell scope="col">Warehouse Locations</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentItems.map((item, index) => (
              <CTableRow key={item._id || index}>
                <CTableDataCell>{item.itemName}</CTableDataCell>
                <CTableDataCell>
                  <strong>{item.quantity}</strong>
                </CTableDataCell>
                <CTableDataCell>
                  <CContainer className="locations-list ">
                    {getUniqueLocations(item.locations).map((warehouse, idx) => (
                      <CContainer key={idx} className="location-item">
                        <CContainer className="location-details">
                          <span className="warehouse-name">{warehouse.warehouseName}</span>
                          <span className="warehouse-address">{warehouse.address}</span>
                          <span className="quantity-badge">Qty: {warehouse.quantity}</span>
                        </CContainer>
                      </CContainer>
                    ))}
                  </CContainer>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge
                    color={getStatusBadgeColor(
                      item.status || (item.quantity > 0 ? 'Stocked' : 'Out of Stock'),
                    )}
                  >
                    {item.status || (item.quantity > 0 ? 'Stocked' : 'Out of Stock')}
                  </CBadge>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      )}
      {filteredItems.length === 0 && !localError && (
        <CAlert color="warning" className="text-center mt-5 w-75 mx-auto">
          No items found.
        </CAlert>
      )}

      <CPagination align="center">
        <CPaginationItem
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </CPaginationItem>
        {[...Array(totalPages).keys()].map((page) => (
          <CPaginationItem
            key={page + 1}
            active={page + 1 === currentPage}
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </CPaginationItem>
        ))}
        <CPaginationItem
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </CPaginationItem>
      </CPagination>
    </>
  )
}

const styles = `
  .locations-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .location-item {
    display: flex;
    flex-direction: column;
    padding: 8px;
    background-color: #f8f9fa;
    border-radius: 4px;
    width: fit-content;

  }

  .location-details {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
  }

  .warehouse-name {
    font-weight: 500;
    color: #495057;
  }

  .warehouse-address {
    color: #6c757d;
    font-size: 0.9em;
    font-style: italic;
  }

  .quantity-badge {
    background-color: #e9ecef;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.85em;
    color: #495057;
  }

`

const styleSheet = document.createElement('style')
styleSheet.innerText = styles
document.head.appendChild(styleSheet)

export default ItemsTableWarehouse
