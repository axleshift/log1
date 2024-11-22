/* eslint-disable prettier/prettier */
import React from 'react'
import AddDriver from './ComponentsDriver/AddDrivers'
import TableDriver from './ComponentsDriver/TableDriver'
import { CCard, CCardBody, CContainer, CHeader } from '@coreui/react'

const DriversManagement = () => {
  return (
    <>
      <CHeader className="text-center">Driver Management</CHeader>
      <CContainer className="m-3">
        <AddDriver />
      </CContainer>
      <CCard>
        <CHeader>Drivers list</CHeader>
        <CCardBody className="md-3">
          <TableDriver />
        </CCardBody>
      </CCard>
    </>
  )
}

export default DriversManagement
