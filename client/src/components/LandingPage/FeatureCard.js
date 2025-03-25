import React from 'react'
import { CContainer, CRow, CCol, CCard, CCardBody, CCardTitle, CCardText } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import './style.css'

const FeatureCard = ({ icon, title, description }) => {
  return (
    <CCol md={4}>
      <CCard className="feature-card h-100">
        <CCardBody className="text-center">
          <div className="feature-icon-wrapper mb-3">
            <CIcon icon={icon} size="xxl" className="feature-icon" />
          </div>
          <CCardTitle className="feature-title">{title}</CCardTitle>
          <CCardText className="feature-description">{description}</CCardText>
          <div className="feature-hover-content">
            <ul className="feature-list">
              {description.split('. ').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default FeatureCard
