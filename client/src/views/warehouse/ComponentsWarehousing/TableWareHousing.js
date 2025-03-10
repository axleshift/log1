import React, { useEffect, useState, memo } from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CHeader,
  CContainer,
  CSpinner,
  CAlert,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CPopover,
  CBadge,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCircle } from '@fortawesome/free-solid-svg-icons'
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
    // Debounce the search to avoid too frequent updates
    const timeoutId = setTimeout(() => {
      try {
        if (!searchQuery.trim()) {
          setFilteredWarehousing(warehousing)
          setLocalError(null)
          return
        }

        const query = searchQuery.toLowerCase().trim()
        const filtered = warehousing.filter((item) => {
          // Early return if any of the main fields match
          if (
            (item.PoNumber && item.PoNumber.toLowerCase().includes(query)) ||
            (item.from && item.from.toLowerCase().includes(query)) ||
            (item.dateArrival && formatDate(item.dateArrival).includes(query))
          ) {
            return true
          }

          // Check items array if it exists
          if (Array.isArray(item.items)) {
            return item.items.some(
              (subItem) =>
                (subItem.itemName && subItem.itemName.toLowerCase().includes(query)) ||
                (subItem.quantity && subItem.quantity.toString().includes(query)),
            )
          }

          return false
        })

        setFilteredWarehousing(filtered)
        setLocalError(filtered.length === 0 ? 'No items found' : null)
      } catch (error) {
        setLocalError('An error occurred while searching')
      }
    }, 300) // 300ms delay

    // Cleanup function to clear timeout
    return () => clearTimeout(timeoutId)
  }, [searchQuery, warehousing])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

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
            id="searchItem"
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
        {currentItems.map((warehousing) => (
          <CAccordionItem key={warehousing._id}>
            <CAccordionHeader>
              <ul className="list-unstyled p-0 m-0 w-100">
                <li>
                  Location:{' '}
                  {warehousing.warehouse ? (
                    <div className="d-inline-flex align-items-center">
                      {warehousing.warehouse.warehouseName}
                      {warehousing.warehouse.deleted ? (
                        <CBadge color="danger" className="ms-2">
                          Deleted
                        </CBadge>
                      ) : null}
                    </div>
                  ) : (
                    `${warehousing.warehouseLocDetails.warehouseName} [DELETED to database]`
                  )}
                </li>
                <li>
                  Purcahse Order: <strong>{warehousing.PoNumber}</strong>
                </li>
              </ul>
            </CAccordionHeader>
            <CAccordionBody>
              <CHeader>From: {warehousing.from}</CHeader>
              {warehousing.items.map((item, index) => (
                <div key={index}>
                  <CHeader>{`Item name: ${item.itemName} Quantity: (${item.quantity})`}</CHeader>
                </div>
              ))}

              <CHeader>
                Date receive: {new Date(warehousing.dateArrival).toLocaleDateString()}
              </CHeader>
              <CHeader>Received By: {warehousing.byReceived}</CHeader>
              <CHeader>
                Warehouse: {warehousing.warehouse ? warehousing.warehouse.warehouseName : 'Unknown'}
              </CHeader>
              <CContainer className="d-flex justify-content-end mt-3">
                <UpdateItem warehousing={warehousing} onUpdateItem={onUpdateItem} />
                {adminRoles.includes(role) && (
                  <DeleteItem warehousing={warehousing} onDeleteItem={onDeleteItem} />
                )}
              </CContainer>
            </CAccordionBody>
          </CAccordionItem>
        ))}
      </CAccordion>

      {filteredWarehousing.length > 0 && (
        <CContainer className="d-flex justify-content-between align-items-center">
          <CContainer>
            Showing {indexOfFirstItem + 1} to{' '}
            {Math.min(indexOfLastItem, filteredWarehousing.length)} of {filteredWarehousing.length}{' '}
            entries
          </CContainer>

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
  )
}

export default TableWareHousing
