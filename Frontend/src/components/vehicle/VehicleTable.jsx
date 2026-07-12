import Badge from '../common/Badge'
import Table from '../common/Table'
import { formatCapacity, formatCurrency } from '../../utils/formatters'

const columns = [
  { key: 'registrationNumber', label: 'Reg. no.' },
  { key: 'name', label: 'Vehicle' },
  { key: 'type', label: 'Type' },
  { key: 'capacityKg', label: 'Capacity', render: (vehicle) => formatCapacity(vehicle.capacityKg) },
  { key: 'odometerKm', label: 'Odometer', render: (vehicle) => formatCurrency(vehicle.odometerKm) },
  { key: 'acquisitionCost', label: 'Acq. cost', render: (vehicle) => formatCurrency(vehicle.acquisitionCost) },
  { key: 'status', label: 'Status', render: (vehicle) => <Badge>{vehicle.status}</Badge> },
]

function VehicleTable({ vehicles }) {
  return <Table columns={columns} data={vehicles} />
}

export default VehicleTable
