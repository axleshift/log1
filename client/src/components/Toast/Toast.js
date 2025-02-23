// components/Toast.js
import React, { createContext, useContext, useRef, useState } from 'react'
import { CToast, CToastBody, CToastHeader, CToaster } from '@coreui/react'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  const showToast = (title, message, color = 'primary') => {
    const newToast = (
      <CToast autohide={true} delay={3000} color={color}>
        <CToastHeader closeButton>
          <strong className="me-auto">{title}</strong>
          <small>just now</small>
        </CToastHeader>
        <CToastBody>{message}</CToastBody>
      </CToast>
    )
    addToast(newToast)
  }

  const showSuccess = (message) => {
    showToast('Success', message, 'success')
  }

  const showError = (message) => {
    showToast('Error', message, 'danger')
  }

  const showWarning = (message) => {
    showToast('Warning', message, 'warning')
  }

  const showInfo = (message) => {
    showToast('Info', message, 'info')
  }

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showWarning, showInfo }}>
      {children}
      <CToaster ref={toaster} push={toast} placement="bottom-end" />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
