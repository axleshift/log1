// // CompleteBtnReceiving.js
// import React, { useState } from 'react'
// import { useToast } from '../../../../components/Toast/Toast'
// import {
//   CModal,
//   CModalHeader,
//   CModalBody,
//   CModalFooter,
//   CSpinner,
//   CFormInput,
//   CButton,
// } from '@coreui/react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
// import api from './../../../../utils/api'
// import PropTypes from 'prop-types'

// const CompleteBtnReceiving = ({ shipment = {}, onSuccess = () => {} }) => {
//   const { showError, showSuccess } = useToast()
//   const [showModal, setShowModal] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [amount, setAmount] = useState(0) // Add amount state

//   const handleOpenModal = () => {
//     setShowModal(true)
//     setAmount(shipment?.amount || 0) // Initialize with existing amount or 0
//   }

//   const handleCloseModal = () => {
//     setShowModal(false)
//     setAmount(0) // Reset amount on close
//   }

//   const handleAmountChange = (e) => {
//     const value = e.target.value
//     // Ensure amount is not negative and is a valid number
//     if (value >= 0) {
//       setAmount(value)
//     }
//   }

//   const handleComplete = async () => {
//     if (!shipment?._id) {
//       showError('Invalid shipment data')
//       return
//     }

//     if (amount <= 0) {
//       showError('Please enter a valid amount')
//       return
//     }

//     setLoading(true)
//     try {
//       const updateData = {
//         isInWarehouse: true,
//         paid: 'Paid',
//         amount: parseFloat(amount),
//       }

//       const response = await api.put(
//         `https://log2_backend.chysev.cloud/api/v1/shipment/${shipment._id}`,
//         updateData,
//       )

//       if (response.status === 200) {
//         showSuccess('Shipment completed successfully')
//         handleCloseModal()
//         if (onSuccess) onSuccess()
//       }
//     } catch (error) {
//       showError(error?.response?.data?.message || 'Error completing shipment')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Don't show the button if already paid
//   if (shipment?.paid === 'Paid') {
//     return null
//   }

//   return (
//     <>
//       <CButton
//         color="success"
//         variant="outline"
//         className="mb-3"
//         onClick={handleOpenModal}
//         disabled={loading}
//       >
//         <FontAwesomeIcon icon={faCheckCircle} />
//         Complete
//       </CButton>

//       <CModal visible={showModal} onClose={handleCloseModal} backdrop="static">
//         <CModalHeader closeButton>
//           <h5>Complete Shipment</h5>
//         </CModalHeader>
//         <CModalBody>
//           <div className="mb-3">
//             <h6>Shipment Details</h6>
//             <p>
//               <strong>Tracking ID:</strong> {shipment?.tracking_id}
//             </p>
//             <p>
//               <strong>Current Status:</strong> {shipment?.paid}
//             </p>

//             {/* Amount Input Field */}
//             <div className="mb-3">
//               <label htmlFor="amount" className="form-label">
//                 <strong>Amount</strong>
//               </label>

//               <CFormInput
//                 type="number"
//                 className="mb-3"
//                 floatingLabel="Amount"
//                 id="amount"
//                 value={amount}
//                 onChange={handleAmountChange}
//                 min="0"
//                 step="0.01"
//                 placeholder="Enter amount"
//                 required
//               />

//               <small className="text-muted">Please enter the final amount for this shipment</small>
//             </div>

//             <div className="alert alert-info mt-3">
//               <small>
//                 <strong>Note:</strong> This action will:
//                 <ul className="mb-0">
//                   <li>Mark the shipment as "Paid"</li>
//                   <li>Update warehouse status to "In Warehouse"</li>
//                   <li>Set the final amount to {amount}</li>
//                 </ul>
//               </small>
//             </div>
//           </div>
//         </CModalBody>
//         <CModalFooter>
//           <CButton
//             color="secondary"
//             variant="outline"
//             onClick={handleCloseModal}
//             disabled={loading}
//           >
//             Cancel
//           </CButton>
//           <CButton
//             color="primary"
//             variant="outline"
//             onClick={handleComplete}
//             disabled={loading || amount <= 0} // Disable if amount is 0 or negative
//           >
//             {loading ? (
//               <>
//                 <CSpinner size="sm" className="me-2" />
//                 Completing...
//               </>
//             ) : (
//               'Complete Shipment'
//             )}
//           </CButton>
//         </CModalFooter>
//       </CModal>
//     </>
//   )
// }

