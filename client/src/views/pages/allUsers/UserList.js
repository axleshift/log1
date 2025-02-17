import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CAlert,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CButton,
  CCardBody,
  CCard,
  CCardHeader,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const UserList = () => {
  const token = sessionStorage.getItem('accessToken')
  const API = import.meta.env.VITE_APP_API_URL
  const api = axios.create({
    baseURL: API,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const [users, setUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const [localError, setLocalError] = useState('')

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/v1/user/all-user')
      setUsers(response.data.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredUsers(users)
    } else {
      const filtered = users.filter((user) => {
        const matchesUsername = user.username.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesEmail = user.email.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesRole = user.role.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesUsername || matchesEmail || matchesRole
      })
      setFilteredUsers(filtered)
      setCurrentPage(1)
      if (filtered.length > 0) {
        setLocalError(null)
      } else {
        setLocalError('No matching users found')
      }
    }
  }, [searchQuery, users])
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
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
      <CCard className="m-3 text-center" size="sm">
        <CCardHeader>
          <h4>User List</h4>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentItems.map((item) => (
                <CTableRow key={item._id}>
                  <CTableDataCell>{item.username}</CTableDataCell>
                  <CTableDataCell>{item.email}</CTableDataCell>
                  <CTableDataCell>{item.role}</CTableDataCell>
                  <CTableDataCell>{item.createdAt.slice(0, 10)}</CTableDataCell>
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

export default UserList
