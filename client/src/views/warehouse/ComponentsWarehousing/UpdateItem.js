import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CButton,
  CSpinner,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
  CFormSelect,
  CAlert,
  CModalFooter,
  CFormTextarea,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import api from '../../../utils/api'
import { useToast } from '../../../components/Toast/Toast'

const UpdateItem = ({ warehousing, onUpdateItem }) => {
  const { showSuccess, showErrors } = useToast()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [visible, setVisible] = useState(false)
  const [warehouses, setWarehouses] = useState([])
  const today = new Date().toISOString().split('T')[0]
  const [formData, setFormData] = useState({
    from: warehousing.from || '',
    items: warehousing.items || '', // Use the items array from the warehousing object
    dateArrival: today,
    warehouse: warehousing.warehouse || '',
    warehouseLocDetails: {
      warehouseName: warehousing.warehouseName || '',
      address: warehousing.address || '',
    },
    status: warehousing.status, // Add the status field
  })

  useEffect(() => {
    // Fetch warehouses
    const fetchWarehouses = async () => {
      try {
        const response = await api.get('/api/v1/warehouseLoc/locations')
        setWarehouses(response.data.data)
      } catch (error) {
        setError(error.response.data.message)
        showErrors(error.response.data.message)
      }
    }
    fetchWarehouses()
  }, [])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => {
      if (['length', 'width', 'height'].includes(id)) {
        const numericValue = value === '' ? '' : Math.max(1, Number(value)) // Ensure the value is at least 1
        return {
          ...prevData,
          [id]: numericValue,
        }
      }
      if (id === 'items') {
        // Handle changes to the items array
        const items = JSON.parse(value)
        return {
          ...prevData,
          items,
        }
      }
      return {
        ...prevData,
        [id]: value,
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = JSON.parse(sessionStorage.getItem('user'))
    const email = user.email
    if (!email) {
      setError('User email not found. Please log in again.')
      return
    }
    const warehouse = warehouses.find((w) => w._id === formData.warehouse)
    if (!warehouse) {
      setError('Warehouse not found.')
      return
    }
    formData.warehouseLocDetails = {
      warehouseName: warehouse.warehouseName,
      address: warehouse.address,
    }
    setLoading(true)
    try {
      const response = await api.put(`/api/v1/warehouse/update/${warehousing._id}`, {
        ...formData,
        byReceived: email,
      })
      if (response.data.success) {
        const updatedItem = response.data.data
        const warehouse = warehouses.find((w) => w._id === updatedItem.warehouse)
        updatedItem.warehouse = warehouse // Add warehouse details to the updated item
        showSuccess(response.data.message)
        onUpdateItem(response.data.data)
        setTimeout(() => {
          setSuccess(null)
          setVisible(false)
        }, 2000)
      }
    } catch (error) {
      setError(error.response.data.message)
      showErrors(error.response.data.message)
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
    setLoading(false)
  }

  return (
    <>
      <CButton color="primary" variant="outline" className="me-2" onClick={() => setVisible(true)}>
        {loading ? <CSpinner size="sm" /> : <FontAwesomeIcon icon={faEdit} />}
      </CButton>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Recieved Items</CModalTitle>
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
              value={formData.warehouse || ''} // Add optional chaining and default to empty string
              required
            >
              <option value="">Select Warehouse</option> {/* Change null to empty string */}
              {warehouses.map((warehouse) => (
                <option key={warehouse._id} value={warehouse._id}>
                  {warehouse.warehouseName || ''}
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
            Update Item
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default UpdateItem
