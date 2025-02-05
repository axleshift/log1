// import React from 'react'
// import {
//   CTable,
//   CTableHead,
//   CTableBody,
//   CTableHeaderCell,
//   CTableRow,
//   CTableDataCell,
// } from '@coreui/react'

// const TableReceiving = () => {
//   const receiving = [
//     // array of receiving items
//     {
//       id: 1,
//       vehicleId: 1,
//       pickUpLocation: 'New York',
//       warehouseLocation: 'Los Angeles',
//       scheduledDate: '2022-10-10',
//       weight: 1000,
//     },
//     {
//       id: 2,
//       vehicleId: 2,
//       pickUpLocation: 'Miami',
//       warehouseLocation: 'Dallas',
//       scheduledDate: '2022-10-11',
//       weight: 2000,
//     },
//     {
//       id: 3,
//       vehicleId: 3,
//       pickUpLocation: 'Chicago',
//       warehouseLocation: 'Houston',
//       scheduledDate: '2022-10-12',
//       weight: 3000,
//     },
//     {
//       id: 4,
//       vehicleId: 4,
//       pickUpLocation: 'Phoenix',
//       warehouseLocation: 'Philadelphia',
//       scheduledDate: '2022-10-13',
//       weight: 4000,
//     },
//     {
//       id: 5,
//       vehicleId: 5,
//       pickUpLocation: 'San Antonio',
//       warehouseLocation: 'San Diego',
//       scheduledDate: '2022-10-14',
//       weight: 5000,
//     },
//   ]

//   return (
//     <>
//       <CTable striped>
//         <CTableHead>
//           <CTableRow>
//             <CTableHeaderCell>Vehicle ID</CTableHeaderCell>
//             <CTableHeaderCell>Pick Up Location</CTableHeaderCell>
//             <CTableHeaderCell>Warehouse Location</CTableHeaderCell>
//             <CTableHeaderCell>Scheduled Date</CTableHeaderCell>
//             <CTableHeaderCell>Weight</CTableHeaderCell>
//           </CTableRow>
//         </CTableHead>
//         <CTableBody>
//           {receiving.map((item) => (
//             <CTableRow key={item.id}>
//               <CTableDataCell>{item.vehicleId}</CTableDataCell>
//               <CTableDataCell>{item.pickUpLocation}</CTableDataCell>
//               <CTableDataCell>{item.warehouseLocation}</CTableDataCell>
//               <CTableDataCell>{item.scheduledDate}</CTableDataCell>
//               <CTableDataCell>{item.weight}</CTableDataCell>
//             </CTableRow>
//           ))}
//         </CTableBody>
//       </CTable>
//     </>
//   )
// }

// export default TableReceiving

import React from 'react'
import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

const TableReceiving = () => {
  const receiving = [
    // array of receiving items
    {
      id: 1,
      vehicleId: 1,
      pickUpLocation: 'New York',
      warehouseLocation: 'Los Angeles',
      scheduledDate: '2022-10-10',
      weight: 1000,
    },
    {
      id: 2,
      vehicleId: 2,
      pickUpLocation: 'Miami',
      warehouseLocation: 'Dallas',
      scheduledDate: '2022-10-11',
      weight: 2000,
    },
    {
      id: 3,
      vehicleId: 3,
      pickUpLocation: 'Chicago',
      warehouseLocation: 'Houston',
      scheduledDate: '2022-10-12',
      weight: 3000,
    },
    {
      id: 4,
      vehicleId: 4,
      pickUpLocation: 'Phoenix',
      warehouseLocation: 'Philadelphia',
      scheduledDate: '2022-10-13',
      weight: 4000,
    },
    {
      id: 5,
      vehicleId: 5,
      pickUpLocation: 'San Antonio',
      warehouseLocation: 'San Diego',
      scheduledDate: '2022-10-14',
      weight: 5000,
    },
  ]

  return (
    <CAccordion>
      {receiving.map((item) => (
        <CAccordionItem key={item.id}>
          <CAccordionHeader>Vehicle ID: {item.vehicleId}</CAccordionHeader>
          <CAccordionBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Pick Up Location</CTableHeaderCell>
                  <CTableHeaderCell>Warehouse Location</CTableHeaderCell>
                  <CTableHeaderCell>Scheduled Date</CTableHeaderCell>
                  <CTableHeaderCell>Weight</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>{item.pickUpLocation}</CTableDataCell>
                  <CTableDataCell>{item.warehouseLocation}</CTableDataCell>
                  <CTableDataCell>{item.scheduledDate}</CTableDataCell>
                  <CTableDataCell>{item.weight}</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CAccordionBody>
        </CAccordionItem>
      ))}
    </CAccordion>
  )
}

export default TableReceiving
