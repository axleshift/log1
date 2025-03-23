import React, { useState, useEffect } from 'react'
import AddWarehouseLoc from './ComponentsWarehouseLoc/AddWarehouseLoc'
import TablesWarehouseLoc from './ComponentsWarehouseLoc/TablesWarehouseLoc'
import { CHeader } from '@coreui/react'
import api from '../../utils/api'

const token = sessionStorage.getItem('accessToken')

const WareHouseLoc = () => {
  const [warehouseLoc, setWarehouseLoc] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWarehouseLoc = async () => {
    setLoading(true)
    try {
      const response = await api.get('api/v1/warehouseLoc/locations')
      if (response.status === 200) {
        setWarehouseLoc(response.data.data)
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWarehouseLoc()
  }, [])

  const handleAddWarehouseLoc = (newWarehouseLoc) => {
    setWarehouseLoc((prevWarehouseLoc) => [...prevWarehouseLoc, newWarehouseLoc])
  }

  const handleDeleteWarehouseLoc = (deletedWarehouseLocId) => {
    setWarehouseLoc((prevWarehouseLoc) =>
      prevWarehouseLoc.filter((loc) => loc._id !== deletedWarehouseLocId),
    )
  }

  const handleUpdateWarehouseLoc = (updatedWarehouseLoc) => {
    setWarehouseLoc((prevWarehouseLoc) =>
      prevWarehouseLoc.map((loc) =>
        loc._id === updatedWarehouseLoc._id ? updatedWarehouseLoc : loc,
      ),
    )
  }
  return (
    <>
      <CHeader>Warehouse location</CHeader>
      <AddWarehouseLoc onAddWarehouseLoc={handleAddWarehouseLoc} />
      <TablesWarehouseLoc
        warehouseLoc={warehouseLoc}
        loading={loading}
        error={error}
        onDeleteWarehouseLoc={handleDeleteWarehouseLoc}
        onUpdateWarehouseLoc={handleUpdateWarehouseLoc}
      />
    </>
  )
}

export default WareHouseLoc
