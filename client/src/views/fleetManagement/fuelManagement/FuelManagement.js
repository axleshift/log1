import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CContainer,
  CHeader,
  CSpinner,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CImage,
} from '@coreui/react'
import api from '../../../utils/api'
import AddFuelLog from './componentsFuelLogs/AddFuelLog'
import TableFuelLogs from './componentsFuelLogs/TableFuelLogs'
import UpdateFuelLog from './componentsFuelLogs/UpdateFuelLog'
import { useToast } from '../../../components/Toast/Toast'

const FuelManagement = () => {
  const API_URL = import.meta.env.VITE_APP_API_URL
  const { showSuccess, showError } = useToast()
  const [fuelLogs, setFuelLogs] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [drivers, setDrivers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedLogId, setSelectedLogId] = useState(null)
  const [imageModal, setImageModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [updateModal, setUpdateModal] = useState(false)
  const [selectedFuelLog, setSelectedFuelLog] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [fuelLogsRes, vehiclesRes, driversRes] = await Promise.all([
        api.get('api/v1/fuelLogs/fuel-logs'),
        api.get('api/v1/vehicle/in-use'),
        api.get('api/v1/driver'),
      ])
      setFuelLogs(fuelLogsRes.data.data)
      setVehicles(vehiclesRes.data.data)
      setDrivers(driversRes.data.data)
      showSuccess('Data fetched successfully')
    } catch (error) {
      showError(error.response?.data?.message || 'Error fetching data')
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  const handleDeleteClick = (id) => {
    setSelectedLogId(id)
    setDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`api/v1/fuelLogs/fuel-logs/${selectedLogId}`)
      setFuelLogs((prev) => prev.filter((log) => log._id !== selectedLogId))
      showSuccess('Fuel log deleted successfully')
      setDeleteModal(false)
    } catch (error) {
      showError(error.response?.data?.message || 'Error deleting fuel log')
    }
  }

  const handleUpdateClick = (fuelLog) => {
    setSelectedFuelLog(fuelLog)
    setUpdateModal(true)
  }

  const handleUpdateComplete = (updatedFuelLog) => {
    setFuelLogs((prev) =>
      prev.map((log) => (log._id === updatedFuelLog._id ? updatedFuelLog : log)),
    )
    setUpdateModal(false)
    setSelectedFuelLog(null)
  }

  const handleViewReceipt = (fuelLog) => {
    if (fuelLog.receiptImage) {
      // Construct the full URL for the image
      const imageUrl = `${API_URL}uploads/receipts/${fuelLog.receiptImage}`
      setSelectedImage(imageUrl)
      setImageModal(true)
      showSuccess('Receipt image loaded successfully')
    } else {
      showError('No receipt image available')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <CSpinner color="primary" size="sm">
        Loading...
      </CSpinner>
    )
  }
  const handleAddFuelLog = (newFuelLogs) => {
    setFuelLogs((preFuelLogs) => [...preFuelLogs, newFuelLogs])
    fetchData()
  }

  return (
    <>
      <CContainer>
        <CHeader>Fuel Management</CHeader>
        <CCard>
          <CCardBody>
            <CContainer className="mb-3">
              <AddFuelLog onAddFuelog={handleAddFuelLog} />
            </CContainer>
            <TableFuelLogs
              fuelLogs={fuelLogs}
              vehicles={vehicles}
              drivers={drivers}
              loading={loading}
              error={error}
              onDeleteFuelLog={handleDeleteClick}
              onUpdateFuelLog={handleUpdateClick}
              onViewReceipt={handleViewReceipt}
            />
          </CCardBody>
        </CCard>
        {/* Update Modal */}
        {updateModal && (
          <UpdateFuelLog
            fuelLog={selectedFuelLog}
            visible={updateModal}
            onClose={() => {
              setUpdateModal(false)
              setSelectedFuelLog(null)
            }}
            onUpdate={handleUpdateComplete}
            vehicles={vehicles}
            drivers={drivers}
          />
        )}
        {/* Delete Confirmation Modal */}
        <CModal visible={deleteModal} onClose={() => setDeleteModal(false)} alignment="center">
          <CModalHeader closeButton>Confirm Delete</CModalHeader>
          <CModalBody>
            Are you sure you want to delete this fuel log? This action cannot be undone.
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" variant="outline" onClick={() => setDeleteModal(false)}>
              Cancel
            </CButton>
            <CButton color="danger" variant="outline" onClick={handleDeleteConfirm}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
        {/* Image View Modal */}
        <CModal
          visible={imageModal}
          onClose={() => {
            setImageModal(false)
            setSelectedImage(null)
          }}
          size="lg"
          alignment="center"
        >
          <CModalHeader closeButton>Receipt Image</CModalHeader>
          <CModalBody className="text-center">
            {selectedImage && (
              <CImage
                src={selectedImage}
                alt="Receipt"
                style={{
                  maxWidth: '100%',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                }}
                onError={(e) => {
                  showError('Error loading image')
                  e.target.src = 'placeholder-image-url.jpg' // Optional: provide a placeholder image
                }}
              />
            )}
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              variant="outline"
              onClick={() => {
                setImageModal(false)
                setSelectedImage(null)
              }}
            >
              Close
            </CButton>
            {/* <CButton
              color="primary"
              variant="outline"
              onClick={() => window.open(selectedImage, '_blank')}
            >
              Open in New Tab
            </CButton> */}

            <a href={selectedImage} target="_blank" rel="noopener noreferrer">
              <CButton color="primary" variant="outline">
                Open in New Tab
              </CButton>
            </a>
          </CModalFooter>
        </CModal>
      </CContainer>
    </>
  )
}

export default FuelManagement
