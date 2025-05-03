import React, { useEffect, useState } from 'react'
import AddDriver from './ComponentsDriver/AddDrivers'
import TableDriver from './ComponentsDriver/TableDriver'
import DriversReport from './ComponentsDriver/DriversReport'
import {
  CCard,
  CCardBody,
  CContainer,
  CHeader,
  CTabs,
  CTabList,
  CTab,
  CTabPanel,
  CTabContent,
  CSpinner,
  CAlert,
} from '@coreui/react'
import api from '../../../utils/api'
import { useToast } from '../../../components/Toast/Toast'
import { getRole } from '../../../utils/auth'

const DriversManagement = () => {
  const role = getRole()
  const adminRoles = ['super admin', 'admin', 'manager', 'fleet manager']
  const { showError } = useToast()
  const [driver, setDrivers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchDrivers = async () => {
    setLoading(true)
    try {
      const response = await api.get('api/v1/driver')
      if (response.status === 200) {
        setDrivers(response.data.data)
        setLoading(false)
      } else {
        setError(response.data.message)
        showError(response.data.message)
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message)
      showError(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDrivers()
  }, [])

  const handleAddDriver = (newDriver) => {
    setDrivers((preDrivers) => [...preDrivers, newDriver])
    fetchDrivers()
  }

  if (loading) {
    return (
      <div className="text-center">
        <CSpinner color="primary" size="sm" />
      </div>
    )
  }

  return (
    <>
      {role && adminRoles.includes(role) ? (
        <>
          <CHeader className="text-center">Driver Management</CHeader>
          <CContainer className="m-3">
            <AddDriver onAddDriver={handleAddDriver} />
          </CContainer>
          <CTabs activeItemKey="Driver List">
            <CTabList variant="tabs">
              <CTab itemKey="Driver List">Driver List</CTab>
              <CTab itemKey="Driver Report">Driver Report</CTab>
            </CTabList>
            <CTabContent>
              <CTabPanel itemKey="Driver List">
                <CCard>
                  <CHeader>Drivers List</CHeader>
                  <CCardBody className="md-3">
                    <TableDriver driver={driver} loading={loading} error={error} />
                  </CCardBody>
                </CCard>
              </CTabPanel>
              <CTabPanel itemKey="Driver Report">
                <CCard>
                  <CHeader>Driver Report</CHeader>
                  <CCardBody className="md-3">
                    <DriversReport driver={driver} />
                  </CCardBody>
                </CCard>
              </CTabPanel>
            </CTabContent>
          </CTabs>
        </>
      ) : (
        <CAlert color="danger" className="text-center w-100 mx-auto mt-5 justify-content-center">
          You are not authorized to access this page.
        </CAlert>
      )}
    </>
  )
}

export default DriversManagement
