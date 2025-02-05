import React, { useState, useEffect } from 'react'
import AddItem from './ComponentsWarehousing/AddItem'
import TableWareHousing from './ComponentsWarehousing/TableWareHousing'
import { CCard, CContainer, CHeader, CCardBody } from '@coreui/react'
import axios from 'axios'

const API = import.meta.env.VITE_APP_API_URL
const api = axios.create({
  baseURL: API,
})

const WareHousing = () => {
  const [warehousing, setWarehousing] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWarehousing = async () => {
    setLoading(true)
    try {
      const response = await api.get('/api/v1/warehouse/items')
      if (response.status === 200) {
        setWarehousing(response.data.data)
      }
    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWarehousing()
  }, [])

  const handleAddItem = (newItem) => {
    setWarehousing((prevItems) => [...prevItems, newItem])
  }

  const handleDeleteItem = (deletedItemId) => {
    setWarehousing((prevItems) => prevItems.filter((item) => item._id !== deletedItemId))
  }

  const handleUpdateItem = (updatedItem) => {
    setWarehousing((prevItems) =>
      prevItems.map((item) => (item._id === updatedItem._id ? updatedItem : item)),
    )
  }

  return (
    <>
      <CHeader className="text-center">WareHousing</CHeader>
      <CContainer className="m-3">
        <AddItem onAddItem={handleAddItem} />
      </CContainer>
      <CCard>
        <CHeader>Item List</CHeader>
        <CCardBody className="md-3">
          <TableWareHousing
            warehousing={warehousing}
            loading={loading}
            error={error}
            onDeleteItem={handleDeleteItem}
            onUpdateItem={handleUpdateItem}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default WareHousing
