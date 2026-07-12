import api from './axios'

const toVehicleView = (vehicle) => ({
  ...vehicle,
  registrationNumber: vehicle.registrationNo,
  name: vehicle.model,
  capacityKg: vehicle.maxLoadCapacity,
  odometerKm: vehicle.odometer,
  status: vehicle.status?.replaceAll('_', ' '),
})

export async function getVehicles() {
  const { data } = await api.get('/vehicles')
  return data.map(toVehicleView)
}

export async function createVehicle(vehicle) {
  const payload = {
    registrationNo: vehicle.registrationNumber,
    model: vehicle.name,
    type: vehicle.type,
    maxLoadCapacity: Number(vehicle.capacityKg),
    odometer: Number(vehicle.odometerKm),
    acquisitionCost: Number(vehicle.acquisitionCost),
  }
  const { data } = await api.post('/vehicles', payload)
  return toVehicleView(data)
}
