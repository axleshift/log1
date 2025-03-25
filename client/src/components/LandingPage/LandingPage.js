import React from 'react'
import { useNavigate } from 'react-router-dom'
import FeatureCard from './FeatureCard'
import { CContainer, CRow, CCol, CButton } from '@coreui/react'
import { cilTruck, cilSettings, cilFactory } from '@coreui/icons'
import './style.css'

const LandingPage = () => {
  const navigate = useNavigate()
  const features = [
    {
      icon: cilTruck,
      title: 'Vehicle & Driver Management',
      description:
        'Vehicle registration to the system. Vehicle Expiration alerts.  Assigning drivers to the vehicles.',
    },
    {
      icon: cilSettings,
      title: 'Maintenance & Fuel Control',
      description:
        'Preventive maintenance scheduling. Repair history tracking. Fuel consumption analytics.  Service reminder alerts.',
    },
    {
      icon: cilFactory,
      title: 'Warehouse & Schedule Management',
      description: 'Delivery coordination. Resource allocation. Real-time stock tracking.',
    },
  ]

  return (
    <div className=" min-vh-100  align-items-center landing-page-background">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8} className="text-center content-overlay">
            <h1 className="display-4 mb-4 ">Freight Management System Logistics 1</h1>
            <p className="lead mb-4">
              Effortlessly manage your freight operations with our refined Freight Management
              System. Whether you're handling shipments, tracking deliveries, fuel, or vehicle parts
              stock, our platform ensures efficiency and cost-effectiveness.
            </p>

            <CButton color="primary" size="lg" onClick={() => navigate('/login')} className="mx-2">
              Login
            </CButton>
          </CCol>
        </CRow>

        <CRow className="justify-content-center g-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </CRow>
      </CContainer>
    </div>
  )
}

export default LandingPage
