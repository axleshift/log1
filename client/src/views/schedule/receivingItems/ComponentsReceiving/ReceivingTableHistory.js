// import React, { useState, useEffect } from 'react'
// import {
//   CAccordion,
//   CAccordionItem,
//   CAccordionHeader,
//   CAccordionBody,
//   CCard,
//   CCardHeader,
//   CCardBody,
//   CContainer,
//   CAlert,
// } from '@coreui/react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   faBox,
//   faTruck,
//   faUser,
//   faBuilding,
//   faShippingFast,
// } from '@fortawesome/free-solid-svg-icons'
// import api from '../../../../utils/api'
// import { useToast } from '../../../../components/Toast/Toast'

// const ReceivingTableHistory = () => {
//   const { showSuccess, showError } = useToast()
//   const [receivingData, setReceivingData] = useState([])
//   const [warehouses, setWarehouses] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [localError, setLocalError] = useState(null)
//   useEffect(() => {
//     fetchReceivingData()
//   }, [])

//   const fetchReceivingData = async () => {
//     try {
//       const response = await api.get('/api/v1/receiving/all')
//       setReceivingData(response.data.data)
//     } catch (error) {
//       console.error('Error fetching receiving data:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     // Fetch warehouses
//     const fetchWarehouses = async () => {
//       try {
//         const response = await api.get('/api/v1/warehouseLoc/locations')
//         if (response.data.data) {
//           setWarehouses(response.data.data)
//           showSuccess(response.data.message)
//         }
//       } catch (error) {
//         setLocalError(error?.response?.data.message)
//         showError(error?.response?.data.message || 'Error fetching warehouses')
//       }
//     }
//     fetchWarehouses()
//   }, [])
//   const getWarehouseName = (warehouseId) => {
//     if (!warehouses.length) return 'Loading...'
//     const warehouse = warehouses.find((w) => w._id === warehouseId)
//     return warehouse ? warehouse.warehouseName : 'N/A'
//   }

//   if (loading) {
//     return <div className="text-center py-5">Loading...</div>
//   }

//   return (
//     <div className="container-fluid px-4">
//       <h1 className="mt-4">Receiving History</h1>
//       <div className="card mb-4">
//         <div className="card-body">
//           <CAccordion flush>
//             {receivingData.map((item, index) => (
//               <CAccordionItem key={item._id || index}>
//                 <CAccordionHeader>
//                   <div className="d-flex justify-content-between w-100 me-3">
//                     <span>
//                       <FontAwesomeIcon icon={faBox} className="me-2" />
//                       Tracking ID: {item.shipment?.tracking_id}
//                     </span>
//                     <span className="text-muted">
//                       Received: {new Date(item.receiveDate).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </CAccordionHeader>
//                 <CAccordionBody>
//                   <div className="row g-3">
//                     {/* Shipper Information */}
//                     <div className="col-md-6">
//                       <CContainer>
//                         <CContainer>
//                           <FontAwesomeIcon icon={faBuilding} className="me-2" />
//                           Shipper Information
//                         </CContainer>
//                         <CContainer className="card-body">
//                           <p>
//                             <strong>Company:</strong> {item.shipper?.company_name}
//                           </p>
//                           <p>
//                             <strong>Contact:</strong> {item.shipper?.contact_name}
//                           </p>
//                           <p>
//                             <strong>Email:</strong> {item.shipper?.email}
//                           </p>
//                           <p>
//                             <strong>Phone:</strong> {item.shipper?.phone}
//                           </p>
//                           <p>
//                             <strong>Address:</strong> {item.shipper?.address}
//                           </p>
//                         </CContainer>
//                       </CContainer>
//                     </div>

//                     {/* Consignee Information */}
//                     <div className="col-md-6">
//                       <CContainer>
//                         <CContainer>
//                           <FontAwesomeIcon icon={faUser} className="me-2" />
//                           Consignee Information
//                         </CContainer>
//                         <CContainer className="card-body">
//                           <p>
//                             <strong>Company:</strong> {item.consignee?.company_name}
//                           </p>
//                           <p>
//                             <strong>Contact:</strong> {item.consignee?.contact_name}
//                           </p>
//                           <p>
//                             <strong>Email:</strong> {item.consignee?.email}
//                           </p>
//                           <p>
//                             <strong>Phone:</strong> {item.consignee?.phone}
//                           </p>
//                           <p>
//                             <strong>Address:</strong> {item.consignee?.address}
//                           </p>
//                         </CContainer>
//                       </CContainer>
//                     </div>

