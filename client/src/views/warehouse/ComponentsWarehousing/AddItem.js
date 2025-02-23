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
    from: item.from,
    items: item.items,
    PoNumber: item.PoNumber,
    dateArrival: today,
    warehouse: '',
    byReceived: '',
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
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
      const exists = await checkIfPoNumberExists(item.PoNumber)
      if (exists) {
        setButtonText('Already Added')
      }
    }
    checkPoNumber()
  }, [item.PoNumber])

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
  const itemsString =
    item.items &&
    item.items
      .map(
        (item, index) =>
          `${index + 1}. Item Name: (${item.itemName})    Quantity: (${item.quantity})`,
      )
      .join('\n')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = JSON.parse(sessionStorage.getItem('user'))
    const email = user.email
    if (!email) {
      setError('User email not found. Please log in again.')
      return
    }

    try {
      const response = await api.post('/api/v1/warehouse/addItem', {
        ...formData,
        byReceived: email,
      })

      if (response.data.success) {
        const newItem = response.data.data
        const warehouse = warehouses.find((w) => w._id === newItem.warehouse)
        newItem.warehouse = warehouse // Add warehouse details to the new item
        showSuccess(response.data.message)
        onAddItem(newItem)
        setButtonText('Already Added')

        // Close the modal after a short delay
        setTimeout(() => {
          setVisible(false)
          setSuccess('')
        }, 1500)
      } else {
        setError(response.data.message || 'An unexpected error occurred')
        showError(response.data.message || 'An unexpected error occurred')
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message)
      showError(error.response?.data?.message || error.message)
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
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add Item</CModalTitle>
        </CModalHeader>
        {error && <CAlert color="danger">{error}</CAlert>}
        {success && <CAlert color="success">{success}</CAlert>}
        <CModalBody>
          <CForm>
            <CFormInput
              type="text"
              placeholder="From"
              className="mb-3"
              floatingLabel="From"
              id="from"
              onChange={handleChange}
              value={formData.from}
              required
              readOnly
            />

            <CFormTextarea
              placeholder="Items List"
              className="mb-3 justify-content-center h-50"
              floatingLabel="Items List"
              id="items"
              rows={5}
              value={
                Array.isArray(formData.items)
                  ? formData.items
                      .map(
                        (item, index) =>
                          `${index + 1}. ${item.itemName} (Quantity: ${item.quantity})`,
                      )
                      .join('\n')
                  : formData.items
              }
              readOnly
            />

            <CFormSelect
              placeholder="Warehouse"
              className="mb-3"
              floatingLabel="Warehouse"
              id="warehouse"
              onChange={handleChange}
              value={formData.warehouse}
              required
            >
              <option value="">Select Warehouse</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse._id} value={warehouse._id}>
                  {warehouse.warehouseName}
                </option>
              ))}
            </CFormSelect>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" variant="outline" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" variant="outline" onClick={handleSubmit}>
            Add Item
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AddItem
