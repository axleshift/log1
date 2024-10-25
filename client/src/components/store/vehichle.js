/* eslint-disable prettier/prettier */

import { create } from 'zustand'
// import axios from 'axios'

// const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5057'

// const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// })

export const useVehicleStore = create((set) => ({
  vehicle: [],
  setVehicle: (vehicle) => set({ vehicle }),
  createVehicle: async (newVehicle) => {
    if (
      !newVehicle.idNum ||
      !newVehicle.brand ||
      !newVehicle.model ||
      !newVehicle.year ||
      !newVehicle.regisNumber ||
      !newVehicle.type ||
      !newVehicle.capacity
    )
      return { success: false, message: 'All fields are required' }

    const res = await fetch('/api/v1/vehicle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newVehicle),
    })
    const data = await res.json()
    // update the ui immediately
    set((state) => ({ vehicle: [...state.vehicle, data.data] }))
    return { success: true, message: 'Vehicle created successfully' }
  },
  fetchVehicles: async () => {
    const res = await fetch('/api/v1/vehicle')
    const data = await res.json()
    set({ vehicle: data.data })
  },

  deleteVehicle: async (vid) => {
    const res = await fetch(`/api/v1/vehicle/${vid}`, {
      method: 'DELETE',
    })
    const data = await res.json()
    if (!data.success) return { success: false, message: data.message }
    // update the ui immediately
    set((state) => ({
      vehicle: state.vehicle.filter((vehicle) => vehicle._id !== vid),
    }))
    return { success: true, message: data.message }
  },

  updateVehicle: async (vid, updatedVehicle) => {
    const res = await fetch(`/api/v1/vehicle/${vid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedVehicle),
    })
    const data = await res.json()
    if (!data.success) return { success: false, message: data.message }
    // update the ui immediately
    set((state) => ({
      vehicle: state.vehicle.map((vehicle) => (vehicle._id === vid ? data.data : vehicle)),
    }))
    return { success: true, message: data.message }
  },
}))
