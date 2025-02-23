// import React, { useState, useEffect } from 'react'
// import {
//   CModal,
//   CModalHeader,
//   CModalBody,
//   CModalFooter,
//   CButton,
//   CForm,
//   CFormInput,
//   CFormSelect,
//   CSpinner,
//   CFormLabel,
//   CInputGroup,
//   CInputGroupText,
// } from '@coreui/react'
// // import { toast } from 'react-toastify'
// import api from '../../../../utils/api'

// const UpdateFuelLog = ({ fuelLog, visible, onClose, onUpdate, vehicles, drivers }) => {
//   const [loading, setLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     date: '',
//     receiptNumber: '',
//     vehicleId: '',
//     driverId: '',
//     fuelQuantity: '',
//     costPerLiter: '',
//     totalCost: '',
//     route: {
//       startLocation: '',
//       endLocation: '',
//       distance: '',
//     },
//     litersPer100km: '',
//     kmPerLiter: '',
//     mpg: '',
//     notes: '',
//     receiptImage: null,
//   })
//   const [validated, setValidated] = useState(false)

//   useEffect(() => {
//     if (fuelLog) {
//       setFormData({
//         date: new Date(fuelLog.date).toISOString().split('T')[0],
//         receiptNumber: fuelLog.receiptNumber,
//         vehicleId: fuelLog.vehicleId._id || fuelLog.vehicleId,
//         driverId: fuelLog.driverId._id || fuelLog.driverId,
//         fuelQuantity: fuelLog.fuelQuantity,
//         costPerLiter: fuelLog.costPerLiter,
//         totalCost: fuelLog.totalCost,
//         route: {
//           startLocation: fuelLog.route.startLocation,
//           endLocation: fuelLog.route.endLocation,
//           distance: fuelLog.route.distance,
//         },
//         litersPer100km: fuelLog.litersPer100km,
//         kmPerLiter: fuelLog.kmPerLiter,
//         mpg: fuelLog.mpg,
//         notes: fuelLog.notes || '',
//       })
//     }
//   }, [fuelLog])

//   const handleChange = (e) => {
//     const { id, value } = e.target

//     if (id.includes('route.')) {
//       const routeField = id.split('.')[1]
//       setFormData((prevData) => ({
//         ...prevData,
//         route: {
//           ...prevData.route,
//           [routeField]: value,
//         },
//       }))
//     } else if (id === 'fuelQuantity' || id === 'costPerLiter') {
//       setFormData((prevData) => {
//         const newData = {
//           ...prevData,
//           [id]: value,
//         }

//         // Calculate total cost
//         if (id === 'fuelQuantity' && newData.costPerLiter) {
//           const quantity = parseFloat(value)
//           const cost = parseFloat(newData.costPerLiter)
//           newData.totalCost = (quantity * cost).toFixed(2)
//         } else if (id === 'costPerLiter' && newData.fuelQuantity) {
//           const quantity = parseFloat(newData.fuelQuantity)
//           const cost = parseFloat(value)
//           newData.totalCost = (quantity * cost).toFixed(2)
//         }

//         // Calculate fuel efficiency
//         if (newData.fuelQuantity && newData.route.distance) {
//           const distance = parseFloat(newData.route.distance)
//           const fuelQuantity = parseFloat(newData.fuelQuantity)

//           if (distance > 0 && fuelQuantity > 0) {
//             newData.litersPer100km = ((fuelQuantity / distance) * 100).toFixed(2)
//             newData.kmPerLiter = (distance / fuelQuantity).toFixed(2)
//             const gallons = fuelQuantity * 0.264172
//             const miles = distance * 0.621371
//             newData.mpg = (miles / gallons).toFixed(2)
//           }
//         }

//         return newData
//       })
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [id]: value,
//       }))
//     }
//   }

//   const handleFileChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       receiptImage: e.target.files[0],
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const form = e.currentTarget
//     if (!form.checkValidity()) {
//       e.stopPropagation()
//       setValidated(true)
//       return
//     }

