// import React, { useState, useEffect } from 'react'
// import {
//   CFormCheck,
//   CModalFooter,
//   CModalHeader,
//   CModalTitle,
//   CModalBody,
//   CModal,
//   CCardBody,
//   CCard,
//   CButton,
//   CSpinner,
//   CCardHeader,
//   CForm,
//   CAlert,
// } from '@coreui/react'
// import axios from 'axios'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faListCheck } from '@fortawesome/free-solid-svg-icons'

// const AddMiantenanceCheckList = (props) => {
//   const API_URL = import.meta.env.VITE_APP_API_URL
//   const api = axios.create({
//     baseURL: API_URL,
//     withCredentials: true, // This is important for cookies
//   })
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [visible, setVisible] = useState(false)
//   const [checkList, setCheckList] = useState({
//     physical: {
//       cracks: false,
//       corrosion: false,
//       wear: false,
//       damage: false,
//     },
//     operational: {
//       noise: false,
//       leaks: false,
//       misalignment: false,
//       looseFasteners: false,
//     },
//     safety: {
//       guards: false,
//       emergencyStop: false,
//       lockoutTagout: false,
//       fireSafety: false,
//     },
//     mechanical: {
//       bearings: {
//         play: false,
//         overheating: false,
//         metalShavings: false,
//       },
//       belts: {
//         tension: false,
//         wear: false,
//         damage: false,
//       },
//       motors: {
//         noise: false,
//         overheating: false,
//         looseConnections: false,
//       },
//     },
//     electrical: {
//       wiring: {
//         insulation: false,
//         termination: false,
//         overheating: false,
//       },
//       controlPanels: {
//         functionality: false,
//         labeling: false,
//         damage: false,
//       },
//     },
//     fluidSystems: {
//       lubrication: {
//         oilLevel: false,
//         lubrication: false,
//         cleanliness: false,
//       },
//       hydraulicFluid: {
//         level: false,
//         condition: false,
//         filter: false,
//       },
//     },
//     documents: {
//       registration: false,
//       insurance: false,
//     },
//   })

