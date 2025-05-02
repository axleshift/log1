// import React, { useState, useEffect, useRef } from 'react'
// import { usePDF } from 'react-to-pdf'
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CRow,
//   CTable,
//   CTableBody,
//   CTableHead,
//   CTableHeaderCell,
//   CTableRow,
//   CTableDataCell,
//   CBadge,
//   CButton,
//   CImage,
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { cilCloudDownload } from '@coreui/icons'
// import api from '../../../../utils/api'
// import Frieght from '../../../../assets/brand/Freight.png'
// import './style.css'
// import { useToast } from '../../../../components/Toast/Toast'

// const VehicleReport = () => {
//   const { showError } = useToast()
//   const [vehicles, setVehicles] = useState([])
//   const [scheduled, setScheduled] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   const reportRef = useRef()
//   const { toPDF, targetRef } = usePDF({
//     filename: `vehicle-report-${new Date().toISOString().split('T')[0]}.pdf`,
//     page: {
//       margin: 20,
//       size: 'A4',
//       format: 'letter',
//       scale: 0.8,
//       dpi: 300,
//     },
//     canvas: {
//       mimeType: 'image/png',
//       qualityRatio: 1,
//     },
//   })

//   useEffect(() => {
//     const fetchVehicles = async () => {
//       try {
//         setLoading(true)
//         const response = await api.get('/api/v1/vehicle/')
//         if (response.data.data) {
//           setVehicles(response.data.data)
//         }
//       } catch (error) {
//         console.error('Error fetching vehicle data:', error)
//         setError(error?.response?.data?.message || 'Error fetching vehicle data')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchVehicles()
//   }, [])

//   const fetchShipment = async () => {
//     setLoading(true)
//     try {
//       const response = await api.get(`${import.meta.env.VITE_APP_API_URL_LOG2}api/v1/shipment`)
//       console.log('response', response.data)
//       if (response.status === 200) {
//         const shipmentData = response.data.shipments || []
//         setScheduled(shipmentData)
//         setError(null)
//       }
//     } catch (error) {
//       setError(error?.response?.data?.message || 'Error fetching data')
//       showError(error?.response?.data?.message || 'Error fetching data')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchShipment()
//   }, [])

//   const getScheduledVehicles = () => {
//     if (!vehicles.length || !scheduled.length) return []

//     return vehicles.map((vehicle) => {
//       const matchingShipment = scheduled.find(
//         (shipment) => shipment.vehicle?.plate_no === vehicle.regisNumber,
//       )

//       // Only include shipment details if dispatch is not Completed
//       if (matchingShipment && matchingShipment.dispatch !== 'Completed') {
//         let deliveryAddress = null
//         let recipientInfo = null

//         if (matchingShipment.isInWarehouse) {
//           // If shipment is in warehouse, use consignee details
//           deliveryAddress = matchingShipment.consignee?.consignee_company_address
//           recipientInfo = {
//             companyName: matchingShipment.consignee?.consignee_company_name,
//             contactName: matchingShipment.consignee?.consignee_contact_name,
//             contactPhone: matchingShipment.consignee?.consignee_contact_phone_number,
//             contactEmail: matchingShipment.consignee?.consignee_contact_email_address,
//           }
//         } else {
//           // If not in warehouse, use shipper details
//           deliveryAddress = matchingShipment.shipper?.shipper_company_address
//           recipientInfo = {
//             companyName: matchingShipment.shipper?.shipper_company_name,
//             contactName: matchingShipment.shipper?.shipper_contact_name,
//             contactPhone: matchingShipment.shipper?.shipper_contact_phone_number,
//             contactEmail: matchingShipment.shipper?.shipper_contact_email_address,
//           }
//         }

//         return {
//           ...vehicle,
//           shipmentDetails: {
//             tracking_id: matchingShipment.tracking_id,
//             dispatch_status: matchingShipment.dispatch,
//             shipping_type: matchingShipment.shipping?.shipping_type,
//             shipment_description: matchingShipment.shipment?.shipment_description,
//             receive_date: matchingShipment.receiveDate,
//           },
//           deliveryAddress,
//           recipientInfo,
//         }
//       }

//       // Return vehicle without shipment details if no matching shipment or dispatch is Completed
//       return {
//         ...vehicle,
//         shipmentDetails: null,
//         deliveryAddress: null,
//         recipientInfo: null,
//       }
//     })
//   }

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'maintenance':
//         return <CBadge color="warning">Maintenance</CBadge>
//       case 'forRegistration':
//         return <CBadge color="secondary">For Registration</CBadge>
//       case 'available':
//         return <CBadge color="success">Available</CBadge>
//       case 'in_use':
//         return <CBadge color="danger">In Use</CBadge>
//       default:
//         return <CBadge color="primary">Unknown</CBadge>
//     }
//   }

