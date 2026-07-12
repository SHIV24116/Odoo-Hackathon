import Badge from '../common/Badge'
import Table from '../common/Table'
import { formatDate } from '../../utils/formatters'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'licenseNumber', label: 'License no.' },
  { key: 'category', label: 'Category' },
  { key: 'licenseExpiry', label: 'Expiry', render: (driver) => formatDate(driver.licenseExpiry) },
  { key: 'contact', label: 'Contact' },
  { key: 'safetyScore', label: 'Safety', render: (driver) => `${driver.safetyScore}%` },
  { key: 'status', label: 'Status', render: (driver) => <Badge>{driver.status}</Badge> },
]

function DriverTable({ drivers }) {
  return <Table columns={columns} data={drivers} />
}

export default DriverTable
