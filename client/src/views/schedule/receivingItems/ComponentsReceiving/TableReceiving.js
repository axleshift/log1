import React, { useState, useEffect } from 'react'
import api from './../../../../utils/api'
import { useToast } from '../../../../components/Toast/Toast'

const TableReceiving = () => {
  const { showError, showSuccess } = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [receiving, setReceiving] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const fectchShipmment = async () => {
    setLoading(true)
    try {
      const response = await api.get('https://log2_backend.chysev.com/api/v1/shipment')
      console.log(response.data)
      if (response.status === 200) {
        setReceiving(response.data)
        setLoading(false)
        setError(null)
      }
    } catch (error) {
      setError(error)
      showError(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fectchShipmment()
  }, [])

  return (
    <div>
      <h1>Table Receiving</h1>
    </div>
  )
}

export default TableReceiving