//     setLoading(true)
//     try {
//       const formDataToSend = new FormData()

//       // Append all form fields
//       Object.keys(formData).forEach((key) => {
//         if (key === 'route') {
//           Object.keys(formData.route).forEach((routeKey) => {
//             formDataToSend.append(`route[${routeKey}]`, formData.route[routeKey])
//           })
//         } else if (key === 'receiptImage' && formData[key]) {
//           formDataToSend.append(key, formData[key])
//         } else {
//           formDataToSend.append(key, formData[key])
//         }
//       })

//       const response = await api.put(`/api/v1/fuelLogs/fuel-logs/${fuelLog._id}`, formDataToSend)

//       if (response.data.success) {
//         // toast.success('Fuel log updated successfully')
//         onUpdate(response.data.data)
//         onClose()
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Error updating fuel log')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <CModal visible={visible} onClose={onClose} size="lg" backdrop="static">
//       <CModalHeader closeButton>Update Fuel Log</CModalHeader>
//       <CModalBody>
//         <CForm
//           className="row g-3 needs-validation"
//           noValidate
//           validated={validated}
//           onSubmit={handleSubmit}
//         >
//           <div className="col-md-6">
//             <CFormLabel>Date</CFormLabel>
//             <CFormInput
//               type="date"
//               id="date"
//               value={formData.date}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="col-md-6">
//             <CFormLabel>Receipt Number</CFormLabel>
//             <CFormInput
//               type="text"
//               id="receiptNumber"
//               value={formData.receiptNumber}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="col-md-6">
//             <CFormLabel>Vehicle</CFormLabel>
//             <CFormSelect id="vehicleId" value={formData.vehicleId} onChange={handleChange} required>
//               <option value="">Select Vehicle</option>
//               {vehicles.map((vehicle) => (
//                 <option key={vehicle._id} value={vehicle._id}>
//                   {`${vehicle.brand} ${vehicle.model} (${vehicle.regisNumber})`}
//                 </option>
//               ))}
//             </CFormSelect>
//           </div>

//           <div className="col-md-6">
//             <CFormLabel>Driver</CFormLabel>
//             <CFormSelect id="driverId" value={formData.driverId} onChange={handleChange} required>
//               <option value="">Select Driver</option>
//               {drivers.map((driver) => (
//                 <option key={driver._id} value={driver._id}>
//                   {driver.driverName}
//                 </option>
//               ))}
//             </CFormSelect>
//           </div>

//           <div className="col-md-6">
//             <CFormLabel>Fuel Quantity (L)</CFormLabel>
//             <CFormInput
//               type="number"
//               id="fuelQuantity"
//               value={formData.fuelQuantity}
//               onChange={handleChange}
//               required
//               min="0"
//               step="0.01"
//             />
//           </div>

//           <div className="col-md-6">
//             <CFormLabel>Cost per Liter</CFormLabel>
//             <CInputGroup>
//               <CInputGroupText>$</CInputGroupText>
//               <CFormInput
//                 type="number"
//                 id="costPerLiter"
//                 value={formData.costPerLiter}
//                 onChange={handleChange}
//                 required
//                 min="0"
//                 step="0.01"
//               />
//             </CInputGroup>
//           </div>

//           <div className="col-md-6">
//             <CFormLabel>Total Cost</CFormLabel>
//             <CInputGroup>
//               <CInputGroupText>$</CInputGroupText>
//               <CFormInput type="number" id="totalCost" value={formData.totalCost} disabled />
//             </CInputGroup>
//           </div>

//           <div className="col-md-6">
//             <CFormLabel>Receipt Image</CFormLabel>
//             <CFormInput
//               type="file"
//               id="receiptImage"
//               onChange={handleFileChange}
//               accept="image/*"
//             />
//           </div>

