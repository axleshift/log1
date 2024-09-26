/* eslint-disable prettier/prettier */
import React from 'react'
import { CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react'

export const VehicleModal = ({ visible, onClose, vehicle }) => {
  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <h5>Vehicle Details</h5>
      </CModalHeader>
      <CModalBody>
        <p>Vehicle ID: {vehicle._id}</p>
        <p>Vehicle Brand: {vehicle.brand}</p>
        <p>Vehicle Model: {vehicle.model}</p>
        <p>Vehicle Year: {vehicle.year}</p>
      </CModalBody>
      <CModalFooter>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </CModalFooter>
    </CModal>
  )
}

export default VehicleModal
