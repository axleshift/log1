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
  const [validated, setValidated] = useState(false)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const initialState = {
    warehouseName: '',
    address: '',
  }
  const [formData, setFormData] = useState(initialState)

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
    if (isValid) {
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
            setFormData(initialState)
            setVisible(false)
            setLoading(false)
            setError(null)
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
  }

  return (
    <>
      {loading ? (
        <CSpinner color="primary" size="sm" />
      ) : (
        <>
          <CButton
            color="primary"
            variant="outline"
            disabled={loading}
            onClick={() => setVisible(true)}
          >
            {loading ? <CSpinner color="secondary" size="sm" /> : <FontAwesomeIcon icon={faPlus} />}{' '}
            Add Warehouse Location
          </CButton>
          <CModal visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader closeButton>
              <CModalTitle>Add Warehouse Location</CModalTitle>
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
                  feedbackInvalid="Please enter a warehouse name" // Add this for validation message
                  feedbackValid="Looks good!" // Add this for validation message
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
                  feedbackInvalid="Please enter an address" // Add this for validation message
                  feedbackValid="Looks good!" // Add this for validation message
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
                  setFormData(initialState)
                  setVisible(false)
                  setError(null)
                  setValidated(false)
                }}
              >
                {loading ? <CSpinner color="secondary" size="sm" /> : 'Cancel'}
              </CButton>
              <CButton color="primary" variant="outline" disabled={loading} onClick={handleSubmit}>
                {loading ? <CSpinner color="primary" size="sm" /> : 'Add'}
              </CButton>
            </CModalFooter>
          </CModal>
        </>
      )}
    </>
  )
}

export default AddWarehouseLoc
