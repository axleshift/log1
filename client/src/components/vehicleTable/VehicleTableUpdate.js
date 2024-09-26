/* eslint-disable prettier/prettier */
import React from 'react'
import {
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButtonGroup,
  CButton,
  CContainer,
  CRow,
  CCol,
} from '@coreui/react'
import { useVehicleStore } from '../../components/store/vehichle'

const VehicleTableUpdate = ({ vehicle }) => {
  const { deleteVehicle } = useVehicleStore()
  const handleDeleteVehicle = async (vid) => {
    const { success, message } = await deleteVehicle(vid)
  }
  return (
    <CTableRow
      style={{
        textAlign: 'center',
      }}
    >
      <CTableHeaderCell scope="row" hidden>
        {vehicle._id}
      </CTableHeaderCell>
      <CTableDataCell>{vehicle.id}</CTableDataCell>
      <CTableDataCell>{vehicle.brand}</CTableDataCell>
      <CTableDataCell>{vehicle.model}</CTableDataCell>
      <CTableDataCell>{vehicle.year}</CTableDataCell>
      <CTableDataCell>{vehicle.regisNumber}</CTableDataCell>
      <CTableDataCell>{vehicle.type}</CTableDataCell>
      <CTableDataCell>{vehicle.capacity}</CTableDataCell>
      <CTableDataCell>
        <CButtonGroup>
          <CButton
            color="primary"
            onClick={() => {
              setSelectedVehicle(v)
              setVisible(true)
            }}
          >
            Edit
          </CButton>
          <CButton color="danger" onClick={() => handleDeleteVehicle(vehicle._id)}>
            Delete
          </CButton>
        </CButtonGroup>
      </CTableDataCell>
    </CTableRow>
  )
}

export default VehicleTableUpdate
