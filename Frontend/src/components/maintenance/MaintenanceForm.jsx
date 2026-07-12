import FormGrid from '../common/FormGrid'

function MaintenanceForm({ vehicles }) {
  const fields = [
    { name: 'vehicle', label: 'Vehicle', type: 'select', options: vehicles.map((vehicle) => vehicle.name) },
    { name: 'serviceType', label: 'Service type' },
    { name: 'cost', label: 'Cost' },
    { name: 'date', label: 'Date', type: 'date' },
    { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Completed'] },
  ]
  return <FormGrid fields={fields} />
}

export default MaintenanceForm
