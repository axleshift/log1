import React, { useState } from 'react'
import TableReceiving from './ComponentsReceiving/TableReceiving'
import ReceivingTableHistory from './ComponentsReceiving/ReceivingTableHistory'
import { CTabContent, CTabs, CTabList, CTab, CTabPanel } from '@coreui/react'

const ReceivingItems = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleReceivingSuccess = () => {
    setRefreshTrigger((prev) => prev + 1)
  }
  return (
    <>
      <h1>Receiving Items</h1>
      <CTabs activeItemKey="Receiving">
        <CTabList variant="tabs">
          <CTab itemKey="Receiving">Receiving</CTab>
          <CTab itemKey="Receiving History">Receiving History</CTab>
        </CTabList>
        <CTabContent>
          <CTabPanel className="p-3" itemKey="Receiving">
            <TableReceiving onSuccess={handleReceivingSuccess} />
          </CTabPanel>
          <CTabPanel className="p-3" itemKey="Receiving History">
            <ReceivingTableHistory onSuccess={handleReceivingSuccess} />
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </>
  )
}

export default ReceivingItems
