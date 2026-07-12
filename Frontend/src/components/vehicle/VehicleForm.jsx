import FormGrid from '../common/FormGrid'

const vehicleFields = [
  { name: 'registrationNumber', label: 'Registration number' },
  { name: 'name', label: 'Vehicle name/model' },
  { name: 'type', label: 'Type', type: 'select', options: ['Van', 'Truck', 'Mini Truck'] },
  { name: 'capacityKg', label: 'Maximum load capacity' },
  { name: 'odometerKm', label: 'Odometer' },
  { name: 'acquisitionCost', label: 'Acquisition cost' },
]

function VehicleForm() {
  return <FormGrid fields={vehicleFields} />
}

export default VehicleForm
