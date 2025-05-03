/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CBadge,
  CButton,
  CButtonGroup,
  CImage,
} from '@coreui/react'
import * as XLSX from 'xlsx'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'
import Frieght from '../../../../assets/images/Freight.png'
import './style.css'
import api from '../../../../utils/api'

const DriversReport = () => {
  const [drivers, setDrivers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const exportToCSV = () => {
      try {
        setLoading(true)
        const exportData = prepareExportData()
  
        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(exportData)
  
        // Create workbook
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Vehicle Report')
  
        // Generate CSV file
        XLSX.writeFile(wb, `vehicle-report-${new Date().toISOString().split('T')[0]}.csv`)
      } catch (error) {
        console.error('Error exporting to CSV:', error)
        showError('Error exporting to CSV')
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true)
        const response = await api.get('/api/v1/driver/')
        if (response.data.data) {
          setDrivers(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching driver data:', error)
        setError(error?.response?.data?.message || 'Error fetching driver data')
      } finally {
        setLoading(false)
      }
    }

    fetchDrivers()
  }, [])

  const prepareExportData = () => {
    return drivers.map((driver) => ({
      'ID Number': driver.idNum,
      Name: driver.driverName,
      Email: driver.email,
      Phone: driver.phone || driver.contact,
      Address: driver.address,
      'License Number': driver.licenseNumber,
      'License Restriction': driver.licenseRestriction || 'N/A',
      Vehicle: driver.assignedVehicle
        ? `${driver.assignedVehicle.regisNumber} - ${driver.assignedVehicle.brand} ${driver.assignedVehicle.model}`
        : 'No vehicle assigned',
      Status: driver.status,
    }))
  }

  const exportToExcel = () => {
    try {
      const exportData = prepareExportData()
      const ws = XLSX.utils.json_to_sheet(exportData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Driver Report')
      XLSX.writeFile(wb, `driver-report-${new Date().toISOString().split('T')[0]}.xlsx`)
    } catch (error) {
      console.error('Error exporting to Excel:', error)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'on_duty':
        return <CBadge color="success">On Duty</CBadge>
      case 'available':
        return <CBadge color="info">Available</CBadge>
      case 'off_duty':
        return <CBadge color="warning">Off Duty</CBadge>
      default:
        return <CBadge color="secondary">Unknown</CBadge>
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <CRow className="mb-3">
        <CCol xs={12} className="d-flex justify-content-end">
          <CButtonGroup>
            <CButton color="primary" onClick={exportToExcel} disabled={loading}>
            <CIcon icon={cilCloudDownload} className="me-2" />
              Export to Excel
            </CButton>
            <CButton color="success" onClick={exportToCSV} disabled={loading}>
              <CIcon icon={cilCloudDownload} className="me-2" />
              Export to CSV
            </CButton>
          </CButtonGroup>
        </CCol>
      </CRow>

     
       <div className="pdf-container">
              <div className="report-header">
                <div className="company-logo">
                  <CImage
                    src={Frieght}
                    height={100}
                    fluid
                    alt="Freight Logo"
                    className="logo-image bg-primary"
                  />
                </div>
                <div className="report-title">
                  <h1>Driver Status Report</h1>
                  <div className="report-metadata">
                    <p>
                      Generated on:{' '}
                      {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p>Total Drivers: {drivers.length}</p>
                  </div>
                </div> 
                </div>
                           
    
      <div className="summary-section">
          <div className="summary-box">
            <h3>Driver Overview</h3>
            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-label">Available:</span>
                <span className="stat-value">
                {drivers.filter((d) => d.status === 'available').length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">On Duty Drivers:</span>
                <span className="stat-value">
               {drivers.filter((d) => d.status === 'on_duty').length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Off Duty Drivers:</span>
                <span className="stat-value">
                {drivers.filter((d) => d.status === 'off_duty').length}
                </span>
              </div>
            </div>
          </div>
        
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Driver Report Summary</strong>
              <div className="small text-medium-emphasis">
                  Generated on: {new Date().toLocaleDateString()}
                </div>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive className="border">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Driver ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                    <CTableHeaderCell scope="col">License Number</CTableHeaderCell>
                    <CTableHeaderCell scope="col">License Restriction</CTableHeaderCell >
                    <CTableHeaderCell scope="col">Vehicle</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>  {drivers.map((driver) => (
                    <CTableRow key={driver.idNum}>
                      <CTableDataCell>{driver.idNum}</CTableDataCell>
                      <CTableDataCell>{driver.driverName}</CTableDataCell>
                      <CTableDataCell>{driver.email}</CTableDataCell>
                      <CTableDataCell>{driver.phone || driver.contact}</CTableDataCell>
                      <CTableDataCell>{driver.address}</CTableDataCell>
                      <CTableDataCell>{driver.licenseNumber}</CTableDataCell>
                      <CTableDataCell>{driver.licenseRestriction || 'N/A'}</CTableDataCell>
                      <CTableDataCell>
                        {driver.assignedVehicle
                          ? `${driver.assignedVehicle.regisNumber} - ${driver.assignedVehicle.brand} ${driver.assignedVehicle.model}`
                          : 'No vehicle assigned'}
                      </CTableDataCell>
                      <CTableDataCell>{getStatusBadge(driver.status)}</CTableDataCell>
                    </CTableRow>
                  ))}</CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      </div>
      </div>
    </>
  )
}

export default DriversReport