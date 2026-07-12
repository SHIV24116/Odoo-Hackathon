import Badge from '../common/Badge'
import Table from '../common/Table'
import { formatCapacity } from '../../utils/formatters'

const columns = [
  { key: 'code', label: 'Trip' },
  { key: 'route', label: 'Route' },
  { key: 'vehicle', label: 'Vehicle', render: (trip) => trip.vehicle?.name || '-' },
  { key: 'driver', label: 'Driver', render: (trip) => trip.driver?.name || 'Unassigned' },
  { key: 'cargoWeightKg', label: 'Cargo', render: (trip) => formatCapacity(trip.cargoWeightKg) },
  { key: 'status', label: 'Status', render: (trip) => <Badge>{trip.status}</Badge> },
]

function TripTable({ trips, title = 'Live board' }) {
  return <Table title={title} columns={columns} data={trips} />
}

export default TripTable
