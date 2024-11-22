import React from 'react'
import AddMaintenanceInspaction from './ComponentsMaintenance/AddMaintenanceInspaction'
import TableMaintenanceInspection from './ComponentsMaintenance/tableMaintenanceInspection'
const MaintenanceMangement = () => {
  return (
    <>
      <h1>Maintenance Management</h1>
      <AddMaintenanceInspaction />
      <TableMaintenanceInspection />
    </>
  )
}

export default MaintenanceMangement
