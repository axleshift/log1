import React, { useState } from 'react'
import axios from 'axios'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CAlert,
  CSpinner,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const API = import.meta.env.VITE_APP_API_URL
const api = axios.create({
  baseURL: API,
})
const AddWarehouseLoc = ({ onAddWarehouseLoc }) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [formData, setFormData] = useState({
    warehouseName: '',
    address: '',
  })
  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = sessionStorage.getItem('email')
    if (!email) {
      setError('User email not found. Please log in again.')
      return
    }
    setLoading(true)
    try {
      const response = await api.post('/api/v1/warehouseLoc/add', {
        ...formData,
        createdBy: email,
      })
      if (response.status === 201) {
        setSuccess(response.data.message)
        onAddWarehouseLoc(response.data.data)
        setTimeout(() => {
          setSuccess(null)
          setVisible(false)
        }, 2000)
        setFormData({
          warehouseName: '',
          address: '',
        })
      }
    } catch (error) {
      setError(error.response.data.message)
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
    setLoading(false)
  }

  return (
    <>
      <CButton color="primary" variant="outline" onClick={() => setVisible(true)}>
        {loading ? <CSpinner color="secondary" size="sm" /> : <FontAwesomeIcon icon={faPlus} />} Add
        Warehouse Location
      </CButton>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Add Warehouse Location</CModalTitle>
        </CModalHeader>
        {error && <CAlert color="danger">{error}</CAlert>}
        {success && <CAlert color="success">{success}</CAlert>}
        <CModalBody>
          <CForm>
            <CFormInput
              type="text"
              id="warehouseName"
              className="mb-3"
              placeholder="Warehouse Name"
              floatingLabel="Warehouse Name"
              onChange={handleChange}
              value={formData.warehouseName}
            />
            <CFormInput
              type="text"
              id="address"
              className="mb-3"
              placeholder="Address"
              floatingLabel="Address"
              onChange={handleChange}
              value={formData.address}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" variant="outline" onClick={() => setVisible(!visible)}>
            Cancel
          </CButton>
          <CButton color="primary" variant="outline" onClick={handleSubmit}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AddWarehouseLoc
