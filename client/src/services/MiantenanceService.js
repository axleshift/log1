import axios from 'axios'

const API_URL = import.meta.env.REACT_APP_API_URL

const maintenanceService = {
  getAllMaintenance: async () => {
    const response = await axios.get(`${API_URL}/maintenance`)
    return response.data
  },

  createMaintenance: async (maintenanceData) => {
    const response = await axios.post(`${API_URL}/maintenance`, maintenanceData)
    return response.data
  },

  updateMaintenance: async (id, maintenanceData) => {
    const response = await axios.put(`${API_URL}/maintenance/${id}`, maintenanceData)
    return response.data
  },

  deleteMaintenance: async (id) => {
    const response = await axios.delete(`${API_URL}/maintenance/${id}`)
    return response.data
  },
}

export default maintenanceService