//   const handleSubmit = async () => {
//     setError(null) // Clear any previous errors
//     setLoading(true)
//     try {
//       setLoading(true)
//       const response = await api.put(`/api/v1/maintenance/inspection/${props.item._id}`, checkList)
//       if (response.status === 200) {
//         alert('Maintenance Inspection updated successfully')
//         setVisible(false) // Close modal after success
//         if (props.onUpdate) {
//           props.onUpdate() // Call parent update function if provided
//         }
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || 'An error occurred')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleCheckChange = (event) => {
//     const { name, checked } = event.target
//     setCheckList((prevCheckList) => {
//       // Split the name into parts (e.g., "physical.cracks" -> ["physical", "cracks"])
//       const parts = name.split('.')

//       // Create a new object to avoid mutating state directly
//       const newCheckList = { ...prevCheckList }

//       // Handle nested objects
//       let current = newCheckList
//       for (let i = 0; i < parts.length - 1; i++) {
//         current = current[parts[i]]
//       }
//       current[parts[parts.length - 1]] = checked

//       return newCheckList
//     })
//   }

//   return (
//     <>
//       {loading ? (
//         <CSpinner color="primary" size="sm" />
//       ) : (
//         <CButton
//           color="primary"
//           className="me-2"
//           variant="outline"
//           onClick={() => setVisible(!visible)}
//         >
//           <FontAwesomeIcon icon={faListCheck} />
//         </CButton>
//       )}
//       <CModal visible={visible} onClose={() => setVisible(false)}>
//         <CModalHeader>
//           <CModalTitle>Maintenance Check List</CModalTitle>
//         </CModalHeader>
//         {error && <CAlert color="danger">{error}</CAlert>}
//         <CModalBody>
//           <CForm>
//             <CCard>
//               <CCardHeader>Physical</CCardHeader>
//               <CCardBody>
//                 <CFormCheck
//                   type="checkbox"
//                   name="physical.cracks"
//                   checked={checkList.physical.cracks}
//                   onChange={handleCheckChange}
//                   label="Cracks"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="physical.corrosion"
//                   checked={checkList.physical.corrosion}
//                   onChange={handleCheckChange}
//                   label="Corrosion"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="physical.wear"
//                   checked={checkList.physical.wear}
//                   onChange={handleCheckChange}
//                   label="Wear"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="physical.damage"
//                   checked={checkList.physical.damage}
//                   onChange={handleCheckChange}
//                   label="Damage"
//                 />
//               </CCardBody>
//               <CCardHeader>Operational</CCardHeader>
//               <CCardBody>
//                 <CFormCheck
//                   type="checkbox"
//                   name="operational.noise"
//                   checked={checkList.operational.noise}
//                   onChange={handleCheckChange}
//                   label="Noise"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="operational.leaks"
//                   checked={checkList.operational.leaks}
//                   onChange={handleCheckChange}
//                   label="Leaks"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="operational.misalignment"
//                   checked={checkList.operational.misalignment}
//                   onChange={handleCheckChange}
//                   label="Misalignment"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="operational.looseFasteners"
//                   checked={checkList.operational.looseFasteners}
//                   onChange={handleCheckChange}
//                   label="Loose Fasteners"
//                 />
//               </CCardBody>
//               <CCardHeader>Safety</CCardHeader>
//               <CCardBody>
//                 <CFormCheck
//                   type="checkbox"
//                   name="safety.guards"
//                   checked={checkList.safety.guards}
//                   onChange={handleCheckChange}
//                   label="Guards"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="safety.emergencyStop"
//                   checked={checkList.safety.emergencyStop}
//                   onChange={handleCheckChange}
//                   label="Emergency Stop"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="safety.lockoutTagout"
//                   checked={checkList.safety.lockoutTagout}
//                   onChange={handleCheckChange}
//                   label="Lockout/Tagout"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="safety.fireSafety"
//                   checked={checkList.safety.fireSafety}
//                   onChange={handleCheckChange}
//                   label="Fire Safety"
//                 />
//               </CCardBody>
//               <CCardHeader>Mechanical</CCardHeader>
//               <CCardBody>
//                 <CFormCheck
//                   type="checkbox"
//                   name="mechanical.bearings.play"
//                   checked={checkList.mechanical.bearings.play}
//                   onChange={handleCheckChange}
//                   label="Condition"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="mechanical.bearings.overheating"
//                   checked={checkList.mechanical.bearings.overheating}
//                   onChange={handleCheckChange}
//                   label="Overheating"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="mechanical.bearings.metalShavings"
//                   checked={checkList.mechanical.bearings.metalShavings}
//                   onChange={handleCheckChange}
//                   label="Metal Shavings"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="mechanical.belts.tension"
//                   checked={checkList.mechanical.belts.tension}
//                   onChange={handleCheckChange}
//                   label="Tension"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="mechanical.belts.wear"
//                   checked={checkList.mechanical.belts.wear}
//                   onChange={handleCheckChange}
//                   label="Wear"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="mechanical.belts.damage"
//                   checked={checkList.mechanical.belts.damage}
//                   onChange={handleCheckChange}
//                   label="Damage"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="mechanical.motors.noise"
//                   checked={checkList.mechanical.motors.noise}
//                   onChange={handleCheckChange}
//                   label="Noise"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="mechanical.motors.overheating"
//                   checked={checkList.mechanical.motors.overheating}
//                   onChange={handleCheckChange}
//                   label="Overheating"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="mechanical.motors.looseConnections"
//                   checked={checkList.mechanical.motors.looseConnections}
//                   onChange={handleCheckChange}
//                   label="Loose Connections"
//                 />
//               </CCardBody>
//               <CCardHeader>Electrical</CCardHeader>
//               <CCardBody>
//                 <CFormCheck
//                   type="checkbox"
//                   name="electrical.wiring.insulation"
//                   checked={checkList.electrical.wiring.insulation}
//                   onChange={handleCheckChange}
//                   label="Insulation"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="electrical.wiring.termination"
//                   checked={checkList.electrical.wiring.termination}
//                   onChange={handleCheckChange}
//                   label="Termination"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="electrical.wiring.overheating"
//                   checked={checkList.electrical.wiring.overheating}
//                   onChange={handleCheckChange}
//                   label="Overheating"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="electrical.controlPanels.functionality"
//                   checked={checkList.electrical.controlPanels.functionality}
//                   onChange={handleCheckChange}
//                   label="Functionality"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="electrical.controlPanels.labeling"
//                   checked={checkList.electrical.controlPanels.labeling}
//                   onChange={handleCheckChange}
//                   label="Labeling"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="electrical.controlPanels.overheating"
//                   checked={checkList.electrical.controlPanels.overheating}
//                   onChange={handleCheckChange}
//                   label="Overheating"
//                 />
//               </CCardBody>
//               <CCardHeader>Fluid Systems</CCardHeader>
//               <CCardBody>
//                 <CFormCheck
//                   type="checkbox"
//                   name="fluidSystems.lubrication.oilLevel"
//                   checked={checkList.fluidSystems.lubrication.oilLevel}
//                   onChange={handleCheckChange}
//                   label="Oil Level"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="fluidSystems.lubrication.lubrication"
//                   checked={checkList.fluidSystems.lubrication.lubrication}
//                   onChange={handleCheckChange}
//                   label="Lubrication"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="fluidSystems.lubrication.cleanliness"
//                   checked={checkList.fluidSystems.lubrication.cleanliness}
//                   onChange={handleCheckChange}
//                   label="Cleanliness"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="fluidSystems.hydraulicFluid.level"
//                   checked={checkList.fluidSystems.hydraulicFluid.level}
//                   onChange={handleCheckChange}
//                   label="Level"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="fluidSystems.hydraulicFluid.condition"
//                   checked={checkList.fluidSystems.hydraulicFluid.condition}
//                   onChange={handleCheckChange}
//                   label="Condition"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="fluidSystems.hydraulicFluid.filter"
//                   checked={checkList.fluidSystems.hydraulicFluid.filter}
//                   onChange={handleCheckChange}
//                   label="Filter"
//                 />
//               </CCardBody>
//               <CCardHeader>Documents</CCardHeader>
//               <CCardBody>
//                 <CFormCheck
//                   type="checkbox"
//                   name="documents.registration"
//                   checked={checkList.documents.registration}
//                   onChange={handleCheckChange}
//                   label="Registration"
//                 />
//                 <CFormCheck
//                   type="checkbox"
//                   name="documents.insurance"
//                   checked={checkList.documents.insurance}
//                   onChange={handleCheckChange}
//                   label="Insurance"
//                 />
//               </CCardBody>
//             </CCard>
//           </CForm>
//         </CModalBody>
//         <CModalFooter>
//           <CButton
//             color="secondary"
//             variant="outline"
//             disabled={loading}
//             onClick={() => setVisible(false)}
//           >
//             {loading ? <CSpinner color="primary" size="sm" /> : 'Close'}
//           </CButton>
//           <CButton color="primary" variant="outline" onClick={handleSubmit}>
//             {loading ? <CSpinner color="primary" size="sm" /> : 'Save'}
//           </CButton>
//         </CModalFooter>
//       </CModal>
//     </>
//   )
// }

// export default AddMiantenanceCheckList

import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormCheck,
  CAlert,
  CSpinner,
  CFormTextarea,
} from '@coreui/react'
import PropTypes from 'prop-types'
import axios from 'axios'

