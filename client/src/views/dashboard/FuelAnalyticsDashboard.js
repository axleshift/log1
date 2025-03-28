// import React, { useState, useEffect } from 'react'
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CRow,
//   CFormSelect,
//   CFormInput,
//   CSpinner,
//   CAlert,
// } from '@coreui/react'
// import { CChart } from '@coreui/react-chartjs'
// import api from '../../utils/api'
// import { useNavigate } from 'react-router-dom'

// const FuelAnalyticsDashboard = () => {
//   const Navigate = useNavigate()
//   const [analytics, setAnalytics] = useState([])
//   const [startDate, setStartDate] = useState(
//     new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
//   )
//   const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
//   const [selectedVehicle, setSelectedVehicle] = useState('')
//   const [vehicles, setVehicles] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [isHovered, setIsHovered] = useState(false)

//   useEffect(() => {
//     fetchAnalytics()
//     fetchVehicles()
//   }, [startDate, endDate, selectedVehicle])

//   const fetchVehicles = async () => {
//     try {
//       const response = await api.get('/api/v1/vehicle')
//       setVehicles(response.data.data || [])
//     } catch (error) {
//       console.error('Error fetching vehicles:', error)
//     }
//   }

//   const fetchAnalytics = async () => {
//     try {
//       setLoading(true)
//       const params = {
//         startDate,
//         endDate,
//         ...(selectedVehicle && { vehicleId: selectedVehicle }),
//       }

//       const response = await api.get('/api/v1/fuelLogs/fuel-logs/analytics', { params })
//       setAnalytics(response.data.data || [])
//     } catch (error) {
//       console.error('Error fetching analytics:', error)
//       setAnalytics([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString()
//   }

//   const getVehicleDisplayName = (vehicle) => {
//     if (!vehicle?.vehicleDetails) return 'Unknown Vehicle'
//     const { brand = '', model = '', regisNumber = '' } = vehicle.vehicleDetails
//     return `${brand} ${model}${regisNumber ? ` (${regisNumber})` : ''}`
//   }

//   const prepareChartData = () => {
//     if (!analytics || analytics.length === 0) return null

//     if (selectedVehicle && analytics.length === 1) {
//       const vehicle = analytics[0]
//       if (!vehicle?.fuelLogs) return null

//       const sortedLogs = [...vehicle.fuelLogs].sort((a, b) => new Date(a.date) - new Date(b.date))

//       return {
//         labels: sortedLogs.map((log) => formatDate(log.date)),
//         datasets: [
//           {
//             label: 'Fuel Consumption (L)',
//             data: sortedLogs.map((log) => log.fuelQuantity || 0),
//             borderColor: '#321fdb',
//             backgroundColor: 'rgba(50, 31, 219, 0.1)',
//             fill: true,
//             tension: 0.4,
//           },
//           {
//             label: 'Cost',
//             data: sortedLogs.map((log) => log.totalCost || 0),
//             borderColor: '#2eb85c',
//             backgroundColor: 'rgba(46, 184, 92, 0.1)',
//             fill: true,
//             tension: 0.4,
//             yAxisID: 'cost',
//           },
//           {
//             label: 'Efficiency (L/100km)',
//             data: sortedLogs.map((log) => parseFloat(log.litersPer100km) || 0),
//             borderColor: '#f9b115',
//             backgroundColor: 'rgba(249, 177, 21, 0.1)',
//             fill: true,
//             tension: 0.4,
//             yAxisID: 'efficiency',
//           },
//         ],
//       }
//     } else {
//       // Multiple vehicles view - show aggregated data points
//       return {
//         labels: analytics.map((vehicle) => getVehicleDisplayName(vehicle)),
//         datasets: [
//           {
//             label: 'Total Fuel Consumption (L)',
//             data: analytics.map((vehicle) => vehicle.totalFuelConsumption || 0),
//             borderColor: '#321fdb',
//             backgroundColor: 'rgba(50, 31, 219, 0.1)',
//             fill: true,
//             tension: 0.4,
//           },
//           {
//             label: 'Total Cost ',
//             data: analytics.map((vehicle) => vehicle.totalCost || 0),
//             borderColor: '#2eb85c',
//             backgroundColor: 'rgba(46, 184, 92, 0.1)',
//             fill: true,
//             tension: 0.4,
//             yAxisID: 'cost',
//           },
//           {
//             label: 'Average Efficiency (L/100km)',
//             data: analytics.map((vehicle) => vehicle.averageEfficiency || 0),
//             borderColor: '#f9b115',
//             backgroundColor: 'rgba(249, 177, 21, 0.1)',
//             fill: true,
//             tension: 0.4,
//             yAxisID: 'efficiency',
//           },
//         ],
//       }
//     }
//   }

