import Badge from '../common/Badge'
import Table from '../common/Table'
import { formatCurrency, formatDate } from '../../utils/formatters'

const columns = [
  { key: 'vehicle', label: 'Vehicle', render: (log) => log.vehicle?.name },
  { key: 'serviceType', label: 'Service' },
  { key: 'date', label: 'Date', render: (log) => formatDate(log.date) },
  { key: 'cost', label: 'Cost', render: (log) => formatCurrency(log.cost) },
  { key: 'status', label: 'Status', render: (log) => <Badge>{log.status}</Badge> },
]

function MaintenanceTable({ logs }) {
  return <Table title="Service log" columns={columns} data={logs} />
}

export default MaintenanceTable
