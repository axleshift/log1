import React, { useState } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilTruck,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavbar, CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTruck,
  faWarehouse,
  faCalendarDays,
  faUser,
  faWrench,
  faGasPump,
  faLocationDot,
  faArrowRightToBracket,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { icon } from '@fortawesome/fontawesome-svg-core'
const NavIcon = ({ icon }) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <FontAwesomeIcon
      icon={icon}
      bounce={isHovering}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="me-2"
    />
  )
}

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  // Replace the Fleet Management dropdown section with:
  {
    component: CNavTitle,
    name: ' Fleet Management ',
  },
  {
    component: CNavItem,
    name: ' Vehicles Management',
    to: '/fleetManagement/VehicleManagement',
    icon: <NavIcon icon={faTruck} />,
  },
  {
    component: CNavItem,
    name: ' Drivers Management ',
    to: '/fleetManagement/DriverManagement',
    icon: <NavIcon icon={faUser} />,
  },
  {
    component: CNavItem,
    name: 'Maintenance Management',
    to: '/fleetManagement/MaintenanceManagement',
    icon: <NavIcon icon={faWrench} />,
  },
  {
    component: CNavItem,
    name: 'Fuel Management ',
    to: '/fleetManagement/FuelManagement',
    icon: <NavIcon icon={faGasPump} />,
  },

  // Replace the Schedules dropdown section with:
  {
    component: CNavTitle,
    name: ' Schedules ',
  },
  {
    component: CNavItem,
    name: 'Receive Items',
    to: '/schedule/ReceivingItems',
    icon: <NavIcon icon={faArrowRightToBracket} />,
  },
  {
    component: CNavItem,
    name: 'Dispatch Items',
    to: '/schedule/DispatchingItems',
    icon: <NavIcon icon={faArrowRightFromBracket} />,
  },

  // Replace the Warehouse dropdown section with:
  {
    component: CNavTitle,
    name: ' Warehouse ',
  },
  {
    component: CNavItem,
    name: 'Warehouse Location',
    to: '/wareHouseLoc/WarehouseLoc',
    icon: <NavIcon icon={faLocationDot} />,
  },
  {
    component: CNavItem,
    name: 'Warehouse',
    to: '/warehouse/Warehousing',
    icon: <NavIcon icon={faWarehouse} />,
  },

  // {
  //   component: CNavGroup,
  //   name: 'Fleet Management',
  //   to: '/fleetManagement',
  //   icon: <FontAwesomeIcon icon={faTruck} className="m-2" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Vehicles Management',
  //       to: '/fleetManagement/VehicleManagement',
  //     },
  //     { component: CNavItem, name: 'Drivers Management', to: '/fleetManagement/DriverManagement' },
  //     {
  //       component: CNavItem,
  //       name: 'Maintenance Management',
  //       to: '/fleetManagement/MaintenanceManagement',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Fuel Management',
  //       to: '/fleetManagement/FuelManagement',
  //     },
  //   ],
  // },

  // {
  //   component: CNavGroup,
  //   name: 'Schedules',
  //   to: '/schedule',
  //   icon: <FontAwesomeIcon icon={faCalendarDays} className="m-2 " />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Receive Items',
  //       to: '/schedule/ReceivingItems',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Dispatch Items',
  //       to: '/schedule/DispatchingItems',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Warehouse',
  //   to: '/warehouse',
  //   icon: <FontAwesomeIcon icon={faWarehouse} className="m-2" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Warehouse Location',
  //       to: '/wareHouseLoc/WarehouseLoc',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Warehouse',
  //       to: '/warehouse/Warehousing',
  //     },
  //   ],
  // },
]

export default _nav