//   const getDispatchStatusColor = (status) => {
//     switch (status) {
//       case 'Completed':
//         return 'success'
//       case 'Dispatching':
//         return 'info'
//       case 'Pending':
//         return 'warning'
//       default:
//         return 'secondary'
//     }
//   }

//   const handleDownloadPDF = () => {
//     toPDF(targetRef.current)
//   }

//   if (loading) {
//     return <div>Loading...</div>
//   }

//   if (error) {
//     return <div>Error: {error}</div>
//   }

//   const scheduledVehicles = getScheduledVehicles()

//   return (
//     <>
//       <CRow className="mb-3">
//         <CCol xs={12} className="d-flex justify-content-end">
//           <CButton color="primary" onClick={handleDownloadPDF} disabled={loading}>
//             <CIcon icon={cilCloudDownload} className="me-2" />
//             Export PDF
//           </CButton>
//         </CCol>
//       </CRow>
//       <div ref={targetRef} className="pdf-container">
//         <div className="report-header">
//           <div className="company-logo">
//             <CImage
//               src={Frieght}
//               height={100}
//               fluid
//               alt="Freight Logo"
//               className="logo-image bg-primary"
//             />
//           </div>
//           <div className="report-title">
//             <h1>Vehicle Status Report</h1>
//             <div className="report-metadata">
//               <p>
//                 Generated on:{' '}
//                 {new Date().toLocaleDateString('en-US', {
//                   weekday: 'long',
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric',
//                 })}
//               </p>
//               <p>Total Vehicles: {vehicles.length}</p>
//             </div>
//           </div>
//         </div>

//         <div className="summary-section">
//           <div className="summary-box">
//             <h3>Fleet Overview</h3>
//             <div className="summary-stats">
//               <div className="stat-item">
//                 <span className="stat-label">Available:</span>
//                 <span className="stat-value">
//                   {vehicles.filter((v) => v.status === 'available').length}
//                 </span>
//               </div>
//               <div className="stat-item">
//                 <span className="stat-label">In Maintenance:</span>
//                 <span className="stat-value">
//                   {vehicles.filter((v) => v.status === 'maintenance').length}
//                 </span>
//               </div>
//               <div className="stat-item">
//                 <span className="stat-label">In Use:</span>
//                 <span className="stat-value">
//                   {vehicles.filter((v) => v.status === 'in_use').length}
//                 </span>
//               </div>
//               <div className="stat-item">
//                 <span className="stat-label">For Registration:</span>
//                 <span className="stat-value">
//                   {vehicles.filter((v) => v.status === 'forRegistration').length}
//                 </span>
//               </div>
//               <div className="stat-item">
//                 <span className="stat-label">Scheduled:</span>
//                 <span className="stat-value">
//                   {scheduledVehicles.filter((v) => v.shipmentDetails).length}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <CRow>
//           <CCol xs={12}>
//             <CCard className="mb-4">
//               <CCardHeader>
//                 <strong>Vehicle Status Report</strong>
//                 <div className="small text-medium-emphasis">
//                   Generated on: {new Date().toLocaleDateString()}
//                 </div>
//               </CCardHeader>
//               <CCardBody>
//                 <CTable hover responsive className="border">
//                   <CTableHead>
//                     <CTableRow>
//                       <CTableHeaderCell scope="col">Vehicle ID</CTableHeaderCell>
//                       <CTableHeaderCell scope="col">License Plate</CTableHeaderCell>
//                       <CTableHeaderCell scope="col">Status</CTableHeaderCell>
//                       <CTableHeaderCell scope="col">Tracking ID</CTableHeaderCell>
//                       <CTableHeaderCell scope="col">Recipient Company</CTableHeaderCell>
//                       <CTableHeaderCell scope="col">Contact Person</CTableHeaderCell>
//                       <CTableHeaderCell scope="col">Delivery Address</CTableHeaderCell>
//                       <CTableHeaderCell scope="col">Dispatch Status</CTableHeaderCell>
//                     </CTableRow>
//                   </CTableHead>
//                   <CTableBody>
//                     {scheduledVehicles.map((vehicle) => (
//                       <CTableRow key={vehicle._id}>
//                         <CTableDataCell>{vehicle.idNum}</CTableDataCell>
//                         <CTableDataCell>{vehicle.regisNumber}</CTableDataCell>
//                         <CTableDataCell>{getStatusBadge(vehicle.status)}</CTableDataCell>
//                         <CTableDataCell>
//                           {vehicle.shipmentDetails?.tracking_id || (
//                             <CBadge color="warning">No Shipment</CBadge>
//                           )}
//                         </CTableDataCell>
//                         <CTableDataCell>
//                           {vehicle.recipientInfo?.companyName || 'N/A'}
//                         </CTableDataCell>
//                         <CTableDataCell>
//                           {vehicle.recipientInfo ? (
//                             <div>
//                               <div>{vehicle.recipientInfo.contactName}</div>
//                               <small className="text-muted">
//                                 {vehicle.recipientInfo.contactPhone}
//                               </small>
//                             </div>
//                           ) : (
//                             'N/A'
//                           )}
//                         </CTableDataCell>
//                         <CTableDataCell>
//                           {vehicle.deliveryAddress || 'No address assigned'}
//                         </CTableDataCell>
//                         <CTableDataCell>
//                           <CBadge
//                             color={getDispatchStatusColor(vehicle.shipmentDetails?.dispatch_status)}
//                           >
//                             {vehicle.shipmentDetails?.dispatch_status || 'No Status'}
//                           </CBadge>
//                         </CTableDataCell>
//                       </CTableRow>
//                     ))}
//                   </CTableBody>
//                 </CTable>
//               </CCardBody>
//             </CCard>
//           </CCol>
//         </CRow>
//       </div>
//     </>
//   )
// }

