// import { CCard, CCardBody, CContainer, CHeader } from '@coreui/react'
// import React, { useState, useEffect } from 'react'
// import AddVehicle from './ComponentVehicle/AddVehicle'
// import TableVehicle from './ComponentVehicle/TableVehicle'
// import api from '../../../utils/api'
// import MaintenancePredictionService from '../../../Services/maintenancePrediction'
// import FuelAnalysisService from '../../../Services/fuelAnalysis'

// const VehicleManagement = () => {
//   const [vehicle, setVehicles] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [maintenancePredictions, setMaintenancePredictions] = useState({})
//   const [fuelPredictions, setFuelPredictions] = useState({})
//   useEffect(() => {
//     initializeAI()
//   }, [])

//   const initializeAI = async () => {
//     await maintenancePredictionService.createModel()
//     await fuelAnalysisService.createModel()
//     analyzeFuelData()
//     predictMaintenance()
//   }

//   const analyzeFuelData = async () => {
//     const predictions = {}
//     for (const vehicle of vehicles) {
//       const fuelData = {
//         distance: vehicle.totalDistance,
//         load: vehicle.averageLoad,
//         vehicleTypeIndex: getVehicleTypeIndex(vehicle.type),
//         weatherCondition: getCurrentWeatherIndex(),
//         driverScore: vehicle.driverScore,
//       }

//       predictions[vehicle._id] = await fuelAnalysisService.predictFuelConsumption(fuelData)
//     }
//     setFuelPredictions(predictions)
//   }

//   const predictMaintenance = async () => {
//     const predictions = {}
//     for (const vehicle of vehicles) {
//       const maintenanceData = {
//         currentMileage: vehicle.currentMileage,
//         age: calculateVehicleAge(vehicle.year),
//         fuelEfficiency: vehicle.fuelEfficiency,
//         maintenanceCount: vehicle.maintenanceHistory?.length || 0,
//       }

//       predictions[vehicle._id] =
//         await maintenancePredictionService.predictMaintenance(maintenanceData)
//     }
//     setMaintenancePredictions(predictions)
//   }

//   const fetchVehicle = async () => {
//     setLoading(true)
//     try {
//       const response = await api.get('/api/v1/vehicle')
//       if (response.status === 200) {
//         setVehicles(response.data.data)
//         setLoading(false)
//       } else {
//         setError(response.data.message)
//       }
//     } catch (error) {
//       setError(error.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchVehicle()
//   }, [])
//   const handleAddVehicle = (newVehicle) => {
//     setVehicles((preVehicles) => [...preVehicles, newVehicle])
//   }

//   const handleDeleteVehicle = (vehicleId) => {
//     setVehicles((preVehicles) => preVehicles.filter((vehicle) => vehicle._id !== vehicleId))
//   }

//   const handleUpdateVehicle = (updatedVehicle) => {
//     setVehicles(
//       (preVehicles) =>
//         preVehicles.map((vehicle) =>
//           vehicle._id === updatedVehicle._id ? updatedVehicle : vehicle,
//         ),
//       fetchVehicle(),
//     )
//   }
//   return (
//     <>
//       <CHeader className="text-center">Vehicle Management</CHeader>
//       <CContainer className="m-3">
//         <AddVehicle onAddVehicle={handleAddVehicle} />
//       </CContainer>
//       <CCard>
//         <CHeader>Vehicle List</CHeader>
//         <CCardBody className="md-3">
//           <TableVehicle
//             vehicle={vehicle}
//             error={error}
//             onDeleteVehicle={handleDeleteVehicle}
//             onUpdateVehicle={handleUpdateVehicle}
//             loading={loading}
//           />
//         </CCardBody>
//       </CCard>
//     </>
//   )
// }

// export default VehicleManagement

import { CCard, CCardBody, CContainer, CHeader } from '@coreui/react'
import React, { useState, useEffect } from 'react'
import AddVehicle from './ComponentVehicle/AddVehicle'
import TableVehicle from './ComponentVehicle/TableVehicle'
import api from '../../../utils/api'

const VehicleManagement = () => {
  const [vehicle, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [maintenancePredictions, setMaintenancePredictions] = useState({})
  const [fuelPredictions, setFuelPredictions] = useState({})
  const [aiStatus, setAiStatus] = useState('initializing')

  const fetchVehicle = async () => {
    setLoading(true)
    try {
      const response = await api.get('/api/v1/vehicle')
      if (response.status === 200) {
        setVehicles(response.data.data)
        setLoading(false)
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicle()
  }, [])

  const handleAddVehicle = (newVehicle) => {
    setVehicles((preVehicles) => [...preVehicles, newVehicle])
  }

  const handleDeleteVehicle = (vehicleId) => {
    setVehicles((preVehicles) => preVehicles.filter((vehicle) => vehicle._id !== vehicleId))
  }

  const handleUpdateVehicle = (updatedVehicle) => {
    setVehicles(
      (preVehicles) =>
        preVehicles.map((vehicle) =>
          vehicle._id === updatedVehicle._id ? updatedVehicle : vehicle,
        ),
      fetchVehicle(),
    )
  }
  return (
    <>
      <CHeader className="text-center">Vehicle Management</CHeader>

      <CContainer className="m-3">
        <AddVehicle onAddVehicle={handleAddVehicle} />
      </CContainer>

      <CCard>
        <CHeader>Vehicle List</CHeader>
        <CCardBody className="md-3">
          <TableVehicle
            vehicle={vehicle}
            error={error}
            onDeleteVehicle={handleDeleteVehicle}
            onUpdateVehicle={handleUpdateVehicle}
            maintenancePredictions={maintenancePredictions} // Add this
            fuelPredictions={fuelPredictions} // Add this
            loading={loading}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default VehicleManagement
