import React, { useState, useEffect } from 'react'
import TableWareHousing from './ComponentsWarehousing/TableWareHousing'
import ForReicevingItems from './ComponentsWarehousing/ForReicevingItems'
import ItemsTableWarehouse from './ComponentsWarehousing/ItemsTableWarehouse'
import { CCard, CHeader, CTab, CTabList, CTabs, CTabContent, CTabPanel } from '@coreui/react'
import api from '../../utils/api'

const WareHousing = () => {
  const [warehousing, setWarehousing] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await api.get('/api/v1/warehouse/items')
        setWarehousing(response.data.data)
        setItems(response.data.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [refresh])
  const handleRefresh = () => {
    setRefresh((prev) => prev + 1)
  }

  const handleAddItem = (newItem) => {
    setWarehousing((prevItems) => [...prevItems, newItem])
    setItems((prevItems) => [...prevItems, newItem])
    handleRefresh()
  }

  const handleDeleteItem = (deletedItemId) => {
    setWarehousing((prevItems) => prevItems.filter((item) => item._id !== deletedItemId))
    setItems((prevItems) => prevItems.filter((item) => item._id !== deletedItemId))
    handleRefresh()
  }

  const handleUpdateItem = (updatedItem) => {
    setWarehousing((prevItems) =>
      prevItems.map((item) => (item._id === updatedItem._id ? updatedItem : item)),
    )
    setItems((prevItems) =>
      prevItems.map((item) => (item._id === updatedItem._id ? updatedItem : item)),
    )
    handleRefresh()
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
              <CHeader>Item Reiceving</CHeader>
              <ForReicevingItems onAddItem={handleAddItem} />
            </CCard>
          </CTabPanel>
          <CTabPanel className="p-3" itemKey="Items">
            <CCard>
              <CHeader>Items</CHeader>
              <ItemsTableWarehouse items={items} loading={loading} error={error} />
            </CCard>
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </>
  )
}

export default WareHousing
