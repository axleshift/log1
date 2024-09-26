/* eslint-disable prettier/prettier */
import React from 'react'
import { CButtonGroup, CButton, CContainer, CTable } from '@coreui/react'
import { useVehicleStore } from '../../components/store/vehichle'
import { classNames } from 'classnames'
// the whole table of vehicles with 2 buttons for update and delete
const VehicleTableUpdate = ({ vehicle }) => {
  // geting the delete vehicle function from the store.js

  const { deleteVehicle } = useVehicleStore()

  // delete vehicle button
  const handleDeleteVehicle = async (vid) => {
    const { success, message } = await deleteVehicle(vid)
    if (!success) {
      alert(message)
    } else {
      alert(message)
    }
  }
  // table columns is may header itmes is my data from backend
  const columns = [
    {
      key: 'id',
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
  const items = vehicle.map((v) => ({
    id: v.id,
    brand: v.brand,
    model: v.model,
    year: v.year,
    regisNumber: v.regisNumber,
    type: v.type,
    capacity: v.capacity,
    action: (
      <CButtonGroup>
        <CButton color="primary" onClick={() => {}}>
          Edit
        </CButton>
        <CButton color="danger" onClick={() => handleDeleteVehicle(v._id)}>
          Delete
        </CButton>
      </CButtonGroup>
    ),
  }))
  return (
    <CContainer
      style={{
        border: '1px solid black',
        height: '500px',
        overflowX: 'hidden',
      }}
    >
      {/* this is my vehicle table */}
      {/* table start */}
      <CTable
        columns={columns}
        items={items}
        style={{
          color: 'light',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
      />
      {/* table ends */}
    </CContainer>
  )
}

export default VehicleTableUpdate
