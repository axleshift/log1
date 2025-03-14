import React, { useEffect, useState } from 'react'
import VehicleManagementDashboard from './VehicleManagementDashboard'
import MaintenanceManagementDashboard from './MaintenanceManagementDashboard'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import FuelAnalyticsDashboard from './FuelAnalyticsDashboard'

const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <VehicleManagementDashboard className="mb-4" />
      <FuelAnalyticsDashboard className="mb-4" />
      <MaintenanceManagementDashboard className="mb-4" />
    </>
  )
}

export default Dashboard
