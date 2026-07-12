import Button from '../components/common/Button'
import Page from '../components/common/Page'
import Table from '../components/common/Table'
import ExpenseTable from '../components/expense/ExpenseTable'
import { getExpenses, getFuelLogs } from '../services/expenseService'
import { formatCurrency, formatDate } from '../utils/formatters'

const fuelColumns = [
  { key: 'vehicle', label: 'Vehicle', render: (log) => log.vehicle?.name },
  { key: 'date', label: 'Date', render: (log) => formatDate(log.date) },
  { key: 'liters', label: 'Liters', render: (log) => `${log.liters} L` },
  { key: 'cost', label: 'Cost', render: (log) => formatCurrency(log.cost) },
]

function Expenses() {
  const fuelLogs = getFuelLogs()
  const expenses = getExpenses()
  const totalCost = [...fuelLogs, ...expenses].reduce((sum, item) => sum + item.cost, 0)
  return (
    <Page title="Fuel & Expense Management">
      <div className="toolbar"><Button className="small">Log fuel</Button><Button className="small">Add expense</Button></div>
      <Table title="Fuel logs" columns={fuelColumns} data={fuelLogs} />
      <ExpenseTable expenses={expenses} />
      <div className="total-line">Total operational cost: Rs. {formatCurrency(totalCost)}</div>
    </Page>
  )
}

export default Expenses
