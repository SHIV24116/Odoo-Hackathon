import api from './axios'

const toVehicle = (vehicle) => vehicle ? { ...vehicle, name: vehicle.model } : null
const toExpenseView = (expense) => ({ ...expense, cost: expense.amount, vehicle: toVehicle(expense.vehicle) })
const toFuelView = (log) => ({ ...log, vehicle: toVehicle(log.vehicle) })

export async function getExpenses() {
  const { data } = await api.get('/expenses')
  return data.map(toExpenseView)
}

export async function createExpense(expense) {
  const { data } = await api.post('/expenses', {
    vehicleId: Number(expense.vehicleId),
    type: expense.type,
    amount: Number(expense.cost),
    description: expense.description || undefined,
    date: expense.date,
  })
  return toExpenseView(data)
}

export async function getFuelLogs() {
  const { data } = await api.get('/expenses/fuel')
  return data.map(toFuelView)
}

export async function createFuelLog(log) {
  const { data } = await api.post('/expenses/fuel', {
    vehicleId: Number(log.vehicleId),
    liters: Number(log.liters),
    cost: Number(log.cost),
    date: log.date,
  })
  return toFuelView(data)
}