//           <div className="col-md-12">
//             <CFormLabel>Route Information</CFormLabel>
//             <div className="row g-3">
//               <div className="col-md-4">
//                 <CFormInput
//                   type="text"
//                   id="route.startLocation"
//                   placeholder="Start Location"
//                   value={formData.route.startLocation}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-md-4">
//                 <CFormInput
//                   type="text"
//                   id="route.endLocation"
//                   placeholder="End Location"
//                   value={formData.route.endLocation}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-md-4">
//                 <CFormInput
//                   type="number"
//                   id="route.distance"
//                   placeholder="Distance (km)"
//                   value={formData.route.distance}
//                   onChange={handleChange}
//                   required
//                   min="0"
//                   step="0.1"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="col-md-12">
//             <CFormLabel>Notes</CFormLabel>
//             <CFormInput type="text" id="notes" value={formData.notes} onChange={handleChange} />
//           </div>
//         </CForm>
//       </CModalBody>
//       <CModalFooter>
//         <CButton color="secondary" onClick={onClose}>
//           Cancel
//         </CButton>
//         <CButton color="primary" onClick={handleSubmit} disabled={loading}>
//           {loading ? <CSpinner size="sm" /> : 'Update'}
//         </CButton>
//       </CModalFooter>
//     </CModal>
//   )
// }

// export default UpdateFuelLog

import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CSpinner,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CModalTitle,
  CImage,
  CAlert,
  CFormTextarea,
} from '@coreui/react'
import api from '../../../../utils/api'
import { useToast } from '../../../../components/Toast/Toast'