const AddMaintenanceCheckList = ({ item, visible, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isScheduledDateMet, setIsScheduledDateMet] = useState(false)
  const API_URL = import.meta.env.VITE_APP_API_URL
  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  })
  const [checkList, setCheckList] = useState({
    visualInspection: {
      physical: {
        cracks: false,
        corrosion: false,
        wear: false,
        damage: false,
      },
      operational: {
        noise: false,
        leaks: false,
        misalignment: false,
        looseFasteners: false,
      },
      safety: {
        guards: false,
        emergencyStop: false,
        lockoutTagout: false,
        fireSafety: false,
      },
      mechanical: {
        bearings: {
          play: false,
          overheating: false,
          metalShavings: false,
        },
        belts: {
          tension: false,
          wear: false,
          damage: false,
        },
        motors: {
          noise: false,
          overheating: false,
          looseConnections: false,
        },
      },
      electrical: {
        wiring: {
          insulation: false,
          termination: false,
          overheating: false,
        },
        controlPanels: {
          functionality: false,
          labeling: false,
          damage: false,
        },
      },
      fluidSystems: {
        lubrication: {
          oilLevel: false,
          lubrication: false,
          cleanliness: false,
        },
        hydraulicFluid: {
          level: false,
          condition: false,
          filter: false,
        },
      },
      documents: {
        registration: false,
        insurance: false,
      },
    },
    notes: '',
  })

  useEffect(() => {
    // Check if scheduled date is met
    const checkScheduledDate = () => {
      if (item?.scheduledDate) {
        const currentDate = new Date()
        const scheduledDate = new Date(item.scheduledDate)
        setIsScheduledDateMet(currentDate >= scheduledDate)
      }
    }
    checkScheduledDate()
    // Set up interval to check every minute
    const interval = setInterval(checkScheduledDate, 60000)

    return () => clearInterval(interval)
  }, [item])

  useEffect(() => {
    if (item && item.visualInspection) {
      setCheckList({ visualInspection: item.visualInspection })
    }
  }, [item])

  const handleCheckChange = (event) => {
    if (!isScheduledDateMet) {
      setError('Cannot update inspection before scheduled date')
      return
    }

    const { name, checked } = event.target
    setCheckList((prevState) => {
      const newState = { ...prevState }
      const path = name.split('.')
      let current = newState

      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]]
      }

      current[path[path.length - 1]] = checked
      return newState
    })
  }

  const handleSubmit = async () => {
    if (!item?._id) {
      setError('Invalid item ID')
      return
    }

    try {
      setLoading(true)
      setError(null)
      setSuccess(null)

      console.log('Sending data:', {
        inspectionId: item._id,
        checkList: checkList,
      })

      const response = await api.put(`/api/v1/maintenance/inspection/${item._id}`, checkList)

      if (response.status === 200) {
        setSuccess('Maintenance checklist updated successfully')
        if (onUpdate) {
          onUpdate()
        }
        setTimeout(() => {
          onClose()
        }, 2000)
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while updating the checklist')
    } finally {
      setLoading(false)
    }
  }

  const renderCheckboxes = (obj, parentKey = '') => {
    return Object.entries(obj).map(([key, value]) => {
      const currentKey = parentKey ? `${parentKey}.${key}` : key

      if (typeof value === 'object' && value !== null) {
        return (
          <div key={currentKey} className="ms-3">
            <h6 className="text-capitalize">{key}</h6>
            {renderCheckboxes(value, currentKey)}
          </div>
        )
      }

      return (
        <CFormCheck
          key={currentKey}
          id={currentKey}
          label={key.charAt(0).toUpperCase() + key.slice(1)}
          name={currentKey}
          checked={value}
          onChange={handleCheckChange}
          disabled={!isScheduledDateMet}
        />
      )
    })
  }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Maintenance Check List</CModalTitle>
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

      {!isScheduledDateMet && (
        <CAlert color="warning" className="m-3">
          This inspection cannot be updated until{' '}
          {new Date(item?.scheduledDate).toLocaleDateString()}
        </CAlert>
      )}

      <CModalBody>
        <CForm>{renderCheckboxes(checkList.visualInspection, 'visualInspection')}</CForm>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
        <CButton color="primary" onClick={handleSubmit} disabled={loading || !isScheduledDateMet}>
          {loading ? (
            <>
              <CSpinner size="sm" className="me-2" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

AddMaintenanceCheckList.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    visualInspection: PropTypes.object,
  }),
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
}

export default AddMaintenanceCheckList
