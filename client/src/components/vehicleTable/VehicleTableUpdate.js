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
} from '@coreui/react'
import { useVehicleStore } from '../../components/store/vehichle'

const VehicleTableUpdate = ({ vehicle }) => {
  const { deleteVehicle } = useVehicleStore()
  const handleDeleteVehicle = async (vid) => {
    const { success, message } = await deleteVehicle(vid)
    if (!success) {
      toast1({ title: 'Error', body: message, color: 'danger', visible: true })
    } else {
      toast1({ title: 'Success', body: message, color: 'success', visible: true })
    }
  }
  return (
    <CTable responsive caption="top">
      <CTableCaption>List of Vehicle</CTableCaption>
      <CTableHead
        responsive
        color="light"
        style={{
          textAlign: 'center',
        }}
      >
        <CTableRow>
          <CTableHeaderCell scope="col">ID</CTableHeaderCell>
          <CTableHeaderCell scope="col">Brand</CTableHeaderCell>
          <CTableHeaderCell scope="col">Model</CTableHeaderCell>
          <CTableHeaderCell scope="col">Year</CTableHeaderCell>
          <CTableHeaderCell scope="col">Registration Number</CTableHeaderCell>
          <CTableHeaderCell scope="col">type</CTableHeaderCell>
          <CTableHeaderCell scope="col">capacity</CTableHeaderCell>
          <CTableHeaderCell scope="col">Action</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody responsive color="dark" stripedColumns>
        {vehicle.map((v) => (
          // eslint-disable-next-line react/jsx-key
          <CTableRow
            style={{
              textAlign: 'center',
            }}
          >
            <CTableHeaderCell scope="row">{v.id}</CTableHeaderCell>
            <CTableDataCell>{v.brand}</CTableDataCell>
            <CTableDataCell>{v.model}</CTableDataCell>
            <CTableDataCell>{v.year}</CTableDataCell>
            <CTableDataCell>{v.regisNumber}</CTableDataCell>
            <CTableDataCell>{v.type}</CTableDataCell>
            <CTableDataCell>{v.capacity}</CTableDataCell>
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
                <CButton color="danger" onClick={() => handleDeleteVehicle(v._id)}>
                  Delete
                </CButton>
              </CButtonGroup>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default VehicleTableUpdate