//   const chartOptions = {
//     responsive: true,
//     interaction: {
//       mode: 'index',
//       intersect: false,
//     },
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: selectedVehicle ? 'Vehicle Performance Over Time' : 'Vehicles Comparison',
//       },
//     },
//     scales: {
//       y: {
//         type: 'linear',
//         display: true,
//         position: 'left',
//         title: {
//           display: true,
//           text: 'Fuel Consumption (L)',
//         },
//       },
//       cost: {
//         type: 'linear',
//         display: true,
//         position: 'right',
//         title: {
//           display: true,
//           text: 'Cost ',
//         },
//         grid: {
//           drawOnChartArea: false,
//         },
//       },
//       efficiency: {
//         type: 'linear',
//         display: true,
//         position: 'right',
//         title: {
//           display: true,
//           text: 'Efficiency (L/100km)',
//         },
//         grid: {
//           drawOnChartArea: false,
//         },
//       },
//     },
//     maintainAspectRatio: false,
//   }
//   const handleNavigate = () => {
//     Navigate('/fleetManagement/FuelManagement')
//   }
//   return (
//     <CRow>
//       <CCol xs={12}>
//         <CCard className="mb-4">
//           <CCardHeader>
//             <h4
//               onClick={handleNavigate}
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//               style={{
//                 cursor: 'pointer',
//                 color: isHovered ? 'grey' : 'inherit',
//               }}
//             >
//               {' '}
//               Fuel Analytics Dashboard
//             </h4>
//             <CRow className="mt-3">
//               <CCol md={4}>
//                 <div className="mb-3">
//                   <label className="form-label" htmlFor="startDate">
//                     Start Date
//                   </label>
//                   <CFormInput
//                     type="date"
//                     id="startDate"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                   />
//                 </div>
//               </CCol>
//               <CCol md={4}>
//                 <div className="mb-3">
//                   <label className="form-label" htmlFor="endDate">
//                     End Date
//                   </label>
//                   <CFormInput
//                     type="date"
//                     id="endDate"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                   />
//                 </div>
//               </CCol>
//               <CCol md={4}>
//                 <div className="mb-3">
//                   <label className="form-label" htmlFor="vehicleId">
//                     Vehicle
//                   </label>
//                   <CFormSelect
//                     value={selectedVehicle}
//                     id="vehicleId"
//                     onChange={(e) => setSelectedVehicle(e.target.value)}
//                   >
//                     <option value="">All Vehicles</option>
//                     {vehicles.map((vehicle) => (
//                       <option key={vehicle._id} value={vehicle._id}>
//                         {vehicle.brand} {vehicle.model} - {vehicle.regisNumber}
//                       </option>
//                     ))}
//                   </CFormSelect>
//                 </div>
//               </CCol>
//             </CRow>
//           </CCardHeader>
//           <CCardBody>
//             {loading ? (
//               <div className="text-center">
//                 <CSpinner />
//               </div>
//             ) : (
//               <div style={{ height: '400px' }}>
//                 {analytics.length > 0 ? (
//                   <CChart
//                     type="line"
//                     style={{ height: '400px' }}
//                     data={prepareChartData()}
//                     options={chartOptions}
//                   />
//                 ) : (
//                   <CAlert color="danger" className="text-center">
//                     No data available
//                   </CAlert>
//                 )}
//               </div>
//             )}
//           </CCardBody>
//         </CCard>
//       </CCol>
//     </CRow>
//   )
// }

