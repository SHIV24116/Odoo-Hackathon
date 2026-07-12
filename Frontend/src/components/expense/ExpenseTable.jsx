import Badge from '../common/Badge'
import Table from '../common/Table'
import { formatCurrency } from '../../utils/formatters'

const columns = [
  { key: 'type', label: 'Type' },
  { key: 'vehicle', label: 'Vehicle', render: (expense) => expense.vehicle?.name },
  { key: 'quantity', label: 'Qty' },
  { key: 'cost', label: 'Cost', render: (expense) => formatCurrency(expense.cost) },
  { key: 'status', label: 'Status', render: (expense) => <Badge>{expense.status}</Badge> },
]

function ExpenseTable({ expenses }) {
  return <Table title="Other expenses" columns={columns} data={expenses} />
}

export default ExpenseTable