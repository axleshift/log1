import React, { useState, useEffect } from 'react'
import api from './../../../../utils/api'
import { useToast } from '../../../../components/Toast/Toast'

const TableReceiving = () => {
  const { showError, showSuccess } = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [receiving, setReceiving] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div>
      <h1>Table Receiving</h1>
    </div>
  )
}

export default TableReceiving
