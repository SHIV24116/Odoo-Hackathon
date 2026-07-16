import api from './axios'

const toMaintenanceView = (maintenance) => ({
  ...maintenance,
  date: maintenance.createdAt,
  vehicle: maintenance.vehicle ? { ...maintenance.vehicle, name: maintenance.vehicle.model } : null,
  status: maintenance.status?.replaceAll('_', ' '),
})

export async function getMaintenanceLogs() {
  const { data } = await api.get('/maintenance')
  return data.map(toMaintenanceView)
}

export async function createMaintenance(log) {
  const { data } = await api.post('/maintenance', {
    vehicleId: Number(log.vehicleId),
    serviceType: log.serviceType,
    cost: Number(log.cost),
    status: log.status,
  })
  return toMaintenanceView(data)
}