import React, { useState, useEffect, useRef } from 'react'
import * as XLSX from 'xlsx'
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
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'
import api from '../../../../utils/api'
import Frieght from '../../../../assets/brand/Freight.png'
import './style.css'
import { useToast } from '../../../../components/Toast/Toast'

const VehicleReport = () => {
  const { showError } = useToast()
  const [vehicles, setVehicles] = useState([])
  const [scheduled, setScheduled] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true)
        const response = await api.get('/api/v1/vehicle/')
        if (response.data.data) {
          setVehicles(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching vehicle data:', error)
        setError(error?.response?.data?.message || 'Error fetching vehicle data')
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  const fetchShipment = async () => {
    setLoading(true)
    try {
      const response = await api.get(`${import.meta.env.VITE_APP_API_URL_LOG2}api/v1/shipment`)
      if (response.status === 200) {
        const shipmentData = response.data.shipments || []
        setScheduled(shipmentData)
        setError(null)
      }
    } catch (error) {
      setError(error?.response?.data?.message || 'Error fetching data')
      showError(error?.response?.data?.message || 'Error fetching data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchShipment()
  }, [])

  const getScheduledVehicles = () => {
    if (!vehicles.length || !scheduled.length) return []

    return vehicles.map((vehicle) => {
      const matchingShipment = scheduled.find(
        (shipment) => shipment.vehicle?.plate_no === vehicle.regisNumber,
      )

      if (matchingShipment && matchingShipment.dispatch !== 'Completed') {
        let deliveryAddress = null
        let recipientInfo = null

        if (matchingShipment.isInWarehouse) {
          deliveryAddress = matchingShipment.consignee?.consignee_company_address
          recipientInfo = {
            companyName: matchingShipment.consignee?.consignee_company_name,
            contactName: matchingShipment.consignee?.consignee_contact_name,
            contactPhone: matchingShipment.consignee?.consignee_contact_phone_number,
            contactEmail: matchingShipment.consignee?.consignee_contact_email_address,
          }
        } else {
          deliveryAddress = matchingShipment.shipper?.shipper_company_address
          recipientInfo = {
            companyName: matchingShipment.shipper?.shipper_company_name,
            contactName: matchingShipment.shipper?.shipper_contact_name,
            contactPhone: matchingShipment.shipper?.shipper_contact_phone_number,
            contactEmail: matchingShipment.shipper?.shipper_contact_email_address,
          }
        }

        return {
          ...vehicle,
          shipmentDetails: {
            tracking_id: matchingShipment.tracking_id,
            dispatch_status: matchingShipment.dispatch,
            shipping_type: matchingShipment.shipping?.shipping_type,
            shipment_description: matchingShipment.shipment?.shipment_description,
            receive_date: matchingShipment.receiveDate,
          },
          deliveryAddress,
          recipientInfo,
        }
      }

      return {
        ...vehicle,
        shipmentDetails: null,
        deliveryAddress: null,
        recipientInfo: null,
      }
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'maintenance':
        return <CBadge color="warning">Maintenance</CBadge>
      case 'forRegistration':
        return <CBadge color="secondary">For Registration</CBadge>
      case 'available':
        return <CBadge color="success">Available</CBadge>
      case 'in_use':
        return <CBadge color="danger">In Use</CBadge>
      default:
        return <CBadge color="primary">Unknown</CBadge>
    }
  }

  const getDispatchStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success'
      case 'Dispatching':
        return 'info'
      case 'Pending':
        return 'warning'
      default:
        return 'secondary'
    }
  }

  const prepareExportData = () => {
    const scheduledVehicles = getScheduledVehicles()

    return scheduledVehicles.map((vehicle) => ({
      'Vehicle ID': vehicle.idNum,
      'License Plate': vehicle.regisNumber,
      Status: vehicle.status,
      'Tracking ID': vehicle.shipmentDetails?.tracking_id || 'No Shipment',
      'Recipient Company': vehicle.recipientInfo?.companyName || 'N/A',
      'Contact Name': vehicle.recipientInfo?.contactName || 'N/A',
      'Contact Phone': vehicle.recipientInfo?.contactPhone || 'N/A',
      'Contact Email': vehicle.recipientInfo?.contactEmail || 'N/A',
      'Delivery Address': vehicle.deliveryAddress || 'No address assigned',
      'Dispatch Status': vehicle.shipmentDetails?.dispatch_status || 'No Status',
      'Shipping Type': vehicle.shipmentDetails?.shipping_type || 'N/A',
      'Shipment Description': vehicle.shipmentDetails?.shipment_description || 'N/A',
      'Receive Date': vehicle.shipmentDetails?.receive_date || 'N/A',
    }))
  }

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

  const exportToExcel = () => {
    try {
      setLoading(true)
      const exportData = prepareExportData()

      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(exportData)

      // Set column widths
      const columnWidths = [
        { wch: 10 }, // Vehicle ID
        { wch: 15 }, // License Plate
        { wch: 12 }, // Status
        { wch: 15 }, // Tracking ID
        { wch: 30 }, // Recipient Company
        { wch: 20 }, // Contact Name
        { wch: 15 }, // Contact Phone
        { wch: 25 }, // Contact Email
        { wch: 40 }, // Delivery Address
        { wch: 15 }, // Dispatch Status
        { wch: 15 }, // Shipping Type
        { wch: 30 }, // Shipment Description
        { wch: 20 }, // Receive Date
      ]
      ws['!cols'] = columnWidths

      // Add some styling
      const headerStyle = {
        font: { bold: true },
        fill: { fgColor: { rgb: 'EEEEEE' } },
        alignment: { horizontal: 'center' },
      }

      // Apply styles to header row
      const range = XLSX.utils.decode_range(ws['!ref'])
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const address = XLSX.utils.encode_cell({ r: 0, c: C })
        if (!ws[address]) continue
        ws[address].s = headerStyle
      }

      // Create workbook
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Vehicle Report')

      // Generate Excel file
      XLSX.writeFile(wb, `vehicle-report-${new Date().toISOString().split('T')[0]}.xlsx`)
    } catch (error) {
      console.error('Error exporting to Excel:', error)
      showError('Error exporting to Excel')
    } finally {
      setLoading(false)
    }
  }

  const exportToDetailedExcel = () => {
    try {
      setLoading(true)
      const exportData = prepareExportData()

      // Create workbook
      const wb = XLSX.utils.book_new()

      // Create main data worksheet
      const ws_data = XLSX.utils.json_to_sheet(exportData)

      // Create summary worksheet
      const summaryData = [
        ['Fleet Overview'],
        ['Total Vehicles', vehicles.length],
        ['Available', vehicles.filter((v) => v.status === 'available').length],
        ['In Maintenance', vehicles.filter((v) => v.status === 'maintenance').length],
        ['In Use', vehicles.filter((v) => v.status === 'in_use').length],
        ['For Registration', vehicles.filter((v) => v.status === 'forRegistration').length],
        ['Scheduled', getScheduledVehicles().filter((v) => v.shipmentDetails).length],
      ]
      const ws_summary = XLSX.utils.aoa_to_sheet(summaryData)

      // Add worksheets to workbook
      XLSX.utils.book_append_sheet(wb, ws_summary, 'Summary')
      XLSX.utils.book_append_sheet(wb, ws_data, 'Vehicle Details')

      // Apply styles
      ;['!cols', '!rows'].forEach((k) => {
        ws_data[k] = ws_data[k] || []
        ws_summary[k] = ws_summary[k] || []
      })

      // Set column widths for summary
      ws_summary['!cols'] = [
        { wch: 20 }, // Label
        { wch: 10 }, // Value
      ]

      // Set column widths for data
      ws_data['!cols'] = [
        { wch: 10 }, // Vehicle ID
        { wch: 15 }, // License Plate
        { wch: 12 }, // Status
        { wch: 15 }, // Tracking ID
        { wch: 30 }, // Recipient Company
        { wch: 20 }, // Contact Name
        { wch: 15 }, // Contact Phone
        { wch: 25 }, // Contact Email
        { wch: 40 }, // Delivery Address
        { wch: 15 }, // Dispatch Status
        { wch: 15 }, // Shipping Type
        { wch: 30 }, // Shipment Description
        { wch: 20 }, // Receive Date
      ]

      // Generate Excel file
      XLSX.writeFile(wb, `vehicle-report-detailed-${new Date().toISOString().split('T')[0]}.xlsx`)
    } catch (error) {
      console.error('Error exporting to Excel:', error)
      showError('Error exporting to Excel')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const scheduledVehicles = getScheduledVehicles()

  return (
    <>
      <CRow className="mb-3">
        <CCol xs={12} className="d-flex justify-content-end">
          <CButtonGroup>
            <CButton color="primary" onClick={exportToExcel} disabled={loading} className="me-2">
              <CIcon icon={cilCloudDownload} className="me-2" />
              Export to Excel
            </CButton>
            <CButton
              color="info"
              onClick={exportToDetailedExcel}
              disabled={loading}
              className="me-2"
            >
              <CIcon icon={cilCloudDownload} className="me-2" />
              Detailed Excel
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
            <h1>Vehicle Status Report</h1>
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
              <p>Total Vehicles: {vehicles.length}</p>
            </div>
          </div>
        </div>

        <div className="summary-section">
          <div className="summary-box">
            <h3>Fleet Overview</h3>
            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-label">Available:</span>
                <span className="stat-value">
                  {vehicles.filter((v) => v.status === 'available').length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">In Maintenance:</span>
                <span className="stat-value">
                  {vehicles.filter((v) => v.status === 'maintenance').length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">In Use:</span>
                <span className="stat-value">
                  {vehicles.filter((v) => v.status === 'in_use').length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">For Registration:</span>
                <span className="stat-value">
                  {vehicles.filter((v) => v.status === 'forRegistration').length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Scheduled:</span>
                <span className="stat-value">
                  {scheduledVehicles.filter((v) => v.shipmentDetails).length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Vehicle Status Report</strong>
                <div className="small text-medium-emphasis">
                  Generated on: {new Date().toLocaleDateString()}
                </div>
              </CCardHeader>
              <CCardBody>
                <CTable hover responsive className="border">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Vehicle ID</CTableHeaderCell>
                      <CTableHeaderCell scope="col">License Plate</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Tracking ID</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Recipient Company</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Contact Person</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Delivery Address</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Dispatch Status</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {scheduledVehicles.map((vehicle) => (
                      <CTableRow key={vehicle._id}>
                        <CTableDataCell>{vehicle.idNum}</CTableDataCell>
                        <CTableDataCell>{vehicle.regisNumber}</CTableDataCell>
                        <CTableDataCell>{getStatusBadge(vehicle.status)}</CTableDataCell>
                        <CTableDataCell>
                          {vehicle.shipmentDetails?.tracking_id || (
                            <CBadge color="warning">No Shipment</CBadge>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {vehicle.recipientInfo?.companyName || 'N/A'}
                        </CTableDataCell>
                        <CTableDataCell>
                          {vehicle.recipientInfo ? (
                            <div>
                              <div>{vehicle.recipientInfo.contactName}</div>
                              <small className="text-muted">
                                {vehicle.recipientInfo.contactPhone}
                              </small>
                            </div>
                          ) : (
                            'N/A'
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {vehicle.deliveryAddress || 'No address assigned'}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CBadge
                            color={getDispatchStatusColor(vehicle.shipmentDetails?.dispatch_status)}
                          >
                            {vehicle.shipmentDetails?.dispatch_status || 'No Status'}
                          </CBadge>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </>
  )
}

export default VehicleReport
