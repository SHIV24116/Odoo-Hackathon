import { useEffect, useState } from 'react'
import Button from '../components/common/Button'
import Panel from '../components/common/Panel'
import Page from '../components/common/Page'
import TripTable from '../components/trip/TripTable'
import { getDrivers } from '../services/driverService'
import { createTrip, getTrips } from '../services/tripService'
import { getVehicles } from '../services/vehicleService'

const initialForm = {
  source: '',
  destination: '',
  cargoWeightKg: '',
  plannedDistanceKm: '',
  vehicleId: '',
  driverId: '',
}

function Trips() {
  const [trips, setTrips] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [drivers, setDrivers] = useState([])
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  async function loadData() {
    const [nextTrips, nextVehicles, nextDrivers] = await Promise.all([getTrips(), getVehicles(), getDrivers()])
    setTrips(nextTrips)
    setVehicles(nextVehicles)
    setDrivers(nextDrivers)
  }

  useEffect(() => {
    loadData().catch((err) => setError(err.message))
  }, [])

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    try {
      await createTrip(form)
      setForm(initialForm)
      await loadData()
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  }

  return (
    <Page title="Trip Dispatcher">
      <div className="split-workbench">
        <Panel title="Create trip">
          <form className="form-grid" onSubmit={handleSubmit}>
            <label>Source<input name="source" onChange={updateField} value={form.source} /></label>
            <label>Destination<input name="destination" onChange={updateField} value={form.destination} /></label>
            <label>Vehicle<select name="vehicleId" onChange={updateField} value={form.vehicleId}><option value="">Select vehicle</option>{vehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.registrationNumber} - {vehicle.name}</option>)}</select></label>
            <label>Driver<select name="driverId" onChange={updateField} value={form.driverId}><option value="">Select driver</option>{drivers.map((driver) => <option key={driver.id} value={driver.id}>{driver.name}</option>)}</select></label>
            <label>Cargo weight kg<input name="cargoWeightKg" onChange={updateField} type="number" value={form.cargoWeightKg} /></label>
            <label>Planned distance km<input name="plannedDistanceKm" onChange={updateField} type="number" value={form.plannedDistanceKm} /></label>
            <Button type="submit">Dispatch trip</Button>
          </form>
          {error && <p className="error-text">{error}</p>}
        </Panel>
        <TripTable trips={trips} />
      </div>
    </Page>
  )
}

export default Trips
