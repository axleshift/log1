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
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect,
} from '@coreui/react'
import React, { useState, useEffect } from 'react'
import AddItem from './AddItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
const ForReicevingItems = ({ onAddItem }) => {
  const [reicevingItems, setReicevingItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [localError, setLocalError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredItems, setFilteredItems] = useState([])
  const [isPoExists, setIsPoExists] = useState(false)
  const itemsPerPage = 10
  const [mockDataReiceving, setMockDataReiceving] = useState([
    {
      _id: '605c72ef1532071b7f1a2c3d',
      poNumber: 'PO12345',
      orderDate: '2025-03-01T00:00:00.000Z',
      receiveDate: '2025-03-05T00:00:00.000Z',
      carrier: 'UPS',
      vendor: {
        businessName: 'Vendor ABC',
        businessAddress: '123 Vendor St, Vendor City, VC',
        contactNumber: '123-456-7890',
      },
      shipTo: '605c72ef1532071b7f1a2c3e',
      details: [
        {
          productId: '605c72ef1532071b7f1a2c3f',
          description: 'Product 1',
          quantity: 10,
          unitPrice: 50.0,
          subTotal: 500.0,
        },
        {
          productId: '605c72ef1532071b7f1a2c40',
          description: 'Product 2',
          quantity: 5,
          unitPrice: 25.0,
          subTotal: 125.0,
        },
      ],
      procurementId: '605c72ef1532071b7f1a2c41',
      rfqId: null,
      vendorId: '605c72ef1532071b7f1a2c42',
      additionalNotes: 'Urgent delivery needed.',
      createdAt: '2025-03-01T00:00:00.000Z',
      updatedAt: '2025-03-01T00:00:00.000Z',
    },
    {
      _id: '605c72ef1532071b7f1a2c44',
      poNumber: 'PO12346',
      orderDate: '2025-03-02T00:00:00.000Z',
      receiveDate: '2025-03-06T00:00:00.000Z',
      carrier: 'FedEx',
      vendor: {
        businessName: 'Vendor XYZ',
        businessAddress: '456 Vendor Rd, Vendor Town, VT',
        contactNumber: '987-654-3210',
      },
      shipTo: '605c72ef1532071b7f1a2c45',
      details: [
        {
          productId: '605c72ef1532071b7f1a2c46',
          description: 'Product 3',
          quantity: 20,
          unitPrice: 30.0,
          subTotal: 600.0,
        },
        {
          productId: '605c72ef1532071b7f1a2c47',
          description: 'Product 4',
          quantity: 15,
          unitPrice: 40.0,
          subTotal: 600.0,
        },
      ],
      procurementId: '605c72ef1532071b7f1a2c48',
      rfqId: '605c72ef1532071b7f1a2c49',
      vendorId: '605c72ef1532071b7f1a2c4a',
      additionalNotes: 'Handle with care.',
      createdAt: '2025-03-02T00:00:00.000Z',
      updatedAt: '2025-03-02T00:00:00.000Z',
    },
    {
      _id: '605c72ef1532071b7f1a2c4b',
      poNumber: 'PO12347',
      orderDate: '2025-03-03T00:00:00.000Z',
      receiveDate: '2025-03-07T00:00:00.000Z',
      carrier: 'DHL',
      vendor: {
        businessName: 'Vendor LMN',
        businessAddress: '789 Vendor Blvd, Vendorville, VV',
        contactNumber: '555-123-4567',
      },
      shipTo: '605c72ef1532071b7f1a2c4c',
      details: [
        {
          productId: '605c72ef1532071b7f1a2c4d',
          description: 'Product 5',
          quantity: 25,
          unitPrice: 10.0,
          subTotal: 250.0,
        },
        {
          productId: '605c72ef1532071b7f1a2c4e',
          description: 'Product 6',
          quantity: 10,
          unitPrice: 15.0,
          subTotal: 150.0,
        },
      ],
      procurementId: '605c72ef1532071b7f1a2c4f',
      rfqId: '605c72ef1532071b7f1a2c50',
      vendorId: '605c72ef1532071b7f1a2c51',
      additionalNotes: 'Includes free shipping.',
      createdAt: '2025-03-03T00:00:00.000Z',
      updatedAt: '2025-03-03T00:00:00.000Z',
    },
  ])

  useEffect(() => {
    setReicevingItems(mockDataReiceving)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (searchQuery === '') {
      setReicevingItems(mockDataReiceving)
      return
    }

    const query = searchQuery.toLowerCase().trim()
    const filtered = mockDataReiceving.filter((item) => {
      try {
        return (
          // Basic info
          item.poNumber?.toLowerCase().includes(query) ||
          // Supplier details
          item.vendor?.businessName?.toLowerCase().includes(query) ||
          item.vendor?.businessAddress?.toLowerCase().includes(query) ||
          item.vendor?.contactNumber?.toLowerCase().includes(query) ||
          // Carrier details
          item.carrier?.toLowerCase().includes(query) ||
          // Date details
          (item.orderDate && new Date(item.orderDate).toLocaleDateString().includes(query)) ||
          (item.receiveDate && new Date(item.receiveDate).toLocaleDateString().includes(query)) ||
          // Item details
          item.details?.some((detail) => detail.description?.toLowerCase().includes(query))
        )
      } catch (error) {
        console.error('Error filtering data:', error)
        return false
      }
    })

    setReicevingItems(filtered)
    setCurrentPage(1)
    setLocalError(filtered.length === 0 ? 'No results found' : null)
  }, [searchQuery]) // Remove reicevingItems from dependency array

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

      <CTable hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>PO Number</CTableHeaderCell>
            <CTableHeaderCell>Order Date</CTableHeaderCell>
            <CTableHeaderCell>Date to Receive</CTableHeaderCell>
            <CTableHeaderCell>Carrier</CTableHeaderCell>
            <CTableHeaderCell>Vendor</CTableHeaderCell>
            <CTableHeaderCell>Products</CTableHeaderCell>
            <CTableHeaderCell>Total Amount</CTableHeaderCell>
            <CTableHeaderCell>Notes</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentItems.map((item) => {
            // Calculate total amount for all products
            const totalAmount = item.details.reduce((sum, detail) => sum + detail.subTotal, 0)

            return (
              <CTableRow key={item._id}>
                <CTableDataCell>{item.poNumber}</CTableDataCell>
                <CTableDataCell>{new Date(item.orderDate).toLocaleDateString()}</CTableDataCell>
                <CTableDataCell>{new Date(item.receiveDate).toLocaleDateString()}</CTableDataCell>
                <CTableDataCell>{item.carrier}</CTableDataCell>
                <CTableDataCell>
                  <div>{item.vendor.businessName}</div>
                  <small className="text-medium-emphasis">{item.vendor.contactNumber}</small>
                </CTableDataCell>
                <CTableDataCell>
                  {item.details.map((detail) => (
                    <div key={detail.productId}>
                      {detail.description} ( pcs: {detail.quantity} x {detail.unitPrice.toFixed(2)}{' '}
                      )
                    </div>
                  ))}
                </CTableDataCell>
                <CTableDataCell>{totalAmount.toFixed(2)}</CTableDataCell>
                <CTableDataCell>{item.additionalNotes}</CTableDataCell>
                <CTableDataCell>
                  <AddItem
                    item={item}
                    onAddItem={onAddItem}
                    mockDataReiceving={mockDataReiceving}
                  />
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>

      {reicevingItems.length > 0 && (
        <CContainer className="d-flex justify-content-between align-items-center">
          <CContainer>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, reicevingItems.length)} of{' '}
            {reicevingItems.length} entries
          </CContainer>

          <CPagination className="mt-3">
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
        </CContainer>
      )}

      {localError && (
        <CAlert color="danger" className="text-center mt-5 w-75 mx-auto justify-content-center">
          {localError}
        </CAlert>
      )}
    </>
  )
}

export default ForReicevingItems
