import Table from '../common/Table'
import { formatCurrency, formatDate } from '../../utils/formatters'

const columns = [
  { key: 'type', label: 'Type' },
  { key: 'vehicle', label: 'Vehicle', render: (expense) => expense.vehicle?.name },
  { key: 'date', label: 'Date', render: (expense) => formatDate(expense.date) },
  { key: 'cost', label: 'Cost', render: (expense) => formatCurrency(expense.cost) },
]

function ExpenseTable({ expenses }) {
  return <Table title="Other expenses" columns={columns} data={expenses} />
}

export default ExpenseTable
