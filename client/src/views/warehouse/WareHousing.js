import React, { useState, useEffect } from 'react'
import TableWareHousing from './ComponentsWarehousing/TableWareHousing'
import ForReicevingItems from './ComponentsWarehousing/ForReicevingItems'
import ItemsTableWarehouse from './ComponentsWarehousing/ItemsTableWarehouse'
import {
  CCard,
  CContainer,
  CHeader,
  CCardBody,
  CTab,
  CTabList,
  CTabs,
  CTabContent,
  CTabPanel,
  CSpinner,
  CAlert,
} from '@coreui/react'
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
      <CTabs activeItemKey="Warehouse Items Details">
        <CTabList variant="tabs">
          <CTab itemKey="Warehouse Items Details">Warehouse Items Details</CTab>
          <CTab itemKey="For Reiceve">For Reiceve</CTab>
          <CTab itemKey="Items">Items</CTab>
        </CTabList>
        <CTabContent>
          <CTabPanel className="p-3" itemKey="Warehouse Items Details">
            <TableWareHousing
              warehousing={warehousing}
              loading={loading}
              error={error}
              onDeleteItem={handleDeleteItem}
              onUpdateItem={handleUpdateItem}
            />
          </CTabPanel>
          <CTabPanel className="p-3" itemKey="For Reiceve">
            <CCard>
              <CHeader>Item Reicevig</CHeader>
              <ForReicevingItems onAddItem={handleAddItem} />
            </CCard>
          </CTabPanel>
          <CTabPanel className="p-3" itemKey="Items">
            <ItemsTableWarehouse />
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </>
  )
}

export default WareHousing
