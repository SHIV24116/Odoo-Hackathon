import { useEffect, useState } from 'react'
import Button from '../components/common/Button'
import Page from '../components/common/Page'
import VehicleTable from '../components/vehicle/VehicleTable'
import { createVehicle, getVehicles } from '../services/vehicleService'

const initialForm = {
  registrationNumber: '',
  name: '',
  type: 'Truck',
  capacityKg: '',
  odometerKm: '',
  acquisitionCost: '',
}

function Vehicles() {
  const [vehicles, setVehicles] = useState([])
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  async function loadVehicles() {
    setVehicles(await getVehicles())
  }

  useEffect(() => {
    loadVehicles().catch((err) => setError(err.message))
  }, [])

  function updateField(event) {
    const { name, value } = event.target
    const normalizedValue = ['registrationNumber', 'name'].includes(name) ? value.toUpperCase() : value
    setForm((current) => ({ ...current, [name]: normalizedValue }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    try {
      await createVehicle(form)
      setForm(initialForm)
      await loadVehicles()
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  }

  return (
    <Page title="Vehicle Registry">
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>Registration number<input name="registrationNumber" onChange={updateField} value={form.registrationNumber} /></label>
        <label>Vehicle model<input name="name" onChange={updateField} value={form.name} /></label>
        <label>Type<select name="type" onChange={updateField} value={form.type}><option>Truck</option><option>Van</option><option>Mini Truck</option></select></label>
        <label>Capacity kg<input name="capacityKg" onChange={updateField} type="number" value={form.capacityKg} /></label>
        <label>Odometer<input name="odometerKm" onChange={updateField} type="number" value={form.odometerKm} /></label>
        <label>Acquisition cost<input name="acquisitionCost" onChange={updateField} type="number" value={form.acquisitionCost} /></label>
        <Button type="submit">Add vehicle</Button>
      </form>
      {error && <p className="error-text">{error}</p>}
      <VehicleTable vehicles={vehicles} />
      <p className="rule-text">Rule: registration number must be unique. Retired and In Shop vehicles stay hidden from dispatch.</p>
    </Page>
  )
}

export default Vehicles
