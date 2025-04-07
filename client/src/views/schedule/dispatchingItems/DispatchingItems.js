import React, { useState } from 'react'

import TableDispatching from './ComponentsDispatcing/TableDispatching'
import DispatchingTableHistory from './ComponentsDispatcing/DispatchingTableHistory'
import { CTabs, CTab, CTabList, CTabContent, CTabPanel } from '@coreui/react'

const DispatchingItems = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleDispatchingSuccess = () => {
    setRefreshTrigger((prev) => prev + 1)
  }
  return (
    <>
      <h1>Dispatching Items</h1>
      <CTabs activeItemKey="Dispatching">
        <CTabList variant="tabs">
          <CTab itemKey="Dispatching">Dispatching</CTab>
          <CTab itemKey="Dispatching History">Dispatching History</CTab>
        </CTabList>
        <CTabContent>
          <CTabPanel className="p-3" itemKey="Dispatching">
            <TableDispatching onSuccess={handleDispatchingSuccess} />
          </CTabPanel>
          <CTabPanel className="p-3" itemKey="Dispatching History">
            <DispatchingTableHistory onSuccess={handleDispatchingSuccess} />
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </>
  )
}

export default DispatchingItems
