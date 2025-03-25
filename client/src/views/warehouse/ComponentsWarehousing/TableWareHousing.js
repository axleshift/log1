import React, { useEffect, useState, memo } from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CContainer,
  CSpinner,
  CAlert,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import DeleteItem from './DeleteItem'
import UpdateItem from './UpdateItem'
import { getRole } from '../../../utils/auth'

const TableWareHousing = ({ warehousing, loading, error, onDeleteItem, onUpdateItem }) => {
  const [filteredWarehousing, setFilteredWarehousing] = useState([])
  const [localError, setLocalError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const role = getRole()
  const adminRoles = ['manager', 'admin']
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredWarehousing.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredWarehousing.length / itemsPerPage)

  useEffect(() => {
    try {
      if (searchQuery === '') {
        setFilteredWarehousing(warehousing)
        setLocalError(null)
        return
      }

      const query = searchQuery.toLowerCase().trim()
      const filtered = warehousing.filter((item) => {
        try {
          return (
            // Basic info
            item.poNumber?.toLowerCase().includes(query) ||
            // Warehouse details
            item.warehouseLocDetails?.warehouseName?.toLowerCase().includes(query) ||
            item.warehouseLocDetails?.address?.toLowerCase().includes(query) ||
            // Vendor details
            item.vendor?.businessName?.toLowerCase().includes(query) ||
            item.vendor?.businessAddress?.toLowerCase().includes(query) ||
            item.vendor?.contactNumber?.includes(query) ||
            // Date details
            (item.orderDate && new Date(item.orderDate).toLocaleDateString().includes(query)) ||
            (item.dateOfReceived &&
              new Date(item.receiveDate).toLocaleDateString().includes(query)) ||
            // Received by
            (item.byReceived?.toString().toLowerCase()?.includes(query) ?? false) ||
            // Details/Products
            item.details?.some(
              (detail) =>
                detail.description?.toLowerCase().includes(query) ||
                detail.quantity?.toString().includes(query) ||
                detail.unitPrice?.toString().includes(query),
            )
          )
        } catch (err) {
          console.error('Error filtering item:', err)
          return false
        }
      })

      setFilteredWarehousing(filtered)
      setCurrentPage(1)

      if (filtered.length === 0) {
        setLocalError('No data found')
      } else {
        setLocalError(null)
      }
    } catch (error) {
      console.error('Error in search effect:', error)
      setLocalError('Error occurred while searching')
    }
  }, [searchQuery, warehousing])

  // const formatDate = (dateString) => {
  //   return new Date(dateString).toLocaleDateString()
  // }

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
            placeholder="Search by PO Number, Vendor, or Products..."
            value={searchQuery}
            id="searchItem"
            onChange={handleSearchChange}
          />
          <CInputGroupText>
            <FontAwesomeIcon icon={faSearch} />
          </CInputGroupText>
        </CInputGroup>
      </CContainer>

      {loading ? (
        <CSpinner color="primary" className="mt-5 w-15 mx-auto justify-content-center" />
      ) : warehousing.length === 0 ? (
        <CAlert color="warning" className="text-center mt-5 w-75 mx-auto">
          No data available
        </CAlert>
      ) : (
        <>
          {localError && (
            <CAlert color="danger" className="text-center mt-5 w-75 mx-auto">
              {localError}
            </CAlert>
          )}
          <CAccordion className="m-2">
            {currentItems.map((item) => (
              <CAccordionItem key={item._id}>
                <CAccordionHeader>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <div>
                      <ul className="list-unstyled">
                        <li>
                          PO Number: <strong>{item.poNumber}</strong>
                        </li>
                        <li>
                          Warehuse Location: <strong>{item.warehouse.warehouseName}</strong>
                        </li>
                      </ul>
                    </div>
                    <div className="text-medium-emphasis">
                      Order Date: {new Date(item.orderDate).toLocaleDateString()}
                    </div>
                  </div>
                </CAccordionHeader>
                <CAccordionBody>
                  <div className="mb-3">
                    <h6>Vendor Information</h6>
                    <div className="ms-3">
                      <div>
                        <strong>Name:</strong> {item.vendor.businessName}
                      </div>
                      <div>
                        <strong>Address:</strong> {item.vendor.businessAddress}
                      </div>
                      <div>
                        <strong>Contact:</strong> {item.vendor.contactNumber}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h6>Shipping Details</h6>
                    <div className="ms-3">
                      <div>
                        <strong>Carrier:</strong> {item.carrier}
                      </div>
                      <div>
                        <strong>Receive Date:</strong>{' '}
                        {new Date(item.receiveDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h6>Products</h6>
                    <CTable responsive small className="mt-2">
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>Description</CTableHeaderCell>
                          <CTableHeaderCell>Quantity</CTableHeaderCell>
                          <CTableHeaderCell>Received By</CTableHeaderCell>
                          <CTableHeaderCell>Received Date</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {item.details.map((detail, index) => (
                          <CTableRow key={index}>
                            <CTableDataCell>{detail.description}</CTableDataCell>
                            <CTableDataCell>{detail.quantity}</CTableDataCell>
                            <CTableDataCell>{item.byReceived}</CTableDataCell>
                            <CTableDataCell>
                              {item.dateOfReceived
                                ? new Date(item.dateOfReceived).toLocaleDateString()
                                : 'N/A'}
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </div>

                  {item.additionalNotes && (
                    <div className="mb-3">
                      <h6>Additional Notes</h6>
                      <div className="ms-3">{item.additionalNotes}</div>
                    </div>
                  )}

                  <CContainer className="d-flex justify-content-end mt-3">
                    <UpdateItem warehousing={item} onUpdateItem={onUpdateItem} />
                    {adminRoles.includes(role) && (
                      <DeleteItem warehousing={item} onDeleteItem={onDeleteItem} />
                    )}
                  </CContainer>
                </CAccordionBody>
              </CAccordionItem>
            ))}
          </CAccordion>

          {/* Pagination */}
          {filteredWarehousing.length > 0 && (
            <CContainer className="d-flex justify-content-between align-items-center">
              <div>
                Showing {indexOfFirstItem + 1} to{' '}
                {Math.min(indexOfLastItem, filteredWarehousing.length)} of{' '}
                {filteredWarehousing.length} entries
              </div>

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
        </>
      )}
    </>
  )
}

export default TableWareHousing
