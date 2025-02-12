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
  const [validated, setValidated] = useState(false)
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
    const form = e.currentTarget
    const isValid = form.checkValidity()
    if (!isValid) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(isValid)
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
          setError(null)
          setValidated(false)
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
      <CButton
        color="primary"
        variant="outline"
        disabled={loading}
        onClick={() => setVisible(true)}
        className="me-2"
      >
        {loading ? <CSpinner size="sm" /> : <FontAwesomeIcon icon={faEdit} />}
      </CButton>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Update Warehouse Location</CModalTitle>
        </CModalHeader>
        {error && (
          <CAlert color="danger" className="m-3">
            {error}
          </CAlert>
        )}
        {success && (
          <CAlert color="success" className="m-3">
            {success}
          </CAlert>
        )}
        <CModalBody>
          <CForm noValidate validated={validated}>
            <CFormInput
              type="text"
              id="warehouseName"
              className="mb-3"
              placeholder="Warehouse Name"
              floatingLabel="Warehouse Name"
              onChange={handleChange}
              value={formData.warehouseName}
              autoComplete="off"
              required
              feedbackInvalid="Please enter a warehouse name."
              feedbackValid="Looks good!"
            />
            <CFormInput
              type="text"
              id="address"
              className="mb-3"
              placeholder="Address"
              floatingLabel="Address"
              onChange={handleChange}
              value={formData.address}
              autoComplete="off"
              required
              feedbackInvalid="Please enter an address."
              feedbackValid="Looks good!"
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            variant="outline"
            disabled={loading}
            onClick={() => {
              setVisible(false)
              setError(null)
              setValidated(false)
            }}
          >
            {loading ? <CSpinner size="sm" color="secondary" /> : 'Cancel'}
          </CButton>
          <CButton color="primary" variant="outline" disabled={loading} onClick={handleSubmit}>
            {loading ? <CSpinner size="sm" color="success" /> : 'Update'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default UpdateWarehouseLoc