// export default CompleteBtnReceiving

// CompleteBtnReceiving.js
import React, { useState, useEffect, use } from 'react'
import { useToast } from '../../../../components/Toast/Toast'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CSpinner,
  CFormInput,
  CButton,
  CFormLabel,
  CInputGroup,
  CImage,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import api from './../../../../utils/api'
import { getUsername } from '../../../../utils/auth'

const CompleteBtnReceiving = ({ shipment = {}, onSuccess = () => {} }) => {
  const { showError, showSuccess } = useToast()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [warehouses, setWarehouses] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.match('image.*')) {
        showError('Please select an image file')
        return
      }

      setSelectedFile(file)
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  useEffect(() => {
    // Fetch warehouses
    const fetchWarehouses = async () => {
      try {
        const response = await api.get('/api/v1/warehouseLoc/locations')
        if (response.data.data) {
          setWarehouses(response.data.data)
        }
      } catch (error) {
        setLocalError(error?.response?.data.message)
        showError(error?.response?.data.message || 'Error fetching warehouses')
      }
    }
    fetchWarehouses()
  }, [])
  const getWarehouseName = (warehouseId) => {
    if (!warehouses.length) return 'Loading...'
    const warehouse = warehouses.find((w) => w._id === warehouseId)
    return warehouse ? warehouse.warehouseName : 'Not Yet Assigned'
  }

  const handleComplete = async () => {
    if (!shipment?._id) {
      showError('Invalid shipment data')
      return
    }

    setLoading(true)
    try {
      // First, get the complete shipment data
      const username = getUsername()
      const getShipmentResponse = await api.get(
        `${import.meta.env.VITE_APP_API_URL_LOG2}api/v1/shipment/${shipment._id}`,
      )

      const completeShipmentData = getShipmentResponse.data.shipment
      const formData = new FormData()

      // Add the photo if selected
      if (selectedFile) {
        formData.append('photo', selectedFile)
      }

      // Prepare the data for receiving
      const receivingData = {
        shipper: {
          company_name: completeShipmentData.shipper.shipper_company_name,
          contact_name: completeShipmentData.shipper.shipper_contact_name,
          email: completeShipmentData.shipper.shipper_contact_email_address,
          phone: completeShipmentData.shipper.shipper_contact_phone_number,
          address: completeShipmentData.shipper.shipper_company_address,
        },
        consignee: {
          company_name: completeShipmentData.consignee.consignee_company_name,
          contact_name: completeShipmentData.consignee.consignee_contact_name,
          email: completeShipmentData.consignee.consignee_contact_email_address,
          phone: completeShipmentData.consignee.consignee_contact_phone_number,
          address: completeShipmentData.consignee.consignee_company_address,
        },
        shipment: {
          description: completeShipmentData.shipment.shipment_description,
          weight: completeShipmentData.shipment.shipment_weight,
          dimension: {
            length: completeShipmentData.shipment.shipment_dimension_length,
            width: completeShipmentData.shipment.shipment_dimension_width,
            height: completeShipmentData.shipment.shipment_dimension_height,
          },
          tracking_id: completeShipmentData.tracking_id,
          isInWarehouse: true,
          // paid: 'Paid',
          // amount: parseFloat(amount),
        },
        vehicle: {
          name: completeShipmentData.vehicle.name,
          plate_no: completeShipmentData.vehicle.plate_no,
          driver_name: completeShipmentData.vehicle.driver_name,
        },
        warehouse_id: completeShipmentData.warehouse_id,
        shipping: {
          type: completeShipmentData.shipping.shipping_type,
        },
        tracking_id: completeShipmentData.tracking_id,
        receiveDate: new Date().toISOString(),
        receiveBy: username,
      }

      formData.append('data', JSON.stringify(receivingData))
      const createReceivingResponse = await api.post(`api/v1/receiving/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // Update original shipment
      const updateShipmentResponse = await api.put(
        `${import.meta.env.VITE_APP_API_URL_LOG2}api/v1/shipment/${shipment._id}`,
        {
          isInWarehouse: true,
          vehicle: {
            name: null,
            plate_no: null,
            driver_name: null,
          },
        },
      )

      if (createReceivingResponse.status === 201 && updateShipmentResponse.status === 200) {
        showSuccess('Shipment receiving completed successfully')
        handleCloseModal()
        if (onSuccess) onSuccess()
      }
    } catch (error) {
      console.error('Error details:', error.response?.data)
      showError(error?.response?.data?.message || 'Error completing shipment')
    } finally {
      setLoading(false)
    }
  }

  // Don't show the button if already paid
  if (shipment?.paid === 'Paid') {
    return null
  }
  const NavIcon = ({ icon }) => {
    const [isHovering, setIsHovering] = useState(false)

    return (
      <FontAwesomeIcon
        icon={icon}
        bounce={isHovering}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />
    )
  }

  return (
    <>
      <CButton
        className="mb-2"
        color="success"
        variant="outline"
        onClick={handleOpenModal}
        disabled={loading || !shipment?.vehicle?.name}
      >
        <NavIcon icon={faCheckCircle} className="me-1" /> Complete
      </CButton>

      <CModal visible={showModal} onClose={handleCloseModal} backdrop="static">
        <CModalHeader closeButton>
          <h5>Complete Shipment</h5>
        </CModalHeader>
        <CModalBody>
          <div className="mb-3">
            <h6>Shipment Details</h6>
            <p>
              <strong>Tracking ID:</strong> {shipment?.tracking_id}
            </p>

            <CFormLabel htmlFor="receipt">Picture Of Receipts</CFormLabel>
            <CInputGroup className="mb-3">
              <CFormInput type="file" id="receipt" accept="images/*" onChange={handlePhotoChange} />
            </CInputGroup>
            {preview && (
              <div className="mb-3">
                <CImage
                  src={preview}
                  rounded
                  align="center"
                  alt="Receipts"
                  width={200}
                  height={200}
                />
              </div>
            )}

            {/* <p>
              <strong>Current Status:</strong> {shipment?.paid}
            </p> */}

            {/* <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                <strong>Amount</strong>
              </label>

              <CFormInput
                type="number"
                className="mb-3"
                floatingLabel="Amount"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                min="0"
                step="0.01"
                placeholder="Enter amount"
                required
              />

              <small className="text-muted">Please enter the final amount for this shipment</small>
            </div> */}

            <div className="alert alert-info mt-3">
              <small>
                <strong>Note:</strong> This action will:
                <ul className="mb-0">
                  {/* <li>Mark the shipment as &ldquo;Paid&ldquo;</li> */}
                  <li>
                    Store to warehouse &ldquo;{getWarehouseName(shipment?.warehouse_id)}&ldquo;
                  </li>
                  {/* <li>Set the final amount to {amount}</li> */}
                </ul>
              </small>
            </div>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            variant="outline"
            className="mb-3"
            onClick={handleCloseModal}
            disabled={loading}
          >
            Cancel
          </CButton>
          <CButton
            className="mb-3"
            color="primary"
            variant="outline"
            onClick={handleComplete}
            disabled={loading || !preview}
          >
            {loading ? (
              <>
                <CSpinner size="sm" className="me-2" />
                Completing...
              </>
            ) : (
              'Complete Shipment'
            )}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default CompleteBtnReceiving
