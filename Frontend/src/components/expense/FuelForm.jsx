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

<<<<<<< HEAD
export default FuelForm
=======
export default FuelForm
>>>>>>> 570cc98e9f72169d8aee359744c922b443c2483a
