import React, { useState } from 'react'
import TableReceiving from './ComponentsReceiving/TableReceiving'
import ReceivingTableHistory from './ComponentsReceiving/ReceivingTableHistory'
import { CTabContent, CTabs, CTabList, CTab, CTabPanel, CAlert } from '@coreui/react'
import { getRole } from '../../../utils/auth'

const ReceivingItems = () => {
  const role = getRole()
  const adminRolse = ['admin', 'manager', 'super admin', 'warehouse manager', 'scheduler']
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleReceivingSuccess = () => {
    setRefreshTrigger((prev) => prev + 1)
  }
  return (
    <>
      {role && adminRolse.includes(role) ? (
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
      ) : (
        <CAlert color="danger" className="text-center justify-content-center m-5">
          You do not have permission to access this page.
        </CAlert>
      )}
    </>
  )
}

export default ReceivingItems
