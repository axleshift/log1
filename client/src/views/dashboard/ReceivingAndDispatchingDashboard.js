// ReceivingAndDispatchingDashboard.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CBadge,
  CSpinner,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faBoxOpen, faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const ReceivingAndDispatchingDashboard = () => {
  const navigate = useNavigate()
  const [shipments, setShipments] = useState([])
  const [stats, setStats] = useState({
    receiving: {
      total: 0,
      pending: 0,
      completed: 0,
    },
    dispatching: {
      total: 0,
      pending: 0,
      completed: 0,
    },
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchShipmentData()
  }, [])

  const fetchShipmentData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL_LOG2}api/v1/shipment`)
      const shipmentData = response.data.shipments || []
      console.log('Fetched shipment data:', shipmentData)
      if (Array.isArray(shipmentData)) {
        setShipments(shipmentData)
        calculateStats(shipmentData)
      } else {
        setError('Invalid data format received from server')
      }
    } catch (err) {
      setError('Failed to fetch shipment data')
      console.error('Error fetching shipment data:', err)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (data) => {
    const stats = {
      receiving: {
        total: 0,
        pending: 0,
        completed: 0,
      },
      dispatching: {
        total: 0,
        pending: 0,
        dispatching: 0,
        completed: 0,
      },
    }

    data.forEach((shipment) => {
      // Receiving stats (isInWarehouse is false)
      if (!shipment.isInWarehouse && shipment.dispatch !== 'Completed') {
        stats.receiving.total++
        if (shipment.dispatch === 'Pending') {
          stats.receiving.pending++
        }
      }
      if (shipment.isInWarehouse) {
        stats.receiving.completed++
      }

      // Dispatching stats (isInWarehouse is true)
      if (shipment.isInWarehouse) {
        stats.dispatching.total++
      }
      if (shipment.dispatch === 'Dispatching') {
        stats.dispatching.dispatching++
      }
      if (shipment.dispatch === 'Pending' && shipment.isInWarehouse) {
        stats.dispatching.pending++
      }
      if (shipment.dispatch === 'Completed') {
        stats.dispatching.completed++
      }
    })

    setStats(stats)
  }

  const getRecentShipments = (type) => {
    if (!Array.isArray(shipments)) {
      return []
    }

    if (type === 'receiving') {
      return shipments.filter((shipment) => !shipment.isInWarehouse).slice(0, 6)
    }

    return shipments.filter((shipment) => shipment.isInWarehouse).slice(0, 6)
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <CSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      {/* Stats Summary Cards */}
      <CRow className="mb-4">
        <CCol md={6}>
          <CCard
            className="h-100"
            onClick={() => navigate('/schedule/ReceivingItems')}
            style={{ cursor: 'pointer' }}
          >
            <CCardHeader className="bg-primary text-white">
              <FontAwesomeIcon icon={faBoxOpen} className="me-2" />
              Receiving Summary
            </CCardHeader>
            <CCardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Total: {stats.receiving.total}</h4>
                <div>
                  <CBadge color="warning">Pending: {stats.receiving.pending}</CBadge>
                  <CBadge color="success" className="ms-2">
                    Received: {stats.receiving.completed}
                  </CBadge>
                </div>
              </div>

              {/* <CTable hover responsive small>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {getRecentShipments('receiving').map((shipment) => (
                    <CTableRow key={shipment._id}>
                      <CTableDataCell>{shipment.tracking_id}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={shipment.dispatch === 'Completed' ? 'success' : 'warning'}>
                          {shipment.dispatch}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        {new Date(shipment.createdAt).toLocaleDateString()}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable> */}
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={6}>
          <CCard
            className="h-100"
            onClick={() => navigate('/schedule/DispatchingItems')}
            style={{ cursor: 'pointer' }}
          >
            <CCardHeader className="bg-success text-white">
              <FontAwesomeIcon icon={faTruck} className="me-2" />
              Dispatching Summary
            </CCardHeader>
            <CCardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Total: {stats.dispatching.total}</h4>
                <div>
                  <CBadge color="info" className="me-2">
                    Dispatching: {stats.dispatching.dispatching}
                  </CBadge>

                  <CBadge color="warning">Pending: {stats.dispatching.pending}</CBadge>
                  <CBadge color="success" className="ms-2">
                    Completed: {stats.dispatching.completed}
                  </CBadge>
                </div>
              </div>

              {/* <CTable hover responsive small>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {getRecentShipments('dispatching').map((shipment) => (
                    <CTableRow key={shipment._id}>
                      <CTableDataCell>{shipment.tracking_id}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={shipment.dispatch === 'Completed' ? 'success' : 'warning'}>
                          {shipment.dispatch}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        {new Date(shipment.createdAt).toLocaleDateString()}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable> */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default ReceivingAndDispatchingDashboard
