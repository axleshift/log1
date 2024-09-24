/* eslint-disable prettier/prettier */
import React from 'react'
import { CToast, CToastHeader, CToastBody } from '@coreui/react'

const toast = () => {
  const [show, setShow] = useState(true)
  const toggle = () => setShow(!show)
  return (
    <div>
      <CToast show={show} onClose={toggle}>
        <CToastHeader closeButton>
          <svg
            className="rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect width="100%" height="100%" fill="#007aff"></rect>
          </svg>
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </CToastHeader>
        <CToastBody>Hello, world! This is a toast message.</CToastBody>
      </CToast>
    </div>
  )
}

export default toast