//                     {/* Shipment Details */}
//                     <CContainer className="col-md-6">
//                       <CCard>
//                         <CCardHeader>
//                           <FontAwesomeIcon icon={faShippingFast} className="me-2" />
//                           Shipment Details
//                         </CCardHeader>
//                         <CCardBody>
//                           <p>
//                             <strong>Description:</strong> {item.shipment?.description}
//                           </p>
//                           <p>
//                             <strong>Weight:</strong> {item.shipment?.weight} kg
//                           </p>
//                           <p>
//                             <strong>Dimensions:</strong> {item.shipment?.dimension?.length} x{' '}
//                             {item.shipment?.dimension?.width} x {item.shipment?.dimension?.height}{' '}
//                             cm
//                           </p>
//                           <p>
//                             <strong>Warehouse:</strong> {getWarehouseName(item.warehouse_id)}
//                           </p>
//                           <p>
//                             <strong>Status:</strong> {item.shipment?.paid}
//                           </p>
//                           <p>
//                             <strong>Amount:</strong> ${item.shipment?.amount}
//                           </p>
//                         </CCardBody>
//                       </CCard>
//                     </CContainer>

//                     {/* Vehicle & Shipping Information */}
//                     <CContainer className="col-md-6">
//                       <CCard>
//                         <CCardHeader>
//                           <FontAwesomeIcon icon={faTruck} className="me-2" />
//                           Vehicle & Shipping Information
//                         </CCardHeader>
//                         <CCardBody>
//                           <p>
//                             <strong>Vehicle:</strong> {item.vehicle?.name}
//                           </p>
//                           <p>
//                             <strong>Plate No:</strong> {item.vehicle?.plate_no}
//                           </p>
//                           <p>
//                             <strong>Driver:</strong> {item.vehicle?.driver_name}
//                           </p>
//                           <p>
//                             <strong>Shipping Type:</strong> {item.shipping?.type}
//                           </p>
//                           <p>
//                             <strong>Received By:</strong> {item.receiveBy}
//                           </p>
//                         </CCardBody>
//                       </CCard>
//                     </CContainer>
//                   </div>
//                 </CAccordionBody>
//               </CAccordionItem>
//             ))}
//           </CAccordion>
//           {localError && <CAlert className="alert alert-danger">{localError}</CAlert>}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ReceivingTableHistory

import React, { useState, useEffect } from 'react'
import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CCard,
  CCardHeader,
  CCardBody,
  CContainer,
  CAlert,
  CFormInput,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBox,
  faTruck,
  faUser,
  faBuilding,
  faShippingFast,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import api from '../../../../utils/api'
import { useToast } from '../../../../components/Toast/Toast'

