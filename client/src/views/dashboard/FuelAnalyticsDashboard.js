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
} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'

const FuelAnalyticsDashboard = () => {
  const Navigate = useNavigate()
  const [analytics, setAnalytics] = useState([])
  const [startDate, setStartDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

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
            {loading ? (
              <div className="text-center">
                <CSpinner />
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FuelAnalyticsDashboard
