import { drivers, expenses, fuelLogs, maintenanceLogs, roles, trips, vehicles } from '../data/mockData'

const byId = (items) => Object.fromEntries(items.map((item) => [item.id, item]))

export function getVehicles() {
  return vehicles
}

export function getDrivers() {
  return drivers
}

export function getTrips() {
  const vehicleMap = byId(vehicles)
  const driverMap = byId(drivers)

  return trips.map((trip) => ({
    ...trip,
    route: `${trip.source} to ${trip.destination}`,
    vehicle: vehicleMap[trip.vehicleId],
    driver: trip.driverId ? driverMap[trip.driverId] : null,
  }))
}

export function getMaintenanceLogs() {
  const vehicleMap = byId(vehicles)
  return maintenanceLogs.map((log) => ({ ...log, vehicle: vehicleMap[log.vehicleId] }))
}

export function getFuelLogs() {
  const vehicleMap = byId(vehicles)
  return fuelLogs.map((log) => ({ ...log, vehicle: vehicleMap[log.vehicleId] }))
}

export function getExpenses() {
  const vehicleMap = byId(vehicles)
  return expenses.map((expense) => ({ ...expense, vehicle: vehicleMap[expense.vehicleId] }))
}

export function getRoles() {
  return roles
}

export function getDashboardMetrics() {
  const activeVehicles = vehicles.filter((vehicle) => vehicle.status !== 'Retired').length
  const availableVehicles = vehicles.filter((vehicle) => vehicle.status === 'Available').length
  const maintenanceVehicles = vehicles.filter((vehicle) => vehicle.status === 'In Shop').length
  const activeTrips = trips.filter((trip) => trip.status === 'Dispatched').length
  const pendingTrips = trips.filter((trip) => trip.status === 'Draft').length
  const driversOnDuty = drivers.filter((driver) => driver.status === 'On Trip').length
  const utilizedVehicles = vehicles.filter((vehicle) => vehicle.status === 'On Trip').length
  const fleetUtilization = activeVehicles ? (utilizedVehicles / activeVehicles) * 100 : 0

  return [
    { label: 'Active vehicles', value: activeVehicles },
    { label: 'Available vehicles', value: availableVehicles },
    { label: 'Vehicles in maintenance', value: maintenanceVehicles },
    { label: 'Active trips', value: activeTrips },
    { label: 'Pending trips', value: pendingTrips },
    { label: 'Drivers on duty', value: driversOnDuty },
    { label: 'Fleet utilization', value: `${Math.round(fleetUtilization)}%` },
  ]
}

export function getAnalytics() {
  const totalFuelCost = fuelLogs.reduce((sum, log) => sum + log.cost, 0)
  const totalMaintenanceCost = maintenanceLogs.reduce((sum, log) => sum + log.cost, 0)
  const totalExpenseCost = expenses.reduce((sum, expense) => sum + expense.cost, 0)
  const totalRevenue = trips.reduce((sum, trip) => sum + trip.revenue, 0)
  const totalDistance = trips.reduce((sum, trip) => sum + trip.plannedDistanceKm, 0)
  const totalFuel = fuelLogs.reduce((sum, log) => sum + log.liters, 0)
  const acquisitionCost = vehicles.reduce((sum, vehicle) => sum + vehicle.acquisitionCost, 0)
  const operationalCost = totalFuelCost + totalMaintenanceCost + totalExpenseCost
  const roi = acquisitionCost ? ((totalRevenue - operationalCost) / acquisitionCost) * 100 : 0

  return {
    fuelEfficiency: totalFuel ? totalDistance / totalFuel : 0,
    fleetUtilization: 81,
    operationalCost,
    vehicleRoi: roi,
    monthlyRevenue: [
      { label: 'May', value: 38 },
      { label: 'Jun', value: 48 },
      { label: 'Jul', value: 56 },
      { label: 'Aug', value: 66 },
      { label: 'Sep', value: 62 },
      { label: 'Oct', value: 74 },
    ],
    topCostVehicles: [
      { label: 'Truck-12', value: 92 },
      { label: 'Mini-04', value: 46 },
      { label: 'Van-05', value: 18 },
    ],
  }
}

export function getVehicleStatusChart() {
  return ['Available', 'On Trip', 'In Shop', 'Retired'].map((status) => ({
    label: status,
    value: vehicles.filter((vehicle) => vehicle.status === status).length * 20,
  }))
}
