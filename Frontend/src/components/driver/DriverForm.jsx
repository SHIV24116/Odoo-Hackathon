import FormGrid from '../common/FormGrid'

const driverFields = [
  { name: 'name', label: 'Name' },
  { name: 'licenseNumber', label: 'License number' },
  { name: 'category', label: 'License category', type: 'select', options: ['LMV', 'HMV'] },
  { name: 'licenseExpiry', label: 'License expiry date', type: 'date' },
  { name: 'contact', label: 'Contact number' },
]

function DriverForm() {
  return <FormGrid fields={driverFields} />
}

export default DriverForm