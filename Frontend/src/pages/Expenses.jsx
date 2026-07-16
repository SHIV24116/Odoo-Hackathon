import { useEffect, useState } from 'react'
import Button from '../components/common/Button'
import Page from '../components/common/Page'
import Table from '../components/common/Table'
import ExpenseTable from '../components/expense/ExpenseTable'
import { createExpense, createFuelLog, getExpenses, getFuelLogs } from '../services/expenseService'
import { getVehicles } from '../services/vehicleService'
import { formatCurrency, formatDate } from '../utils/formatters'

const fuelColumns = [
  { key: 'vehicle', label: 'Vehicle', render: (log) => log.vehicle?.name },
  { key: 'date', label: 'Date', render: (log) => formatDate(log.date) },
  { key: 'liters', label: 'Liters', render: (log) => `${log.liters} L` },
  { key: 'cost', label: 'Cost', render: (log) => formatCurrency(log.cost) },
]

function Expenses() {
  const [fuelLogs, setFuelLogs] = useState([])
  const [expenses, setExpenses] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [error, setError] = useState('')
  const [fuelForm, setFuelForm] = useState({ vehicleId: '', liters: '', cost: '', date: '' })
  const [expenseForm, setExpenseForm] = useState({ vehicleId: '', type: 'OTHER', cost: '', date: '', description: '' })

  async function loadData() {
    const [nextFuelLogs, nextExpenses, nextVehicles] = await Promise.all([getFuelLogs(), getExpenses(), getVehicles()])
    setFuelLogs(nextFuelLogs)
    setExpenses(nextExpenses)
    setVehicles(nextVehicles)
  }

  useEffect(() => { loadData().catch((err) => setError(err.response?.data?.message || err.message)) }, [])

  function updateFuel(event) {
    setFuelForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function updateExpense(event) {
    setExpenseForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function submitFuel(event) {
    event.preventDefault()
    setError('')
    try {
      await createFuelLog(fuelForm)
      setFuelForm({ vehicleId: '', liters: '', cost: '', date: '' })
      await loadData()
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  }

  async function submitExpense(event) {
    event.preventDefault()
    setError('')
    try {
      await createExpense(expenseForm)
      setExpenseForm({ vehicleId: '', type: 'OTHER', cost: '', date: '', description: '' })
      await loadData()
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  }

  const totalCost = [...fuelLogs, ...expenses].reduce((sum, item) => sum + item.cost, 0)
  return (
    <Page title="Fuel & Expense Management">
      <div className="split-workbench"><form className="form-grid" onSubmit={submitFuel}>
        <label>Fuel vehicle<select name="vehicleId" value={fuelForm.vehicleId} onChange={updateFuel}><option value="">Select vehicle</option>{vehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>)}</select></label>
        <label>Liters<input name="liters" type="number" min="0" step="any" value={fuelForm.liters} onChange={updateFuel} /></label>
        <label>Cost<input name="cost" type="number" min="0" value={fuelForm.cost} onChange={updateFuel} /></label>
        <label>Date<input name="date" type="date" value={fuelForm.date} onChange={updateFuel} /></label>
        <Button type="submit" className="small">Log fuel</Button>
      </form><form className="form-grid" onSubmit={submitExpense}>
        <label>Expense vehicle<select name="vehicleId" value={expenseForm.vehicleId} onChange={updateExpense}><option value="">Select vehicle</option>{vehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>)}</select></label>
        <label>Type<select name="type" value={expenseForm.type} onChange={updateExpense}><option value="TOLL">Toll</option><option value="MAINTENANCE">Maintenance</option><option value="OTHER">Other</option></select></label>
        <label>Cost<input name="cost" type="number" min="0" value={expenseForm.cost} onChange={updateExpense} /></label>
        <label>Date<input name="date" type="date" value={expenseForm.date} onChange={updateExpense} /></label>
        <label>Description<input name="description" value={expenseForm.description} onChange={updateExpense} /></label>
        <Button type="submit" className="small">Add expense</Button>
      </form></div>
      {error && <p className="error-text">{error}</p>}
      <Table title="Fuel logs" columns={fuelColumns} data={fuelLogs} />
      <ExpenseTable expenses={expenses} />
      <div className="total-line">Total operational cost: Rs. {formatCurrency(totalCost)}</div>
    </Page>
  )
}

export default Expenses
