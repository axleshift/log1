import React, { useState, useEffect } from 'react'
import {
  CTable,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CTableHead,
  CTableBody,
} from '@coreui/react'
import axios from 'axios'
const API = import.meta.env.VITE_APP_API_URL
const api = axios.create({
  baseURL: API,
})

const ItemsTableWarehouse = () => {
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get('/api/v1/warehouse/items/all')
        console.log('Response data:', response.data)
        const groupedItems = response.data.data
        console.log('data in all items', groupedItems)
        setItems(groupedItems)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchItems()
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Items Table</h1>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Item Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {items &&
            items.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{item.itemName}</CTableDataCell>
                <CTableDataCell>{item.quantity}</CTableDataCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default ItemsTableWarehouse
