import { useEffect, useState } from 'react'
import Badge from '../components/common/Badge'
import Button from '../components/common/Button'
import Page from '../components/common/Page'
import DriverTable from '../components/driver/DriverTable'
import { createDriver, getDrivers } from '../services/driverService'

const initialForm = {
  name: '',
  licenseNumber: '',
  category: 'HMV',
  licenseExpiry: '',
  contact: '',
  safetyScore: 90,
}

function Drivers() {
  const [drivers, setDrivers] = useState([])
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  async function loadDrivers() {
    setDrivers(await getDrivers())
  }

  useEffect(() => {
    loadDrivers().catch((err) => setError(err.message))
  }, [])

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    try {
      await createDriver(form)
      setForm(initialForm)
      await loadDrivers()
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  }

  return (
    <Page title="Drivers & Safety Profiles">
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>Name<input name="name" onChange={updateField} value={form.name} /></label>
        <label>License number<input name="licenseNumber" onChange={updateField} value={form.licenseNumber} /></label>
        <label>Category<select name="category" onChange={updateField} value={form.category}><option>HMV</option><option>LMV</option></select></label>
        <label>License expiry<input name="licenseExpiry" onChange={updateField} type="date" value={form.licenseExpiry} /></label>
        <label>Contact<input name="contact" onChange={updateField} value={form.contact} /></label>
        <label>Safety score<input name="safetyScore" onChange={updateField} type="number" value={form.safetyScore} /></label>
        <Button type="submit">Add driver</Button>
      </form>
      {error && <p className="error-text">{error}</p>}
      <DriverTable drivers={drivers} />
      <div className="legend"><Badge>Available</Badge><Badge>On Trip</Badge><Badge>Off Duty</Badge><Badge>Suspended</Badge></div>
      <p className="rule-text">Rule: expired or suspended drivers cannot be assigned to trips.</p>
    </Page>
  )
}

export default Drivers
