import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CSpinner,
  CFormInput,
  CContainer,
  CInputGroup,
  CInputGroupText,
  CPagination,
  CPaginationItem,
  CAlert,
} from '@coreui/react'
import React, { useState, useEffect } from 'react'
import AddItem from './AddItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import api from '../../../utils/api'
const ForReicevingItems = ({ onAddItem }) => {
  const [reicevingItems, setReicevingItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [localError, setLocalError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredItems, setFilteredItems] = useState([])
  const itemsPerPage = 10
  const [mockDataReiceving, setMockDataReiceving] = useState([
    {
      id: 1,
      PoNumber: '123456',
      from: 'Supplier A',
      items: [
        { itemName: 'Item 1', quantity: 10 },
        { itemName: 'Item 2', quantity: 5 },
      ],
    },
    {
      id: 2,
      PoNumber: '563424',
      from: 'Supplier B',
      items: [
        { itemName: 'Item 1', quantity: 8 },
        { itemName: 'Item 4', quantity: 12 },
        { itemName: 'Item 5', quantity: 12 },
      ],
    },
    {
      id: 3,
      PoNumber: '56323224',
      from: 'Supplier C',
      items: [
        { itemName: 'Item 6', quantity: 8 },
        { itemName: 'Item 7', quantity: 12 },
        { itemName: 'Item 8', quantity: 12 },
        { itemName: 'Item 9', quantity: 12 },
      ],
    },
    {
      id: 4,
      PoNumber: '56342234',
      from: 'Supplier D',
      items: [
        { itemName: 'Item 10', quantity: 8 },
        { itemName: 'Item 11', quantity: 8 },
      ],
    },

    {
      id: 5,
      PoNumber: '563433334',
      from: 'Supplier E',
      items: [
        { itemName: 'Item 12', quantity: 8 },
        { itemName: 'Item 13', quantity: 8 },
        { itemName: 'Item 14', quantity: 8 },
        { itemName: 'Item 15', quantity: 8 },
      ],
    },
  ])

  useEffect(() => {
    setReicevingItems(mockDataReiceving)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredItems(reicevingItems)
    } else {
      const filteredItems = reicevingItems.filter((item) => {
        const matchesItems = item.PoNumber.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFrom = item.from.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesItemName = item.items.some((subItem) =>
          subItem.itemName.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        return matchesItems || matchesFrom || matchesItemName
      })
      setFilteredItems(filteredItems)
      setCurrentPage(1)
      if (filteredItems.length === 0) {
        setLocalError('No matching records found.')
      } else {
        setLocalError(null)
      }
    }
  }, [searchQuery, reicevingItems])

  if (loading) {
    return <CSpinner color="primary" className="mt-5 w-15 mx-auto justify-content-center" />
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = reicevingItems.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(reicevingItems.length / itemsPerPage)

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <>
      <CContainer className="mt-3">
        <CInputGroup className="w-50 mb-3">
          <CFormInput
            type="text"
            placeholder="Search by PO Number, Supplier, or Item Name"
            value={searchQuery}
            id="searchInput"
            onChange={handleSearchChange}
          />
          <CInputGroupText>
            <FontAwesomeIcon icon={faSearch} />
          </CInputGroupText>
        </CInputGroup>
      </CContainer>

      <CTable hover responsive size="sm" className="text-center">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>PO Number</CTableHeaderCell>
            <CTableHeaderCell>From</CTableHeaderCell>
            <CTableHeaderCell>Item Name</CTableHeaderCell>
            <CTableHeaderCell>Quantity</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {filteredItems.map((item, index) => (
            <CTableRow key={index}>
              <CTableDataCell className="text-center">{item.PoNumber}</CTableDataCell>
              <CTableDataCell>{item.from}</CTableDataCell>
              <CTableDataCell>
                {item.items.map((subItem) => (
                  <div key={subItem.itemName}>{subItem.itemName}</div>
                ))}
              </CTableDataCell>
              <CTableDataCell>
                {item.items.map((subItem) => (
                  <div key={subItem.itemName}>{subItem.quantity}</div>
                ))}
              </CTableDataCell>
              <CTableDataCell>
                <AddItem onAddItem={onAddItem} mockDataReiceving={mockDataReiceving} item={item} />
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      {localError && (
        <CAlert color="danger" className="text-center mt-5 w-75 mx-auto justify-content-center">
          {localError}
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

export default ForReicevingItems
