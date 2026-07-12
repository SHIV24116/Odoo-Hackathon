import FormGrid from '../common/FormGrid'

function FuelForm({ vehicles }) {
  const fields = [
    { name: 'vehicle', label: 'Vehicle', type: 'select', options: vehicles.map((vehicle) => vehicle.name) },
    { name: 'liters', label: 'Liters' },
    { name: 'cost', label: 'Cost' },
    { name: 'date', label: 'Date', type: 'date' },
  ]
  return <FormGrid fields={fields} />
}

export default FuelForm