const ReceivingTableHistory = () => {
  const { showSuccess, showError } = useToast()
  const [receivingData, setReceivingData] = useState([])
  const [warehouses, setWarehouses] = useState([])
  const [loading, setLoading] = useState(true)
  const [localError, setLocalError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10) // You can adjust this number

  useEffect(() => {
    fetchReceivingData()
  }, []) // Initial fetch

  const fetchReceivingData = async () => {
    try {
      setLoading(true)
      const response = await api.get('/api/v1/receiving/all')
      setReceivingData(response.data.data)
      showSuccess('Receiving history loaded successfully')
    } catch (error) {
      console.error('Error fetching receiving data:', error)
      setLocalError(error?.response?.data?.message || 'Error fetching data')
      showError(error?.response?.data?.message || 'Error fetching receiving history')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await api.get('/api/v1/warehouseLoc/locations')
        if (response.data.data) {
          setWarehouses(response.data.data)
        }
      } catch (error) {
        setLocalError(error?.response?.data?.message)
        showError(error?.response?.data?.message || 'Error fetching warehouses')
      }
    }
    fetchWarehouses()
  }, [])

  const getWarehouseName = (warehouseId) => {
    if (!warehouses.length) return 'Loading...'
    const warehouse = warehouses.find((w) => w._id === warehouseId)
    return warehouse ? warehouse.warehouseName : 'N/A'
  }

  // Search function
  const filteredData = receivingData.filter((item) => {
    const searchString = searchTerm.toLowerCase()
    return (
      item.tracking_id?.toLowerCase().includes(searchString) ||
      item.shipper?.company_name?.toLowerCase().includes(searchString) ||
      item.consignee?.company_name?.toLowerCase().includes(searchString) ||
      item.vehicle?.name?.toLowerCase().includes(searchString) ||
      item.receiveBy?.toLowerCase().includes(searchString)
    )
  })

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  if (loading) {
    return <div className="text-center py-5">Loading...</div>
  }

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Receiving History</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <CFormInput
            placeholder="Search by tracking ID, company, receiver..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <CAccordion flush>
            {currentItems.map((item, index) => (
              <CAccordionItem key={item._id || index}>
                <CAccordionHeader>
                  <div className="d-flex justify-content-between w-100 me-3">
                    <span>
                      <FontAwesomeIcon icon={faBox} className="me-2" />
                      Tracking ID: {item.shipment?.tracking_id}
                    </span>
                    <span className="text-muted">
                      Received: {new Date(item.receiveDate).toLocaleDateString()}
                    </span>
                  </div>
                </CAccordionHeader>
                <CAccordionBody>
                  <div className="row g-3">
                    {/* Shipper Information */}
                    <div className="col-md-6">
                      <CContainer>
                        <CContainer>
                          <FontAwesomeIcon icon={faBuilding} className="me-2" />
                          Shipper Information
                        </CContainer>
                        <CContainer className="card-body">
                          <p>
                            <strong>Company:</strong> {item.shipper?.company_name}
                          </p>
                          <p>
                            <strong>Contact:</strong> {item.shipper?.contact_name}
                          </p>
                          <p>
                            <strong>Email:</strong> {item.shipper?.email}
                          </p>
                          <p>
                            <strong>Phone:</strong> {item.shipper?.phone}
                          </p>
                          <p>
                            <strong>Address:</strong> {item.shipper?.address}
                          </p>
                        </CContainer>
                      </CContainer>
                    </div>

                    {/* Consignee Information */}
                    <div className="col-md-6">
                      <CContainer>
                        <CContainer>
                          <FontAwesomeIcon icon={faUser} className="me-2" />
                          Consignee Information
                        </CContainer>
                        <CContainer className="card-body">
                          <p>
                            <strong>Company:</strong> {item.consignee?.company_name}
                          </p>
                          <p>
                            <strong>Contact:</strong> {item.consignee?.contact_name}
                          </p>
                          <p>
                            <strong>Email:</strong> {item.consignee?.email}
                          </p>
                          <p>
                            <strong>Phone:</strong> {item.consignee?.phone}
                          </p>
                          <p>
                            <strong>Address:</strong> {item.consignee?.address}
                          </p>
                        </CContainer>
                      </CContainer>
                    </div>

                    {/* Shipment Details */}
                    <CContainer className="col-md-6">
                      <CCard>
                        <CCardHeader>
                          <FontAwesomeIcon icon={faShippingFast} className="me-2" />
                          Shipment Details
                        </CCardHeader>
                        <CCardBody>
                          <p>
                            <strong>Description:</strong> {item.shipment?.description}
                          </p>
                          <p>
                            <strong>Weight:</strong> {item.shipment?.weight} kg
                          </p>
                          <p>
                            <strong>Dimensions:</strong> {item.shipment?.dimension?.length} x{' '}
                            {item.shipment?.dimension?.width} x {item.shipment?.dimension?.height}{' '}
                            cm
                          </p>
                          <p>
                            <strong>Warehouse:</strong> {getWarehouseName(item.warehouse_id)}
                          </p>
                          <p>
                            <strong>Status:</strong> {item.shipment?.paid}
                          </p>
                          <p>
                            <strong>Amount:</strong> ${item.shipment?.amount}
                          </p>
                        </CCardBody>
                      </CCard>
                    </CContainer>

                    {/* Vehicle & Shipping Information */}
                    <CContainer className="col-md-6">
                      <CCard>
                        <CCardHeader>
                          <FontAwesomeIcon icon={faTruck} className="me-2" />
                          Vehicle & Shipping Information
                        </CCardHeader>
                        <CCardBody>
                          <p>
                            <strong>Vehicle:</strong> {item.vehicle?.name}
                          </p>
                          <p>
                            <strong>Plate No:</strong> {item.vehicle?.plate_no}
                          </p>
                          <p>
                            <strong>Driver:</strong> {item.vehicle?.driver_name}
                          </p>
                          <p>
                            <strong>Shipping Type:</strong> {item.shipping?.type}
                          </p>
                          <p>
                            <strong>Received By:</strong> {item.receiveBy}
                          </p>
                        </CCardBody>
                      </CCard>
                    </CContainer>
                  </div>
                </CAccordionBody>
              </CAccordionItem>
            ))}
          </CAccordion>

          {/* Pagination */}
          {filteredData.length > itemsPerPage && (
            <CPagination className="mt-4 justify-content-center" aria-label="Page navigation">
              <CPaginationItem
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </CPaginationItem>

              {[...Array(totalPages)].map((_, index) => (
                <CPaginationItem
                  key={index + 1}
                  active={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </CPaginationItem>
              ))}

              <CPaginationItem
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </CPaginationItem>
            </CPagination>
          )}
        </div>
      </div>

      {localError && <CAlert color="danger">{localError}</CAlert>}
    </div>
  )
}

export default ReceivingTableHistory
