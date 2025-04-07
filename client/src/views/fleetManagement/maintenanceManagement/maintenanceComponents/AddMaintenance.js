import React, { useState, useEffect } from 'react'
import api from '../../../../utils/api'
import { useToast } from '../../../../components/Toast/Toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CSpinner,
  CAlert,
  CInputGroup,
  CInputGroupText,
  CContainer,
  CHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardBody,
  CCardHeader,
  CFormSwitch,
} from '@coreui/react'
const AddMaintenance = ({ onAddMaintenance }) => {
  const { showError, showSuccess } = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [visible, setVisible] = useState(false)
  const [validated, setValidated] = useState(false)
  const [isAddingParts, setIsAddingParts] = useState(false)
  const initialState = {
    vehicle: '',
    maintenanceType: '',
    startDate: '',
    expectedEndDate: '',
    description: '',
    priority: '',
    category: '',
    checklist: [{ task: '', completed: false }],
    parts: [],
    requested: true,
    purchased: false,
  }
  const [formData, setFormData] = useState(initialState)
  const [vehicles, setVehicles] = useState([])
  const [currentPart, setCurrentPart] = useState({
    partName: '',
    quantity: '',
  })
  const today = new Date().toISOString().split('T')[0]
  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handlePartChange = (e) => {
    const { id, value } = e.target
    setCurrentPart((prev) => ({
      ...prev,
      [id.split('.')[1]]: value,
    }))
  }

  const handleAddPart = () => {
    // Add the new part to formData
    setFormData((prev) => ({
      ...prev,
      parts: [...prev.parts, { ...currentPart }],
    }))

    // Reset the current part inputs
    setCurrentPart({
      partName: '',
      quantity: '',
    })
  }

  // const handleAddPartsToggle = (value) => {
  //   setIsAddingParts(value)
  //   setFormData((prev) => ({
  //     ...prev,
  //     purchased: !value, // Set to true if not adding parts, false if adding parts
  //     parts: value ? prev.parts : [],
  //   }))
  // }

  useEffect(() => {
    const fechData = async () => {
      try {
        const response = await api.get('api/v1/vehicle/all')
        if (response.data.success) {
          setVehicles(response.data.data)
        }
      } catch (error) {
        setError(error)
        showError(error.message)
      }
    }
    fechData()
  }, [])

  const addChecklistItem = () => {
    setFormData((prev) => ({
      ...prev,
      checklist: [...prev.checklist, { task: '', completed: false }],
    }))
  }

  const handleRemovePart = (index) => {
    setFormData((prev) => ({
      ...prev,
      parts: prev.parts.filter((_, i) => i !== index),
    }))
  }

  const removeChecklistItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      checklist: prev.checklist.filter((_, i) => i !== index),
    }))
  }

  const updateChecklistItem = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      checklist: prev.checklist.map((item, i) => (i === index ? { ...item, task: value } : item)),
    }))
  }

  const maintenancePriorityOptions = [
    {
      label: 'High',
      value: 'High',
    },
    {
      label: 'Medium',
      value: 'Medium',
    },
    {
      label: 'Low',
      value: 'Low',
    },
    {
      label: 'Critical',
      value: 'Critical',
    },
  ]

  const maintenanceCategoryOptions = [
    {
      label: 'Engine',
      value: 'Engine',
    },
    {
      label: 'Transmission',
      value: 'Transmission',
    },
    {
      label: 'Brakes',
      value: 'Brakes',
    },
    {
      label: 'Electrical',
      value: 'Electrical',
    },
    {
      label: 'Tiers',
      value: 'Tiers',
    },
    {
      label: 'Other',
      value: 'Other',
    },
  ]
  const maintenanceTypeOptions = [
    {
      label: 'Preventive',
      value: 'PMS',
    },
    {
      label: 'Corrective',
      value: 'Corrective',
    },
    {
      label: 'Emergency',
      value: 'Emergency',
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    formData.parts.length === 0 ? (formData.purchased = true) : (formData.purchased = false)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      e.preDefault()
    } else {
      try {
        const response = await api.post('api/v1/maintenance/create', formData)
        if (response.data.success) {
          showSuccess(response.data.message)
          onAddMaintenance(response.data.data)
          setVisible(false)
        }
      } catch (error) {
        showError(error.response?.data?.message || error.message)
        setError(error.response?.data?.message || error.message)
        setTimeout(() => {
          setError(null)
        }, 2000)
      }
    }
    setValidated(true)
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
      <CButton color="primary" className="mb-3" variant="outline" onClick={() => setVisible(true)}>
        <NavIcon icon={faPlus} /> Add Maintenance
      </CButton>
      <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Add Maintenance</CModalTitle>
        </CModalHeader>
        {error && <CAlert color="danger">{error}</CAlert>}
        <CModalBody>
          <CForm className="row g-3 needs-validation" noValidate validated={validated}>
            <CInputGroup>
              <CFormSelect
                id="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                floatingLabel="Vehicle"
                placeholder="Select Vehicle"
                required
                feedbackInvalid="Please provide a valid vehicle."
              >
                <option value="">Select Vehicle</option>
                {vehicles
                  .filter(
                    (vehicle) => vehicle.status === 'in_use' || vehicle.status === 'available',
                  )
                  .map((vehicle) => (
                    <option key={vehicle._id} value={vehicle._id}>
                      {vehicle.brand} / {vehicle.model} / {vehicle.regisNumber}
                    </option>
                  ))}
              </CFormSelect>
              <CFormSelect
                id="maintenanceType"
                value={formData.maintenanceType}
                onChange={handleChange}
                floatingLabel="Maintenance Type"
                placeholder="Select Maintenance Type"
                required
                options={[
                  { label: 'Select Maintenance Type', value: '' },
                  ...maintenanceTypeOptions,
                ]}
                feedbackInvalid="Please provide a valid maintenance type."
              />
              <CFormInput
                id="description"
                type="text"
                floatingLabel="Description"
                placeholder="Description"
                required
                value={formData.description}
                onChange={handleChange}
                feedbackInvalid="Please provide a valid description."
              />
            </CInputGroup>

            <CInputGroup>
              <CFormInput
                id="startDate"
                type="date"
                floatingLabel="Start Date"
                placeholder="Start Date"
                required
                min={today}
                value={formData.startDate}
                onChange={handleChange}
                feedbackInvalid="Please provide a valid start date."
              />

              <CFormInput
                id="expectedEndDate"
                type="date"
                floatingLabel="Expected End Date"
                placeholder="Expected End Date"
                required
                min={today}
                value={formData.expectedEndDate}
                onChange={handleChange}
                feedbackInvalid="Please provide a valid expected end date."
              />

              <CFormSelect
                id="priority"
                value={formData.priority}
                onChange={handleChange}
                floatingLabel="Priority"
                placeholder="Select Priority"
                required
                feedbackInvalid="Please provide a valid priority."
              >
                <option value="">Select Priority</option>
                {maintenancePriorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>

              <CFormSelect
                id="category"
                value={formData.category}
                onChange={handleChange}
                floatingLabel="Category"
                placeholder="Select Category"
                required
                feedbackInvalid="Please provide a valid category."
              >
                <option value="">Select Category</option>
                {maintenanceCategoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
            </CInputGroup>

            <CCard className="mb-3">
              <CCardHeader>Add Parts</CCardHeader>
              <CCardBody>
                {/* <CFormSwitch
                  label="Add Parts"
                  id="addParts"
                  checked={isAddingParts}
                  className="mb-3"
                  onChange={(e) => handleAddPartsToggle(e.target.checked)}
                /> */}
                <CInputGroup className="mb-3">
                  <CFormInput
                    id="parts.partName"
                    type="text"
                    floatingLabel="Part Name"
                    placeholder="Part Name"
                    value={currentPart.partName}
                    onChange={handlePartChange}
                    required
                  />
                  <CFormInput
                    id="parts.quantity"
                    type="number"
                    floatingLabel="Quantity"
                    placeholder="Quantity"
                    value={currentPart.quantity}
                    onChange={handlePartChange}
                    required
                  />

                  <CButton color="primary" onClick={handleAddPart}>
                    Add Part
                  </CButton>
                </CInputGroup>

                {/* Display added parts */}
                {formData.parts.length > 0 && (
                  <CTable className="">
                    <CTableHead className="text-center">
                      <CTableRow>
                        <CTableHeaderCell>Part Name</CTableHeaderCell>
                        <CTableHeaderCell>Part Quantity</CTableHeaderCell>
                        <CTableHeaderCell>Remove Part</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody className="text-center">
                      {formData.parts.map((part, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell>{part.partName}</CTableDataCell>
                          <CTableDataCell>{part.quantity}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="danger"
                              size="sm"
                              onClick={() => handleRemovePart(index)}
                            >
                              Remove
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                )}
              </CCardBody>
            </CCard>
            <CContainer>
              <CHeader>Checklist Items</CHeader>
              <CButton color="primary" variant="outline" className="m-2" onClick={addChecklistItem}>
                Add Checklist Item
              </CButton>
              {formData.checklist.map((item, index) => (
                <CInputGroup className="mb-2" key={index}>
                  <CFormInput
                    value={item.task}
                    id="itemCheckList"
                    onChange={(e) => updateChecklistItem(index, e.target.value)}
                    placeholder="Enter checklist item"
                    required
                  />
                  <CButton
                    color="danger"
                    variant="outline"
                    onClick={() => removeChecklistItem(index)}
                  >
                    Remove
                  </CButton>
                </CInputGroup>
              ))}
            </CContainer>

            <CFormTextarea
              id="notes"
              floatingLabel="Notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleChange}
              autoComplete="off"
              style={{
                minHeight: '150px',
                width: '100%',
                resize: 'vertical',
              }}
              text=" leave empty if no notes."
              feedbackInvalid="Please provide a valid notes."
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" variant="outline" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" variant="outline" onClick={handleSubmit}>
            {loading ? <CSpinner size="sm" /> : 'Add Maintenance'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AddMaintenance
