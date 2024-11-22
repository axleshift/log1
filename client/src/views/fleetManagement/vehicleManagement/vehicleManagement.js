/* eslint-disable prettier/prettier */
import { CCard, CCardBody, CContainer, CHeader } from '@coreui/react'
import React from 'react'
import AddVehicle from './ComponentVehicle/AddVehicle'
import TableVehicle from './ComponentVehicle/TableVehicle'

const VehicleManagement = () => {
  return (
    <>
      <CHeader className="text-center">Vehicle Management</CHeader>
      <CContainer className="m-3">
        <AddVehicle />
      </CContainer>
      <CCard>
        <CHeader>Vehicle List</CHeader>
        <CCardBody className="md-3">
          <TableVehicle />
        </CCardBody>
      </CCard>
    </>
  )
}

export default VehicleManagement
