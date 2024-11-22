import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CAccordion,
  CHeader,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CSpinner,
} from '@coreui/react'

const tableMaintenanceInspection = () => {
  const API_URL = import.meta.env.VITE_APP_API_URL
  const api = axios.create({
    baseURL: API_URL,
  })
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await api.get('/api/v1/maintenance/inspections')
      setData(response.data.data)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {isLoading ? (
        <CSpinner color="primary" />
      ) : (
        <CAccordion>
          {data.map((item) => (
            <CAccordionItem key={item._id}>
              <CAccordionHeader>{item.inspector}</CAccordionHeader>
              <CAccordionBody>
                <CHeader>{item.vehicleId.regisNumber}</CHeader>
                <CHeader>{item.status}</CHeader>
                <CHeader>{item.description}</CHeader>
                {/* <CHeader>{item.scheduledDate}.</CHeader> */}
                <CHeader>{new Date(item.scheduledDate).toLocaleDateString()}</CHeader>
                <CHeader>{item.inspector}</CHeader>
              </CAccordionBody>
            </CAccordionItem>
          ))}
        </CAccordion>
      )}
    </>
  )
}

export default tableMaintenanceInspection
