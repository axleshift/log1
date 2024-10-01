/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import {
  CButtonGroup,
  CButton,
  CContainer,
  CTable,
  CModalFooter,
  CModalBody,
  CModalHeader,
  CModal,
  CModalTitle,
  CFormInput,
  CForm,
  CFormSelect,
} from '@coreui/react'
import { useVehicleStore } from '../../components/store/vehichle'
import { useState } from 'react'
// the whole table of vehicles with 2 buttons for update and delete
const VehicleTableUpdate = ({ vehicle }) => {
  // geting the delete vehicle function from the store.js
  const [updatedVehicle, setUpdatedVehicle] = useState(vehicle) // Initialize with first vehicle or empty object

  const { deleteVehicle, updateVehicle } = useVehicleStore()

  // delete vehicle button
  const handleDeleteVehicle = async (vid) => {
    const { success, message } = await deleteVehicle(vid)
    if (!success) {
      alert(message)
    } else {
      alert(message)
    }
  }
  const [visible, setVisible] = useState(false)
  const handleUpdateVehicle = async (vid, updatedVehicle) => {
    const { success, message } = await updateVehicle(updatedVehicle._id, updatedVehicle)
    // onClose()
    if (!success) {
      alert(message)
    } else {
      setVisible(false)
    }
    // console.log('eto ung vid', vid)
    // console.log('ito ung updatedVehicle', updatedVehicle)
  }

  // table columns is may header itmes is my data from backend
  const columns = [
    {
      key: 'idNum',
      label: 'ID',
      _props: { scope: 'col', color: 'light' },
    },
    {
      key: 'brand',
      label: 'Brand',
      _props: { scope: 'col', color: 'light' },
    },
    {
      key: 'model',
      label: 'Model',
      _props: { scope: 'col', color: 'light' },
    },
    {
      key: 'year',
      label: 'Year',
      _props: { scope: 'col', color: 'light' },
    },
    {
      key: 'regisNumber',
      label: 'Plate Number',
      _props: { scope: 'col', color: 'light' },
    },
    {
      key: 'type',
      label: 'Type',
      _props: { scope: 'col', color: 'light' },
    },
    {
      key: 'capacity',
      label: 'Capacity',
      _props: { scope: 'col', color: 'light' },
    },
    {
      key: 'action',
      label: 'Action',
      _props: { scope: 'col', color: 'light' },
    },
  ]
  // vehicle.map colledt all data from database
  const items = vehicle.map((vehicle) => ({
    _id: vehicle._id,
    idNum: vehicle.idNum,
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    regisNumber: vehicle.regisNumber,
    type: vehicle.type,
    capacity: vehicle.capacity,
    action: (
      <CButtonGroup>
        <CButton
          color="primary"
          onClick={() => {
            setUpdatedVehicle(vehicle)
            setVisible(true)
          }}
        >
          Update
        </CButton>
        <CButton color="danger" onClick={() => handleDeleteVehicle(vehicle._id)}>
          Delete
        </CButton>
      </CButtonGroup>
    ),
  }))

  return (
    <CContainer
      style={{
        height: '500px',
        overflowX: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* my modal form */}
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel">Update Vehicle</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            {/* <CFormInput
              className="hidden"
              type="text"
              required
              value={updatedVehicle._id}
              disabled
            /> */}
            <CFormInput
              id="floatingInput"
              floatingLabel="Vehicle ID"
              className="mb-3"
              type="text"
              placeholder="Enter ID"
              required
              value={updatedVehicle.idNum}
              style={{ width: '100%', marginBottom: '10px' }}
              disabled
              onChange={(e) => {
                setUpdatedVehicle({ ...updatedVehicle, idNum: e.target.value })
              }}
            />
            <CFormInput
              id="floatingInput"
              floatingLabel="Vehicle Brand"
              floatingClassName="mb-3"
              type="text"
              placeholder="Enter brand"
              text="Ex. Toyota/Nissan/Mitsubishi"
              required
              value={updatedVehicle.brand}
              style={{ width: '100%', marginTop: '10px' }}
              onChange={(e) => {
                setUpdatedVehicle({ ...updatedVehicle, brand: e.target.value })
              }}
            />
            <CFormInput
              id="floatingInput"
              floatingLabel="Vehicle Model"
              floatingClassName="mb-3"
              type="text"
              placeholder="Enter model"
              required
              value={updatedVehicle.model}
              text="Ex. L-300/altis/avanza"
              style={{ width: '100%', marginBottom: '10px' }}
              onChange={(e) => {
                setUpdatedVehicle({ ...updatedVehicle, model: e.target.value })
              }}
            />
            <CFormInput
              id="floatingNumber"
              floatingLabel="Vehicle Year"
              floatingClassName="mb-3"
              type="number"
              required
              value={updatedVehicle.year}
              min="1900"
              placeholder="Vehicle Year"
              max={new Date().getFullYear()}
              style={{ width: '100%', marginBottom: '10px' }}
              onChange={(e) => {
                let inputYear = parseInt(e.target.value)
                if (inputYear !== 1900 && inputYear > new Date().getFullYear()) {
                  // Handle invalid input (e.g., show an error message or prevent the value from changing)
                  // setNewVehicle({ ...newVehicle, year: 1900 })
                  setUpdatedVehicle({ ...updatedVehicle, year: 1900 })
                  alert('Invalid year: Must be 1900 or the current year.')
                } else {
                  // setNewVehicle({ ...newVehicle, year: inputYear })
                  setUpdatedVehicle({ ...updatedVehicle, year: inputYear })
                }
              }}
            />

            <CFormInput
              id="floatingInput"
              floatingLabel="Vehicle Registration Number"
              floatingClassName="mb-3"
              type="text"
              required
              value={updatedVehicle.regisNumber}
              placeholder="Enter Registration Number"
              style={{ width: '100%', marginBottom: '10px' }}
              onChange={(e) => {
                setUpdatedVehicle({ ...updatedVehicle, regisNumber: e.target.value })
              }}
            />

            <CFormSelect
              id="floatingSelect"
              floatingLabel="Vehicle Type"
              floatingClassName="mb-3"
              required
              value={updatedVehicle.type}
              style={{ width: '100%', marginBottom: '10px' }}
              onChange={(e) => {
                setUpdatedVehicle({ ...updatedVehicle, type: e.target.value })
              }}
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
              value={updatedVehicle.capacity}
              placeholder="Enter Vehicle Capacity"
              style={{ width: '100%', marginBottom: '10px' }}
              onChange={(e) => {
                setUpdatedVehicle({ ...updatedVehicle, capacity: e.target.value })
              }}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>

          <CButton
            type="submit"
            color="primary"
            onClick={() => handleUpdateVehicle(vehicle._id, updatedVehicle)}
          >
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>

      {/* this is my vehicle table */}
      {/* table start */}
      <CTable
        striped
        columns={columns}
        items={items}
        tableHeadProps={{
          style: {
            textAlign: 'center',
            position: 'sticky',
            top: 0,
            backgroundColor: '#fff',
            zIndex: 1,
          },
        }}
      />
      {/* table ends */}
    </CContainer>
  )
}

export default VehicleTableUpdate
