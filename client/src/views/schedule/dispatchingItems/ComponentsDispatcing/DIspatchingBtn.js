import React, { useState, useEffect } from 'react'
import axios from 'axios'
import api from '../../../../utils/api'
import { useToast } from '../../../../components/Toast/Toast'
import {
  CButton,
  CModal,
  CModalFooter,
  CModalBody,
  CModalHeader,
  CForm,
  CFormSelect,
  CFormInput,
  CSpinner,
  CFormTextarea,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'

const DIspatchingBtn = ({ shipment = {}, onSuccess = () => {} }) => {
  const { showSuccess, showError } = useToast()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [vehicles, setVehicles] = useState([])
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [formData, setFormData] = useState({
    dispatch: 'Dispatching',
    shipping: {
      shipping_type: '',
      shipping_details: {
        destination_address: '',
        pickup_date: '',
        delivery_date: '',
        vehicle_type: '',
        destination_airport: '',
        preferred_departure_date: '',
        preferred_arrival_date: '',
        flight_type: '',
        loading_port: '',
        discharge_port: '',
        sailing_date: '',
        estimated_arrival_date: '',
        cargo_type: '',
      },
    },
    vehicle: {
      name: '',
      plate_no: '',
      driver_name: '',
    },
  })

  useEffect(() => {
    if (visible) {
      fetchAvailableVehicles()
    }
  }, [visible])

  const fetchAvailableVehicles = async () => {
    try {
      const response = await api.get('api/v1/vehicle')
      const availableVehicles = response.data.data.filter((vehicle) => vehicle.status === 'in_use')
      setVehicles(availableVehicles)
    } catch (error) {
      showError('Error fetching vehicles')
    }
  }

  const handleShippingTypeChange = (e) => {
    const newShippingType = e.target.value
    setFormData((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        shipping_type: newShippingType,
        shipping_details: {
          destination_address: '',
          pickup_date: '',
          delivery_date: '',
          vehicle_type: '',
          destination_airport: '',
          preferred_departure_date: '',
          preferred_arrival_date: '',
          flight_type: '',
          loading_port: '',
          discharge_port: '',
          sailing_date: '',
          estimated_arrival_date: '',
          cargo_type: '',
        },
      },
    }))
    setSelectedVehicle('')
  }

  const handleShippingDetailsChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        shipping_details: {
          ...prev.shipping.shipping_details,
          [id]: value,
        },
      },
    }))
  }

  const handleVehicleSelect = (e) => {
    const vehicle = vehicles.find((v) => v._id === e.target.value)
    if (vehicle) {
      setSelectedVehicle(e.target.value)
      setFormData((prev) => ({
        ...prev,
        vehicle: {
          name: vehicle.brand || '',
          plate_no: vehicle.regisNumber || '',
          driver_name: vehicle.assignedDriver?.driverName || '',
        },
        shipping: {
          ...prev.shipping,
          shipping_details: {
            ...prev.shipping.shipping_details,
            vehicle_type: vehicle.brand || '',
          },
        },
      }))
    }
  }
  const handleSubmit = async () => {
    setLoading(true)
    try {
      let shippingDetails = {}

      if (formData.shipping.shipping_type === 'land') {
        shippingDetails = {
          delivery_date: formData.shipping.shipping_details.delivery_date,
          vehicle_type: formData.vehicle.plate_no,
        }
      } else if (formData.shipping.shipping_type === 'air') {
        shippingDetails = {
          destination_airport: formData.shipping.shipping_details.destination_airport,
          preferred_departure_date: formData.shipping.shipping_details.preferred_departure_date,
          preferred_arrival_date: formData.shipping.shipping_details.preferred_arrival_date,
          flight_type: formData.shipping.shipping_details.flight_type,
          vehicle_type: formData.vehicle.plate_no,
        }
      } else if (formData.shipping.shipping_type === 'sea') {
        shippingDetails = {
          destination_address: formData.shipping.shipping_details.destination_address,
          loading_port: formData.shipping.shipping_details.loading_port,
          discharge_port: formData.shipping.shipping_details.discharge_port,
          sailing_date: formData.shipping.shipping_details.sailing_date,
          estimated_arrival_date: formData.shipping.shipping_details.estimated_arrival_date,
          cargo_type: formData.shipping.shipping_details.cargo_type,
          vehicle_type: formData.vehicle.plate_no,
        }
      }

      const payload = {
        dispatch: formData.dispatch,
        shipping: {
          shipping_type: formData.shipping.shipping_type,
          shipping_details: shippingDetails,
        },
        vehicle: formData.vehicle,
      }

      const response = await axios.put(
        `${import.meta.env.VITE_APP_API_URL_LOG2}api/v1/shipment/${shipment._id}`,
        payload,
      )

      if (response.data.success) {
        showSuccess('Shipment dispatched successfully')
        setVisible(false)
        onSuccess()
      }
    } catch (error) {
      showError(error.response?.data?.message || 'Error updating shipment')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      dispatch: 'Dispatching',
      shipping: {
        shipping_type: '',
        shipping_details: {
          destination_address: '',
          pickup_date: '',
          delivery_date: '',
          vehicle_type: '',
          destination_airport: '',
          preferred_departure_date: '',
          preferred_arrival_date: '',
          flight_type: '',
          loading_port: '',
          discharge_port: '',
          sailing_date: '',
          estimated_arrival_date: '',
          cargo_type: '',
        },
      },
      vehicle: {
        name: '',
        plate_no: '',
        driver_name: '',
      },
    })
    setSelectedVehicle('')
  }
  const today = new Date()

  const VehicleSelect = () => (
    <CFormSelect
      className="mb-3"
      label="Select Vehicle *"
      value={selectedVehicle}
      onChange={handleVehicleSelect}
    >
      <option value="">Choose a vehicle</option>
      {vehicles.map((vehicle) => (
        <option key={vehicle._id} value={vehicle._id}>
          {vehicle.brand} - {vehicle.regisNumber}{' '}
          {vehicle.assignedDriver
            ? `(Driver: ${vehicle.assignedDriver.driverName})`
            : '(No Driver)'}
        </option>
      ))}
    </CFormSelect>
  )
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
        onClick={() => setVisible(!visible)}
      >
        <NavIcon icon={faTruckFast} /> Dispatch
      </CButton>

      <CModal
        visible={visible}
        onClose={() => {
          setVisible(false)
          resetForm()
        }}
        size="lg"
      >
        <CModalHeader>Dispatch Shipment</CModalHeader>
        <CModalBody>
          <CForm>
            <CFormSelect
              className="mb-3"
              value={formData.shipping.shipping_type || ''}
              onChange={handleShippingTypeChange}
              label="Shipping Type *"
              required
            >
              <option value="">Select shipping type</option>
              <option value="land">Land</option>
              <option value="air">Air</option>
              <option value="sea">Sea</option>
            </CFormSelect>

            {formData.shipping.shipping_type && <VehicleSelect />}

            {formData.shipping.shipping_type === 'land' && (
              <div className="mb-3">
                <CFormInput
                  className="mb-3"
                  type="datetime-local"
                  id="delivery_date"
                  label="Delivery Date *"
                  min={today.toISOString().slice(0, 16)}
                  value={formData.shipping.shipping_details.delivery_date || ''}
                  onChange={handleShippingDetailsChange}
                  required
                />
              </div>
            )}

            {formData.shipping.shipping_type === 'air' && (
              <div className="mb-3">
                <CFormInput
                  className="mb-3"
                  type="text"
                  id="destination_airport"
                  label="Destination Airport *"
                  value={formData.shipping.shipping_details.destination_airport || ''}
                  onChange={handleShippingDetailsChange}
                  required
                />
                <CFormInput
                  className="mb-3"
                  type="datetime-local"
                  id="preferred_departure_date"
                  label="Preferred Departure Date *"
                  min={today.toISOString().slice(0, 16)}
                  value={formData.shipping.shipping_details.preferred_departure_date || ''}
                  onChange={handleShippingDetailsChange}
                  required
                />
                <CFormInput
                  className="mb-3"
                  type="datetime-local"
                  id="preferred_arrival_date"
                  label="Preferred Arrival Date *"
                  min={today.toISOString().slice(0, 16)}
                  value={formData.shipping.shipping_details.preferred_arrival_date || ''}
                  onChange={handleShippingDetailsChange}
                  required
                />
                <CFormTextarea
                  className="mb-3"
                  type="text"
                  id="flight_type"
                  label="Flight Details *"
                  placeholder="Flight Number, Airline, etc."
                  value={formData.shipping.shipping_details.flight_type || ''}
                  onChange={handleShippingDetailsChange}
                  required
                />
              </div>
            )}

            {formData.shipping.shipping_type === 'sea' && (
              <div className="mb-3">
                <CFormInput
                  className="mb-3"
                  type="text"
                  id="loading_port"
                  label="Loading Port *"
                  value={formData.shipping.shipping_details.loading_port || ''}
                  onChange={handleShippingDetailsChange}
                  required
                />
                <CFormInput
                  className="mb-3"
                  type="text"
                  id="destination_address"
                  label="Vessle Name *"
                  value={formData.shipping.shipping_details.destination_address || ''}
                  onChange={handleShippingDetailsChange}
                  required
                />
                <CFormInput
                  className="mb-3"
                  type="text"
                  id="discharge_port"
                  label="Discharge Port *"
                  value={formData.shipping.shipping_details.discharge_port || ''}
                  onChange={handleShippingDetailsChange}
                  required
                />
                <CFormInput
                  className="mb-3"
                  type="datetime-local"
                  id="sailing_date"
                  label="Sailing Date *"
                  min={today.toISOString().slice(0, 16)}
                  value={formData.shipping.shipping_details.sailing_date || ''}
                  onChange={handleShippingDetailsChange}
                  required
                />
                <CFormInput
                  className="mb-3"
                  type="datetime-local"
                  id="estimated_arrival_date"
                  label="Estimated Arrival Date *"
                  min={today.toISOString().slice(0, 16)}
                  value={formData.shipping.shipping_details.estimated_arrival_date || ''}
                  onChange={handleShippingDetailsChange}
                  required
                />
                <CFormInput
                  className="mb-3"
                  type="text"
                  id="cargo_type"
                  label="Cargo Type *"
                  value={formData.shipping.shipping_details.cargo_type || ''}
                  onChange={handleShippingDetailsChange}
                  required
                />
              </div>
            )}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false)
              resetForm()
            }}
          >
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? <CSpinner size="sm" /> : 'Dispatch Shipment'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default DIspatchingBtn
