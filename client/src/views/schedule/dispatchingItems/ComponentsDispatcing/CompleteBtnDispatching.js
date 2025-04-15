import React, { useState, useEffect } from 'react'
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

const CompleteBtnDispatching = ({ shipment = {}, onSuccess = () => {} }) => {
  const { showError, showSuccess } = useToast()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  // const [amount, setAmount] = useState(0)
  const [warehouses, setWarehouses] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleOpenModal = () => {
    setShowModal(true)
    // setAmount(shipment?.amount || 0)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    // setAmount(0)
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file type
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

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0]
  //   if (file) {
  //     setSelectedFile(file)
  //     // Create preview URL
  //     const fileUrl = URL.createObjectURL(file)
  //     setPreviewUrl(fileUrl)
  //   }
  // }

  // const handleAmountChange = (e) => {
  //   const value = e.target.value
  //   if (value >= 0) {
  //     setAmount(value)
  //   }
  // }
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

  const handleComplete = async () => {
    if (!shipment?._id) {
      showError('Invalid shipment data')
      return
    }

    // if (amount <= 0) {
    //   showError('Please enter a valid amount')
    //   return
    // }

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
      // Add this check before creating the dispatch
      if (!completeShipmentData.shipping?.shipping_type) {
        showError('Shipping type is required')
        return
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
          isInWarehouse: false,
          // paid: 'Paid',
          // amount: parseFloat(amount),
        },
        vehicle: {
          name: completeShipmentData.vehicle.name,
          plate_no: completeShipmentData.vehicle.plate_no,
          driver_name: completeShipmentData.vehicle.driver_name,
        },
        warehouse_id: completeShipmentData.warehouse_id,
        // In CompleteBtnDispatching.js, modify the shipping section of receivingData:
        shipping: {
          shipping_type: completeShipmentData.shipping.shipping_type,
          shipping_details: {
            destination_address: completeShipmentData.shipping.shipping_details.destination_address,
            pickup_date: completeShipmentData.shipping.shipping_details.pickup_date,
            delivery_date: completeShipmentData.shipping.shipping_details.delivery_date,
            vehicle_type: completeShipmentData.shipping.shipping_details.vehicle_type,
            destination_airport: completeShipmentData.shipping.shipping_details.destination_airport,
            preferred_departure_date:
              completeShipmentData.shipping.shipping_details.preferred_departure_date,
            preferred_arrival_date:
              completeShipmentData.shipping.shipping_details.preferred_arrival_date,
            flight_type: completeShipmentData.shipping.shipping_details.flight_type,
            loading_port: completeShipmentData.shipping.shipping_details.loading_port,
            discharge_port: completeShipmentData.shipping.shipping_details.discharge_port,
            sailing_date: completeShipmentData.shipping.shipping_details.sailing_date,
            estimated_arrival_date:
              completeShipmentData.shipping.shipping_details.estimated_arrival_date,
            cargo_type: completeShipmentData.shipping.shipping_details.cargo_type,
          },
        },

        tracking_id: completeShipmentData.tracking_id,
        receiveDate: new Date().toISOString(),
        receiveBy: username,
      }

      formData.append('data', JSON.stringify(receivingData))

      // Create new record in receiving collection
      const createReceivingResponse = await api.post(`api/v1/dispatch/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // Update original shipment
      const updateShipmentResponse = await api.put(
        `${import.meta.env.VITE_APP_API_URL_LOG2}api/v1/shipment/${shipment._id}`,
        {
          isInWarehouse: false,
          // paid: 'Paid',
          // amount: parseFloat(amount),
          dispatch: 'Completed',
        },
      )

      if (createReceivingResponse.status === 201 && updateShipmentResponse.status === 200) {
        showSuccess('Shipment completed and copied to receiving successfully')
        handleCloseModal()
        if (onSuccess) onSuccess()
      }
    } catch (error) {
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
        <NavIcon icon={faCheckCircle} /> Complete
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
                  <li> Complete the Dispatching</li>
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

export default CompleteBtnDispatching
