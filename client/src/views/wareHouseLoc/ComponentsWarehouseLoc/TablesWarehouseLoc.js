import React, { useEffect, useState } from 'react'
import {
  CAlert,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CPagination,
  CPaginationItem,
  CCard,
  CCardBody,
  CHeader,
  CTooltip,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './TablesWarehouseLoc.css'
import DeleteWarehouseLoc from './DeleteWarehouseLoc'
import UpdateWarehouseLoc from './UpdateWarehouseLoc'
import { getRole } from '../../../utils/auth'
const TablesWarehouseLoc = ({
  warehouseLoc,
  loading,
  error,
  onDeleteWarehouseLoc,
  onUpdateWarehouseLoc,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredWarehouseLoc, setFilteredWarehouseLoc] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [localError, setLocalError] = useState(null)
  const itemsPerPage = 10
  const user = getRole()
  const adminRoles = ['manager', 'admin']
  const adminOnly = 'admin'

  useEffect(() => {
    setFilteredWarehouseLoc(warehouseLoc)
  }, [warehouseLoc])

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredWarehouseLoc(warehouseLoc)
    } else {
      const filtered = warehouseLoc.filter((item) => {
        const matchesWarehouseName = item.warehouseName
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
        const matchesAddress = item.address.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCreatedBy =
          adminRoles.includes(user) &&
          item.createdBy.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesWarehouseName || matchesAddress || matchesCreatedBy
      })
      setFilteredWarehouseLoc(filtered)
      setCurrentPage(1) // Reset to the first page when search query changes
      if (filtered.length === 0) {
        setLocalError('No results found')
      } else {
        setLocalError(null)
      }
    }
  }, [searchQuery, warehouseLoc])

  if (warehouseLoc.length === 0) {
    return (
      <CAlert color="danger" className="text-center mt-5 w-75 mx-auto justify-content-center">
        No Warehouse Location Found
      </CAlert>
    )
  }
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredWarehouseLoc.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredWarehouseLoc.length / itemsPerPage)

  return (
    <>
      <CContainer className="m-3">
        <CInputGroup className="w-50 mb-3">
          <CFormInput
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Warehouse Location..."
          />
          <CInputGroupText>
            <FontAwesomeIcon icon={faSearch} />
          </CInputGroupText>
        </CInputGroup>
      </CContainer>

      <CCard>
        <CHeader>Warehouse Location List</CHeader>
        <CCardBody className="md-3">
          <CTable bordered hover responsive className="mx-auto ">
            <CTableHead className="text-center  ">
              <CTableRow>
                <CTableHeaderCell className="fixed-width bg-secondary">
                  Warehouse Name
                </CTableHeaderCell>
                <CTableHeaderCell className="fixed-width bg-secondary">Address</CTableHeaderCell>
                {adminOnly.includes(user) && (
                  <CTableHeaderCell className="fixed-width bg-secondary">
                    Created By
                  </CTableHeaderCell>
                )}
                <CTableHeaderCell className="fixed-width bg-secondary">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody className="text-center">
              {currentItems.map((warehouseLoc) => (
                <CTableRow key={warehouseLoc._id}>
                  <CTableDataCell className="fixed-width">
                    <CTooltip content={warehouseLoc.warehouseName}>
                      <span>{warehouseLoc.warehouseName}</span>
                    </CTooltip>
                  </CTableDataCell>
                  <CTableDataCell className="fixed-width">
                    <CTooltip content={warehouseLoc.address}>
                      <span>{warehouseLoc.address}</span>
                    </CTooltip>
                  </CTableDataCell>
                  {adminOnly.includes(user) && (
                    <CTableDataCell className="fixed-width" color="danger">
                      <CTooltip content={warehouseLoc.createdBy}>
                        <span>{warehouseLoc.createdBy}</span>
                      </CTooltip>
                    </CTableDataCell>
                  )}
                  <CTableDataCell className="fixed-width">
                    <UpdateWarehouseLoc
                      warehouseLoc={warehouseLoc}
                      onUpdateWarehouseLoc={onUpdateWarehouseLoc}
                    />
                    {adminRoles.includes(user) && (
                      <DeleteWarehouseLoc
                        warehouseLoc={warehouseLoc}
                        onDeleteWarehouseLoc={onDeleteWarehouseLoc}
                      />
                    )}
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
        </CCardBody>
      </CCard>
    </>
  )
}

export default TablesWarehouseLoc
