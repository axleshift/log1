import React, { useState } from 'react'
import axios from 'axios'
import { CButton, CSpinner, CAlert } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const API = import.meta.env.VITE_APP_API_URL
const api = axios.create({
  baseURL: API,
})

const DeleteWarehouseLoc = ({ warehouseLoc, onDeleteWarehouseLoc }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const deleteWarehouseLoc = async () => {
    setLoading(true)
    try {
      const response = await api.delete(`/api/v1/warehouseLoc/delete/${warehouseLoc._id}`)
      console.log(response.data)
      if (response.status === 200) {
        alert('Warehouse Location deleted successfully')
        onDeleteWarehouseLoc(warehouseLoc._id)
        setLoading(false)
        setError(null)
      }
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <CAlert color="danger" className="text-center mt-5 w-75 mx-auto">
        Error: {error.message}
      </CAlert>
    )
  }

  return (
    <>
      <CButton color="danger" variant="outline" onClick={deleteWarehouseLoc} className="me-2">
        {loading ? <CSpinner size="sm" /> : <FontAwesomeIcon icon={faTrash} />}
      </CButton>
    </>
  )
}

export default DeleteWarehouseLoc
