import React, { useEffect, useState } from 'react'
import {
  CForm,
  CFormInput,
  CButton,
  CModal,
  CFormSelect,
  CInputGroup,
  CFormTextarea,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CSpinner,
  CAlert,
  CImage,
  CFormLabel,
  CInputGroupText,
} from '@coreui/react'
import api from '../../../../utils/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useToast } from '../../../../components/Toast/Toast'

const AddFuelLog = ({ onAddFuelog }) => {
  const { showSuccess, showError } = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [visible, setVisible] = useState(false)
  const [validated, setValidated] = useState(false)
  const [preview, setPreview] = useState(null)
  const [drivers, setDrivers] = useState([])
  const [vehicleOptions, setVehicleOptions] = useState([])
  const maxDate = new Date().toISOString().split('T')[0]
  const API_URL = import.meta.env.VITE_APP_API_URL
  const initialState = {
    vehicleId: '',
    driverId: '',
    // Fields to store the details even if vehicle is deleted
    vehicleDetails: {
      brand: '',
      model: '',
      regisNumber: '',
      fuelType: '',
    },
    // Fields to store the details even if driver is deleted
    driverDetails: {
      driverName: '',
    },
    // details fuel log
    date: '',
    receiptNumber: '',
    fuelQuantity: '',
    fuelType: '',
    costPerLiter: '',
    totalCost: '',
    currentMileage: '',
    receiptImage: null,
    // route details
    route: {
      start: '',
      end: '',
      distance: '',
    },
    notes: '',
    // Fuel efficiency calculations
    litersPer100km: '',
    kmPerLiter: '',
    mpg: '',
  }
  const [formData, setFormData] = useState(initialState)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true)
        const [driversResponse, vehiclesResponse] = await Promise.all([
          api.get('/api/v1/driver'),
          api.get('/api/v1/vehicle/in-use'),
        ])

        setDrivers(driversResponse.data.data)
        setVehicleOptions(vehiclesResponse.data.data)
      } catch (error) {
        showError('Error fetching initial data')
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  const handleChange = (e) => {
    const { id, value } = e.target

    if (id.includes('route.')) {
      const routeField = id.split('.')[1]
      setFormData((prevData) => {
        const newData = {
          ...prevData,
          route: {
            ...prevData.route,
            [routeField]: value,
          },
        }

        // Calculate fuel efficiency when both distance and fuel quantity are available
        if (newData.route.distance && newData.fuelQuantity) {
          const distance = parseFloat(newData.route.distance)
          const fuelQuantity = parseFloat(newData.fuelQuantity)

          if (distance > 0 && fuelQuantity > 0) {
            // L/100km calculation
            const litersPer100km = (fuelQuantity / distance) * 100
            newData.litersPer100km = litersPer100km.toFixed(2)

            // km/L calculation
            const kmPerLiter = distance / fuelQuantity
            newData.kmPerLiter = kmPerLiter.toFixed(2)

            // MPG calculation
            const gallons = fuelQuantity * 0.264172
            const miles = distance * 0.621371
            const mpg = miles / gallons
            newData.mpg = mpg.toFixed(2)
          }
        }

        return newData
      })
    } else if (id === 'vehicleId') {
      const selectedVehicle = vehicleOptions.find((vehicle) => vehicle._id === value)
      const driverDetails = drivers.find((driver) => driver._id === selectedVehicle?.assignedDriver)

      setFormData((prevData) => ({
        ...prevData,
        vehicleId: value,
        driverId: selectedVehicle?.assignedDriver || '',
        // Store all vehicle details
        vehicleDetails: {
          brand: selectedVehicle?.brand || '',
          model: selectedVehicle?.model || '',
          regisNumber: selectedVehicle?.regisNumber || '',
          fuelType: selectedVehicle?.fuelType || '',
        },
        // Store driver details
        driverDetails: {
          driverName: driverDetails?.driverName || '',
        },
        currentMileage: selectedVehicle?.currentMileage || '',
        fuelType: selectedVehicle?.fuelType || '',
      }))
    } else if (id === 'fuelQuantity' || id === 'costPerLiter') {
      setFormData((prevData) => {
        const newData = {
          ...prevData,
          [id]: value,
        }

        // Calculate total cost whenever fuelQuantity or costPerLiter changes
        const quantity =
          id === 'fuelQuantity' ? parseFloat(value) : parseFloat(prevData.fuelQuantity)
        const costPerLiter =
          id === 'costPerLiter' ? parseFloat(value) : parseFloat(prevData.costPerLiter)

        if (!isNaN(quantity) && !isNaN(costPerLiter)) {
          newData.totalCost = (quantity * costPerLiter).toFixed(2)
        }

        // Calculate fuel efficiency when both distance and fuel quantity are available
        if (id === 'fuelQuantity' && newData.route.distance) {
          const distance = parseFloat(newData.route.distance)
          const fuelQuantity = parseFloat(value)

          if (distance > 0 && fuelQuantity > 0) {
            // L/100km calculation
            const litersPer100km = (fuelQuantity / distance) * 100
            newData.litersPer100km = litersPer100km.toFixed(2)

            // km/L calculation
            const kmPerLiter = distance / fuelQuantity
            newData.kmPerLiter = kmPerLiter.toFixed(2)

            // MPG calculation
            const gallons = fuelQuantity * 0.264172
            const miles = distance * 0.621371
            const mpg = miles / gallons
            newData.mpg = mpg.toFixed(2)
          }
        }

        return newData
      })
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }))
    }
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        receiptImage: file,
      }))
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    // Get the form element from the event
    const form = e.currentTarget

    // Check form validity
    if (form.checkValidity() === false) {
      setValidated(true)
      return
    }
    setLoading(true)
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('vehicleId', formData.vehicleId)
      formDataToSend.append('driverId', formData.driverId)

      // Append vehicle details
      formDataToSend.append('vehicleDetails[brand]', formData.vehicleDetails.brand)
      formDataToSend.append('vehicleDetails[model]', formData.vehicleDetails.model)
      formDataToSend.append('vehicleDetails[regisNumber]', formData.vehicleDetails.regisNumber)
      formDataToSend.append('vehicleDetails[fuelType]', formData.vehicleDetails.fuelType)

      // Append driver details
      formDataToSend.append('driverDetails[driverName]', formData.driverDetails.driverName)

      // Append other fuel log details
      formDataToSend.append('date', formData.date)
      formDataToSend.append('receiptNumber', formData.receiptNumber)
      formDataToSend.append('fuelQuantity', formData.fuelQuantity)
      formDataToSend.append('fuelType', formData.fuelType)
      formDataToSend.append('costPerLiter', formData.costPerLiter)
      formDataToSend.append('totalCost', formData.totalCost)
      formDataToSend.append('currentMileage', formData.currentMileage)
      formDataToSend.append('notes', formData.notes)
      formDataToSend.append('litersPer100km', formData.litersPer100km)
      formDataToSend.append('kmPerLiter', formData.kmPerLiter)
      formDataToSend.append('mpg', formData.mpg)

      // Append route details
      formDataToSend.append('route[start]', formData.route.start)
      formDataToSend.append('route[end]', formData.route.end)
      formDataToSend.append('route[distance]', formData.route.distance)

      // Append receipt image
      if (formData.receiptImage) {
        formDataToSend.append('receiptImage', formData.receiptImage)
      }

      const response = await api.post('/api/v1/fuelLogs/fuel-logs', formDataToSend)
      if (response.data.success) {
        onAddFuelog(response.data.data)
        showSuccess(response.data.message)
        setSuccess(response.data.message)
        setTimeout(() => {
          setSuccess(false)
          setFormData(initialState)
          setPreview(null)
          setVisible(false)
        }, 2000)
      }
    } catch (error) {
      showError(error.response.data.message)
      setError(error.response.data.message)
      setTimeout(() => {
        setError(null)
      }, 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <CButton
        color="primary"
        variant="outline"
        disabled={loading}
        onClick={() => setVisible(true)}
      >
        {loading ? <CSpinner color="primary" size="sm" /> : <FontAwesomeIcon icon={faPlus} />}
        Add Fuel Log
      </CButton>

      <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader>
          <CModalTitle>Add Fuel Log</CModalTitle>
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
            <CInputGroup>
              <CFormInput
                type="date"
                className="mb-3"
                floatingLabel="date"
                label="Receipt Number"
                id="date"
                max={maxDate}
                value={formData.date}
                onChange={handleChange}
                required
              />

              <CFormSelect
                className="mb-3"
                floatingLabel="Vehicle"
                label="Vehicle"
                id="vehicleId"
                value={formData.vehicleId}
                onChange={handleChange}
                required
              >
                <option value="">Select Vehicle</option>
                {vehicleOptions?.map((vehicle) => (
                  <option key={vehicle._id} value={vehicle._id}>
                    {`${vehicle.brand} / ${vehicle.model} / ${vehicle.regisNumber}`}
                  </option>
                ))}
              </CFormSelect>

              {/* Display driver name but keep driverId in formData */}
              <CFormInput
                className="mb-3"
                floatingLabel="Driver"
                label="Driver"
                id="driverId"
                value={drivers.find((driver) => driver._id === formData.driverId)?.driverName || ''}
                onChange={handleChange}
                disabled
              />

              <CFormSelect
                className="mb-3"
                floatingLabel="Fuel Type"
                label="Fuel Type"
                id="fuelType"
                required
                value={
                  vehicleOptions.find((vehicle) => vehicle._id === formData.vehicleId)?.fuelType ||
                  ''
                }
                onChange={handleChange}
                disabled
              >
                <option value="">Select Fuel Type</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
              </CFormSelect>
            </CInputGroup>
            <CInputGroup>
              <CFormInput
                className="mb-3"
                type="text"
                floatingLabel="Official Reciept"
                placeholder="Official Reciept"
                id="receiptNumber"
                value={formData.receiptNumber}
                onChange={handleChange}
                required
                autoComplete="off"
              />
              <CFormInput
                className="mb-3"
                type="number"
                floatingLabel="Fuel Quantity"
                placeholder="Fuel Quantity"
                id="fuelQuantity"
                value={formData.fuelQuantity}
                onChange={handleChange}
                required
                autoComplete="off"
                min="0"
                step="0.01"
                feedbackInvalid="Please enter a valid fuel quantity"
              />

              <CFormInput
                className="mb-3"
                type="number"
                floatingLabel="Cost Per Liter"
                placeholder="Cost Per Liter"
                id="costPerLiter"
                value={formData.costPerLiter}
                onChange={handleChange}
                autoComplete="off"
                feedbackInvalid="Please enter a valid cost per liter"
              />
              <CFormInput
                className="mb-3"
                type="number"
                floatingLabel="Total Cost"
                placeholder="Total Cost"
                id="totalCost"
                value={formData.totalCost}
                onChange={handleChange}
                autoComplete="off"
                min="0"
                step="0.01"
                disabled
                feedbackInvalid="Please enter a valid total cost"
              />
            </CInputGroup>
            <CInputGroup>
              <CFormInput
                className="mb-3"
                type="number"
                floatingLabel="Odometer Reading"
                placeholder="Odometer Reading"
                id="currentMileage"
                value={formData.currentMileage}
                onChange={handleChange}
                autoComplete="off"
                feedbackInvalid="Please enter a valid odometer reading"
              />
              <CFormInput
                className="mb-3"
                type="text"
                floatingLabel="Start Location"
                placeholder="Start Location"
                id="route.start"
                value={formData.route.start}
                onChange={handleChange}
                autoComplete="off"
                feedbackInvalid="Please enter a valid start location"
              />

              <CFormInput
                className="mb-3"
                type="text"
                floatingLabel="End Location"
                placeholder="End Location"
                id="route.end"
                value={formData.route.end}
                onChange={handleChange}
                autoComplete="off"
                feedbackInvalid="Please enter a valid end location"
              />

              <CFormInput
                className="mb-3"
                type="number"
                floatingLabel="Distance/kilometers"
                placeholder="Distance"
                id="route.distance"
                value={formData.route.distance}
                onChange={handleChange}
                autoComplete="off"
                feedbackInvalid="Please enter a valid distance"
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CFormInput
                type="text"
                floatingLabel="L/100km"
                placeholder="Liters per 100km"
                id="litersPer100km"
                value={formData.litersPer100km}
                disabled
              />
              <CFormInput
                type="text"
                floatingLabel="km/L"
                placeholder="Kilometers per Liter"
                id="kmPerLiter"
                value={formData.kmPerLiter}
                disabled
              />
              <CFormInput
                type="text"
                floatingLabel="MPG"
                placeholder="Miles per Gallon"
                id="mpg"
                value={formData.mpg}
                disabled
              />
            </CInputGroup>
            <CFormLabel htmlFor="receipt">Picture Of Receipts</CFormLabel>
            <CInputGroup className="mb-3">
              <CFormInput type="file" id="receipt" accept="images/*" onChange={handlePhotoChange} />
            </CInputGroup>
            {preview && (
              <div className="mb-3">
                <CImage
                  src={preview}
                  rounded
                  align="center"
                  alt="Receipts"
                  width={200}
                  height={200}
                />
              </div>
            )}

            <CFormTextarea
              className="mb-3"
              type="text"
              floatingLabel="Notes"
              placeholder="Notes"
              rows={3}
              id="notes"
              value={formData.notes}
              autoCapitalize="on"
              autoComplete="off"
              onChange={handleChange}
              feedbackInvalid="Please enter a valid notes"
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? <CSpinner color="primary" size="sm" /> : 'Add'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AddFuelLog
