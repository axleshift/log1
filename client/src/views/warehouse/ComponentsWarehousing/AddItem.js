import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
  CFormSelect,
  CAlert,
  CFormTextarea,
  CInputGroup,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CHeader,
} from '@coreui/react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import api from '../../../utils/api'
import { useToast } from '../../../components/Toast/Toast'

const AddItem = ({ onAddItem, item = {} }) => {
  const { showSuccess, showError } = useToast()
  const [buttonText, setButtonText] = useState('Add Item')
  const [success, setSuccess] = useState(false)
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState('')
  const [warehouses, setWarehouses] = useState([])
  const today = new Date().toISOString().split('T')[0]

  const [formData, setFormData] = useState({
    poNumber: item.poNumber || '',
    orderDate: item.orderDate || today,
    receiveDate: item.receiveDate || today,
    carrier: item.carrier || '',
    vendor: {
      businessName: item?.vendor?.businessName || '',
      businessAddress: item?.vendor?.businessAddress || '',
      contactNumber: item?.vendor?.contactNumber || '',
    },
    warehouse: item.warehouse || '',
    warehouseLocDetails: {
      warehouseName: item?.warehouseLocDetails?.warehouseName || '',
      address: item?.warehouseLocDetails?.address || '',
    },
    details: item.details || [
      {
        productId: '',
        description: '',
        quantity: '',
      },
    ],
    procurementId: item.procurementId || '',
    rfqId: item.rfqId || null,
    vendorId: item.vendorId || '',
    additionalNotes: item.additionalNotes || '',
    byReceived: '',
    dateOfReceived: '',
  })
  useEffect(() => {
    console.log('Current formData:', formData)
  }, [formData])

  const handleWarehouseChange = (e) => {
    const selectedWarehouseId = e.target.value
    const selectedWarehouse = warehouses.find((w) => w._id === selectedWarehouseId)

    setFormData((prev) => ({
      ...prev,
      warehouse: selectedWarehouseId,
      warehouseLocDetails: {
        warehouseName: selectedWarehouse ? selectedWarehouse.warehouseName : '',
        address: selectedWarehouse ? selectedWarehouse.address : '',
      },
    }))
  }

  const handleProductChange = (index, field, value) => {
    setFormData((prev) => {
      const newDetails = [...prev.details]
      newDetails[index] = {
        ...newDetails[index],
        [field]: value,
        // Automatically calculate subtotal when quantity or unitPrice changes
        ...(field === 'quantity' || field === 'unitPrice'
          ? {
              subTotal:
                (field === 'quantity' ? Number(value) : Number(newDetails[index].quantity)) *
                (field === 'unitPrice' ? Number(value) : Number(newDetails[index].unitPrice)),
            }
          : {}),
      }
      return { ...prev, details: newDetails }
    })
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    if (id.includes('.')) {
      // Handle nested vendor object
      const [parent, child] = id.split('.')
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }))
    }
  }
  const checkIfPoNumberExists = async (poNumber) => {
    try {
      const response = await api.get(`/api/v1/warehouse/checkPoNumber/${poNumber}`)
      return response.data.exists
    } catch (error) {
      console.error(error)
      return false
    }
  }

  useEffect(() => {
    const checkPoNumber = async () => {
      const exists = await checkIfPoNumberExists(item.poNumber)
      if (exists) {
        setButtonText('Already Added')
      }
    }
    checkPoNumber()
  }, [item.poNumber])

  useEffect(() => {
    // Fetch warehouses
    const fetchWarehouses = async () => {
      try {
        const response = await api.get('/api/v1/warehouseLoc/locations')
        setWarehouses(response.data.data)
      } catch (error) {
        setError(error.response.data.message)
        showError(error.response.data.message)
      }
    }
    fetchWarehouses()
  }, [])

  const validateForm = () => {
    if (!formData.warehouse) {
      setError('Please select a warehouse')
      return false
    }

    if (!formData.warehouseLocDetails.warehouseName || !formData.warehouseLocDetails.address) {
      setError('Warehouse location details are incomplete')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    const user = JSON.parse(sessionStorage.getItem('user'))
    const email = user.email

    if (!email) {
      setError('User email not found. Please log in again.')
      return
    }

    if (!formData.warehouse) {
      setError('Please select a warehouse')
      return
    }

    try {
      // Find the selected warehouse from your warehouses array
      const selectedWarehouse = warehouses.find((w) => w._id === formData.warehouse)

      if (!selectedWarehouse) {
        setError('Selected warehouse not found')
        return
      }

      // Prepare the data with proper warehouse details
      const dataToSubmit = {
        ...formData,
        byReceived: email,
        dateOfReceived: new Date().toISOString().split('T')[0],
        warehouse: formData.warehouse,
        warehouseLocDetails: {
          warehouseName: selectedWarehouse.warehouseName,
          address: selectedWarehouse.address,
        },
      }
      const response = await api.post('/api/v1/warehouse/addItem', dataToSubmit)

      // Handle success
      if (response.data.success) {
        onAddItem(response.data.data)
        setVisible(false)
        showSuccess('Item added successfully')
        setButtonText('Already Added')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setError(error.response?.data?.message || 'Error adding item')
      showError(error.response?.data?.message || 'Error adding item')
    }
  }

  return (
    <>
      <CButton
        color="primary"
        variant="outline"
        onClick={() => setVisible(true)}
        disabled={buttonText === 'Already Added'}
      >
        {buttonText === 'Already Added' ? (
          <span className="me-1">Already Added</span>
        ) : (
          <FontAwesomeIcon icon={faPlus} />
        )}
      </CButton>
      <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader>
          <CModalTitle>Add Receiving Item</CModalTitle>
        </CModalHeader>
        {error && <CAlert color="danger">{error}</CAlert>}
        {success && <CAlert color="success">{success}</CAlert>}
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3">
              <CFormInput
                type="text"
                id="poNumber"
                floatingLabel="PO Number"
                className="mb-3"
                value={formData.poNumber}
                onChange={handleChange}
                required
                disabled
              />

              <CFormInput
                type="date"
                id="orderDate"
                floatingLabel="Order Date"
                className="mb-3"
                value={formData.orderDate.split('T')[0]}
                onChange={handleChange}
                required
                disabled
              />

              <CFormInput
                type="date"
                id="receiveDate"
                floatingLabel="Date to Receive"
                className="mb-3"
                value={formData.receiveDate.split('T')[0]}
                onChange={handleChange}
                required
                disabled
              />
            </CInputGroup>
            <CFormInput
              type="text"
              id="vendor.businessName"
              floatingLabel="Vendor Business Name"
              className="mb-3"
              value={formData.vendor.businessName}
              onChange={handleChange}
              required
              disabled
            />

            <CInputGroup className="mb-3">
              <CFormInput
                type="text"
                id="vendor.businessAddress"
                floatingLabel="Vendor Address"
                className="mb-3"
                value={formData.vendor.businessAddress}
                onChange={handleChange}
                required
                disabled
              />
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CFormInput
                type="text"
                id="vendor.contactNumber"
                floatingLabel="Vendor Contact Number"
                className="mb-3"
                value={formData.vendor.contactNumber}
                onChange={handleChange}
                required
                disabled
              />
              <CFormInput
                type="text"
                id="carrier"
                floatingLabel="Carrier"
                className="mb-3"
                value={formData.carrier}
                onChange={handleChange}
                required
                disabled
              />
            </CInputGroup>

            <CFormTextarea
              id="additionalNotes"
              floatingLabel="Additional Notes"
              className="mb-3"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows={3}
              disabled
            />

            <div className="mb-3">
              <CHeader>Product Details</CHeader>
              <CTable responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Description</CTableHeaderCell>
                    <CTableHeaderCell>Quantity</CTableHeaderCell>
                    <CTableHeaderCell>Unit Price </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {formData.details.map((detail, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <CFormInput
                          type="text"
                          id="description"
                          value={detail.description}
                          onChange={(e) =>
                            handleProductChange(index, 'description', e.target.value)
                          }
                          placeholder="Product description"
                          disabled
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormInput
                          type="number"
                          id="quantity"
                          value={detail.quantity}
                          onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                          placeholder="Qty"
                          disabled
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="danger"
                          size="sm"
                          onClick={() => removeProductRow(index)}
                          disabled={formData.details.length === 1}
                        >
                          Remove
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>

            {/* Total Amount Display */}

            <CFormSelect
              id="warehouse"
              floatingLabel="Warehouse"
              className="mb-3"
              value={formData.warehouse}
              onChange={handleWarehouseChange} // Use the new handler
              required
            >
              <option value="">Select Warehouse</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse._id} value={warehouse._id}>
                  {warehouse.warehouseName} - {warehouse.address}
                </option>
              ))}
            </CFormSelect>

            {/* You might want to add a component here to handle details array */}
            {/* This could be a separate component for adding products */}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleSubmit}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AddItem
