import FormGrid from '../common/FormGrid'

function ExpenseForm({ vehicles }) {
  const fields = [
    { name: 'vehicle', label: 'Vehicle', type: 'select', options: vehicles.map((vehicle) => vehicle.name) },
    { name: 'type', label: 'Expense type', type: 'select', options: ['Toll', 'Permit', 'Parking', 'Maintenance'] },
    { name: 'quantity', label: 'Quantity' },
    { name: 'cost', label: 'Cost' },
  ]
  return <FormGrid fields={fields} />
}

export default ExpenseForm
