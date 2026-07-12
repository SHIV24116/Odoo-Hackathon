import api from './axios'

const toTripView = (trip) => ({
  ...trip,
  code: `TRIP-${trip.id}`,
  route: `${trip.source} to ${trip.destination}`,
  cargoWeightKg: trip.cargoWeight,
  plannedDistanceKm: trip.plannedDistance,
  status: trip.status?.replaceAll('_', ' '),
  vehicle: trip.vehicle ? {
    ...trip.vehicle,
    name: trip.vehicle.model,
    registrationNumber: trip.vehicle.registrationNo,
  } : null,
  driver: trip.driver || null,
})

export async function getTrips() {
  const { data } = await api.get('/trips')
  return data.map(toTripView)
}

export async function createTrip(trip) {
  const payload = {
    source: trip.source,
    destination: trip.destination,
    cargoWeight: Number(trip.cargoWeightKg),
    plannedDistance: Number(trip.plannedDistanceKm),
    vehicleId: Number(trip.vehicleId),
    driverId: Number(trip.driverId),
  }
  const { data } = await api.post('/trips', payload)
  return toTripView(data)
}
