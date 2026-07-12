import Button from '../common/Button'
import FormGrid from '../common/FormGrid'

function TripForm({ availableVehicles, availableDrivers }) {
  const fields = [
    { name: 'source', label: 'Source' },
    { name: 'destination', label: 'Destination' },
    { name: 'vehicle', label: 'Vehicle', type: 'select', options: availableVehicles.map((vehicle) => vehicle.name) },
    { name: 'driver', label: 'Driver', type: 'select', options: availableDrivers.map((driver) => driver.name) },
    { name: 'cargoWeightKg', label: 'Cargo weight' },
    { name: 'plannedDistanceKm', label: 'Planned distance' },
  ]

  return (
    <>
      <div className="stepper"><span className="done">Draft</span><span className="active-step">Dispatched</span><span>Completed</span><span>Cancelled</span></div>
      <FormGrid fields={fields} />
      <div className="validation-box">Dispatch validates capacity, license expiry, and current vehicle/driver status.</div>
      <div className="form-row"><Button>Dispatch trip</Button><Button variant="ghost">Cancel</Button></div>
    </>
  )
}

export default TripForm
