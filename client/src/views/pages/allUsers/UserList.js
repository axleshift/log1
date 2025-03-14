import React, { useState, useEffect } from 'react'
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CInputGroup,
  CFormInput,
  CInputGroupText,
  CContainer,
  CCard,
  CCardHeader,
  CCardBody,
  CAlert,
  CBadge,
  CButtonGroup,
  CSpinner,
  CPagination,
  CPaginationItem,
  CHeader,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHouse, faEdit } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import UpdatedUser from './Active/UpdatedUser'
import api from '../../../utils/api'
const UserList = ({ onUpdateUser }) => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredUsers, setFilteredUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [localError, setLocalError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all') // Add this state
  const itemsPerPage = 10

  // Filter by status function
  const filterByStatus = (users) => {
    switch (statusFilter) {
      case 'active':
        return users.filter((user) => user.isActive)
      case 'inactive':
        return users.filter((user) => !user.isActive)
      default:
        return users
    }
  }

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await api.get('api/v1/user/all-user')
      const userData = response.data.data
      setUsers(userData)
      setFilteredUsers(userData)
    } catch (error) {
      console.error('Error fetching users:', error)
      setLocalError('Error fetching users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Search and filter effect
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredUsers(users)
    } else {
      const filtered = users.filter((user) => {
        const searchTerm = searchQuery.toLowerCase()

        const activeStatus = user.isActive ? 'active' : 'inactive'
        const activateButton = user.isActive ? 'deactivate' : 'activate'

        return (
          user.username.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.role.toLowerCase().includes(searchTerm) ||
          activeStatus.includes(searchTerm) ||
          activateButton.includes(searchTerm) ||
          user.createdAt.toLowerCase().includes(searchTerm)
        )
      })

      setFilteredUsers(filtered)
      setCurrentPage(1)

      if (filtered.length === 0) {
        setLocalError('No matching users found')
      } else {
        setLocalError(null)
      }
    }
  }, [searchQuery, users])

  // Toggle user status
  const toggleUserStatus = async (userId) => {
    setLoading(true)
    try {
      const response = await api.post(`api/v1/user/in-active-user/${userId}`)

      if (response.data.success) {
        const updatedUsers = users.map((user) => {
          if (user._id === userId) {
            return { ...user, isActive: !user.isActive }
          }
          return user
        })

        setUsers(updatedUsers)
        setFilteredUsers(updatedUsers)
        setSuccess(response.data.message)
      } else {
        setLocalError(response.data.message)
      }

      setTimeout(() => {
        setSuccess(null)
        setLocalError(null)
      }, 3000)
    } catch (err) {
      setLocalError(err.response?.data?.message || 'Failed to update user status')
      setTimeout(() => setLocalError(null), 3000)
    } finally {
      setLoading(false)
    }
  }

  const handleEditClick = (user) => {
    setSelectedUser(user)
    setEditModalVisible(true)
  }

  // Add function to handle user update
  const handleUserUpdate = (updatedUser) => {
    setUsers(users.map((user) => (user._id === updatedUser._id ? updatedUser : user)))
    setFilteredUsers(
      filteredUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user)),
    )
  }

  if (loading) {
    return <CSpinner className="m-5 d-flex justify-content-center" />
  }

  // Calculate pagination
  const filteredAndStatusUsers = filterByStatus(filteredUsers)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredAndStatusUsers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredAndStatusUsers.length / itemsPerPage)

  return (
    <>
      <CContainer className=" justify-content-center align-items-center">
        <CContainer className="m-3 d-flex justify-content-center align-items-center">
          <h1>Accounts</h1>
        </CContainer>
        <CContainer className="m-3 d-flex justify-content-between">
          <CButton
            color="primary"
            className="m-3 "
            disabled={loading}
            onClick={() => navigate('/dashboard')}
          >
            {loading ? 'Loading...' : <FontAwesomeIcon icon={faHouse} />}
          </CButton>

          <CButton color="primary" className="m-3" onClick={() => navigate('/register')}>
            Add User
          </CButton>
        </CContainer>
        <CContainer className="m-3">
          {localError && (
            <CAlert color="danger" className="mb-3">
              {localError}
            </CAlert>
          )}
          {success && (
            <CAlert color="success" className="mb-3">
              {success}
            </CAlert>
          )}

          <div className="d-flex justify-content-between align-items-center mb-3">
            <CInputGroup className="w-50">
              <CFormInput
                type="text"
                value={searchQuery}
                id="search"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
              />
              <CInputGroupText>
                <FontAwesomeIcon icon={faSearch} />
              </CInputGroupText>
            </CInputGroup>

            <CButtonGroup>
              <CButton
                color={statusFilter === 'all' ? 'primary' : 'secondary'}
                onClick={() => setStatusFilter('all')}
              >
                All
              </CButton>
              <CButton
                color={statusFilter === 'active' ? 'primary' : 'secondary'}
                onClick={() => setStatusFilter('active')}
              >
                Active
              </CButton>
              <CButton
                color={statusFilter === 'inactive' ? 'primary' : 'secondary'}
                onClick={() => setStatusFilter('inactive')}
              >
                Inactive
              </CButton>
            </CButtonGroup>
          </div>

          <div className="text-muted small mb-3">
            Search by: username, email, role, status (active/inactive), or action
            (activate/deactivate)
          </div>

          <CCard>
            <CCardHeader>
              <h4>User List</h4>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive className="text-center">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Username</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Role</CTableHeaderCell>
                    <CTableHeaderCell>Created Date</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentItems.map((item) => (
                    <CTableRow key={item._id}>
                      <CTableDataCell>{item.username}</CTableDataCell>
                      <CTableDataCell>{item.email}</CTableDataCell>
                      <CTableDataCell>{item.role}</CTableDataCell>
                      <CTableDataCell>{item.createdAt.slice(0, 10)}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={item.isActive ? 'success' : 'danger'}>
                          {item.isActive ? 'Active' : 'Inactive'}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CContainer className=" d-flex justify-content-center align-items-center">
                          <CButton
                            variant="outline"
                            className="me-2"
                            color={item.isActive ? 'danger' : 'success'}
                            onClick={() => toggleUserStatus(item._id)}
                          >
                            {item.isActive ? 'Deactivate' : 'Activate'}
                          </CButton>
                          <CButton
                            variant="outline"
                            className="me-2"
                            color="primary"
                            onClick={() => handleEditClick(item)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </CButton>
                        </CContainer>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              {selectedUser && (
                <UpdatedUser
                  user={selectedUser}
                  visible={editModalVisible}
                  onClose={() => {
                    setEditModalVisible(false)
                    setSelectedUser(null)
                  }}
                  onUpdate={handleUserUpdate}
                />
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
        </CContainer>
      </CContainer>
    </>
  )
}

export default UserList
