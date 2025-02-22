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
  CImage,
} from '@coreui/react'
// import { toast } from 'react-toastify'
import api from '../../../../utils/api'

const UpdateFuelLog = ({ fuelLog, visible, onClose, onUpdate, vehicles, drivers }) => {
  const API_URL = import.meta.env.VITE_APP_API_URL
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [formData, setFormData] = useState({
    date: '',
    receiptNumber: '',
    vehicleId: '',
    driverId: '',
    fuelQuantity: '',
    costPerLiter: '',
    totalCost: '',
    odometerReading: '',
    route: {
      start: '', // Changed from startLocation
      end: '', // Changed from endLocation
      distance: '',
    },
    litersPer100km: '',
    kmPerLiter: '',
    mpg: '',
    notes: '',
    receiptImage: null,
  })
  const [validated, setValidated] = useState(false)

  useEffect(() => {
    if (fuelLog) {
      setFormData({
        date: new Date(fuelLog.date).toISOString().split('T')[0],
        receiptNumber: fuelLog.receiptNumber,
        vehicleId: fuelLog.vehicleId._id || fuelLog.vehicleId,
        driverId: fuelLog.driverId._id || fuelLog.driverId,
        fuelQuantity: fuelLog.fuelQuantity,
        costPerLiter: fuelLog.costPerLiter,
        totalCost: fuelLog.totalCost,
        odometerReading: fuelLog.odometerReading,
        route: {
          start: fuelLog.route.start, // Changed from startLocation
          end: fuelLog.route.end, // Changed from endLocation
          distance: fuelLog.route.distance,
        },
        litersPer100km: fuelLog.litersPer100km,
        kmPerLiter: fuelLog.kmPerLiter,
        mpg: fuelLog.mpg,
        notes: fuelLog.notes || '',
      })

      // Set initial image preview if receipt exists
      if (fuelLog.receiptImage) {
        setPreview(`${API_URL}/uploads/receipts/${fuelLog.receiptImage}`)
      }
    }
  }, [fuelLog])

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
        fuelType: selectedVehicle?.fuelType || '',
        driverName: driverDetails?.name || '',
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
        } else if (key === 'receiptImage' && formData[key]) {
          formDataToSend.append(key, formData[key])
        } else {
          formDataToSend.append(key, formData[key])
        }
      })

      const response = await api.put(`/api/v1/fuelLogs/fuel-logs/${fuelLog._id}`, formDataToSend)

      if (response.data.success) {
        // toast.success('Fuel log updated successfully')
        onUpdate(response.data.data)
        onClose()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating fuel log')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CModal visible={visible} onClose={onClose} size="lg" backdrop="static">
      <CModalHeader closeButton>Update Fuel Log</CModalHeader>
      <CModalBody>
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <div className="col-md-6">
            <CFormLabel htmlFor="date">Date</CFormLabel>
            <CFormInput
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <CFormLabel htmlFor="receiptNumber">Receipt Number</CFormLabel>
            <CFormInput
              type="text"
              id="receiptNumber"
              value={formData.receiptNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <CFormLabel htmlFor="vehicleId">Vehicle</CFormLabel>
            <CFormSelect id="vehicleId" value={formData.vehicleId} onChange={handleChange} required>
              <option value="">Select Vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>
                  {`${vehicle.brand} ${vehicle.model} (${vehicle.regisNumber})`}
                </option>
              ))}
            </CFormSelect>
          </div>

          <div className="col-md-6">
            <CFormLabel htmlFor="driverId">Driver</CFormLabel>
            <CFormSelect id="driverId" value={formData.driverId} onChange={handleChange} required>
              <option value="">Select Driver</option>
              {drivers.map((driver) => (
                <option key={driver._id} value={driver._id}>
                  {driver.driverName}
                </option>
              ))}
            </CFormSelect>
          </div>

          <div className="col-md-6">
            <CFormLabel htmlFor="fuelQuantity">Fuel Quantity (L)</CFormLabel>
            <CFormInput
              type="number"
              id="fuelQuantity"
              value={formData.fuelQuantity}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="col-md-6">
            <CFormLabel htmlFor="costPerLiter">Cost per Liter</CFormLabel>
            <CFormInput
              type="number"
              id="costPerLiter"
              value={formData.costPerLiter}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="col-md-6">
            <CFormLabel htmlFor="totalCost">Total Cost</CFormLabel>

            <CInputGroup>
              <CFormInput type="number" id="totalCost" value={formData.totalCost} disabled />
            </CInputGroup>
          </div>
          <div className="col-md-6">
            <CFormLabel htmlFor="odometerReading">Odometer Reading</CFormLabel>
            <CInputGroup>
              <CFormInput type="number" id="odometerReading" value={formData.odometerReading} />
            </CInputGroup>
          </div>

          <div className="col-md-12">
            <CFormLabel htmlFor="route.start">Route Information</CFormLabel>
            <div className="row g-3">
              <div className="col-md-4">
                <CFormLabel htmlFor="route.start">Start Location</CFormLabel>
                <CFormInput
                  type="text"
                  id="route.start" // Changed from route.startLocation
                  placeholder="Start Location"
                  value={formData.route.start} // Changed from startLocation
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <CFormLabel htmlFor="route.end">End Location</CFormLabel>
                <CFormInput
                  type="text"
                  id="route.end" // Changed from route.endLocation
                  placeholder="End Location"
                  value={formData.route.end} // Changed from endLocation
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <CFormLabel htmlFor="route.distance">Distance (km)</CFormLabel>
                <CFormInput
                  type="number"
                  id="route.distance"
                  placeholder="Distance (km)"
                  value={formData.route.distance}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row g-3">
              <div className="col-md-4">
                <CFormLabel htmlFor="litersPer100km">Liters per 100 km</CFormLabel>
                <CInputGroup>
                  <CFormInput
                    type="number"
                    id="litersPer100km"
                    value={formData.litersPer100km}
                    disabled
                  />
                </CInputGroup>
              </div>

              <div className="col-md-4">
                <CFormLabel htmlFor="kmPerLiter">Km per Liter</CFormLabel>
                <CInputGroup>
                  <CFormInput type="number" id="kmPerLiter" value={formData.kmPerLiter} disabled />
                </CInputGroup>
              </div>

              <div className="col-md-4">
                <CFormLabel htmlFor="mpg">MPG</CFormLabel>
                <CInputGroup>
                  <CFormInput type="number" id="mpg" value={formData.mpg} disabled />
                </CInputGroup>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <CFormLabel htmlFor="receiptImage">Receipt Image</CFormLabel>
            <CFormInput
              type="file"
              id="receiptImage"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="col-md-12 text-center">
              <CImage
                id="receipt-preview"
                name="receipt-preview"
                src={preview}
                alt="Receipt Preview"
                rounded
                align="center"
                width={200}
                height={200}
              />
            </div>
          )}

          <div className="col-md-12">
            <CFormLabel htmlFor="notes">Notes</CFormLabel>
            <CFormInput type="text" id="notes" value={formData.notes} onChange={handleChange} />
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? <CSpinner size="sm" /> : 'Update'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default UpdateFuelLog
