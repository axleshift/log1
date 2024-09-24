import React, { useState } from 'react'
import { CToast, CToastHeader, CToastBody } from '@coreui/react'

const Toast = ({ toast }) => {
  return (
    <CToast visible={toast.visible}>
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
        <strong className="me-auto">{toast.title}</strong>
      </CToastHeader>
      <CToastBody>{toast.body}</CToastBody>
    </CToast>
  )
}

export default Toast
