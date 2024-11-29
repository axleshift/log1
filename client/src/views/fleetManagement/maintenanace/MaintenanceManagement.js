import React from 'react'
import { CCard, CHeader, CCardBody, CContainer } from '@coreui/react'
import AddMaintenanceInspaction from './ComponentsMaintenance/AddMaintenanceInspaction'
import TableMaintenanceInspection from './ComponentsMaintenance/TableMaintenanceInspection'

const MaintenanceMangement = () => {
  return (
    <>
      <CHeader className="text-center">Maintenance Management</CHeader>
      <CContainer className="m-3">
        <AddMaintenanceInspaction />
      </CContainer>
      <CCard>
        <CHeader>Schedule List</CHeader>
        <CCardBody className="md-3">
          <TableMaintenanceInspection />
        </CCardBody>
      </CCard>
    </>
  )
}

export default MaintenanceMangement
