/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import {
  CContainer,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CCol,
  CDropdownToggle,
  CRow,
  CButton,
  CFormInput,
  CForm,
  CFormSelect,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModal,
  CModalTitle,
  CTab,
  CTableRow,
  CTableHeaderCell,
  CTable,
  CTableHead,
  CTableBody,
  CTableDataCell,
  CButtonGroup,
  CTableCaption,
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { Link } from 'react-router-dom'
import { useVehicleStore } from '../../../components/store/vehichle'
import VehicleTableUpdate from '../../../components/vehicleTable/VehicleTableUpdate'

function vehicleManagement() {
  const [visible, setVisible] = useState(false)
  const randomId = Math.floor(Math.random() * 10000000000).toString()
  const [newVehicle, setNewVehicle] = useState({
    id: randomId,
    brand: '',
    model: '',
    year: '',
    regisNumber: '',
    type: '',
    capacity: '',
  })

  const { createVehicle } = useVehicleStore()
  const handdleAddVehicle = async () => {
    const { success, message } = await createVehicle(newVehicle)
    console.log(success, message)

    setNewVehicle({
      id: randomId,
      brand: '',
      model: '',
      year: '',
      regisNumber: '',
      type: '',
      capacity: '',
    })
  }

  const { fetchVehicles, vehicle } = useVehicleStore()
  useEffect(() => {
    fetchVehicles()
  }, [fetchVehicles])
  console.log(vehicle)

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Vehicle Management</h1>
      <CContainer fluid>
        <CCol>
          <CButton
            color="primary"
            size="md"
            onClick={() => setVisible(!visible)}
            style={{
              margin: '10px',
            }}
          >
            <CIcon icon={cilPlus} size="md" space={2} style={{ marginRight: '5px' }} />
            Add
          </CButton>
          <CModal
            visible={visible}
            onClose={() => setVisible(false)}
            aria-labelledby="LiveDemoExampleLabel"
          >
            <CModalHeader>
              <CModalTitle id="LiveDemoExampleLabel">Adding Vehicle</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm>
                <CFormInput
                  id="floatingInput"
                  floatingLabel="Vehicle ID"
                  className="mb-3"
                  type="text"
                  placeholder="Enter ID"
                  required
                  style={{ width: '100%', marginBottom: '10px' }}
                  value={newVehicle.id}
                  onChange={(e) => setNewVehicle({ ...newVehicle, id: e.target.value })}
                  disabled
                />
                <CFormInput
                  id="floatingInput"
                  floatingLabel="Vehicle Brand"
                  floatingClassName="mb-3"
                  type="text"
                  placeholder="Enter brand"
                  text="Ex. Toyota/Nissan/Mitsubishi"
                  required
                  style={{ width: '100%', marginTop: '10px' }}
                  value={newVehicle.brand}
                  onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
                />
                <CFormInput
                  id="floatingInput"
                  floatingLabel="Vehicle Model"
                  floatingClassName="mb-3"
                  type="text"
                  placeholder="Enter model"
                  required
                  text="Ex. L-300/altis/avanza"
                  style={{ width: '100%', marginBottom: '10px' }}
                  value={newVehicle.model}
                  onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                />
                <CFormInput
                  id="floatingNumber"
                  floatingLabel="Vehicle Year"
                  floatingClassName="mb-3"
                  type="number"
                  required
                  min="1900"
                  max={new Date().getFullYear()}
                  style={{ width: '100%', marginBottom: '10px' }}
                  onChange={(e) => {
                    const year = parseInt(e.target.value)
                    if (year !== 1900 && year > new Date().getFullYear()) {
                      // Handle invalid input (e.g., show an error message or prevent the value from changing)
                      console.error('Invalid year: Must be 1900 or the current year.')
                      e.preventDefault() // Prevent the value from changing
                    } else {
                      setNewVehicle({ ...newVehicle, year: year })
                    }
                  }}
                />

                <CFormInput
                  id="floatingInput"
                  floatingLabel="Vehicle Registration Number"
                  floatingClassName="mb-3"
                  type="text"
                  required
                  placeholder="Enter Registration Number"
                  style={{ width: '100%', marginBottom: '10px' }}
                  value={newVehicle.regisNumber}
                  onChange={(e) => setNewVehicle({ ...newVehicle, regisNumber: e.target.value })}
                />

                <CFormSelect
                  id="floatingSelect"
                  floatingLabel="Vehicle Type"
                  floatingClassName="mb-3"
                  required
                  style={{ width: '100%', marginBottom: '10px' }}
                  value={newVehicle.type}
                  onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
                  options={[
                    'Select Vehicle Type',
                    { label: 'One', value: '1' },
                    { label: 'Two', value: '2' },
                    { label: 'Three', value: '3' },
                  ]}
                />

                <CFormInput
                  id="floatingInput"
                  floatingLabel="Vehicle Capacity"
                  floatingClassName="mb-3"
                  type="number"
                  label="Vehicle Capacity"
                  min={1}
                  required
                  placeholder="Enter Vehicle Capacity"
                  style={{ width: '100%', marginBottom: '10px' }}
                  value={newVehicle.capacity}
                  onChange={(e) => setNewVehicle({ ...newVehicle, capacity: e.target.value })}
                />
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton type="submit" color="primary" onClick={handdleAddVehicle}>
                Add Vehicle
              </CButton>
            </CModalFooter>
          </CModal>
        </CCol>
      </CContainer>
      {/* {vehicle.map((vehicle) => (
        <VehicleTable key={vehicle._id} vehicle={vehicle} />
      ))} */}

      <CContainer
        fluid
        style={{
          border: '1px solid black',
          height: '500px',
          overflowX: 'hidden',
        }}
      >
        <VehicleTableUpdate vehicle={vehicle} />
        {vehicle.length === 0 && (
          <CCol>
            <p
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              No Vehicles found&nbsp;{' '}
              <Link color="primary" onClick={() => setVisible(true)}>
                Add Vehicle
              </Link>
            </p>
          </CCol>
        )}
      </CContainer>

      {/* </CContainer> */}
    </div>
  )
}

export default vehicleManagement