const UpdateFuelLog = ({ fuelLog, visible, onClose, onUpdate, vehicles, drivers }) => {
  const { showSuccess, showError } = useToast()
  const API_URL = import.meta.env.VITE_APP_API_URL
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(null)
  const [vehicleOptions, setVehicleOptions] = useState([])
  const [driverOptions, setDriverOptions] = useState([])
  const maxDate = new Date().toISOString().split('T')[0]
  const [formData, setFormData] = useState({
    date: new Date(fuelLog.date).toISOString().split('T')[0],
    receiptNumber: fuelLog.receiptNumber,
    vehicleId: fuelLog.vehicleId?._id || fuelLog.vehicleId,
    driverId: fuelLog.driverId?._id || fuelLog.driverId,
    vehicleDetails: {
      brand: fuelLog.vehicleId?.brand || fuelLog.vehicleDetails?.brand || '',
      model: fuelLog.vehicleId?.model || fuelLog.vehicleDetails?.model || '',
      regisNumber: fuelLog.vehicleId?.regisNumber || fuelLog.vehicleDetails?.regisNumber || '',
      fuelType: fuelLog.vehicleId?.fuelType || fuelLog.vehicleDetails?.fuelType || '',
    },
    driverDetails: {
      driverName: fuelLog.driverId?.driverName || fuelLog.driverDetails?.driverName || '',
    },
    fuelQuantity: fuelLog.fuelQuantity,
    costPerLiter: fuelLog.costPerLiter,
    totalCost: fuelLog.totalCost,
    currentMileage: fuelLog.currentMileage || '',
    fuelType: fuelLog.fuelType || '',
    route: {
      start: fuelLog.route.start,
      end: fuelLog.route.end,
      distance: fuelLog.route.distance,
    },
    litersPer100km: fuelLog.litersPer100km,
    kmPerLiter: fuelLog.kmPerLiter,
    mpg: fuelLog.mpg,
    notes: fuelLog.notes || '',
  })
  const [validated, setValidated] = useState(false)

  useEffect(() => {
    if (fuelLog?.receiptImage) {
      setPreview(`${API_URL}/uploads/receipts/${fuelLog.receiptImage}`)
    }
  }, [fuelLog])

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true)
        const [driversResponse, vehiclesResponse] = await Promise.all([
          api.get('/api/v1/driver'),
          api.get('/api/v1/vehicle/in-use'),
        ])

        setDriverOptions(driversResponse.data.data)
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
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        receiptImage: file,
      }))

      // Create preview URL for the new image
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setLoading(true)
    try {
      const formDataToSend = new FormData()

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (key === 'route') {
          Object.keys(formData.route).forEach((routeKey) => {
            formDataToSend.append(`route[${routeKey}]`, formData.route[routeKey])
          })
        } else if (key === 'vehicleDetails') {
          Object.keys(formData.vehicleDetails).forEach((detailKey) => {
            formDataToSend.append(
              `vehicleDetails[${detailKey}]`,
              formData.vehicleDetails[detailKey],
            )
          })
        } else if (key === 'driverDetails') {
          Object.keys(formData.driverDetails).forEach((detailKey) => {
            formDataToSend.append(`driverDetails[${detailKey}]`, formData.driverDetails[detailKey])
          })
        } else if (key === 'receiptImage' && formData[key]) {
          formDataToSend.append(key, formData[key])
        } else {
          formDataToSend.append(key, formData[key])
        }
      })

      const response = await api.put(`/api/v1/fuelLogs/fuel-logs/${fuelLog._id}`, formDataToSend)

      if (response.data.success) {
        showSuccess(response.data.message)
        onUpdate({
          ...response.data.data,
          vehicleId: {
            _id: formData.vehicleId,
            brand: formData.vehicleDetails.brand,
            model: formData.vehicleDetails.model,
            regisNumber: formData.vehicleDetails.regisNumber,
          },
          driverId: {
            _id: formData.driverId,
            driverName: formData.driverDetails.driverName,
          },
        })
        onClose()
      }
    } catch (error) {
      showError(error.response?.data?.message || 'Error updating fuel log')
      setError(error.response?.data?.message || 'Error updating fuel log')
    } finally {
      setLoading(false)
    }
  }

  const isVehicleDeleted = !vehicles.some((v) => v._id === formData.vehicleId)

  return (
    <CModal visible={visible} onClose={onClose} size="lg" backdrop="static">
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
            {' '}
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
              disabled={isVehicleDeleted}
            />
            <CFormSelect
              className="mb-3"
              floatingLabel="Vehicle"
              label="Vehicle"
              id="vehicleId"
              value={formData.vehicleId || ''}
              onChange={handleChange}
              required
              disabled
            >
              {vehicleOptions.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.brand} / {vehicle.model} / {vehicle.regisNumber}
                </option>
              ))}
              <option value="">
                {' '}
                {`${formData.vehicleDetails.brand} / ${formData.vehicleDetails.model} / ${formData.vehicleDetails.regisNumber} [DELETED]`}
              </option>
            </CFormSelect>
          </CInputGroup>

          <CInputGroup>
            <CFormInput
              className="mb-3"
              type="text"
              floatingLabel="Driver Name"
              placeholder="Driver Name"
              id="driverName"
              value={
                drivers.find((driver) => driver._id === formData.driverId)?.driverName ||
                `${formData.driverDetails.driverName} [DELETED]`
              }
              onChange={handleChange}
              disabled
            />

            <CFormSelect
              className="mb-3"
              floatingLabel="Fuel Type"
              label="Fuel Type"
              id="fuelType"
              required
              value={formData.fuelType || ''}
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
              disabled={isVehicleDeleted}
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
              disabled={isVehicleDeleted}
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
              disabled={isVehicleDeleted}
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
              disabled={isVehicleDeleted}
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
              disabled={isVehicleDeleted}
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
              disabled={isVehicleDeleted}
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
              min="0"
              step="0.01"
              feedbackInvalid="Please enter a valid distance"
              disabled={isVehicleDeleted}
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
            <CFormInput
              type="file"
              id="receipt"
              accept="images/*"
              onChange={handleFileChange}
              disabled={isVehicleDeleted}
            />
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
            disabled={isVehicleDeleted}
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
        <CButton color="primary" onClick={handleSubmit} disabled={loading || isVehicleDeleted}>
          {loading ? <CSpinner color="primary" size="sm" /> : 'Add'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default UpdateFuelLog
