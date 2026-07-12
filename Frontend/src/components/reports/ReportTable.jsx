import Table from '../common/Table'
import { formatCurrency } from '../../utils/formatters'

const columns = [
  { key: 'label', label: 'Metric' },
  { key: 'value', label: 'Value', render: (row) => typeof row.value === 'number' ? formatCurrency(row.value) : row.value },
]

function ReportTable({ rows }) {
  return <Table title="Report summary" columns={columns} data={rows} />
}

export default ReportTable
