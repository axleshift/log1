// import React, { useState } from 'react'
// import {
//   CButton,
//   CModal,
//   CModalHeader,
//   CModalTitle,
//   CModalBody,
//   CModalFooter,
//   CForm,
//   CFormInput,
//   CAlert,
//   CSpinner,
// } from '@coreui/react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus } from '@fortawesome/free-solid-svg-icons'
// import api from '../../../utils/api'
// import { useToast } from '../../../components/Toast/Toast'
// const AddWarehouseLoc = ({ onAddWarehouseLoc }) => {
//   const { showSuccess, showError } = useToast()
//   const [validated, setValidated] = useState(false)
//   const [visible, setVisible] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)
//   const initialState = {
//     warehouseName: '',
//     address: '',
//   }
//   const [formData, setFormData] = useState(initialState)

//   const handleChange = (e) => {
//     const { id, value } = e.target
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }))
//   }

//   const handleSubmit = async (e) => {
//     const form = e.currentTarget
//     const isValid = form.checkValidity()
//     if (!isValid) {
//       e.preventDefault()
//       e.stopPropagation()
//     }
//     setValidated(isValid)
//     if (isValid) {
//       const user = JSON.parse(sessionStorage.getItem('user'))
//       const email = user.email
//       if (!email) {
//         setError('User email not found. Please log in again.')
//         return
//       }
//       setLoading(true)
//       try {
//         const response = await api.post('api/v1/warehouseLoc/add', {
//           ...formData,
//           createdBy: email,
//         })
//         if (response.data.success) {
//           showSuccess(response.data.message)
//           onAddWarehouseLoc(response.data.data)
//           setTimeout(() => {
//             setLoading(false)
//             setVisible(false)
//             setError(null)
//             setFormData(initialState)
//             setValidated(false)
//           }, 2000)
//         }
//       } catch (error) {
//         setError(error.response.data.message)
//         showError(error.response.data.message)
//         setTimeout(() => {
//           setError(null)
//         }, 2000)
//       }
//       setLoading(false)
//     }
//   }

//   const NavIcon = ({ icon }) => {
//     const [isHovering, setIsHovering] = useState(false)

//     return (
//       <FontAwesomeIcon
//         icon={icon}
//         bounce={isHovering}
//         onMouseEnter={() => setIsHovering(true)}
//         onMouseLeave={() => setIsHovering(false)}
//       />
//     )
//   }

//   return (
//     <>
//       {loading ? (
//         <CSpinner color="primary" size="sm" />
//       ) : (
//         <>
//           <CButton
//             color="primary"
//             variant="outline"
//             disabled={loading}
//             onClick={() => setVisible(true)}
//           >
//             {loading ? <CSpinner color="secondary" size="sm" /> : <NavIcon icon={faPlus} />} Add
//             Warehouse Location
//           </CButton>
//           <CModal visible={visible} onClose={() => setVisible(false)}>
//             <CModalHeader closeButton>
//               <CModalTitle>Add Warehouse Location</CModalTitle>
//             </CModalHeader>
//             {error && (
//               <CAlert color="danger" className="m-3">
//                 {error}
//               </CAlert>
//             )}
//             {success && (
//               <CAlert color="success" className="m-3">
//                 {success}
//               </CAlert>
//             )}
//             <CModalBody>
//               <CForm noValidate validated={validated}>
//                 <CFormInput
//                   type="text"
//                   id="warehouseName"
//                   className="mb-3"
//                   placeholder="Warehouse Name"
//                   floatingLabel="Warehouse Name"
//                   onChange={handleChange}
//                   value={formData.warehouseName}
//                   autoComplete="off"
//                   required
//                   feedbackInvalid="Please enter a warehouse name" // Add this for validation message
//                   feedbackValid="Looks good!" // Add this for validation message
//                 />
//                 <CFormInput
//                   type="text"
//                   id="address"
//                   className="mb-3"
//                   placeholder="Address"
//                   floatingLabel="Address"
//                   onChange={handleChange}
//                   value={formData.address}
//                   autoComplete="off"
//                   required
//                   feedbackInvalid="Please enter an address" // Add this for validation message
//                   feedbackValid="Looks good!" // Add this for validation message
//                 />
//               </CForm>
//             </CModalBody>
//             <CModalFooter>
//               <CButton
//                 color="secondary"
//                 variant="outline"
//                 disabled={loading}
//                 onClick={() => {
//                   setVisible(false)
//                   setFormData(initialState)
//                   setVisible(false)
//                   setError(null)
//                   setValidated(false)
//                 }}
//               >
//                 {loading ? <CSpinner color="secondary" size="sm" /> : 'Cancel'}
//               </CButton>
//               <CButton color="primary" variant="outline" disabled={loading} onClick={handleSubmit}>
//                 {loading ? <CSpinner color="primary" size="sm" /> : 'Add'}
//               </CButton>
//             </CModalFooter>
//           </CModal>
//         </>
//       )}
//     </>
//   )
// }

// export default AddWarehouseLoc

import React, { useState } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
  CSpinner,
  CAlert,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import api from '../../../utils/api'
import { useToast } from '../../../components/Toast/Toast'

const AddWarehouseLoc = ({ onAddWarehouseLoc }) => {
  const { showSuccess, showError } = useToast()
  const [visible, setVisible] = useState(false)
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const initialState = {
    warehouseName: '',
    address: '',
    capacity: {
      totalSpace: 0,
      availableSpace: 0,
      unit: 'sqft',
    },
  }

  const [formData, setFormData] = useState(initialState)

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
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
      const user = JSON.parse(sessionStorage.getItem('user'))
      const response = await api.post('api/v1/warehouseLoc/add', {
        ...formData,
        createdBy: user.email,
      })

      if (response.data.success) {
        showSuccess(response.data.message)
        onAddWarehouseLoc(response.data.data)
        setVisible(false)
        setFormData(initialState)
        setValidated(false)
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred')
      showError(error.response?.data?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <CButton color="primary" onClick={() => setVisible(true)}>
        <FontAwesomeIcon icon={faPlus} /> Add Warehouse
      </CButton>

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="AddWarehouseModal"
      >
        <CModalHeader closeButton>
          <CModalTitle>Add New Warehouse</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {error && <CAlert color="danger">{error}</CAlert>}

          <CForm noValidate validated={validated}>
            <CFormInput
              type="text"
              id="warehouseName"
              className="mb-3"
              placeholder="Warehouse Name"
              floatingLabel="Warehouse Name"
              onChange={handleChange}
              value={formData.warehouseName}
              required
              feedbackInvalid="Please enter a warehouse name"
            />

            <CFormInput
              type="text"
              id="address"
              className="mb-3"
              placeholder="Address"
              floatingLabel="Address"
              onChange={handleChange}
              value={formData.address}
              required
              feedbackInvalid="Please enter an address"
            />
          </CForm>
        </CModalBody>

        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false)
              setFormData(initialState)
              setError(null)
              setValidated(false)
            }}
          >
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? <CSpinner size="sm" /> : 'Save'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AddWarehouseLoc
