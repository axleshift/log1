import React, { useState } from 'react'

import TableDispatching from './ComponentsDispatcing/TableDispatching'
import DispatchingTableHistory from './ComponentsDispatcing/DispatchingTableHistory'
import { CTabs, CTab, CTabList, CTabContent, CTabPanel, CAlert } from '@coreui/react'
import { getRole } from '../../../utils/auth'

const DispatchingItems = () => {
  const role = getRole()
  const adminRolse = ['admin', 'manager', 'super admin', 'warehouse manager', 'scheduler']
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleDispatchingSuccess = () => {
    setRefreshTrigger((prev) => prev + 1)
  }
  return (
    <>
      {role && adminRolse.includes(role) ? (
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
      ) : (
        <CAlert color="danger" className="text-center justify-content-center m-5">
          You do not have permission to access this page.
        </CAlert>
      )}
    </>
  )
}

export default DispatchingItems
