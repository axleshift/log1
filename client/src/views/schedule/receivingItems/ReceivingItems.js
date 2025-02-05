import React, { useState } from 'react'
import AddReceiving from './ComponentsReceiving/AddReceiving'
import TableReceiving from './ComponentsReceiving/TableReceiving'

const ReceivingItems = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const handleAdd = () => {
    // Refresh the list or perform any other action after adding
  }

  return (
    <>
      <h1>Receiving Items</h1>
      <button onClick={() => setModalVisible(true)}>Add Receiving Schedule</button>
      <AddReceiving
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAdd}
      />
      <TableReceiving />
    </>
  )
}

export default ReceivingItems