// export default FuelAnalyticsDashboard

import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormSelect,
  CFormInput,
  CSpinner,
  CAlert,
  CButton,
} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { FuelPredictionModel } from '../AIprediction/FuelPredictionModel'

const FuelAnalyticsDashboard = () => {
  const Navigate = useNavigate()
  const [analytics, setAnalytics] = useState([])
  const [startDate, setStartDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString().split('T')[0],
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const [predictionModel, setPredictionModel] = useState(null)
  const [predictions, setPredictions] = useState([])
  const [isTraining, setIsTraining] = useState(false)

  const initializeModel = async () => {
    if (!analytics.length || !selectedVehicle) return

    setIsTraining(true)
    try {
      const model = new FuelPredictionModel()
      model.createModel()

      // Get fuel logs for the selected vehicle
      const vehicleData = analytics.find((v) => v._id === selectedVehicle)
      if (vehicleData?.fuelLogs?.length > 1) {
        // Ensure we have at least 2 logs
        console.log('Processing fuel logs:', vehicleData.fuelLogs.length)

        const { features, labels } = model.preprocessData(vehicleData.fuelLogs)
        await model.trainModel(features, labels)
        setPredictionModel(model)

        // Generate predictions for the next period
        const lastLog = vehicleData.fuelLogs[vehicleData.fuelLogs.length - 1]
        const lastButOneLog = vehicleData.fuelLogs[vehicleData.fuelLogs.length - 2]

        const nextPrediction = await model.predict([
          lastLog.fuelQuantity || 0,
          lastLog.totalCost || 0,
          lastLog.litersPer100km || 0,
          lastLog.distance || 0,
          lastButOneLog?.fuelQuantity || 0,
        ])

        setPredictions([...predictions, nextPrediction])
      } else {
        console.warn('Insufficient data for training')
      }
    } catch (error) {
      console.error('Error training model:', error)
    } finally {
      setIsTraining(false)
    }
  }

  useEffect(() => {
    if (selectedVehicle && analytics.length > 0) {
      initializeModel()
    }
  }, [selectedVehicle, analytics])

  useEffect(() => {
    fetchAnalytics()
    fetchVehicles()
  }, [startDate, endDate, selectedVehicle])

  const fetchVehicles = async () => {
    try {
      const response = await api.get('/api/v1/vehicle')
      setVehicles(response.data.data || [])
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    }
  }

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const params = {
        startDate,
        endDate,
        ...(selectedVehicle && { vehicleId: selectedVehicle }),
      }

      const response = await api.get('/api/v1/fuelLogs/fuel-logs/analytics', { params })
      setAnalytics(response.data.data || [])
    } catch (error) {
      console.error('Error fetching analytics:', error)
      setAnalytics([])
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getVehicleDisplayName = (vehicle) => {
    if (!vehicle?.vehicleDetails) return 'Unknown Vehicle'
    const { brand = '', model = '', regisNumber = '' } = vehicle.vehicleDetails
    return `${brand} ${model}${regisNumber ? ` (${regisNumber})` : ''}`
  }

  const prepareChartData = () => {
    if (!analytics || analytics.length === 0) return null

    if (selectedVehicle && analytics.length === 1) {
      const vehicle = analytics[0]
      if (!vehicle?.fuelLogs) return null

      const sortedLogs = [...vehicle.fuelLogs].sort((a, b) => new Date(a.date) - new Date(b.date))

      return {
        labels: sortedLogs.map((log) => formatDate(log.date)),
        datasets: [
          {
            label: 'Fuel Consumption (L)',
            data: sortedLogs.map((log) => log.fuelQuantity || 0),
            borderColor: '#321fdb',
            backgroundColor: 'rgba(50, 31, 219, 0.1)',
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Cost',
            data: sortedLogs.map((log) => log.totalCost || 0),
            borderColor: '#2eb85c',
            backgroundColor: 'rgba(46, 184, 92, 0.1)',
            fill: true,
            tension: 0.4,
            yAxisID: 'cost',
          },
          {
            label: 'Efficiency (L/100km)',
            data: sortedLogs.map((log) => parseFloat(log.litersPer100km) || 0),
            borderColor: '#f9b115',
            backgroundColor: 'rgba(249, 177, 21, 0.1)',
            fill: true,
            tension: 0.4,
            yAxisID: 'efficiency',
          },
        ],
      }
    } else {
      // Multiple vehicles view - show aggregated data points
      return {
        labels: analytics.map((vehicle) => getVehicleDisplayName(vehicle)),
        datasets: [
          {
            label: 'Total Fuel Consumption (L)',
            data: analytics.map((vehicle) => vehicle.totalFuelConsumption || 0),
            borderColor: '#321fdb',
            backgroundColor: 'rgba(50, 31, 219, 0.1)',
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Total Cost ',
            data: analytics.map((vehicle) => vehicle.totalCost || 0),
            borderColor: '#2eb85c',
            backgroundColor: 'rgba(46, 184, 92, 0.1)',
            fill: true,
            tension: 0.4,
            yAxisID: 'cost',
          },
          {
            label: 'Average Efficiency (L/100km)',
            data: analytics.map((vehicle) => vehicle.averageEfficiency || 0),
            borderColor: '#f9b115',
            backgroundColor: 'rgba(249, 177, 21, 0.1)',
            fill: true,
            tension: 0.4,
            yAxisID: 'efficiency',
          },
        ],
      }
    }
  }

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: selectedVehicle ? 'Vehicle Performance Over Time' : 'Vehicles Comparison',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Fuel Consumption (L)',
        },
      },
      cost: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Cost ',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      efficiency: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Efficiency (L/100km)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    maintainAspectRatio: false,
  }
  const handleNavigate = () => {
    Navigate('/fleetManagement/FuelManagement')
  }
  const [predictionResults, setPredictionResults] = useState(null)
  const handlePrediction2 = async () => {
    if (!selectedVehicle || !predictionModel) {
      return
    }

    try {
      const vehicleData = analytics.find((v) => v._id === selectedVehicle)
      if (!vehicleData?.fuelLogs?.length) {
        return
      }

      const lastLog = vehicleData.fuelLogs[vehicleData.fuelLogs.length - 1]
      const lastButOneLog = vehicleData.fuelLogs[vehicleData.fuelLogs.length - 2]

      // Get the prediction
      const prediction = await predictionModel.predict([
        lastLog.fuelQuantity || 0,
        lastLog.totalCost || 0,
        lastLog.litersPer100km || 0,
        lastLog.distance || 0,
        lastButOneLog?.fuelQuantity || 0,
      ])

      // Handle single prediction value
      let predictedValue = 0

      if (Array.isArray(prediction) && prediction.length > 0) {
        predictedValue = Number(prediction[0])
      } else if (typeof prediction === 'number') {
        predictedValue = Number(prediction)
      }

      // Ensure we have valid numbers
      predictedValue = !isNaN(predictedValue) ? predictedValue : 0

      // Calculate estimated cost based on last known price per liter
      const lastFuelQuantity = Number(lastLog.fuelQuantity) || 1 // Prevent division by zero
      const lastTotalCost = Number(lastLog.totalCost) || 0
      const pricePerLiter = lastTotalCost / lastFuelQuantity
      const estimatedCost = predictedValue * pricePerLiter

      // Get estimated efficiency from last log
      const estimatedEfficiency = Number(lastLog.litersPer100km) || 0

      setPredictionResults({
        fuelConsumption: predictedValue.toFixed(2),
        cost: estimatedCost.toFixed(2),
        efficiency: estimatedEfficiency.toFixed(2),
      })

      // Log the prediction for debugging
      console.log('Predicted fuel consumption:', predictedValue)
      console.log('Estimated cost:', estimatedCost)
      console.log('Estimated efficiency:', estimatedEfficiency)
    } catch (error) {
      console.error('Prediction error:', error)
      setPredictionResults({
        fuelConsumption: '0.00',
        cost: '0.00',
        efficiency: '0.00',
      })
    }
  }
  const [maintenanceRisk, setMaintenanceRisk] = useState(null)
  const [maintenanceFactors, setMaintenanceFactors] = useState([])

  // Modify the handlePrediction function to include maintenance prediction
  const handlePrediction = async () => {
    if (!selectedVehicle || !predictionModel) {
      return
    }

    try {
      const vehicleData = analytics.find((v) => v._id === selectedVehicle)
      if (!vehicleData?.fuelLogs?.length) {
        return
      }

      // Sort fuel logs by date
      const sortedLogs = [...vehicleData.fuelLogs].sort(
        (a, b) => new Date(a.date) - new Date(b.date),
      )

      // Calculate maintenance indicators
      const fuelEfficiencyChange = calculateEfficiencyChange(sortedLogs)
      const fuelConsumptionTrend = calculateConsumptionTrend(sortedLogs)

      // Calculate total distance
      const firstLog = sortedLogs[0]
      const lastLog = sortedLogs[sortedLogs.length - 1]
      const totalDistance = (Number(lastLog.distance) || 0) - (Number(firstLog.distance) || 0)

      // Analyze maintenance factors with adjusted thresholds
      const factors = []

      // Check fuel efficiency degradation with more detailed severity levels
      if (fuelEfficiencyChange > 10) {
        factors.push({
          issue: 'Fuel Efficiency Degradation',
          severity: fuelEfficiencyChange > 15 ? 'Critical' : 'High',
          recommendation:
            fuelEfficiencyChange > 15
              ? 'Immediate engine inspection and tune-up required'
              : 'Schedule engine tune-up and fuel system check',
        })
      } else if (fuelEfficiencyChange > 5) {
        factors.push({
          issue: 'Fuel Efficiency Decline',
          severity: 'Medium',
          recommendation: 'Monitor fuel system performance',
        })
      }

      // Check fuel consumption pattern
      if (fuelConsumptionTrend > 15) {
        factors.push({
          issue: 'Increasing Fuel Consumption',
          severity: fuelConsumptionTrend > 20 ? 'High' : 'Medium',
          recommendation: 'Inspect fuel injectors, air filters, and check for fuel leaks',
        })
      }

      // Check distance-based maintenance with more granular thresholds
      if (totalDistance > 5000) {
        const severity = totalDistance > 7500 ? 'High' : 'Medium'
        factors.push({
          issue: 'Distance-based Maintenance',
          severity,
          recommendation:
            totalDistance > 7500
              ? 'Immediate maintenance service required'
              : 'Schedule routine maintenance check',
        })
      }

      // Calculate risk score
      const riskScore = calculateRiskScore(
        fuelEfficiencyChange,
        fuelConsumptionTrend,
        totalDistance,
      )

      console.log('Maintenance Analysis:', {
        fuelEfficiencyChange,
        fuelConsumptionTrend,
        totalDistance,
        riskScore,
        factors,
      })

      setMaintenanceRisk(riskScore)
      setMaintenanceFactors(factors)
    } catch (error) {
      console.error('Prediction error:', error)
      setMaintenanceRisk(0)
      setMaintenanceFactors([])
    }
  }

  // Helper functions for maintenance analysis
  const calculateEfficiencyChange = (fuelLogs) => {
    if (fuelLogs.length < 2) return 0

    const recent = Number(fuelLogs[fuelLogs.length - 1].litersPer100km) || 0
    const previous = Number(fuelLogs[fuelLogs.length - 2].litersPer100km) || 0

    // Prevent division by zero
    if (previous === 0) return 0

    const change = ((recent - previous) / previous) * 100
    return isNaN(change) ? 0 : change
  }

  const calculateConsumptionTrend = (fuelLogs) => {
    if (fuelLogs.length < 6) return 0 // Need at least 6 logs for comparison

    const recentLogs = fuelLogs.slice(-3)
    const previousLogs = fuelLogs.slice(-6, -3)

    const recentAvg = recentLogs.reduce((acc, log) => acc + (Number(log.fuelQuantity) || 0), 0) / 3
    const previousAvg =
      previousLogs.reduce((acc, log) => acc + (Number(log.fuelQuantity) || 0), 0) / 3

    // Prevent division by zero
    if (previousAvg === 0) return 0

    const trend = ((recentAvg - previousAvg) / previousAvg) * 100
    return isNaN(trend) ? 0 : trend
  }

  const calculateRiskScore = (efficiencyChange, consumptionTrend, distance) => {
    try {
      // Ensure all inputs are numbers
      efficiencyChange = Number(efficiencyChange) || 0
      consumptionTrend = Number(consumptionTrend) || 0
      distance = Number(distance) || 0

      let score = 0

      // Adjust efficiency score calculation (max 40 points)
      // If efficiency degradation is > 10% (high severity threshold),
      // score should be higher
      const efficiencyScore =
        efficiencyChange > 10
          ? Math.min(40, efficiencyChange * 3) // Increase multiplier for high degradation
          : Math.min(20, efficiencyChange * 2) // Lower score for minor changes

      // Adjust consumption score (max 30 points)
      const consumptionScore =
        consumptionTrend > 15
          ? Math.min(30, consumptionTrend * 1.5)
          : Math.min(15, consumptionTrend)

      // Adjust distance score (max 30 points)
      // Assuming 5000 is the maintenance interval
      const distanceScore = Math.min((distance / 5000) * 30, 30)

      // Sum up all scores
      score = efficiencyScore + consumptionScore + distanceScore

      // Ensure the final score is a valid number between 0 and 100
      score = Math.max(0, Math.min(Math.round(score), 100))

      console.log('Risk Score Calculation:', {
        efficiencyChange,
        efficiencyScore,
        consumptionTrend,
        consumptionScore,
        distance,
        distanceScore,
        finalScore: score,
      })

      return score
    } catch (error) {
      console.error('Error calculating risk score:', error)
      return 0
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h4
              onClick={handleNavigate}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                cursor: 'pointer',
                color: isHovered ? 'grey' : 'inherit',
              }}
            >
              {' '}
              Fuel Analytics Dashboard
            </h4>
            <CRow className="mt-3">
              <CCol md={4}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="startDate">
                    Start Date
                  </label>
                  <CFormInput
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </CCol>
              <CCol md={4}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="endDate">
                    End Date
                  </label>
                  <CFormInput
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </CCol>
              <CCol md={4}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="vehicleId">
                    Vehicle
                  </label>
                  <CFormSelect
                    value={selectedVehicle}
                    id="vehicleId"
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                  >
                    <option value="">All Vehicles</option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle._id} value={vehicle._id}>
                        {vehicle.brand} {vehicle.model} - {vehicle.regisNumber}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            {loading || isTraining ? (
              <div className="text-center">
                <CSpinner />
                {isTraining && <p>Training prediction model...</p>}
              </div>
            ) : (
              <div style={{ height: '400px' }}>
                {analytics.length > 0 ? (
                  <CChart
                    type="line"
                    style={{ height: '400px' }}
                    data={prepareChartData()}
                    options={chartOptions}
                  />
                ) : (
                  <CAlert color="danger" className="text-center">
                    No data available
                  </CAlert>
                )}
              </div>
            )}

            {analytics.length > 0 && selectedVehicle && (
              <div className="mt-4">
                <CButton
                  color="primary"
                  onClick={handlePrediction}
                  disabled={!predictionModel || isTraining}
                >
                  {isTraining ? 'Training Model...' : 'Generate Maintenance Forecast'}
                </CButton>

                {maintenanceRisk !== null && (
                  <CCard className="mt-3">
                    <CCardBody>
                      <h5>Maintenance Analysis</h5>
                      <CRow>
                        <CCol md={4}>
                          <div className="mb-2">
                            <strong>Risk Score:</strong>
                            <br />
                            <div
                              style={{
                                color:
                                  maintenanceRisk > 70
                                    ? '#dc3545'
                                    : maintenanceRisk > 40
                                      ? '#ffc107'
                                      : '#28a745',
                                fontSize: '1.2em',
                                fontWeight: 'bold',
                              }}
                            >
                              {maintenanceRisk}/100
                              <br />
                              <small style={{ fontSize: '0.8em' }}>
                                {maintenanceRisk > 70
                                  ? 'Critical Risk'
                                  : maintenanceRisk > 40
                                    ? 'Moderate Risk'
                                    : 'Low Risk'}
                              </small>
                            </div>
                          </div>
                        </CCol>
                        <CCol md={8}>
                          <div className="mb-2">
                            <strong>Recommended Actions:</strong>
                            {maintenanceFactors.length > 0 ? (
                              <ul className="mt-2">
                                {maintenanceFactors.map((factor, index) => (
                                  <li key={index}>
                                    <strong>{factor.issue}</strong>
                                    <span
                                      className={`badge bg-${
                                        factor.severity === 'Critical'
                                          ? 'danger'
                                          : factor.severity === 'High'
                                            ? 'warning'
                                            : 'info'
                                      } ms-2`}
                                    >
                                      {factor.severity}
                                    </span>
                                    <br />
                                    <small className="text-muted">{factor.recommendation}</small>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="mt-2 text-success">
                                No immediate maintenance concerns detected.
                              </p>
                            )}
                          </div>
                        </CCol>
                      </CRow>
                      <small className="text-muted">
                        * Analysis based on fuel consumption patterns and vehicle usage data.
                        Regular maintenance schedule should still be followed.
                      </small>
                    </CCardBody>
                  </CCard>
                )}
              </div>
            )}

            {analytics.length > 0 && selectedVehicle && (
              <div className="mt-4">
                <CButton
                  color="primary"
                  onClick={handlePrediction2}
                  disabled={!predictionModel || isTraining}
                >
                  {isTraining ? 'Training Model...' : 'Generate Fuel Consumption Forecast'}
                </CButton>

                {predictionModel !== null && (
                  <CCard className="mt-3">
                    <CCardBody>
                      <h5>Fuel Consumption Analysis</h5>
                      {predictionResults && (
                        <CCard className="mt-3">
                          <CCardBody>
                            <h5>Predicted Values for Next Fuel Fill:</h5>
                            <CRow>
                              <CCol md={4}>
                                <div className="mb-2">
                                  <strong>Predicted Fuel Quantity:</strong>
                                  <br />
                                  {predictionResults.fuelConsumption} L
                                </div>
                              </CCol>
                              <CCol md={4}>
                                <div className="mb-2">
                                  <strong>Estimated Cost:</strong>
                                  <br />
                                  {predictionResults.cost}
                                </div>
                              </CCol>
                              <CCol md={4}>
                                <div className="mb-2">
                                  <strong>Recent Efficiency:</strong>
                                  <br />
                                  {predictionResults.efficiency} L/100km
                                </div>
                              </CCol>
                            </CRow>
                            <small className="text-muted">
                              * Predictions are based on historical data patterns and may vary from
                              actual values.
                            </small>
                          </CCardBody>
                        </CCard>
                      )}
                    </CCardBody>
                  </CCard>
                )}
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FuelAnalyticsDashboard
