import React, { useState, useEffect } from 'react'
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
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const API = import.meta.env.VITE_APP_API_URL
const api = axios.create({
  baseURL: API,
})

const UpdateWarehouseLoc = ({ warehouseLoc, onUpdateWarehouseLoc }) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [formData, setFormData] = useState({
    warehouseName: warehouseLoc.warehouseName,
    address: warehouseLoc.address,
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
      const response = await api.put(`/api/v1/warehouseLoc/update/${warehouseLoc._id}`, {
        ...formData,
        createdBy: email,
      })
      if (response.status === 200) {
        setSuccess('Warehouse Location updated successfully')
        onUpdateWarehouseLoc(response.data.data)
        setTimeout(() => {
          setSuccess(null)
          setVisible(false)
        }, 2000)
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
      <CButton color="primary" variant="outline" onClick={() => setVisible(true)} className="me-2">
        {loading ? <CSpinner size="sm" /> : <FontAwesomeIcon icon={faEdit} />}
      </CButton>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Update Warehouse Location</CModalTitle>
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
          <CButton color="secondary" variant="outline" onClick={() => setVisible(false)}>
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

export default UpdateWarehouseLoc
