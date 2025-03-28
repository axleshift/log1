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
  CFormSelect,
  CAlert,
  CModalFooter,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import api from '../../../utils/api'
import { useToast } from '../../../components/Toast/Toast'

const UpdateItem = ({ warehousing, onUpdateItem }) => {
  // Changed from item to warehousing
  const { showSuccess, showError } = useToast()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [warehouses, setWarehouses] = useState([])
  const [formData, setFormData] = useState({
    warehouse_id: '',
  })

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        setLoading(true)
        const response = await api.get('/api/v1/warehouseLoc/locations')
        setWarehouses(response.data.data || [])
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch warehouses')
        showError(error.response?.data?.message || 'Failed to fetch warehouses')
      } finally {
        setLoading(false)
      }
    }
    fetchWarehouses()
  }, [])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleUpdate = async () => {
    if (!warehousing?._id) {
      // Check if warehousing and _id exist
      showError('Invalid item ID')
      return
    }

    if (!formData.warehouse_id) {
      showError('Please select a warehouse')
      return
    }

    try {
      setLoading(true)
      const response = await axios.put(
        `${import.meta.env.VITE_APP_API_URL_LOG2}api/v1/purchaseOrder/${warehousing._id}`, // Using warehousing instead of item
        formData,
      )

      if (response.status === 200) {
        showSuccess('Warehouse location updated successfully')
        setVisible(false)
        if (onUpdateItem) {
          onUpdateItem(response.data.data)
        }
      }
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to update warehouse location')
      console.error('Error updating warehouse location:', error)
    } finally {
      setLoading(false)
    }
  }

  // Add debug logging
  useEffect(() => {
    console.log('Warehousing prop:', warehousing)
  }, [warehousing])

  return (
    <>
      <CButton
        color="primary"
        variant="outline"
        className="me-2"
        onClick={() => setVisible(true)}
        disabled={loading}
      >
        {loading ? <CSpinner size="sm" /> : <FontAwesomeIcon icon={faEdit} />}
      </CButton>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Update Warehouse Location</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {error && <CAlert color="danger">{error}</CAlert>}

          <CForm>
            <CFormSelect
              id="warehouse_id"
              floatingLabel="Select Warehouse"
              className="mb-3"
              value={formData.warehouse_id}
              onChange={handleChange}
              disabled={loading}
              required
            >
              <option value="">Choose a warehouse...</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse._id} value={warehouse._id}>
                  {warehouse.warehouseName} - {warehouse.address}
                </option>
              ))}
            </CFormSelect>
          </CForm>
        </CModalBody>

        <CModalFooter>
          <CButton
            color="secondary"
            variant="outline"
            onClick={() => setVisible(false)}
            disabled={loading}
          >
            Cancel
          </CButton>
          <CButton
            color="primary"
            variant="outline"
            onClick={handleUpdate}
            disabled={loading || !formData.warehouse_id}
          >
            {loading ? <CSpinner size="sm" /> : 'Update Location'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default UpdateItem
