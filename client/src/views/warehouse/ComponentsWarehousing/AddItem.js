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
  CRow,
  CCol,
} from '@coreui/react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_APP_API_URL
const api = axios.create({
  baseURL: API_URL,
})

const AddItem = ({ onAddItem }) => {
  const [success, setSuccess] = useState(false)
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState('')
  const categories = [
    { label: 'General Merchandise', value: 'generalMerchandise' },
    { label: 'Perishables', value: 'perishables' },
    { label: 'Hazardous Materials', value: 'hazardousMaterials' },
    { label: 'High-Value Goods', value: 'highValueGoods' },
    { label: 'Oversized/Heavy Goods', value: 'oversizedHeavy' },
  ]

  const [warehouses, setWarehouses] = useState([])
  const today = new Date().toISOString().split('T')[0]
  const [formData, setFormData] = useState({
    name: '',
    from: '',
    itemName: '',
    quantity: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    dateArrival: today,
    category: '',
  })

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
      return {
        ...prevData,
        [id]: value,
      }
    })
  }

  useEffect(() => {
    // Fetch warehouses
    const fetchWarehouses = async () => {
      try {
        const response = await api.get('/api/v1/warehouseLoc/locations')
        setWarehouses(response.data.data)
      } catch (error) {
        setError(error.response.data.message)
      }
    }
    fetchWarehouses()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = sessionStorage.getItem('email')
    if (!email) {
      setError('User email not found. Please log in again.')
      return
    }

    try {
      const response = await api.post('/api/v1/warehouse/addItem', {
        ...formData,
        byReceived: email,
      })
      if (response.status === 201) {
        const newItem = response.data.data
        const warehouse = warehouses.find((w) => w._id === newItem.warehouse)
        newItem.warehouse = warehouse // Add warehouse details to the new item
        setSuccess(response.data.message)
        onAddItem(response.data.data)
        setFormData({
          name: '',
          from: '',
          itemName: '',
          quantity: '',
          weight: '',
          length: '',
          width: '',
          height: '',
          dateArrival: today,
          category: '',
          warehouse: '',
        })
      } else {
        setError(response.data.message || 'An unexpected error occurred')
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message)
    }
  }

  return (
    <>
      <CButton color="primary" variant="outline" onClick={() => setVisible(true)}>
        <FontAwesomeIcon icon={faPlus} /> Recieved Items
      </CButton>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Recieved Items</CModalTitle>
        </CModalHeader>
        {error && <CAlert color="danger">{error}</CAlert>}
        {success && <CAlert color="success">{success}</CAlert>}
        <CModalBody>
          <CForm>
            <CCol className="mb-3">
              <CFormInput
                type="text"
                placeholder="Name / Company Name"
                className="mb-3"
                floatingLabel="Name / Company Name"
                id="name"
                onChange={handleChange}
                value={formData.name}
                required
                autoComplete="off"
              />
              <CFormInput
                type="text"
                placeholder="From"
                className="mb-3"
                floatingLabel="From"
                id="from"
                onChange={handleChange}
                value={formData.from}
                required
              />
              <CFormInput
                type="text"
                placeholder="Item Name"
                className="mb-3"
                floatingLabel="Item Name"
                id="itemName"
                onChange={handleChange}
                value={formData.itemName}
                required
              />
              <CFormInput
                type="number"
                placeholder="Quantity"
                className="mb-3"
                floatingLabel="Quantity"
                id="quantity"
                onChange={handleChange}
                value={formData.quantity}
                required
              />
              <CFormInput
                type="number"
                placeholder="Weight"
                className="mb-3"
                floatingLabel="Weight"
                id="weight"
                onChange={handleChange}
                value={formData.weight}
                required
              />
              <CRow className="justify-content-center">
                <CCol xs="auto">
                  <CFormInput
                    type="number"
                    placeholder="Length"
                    className="mb-3"
                    floatingLabel="Length"
                    id="length"
                    min={1}
                    onChange={handleChange}
                    value={formData.length}
                    required
                  />
                </CCol>
                <CCol xs="auto">
                  <CFormInput
                    type="number"
                    placeholder="Width"
                    className="mb-3"
                    floatingLabel="Width"
                    id="width"
                    min={1}
                    onChange={handleChange}
                    value={formData.width}
                    required
                  />
                </CCol>
                <CCol xs="auto">
                  <CFormInput
                    type="number"
                    placeholder="Height"
                    className="mb-3 w-5"
                    floatingLabel="Height"
                    id="height"
                    min={1}
                    onChange={handleChange}
                    value={formData.height}
                    required
                  />
                </CCol>
                <CCol xs="auto">
                  <CFormInput
                    type="text"
                    placeholder="Dimension"
                    className="mb-3"
                    floatingLabel="Dimension"
                    id="dimension"
                    value={`${formData.length}x${formData.width}x${formData.height} cm`}
                    disabled
                    required
                  />
                </CCol>
              </CRow>
              <CFormInput
                type="date"
                placeholder="Date of Arrival"
                className="mb-3"
                floatingLabel="Date of Arrival"
                id="dateArrival"
                onChange={handleChange}
                value={formData.dateArrival}
                min={today}
                required
                disabled
              />
              <CFormSelect
                placeholder="Category"
                className="mb-3"
                floatingLabel="Category"
                id="category"
                onChange={handleChange}
                value={formData.category}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </CFormSelect>
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
            </CCol>
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
