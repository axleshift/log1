import React, { useState, useEffect } from 'react'
import { useToast } from '../../../../components/Toast/Toast'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CSpinner,
  CButton,
  CForm,
  CFormSelect,
  CFormInput,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import api from './../../../../utils/api'
import PropTypes from 'prop-types'

const AddReceiving = ({ shipment = {}, onSuccess = () => {} }) => {
  const { showError, showSuccess } = useToast()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [vehicles, setVehicles] = useState([])
  const [warehouses, setWarehouses] = useState([]) // Add warehouses state
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [selectedWarehouse, setSelectedWarehouse] = useState(null) // Add selected warehouse state
  const [form, setForm] = useState({
    items: 0,
    amount: 0,
  })

  // Fetch vehicles when modal opens
  const fetchVehicles = async () => {
    try {
      const response = await api.get('api/v1/vehicle')
      setVehicles(response.data.data || [])
    } catch (error) {
      showError('Error fetching vehicles')
    }
  }

  // Add function to fetch warehouses
  const fetchWarehouses = async () => {
    try {
      const response = await api.get('api/v1/warehouseLoc/locations')
      setWarehouses(response.data.data || [])
    } catch (error) {
      showError('Error fetching warehouse locations')
    }
  }

  const handleOpenModal = () => {
    setShowModal(true)
    fetchVehicles()
    fetchWarehouses() // Fetch warehouses when modal opens
    setForm({
      items: 0,
      amount: 0,
    })
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedVehicle(null)
    setSelectedWarehouse(null) // Reset selected warehouse
    setForm({
      items: 0,
      amount: 0,
    })
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    if (!selectedVehicle) {
      showError('Please select a vehicle')
      return
    }

    if (!selectedWarehouse) {
      showError('Please select a warehouse location')
      return
    }

    setLoading(true)
    try {
      const updateData = {
        // isInWarehouse: false,

        items: parseInt(form.items),
        // amount: parseFloat(form.amount),
        type: 'public',
        warehouse_id: selectedWarehouse._id, // Add warehouse_id
        warehouse_name: selectedWarehouse.warehouseName, // Optionally add warehouse name
        vehicle: {
          name: selectedVehicle.brand + ' ' + selectedVehicle.model,
          plate_no: selectedVehicle.regisNumber,
          driver_name: selectedVehicle.assignedDriver?.driverName || 'No Driver Assigned',
        },
      }

      const response = await api.put(
        `${import.meta.env.VITE_APP_API_URL_LOG2}api/v1/shipment/${shipment._id}`,
        updateData,
      )

      if (response.status === 200) {
        showSuccess('Successfully updated warehouse status')
        handleCloseModal()
        if (onSuccess) onSuccess()
      }
    } catch (error) {
      showError(error?.response?.data?.message || 'Error updating warehouse status')
    } finally {
      setLoading(false)
    }
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
        color="primary"
        variant="outline"
        className="mb-3"
        onClick={handleOpenModal}
        disabled={shipment?.isInWarehouse}
      >
        <NavIcon icon={faWarehouse} /> Warehouse
      </CButton>

      <CModal visible={showModal} onClose={handleCloseModal} backdrop="static">
        <CModalHeader closeButton>
          <h5>Update Warehouse Status</h5>
        </CModalHeader>
        <CModalBody>
          <div className="mb-3">
            <CFormInput
              id="tracking_id"
              label="Tracking ID"
              type="text"
              className="form-control mb-3"
              floatingLabel="Tracking ID"
              value={shipment?.tracking_id || ''}
              disabled
            />

            {/* Add Warehouse Location Select */}

            <CFormSelect
              className="mb-3"
              id="warehouse_id"
              label="Select Warehouse Location"
              floatingLabel="Select Warehouse Location"
              value={selectedWarehouse?._id || ''}
              onChange={(e) => {
                const warehouse = warehouses.find((w) => w._id === e.target.value)
                setSelectedWarehouse(warehouse)
              }}
            >
              <option value="">Choose a warehouse location...</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse._id} value={warehouse._id}>
                  {warehouse.warehouseName} - {warehouse.address}
                </option>
              ))}
            </CFormSelect>

            <CFormSelect
              className="form-select mb-3"
              id="vehicle_id"
              label="Select Vehicle"
              floatingLabel="Select Vehicle"
              value={selectedVehicle?._id || ''}
              onChange={(e) => {
                const vehicle = vehicles.find((v) => v._id === e.target.value)
                setSelectedVehicle(vehicle)
              }}
            >
              <option value="">Choose a vehicle...</option>
              {vehicles
                .filter((vehicle) => vehicle.status === 'in_use')
                .map((vehicle) => (
                  <option key={vehicle._id} value={vehicle._id}>
                    {vehicle.brand} {vehicle.model} - {vehicle.regisNumber}
                    {vehicle.assignedDriver
                      ? ` (Driver: ${vehicle.assignedDriver.driverName})`
                      : ' (No Driver)'}
                  </option>
                ))}
            </CFormSelect>

            {/* <CFormInput
              type="number"
              id="items"
              label="Number of Items"
              floatingLabel="Number of Items"
              className=" mb-3"
              name="items"
              value={form.items}
              onChange={handleFormChange}
              min="0"
            /> */}

            {/* <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              name="amount"
              value={form.amount}
              onChange={handleFormChange}
              min="0"
              step="0.01"
              disabled={shipment?.paid === 'Paid'}
            /> */}
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            variant="outline"
            onClick={handleCloseModal}
            disabled={loading}
          >
            Cancel
          </CButton>

          <CButton
            color="primary"
            variant="outline"
            onClick={handleSubmit}
            disabled={loading || !selectedVehicle || !selectedWarehouse}
          >
            {loading ? (
              <>
                <CSpinner size="sm" className="me-2" />
                Updating...
              </>
            ) : (
              'Update Status'
            )}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AddReceiving
